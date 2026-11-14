'use client';
import { useEffect, useRef } from 'react';

// Éclats carrés dans la palette du site. Déclenché par : dispatchEvent(new CustomEvent('ox:burst', { detail: { x, y, power } }))
export default function Confetti() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current, ctx = cv.getContext('2d');
    let W = 0, H = 0, dpr = 1, ps = [], raf = 0, colors = [];
    const fit = () => { dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    fit(); addEventListener('resize', fit);
    const step = () => {
      ctx.clearRect(0, 0, W, H);
      ps = ps.filter((p) => p.life > 0 && p.y < H + 40);
      for (const p of ps) {
        p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.32; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= 1;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.min(1, p.life / 24); ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      }
      raf = ps.length ? requestAnimationFrame(step) : 0;
    };
    const burst = (e) => {
      const { x = W / 2, y = H / 2, power = 1 } = e.detail || {};
      const cs = getComputedStyle(document.documentElement);
      colors = [cs.getPropertyValue('--signal'), cs.getPropertyValue('--ink'), cs.getPropertyValue('--ok'), '#FFC83D'].map((c) => c.trim() || '#FF4A1C');
      const n = Math.round(70 * power);
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.15, v = (6 + Math.random() * 11) * Math.sqrt(power);
        const s = 5 + Math.random() * 7;
        ps.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, w: s, h: Math.random() < 0.35 ? s * 0.3 : s, c: colors[i % colors.length], life: 70 + Math.random() * 50 });
      }
      if (!raf) raf = requestAnimationFrame(step);
    };
    addEventListener('ox:burst', burst);
    return () => { removeEventListener('ox:burst', burst); removeEventListener('resize', fit); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}
