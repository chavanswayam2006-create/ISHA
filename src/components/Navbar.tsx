import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

const NAV_ITEMS = [
  { label: 'Photos', href: '#gallery-section', emoji: '📸' },
  { label: 'Letters', href: '#love-notes', emoji: '💌' },
  { label: 'Reasons', href: '#reasons', emoji: '❤️' },
  { label: 'Stars', href: '#stars', emoji: '✨' },
  { label: 'Games', href: '#games', emoji: '🎮' },
  { label: 'Proposal', href: '#proposal', emoji: '💍' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundEngine.playHeartPop();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0b0314]/80 backdrop-blur-xl border-b border-rose-300/10 shadow-xl py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center border border-rose-400/40 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-500 group-hover:animate-heartbeat" />
          </div>
          <span className="font-serif-title font-bold text-sm text-rose-200 hidden sm:block group-hover:text-rose-100 transition-colors">
            Isha & Swayam
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="group flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans-ui text-rose-200/70 hover:text-rose-100 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
            >
              <span className="text-sm group-hover:scale-110 transition-transform duration-200">
                {item.emoji}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Date Badge + Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-amber-300/30 text-amber-200/90 text-[11px] font-semibold tracking-wide">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>01 Aug 2026</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full glass-panel border border-rose-400/30 text-rose-200 cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0b0314]/95 backdrop-blur-2xl border-b border-rose-300/10 shadow-2xl py-4 px-4 space-y-1 animate-slide-in-up">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-sans-ui text-rose-200/80 hover:text-white hover:bg-rose-500/10 transition-all cursor-pointer text-left"
            >
              <span className="text-xl">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
