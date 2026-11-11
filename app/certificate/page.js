'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/Providers';
import { COURSES, UI, SITE_NAME, isReady } from '../../lib/data';
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
  if (!ready || !slug) return <main className="wrap" />;
  if (!course) return <main className="wrap"><Link className="btn" href="/courses/">{t(UI.courses)}</Link></main>;
  if (!user) return <main className="wrap"><p className="lead">{t(UI.loginReq)}</p><Link className="btn" href="/account/">{t(UI.login)}</Link></main>;
  if (!isReady(course, done)) return <main className="wrap"><p className="lead">{t(UI.locked)}</p><Link className="btn" href={`/courses/${slug}/`}>{t(course.title)}</Link></main>;
  if (!cert) return <main className="wrap"><p className="lead">{err || '…'}</p></main>;
  const url = `${location.origin}/verify/?id=${cert.id}`;
  return (
    <main className="wrap">
      <div className="noprint row"><button className="btn" onClick={() => window.print()}>{t(UI.print)}</button></div>
      <div className="cert" style={{ '--c': course.color }}>
        <small>{SITE_NAME}</small>
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
