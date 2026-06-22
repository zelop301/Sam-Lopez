import React from 'react';
import { motion } from 'motion/react';

interface AudioVisualizerProps {
  color?: string;
  count?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ color = "from-teal-400 to-purple-500", count = 18 }) => {
  // Generate different custom animation details to make it look organic
  const bars = Array.from({ length: count });

  return (
    <div className="flex items-end gap-[3px] h-7 px-2 py-0.5 bg-white/5 border border-white/5 rounded-lg backdrop-blur-md overflow-hidden relative group cursor-pointer" title="Simulating setup acoustic environment">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {bars.map((_, i) => {
        // Organic pseudo-random parameters for fluid waves
        const duration = 0.6 + (i % 5) * 0.15;
        const delay = (i % 3) * 0.1;
        
        return (
          <motion.div
            key={i}
            className={`w-[3px] rounded-t-full bg-gradient-to-t ${color} opacity-85`}
            initial={{ height: "15%" }}
            animate={{
              height: ["15%", "90%", "30%", "75%", "15%"],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};
