'use client';
import Link from 'next/link';
import Hero from '../components/Hero';
import CountUp from '../components/CountUp';
import { useApp } from '../components/Providers';
import { COURSES, UI } from '../lib/data';
const TAGS = ['HTML', 'CSS', 'Flexbox', 'Grid', 'JavaScript', 'Async / Await', 'Algorithmes', 'React', 'Hooks', 'Next.js', 'Server Actions', 'Route Handlers', 'Middleware', 'Suspense'];
const d = (s) => ({ '--d': `${s}s` });
export default function Home() {
  const { t } = useApp();
  const lessons = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  return (
    <main>
      <section className="wrap hero">
        <div>
          <span className="pill rv"><i className="dot" />{t(UI.badge)}</span>
          <h1 className="rv" style={d(0.08)}>{t(UI.heroA)} <em>{t(UI.heroB)}</em></h1>
          <p className="lead rv" style={d(0.16)}>{t(UI.heroSub2)}</p>
          <div className="row rv" style={d(0.24)}>
            <Link className="btn" href="/courses/">{t(UI.start)} <span className="arr">→</span></Link>
            <Link className="btn ghost" href="/verify/">{t(UI.verify)}</Link>
          </div>
          <dl className="stats rv" style={d(0.32)}>
            <div><dt><CountUp to={COURSES.length} /></dt><dd>{t(UI.sCourses)}</dd></div>
            <div><dt><CountUp to={lessons} suffix="+" /></dt><dd>{t(UI.sLessons)}</dd></div>
            <div><dt><CountUp to={2} /></dt><dd>{t(UI.sLangs)}</dd></div>
          </dl>
        </div>
        <div className="rv" style={d(0.2)}><Hero /></div>
      </section>
      <div className="marquee"><div>{[...TAGS, ...TAGS].map((x, i) => <span key={i}>{x}</span>)}</div></div>
      <section className="wrap">
        <h2 className="rv">{t(UI.path)}</h2>
        <p className="lead rv" style={{ marginTop: 0 }}>{t(UI.pathSub)}</p>
        <div className="grid">
          {COURSES.map((c, i) => (
            <Link key={c.slug} href={`/courses/${c.slug}/`} className="card glow rv" style={{ '--c': c.color, ...d(i * 0.07) }}>
              <span className="ic">{c.icon}</span>
              <div className="lvl">{t(c.level)}</div>
              <h3>{t(c.title)}</h3>
              <p>{t(c.desc)}</p>
              <div className="meta"><span>{c.lessons.length} {t(UI.lessons)}</span><span className="arr">→</span></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap">
        <h2 className="rv">{t(UI.featTitle)}</h2>
        <div className="grid feats">
          {[['f1t', 'f1d2'], ['f2t', 'f2d2'], ['f3t', 'f3d2'], ['f4t', 'f4d']].map(([a, b], i) => (
            <div key={a} className="card glow rv" style={d(i * 0.08)}><div className="num">0{i + 1}</div><h3>{t(UI[a])}</h3><p>{t(UI[b])}</p></div>
          ))}
        </div>
      </section>
      <section className="wrap">
        <div className="cta rv"><h2>{t(UI.ctaTitle)}</h2><p className="lead" style={{ margin: '0 auto 1.6rem' }}>{t(UI.ctaSub)}</p><Link className="btn" href="/courses/">{t(UI.start)} <span className="arr">→</span></Link></div>
      </section>
    </main>
  );
}
