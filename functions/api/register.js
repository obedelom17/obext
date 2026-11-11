import { db, json, hashPw, session, body } from '../../server/lib.js';
export async function onRequestPost({ request, env }) {
  const { email = '', password = '', name = '' } = await body(request);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || password.length < 8 || !name.trim()) return json({ error: 'invalid' }, 400);
  try {
    const [u] = await db(env)`insert into users (email, name, pass_hash) values (${email.toLowerCase()}, ${name.trim().slice(0, 80)}, ${await hashPw(password)}) returning id, email, name`;
    return json({ user: u }, 200, { 'set-cookie': await session(env, u.id) });
  } catch { return json({ error: 'exists' }, 409); }
}
