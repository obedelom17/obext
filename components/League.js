'use client';
import { useEffect, useState } from 'react';
import { useApp } from './Providers';
import { X } from '../lib/ux';

// Classement de la semaine : prénoms seulement, chacun peut se masquer.
export default function League() {
  const { t, user, api } = useApp();
  const [d, setD] = useState(null);
  const load = async () => { const r = await api('league'); if (r.ok) setD(r.data); };
  useEffect(() => { if (user) load(); }, [user]);
  if (!user || !d || d.off) return null;
  const toggle = async () => { await api('league', { visible: !(d.me && d.me.visible) }); load(); };
  return (
    <section className="league" aria-label={t(X.leagueH)}>
      <h2 className="lbl">{t(X.leagueH)}</h2>
      {d.top.length === 0 ? <p>{t(X.leagueEmpty)}</p> : (
        <ol>{d.top.map((r, i) => <li key={i} className={r.me ? 'me' : ''}><b>{i + 1}</b><span>{r.name}</span><em>{r.xp} XP</em></li>)}</ol>
      )}
      <p className="league-me">{d.me && d.me.rank ? t(X.leagueYou)(d.me.rank, d.me.xp) : t(X.leagueNone)}</p>
      <button className="linkish" onClick={toggle}>{d.me && d.me.visible ? t(X.leagueHide) : t(X.leagueShow)}</button>
      <small>{t(X.leagueNote)}</small>
    </section>
  );
}
