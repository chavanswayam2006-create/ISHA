import React, { useState } from 'react';
import { REASONS_LIST } from '../data/content';
import { Sparkles, Heart, RefreshCw, Smile, HeartHandshake, Eye, ShieldCheck, Laugh, Flame, Star, Hand, Crown } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

const iconMap: Record<string, React.ReactNode> = {
  Smile: <Smile className="w-8 h-8 text-amber-300" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8 text-rose-300" />,
  Sparkles: <Sparkles className="w-8 h-8 text-amber-300" />,
  Eye: <Eye className="w-8 h-8 text-pink-300" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-rose-400" />,
  Laugh: <Laugh className="w-8 h-8 text-amber-200" />,
  Flame: <Flame className="w-8 h-8 text-orange-300" />,
  Star: <Star className="w-8 h-8 text-amber-300" />,
  Hand: <Hand className="w-8 h-8 text-pink-300" />,
  Crown: <Crown className="w-8 h-8 text-amber-300" />,
};

export const ReasonsCards: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    soundEngine.playHeartPop();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative py-24 px-4 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
          <span>100 Reasons Why</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Reasons Why I Am Madly in Love With You ❤️
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-xl mx-auto text-sm md:text-base">
          Tap or hover on any card to discover what makes my heart skip a beat for you, Isha.
        </p>
      </div>

      {/* Grid of Interactive 3D Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {REASONS_LIST.map((reason) => {
          const isFlipped = !!flippedCards[reason.id];
          return (
            <div
              key={reason.id}
              onClick={() => toggleFlip(reason.id)}
              className="h-64 cursor-pointer perspective-1000 group"
            >
              <div
                className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : 'group-hover:scale-[1.03]'
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 rounded-2xl glass-panel border border-rose-300/20 p-6 flex flex-col justify-between items-center text-center backface-hidden shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-400/30 shadow-inner">
                    {iconMap[reason.iconName] || <Heart className="w-7 h-7 text-rose-300" />}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-sans-ui uppercase tracking-widest text-amber-300 font-semibold">
                      Reason #{reason.id}
                    </span>
                    <h3 className="text-lg font-serif-title font-bold text-rose-100">
                      {reason.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-rose-300/70 font-sans-ui">
                    <RefreshCw className="w-3 h-3 animate-spin-slow" />
                    <span>Tap to flip</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-900/90 via-purple-900/90 to-slate-900/90 border-2 border-amber-300/40 p-6 flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden shadow-2xl">
                  <Heart className="w-6 h-6 text-rose-400 fill-rose-500 animate-pulse" />

                  <p className="font-script text-xl text-rose-100 leading-snug">
                    "{reason.description}"
                  </p>

                  <span className="text-[10px] font-sans-ui uppercase tracking-widest text-amber-200/80">
                    Swayam & Isha ❤️
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
