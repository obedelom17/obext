'use client';
import { useEffect, useState } from 'react';
import { useApp } from '../../components/Providers';
import { COURSES, UI } from '../../lib/data';
export default function Verify() {
  const { t, lang, api } = useApp();
  const [id, setId] = useState('');
  const [res, setRes] = useState(null);
  const check = async (v) => { const r = await api('verify?id=' + encodeURIComponent(v)); setRes(r.ok ? r.data : false); };
  useEffect(() => { const v = new URLSearchParams(location.search).get('id'); if (v) { setId(v); check(v); } }, []);
  const course = res && COURSES.find((c) => c.slug === res.course);
  return (
    <main className="wrap">
      <h1>{t(UI.verifyTitle)}</h1>
      <form className="row" onSubmit={(e) => { e.preventDefault(); check(id.trim()); }}>
        <input placeholder="OX-XXXXXXXXXX" value={id} onChange={(e) => setId(e.target.value)} />
        <button className="btn">{t(UI.check)}</button>
      </form>
      {res === false && <p className="msg">✗ {t(UI.invalid)}</p>}
      {res && <div className="step" style={{ '--c': course?.color }}><h3>✓ {t(UI.valid)}</h3><p><b>{res.name}</b> — {course ? t(course.title) : res.course}</p><small>{t(UI.issued)} {new Date(res.issued_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long' })}</small></div>}
    </main>
  );
}
