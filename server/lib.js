import { neon } from '@neondatabase/serverless';
const enc = new TextEncoder();
export const db = (env) => neon(env.DATABASE_URL);
export const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers } });
const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64 = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
const key = (secret) => crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
export async function sign(env, payload) {
  const body = b64(enc.encode(JSON.stringify(payload)));
  return body + '.' + b64(await crypto.subtle.sign('HMAC', await key(env.JWT_SECRET), enc.encode(body)));
}
async function verifyToken(env, tok) {
  try {
    const [body, sig] = tok.split('.');
    if (!(await crypto.subtle.verify('HMAC', await key(env.JWT_SECRET), unb64(sig), enc.encode(body)))) return null;
    const p = JSON.parse(new TextDecoder().decode(unb64(body)));
    return p.exp > Date.now() / 1000 ? p : null;
  } catch { return null; }
}
export async function hashPw(pw, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const k = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, k, 256);
  return b64(salt) + '.' + b64(bits);
}
export const checkPw = async (pw, stored) => (await hashPw(pw, unb64(stored.split('.')[0]))) === stored;
export const cookie = (tok, max = 2592000) => `ox_session=${tok}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${max}`;
export const session = async (env, id) => cookie(await sign(env, { sub: id, exp: Math.floor(Date.now() / 1000) + 2592000 }));
export async function getUser(request, env) {
  const m = /(?:^|; )ox_session=([^;]+)/.exec(request.headers.get('cookie') || '');
  const p = m && (await verifyToken(env, m[1]));
  if (!p) return null;
  const [u] = await db(env)`select id, email, name from users where id = ${p.sub}`;
  return u || null;
}
export const body = (request) => request.json().catch(() => ({}));
