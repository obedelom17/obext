'use client';
import Link from 'next/link';
import CourseRow from '../../components/CourseRow';
import Ring from '../../components/Ring';
import { useApp } from '../../components/Providers';
import { COURSES, UI, BADGES, isReady } from '../../lib/data';
import { X } from '../../lib/ux';
export default function Courses() {
  const { t, done } = useApp();
  const all = COURSES.flatMap((c) => c.lessons);
  const total = all.filter((l) => done[l.id]).length;
  const finished = COURSES.filter((c) => isReady(c, done)).length;
  const next = COURSES.find((c) => !isReady(c, done));
  const pct = all.length ? Math.round((total / all.length) * 100) : 0;
  const nextDone = next ? next.lessons.filter((l) => done[l.id]).length : 0;
  return (
    <main className="page">
      <header className="ph"><h1 className="rvl"><span className="ln"><span>{t(UI.dash)}</span></span></h1></header>
      <section className="dash">
        <div className="dash-ring"><Ring value={pct / 100} size={168} color="var(--signal)" /><span>{t(X.fullPath)}</span></div>
        <div className="nums sm">
          <div><b>{total}<small>/{all.length}</small></b><span>{t(UI.kDone)}</span></div>
          <div><b>{finished}<small>/{COURSES.length}</small></b><span>{t(UI.kCourses)}</span></div>
          <div><b>{pct}<small>%</small></b><span>{t(UI.kPct)}</span></div>
        </div>
      </section>
      {next ? (
        <Link href={`/courses/${next.slug}/`} className="next spot mag" style={{ '--c': next.color }} data-cursor={t(UI.resume)}>
          <i className="tile">{next.icon}</i>
          <div><span className="lbl">{t(X.nextUp)}</span><h3>{t(UI.resume)} · {t(next.title)}</h3></div>
          <div className="next-bar"><i style={{ width: `${(nextDone / next.lessons.length) * 100}%` }} /></div>
          <svg className="go" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ) : <p className="lead">{t(X.allDone)}</p>}
      <div className="badges">{BADGES.map((b, i) => <span key={b.id} style={{ '--i': i }} className={b.test(done) ? 'badge on' : 'badge'}>{b.icon} {t(b.t)}</span>)}</div>
      <div className="rows">{COURSES.map((c, i) => <CourseRow key={c.slug} c={c} i={i} done={done} />)}</div>
    </main>
  );
}
