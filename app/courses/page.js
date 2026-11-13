'use client';
import Link from 'next/link';
import Ring from '../../components/Ring';
import { useApp } from '../../components/Providers';
import { COURSES, UI, BADGES, isReady } from '../../lib/data';
export default function Courses() {
  const { t, done } = useApp();
  const all = COURSES.flatMap((c) => c.lessons);
  const total = all.filter((l) => done[l.id]).length;
  const finished = COURSES.filter((c) => isReady(c, done)).length;
  const next = COURSES.find((c) => !isReady(c, done));
  return (
    <main className="wrap">
      <header className="rv"><h1>{t(UI.dash)}</h1><p className="lead">{t(UI.pathSub)}</p>
        {next && <Link className="btn" href={`/courses/${next.slug}/`}>{t(UI.resume)} · {t(next.title)} <span className="arr">→</span></Link>}
      </header>
      <div className="kpis">
        <div className="kpi rv"><b>{total}<small> / {all.length}</small></b><span>{t(UI.kDone)}</span></div>
        <div className="kpi rv" style={{ '--d': '.08s' }}><b>{finished}<small> / {COURSES.length}</small></b><span>{t(UI.kCourses)}</span></div>
        <div className="kpi rv" style={{ '--d': '.16s' }}><Ring value={all.length ? total / all.length : 0} size={72} /><span>{t(UI.kPct)}</span></div>
      </div>
      <div className="badges rv">{BADGES.map((b) => <span key={b.id} className={b.test(done) ? 'badge on' : 'badge'}>{b.icon} {t(b.t)}</span>)}</div>
      <div className="grid">
        {COURSES.map((c, i) => {
          const n = c.lessons.filter((l) => done[l.id]).length;
          return (
            <Link key={c.slug} href={`/courses/${c.slug}/`} className="card glow rv" style={{ '--c': c.color, '--d': `${i * 0.06}s` }}>
              <div className="top"><span className="ic">{c.icon}</span><Ring value={n / c.lessons.length} size={52} color={c.color} /></div>
              <div className="lvl">{t(c.level)}{isReady(c, done) ? ' · ✓' : ''}</div>
              <h3>{t(c.title)}</h3><p>{t(c.desc)}</p>
              <div className="meta"><span>{n} / {c.lessons.length} {t(UI.lessons)}</span><span className="arr">→</span></div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
