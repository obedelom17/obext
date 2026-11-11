import { db, json, checkPw, session, body } from '../../server/lib.js';
export async function onRequestPost({ request, env }) {
  const { email = '', password = '' } = await body(request);
  const [u] = await db(env)`select id, email, name, pass_hash from users where email = ${email.toLowerCase()}`;
  if (!u || !(await checkPw(password, u.pass_hash))) return json({ error: 'credentials' }, 401);
  return json({ user: { id: u.id, email: u.email, name: u.name } }, 200, { 'set-cookie': await session(env, u.id) });
}
