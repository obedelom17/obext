'use client';
import { useEffect } from 'react';
export default function Fx() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (e) => {
      root.style.setProperty('--px', e.clientX + 'px');
      root.style.setProperty('--py', e.clientY + 'px');
      const g = e.target.closest && e.target.closest('.glow');
      if (g) { const r = g.getBoundingClientRect(); g.style.setProperty('--mx', e.clientX - r.left + 'px'); g.style.setProperty('--my', e.clientY - r.top + 'px'); }
    };
    addEventListener('pointermove', move, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: 0.12 });
    const scan = () => document.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { removeEventListener('pointermove', move); io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
