import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function Header({ onOpenCommandPalette }) {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setLocalTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-start justify-between mb-8 select-none">
      {/* Title & Description */}
      <div>
        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          {localTime} Local
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          SEO Content Pipeline
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Pick a keyword + transcript. Generate 5 unique articles. Deploy to your Netlify funnel.
        </p>
      </div>

      {/* Command Palette Trigger */}
      <div>
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-zinc-400 hover:text-zinc-200 min-h-[40px] focus:outline-none focus:ring-1 focus:ring-zinc-700"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="font-sans">Command palette</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-500">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
