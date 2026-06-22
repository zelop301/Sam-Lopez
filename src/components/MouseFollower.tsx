import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const MouseFollower: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high performance lag transition
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const innerX = useSpring(mouseX, { damping: 40, stiffness: 800 });
  const innerY = useSpring(mouseY, { damping: 40, stiffness: 800 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Dynamic hover styles for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive-card');
      
      setIsHovered(!!isInteractive);
    };

    // Check if device supports touch to prevent sticky screen nodes
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mouseover', handleMouseOver);
      }
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Aesthetic Cyberpunk Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'var(--neon-color-1)',
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'var(--neon-color-2)' : 'var(--neon-color-1)',
          backgroundColor: isHovered ? 'var(--neon-cursor-outer)' : 'rgba(0, 0, 0, 0)',
          boxShadow: isHovered 
            ? 'var(--neon-glow-1)' 
            : '0 0 0px rgba(0, 0, 0, 0)'
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Inner precise digital pinpoint */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-screen"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--neon-color-2)',
        }}
        animate={{
          scale: isClicking ? 1.4 : isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? '#ffffff' : 'var(--neon-color-2)'
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {isHovered && (
          <div className="absolute w-6 h-6 rounded-full border border-white/20 animate-ping" />
        )}
      </motion.div>
    </>
  );
};
