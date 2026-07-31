import React from 'react';
import { TIMELINE_MEMORIES } from '../data/content';
import { Sparkles, Calendar, MapPin, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const Timeline: React.FC = () => {
  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Our Journey Timeline</span>
          <Calendar className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Chapters of Our Love Story 📖
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-lg mx-auto text-sm md:text-base">
          From the day our paths crossed on August 11, 2025 to this very moment.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central Glowing Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-rose-500 via-pink-400 to-amber-300 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.6)] hidden md:block" />

        <div className="space-y-16">
          {TIMELINE_MEMORIES.map((memory, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={memory.id}
                onMouseEnter={() => soundEngine.playHeartPop()}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:flex items-center justify-center w-10 h-10 rounded-full glass-panel border-2 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.7)] bg-[#0b0314]">
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-pulse" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[calc(50%-2.5rem)]">
                  <div className="glass-panel glass-card-hover rounded-2xl p-6 border border-rose-300/20 shadow-xl space-y-4">
                    {/* Image Preview */}
                    <div className="relative h-48 rounded-xl overflow-hidden shadow-inner group">
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 left-3 bg-rose-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                        {memory.tag}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center justify-between text-xs text-rose-300 font-sans-ui pt-1">
                      <span className="flex items-center gap-1.5 font-semibold text-amber-200">
                        <Calendar className="w-3.5 h-3.5" />
                        {memory.date}
                      </span>
                      {memory.location && (
                        <span className="flex items-center gap-1 text-rose-200/70">
                          <MapPin className="w-3.5 h-3.5" />
                          {memory.location}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-serif-title font-bold text-rose-100">
                      {memory.title}
                    </h3>
                    <p className="font-script text-xl text-rose-200/90 leading-relaxed">
                      "{memory.caption}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
