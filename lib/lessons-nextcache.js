// Leçons issues des pages « Route Segment Config » et « Caching and Revalidating (Previous Model) ». Relues le 2026-11-17.
// Tests par motifs sur le code, comme les autres leçons de fonctions et fichiers Next.js.
export function installNextCache({ COURSES, T, L, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  add("nextjs-expert", L("ex-22", "dynamic : forcer le rendu dynamique", "dynamic: forcing dynamic rendering",
    "L’option `dynamic` change le comportement d’une page ou d’un layout, de totalement statique à totalement dynamique. Dans `app/page.js`, exporte `dynamic = \"force-dynamic\"` : la route est rendue à chaque requête.",
    "The `dynamic` option changes the behaviour of a layout or page, from fully static to fully dynamic. In `app/page.js`, export `dynamic = \"force-dynamic\"`: the route is rendered at each request.",
    "// app/page.js\n",
    [T("export const dynamic", "export const dynamic", { match: "export\\s+const\\s+dynamic\\s*=" }), T("force-dynamic", "force-dynamic", { match: "dynamic\\s*=\\s*['\\\"]force-dynamic['\\\"]" })]));
  add("nextjs-expert", L("ex-23", "dynamicParams : refuser les segments non générés", "dynamicParams: rejecting ungenerated segments",
    "`dynamicParams` contrôle ce qui se passe quand on visite un segment dynamique **non généré** par `generateStaticParams`. Dans `app/blog/[slug]/page.js`, exporte `dynamicParams = false` : ces adresses renvoient une 404.",
    "`dynamicParams` controls what happens when a dynamic segment is visited that was **not generated** with `generateStaticParams`. In `app/blog/[slug]/page.js`, export `dynamicParams = false`: those addresses return a 404.",
    "// app/blog/[slug]/page.js\n",
    [T("export const dynamicParams", "export const dynamicParams", { match: "export\\s+const\\s+dynamicParams\\s*=" }), T("false", "false", { match: "dynamicParams\\s*=\\s*false" })]));
  add("nextjs-expert", L("ex-24", "fetch : mettre en cache avec force-cache", "fetch: caching with force-cache",
    "Par défaut, les requêtes `fetch` ne sont pas mises en cache. Pour en cacher une, passe l’option `cache: \"force-cache\"`. Dans une page `async`, écris `const data = await fetch(\"https://api.example.com/data\", { cache: \"force-cache\" })`.",
    "By default, `fetch` requests are not cached. To cache one, pass the `cache: \"force-cache\"` option. In an `async` page, write `const data = await fetch(\"https://api.example.com/data\", { cache: \"force-cache\" })`.",
    "// app/page.js\nexport default async function Page() {\n  // ton code ici\n}",
    [T("await fetch avec cache force-cache", "await fetch with cache force-cache", { match: "await\\s+fetch\\(\\s*['\\\"]https://api\\.example\\.com/data['\\\"]\\s*,\\s*\\{\\s*cache\\s*:\\s*['\\\"]force-cache['\\\"]\\s*\\}\\s*\\)" })]));
  Object.assign(SOL, {
    "ex-22": "export const dynamic = 'force-dynamic';\n\nexport default function Page() {\n  return <h1>Rendu à chaque requête</h1>;\n}",
    "ex-23": "export const dynamicParams = false;\n\nexport async function generateStaticParams() {\n  return [{ slug: 'a' }, { slug: 'b' }];\n}\n\nexport default function Page() {\n  return <h1>Article</h1>;\n}",
    "ex-24": "export default async function Page() {\n  const data = await fetch('https://api.example.com/data', { cache: 'force-cache' });\n  return <p>Données mises en cache</p>;\n}",
  });
}
