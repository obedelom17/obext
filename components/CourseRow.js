'use client';
import Link from 'next/link';
import { useApp } from './Providers';
import { UI } from '../lib/data';
export default function CourseRow({ c, i, done = {} }) {
  const { t } = useApp();
  const n = c.lessons.filter((l) => done[l.id]).length;
  return (
    <Link href={`/courses/${c.slug}/`} className="row-c rv" data-cursor={t(UI.open)} style={{ '--d': `${i * 0.05}s` }}>
      <span className="n">{String(i + 1).padStart(2, '0')}</span>
      <div><h3>{t(c.title)}</h3><p className="sub">{t(c.desc)}</p></div>
      <div className="lv"><span className="lbl">{t(c.level)}</span><span className="lbl">{n}/{c.lessons.length} {t(UI.lessons)}</span></div>
      <div className="segs" aria-hidden="true">{c.lessons.map((l) => <i key={l.id} className={done[l.id] ? 'on' : ''} />)}</div>
      <span className="go">→</span>
    </Link>
  );
}
