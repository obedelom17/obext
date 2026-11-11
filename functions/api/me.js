import { json, getUser } from '../../server/lib.js';
export async function onRequestGet({ request, env }) { return json({ user: await getUser(request, env) }); }
