import { db, json, getUser, body } from '../../server/lib.js';
import { COURSES } from '../../lib/data.js';
const IDS = new Set(COURSES.flatMap((c) => c.lessons.map((l) => l.id)));
export async function onRequestGet({ request, env }) {
  const u = await getUser(request, env);
  if (!u) return json({ error: 'auth' }, 401);
  const rows = await db(env)`select item from progress where user_id = ${u.id}`;
  return json({ items: rows.map((r) => r.item) });
}
export async function onRequestPost({ request, env }) {
  const u = await getUser(request, env);
  if (!u) return json({ error: 'auth' }, 401);
  const { items = [] } = await body(request);
  const ok = items.filter((i) => IDS.has(i)).slice(0, 100);
  const sql = db(env);
  for (const i of ok) await sql`insert into progress (user_id, item) values (${u.id}, ${i}) on conflict do nothing`;
  return json({ saved: ok.length });
}
