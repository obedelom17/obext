// Vérifie un jeton d'identité Google (Sign in with Google) : signature RS256 via les clés publiques de Google,
// puis émetteur, public (aud), expiration et e-mail vérifié. Aucune bibliothèque nécessaire.
const dec = new TextDecoder();
const unb64 = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=')), (c) => c.charCodeAt(0));
const parse = (s) => JSON.parse(dec.decode(unb64(s)));

export async function verifyGoogleToken(idToken, clientId) {
  try {
    const parts = String(idToken || '').split('.');
    if (parts.length !== 3 || !clientId) return null;
    const header = parse(parts[0]);
    if (header.alg !== 'RS256' || !header.kid) return null;
    const certs = await (await fetch('https://www.googleapis.com/oauth2/v3/certs', { cf: { cacheTtl: 3600, cacheEverything: true } })).json();
    const jwk = (certs.keys || []).find((k) => k.kid === header.kid);
    if (!jwk) return null;
    const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, unb64(parts[2]), new TextEncoder().encode(parts[0] + '.' + parts[1]));
    if (!ok) return null;
    const p = parse(parts[1]);
    const issOk = p.iss === 'https://accounts.google.com' || p.iss === 'accounts.google.com';
    if (!issOk || p.aud !== clientId || !(p.exp > Date.now() / 1000) || !p.sub || !p.email) return null;
    if (p.email_verified !== true && p.email_verified !== 'true') return null;
    return { sub: p.sub, email: String(p.email).toLowerCase(), name: String(p.name || p.email.split('@')[0]).trim().slice(0, 80) };
  } catch { return null; }
}
