'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useApp } from './Providers';
import { X } from '../lib/ux';

// État partagé : l'événement beforeinstallprompt n'est émis qu'une fois, on le garde pour le bandeau, le menu et le pied de page.
const store = { deferred: null, installed: false, ios: false, subs: new Set() };
const emit = () => store.subs.forEach((f) => f());
const subscribe = (f) => { store.subs.add(f); return () => store.subs.delete(f); };
let snap = { can: false, ios: false };
const getSnap = () => {
  const can = !store.installed && (!!store.deferred || store.ios);
  if (snap.can !== can || snap.ios !== store.ios) snap = { can, ios: store.ios };
  return snap;
};
const server = { can: false, ios: false };
let started = false;
function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (standalone) { store.installed = true; }
  store.ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !standalone;
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); store.deferred = e; emit(); });
  addEventListener('appinstalled', () => { store.installed = true; store.deferred = null; emit(); });
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  emit();
}

export function useInstall() {
  useEffect(start, []);
  const s = useSyncExternalStore(subscribe, getSnap, () => server);
  const install = async () => {
    if (store.deferred) {
      const d = store.deferred; store.deferred = null; emit();
      d.prompt();
      try { await d.userChoice; } catch {}
    } else { dispatchEvent(new CustomEvent('ox:install-help')); }
  };
  return { can: s.can, ios: s.ios, install };
}

const KEY = 'ox-pwa-no';
export default function Install() {
  const { t } = useApp();
  const { can, ios, install } = useInstall();
  const [show, setShow] = useState(false);
  const [help, setHelp] = useState(false);
  useEffect(() => {
    let off = false;
    const h = () => { setHelp(true); setShow(true); };
    addEventListener('ox:install-help', h);
    return () => { off = true; removeEventListener('ox:install-help', h); };
  }, []);
  useEffect(() => {
    if (!can) return;
    let last = 0;
    try { last = +localStorage.getItem(KEY) || 0; } catch {}
    if (Date.now() - last < 14 * 864e5) return; // déjà refusé il y a moins de 14 jours
    const id = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(id);
  }, [can]);
  if (!show || !can) return null;
  const close = () => { setShow(false); setHelp(false); try { localStorage.setItem(KEY, String(Date.now())); } catch {} };
  const go = async () => { if (ios) { setHelp(true); return; } await install(); setShow(false); };
  return (
    <div className="pwa" role="dialog" aria-label={t(X.install)}>
      <img src="/icons/icon-192.png" alt="" width="48" height="48" />
      <div>
        <b>{t(X.install)}</b>
        <p>{ios || help ? t(X.installIos) : t(X.installText)}</p>
      </div>
      <div className="acts">
        {!(ios || help) && <button onClick={go}>{t(X.installNow)}</button>}
        <button className="ghost" onClick={close}>{ios || help ? 'OK' : t(X.installLater)}</button>
      </div>
    </div>
  );
}
