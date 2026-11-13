'use client';
import Link from 'next/link';
import { useApp } from './Providers';
import { SITE_NAME, UI } from '../lib/data';
export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="ft"><div className="in">
      <div><b>{SITE_NAME}</b><div>{t(UI.footTag)}</div></div>
      <nav><Link href="/courses/">{t(UI.courses)}</Link><Link href="/verify/">{t(UI.verify)}</Link><Link href="/account/">{t(UI.login)}</Link></nav>
      <small>© {new Date().getFullYear()} {SITE_NAME}</small>
    </div></footer>
  );
}
