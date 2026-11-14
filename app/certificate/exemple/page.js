'use client';
import Link from 'next/link';
import CertCard from '../../../components/CertCard';
import { useApp } from '../../../components/Providers';
import { COURSES, UI } from '../../../lib/data';
import { X } from '../../../lib/ux';

// Exemple public : montre à quoi ressemble un certificat avant de s’inscrire.
export default function CertificateExample() {
  const { t, lang } = useApp();
  const course = COURSES.find((c) => c.slug === 'javascript');
  return (
    <main className="page">
      <header className="ph">
        <h1 className="rvl"><span className="ln"><span>{t(X.exampleTitle)}</span></span></h1>
        <p className="lead">{t(X.exampleText)}</p>
      </header>
      <CertCard sample t={t} lang={lang} color={course.color} name="Ama Mensah" courseTitle={t(course.title)}
        date={new Date(2026, 10, 14).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long' })}
        id="OX-EXEMPLE0000" url="obext.js/verify/?id=OX-…" />
      <div className="row noprint"><Link className="btn" href="/account/">{t(X.createAcc)}</Link><Link className="btn ghost" href="/courses/">{t(UI.courses)}</Link></div>
    </main>
  );
}
