'use client';
import Link from 'next/link';
import Hero from '../components/Hero';
import { useApp } from '../components/Providers';
import { COURSES, UI } from '../lib/data';
export default function Home() {
  const { t } = useApp();
  return (
    <main>
      <section className="wrap hero">
        <div>
          <h1>{t(UI.heroTitle)}</h1>
          <p className="lead">{t(UI.heroSub)}</p>
          <Link className="btn" href="/courses/">{t(UI.start)}</Link>
        </div>
        <Hero />
      </section>
      <div className="marquee"><div>{[...COURSES, ...COURSES, ...COURSES, ...COURSES].map((c, i) => <span key={i}>{c.title.en} · {t(c.level)} · </span>)}</div></div>
      <section className="wrap">
        <h2>{t(UI.path)}</h2>
        <div className="steps">
          {COURSES.map((c, i) => (
            <Link key={c.slug} href={`/courses/${c.slug}/`} className="step" style={{ '--c': c.color, '--d': `${i * 90}ms` }}>
              <em>{c.icon}</em><h3>{t(c.title)}</h3><small>{t(c.level)}</small><p>{t(c.desc)}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap feats">
        {[['f1t', 'f1d'], ['f2t', 'f2d'], ['f3t', 'f3d']].map(([a, b]) => <div key={a}><h3>{t(UI[a])}</h3><p>{t(UI[b])}</p></div>)}
      </section>
    </main>
  );
}
