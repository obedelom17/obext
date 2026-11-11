import { db, json, getUser, body } from '../../server/lib.js';
import { ANSWERS } from '../../server/answers.js';
import { COURSES } from '../../lib/data.js';
export async function onRequestPost({ request, env }) {
  const u = await getUser(request, env);
  if (!u) return json({ error: 'auth' }, 401);
  const { course, answers = [] } = await body(request);
  const key = ANSWERS[course];
  const c = COURSES.find((x) => x.slug === course);
  if (!key || !c) return json({ error: 'course' }, 400);
  const sql = db(env);
  const have = new Set((await sql`select item from progress where user_id = ${u.id}`).map((r) => r.item));
  if (!c.lessons.every((l) => have.has(l.id))) return json({ error: 'lessons' }, 403);
  const score = key.filter((a, k) => answers[k] === a).length;
  const passed = score >= Math.ceil(key.length * 0.7);
  if (passed) await sql`insert into progress (user_id, item) values (${u.id}, ${'exam-' + course}) on conflict do nothing`;
  return json({ score, total: key.length, passed });
}
