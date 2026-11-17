'use client';
import { useApp } from './Providers';
import { useState } from 'react';
import { GOALS, ACH, dayKey } from '../lib/engage';
import { sfxOn, setSfx, play } from '../lib/sfx';
import { COURSES, isReady } from '../lib/data';
import { X } from '../lib/ux';

const Flame = ({ on }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={on ? 'flame on' : 'flame'}>
    <path d="M12 2c1 4-2 5-2 8a2 2 0 0 0 4 0c0-1-.5-1.6-.5-2.4C16 9 18 11.5 18 14.5A6 6 0 0 1 6 14.5C6 10 10 8 12 2Z" fill="currentColor" />
  </svg>
);

// Pastille de l'en-tête : série + niveau
export function Chip() {
  const { eng, t, ready } = useApp();
  if (!ready) return null;
  return (
    <a className="chip" href="/courses/" title={`${t(X.streakH)} · ${t(X.levelH)} ${eng.xp.level}`} aria-label={`${t(X.streakH)} ${eng.streak.streak}, ${t(X.levelH)} ${eng.xp.level}`}>
      <Flame on={eng.streak.streak > 0 && eng.streak.alive} /><b>{eng.streak.streak}</b><span className="sep" /><em>{t(X.levelH)} {eng.xp.level}</em>
    </a>
  );
}

// Tableau de bord : série, niveau, objectif du jour
export function StatBar() {
  const { eng, t, setGoal } = useApp();
  const { streak, xp, today, goal } = eng;
  const hit = today >= goal;
  return (
    <section className="stats" aria-label={t(X.streakH)}>
      <div className="stat">
        <span className="lbl">{t(X.streakH)}</span>
        <b className="big-n"><Flame on={streak.streak > 0 && streak.alive} />{streak.streak}<small> {t(X.streakDays)(streak.streak).replace(/^\d+\s*/, '')}</small></b>
        <p>{streak.atRisk ? t(X.streakRisk) : streak.streak === 0 ? t(X.streakStart) : `${t(X.streakBest)} : ${streak.best}${streak.shields ? ` · ${streak.shields} ${t(X.streakShield)}` : ''}`}</p>
      </div>
      <div className="stat">
        <span className="lbl">{t(X.levelH)}</span>
        <b className="big-n">{xp.level}<small> · {t(eng.title)} · {xp.xp} XP</small></b>
        <div className="bar"><i style={{ width: `${Math.round(xp.pct * 100)}%` }} /></div>
        <p>{t(X.levelLeft)(xp.left)}</p>
      </div>
      <div className={`stat${hit ? ' hit' : ''}`}>
        <span className="lbl">{t(X.dailyGoalH)}</span>
        <b className="big-n">{Math.min(today, goal)}<small> / {goal} {t(X.goalOf)}</small></b>
        <div className="bar"><i style={{ width: `${Math.min(100, (today / goal) * 100)}%` }} /></div>
        <div className="goals" role="group" aria-label={t(X.dailyGoalH)}>{hit ? <p>{t(X.goalHit)}</p> : GOALS.map((g) => <button key={g} className={g === goal ? 'on' : ''} onClick={() => setGoal(g)} aria-pressed={g === goal}>{g}</button>)}</div>
      </div>
    </section>
  );
}

// Dans une leçon : combien de leçons avant l'examen / le certificat
export function PathBar({ course }) {
  const { done, t } = useApp();
  const total = course.lessons.length, n = course.lessons.filter((l) => done[l.id]).length;
  const left = total - n;
  const msg = isReady(course, done) ? t(X.pathCert) : left === 0 ? t(X.pathExam) : t(X.pathLeft)(left);
  return (
    <div className="path" aria-label={msg}>
      <div className="bar"><i style={{ width: `${(n / total) * 100}%` }} /></div>
      <span>{n} / {total} · {msg}</span>
    </div>
  );
}

