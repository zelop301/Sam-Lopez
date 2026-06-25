import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, MessageSquare, Twitter, MessageCircle, Heart, Share2, 
  Send, Pause, Play, ChevronDown, Flame, Sparkles, Filter, ShieldCheck, Zap
} from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface SocialsFeedProps {
  lang: 'en' | 'ja';
}

interface SocialPost {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  platform: 'tiktok' | 'twitter' | 'twitch' | 'discord';
  contentEn: string;
  contentJa: string;
  likes: number;
  shares: number;
  timestamp: string;
  badge?: 'mod' | 'vip' | 'sponsor' | 'verified';
  hasLiked?: boolean;
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop"
];

const PRESET_POSTS: SocialPost[] = [
  {
    id: "sp-1",
    username: "KaiZen_Settings",
    handle: "@kaizen_setups",
    avatar: PRESET_AVATARS[0],
    platform: 'tiktok',
    contentEn: "The acoustics on those new lubed tactile silent switches are clean! Instant add to my daily driver ⌨️✨",
    contentJa: "この新しいルブ済み静音タクタイルスイッチの打鍵音、めちゃくちゃ上品！即スタメンキーボード行き確定だわ ⌨️✨",
    likes: 1204,
    shares: 88,
    timestamp: "2 mins ago",
    badge: "sponsor"
  },
  {
    id: "sp-2",
    username: "ViperLobbySlayer",
    handle: "@viplayers",
    avatar: PRESET_AVATARS[1],
    platform: 'twitch',
    contentEn: "Radiant clutch was absolutely illegal. How are you aiming like that with 0.03ms OLED?! 🔥",
    contentJa: "レディアント帯での1v5クラッチはマジで鳥肌立った！0.03ms OLEDでプレイするとエイムこんなに吸い付くの？！🔥",
    likes: 845,
    shares: 12,
    timestamp: "5 mins ago",
    badge: "vip"
  },
  {
    id: "sp-3",
    username: "CyberDeskDesign",
    handle: "@cyber_desk",
    avatar: PRESET_AVATARS[2],
    platform: 'twitter',
    contentEn: "Just saw the neon symmetrical RGB setup video on TikTok. Absolutely stunning visual alignment! 🌌🎨",
    contentJa: "TikTokで左右対称ネオンRGBのデスク環境動画を見たけど、ビジュアルの対称性が美しすぎて感動した！🌌🎨",
    likes: 2450,
    shares: 512,
    timestamp: "12 mins ago",
    badge: "verified"
  },
  {
    id: "sp-4",
    username: "WootingEnjoyer",
    handle: "@rapid_trigger",
    avatar: PRESET_AVATARS[3],
    platform: 'discord',
    contentEn: "Copied the custom rapid trigger activation settings and my movement in Valorant feels so responsive now! Thanks!",
    contentJa: "紹介されてたラピッドトリガーのアクチュエーション設定を真似したら、ヴァロのストレイフが超キビキビ動くようになった！感謝！",
    likes: 312,
    shares: 4,
    timestamp: "15 mins ago",
    badge: "mod"
  },
  {
    id: "sp-5",
    username: "NeonSamurai",
    handle: "@neonsam",
    avatar: PRESET_AVATARS[4],
    platform: 'tiktok',
    contentEn: "The mechanical keyboard sound tests are like modern ASMR. Need a full 10 hour loop immediately.",
    contentJa: "このキーボード打鍵音はもはや現代のASMR。今すぐ10時間耐久動画を作ってほしいレベルです。",
    likes: 933,
    shares: 42,
    timestamp: "22 mins ago"
  },
  {
    id: "sp-6",
    username: "Sakura_Stream",
    handle: "@sakurastreamer",
    avatar: PRESET_AVATARS[0],
    platform: 'twitch',
    contentEn: "That standing desk is gorgeous! Symmetrical cable management is pure craftsmanship. 🔌👌",
    contentJa: "この電動昇降式デスク最高！ケーブルが一本も見えない配線管理、もはや神職人の域。🔌👌",
    likes: 1104,
    shares: 56,
    timestamp: "30 mins ago"
  },
  {
    id: "sp-7",
    username: "MatrixRunCode",
    handle: "@neo_matrix",
    avatar: PRESET_AVATARS[1],
    platform: 'twitter',
    contentEn: "The digital clock overlay on the HUD dashboard with physical ambient synchronization is next-gen content creation.",
    contentJa: "環境光と時間帯が完全にシンクロするHUDダッシュボード時計、次世代の配信コンテンツクオリティですね。",
    likes: 412,
    shares: 29,
    timestamp: "45 mins ago",
    badge: "sponsor"
  }
];

