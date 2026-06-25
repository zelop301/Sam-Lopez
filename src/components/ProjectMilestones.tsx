import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Star, 
  Award, 
  Laptop, 
  Bolt, 
  Zap, 
  Layers, 
  ArrowRightLeft,
  ChevronDown,
  Info,
  CalendarDays,
  Flame,
  ArrowUpRight,
  Download,
  AlertCircle,
  Gauge,
  ArrowDownCircle,
  GripVertical,
  Move
} from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface ProjectMilestonesProps {
  lang: 'en' | 'ja';
}

interface MilestonePhase {
  nameEn: string;
  nameJa: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number; // 0 to 100
  date: string; // Specific deadline/date for sub-timeline
}

interface CampaignProject {
  id: string;
  brand: string;
  brandJa: string;
  campaignTitle: string;
  campaignTitleJa: string;
  overallProgress: number;
  startDate: string;
  endDate: string;
  gridStartCol: number; // Week column start (1-indexed relative to grid timeline)
  gridSpanCols: number; // Duration of campaign in weeks
  color: string;
  textColor: string;
  glowColor: string;
  phases: MilestonePhase[];
  priority: 'low' | 'medium' | 'high';
}

const CAMPAIGNS: CampaignProject[] = [
  {
    id: 'aurakeys',
    brand: "AuraKeys",
    brandJa: "AuraKeys キーボード",
    campaignTitle: "Sound-Optimized Silent Switches",
    campaignTitleJa: "至高の静音スイッチ打鍵音レビュー",
    overallProgress: 95,
    startDate: "Jun 01",
    endDate: "Jun 21",
    gridStartCol: 1, // Week 1 (Jun 01 - Jun 07)
    gridSpanCols: 3, // 3 Weeks
    color: "#14b8a6", // Teal
    textColor: "text-teal-400",
    glowColor: "rgba(20, 184, 166, 0.4)",
    priority: 'high',
    phases: [
      { nameEn: "Engineering Analysis", nameJa: "スイッチ特性・スペック解析", status: 'completed', progress: 100, date: "Jun 04" },
      { nameEn: "Cinematic Sound Testing", nameJa: "高音質マイク収録・比較動画", status: 'completed', progress: 100, date: "Jun 10" },
      { nameEn: "Pre-Release Draft Approval", nameJa: "先行ドラフト提出・メーカー合意", status: 'completed', progress: 100, date: "Jun 16" },
      { nameEn: "Short-form Publishing & Stream", nameJa: "TikTokショート公開＆生配信", status: 'in-progress', progress: 80, date: "Jun 21" }
    ]
  },
  {
    id: 'zenspace',
    brand: "ZenSpace Standing Desk",
    brandJa: "ZenSpace 立位ワークデスク",
    campaignTitle: "Minimalist Smart Workspace Tour",
    campaignTitleJa: "極限ミニマリストデスク環境ツアー",
    overallProgress: 75,
    startDate: "Jun 08",
    endDate: "Jul 05",
    gridStartCol: 2, // Week 2 (Jun 08 - Jun 14)
    gridSpanCols: 4, // 4 Weeks
    color: "#a855f7", // Purple
    textColor: "text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.4)",
    priority: 'medium',
    phases: [
      { nameEn: "Creative Briefing", nameJa: "構想・企画承認", status: 'completed', progress: 100, date: "Jun 11" },
      { nameEn: "B-Roll Cinematography", nameJa: "4Kマクロ映像撮影", status: 'completed', progress: 100, date: "Jun 18" },
      { nameEn: "Audio Sound Mastering", nameJa: "打鍵音・動作音マスタリング", status: 'in-progress', progress: 80, date: "Jun 26" },
      { nameEn: "Post Publishing & Live Analytics", nameJa: "投稿・配信実績レポート", status: 'pending', progress: 0, date: "Jul 05" }
    ]
  },
  {
    id: 'veloglow',
    brand: "VeloGlow Intelligent Lights",
    brandJa: "VeloGlow インテリジェント照明",
    campaignTitle: "Symmetrical RGB Studio Layout",
    campaignTitleJa: "シンメトリーRGBスタジオライティング",
    overallProgress: 40,
    startDate: "Jun 15",
    endDate: "Jul 12",
    gridStartCol: 3, // Week 3 (Jun 15 - Jun 21)
    gridSpanCols: 4, // 4 Weeks
    color: "#3b82f6", // Blue
    textColor: "text-blue-400",
    glowColor: "rgba(59, 130, 246, 0.4)",
    priority: 'low',
    phases: [
      { nameEn: "Chamber Lighting Integration", nameJa: "ライトマウント・配置構築", status: 'completed', progress: 100, date: "Jun 19" },
      { nameEn: "Atmospheric Scene Tuning", nameJa: "気候連動プリセットシーン作成", status: 'in-progress', progress: 60, date: "Jun 28" },
      { nameEn: "Content Editing", nameJa: "動画編集・音響加工", status: 'pending', progress: 0, date: "Jul 05" },
      { nameEn: "Metrics Reporting", nameJa: "配信レポート・実績抽出", status: 'pending', progress: 0, date: "Jul 12" }
    ]
  },
  {
    id: 'cybercaps',
    brand: "CyberCaps Co.",
    brandJa: "CyberCaps キーキャップ",
    campaignTitle: "Mechanical Keycap Soundscape",
    campaignTitleJa: "メカニカルキーキャップASMRサウンド",
    overallProgress: 15,
    startDate: "Jul 06",
    endDate: "Jul 26",
    gridStartCol: 6, // Week 6 (Jul 06 - Jul 12)
    gridSpanCols: 3, // 3 Weeks
    color: "#ec4899", // Pink
    textColor: "text-pink-400",
    glowColor: "rgba(236, 72, 153, 0.4)",
    priority: 'high',
    phases: [
      { nameEn: "Concept Strategy", nameJa: "コンセプト設計・色調合意", status: 'completed', progress: 100, date: "Jul 09" },
      { nameEn: "High-Fidelity Audio Setup", nameJa: "超高感度ASMR収録リグ構築", status: 'in-progress', progress: 15, date: "Jul 16" },
      { nameEn: "Cinematic Reel Assembly", nameJa: "極細マクロクローズアップ編集", status: 'pending', progress: 0, date: "Jul 22" },
      { nameEn: "Multi-Platform Launch", nameJa: "TikTok/Shorts同時プレミアム公開", status: 'pending', progress: 0, date: "Jul 26" }
    ]
  }
];

