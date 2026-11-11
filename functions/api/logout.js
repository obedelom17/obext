import { json, cookie } from '../../server/lib.js';
export const onRequestPost = () => json({ ok: true }, 200, { 'set-cookie': cookie('', 0) });
