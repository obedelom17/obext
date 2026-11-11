'use client';
import Link from 'next/link';
import { useApp } from '../../components/Providers';
import { COURSES, UI, BADGES } from '../../lib/data';
export default function Courses() {
  const { t, done } = useApp();
  const every = COURSES.flatMap((c) => c.lessons);
  const total = every.filter((l) => done[l.id]).length;
  return (
    <main className="wrap">
      <h1>{t(UI.courses)}</h1>
      <p className="lead">{total} / {every.length} {t(UI.lessons)} ✓</p>
      <div className="badges">{BADGES.map((b) => <span key={b.id} className={b.test(done) ? 'badge on' : 'badge'}>{b.icon} {t(b.t)}</span>)}</div>
      <div className="steps" style={{ marginTop: '2rem' }}>
        {COURSES.map((c) => {
          const n = c.lessons.filter((l) => done[l.id]).length;
          return (
            <Link key={c.slug} href={`/courses/${c.slug}/`} className="step" style={{ '--c': c.color }}>
              <em>{c.icon}</em><h3>{t(c.title)}</h3><small>{t(c.level)} · {c.lessons.length} {t(UI.lessons)}</small><p>{t(c.desc)}</p>
              <div className="prog"><i style={{ width: `${(n / c.lessons.length) * 100}%` }} /></div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