const TIMELINE_WEEKS = [
  { labelEn: "W1 (Jun 01)", labelJa: "第1週 (6/01~)" },
  { labelEn: "W2 (Jun 08)", labelJa: "第2週 (6/08~)" },
  { labelEn: "W3 (Jun 15)", labelJa: "第3週 (6/15~)" },
  { labelEn: "W4 (Jun 22)", labelJa: "第4週 (6/22~)" },
  { labelEn: "W5 (Jun 29)", labelJa: "第5週 (6/29~)" },
  { labelEn: "W6 (Jul 06)", labelJa: "第6週 (7/06~)" },
  { labelEn: "W7 (Jul 13)", labelJa: "第7週 (7/13~)" },
  { labelEn: "W8 (Jul 20)", labelJa: "第8週 (7/20~)" }
];

const WEEK_DATES = [
  { start: "Jun 01", end: "Jun 07" },
  { start: "Jun 08", end: "Jun 14" },
  { start: "Jun 15", end: "Jun 21" },
  { start: "Jun 22", end: "Jun 28" },
  { start: "Jun 29", end: "Jul 05" },
  { start: "Jul 06", end: "Jul 12" },
  { start: "Jul 13", end: "Jul 19" },
  { start: "Jul 20", end: "Jul 26" }
];

