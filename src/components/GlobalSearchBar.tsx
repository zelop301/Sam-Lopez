import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Cpu, 
  HelpCircle, 
  Compass, 
  Tv, 
  Briefcase, 
  Globe, 
  MessageSquare, 
  Monitor, 
  X, 
  ArrowRight, 
  CornerDownLeft, 
  Terminal,
  Sliders
} from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';
import { INITIAL_PROFILE_DATA, FAQS_EN, FAQS_JA } from '../data';

interface GlobalSearchBarProps {
  lang: 'en' | 'ja';
  setActiveMainTab: (tab: 'hub' | 'gear' | 'campaign' | 'clips' | 'links' | 'info') => void;
}

interface SearchItem {
  id: string;
  type: 'section' | 'gear' | 'faq';
  title: string;
  subtitle: string;
  detailText?: string;
  category: string;
  targetTab: 'hub' | 'gear' | 'campaign' | 'clips' | 'links' | 'info';
  icon: React.ComponentType<any>;
}

// Highly optimized fuzzy search algorithm with scoring
function calculateFuzzyScore(text: string, query: string): { matches: boolean; score: number } {
  if (!query) return { matches: true, score: 0 };
  const target = text.toLowerCase();
  const search = query.toLowerCase();
  
  let searchIdx = 0;
  let score = 0;
  let lastMatchIdx = -1;
  
  for (let i = 0; i < target.length; i++) {
    if (target[i] === search[searchIdx]) {
      // Bonus for consecutive matches
      if (lastMatchIdx === i - 1) {
        score += 8;
      } else {
        score += 2;
      }
      // Bonus for matches starting a word
      if (i === 0 || target[i - 1] === ' ' || target[i - 1] === '-' || target[i - 1] === '/' || target[i - 1] === '(') {
        score += 15;
      }
      lastMatchIdx = i;
      searchIdx++;
      if (searchIdx === search.length) {
        // Penalty for long targets to favor exact or closer matches
        const lengthPenalty = target.length * 0.15;
        return { matches: true, score: score - lengthPenalty };
      }
    }
  }
  return { matches: false, score: 0 };
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ lang, setActiveMainTab }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewItem, setPreviewItem] = useState<SearchItem | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Construct search index dynamically based on available items
  const getSearchIndex = (): SearchItem[] => {
    const items: SearchItem[] = [];

    // 1. App Sections
    const sections = [
      { id: 'hub', labelEn: 'HUD Hub', labelJa: 'メイン HUD', descEn: 'Main media statistics, platform reach, analytics, and atmosphere controls', descJa: '統計情報、メディアアナリティクス、および環境コントロール', icon: Monitor, tab: 'hub' as const },
      { id: 'gear', labelEn: 'Gear Vault', labelJa: '機材スペック', descEn: 'Technical specifications, PC parts, keyboard acoustics, and peripherals list', descJa: '使用PCスペック、カスタムキーボード、周辺機器、および状態監視', icon: Cpu, tab: 'gear' as const },
      { id: 'campaign', labelEn: 'Campaign Rates', labelJa: '案件プラン', descEn: 'Sponsorship packages, video creation rates, brand deliverables, and inquiry', descJa: '案件・タイアップ基本プラン、過去の広告実績、およびお問合せフォーム', icon: Briefcase, tab: 'campaign' as const },
      { id: 'clips', labelEn: 'Viral Clips', labelJa: 'ショート動画', descEn: 'Trending chiptune tests, Valorant clutch clips, and desk tours', descJa: 'バイラルした打鍵音テスト、Valorantスーパープレイ、デスク改造ショート動画', icon: Tv, tab: 'clips' as const },
      { id: 'links', labelEn: 'Link Hub', labelJa: 'リンクハブ', descEn: 'Official social networks, livestream, YouTube channels, and email touchpoints', descJa: '公式TikTok、Twitch配信、YouTube、Instagramなどリンク集', icon: Globe, tab: 'links' as const },
      { id: 'info', labelEn: 'Reviews & FAQ', labelJa: '実績 & FAQ', descEn: 'Brand partnership client reviews, shipping logistics, and legal FAQs', descJa: '提携企業様によるレビュー、機材サンプルの配送手順、著作権ポリシー', icon: MessageSquare, tab: 'info' as const },
    ];

    sections.forEach(s => {
      items.push({
        id: `section-${s.id}`,
        type: 'section',
        title: lang === 'ja' ? s.labelJa : s.labelEn,
        subtitle: lang === 'ja' ? s.descJa : s.descEn,
        category: lang === 'ja' ? 'システムセクション' : 'SYSTEM SECTIONS',
        targetTab: s.tab,
        icon: s.icon
      });
    });

    // 2. Gear & Hardware
    INITIAL_PROFILE_DATA.gear.forEach(g => {
      items.push({
        id: `gear-${g.id}`,
        type: 'gear',
        title: g.name,
        subtitle: g.spec,
        detailText: `${lang === 'ja' ? '機器カテゴリ' : 'Category'}: ${g.category} | ${lang === 'ja' ? 'デバイス状態' : 'Status'}: OK`,
        category: lang === 'ja' ? '使用デバイス・機材' : 'HARDWARE & GEAR SPECS',
        targetTab: 'gear',
        icon: Cpu
      });
    });

    // 3. FAQs & Logistics
    const faqs = lang === 'ja' ? FAQS_JA : FAQS_EN;
    faqs.forEach((faq, idx) => {
      items.push({
        id: `faq-${idx}`,
        type: 'faq',
        title: faq.question,
        subtitle: faq.answer,
        detailText: `${lang === 'ja' ? 'ナレッジ分類' : 'Section'}: ${faq.category}`,
        category: lang === 'ja' ? 'よくあるご質問 & ガイド' : 'KNOWLEDGE & FAQs',
        targetTab: 'info',
        icon: HelpCircle
      });
    });

    return items;
  };

  // Run fuzzy matching and sorting when query or language changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      setPreviewItem(null);
      return;
    }

    const index = getSearchIndex();
    const scored = index
      .map(item => {
        // Search across title, subtitle, and category
        const scoreTitle = calculateFuzzyScore(item.title, query);
        const scoreSub = calculateFuzzyScore(item.subtitle, query);
        const scoreCat = calculateFuzzyScore(item.category, query);
        
        const bestScore = Math.max(
          scoreTitle.matches ? scoreTitle.score + 10 : 0, 
          scoreSub.matches ? scoreSub.score : 0,
          scoreCat.matches ? scoreCat.score - 5 : 0
        );

        const hasMatch = scoreTitle.matches || scoreSub.matches || scoreCat.matches;
        return { item, hasMatch, score: bestScore };
      })
      .filter(x => x.hasMatch)
      .sort((a, b) => b.score - a.score);

    const filteredItems = scored.map(x => x.item);
    setResults(filteredItems);
    setSelectedIndex(0);
    setPreviewItem(filteredItems[0] || null);
  }, [query, lang]);

  // Listen to keyboard shortcut combinations (e.g. / or cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle search on '/' or '⌘ K'
      if ((e.key === '/' && document.activeElement !== inputRef.current) || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsOpen(true);
        audioSystem.playClick();
        setTimeout(() => inputRef.current?.focus(), 100);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation within dropdown results
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      audioSystem.playHover();
      const nextIdx = (selectedIndex + 1) % results.length;
      setSelectedIndex(nextIdx);
      setPreviewItem(results[nextIdx]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      audioSystem.playHover();
      const prevIdx = (selectedIndex - 1 + results.length) % results.length;
      setSelectedIndex(prevIdx);
      setPreviewItem(results[prevIdx]);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelectResult(results[selectedIndex]);
    }
  };

  const handleSelectResult = (item: SearchItem) => {
    audioSystem.playSuccess();
    setActiveMainTab(item.targetTab);
    setIsOpen(false);
    setQuery('');
  };

  const handleClear = () => {
    audioSystem.playClick();
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-50">
      
      {/* Tactical Styled Glow Input Container */}
      <div className={`p-px rounded-2xl bg-gradient-to-r transition-all duration-500 relative ${
        isOpen 
          ? 'from-purple-500 via-teal-400 to-indigo-500 shadow-[0_0_25px_rgba(168,85,247,0.25)]' 
          : 'from-white/10 to-white/5 hover:from-white/20 hover:to-white/10'
      }`}>
        
        {/* Futuristic Grid Pattern Backdrop inside Search */}
        <div className="absolute inset-0 bg-grid-slate-900 pointer-events-none rounded-2xl opacity-5" />

        <div className="flex items-center gap-3 bg-[#070708]/90 backdrop-blur-2xl rounded-2xl px-4 py-3.5">
          <Search size={18} className={`transition-colors duration-300 ${isOpen ? 'text-purple-400' : 'text-zinc-500'}`} />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsOpen(true);
              audioSystem.playClick();
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={lang === 'ja' ? '何をお探しですか？ (「/」キーで検索開始)' : 'Fuzzy search sections, gear, or FAQs... (Press "/")'}
            className="w-full bg-transparent border-none text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0 font-mono tracking-wide"
          />

          <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-500 select-none">
            {query ? (
              <button 
                type="button" 
                onClick={handleClear}
                className="p-1 rounded-md hover:bg-white/10 hover:text-zinc-300 transition-colors"
                title="Clear query"
              >
                <X size={13} />
              </button>
            ) : (
              <span className="bg-zinc-900/80 border border-white/5 px-2 py-0.5 rounded tracking-widest text-[10px]">/</span>
            )}
          </div>
        </div>
      </div>

      {/* Fuzzy Results Dropdown Box */}
      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute left-0 right-0 mt-3 p-px rounded-3xl bg-gradient-to-b from-white/10 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden z-50 bg-[#070709]/95 backdrop-blur-3xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[460px] md:max-h-[380px] overflow-hidden">
              
              {/* Left Column: List of Results */}
              <div className="md:col-span-7 flex flex-col overflow-y-auto border-r border-white/5 max-h-[220px] md:max-h-full py-3">
                <div className="px-4 pb-2 mb-1 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
                    <Terminal size={10} className="text-purple-400" />
                    {lang === 'ja' ? 'あいまい一致の結果' : 'Fuzzy matches'}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">
                    {results.length} {lang === 'ja' ? '件検出' : 'found'}
                  </span>
                </div>

                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-zinc-500 text-xs font-mono">
                    <X size={20} className="mx-auto mb-2 text-zinc-700" />
                    {lang === 'ja' ? '一致する項目がありません。' : 'No matches found.'}
                  </div>
                ) : (
                  <div className="space-y-0.5 px-2">
                    {results.map((item, index) => {
                      const Icon = item.icon;
                      const isSelected = index === selectedIndex;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectResult(item)}
                          onMouseEnter={() => {
                            setSelectedIndex(index);
                            setPreviewItem(item);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-all relative group cursor-pointer ${
                            isSelected 
                              ? 'bg-purple-500/15 border border-purple-500/30 text-white' 
                              : 'hover:bg-white/5 border border-transparent text-zinc-300 hover:text-white'
                          }`}
                        >
                          {/* Left Icon with ambient backing */}
                          <div className={`p-1.5 rounded-lg shrink-0 flex items-center justify-center transition-all ${
                            isSelected ? 'bg-purple-500/20 text-purple-300' : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-300'
                          }`}>
                            <Icon size={14} />
                          </div>

                          {/* Text info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-500 font-bold">
                                {item.category}
                              </span>
                              {isSelected && (
                                <motion.span 
                                  layoutId="enterIndicator"
                                  className="text-[8px] font-mono text-purple-400 font-black flex items-center gap-0.5 uppercase tracking-wider"
                                >
                                  <span>SELECT</span>
                                  <CornerDownLeft size={8} />
                                </motion.span>
                              )}
                            </div>
                            <h4 className="text-xs font-bold font-mono tracking-wide truncate mt-0.5">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Holographic Detailed Interactive Preview Card */}
              <div className="md:col-span-5 bg-black/40 p-4 flex flex-col justify-between overflow-y-auto max-h-[240px] md:max-h-full border-t md:border-t-0 border-white/5">
                <AnimatePresence mode="wait">
                  {previewItem ? (
                    <motion.div
                      key={previewItem.id}
                      initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                      transition={{ duration: 0.2 }}
                      className="h-full flex flex-col justify-between space-y-4"
                    >
                      {/* Top metadata */}
                      <div className="space-y-2">
                        <span className="text-[8px] font-mono px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded font-black uppercase tracking-widest inline-block">
                          {previewItem.type.toUpperCase()} PREVIEW
                        </span>
                        
                        <h3 className="text-sm font-bold text-zinc-100 font-mono tracking-wide">
                          {previewItem.title}
                        </h3>
                        
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans max-h-[140px] overflow-y-auto pr-1">
                          {previewItem.subtitle}
                        </p>

                        {previewItem.detailText && (
                          <div className="text-[10px] font-mono text-zinc-500 bg-zinc-900/50 p-2 rounded-lg border border-white/5">
                            {previewItem.detailText}
                          </div>
                        )}
                      </div>

                      {/* Action shortcut button */}
                      <button
                        type="button"
                        onClick={() => handleSelectResult(previewItem)}
                        className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white font-mono text-[10px] font-bold rounded-xl tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-purple-500/10 active:scale-95 cursor-pointer"
                      >
                        <span>{lang === 'ja' ? 'このタブへ移動' : 'Navigate to Tab'}</span>
                        <ArrowRight size={12} />
                      </button>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600 font-mono py-8">
                      <Sliders size={24} className="mb-2 text-zinc-800 animate-pulse" />
                      <p className="text-[10px]">
                        {lang === 'ja' ? '検索候補を選択してプレビュー' : 'Hover over items to view specs & shortcuts'}
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
