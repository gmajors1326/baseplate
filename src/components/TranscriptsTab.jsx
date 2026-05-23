import React, { useState } from 'react';
import { FileText, Plus, X, Search, FileCode } from 'lucide-react';

export default function TranscriptsTab({ transcripts, onAddTranscript }) {
  const [selectedId, setSelectedId] = useState(transcripts[0]?.id || '');
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [search, setSearch] = useState('');

  const selectedTranscript = transcripts.find(t => t.id === selectedId) || transcripts[0];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newContent.trim()) return;

    const words = newContent.trim().split(/\s+/).length;
    const sizeKb = (newContent.length / 1024).toFixed(1);

    onAddTranscript({
      id: newName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newName.trim().replace(/\.md$/, ''),
      size: `${sizeKb} KB`,
      wordCount: words,
      content: newContent
    });

    setNewName('');
    setNewContent('');
    setIsAdding(false);
  };

  const filteredTranscripts = transcripts.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] border border-white/10 rounded-xl overflow-hidden bg-[#121214]/20">
      {/* Left List Pane */}
      <div className="lg:col-span-1 border-r border-white/10 flex flex-col h-full bg-black/20">
        <div className="p-4 border-b border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Transcripts</h3>
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#e4f35b]/10 border border-[#e4f35b]/20 text-[10px] font-bold text-[#e4f35b] hover:bg-[#e4f35b]/25 transition-all"
            >
              <Plus className="w-3 h-3" />
              <span>NEW</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search transcripts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121214] border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-white/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredTranscripts.map((t) => {
            const isSelected = selectedId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedId(t.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold text-left transition-all ${
                  isSelected 
                    ? 'bg-[#e4f35b]/10 text-[#e4f35b] border border-[#e4f35b]/20' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.name}</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-500 ml-2 shrink-0">{t.size}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Content Pane */}
      <div className="lg:col-span-2 flex flex-col h-full bg-[#0a0a0c]/60">
        {selectedTranscript && !isAdding ? (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Transcript Info Header */}
            <div className="p-5 border-b border-white/5 bg-black/10 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#e4f35b]" />
                  <span>{selectedTranscript.name}.md</span>
                </h4>
                <div className="flex items-center gap-4 mt-1 text-[10px] font-mono text-zinc-500">
                  <span>Size: {selectedTranscript.size}</span>
                  <span>Words: {selectedTranscript.wordCount}</span>
                </div>
              </div>
            </div>

            {/* Transcript Text Panel */}
            <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-zinc-400 leading-relaxed bg-[#0c0c0e]">
              <pre className="whitespace-pre-wrap select-text">{selectedTranscript.content}</pre>
            </div>
          </div>
        ) : isAdding ? (
          <form onSubmit={handleAddSubmit} className="p-6 space-y-5 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Paste New Transcript</h4>
              <button 
                type="button"
                onClick={() => setIsAdding(false)} 
                className="p-1 text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Transcript Name</label>
              <input
                type="text"
                required
                placeholder="e.g. chat-session-agent-setup"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-[#121214] border border-white/10 rounded-lg p-3 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#e4f35b]/40 min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Transcript Text Content</label>
              <textarea
                required
                placeholder="Paste the full chat logs or transcription output here..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full flex-1 bg-[#121214] border border-white/10 rounded-lg p-4 text-xs font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#e4f35b]/40 resize-none min-h-[200px]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 min-h-[38px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#e4f35b] text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-[#e4f35b]/90 active:scale-95 transition-all min-h-[38px]"
              >
                Save Transcript
              </button>
            </div>
          </form>
        ) : (
          <div className="p-12 text-center text-zinc-500 my-auto">
            Select a transcript or click NEW to add one.
          </div>
        )}
      </div>
    </div>
  );
}
