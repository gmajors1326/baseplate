import React, { useState } from 'react';
import { BookOpen, Send, Clock } from 'lucide-react';

export default function JournalConsole({ journal, onAddJournalEntry }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onAddJournalEntry({
      message: message.trim()
    });

    setMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Agent Chronology</span>
        <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#e4f35b]" />
          <span>Execution Journal & Logs</span>
        </h3>
      </div>

      {/* Input panel */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          required
          placeholder="Append a system log or developer note to chronology..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-[#121214] border border-white/10 rounded-lg p-3.5 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#e4f35b]/40 min-h-[48px]"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-[#e4f35b] text-zinc-950 hover:bg-[#e4f35b]/90 active:scale-95 transition-all min-h-[48px] flex items-center justify-center gap-2 shrink-0 font-bold text-xs uppercase tracking-wider"
        >
          <Send className="w-4 h-4" />
          <span>Post</span>
        </button>
      </form>

      {/* Timeline container */}
      <div className="relative border-l border-zinc-800 ml-3 pl-6 space-y-6 py-2">
        {journal.map((log) => (
          <div key={log.id} className="relative space-y-1">
            {/* Timeline bullet dot */}
            <div className="absolute left-[-29px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-950 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
            </div>

            {/* Event Header */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{log.timestamp}</span>
            </div>

            {/* Event Message */}
            <p className="text-xs font-semibold text-zinc-300 leading-relaxed bg-[#121214]/20 border border-white/5 rounded-lg p-3 max-w-3xl">
              {log.message}
            </p>
          </div>
        ))}

        {journal.length === 0 && (
          <div className="py-12 text-center text-xs text-zinc-500">
            No journal chronology logs have been written yet.
          </div>
        )}
      </div>
    </div>
  );
}
