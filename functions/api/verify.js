import { db, json } from '../../server/lib.js';
export async function onRequestGet({ request, env }) {
  const id = new URL(request.url).searchParams.get('id') || '';
  const [c] = await db(env)`select name, course, issued_at from certificates where id = ${id}`;
  return c ? json(c) : json({ error: 'not_found' }, 404);
}