export function Quests() {
  const { eng, t } = useApp();
  const all = eng.quests.every((q) => q.done);
  return (
    <section className="quests" aria-label={t(X.questsH)}>
      <h2 className="lbl">{t(X.questsH)}</h2>
      <ul>{eng.quests.map((q) => (
        <li key={q.id} className={q.done ? 'done' : ''}>
          <span className="qm" aria-hidden="true">{q.done ? '✓' : ''}</span>
          <span className="qt">{t(q)}</span>
          <span className="qp">{q.now}/{q.target}</span>
          <em>+{q.xp} XP</em>
        </li>))}
      </ul>
      {all && <p className="qdone">{t(X.questsDone)}</p>}
    </section>
  );
}

export function Trophies() {
  const { eng, t } = useApp();
  const [on, setOn] = useState(() => (typeof window === 'undefined' ? true : sfxOn()));
  return (
    <section className="trophies" aria-label={t(X.achH)}>
      <h2 className="lbl">{t(X.achH)}</h2>
      <div className="badges">{ACH.map((a, i) => <span key={a.id} style={{ '--i': i }} className={eng.unlocked.includes(a.id) ? 'badge on' : 'badge'}>{t(a)}</span>)}</div>
      <button className="linkish" onClick={() => { const v = !on; setOn(v); setSfx(v); if (v) play('win'); }}>{on ? t(X.sfxOn) : t(X.sfxOff)}</button>
    </section>
  );
}

const DAYS = { fr: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] };
// Les 7 jours de la semaine en cours : un point rempli = au moins une leçon ce jour-là
export function WeekDots() {
  const { eng, t, lang, act } = useApp();
  const now = new Date(); const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const days = [...Array(7)].map((_, k) => { const d = new Date(mon); d.setDate(mon.getDate() + k); const key = dayKey(d); return { key, n: act[key] || 0, today: key === dayKey(now), future: d > now && key !== dayKey(now) }; });
  const active = days.filter((d) => d.n > 0).length;
  const share = async () => {
    const text = t(X.shareText)(eng.streak.streak);
    try { if (navigator.share) await navigator.share({ title: 'obext.js', text, url: location.origin }); else { await navigator.clipboard.writeText(`${text} ${location.origin}`); alert(t(X.shareCopied)); } } catch {}
  };
  return (
    <section className="week" aria-label={t(X.weekH)}>
      <h2 className="lbl">{t(X.weekH)}</h2>
      <div className="wk">{days.map((d, k) => <span key={d.key} className={`wd2${d.n ? ' on' : ''}${d.today ? ' today' : ''}${d.future ? ' fut' : ''}`}><i>{d.n ? '✓' : ''}</i><small>{DAYS[lang][k]}</small></span>)}</div>
      <p>{t(X.weekActive)(active)}</p>
      {eng.streak.streak > 0 && <button className="linkish" onClick={share}>{t(X.share)}</button>}
    </section>
  );
}

// Rappel quotidien choisi par l'apprenant : un événement récurrent à ajouter à son agenda (aucune notification imposée)
export function Reminder() {
  const { t } = useApp();
  const [hh, setHh] = useState('19:00');
  const make = () => {
    const [h, m] = hh.split(':'), d = new Date(); const pad = (n) => String(n).padStart(2, '0');
    const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${h}${m}00`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//obext.js//FR', 'BEGIN:VEVENT', `UID:obext-daily-${Date.now()}@obext`, `DTSTAMP:${stamp}`, `DTSTART:${stamp}`, 'DURATION:PT20M', 'RRULE:FREQ=DAILY', 'SUMMARY:Une leçon sur obext.js', `DESCRIPTION:${location.origin}/courses/`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'obextjs-rappel.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  return (
    <section className="remind" aria-label={t(X.remindH)}>
      <h2 className="lbl">{t(X.remindH)}</h2>
      <p>{t(X.remindText)}</p>
      <div className="remind-row"><input type="time" value={hh} onChange={(e) => setHh(e.target.value)} aria-label={t(X.remindH)} /><button className="btn alt" onClick={make}>{t(X.remindBtn)}</button></div>
    </section>
  );
}
