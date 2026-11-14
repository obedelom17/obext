'use client';
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Ring from './Ring';
import { useApp } from './Providers';
import { SITE_NAME, UI, COURSES } from '../lib/data';
import { X } from '../lib/ux';

export default function Header() {
  const { lang, changeLang, t, user, done } = useApp();
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname() || '';
  const all = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  const got = COURSES.reduce((a, c) => a + c.lessons.filter((l) => done[l.id]).length, 0);
  useEffect(() => { setDark(document.documentElement.dataset.theme === 'dark'); }, []);
  useEffect(() => { setMenu(false); }, [path]);
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; }, [menu]);
  useEffect(() => { const s = () => setScrolled(scrollY > 40); s(); addEventListener('scroll', s, { passive: true }); return () => removeEventListener('scroll', s); }, []);
  const apply = (d) => { setDark(d); document.documentElement.dataset.theme = d ? 'dark' : 'light'; try { localStorage.setItem('ox-theme', d ? 'dark' : 'light'); } catch {} };
  const flip = (x = innerWidth / 2, y = 40) => {
    const d = document.documentElement.dataset.theme !== 'dark';
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(d);
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => flushSync(() => apply(d)));
    vt.ready.then(() => document.documentElement.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 700, easing: 'cubic-bezier(.65,0,.2,1)', pseudoElement: '::view-transition-new(root)' }));
  };
  useEffect(() => { const h = () => flip(); addEventListener('ox:toggle-theme', h); return () => removeEventListener('ox:toggle-theme', h); });
  const [a, b] = SITE_NAME.split('.');
  const nav = [['/courses/', t(UI.courses), '/courses'], ['/verify/', t(UI.verify), '/verify']];
  return (
    <>
    <header className={`hdr${scrolled ? ' sc' : ''}`}>
      <div className="sp" />
      <div className="in">
        <Link href="/" className="logo" data-cursor=""><Logo /><span>{a}<em>.{b}</em></span></Link>
        <nav aria-label="Principal">
          {nav.map(([h, l, p]) => <Link key={h} href={h} className={path.startsWith(p) ? 'on' : ''}>{l}</Link>)}
        </nav>
        <div className="tools">
          <button className="find" onClick={() => dispatchEvent(new CustomEvent('ox:palette'))} aria-label={t(X.search)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span>{t(X.search)}</span><kbd>Ctrl K</kbd>
          </button>
          <button className="theme" aria-label="Theme" onClick={(e) => flip(e.clientX, e.clientY)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={dark ? 'is-dark' : ''}>
              <circle className="sun" cx="12" cy="12" r="4.2" />
              <g className="rays">{[0, 45, 90, 135, 180, 225, 270, 315].map((r) => <path key={r} d="M12 2.5v2.4" transform={`rotate(${r} 12 12)`} />)}</g>
              <path className="moon" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
            </svg>
          </button>
          <div className="lang" data-lang={lang}><i />{['fr', 'en'].map((l) => <button key={l} className={lang === l ? 'on' : ''} onClick={() => changeLang(l)}>{l}</button>)}</div>
          {user
            ? <Link href="/account/" className="who"><Ring value={all ? got / all : 0} size={26} color="var(--signal)" mini />{user.name.split(' ')[0]}</Link>
            : <Link href="/account/" className="who inv">{t(UI.login)}</Link>}
          <button className={`burger${menu ? ' x' : ''}`} aria-label={t(menu ? X.close : X.menu)} aria-expanded={menu} onClick={() => setMenu(!menu)}><i /><i /></button>
        </div>
      </div>
    </header>
      <div className={`sheet${menu ? ' open' : ''}`} aria-hidden={!menu}>
        {[['/', t(X.actHome)], ['/courses/', t(UI.courses)], ['/verify/', t(UI.verify)], ['/account/', user ? user.name.split(' ')[0] : t(UI.login)]].map(([h, l], i) => <Link key={h} href={h} style={{ '--i': i }}>{l}</Link>)}
        <button style={{ '--i': 4 }} onClick={() => { setMenu(false); dispatchEvent(new CustomEvent('ox:palette')); }}>{t(X.search)}</button>
      </div>
    </>
  );
}
