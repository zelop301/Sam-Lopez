import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioSystem } from '../utils/audioSystem';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  chars: string[];
}

export const ClickRippleSystem: React.FC = () => {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Avoid spawning on select inputs or interactive widgets if needed, but a global subtle feedback is perfect
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('.no-ripple')
      ) {
        return;
      }

      // Play retro audio click dynamically on any interactive click event
      audioSystem.playClick();

      // Spawn retro binary glitch particles around the clicked coordinate
      const chars = ['0', '1', '■', '▲', '◆', '+', 'X', 'Z'].sort(() => 0.5 - Math.random()).slice(0, 4);

      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        chars
      };

      setRipples((prev) => [...prev.slice(-10), newRipple]); // Limit maximum active ripples to prevent crowding
    };

    window.addEventListener('mousedown', handleGlobalClick);
    return () => {
      window.removeEventListener('mousedown', handleGlobalClick);
    };
  }, []);

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute"
            style={{ left: ripple.x, top: ripple.y }}
          >
            {/* Retro shockwave expanding circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => removeRipple(ripple.id)}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-dashed pointer-events-none"
              style={{ 
                borderColor: 'var(--neon-color-1)',
                boxShadow: '0 0 12px var(--neon-color-1), inset 0 0 12px var(--neon-color-1)'
              }}
            />

            {/* Glowing solid expanding ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.35, ease: "linear" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border pointer-events-none"
              style={{ 
                borderColor: 'var(--neon-color-2)',
                boxShadow: '0 0 8px var(--neon-color-2)'
              }}
            />

            {/* Glitching scatter particles (Katakana/Retro Characters) */}
            {ripple.chars.map((char, index) => {
              const angle = (index * 90) + (Math.random() * 20 - 10); // Standard scatter paths
              const radius = 30 + Math.random() * 25;
              const targetX = Math.cos(angle * Math.PI / 180) * radius;
              const targetY = Math.sin(angle * Math.PI / 180) * radius;

              return (
                <motion.span
                  key={index}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
                  animate={{ 
                    x: targetX, 
                    y: targetY, 
                    opacity: 0,
                    scale: 1.2,
                    rotate: Math.random() * 180 - 90
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute text-[9px] font-mono font-bold leading-none select-none pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    color: index % 2 === 0 ? 'var(--neon-color-1)' : 'var(--neon-color-2)',
                    textShadow: '0 0 4px var(--neon-color-1)'
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
