import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/content';
import { Sparkles, Heart, Maximize2, X, ZoomIn } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_PHOTOS[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filterTags = ['ALL', ...Array.from(new Set(GALLERY_PHOTOS.map(p => p.filterTag)))];

  const filteredPhotos = activeFilter === 'ALL'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.filterTag === activeFilter);

  const openLightbox = (photo: typeof GALLERY_PHOTOS[0]) => {
    soundEngine.playChime();
    setSelectedPhoto(photo);
  };

  return (
    <section id="gallery-section" className="relative py-24 px-4 max-w-7xl mx-auto z-10">
      {/* Section Heading */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Our Photo Gallery</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Memories Frozen in Time 📸
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-xl mx-auto text-sm md:text-base">
          Every picture tells a story of our love. Enhanced with romantic warm lighting and cherished forever.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                soundEngine.playHeartPop();
                setActiveFilter(tag);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-sans-ui transition-all duration-300 cursor-pointer ${
                activeFilter === tag
                  ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] font-semibold'
                  : 'glass-panel text-rose-200/80 hover:text-white hover:border-rose-400/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Enhanced Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(photo)}
            className="group relative polaroid-frame cursor-pointer transform transition-all duration-500 hover:z-20"
            style={{ transform: `rotate(${photo.tilt}deg)` }}
          >
            {/* Image Wrapper with Enhanced Filter lighting */}
            <div className="relative aspect-[4/5] overflow-hidden rounded bg-stone-900 shadow-inner">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter brightness-[1.03] contrast-[1.05] saturate-[1.08]"
                loading="lazy"
              />
              
              {/* Overlay Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="self-end bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/20">
                  <ZoomIn className="w-5 h-5 text-rose-200" />
                </div>
                <div className="flex items-center justify-between text-white text-xs font-sans-ui">
                  <span className="bg-rose-500/80 px-2 py-1 rounded backdrop-blur-sm">{photo.filterTag}</span>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Handwritten Polaroid Caption */}
            <div className="mt-4 text-center">
              <p className="font-script text-lg text-slate-800 line-clamp-2 leading-tight">
                {photo.caption}
              </p>
              <div className="mt-1 flex justify-center items-center gap-1 text-[10px] font-sans-ui text-rose-600/70 uppercase tracking-widest">
                <span>Isha & Swayam</span>
                <span>•</span>
                <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full glass-panel rounded-2xl overflow-hidden border border-rose-300/30 p-4 md:p-6 shadow-2xl flex flex-col md:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Large Image Preview */}
            <div className="flex-1 bg-black rounded-xl overflow-hidden max-h-[70vh] flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="max-h-full max-w-full object-contain filter brightness-[1.04] contrast-[1.05]"
              />
            </div>

            {/* Details & Romantic Caption */}
            <div className="w-full md:w-80 flex flex-col justify-between space-y-4">
              <div className="space-y-4 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30 inline-block">
                  {selectedPhoto.filterTag}
                </span>

                <h3 className="text-2xl font-serif-title font-bold text-rose-100">
                  A Moment of Pure Joy
                </h3>

                <p className="font-script text-2xl text-rose-300 leading-relaxed">
                  "{selectedPhoto.caption}"
                </p>

                <p className="text-xs font-sans-ui text-rose-200/60 leading-relaxed">
                  Every glance at your picture reminds me of why I fell in love with you, Isha. You make my world complete.
                </p>
              </div>

              <div className="border-t border-rose-300/10 pt-4 flex items-center justify-between text-xs text-rose-200/50">
                <span>With endless love, Swayam ❤️</span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
