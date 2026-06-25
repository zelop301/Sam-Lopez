import React from 'react';
import { Tv, Gamepad2, Youtube, Instagram, Facebook, Globe, Briefcase, ArrowUpRight } from 'lucide-react';
import { CreatorKitWidget } from './CreatorKitWidget';
import { TikTokQrPopover } from './TikTokQrPopover';

interface ChannelDirectoryTabProps {
  lang: 'en' | 'ja';
  profile: any;
  rgbTheme: 'cyberpunk' | 'chroma' | 'toxic' | 'ice' | 'matrix';
}

export const ChannelDirectoryTab: React.FC<ChannelDirectoryTabProps> = ({
  lang,
  profile,
  rgbTheme
}) => {
  return (
    <div className="space-y-16">
      {/* Link in Bio / Social Directory */}
      <section>
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">
            {lang === 'ja' ? 'クリエイター活動チャンネル / サポートハブ' : 'Creator Channels / Support Hub'}
          </h2>
          <p className="text-sm text-zinc-400">
            {lang === 'ja' ? '洗練されたマルチリンク一覧。SNSやゲーム配信、スポンサー提案はこちらから。' : 'Revolutionized link-in-bio hub. Direct access to gaming streams and media sponsorships.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {profile.links.map((link: any) => {
            const isTikTok = link.id === 'link-tiktok';
            const targetUrl = isTikTok ? "https://www.tiktok.com/@zelo_gaming" : link.url;
            
            if (isTikTok) {
              return (
                <a
                  key={link.id}
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 text-left overflow-hidden hover:border-purple-500/30 active:scale-[0.98] interactive-card"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-3xl group-hover:bg-purple-500/20 transition-colors flex items-center justify-center pointer-events-none">
                    <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                  
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-purple-500/20">
                    <Tv size={18} className="text-zinc-200 animate-pulse" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-100 leading-tight group-hover:text-purple-300 transition-colors">{link.title}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-0.5">{link.category}</p>
                  </div>

                  <TikTokQrPopover 
                    tiktokUrl={targetUrl} 
                    tiktokHandle={profile.tiktokHandle} 
                    theme={rgbTheme}
                  />
                </a>
              );
            }

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 text-left overflow-hidden hover:border-purple-500/30 active:scale-[0.98] interactive-card"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-3xl group-hover:bg-purple-500/20 transition-colors flex items-center justify-center pointer-events-none">
                  <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-purple-400 transition-colors" />
                </div>
                
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-purple-500/20">
                  {link.id === 'link-twitch' && <Gamepad2 size={18} className="text-purple-400" />}
                  {link.id === 'link-youtube' && <Youtube size={18} className="text-rose-500" />}
                  {link.id === 'link-instagram' && <Instagram size={18} className="text-amber-500" />}
                  {link.id === 'link-facebook' && <Facebook size={18} className="text-blue-500" />}
                  {link.id === 'link-website' && <Globe size={18} className="text-cyan-400" />}
                  {link.id === 'link-sponsor-form' && <Briefcase size={18} className="text-teal-400" />}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-100 leading-tight group-hover:text-purple-300 transition-colors">{link.title}</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-0.5">{link.category}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Creator Hub Web Link & QR Kit Package */}
      <CreatorKitWidget theme={rgbTheme} lang={lang} />
    </div>
  );
};
