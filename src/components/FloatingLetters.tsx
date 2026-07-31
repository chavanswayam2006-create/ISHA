import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X, Send } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

const LETTERS_DATA = [
  {
    id: 1,
    title: "Letter #1: To My Soulmate",
    preview: "Open for a secret wish...",
    content: `Isha,\n\nIf I had a single flower for every time I thought of you, I could walk in my garden forever. You are my light, my peace, and my happiness. Thank you for making every day extraordinary.\n\nLove, Swayam ❤️`
  },
  {
    id: 2,
    title: "Letter #2: A Promise of Joy",
    preview: "A sweet note for you...",
    content: `My Love,\n\nI promise to always keep you laughing, hold your hand tight during every movie, and buy you your favorite treats whenever you need a smile.\n\nForever & Always,\nSwayam`
  },
  {
    id: 3,
    title: "Letter #3: The Greatest Gift",
    preview: "Click to read my heart...",
    content: `Dearest Isha,\n\nOf all the treasures in the world, the greatest blessing I ever received is having you in my life. Happy Girlfriend's Day, my princess!\n\nYour Swayam ❤️`
  }
];

export const FloatingLetters: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<typeof LETTERS_DATA[0] | null>(null);

  const openLetter = (letter: typeof LETTERS_DATA[0]) => {
    soundEngine.playChime();
    setSelectedLetter(letter);
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Send className="w-4 h-4 text-amber-300" />
          <span>Floating Envelopes</span>
          <Send className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Floating Love Letters ✉️
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          Click any drifting envelope to open and read a personal message written just for you.
        </p>
      </div>

      {/* Grid of Floating Envelopes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LETTERS_DATA.map((letter, index) => (
          <div
            key={letter.id}
            onClick={() => openLetter(letter)}
            className="glass-panel glass-card-hover rounded-3xl p-8 border border-rose-300/30 text-center cursor-pointer space-y-6 animate-float-slow"
            style={{ animationDelay: `${index * 1.5}s` }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center border border-rose-400/30 shadow-lg">
              <Mail className="w-10 h-10 text-rose-300" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif-title font-bold text-rose-100">
                {letter.title}
              </h3>
              <p className="text-xs font-sans-ui text-rose-200/70">
                {letter.preview}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-300 bg-rose-500/10 px-4 py-2 rounded-full border border-rose-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unseal Envelope</span>
            </div>
          </div>
        ))}
      </div>

      {/* Letter Modal */}
      {selectedLetter && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#fffdfa] text-slate-800 rounded-3xl p-8 shadow-2xl border-4 border-rose-200 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <div>
                <h3 className="text-xl font-serif-title font-bold text-slate-900">
                  {selectedLetter.title}
                </h3>
                <span className="text-xs font-sans-ui text-slate-500">For Isha ❤️ From Swayam</span>
              </div>
            </div>

            <div className="whitespace-pre-line font-script text-2xl text-slate-800 leading-relaxed">
              {selectedLetter.content}
            </div>

            <div className="border-t border-slate-200 pt-4 text-center">
              <span className="text-xs font-sans-ui text-rose-600 font-semibold uppercase tracking-widest">
                Happy Girlfriend's Day 🌹
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
