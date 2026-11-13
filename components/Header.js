'use client';
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { useApp } from './Providers';
import { SITE_NAME, UI } from '../lib/data';
export default function Header() {
  const { lang, changeLang, t, user } = useApp();
  const [dark, setDark] = useState(false);
  const path = usePathname() || '';
  useEffect(() => { setDark(document.documentElement.dataset.theme === 'dark'); }, []);
  const apply = (d) => { setDark(d); document.documentElement.dataset.theme = d ? 'dark' : 'light'; try { localStorage.setItem('ox-theme', d ? 'dark' : 'light'); } catch {} };
  const flip = (e) => {
    const d = !dark;
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(d);
    const x = e.clientX, y = e.clientY, r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => flushSync(() => apply(d)));
    vt.ready.then(() => document.documentElement.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 650, easing: 'cubic-bezier(.65,0,.2,1)', pseudoElement: '::view-transition-new(root)' }));
  };
  const [a, b] = SITE_NAME.split('.');
  return (
    <header className="hdr">
      <div className="sp" />
      <div className="in">
        <Link href="/" className="logo" data-cursor=""><Logo /><span>{a}<em>.{b}</em></span></Link>
        <nav>
          <Link href="/courses/" className={path.startsWith('/courses') ? 'on' : ''}><sup>01</sup>{t(UI.courses)}</Link>
          <Link href="/verify/" className={path.startsWith('/verify') ? 'on' : ''}><sup>02</sup>{t(UI.verify)}</Link>
        </nav>
        <div className="tools">
          <button className="theme" aria-label="Theme" onClick={flip}>{dark ? 'LIGHT' : 'DARK'}</button>
          <div className="lang">{['fr', 'en'].map((l) => <button key={l} className={lang === l ? 'on' : ''} onClick={() => changeLang(l)}>{l}</button>)}</div>
          {user ? <Link href="/account/" className="who">{user.name.split(' ')[0]}</Link> : <Link href="/account/" className="who inv">{t(UI.login)}</Link>}
        </div>
      </div>
    </header>
  );
}
