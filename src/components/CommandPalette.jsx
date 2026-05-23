import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Zap, Trash2, X, FilePlus } from 'lucide-react';

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onTriggerSimulation, 
  onPasteNewTranscript, 
  onClearHistory 
}) {
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const items = [
    { 
      category: 'Navigation', 
      label: 'Switch to Generate Tab', 
      icon: Compass, 
      action: () => { onNavigate('generate'); onClose(); } 
    },
    { 
      category: 'Navigation', 
      label: 'Switch to Deploy Tab', 
      icon: Compass, 
      action: () => { onNavigate('deploy'); onClose(); } 
    },
    { 
      category: 'Navigation', 
      label: 'Switch to History Tab', 
      icon: Compass, 
      action: () => { onNavigate('history'); onClose(); } 
    },
    { 
      category: 'Navigation', 
      label: 'Switch to Transcripts Tab', 
      icon: Compass, 
      action: () => { onNavigate('transcripts'); onClose(); } 
    },
    { 
      category: 'Navigation', 
      label: 'Switch to Skill Reference Tab', 
      icon: Compass, 
      action: () => { onNavigate('skill'); onClose(); } 
    },
    { 
      category: 'Actions', 
      label: 'Trigger Simulated Generate Run', 
      icon: Zap, 
      action: () => { onTriggerSimulation(); onClose(); } 
    },
    { 
      category: 'Actions', 
      label: 'Add New Transcript', 
      icon: FilePlus, 
      action: () => { onPasteNewTranscript(); onClose(); } 
    },
    { 
      category: 'Actions', 
      label: 'Clear Performance Logs', 
      icon: Trash2, 
      action: () => { onClearHistory(); onClose(); } 
    },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      ></div>

      {/* Palette Card */}
      <div className="relative w-full max-w-lg bg-zinc-900/90 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md flex flex-col max-h-[60vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 border-b border-white/10 min-h-[56px]">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search console command palette..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none h-full"
          />
          <button 
            type="button"
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {['Navigation', 'Actions'].map(category => {
                const categoryItems = filteredItems.filter(i => i.category === category);
                if (categoryItems.length === 0) return null;

                return (
                  <div key={category} className="space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
                      {category}
                    </div>
                    {categoryItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={item.action}
                          className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 text-left transition-all min-h-[44px]"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-zinc-400" />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono">Select</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-zinc-500">
              No matching console commands found
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Use <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700">↑↓</kbd> to navigate</span>
          <span><kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
}
