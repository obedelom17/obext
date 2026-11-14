'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/Providers';
import { COURSES, UI, SITE_NAME, isReady } from '../../lib/data';
import { X } from '../../lib/ux';
import CertCard from '../../components/CertCard';
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
      <CertCard t={t} lang={lang} color={course.color} name={cert.name} courseTitle={t(course.title)} date={new Date(cert.issued_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long' })} id={cert.id} url={url} />
    </main>
  );
}
