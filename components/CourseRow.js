'use client';
import Link from 'next/link';
import { useApp } from './Providers';
import { UI } from '../lib/data';
export default function CourseRow({ c, i, done = {} }) {
  const { t } = useApp();
  const n = c.lessons.filter((l) => done[l.id]).length;
  return (
    <Link href={`/courses/${c.slug}/`} className="row-c spot rv" data-cursor={t(UI.open)} style={{ '--d': `${i * 0.05}s`, '--c': c.color }}>
      <span className="n">{String(i + 1).padStart(2, '0')}</span>
      <i className="tile" aria-hidden="true">{c.icon}</i>
      <div><h3>{t(c.title)}</h3><p className="sub">{t(c.desc)}</p></div>
      <div className="lv"><span className="lbl">{t(c.level)}</span><span className="lbl">{n}/{c.lessons.length} {t(UI.lessons)}</span></div>
      <div className="segs" aria-hidden="true">{c.lessons.map((l) => <i key={l.id} className={done[l.id] ? 'on' : ''} />)}</div>
      <svg className="go" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </Link>
  );
}
