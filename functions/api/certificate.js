import { db, json, getUser, body } from '../../server/lib.js';
import { COURSES } from '../../lib/data.js';
const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const newId = () => 'OX-' + Array.from(crypto.getRandomValues(new Uint8Array(10)), (b) => A[b % A.length]).join('');
export async function onRequestPost({ request, env }) {
  const u = await getUser(request, env);
  if (!u) return json({ error: 'auth' }, 401);
  const { course } = await body(request);
  const c = COURSES.find((x) => x.slug === course);
  if (!c) return json({ error: 'course' }, 400);
  const sql = db(env);
  const have = new Set((await sql`select item from progress where user_id = ${u.id}`).map((r) => r.item));
  if (!c.lessons.every((l) => have.has(l.id)) || !have.has('exam-' + course)) return json({ error: 'incomplete' }, 403);
  let [cert] = await sql`select id, name, course, issued_at from certificates where user_id = ${u.id} and course = ${course}`;
  if (!cert) [cert] = await sql`insert into certificates (id, user_id, course, name) values (${newId()}, ${u.id}, ${course}, ${u.name}) returning id, name, course, issued_at`;
  return json(cert);
}
