'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  useEffect(() => {
    let local = {};
    try { const l = localStorage.getItem('ox-lang'); if (l) setLang(l); local = JSON.parse(localStorage.getItem('ox-done') || '{}'); setDone(local); } catch {}
    (async () => {
      const me = await api('me');
      if (me.ok && me.data.user) {
        setUser(me.data.user);
        const items = (await api('progress')).data.items || [];
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
  const markDone = useCallback((id) => {
    setDone((d) => { const n = { ...d, [id]: true }; try { localStorage.setItem('ox-done', JSON.stringify(n)); } catch {} return n; });
    if (user && !id.startsWith('exam-')) api('progress', { items: [id] });
  }, [user]);
  const logout = async () => {
    await api('logout', {});
    try { localStorage.removeItem('ox-done'); localStorage.removeItem('ox-code'); } catch {}
    location.href = '/';
  };
  const t = (v) => (typeof v === 'string' ? v : v[lang]);
  return <Ctx.Provider value={{ lang, changeLang, t, done, markDone, user, ready, api, logout }}>{children}</Ctx.Provider>;
}
