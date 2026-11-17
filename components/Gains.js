'use client';
import { useEffect, useRef, useState } from 'react';
import { useApp } from './Providers';
import { X } from '../lib/ux';

// Petites récompenses affichées après chaque leçon validée : XP, série, niveau, objectif.
export default function Gains() {
  const { t } = useApp();
  const [items, setItems] = useState([]);
  const id = useRef(0);
  useEffect(() => {
    const on = (e) => {
      const d = e.detail, lines = [`+${d.xp} XP${d.firstTry ? ' · ' + t(X.gainFirst) : ''}`];
      (d.quests || []).forEach((q) => lines.push(`${t(X.gainQuest)} : ${t(q)} (+${q.xp} XP)`));
      (d.ach || []).forEach((a) => lines.push(`${t(X.gainAch)} : ${t(a)}`));
      if (d.title) lines.push(`${t(X.gainTitle)} ${t(d.title)}`);
      if (d.levelUp) lines.push(t(X.gainLevel)(d.level));
      if (d.milestone) lines.push(t(X.gainMile)(d.milestone)); else if (d.streakUp) lines.push(t(X.gainStreak)(d.streak));
      if (d.goalHit) lines.push(t(X.gainGoal));
      if (d.pct) lines.push(t(X.gainPct)(d.pct));
      const k = ++id.current;
      setItems((a) => [...a.slice(-2), { k, lines, big: d.levelUp || d.milestone || d.pct === 100 || (d.ach || []).length > 0 || (d.quests || []).length > 0 }]);
      setTimeout(() => setItems((a) => a.filter((x) => x.k !== k)), 4200);
      if (d.levelUp || d.milestone || d.pct === 100 || (d.ach || []).length) dispatchEvent(new CustomEvent('ox:burst', { detail: { x: innerWidth / 2, y: innerHeight * 0.35, power: 1.6 } }));
    };
    addEventListener('ox:gain', on); return () => removeEventListener('ox:gain', on);
  }, [t]);
  if (!items.length) return null;
  return <div className="gains" role="status" aria-live="polite">{items.map((g) => <div key={g.k} className={g.big ? 'gain big' : 'gain'}>{g.lines.map((l, i) => <span key={i}>{l}</span>)}</div>)}</div>;
}
