'use client';
import { useEffect } from 'react';
export default function Fx() {
  useEffect(() => {
    const root = document.documentElement;
    const fine = matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur, raf, tx = -100, ty = -100, x = -100, y = -100, mag = null;
    if (fine) {
      cur = document.createElement('div'); cur.className = 'cur'; document.body.appendChild(cur); root.classList.add('has-cur');
      const loop = () => { x += (tx - x) * 0.22; y += (ty - y) * 0.22; cur.style.transform = `translate(${x}px,${y}px)`; raf = requestAnimationFrame(loop); };
      loop();
    }
    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      const tg = e.target.closest ? e.target : document.body;
      if (cur) {
        const el = tg.closest('[data-cursor],a,button,label,summary');
        const lab = el && el.dataset ? el.dataset.cursor : '';
        cur.classList.toggle('hot', !!el); cur.classList.toggle('big', !!lab); cur.textContent = lab || '';
        cur.classList.toggle('hide', !!tg.closest('textarea,input'));
      }
      const m = tg.closest('.mag');
      if (mag && mag !== m) { mag.style.transform = ''; mag = null; }
      if (m) { mag = m; const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`; }
    };
    addEventListener('pointermove', move, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((o) => { if (o.isIntersecting) { o.target.classList.add('in'); io.unobserve(o.target); } }), { threshold: 0.15 });
    const scan = () => document.querySelectorAll('.rv:not(.in),.rvl:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { removeEventListener('pointermove', move); io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); cur && cur.remove(); root.classList.remove('has-cur'); };
  }, []);
  return null;
}
