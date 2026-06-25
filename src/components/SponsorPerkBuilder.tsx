import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Megaphone, Video, Monitor, MessageSquare, Plus, Check } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface Perk {
  id: string;
  title: { en: string; ja: string };
  desc: { en: string; ja: string };
  price: number;
  icon: React.ReactNode;
}

interface SponsorPerkBuilderProps {
  selectedPackage: string;
  lang: 'en' | 'ja';
  onPerksChange: (perks: string[], totalBudget: number) => void;
}

export const SponsorPerkBuilder: React.FC<SponsorPerkBuilderProps> = ({
  selectedPackage,
  lang,
  onPerksChange
}) => {
  // Define base prices corresponding to standard packages
  const getBasePrice = (pkg: string): number => {
    if (pkg.includes('Standard TikTok') || pkg.includes('TikTok動画')) return 1200;
    if (pkg.includes('Integrated Gameplay') || pkg.includes('ゲーム実況')) return 550;
    if (pkg.includes('Ambassador') || pkg.includes('月間ブランドアンバサダー')) return 3000;
    return 4500; // Bundle / tailor-made standard
  };

  const basePrice = getBasePrice(selectedPackage);

  const perks: Perk[] = [
    {
      id: 'shoutout',
      title: { en: 'Dedicated Shout-out & Link', ja: '優先プロフィール誘導 ＆ 紹介' },
      desc: { en: 'Top-pinned Bio Link placement for 30 days and dedicated shout-out in profile.', ja: 'リンク最上部に30日間バナー掲載、およびTikTokプロフィール文枠での製品リンク設置' },
      price: 200,
      icon: <Megaphone className="w-4 h-4 text-emerald-400 animate-pulse" />
    },
    {
      id: 'spark_ads',
      title: { en: 'TikTok Spark Ads Code', ja: 'Spark Ads 広告配信ライセンス' },
      desc: { en: 'Provide high-converting video authorization codes for direct ad boosting (60 days).', ja: 'コンバージョン率の高い動画素材の広告配信コードをご提供、2ヶ月間自社広告運用可能' },
      price: 500,
      icon: <Sparkles className="w-4 h-4 text-purple-400" />
    },
    {
      id: 'assets',
      title: { en: 'Raw 4K & Acoustic Assets', ja: '4K Bロール ＆ キー音生データ提供' },
      desc: { en: 'Full commercial license for high-fidelity 4K cinematic b-roll and separate high-quality tapping audio clips.', ja: 'シネマティックな4K物撮りフッテージ素材と、キーボード打鍵音の生オーディオの商用ライセンス' },
      price: 400,
      icon: <Video className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 'overlay',
      title: { en: 'Stream Brand Overlay', ja: '配信用カスタムオーバーレイ枠' },
      desc: { en: 'Integrate custom animations, watermarks, or overlays during tactical FPS game streaming.', ja: 'キーボード手元配信や Valorant プレイ時の画面上に専用のブランドロゴ枠を表示' },
      price: 350,
      icon: <Monitor className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 'discord',
      title: { en: 'Discord Community Pin', ja: 'Discord 告知チャンネル固定' },
      desc: { en: 'Pinned campaign post in Sammium Tech\'s general gaming community channel to maximize CTR.', ja: 'ゲーマー＆自作キーボード愛好家が集積するDiscord内チャンネルでの専属紹介ピン固定' },
      price: 150,
      icon: <MessageSquare className="w-4 h-4 text-amber-400" />
    }
  ];

  const [selectedPerkIds, setSelectedPerkIds] = useState<string[]>([]);

  const togglePerk = (id: string) => {
    audioSystem.playPop();
    const isSelected = selectedPerkIds.includes(id);
    let updated: string[];
    if (isSelected) {
      updated = selectedPerkIds.filter(item => item !== id);
    } else {
      updated = [...selectedPerkIds, id];
    }
    setSelectedPerkIds(updated);
  };

  // Compute calculated values
  const perkCost = perks
    .filter(p => selectedPerkIds.includes(p.id))
    .reduce((currentSum, p) => currentSum + p.price, 0);

  const totalCalculated = basePrice + perkCost;

  // Sync back to form state on changes
  useEffect(() => {
    const activeTitles = perks
      .filter(p => selectedPerkIds.includes(p.id))
      .map(p => p.title[lang]);
    onPerksChange(activeTitles, totalCalculated);
  }, [selectedPerkIds, selectedPackage, lang]);

  return (
    <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 space-y-4 shadow-inner relative overflow-hidden">
      <div className="flex justify-between items-center pb-2 border-b border-white/5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
            {lang === 'ja' ? 'スポンサー・特典ビルド' : 'Sponsor Perk Builder'}
          </h4>
          <p className="text-[10px] text-zinc-500 font-mono">
            {lang === 'ja' ? '必要なカスタムオプションを選択して見積もりをシミュレートします' : 'Choose custom add-ons to build your customized proposal package'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-widest text-[#a3a3a3] font-mono block">
            {lang === 'ja' ? '基本価格' : 'Base Rate'}
          </span>
          <span className="text-xs font-mono font-bold text-zinc-400">${basePrice} USD</span>
        </div>
      </div>

      {/* Grid of Perks */}
      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 select-none">
        {perks.map((perk) => {
          const isSelected = selectedPerkIds.includes(perk.id);
          return (
            <div
              key={perk.id}
              onClick={() => togglePerk(perk.id)}
              className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-purple-500/10 border-purple-500/30'
                  : 'bg-zinc-950/60 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-purple-500/20' : 'bg-white/5'
                }`}>
                  {perk.icon}
                </div>
                <div className="min-w-0">
                  <h5 className="text-[11px] font-bold text-slate-200 leading-tight">
                    {perk.title[lang]}
                  </h5>
                  <p className="text-[9px] text-[#8c8c8c] font-mono truncate max-w-[280px] sm:max-w-[400px]">
                    {perk.desc[lang]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-mono font-bold ${
                  isSelected ? 'text-purple-400' : 'text-zinc-500'
                }`}>
                  +${perk.price}
                </span>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'bg-purple-500 border-purple-500 text-slate-950'
                    : 'bg-transparent border-white/10 group-hover:border-zinc-400'
                }`}>
                  {isSelected ? <Check size={12} strokeWidth={3} /> : <Plus size={10} className="text-zinc-500" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Summary Panel */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono block">
            {lang === 'ja' ? '選択パッケージ ＆ オプション合計値' : 'Live Campaign Package Valuation'}
          </span>
          <span className="text-[11px] text-zinc-400 font-medium">
            {selectedPerkIds.length === 0 
              ? (lang === 'ja' ? 'アタッチメントなし (基本料金のみ)' : 'Standard Package Rates')
              : (lang === 'ja' ? `アタッチ項目数: ${selectedPerkIds.length} 個` : `${selectedPerkIds.length} custom add-ons active`)}
          </span>
        </div>
        <div className="flex items-baseline gap-1 bg-[#101010] border border-purple-500/10 px-4 py-2 rounded-xl shadow-lg relative glow-effect">
          <span className="text-[10px] text-zinc-500 font-mono">USD</span>
          <span className="text-xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 tracking-tight">
            ${totalCalculated}
          </span>
        </div>
      </div>
    </div>
  );
};