const TRANSLATIONS = {
  en: {
    title: "Revolutionized Active Projects",
    subtitle: "Horizontal Gantt-style visualizer of ongoing brand collaborations, custom setups, and media deliverables.",
    badge: "Campaign Gantt Engine",
    brandName: "Brand Partner",
    activePhase: "Current Milestone",
    completion: "Completion Rate",
    timelineSpan: "Timeline Scope: Q3 2026",
    selectPrompt: "Click bars to select. Drag & drop bars to dynamically shift project schedule.",
    phasesTitle: "Interactive Sub-Timeline & Deadlines",
    completionStatus: "Status",
    clickAction: "Lock & Authenticate Milestone",
    clickSuccess: "Milestone status verified!",
    started: "Launch Date",
    finished: "Delivery Target",
    currentMilestone: "Active Milestone",
    duration: "Duration",
    weeks: "Weeks",
    all: "All",
    active: "Active",
    completed: "Completed",
    exportTimeline: "Export Timeline"
  },
  ja: {
    title: "稼働プロジェクト・ガントタイムライン",
    subtitle: "現在進行中である各ブランドとのコラボレーション動画、特設レビュー案件の工程・ガントスケジュールです。",
    badge: "ガント工程テレメトリー",
    brandName: "提携ブランド",
    activePhase: "アクティブフェーズ",
    completion: "全体進捗",
    timelineSpan: "期間スコープ: 2026年Q3",
    selectPrompt: "クリックで詳細を展開。バーをドラッグ＆ドロップすると実稼働日程を変更できます。",
    phasesTitle: "詳細サブタイムライン ＆ 締切日一覧",
    completionStatus: "ステータス",
    clickAction: "工程進捗の暗号認証を実行",
    clickSuccess: "マイルストーン工程を検証完了！",
    started: "工程開始日",
    finished: "成果物納品日",
    currentMilestone: "稼働フェーズ",
    duration: "実働期間",
    weeks: "週間",
    all: "すべて",
    active: "稼働中",
    completed: "完了",
    exportTimeline: "工程表を書き出し"
  }
};

const getProjectStatus = (progress: number) => {
  if (progress === 100) {
    return {
      labelEn: "Completed",
      labelJa: "完了",
      bgClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      dotClass: "bg-emerald-400"
    };
  } else if (progress > 15) {
    return {
      labelEn: "In Progress",
      labelJa: "進行中",
      bgClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      dotClass: "bg-amber-400"
    };
  } else {
    return {
      labelEn: "Pending",
      labelJa: "保留中",
      bgClass: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
      dotClass: "bg-zinc-400"
    };
  }
};

const getProjectPriority = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return {
        labelEn: "High",
        labelJa: "高優先",
        bgClass: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        icon: <AlertCircle size={10} className="text-rose-400 shrink-0 animate-pulse" />
      };
    case 'medium':
      return {
        labelEn: "Medium",
        labelJa: "中優先",
        bgClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        icon: <Gauge size={10} className="text-amber-400 shrink-0" />
      };
    case 'low':
      return {
        labelEn: "Low",
        labelJa: "低優先",
        bgClass: "bg-sky-500/20 text-sky-300 border-sky-500/30",
        icon: <ArrowDownCircle size={10} className="text-sky-400 shrink-0" />
      };
  }
};

