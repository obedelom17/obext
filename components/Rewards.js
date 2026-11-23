'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from './Providers';
import { COURSES } from '../lib/data';
import { play } from '../lib/sfx';
import { dayKey, chestReward, weekKey, weekCount, WEEK_TARGET, WEEK_XP, ACCENTS } from '../lib/engage';

const T = {
  chestH: { fr: 'Coffre du jour', en: 'Daily chest' },
  chestLocked: { fr: 'Termine les 3 quêtes du jour pour ouvrir ton coffre surprise.', en: 'Finish the 3 daily quests to open your surprise chest.' },
  chestReady: { fr: 'Ton coffre est prêt !', en: 'Your chest is ready!' },
  chestOpen: { fr: 'Ouvrir le coffre', en: 'Open the chest' },
  chestGot: (x, rare) => ({ fr: `${rare ? 'Coffre rare ! ' : ''}+${x} XP gagnés. Un nouveau coffre t’attend demain.`, en: `${rare ? 'Rare chest! ' : ''}+${x} XP earned. A new chest awaits tomorrow.` }),
  weekH: { fr: 'Défi de la semaine', en: 'Weekly challenge' },
  weekText: (n) => ({ fr: `${n} / ${WEEK_TARGET} leçons cette semaine · ${WEEK_XP} XP à la clé`, en: `${n} / ${WEEK_TARGET} lessons this week · ${WEEK_XP} XP reward` }),
  weekClaim: { fr: 'Récupérer 100 XP', en: 'Claim 100 XP' },
  weekDone: { fr: 'Défi relevé cette semaine. Nouveau défi lundi.', en: 'Challenge complete. New one on Monday.' },
  heatH: { fr: 'Ton activité', en: 'Your activity' },
  heatNote: (n) => ({ fr: `${n} jour${n > 1 ? 's' : ''} actif${n > 1 ? 's' : ''} sur les 16 dernières semaines`, en: `${n} active day${n > 1 ? 's' : ''} in the last 16 weeks` }),
  themeH: { fr: 'Couleurs à débloquer', en: 'Colors to unlock' },
  themeLock: (l) => ({ fr: `Niveau ${l}`, en: `Level ${l}` }),
  nudgeLevel: (x, l) => ({ fr: `Plus que ${x} XP pour le niveau ${l} : une leçon suffit.`, en: `Only ${x} XP to level ${l}: one lesson is enough.` }),
  nudgeCourse: (n, c) => ({ fr: `Plus que ${n} leçon${n > 1 ? 's' : ''} pour finir « ${c} ».`, en: `Only ${n} lesson${n > 1 ? 's' : ''} left to finish “${c}”.` }),
  nudgeGo: { fr: 'Y aller', en: 'Go' },
};
const tx = (v, ...a) => (typeof v === 'function' ? v(...a) : v);

export function Chest() {
  const { eng, t, claim, done, ready } = useApp();
  const day = dayKey(), id = `chest-${day}`;
  const claimed = !!done[id], isReady = eng.quests.every((q) => q.done), r = chestReward(day);
  if (!ready) return null;
  const open = () => {
    claim(id); play(r.rare ? 'level' : 'quest');
    dispatchEvent(new CustomEvent('ox:burst', { detail: { x: innerWidth / 2, y: innerHeight * 0.4, power: r.rare ? 2.2 : 1.4 } }));
    dispatchEvent(new CustomEvent('ox:gain', { detail: { xp: r.xp, quests: [], ach: [] } }));
  };
  return (
    <section className={`reward chest${isReady && !claimed ? ' ready' : ''}`} aria-label={t(T.chestH)}>
      <h2 className="lbl">{t(T.chestH)}</h2>
      <p>{claimed ? t(tx(T.chestGot, r.xp, r.rare)) : isReady ? t(T.chestReady) : t(T.chestLocked)}</p>
      {isReady && !claimed && <button className="btn alt" onClick={open}>{t(T.chestOpen)}</button>}
    </section>
  );
}

