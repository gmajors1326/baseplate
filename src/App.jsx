import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';
import GenerateTab from './components/GenerateTab';
import DeployTab from './components/DeployTab';
import HistoryTab from './components/HistoryTab';
import TranscriptsTab from './components/TranscriptsTab';
import SkillTab from './components/SkillTab';

import { Play, Rocket, History, FileText, BookOpen } from 'lucide-react';

const INITIAL_TRANSCRIPTS = [
  {
    id: 'aipb-community-shared',
    name: 'aipb-community-shared',
    size: '6.4 KB',
    wordCount: 820,
    content: `# AIPB Community Shared Transcript\n\n[Developer A] We need to establish a high-performance content engine for our web applications. Let's discuss configuring Vite, Tailwind CSS, and Node.js.\n\n[Developer B] Yes, the base setup is simple. We can initialize a React shell, import Google Fonts, and configure tailwind.config.js to handle deep dark themes. Let's make sure the touch targets are very generous.\n\n[Developer A] Exactly. All click items need a minimum height of 48px to allow touch navigation without issues. Let's build out the pipeline and verify deployment in the staging area.`
  },
  {
    id: 'agentic-ai-os',
    name: 'agentic-ai-os',
    size: '4.4 KB',
    wordCount: 560,
    content: `# Agentic AI OS Architecture Discussion\n\n[User] How are the agent workflows running in this environment?\n\n[Agent] We have established three primary agents: Claude, OpenClaw, and Hermes. They operate concurrently to review filesystem files, manage tasks, and run builds.\n\n[User] Great, make sure the system maintains zero branding and has a sleek midnight industrial feel.`
  },
  {
    id: 'hermes-agent-os',
    name: 'hermes-agent-os',
    size: '6.0 KB',
    wordCount: 780,
    content: `# Hermes Agent OS Transcript\n\n[Developer] Hermes needs access to read and write filesystem files to execute commands. Let's build the workspace. We need to verify that we are avoiding hashtags and banned phrases in our outputs.\n\n[AI] Affirmative. The safety checks are online. Banned terms like the calm content method are completely blocked. Emojis and links are used instead of hashtags.`
  },
  {
    id: 'julian-goldie-ai',
    name: 'julian-goldie-ai',
    size: '4.2 KB',
    wordCount: 540,
    content: `# Julian Goldie AI Strategy Session\n\n[Host] Today we're mapping out the SEO Content Pipeline. The goal is to generate 5 unique articles for our funnels and deploy them directly to Netlify in parallel.\n\n[Guest] This is extremely efficient. Using automated static site builders and Vite, we can push content to the CDN edge in seconds. The keyword targeting must be clean.`
  },
  {
    id: 'hermes-mcp-server',
    name: 'hermes-mcp-server',
    size: '5.9 KB',
    wordCount: 750,
    content: `# Hermes MCP Server Integration\n\n[SysAdmin] The Model Context Protocol (MCP) server is online. We can now load tool schemas lazily and call tools directly. The node is operating on port 8080.\n\n[Engineer] Excellent. The react dashboard should connect to the local node to list active servers and display real-time console logs.`
  },
  {
    id: 'hermes-computer-use',
    name: 'hermes-computer-use',
    size: '5.9 KB',
    wordCount: 760,
    content: `# Hermes Computer Use Session Log\n\n[Agent] Initiating browser session. Accessing localhost:5173 to verify page rendering.\n\n[Supervisor] Page is rendering correctly. Colors match the midnight industrial dark scheme, and font sizes comply with the high contrast white typography. Verify command palette opens with control K.`
  },
  {
    id: 'claude-hermes-agent',
    name: 'claude-hermes-agent',
    size: '5.7 KB',
    wordCount: 730,
    content: `# Claude & Hermes Pair Programming Session\n\n[Claude] I'm building out the sidebar component now. Let's add the dynamic local clocks and section dividers. I'll make sure there is no internal scrolling inside the cards to follow layout guidelines.\n\n[Hermes] Correct. Standard full-page scrolling only when the view height exceeds the viewport.`
  },
  {
    id: 'openclaw-seo-agent',
    name: 'openclaw-seo-agent',
    size: '4.0 KB',
    wordCount: 510,
    content: `# OpenClaw SEO Agent Log\n\n[Claw] Running keyword research on target queries. Generating optimized meta titles and headings. Recommending clean slug paths without special characters.\n\n[System] File slug saved as lowercase-hyphenated. Ready for content writing step.`
  },
  {
    id: 'hermes-seo',
    name: 'hermes-seo',
    size: '4.4 KB',
    wordCount: 560,
    content: `# Hermes SEO Strategy Discussion\n\n[AI] I have completed the keyword optimization logic. The article outline contains meta titles, introduction, heading hierarchy (H1, H2, H3), and call-to-actions.\n\n[User] Excellent. Ensure no hashtags are generated in the body content or bios.`
  },
  {
    id: 'goldie-agency',
    name: 'goldie-agency',
    size: '4.8 KB',
    wordCount: 620,
    content: `# Goldie Agency Team Chat\n\n[Lead] We are launching the five Netlify funnels today. The target keyword and file slugs are configured. Let's kick off the automated build.\n\n[SysOp] Build triggered. Staggered CDN deployment in progress. All 5 funnels are live.`
  }
];

