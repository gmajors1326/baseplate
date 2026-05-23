import React, { useState } from 'react';
import { LayoutGrid, Sparkles, Check, RefreshCw } from 'lucide-react';

export default function StudioConsole() {
  const [glowColor, setGlowColor] = useState('indigo');
  const [cornerRadius, setCornerRadius] = useState('rounded-xl');
  const [borderOpacity, setBorderOpacity] = useState('border-white/10');

  const colorSwatches = [
    { id: 'indigo', name: 'Deep Indigo', value: 'from-indigo-500/20 to-purple-500/10' },
    { id: 'emerald', name: 'Organic Emerald', value: 'from-emerald-500/20 to-teal-500/10' },
    { id: 'amber', name: 'Industrial Amber', value: 'from-amber-500/20 to-orange-500/10' },
    { id: 'rose', name: 'Cyber Rose', value: 'from-rose-500/20 to-pink-500/10' }
  ];

  const corners = [
    { id: 'rounded-none', name: 'Industrial Sharp' },
    { id: 'rounded-lg', name: 'Subtle Curvature' },
    { id: 'rounded-xl', name: 'Standard Smooth' },
    { id: 'rounded-2xl', name: 'Highly Organic' }
  ];

  const getGlowStyles = () => {
    const sw = colorSwatches.find(c => c.id === glowColor) || colorSwatches[0];
    return sw.value;
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Design System Studio</span>
        <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-[#e4f35b]" />
          <span>Midnight Industrial Variant Generator</span>
        </h3>
      </div>

      {/* Grid containing configuration panel and real-time preview rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Controller panel */}
        <div className="p-5 rounded-xl border border-white/10 bg-[#121214]/50 space-y-6">
          {/* Ambient Lighting selector */}
          <div className="space-y-2.5">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Ambient Lighting Gradient
            </span>
            <div className="grid grid-cols-2 gap-2">
              {colorSwatches.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setGlowColor(color.id)}
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between min-h-[44px] transition-all ${
                    glowColor === color.id
                      ? 'border-[#e4f35b] bg-[#e4f35b]/5 text-zinc-100'
                      : 'border-white/5 bg-black/20 text-zinc-400 hover:bg-black/40'
                  }`}
                >
                  <span>{color.name}</span>
                  {glowColor === color.id && <Check className="w-3.5 h-3.5 text-[#e4f35b]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Curvature selector */}
          <div className="space-y-2.5">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Corner Curvature Type
            </span>
            <div className="grid grid-cols-2 gap-2">
              {corners.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCornerRadius(c.id)}
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between min-h-[44px] transition-all ${
                    cornerRadius === c.id
                      ? 'border-[#e4f35b] bg-[#e4f35b]/5 text-zinc-100'
                      : 'border-white/5 bg-black/20 text-zinc-400 hover:bg-black/40'
                  }`}
                >
                  <span>{colorSwatches.some(col => col.id === c.id) ? colorSwatches.find(col => col.id === c.id).name : c.name}</span>
                  {cornerRadius === c.id && <Check className="w-3.5 h-3.5 text-[#e4f35b]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Surface Border Opacity */}
          <div className="space-y-2.5">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Surface Border Intensity
            </span>
            <div className="flex gap-2">
              {[
                { id: 'border-white/5', name: 'Very Muted' },
                { id: 'border-white/10', name: 'Standard (10%)' },
                { id: 'border-white/20', name: 'High Contrast' }
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBorderOpacity(b.id)}
                  className={`flex-1 p-3 rounded-lg border text-xs font-semibold min-h-[44px] transition-all ${
                    borderOpacity === b.id
                      ? 'border-[#e4f35b] bg-[#e4f35b]/5 text-zinc-100'
                      : 'border-white/5 bg-black/20 text-zinc-400 hover:bg-black/40'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Mockup Render Panel */}
        <div className="p-5 rounded-xl border border-white/10 bg-black/20 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
          {/* Simulated Ambient Gradient Blur */}
          <div className={`absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr ${getGlowStyles()} blur-[70px] opacity-30 pointer-events-none transition-all duration-700`}></div>
          <div className="absolute bottom-[10%] left-[-15%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-zinc-700/5 to-white/5 blur-[50px] pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#e4f35b] shrink-0" />
              <span>Real-Time Style Preview</span>
            </div>

            {/* Mock Card Rendering */}
            <div className={`p-5 border bg-white/5 backdrop-blur-md transition-all duration-300 ${cornerRadius} ${borderOpacity}`}>
              <h4 className="text-xs font-mono text-zinc-400 uppercase mb-1">Preview Terminal</h4>
              <p className="text-sm font-bold text-zinc-100">Midnight Industrial Console Card</p>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                This container reflects the chosen curvature, border intensity, and ambient lighting glow set on the left configurations.
              </p>
              
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-[#e4f35b] text-zinc-950 font-bold text-[10px] uppercase tracking-wider min-h-[34px] shadow-sm"
                >
                  Select Active
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded border border-white/10 bg-white/5 text-zinc-300 text-[10px] uppercase tracking-wider min-h-[34px]"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Theme specifications footer */}
          <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-zinc-500">
            <span>CORNER: {cornerRadius.toUpperCase()}</span>
            <span>BORDER: {borderOpacity.replace('border-white/', '')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
