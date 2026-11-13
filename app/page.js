'use client';
import Link from 'next/link';
import Hero from '../components/Hero';
import CourseRow from '../components/CourseRow';
import CountUp from '../components/CountUp';
import { useApp } from '../components/Providers';
import { COURSES, UI } from '../lib/data';
const WORDS = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Algorithmes', 'Hooks', 'Flexbox', 'Server Actions', 'Async'];
const Line = ({ children, d }) => <span className="ln"><span style={{ '--d': d }}>{children}</span></span>;
export default function Home() {
  const { t } = useApp();
  const lessons = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  const band = [...WORDS, ...WORDS].map((w, i) => <span key={i}>{w}<b>✱</b></span>);
  return (
    <main>
      <section className="hero">
        <div className="meta-top"><span className="lbl">{t(UI.badge)}</span><span className="lbl">N° 001</span></div>
        <h1 className="rvl"><Line d="0s">{t(UI.h1a)}</Line><Line d=".12s">{t(UI.h1b)}</Line><Line d=".24s"><em>{t(UI.h1c)}</em><i className="blk" /></Line></h1>
        <div className="hero-grid">
          <div>
            <p className="lead rv" style={{ '--d': '.5s' }}>{t(UI.heroSub2)}</p>
            <div className="row rv" style={{ '--d': '.6s' }}>
              <Link className="btn mag" href="/courses/">{t(UI.start)}<span className="arr">→</span></Link>
              <Link className="btn ghost mag" href="/verify/">{t(UI.verify)}</Link>
            </div>
          </div>
          <div className="rv" style={{ '--d': '.4s' }}><Hero /></div>
        </div>
      </section>
      <div className="cross" aria-hidden="true">
        <div className="bandA"><div>{band}</div></div>
        <div className="bandB"><div>{band}</div></div>
      </div>
      <section className="sec">
        <div className="sec-h"><span className="lbl rv">{t(UI.pathLbl)}</span><h2 className="rv">{t({ fr: `${COURSES.length} cours. Une seule méthode.`, en: `${COURSES.length} courses. One method.` })}</h2></div>
        <div className="rows">{COURSES.map((c, i) => <CourseRow key={c.slug} c={c} i={i} />)}</div>
      </section>
      <section className="sec method">
        <div className="sticky"><span className="lbl">{t(UI.methodLbl)}</span><h2>{t(UI.methodTitle)}</h2></div>
        <div className="items">
          {[['f1t', 'f1d2'], ['f2t', 'f2d2'], ['f3t', 'f3d2'], ['f4t', 'f4d']].map(([a, b], i) => (
            <div key={a} className="item sd"><b>0{i + 1}</b><div><h3>{t(UI[a])}</h3><p>{t(UI[b])}</p></div></div>
          ))}
        </div>
      </section>
      <section className="sec">
        <span className="lbl rv">{t(UI.numsLbl)}</span>
        <div className="nums">
          <div className="rv"><b><CountUp to={COURSES.length} /></b><span>{t(UI.sCourses)}</span></div>
          <div className="rv" style={{ '--d': '.1s' }}><b><CountUp to={lessons} /></b><span>{t(UI.sLessons)}</span></div>
          <div className="rv" style={{ '--d': '.2s' }}><b><CountUp to={2} /></b><span>{t(UI.sLangs)}</span></div>
        </div>
      </section>
      <section className="cta">
        <div className="big rv">{t(UI.ctaBig)}</div>
        <Link className="btn inv mag" href="/courses/">{t(UI.start)}<span className="arr">→</span></Link>
      </section>
    </main>
  );
}
