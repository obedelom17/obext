'use client';
import Link from 'next/link';
import { useApp } from './Providers';
import { SITE_NAME, UI } from '../lib/data';
export default function Header() {
  const { lang, changeLang, t } = useApp();
  return (
    <header className="hdr">
      <Link href="/" className="logo"><span>{'</>'}</span>{SITE_NAME}</Link>
      <nav>
        <Link href="/courses/">{t(UI.courses)}</Link>
        <div className="lang">
          {['fr', 'en'].map((l) => <button key={l} className={lang === l ? 'on' : ''} onClick={() => changeLang(l)}>{l.toUpperCase()}</button>)}
        </div>
      </nav>
    </header>
  );
}
