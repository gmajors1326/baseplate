import React, { useState } from 'react';
import { ScrollText, Plus, X, Search, FileCode, Trash2 } from 'lucide-react';

export default function NotebookConsole({ notes, onAddNote, onDeleteNote }) {
  const [selectedId, setSelectedId] = useState(notes[0]?.id || '');
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');

  const selectedNote = notes.find(n => n.id === selectedId) || notes[0];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddNote({
      title: title.trim(),
      content: content.trim()
    });

    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[550px] border border-white/10 rounded-xl overflow-hidden bg-[#121214]/20">
      
      {/* Left List Pane */}
      <div className="lg:col-span-1 border-r border-white/10 flex flex-col h-full bg-black/20">
        <div className="p-4 border-b border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <ScrollText className="w-4 h-4 text-[#e4f35b]" />
              <span>Dev Notes</span>
            </h3>
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
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121214] border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-white/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredNotes.map((n) => {
            const isSelected = selectedId === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedId(n.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold text-left transition-all ${
                  isSelected 
                    ? 'bg-[#e4f35b]/10 text-[#e4f35b] border border-[#e4f35b]/20' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{n.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Content Pane */}
      <div className="lg:col-span-2 flex flex-col h-full bg-[#0a0a0c]/60">
        {selectedNote && !isAdding ? (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header info */}
            <div className="p-5 border-b border-white/5 bg-black/10 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-zinc-100">{selectedNote.title}</h4>
                <span className="text-[10px] text-zinc-500 font-mono">Persistence: Local Node API</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onDeleteNote(selectedNote.id);
                  setSelectedId(notes[0]?.id || '');
                }}
                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                title="Delete note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Note contents body */}
            <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-zinc-300 leading-relaxed bg-[#0c0c0e]">
              <pre className="whitespace-pre-wrap select-text">{selectedNote.content}</pre>
            </div>
          </div>
        ) : isAdding ? (
          <form onSubmit={handleAddSubmit} className="p-6 space-y-5 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Create Notebook Entry</h4>
              <button 
                type="button" 
                onClick={() => setIsAdding(false)} 
                className="p-1 text-zinc-400 hover:text-zinc-250"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Note Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Prompt instructions for content generation..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#121214] border border-white/10 rounded-lg p-3 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#e4f35b]/40 min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Note Body Content</label>
              <textarea
                required
                placeholder="Write logs, template structures, or commands here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full flex-1 bg-[#121214] border border-white/10 rounded-lg p-4 text-xs font-mono text-zinc-300 placeholder-zinc-650 focus:outline-none focus:border-[#e4f35b]/40 resize-none min-h-[200px]"
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
                Save Entry
              </button>
            </div>
          </form>
        ) : (
          <div className="p-12 text-center text-zinc-500 my-auto">
            Select a note card or click NEW to add a new notebook note.
          </div>
        )}
      </div>
    </div>
  );
}
