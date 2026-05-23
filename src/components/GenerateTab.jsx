import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, AlertTriangle, Play, HelpCircle } from 'lucide-react';

export default function GenerateTab({ 
  transcripts, 
  onPasteNewTranscript, 
  onGenerate 
}) {
  const [keyword, setKeyword] = useState('');
  const [slug, setSlug] = useState('');
  const [selectedTranscript, setSelectedTranscript] = useState('');
  const [autoDeploy, setAutoDeploy] = useState(true);

  // Autofill slug from keyword when user types keyword, replacing spaces with hyphens, lowercase
  useEffect(() => {
    if (keyword && !slug) {
      setSlug(keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  }, [keyword]);

  const handleTranscriptSelect = (t) => {
    setSelectedTranscript(t.id);
    // Suggest a slug based on transcript name if keyword is empty
    if (!keyword) {
      setSlug(t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSlugChange = (e) => {
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    
    const transcript = transcripts.find(t => t.id === selectedTranscript) || transcripts[0];
    onGenerate({
      keyword,
      slug: slug || 'generated-slug',
      transcriptId: transcript.id,
      transcriptName: transcript.name,
      autoDeploy
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Top Banner Inside Card */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-[#e4f35b]/20 bg-[#e4f35b]/5 text-[#e4f35b] min-h-[48px] select-none">
        <Sparkles className="w-5 h-5 shrink-0" />
        <span className="text-sm font-semibold tracking-wide">
          Generate 5 unique SEO articles for all 5 sites
        </span>
      </div>

      {/* Target Keyword and File Slug Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Target Keyword */}
        <div className="space-y-2">
          <label htmlFor="target-keyword" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Target Keyword
          </label>
          <input
            id="target-keyword"
            type="text"
            required
            placeholder="e.g. hermes mcp server"
            value={keyword}
            onChange={handleKeywordChange}
            className="w-full bg-[#121214] border border-white/10 rounded-lg p-4 text-zinc-50 placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e4f35b]/50 min-h-[48px] transition-all"
          />
        </div>

        {/* File Slug */}
        <div className="space-y-2">
          <label htmlFor="file-slug" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            File Slug
          </label>
          <input
            id="file-slug"
            type="text"
            required
            placeholder="hermes-mcp-server"
            value={slug}
            onChange={handleSlugChange}
            className="w-full bg-[#121214] border border-white/10 rounded-lg p-4 text-zinc-50 placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e4f35b]/50 min-h-[48px] transition-all"
          />
        </div>
      </div>

      {/* Source Transcript Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Source Transcript
          </label>
          <div className="flex gap-2.5">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-[#e4f35b] bg-[#e4f35b]/10 text-xs font-semibold text-[#e4f35b] min-h-[38px] transition-all"
            >
              PICK EXISTING
            </button>
            <button
              type="button"
              onClick={onPasteNewTranscript}
              className="px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 min-h-[38px] transition-all"
            >
              PASTE NEW
            </button>
          </div>
        </div>

        {/* Transcripts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {transcripts.map((t) => {
            const isSelected = selectedTranscript === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTranscriptSelect(t)}
                className={`p-4 rounded-xl border text-left flex items-start justify-between min-h-[64px] transition-all ${
                  isSelected 
                    ? 'border-[#e4f35b] bg-[#e4f35b]/5 shadow-[0_0_15px_rgba(228,243,91,0.05)]' 
                    : 'border-white/10 bg-[#121214]/50 hover:bg-[#121214] hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className={`w-4 h-4 mt-0.5 ${isSelected ? 'text-[#e4f35b]' : 'text-zinc-500'}`} />
                  <div className="space-y-0.5">
                    <div className={`text-xs font-semibold ${isSelected ? 'text-zinc-100' : 'text-zinc-300'}`}>
                      {t.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      {t.wordCount} words
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-[#e4f35b]' : 'text-zinc-500'}`}>
                  {t.size}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto Deploy Toggle */}
      <div className="p-4 rounded-xl border border-white/5 bg-[#121214]/30 flex items-center justify-between min-h-[64px]">
        <div className="space-y-0.5">
          <div className="text-sm font-semibold text-zinc-200">Auto-deploy after generate</div>
          <div className="text-xs text-zinc-500">As soon as Claude finishes writing, all 5 sites build + deploy in parallel.</div>
        </div>
        <button
          type="button"
          onClick={() => setAutoDeploy(!autoDeploy)}
          className={`w-12 h-6 rounded-full p-1 transition-all ${
            autoDeploy ? 'bg-indigo-600' : 'bg-zinc-800'
          }`}
        >
          <div className={`bg-white w-4 h-4 rounded-full transition-all ${
            autoDeploy ? 'translate-x-6' : 'translate-x-0'
          }`}></div>
        </button>
      </div>

      {/* Footer Form Bar */}
      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Warning text */}
        <div className="flex items-center gap-2 text-[#f59e0b] select-none">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span className="text-xs font-medium">
            Writes to all 5 sites ⚠️ Live filesystem writes - no transcript
          </span>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={!keyword.trim()}
          className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider min-h-[48px] transition-all select-none ${
            keyword.trim()
              ? 'bg-[#e4f35b] text-zinc-950 hover:bg-[#e4f35b]/90 active:scale-95 shadow-[0_0_20px_rgba(228,243,91,0.2)]'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Generate 5 articles</span>
        </button>
      </div>
    </form>
  );
}
