'use client';
import { useState } from 'react';
import { useApp } from '../../components/Providers';
import { UI } from '../../lib/data';
import { X } from '../../lib/ux';
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
  if (user) return (
    <main className="page">
      <div className="me">
        <span className="avatar" aria-hidden="true">{user.name.trim().charAt(0).toUpperCase()}</span>
        <div><span className="lbl">{t(X.signedIn)}</span><h1>{user.name}</h1><p className="lead">{user.email}</p></div>
      </div>
      <button className="btn" onClick={logout}>{t(UI.logout)}</button>
    </main>
  );
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const fld = (k, label, type = 'text', extra = {}) => (
    <label className="fld"><input required type={type} placeholder=" " value={f[k]} onChange={set(k)} {...extra} /><span>{label}</span></label>
  );
  return (
    <main className="page authwrap">
      <div className="auth-side"><h1 className="rvl"><span className="ln"><span>{t(mode === 'login' ? UI.login : UI.register)}</span></span></h1><p className="lead">{t(X.accPitch)}</p></div>
      <form className="auth" onSubmit={submit} key={mode}>
        {mode === 'register' && fld('name', t(UI.fullName))}
        {fld('email', t(UI.email), 'email')}
        {fld('password', t(UI.password), 'password', { minLength: 8 })}
        {err && <p className="msg shake" role="alert">{err}</p>}
        <button className="btn" disabled={busy}>{busy ? '…' : t(mode === 'login' ? UI.login : UI.register)}</button>
        <p className="switch">{t(mode === 'login' ? X.noAcc : X.haveAcc)} <button type="button" className="linkish" onClick={() => { setErr(''); setMode(mode === 'login' ? 'register' : 'login'); }}>{t(mode === 'login' ? UI.register : UI.login)}</button></p>
      </form>
    </main>
  );
}
