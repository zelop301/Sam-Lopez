import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Briefcase, Tv, UserCheck, TrendingUp, BarChart3, ArrowUpRight, Share2, Award, Users } from 'lucide-react';
import companyLogo from '../assets/images/cyberpunk_minimal_logo_1782104996879.jpg';
import { SoundtrackDeck } from './SoundtrackDeck';
import { AudioVisualizer } from './AudioVisualizer';
import { audioSystem } from '../utils/audioSystem';
import { AmbientAtmosphere } from './AmbientAtmosphere';
import { ProjectMilestones } from './ProjectMilestones';
import { GlobalSearchBar } from './GlobalSearchBar';
import { RevolutionizedMissionSplash } from './RevolutionizedMissionSplash';

interface HubDashboardTabProps {
  lang: 'en' | 'ja';
  profile: any;
  rgbTheme: 'cyberpunk' | 'chroma' | 'toxic' | 'ice' | 'matrix';
  likesCount: number;
  handleLikeBump: () => void;
  setActiveMainTab: (tab: 'hub' | 'gear' | 'campaign' | 'clips' | 'links' | 'info') => void;
}

const TRANSLATIONS = {
  en: {
    heroBadge: "Available for Q3-Q4 Sponsorship Campaigns",
    heroTitleAesthetic: "REVOLUTIONIZED",
    heroTitleGaming: "TECHNOLOGY",
    heroTitlePartner: "& INNOVATION PARTNER",
    negotiateBtn: "NEGOTIATE CAMPAIGN",
    previewClipsBtn: "PREVIEW LATEST CLIPS",
    followersLabel: "TikTok Followers",
    likesLabel: "TikTok Likes",
    monthlyReachLabel: "Monthly Reach",
    engagementRateLabel: "Engagement Rate",
    brandsCompletedLabel: "24+ Brands Completed",
    brandsSpanLabel: "spanning desk setups, mechanical switches, hardware setups & esports collaborations.",
    impactFeedBadge: "Live Impact Feed",
    chartTitle: "Creator Platform Analytics",
    chartSubtitle: "Audience traffic telemetry and channel breakdown verified by public APIs.",
    tabWeekly: "Weekly Views",
    tabPlatform: "Platform Reach",
    insightTitle: "Audience Insights",
    insightGrowth: "Weekly Lift (+18.4% WoW)",
    insightGrowthDesc: "Consistent uptick driven by trending setup sound-tests and viral Valorant gameplay clips.",
    insightDemographics: "Premium Tech Demographics",
    insightDemographicsDesc: "84% Gen-Z / Millennial audience with high intent in custom mechanical keyboards and enthusiast PC gaming hardware.",
    insightVirality: "Virality Coefficient (1.42x)",
    insightViralityDesc: "Aura algorithm calculations show content has high sharing rates on TikTok & YouTube Shorts."
  },
  ja: {
    heroBadge: "Q3-Q4 スポンサーシップ募集中",
    heroTitleAesthetic: "革命的デザイン",
    heroTitleGaming: "テクノロジー",
    heroTitlePartner: " ＆ イノベーション・パートナー",
    negotiateBtn: "キャンペーン提携交渉",
    previewClipsBtn: "最新配信クリップ",
    followersLabel: "フォロワー数",
    likesLabel: "総いいね数",
    monthlyReachLabel: "月間リーチ数",
    engagementRateLabel: "エンゲージ率",
    brandsCompletedLabel: "コラボ実績24ブランド以上",
    brandsSpanLabel: "カスタムキーボード、キースイッチ音響、デスクセットアップ、eスポーツ機器の案件実績等。",
    impactFeedBadge: "リアルタイム統計データ",
    chartTitle: "クリエイター・アナリティクス統計",
    chartSubtitle: "API連携によるプラットフォーム別トラフィックとオーディエンス解析情報。",
    tabWeekly: "週間視聴回数",
    tabPlatform: "プラットフォーム分布",
    insightTitle: "統計ハイライト & 解析",
    insightGrowth: "週間成長率 (+18.4%)",
    insightGrowthDesc: "デスクツアーやカスタムキースイッチの打鍵音テストがTikTokでバイラルしたことによる継続的成長。",
    insightDemographics: "コア・ゲーミング層",
    insightDemographicsDesc: "Z世代及びミレニアル世代が84%を占め、ハイエンドPC、キーボード機材への関心が極めて高いオーディエンス層。",
    insightVirality: "バイラル係数 (1.42x)",
    insightViralityDesc: "Aura解析システムによる算出。TikTok及びYouTube Shortsにおけるシェア・保存数が平均を大きく上回っています。"
  }
};

