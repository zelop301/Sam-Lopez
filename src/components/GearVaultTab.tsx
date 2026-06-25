import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, MousePointer, Volume2, Monitor } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface GearVaultTabProps {
  lang: 'en' | 'ja';
  profile: any;
}

const TRANSLATIONS = {
  en: {
    gearVaultTitle: "GEAR VAULT & SETUP SPECS",
    gearVaultSub: "Highly optimized streaming, processing, and acoustics arsenal curated for daily short-form and gameplay content."
  },
  ja: {
    gearVaultTitle: "配信機材 ＆ PCスペック",
    gearVaultSub: "最高の画質・キースイッチ音響を追求した、フルスタックゲーミング周辺システムと処理ステーション。"
  }
};

interface CircularGaugeProps {
  percentage: number;
  label: string;
  color: string;
  trailColor?: string;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({
  percentage,
  label,
  color,
  trailColor = "rgba(255, 255, 255, 0.04)"
}) => {
  const radius = 14;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius; // ~87.96
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r={radius}
            className="fill-none"
            stroke={trailColor}
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx="18"
            cy="18"
            r={radius}
            className="fill-none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
          />
        </svg>
        <span className="text-[8px] font-mono font-bold text-zinc-300 mt-0.5">
          {percentage}%
        </span>
      </div>
      <span className="text-[7px] font-mono tracking-wider uppercase text-zinc-500 font-black mt-1">
        {label}
      </span>
    </div>
  );
};

export const GearVaultTab: React.FC<GearVaultTabProps> = ({
  lang,
  profile
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'PC Specification' | 'Peripheral' | 'Audio/Video' | 'Workspace'>('all');

  const filteredGear = selectedCategory === 'all'
    ? profile.gear
    : profile.gear.filter((item: any) => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">{TRANSLATIONS[lang].gearVaultTitle}</h2>
          <p className="text-sm text-zinc-400">{TRANSLATIONS[lang].gearVaultSub}</p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 relative z-10 p-1 bg-zinc-950/50 rounded-2xl border border-white/5">
          {(['all', 'PC Specification', 'Peripheral', 'Audio/Video', 'Workspace'] as const).map((cat) => {
            const catLabels: Record<string, { en: string; ja: string }> = {
              'all': { en: 'show all gear', ja: '全機材表示' },
              'PC Specification': { en: 'PC specs', ja: 'PCスペック' },
              'Peripheral': { en: 'peripherals', ja: '周辺デバイス' },
              'Audio/Video': { en: 'audio & video', ja: '音響・映像機材' },
              'Workspace': { en: 'workspace', ja: 'デスク周辺' }
            };
            const finalLabel = catLabels[cat]?.[lang] || cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioSystem.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => audioSystem.playHover()}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all uppercase cursor-pointer select-none border-none bg-transparent ${
                  selectedCategory === cat
                    ? 'text-black font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeGearCatIndicator"
                    className="absolute inset-0 rounded-xl -z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--neon-color-1), var(--neon-color-2))',
                      boxShadow: '0 0 10px var(--neon-color-1)'
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{finalLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of hardware list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGear.map((item: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover="hover"
              onClick={() => {
                audioSystem.playSuccess();
              }}
              onMouseEnter={() => audioSystem.playHover()}
              key={item.id}
              className="rounded-2xl bg-[#090909]/60 backdrop-blur-2xl border border-white/5 p-5 flex items-center justify-between gap-4 transition-all duration-300 group cursor-pointer relative overflow-hidden text-left"
            >
              {/* Subtle inner glow on hover using Framer Motion */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
                variants={{
                  hover: {
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    boxShadow: 'inset 0 0 20px var(--neon-color-1)',
                    opacity: 0.28
                  }
                }}
                initial={{ borderColor: 'transparent', boxShadow: 'inset 0 0 0px var(--neon-color-1)', opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ border: '1px solid transparent' }}
              />

              <div className="flex items-center gap-4 flex-1 min-w-0 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-105 transition-transform relative z-10">
                  {item.category === 'PC Specification' && <Cpu size={20} className="text-purple-400" />}
                  {item.category === 'Peripheral' && <MousePointer size={20} className="text-teal-400" />}
                  {item.category === 'Audio/Video' && <Volume2 size={20} className="text-blue-400" />}
                  {item.category === 'Workspace' && <Monitor size={20} className="text-pink-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-purple-400/90 font-mono block mb-0.5">
                    {lang === 'ja'
                      ? (item.category === 'PC Specification' ? 'PCスペック'
                        : item.category === 'Peripheral' ? '周辺デバイス'
                        : item.category === 'Audio/Video' ? '音響・映像機材'
                        : 'デスク周辺')
                      : item.category
                    }
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white truncate">{item.name}</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed bg-[#030303]/60 px-2 py-1 rounded border border-white/5 font-mono truncate">{item.spec}</p>
                </div>
              </div>

              {/* Hardware Usage & Maintenance Status circular indicators */}
              <div className="flex shrink-0 items-center gap-3 relative z-10 pl-3 border-l border-white/5">
                <CircularGauge 
                  percentage={item.usagePercent || 45} 
                  label={lang === 'ja' ? '負荷' : 'LOAD'} 
                  color="var(--neon-color-1, #a855f7)" 
                />
                <CircularGauge 
                  percentage={item.maintenanceStatus || 90} 
                  label={lang === 'ja' ? '状態' : 'HEALTH'} 
                  color="#14b8a6" 
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
