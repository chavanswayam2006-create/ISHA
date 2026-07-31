import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS } from '../data/content';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const MemoryCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    soundEngine.playHeartPop();
    setCurrentIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
  };

  const handlePrev = () => {
    soundEngine.playHeartPop();
    setCurrentIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>3D Memory Stream</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Infinite Memory Carousel 🎠
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          A continuous 3D slideshow of our favorite moments together. Hover to pause.
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[380px] md:min-h-[460px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-6 z-30 p-3 rounded-full glass-panel border border-rose-400/40 text-white hover:bg-rose-500/30 transition-all cursor-pointer shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Carousel Slide Cards Stack */}
        <div className="relative w-full max-w-lg h-[340px] md:h-[420px] flex items-center justify-center">
          {GALLERY_PHOTOS.map((photo, index) => {
            let offset = index - currentIndex;
            if (offset < -Math.floor(GALLERY_PHOTOS.length / 2)) offset += GALLERY_PHOTOS.length;
            if (offset > Math.floor(GALLERY_PHOTOS.length / 2)) offset -= GALLERY_PHOTOS.length;

            const isCurrent = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            return (
              <div
                key={photo.id}
                className="absolute w-64 md:w-80 h-[320px] md:h-[400px] transition-all duration-700 ease-out rounded-2xl overflow-hidden glass-panel border-2 border-rose-300/30 shadow-2xl"
                style={{
                  transform: `translateX(${offset * 75}px) scale(${1 - Math.abs(offset) * 0.15}) rotateY(${offset * -15}deg)`,
                  zIndex: 20 - Math.abs(offset),
                  opacity: 1 - Math.abs(offset) * 0.3,
                  filter: isCurrent ? 'brightness(1.05)' : 'brightness(0.7)'
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-center">
                  <p className="font-script text-xl text-rose-100 line-clamp-2">
                    "{photo.caption}"
                  </p>
                  <span className="text-[10px] font-sans-ui text-amber-200/80 mt-1 uppercase tracking-widest font-semibold">
                    Isha & Swayam
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 z-30 p-3 rounded-full glass-panel border border-rose-400/40 text-white hover:bg-rose-500/30 transition-all cursor-pointer shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {GALLERY_PHOTOS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              soundEngine.playHeartPop();
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === idx
                ? 'w-8 h-2.5 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
