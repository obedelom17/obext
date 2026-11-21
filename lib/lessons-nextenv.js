// Leçons issues de la page officielle « environment variables » (nextjs.org/docs/app/guides/environment-variables). Relue le 2026-11-17.
// Tests par motifs sur le code, comme les autres leçons de fonctions et fichiers Next.js.
export function installNextEnv({ COURSES, T, L, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  add("nextjs", L("nx-59", "Variable secrète côté serveur", "Server-only secret variable",
    "Les variables sans préfixe `NEXT_PUBLIC_` restent sur le serveur : tu peux les lire dans une Route Handler ou un Server Component. Écris `GET` : lis `process.env.DB_HOST` et renvoie `Response.json({ host: process.env.DB_HOST })`.",
    "Variables without the `NEXT_PUBLIC_` prefix stay on the server: you can read them in a Route Handler or a Server Component. Write `GET`: read `process.env.DB_HOST` and return `Response.json({ host: process.env.DB_HOST })`.",
    "// app/api/db/route.js\n",
    [T("Export de GET", "Exports GET", { match: "export\\s+(async\\s+)?function\\s+GET\\s*\\(" }), T("Lit process.env.DB_HOST", "Reads process.env.DB_HOST", { match: "process\\.env\\.DB_HOST" }), T("Renvoie une réponse JSON", "Returns a JSON response", { match: "Response\\.json\\(\\s*\\{\\s*host\\s*:" })]));
  add("nextjs", L("nx-60", "Référencer une autre variable avec $", "Referencing another variable with $",
    "Next.js développe automatiquement les variables qui utilisent `$` dans les fichiers `.env*`. Écris le contenu d’un `.env` avec deux lignes : `TWITTER_USER=nextjs` puis `TWITTER_URL=https://x.com/$TWITTER_USER`.",
    "Next.js automatically expands variables that use `$` inside `.env*` files. Write the content of an `.env` with two lines: `TWITTER_USER=nextjs` then `TWITTER_URL=https://x.com/$TWITTER_USER`.",
    "# .env\n",
    [T("TWITTER_USER=nextjs", "TWITTER_USER=nextjs", { match: "(^|\\n)\\s*TWITTER_USER=nextjs\\s*(\\n|$)" }), T("TWITTER_URL avec $TWITTER_USER", "TWITTER_URL with $TWITTER_USER", { match: "TWITTER_URL=https://x\\.com/\\$TWITTER_USER" })]));
  add("nextjs", L("nx-61", "Intégration au build : pas de recherche dynamique", "Build-time inlining: no dynamic lookups",
    "Next.js remplace `process.env.NEXT_PUBLIC_…` par sa valeur au build, mais **pas** une recherche dynamique comme `process.env[varName]`. Corrige le code : remplace la recherche par une lecture directe de `process.env.NEXT_PUBLIC_ANALYTICS_ID`.",
    "Next.js replaces `process.env.NEXT_PUBLIC_…` with its value at build time, but **not** a dynamic lookup like `process.env[varName]`. Fix the code: replace the lookup with a direct read of `process.env.NEXT_PUBLIC_ANALYTICS_ID`.",
    "const varName = 'NEXT_PUBLIC_ANALYTICS_ID';\nsetupAnalyticsService(process.env[varName]);",
    [T("Lecture directe de NEXT_PUBLIC_ANALYTICS_ID", "Direct read of NEXT_PUBLIC_ANALYTICS_ID", { match: "process\\.env\\.NEXT_PUBLIC_ANALYTICS_ID" }), T("Plus de recherche dynamique", "No more dynamic lookup", { match: "^(?![^]*process\\.env\\s*\\[)" })]));
  Object.assign(SOL, {
    "nx-59": "export async function GET() {\n  return Response.json({ host: process.env.DB_HOST });\n}",
    "nx-60": "TWITTER_USER=nextjs\nTWITTER_URL=https://x.com/$TWITTER_USER",
    "nx-61": "setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID);",
  });
}