export const HubDashboardTab: React.FC<HubDashboardTabProps> = ({
  lang,
  profile,
  rgbTheme,
  likesCount,
  handleLikeBump,
  setActiveMainTab
}) => {
  const trans = TRANSLATIONS[lang];
  const [activeChartTab, setActiveChartTab] = useState<'weekly' | 'platform'>('weekly');
  const [quotePulse, setQuotePulse] = useState(false);
  const [titleClicked, setTitleClicked] = useState(false);

  const quoteText = lang === 'ja' 
    ? "確固たる信念と革新によって、世界をより良い場所にする" 
    : "To make the world better place by strong faith and innovation";
  const quoteWords = lang === 'ja' ? quoteText.split("") : quoteText.split(" ");

  return (
    <div className="space-y-16">
      {/* Global Search Engine Bar */}
      <GlobalSearchBar lang={lang} setActiveMainTab={setActiveMainTab} />

      {/* Revolutionized Mission Splash Hero Section */}
      <RevolutionizedMissionSplash lang={lang} />

      {/* Hero Section */}
      <section className="mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left intro text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-xs font-mono">
                <Sparkles size={13} />
                <span>{trans.heroBadge}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-white/5 rounded-full text-xs font-mono text-zinc-300">
                <img 
                  src={companyLogo} 
                  alt="SAMMIUM Logo" 
                  className="w-4 h-4 object-contain rounded-full" 
                  referrerPolicy="no-referrer" 
                />
                <span className="tracking-widest uppercase text-[9px] font-bold">SAMMIUM TECHNOLOGY</span>
              </div>
            </div>
            
            <motion.h1 
              onClick={() => {
                audioSystem.playSuccess();
                setTitleClicked(true);
                setTimeout(() => setTitleClicked(false), 800);
              }}
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
              animate={titleClicked ? {
                scale: [1, 1.05, 0.98, 1],
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 0 30px var(--neon-color-1)",
                  "0 0 15px var(--neon-color-2)",
                  "0 0 0px rgba(0,0,0,0)"
                ]
              } : {}}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
                repeat: titleClicked ? 0 : Infinity,
                repeatType: "mirror"
              }}
            >
              {trans.heroTitleAesthetic} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-transparent to-teal-400" style={{WebkitTextStroke: '1px rgba(168, 85, 247, 0.5)'}}>{trans.heroTitleGaming}</span> <br/>
              {trans.heroTitlePartner}
            </motion.h1>
            
            <p className="text-[#a3a3a3] text-base sm:text-lg max-w-2xl leading-relaxed">
              {profile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => {
                  setActiveMainTab('campaign');
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 flex items-center gap-2 hover:shadow-xl transition-all font-mono text-sm tracking-wide active:scale-[0.98] cursor-pointer"
              >
                <Briefcase size={16} />
                <span>{trans.negotiateBtn}</span>
              </button>
              
              <button 
                onClick={() => {
                  setActiveMainTab('clips');
                }}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl flex items-center gap-2 transition-all font-mono text-sm tracking-wide active:scale-[0.98] cursor-pointer"
              >
                <Tv size={16} className="text-purple-400" />
                <span>{trans.previewClipsBtn}</span>
              </button>
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
                    {trans.impactFeedBadge}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">{lang === 'ja' ? '公式メディアパフォーマンスタグ' : 'Media Statistics'}</h3>
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
                    {trans.followersLabel}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group cursor-pointer" onClick={handleLikeBump}>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 font-mono flex items-center gap-1">
                    {likesCount}M
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 group-hover:text-purple-400 transition-colors flex items-center gap-1">
                    {trans.likesLabel} <span className="text-rose-500 bg-rose-500/10 p-0.5 rounded text-[8px] animate-pulse">+0.1</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 font-mono">
                    {profile.stats.viewsPerMonth}
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 group-hover:text-purple-400 transition-colors">
                    {trans.monthlyReachLabel}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 font-mono">
                    {profile.stats.engagement}
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 group-hover:text-purple-400 transition-colors">
                    {trans.engagementRateLabel}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400">
                  <UserCheck size={16} />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-zinc-200">{trans.brandsCompletedLabel}</span> {trans.brandsSpanLabel}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Revolutionized & Minimalist Animated Quote & Creed Block */}
      <section className="mb-14 px-px bg-gradient-to-r from-purple-500/10 via-teal-500/10 to-indigo-500/10 rounded-3xl relative overflow-hidden group">
        <div 
          className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none"
        />
        
        <div 
          onClick={() => {
            audioSystem.playSuccess();
            // Trigger interactive success state
            setQuotePulse(true);
            setTimeout(() => setQuotePulse(false), 1000);
          }}
          onMouseEnter={() => audioSystem.playHover()}
          className="relative bg-[#070708]/90 border border-white/5 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 text-center cursor-pointer select-none overflow-hidden"
        >
          {/* Subtle moving light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          {/* Sparkle icons in corner */}
          <motion.div 
            className="absolute top-4 right-4 text-purple-400 opacity-40 group-hover:opacity-100 transition-opacity"
            animate={quotePulse ? { scale: [1, 1.4, 1], rotate: [0, 90, 0] } : { rotate: 360 }}
            transition={quotePulse ? { duration: 0.6 } : { duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={20} />
          </motion.div>

          <motion.div 
            className="absolute bottom-4 left-4 text-teal-400 opacity-40 group-hover:opacity-100 transition-opacity"
            animate={quotePulse ? { scale: [1, 1.4, 1], rotate: [0, -90, 0] } : { rotate: -360 }}
            transition={quotePulse ? { duration: 0.6 } : { duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Award size={20} />
          </motion.div>

          {/* Interactive particles that explode when clicked */}
          {quotePulse && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? 'var(--neon-color-1, #a855f7)' : 'var(--neon-color-2, #14b8a6)',
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 200,
                    opacity: 0,
                    scale: 0.2
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              ))}
            </div>
          )}

          {/* Glowing ripple wave from click */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-3xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={quotePulse ? { opacity: [0, 1, 0], scale: [0.8, 1.1, 1.3] } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          />

          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono block mb-4 font-bold group-hover:text-purple-400 transition-colors">
            {lang === 'ja' ? '理念・コアバリュー' : 'CREATOR CORE BELIEF'}
          </span>

          {/* Beautiful Staggered Words Typography */}
          <div className="max-w-3xl mx-auto mb-4">
            <motion.p 
              className="text-lg sm:text-2xl md:text-3xl font-sans font-light tracking-tight text-zinc-200 leading-snug"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {quoteWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  className={`inline-block ${lang === 'ja' ? '' : 'mr-2'} text-zinc-100 hover:text-purple-300 transition-colors font-medium`}
                  variants={{
                    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent w-24 mb-2"
              animate={quotePulse ? { width: ["96px", "180px", "96px"] } : {}}
              transition={{ duration: 0.6 }}
            />
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <span>{lang === 'ja' ? '信条とイノベーション' : 'Sammium Tech Creed'}</span>
              <span className="text-purple-400">•</span>
              <span className="text-zinc-400 hover:underline cursor-pointer flex items-center gap-1">
                {lang === 'ja' ? 'クリックして体験する' : 'Click to Inspire'}
                <Sparkles size={11} className="text-yellow-400 animate-pulse" />
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Ambient Atmosphere Controller Widget */}
      <AmbientAtmosphere lang={lang} />

      {/* Project Milestones and Business Collaborations Tracking */}
      <ProjectMilestones lang={lang} />

      {/* Accurate Media Statistics with Rising Animation Effects */}
      <section className="mb-16 p-px bg-gradient-to-b from-white/10 to-transparent rounded-3xl relative overflow-hidden">
        {/* Underglow accent matching active theme */}
        <div 
          className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--neon-color-1)' }}
        />
        
        <div className="bg-[#0b0b0b]/90 border border-white/5 backdrop-blur-3xl rounded-3xl p-6 sm:p-8">
          
          {/* Header area of stats panel */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <BarChart3 size={16} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase font-mono">{trans.chartTitle}</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">{trans.chartSubtitle}</p>
            </div>

            {/* Toggle tabs for Weekly Growth vs Platform Split */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-950/80 border border-white/5 rounded-xl self-stretch md:self-auto">
              <button
                onClick={() => {
                  audioSystem.playClick();
                  setActiveChartTab('weekly');
                }}
                onMouseEnter={() => audioSystem.playHover()}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all cursor-pointer border-none ${
                  activeChartTab === 'weekly'
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-zinc-500 hover:text-zinc-300 bg-transparent border border-transparent'
                }`}
              >
                {trans.tabWeekly}
              </button>
              <button
                onClick={() => {
                  audioSystem.playClick();
                  setActiveChartTab('platform');
                }}
                onMouseEnter={() => audioSystem.playHover()}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all cursor-pointer border-none ${
                  activeChartTab === 'platform'
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-zinc-500 hover:text-zinc-300 bg-transparent border border-transparent'
                }`}
              >
                {trans.tabPlatform}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left side: Rising Bar Chart Container */}
            <div className="lg:col-span-8 bg-zinc-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[350px]">
              <div className="relative flex-1 flex items-end justify-between gap-3 sm:gap-6 pb-2 min-h-[250px] mt-4">
                
                {/* Horizontal y-axis background guidelines */}
                <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none text-[8px] sm:text-[9px] font-mono text-zinc-600/60 z-0">
                  <div className="border-t border-white/5 w-full pt-1 flex justify-between">
                    <span>100% (PEAK)</span>
                    <span>{activeChartTab === 'weekly' ? '450K Views' : '1.2M Reach'}</span>
                  </div>
                  <div className="border-t border-white/5 w-full pt-1 flex justify-between">
                    <span>75%</span>
                    <span>{activeChartTab === 'weekly' ? '337.5K' : '900K'}</span>
                  </div>
                  <div className="border-t border-white/5 w-full pt-1 flex justify-between">
                    <span>50%</span>
                    <span>{activeChartTab === 'weekly' ? '225K' : '600K'}</span>
                  </div>
                  <div className="border-t border-white/5 w-full pt-1 flex justify-between">
                    <span>25%</span>
                    <span>{activeChartTab === 'weekly' ? '112.5K' : '300K'}</span>
                  </div>
                </div>

                {/* Vertical bars with rising animations */}
                {(activeChartTab === 'weekly'
                  ? [
                      { label: lang === 'ja' ? '21週' : 'Wk 21', value: 180, formatted: '180K Views', percentage: 40 },
                      { label: lang === 'ja' ? '22週' : 'Wk 22', value: 240, formatted: '240K Views', percentage: 53 },
                      { label: lang === 'ja' ? '23週' : 'Wk 23', value: 310, formatted: '310K Views', percentage: 68 },
                      { label: lang === 'ja' ? '24週' : 'Wk 24', value: 280, formatted: '280K Views', percentage: 62 },
                      { label: lang === 'ja' ? '25週' : 'Wk 25', value: 390, formatted: '390K Views', percentage: 86 },
                      { label: lang === 'ja' ? '26週' : 'Wk 26', value: 450, formatted: '450K Views', percentage: 100 },
                    ]
                  : [
                      { label: 'TikTok', value: 1200, formatted: '1.2M Impressions', percentage: 100 },
                      { label: 'YouTube', value: 650, formatted: '650K Impressions', percentage: 54 },
                      { label: 'Twitch', value: 420, formatted: '420K Impressions', percentage: 35 },
                      { label: 'Instagram', value: 380, formatted: '380K Impressions', percentage: 31 },
                      { label: 'Discord', value: 200, formatted: '200K Impressions', percentage: 16 },
                    ]
                ).map((bar, i) => (
                  <div key={`${activeChartTab}-${bar.label}`} className="flex-1 flex flex-col items-center justify-end h-full relative group z-10">
                    
                    {/* Hover tooltip */}
                    <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none z-30">
                      <div className="bg-zinc-950 border border-purple-500/20 px-3 py-1.5 rounded-lg shadow-2xl text-center">
                        <p className="text-[10px] text-zinc-500 font-mono tracking-wider">{bar.label}</p>
                        <p 
                          className="text-xs font-black font-mono"
                          style={{ color: 'var(--neon-color-1)', textShadow: '0 0 6px var(--neon-color-1)' }}
                        >
                          {bar.formatted}
                        </p>
                      </div>
                    </div>

                    {/* Rising animated bar */}
                    <motion.div
                      className="w-full sm:w-10 rounded-t-xl relative overflow-hidden"
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.percentage}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 14,
                        delay: i * 0.08
                      }}
                      style={{
                        background: 'linear-gradient(to top, rgba(168, 85, 247, 0.15) 0%, var(--neon-color-1) 100%)',
                        boxShadow: '0 -2px 10px rgba(168, 85, 247, 0.2)',
                        borderTop: '2px solid var(--neon-color-2)'
                      }}
                      whileHover={{
                        scaleX: 1.04,
                        filter: "brightness(1.2)",
                        boxShadow: '0 -4px 18px var(--neon-color-1)'
                      }}
                      onMouseEnter={() => audioSystem.playHover()}
                    >
                      {/* Subtle reflective scanline glow effect inside the bar */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* X-axis Label */}
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-zinc-500 mt-2 text-center truncate w-full">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Insights Panel card */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between h-full space-y-4">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#737373] font-mono font-bold mb-3 flex items-center gap-1.5">
                    <TrendingUp size={12} className="text-teal-400" />
                    <span>{trans.insightTitle}</span>
                  </h4>
                  
                  <div className="space-y-4 text-left">
                    <div className="border-b border-white/5 pb-3">
                      <p className="text-xs font-mono font-bold text-zinc-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        {trans.insightGrowth}
                      </p>
                      <p className="text-[11px] text-[#a3a3a3] mt-1 leading-relaxed">
                        {trans.insightGrowthDesc}
                      </p>
                    </div>

                    <div className="border-b border-white/5 pb-3">
                      <p className="text-xs font-mono font-bold text-zinc-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        {trans.insightDemographics}
                      </p>
                      <p className="text-[11px] text-[#a3a3a3] mt-1 leading-relaxed">
                        {trans.insightDemographicsDesc}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono font-bold text-zinc-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {trans.insightVirality}
                      </p>
                      <p className="text-[11px] text-[#a3a3a3] mt-1 leading-relaxed">
                        {trans.insightViralityDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    audioSystem.playClick();
                    setActiveMainTab('campaign');
                  }}
                  onMouseEnter={() => audioSystem.playHover()}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Request Full Audit Deck</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Live Chiptune Soundtrack & Synthesizer Station */}
      <section className="mb-16">
        <SoundtrackDeck rgbTheme={rgbTheme} />
      </section>
    </div>
  );
};
