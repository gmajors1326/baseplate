import React, { useState } from 'react';
import { BrainCircuit, Plus, Trash2, KeyRound } from 'lucide-react';

export default function MemoryConsole({ memory, onAddMemory, onDeleteMemory }) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!key.trim() || !value.trim()) return;

    // Normalize keys to UPPERCASE
    const normalizedKey = key.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
    onAddMemory({
      key: normalizedKey,
      value: value.trim()
    });

    setKey('');
    setValue('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Agent Memory</span>
        <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-[#e4f35b]" />
          <span>Key-Value Configuration Memory</span>
        </h3>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-xl border border-white/10 bg-[#121214]/50 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full relative">
          <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
          <input
            type="text"
            required
            placeholder="MEM_KEY (e.g., DEPLOY_PORT)"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full bg-[#121214] border border-white/5 rounded-lg pl-9 pr-3 py-3 text-xs font-mono text-zinc-50 uppercase placeholder-zinc-500 focus:outline-none focus:border-[#e4f35b]/40 min-h-[44px]"
          />
        </div>

        <input
          type="text"
          required
          placeholder="Memory Value (e.g., 5173)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 w-full bg-[#121214] border border-white/5 rounded-lg p-3 text-xs text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#e4f35b]/40 min-h-[44px]"
        />

        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-[#e4f35b] text-zinc-950 hover:bg-[#e4f35b]/90 active:scale-95 transition-all min-h-[44px] flex items-center justify-center gap-1.5 shrink-0 font-bold text-xs uppercase tracking-wider w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Remember</span>
        </button>
      </form>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {memory.map((mem) => (
          <div
            key={mem.id}
            className="p-4 rounded-xl border border-white/10 bg-[#121214]/30 hover:border-white/20 transition-all flex flex-col justify-between min-h-[100px]"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Key</span>
              <p className="text-xs font-bold font-mono text-[#e4f35b] truncate">{mem.key}</p>
            </div>

            <div className="flex items-end justify-between pt-2 border-t border-white/5 mt-2">
              <div className="truncate flex-1 pr-3">
                <span className="text-[9px] font-mono text-zinc-550 block">Value</span>
                <p className="text-xs font-semibold text-zinc-200 truncate">{mem.value}</p>
              </div>
              <button
                type="button"
                onClick={() => onDeleteMemory(mem.id)}
                className="p-1.5 rounded text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                title="Forget memory"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {memory.length === 0 && (
          <div className="col-span-full py-12 text-center text-xs text-zinc-500 font-mono">
            Memory block is completely empty.
          </div>
        )}
      </div>
    </div>
  );
}
