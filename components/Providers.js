'use client';
import { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { COURSES, isReady } from '../lib/data';
import { play } from '../lib/sfx';
import { isBonusKey, xpOf, levelInfo, streakInfo, dayKey, courseCount, STREAK_MILESTONES, PCT_MILESTONES, XP_LESSON, XP_EXAM, FIRST_TRY_XP, QUESTS, questState, questList, ACH, achCtx, titleOf } from '../lib/engage';
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);
async function api(path, body) {
  try {
    const r = await fetch('/api/' + path, body ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) } : undefined);
    return { ok: r.ok, status: r.status, data: await r.json().catch(() => ({})) };
  } catch { return { ok: false, status: 0, data: {} }; }
}
export function Providers({ children }) {
  const [lang, setLang] = useState('fr');
  const [done, setDone] = useState({});
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [act, setAct] = useState({});
  const [goal, setGoalState] = useState(2);
  const [bonus, setBonus] = useState(0);
  const [quest, setQuest] = useState(questState(null));
  const [firsts, setFirsts] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [coach, setCoachFlag] = useState(false);
  const doneRef = useRef({}); const actRef = useRef({}); const eRef = useRef({});
  const bonusRef = useRef(0), firstsRef = useRef(0), unlockedRef = useRef([]), coachRef = useRef(false);
  useEffect(() => { bonusRef.current = bonus; firstsRef.current = firsts; unlockedRef.current = unlocked; coachRef.current = coach; eRef.current.quest = quest; }, [bonus, firsts, unlocked, coach, quest]);
  useEffect(() => { doneRef.current = done; }, [done]);
  useEffect(() => { actRef.current = act; }, [act]);
  useEffect(() => {
    let local = {};
    try { setBonus(+localStorage.getItem('ox-bonus') || 0); setQuest(questState(JSON.parse(localStorage.getItem('ox-q') || 'null'))); setFirsts(+localStorage.getItem('ox-first') || 0); setUnlocked(JSON.parse(localStorage.getItem('ox-ach') || '[]')); setCoachFlag(localStorage.getItem('ox-coach') === '1'); setAct(JSON.parse(localStorage.getItem('ox-act') || '{}')); const g = +localStorage.getItem('ox-goal'); if (g) setGoalState(g); } catch {}
    try { const l = localStorage.getItem('ox-lang'); if (l) setLang(l); local = JSON.parse(localStorage.getItem('ox-done') || '{}'); setDone(local); } catch {}
    (async () => {
      const me = await api('me');
      if (me.ok && me.data.user) {
        setUser(me.data.user);
        const pr = (await api('progress')).data; const items = pr.items || [];
        if (pr.at) { const byDay = {}; pr.at.forEach((iso, ix) => { if (isBonusKey(items[ix] || '')) return; const k = dayKey(new Date(iso)); byDay[k] = (byDay[k] || 0) + 1; }); setAct((a) => { const m = { ...a }; for (const k in byDay) m[k] = Math.max(m[k] || 0, byDay[k]); try { localStorage.setItem('ox-act', JSON.stringify(m)); } catch {} return m; }); }
        const merged = { ...local };
        items.forEach((i) => { merged[i] = true; });
        setDone(merged);
        try { localStorage.setItem('ox-done', JSON.stringify(merged)); } catch {}
        const mine = Object.keys(local).filter((k) => !items.includes(k) && !k.startsWith('exam-'));
        if (mine.length) api('progress', { items: mine });
      }
      setReady(true);
    })();
  }, []);
  const changeLang = (l) => { setLang(l); document.documentElement.lang = l; try { localStorage.setItem('ox-lang', l); } catch {} };
  const setGoal = (g) => { setGoalState(g); try { localStorage.setItem('ox-goal', String(g)); } catch {} };
  const addBonus = useCallback((n) => { const v = bonusRef.current + n; bonusRef.current = v; setBonus(v); try { localStorage.setItem('ox-bonus', String(v)); } catch {} }, []);
  useEffect(() => { try { const a = localStorage.getItem('ox-accent'); if (a && /^#[0-9a-fA-F]{6}$/.test(a)) document.documentElement.style.setProperty('--signal', a); } catch {} }, []);
  const claim = useCallback((id) => {
    setDone((d) => { const n = { ...d, [id]: true }; try { localStorage.setItem('ox-done', JSON.stringify(n)); } catch {} return n; });
    if (user) api('progress', { items: [id] });
  }, [user]);
  const useCoach = useCallback(() => { setCoachFlag(true); try { localStorage.setItem('ox-coach', '1'); } catch {} }, []);
  const markDone = useCallback((id, meta = {}) => {
    const was = !!doneRef.current[id];
    if (!was) {
      // gains : XP, série, objectif, jalons du cours
      const before = doneRef.current, after = { ...before, [id]: true };
      const key = dayKey(), a0 = actRef.current, a1 = { ...a0, [key]: (a0[key] || 0) + 1 };
      actRef.current = a1; setAct(a1); try { localStorage.setItem('ox-act', JSON.stringify(a1)); } catch {}
      const s0 = streakInfo(a0), s1 = streakInfo(a1), l0 = levelInfo(xpOf(before) + bonusRef.current), l1 = levelInfo(xpOf(after) + bonusRef.current);
      let g = 2; try { g = +localStorage.getItem('ox-goal') || 2; } catch {}
      const c = COURSES.find((x) => x.lessons.some((l) => l.id === id));
      let pct = 0;
      if (c) { const p0 = Math.floor((courseCount(c, before) / c.lessons.length) * 100), p1 = Math.floor((courseCount(c, after) / c.lessons.length) * 100); pct = PCT_MILESTONES.filter((m) => p0 < m && p1 >= m).pop() || 0; }
      // quêtes du jour, bonus « premier coup », trophées
      const isLesson = !id.startsWith('exam-');
      const q0 = questState(eRef.current.quest), q1 = { ...q0, paid: [...q0.paid], c: [...q0.c] };
      let extra = 0; const questLines = [];
      if (isLesson) {
        q1.n += 1; if (meta.firstTry) q1.first += 1; if (c && !q1.c.includes(c.slug)) q1.c.push(c.slug);
        if (meta.firstTry) extra += FIRST_TRY_XP;
        questList(q1).forEach((x) => { if (x.done && !q1.paid.includes(x.id)) { q1.paid.push(x.id); extra += x.xp; questLines.push({ fr: x.fr, en: x.en, xp: x.xp }); } });
      }
      const nFirst = firstsRef.current + (isLesson && meta.firstTry ? 1 : 0);
      const bonus1 = bonusRef.current + extra;
      setQuest(q1); setBonus(bonus1); setFirsts(nFirst); firstsRef.current = nFirst; bonusRef.current = bonus1; eRef.current.quest = q1;
      try { localStorage.setItem('ox-q', JSON.stringify(q1)); localStorage.setItem('ox-bonus', String(bonus1)); localStorage.setItem('ox-first', String(nFirst)); } catch {}
      const lvlA = levelInfo(xpOf(before) + bonusRef.current - extra), lvlB = levelInfo(xpOf(after) + bonus1);
      const ctxA = achCtx({ done: before, best: s0.best, firsts: firstsRef.current - (isLesson && meta.firstTry ? 1 : 0), level: lvlA.level, coach: coachRef.current }, COURSES, isReady);
      const ctxB = achCtx({ done: after, best: s1.best, firsts: nFirst, level: lvlB.level, coach: coachRef.current }, COURSES, isReady);
      const have = new Set(unlockedRef.current);
      const fresh = ACH.filter((x) => !have.has(x.id) && x.test(ctxB));
      if (fresh.length) { const all = [...have, ...fresh.map((x) => x.id)]; unlockedRef.current = all; setUnlocked(all); try { localStorage.setItem('ox-ach', JSON.stringify(all)); } catch {} }
      play(lvlB.level > lvlA.level || fresh.length ? 'level' : questLines.length ? 'quest' : 'win');
      dispatchEvent(new CustomEvent('ox:gain', { detail: { xp: (id.startsWith('exam-') ? XP_EXAM : XP_LESSON) + (isLesson && meta.firstTry ? FIRST_TRY_XP : 0), firstTry: !!(isLesson && meta.firstTry), quests: questLines, ach: fresh.map((x) => ({ fr: x.fr, en: x.en })), title: lvlB.level > lvlA.level ? titleOf(lvlB.level) : null, level: lvlB.level, levelUp: lvlB.level > lvlA.level, streak: s1.streak, streakUp: s1.streak > s0.streak, milestone: s1.streak > s0.streak && STREAK_MILESTONES.includes(s1.streak) ? s1.streak : 0, goalHit: a1[key] === g, pct, course: c ? c.slug : '' } }));
    }
    setDone((d) => { const n = { ...d, [id]: true }; try { localStorage.setItem('ox-done', JSON.stringify(n)); } catch {} return n; });
    if (user && !id.startsWith('exam-')) api('progress', { items: [id] });
  }, [user]);
  const logout = async () => {
    await api('logout', {});
    try { localStorage.removeItem('ox-done'); localStorage.removeItem('ox-code'); } catch {}
    location.href = '/';
  };
  const t = (v) => (typeof v === 'string' ? v : v[lang]);
  const eng = useMemo(() => { const xp = levelInfo(xpOf(done) + bonus), st = streakInfo(act); return { xp, title: titleOf(xp.level), streak: st, today: act[dayKey()] || 0, goal, quests: questList(questState(quest)), unlocked, firsts, bonus }; }, [done, act, goal, bonus, quest, unlocked, firsts]);
  return <Ctx.Provider value={{ lang, changeLang, t, done, markDone, user, ready, api, logout, eng, act, setGoal, useCoach, coach, addBonus, claim }}>{children}</Ctx.Provider>;
}
