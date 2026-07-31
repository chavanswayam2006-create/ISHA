import React, { useEffect, useRef } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { LoveNotes } from './components/LoveNotes';
import { ReasonsCards } from './components/ReasonsCards';
import { HeartGardenCanvas } from './components/HeartGardenCanvas';
import { ConstellationSky } from './components/ConstellationSky';
import { FloatingLetters } from './components/FloatingLetters';
import { SurpriseGiftBox } from './components/SurpriseGiftBox';
import { MemoryCarousel } from './components/MemoryCarousel';
import { MiniGames } from './components/MiniGames';
import { ComplimentGenerator } from './components/ComplimentGenerator';
import { CountdownTimer } from './components/CountdownTimer';
import { FutureSection } from './components/FutureSection';
import { ProposalClimax } from './components/ProposalClimax';
import { MusicPlayer } from './components/MusicPlayer';
import { Navbar } from './components/Navbar';
import { Heart, Sparkles } from 'lucide-react';

// Intersection Observer hook for section reveal animations
function useSectionReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.section-reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);
}

export function App() {
  useSectionReveal();

  const scrollToGallery = () => {
    const el = document.getElementById('gallery-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0b0314] text-rose-50 overflow-x-hidden font-sans-ui">
      {/* Dynamic Background Particles & Aurora */}
      <BackgroundEffects />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Floating Audio Player */}
      <MusicPlayer />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 1. Hero */}
        <section id="home">
          <Hero onOpenSurprise={scrollToGallery} />
        </section>

        {/* Glowing divider */}
        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-60" />

        {/* 2. Photo Gallery */}
        <div id="gallery-section" className="section-reveal">
          <Gallery />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 3. Love Notes */}
        <div id="love-notes" className="section-reveal">
          <LoveNotes />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 4. Reasons I Love You */}
        <div id="reasons" className="section-reveal">
          <ReasonsCards />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 5. Interactive Heart Garden */}
        <div id="heart-garden" className="section-reveal">
          <HeartGardenCanvas />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 6. Constellation Sky */}
        <div id="stars" className="section-reveal">
          <ConstellationSky />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 7. Floating Love Letters */}
        <div id="letters" className="section-reveal">
          <FloatingLetters />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 8. Surprise Gift Box */}
        <div id="gift" className="section-reveal">
          <SurpriseGiftBox />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 9. 3D Memory Carousel */}
        <div id="carousel" className="section-reveal">
          <MemoryCarousel />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 10. Mini Games Suite */}
        <div id="games" className="section-reveal">
          <MiniGames />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 11. Compliment Generator */}
        <div id="compliments" className="section-reveal">
          <ComplimentGenerator />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 12. Countdown Timer */}
        <div id="countdown" className="section-reveal">
          <CountdownTimer />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-40" />

        {/* 13. Future Section */}
        <div id="future" className="section-reveal">
          <FutureSection />
        </div>

        <div className="divider-glow max-w-3xl mx-auto my-2 opacity-60" />

        {/* 14. Proposal Climax */}
        <div id="proposal">
          <ProposalClimax />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-rose-300/10 text-center space-y-2">
        <p className="flex items-center justify-center gap-2 text-sm text-rose-200/70 font-serif-title italic">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-heartbeat" />
          <span>Crafted with endless love by Swayam for Isha</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-heartbeat" style={{ animationDelay: '0.3s' }} />
        </p>
        <p className="text-[11px] text-rose-200/30 font-sans-ui flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300/60" />
          <span>Happy Girlfriend's Day — August 1st, 2026</span>
          <Sparkles className="w-3 h-3 text-amber-300/60" />
        </p>
      </footer>
    </div>
  );
}

export default App;
