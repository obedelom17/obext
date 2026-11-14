'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from './Providers';
import { COURSES } from '../lib/data';
import { X } from '../lib/ux';

const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function CommandPalette() {
  const { t, lang, changeLang, done } = useApp();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inp = useRef(null);

  const items = useMemo(() => {
    const go = (href, id) => () => { if (id) window.__oxGoto = id; router.push(href); if (id) setTimeout(() => window.dispatchEvent(new CustomEvent('ox:goto', { detail: id })), 420); };
    const out = [
      { g: X.gPages, label: X.actHome, run: go('/') },
      { g: X.gPages, label: { fr: 'Tableau de bord', en: 'Dashboard' }, run: go('/courses/') },
      { g: X.gPages, label: { fr: 'Vérifier un certificat', en: 'Verify a certificate' }, run: go('/verify/') },
      { g: X.gPages, label: { fr: 'Mon compte', en: 'My account' }, run: go('/account/') },
      { g: X.gActions, label: X.actTheme, run: () => window.dispatchEvent(new CustomEvent('ox:toggle-theme')) },
      { g: X.gActions, label: X.actLang, run: () => changeLang(lang === 'fr' ? 'en' : 'fr') },
    ];
    COURSES.forEach((c) => {
      out.push({ g: X.gCourses, label: c.title, hint: `${c.lessons.filter((l) => done[l.id]).length}/${c.lessons.length}`, color: c.color, icon: c.icon, run: go(`/courses/${c.slug}/`) });
      c.lessons.forEach((l) => out.push({ g: X.gLessons, label: l.title, hint: t(c.title), color: c.color, ok: !!done[l.id], run: go(`/courses/${c.slug}/#${l.id}`, l.id) }));
    });
    return out;
  }, [lang, done]);

  const list = useMemo(() => {
    const k = norm(q.trim()).split(/\s+/).filter(Boolean);
    const m = items.filter((it) => { const h = norm(t(it.label) + ' ' + (it.hint || '')); return k.every((w) => h.includes(w)); });
    return (k.length ? m : m.filter((i) => i.g !== X.gLessons)).slice(0, 9);
  }, [q, items, lang]);

  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === 'Escape') setOpen(false);
    };
    const ev = () => setOpen(true);
    addEventListener('keydown', key); addEventListener('ox:palette', ev);
    return () => { removeEventListener('keydown', key); removeEventListener('ox:palette', ev); };
  }, []);
  useEffect(() => {
    if (open) { setQ(''); setSel(0); document.body.style.overflow = 'hidden'; setTimeout(() => inp.current && inp.current.focus(), 30); }
    else document.body.style.overflow = '';
  }, [open]);
  useEffect(() => setSel(0), [q]);

  if (!open) return null;
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (s + 1) % Math.max(1, list.length)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (s - 1 + list.length) % Math.max(1, list.length)); }
    else if (e.key === 'Enter' && list[sel]) { e.preventDefault(); setOpen(false); list[sel].run(); }
  };
  let last = null;
  return (
    <div className="pal" role="dialog" aria-modal="true" aria-label={t(X.search)} onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="pal-box">
        <div className="pal-in">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input ref={inp} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder={t(X.searchPh)} aria-label={t(X.search)} />
          <kbd>esc</kbd>
        </div>
        <ul className="pal-list" role="listbox">
          {list.length === 0 && <li className="pal-empty">{t(X.noRes)} « {q} »</li>}
          {list.map((it, i) => {
            const head = it.g !== last ? <li key={'g' + i} className="pal-g">{t(it.g)}</li> : null; last = it.g;
            return [head,
              <li key={i} role="option" aria-selected={i === sel} className={i === sel ? 'on' : ''} onMouseEnter={() => setSel(i)} onClick={() => { setOpen(false); it.run(); }}>
                {it.color ? <i className="sw" style={{ background: it.color }}>{it.icon || ''}</i> : <i className="sw plain" />}
                <span className="t">{t(it.label)}</span>
                {it.ok && <b className="okm">✓</b>}
                {it.hint && <span className="h">{it.hint}</span>}
              </li>];
          })}
        </ul>
        <div className="pal-ft"><span><kbd>↑</kbd><kbd>↓</kbd> {t(X.navigate)}</span><span><kbd>↵</kbd> {t(X.choose)}</span><span><kbd>esc</kbd> {t(X.closeK)}</span></div>
      </div>
    </div>
  );
}
