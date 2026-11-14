'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/Providers';
import { COURSES, UI, SITE_NAME, isReady } from '../../lib/data';
import { X } from '../../lib/ux';
export default function Certificate() {
  const { t, lang, done, user, ready, api } = useApp();
  const [slug, setSlug] = useState(null);
  const [cert, setCert] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => setSlug(new URLSearchParams(location.search).get('c')), []);
  const course = COURSES.find((c) => c.slug === slug);
  useEffect(() => {
    if (!course || !user || !isReady(course, done)) return;
    api('certificate', { course: slug }).then((r) => (r.ok ? setCert(r.data) : setErr(t(UI.syncErr))));
  }, [slug, user]);
  useEffect(() => { if (cert) setTimeout(() => dispatchEvent(new CustomEvent('ox:burst', { detail: { x: innerWidth / 2, y: innerHeight * 0.4, power: 1.5 } })), 500); }, [cert]);
  if (!ready || !slug) return <main className="page" />;
  if (!course) return <main className="page"><Link className="btn" href="/courses/">{t(UI.courses)}</Link></main>;
  if (!user) return <main className="page"><p className="lead">{t(UI.loginReq)}</p><Link className="btn" href="/account/">{t(UI.login)}</Link></main>;
  if (!isReady(course, done)) return <main className="page"><p className="lead">{t(UI.locked)}</p><Link className="btn" href={`/courses/${slug}/`}>{t(course.title)}</Link></main>;
  if (!cert) return <main className="page"><p className="lead">{err || '…'}</p></main>;
  const url = `${location.origin}/verify/?id=${cert.id}`;
  return (
    <main className="page">
      <div className="noprint row"><button className="btn" onClick={() => window.print()}>{t(UI.print)}</button></div>
      <div className="cert" style={{ '--c': course.color }}>
        <div className="seal" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><path id="cp" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs><text><textPath href="#cp">{`${SITE_NAME} · ${SITE_NAME} · ${SITE_NAME} · ${SITE_NAME} · `}</textPath></text><circle cx="60" cy="60" r="28" /><path d="m47 61 9 9 18-20" /></svg></div>
        <small>{t(X.signedBy)} {SITE_NAME}</small>
        <h1>{t(UI.certOf)}</h1>
        <h2>{cert.name}</h2>
        <p>{t(UI.certText)}</p>
        <h3>{t(course.title)}</h3>
        <footer><span>{new Date(cert.issued_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long' })}</span><span>ID {cert.id}</span></footer>
        <small>{t(UI.verifyUrl)} : {url}</small>
      </div>
    </main>
  );
}
