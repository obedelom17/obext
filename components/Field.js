'use client';
import { useEffect, useRef } from 'react';

// Matrice de points : respire seule, s’allume au passage du curseur, ondule au clic.
export default function Field() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GAP = 30;
    let W = 0, H = 0, dpr = 1, raf = 0, vis = true, t0 = performance.now();
    let mx = -999, my = -999, waves = [], sig = '#FF4A1C', ink = '#0A0A0B';
    const colors = () => { const cs = getComputedStyle(document.documentElement); sig = cs.getPropertyValue('--signal').trim() || sig; ink = cs.getPropertyValue('--ink').trim() || ink; };
    const fit = () => { const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const draw = (now) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      waves = waves.filter((w) => now - w.t < 1800);
      for (let gy = GAP / 2; gy < H; gy += GAP) for (let gx = GAP / 2; gx < W; gx += GAP) {
        let k = 0.5 + 0.5 * Math.sin(gx * 0.012 + gy * 0.009 - t * 0.9);
        let a = 0.1 + k * 0.1, r = 0.9 + k * 0.5, hot = 0;
        const d = Math.hypot(gx - mx, gy - my);
        if (d < 150) { const f = 1 - d / 150; hot = Math.max(hot, f * f); }
        for (const w of waves) { const age = (now - w.t) / 1800, rad = age * 520, dd = Math.abs(Math.hypot(gx - w.x, gy - w.y) - rad); if (dd < 46) hot = Math.max(hot, (1 - dd / 46) * (1 - age)); }
        if (hot > 0.02) { ctx.globalAlpha = Math.min(1, 0.25 + hot); ctx.fillStyle = sig; ctx.beginPath(); ctx.arc(gx, gy, r + hot * 3.4, 0, 6.2832); ctx.fill(); }
        else { ctx.globalAlpha = a; ctx.fillStyle = ink; ctx.fillRect(gx - r / 2, gy - r / 2, r, r); }
      }
      ctx.globalAlpha = 1;
    };
    const loop = (now) => { draw(now); raf = vis ? requestAnimationFrame(loop) : 0; };
    const move = (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const down = (e) => { const r = cv.getBoundingClientRect(); if (e.clientY >= r.top && e.clientY <= r.bottom) waves.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }); };
    fit(); colors();
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf && !calm) raf = requestAnimationFrame(loop); });
    io.observe(cv);
    const mo = new MutationObserver(() => { colors(); if (calm) draw(performance.now()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    addEventListener('resize', fit); addEventListener('pointermove', move, { passive: true }); addEventListener('pointerdown', down);
    if (calm) draw(performance.now()); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); mo.disconnect(); removeEventListener('resize', fit); removeEventListener('pointermove', move); removeEventListener('pointerdown', down); };
  }, []);
  return <canvas ref={ref} className="field" aria-hidden="true" />;
}
