import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  isActive: boolean;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas smoothly to fill container
    let animationFrameId: number;
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (Katakana, numbers, and alphabets)
    const characters = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    
    // Tracks current Y position of each falling code stream
    let drops: number[] = [];
    const initDrops = () => {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // staggered initial offsets
      }
    };
    initDrops();

    // Re-initialize columns on resize
    const handleResizeWidthChange = () => {
      resizeCanvas();
      initDrops();
    };
    window.addEventListener('resize', handleResizeWidthChange);

    const draw = () => {
      // Semi-transparent black background to create fading trailing effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick a matching character randomly
        const char = characters[Math.floor(Math.random() * characters.length)];
        
        // Highlight the leading/newest falling character with pure bright white/green glow
        const isLeading = Math.random() > 0.98;
        ctx.fillStyle = isLeading ? '#ffffff' : '#10b981';
        
        if (!isLeading && Math.random() > 0.95) {
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop back to top after it goes offscreen with a randomized delay
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        // Increment down standard speed
        drops[i] += 0.85;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', handleResizeWidthChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.22] z-0 transition-opacity duration-1000"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
