import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SocialsFeed } from './SocialsFeed';

interface TikTokClipsTabProps {
  lang: 'en' | 'ja';
  profile: any;
}

export const TikTokClipsTab: React.FC<TikTokClipsTabProps> = ({
  lang,
  profile
}) => {
  return (
    <div className="space-y-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Trending TikTok Footage (takes 7 columns on large screens) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-purple-400 font-mono block mb-1 font-bold">
              {lang === 'ja' ? 'バズショート映像' : 'VIRAL CAMPAIGN FOOTAGE'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase font-mono text-zinc-100">
              {lang === 'ja' ? 'トレンド動画ギャラリー' : 'Trending TikTok Footage'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {lang === 'ja' 
                ? '商品開封、特注キーボードの静音打鍵音テスト、Valorant神プレイクリップなど。' 
                : 'Viral unboxings, custom keyboard setups, and tactical clutch moments.'
              }</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {profile.clips.map((clip: any, index: number) => (
              <motion.div 
                key={clip.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                className="group rounded-2xl bg-[#09090a]/80 border border-white/5 overflow-hidden hover:border-purple-500/20 hover:scale-[1.01] transition-all flex flex-col justify-between"
              >
                <div className="aspect-video relative overflow-hidden bg-zinc-900 border-b border-white/5">
                  <img 
                    src={clip.thumbnailUrl} 
                    alt={clip.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  
                  {/* Aspect tag */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-widest text-[#a3a3a3]">
                    TikTok Clip
                  </div>

                  {/* Play circle overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-purple-500/80 backdrop-blur-sm flex items-center justify-center border border-purple-400">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-200 line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
                    {clip.title}
                  </h4>
                  
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        {clip.views} Views
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        {clip.likes} Likes
                      </span>
                    </div>

                    <a 
                      href={clip.tiktokUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                    >
                      <span>{lang === 'ja' ? '視聴する' : 'Watch'}</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Right Side: Live Scrolling Socials Feed (takes 5 columns on large screens) */}
        <section className="lg:col-span-5">
          <SocialsFeed lang={lang} />
        </section>

      </div>
    </div>
  );
};

