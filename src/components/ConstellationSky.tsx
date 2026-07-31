import React, { useState } from 'react';
import { STAR_MESSAGES, StarMessage } from '../data/content';
import { Star, Sparkles, X, Heart, Compass } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const ConstellationSky: React.FC = () => {
  const [activeStar, setActiveStar] = useState<StarMessage | null>(null);

  const openStar = (star: StarMessage) => {
    soundEngine.playChime();
    setActiveStar(star);
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Compass className="w-4 h-4 text-amber-300" />
          <span>Our Constellation</span>
          <Compass className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-gold">
          Our Stars in the Night Sky ✨
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-lg mx-auto text-sm md:text-base">
          Click on the twinkling stars below to unveil secret love messages written in the stars for Isha.
        </p>
      </div>

      {/* Interactive Constellation Canvas Frame */}
      <div className="relative h-[480px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#05010d] via-[#0d041f] to-[#15062b] border border-amber-300/30 shadow-[0_0_50px_rgba(224,169,109,0.15)]">
        {/* SVG Constellation Lines Connecting Stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <line x1="20%" y1="30%" x2="45%" y2="25%" stroke="#ffb6c1" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="45%" y1="25%" x2="75%" y2="35%" stroke="#ffb6c1" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="45%" y1="25%" x2="30%" y2="70%" stroke="#ffb6c1" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="30%" y1="70%" x2="60%" y2="60%" stroke="#ffb6c1" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="60%" y1="60%" x2="80%" y2="75%" stroke="#ffb6c1" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Twinkling Background Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Clickable Glowing Stars */}
        {STAR_MESSAGES.map((star) => (
          <button
            key={star.id}
            onClick={() => openStar(star)}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full bg-amber-300/20 animate-ping group-hover:bg-rose-400/40" />
              <Star className="w-6 h-6 text-amber-200 fill-amber-300 group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]" />
              <span className="absolute -bottom-5 text-[10px] font-sans-ui text-amber-200/80 font-semibold whitespace-nowrap opacity-80 group-hover:opacity-100">
                {star.starName}
              </span>
            </div>
          </button>
        ))}

        {/* Info Overlay */}
        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs text-amber-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>Constellation "ISHA ❤️ SWAYAM"</span>
        </div>
      </div>

      {/* Star Message Modal */}
      {activeStar && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveStar(null)}
        >
          <div
            className="relative max-w-md w-full glass-panel rounded-3xl p-8 border border-amber-300/40 shadow-2xl text-center space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveStar(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/10 flex items-center justify-center border border-amber-300/40">
              <Star className="w-8 h-8 text-amber-300 fill-amber-300 animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-sans-ui uppercase tracking-widest text-amber-300 font-semibold">
                {activeStar.starName}
              </span>
              <h3 className="text-xl font-serif-title font-bold text-rose-100">
                Written in the Stars
              </h3>
            </div>

            <p className="font-script text-2xl text-rose-200 leading-relaxed italic">
              "{activeStar.quote}"
            </p>

            <div className="border-t border-rose-300/10 pt-4 flex items-center justify-center gap-2 text-xs font-sans-ui text-amber-200/80">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
              <span>With all my heart, {activeStar.author}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
