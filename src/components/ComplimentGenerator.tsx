import React, { useState } from 'react';
import { COMPLIMENTS } from '../data/content';
import { Sparkles, Heart, Copy, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const ComplimentGenerator: React.FC = () => {
  const [currentCompliment, setCurrentCompliment] = useState<string>(COMPLIMENTS[0]);
  const [isCopied, setIsCopied] = useState(false);

  const generateNewCompliment = () => {
    soundEngine.playChime();
    setIsCopied(false);
    const randomIndex = Math.floor(Math.random() * COMPLIMENTS.length);
    setCurrentCompliment(COMPLIMENTS[randomIndex]);
  };

  const copyToClipboard = () => {
    soundEngine.playHeartPop();
    navigator.clipboard.writeText(currentCompliment);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto z-10 text-center">
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Sweet Words</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Sweet Compliment Generator 💖
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          Need a daily dose of sweetness? Click the button below to generate a romantic note from Swayam!
        </p>
      </div>

      {/* Compliment Display Box */}
      <div className="relative max-w-2xl mx-auto glass-panel rounded-3xl p-8 md:p-12 border-2 border-rose-300/30 shadow-2xl space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-400/30">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-500 animate-pulse" />
        </div>

        <p className="font-script text-3xl md:text-4xl text-rose-100 leading-relaxed glow-text-gold">
          "{currentCompliment}"
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={generateNewCompliment}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
            <span>Tell Me Something Sweet</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-5 py-3 rounded-full glass-panel border border-rose-400/30 text-rose-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-rose-300" />}
            <span>{isCopied ? "Saved to Memory!" : "Copy Note"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
