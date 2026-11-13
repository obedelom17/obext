'use client';
import Link from 'next/link';
import CourseRow from '../../components/CourseRow';
import { useApp } from '../../components/Providers';
import { COURSES, UI, BADGES, isReady } from '../../lib/data';
export default function Courses() {
  const { t, done } = useApp();
  const all = COURSES.flatMap((c) => c.lessons);
  const total = all.filter((l) => done[l.id]).length;
  const finished = COURSES.filter((c) => isReady(c, done)).length;
  const next = COURSES.find((c) => !isReady(c, done));
  const pct = all.length ? Math.round((total / all.length) * 100) : 0;
  return (
    <main className="page">
      <header className="ph"><span className="lbl">{t(UI.dash)}</span><h1 className="rvl"><span className="ln"><span>{t(UI.dash)}</span></span></h1></header>
      <div className="nums sm">
        <div><b>{total}<small>/{all.length}</small></b><span>{t(UI.kDone)}</span></div>
        <div><b>{finished}<small>/{COURSES.length}</small></b><span>{t(UI.kCourses)}</span></div>
        <div><b>{pct}<small>%</small></b><span>{t(UI.kPct)}</span></div>
      </div>
      {next && <div className="row"><Link className="btn mag" href={`/courses/${next.slug}/`}>{t(UI.resume)} · {t(next.title)}<span className="arr">→</span></Link></div>}
      <div className="badges">{BADGES.map((b) => <span key={b.id} className={b.test(done) ? 'badge on' : 'badge'}>{b.icon} {t(b.t)}</span>)}</div>
      <div className="rows">{COURSES.map((c, i) => <CourseRow key={c.slug} c={c} i={i} done={done} />)}</div>
    </main>
  );
}
