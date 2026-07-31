import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system (floating hearts & glowing dust)
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      type: 'heart' | 'sparkle' | 'bokeh';
    }

    const particles: Particle[] = [];
    const colors = ['#ffb6c1', '#ffe4e1', '#e0a96d', '#ff69b4', '#e6e6fa'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.5 ? 'heart' : Math.random() > 0.3 ? 'sparkle' : 'bokeh'
      });
    }

    const drawHeart = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      // bottom left curve
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size * 1.2);
      // bottom right curve
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      // top right curve
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) p.x = Math.random() * width;

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'sparkle') {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = p.opacity * 0.3;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Aurora Ambient Background Blurs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Dynamic Particle Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
