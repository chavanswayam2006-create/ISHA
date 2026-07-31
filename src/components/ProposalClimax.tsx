import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const ProposalClimax: React.FC = () => {
  const [hasSaidYes, setHasSaidYes] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({});
  const [noMorphedToYes, setNoMorphedToYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    soundEngine.playHeartPop();
    const next = noAttempts + 1;
    setNoAttempts(next);

    if (next >= 6) {
      setNoMorphedToYes(true);
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Random position within the parent container bounds
    const maxX = Math.min(rect.width - 180, 300);
    const maxY = Math.min(rect.height - 80, 200);
    const x = (Math.random() - 0.5) * maxX;
    const y = (Math.random() - 0.5) * maxY;
    const scale = Math.max(0.55, 1 - next * 0.08);
    const rotate = (Math.random() - 0.5) * 30;

    setNoStyle({
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
      transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
      opacity: Math.max(0.35, 1 - next * 0.1),
    });
  };

  const fireConfetti = () => {
    const count = 250;
    const defaults = { origin: { y: 0.65 } };
    const fire = (particleRatio: number, opts: confetti.Options) =>
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });

    fire(0.25, { spread: 28, startVelocity: 60, colors: ['#f43f5e', '#ffb6c1'] });
    fire(0.2, { spread: 65, colors: ['#ffd700', '#ffffff'] });
    fire(0.35, { spread: 110, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 130, startVelocity: 28, decay: 0.92, colors: ['#ff1493', '#e0a96d'] });
    fire(0.1, { spread: 130, startVelocity: 48 });

    // Second burst after 500ms
    setTimeout(() => {
      fire(0.3, { spread: 90, startVelocity: 55, origin: { y: 0.6, x: 0.2 }, colors: ['#f43f5e', '#ffd700'] });
      fire(0.3, { spread: 90, startVelocity: 55, origin: { y: 0.6, x: 0.8 }, colors: ['#ff69b4', '#ffffff'] });
    }, 500);
  };

  const handleYes = () => {
    soundEngine.playCelebrationSound();
    setHasSaidYes(true);
    fireConfetti();
  };

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col justify-center items-center text-center z-10 overflow-hidden">
      {/* Deep romantic ambiance gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/25 to-[#0a0216] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(244,63,94,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Animated ambient hearts (background decoration) */}
      {['10%', '20%', '80%', '90%', '50%'].map((left, i) => (
        <div
          key={i}
          className="absolute text-rose-500/10 text-6xl md:text-8xl pointer-events-none animate-float-slow"
          style={{ left, top: `${20 + i * 15}%`, animationDelay: `${i * 1.2}s` }}
        >
          ❤️
        </div>
      ))}

      {/* Section tag */}
      <div className="relative mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-amber-300 animate-sparkle" />
          <span>The Grand Finale</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-sparkle" />
        </div>
      </div>

      {/* Pulsing Glowing Heart */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-rose-500/40 rounded-full blur-3xl animate-pulse-glow scale-150" />
        <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full glass-panel flex items-center justify-center border-2 border-rose-300/70 shadow-[0_0_70px_rgba(244,63,94,0.7)]">
          <Heart className="w-16 h-16 md:w-20 md:h-20 text-rose-400 fill-rose-500 animate-heartbeat" />
        </div>
      </div>

      {!hasSaidYes ? (
        <div className="max-w-3xl mx-auto space-y-8 animate-slide-in-up">
          {/* Name */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 glow-text-pink tracking-tight">
            ❤️ ISHA ❤️
          </h2>

          {/* Emotional Message */}
          <div className="glass-panel rounded-3xl p-8 md:p-10 border border-rose-300/30 shadow-2xl max-w-2xl mx-auto space-y-3">
            {[
              "You are my happiness.",
              "My peace.",
              "My safe place.",
              "My biggest blessing.",
              "My favorite person.",
              "My today.",
              "My tomorrow.",
              "My forever.",
            ].map((line, i) => (
              <p
                key={i}
                className="text-xl md:text-2xl font-serif-title italic text-rose-100 leading-snug"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Divider glow */}
          <div className="divider-glow max-w-md mx-auto" />

          {/* Grand Question */}
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 glow-text-gold leading-tight">
            ❤️ Will You Be My Girlfriend Forever? ❤️
          </h3>

          {/* YES / NO Buttons */}
          <div
            ref={containerRef}
            className="relative min-h-[180px] flex flex-wrap items-center justify-center gap-8 pt-4"
          >
            {/* YES Button */}
            <button
              onClick={handleYes}
              className="relative px-12 py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-sans-ui font-bold text-2xl md:text-3xl shadow-[0_0_45px_rgba(244,63,94,0.8)] hover:shadow-[0_0_65px_rgba(244,63,94,1)] transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer animate-heartbeat z-20"
            >
              YES ❤️
              <div className="absolute inset-0 rounded-full animate-shimmer opacity-40 overflow-hidden" />
            </button>

            {/* Escaping NO Button */}
            {!noMorphedToYes ? (
              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={noStyle}
                className="inline-block px-8 py-4 rounded-full glass-panel border border-rose-300/40 text-rose-200 font-sans-ui font-medium text-lg cursor-pointer hover:border-rose-300/60 select-none z-20"
              >
                NO 😅
              </button>
            ) : (
              <button
                onClick={handleYes}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-sans-ui font-bold text-xl shadow-[0_0_40px_rgba(244,63,94,0.8)] transform hover:scale-110 cursor-pointer animate-pulse z-20"
              >
                YES ❤️ (Nice try 😉)
              </button>
            )}
          </div>

          <p className="text-xs text-rose-200/40 font-sans-ui italic">
            Hint: one of these buttons doesn't want to be clicked 😏
          </p>
        </div>
      ) : (
        /* CELEBRATION OVERLAY */
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full glass-panel rounded-3xl p-8 md:p-14 border-2 border-rose-400 shadow-[0_0_120px_rgba(244,63,94,0.9)] text-center space-y-8 animate-slide-in-up">
            {/* Glowing rings */}
            <div className="absolute inset-0 rounded-3xl border border-rose-400/20 animate-pulse-glow pointer-events-none" />

            {/* Icon */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full rounded-full glass-panel flex items-center justify-center border-2 border-amber-300">
                <PartyPopper className="w-12 h-12 text-amber-300 animate-bounce" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl sm:text-7xl font-serif-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 glow-text-gold">
                I LOVE YOU ❤️
              </h2>
              <p className="text-3xl sm:text-4xl font-handwriting text-rose-200 leading-relaxed">
                Forever and Always
              </p>
              <p className="font-script text-2xl text-rose-300">
                You just made me the happiest person in the whole world, Isha.
              </p>
            </div>

            <div className="pt-2 border-t border-rose-300/20 text-2xl font-serif-title text-amber-300 glow-text-gold">
              — Swayam ❤️
            </div>

            <button
              onClick={() => { setHasSaidYes(false); setNoAttempts(0); setNoMorphedToYes(false); setNoStyle({}); }}
              className="px-6 py-2 rounded-full glass-panel text-xs text-rose-200/60 hover:text-white cursor-pointer transition-colors"
            >
              Replay the Moment ✨
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