const INITIAL_HISTORY = [
  {
    keyword: 'hermes mcp server',
    slug: 'hermes-mcp-server',
    transcriptName: 'hermes-mcp-server',
    autoDeploy: true,
    timestamp: '2026-05-23 14:32',
    articles: [
      'The Complete Guide to Installing Hermes MCP Server',
      'Why Hermes MCP Server is a Game Changer for AI Agents',
      'How to Connect React Dashboards to your MCP Server',
      '5 Advanced Tools to Run with Hermes Model Context Protocol',
      'Deploying Your Local MCP Server Node: A Step-by-Step Guide'
    ]
  },
  {
    keyword: 'agentic ai os',
    slug: 'agentic-ai-os',
    transcriptName: 'agentic-ai-os',
    autoDeploy: true,
    timestamp: '2026-05-23 10:15',
    articles: [
      'Understanding Agentic AI OS and Local Workflows',
      'How to Build High-Performance Dark Dashboards',
      'Zero Branding Design Patterns for Developer Tooling',
      'Creating Micro-Animations with Tailwind CSS Keyframes',
      'Staggered CDN Deployments to Netlify Funnels'
    ]
  }
];

export default function App() {
  const [activeSelfItem, setActiveSelfItem] = useState('seo');
  const [activeTab, setActiveTab] = useState('generate');
  const [transcripts, setTranscripts] = useState(INITIAL_TRANSCRIPTS);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Simulation State
  const [simulation, setSimulation] = useState({
    status: 'idle', // idle, running (generating), deploying, completed
    step: 0,
    keyword: '',
    slug: '',
    transcriptId: '',
    transcriptName: '',
    autoDeploy: true,
    logs: []
  });

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
            } else {
              newLogs.push(`[system] Writes to local filesystem completed. No deploy requested.`);
            }
            break;
          case 10:
            if (simulation.autoDeploy) {
              newLogs.push(`[deployer] All 5 Netlify funnels built and deployed successfully!`);
            }
            nextStatus = 'completed';
            break;
          default:
            break;
        }

        if (nextStatus === 'completed') {
          // Add to history
          const now = new Date();
          const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          
          setHistory(prev => [
            {
              keyword: simulation.keyword,
              slug: simulation.slug,
              transcriptName: simulation.transcriptName,
              autoDeploy: simulation.autoDeploy,
              timestamp,
              articles: titles
            },
            ...prev
          ]);

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
    // Capitalize first letters
    const cap = kw.replace(/\b\w/g, c => c.toUpperCase());
    return [
      `The Ultimate Guide to ${cap}`,
      `Why ${cap} is the Future of Digital Growth`,
      `5 Hidden Secrets About ${cap} You Need to Know`,
      `Mastering ${cap}: A Step-by-Step Developer Tutorial`,
      `How to Maximize Conversions with ${cap}`
    ];
  };

  const handleGenerate = (data) => {
    // Switch to Deploy tab to see the live build logs
    setActiveTab('deploy');
    
    // Start simulation
    setSimulation({
      status: 'running',
      step: 0,
      keyword: data.keyword,
      slug: data.slug,
      transcriptId: data.transcriptId,
      transcriptName: data.transcriptName,
      autoDeploy: data.autoDeploy,
      logs: [`[system] Kicking off SEO Content Pipeline pipeline...`]
    });
  };

  const handleAddTranscript = (t) => {
    setTranscripts(prev => [t, ...prev]);
  };

  const handlePasteNewTranscriptFromPalette = () => {
    // Navigate to transcripts and toggle the add mode
    setActiveTab('transcripts');
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // If a tab is selected, we render its component inside our main shell card
  const renderTabContent = () => {
    switch (activeTab) {
      case 'generate':
        return (
          <GenerateTab 
            transcripts={transcripts} 
            onPasteNewTranscript={() => handleTabChange('transcripts')} 
            onGenerate={handleGenerate} 
          />
        );
      case 'deploy':
        return (
          <DeployTab 
            simulationState={simulation} 
            history={history} 
          />
        );
      case 'history':
        return (
          <HistoryTab 
            history={history} 
            onClear={handleClearHistory} 
          />
        );
      case 'transcripts':
        return (
          <TranscriptsTab 
            transcripts={transcripts} 
            onAddTranscript={handleAddTranscript} 
          />
        );
      case 'skill':
        return <SkillTab />;
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
        {activeSelfItem === 'seo' ? (
          <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
            {/* Top Navigation / Header */}
            <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

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

            {/* Main Application Shell (Workspaces Card) */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-start">
              {renderTabContent()}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full text-center border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md p-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Agentic OS Terminal</span>
            <h3 className="text-xl font-bold text-zinc-200 mb-2">Section Under Development</h3>
            <p className="text-xs text-zinc-400 max-w-md">
              You clicked on the <code className="text-[#e4f35b] font-mono uppercase">{activeSelfItem}</code> module. Only the <code className="text-[#e4f35b] font-mono uppercase">SEO</code> Content Pipeline console is fully operational in this node build.
            </p>
            <button
              type="button"
              onClick={() => setActiveSelfItem('seo')}
              className="mt-6 px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 border border-white/5 transition-all min-h-[44px]"
            >
              Return to SEO Console
            </button>
          </div>
        )}
      </main>

      {/* Command Palette Modal */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleTabChange}
        onTriggerSimulation={() => handleGenerate({
          keyword: 'agentic workflow optimization',
          slug: 'agentic-workflow-optimization',
          transcriptId: transcripts[0].id,
          transcriptName: transcripts[0].name,
          autoDeploy: true
        })}
        onPasteNewTranscript={handlePasteNewTranscriptFromPalette}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
