'use client';
import { useState } from 'react';
import { useApp } from './Providers';
import { X } from '../lib/ux';

const Plain = ({ text }) => text.split(/(`[^`]+`)/g).map((x, i) => (x.startsWith('`') && x.endsWith('`') && x.length > 2 ? <code key={i}>{x.slice(1, -1)}</code> : <span key={i}>{x}</span>));

// Coach IA : indices et questions sur la leçon, appuyés sur la page officielle. Ne donne jamais la solution.
export default function Coach({ lesson, code, failedLabels, passed, tried }) {
  const { t, lang, user, api, useCoach } = useApp();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState(null); // { text } | { err }
  const [left, setLeft] = useState(null);
  async function ask(mode) {
    setBusy(true); setOut(null);
    const r = await api('ai', { mode, lessonId: lesson.id, code, question: q, failed: failedLabels, lang });
    setBusy(false);
    if (r.ok && r.data.answer) { setOut({ text: r.data.answer }); setLeft(r.data.left); useCoach(); if (mode === 'ask') setQ(''); return; }
    const e = r.data && r.data.error;
    const code = e === 'upstream' || e === 'db' ? ` (${e}${r.data.status ? ' ' + r.data.status : ''})` : '';
    setOut({ err: e === 'ai_off' ? t(X.coachOff) : e === 'limit' ? t(X.coachLimit) : e === 'auth' ? t(X.coachLogin) : t(X.coachErr) + code });
  }
  if (!open) return <button className="coach-open" onClick={() => setOpen(true)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" /></svg>{t(X.coachH)}</button>;
  return (
    <section className="coach" aria-label={t(X.coachH)}>
      <header><b>{t(X.coachH)}</b><button className="linkish" onClick={() => setOpen(false)} aria-label="×">×</button></header>
      {!user ? <p className="coach-msg">{t(X.coachLogin)}</p> : (
        <>
          <div className="coach-acts">
            <button className="btn alt" disabled={busy || !tried || passed} onClick={() => ask('hint')}>{t(X.coachHint)}</button>
            <button className="btn alt" disabled={busy || !passed} onClick={() => ask('review')}>{t(X.coachReview)}</button>
          </div>
          <div className="coach-ask">
            <input value={q} maxLength={500} onChange={(e) => setQ(e.target.value)} placeholder={t(X.coachPlaceholder)} onKeyDown={(e) => { if (e.key === 'Enter' && q.trim() && !busy) ask('ask'); }} />
            <button className="btn" disabled={busy || !q.trim()} onClick={() => ask('ask')}>{t(X.coachSend)}</button>
          </div>
          {busy && <p className="coach-msg">{t(X.coachWait)}</p>}
          {out && out.text && <div className="coach-out"><Plain text={out.text} /></div>}
          {out && out.err && <p className="coach-msg err">{out.err}</p>}
          <small>{left != null ? `${t(X.coachLeft)(left)} · ` : ''}{t(X.coachNote)}</small>
        </>
      )}
    </section>
  );
}
