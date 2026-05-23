import React from 'react';
import { Calendar, CheckCircle2, ChevronRight, FileText, Trash2, Globe } from 'lucide-react';

export default function HistoryTab({ history, onClear }) {
  if (history.length === 0) {
    return (
      <div className="p-12 text-center border border-white/10 rounded-xl bg-[#121214]/20">
        <Globe className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-base font-semibold text-zinc-400 mb-1">No execution history found</h3>
        <p className="text-xs text-zinc-500">Generate some articles in the Generate tab to populate the logs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
          Performance log history ({history.length} records)
        </span>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-500/10 border border-red-500/20 text-[11px] font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      {/* History log stack */}
      <div className="space-y-5">
        {history.map((record, index) => (
          <div key={index} className="p-5 rounded-xl border border-white/10 bg-[#121214]/30 hover:border-white/20 transition-all space-y-4">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-white/5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Target Keyword</span>
                <h4 className="text-md font-bold text-[#e4f35b]">{record.keyword}</h4>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {record.timestamp}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Success
                </span>
              </div>
            </div>

            {/* Middle row metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase mb-0.5">File Slug</span>
                <span className="text-zinc-300 font-semibold">{record.slug}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase mb-0.5">Transcript</span>
                <span className="text-zinc-300 font-semibold">{record.transcriptName}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase mb-0.5">Deploy Status</span>
                <span className="text-zinc-300 font-semibold">
                  {record.autoDeploy ? 'Auto Netlify' : 'Filesystem Only'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase mb-0.5">Total Articles</span>
                <span className="text-zinc-300 font-semibold">5 unique</span>
              </div>
            </div>

            {/* List of articles */}
            <div className="space-y-2 pt-2">
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">Generated SEO Article Titles:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {record.articles.map((title, aIdx) => (
                  <div key={aIdx} className="flex items-center gap-2.5 p-3 rounded bg-black/40 border border-white/5 text-xs text-zinc-300 hover:text-zinc-100 transition-colors">
                    <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 shrink-0 font-bold">
                      {aIdx + 1}
                    </div>
                    <span className="truncate">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
