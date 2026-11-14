'use client';
import Link from 'next/link';
import Hero from '../components/Hero';
import Field from '../components/Field';
import CourseRow from '../components/CourseRow';
import CountUp from '../components/CountUp';
import { useApp } from '../components/Providers';
import { COURSES, UI } from '../lib/data';
import { X } from '../lib/ux';

const WORDS = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Algorithmes', 'Hooks', 'Flexbox', 'Server Actions', 'Async'];

// Découpe en mots puis en lettres : chaque lettre monte à son tour, une seule fois, au chargement.
function Line({ text, d = 0, cls = '' }) {
  let k = 0;
  return (
    <span className={`ln ${cls}`}>
      <span className="chs">
        {text.split(' ').map((w, wi) => (
          <span key={wi} className="wd">
            {[...w].map((c) => <span key={k} className="ch" style={{ '--i': k++, '--d': `${d}s` }}>{c}</span>)}
            {' '}
          </span>
        ))}
      </span>
    </span>
  );
}

const Arrow = () => <svg className="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

// Petites scènes animées en CSS pour illustrer chaque principe.
const Scene = ({ k }) => {
  if (k === 0) return <div className="sc sc-read" aria-hidden="true"><i /><i /><i /><b>{'{ }'}</b></div>;
  if (k === 1) return <div className="sc sc-test" aria-hidden="true">{[0, 1, 2].map((i) => <p key={i} style={{ '--i': i }}><span />{['double(4) → 8', 'evens([1,2,3,4])', '<h1> présent'][i]}</p>)}</div>;
  if (k === 2) return <div className="sc sc-hint" aria-hidden="true"><pre>{'return n * 2;'}</pre><span className="lock" /></div>;
  return <div className="sc sc-id" aria-hidden="true"><b>OX-7K2M9QX4PA</b><span className="ok">✓</span></div>;
};

export default function Home() {
  const { t } = useApp();
  const lessons = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  const band = [...WORDS, ...WORDS].map((w, i) => <span key={i}>{w}<b>✱</b></span>);
  const principles = [['f1t', 'f1d2'], ['f2t', 'f2d2'], ['f3t', 'f3d2'], ['f4t', 'f4d']];
  return (
    <main>
      <section className="hero">
        <Field />
        <div className="meta-top"><span className="lbl">{t(UI.badge)}</span><span className="lbl live"><i className="dot" />{lessons} {t(X.heroLessons)}</span></div>
        <h1 aria-label={`${t(UI.h1a)} ${t(UI.h1b)} ${t(UI.h1c)}`}>
          <Line text={t(UI.h1a)} d={0.05} />
          <Line text={t(UI.h1b)} d={0.3} />
          <Line text={t(UI.h1c)} d={0.55} cls="outline" />
        </h1>
        <div className="hero-grid">
          <div>
            <p className="lead rv" style={{ '--d': '.9s' }}>{t(UI.heroSub2)}</p>
            <div className="row rv" style={{ '--d': '1s' }}>
              <Link className="btn mag" href="/courses/">{t(UI.start)}<span className="ar"><Arrow /></span></Link>
              <Link className="btn ghost mag" href="/verify/">{t(UI.verify)}</Link>
            </div>
          </div>
          <div className="rv" style={{ '--d': '.8s' }}><Hero /></div>
        </div>
      </section>
      <div className="cross" aria-hidden="true">
        <div className="bandA"><div>{band}</div></div>
        <div className="bandB"><div>{band}</div></div>
      </div>
      <section className="sec">
        <div className="sec-h"><span className="lbl rv">{t(UI.pathLbl).replace(/^\[\d+\]\s*/, '')}</span><h2 className="rv">{t({ fr: `${COURSES.length} cours. Une seule méthode.`, en: `${COURSES.length} courses. One method.` })}</h2></div>
        <div className="rows">{COURSES.map((c, i) => <CourseRow key={c.slug} c={c} i={i} />)}</div>
      </section>
      <section className="sec method">
        <div className="sec-h"><span className="lbl rv">{t(UI.methodLbl).replace(/^\[\d+\]\s*/, '')}</span><h2 className="rv">{t(UI.methodTitle)}</h2></div>
        <div className="cards">
          {principles.map(([a, b], i) => (
            <article key={a} className={`mcard m${i}`} style={{ '--i': i }}>
              <b className="mn">{i + 1}</b>
              <div className="mt"><h3>{t(UI[a])}</h3><p>{t(UI[b])}</p></div>
              <Scene k={i} />
            </article>
          ))}
        </div>
      </section>
      <section className="sec">
        <span className="lbl rv">{t(UI.numsLbl).replace(/^\[\d+\]\s*/, '')}</span>
        <div className="nums">
          <div className="rv"><b><CountUp to={COURSES.length} /></b><span>{t(UI.sCourses)}</span></div>
          <div className="rv" style={{ '--d': '.1s' }}><b><CountUp to={lessons} /></b><span>{t(UI.sLessons)}</span></div>
          <div className="rv" style={{ '--d': '.2s' }}><b><CountUp to={2} /></b><span>{t(UI.sLangs)}</span></div>
        </div>
      </section>
      <section className="cta">
        <div className="big rv">{t(UI.ctaBig)}</div>
        <Link className="btn inv mag" href="/courses/">{t(UI.start)}<span className="ar"><Arrow /></span></Link>
      </section>
    </main>
  );
}