export const ProjectMilestones: React.FC<ProjectMilestonesProps> = ({ lang }) => {
  const trans = TRANSLATIONS[lang];
  const [campaigns, setCampaigns] = useState<CampaignProject[]>(CAMPAIGNS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('aurakeys');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [celebrateId, setCelebrateId] = useState<string | null>(null);
  
  const [activeDragProjId, setActiveDragProjId] = useState<string | null>(null);
  const [draggedOverCol, setDraggedOverCol] = useState<number | null>(null);

  const selectedProj = campaigns.find(c => c.id === selectedProjectId) || campaigns[0];

  const parseToRelativeDay = (dateStr: string): number => {
    const [month, dayStr] = dateStr.split(' ');
    const day = parseInt(dayStr, 10);
    if (month === 'Jun') {
      return day;
    } else if (month === 'Jul') {
      return 30 + day;
    }
    return day;
  };

  const formatFromRelativeDay = (dayNum: number): string => {
    if (dayNum <= 30) {
      return `Jun ${String(dayNum).padStart(2, '0')}`;
    } else {
      const julDay = dayNum - 30;
      return `Jul ${String(julDay).padStart(2, '0')}`;
    }
  };

  const handleProjectDrop = (projectId: string, targetCol: number) => {
    const proj = campaigns.find(c => c.id === projectId);
    if (!proj) return;

    audioSystem.playSuccess();
    setCampaigns(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      const newStartCol = Math.min(targetCol, 8 - p.gridSpanCols + 1);
      const oldStartCol = p.gridStartCol;
      const colDiff = newStartCol - oldStartCol;
      const daysDiff = colDiff * 7; // Each column represents 1 week (7 days)

      const oldStartDay = parseToRelativeDay(p.startDate);
      const oldEndDay = parseToRelativeDay(p.endDate);

      const newStartDay = oldStartDay + daysDiff;
      const newEndDay = oldEndDay + daysDiff;

      // Also shift all phases
      const updatedPhases = p.phases.map(phase => {
        const oldPhaseDay = parseToRelativeDay(phase.date);
        const newPhaseDay = oldPhaseDay + daysDiff;
        return {
          ...phase,
          date: formatFromRelativeDay(newPhaseDay)
        };
      });

      return {
        ...p,
        gridStartCol: newStartCol,
        startDate: formatFromRelativeDay(newStartDay),
        endDate: formatFromRelativeDay(newEndDay),
        phases: updatedPhases
      };
    }));
  };

  const handleBarClick = (id: string) => {
    audioSystem.playClick();
    setSelectedProjectId(id);
  };

  const handleVerifyMilestone = (id: string) => {
    audioSystem.playSuccess();
    setCelebrateId(id);
    setTimeout(() => setCelebrateId(null), 1400);
  };

  const handleExportTimeline = () => {
    audioSystem.playSuccess();
    
    // Generate file content
    const brandName = lang === 'ja' ? selectedProj.brandJa : selectedProj.brand;
    const campaignTitle = lang === 'ja' ? selectedProj.campaignTitleJa : selectedProj.campaignTitle;
    
    let content = `========================================================\n`;
    content += `SAMMIUM TECH INDUSTRIES - REVOLUTIONIZED PROJECT REPORT\n`;
    content += `========================================================\n\n`;
    content += `BRAND PARTNER: ${brandName}\n`;
    content += `CAMPAIGN TITLE: ${campaignTitle}\n`;
    content += `TIMELINE SCOPE: ${selectedProj.startDate} to ${selectedProj.endDate}\n`;
    content += `DURATION: ${selectedProj.gridSpanCols} Weeks\n`;
    content += `OVERALL PROGRESS: ${selectedProj.overallProgress}%\n\n`;
    content += `--------------------------------------------------------\n`;
    content += `MILESTONES & DEADLINES BREAKDOWN:\n`;
    content += `--------------------------------------------------------\n\n`;
    
    selectedProj.phases.forEach((phase, index) => {
      const statusStr = phase.status.toUpperCase();
      const phaseName = lang === 'ja' ? phase.nameJa : phase.nameEn;
      content += `${index + 1}. [${statusStr}] ${phaseName}\n`;
      content += `   Target Date: ${phase.date}\n`;
      content += `   Completion: ${phase.progress}%\n\n`;
    });
    
    content += `--------------------------------------------------------\n`;
    content += `Report generated on ${new Date().toLocaleDateString()} via Sammium Hub.\n`;
    content += `========================================================\n`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sammium_project_${selectedProj.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered projects
  const filteredCampaigns = campaigns.filter(c => {
    if (filter === 'completed') return c.overallProgress === 100;
    if (filter === 'active') return c.overallProgress < 100;
    return true;
  });

  return (
    <section className="mb-16 p-px bg-gradient-to-br from-white/10 to-transparent rounded-3xl relative overflow-hidden group">
      {/* Dynamic Background Light Spill */}
      <div 
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: selectedProj.color }}
      />

      <div className="relative bg-[#080809]/95 border border-white/5 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 overflow-hidden text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Briefcase size={16} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-purple-400 font-mono font-black">
                {trans.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase font-mono text-zinc-100">
              {trans.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 leading-relaxed">
              {trans.subtitle}
            </p>
          </div>

          {/* Real-time Ticker Badge */}
          <div className="flex items-center gap-2 p-1.5 bg-zinc-950/80 border border-white/5 rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase font-bold">
              {trans.timelineSpan}
            </span>
          </div>
        </div>

        {/* Filters and Help text */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
          <div className="flex gap-1.5">
            {(['all', 'active', 'completed'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFilter(type);
                  audioSystem.playClick();
                }}
                className={`px-3 py-1 text-[10px] font-mono uppercase rounded-lg border transition-all cursor-pointer ${
                  filter === type 
                    ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 font-bold' 
                    : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {trans[type]}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
            <Info size={11} className="text-teal-400" />
            {trans.selectPrompt}
          </span>
        </div>

        {/* 2. THE HORIZONTAL GANTT TIMELINE GRAPH */}
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
          <div className="min-w-[800px] space-y-4">
            
            {/* Header row: Weeks markers */}
            <div className="grid grid-cols-12 gap-2 text-center pb-2 border-b border-white/5">
              <div className="col-span-3 text-left pl-3 text-[10px] font-mono uppercase font-black text-zinc-500">
                {lang === 'ja' ? '案件 & 提携元' : 'Campaign & Partner'}
              </div>
              <div className="col-span-9 grid grid-cols-8 gap-2">
                {TIMELINE_WEEKS.map((wk, idx) => (
                  <div key={idx} className="text-[9px] font-mono text-zinc-400 py-1 bg-white/[0.01] border border-white/5 rounded-lg flex flex-col justify-center items-center">
                    <span className="font-bold text-zinc-300">{lang === 'ja' ? wk.labelJa.split(' ')[0] : wk.labelEn.split(' ')[0]}</span>
                    <span className="text-[7.5px] text-zinc-500">{lang === 'ja' ? wk.labelJa.split(' ')[1] : wk.labelEn.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gantt Rows representing ongoing Projects */}
            <div className="space-y-3 pt-1">
              {filteredCampaigns.map((proj) => {
                const isSelected = selectedProjectId === proj.id;
                
                // Calculate position values for timeline bar
                const startCol = proj.gridStartCol; // e.g. 1
                const spanCols = proj.gridSpanCols; // e.g. 3
                const endCol = startCol + spanCols; // e.g. 4
                
                // Grid classes
                // We use inline dynamic styling or predefined columns for full precision of the gantt bar
                return (
                  <div 
                    key={proj.id}
                    onClick={() => handleBarClick(proj.id)}
                    onMouseEnter={() => audioSystem.playHover()}
                    className={`grid grid-cols-12 gap-2 items-center p-2.5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      isSelected 
                        ? 'bg-white/[0.03] border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)]' 
                        : 'bg-transparent border-transparent hover:bg-white/[0.01]'
                    }`}
                  >
                    {/* Project/Partner Details Info Label */}
                    <div className="col-span-3 flex items-center gap-3 min-w-0 pr-2">
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border"
                        style={{ 
                          backgroundColor: `${proj.color}10`,
                          borderColor: `${proj.color}30`,
                          color: proj.color
                        }}
                      >
                        {proj.id === 'zenspace' && <Laptop size={15} />}
                        {proj.id === 'aurakeys' && <Bolt size={15} />}
                        {proj.id === 'veloglow' && <Zap size={15} />}
                        {proj.id === 'cybercaps' && <Layers size={15} />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-black truncate">
                            {lang === 'ja' ? proj.brandJa : proj.brand}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-zinc-200 truncate mt-0.5">
                          {lang === 'ja' ? proj.campaignTitleJa : proj.campaignTitle}
                        </h4>
                      </div>
                    </div>

                    {/* Horizontal Gantt Bar Row */}
                    <div className="col-span-9 grid grid-cols-8 gap-2 h-9 relative">
                      
                      {/* Ambient Grid Guide Lines in row acting as active drop zones */}
                      {Array.from({ length: 8 }).map((_, i) => {
                        const colIdx = i + 1;
                        const isDraggedOver = draggedOverCol === colIdx && activeDragProjId === proj.id;
                        return (
                          <div 
                            key={i} 
                            className={`border-r border-dashed border-white/[0.04] h-full transition-all relative ${
                              isDraggedOver ? 'bg-purple-500/10 border-r-purple-500/40' : ''
                            }`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              // Only allow drop if the project bar can fit within the 8 columns
                              if (colIdx + proj.gridSpanCols - 1 <= 8) {
                                setDraggedOverCol(colIdx);
                              }
                            }}
                            onDragLeave={() => {
                              setDraggedOverCol(null);
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              handleProjectDrop(proj.id, colIdx);
                              setActiveDragProjId(null);
                              setDraggedOverCol(null);
                            }}
                          />
                        );
                      })}

                      {/* Actual horizontal bar positioned over grid columns */}
                      <div 
                        draggable
                        onDragStart={(e) => {
                          setActiveDragProjId(proj.id);
                          e.dataTransfer.effectAllowed = 'move';
                        }}
                        onDragEnd={() => {
                          setActiveDragProjId(null);
                          setDraggedOverCol(null);
                        }}
                        className={`absolute top-1.5 bottom-1.5 rounded-xl border relative group/bar overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-250 select-none ${
                          activeDragProjId === proj.id ? 'opacity-40 border-purple-500/80 scale-95 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''
                        }`}
                        style={{
                          gridColumnStart: startCol,
                          gridColumnEnd: endCol,
                          left: '0px',
                          right: '0px',
                          backgroundColor: `${proj.color}15`,
                          borderColor: isSelected ? proj.color : `${proj.color}35`,
                          boxShadow: isSelected ? `0 0 15px ${proj.glowColor}` : 'none'
                        }}
                      >
                        {/* Progress fill bar inside gantt segment */}
                        <motion.div 
                           className="absolute top-0 bottom-0 left-0 rounded-l-lg opacity-85"
                           style={{ backgroundColor: proj.color }}
                           initial={{ width: 0 }}
                           animate={{ width: `${proj.overallProgress}%` }}
                           transition={{ duration: 1.2, ease: "easeOut" }}
                        />

                        {/* Interactive Sparkle or Indicator over the bar */}
                        <div className="absolute inset-0 flex items-center justify-between px-3 z-10">
                          <div className="flex items-center gap-3">
                            {/* Drag handle visual indicators */}
                            <div className="flex items-center text-zinc-500 group-hover/bar:text-zinc-300 transition-colors pointer-events-none shrink-0 gap-0.5">
                              <GripVertical size={11} className="opacity-70" />
                              <Move size={10} className="opacity-50" />
                            </div>

                            {/* Percentage-based visual progress bar capsule */}
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 shrink-0">
                              <span className="text-[9px] font-mono font-extrabold text-zinc-100">
                                {proj.overallProgress}%
                              </span>
                              <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden shrink-0">
                                <motion.div 
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: proj.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${proj.overallProgress}%` }}
                                  transition={{ duration: 1.2, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                            
                            {/* Visual Status Tag */}
                            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-md border font-extrabold flex items-center gap-1 leading-none shadow-sm ${getProjectStatus(proj.overallProgress).bgClass}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${getProjectStatus(proj.overallProgress).dotClass} animate-pulse`} />
                              <span>{lang === 'ja' ? getProjectStatus(proj.overallProgress).labelJa : getProjectStatus(proj.overallProgress).labelEn}</span>
                            </span>

                            {/* Priority Badge */}
                            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-md border font-extrabold flex items-center gap-1 leading-none shadow-sm ${getProjectPriority(proj.priority).bgClass}`}>
                              {getProjectPriority(proj.priority).icon}
                              <span>{lang === 'ja' ? getProjectPriority(proj.priority).labelJa : getProjectPriority(proj.priority).labelEn}</span>
                            </span>
                          </div>
                          <span className="text-[8px] font-mono text-zinc-400 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-black/80 px-1.5 py-0.5 rounded border border-white/10">
                            {proj.startDate} - {proj.endDate}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* 3. INTERACTIVE SUB-TIMELINE DETAILED BREAKDOWN PANEL */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-[#040405]/80 border border-white/5 relative overflow-hidden"
            >
              {/* Backlit highlight */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent pointer-events-none opacity-5"
                style={{ 
                  backgroundImage: `radial-gradient(circle at bottom right, ${selectedProj.glowColor} 0%, transparent 60%)` 
                }}
              />

              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-white/5 relative z-10">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block">
                    {trans.brandName}
                  </span>
                  <h3 className="text-base font-black text-zinc-100 flex items-center gap-2">
                    <span>{lang === 'ja' ? selectedProj.brandJa : selectedProj.brand}</span>
                    <Star size={13} className="text-yellow-400 fill-yellow-400/20 animate-pulse shrink-0" />
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    {lang === 'ja' ? selectedProj.campaignTitleJa : selectedProj.campaignTitle}
                  </p>
                </div>

                {/* Scope specs block */}
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-zinc-400 bg-white/[0.02] p-2.5 rounded-xl border border-white/5 shrink-0">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={11} className="text-purple-400" />
                    <span>{selectedProj.startDate} - {selectedProj.endDate}</span>
                  </div>
                  <div className="h-3 w-px bg-white/10" />
                  <div className="flex items-center gap-1">
                    <Flame size={11} className="text-teal-400" />
                    <span>{trans.duration}: {selectedProj.gridSpanCols} {trans.weeks}</span>
                  </div>
                </div>
              </div>

              {/* Sub-Timeline List containing exact dates and details */}
              <div className="pt-5 relative z-10">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold mb-4 flex items-center gap-1.5">
                  <Clock size={11} className="text-teal-400" />
                  <span>{trans.phasesTitle}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProj.phases.map((phase, pidx) => {
                    const isDone = phase.status === 'completed';
                    const isInProgress = phase.status === 'in-progress';
                    
                    return (
                      <div 
                        key={pidx}
                        className={`p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-3 ${
                          isInProgress 
                            ? 'bg-white/5 border-purple-500/30 shadow-md shadow-purple-500/5'
                            : isDone
                            ? 'bg-[#020202]/30 border-white/5 opacity-80'
                            : 'bg-transparent border-white/[0.02] opacity-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex gap-2.5 min-w-0">
                            {/* Checkmark Status bullet */}
                            <div className="shrink-0 mt-0.5">
                              {isDone ? (
                                <CheckCircle2 size={15} className="text-teal-400" />
                              ) : isInProgress ? (
                                <div className="w-4.5 h-4.5 rounded-full border-2 border-dashed border-purple-400 animate-spin" />
                              ) : (
                                <div className="w-4.5 h-4.5 rounded-full border border-zinc-800" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <span className="text-xs font-bold text-zinc-100 block leading-tight">
                                {lang === 'ja' ? phase.nameJa : phase.nameEn}
                              </span>
                              <span className="text-[9px] font-mono text-zinc-500 block mt-1">
                                {lang === 'ja' ? 'マイルストーン締切日' : 'DEADLINE TARGET'} : {phase.date}
                              </span>
                            </div>
                          </div>

                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 uppercase border ${
                            isDone 
                              ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' 
                              : isInProgress
                              ? 'bg-purple-500/10 border-purple-500/20 text-purple-400 animate-pulse'
                              : 'bg-zinc-900 border-white/5 text-zinc-600'
                          }`}>
                            {phase.status}
                          </span>
                        </div>

                        {/* Slide Progress indicator bar for sub-milestone */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                            <span>{lang === 'ja' ? 'フェーズ進行率' : 'PHASE PROGRESS'}</span>
                            <span className={isInProgress ? 'text-purple-400 font-bold' : ''}>{phase.progress}%</span>
                          </div>
                          <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: selectedProj.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${phase.progress}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Digital Contract Action Area */}
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  <span>SECURE AUTH CONNECTOR ACTIVE</span>
                </span>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <button
                    onClick={handleExportTimeline}
                    onMouseEnter={() => audioSystem.playHover()}
                    className="w-full sm:w-auto relative px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border border-white/5 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 select-none"
                  >
                    <Download size={13} className="text-teal-400" />
                    <span>{trans.exportTimeline}</span>
                  </button>

                  <button
                    onClick={() => handleVerifyMilestone(selectedProj.id)}
                    onMouseEnter={() => audioSystem.playHover()}
                    className="w-full sm:w-auto relative px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/25 text-purple-300 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 select-none"
                  >
                    <Award size={13} className="text-purple-400" />
                    <span>{trans.clickAction}</span>
                  </button>
                </div>
              </div>

              {/* Encryption popover banner overlay */}
              <AnimatePresence>
                {celebrateId === selectedProj.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-[#060607]/98 border border-purple-500/30 rounded-2xl flex flex-col items-center justify-center text-center p-6 z-20"
                  >
                    <motion.div
                      initial={{ scale: 0.6, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 10 }}
                      className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-3 text-purple-300"
                    >
                      <Sparkles size={24} className="animate-pulse" />
                    </motion.div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">
                      {trans.clickSuccess}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono max-w-md">
                      {lang === 'ja' 
                        ? `ブランド [${selectedProj.brandJa}] との暗号化された実証データ連携が検証され、テレメトリーに同期されました。` 
                        : `Secure telemetry channel compiled and calibrated successfully with brand [${selectedProj.brand}].`}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
