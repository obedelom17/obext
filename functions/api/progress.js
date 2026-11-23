import { db, json, getUser, body } from '../../server/lib.js';
import { COURSES } from '../../lib/data.js';
const IDS = new Set(COURSES.flatMap((c) => c.lessons.map((l) => l.id)));
// Coffre du jour et défi de la semaine : une ligne par jour / par semaine, le gain est recalculé par l'application.
const BONUS = /^(chest|week)-\d{4}-\d{2}-\d{2}$/;
export async function onRequestGet({ request, env }) {
  const u = await getUser(request, env);
  if (!u) return json({ error: 'auth' }, 401);
  const rows = await db(env)`select item, done_at from progress where user_id = ${u.id}`;
  return json({ items: rows.map((r) => r.item), at: rows.map((r) => r.done_at) });
}
export async function onRequestPost({ request, env }) {
  const u = await getUser(request, env);
  if (!u) return json({ error: 'auth' }, 401);
  const { items = [] } = await body(request);
  const ok = items.filter((i) => IDS.has(i) || BONUS.test(i)).slice(0, 100);
  const sql = db(env);
  for (const i of ok) await sql`insert into progress (user_id, item) values (${u.id}, ${i}) on conflict do nothing`;
  return json({ saved: ok.length });
}
