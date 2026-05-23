import React from 'react';
import { ShieldCheck, HardHat, Columns, ToggleLeft, Award, EyeOff } from 'lucide-react';

export default function SkillTab() {
  const sections = [
    {
      title: 'Midnight Industrial Design System',
      icon: HardHat,
      color: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
      rules: [
        { label: 'Base Colors', desc: 'Deep, dark organic bases (e.g. bg-zinc-950, bg-[#0a0a0c]).' },
        { label: 'Typography', desc: 'High-contrast white (text-zinc-50) for headers/active states; muted slates (text-zinc-400) for secondary details.' },
        { label: 'Ambient Lighting', desc: 'Subtle, low-opacity, heavily blurred background gradients using fixed absolute divs (blur-[120px] opacity-20).' },
        { label: 'Surfaces', desc: 'Cards and workspaces styled with bg-white/5 and 1px borders (border-white/10).' },
        { label: 'Touch Targets', desc: 'Gloved-hand navigation: large buttons/toggles with generous padding (p-4) and min-height (min-h-[48px]).' }
      ]
    },
    {
      title: 'Strict Content & Execution Rules',
      icon: ShieldCheck,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      rules: [
        { label: 'Zero Branding', desc: 'The application UI, mock logs, and source codes must remain completely unbranded.' },
        { label: 'Banned Terms', desc: 'Absolutely no usage of "The Calm Content Method" or "The Calm Content Companion" in codes, comments, or views.' },
        { label: 'No Hashtags', desc: 'Mock bios, feed updates, or text logs must strictly exclude hashtags. Use emojis or link references.' }
      ]
    },
    {
      title: 'Layout & Viewport Constraints',
      icon: Columns,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
      rules: [
        { label: 'Viewport lock', desc: 'The shell utilizes the full viewport (h-screen w-screen) with a fixed-width left sidebar (w-64).' },
        { label: 'Internal Scrollbars', desc: 'Strictly prohibited inside small widgets or inner cards. Only standard full-page scrolling is allowed.' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#121214]/50 select-none">
        <Award className="w-5 h-5 text-[#e4f35b] shrink-0" />
        <div className="text-xs font-semibold text-zinc-300">
          This developer console executes using rules defined in <code className="text-[#e4f35b] font-mono">SKILL.md</code>.
        </div>
      </div>

      {/* Grid of Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={idx} className={`p-5 rounded-xl border ${sec.color} flex flex-col space-y-4`}>
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-bold text-zinc-100">{sec.title}</h4>
              </div>

              <div className="space-y-3.5 flex-1">
                {sec.rules.map((rule, rIdx) => (
                  <div key={rIdx} className="space-y-1 text-xs">
                    <span className="font-bold text-zinc-200 block">{rule.label}</span>
                    <span className="text-zinc-400 leading-relaxed block">{rule.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Banned Terms Alert Card */}
        <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5 flex flex-col space-y-3">
          <div className="flex items-center gap-3 text-red-400">
            <EyeOff className="w-5 h-5 shrink-0" />
            <h4 className="text-sm font-bold text-zinc-100">Banned Terms & Safety Check</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The safety scanner monitors all inputs and simulated logs to suppress banned terms and hashtags. The system enforces strict compliance with these content blocks during runtime execution.
          </p>
          <div className="p-3 bg-black/60 rounded border border-white/5 font-mono text-[10px] text-zinc-500 space-y-1">
            <div>BANNED: &quot;The Calm Content Method&quot;</div>
            <div>BANNED: &quot;The Calm Content Companion&quot;</div>
            <div>HASHTAGS: EXCLUDED (replaced by pointers)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
