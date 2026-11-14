'use client';
import { useEffect, useState } from 'react';
import { useApp } from '../../components/Providers';
import { COURSES, UI } from '../../lib/data';
import { X } from '../../lib/ux';
export default function Verify() {
  const { t, lang, api } = useApp();
  const [id, setId] = useState('');
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(false);
  const check = async (v) => { setBusy(true); const r = await api('verify?id=' + encodeURIComponent(v)); setBusy(false); setRes(r.ok ? r.data : false); if (r.ok) dispatchEvent(new CustomEvent('ox:burst', { detail: { x: innerWidth / 2, y: innerHeight * 0.55, power: 0.8 } })); };
  useEffect(() => { const v = new URLSearchParams(location.search).get('id'); if (v) { setId(v); check(v); } }, []);
  const course = res && COURSES.find((c) => c.slug === res.course);
  return (
    <main className="page">
      <header className="ph"><h1 className="rvl"><span className="ln"><span>{t(UI.verifyTitle)}</span></span></h1><p className="lead">{t(X.verPitch)}</p></header>
      <form className="vform" onSubmit={(e) => { e.preventDefault(); if (id.trim()) check(id.trim()); }}>
        <label className="fld"><input placeholder=" " value={id} onChange={(e) => setId(e.target.value)} spellCheck={false} autoCapitalize="characters" /><span>OX-XXXXXXXXXX</span></label>
        <button className="btn" disabled={busy}>{busy ? '…' : t(UI.check)}</button>
      </form>
      {res === false && <p className="msg shake" role="alert">✗ {t(UI.invalid)}</p>}
      {res && (
        <div className="vcard" style={{ '--c': course?.color }}>
          <svg className="tick" width="56" height="56" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="m14 27 8 8 16-17" /></svg>
          <div><h3>{t(UI.valid)}</h3><p><b>{res.name}</b> — {course ? t(course.title) : res.course}</p><small>{t(UI.issued)} {new Date(res.issued_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long' })}</small></div>
        </div>
      )}
    </main>
  );
}
