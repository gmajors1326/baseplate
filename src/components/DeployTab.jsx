import React, { useState } from 'react';
import { Server, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export default function DeployTab({ simulationState, history }) {
  const [expandedSite, setExpandedSite] = useState(null);

  // If there's an active simulation, we render the simulation progress
  // Otherwise, we show the status of the last completed generation
  const activeSim = simulationState?.status === 'running' || simulationState?.status === 'deploying';
  
  const defaultSites = [
    { id: 'site-1', name: 'Bangkok Tech Funnel', domain: 'bkk-tech-funnel.netlify.app' },
    { id: 'site-2', name: 'Singapore Digital Hub', domain: 'sgp-digital-hub.netlify.app' },
    { id: 'site-3', name: 'Hong Kong Marketing', domain: 'hkg-marketing-funnel.netlify.app' },
    { id: 'site-4', name: 'Tokyo Search Lead', domain: 'nrt-search-lead.netlify.app' },
    { id: 'site-5', name: 'Sydney SEO Terminal', domain: 'syd-seo-terminal.netlify.app' }
  ];

  const getStatus = (siteId) => {
    if (!simulationState) return 'idle';
    if (simulationState.status === 'idle') return 'idle';
    if (simulationState.status === 'running') return 'queued';
    
    // During deploying phase:
    const step = simulationState.step;
    if (step >= 9) return 'completed'; // Deployed

    const siteIdx = defaultSites.findIndex(s => s.id === siteId);
    // Simulate staggered deploy
    if (step >= 5 + siteIdx) return 'completed';
    if (step >= 4 + siteIdx) return 'building';
    return 'queued';
  };

  const getProgress = (status) => {
    if (status === 'completed') return 100;
    if (status === 'building') return 60;
    if (status === 'queued') return 15;
    return 0;
  };

  const getLogs = (siteName, status) => {
    if (status === 'idle') {
      return [
        `[system] Ready for pipeline deployment.`,
        `[system] Waiting for Claude generator trigger...`
      ];
    }
    if (status === 'queued') {
      return [
        `[pipeline] Queue slot reserved for ${siteName}`,
        `[pipeline] Waiting for article compilation logs...`
      ];
    }
    if (status === 'building') {
      return [
        `[git] Fetching latest main commits...`,
        `[npm] Installing production bundle...`,
        `[vite] Optimizing assets & chunks...`,
        `[system] Formatting markdown file outputs...`,
        `[builder] Running SEO static site generation...`
      ];
    }
    return [
      `[git] Fetching latest main commits...`,
      `[npm] Installing production bundle...`,
      `[vite] Optimizing assets & chunks...`,
      `[system] Formatting markdown file outputs...`,
      `[builder] Running SEO static site generation...`,
      `[netlify] Deploying to Global Edge CDN...`,
      `[netlify] Cache validated successfully.`,
      `[system] Deployment completed! Site is now active.`
    ];
  };

  const toggleExpand = (id) => {
    if (expandedSite === id) {
      setExpandedSite(null);
    } else {
      setExpandedSite(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-5 rounded-xl border border-white/10 bg-[#121214]/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
            Global Funnel Overview
          </div>
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            {activeSim ? (
              <>
                <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                <span>Active Pipeline: {simulationState.keyword}</span>
              </>
            ) : history.length > 0 ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#e4f35b]" />
                <span>All Funnels Sync&#39;d: {history[0].keyword}</span>
              </>
            ) : (
              <>
                <Server className="w-4 h-4 text-zinc-500" />
                <span>System Idle. Ready to deploy</span>
              </>
            )}
          </h3>
        </div>

        <div className="flex gap-3">
          <div className="px-3.5 py-1.5 rounded bg-zinc-800/80 border border-white/5 text-[11px] font-mono text-zinc-400">
            Funnels: 5 / 5
          </div>
          <div className="px-3.5 py-1.5 rounded bg-zinc-800/80 border border-white/5 text-[11px] font-mono text-zinc-400">
            CDN: Netlify Edge
          </div>
        </div>
      </div>

      {/* Sites Stack */}
      <div className="space-y-4">
        {defaultSites.map((site) => {
          const status = getStatus(site.id);
          const progress = getProgress(status);
          const isExpanded = expandedSite === site.id;
          
          return (
            <div 
              key={site.id} 
              className={`rounded-xl border transition-all ${
                isExpanded ? 'border-white/20 bg-zinc-900/60' : 'border-white/10 bg-[#121214]/40'
              }`}
            >
              {/* Site Header Row */}
              <div 
                onClick={() => toggleExpand(site.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors select-none min-h-[64px]"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg ${
                    status === 'completed' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : status === 'building' 
                        ? 'bg-indigo-500/10 text-indigo-400' 
                        : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-100">{site.name}</h4>
                    <span className="text-xs text-zinc-500 font-mono">{site.domain}</span>
                  </div>
                </div>

                {/* Status Badge & Progress */}
                <div className="flex items-center gap-6">
                  <div className="w-32 hidden md:block">
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${
                          status === 'completed' 
                            ? 'bg-emerald-500' 
                            : status === 'building' 
                              ? 'bg-indigo-500' 
                              : 'bg-zinc-700'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {status === 'completed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Deployed
                      </span>
                    )}
                    {status === 'building' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 animate-pulse">
                        Building
                      </span>
                    )}
                    {status === 'queued' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-500 border border-zinc-700">
                        Queued
                      </span>
                    )}
                    {status === 'idle' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-850 text-zinc-600 border border-zinc-800">
                        Standby
                      </span>
                    )}

                    <div className="text-zinc-400 hover:text-zinc-200">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Log Details */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-4">
                  <div className="bg-black/80 rounded-lg p-4 font-mono text-[11px] text-zinc-300 leading-relaxed overflow-x-auto space-y-1">
                    {getLogs(site.name, status).map((log, lIdx) => (
                      <div key={lIdx} className={log.includes('Live') || log.includes('completed!') ? 'text-[#e4f35b]' : 'text-zinc-400'}>
                        {log}
                      </div>
                    ))}
                  </div>

                  {status === 'completed' && (
                    <div className="flex items-center gap-4">
                      <a
                        href={`https://${site.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#e4f35b] hover:underline"
                      >
                        <span>Visit Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
