import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Cpu, 
  Sparkles, 
  MessageSquare,
  Volume2,
  VolumeX,
  Monitor,
  Play,
  Pause,
  ChevronDown,
  Globe,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PROFILE_DATA } from './data';
import { BrandAssistant } from './components/BrandAssistant';
import { MouseFollower } from './components/MouseFollower';
import { WorldClock } from './components/WorldClock';
import { MatrixRain } from './components/MatrixRain';
import { ClickRippleSystem } from './components/ClickRippleSystem';
import { audioSystem } from './utils/audioSystem';
import companyLogo from './assets/images/cyberpunk_minimal_logo_1782104996879.jpg';

// Import newly created tab components
import { HubDashboardTab } from './components/HubDashboardTab';
import { ChannelDirectoryTab } from './components/ChannelDirectoryTab';
import { GearVaultTab } from './components/GearVaultTab';
import { CampaignRatesTab } from './components/CampaignRatesTab';
import { TikTokClipsTab } from './components/TikTokClipsTab';
import { FAQReviewsTab } from './components/FAQReviewsTab';

const TRANSLATIONS = {
  en: {
    tagline: "Tactical FPS Competitor & Minimalist Desk Stylist",
    scrollingTicker: "NEW PARTNERSHIP OPPORTUNITIES OPEN FOR Q4 • SECURE YOUR SPOT NOW •",
    langToggleTooltip: "Switch English/Japanese"
  },
  ja: {
    tagline: "タクティカルFPSプレイヤー ＆ ミニマリストデスクレイアウト",
    scrollingTicker: "Q4新規パートナーシップ募集中 • スロット確保はお早めに •",
    langToggleTooltip: "日本語/英語 切り替え"
  }
};

const teleportVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction * 140,
    skewX: direction * -12,
    scale: 0.96,
    filter: "blur(12px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    skewX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20,
      mass: 0.9,
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -140,
    skewX: direction * 12,
    scale: 0.96,
    filter: "blur(12px)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  })
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ja'>('en');
  const [profile] = useState(INITIAL_PROFILE_DATA);
  const [rgbTheme, setRgbTheme] = useState<'cyberpunk' | 'chroma' | 'toxic' | 'ice' | 'matrix'>('cyberpunk');
  const [isMuted, setIsMuted] = useState(true);
  const [likesCount, setLikesCount] = useState(8.2);
  const [activeMainTab, setActiveMainTab] = useState<'hub' | 'gear' | 'campaign' | 'clips' | 'links' | 'info'>('hub');
  const [slideDirection, setSlideDirection] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Sync initial mute state from localstorage configuration
  useEffect(() => {
    setIsMuted(audioSystem.getMutedState());
  }, []);

  const changeTab = (newTab: 'hub' | 'gear' | 'campaign' | 'clips' | 'links' | 'info') => {
    const tabsOrder: ('hub' | 'gear' | 'campaign' | 'clips' | 'links' | 'info')[] = [
      'hub', 'gear', 'campaign', 'clips', 'links', 'info'
    ];
    const currentIdx = tabsOrder.indexOf(activeMainTab);
    const newIdx = tabsOrder.indexOf(newTab);
    if (newIdx === currentIdx) return;

    let diff = newIdx - currentIdx;
    if (Math.abs(diff) > tabsOrder.length / 2) {
      diff = -diff;
    }

    setSlideDirection(diff > 0 ? 1 : -1);
    setActiveMainTab(newTab);
  };

  const toggleAutoScroll = () => {
    audioSystem.playClick();
    setIsAutoScrolling(!isAutoScrolling);
  };

  // Auto-cycling tabs when Auto-Scroll Tour (now Tab Cycle Tour) is active
  useEffect(() => {
    if (!isAutoScrolling) return;

    const tabsOrder: ('hub' | 'gear' | 'campaign' | 'clips' | 'links' | 'info')[] = [
      'hub', 'gear', 'campaign', 'clips', 'links', 'info'
    ];

    const interval = setInterval(() => {
      const currentIndex = tabsOrder.indexOf(activeMainTab);
      const nextIndex = (currentIndex + 1) % tabsOrder.length;
      audioSystem.playScroll();
      changeTab(tabsOrder[nextIndex]);
    }, 4500); // cycle every 4.5 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, activeMainTab]);

  const handleLikeBump = () => {
    setLikesCount(prev => parseFloat((prev + 0.1).toFixed(1)));
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200 theme-${rgbTheme} rgb-grid transition-colors duration-500`}>
      
      {/* Dynamic Cyber RGB Underglow Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] z-50 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        style={{ 
          background: 'linear-gradient(90deg, var(--neon-color-1), var(--neon-color-2))',
          boxShadow: '0 0 10px var(--neon-color-1)'
        }}
      />

      {/* Frosted Mesh Blobs background */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none mesh-glow-1 transition-all duration-1000"
        style={{ backgroundColor: 'var(--neon-color-1)', opacity: 'calc(0.16 * var(--ambient-glow-intensity, 1))' as any }}
      />
      <div 
        className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none mesh-glow-2 transition-all duration-1000"
        style={{ backgroundColor: 'var(--neon-color-2)', opacity: 'calc(0.14 * var(--ambient-glow-intensity, 1))' as any }}
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: 'var(--neon-color-1)', opacity: 'calc(0.08 * var(--ambient-glow-intensity, 1))' as any }}
      />

      {/* Interactive Cyber rain overlay for Matrix mode */}
      {rgbTheme === 'matrix' && <MatrixRain />}

      {/* Futuristic Click Ripple Canvas Component */}
      <ClickRippleSystem rgbTheme={rgbTheme} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 pb-20">
        
        {/* Scrolling Ticker Line */}
        <section className="mb-6 relative h-10 bg-zinc-950/60 border border-white/5 rounded-2xl flex items-center overflow-hidden backdrop-blur-md">
          <div className="absolute left-0 top-0 bottom-0 px-4 bg-zinc-900 border-r border-white/5 flex items-center gap-2 z-10">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#737373] uppercase">AURA HUD</span>
          </div>

          <motion.div 
            className="flex gap-8 whitespace-nowrap pl-40"
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear"
            }}
          >
            <div className="flex gap-8 shrink-0">
              {Array(4).fill(TRANSLATIONS[lang].scrollingTicker).map((text, idx) => (
                <button
                  key={`ticker-1-${idx}`}
                  onClick={(e) => {
                    e.preventDefault();
                    audioSystem.playClick();
                    changeTab('campaign');
                  }}
                  className="hover:underline flex items-center gap-2 text-zinc-300 hover:text-white transition-all cursor-pointer bg-transparent border-none outline-none"
                  onMouseEnter={() => audioSystem.playHover()}
                >
                  <span className="animate-pulse" style={{ color: 'var(--neon-color-1)', textShadow: '0 0 6px var(--neon-color-1)' }}>⚡</span>
                  <span className="font-mono tracking-widest">{text}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-8 shrink-0" aria-hidden="true">
              {Array(4).fill(TRANSLATIONS[lang].scrollingTicker).map((text, idx) => (
                <button
                  key={`ticker-2-${idx}`}
                  onClick={(e) => {
                    e.preventDefault();
                    audioSystem.playClick();
                    changeTab('campaign');
                  }}
                  className="hover:underline flex items-center gap-2 text-zinc-300 hover:text-white transition-all cursor-pointer bg-transparent border-none outline-none"
                  onMouseEnter={() => audioSystem.playHover()}
                >
                  <span className="animate-pulse" style={{ color: 'var(--neon-color-1)', textShadow: '0 0 6px var(--neon-color-1)' }}>⚡</span>
                  <span className="font-mono tracking-widest">{text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Global Main Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-white/5 relative z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                audioSystem.playClick();
                changeTab('hub');
              }}
              className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center p-1 overflow-hidden hover:border-purple-500/50 transition-all hover:bg-white/5 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.1)]"
              onMouseEnter={() => audioSystem.playHover()}
            >
              <img 
                src={companyLogo} 
                alt="Sammium Tech Industries" 
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </button>
            <div className="text-left">
              <h1 
                onClick={() => {
                  audioSystem.playClick();
                  changeTab('hub');
                }}
                className="text-lg font-bold tracking-tight uppercase hover:text-purple-400 transition-colors cursor-pointer"
              >
                {profile.displayName} <span className="text-xs text-zinc-500 font-mono font-normal">v2.4.0</span>
              </h1>
              <p className="text-xs text-[#737373] tracking-widest font-mono uppercase">{TRANSLATIONS[lang].tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            
            {/* World Clocks widget inline */}
            <WorldClock />

            {/* Futuristic Theme presets */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-950/60 border border-white/5 rounded-full">
              {(['cyberpunk', 'chroma', 'toxic', 'ice', 'matrix'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    audioSystem.playClick();
                    setRgbTheme(t);
                  }}
                  onMouseEnter={() => audioSystem.playHover()}
                  className={`w-5 h-5 rounded-full transition-all hover:scale-110 cursor-pointer ${
                    rgbTheme === t ? 'ring-2 ring-white scale-105 shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'opacity-60'
                  }`}
                  style={{
                    background: t === 'cyberpunk' ? 'linear-gradient(135deg, #a855f7, #3b82f6)' :
                                t === 'chroma' ? 'linear-gradient(135deg, #ec4899, #f59e0b)' :
                                t === 'toxic' ? 'linear-gradient(135deg, #10b981, #f59e0b)' :
                                t === 'ice' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' :
                                'linear-gradient(135deg, #22c55e, #14532d)'
                  }}
                  title={`Change theme to ${t}`}
                />
              ))}
            </div>

            {/* Language toggle trigger with tooltip */}
            <button
              onClick={() => {
                audioSystem.playClick();
                setLang(lang === 'en' ? 'ja' : 'en');
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs tracking-wider font-mono hover:bg-white/10 transition-all cursor-pointer"
              title={TRANSLATIONS[lang].langToggleTooltip}
            >
              <Globe size={14} className="inline mr-1" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Sound Control state trigger */}
            <button
              onClick={() => {
                const updated = !isMuted;
                setIsMuted(updated);
                audioSystem.toggleMute();
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isMuted 
                  ? 'bg-zinc-950/40 border-white/5 text-zinc-500' 
                  : 'bg-white/10 border-purple-500/30 text-purple-400'
              }`}
              title={isMuted ? "Unmute system" : "Mute system"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            {/* Tab Cycle / Autoplay Tour Trigger */}
            <button
              onClick={toggleAutoScroll}
              onMouseEnter={() => audioSystem.playHover()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold font-mono border transition-all active:scale-95 cursor-pointer ${
                isAutoScrolling 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_10px_var(--neon-color-1)]' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              {isAutoScrolling ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span>{lang === 'ja' ? 'ツアー停止' : 'Stop Tour'}</span>
                  <Pause size={12} className="animate-pulse" />
                </>
              ) : (
                <>
                  <ChevronDown size={14} className="animate-bounce" />
                  <span>{lang === 'ja' ? '自動タブ巡回' : 'Tab Cycle Tour'}</span>
                </>
              )}
            </button>

            <button 
              onClick={() => {
                audioSystem.playClick();
                changeTab('gear');
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className={`text-xs uppercase tracking-widest transition-colors font-semibold bg-transparent border-none cursor-pointer ${
                activeMainTab === 'gear' ? 'text-purple-400 font-bold' : 'text-[#a3a3a3] hover:text-white'
              }`}
            >
              {lang === 'ja' ? '使用ギア' : 'Gear Setup'}
            </button>
            <button 
              onClick={() => {
                audioSystem.playClick();
                changeTab('campaign');
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className={`px-5 py-2.5 border rounded-full backdrop-blur-md text-xs font-semibold uppercase tracking-widest transition-all active:scale-95 cursor-pointer ${
                activeMainTab === 'campaign'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold shadow-[0_0_10px_var(--neon-color-1)]'
                  : 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {lang === 'ja' ? '案件相談' : 'Brand Inquiry'}
            </button>
          </div>
        </header>

        {/* Glowing Tactile Main Tab Navigation */}
        <div className="mb-10 p-1.5 bg-zinc-950/80 border border-white/5 rounded-2xl backdrop-blur-md sticky top-4 z-40 max-w-4xl mx-auto shadow-2xl">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
            {[
              { id: 'hub', label: { en: 'HUD Hub', ja: 'メイン HUD' }, icon: Monitor },
              { id: 'gear', label: { en: 'Gear Vault', ja: '機材スペック' }, icon: Cpu },
              { id: 'campaign', label: { en: 'Campaign Rates', ja: '案件プラン' }, icon: Briefcase },
              { id: 'clips', label: { en: 'Viral Clips', ja: 'ショート動画' }, icon: Tv },
              { id: 'links', label: { en: 'Link Hub', ja: 'リンクハブ' }, icon: Globe },
              { id: 'info', label: { en: 'Reviews & FAQ', ja: '実績 & FAQ' }, icon: MessageSquare }
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeMainTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    audioSystem.playClick();
                    changeTab(tab.id as any);
                  }}
                  onMouseEnter={() => audioSystem.playHover()}
                  className={`relative py-3 px-2 rounded-xl flex flex-col items-center gap-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer border-none bg-transparent ${
                    isActive 
                      ? 'text-slate-900 font-extrabold' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMainTabIndicator"
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--neon-color-1), var(--neon-color-2))',
                        boxShadow: 'var(--neon-glow-1)'
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <IconComponent size={15} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-slate-900' : 'text-zinc-500 hover:text-zinc-300'}`} />
                  <span className="text-center truncate max-w-full">{tab.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence custom={slideDirection} mode="wait">
          <motion.div
            key={activeMainTab}
            custom={slideDirection}
            variants={teleportVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeMainTab === 'hub' && (
              <HubDashboardTab
                lang={lang}
                profile={profile}
                rgbTheme={rgbTheme}
                likesCount={likesCount}
                handleLikeBump={handleLikeBump}
                setActiveMainTab={changeTab}
              />
            )}

            {activeMainTab === 'gear' && (
              <GearVaultTab
                lang={lang}
                profile={profile}
              />
            )}

            {activeMainTab === 'campaign' && (
              <CampaignRatesTab
                lang={lang}
                profile={profile}
              />
            )}

            {activeMainTab === 'clips' && (
              <TikTokClipsTab
                lang={lang}
                profile={profile}
              />
            )}

            {activeMainTab === 'links' && (
              <ChannelDirectoryTab
                lang={lang}
                profile={profile}
                rgbTheme={rgbTheme}
              />
            )}

            {activeMainTab === 'info' && (
              <FAQReviewsTab
                lang={lang}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Area */}
        <footer className="relative border-t border-white/5 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[#737373] text-[10px] uppercase tracking-widest font-mono">
          <div>
            &copy; 2026 {profile.displayName} MEDIA INC &middot; MANAGED BY <span className="text-purple-400">AURA AI</span>
          </div>

          <div className="flex gap-6 items-center">
            <button 
              onClick={() => {
                audioSystem.playClick();
                changeTab('campaign');
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className={`hover:text-white transition-colors cursor-pointer uppercase font-mono bg-transparent border-none ${
                activeMainTab === 'campaign' ? 'text-purple-400 font-bold' : ''
              }`}
            >
              brand deck
            </button>
            <button 
              onClick={() => {
                audioSystem.playClick();
                changeTab('gear');
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className={`hover:text-white transition-colors cursor-pointer uppercase font-mono bg-transparent border-none ${
                activeMainTab === 'gear' ? 'text-purple-400 font-bold' : ''
              }`}
            >
              hardware setup
            </button>
            <a href="mailto:zelop301@gmail.com" className="hover:text-white transition-colors lowercase">zelop301@gmail.com</a>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[9px]">Server status: Live & Active</span>
          </div>
        </footer>

      </div>

      {/* Floating Aura Brand Assistant */}
      <BrandAssistant />

      {/* Interactive Custom Futuristic Cursor Followers */}
      <MouseFollower />
    </div>
  );
}
