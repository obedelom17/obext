'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);
export function Providers({ children }) {
  const [lang, setLang] = useState('fr');
  const [done, setDone] = useState({});
  useEffect(() => { try { const l = localStorage.getItem('kx-lang'); if (l) setLang(l); setDone(JSON.parse(localStorage.getItem('kx-done') || '{}')); } catch {} }, []);
  const changeLang = (l) => { setLang(l); document.documentElement.lang = l; try { localStorage.setItem('kx-lang', l); } catch {} };
  const markDone = useCallback((id) => setDone((d) => { const n = { ...d, [id]: true }; try { localStorage.setItem('kx-done', JSON.stringify(n)); } catch {} return n; }), []);
  const t = (v) => (typeof v === 'string' ? v : v[lang]);
  return <Ctx.Provider value={{ lang, changeLang, t, done, markDone }}>{children}</Ctx.Provider>;
}