const PLATFORM_ICONS = {
  tiktok: <Flame className="text-pink-500" size={14} />,
  twitter: <Twitter className="text-sky-400" size={14} />,
  twitch: <Tv className="text-purple-400" size={14} />,
  discord: <MessageCircle className="text-indigo-400" size={14} />
};

const TRANSLATIONS = {
  en: {
    title: "LIVE SOCIALS INTERACTION",
    subtitle: "Real-time scrolling community telemetry from across TikTok, X/Twitter, Twitch, & Discord channels.",
    all: "All Channels",
    tiktok: "TikTok Clips",
    twitter: "X/Twitter",
    twitch: "Twitch Live",
    discord: "Discord Lounge",
    placeholder: "Broadcast a message to the live community...",
    send: "Transmit",
    activeViewers: "ACTIVE MONITOR",
    postsMin: "INTERACTION VELOCITY",
    sentiment: "COMMUNITY TEMPERATURE",
    paused: "Feed Paused",
    running: "Feed Streaming",
    postAsAnon: "Broadcast as Guest",
    successAlert: "Broadcasting package uploaded to cloud servers!",
    badgeMod: "Moderator",
    badgeVip: "VIP",
    badgeSponsor: "Sponsor",
    badgeVerified: "Verified"
  },
  ja: {
    title: "SNS・コミュニティ・ライブフィード",
    subtitle: "TikTok、X/Twitter、Twitch、Discordなどの公式SNSチャネルを横断する、リアルタイム同期式のスクロールフィードです。",
    all: "全フィード",
    tiktok: "TikTok動画",
    twitter: "X/Twitter",
    twitch: "Twitch実況",
    discord: "Discord交流",
    placeholder: "ライブコミュニティにメッセージを送信...",
    send: "送信する",
    activeViewers: "アクティブ監視数",
    postsMin: "フィード更新速度",
    sentiment: "コミュニティ温度",
    paused: "フィード一時停止中",
    running: "ライブ同期中",
    postAsAnon: "ゲストとして投稿",
    successAlert: "ブロードキャスト送信がクラウドサーバーにロードされました！",
    badgeMod: "モデレーター",
    badgeVip: "VIP",
    badgeSponsor: "スポンサー",
    badgeVerified: "公式認証"
  }
};

