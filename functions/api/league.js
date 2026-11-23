// Classement de la semaine : XP = 10 par leçon validée depuis lundi. Prénoms seulement ; chacun peut se masquer.
import { db, json, getUser, body } from '../../server/lib.js';
export async function onRequestGet({ request, env }) {
  const u = await getUser(request, env);
  if (!u) return json({ error: 'auth' }, 401);
  try {
    const sql = db(env);
    const top = await sql`select split_part(u.name, ' ', 1) as name, count(*)::int * 10 as xp, (u.id = ${u.id}) as me
      from progress p join users u on u.id = p.user_id
      where p.done_at >= date_trunc('week', now()) and u.show_rank and p.item not like 'chest-%' and p.item not like 'week-%'
      group by u.id, u.name order by xp desc, u.name limit 10`;
    const [mine] = await sql`select count(*)::int * 10 as xp from progress where user_id = ${u.id} and done_at >= date_trunc('week', now()) and item not like 'chest-%' and item not like 'week-%'`;
    const [rk] = await sql`select count(*)::int as above from (
        select user_id, count(*) c from progress p join users x on x.id = p.user_id
        where p.done_at >= date_trunc('week', now()) and x.show_rank and p.item not like 'chest-%' and p.item not like 'week-%' group by user_id) t
      where t.c * 10 > ${mine.xp}`;
    const [vis] = await sql`select show_rank from users where id = ${u.id}`;
    return json({ top, me: { xp: mine.xp, rank: mine.xp > 0 ? rk.above + 1 : null, visible: vis ? vis.show_rank : true } });
  } catch { return json({ top: [], me: null, off: true }); }
}
export async function onRequestPost({ request, env }) {
  const u = await getUser(request, env);
  if (!u) return json({ error: 'auth' }, 401);
  const { visible } = await body(request);
  try { await db(env)`update users set show_rank = ${!!visible} where id = ${u.id}`; return json({ visible: !!visible }); } catch { return json({ error: 'off' }, 503); }
}
