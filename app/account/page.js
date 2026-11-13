'use client';
import { useState } from 'react';
import { useApp } from '../../components/Providers';
import { UI } from '../../lib/data';
export default function Account() {
  const { t, api, user, logout } = useApp();
  const [mode, setMode] = useState('login');
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setBusy(true); setErr('');
    const r = await api(mode, f);
    setBusy(false);
    if (r.ok) { location.href = '/courses/'; return; }
    setErr(t(r.status === 401 ? UI.errCreds : r.status === 409 ? UI.errExists : r.status === 400 ? UI.errInvalid : UI.syncErr));
  }
  if (user) return <main className="page"><h1>{user.name}</h1><p className="lead">{user.email}</p><button className="btn" onClick={logout}>{t(UI.logout)}</button></main>;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <main className="page">
      <form className="auth" onSubmit={submit}>
        <h1>{t(mode === 'login' ? UI.login : UI.register)}</h1>
        {mode === 'register' && <input required placeholder={t(UI.fullName)} value={f.name} onChange={set('name')} />}
        <input required type="email" placeholder={t(UI.email)} value={f.email} onChange={set('email')} />
        <input required type="password" minLength={8} placeholder={t(UI.password)} value={f.password} onChange={set('password')} />
        {err && <p className="msg" role="alert">{err}</p>}
        <button className="btn" disabled={busy}>{t(mode === 'login' ? UI.login : UI.register)}</button>
        <button type="button" className="linkish" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{t(mode === 'login' ? UI.register : UI.login)}</button>
      </form>
    </main>
  );
}
