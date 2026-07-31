import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, GALLERY_PHOTOS } from '../data/content';
import { Gamepad2, Heart, Trophy, RefreshCw, Sparkles, CheckCircle2, Star, Play, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface FallingItem {
  id: number;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  speed: number;
  type: 'heart' | 'star' | 'rose';
  icon: string;
  points: number;
}

export const MiniGames: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'catcher' | 'match' | 'quiz'>('catcher');

  // ==========================================
  // REBUILT & ENHANCED HEART CATCHER GAME
  // ==========================================
  const [catcherState, setCatcherState] = useState<'IDLE' | 'PLAYING' | 'ENDED'>('IDLE');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [basketX, setBasketX] = useState(50);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [floaters, setFloaters] = useState<Array<{ id: number; x: number; text: string }>>([]);

  const isPlayingRef = useRef(false);
  const basketXRef = useRef(50);
  const itemsRef = useRef<FallingItem[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameAreaRef = useRef<HTMLDivElement | null>(null);

  // Sync refs with state
  basketXRef.current = basketX;

  const startCatcherGame = () => {
    soundEngine.playChime();
    setScore(0);
    setTimeLeft(30);
    setCatcherState('PLAYING');
    isPlayingRef.current = true;
    itemsRef.current = [];
    setItems([]);
    setFloaters([]);

    // 1. Solid 1-second countdown timer
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endCatcherGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 2. Item spawner
    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    spawnIntervalRef.current = setInterval(() => {
      if (!isPlayingRef.current) return;
      const randType = Math.random();
      let type: 'heart' | 'star' | 'rose' = 'heart';
      let icon = '❤️';
      let points = 1;

      if (randType > 0.75) {
        type = 'star';
        icon = '⭐';
        points = 3;
      } else if (randType > 0.5) {
        type = 'rose';
        icon = '🌸';
        points = 2;
      }

      const newItem: FallingItem = {
        id: Math.random(),
        x: Math.random() * 84 + 8,
        y: -5,
        speed: Math.random() * 0.9 + 0.7,
        type,
        icon,
        points
      };

      itemsRef.current.push(newItem);
    }, 450);

    // 3. 60 FPS animation loop for smooth physics & collisions
    const updatePhysics = () => {
      if (!isPlayingRef.current) return;

      const currentBasketX = basketXRef.current;
      const nextItems: FallingItem[] = [];

      itemsRef.current.forEach((item) => {
        item.y += item.speed;

        // Collision check with basket (at bottom y near 80%-90%)
        if (item.y >= 78 && item.y <= 88 && Math.abs(item.x - currentBasketX) < 12) {
          // Caught!
          setScore((s) => s + item.points);
          soundEngine.playHeartPop();

          // Spawn floating score text
          setFloaters((prev) => [
            ...prev.slice(-5),
            { id: Math.random(), x: item.x, text: `+${item.points}` }
          ]);
        } else if (item.y < 100) {
          nextItems.push(item);
        }
      });

      itemsRef.current = nextItems;
      setItems([...nextItems]);

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);
  };

  const endCatcherGame = () => {
    isPlayingRef.current = false;
    setCatcherState('ENDED');

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    soundEngine.playCelebrationSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Handle pointer tracking across game container
  const handlePointerMove = (clientX: number) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const pct = (relativeX / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, pct)));
  };

  // ==========================================
  // MEMORY MATCH GAME
  // ==========================================
  const [matchCards, setMatchCards] = useState<Array<{ id: number; img: string; flipped: boolean; matched: boolean }>>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchScore, setMatchScore] = useState(0);

  const initMatchGame = () => {
    soundEngine.playChime();
    const selectImgs = GALLERY_PHOTOS.slice(0, 4).map((p) => p.src);
    const doubled = [...selectImgs, ...selectImgs]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img, flipped: false, matched: false }));

    setMatchCards(doubled);
    setSelectedCards([]);
    setMatchScore(0);
  };

  useEffect(() => {
    if (matchCards.length === 0) initMatchGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (selectedCards.length === 2 || matchCards[index].flipped || matchCards[index].matched) return;

    soundEngine.playHeartPop();
    const newCards = [...matchCards];
    newCards[index].flipped = true;
    setMatchCards(newCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [firstIdx, secondIdx] = newSelected;
      if (newCards[firstIdx].img === newCards[secondIdx].img) {
        newCards[firstIdx].matched = true;
        newCards[secondIdx].matched = true;
        setMatchScore((s) => s + 1);
        setSelectedCards([]);
        soundEngine.playChime();
      } else {
        setTimeout(() => {
          newCards[firstIdx].flipped = false;
          newCards[secondIdx].flipped = false;
          setMatchCards(newCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // ==========================================
  // LOVE QUIZ GAME
  // ==========================================
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    soundEngine.playHeartPop();
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto z-10">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Gamepad2 className="w-4 h-4 text-amber-300" />
          <span>Romantic Games</span>
          <Gamepad2 className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Cute Mini-Games Suite 🎮
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          Playful games created specially for Isha to win love badges & smile!
        </p>

        {/* Game Tabs */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveTab('catcher')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans-ui transition-all cursor-pointer ${
              activeTab === 'catcher'
                ? 'bg-rose-500 text-white font-semibold shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                : 'glass-panel text-rose-200 hover:text-white'
            }`}
          >
            💖 Heart Catcher
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans-ui transition-all cursor-pointer ${
              activeTab === 'match'
                ? 'bg-rose-500 text-white font-semibold shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                : 'glass-panel text-rose-200 hover:text-white'
            }`}
          >
            🧩 Memory Match
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans-ui transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-rose-500 text-white font-semibold shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                : 'glass-panel text-rose-200 hover:text-white'
            }`}
          >
            📝 Love Quiz
          </button>
        </div>
      </div>

      {/* GAME 1: REBUILT HEART CATCHER */}
      {activeTab === 'catcher' && (
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-rose-300/30 shadow-2xl space-y-6 text-center">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-rose-300/10 pb-4 text-xs font-sans-ui text-rose-200">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Score: {score} Points</span>
            </div>

            {/* Timer Bar */}
            <div className="flex items-center gap-3">
              <span className="font-semibold text-rose-300">Time: {timeLeft}s</span>
              <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden border border-rose-400/30">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Game States */}
          {catcherState === 'IDLE' && (
            <div className="py-12 space-y-6">
              <Heart className="w-16 h-16 mx-auto text-rose-400 fill-rose-500 animate-bounce" />
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-serif-title font-bold text-rose-100">
                  Catch Swayam's Falling Hearts! 💖
                </h3>
                <p className="text-xs md:text-sm font-sans-ui text-rose-200/70 max-w-sm mx-auto">
                  Move your basket left and right to catch Hearts (❤️ +1), Roses (🌸 +2), and Stars (⭐ +3) in 30 seconds!
                </p>
              </div>
              <button
                onClick={startCatcherGame}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(244,63,94,0.6)] hover:scale-105 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start 30s Game</span>
              </button>
            </div>
          )}

          {catcherState === 'PLAYING' && (
            <div
              ref={gameAreaRef}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
              className="relative h-96 rounded-2xl bg-gradient-to-b from-[#090314] via-[#120726] to-[#1d0a38] overflow-hidden border-2 border-rose-400/40 cursor-crosshair select-none touch-none shadow-inner"
            >
              {/* Floating score text feedback */}
              {floaters.map((f) => (
                <span
                  key={f.id}
                  className="absolute bottom-16 text-amber-300 font-bold text-sm animate-bounce pointer-events-none"
                  style={{ left: `${f.x}%` }}
                >
                  {f.text}
                </span>
              ))}

              {/* Falling items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="absolute transform -translate-x-1/2 text-2xl filter drop-shadow-[0_0_8px_rgba(255,182,193,0.8)]"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  {item.icon}
                </div>
              ))}

              {/* Player Basket */}
              <div
                className="absolute bottom-4 transform -translate-x-1/2 px-6 py-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-xs shadow-[0_0_20px_rgba(244,63,94,0.7)] border border-white/50 flex items-center gap-1.5 pointer-events-none"
                style={{ left: `${basketX}%` }}
              >
                <span>🧺 Isha's Basket</span>
              </div>
            </div>
          )}

          {catcherState === 'ENDED' && (
            <div className="py-10 space-y-6 animate-pulse-glow">
              <Trophy className="w-16 h-16 mx-auto text-amber-300 animate-pulse" />
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-serif-title font-bold text-rose-100">
                  Fantastic Job, Isha! 🎉
                </h3>
                <p className="font-script text-2xl text-amber-200">
                  You scored <span className="text-rose-300 font-bold">{score} Points</span>! Swayam loves you endlessly! ❤️
                </p>
              </div>
              <button
                onClick={startCatcherGame}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-rose-500 text-white font-semibold text-xs shadow-lg hover:bg-rose-600 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: MEMORY MATCH */}
      {activeTab === 'match' && (
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-rose-300/30 shadow-2xl space-y-6 text-center">
          <div className="flex items-center justify-between border-b border-rose-300/10 pb-4 text-xs font-sans-ui text-rose-200">
            <span className="font-semibold text-amber-300">Matches Found: {matchScore} / 4</span>
            <button
              onClick={initMatchGame}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Grid</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {matchCards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className="aspect-square rounded-xl cursor-pointer perspective-500 overflow-hidden shadow-lg border border-rose-400/30"
              >
                {card.flipped || card.matched ? (
                  <img src={card.img} alt="Memory match" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full glass-panel flex items-center justify-center hover:bg-rose-500/20 transition-colors">
                    <Heart className="w-6 h-6 text-rose-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {matchScore === 4 && (
            <div className="pt-4 space-y-2">
              <h3 className="text-2xl font-serif-title font-bold text-amber-300">
                Congratulations, My Love! 🎉
              </h3>
              <p className="font-script text-xl text-rose-200">
                You matched all our memories perfectly! ❤️
              </p>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: LOVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-rose-300/30 shadow-2xl space-y-8">
          {QUIZ_QUESTIONS.map((q) => {
            const selectedOpt = quizAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;

            return (
              <div key={q.id} className="space-y-4 border-b border-rose-300/10 pb-6 last:border-0">
                <h3 className="text-lg font-serif-title font-bold text-rose-100">
                  Question #{q.id}: {q.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(q.id, idx)}
                      className={`px-4 py-3 rounded-xl text-xs font-sans-ui text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedOpt === idx
                          ? 'bg-rose-500 text-white font-semibold shadow-md'
                          : 'glass-panel text-rose-200 hover:bg-white/10'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedOpt === idx && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-400/30 text-xs text-rose-200 font-script text-base">
                    "{q.romanticFeedback}"
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
