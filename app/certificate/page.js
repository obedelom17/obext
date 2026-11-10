'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/Providers';
import { COURSES, UI, SITE_NAME } from '../../lib/data';
const hash = (s) => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return h.toString(36).toUpperCase(); };
export default function Certificate() {
  const { t, lang, done } = useApp();
  const [slug, setSlug] = useState(null);
  const [name, setName] = useState('');
  useEffect(() => setSlug(new URLSearchParams(location.search).get('c')), []);
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) return <main className="wrap"><Link className="btn" href="/courses/">{t(UI.courses)}</Link></main>;
  if (!course.lessons.every((l) => done[l.id])) return <main className="wrap"><p className="lead">{t(UI.locked)}</p><Link className="btn" href={`/courses/${slug}/`}>{t(course.title)}</Link></main>;
  const date = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long' });
  return (
    <main className="wrap">
      <div className="noprint row">
        <input placeholder={t(UI.yourName)} value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn" onClick={() => window.print()}>{t(UI.print)}</button>
      </div>
      <div className="cert" style={{ '--c': course.color }}>
        <small>{SITE_NAME}</small>
        <h1>{t(UI.certOf)}</h1>
        <h2>{name || '…'}</h2>
        <p>{t(UI.certText)}</p>
        <h3>{t(course.title)}</h3>
        <footer><span>{date}</span><span>ID {name ? `KX-${hash(name + slug)}` : '—'}</span></footer>
      </div>
    </main>
  );
}
