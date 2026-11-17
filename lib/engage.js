// Logique de motivation : XP, niveaux, série de jours, objectif du jour. Fonctions pures, testables.
export const XP_LESSON = 10;
export const XP_EXAM = 100;
export const GOALS = [1, 2, 3, 5];
const pad = (n) => String(n).padStart(2, '0');
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const diff = (a, b) => Math.round((Date.UTC(...b.split('-').map((v, i) => (i === 1 ? v - 1 : +v))) - Date.UTC(...a.split('-').map((v, i) => (i === 1 ? v - 1 : +v)))) / 864e5);

export function xpOf(done) {
  let x = 0;
  for (const k in done) if (done[k]) x += k.startsWith('exam-') ? XP_EXAM : XP_LESSON;
  return x;
}
// Le niveau n demande 25 × (n−1)² XP : rapide au début, de plus en plus long ensuite.
export function levelInfo(xp) {
  const level = Math.floor(Math.sqrt(xp / 25)) + 1;
  const lo = 25 * (level - 1) ** 2, hi = 25 * level ** 2;
  return { level, xp, lo, hi, pct: (xp - lo) / (hi - lo), left: hi - xp };
}
// Série : jours consécutifs avec au moins une leçon. Un « bouclier » (gagné tous les 7 jours, 2 max) couvre un jour manqué.
export function streakInfo(act, now = dayKey()) {
  const days = Object.keys(act).filter((d) => act[d] > 0).sort();
  if (!days.length) return { streak: 0, best: 0, alive: false, shields: 0, doneToday: false, atRisk: false };
  let streak = 1, best = 1, shields = 0;
  for (let i = 1; i < days.length; i++) {
    const g = diff(days[i - 1], days[i]);
    if (g === 1) { streak++; if (streak % 7 === 0) shields = Math.min(2, shields + 1); }
    else if (g === 2 && shields > 0) { shields--; streak++; }
    else streak = 1;
    best = Math.max(best, streak);
  }
  const g = diff(days[days.length - 1], now);
  const alive = g <= 1 || (g === 2 && shields > 0);
  return { streak: alive ? streak : 0, best, alive, shields, doneToday: g === 0, atRisk: alive && g >= 1 };
}
export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];
export const PCT_MILESTONES = [25, 50, 75, 100];
export function courseCount(course, done) { return course.lessons.filter((l) => done[l.id]).length; }

// ───────── Titres de niveau, quêtes du jour, trophées ─────────
export const TITLES = [
  { fr: 'Curieux', en: 'Curious' }, { fr: 'Apprenti', en: 'Apprentice' }, { fr: 'Codeur', en: 'Coder' },
  { fr: 'Bâtisseur', en: 'Builder' }, { fr: 'Développeur', en: 'Developer' }, { fr: 'Architecte', en: 'Architect' },
  { fr: 'Expert', en: 'Expert' }, { fr: 'Maître', en: 'Master' }, { fr: 'Légende', en: 'Legend' },
];
export const titleOf = (level) => TITLES[Math.min(TITLES.length - 1, Math.floor((level - 1) / 2))];

export const FIRST_TRY_XP = 5;
export const QUESTS = [
  { id: 'lessons', xp: 30, target: 3, fr: 'Valide 3 leçons', en: 'Complete 3 lessons', cur: (q) => q.n },
  { id: 'first', xp: 20, target: 1, fr: 'Réussis une leçon du premier coup', en: 'Pass a lesson on the first try', cur: (q) => q.first },
  { id: 'two', xp: 20, target: 2, fr: 'Avance dans 2 cours différents', en: 'Progress in 2 different courses', cur: (q) => q.c.length },
];
export const freshQuest = (d = dayKey()) => ({ d, n: 0, first: 0, c: [], paid: [] });
export function questState(raw, now = dayKey()) { return raw && raw.d === now ? raw : freshQuest(now); }
export const questList = (q) => QUESTS.map((x) => ({ ...x, now: Math.min(x.target, x.cur(q)), done: x.cur(q) >= x.target }));

export const ACH = [
  { id: 'first', fr: 'Première leçon', en: 'First lesson', test: (c) => c.n >= 1 },
  { id: 'five', fr: '5 leçons', en: '5 lessons', test: (c) => c.n >= 5 },
  { id: 'fifty', fr: '50 leçons', en: '50 lessons', test: (c) => c.n >= 50 },
  { id: 'hundred', fr: '100 leçons', en: '100 lessons', test: (c) => c.n >= 100 },
  { id: 's3', fr: '3 jours d’affilée', en: '3 days in a row', test: (c) => c.best >= 3 },
  { id: 's7', fr: '7 jours d’affilée', en: '7 days in a row', test: (c) => c.best >= 7 },
  { id: 's30', fr: '30 jours d’affilée', en: '30 days in a row', test: (c) => c.best >= 30 },
  { id: 'ft5', fr: '5 réussites du premier coup', en: '5 first-try passes', test: (c) => c.firsts >= 5 },
  { id: 'ft25', fr: '25 réussites du premier coup', en: '25 first-try passes', test: (c) => c.firsts >= 25 },
  { id: 'poly', fr: 'Touche-à-tout : 3 cours entamés', en: 'All-rounder: 3 courses started', test: (c) => c.started >= 3 },
  { id: 'course', fr: 'Premier cours terminé', en: 'First course completed', test: (c) => c.finished >= 1 },
  { id: 'lvl5', fr: 'Niveau 5', en: 'Level 5', test: (c) => c.level >= 5 },
  { id: 'coach', fr: 'A demandé de l’aide au coach', en: 'Asked the coach for help', test: (c) => c.coach },
];
export function achCtx({ done, best, firsts, level, coach }, courses, isReady) {
  const n = Object.keys(done).filter((k) => done[k] && !k.startsWith('exam-')).length;
  return {
    n, best, firsts, level, coach,
    started: courses.filter((c) => c.lessons.some((l) => done[l.id])).length,
    finished: courses.filter((c) => isReady(c, done)).length,
  };
}
