import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';
import GenerateTab from './components/GenerateTab';
import DeployTab from './components/DeployTab';
import HistoryTab from './components/HistoryTab';
import TranscriptsTab from './components/TranscriptsTab';
import SkillTab from './components/SkillTab';

// Full Suite consoles
import GoalsConsole from './components/GoalsConsole';
import StudioConsole from './components/StudioConsole';
import NotebookConsole from './components/NotebookConsole';
import KanbanConsole from './components/KanbanConsole';
import JournalConsole from './components/JournalConsole';
import MemoryConsole from './components/MemoryConsole';

import { Play, Rocket, History, FileText, BookOpen } from 'lucide-react';

const RENDER_SERVICE_ID = 'srv-d892qef7f7vs73bp6hb0';

export default function App() {
  const [activeSelfItem, setActiveSelfItem] = useState('seo');
  const [activeTab, setActiveTab] = useState('generate');
  
  // Dynamic collections loaded from backend Express server
  const [transcripts, setTranscripts] = useState([]);
  const [history, setHistory] = useState([]);
  const [goals, setGoals] = useState([]);
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [journal, setJournal] = useState([]);
  const [memory, setMemory] = useState([]);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Simulation State
  const [simulation, setSimulation] = useState({
    status: 'idle', // idle, running, deploying, completed
    step: 0,
    keyword: '',
    slug: '',
    transcriptId: '',
    transcriptName: '',
    autoDeploy: true,
    logs: []
  });

  // Fetch initial data from backend APIs
  useEffect(() => {
    fetchTranscripts();
    fetchHistory();
    fetchGoals();
    fetchNotes();
    fetchTasks();
    fetchJournal();
    fetchMemory();
  }, []);

  const fetchTranscripts = async () => {
    try {
      const res = await fetch('/api/transcripts');
      if (res.ok) setTranscripts(await res.json());
    } catch (err) {
      console.error('Failed to fetch transcripts', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      if (res.ok) setHistory(await res.json());
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/goals');
      if (res.ok) setGoals(await res.json());
    } catch (err) {
      console.error('Failed to fetch goals', err);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      if (res.ok) setNotes(await res.json());
    } catch (err) {
      console.error('Failed to fetch notes', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) setTasks(await res.json());
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const fetchJournal = async () => {
    try {
      const res = await fetch('/api/journal');
      if (res.ok) setJournal(await res.json());
    } catch (err) {
      console.error('Failed to fetch journal', err);
    }
  };

  const fetchMemory = async () => {
    try {
      const res = await fetch('/api/memory');
      if (res.ok) setMemory(await res.json());
    } catch (err) {
      console.error('Failed to fetch memory', err);
    }
  };

  // Toggle command palette with Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simulation runner effect
  useEffect(() => {
    let timer;
    if (simulation.status === 'running' || simulation.status === 'deploying') {
      timer = setTimeout(() => {
        const nextStep = simulation.step + 1;
        let nextStatus = simulation.status;
        let newLogs = [...simulation.logs];

        const titles = generateArticleTitles(simulation.keyword);

        switch (nextStep) {
          case 1:
            newLogs.push(`[generator] Initializing agent environment with Claude 3.5 Sonnet...`);
            break;
          case 2:
            newLogs.push(`[generator] Reading source transcript: "${simulation.transcriptName}"...`);
            break;
          case 3:
            newLogs.push(`[generator] Running SEO analysis for keyword: "${simulation.keyword}"...`);
            break;
          case 4:
            newLogs.push(`[generator] Created Article 1: "${titles[0]}"`);
            break;
          case 5:
            newLogs.push(`[generator] Created Article 2: "${titles[1]}"`);
            break;
          case 6:
            newLogs.push(`[generator] Created Article 3: "${titles[2]}"`);
            break;
          case 7:
            newLogs.push(`[generator] Created Article 4: "${titles[3]}"`);
            break;
          case 8:
            newLogs.push(`[generator] Created Article 5: "${titles[4]}"`);
            break;
          case 9:
            if (simulation.autoDeploy) {
              nextStatus = 'deploying';
              newLogs.push(`[deployer] Parallel deployment triggered to Netlify Edge CDN...`);
              newLogs.push(`[deployer] Initiating static site deploy for Render service ${RENDER_SERVICE_ID}...`);
            } else {
              newLogs.push(`[system] Writes to local filesystem completed. No deploy requested.`);
            }
            break;
          case 10:
            if (simulation.autoDeploy) {
              newLogs.push(`[deployer] Render build logs: https://dashboard.render.com/static/${RENDER_SERVICE_ID}`);
              newLogs.push(`[deployer] All 5 Netlify funnels built and deployed successfully!`);
              newLogs.push(`[deployer] Render deploy completed for service: ${RENDER_SERVICE_ID}`);
            }
            nextStatus = 'completed';
            break;
          default:
            break;
        }

        if (nextStatus === 'completed') {
          // Fetch updated history and journals from backend (which includes the real files created)
          fetchHistory();
          fetchJournal();

          setSimulation(prev => ({
            ...prev,
            status: 'completed',
            step: nextStep,
            logs: newLogs
          }));
        } else {
          setSimulation(prev => ({
            ...prev,
            status: nextStatus,
            step: nextStep,
            logs: newLogs
          }));
        }
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [simulation.status, simulation.step]);

  const generateArticleTitles = (key) => {
    const kw = key.trim() || 'SEO Platform';
    const cap = kw.replace(/\b\w/g, c => c.toUpperCase());
    return [
      `The Ultimate Guide to ${cap}`,
      `Why ${cap} is the Future of Digital Growth`,
      `5 Hidden Secrets About ${cap} You Need to Know`,
      `Mastering ${cap}: A Step-by-Step Developer Tutorial`,
      `How to Maximize Conversions with ${cap}`
    ];
  };

  /* ========================================================
     REST Handler Callbacks
     ======================================================== */

  const handleGenerate = async (data) => {
    setActiveSelfItem('seo');
    setActiveTab('deploy');
    
    setSimulation({
      status: 'running',
      step: 0,
      keyword: data.keyword,
      slug: data.slug,
      transcriptId: data.transcriptId,
      transcriptName: data.transcriptName,
      autoDeploy: data.autoDeploy,
      logs: [`[system] Kicking off SEO Content Pipeline...`]
    });

    try {
      await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: data.keyword,
          slug: data.slug,
          transcriptId: data.transcriptId,
          transcriptName: data.transcriptName,
          autoDeploy: data.autoDeploy
        })
      });
    } catch (err) {
      console.error('Failed to trigger real generation on backend', err);
    }
  };

  const handleAddTranscript = async (t) => {
    try {
      const res = await fetch('/api/transcripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(t)
      });
      if (res.ok) {
        const saved = await res.json();
        setTranscripts(prev => [saved, ...prev]);
      }
    } catch (err) {
      console.error('Failed to save transcript to backend', err);
    }
  };

  const handleClearHistory = async () => {
    try {
      const res = await fetch('/api/history', { method: 'DELETE' });
      if (res.ok) {
        setHistory([]);
      }
    } catch (err) {
      console.error('Failed to clear history on backend', err);
    }
  };

  const handleAddGoal = async (goal) => {
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal)
      });
      if (res.ok) {
        const saved = await res.json();
        setGoals(prev => [...prev, saved]);
        
        // Auto-log to journal
        handleAddJournalEntry({
          message: `Goal Mission created: "${saved.title}" (Agent: ${saved.agent}, Priority: ${saved.priority})`
        });
      }
    } catch (err) {
      console.error('Failed to save goal', err);
    }
  };

  const handleAddNote = async (note) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
      });
      if (res.ok) {
        const saved = await res.json();
        setNotes(prev => [saved, ...prev]);
      }
    } catch (err) {
      console.error('Failed to save note', err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotes(prev => prev.filter(n => n.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete note', err);
    }
  };

  const handleAddTask = async (task) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      if (res.ok) {
        const saved = await res.json();
        setTasks(prev => [...prev, saved]);
      }
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const handleUpdateTaskStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks(prev => prev.map(t => t.id === id ? updated : t));
        
        // Auto-log to journal
        handleAddJournalEntry({
          message: `Kanban Task status updated: "${updated.title}" shifted to ${newStatus.toUpperCase()}`
        });
      }
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  const handleAddJournalEntry = async (entry) => {
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      if (res.ok) {
        const saved = await res.json();
        setJournal(prev => [saved, ...prev]);
      }
    } catch (err) {
      console.error('Failed to write log entry', err);
    }
  };

  const handleAddMemory = async (mem) => {
    try {
      const res = await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mem)
      });
      if (res.ok) {
        const saved = await res.json();
        // Check if updating
        setMemory(prev => {
          const idx = prev.findIndex(m => m.key === saved.key);
          if (idx !== -1) {
            return prev.map(m => m.key === saved.key ? saved : m);
          }
          return [...prev, saved];
        });

        // Auto-log to journal
        handleAddJournalEntry({
          message: `Configuration Memory saved: [${saved.key} => ${saved.value}]`
        });
      }
    } catch (err) {
      console.error('Failed to save memory', err);
    }
  };

  const handleDeleteMemory = async (id) => {
    try {
      const res = await fetch(`/api/memory/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMemory(prev => prev.filter(m => m.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete memory', err);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Switch navigation via Command Palette
  const handlePaletteNavigate = (dest) => {
    if (['generate', 'deploy', 'history', 'transcripts', 'skill'].includes(dest)) {
      setActiveSelfItem('seo');
      setActiveTab(dest);
    } else {
      // Direct navigation to sidebar consoles
      setActiveSelfItem(dest);
    }
  };

  const renderActiveConsole = () => {
    switch (activeSelfItem) {
      case 'seo':
        return (
          <div className="flex-1 flex flex-col w-full">
            {/* Tab Bar Selection */}
            <div className="flex items-center gap-3.5 mb-6 border-b border-white/5 pb-4 select-none">
              {[
                { id: 'generate', name: 'Generate', icon: Play },
                { id: 'deploy', name: 'Deploy', icon: Rocket },
                { id: 'history', name: 'History', count: history.length, icon: History },
                { id: 'transcripts', name: 'Transcripts', icon: FileText },
                { id: 'skill', name: 'Skill', icon: BookOpen }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-semibold select-none transition-all min-h-[40px] relative ${
                      isActive 
                        ? 'border-[#e4f35b] text-zinc-50 bg-[#e4f35b]/5' 
                        : 'border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e4f35b] mr-0.5 animate-pulse"></span>
                    )}
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.name}</span>
                    {tab.count !== undefined && (
                      <span className={`ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-[#e4f35b]/20 text-[#e4f35b]' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Application Card */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-start">
              {activeTab === 'generate' && (
                <GenerateTab 
                  transcripts={transcripts} 
                  onPasteNewTranscript={() => handleTabChange('transcripts')} 
                  onGenerate={handleGenerate} 
                />
              )}
              {activeTab === 'deploy' && (
                <DeployTab 
                  simulationState={simulation} 
                  history={history} 
                />
              )}
              {activeTab === 'history' && (
                <HistoryTab 
                  history={history} 
                  onClear={handleClearHistory} 
                />
              )}
              {activeTab === 'transcripts' && (
                <TranscriptsTab 
                  transcripts={transcripts} 
                  onAddTranscript={handleAddTranscript} 
                />
              )}
              {activeTab === 'skill' && <SkillTab />}
            </div>
          </div>
        );
      case 'goals':
        return (
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-start w-full">
            <GoalsConsole goals={goals} onAddGoal={handleAddGoal} />
          </div>
        );
      case 'studio':
        return (
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-start w-full">
            <StudioConsole />
          </div>
        );
      case 'notebook':
        return (
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-start w-full">
            <NotebookConsole notes={notes} onAddNote={handleAddNote} onDeleteNote={handleDeleteNote} />
          </div>
        );
      case 'kanban':
        return (
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-start w-full">
            <KanbanConsole tasks={tasks} onAddTask={handleAddTask} onUpdateTaskStatus={handleUpdateTaskStatus} />
          </div>
        );
      case 'journal':
        return (
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-start w-full">
            <JournalConsole journal={journal} onAddJournalEntry={handleAddJournalEntry} />
          </div>
        );
      case 'memory':
        return (
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-start w-full">
            <MemoryConsole memory={memory} onAddMemory={handleAddMemory} onDeleteMemory={handleDeleteMemory} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-zinc-950 text-zinc-50 overflow-hidden relative font-sans">
      {/* Ambient Lighting Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-glow-1 z-0"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none animate-glow-2 z-0"></div>
      <div className="absolute top-[30%] left-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-0"></div>

      {/* Left Sidebar */}
      <Sidebar activeSelfItem={activeSelfItem} setActiveSelfItem={setActiveSelfItem} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto p-8 relative z-10">
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
          {/* Top Navigation / Header */}
          <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

          {/* Dynamic Console Component Rendering */}
          {renderActiveConsole()}
        </div>
      </main>

      {/* Command Palette Modal */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handlePaletteNavigate}
        onTriggerSimulation={() => handleGenerate({
          keyword: 'agentic workflow optimization',
          slug: 'agentic-workflow-optimization',
          transcriptId: transcripts[0]?.id || 'aipb-community-shared',
          transcriptName: transcripts[0]?.name || 'aipb-community-shared',
          autoDeploy: true
        })}
        onPasteNewTranscript={handlePasteNewTranscriptFromPalette}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
