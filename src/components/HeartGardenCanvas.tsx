import React, { useRef, useEffect } from 'react';
import { Flower2, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const HeartGardenCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 450;
    };
    window.addEventListener('resize', handleResize);

    interface GardenParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      type: 'heart' | 'petal' | 'butterfly';
      angle: number;
    }

    const gardenParticles: GardenParticle[] = [];
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#e0a96d', '#ffb6c1'];

    const spawnGardenBloom = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      soundEngine.playHeartPop();

      for (let i = 0; i < 24; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        gardenParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: Math.random() * 12 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          type: Math.random() > 0.4 ? 'heart' : 'petal',
          angle: Math.random() * Math.PI
        });
      }
    };

    const handleCanvasClick = (e: MouseEvent) => {
      spawnGardenBloom(e.clientX, e.clientY);
    };

    canvas.addEventListener('click', handleCanvasClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint garden background grid glow
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#fb7185';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      for (let i = gardenParticles.length - 1; i >= 0; i--) {
        const p = gardenParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // Gentle gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          gardenParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.type === 'heart') {
          ctx.beginPath();
          const s = p.size;
          ctx.arc(p.x - s / 4, p.y, s / 4, Math.PI, 0, false);
          ctx.arc(p.x + s / 4, p.y, s / 4, Math.PI, 0, false);
          ctx.lineTo(p.x, p.y + s / 2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Petal
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size / 2, p.size / 4, p.angle, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative py-20 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
          <Flower2 className="w-4 h-4 text-amber-300" />
          <span>Interactive Magic</span>
          <Flower2 className="w-4 h-4 text-amber-300" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif-title font-bold text-rose-100 glow-text-pink">
          Interactive Heart Garden 🌸
        </h2>
        <p className="text-rose-200/70 font-sans-ui max-w-md mx-auto text-sm md:text-base">
          Click or tap anywhere inside the canvas below to watch blooming roses and glowing hearts burst for you!
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden glass-panel border border-rose-400/30 shadow-2xl cursor-pointer">
        <canvas ref={canvasRef} className="w-full h-[450px] block" />

        <div className="absolute top-4 left-4 pointer-events-none bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs text-rose-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>Click to bloom flowers & hearts ❤️</span>
        </div>
      </div>
    </section>
  );
};
