import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { COUPLE_DATA } from '../data/content';
import { soundEngine } from '../utils/soundEngine';

interface HeroProps {
  onOpenSurprise: () => void;
}

const TYPING_PHRASES = [
  'Isha ❤️',
  'My Love',
  'My Sunshine',
  'My Forever',
  'My Everything',
];

export const Hero: React.FC<HeroProps> = ({ onOpenSurprise }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentPhrase) {
      // Pause at full word
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 60);
    } else {
      timeout = setTimeout(() => setDisplayText(currentPhrase.slice(0, displayText.length + 1)), 110);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  const handleClick = () => {
    soundEngine.playHeartPop();
    soundEngine.startBgMusic();
    onOpenSurprise();
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden z-10">
      {/* Subtle inner gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(244,63,94,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating Accent Icons */}
      <div className="absolute top-16 left-8 md:left-20 animate-float-slow opacity-40" style={{ animationDelay: '0s' }}>
        <span className="text-2xl md:text-4xl">🌸</span>
      </div>
      <div className="absolute top-24 right-8 md:right-20 animate-float-slow opacity-40" style={{ animationDelay: '1.5s' }}>
        <span className="text-2xl md:text-4xl">💫</span>
      </div>
      <div className="absolute bottom-32 left-8 md:left-28 animate-float-slow opacity-30" style={{ animationDelay: '3s' }}>
        <span className="text-xl md:text-3xl">✨</span>
      </div>
      <div className="absolute bottom-40 right-8 md:right-28 animate-float-slow opacity-30" style={{ animationDelay: '2s' }}>
        <span className="text-xl md:text-3xl">🌹</span>
      </div>

      {/* Girlfriends Day Date Badge */}
      <div className={`mb-6 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-rose-300/40 text-rose-300 text-xs font-semibold tracking-[0.25em] uppercase animate-shimmer">
          <span>✦</span>
          <span>August 1st — Girlfriend's Day 2026</span>
          <span>✦</span>
        </div>
      </div>

      {/* Glowing Heart Icon */}
      <div className={`mb-7 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
        <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto">
          <div className="absolute inset-0 bg-rose-500/30 rounded-full blur-2xl animate-pulse-glow" />
          <div className="relative w-full h-full rounded-full glass-panel flex items-center justify-center border border-rose-300/50 shadow-2xl">
            <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-400 fill-rose-500/60 animate-heartbeat" />
            <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-sparkle" />
          </div>
        </div>
      </div>

      {/* Main Headline */}
      <div className={`max-w-4xl mx-auto space-y-5 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 glow-text-pink leading-[1.1] tracking-tight">
          {COUPLE_DATA.headline}
        </h1>

        <p className="text-lg md:text-2xl lg:text-3xl font-serif-title italic text-rose-200/80 max-w-2xl mx-auto">
          "{COUPLE_DATA.subheading}"
        </p>
      </div>

      {/* Animated Typewriter Name */}
      <div className={`my-8 transition-all duration-700 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '500ms' }}>
        <div className="inline-block px-8 py-3.5 rounded-full glass-panel border border-rose-400/40 shadow-2xl min-w-[200px]">
          <span className="text-4xl md:text-5xl lg:text-6xl font-handwriting text-rose-300 glow-text-gold tracking-wide">
            {displayText}
            <span className="animate-pulse text-rose-400 ml-0.5">|</span>
          </span>
        </div>
      </div>

      {/* Dedication */}
      <p className={`text-sm md:text-base font-sans-ui text-rose-200/70 tracking-widest mb-10 transition-all duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
        {COUPLE_DATA.dedication}
      </p>

      {/* CTA Button */}
      <div className={`transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '700ms' }}>
        <button
          onClick={handleClick}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-sans-ui font-semibold text-lg shadow-[0_0_35px_rgba(244,63,94,0.55)] hover:shadow-[0_0_55px_rgba(244,63,94,0.85)] transform hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform duration-300" />
          <span>Open Your Surprise</span>
          <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform duration-300" />
          {/* Shimmer overlay */}
          <div className="absolute inset-0 rounded-full animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity group"
        onClick={handleClick}
      >
        <span className="text-[10px] text-rose-200/80 uppercase tracking-[0.3em] font-sans-ui group-hover:text-rose-300 transition-colors">
          Scroll to Explore
        </span>
        <ChevronDown className="w-5 h-5 text-rose-300 animate-bounce" />
      </div>
    </section>
  );
};
