import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star, ArrowUpRight } from 'lucide-react';

interface Testimonial {
  id: string;
  brand: string;
  logoText: string;
  campaignType: string;
  quote: string;
  rating: number;
  metric: string;
  metricLabel: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: "test-1",
      brand: "Viper Esports Gear",
      logoText: "VIPER",
      campaignType: "Acoustic Keyboard Sound Test & Desk Pad Integration",
      quote: "Working with Zelo exceeded all our expectations. The keyboard sound test integration was meticulously recorded and hit 1.2M views on TikTok. It drove an unprecedented 14% click-through rate to our checkout storefront.",
      rating: 5,
      metric: "+157% Sale lift",
      metricLabel: "Campaign ROAS"
    },
    {
      id: "test-2",
      brand: "CoreAudio Inc.",
      logoText: "CORE",
      campaignType: "Premium Microphone & Wave XLR Bundle Showcase",
      quote: "Zelo represents the absolute pinnacle of high-end home setup content. The lighting, editing speed, and absolute clarity of the audio review positioned our studio microphone in front of highly motivated customers.",
      rating: 5,
      metric: "840K Views",
      metricLabel: "30-Day Reach"
    },
    {
      id: "test-3",
      brand: "Lumen LED Labs",
      logoText: "LUMEN",
      campaignType: "Setup Transformation Mini-Series",
      quote: "We've done several influencer placements, but Zelo's community behaves differently. The engagement in the comments section is highly organic with active gamers asking questions about setup specs and links.",
      rating: 5,
      metric: "24.5K Clicks",
      metricLabel: "Support Hub Actions"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <motion.section 
      id="sec-testimonials" 
      className="mb-16 relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[150px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] font-mono block mb-1">Brand Recognition</span>
          <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">Sponsor Testimonials</h2>
          <p className="text-sm text-zinc-400">Genuine metrics and campaigns delivered for verified hardware and lifestyle sponsors.</p>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/5 transition-all text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
            title="Previous Review"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[10px] text-zinc-500 font-mono">
            0{currentIndex + 1} / 0{testimonials.length}
          </span>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/5 transition-all text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
            title="Next Review"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Frosted Testimonial Card */}
      <div className="relative p-px bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl min-h-[280px]">
        <div className="bg-[#0b0b0b]/90 border border-white/5 backdrop-blur-3xl rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row justify-between gap-8 relative overflow-hidden interactive-card">
          
          {/* Subtle Decorative Quotes Icon */}
          <div className="absolute top-6 right-6 text-zinc-800 pointer-events-none">
            <Quote size={100} className="opacity-15 stroke-[1]" />
          </div>

          {/* Left Column: Quote and stars */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: current.rating }).map((_, idx) => (
                <Star key={idx} size={14} className="fill-purple-400 text-purple-400" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-zinc-200 text-base sm:text-lg italic font-sans leading-relaxed">
                  "{current.quote}"
                </p>
                
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-xs font-mono font-bold tracking-widest text-teal-400 border border-white/10 shadow-lg">
                    {current.logoText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">{current.brand}</h4>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mt-0.5">{current.campaignType}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Campaign Success Stat bubble */}
          <div className="w-full md:w-64 bg-zinc-950/80 border border-white/5 rounded-2xl p-6 flex flex-col justify-between shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
            
            <div>
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono block">Verified Result</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2"
                >
                  <div className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400 flex items-center gap-1">
                    {current.metric}
                  </div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono mt-1">{current.metricLabel}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-purple-400">
              <span>View Case Study</span>
              <ArrowUpRight size={12} />
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};
