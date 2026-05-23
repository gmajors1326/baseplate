import React, { useState } from 'react';
import { Columns, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function KanbanConsole({ tasks, onAddTask, onUpdateTaskStatus }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      status: 'backlog'
    });

    setTitle('');
    setIsAdding(false);
  };

  const columns = [
    { id: 'backlog', name: 'Backlog', border: 'border-zinc-800' },
    { id: 'in-progress', name: 'In Progress', border: 'border-indigo-500/20' },
    { id: 'done', name: 'Completed', border: 'border-emerald-500/20' }
  ];

  const handleMoveLeft = (task) => {
    if (task.status === 'in-progress') {
      onUpdateTaskStatus(task.id, 'backlog');
    } else if (task.status === 'done') {
      onUpdateTaskStatus(task.id, 'in-progress');
    }
  };

  const handleMoveRight = (task) => {
    if (task.status === 'backlog') {
      onUpdateTaskStatus(task.id, 'in-progress');
    } else if (task.status === 'in-progress') {
      onUpdateTaskStatus(task.id, 'done');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Task Manager</span>
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Columns className="w-5 h-5 text-[#e4f35b]" />
            <span>Workflow Kanban Board</span>
          </h3>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#e4f35b] text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-[#e4f35b]/90 active:scale-95 transition-all min-h-[44px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Task</span>
          </button>
        )}
      </div>

      {/* Task input form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-4 rounded-xl border border-white/10 bg-[#121214]/50 flex items-center gap-3">
          <input
            type="text"
            required
            placeholder="Enter workflow task name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-[#121214] border border-white/10 rounded-lg p-3 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#e4f35b]/40 min-h-[44px]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-[#e4f35b] text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-[#e4f35b]/90 active:scale-95 transition-all min-h-[44px] shrink-0"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="p-3 border border-white/10 hover:bg-white/5 rounded-lg text-zinc-400 min-h-[44px] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Grid of columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className={`p-4 rounded-xl border bg-black/10 min-h-[350px] flex flex-col space-y-4 ${col.border}`}>
              <div className="flex items-center justify-between pb-2 border-b border-white/5 select-none">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{col.name}</span>
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="flex-1 space-y-3">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-lg border border-white/5 bg-[#121214]/40 hover:border-white/10 transition-all space-y-3"
                  >
                    <p className="text-xs font-semibold text-zinc-250 leading-relaxed">{task.title}</p>
                    
                    {/* Move controls bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 select-none">
                      <button
                        type="button"
                        onClick={() => handleMoveLeft(task)}
                        disabled={col.id === 'backlog'}
                        className={`p-1.5 rounded transition-colors ${
                          col.id === 'backlog'
                            ? 'text-zinc-650 cursor-not-allowed'
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <span className="text-[9px] font-mono text-zinc-600 uppercase">Shift</span>

                      <button
                        type="button"
                        onClick={() => handleMoveRight(task)}
                        disabled={col.id === 'done'}
                        className={`p-1.5 rounded transition-colors ${
                          col.id === 'done'
                            ? 'text-zinc-650 cursor-not-allowed'
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="py-8 text-center text-[10px] font-mono text-zinc-600">
                    EMPTY COLUMN
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
