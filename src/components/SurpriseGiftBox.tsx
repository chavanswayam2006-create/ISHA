import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, Trophy, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const SurpriseGiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    soundEngine.playCelebrationSound();
    setIsOpen(true);

    // Burst celebration confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#e0a96d', '#ffb6c1', '#ffd700']
    });
  };

  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto z-10 text-center">
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Gift className="w-4 h-4 text-amber-300" />
          <span>A Special Present</span>
          <Gift className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Unwrap Your Surprise Gift 🎁
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          There is something extra special waiting inside for Isha. Tap the ribbon to open!
        </p>
      </div>

      {/* Gift Box Container */}
      <div className="relative max-w-md mx-auto">
        {!isOpen ? (
          <div
            onClick={handleOpenGift}
            className="group relative cursor-pointer glass-panel rounded-3xl p-12 border-2 border-amber-300/40 shadow-[0_0_50px_rgba(255,215,0,0.2)] hover:scale-105 transition-all duration-500 animate-float-slow"
          >
            {/* Ribbon Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-rose-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:opacity-100 opacity-60 transition-opacity" />

            <div className="relative space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                <Gift className="w-12 h-12 text-white" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif-title font-bold text-rose-100">
                  Tap to Unwrap Gift
                </h3>
                <p className="text-xs font-sans-ui text-amber-200/80">
                  Wrapped with love by Swayam ❤️
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 text-white font-semibold text-xs shadow-lg group-hover:bg-rose-600 transition-colors">
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Open Present</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-8 border-2 border-rose-400/50 shadow-2xl space-y-6 animate-pulse-glow">
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-300/40">
              <Heart className="w-10 h-10 text-rose-400 fill-rose-500 animate-bounce" />
            </div>

            <div className="space-y-4">
              <span className="text-xs font-sans-ui uppercase tracking-widest text-amber-300 font-semibold">
                Your Secret Present Revealed
              </span>

              <h3 className="text-3xl md:text-4xl font-serif-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 glow-text-gold">
                "You're the greatest gift I've ever received in my life."
              </h3>

              <p className="font-script text-2xl text-rose-200 leading-relaxed">
                No wrapped box in the world can match the priceless joy of having you as my girlfriend, Isha. You are my treasure.
              </p>
            </div>

            <div className="pt-4 border-t border-rose-300/10 flex items-center justify-between text-xs text-rose-200/60">
              <span>Forever Swayam's Girl</span>
              <Trophy className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
