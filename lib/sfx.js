// Petits sons synthétisés (aucun fichier). Activés par défaut ; l'apprenant peut les couper (ox-sfx = 0).
let ctx;
export const sfxOn = () => { try { return localStorage.getItem('ox-sfx') !== '0'; } catch { return true; } };
export const setSfx = (v) => { try { localStorage.setItem('ox-sfx', v ? '1' : '0'); } catch {} };
const NOTES = { win: [[660, 0], [880, .09]], quest: [[660, 0], [880, .09], [1100, .18]], level: [[523, 0], [659, .1], [784, .2], [1046, .32]] };
export function play(kind) {
  if (typeof window === 'undefined' || !sfxOn()) return;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const t0 = ctx.currentTime;
    (NOTES[kind] || NOTES.win).forEach(([f, d]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t0 + d); g.gain.exponentialRampToValueAtTime(0.12, t0 + d + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d + 0.28);
      o.connect(g); g.connect(ctx.destination); o.start(t0 + d); o.stop(t0 + d + 0.3);
    });
  } catch {}
}
