import React, { useState, useEffect } from 'react';
import { Clock, Globe, ShieldCheck, Zap } from 'lucide-react';

interface WorldClockProps {
  theme: 'cyberpunk' | 'chroma' | 'toxic' | 'ice' | 'matrix';
}

export const WorldClock: React.FC<WorldClockProps> = ({ theme }) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [isBusinessHours, setIsBusinessHours] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      // Fetch time specifically for Pacific Time Zone (Zelo's Local Time)
      const optionsTime: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      const optionsDate: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Los_Angeles',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      };

      try {
        const formatterTime = new Intl.DateTimeFormat('en-US', optionsTime);
        const formatterDate = new Intl.DateTimeFormat('en-US', optionsDate);
        
        const now = new Date();
        const formattedTime = formatterTime.format(now);
        setTimeStr(formattedTime);
        
        // Grab the hour to determine active availability (9 AM to 10 PM / 09:00 to 22:00 PT)
        // Expressing this securely using manual timezone parts
        const parts = formatterTime.formatToParts(now);
        const hourPart = parts.find(p => p.type === 'hour');
        if (hourPart) {
          const hour = parseInt(hourPart.value, 10);
          setIsBusinessHours(hour >= 9 && hour < 22);
        }

        setDateStr(formatterDate.format(now));
      } catch (err) {
        // Fallback if Intl.DateTimeFormat has any runtime restriction
        const now = new Date();
        setTimeStr(now.toLocaleTimeString());
        setDateStr(now.toLocaleDateString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 bg-zinc-950/80 border border-white/5 p-2 px-3 rounded-2xl backdrop-blur-md relative overflow-hidden group select-none">
      {/* Dynamic ambient laser line reflection in the clock widget */}
      <div 
        className="absolute top-0 bottom-0 left-0 w-[2px] transition-all duration-300" 
        style={{ backgroundColor: 'var(--neon-color-1)', boxShadow: 'var(--neon-glow-1)' }} 
      />

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <Globe size={11} className="text-zinc-500 group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-[8px] uppercase tracking-widest text-[#a3a3a3] font-mono font-bold">
            ZELO HQ (GMT-7)
          </span>
          <span className="relative flex h-1.5 w-1.5 items-center justify-center">
            <span 
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isBusinessHours ? 'bg-emerald-400' : 'bg-amber-400'
              }`} 
            />
            <span 
              className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                isBusinessHours ? 'bg-emerald-500' : 'bg-amber-500'
              }`} 
            />
          </span>
        </div>

        {/* Dynamic Digital Clock Display with monospace numbers */}
        <div className="text-sm font-mono font-black tracking-widest text-white mt-0.5 flex items-center gap-1.5">
          <span 
            className="transition-colors duration-500"
            style={{ 
              color: 'var(--neon-color-1)', 
              textShadow: '0 0 6px var(--neon-color-1)' 
            }}
          >
            {timeStr || '00:00:00'}
          </span>
          <span className="text-[9px] text-zinc-500 font-normal">PT</span>
        </div>
      </div>

      <div className="hidden sm:flex flex-col border-l border-white/5 pl-3 pr-1 justify-center h-8">
        <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono font-bold">
          Collab State
        </span>
        <span 
          className="text-[9px] font-mono font-bold uppercase tracking-wider block mt-0.5 transition-colors duration-500"
          style={{ color: isBusinessHours ? 'var(--neon-color-1)' : '#f3f4f6' }}
        >
          {isBusinessHours ? '● Open to Deals' : '● Off-stream'}
        </span>
      </div>
    </div>
  );
};
