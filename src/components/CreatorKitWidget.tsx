import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Link2, 
  Copy, 
  Check, 
  QrCode, 
  Share2, 
  Compass, 
  Info, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  CircleAlert
} from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface CreatorKitWidgetProps {
  theme: 'cyberpunk' | 'chroma' | 'toxic' | 'ice' | 'matrix';
  lang: 'en' | 'ja';
}

export const CreatorKitWidget: React.FC<CreatorKitWidgetProps> = ({ theme, lang }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'guide'>('link');
  const [currentUrl, setCurrentUrl] = useState('https://ais-pre-on3u26i2dtovvpzz6t2dsp-984250077023.asia-southeast1.run.app');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      audioSystem.playClick();
      audioSystem.playPop();
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyEmbed = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedEmbed(true);
      audioSystem.playClick();
      audioSystem.playPop();
      setTimeout(() => setCopiedEmbed(false), 2500);
    } catch (err) {
      console.error('Failed to copy embed', err);
    }
  };

  // Map theme identifier to clean HEX colors to construct QR codes matching UI setup
  const getThemeHexColor = () => {
    switch (theme) {
      case 'cyberpunk': return '2dd4bf'; // teal-400
      case 'chroma': return 'f43f5e';    // rose-500
      case 'toxic': return '4ade80';     // green-400
      case 'ice': return '60a5fa';       // blue-400
      case 'matrix': return '10b981';    // emerald-500
      default: return 'a855f7';          // purple-500
    }
  };

  const qrColor = getThemeHexColor();
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=${qrColor}&bgcolor=0b0b0b&data=${encodeURIComponent(currentUrl)}`;

  const embedCode = `<!-- Sammium Tech Industries Official Hub Ribbon -->\n<a href="${currentUrl}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:12px;background:#0d0d0d;border:1px solid #333;color:#fff;font-family:sans-serif;text-decoration:none;font-weight:bold;">\n  <span>Visit Sammium Tech Industries</span>\n  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>\n</a>`;

  return (
    <section className="mb-16 relative">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Heading and Info Card */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-[10px] uppercase tracking-widest font-mono mb-4">
              <Share2 size={11} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>{lang === 'ja' ? 'オフィシャルリンク パッケージ' : 'Official Link Package'}</span>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight leading-tight uppercase font-mono text-zinc-100">
              {lang === 'ja' ? 'バイオリンク配信' : 'Consolidated Bio Link'}
            </h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              {lang === 'ja' 
                ? 'すべてのソーシャルプロフィール（TikTok、Instagram、Twitch等）から流入をこの統合サイトに集約できます。公式QRコード、組み込み用のウィジェットを使用して、ブランド案件の成約率を高めましょう。'
                : 'Consolidate all of your traffic streams from TikTok, Instagram, Twitch, and YouTube directly to this premium gaming hub. Use your official kit to attract sponsorships and track brand engagement.'}
            </p>
          </div>

          {/* Premium revolutionized credential box */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 bottom-0 left-0 w-1 transition-all duration-300" style={{ backgroundColor: 'var(--neon-color-1)', boxShadow: 'var(--neon-glow-1)' }} />
            <div className="flex gap-2">
              <ShieldCheck size={18} className="text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono">{lang === 'ja' ? '検証済みの統合URL' : 'Verified Creator URL'}</h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-1 break-all select-all">{currentUrl}</p>
              </div>
            </div>
            <div className="flex gap-2 border-t border-white/5 pt-3">
              <Award size={18} className="text-teal-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono">{lang === 'ja' ? 'スポンサー対応' : 'Sponsor Ready'}</h4>
                <p className="text-[11px] text-zinc-500 leading-normal">{lang === 'ja' ? 'この個別URLは直接ブランドへのプレゼン資料として機能します。' : 'This direct link doubles as a modern media pitch portfolio for corporate brands.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive link box */}
        <div className="lg:col-span-8 p-px bg-gradient-to-br from-white/10 to-transparent rounded-3xl">
          <div className="bg-[#0b0b0b]/90 border border-white/5 backdrop-blur-3xl rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between">
            
            {/* Header Tabs Navigation */}
            <div className="flex border-b border-white/5 pb-4 mb-6 gap-2 overflow-x-auto scrollbar-none">
              {[
                { id: 'link', label: lang === 'ja' ? '1. 統合リンクのコピー' : '1. Copy Official Link', icon: Link2 },
                { id: 'qr', label: lang === 'ja' ? '2. 公式QRコード' : '2. QR Code Generator', icon: QrCode },
                { id: 'guide', label: lang === 'ja' ? '3. ソーシャル設定手順' : '3. Social Bio Setup', icon: Compass },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      audioSystem.playClick();
                    }}
                    onMouseEnter={() => audioSystem.playHover()}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-zinc-500 border-transparent hover:text-zinc-300'
                    }`}
                    style={isActive ? { 
                      borderColor: 'var(--neon-color-1)', 
                      background: 'rgba(255, 255, 255, 0.03)',
                      boxShadow: '0 0 10px rgba(168, 85, 2 purple, 0.15)'
                    } : {}}
                  >
                    <Icon size={13} className={isActive ? 'text-purple-400' : ''} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Views */}
            <div className="flex-grow flex flex-col justify-center min-h-[220px]">
              <AnimatePresence mode="wait">
                {activeTab === 'link' && (
                  <motion.div
                    key="tab-link"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-zinc-300">{lang === 'ja' ? 'ソーシャル連携用URL' : 'Consolidated Hub Address'}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{lang === 'ja' ? 'あなたのTikTok / Twitch / IGプロフィール、およびオフライン配布物すべてにこれを設置してください。' : 'Copy this consolidated URL and add it to all of your social platforms to drive high-convert marketing views.'}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-grow p-4 rounded-xl bg-black border border-white/5 font-mono text-xs text-purple-300 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center justify-between shadow-inner">
                        <span className="select-all">{currentUrl}</span>
                      </div>
                      
                      <button
                        onClick={handleCopyLink}
                        onMouseEnter={() => audioSystem.playHover()}
                        className="py-4 px-6 rounded-xl font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 select-none cursor-pointer transition-all duration-300 text-black shrink-0 hover:scale-[1.02] active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, var(--neon-color-1), var(--neon-color-2))',
                          boxShadow: 'var(--neon-shadow-2)'
                        }}
                      >
                        {copiedLink ? (
                          <>
                            <Check size={14} className="animate-bounce" />
                            <span>{lang === 'ja' ? 'コピー完了' : 'Copied Link'}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>{lang === 'ja' ? 'URLをコピー' : 'Copy Hub Link'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-zinc-400 uppercase font-mono">{lang === 'ja' ? 'Twitchパネル / HTML埋め込みコード' : 'Twitch Panel & HTML Widget'}</h5>
                        <p className="text-[11px] text-zinc-500 mt-1">{lang === 'ja' ? '配信概要欄などにワンクリックで公式ポートフォリオへ接続可能なボタンを設置できます。' : 'Embed a premium launch button directly into website footers or Twitch panels.'}</p>
                      </div>
                      <div className="flex items-end justify-end">
                        <button
                          onClick={() => handleCopyEmbed(embedCode)}
                          className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-white/10 hover:border-purple-500/30 text-zinc-300 hover:text-white bg-white/5 transition-all text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {copiedEmbed ? (
                            <>
                              <Check size={12} />
                              <span>{lang === 'ja' ? 'コードコピー完了' : 'Copied Widget'}</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>{lang === 'ja' ? '埋め込みコードをコピー' : 'Copy Embed HTML'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'qr' && (
                  <motion.div
                    key="tab-qr"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col md:flex-row gap-6 items-center"
                  >
                    {/* Animated custom scanning QR Preview box */}
                    <div className="relative p-3 bg-zinc-950 border border-white/5 rounded-2xl w-44 h-44 overflow-hidden flex items-center justify-center shrink-0">
                      
                      {/* Laser sweeping light line */}
                      <motion.div
                        animate={{
                          y: [-80, 80]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                        className="absolute left-3 right-3 h-[2px] opacity-75 z-10 shadow-[0_0_8px_rgba(255,255,255,1)]"
                        style={{
                          background: 'linear-gradient(90deg, transparent, var(--neon-color-1), var(--neon-color-2), transparent)',
                          boxShadow: '0 0 10px var(--neon-color-1)'
                        }}
                      />

                      <img 
                        src={qrCodeUrl}
                        alt="Official Portfolio Link QR"
                        className="w-36 h-36 relative z-0 rounded-lg object-contain selection:bg-transparent"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-zinc-300">{lang === 'ja' ? 'オフィシャル配信・ポスター用QR' : 'Official Streams & Poster QR'}</h4>
                        <p className="text-xs text-zinc-500 mt-1">
                          {lang === 'ja' 
                            ? 'この公式QRコードは、カラーテーマがリアルタイムに反映されます。配信画面のオーバーレイ、ステッカー、名刺、印刷用グッズに最適です。'
                            : 'This high-performance QR matches your real-time active color theme! Perfect for video streams overlays, offline stickers, desk setup backplates, and merch packaging.'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={qrCodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => audioSystem.playClick()}
                          className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-purple-500/30 text-zinc-300 hover:text-white bg-white/5 transition-all text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                        >
                          <ExternalLink size={12} />
                          <span>{lang === 'ja' ? '高解像度で開く' : 'Open Hi-Res QR'}</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'guide' && (
                  <motion.div
                    key="tab-guide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {[
                      {
                        title: 'TikTok Bio Setup',
                        steps: lang === 'ja' ? 'プロフィール編集 ➔ 「ウェブサイト」項目へ統合URL（当サイト）を貼り付けると clickable リンクになります。' : 'Go to Edit Profile ➔ Find "Website" field ➔ Paste this consolidated link for an instant high-converting clickable element.'
                      },
                      {
                        title: 'Twitch Panels Info',
                        steps: lang === 'ja' ? '配信チャンネル設定 ➔ パネルの編集 ➔ 新規「テキスト・画像パネル」にリンクバナーを追加し、宛先URLに統合リンクを設定します。' : 'Go to your Channel Chat Info ➔ Edit Panels ➔ Add a new graphic block, then configure your target click redirect to your custom Hub.'
                      },
                      {
                        title: 'Instagram Profile',
                        steps: lang === 'ja' ? 'プロフィール編集 ➔ リンク ➔ 外部リンク追加 ➔ 自前のゲーミング公式ハブとしてURLを連携してアピールします。' : 'Go to Edit Profile ➔ Select Links ➔ Add External Link ➔ Set your custom domain link as your main primary website page.'
                      },
                      {
                        title: 'YouTube Description',
                        steps: lang === 'ja' ? 'YouTube Studio ➔ カスタマイズ ➔ 基本情報 ➔ リンク ➔ 公式プロフィールハブとしてリンクを追加。' : 'Go to YouTube Studio ➔ Customization ➔ Basic Info ➔ Links block ➔ Add your primary portfolio URL for desktop and mobile views.'
                      },
                    ].map((guide, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3 group hover:border-white/10 transition-colors">
                        <div className="w-5 h-5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx+1}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-zinc-300 uppercase font-mono tracking-wide">{guide.title}</h5>
                          <p className="text-[11px] text-zinc-500 mt-1 leading-normal">{guide.steps}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Revolutionized bottom footer tracker of the box */}
            <div className="border-t border-white/5 pt-4 mt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-zinc-600 text-[10px] font-mono uppercase tracking-widest leading-none">
              <div className="flex items-center gap-1.5">
                <CircleAlert size={10} className="text-zinc-600" />
                <span>{lang === 'ja' ? 'このキットは案件の獲得率に寄与します' : 'Deploy this consolidated kit to drive sponsor visibility'}</span>
              </div>
              <div>
                STATUS: READY & VERIFIED
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
