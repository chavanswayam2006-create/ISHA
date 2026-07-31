import React, { useState } from 'react';
import { LOVE_NOTES } from '../data/content';
import { Mail, Heart, Sparkles, Scroll } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const LoveNotes: React.FC = () => {
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);

  const currentNote = LOVE_NOTES[activeNoteIndex];

  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Mail className="w-4 h-4 text-amber-300" />
          <span>Handwritten Letters</span>
          <Mail className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Love Notes From My Heart 💌
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          Personal letters written for Isha, expressing my deepest feelings and gratitude.
        </p>
      </div>

      {/* Note Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {LOVE_NOTES.map((note, index) => (
          <button
            key={note.id}
            onClick={() => {
              soundEngine.playChime();
              setActiveNoteIndex(index);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans-ui transition-all duration-300 cursor-pointer ${
              activeNoteIndex === index
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] font-semibold scale-105'
                : 'glass-panel text-rose-200/80 hover:text-white hover:border-rose-400/50'
            }`}
          >
            <Scroll className="w-4 h-4" />
            <span>{note.title}</span>
          </button>
        ))}
      </div>

      {/* Parchment / Luxury Paper Card Container */}
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 rounded-3xl blur-lg opacity-30 animate-pulse-glow" />

        <div className="relative bg-[#fffdfa] text-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-amber-100/50 space-y-6">
          {/* Header Seal */}
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-sans-ui uppercase tracking-widest text-rose-600 font-semibold">
                {currentNote.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif-title font-bold text-slate-900">
                {currentNote.title}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-400/30">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </div>
          </div>

          {/* Letter Body */}
          <div className="whitespace-pre-line font-script text-2xl md:text-3xl text-slate-800 leading-relaxed font-normal py-2">
            {currentNote.letter}
          </div>

          {/* Footer Ribbon */}
          <div className="border-t border-amber-900/10 pt-4 flex items-center justify-between text-xs font-sans-ui text-slate-500">
            <span>Written with endless devotion</span>
            <span className="flex items-center gap-1 font-semibold text-rose-600">
              <Sparkles className="w-3.5 h-3.5" />
              Swayam & Isha
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
