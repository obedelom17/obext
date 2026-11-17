// Leçons issues de la page officielle « route.js » (nextjs.org/docs/app/api-reference/file-conventions/route).
// Relue le 2026-11-17. Les tests appellent directement les fonctions exportées avec de vrais Request.
export function installNextRoute({ COURSES, T, L, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  const call = (path, params) => `(async () => { const r = await GET(new Request("http://x/${path}"), { params: Promise.resolve(${params}) }); return await r.json(); })()`;
  add('nextjs',
    L('nx-32', 'Route Handler : segment dynamique', 'Route Handler: dynamic segment',
      'Dans `app/dashboard/[team]/route.js`, écris `GET(request, { params })`. Le second argument (le `context`) contient `params`, une **Promise** : attends-la avec `await params` et renvoie `Response.json({ team })`. `/dashboard/1` donne `{ team: "1" }`.',
      'In `app/dashboard/[team]/route.js`, write `GET(request, { params })`. The second argument (the `context`) holds `params`, a **Promise**: wait for it with `await params` and return `Response.json({ team })`. `/dashboard/1` gives `{ team: "1" }`.',
      'export async function GET(request, { params }) {\n  // ton code ici\n}',
      [T('/dashboard/1 → { team: "1" }', '/dashboard/1 → { team: "1" }', { expr: call('dashboard/1', "{ team: '1' }"), expect: { team: '1' } }),
       T('/dashboard/7 → { team: "7" }', '/dashboard/7 → { team: "7" }', { expr: call('dashboard/7', "{ team: '7' }"), expect: { team: '7' } }),
       T('Attend params avec await', 'Waits for params with await', { match: 'await\\s+params' })]),

    L('nx-33', 'Route Handler : segment attrape-tout', 'Route Handler: catch-all segment',
      'Dans `app/blog/[...slug]/route.js`, `params.slug` est un **tableau** : `/blog/1/2` donne `{ slug: ["1", "2"] }`. Écris `GET(request, { params })` qui renvoie `Response.json({ path: slug.join("/") })`.',
      'In `app/blog/[...slug]/route.js`, `params.slug` is an **array**: `/blog/1/2` gives `{ slug: ["1", "2"] }`. Write `GET(request, { params })` that returns `Response.json({ path: slug.join("/") })`.',
      'export async function GET(request, { params }) {\n  // ton code ici\n}',
      [T('/blog/1/2 → { path: "1/2" }', '/blog/1/2 → { path: "1/2" }', { expr: call('blog/1/2', "{ slug: ['1', '2'] }"), expect: { path: '1/2' } }),
       T('/blog/a → { path: "a" }', '/blog/a → { path: "a" }', { expr: call('blog/a', "{ slug: ['a'] }"), expect: { path: 'a' } }),
       T('Utilise join', 'Uses join', { match: '\\.join\\(' })]),

    L('nx-34', 'Route Handler : revalider les données', 'Route Handler: revalidating data',
      'Depuis Next.js 15, la mise en cache par défaut des handlers `GET` est **dynamique** (avant : statique). Pour revalider des données en cache, exporte la constante `revalidate` (en secondes). Dans `app/posts/route.js`, exporte `revalidate = 60` et un `GET` qui renvoie `Response.json({ ok: true })`.',
      'Since Next.js 15, the default caching for `GET` handlers is **dynamic** (it used to be static). To revalidate cached data, export the `revalidate` constant (in seconds). In `app/posts/route.js`, export `revalidate = 60` and a `GET` that returns `Response.json({ ok: true })`.',
      '// ton code ici',
      [T('revalidate vaut 60', 'revalidate is 60', { expr: 'revalidate', expect: 60 }),
       T('GET renvoie { ok: true }', 'GET returns { ok: true }', { expr: '(async () => { const r = await GET(new Request("http://x/posts")); return await r.json(); })()', expect: { ok: true } }),
       T('revalidate est exporté', 'revalidate is exported', { match: 'export\\s+const\\s+revalidate' })]),
  );
  Object.assign(SOL, {
    'nx-32': 'export async function GET(request, { params }) {\n  const { team } = await params;\n  return Response.json({ team });\n}',
    'nx-33': 'export async function GET(request, { params }) {\n  const { slug } = await params;\n  return Response.json({ path: slug.join("/") });\n}',
    'nx-34': 'export const revalidate = 60;\n\nexport async function GET() {\n  return Response.json({ ok: true });\n}',
  });
}
