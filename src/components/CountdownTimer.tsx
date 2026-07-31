import React, { useState, useEffect } from 'react';
import { COUPLE_DATA } from '../data/content';
import { Clock, Heart, Sparkles, Calendar } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date(COUPLE_DATA.togetherSinceDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, now - startDate);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto z-10 text-center">
      <div className="space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Clock className="w-4 h-4 text-amber-300" />
          <span>Love Clock Counter</span>
          <Clock className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Together Since August 11, 2025 ⏳
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          Counting every single second Swayam & Isha have been in love.
        </p>

        <div className="inline-block px-4 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-400/30">
          🎉 Celebrating Girlfriend's Day on August 1st (01/08) 🎉
        </div>
      </div>

      {/* Clock Display Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
        {[
          { label: 'Days Together', value: timeElapsed.days },
          { label: 'Hours', value: timeElapsed.hours },
          { label: 'Minutes', value: timeElapsed.minutes },
          { label: 'Seconds', value: timeElapsed.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="glass-panel glass-card-hover rounded-3xl p-6 border border-rose-300/30 shadow-2xl flex flex-col items-center justify-center space-y-2"
          >
            <span className="text-4xl md:text-5xl font-serif-title font-bold text-transparent bg-clip-text bg-gradient-to-b from-rose-200 via-pink-200 to-amber-300 glow-text-pink">
              {item.value.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-sans-ui text-rose-200/80 uppercase tracking-wider font-semibold">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
