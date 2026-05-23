import React, { useState } from 'react';
import { Target, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function GoalsConsole({ goals, onAddGoal }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [agent, setAgent] = useState('Claude');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddGoal({
      title: title.trim(),
      priority,
      agent,
      status: 'Active'
    });

    setTitle('');
    setIsAdding(false);
  };

  const getPriorityColor = (p) => {
    if (p === 'High') return 'text-red-400 bg-red-500/10 border-red-500/20';
    if (p === 'Medium') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Agent Console</span>
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#e4f35b]" />
            <span>Active Goal Missions</span>
          </h3>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#e4f35b] text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-[#e4f35b]/90 active:scale-95 transition-all min-h-[44px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Mission</span>
          </button>
        )}
      </div>

      {/* Goal Form overlay / inline */}
      {isAdding ? (
        <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-white/10 bg-[#121214]/50 space-y-4">
          <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest pb-2 border-b border-white/5">
            Configure Goal Mission
          </h4>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Mission Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Generate and audit production styles..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#121214] border border-white/10 rounded-lg p-3 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#e4f35b]/40 min-h-[48px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#121214] border border-white/10 rounded-lg p-3 text-sm text-zinc-50 focus:outline-none focus:border-[#e4f35b]/40 min-h-[48px]"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Assigned Agent</label>
              <select
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                className="w-full bg-[#121214] border border-white/10 rounded-lg p-3 text-sm text-zinc-50 focus:outline-none focus:border-[#e4f35b]/40 min-h-[48px]"
              >
                <option value="Claude">Claude</option>
                <option value="OpenClaw">OpenClaw</option>
                <option value="Hermes">Hermes</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#e4f35b] text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-[#e4f35b]/90 active:scale-95 transition-all min-h-[44px]"
            >
              Start Mission
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 rounded-xl border border-white/10 bg-[#121214]/30 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${getPriorityColor(goal.priority)}`}>
                    {goal.priority}
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">Agent: {goal.agent}</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-200">{goal.title}</h4>
              </div>

              <div className="flex items-center gap-2">
                {goal.status === 'Completed' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                ) : goal.status === 'Active' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-850 text-zinc-500 border border-zinc-700">
                    <span>Pending</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