export const SocialsFeed: React.FC<SocialsFeedProps> = ({ lang }) => {
  const trans = TRANSLATIONS[lang];
  const [activePlatform, setActivePlatform] = useState<'all' | 'tiktok' | 'twitter' | 'twitch' | 'discord'>('all');
  const [posts, setPosts] = useState<SocialPost[]>(PRESET_POSTS);
  const [customMsg, setCustomMsg] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeWatchers, setActiveWatchers] = useState<number>(314);
  const [interactionRate, setInteractionRate] = useState<number>(45); // posts/min
  const [sentimentVal, setSentimentVal] = useState<number>(98); // % positive
  
  const [notification, setNotification] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate random new social posts occasionally
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Create random user post
      const userList = ["TechGeek99", "PixelPrincess", "TacticalCat", "KeyboardClacker", "RevolutionaryWanderer", "GamerGuru"];
      const handleList = ["@geek99", "@pixel_pr", "@tac_cat", "@clackers", "@rev_wanderer", "@guru_gamer"];
      const contentsEn = [
        "Unboxing video is super high quality. Can we get the exact RGB HEX code list? 🎨",
        "That Valorant setup is an absolute masterpiece. Lubed tactile switches for the win!",
        "OMG the transition at 0:15 was incredibly smooth! Post more clips please!",
        "Is that standing desk real bamboo or dual-motor custom frame?",
        "Subscribing immediately! Best sound test audio I have ever heard in gaming.",
        "Your setup is giving me severe workspace envy, clean revolutionized layout."
      ];
      const contentsJa = [
        "物撮り開封動画のクオリティが高すぎる！使っているRGBライティングのカラーコード一覧が欲しい 🎨",
        "Valorantプレイ環境の完成度がマジで半端ない。ルブ済みタクタイルスイッチ最高！",
        "0:15秒あたりの動画のトランジションが滑らかすぎて鳥肌立った！動画もっとあげてください！",
        "この電動昇降デスクって本物の竹天板？それともデュアルモーター仕様の特注フレーム？",
        "速攻でチャンネル登録しました！ゲーミングデバイスの打鍵音の中で間違いなく過去一で心地よい音。",
        "このデスク配置、綺麗すぎて羨ましすぎる。自分の部屋もこんな風にお洒落にまとめたい。"
      ];

      const rIndex = Math.floor(Math.random() * userList.length);
      const rPlatform: 'tiktok' | 'twitter' | 'twitch' | 'discord' = ["tiktok", "twitter", "twitch", "discord"][Math.floor(Math.random() * 4)] as any;
      const rBadge: 'mod' | 'vip' | 'sponsor' | 'verified' | undefined = [undefined, undefined, "mod", "vip", "sponsor", "verified"][Math.floor(Math.random() * 6)] as any;

      const newPost: SocialPost = {
        id: `sp-rand-${Date.now()}`,
        username: userList[rIndex],
        handle: handleList[rIndex],
        avatar: PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)],
        platform: rPlatform,
        contentEn: contentsEn[rIndex],
        contentJa: contentsJa[rIndex],
        likes: Math.floor(10 + Math.random() * 200),
        shares: Math.floor(Math.random() * 15),
        timestamp: "Just now",
        badge: rBadge
      };

      setPosts((prev) => [newPost, ...prev.slice(0, 14)]); // Keep maximum of 15 items
      setInteractionRate((prev) => Math.min(100, Math.max(30, prev + Math.floor(Math.random() * 5 - 2))));
      setActiveWatchers((prev) => prev + Math.floor(Math.random() * 7 - 3));
      
      // Gentle audio play if sound on
      audioSystem.playBlip();

    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle post submit
  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;

    audioSystem.playSuccess();

    const guestPost: SocialPost = {
      id: `sp-user-${Date.now()}`,
      username: "Guest_Agent",
      handle: "@guest_operator",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
      platform: 'discord',
      contentEn: customMsg,
      contentJa: customMsg,
      likes: 1,
      shares: 0,
      timestamp: "Just now",
      badge: "verified"
    };

    setPosts((prev) => [guestPost, ...prev]);
    setCustomMsg('');
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  // Like interaction
  const toggleLikePost = (postId: string) => {
    audioSystem.playPop();
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasLiked = !post.hasLiked;
        return {
          ...post,
          hasLiked,
          likes: hasLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  // Share interaction
  const handleSharePost = (post: SocialPost) => {
    audioSystem.playClick();
    setPosts(prev => prev.map(p => {
      if (p.id === post.id) {
        return { ...p, shares: p.shares + 1 };
      }
      return p;
    }));
  };

  // Filter posts
  const filteredPosts = activePlatform === 'all'
    ? posts
    : posts.filter(post => post.platform === activePlatform);

  return (
    <section className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-3xl relative overflow-hidden group">
      {/* Underlying neon backglow matching active platform */}
      <div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-700"
        style={{ 
          backgroundColor: activePlatform === 'tiktok' ? '#ec4899' 
            : activePlatform === 'twitter' ? '#38bdf8' 
            : activePlatform === 'twitch' ? '#a855f7' 
            : activePlatform === 'discord' ? '#6366f1' 
            : '#14b8a6' 
        }}
      />

      <div className="relative bg-[#070708]/90 border border-white/5 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 overflow-hidden text-left">
        
        {/* Component Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-pink-400 font-mono font-black">
                {lang === 'ja' ? 'コミュニティ・テレメトリー' : 'LIVE CONTEXT CONNECTOR'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase font-mono text-zinc-100">
              {trans.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed max-w-2xl">
              {trans.subtitle}
            </p>
          </div>

          {/* Interactive Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioSystem.playClick();
                setIsPaused(!isPaused);
              }}
              onMouseEnter={() => audioSystem.playHover()}
              className={`p-2 rounded-xl border select-none cursor-pointer flex items-center gap-1.5 text-xs font-mono transition-all ${
                isPaused 
                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-400 font-bold' 
                  : 'bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
              }`}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
              <span>{isPaused ? trans.paused : trans.running}</span>
            </button>
          </div>
        </div>

        {/* Real-time stats indicators */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex flex-col justify-between">
            <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1">
              {trans.activeViewers}
            </span>
            <div className="text-sm sm:text-base font-bold font-mono text-zinc-200 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>{activeWatchers}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex flex-col justify-between">
            <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1">
              {trans.postsMin}
            </span>
            <div className="text-sm sm:text-base font-bold font-mono text-zinc-200 flex items-center gap-1.5">
              <Zap size={13} className="text-teal-400 animate-pulse" />
              <span>{interactionRate} <span className="text-[9px] text-zinc-500">P/M</span></span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex flex-col justify-between">
            <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1">
              {trans.sentiment}
            </span>
            <div className="text-sm sm:text-base font-bold font-mono text-zinc-200 flex items-center gap-1.5">
              <Sparkles size={13} className="text-pink-400" />
              <span>{sentimentVal}% <span className="text-[9px] text-zinc-500">POS</span></span>
            </div>
          </div>
        </div>

        {/* Platform Selector Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-950/60 rounded-xl border border-white/5 mb-4 overflow-x-auto scrollbar-none relative z-10">
          {(['all', 'tiktok', 'twitter', 'twitch', 'discord'] as const).map((plat) => {
            const labels: Record<string, string> = {
              all: trans.all,
              tiktok: trans.tiktok,
              twitter: trans.twitter,
              twitch: trans.twitch,
              discord: trans.discord
            };

            const isSelected = activePlatform === plat;

            return (
              <button
                key={plat}
                onClick={() => {
                  audioSystem.playClick();
                  setActivePlatform(plat);
                }}
                onMouseEnter={() => audioSystem.playHover()}
                className={`relative px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase transition-all select-none border-none cursor-pointer flex items-center gap-1.5 ${
                  isSelected 
                    ? 'text-white font-bold bg-white/10' 
                    : 'text-zinc-400 hover:text-zinc-200 bg-transparent'
                }`}
              >
                {plat !== 'all' && PLATFORM_ICONS[plat]}
                <span>{labels[plat]}</span>
              </button>
            );
          })}
        </div>

        {/* Post Scroller Container */}
        <div 
          ref={scrollContainerRef}
          className="h-[320px] overflow-y-auto pr-1 space-y-3 custom-scrollbar relative bg-[#030304]/60 p-3 rounded-2xl border border-white/5 flex flex-col"
        >
          <AnimatePresence initial={false}>
            {filteredPosts.map((post) => {
              const badgeLabels = {
                mod: { label: trans.badgeMod, color: "bg-red-500/20 text-red-300 border-red-500/30" },
                vip: { label: trans.badgeVip, color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
                sponsor: { label: trans.badgeSponsor, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
                verified: { label: trans.badgeVerified, color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
              };

              const activeBadge = post.badge ? badgeLabels[post.badge] : null;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={post.id}
                  className={`p-3.5 rounded-xl border flex gap-3 relative overflow-hidden group/post transition-all ${
                    post.id.startsWith('sp-user-')
                      ? 'bg-gradient-to-r from-purple-500/10 to-teal-500/10 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.05)]'
                      : 'bg-zinc-900/45 border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Left Side: Avatar & Badge */}
                  <div className="shrink-0 flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shrink-0 group-hover/post:scale-105 transition-transform">
                      <img src={post.avatar} alt={post.username} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Platform logo badge over avatar */}
                    <div className="w-4 h-4 rounded-full bg-black border border-white/15 flex items-center justify-center">
                      {PLATFORM_ICONS[post.platform]}
                    </div>
                  </div>

                  {/* Right Side: Header, Content, Actions */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-bold text-zinc-100 group-hover/post:text-purple-300 transition-colors">
                          {post.username}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500">
                          {post.handle}
                        </span>

                        {activeBadge && (
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono border ${activeBadge.color}`}>
                            {activeBadge.label}
                          </span>
                        )}
                      </div>

                      <span className="text-[9px] font-mono text-zinc-500 shrink-0">
                        {post.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                      {lang === 'ja' ? post.contentJa : post.contentEn}
                    </p>

                    {/* Like & Share Controls */}
                    <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        onMouseEnter={() => audioSystem.playHover()}
                        className={`flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer border-none bg-transparent ${
                          post.hasLiked ? 'text-rose-400 font-bold' : ''
                        }`}
                      >
                        <Heart size={12} className={post.hasLiked ? "fill-rose-400/20 text-rose-400 animate-bounce" : ""} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        onClick={() => handleSharePost(post)}
                        onMouseEnter={() => audioSystem.playHover()}
                        className="flex items-center gap-1 hover:text-purple-300 transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <Share2 size={12} />
                        <span>{post.shares}</span>
                      </button>

                      {post.id.startsWith('sp-user-') && (
                        <span className="text-[8px] font-mono text-teal-400 uppercase tracking-widest ml-auto">
                          TRANSMISSION SECURE
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Live message broadcast submission input bar */}
        <form onSubmit={handleTransmit} className="mt-4 pt-3 border-t border-white/5 relative z-10">
          <div className="flex gap-2 relative">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder={trans.placeholder}
              className="flex-1 bg-black/60 border border-white/5 rounded-xl px-3.5 py-2 text-xs font-sans text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/40 focus:ring-0 transition-all font-medium"
            />
            <button
              type="submit"
              onMouseEnter={() => audioSystem.playHover()}
              disabled={!customMsg.trim()}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50 select-none border-none active:scale-95 transition-all"
            >
              <Send size={12} />
              <span className="hidden sm:inline">{trans.send}</span>
            </button>
          </div>
        </form>

        {/* Submit success alert banner overlay */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-4 left-4 right-4 bg-zinc-950/95 border border-purple-500/40 rounded-xl p-3 flex items-center gap-2.5 shadow-xl pointer-events-none"
            >
              <ShieldCheck size={16} className="text-teal-400" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-teal-300">
                {trans.successAlert}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
