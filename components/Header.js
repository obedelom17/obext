'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from './Providers';
import { SITE_NAME, UI } from '../lib/data';
export default function Header() {
  const { lang, changeLang, t, user, logout } = useApp();
  const [dark, setDark] = useState(false);
  useEffect(() => { try { const d = localStorage.getItem('ox-theme') === 'dark'; setDark(d); document.documentElement.dataset.theme = d ? 'dark' : 'light'; } catch {} }, []);
  const flip = () => { const d = !dark; setDark(d); document.documentElement.dataset.theme = d ? 'dark' : 'light'; try { localStorage.setItem('ox-theme', d ? 'dark' : 'light'); } catch {} };
  return (
    <header className="hdr">
      <Link href="/" className="logo"><span>{'</>'}</span>{SITE_NAME}</Link>
      <nav>
        <Link href="/courses/">{t(UI.courses)}</Link>
        {user ? <><Link href="/account/" className="who">{user.name.split(" ")[0]}</Link><button className="linkish" onClick={logout}>{t(UI.logout)}</button></> : <Link href="/account/">{t(UI.login)}</Link>}
        <button className="theme" aria-label="theme" onClick={flip}>{dark ? '☀' : '☾'}</button>
        <div className="lang">
          {['fr', 'en'].map((l) => <button key={l} className={lang === l ? 'on' : ''} onClick={() => changeLang(l)}>{l.toUpperCase()}</button>)}
        </div>
      </nav>
    </header>
  );
}
