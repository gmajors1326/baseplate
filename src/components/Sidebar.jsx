import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Bot, 
  Target, 
  Search, 
  BookOpen, 
  Columns, 
  ScrollText, 
  BrainCircuit, 
  ChevronRight,
  Globe
} from 'lucide-react';

export default function Sidebar({ activeSelfItem, setActiveSelfItem }) {
  const [bangkokTime, setBangkokTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Calculate Bangkok time (UTC+7)
      const options = {
        timeZone: 'Asia/Bangkok',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setBangkokTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    { name: 'Claude', color: 'bg-orange-500 shadow-orange-500/50' },
    { name: 'OpenClaw', color: 'bg-pink-500 shadow-pink-500/50' },
    { name: 'Hermes', color: 'bg-blue-400 shadow-blue-400/50' }
  ];

  const selfItems = [
    { id: 'goals', name: 'Goals', icon: Target },
    { id: 'seo', name: 'SEO', icon: Globe },
    { id: 'studio', name: 'Studio', icon: LayoutGrid },
    { id: 'notebook', name: 'Notebook', icon: ScrollText },
    { id: 'kanban', name: 'Kanban', icon: Columns },
    { id: 'journal', name: 'Journal', icon: BookOpen },
    { id: 'memory', name: 'Memory', icon: BrainCircuit }
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-[#0a0a0c] flex flex-col h-full select-none z-10">
      {/* Top Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Local - Bangkok
            </span>
            <span className="text-[10px] font-mono text-zinc-500">{bangkokTime}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1 flex items-center gap-2">
            <span className="bg-gradient-to-tr from-purple-500 to-indigo-500 text-transparent bg-clip-text">Agentic OS</span>
          </h1>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-7">
        {/* Workspace Section */}
        <div>
          <h2 className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
            Workspace
          </h2>
          <button 
            type="button"
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all min-h-[48px] text-left"
          >
            <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
            <span>Mission Control</span>
          </button>
        </div>

        {/* Agents Section */}
        <div>
          <h2 className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
            Agents
          </h2>
          <div className="space-y-1">
            {agents.map((agent) => (
              <button
                key={agent.name}
                type="button"
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all min-h-[48px] text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${agent.color} shadow-sm`}></div>
                  <span>{agent.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Self Section */}
        <div>
          <h2 className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
            Self
          </h2>
          <div className="space-y-1">
            {selfItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSelfItem === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSelfItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all min-h-[48px] relative text-left ${
                    isActive 
                      ? 'text-zinc-50 bg-[#e4f35b]/10' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-[#e4f35b] rounded-r"></div>
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#e4f35b]' : 'text-zinc-500'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[11px] text-zinc-500 font-medium font-mono">NODE ONLINE</span>
        </div>
        <span className="text-[10px] text-zinc-600 font-mono">v1.4.2</span>
      </div>
    </aside>
  );
}
