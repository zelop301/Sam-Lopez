import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X, ExternalLink, Smartphone, Copy, Check } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface TikTokQrPopoverProps {
  tiktokUrl: string;
  tiktokHandle: string;
  theme: 'cyberpunk' | 'chroma' | 'toxic' | 'ice' | 'matrix';
}

export const TikTokQrPopover: React.FC<TikTokQrPopoverProps> = ({ 
  tiktokUrl, 
  tiktokHandle,
  theme 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const uAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMob = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(uAgent);
      setIsMobile(isMob);
    };
    checkMobile();
  }, []);

  // Map theme identifier to clean RGB color hexes for the API (must be 6-digit hex without #)
  const getThemeHexColor = () => {
    switch (theme) {
      case 'cyberpunk':
        return '06b6d4'; // cyan
      case 'chroma':
        return 'ff007f'; // deep pink
      case 'toxic':
        return '39ff14'; // neon green
      case 'ice':
        return '00f0ff'; // neon ice blue
      case 'matrix':
        return '10b981'; // matrix green
      default:
        return '2dd4bf'; // default teal
    }
  };

  const hexColor = getThemeHexColor();
  // Call official secure and free qrserver API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=${hexColor}&bgcolor=0b0b0b&data=${encodeURIComponent(tiktokUrl)}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    audioSystem.playClick();
    try {
      await navigator.clipboard.writeText(tiktokUrl);
      setCopied(true);
      audioSystem.playPop();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <>
      {/* Small Inline QR Icon Trigger inside the card */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          audioSystem.playPop();
          setIsOpen(true);
        }}
        onMouseEnter={() => audioSystem.playHover()}
        className="absolute bottom-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-purple-500/40 text-zinc-400 hover:text-white transition-all duration-300 pointer-events-auto z-10 flex items-center justify-center cursor-pointer group"
        title={isMobile ? "Open Sammium Tech Profile" : "View TikTok Scan QR Code"}
      >
        {isMobile ? (
          <Smartphone size={15} className="group-hover:scale-110 transition-transform text-purple-400 animate-pulse" />
        ) : (
          <QrCode size={15} className="group-hover:scale-110 transition-transform" />
        )}
        <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-1.5 text-[9px] uppercase tracking-wider font-mono transition-all duration-300 whitespace-nowrap">
          {isMobile ? "Open App" : "Scan QR"}
        </span>
      </button>

      {/* Holographic QR Code Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur blur-md */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                audioSystem.playBlip();
                setIsOpen(false);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Glowing Panel contents */}
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="relative w-full max-w-sm p-px bg-gradient-to-b from-white/10 via-transparent to-white/5 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Outer Neon Glow Ring */}
              <div 
                className="absolute -inset-1 blur opacity-30 transition duration-1000"
                style={{
                  background: 'linear-gradient(180deg, var(--neon-color-1), var(--neon-color-2))'
                }}
              />

              <div className="relative bg-[#0b0b0b] border border-white/10 rounded-3xl p-6 flex flex-col items-center">
                {/* Header Title with Custom Neon Gradient styling */}
                <div className="flex justify-between items-center w-full mb-6 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Smartphone size={16} style={{ color: 'var(--neon-color-1)' }} />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Mobile Follow Code</span>
                  </div>
                  <button
                    onClick={() => {
                      audioSystem.playBlip();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => audioSystem.playHover()}
                    className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Subtitle brand */}
                <div className="text-center mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/10">
                    {tiktokHandle}
                  </span>
                  <p className="text-xs text-zinc-400 mt-2">
                    {isMobile 
                      ? "Launch the native TikTok application instantly" 
                      : "Scan with your smartphone camera to follow Sammium Tech instantly"}
                  </p>
                </div>

                {/* Animated Scanner QR Container / Mobile action block */}
                {isMobile ? (
                  <div className="relative p-6 bg-[#070707] border border-white/5 rounded-2xl mb-6 shadow-inner flex flex-col items-center justify-center w-64 h-64 overflow-hidden">
                    {/* Glowing animated backpulse */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-teal-500/10 opacity-40 animate-pulse -z-10" />

                    {/* Rotating dashboard design element */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute w-36 h-36 rounded-full border border-dashed border-purple-500/20 flex items-center justify-center -z-10"
                    />

                    {/* Corner revolutionized HUD crosshairs */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--neon-color-1)' }} />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--neon-color-1)' }} />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--neon-color-2)' }} />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--neon-color-2)' }} />

                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
                      <Smartphone size={28} className="text-purple-400 animate-bounce" />
                    </div>

                    <a
                      href={`tiktok://user?username=${tiktokHandle.replace('@', '')}`}
                      onClick={() => {
                        audioSystem.playClick();
                        audioSystem.playPop();
                      }}
                      onMouseEnter={() => audioSystem.playHover()}
                      className="w-full py-3 px-4 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-black active:scale-95 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                      style={{
                        background: 'linear-gradient(135deg, var(--neon-color-1), var(--neon-color-2))'
                      }}
                    >
                      <span>Open TikTok App</span>
                      <ExternalLink size={13} />
                    </a>

                    <p className="text-[9px] font-mono text-zinc-500 text-center uppercase tracking-wider mt-3">
                      App not opening? <br/>
                      Use <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Direct Web Link</a>
                    </p>
                  </div>
                ) : (
                  <div className="relative p-4 bg-[#070707] border border-white/5 rounded-2xl mb-6 shadow-inner overflow-hidden flex items-center justify-center w-64 h-64">
                    {/* Sweep Scanning laser line */}
                    <motion.div
                      animate={{
                        y: [-120, 120]
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="absolute left-4 right-4 h-[2px] opacity-75 z-10 shadow-[0_0_8px_rgba(255,255,255,1)]"
                      style={{
                        background: 'linear-gradient(90deg, transparent, var(--neon-color-1), var(--neon-color-2), transparent)',
                        boxShadow: '0 0 10px var(--neon-color-1)'
                      }}
                    />

                    {/* Corner revolutionized HUD crosshairs */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--neon-color-1)' }} />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--neon-color-1)' }} />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--neon-color-2)' }} />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--neon-color-2)' }} />

                    {/* QR Image fetching */}
                    <img
                      src={qrCodeUrl}
                      alt={`Sammium Tech Follow QR`}
                      className="w-52 h-52 rounded-xl border border-white/5 relative z-0 object-contain selection:bg-transparent"
                      onError={(e) => {
                        // Fallback visual if API is ever blocked/slow
                        e.currentTarget.src = "https://placehold.co/200x200/0b0b0b/2dd4bf?text=SAMMIUM+TECH+QR";
                      }}
                    />
                  </div>
                )}

                {/* Direct Action triggers */}
                <div className="flex gap-2 w-full">
                  <button
                    onClick={handleCopy}
                    onMouseEnter={() => audioSystem.playHover()}
                    className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-purple-500/20 active:scale-95 transition-all text-zinc-300 hover:text-white cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioSystem.playClick()}
                    onMouseEnter={() => audioSystem.playHover()}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-black active:scale-95 transition-all cursor-pointer hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--neon-color-1), var(--neon-color-2))'
                    }}
                  >
                    <span>Open Direct</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
