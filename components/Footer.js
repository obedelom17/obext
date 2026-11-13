'use client';
import Link from 'next/link';
import { useApp } from './Providers';
import { SITE_NAME, UI } from '../lib/data';
export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="ft">
      <div className="in">
        <p>{t(UI.footTag)}</p>
        <nav><Link href="/courses/">{t(UI.courses)}</Link><Link href="/verify/">{t(UI.verify)}</Link><Link href="/account/">{t(UI.login)}</Link></nav>
        <small>© {new Date().getFullYear()} {SITE_NAME}</small>
      </div>
      <div className="giant" aria-hidden="true">{SITE_NAME}</div>
    </footer>
  );
}
