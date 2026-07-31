import React from 'react';
import { FUTURE_DREAMS } from '../data/content';
import { Cloud, Sparkles, Compass, Heart } from 'lucide-react';

export const FutureSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto z-10 text-center">
      <div className="space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Cloud className="w-4 h-4 text-amber-300" />
          <span>Dreamy Tomorrow</span>
          <Cloud className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 glow-text-gold">
          {FUTURE_DREAMS.heading} 🌅
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          A glimpse into the beautiful dreams and adventures waiting for Swayam & Isha.
        </p>
      </div>

      {/* Dreamscape Card */}
      <div className="relative max-w-3xl mx-auto rounded-3xl p-8 md:p-12 glass-panel border-2 border-amber-300/30 shadow-[0_0_60px_rgba(224,169,109,0.2)] space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400/20 to-rose-500/20 flex items-center justify-center border border-amber-300/40">
          <Compass className="w-8 h-8 text-amber-300 animate-spin-slow" />
        </div>

        <p className="font-script text-2xl md:text-3xl text-rose-100 leading-relaxed italic">
          "{FUTURE_DREAMS.paragraph}"
        </p>

        <div className="pt-4 border-t border-rose-300/10 flex items-center justify-center gap-2 text-xs font-sans-ui text-amber-200/80">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
          <span>Building Our Dream World Together</span>
        </div>
      </div>
    </section>
  );
};
