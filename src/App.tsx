import React, { useState, useEffect, useRef } from 'react';
import { 
  Tv, 
  Gamepad2, 
  Youtube, 
  Instagram, 
  Facebook,
  Briefcase, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  Trash2, 
  Send,
  MessageSquare,
  Volume2,
  VolumeX,
  Monitor,
  MousePointer,
  Heart,
  TrendingUp,
  Inbox,
  UserCheck,
  Play,
  Pause,
  ChevronDown,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PROFILE_DATA } from './data';
import { SocialLink, GamingGear, BusinessInquiry, TikTokClip } from './types';
import { BrandAssistant } from './components/BrandAssistant';
import { MouseFollower } from './components/MouseFollower';
import { AudioVisualizer } from './components/AudioVisualizer';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { TikTokQrPopover } from './components/TikTokQrPopover';
import { WorldClock } from './components/WorldClock';
import { MatrixRain } from './components/MatrixRain';
import { ClickRippleSystem } from './components/ClickRippleSystem';
import { SponsorPerkBuilder } from './components/SponsorPerkBuilder';
import { CreatorKitWidget } from './components/CreatorKitWidget';
import { audioSystem } from './utils/audioSystem';

const TRANSLATIONS = {
  en: {
    tagline: "Tactical FPS Competitor & Minimalist Desk Stylist",
    bio: "Crafting beautiful desk aesthetics, mechanical keyboard acoustics, and securing headshots in Valorant & Apex Legends on TikTok. Bridging mechanical precision with premium brand sponsorships.",
    tiktokPartner: "TikTok Partner & Setup Customizer",
    mediaStatsTitle: "Media Statistics",
    impactFeedBadge: "Live Impact Feed",
    scrollingTicker: "NEW PARTNERSHIP OPPORTUNITIES OPEN FOR Q4 • SECURE YOUR SPOT NOW •",
    langToggleTooltip: "Switch English/Japanese",
    heroBadge: "Available for Q3-Q4 Sponsorship Campaigns",
    heroTitleAesthetic: "AESTHETIC",
    heroTitleGaming: "GAMING",
    heroTitlePartner: "& PREMIUM BRAND PARTNER",
    negotiateBtn: "NEGOTIATE CAMPAIGN",
    previewClipsBtn: "PREVIEW LATEST CLIPS",
    followersLabel: "TikTok Followers",
    likesLabel: "TikTok Likes",
    monthlyReachLabel: "Monthly Reach",
    engagementRateLabel: "Engagement Rate",
    brandsCompletedLabel: "24+ Brands Completed",
    brandsSpanLabel: "spanning desk setups, mechanical switches, hardware setups & esports collaborations.",
    channelsTitle: "Creator Channels / Support Hub",
    channelsSub: "Aesthetic link-in-bio hub. Direct access to gaming streams and media sponsorships.",
    gearVaultTitle: "PC Hardware & Gear Vault",
    gearVaultSub: "Spec-by-spec breakdown of the competitive build and quiet acoustic components.",
    pitchFormTab: "Pitch Collaboration Form",
    receivedLeadsTab: "Received Leads",
    securePortalBadge: "Secure Portal"
  },
  ja: {
    tagline: "タクティカルFPSプレイヤー ＆ ミニマリストデスクレイアウト",
    bio: "TikTokで洗練されたデスク環境やメカニカルキーボード、そしてValorantやApex Legendsのクリップを日々投稿しています。機械的な美学とブランドスポンサーの架け橋に。",
    tiktokPartner: "TikTok公式パートナー ＆ 配信環境カスタム",
    mediaStatsTitle: "公式メディアパフォーマンスタグ",
    impactFeedBadge: "リアルタイム統計データ",
    scrollingTicker: "Q4新規パートナーシップ募集中 • スロット確保はお早めに •",
    langToggleTooltip: "日本語/英語 切り替え",
    heroBadge: "Q3-Q4 スポンサーシップ募集中",
    heroTitleAesthetic: "美学、極まる",
    heroTitleGaming: "ゲーミング",
    heroTitlePartner: " ＆ プレミアムブランド・パートナー",
    negotiateBtn: "キャンペーン提携交渉",
    previewClipsBtn: "最新配信クリップ",
    followersLabel: "フォロワー数",
    likesLabel: "総いいね数",
    monthlyReachLabel: "月間リーチ数",
    engagementRateLabel: "エンゲージ率",
    brandsCompletedLabel: "コラボ実績24ブランド以上",
    brandsSpanLabel: "カスタムキーボード、キースイッチ音響、デスクセットアップ、eスポーツ機器の案件実績等。",
    channelsTitle: "クリエイター活動チャンネル / サポートハブ",
    channelsSub: "洗練されたマルチリンク一覧。SNSやゲーム配信、スポンサー提案はこちらから。",
    gearVaultTitle: "使用デバイス機材 ＆ PC構成ボルト",
    gearVaultSub: "最高峰の競技FPSビルドと、耳を癒やす極上のキーボード打鍵音を誇る機材リスト。",
    pitchFormTab: "コラボ相談・案件提案フォーム",
    receivedLeadsTab: "受信お問合せ一覧",
    securePortalBadge: "暗号化接続中"
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ja'>('en');
  const [profile] = useState(INITIAL_PROFILE_DATA);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'PC Specification' | 'Peripheral' | 'Audio/Video' | 'Workspace'>('all');
  const [activeTab, setActiveTab] = useState<'media-kit' | 'inquiries' | 'setup-tour'>('media-kit');
  const [rgbTheme, setRgbTheme] = useState<'cyberpunk' | 'chroma' | 'toxic' | 'ice' | 'matrix'>('cyberpunk');
  const [isMuted, setIsMuted] = useState(true);

  // Sync initial mute state from localstorage configuration
  useEffect(() => {
    setIsMuted(audioSystem.getMutedState());
  }, []);
  
  // Storage for inquiries
  const [inquiries, setInquiries] = useState<BusinessInquiry[]>([]);
  
  // Stats animation/hover states
  const [likesCount, setLikesCount] = useState(8.2);

  // Form states
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('$1,000 - $2,500 USD');
  const [packageType, setPackageType] = useState('Standard TikTok Video (60s)');
  const [pitch, setPitch] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState<string[]>([]);
  const [customTotalBudget, setCustomTotalBudget] = useState<number>(0);

  // Auto-scrolling to Gear Vault Section
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollIntervalRef = useRef<number | null>(null);

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current !== null) {
      cancelAnimationFrame(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    setIsAutoScrolling(false);
  };

  const startAutoScroll = () => {
    const targetElement = document.getElementById('sec-gear');
    if (!targetElement) return;

    setIsAutoScrolling(true);

    const scrollStep = () => {
      const targetElementCurrent = document.getElementById('sec-gear');
      if (!targetElementCurrent) {
        stopAutoScroll();
        return;
      }
      const targetY = targetElementCurrent.getBoundingClientRect().top + window.scrollY - 80;
      const currentY = window.scrollY;

      // Check if we reached the target position (with 5px buffer)
      if (currentY >= targetY - 5) {
        stopAutoScroll();
        return;
      }

      // Check if we reached the end of document (cannot scroll further)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        stopAutoScroll();
        return;
      }

      // Scroll down slowly (e.g. 1.2px per frame)
      window.scrollTo(0, currentY + 1.2);

      scrollIntervalRef.current = requestAnimationFrame(scrollStep);
    };

    scrollIntervalRef.current = requestAnimationFrame(scrollStep);
  };

  const toggleAutoScroll = () => {
    audioSystem.playClick();
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      audioSystem.playScroll();
      startAutoScroll();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current !== null) {
        cancelAnimationFrame(scrollIntervalRef.current);
      }
    };
  }, []);

  // Listen to manual scroll events to stop the auto-scroll smoothly on user intervention
  useEffect(() => {
    if (!isAutoScrolling) return;

    const handleManualInterruption = () => {
      stopAutoScroll();
    };

    window.addEventListener('wheel', handleManualInterruption, { passive: true });
    window.addEventListener('touchmove', handleManualInterruption, { passive: true });
    window.addEventListener('mousedown', handleManualInterruption, { passive: true });
    window.addEventListener('keydown', handleManualInterruption, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleManualInterruption);
      window.removeEventListener('touchmove', handleManualInterruption);
      window.removeEventListener('mousedown', handleManualInterruption);
      window.removeEventListener('keydown', handleManualInterruption);
    };
  }, [isAutoScrolling]);

  // Load inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('zelo_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading saved inquiries", e);
      }
    } else {
      // Seed initial dummy inquiry
      const seed: BusinessInquiry[] = [
        {
          id: 'seed-1',
          brandName: 'Viper Esports Gear',
          contactName: 'Marcus Kane',
          email: 'collab@vipergear.io',
          budget: '$2,500 USD',
          packageType: 'Monthly Brand Ambassadorship',
          pitch: 'We love your custom mechanical keyboard highlights and Radiant Valorant clip aesthetics. We would love to sponsor a multi-channel video campaign featuring our premium desk pads and customizable gaming wrist rests in your upcoming setups.',
          status: 'Reviewing',
          date: '2026-06-20'
        }
      ];
      setInquiries(seed);
      localStorage.setItem('zelo_inquiries', JSON.stringify(seed));
    }
  }, []);

  // Save new inquiry
  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !contactName || !email || !pitch) return;

    const finalBudget = selectedPerks.length > 0 
      ? `$${customTotalBudget} USD` 
      : budget;

    const newInquiry: BusinessInquiry = {
      id: `inq-${Date.now()}`,
      brandName,
      contactName,
      email,
      budget: finalBudget,
      packageType,
      pitch,
      status: 'Received',
      date: new Date().toISOString().split('T')[0],
      selectedPerks: selectedPerks.length > 0 ? selectedPerks : undefined
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('zelo_inquiries', JSON.stringify(updated));

    // Clear form
    setBrandName('');
    setContactName('');
    setEmail('');
    setPitch('');
    setSelectedPerks([]);
    setCustomTotalBudget(0);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = inquiries.filter(i => i.id !== id);
    setInquiries(filtered);
    localStorage.setItem('zelo_inquiries', JSON.stringify(filtered));
  };

  // Helper filter for gear
  const filteredGear = selectedCategory === 'all' 
    ? profile.gear 
    : profile.gear.filter(g => g.category === selectedCategory);

  // Trigger a like bump visual trick
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
        style={{ backgroundColor: 'var(--neon-color-1)', opacity: 0.16 }}
      />
      <div 
        className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none mesh-glow-2 transition-all duration-1000"
        style={{ backgroundColor: 'var(--neon-color-2)', opacity: 0.14 }}
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: 'var(--neon-color-1)', opacity: 0.08 }}
      />

      {/* Holographic Matrix Falling Code Rain Overlay */}
      <MatrixRain isActive={rgbTheme === 'matrix'} />

      {/* Cyberpunk Interactive Retro Click System */}
      <ClickRippleSystem />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">

        {/* Neon Partnership Opportunity Marquee Ticker */}
        <div className="w-full overflow-hidden bg-black/50 border border-white/5 rounded-2xl py-2 px-4 mb-6 relative flex items-center group backdrop-blur-md">
          {/* Subtle neon accents */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex whitespace-nowrap gap-8 text-[10px] font-mono font-bold uppercase tracking-widest"
            animate={{ x: [0, "-50%"] }}
            transition={{
              ease: "linear",
              duration: 16,
              repeat: Infinity
            }}
          >
            <div className="flex gap-8 shrink-0">
              {Array(4).fill(TRANSLATIONS[lang].scrollingTicker).map((text, idx) => (
                <a
                  key={`ticker-1-${idx}`}
                  href="#sec-pitch"
                  onClick={(e) => {
                    e.preventDefault();
                    audioSystem.playClick();
                    audioSystem.playScroll();
                    document.getElementById('sec-pitch')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:underline flex items-center gap-2 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  onMouseEnter={() => audioSystem.playHover()}
                >
                  <span className="animate-pulse" style={{ color: 'var(--neon-color-1)', textShadow: '0 0 6px var(--neon-color-1)' }}>⚡</span>
                  <span className="font-mono tracking-widest">{text}</span>
                </a>
              ))}
            </div>
            <div className="flex gap-8 shrink-0" aria-hidden="true">
              {Array(4).fill(TRANSLATIONS[lang].scrollingTicker).map((text, idx) => (
                <a
                  key={`ticker-2-${idx}`}
                  href="#sec-pitch"
                  onClick={(e) => {
                    e.preventDefault();
                    audioSystem.playClick();
                    audioSystem.playScroll();
                    document.getElementById('sec-pitch')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:underline flex items-center gap-2 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  onMouseEnter={() => audioSystem.playHover()}
                >
                  <span className="animate-pulse" style={{ color: 'var(--neon-color-1)', textShadow: '0 0 6px var(--neon-color-1)' }}>⚡</span>
                  <span className="font-mono tracking-widest">{text}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dynamic Glowing Header Banner */}
        <header className="flex flex-col md:flex-row items-center justify-between py-6 mb-12 border-b border-white/5 gap-6 relative">
          <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
            <div className="flex items-center gap-4">
              {/* Custom glowing interactive brand logo */}
              <div className="relative group cursor-pointer" onClick={handleLikeBump}>
                <div 
                  className="absolute -inset-1.5 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
                  style={{ background: 'linear-gradient(to r, var(--neon-color-1), var(--neon-color-2))' }}
                ></div>
                <div 
                  className="relative w-12 h-12 bg-[#0d0d0d] rounded-xl border flex items-center justify-center font-black text-xl tracking-widest shadow-2xl transition-all duration-500"
                  style={{ borderColor: 'var(--neon-color-1)', color: 'var(--neon-color-1)', boxShadow: 'var(--neon-glow-1)' }}
                >
                  Z
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold tracking-tighter uppercase font-mono">
                  {profile.displayName}<span className="text-neon-gradient">_GAMING</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--neon-color-1)' }}></span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                    {TRANSLATIONS[lang].tiktokPartner}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic World Clock displaying Zelo's timezone availability */}
            <WorldClock theme={rgbTheme} />
          </div>

          {/* Interactive Mechanical Switch Theme Selector */}
          <div className="flex flex-col items-center md:items-end gap-1.5 bg-zinc-950/90 border border-white/5 p-2 rounded-2xl backdrop-blur-md">
            <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono font-bold flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: 'var(--neon-color-1)' }} />
              Chroma Setup Customizer
            </span>
            <div className="flex gap-1">
              {[
                { id: 'cyberpunk', label: 'CYBER', color: 'bg-cyan-400', glow: 'shadow-cyan-400/50', activeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20' },
                { id: 'chroma', label: 'CHROMA', color: 'bg-rose-500', glow: 'shadow-rose-500/50', activeColor: 'text-rose-400 border-rose-500/30 bg-rose-950/20' },
                { id: 'toxic', label: 'TOXIC', color: 'bg-green-400', glow: 'shadow-green-400/50', activeColor: 'text-green-400 border-green-500/30 bg-green-950/20' },
                { id: 'ice', label: 'ICE', color: 'bg-blue-400', glow: 'shadow-blue-400/50', activeColor: 'text-blue-400 border-blue-500/30 bg-blue-950/20' },
                { id: 'matrix', label: 'MATRIX', color: 'bg-emerald-500', glow: 'shadow-emerald-500/50', activeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20' }
              ].map((theme) => {
                const isActive = rgbTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setRgbTheme(theme.id as any);
                      audioSystem.playClick();
                    }}
                    onMouseEnter={() => audioSystem.playHover()}
                    className={`relative px-2 py-1 text-[9px] font-mono tracking-wider transition-all duration-300 rounded border cursor-pointer flex flex-col items-center gap-1 active:scale-95 ${
                      isActive 
                        ? `${theme.activeColor} font-black`
                        : 'text-zinc-500 hover:text-zinc-300 border-white/5 bg-zinc-900/30'
                    }`}
                    title={`Activate ${theme.label} theme`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${theme.color} ${isActive ? `scale-110 ${theme.glow} shadow-[0_0_8px]` : 'opacity-35 blur-[0.5px]'}`} />
                    <span>{theme.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Global Language Toggle Button with custom animated cyberpunk glow */}
            <div className="flex items-center bg-zinc-950/90 border border-white/5 px-1.5 py-1 rounded-full gap-1 backdrop-blur-md relative z-10" title={TRANSLATIONS[lang].langToggleTooltip}>
              <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest px-2">
                {TRANSLATIONS[lang].langLabel}
              </span>
              <button
                onClick={() => {
                  setLang('en');
                  audioSystem.playClick();
                }}
                onMouseEnter={() => audioSystem.playHover()}
                className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-black shadow-[0_0_10px_var(--neon-color-1)]'
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  setLang('ja');
                  audioSystem.playClick();
                }}
                onMouseEnter={() => audioSystem.playHover()}
                className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                  lang === 'ja'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-black shadow-[0_0_10px_var(--neon-color-1)]'
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                }`}
              >
                JA
              </button>
            </div>

            {/* Global Audio Sound Toggle Button */}
            <button
              onClick={() => {
                const muted = audioSystem.toggleMute();
                setIsMuted(muted);
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className={`relative px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 z-10 ${
                !isMuted
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
              }`}
              style={!isMuted ? { borderColor: 'var(--neon-color-1)', boxShadow: '0 0 10px var(--neon-color-1)' } : {}}
              title={!isMuted ? "Audio ON - Click to Mute Synth FX" : "Audio OFF - Click to Enable Synth FX"}
            >
              {!isMuted ? (
                <>
                  <Volume2 size={13} className="animate-pulse" />
                  <span>Sound ON</span>
                  <span className="flex h-1 w-1 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                  </span>
                </>
              ) : (
                <>
                  <VolumeX size={13} />
                  <span>Sound OFF</span>
                </>
              )}
            </button>

            {/* Gentle Auto-Scroll Showcase Trigger */}
            <button
              onClick={toggleAutoScroll}
              onMouseEnter={() => audioSystem.playHover()}
              className={`relative px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 z-10 ${
                isAutoScrolling
                  ? 'bg-red-500/10 border-red-500/40 text-red-400 font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
              style={isAutoScrolling ? { borderColor: '#ef4444', boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)' } : {}}
              title={isAutoScrolling ? "Stop automated showcase scroll tours" : "Scroll down automatically to Gear Vault"}
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
                  <span>{lang === 'ja' ? '自動スクロール' : 'Auto-Scroll Tour'}</span>
                </>
              )}
            </button>

            <a 
              href="#sec-gear"
              onClick={(e) => {
                e.preventDefault();
                audioSystem.playClick();
                audioSystem.playScroll();
                document.getElementById('sec-gear')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className="text-xs uppercase tracking-widest text-[#a3a3a3] hover:text-white transition-colors font-semibold"
            >
              {lang === 'ja' ? '使用ギア' : 'Gear Setup'}
            </a>
            <a 
              href="#sec-pitch"
              onClick={(e) => {
                e.preventDefault();
                audioSystem.playClick();
                audioSystem.playScroll();
                document.getElementById('sec-pitch')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className="px-5 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-widest hover:bg-white/10 text-slate-100 border-white/20 transition-all active:scale-95"
            >
              {lang === 'ja' ? '案件相談' : 'Brand Inquiry'}
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left intro text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-xs font-mono">
                <Sparkles size={13} />
                <span>{TRANSLATIONS[lang].heroBadge}</span>
              </div>
              
              <motion.h1 
                className="text-5xl sm:text-7xl font-sans font-black tracking-tight leading-[1.0] text-zinc-100 cursor-pointer select-none"
                whileHover={{
                  x: [0, -3, 3, -1, 1, -2, 2, 0],
                  y: [0, 1, -1, 2, -2, 1, -1, 0],
                  skewX: [0, -4, 3, -2, 2, 0],
                  textShadow: [
                    "0 0 0px var(--neon-color-1)",
                    "3px -3px 0px var(--neon-color-1), -3px 3px 0px rgba(236,72,153,0.8)",
                    "-2px 3px 0px var(--neon-color-2), 2px -2px 0px rgba(59,130,246,0.8)",
                    "3px 2px 0px var(--neon-color-1), -3px -1px 0px rgba(168,85,247,0.8)",
                    "0 0 0px var(--neon-color-1)"
                  ],
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
                onMouseEnter={() => {
                  audioSystem.playHover();
                }}
              >
                {TRANSLATIONS[lang].heroTitleAesthetic} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-transparent to-teal-400" style={{WebkitTextStroke: '1px rgba(168, 85, 247, 0.5)'}}>{TRANSLATIONS[lang].heroTitleGaming}</span> <br/>
                {TRANSLATIONS[lang].heroTitlePartner}
              </motion.h1>
              
              <p className="text-[#a3a3a3] text-base sm:text-lg max-w-2xl leading-relaxed">
                {TRANSLATIONS[lang].bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#sec-pitch"
                  onClick={() => {
                    audioSystem.playClick();
                    audioSystem.playScroll();
                  }}
                  onMouseEnter={() => audioSystem.playHover()}
                  className="px-6 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 flex items-center gap-2 hover:shadow-xl transition-all font-mono text-sm tracking-wide active:scale-[0.98]"
                >
                  <Briefcase size={16} />
                  <span>{TRANSLATIONS[lang].negotiateBtn}</span>
                </a>
                
                <a 
                  href="#sec-clips"
                  onClick={() => {
                    audioSystem.playClick();
                    audioSystem.playScroll();
                  }}
                  onMouseEnter={() => audioSystem.playHover()}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl flex items-center gap-2 transition-all font-mono text-sm tracking-wide active:scale-[0.98]"
                >
                  <Tv size={16} className="text-purple-400" />
                  <span>{TRANSLATIONS[lang].previewClipsBtn}</span>
                </a>
              </div>
            </div>

            {/* Right: Creator Stats Bento widget */}
            <div className="lg:col-span-5 p-px bg-gradient-to-br from-white/10 to-transparent rounded-3xl">
              <div className="bg-[#0b0b0b]/90 border border-white/5 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] font-mono block mb-1 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      {TRANSLATIONS[lang].impactFeedBadge}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">{TRANSLATIONS[lang].mediaStatsTitle}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <AudioVisualizer color="from-purple-400 to-teal-400" count={14} />
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">
                      {lang === 'ja' ? 'オーディオライブ' : 'Acoustics live'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 font-mono">
                      {profile.stats.followers}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 group-hover:text-purple-400 transition-colors">
                      {TRANSLATIONS[lang].followersLabel}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group cursor-pointer" onClick={handleLikeBump}>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 font-mono flex items-center gap-1">
                      {likesCount}M
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 group-hover:text-purple-400 transition-colors flex items-center gap-1">
                      {TRANSLATIONS[lang].likesLabel} <span className="text-rose-500 bg-rose-500/10 p-0.5 rounded text-[8px] animate-pulse">+0.1</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 font-mono">
                      {profile.stats.viewsPerMonth}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 group-hover:text-purple-400 transition-colors">
                      {TRANSLATIONS[lang].monthlyReachLabel}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 font-mono">
                      {profile.stats.engagement}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 group-hover:text-purple-400 transition-colors">
                      {TRANSLATIONS[lang].engagementRateLabel}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400">
                    <UserCheck size={16} />
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-zinc-200">{TRANSLATIONS[lang].brandsCompletedLabel}</span> {TRANSLATIONS[lang].brandsSpanLabel}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Link in Bio / Social Directory */}
        <section className="mb-16">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">{TRANSLATIONS[lang].channelsTitle}</h2>
            <p className="text-sm text-zinc-400">{TRANSLATIONS[lang].channelsSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {profile.links.map((link) => {
              const isTikTok = link.id === 'link-tiktok';
              const targetUrl = isTikTok ? "https://www.tiktok.com/@zelo_gaming" : link.url;
              
              if (isTikTok) {
                return (
                  <a
                    key={link.id}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      audioSystem.playClick();
                    }}
                    className="group relative h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 text-left overflow-hidden hover:border-purple-500/30 active:scale-[0.98] interactive-card"
                  >
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-3xl group-hover:bg-purple-500/20 transition-colors flex items-center justify-center pointer-events-none">
                      <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-purple-400 transition-colors" />
                    </div>
                    
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-purple-500/20">
                      <Tv size={18} className="text-zinc-200 animate-pulse" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-zinc-100 leading-tight group-hover:text-purple-300 transition-colors">{link.title}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-0.5">{link.category}</p>
                    </div>

                    <TikTokQrPopover 
                      tiktokUrl={targetUrl} 
                      tiktokHandle={profile.tiktokHandle} 
                      theme={rgbTheme}
                    />
                  </a>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioSystem.playClick()}
                  className="group relative h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 text-left overflow-hidden hover:border-purple-500/30 active:scale-[0.98] interactive-card"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-3xl group-hover:bg-purple-500/20 transition-colors flex items-center justify-center pointer-events-none">
                    <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                  
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-purple-500/20">
                    {link.id === 'link-twitch' && <Gamepad2 size={18} className="text-purple-400" />}
                    {link.id === 'link-youtube' && <Youtube size={18} className="text-rose-500" />}
                    {link.id === 'link-instagram' && <Instagram size={18} className="text-amber-500" />}
                    {link.id === 'link-facebook' && <Facebook size={18} className="text-blue-500" />}
                    {link.id === 'link-website' && <Globe size={18} className="text-cyan-400" />}
                    {link.id === 'link-sponsor-form' && <Briefcase size={18} className="text-teal-400" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-100 leading-tight group-hover:text-purple-300 transition-colors">{link.title}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-0.5">{link.category}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Creator Hub Web Link & QR Kit Package */}
        <CreatorKitWidget theme={rgbTheme} lang={lang} />

        {/* Dynamic Interactive Setup Builder / Gaming Specs Tour */}
        <motion.section 
          id="sec-gear" 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all uppercase cursor-pointer select-none ${
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
              {filteredGear.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover="hover"
                  key={item.id}
                  onClick={() => audioSystem.playClick()}
                  onMouseEnter={() => audioSystem.playHover()}
                  className="rounded-2xl bg-[#090909]/60 backdrop-blur-2xl border border-white/5 p-5 flex items-start gap-4 transition-all duration-300 group cursor-pointer relative overflow-hidden"
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

                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-105 transition-transform relative z-10">
                    {item.category === 'PC Specification' && <Cpu size={20} className="text-purple-400" />}
                    {item.category === 'Peripheral' && <MousePointer size={20} className="text-teal-400" />}
                    {item.category === 'Audio/Video' && <Volume2 size={20} className="text-blue-400" />}
                    {item.category === 'Workspace' && <Monitor size={20} className="text-pink-400" />}
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
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
                    <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed bg-[#030303]/60 px-2 py-1 rounded border border-white/5 font-mono">{item.spec}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Business & Sponsor Inquiry Portal split layout */}
        <section id="sec-pitch" className="mb-16">
          <div className="border-t border-white/5 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Partnership Offerings & Media Guide */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight uppercase font-mono">Business Proposals & rates</h2>
                  <p className="text-sm text-zinc-400 mt-1">Direct rates for standalone and multi-channel campaigns. Fully personalized integrations available.</p>
                </div>

                <div className="space-y-4">
                  {/* Package A */}
                  <div className="rounded-2xl bg-white/5 border border-white/5 p-5 relative hover:border-purple-500/20 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs uppercase tracking-widest text-[#a3a3a3] font-mono">Deliverable Asset 01</span>
                      <span className="text-md font-mono text-teal-400 font-extrabold">$1,200 USD</span>
                    </div>
                    <h3 className="text-md font-bold mb-1">Dedicated Sponsor TikTok (60s)</h3>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed">Custom review highlighting setup transformation or mechanical keyboard unboxing. Includes Link-in-Bio placement for 30 consecutive days.</p>
                  </div>

                  {/* Package B */}
                  <div className="rounded-2xl bg-white/5 border border-white/5 p-5 relative hover:border-purple-500/20 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs uppercase tracking-widest text-[#a3a3a3] font-mono">Deliverable Asset 02</span>
                      <span className="text-md font-mono text-teal-400 font-extrabold">$550 USD</span>
                    </div>
                    <h3 className="text-md font-bold mb-1">Integrated Gameplay Snippet (15-20s)</h3>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed">A seamless integration showcasing an hardware peripheral or tech item mid-gameplay. Perfect for high-energy clip streams.</p>
                  </div>

                  {/* Package C */}
                  <div className="rounded-2xl bg-white/5 border border-white/5 p-5 relative hover:border-purple-500/20 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs uppercase tracking-widest text-[#a3a3a3] font-mono">Deliverable Asset 03</span>
                      <span className="text-md font-mono text-teal-400 font-extrabold">$3,000 USD</span>
                    </div>
                    <h3 className="text-md font-bold mb-1">Monthly Brand Ambassador Plan</h3>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed">4 dedicated short form video assets, cross-syndicated on YouTube Shorts & IG Reels. Prominent link overlay plus logo branding in background workspace frame.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div className="text-[11px] leading-relaxed text-orange-200/90 font-mono">
                    <span className="font-bold text-orange-300 block uppercase mb-1">Current Turnaround Time: 3-5 Business Days</span>
                    Need a custom fast fast-track review? Please indicate in your pitch if you have an immediate launch date within the next 48 hours.
                  </div>
                </div>
              </div>

              {/* Right Column: Interaction Sandbox Tab - Submit Inquiry Form / Live Inquiries list */}
              <div className="lg:col-span-7 bg-[#0b0b0b]/90 border border-white/5 rounded-3xl p-6 relative interactive-card">
                <div className="flex border-b border-white/5 pb-4 mb-6 justify-between items-center">
                  <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5 relative">
                    <button
                      onClick={() => setActiveTab('media-kit')}
                      className={`relative z-10 px-4 py-2 text-xs uppercase tracking-widest font-mono transition-all font-semibold rounded-lg ${
                        activeTab === 'media-kit' ? 'text-slate-950 font-bold' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {activeTab === 'media-kit' && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 rounded-lg -z-10"
                          style={{ 
                            background: 'linear-gradient(135deg, var(--neon-color-1), var(--neon-color-2))',
                            boxShadow: '0 0 10px var(--neon-color-1)'
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                      {TRANSLATIONS[lang].pitchFormTab}
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className={`relative z-10 px-4 py-2 text-xs uppercase tracking-widest font-mono transition-all font-semibold rounded-lg flex items-center gap-1.5 ${
                        activeTab === 'inquiries' ? 'text-slate-950 font-bold' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {activeTab === 'inquiries' && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 rounded-lg -z-10"
                          style={{ 
                            background: 'linear-gradient(135deg, var(--neon-color-1), var(--neon-color-2))',
                            boxShadow: '0 0 10px var(--neon-color-1)'
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                      <span>{TRANSLATIONS[lang].receivedLeadsTab}</span>
                      <span className={`py-0.5 px-2 rounded-full text-[9px] font-bold font-mono transition-colors ${
                        activeTab === 'inquiries' ? 'bg-black/20 text-slate-950' : 'bg-purple-500/15 text-purple-300'
                      }`}>
                        {inquiries.length}
                      </span>
                    </button>
                  </div>
                  
                  <span className="text-[10px] uppercase text-zinc-500 font-mono tracking-wider hidden sm:inline">
                    {TRANSLATIONS[lang].securePortalBadge}
                  </span>
                </div>

                {/* Tab Content A: Submit Pitch Form */}
                <AnimatePresence mode="wait">
                  {activeTab === 'media-kit' && (
                    <motion.div
                      key="form-tab"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      {formSubmitted && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center gap-3">
                          <CheckCircle size={20} className="shrink-0" />
                          <div>
                            <h4 className="text-sm font-bold">Proposal Dispatched Successfully!</h4>
                            <p className="text-xs text-slate-300">Aura has notified Zelo. Your proposal has been loaded into the "Received Leads" tab for live review in this preview.</p>
                          </div>
                        </div>
                      )}

                      <form onSubmit={handleSubmitInquiry} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1.5">Brand / Agency Name</label>
                            <input 
                              type="text" 
                              required
                              value={brandName}
                              onChange={(e) => setBrandName(e.target.value)}
                              placeholder="e.g. Apex Hardware Co."
                              className="w-full bg-[#0d0d0d] border border-white/5 hover:border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1.5">Primary Contact Person</label>
                            <input 
                              type="text"
                              required 
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="e.g. Sarah Jennings"
                              className="w-full bg-[#0d0d0d] border border-white/5 hover:border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1.5">Official Partnership Email</label>
                            <input 
                              type="email" 
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="marketing@partner.com"
                              className="w-full bg-[#0d0d0d] border border-white/5 hover:border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1.5">Target Campaign Budget</label>
                            {selectedPerks.length > 0 ? (
                              <div className="w-full h-[38px] bg-purple-500/5 border border-purple-500/30 rounded-xl px-4 py-2 text-xs text-purple-300 font-mono font-bold flex items-center justify-between shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                                <span>${customTotalBudget} USD</span>
                                <span className="text-[8px] bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-200 uppercase font-black">Dynamic</span>
                              </div>
                            ) : (
                              <select 
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="w-full bg-[#0d0d0d] border border-white/5 hover:border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                              >
                                <option>$500 - $1,000 USD</option>
                                <option>$1,000 - $2,500 USD</option>
                                <option>$2,500 - $5,000 USD</option>
                                <option>$5,000+ USD</option>
                              </select>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1.5">Select Preferred Package</label>
                          <select
                            value={packageType}
                            onChange={(e) => setPackageType(e.target.value)}
                            className="w-full bg-[#0d0d0d] border border-white/5 hover:border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                          >
                            <option>Standard TikTok Video (60s)</option>
                            <option>Integrated Gameplay Snippet (15-20s)</option>
                            <option>Monthly Brand Ambassador Plan</option>
                            <option>Sponsorship Bundle / Tailor-made campaign</option>
                          </select>
                        </div>

                        {/* Sponsor Perk Builder component integration */}
                        <SponsorPerkBuilder
                          selectedPackage={packageType}
                          lang={lang}
                          onPerksChange={(perks, totalValuation) => {
                            setSelectedPerks(perks);
                            setCustomTotalBudget(totalValuation);
                          }}
                        />

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1.5">Describe your Product & Campaign goals</label>
                          <textarea 
                            rows={4}
                            required
                            value={pitch}
                            onChange={(e) => setPitch(e.target.value)}
                            placeholder="Share some background about your tech brand, key messaging, and any timeline prerequisites..."
                            className="w-full bg-[#0d0d0d] border border-white/5 hover:border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 resize-none"
                          />
                        </div>

                        <div className="pt-2 text-right">
                          <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold rounded-xl text-xs uppercase tracking-widest font-mono transition-all flex items-center justify-center gap-2 active:scale-95"
                          >
                            <Send size={14} />
                            <span>Dispatch Proposal File</span>
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Tab Content B: Live received leads for reviewer */}
                  {activeTab === 'inquiries' && (
                    <motion.div
                      key="list-tab"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4 max-h-[390px] overflow-y-auto pr-1"
                    >
                      {inquiries.length === 0 ? (
                        <div className="text-center py-12 text-zinc-500">
                          <Inbox size={40} className="mx-auto mb-3 text-zinc-600" />
                          <p className="text-xs font-mono uppercase tracking-wider">No received inquiries yet.</p>
                          <p className="text-[11px] text-zinc-600 mt-1">Submit the sponsorship form to fill this sandbox database in real-time.</p>
                        </div>
                      ) : (
                        inquiries.map((inq) => (
                          <div 
                            key={inq.id}
                            className="p-4 bg-[#0d0d0d] border border-white/5 rounded-2xl hover:border-white/10 transition-all flex flex-col justify-between"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                                  {inq.brandName}
                                  <span className="text-[9px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                                    {inq.status}
                                  </span>
                                </h4>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">By {inq.contactName} &middot; {inq.email}</p>
                              </div>
                              <button 
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-1.5 text-zinc-600 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5"
                                title="Remove Lead"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>

                            <p className="text-xs text-zinc-400 bg-zinc-950 p-2.5 rounded border border-white/5 font-mono mt-2 leading-relaxed">
                              "{inq.pitch}"
                            </p>

                            {inq.selectedPerks && inq.selectedPerks.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {inq.selectedPerks.map((perk, perkIdx) => (
                                  <span key={perkIdx} className="text-[9px] bg-purple-500/15 border border-purple-500/20 text-purple-300 font-mono px-2 py-0.5 rounded-lg">
                                    + {perk}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/5 items-center justify-between text-[10px] text-zinc-400 font-mono">
                              <div>
                                <span className="text-zinc-600">Budget:</span> <span className="text-emerald-400 font-semibold">{inq.budget}</span>
                              </div>
                              <div>
                                <span className="text-zinc-600">Deliverable:</span> <span className="text-purple-400 font-semibold">{inq.packageType}</span>
                              </div>
                              <div className="text-zinc-600">
                                {inq.date}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* Featured TikTok Clip gallery showing views, likes and real visuals */}
        <motion.section 
          id="sec-clips" 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">Trending TikTok Footage</h2>
            <p className="text-sm text-zinc-400">Viral unboxings, custom keyboard setups, and tactical clutch moments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.clips.map((clip, index) => (
              <motion.div 
                key={clip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/20 hover:scale-[1.01] transition-all flex flex-col justify-between"
              >
                <div className="aspect-video relative overflow-hidden bg-zinc-900 border-b border-white/5">
                  <img 
                    src={clip.thumbnailUrl} 
                    alt={clip.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  
                  {/* Aspect tag */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-widest text-[#a3a3a3]">
                    TikTok Clip
                  </div>

                  {/* Play circle overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-purple-500/80 backdrop-blur-sm flex items-center justify-center border border-purple-400">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-200 line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
                    {clip.title}
                  </h4>
                  
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        {clip.views} Views
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        {clip.likes} Likes
                      </span>
                    </div>

                    <a 
                      href={clip.tiktokUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Watch</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Brand Testimonials Carousel */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ lang={lang} />

        {/* Footer Area */}
        <footer className="relative border-t border-white/5 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[#737373] text-[10px] uppercase tracking-widest font-mono">
          <div>
            &copy; 2026 {profile.displayName} MEDIA INC &middot; MANAGED BY <span className="text-purple-400">AURA AI</span>
          </div>

          <div className="flex gap-6 items-center">
            <a href="#sec-pitch" className="hover:text-white transition-colors">brand deck</a>
            <a href="#sec-gear" className="hover:text-white transition-colors">hardware setup</a>
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
