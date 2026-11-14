'use client';
import { useEffect } from 'react';

// Curseur, aimants, inclinaison 3D, projecteur lumineux, vélocité de scroll, révélations.
export default function Fx() {
  useEffect(() => {
    const root = document.documentElement;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer: fine)').matches && !calm;
    let cur, raf, tx = -100, ty = -100, x = -100, y = -100, mag = null, tilt = null;
    if (fine) {
      cur = document.createElement('div'); cur.className = 'cur'; document.body.appendChild(cur); root.classList.add('has-cur');
    }
    // boucle unique : curseur + vélocité de scroll
    let lastY = scrollY, vel = 0;
    const loop = () => {
      if (cur) { x += (tx - x) * 0.24; y += (ty - y) * 0.24; cur.style.transform = `translate(${x}px,${y}px)`; }
      if (!calm) {
        const dy = scrollY - lastY; lastY = scrollY;
        vel += (Math.max(-60, Math.min(60, dy)) - vel) * 0.12;
        root.style.setProperty('--sk', (vel * -0.16).toFixed(2) + 'deg');
        root.style.setProperty('--vel', Math.abs(vel).toFixed(2));
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const reset = (el) => { if (el) { el.style.transform = ''; el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); } };
    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      const tg = e.target && e.target.closest ? e.target : document.body;
      if (cur) {
        const el = tg.closest('[data-cursor],a,button,label,summary');
        const lab = el && el.dataset ? el.dataset.cursor : '';
        cur.classList.toggle('hot', !!el); cur.classList.toggle('big', !!lab); cur.textContent = lab || '';
        cur.classList.toggle('hide', !!tg.closest('textarea,input'));
      }
      if (calm) return;
      const m = tg.closest('.mag');
      if (mag && mag !== m) { reset(mag); mag = null; }
      if (m) { mag = m; const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`; }
      const sp = tg.closest('.spot');
      if (sp) { const r = sp.getBoundingClientRect(); sp.style.setProperty('--mx', e.clientX - r.left + 'px'); sp.style.setProperty('--my', e.clientY - r.top + 'px'); }
      const tl = tg.closest('.tilt');
      if (tilt && tilt !== tl) { reset(tilt); tilt = null; }
      if (tl) {
        tilt = tl; const r = tl.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        tl.style.setProperty('--ry', ((px - 0.5) * 9).toFixed(2) + 'deg');
        tl.style.setProperty('--rx', ((0.5 - py) * 9).toFixed(2) + 'deg');
        tl.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
        tl.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
      }
    };
    const leave = () => { reset(mag); reset(tilt); mag = tilt = null; };
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);

    const io = new IntersectionObserver((es) => es.forEach((o) => { if (o.isIntersecting) { o.target.classList.add('in'); io.unobserve(o.target); } }), { threshold: 0.12 });
    const scan = () => document.querySelectorAll('.rv:not(.in),.rvl:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave);
      io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); cur && cur.remove(); root.classList.remove('has-cur');
    };
  }, []);
  return null;
}
