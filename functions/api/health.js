import { db, json } from '../../server/lib.js';
// GET /api/health : vérifie la connexion Neon, les tables et le secret JWT (sans rien divulguer).
export async function onRequestGet({ env }) {
  const out = { jwtSecret: !!env.JWT_SECRET, databaseUrl: !!env.DATABASE_URL, database: false, tables: false };
  try {
    const sql = db(env);
    await sql`select 1`;
    out.database = true;
    const [r] = await sql`select count(*)::int as n from information_schema.tables where table_name in ('users', 'progress', 'certificates')`;
    out.tables = r.n === 3;
  } catch (e) { out.hint = 'Connexion impossible : vérifie DATABASE_URL (chaîne Neon complète, avec ?sslmode=require).'; }
  return json(out, out.jwtSecret && out.database && out.tables ? 200 : 503);
}