export function WeeklyChallenge() {
  const { act, t, claim: claimItem, done, ready } = useApp();
  const wk = weekKey(), n = weekCount(act), claimed = !!done[`week-${wk}`];
  if (!ready) return null;
  const hit = n >= WEEK_TARGET;
  const claim = () => { claimItem(`week-${wk}`); play('level'); dispatchEvent(new CustomEvent('ox:burst', { detail: { x: innerWidth / 2, y: innerHeight * 0.4, power: 2 } })); dispatchEvent(new CustomEvent('ox:gain', { detail: { xp: WEEK_XP, quests: [], ach: [] } })); };
  return (
    <section className={`reward wkc${hit && !claimed ? ' ready' : ''}`} aria-label={t(T.weekH)}>
      <h2 className="lbl">{t(T.weekH)}</h2>
      <div className="bar"><i style={{ width: `${Math.min(100, (n / WEEK_TARGET) * 100)}%` }} /></div>
      <p>{claimed ? t(T.weekDone) : t(T.weekText(Math.min(n, WEEK_TARGET)))}</p>
      {hit && !claimed && <button className="btn alt" onClick={claim}>{t(T.weekClaim)}</button>}
    </section>
  );
}

export function Heatmap() {
  const { act, t } = useApp();
  const now = new Date(), mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7) - 15 * 7);
  const cols = [...Array(16)].map((_, w) => [...Array(7)].map((_, d) => { const x = new Date(mon); x.setDate(mon.getDate() + w * 7 + d); const k = dayKey(x); return { k, n: act[k] || 0, fut: x > now }; }));
  const active = cols.flat().filter((c) => c.n > 0).length;
  return (
    <section className="reward heat" aria-label={t(T.heatH)}>
      <h2 className="lbl">{t(T.heatH)}</h2>
      <div className="hm" role="img" aria-label={t(T.heatNote(active))}>{cols.map((c, i) => <div key={i}>{c.map((d) => <i key={d.k} title={`${d.k} : ${d.n}`} className={d.fut ? 'f' : d.n >= 5 ? 'l4' : d.n >= 3 ? 'l3' : d.n >= 2 ? 'l2' : d.n ? 'l1' : ''} />)}</div>)}</div>
      <p>{t(T.heatNote(active))}</p>
    </section>
  );
}

export function Themes() {
  const { eng, t } = useApp();
  const [cur, setCur] = useState('signal');
  useEffect(() => { try { setCur(localStorage.getItem('ox-accent-id') || 'signal'); } catch {} }, []);
  const pick = (a) => { setCur(a.id); try { localStorage.setItem('ox-accent-id', a.id); localStorage.setItem('ox-accent', a.hex); } catch {} if (a.hex) document.documentElement.style.setProperty('--signal', a.hex); else document.documentElement.style.removeProperty('--signal'); play('win'); };
  return (
    <section className="reward themes" aria-label={t(T.themeH)}>
      <h2 className="lbl">{t(T.themeH)}</h2>
      <div className="sw">{ACCENTS.map((a) => { const ok = eng.xp.level >= a.lvl; return (
        <button key={a.id} disabled={!ok} aria-pressed={cur === a.id} className={cur === a.id ? 'on' : ''} onClick={() => pick(a)} title={ok ? t(a) : t(T.themeLock(a.lvl))}>
          <i style={{ background: a.hex || 'var(--signal)' }} /><span>{ok ? t(a) : t(T.themeLock(a.lvl))}</span>
        </button>); })}</div>
    </section>
  );
}

// Petite phrase qui montre que l'étape suivante est toute proche.
export function Nudge() {
  const { eng, t, done } = useApp();
  let msg = null, href = '/courses/';
  if (eng.xp.left <= 25) msg = t(T.nudgeLevel(eng.xp.left, eng.xp.level + 1));
  else {
    const best = COURSES.map((c) => ({ c, left: c.lessons.filter((l) => !done[l.id]).length, n: c.lessons.filter((l) => done[l.id]).length })).filter((x) => x.n > 0 && x.left > 0 && x.left <= 3).sort((a, b) => a.left - b.left)[0];
    if (best) { msg = t(T.nudgeCourse(best.left, t(best.c.title))); href = `/courses/${best.c.slug}/`; }
  }
  if (!msg) return null;
  return <Link href={href} className="nudge"><span>{msg}</span><b>{t(T.nudgeGo)} →</b></Link>;
}
