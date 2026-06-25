import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Send, CheckCircle, Inbox, Trash2 } from 'lucide-react';
import { SponsorPerkBuilder } from './SponsorPerkBuilder';
import { audioSystem } from '../utils/audioSystem';

interface CampaignRatesTabProps {
  lang: 'en' | 'ja';
  profile: any;
}

const TRANSLATIONS = {
  en: {
    pitchFormTab: "Submit Proposal",
    receivedLeadsTab: "Received Leads",
    securePortalBadge: "Secured by Aura AI",
    negotiateBtn: "NEGOTIATE CAMPAIGN"
  },
  ja: {
    pitchFormTab: "提携提案フォーム",
    receivedLeadsTab: "受信した提案一覧",
    securePortalBadge: "Aura AIによる暗号化保護",
    negotiateBtn: "提携キャンペーンの送信"
  }
};

export const CampaignRatesTab: React.FC<CampaignRatesTabProps> = ({
  lang,
  profile
}) => {
  const [activeTab, setActiveTab] = useState<'media-kit' | 'inquiries'>('media-kit');
  
  // Local state for inquiry list
  const [inquiries, setInquiries] = useState<any[]>(() => {
    const cached = localStorage.getItem('sammium_inquiries');
    if (cached) return JSON.parse(cached);
    return [
      {
        id: 'inq-initial-1',
        brandName: 'Sammium Tech Industries',
        contactName: 'Sponsor Lead',
        email: 'info@sammium.tech',
        budget: '$5,000+ USD',
        packageType: 'Sponsorship Bundle / Tailor-made campaign',
        pitch: 'Looking for a premier multi-month ambassadorship package showcasing our new mechanical keycaps and sound-absorbing mats. Let\'s partner!',
        status: 'under review',
        selectedPerks: ['Revolutionized Workspace Integration', 'Aura AI Dedicated Soundbite', 'Live Performance Ticker Blast'],
        date: '2026-06-24'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('sammium_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Form states
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('$1,000 - $2,500 USD');
  const [packageType, setPackageType] = useState('Standard TikTok Video (60s)');
  const [pitch, setPitch] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Perks state
  const [selectedPerks, setSelectedPerks] = useState<string[]>([]);
  const [customTotalBudget, setCustomTotalBudget] = useState<number>(0);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBudgetLabel = selectedPerks.length > 0 ? `$${customTotalBudget} USD` : budget;
    
    const newInq = {
      id: `inq-${Date.now()}`,
      brandName: brandName || 'Anonymous Brand',
      contactName: contactName || 'N/A',
      email: email || 'N/A',
      budget: finalBudgetLabel,
      packageType,
      pitch: pitch || 'No description provided.',
      status: 'new offer',
      selectedPerks,
      date: new Date().toISOString().split('T')[0]
    };

    setInquiries([newInq, ...inquiries]);
    setFormSubmitted(true);
    audioSystem.playSuccess();
    
    // Reset form fields
    setBrandName('');
    setContactName('');
    setEmail('');
    setPitch('');

    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries(inquiries.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Business & Sponsor Inquiry Portal split layout */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Partnership Offerings & Media Guide */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h2 className="text-3xl font-bold tracking-tight uppercase font-mono">
                {lang === 'ja' ? 'ビジネス提携料金プラン' : 'Business Proposals & rates'}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                {lang === 'ja' ? '単発またはマルチプラットフォーム向け配信枠。カスタマイズ対応可能。' : 'Direct rates for standalone and multi-channel campaigns. Fully personalized integrations available.'}
              </p>
            </div>

            <div className="space-y-4">
              {/* Package A */}
              <div className="rounded-2xl bg-white/5 border border-white/5 p-5 relative hover:border-purple-500/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#a3a3a3] font-mono">Deliverable Asset 01</span>
                  <span className="text-md font-mono text-teal-400 font-extrabold">$1,200 USD</span>
                </div>
                <h3 className="text-md font-bold mb-1">{lang === 'ja' ? 'TikTok単独スポンサー動画 (60秒)' : 'Dedicated Sponsor TikTok (60s)'}</h3>
                <p className="text-xs text-[#a3a3a3] leading-relaxed">
                  {lang === 'ja' ? '機材の開封や音響ASMRに焦点を当てた動画。プロフィール内のカスタムリンク付与（30日間）。' : 'Custom review highlighting setup transformation or mechanical keyboard unboxing. Includes Link-in-Bio placement for 30 consecutive days.'}
                </p>
              </div>

              {/* Package B */}
              <div className="rounded-2xl bg-white/5 border border-white/5 p-5 relative hover:border-purple-500/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#a3a3a3] font-mono">Deliverable Asset 02</span>
                  <span className="text-md font-mono text-teal-400 font-extrabold">$550 USD</span>
                </div>
                <h3 className="text-md font-bold mb-1">{lang === 'ja' ? 'ゲーム中への自然な差し込み (15-20秒)' : 'Integrated Gameplay Snippet (15-20s)'}</h3>
                <p className="text-xs text-[#a3a3a3] leading-relaxed">
                  {lang === 'ja' ? 'ゲームプレイや配信の中盤に、キーボードやデバイスなどの使用シーンを自然にレビュー。' : 'A seamless integration showcasing an hardware peripheral or tech item mid-gameplay. Perfect for high-energy clip streams.'}
                </p>
              </div>

              {/* Package C */}
              <div className="rounded-2xl bg-white/5 border border-white/5 p-5 relative hover:border-purple-500/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#a3a3a3] font-mono">Deliverable Asset 03</span>
                  <span className="text-md font-mono text-teal-400 font-extrabold">$3,000 USD</span>
                </div>
                <h3 className="text-md font-bold mb-1">{lang === 'ja' ? 'マンスリー・アンバサダー・プラン' : 'Monthly Brand Ambassador Plan'}</h3>
                <p className="text-xs text-[#a3a3a3] leading-relaxed">
                  {lang === 'ja' ? '毎月4本のショート動画をTikTok、YouTube、Instagramに配信。配信背景への常時ロゴ設置等。' : '4 dedicated short form video assets, cross-syndicated on YouTube Shorts & IG Reels. Prominent link overlay plus logo branding in background workspace frame.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                <Clock size={16} />
              </div>
              <div className="text-[11px] leading-relaxed text-orange-200/90 font-mono">
                <span className="font-bold text-orange-300 block uppercase mb-1">
                  {lang === 'ja' ? '見積目安: 3〜5営業日' : 'Current Turnaround Time: 3-5 Business Days'}
                </span>
                {lang === 'ja' ? '早急なタイアップが必要な場合は、備考欄に目標リリース日を明記してください。' : 'Need a custom fast fast-track review? Please indicate in your pitch if you have an immediate launch date.'}
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Sandbox Tab */}
          <div className="lg:col-span-7 bg-[#0b0b0b]/90 border border-white/5 rounded-3xl p-6 relative interactive-card">
            <div className="flex border-b border-white/5 pb-4 mb-6 justify-between items-center">
              <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5 relative">
                <button
                  onClick={() => setActiveTab('media-kit')}
                  className={`relative z-10 px-4 py-2 text-xs uppercase tracking-widest font-mono transition-all font-semibold rounded-lg border-none bg-transparent cursor-pointer ${
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
                  className={`relative z-10 px-4 py-2 text-xs uppercase tracking-widest font-mono transition-all font-semibold rounded-lg flex items-center gap-1.5 border-none bg-transparent cursor-pointer ${
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
                  className="space-y-4 text-left"
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
                        className="w-full sm:w-auto px-6 py-3 bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold rounded-xl text-xs uppercase tracking-widest font-mono transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer border-none"
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
                  className="space-y-4 max-h-[440px] overflow-y-auto pr-1 text-left"
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
                            className="p-1.5 text-zinc-600 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5 cursor-pointer"
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
                            {inq.selectedPerks.map((perk: string, perkIdx: number) => (
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
      </section>
    </div>
  );
};
