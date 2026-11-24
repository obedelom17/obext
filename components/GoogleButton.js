'use client';
import { useEffect, useRef, useState } from 'react';
import { useApp } from './Providers';

const T = {
  or: { fr: 'ou', en: 'or' },
  err: { fr: 'Connexion Google impossible. Réessaie, ou utilise ton e-mail.', en: 'Google sign-in failed. Try again, or use your email.' },
};

// Bouton « Continuer avec Google » (Google Identity Services). Reste invisible tant que GOOGLE_CLIENT_ID n'est pas configuré.
export default function GoogleButton() {
  const { t, api, lang } = useApp();
  const box = useRef(null);
  const [on, setOn] = useState(false);
  const [err, setErr] = useState('');
  useEffect(() => {
    let dead = false;
    (async () => {
      const r = await api('google');
      const clientId = r.ok && r.data.clientId;
      if (!clientId || dead) return;
      const start = () => {
        if (dead || !window.google || !box.current) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async ({ credential }) => {
            setErr('');
            const x = await api('google', { credential });
            if (x.ok) location.href = '/courses/'; else setErr(t(T.err) + (x.data && x.data.error ? ` (${x.data.error})` : ''));
          },
        });
        window.google.accounts.id.renderButton(box.current, { theme: 'outline', size: 'large', text: 'continue_with', shape: 'rectangular', width: 300, locale: lang });
        setOn(true);
      };
      if (window.google && window.google.accounts) start();
      else {
        const s = document.createElement('script');
        s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.defer = true; s.onload = start;
        document.head.appendChild(s);
      }
    })();
    return () => { dead = true; };
  }, [lang]);
  return (
    <div className="gsi" hidden={!on}>
      <div ref={box} className="gsi-btn" />
      {err && <p className="msg" role="alert">{err}</p>}
      <p className="gsi-or"><span>{t(T.or)}</span></p>
    </div>
  );
}
