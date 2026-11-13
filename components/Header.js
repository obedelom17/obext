'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './Providers';
import { SITE_NAME, UI } from '../lib/data';
export default function Header() {
  const { lang, changeLang, t, user } = useApp();
  const [dark, setDark] = useState(true);
  const [sc, setSc] = useState(false);
  const path = usePathname() || '';
  useEffect(() => {
    setDark(document.documentElement.dataset.theme !== 'light');
    const f = () => setSc(window.scrollY > 8);
    f(); addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  const flip = () => { const d = !dark; setDark(d); document.documentElement.dataset.theme = d ? 'dark' : 'light'; try { localStorage.setItem('ox-theme', d ? 'dark' : 'light'); } catch {} };
  const [a, b] = SITE_NAME.split('.');
  return (
    <header className={`hdr${sc ? ' sc' : ''}`}>
      <div className="in">
        <Link href="/" className="logo"><b>{'</>'}</b><div>{a}<span>.{b}</span></div></Link>
        <nav>
          <Link href="/courses/" className={path.startsWith('/courses') ? 'on' : ''}>{t(UI.courses)}</Link>
          <Link href="/verify/" className={path.startsWith('/verify') ? 'on' : ''}>{t(UI.verify)}</Link>
        </nav>
        <div className="tools">
          <button className="theme" aria-label="Theme" onClick={flip}>{dark ? '☀' : '☾'}</button>
          <div className="lang">{['fr', 'en'].map((l) => <button key={l} className={lang === l ? 'on' : ''} onClick={() => changeLang(l)}>{l.toUpperCase()}</button>)}</div>
          {user ? <Link href="/account/" className="who">{user.name.split(' ')[0]}</Link> : <Link href="/account/" className="btn sm">{t(UI.login)}</Link>}
        </div>
      </div>
    </header>
  );
}
