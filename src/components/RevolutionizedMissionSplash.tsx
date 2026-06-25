import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Terminal, 
  Shield, 
  Flame, 
  Sliders, 
  Cpu, 
  Activity, 
  RefreshCw, 
  Volume2, 
  VolumeX,
  Play,
  TrendingUp,
  Atom,
  Eye,
  Rocket
} from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface RevolutionizedMissionSplashProps {
  lang: 'en' | 'ja';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  originalColor: string;
  glow: number;
}

export const RevolutionizedMissionSplash: React.FC<RevolutionizedMissionSplashProps> = ({ lang }) => {
  const [typedText, setTypedText] = useState('');
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [particleDensity, setParticleDensity] = useState(45);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [colorTheme, setColorTheme] = useState<'cosmic' | 'emerald' | 'crimson'>('cosmic');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: -1000, y: -1000 });

  const greetings = lang === 'ja' ? [
    'システム初期化完了... サミウム・テクノロジーハブへようこそ。',
    '限界を打ち破る。最先端デバイスとゲーム美学の融合。',
    'ミッション：テクノロジーで世界を革命し、強力な信念を築く。',
    'インタラクティブ粒子シミュレーターがオンラインになりました。'
  ] : [
    'SYSTEM INITIALIZED... WELCOME TO SAMMIUM TECH HUB.',
    'BREAKING BARRIERS. BRIDGING PREMIUM GEAR WITH METRIC ENGINE.',
    'OUR MISSION: REVOLUTIONIZE WORKSPACES WITH FAITH & INNOVATION.',
    'INTERACTIVE NEON CONSTELATION GRAPH IS ONLINE.'
  ];

  // Blinking Caret & Typing Effect
  useEffect(() => {
    let currentText = '';
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const fullTxt = greetings[greetingIndex];
      
      if (isDeleting) {
        currentText = fullTxt.substring(0, currentText.length - 1);
      } else {
        currentText = fullTxt.substring(0, currentText.length + 1);
      }

      setTypedText(currentText);

      let delta = 80 - Math.random() * 40;

      if (isDeleting) {
        delta /= 2; // Delete faster
      }

      if (!isDeleting && currentText === fullTxt) {
        delta = 4000; // Hold full text
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
        delta = 600;
      }

      timer = setTimeout(tick, delta);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [greetingIndex, lang]);

  // Particle Field Background Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = 360;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 360;
    };

    window.addEventListener('resize', handleResize);

    // Color definitions
    const themes = {
      cosmic: {
        bg: '#050508',
        p1: 'rgba(168, 85, 247, 0.75)', // Purple
        p2: 'rgba(45, 212, 191, 0.75)', // Teal
        line: 'rgba(168, 85, 247, 0.08)'
      },
      emerald: {
        bg: '#040705',
        p1: 'rgba(16, 185, 129, 0.75)', // Emerald
        p2: 'rgba(56, 189, 248, 0.75)', // Sky
        line: 'rgba(16, 185, 129, 0.08)'
      },
      crimson: {
        bg: '#080405',
        p1: 'rgba(239, 68, 68, 0.75)', // Red
        p2: 'rgba(244, 63, 94, 0.75)', // Rose
        line: 'rgba(239, 68, 68, 0.08)'
      }
    };

    // Initialize particles
    let particles: Particle[] = [];
    const createParticles = () => {
      particles = [];
      const currentTheme = themes[colorTheme];
      for (let i = 0; i < particleDensity; i++) {
        const color = Math.random() > 0.5 ? currentTheme.p1 : currentTheme.p2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.2 * particleSpeed,
          vy: (Math.random() - 0.5) * 1.2 * particleSpeed,
          radius: Math.random() * 2.5 + 1.2,
          color,
          originalColor: color,
          glow: Math.random() * 15 + 5
        });
      }
    };

    createParticles();

    // Interaction handler
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const currentTheme = themes[colorTheme];

      // Draw elegant subtle grid overlay on background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Process and render particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep inside bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Interactive gravity or push on mouse proximity
        const dx = mousePosition.current.x - p.x;
        const dy = mousePosition.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          // Slowly attract or push depending on mouse interaction style
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glow;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset for lines

        // Draw connections between nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < 100) {
            const alpha = (100 - ldist) / 100 * 0.15;
            ctx.strokeStyle = p.color.replace('0.75', alpha.toString());
            ctx.lineWidth = (100 - ldist) / 100 * 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [particleDensity, particleSpeed, colorTheme]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mousePosition.current = { x: -1000, y: -1000 };
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) {
      audioSystem.playClick();
    } else {
      audioSystem.playSuccess();
    }
  };

  const triggerBeep = () => {
    if (soundEnabled) {
      audioSystem.playHover();
    }
  };

  const MISSION_VALUES = lang === 'ja' ? [
    {
      id: 'faith',
      title: '堅固な信念 (Faith)',
      desc: 'すべてのプロジェクトに卓越した信念を捧げ、最高品質のインフラ、デバイス、クリエイティブを築きます。',
      icon: Shield,
      glowColor: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'innovation',
      title: '継続の革新 (Innovation)',
      desc: 'ワークスペースとメディア技術を継続的に再定義し、未来のインタラクションを開拓します。',
      icon: Atom,
      glowColor: 'from-teal-400 to-emerald-500'
    },
    {
      id: 'action',
      title: '即座の行動 (Action)',
      desc: '迅速なターンアラウンドと優れた音響/映像シネマティックスを提供し、パートナーシップ価値を最大化します。',
      icon: Rocket,
      glowColor: 'from-rose-500 to-orange-500'
    }
  ] : [
    {
      id: 'faith',
      title: 'Strong Faith',
      desc: 'Dedicating uncompromising faith to our projects, hardware reviews, and interactive digital design interfaces.',
      icon: Shield,
      glowColor: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'innovation',
      title: 'Revolutionary Innovation',
      desc: 'Continually redefining desk space setups and sound dynamics to push tech creator milestones to the next tier.',
      icon: Atom,
      glowColor: 'from-teal-400 to-emerald-500'
    },
    {
      id: 'action',
      title: 'Relentless Execution',
      desc: 'Creating high-engagement video assets, physical brand integrations, and cinematic b-rolls in rapid timeframes.',
      icon: Rocket,
      glowColor: 'from-rose-500 to-orange-500'
    }
  ];

  return (
    <div className="relative rounded-3xl bg-[#060608] border border-white/5 overflow-hidden shadow-2xl shadow-black/80">
      
      {/* 1. Interactive Canvas Layer */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 w-full h-full cursor-crosshair opacity-75 z-0"
      />

      {/* Holographic Glowing Orbs on corners */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Border Ticker/Sub-indicator */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
            <Activity size={10} className="text-purple-400 animate-pulse" />
            {lang === 'ja' ? 'SAMMIUM 革命ミッション指令部' : 'SAMMIUM REVOLUTIONIZED MISSION CONTROL'}
          </span>
        </div>

        {/* Audio feedback indicator and quick customizer settings */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? "Mute interface feedback" : "Enable interface feedback"}
          >
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
            <Sliders size={10} className="text-teal-400" />
            <span>NODE SYS V1.9</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8">
        
        {/* Left Column: Mission Description, Brand Title, & Typed Greetings */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/10 to-teal-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-[10px] font-mono tracking-widest uppercase">
              <Sparkles size={11} className="text-teal-400" />
              <span>{lang === 'ja' ? '限界を超えたテクノロジーイノベーション' : 'REVOLUTIONIZED WORKSPACE METRICS'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white leading-none">
              {lang === 'ja' ? (
                <>
                  空間と音響を<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-teal-300">
                    再定義する。
                  </span>
                </>
              ) : (
                <>
                  REVOLUTIONIZED<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-teal-300 to-indigo-400">
                    MISSION PORTAL
                  </span>
                </>
              )}
            </h1>

            {/* Futuristic terminal typing output container */}
            <div className="bg-black/60 border border-white/10 rounded-2xl p-4 font-mono text-[11px] text-zinc-300 shadow-inner relative overflow-hidden backdrop-blur-sm min-h-[72px] flex items-center">
              <div className="absolute top-1 right-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-start gap-2 w-full">
                <Terminal size={14} className="text-purple-400 shrink-0 mt-0.5 animate-pulse" />
                <div className="flex-1 text-zinc-300 leading-relaxed">
                  <span className="text-teal-400 font-bold">$ </span>
                  {typedText}
                  <span className="inline-block w-1.5 h-3.5 ml-1 bg-purple-400 animate-blink" style={{ verticalAlign: 'middle' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive controls: Adjust particle physics variables real-time */}
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3 backdrop-blur-sm">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              <span>粒子システム制御 (SIMULATOR CONTROLS)</span>
              <span className="text-teal-400 flex items-center gap-1">
                <RefreshCw size={9} className="animate-spin" style={{ animationDuration: '6s' }} />
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* Density Control */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-zinc-400 block uppercase">
                  {lang === 'ja' ? '粒子密度:' : 'Density:'} {particleDensity}
                </label>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  value={particleDensity} 
                  onChange={(e) => {
                    setParticleDensity(Number(e.target.value));
                    triggerBeep();
                  }}
                  className="w-full accent-purple-500 h-1 rounded-lg bg-zinc-800 cursor-pointer"
                />
              </div>

              {/* Speed Control */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-zinc-400 block uppercase">
                  {lang === 'ja' ? '移動速度:' : 'Speed:'} {particleSpeed}x
                </label>
                <input 
                  type="range" 
                  min="0.2" 
                  max="3" 
                  step="0.1"
                  value={particleSpeed} 
                  onChange={(e) => {
                    setParticleSpeed(Number(e.target.value));
                    triggerBeep();
                  }}
                  className="w-full accent-teal-400 h-1 rounded-lg bg-zinc-800 cursor-pointer"
                />
              </div>

              {/* Theme Selector */}
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-[9px] font-mono text-zinc-400 block uppercase">
                  {lang === 'ja' ? 'カラー設定' : 'Atmosphere:'}
                </span>
                <div className="flex items-center gap-1">
                  {(['cosmic', 'emerald', 'crimson'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setColorTheme(t);
                        audioSystem.playClick();
                      }}
                      className={`flex-1 text-[8px] font-mono py-1 rounded transition-all uppercase border ${
                        colorTheme === t 
                          ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 font-bold' 
                          : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Key Creed & Mission Cards with Hover-attracted Highlights */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
          <div className="space-y-1.5 mb-2">
            <span className="text-[9px] font-mono tracking-widest text-teal-400 uppercase font-black">
              {lang === 'ja' ? 'コアコンパス ＆ クリード' : 'SAMMIUM TECH CORE COMPASS'}
            </span>
            <p className="text-xs text-zinc-400">
              {lang === 'ja' ? '私たちが創造するすべてのインフラの根底にある3つの基本柱です。' : 'The structural foundations guiding our content pipeline, campaign deliverability, and peripheral engineering.'}
            </p>
          </div>

          <div className="space-y-3">
            {MISSION_VALUES.map((val) => {
              const IconComp = val.icon;
              const isHovered = hoveredValue === val.id;

              return (
                <button
                  key={val.id}
                  onMouseEnter={() => {
                    setHoveredValue(val.id);
                    triggerBeep();
                  }}
                  onMouseLeave={() => setHoveredValue(null)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group/card cursor-pointer ${
                    isHovered 
                      ? 'bg-gradient-to-r from-zinc-900 to-[#121217] border-purple-500/40 translate-x-1.5 shadow-lg shadow-purple-500/5' 
                      : 'bg-zinc-950/80 border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Subtle dynamic background glow */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${val.glowColor} opacity-[0.02] group-hover/card:opacity-[0.06] rounded-full blur-xl transition-all duration-500`} />

                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-2.5 rounded-xl transition-all duration-300 bg-zinc-900 border border-white/10 flex items-center justify-center ${
                      isHovered ? 'text-teal-300 border-teal-500/20 shadow-[0_0_15px_rgba(45,212,191,0.15)] bg-black/40' : 'text-zinc-400'
                    }`}>
                      <IconComp size={16} className={isHovered ? 'animate-bounce' : ''} style={{ animationDuration: '3s' }} />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-bold font-mono tracking-wide text-zinc-100 flex items-center justify-between">
                        <span>{val.title}</span>
                        {isHovered && (
                          <span className="text-[8px] font-mono text-teal-400 animate-pulse tracking-widest">
                            [ ACTIVE ]
                          </span>
                        )}
                      </h4>
                      <p className="text-[10.5px] text-zinc-400 leading-relaxed font-sans">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* CSS Animation Blinking cursor styling helper */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>

    </div>
  );
};
