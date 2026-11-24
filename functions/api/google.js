// Connexion / inscription avec Google. GET : donne l'identifiant client public ; POST { credential } : vérifie le jeton et ouvre la session.
import { db, json, session, body } from '../../server/lib.js';
import { verifyGoogleToken } from '../../server/google.js';

export async function onRequestGet({ env }) { return json({ clientId: env.GOOGLE_CLIENT_ID || null }); }

export async function onRequestPost({ request, env }) {
  if (!env.GOOGLE_CLIENT_ID) return json({ error: 'google_off' }, 503);
  const { credential = '' } = await body(request);
  const g = await verifyGoogleToken(credential, env.GOOGLE_CLIENT_ID);
  if (!g) return json({ error: 'token' }, 401);
  try {
    const sql = db(env);
    let [u] = await sql`select id, email, name from users where google_sub = ${g.sub}`;
    if (!u) {
      // Même adresse e-mail (vérifiée par Google) : on rattache Google au compte existant.
      [u] = await sql`update users set google_sub = ${g.sub} where email = ${g.email} and google_sub is null returning id, email, name`;
    }
    if (!u) [u] = await sql`insert into users (email, name, pass_hash, google_sub) values (${g.email}, ${g.name}, null, ${g.sub}) returning id, email, name`;
    return json({ user: u }, 200, { 'set-cookie': await session(env, u.id) });
  } catch { return json({ error: 'db' }, 503); } // colonne google_sub absente : bloc « Migration Google » de neon.sql non exécuté
}
