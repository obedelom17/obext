// Leçons issues des pages officielles « cookies », « redirect » et « permanentRedirect » (nextjs.org/docs/app/api-reference/functions/…).
// Relues le 2026-11-17. Tests par motifs sur le code, comme les autres leçons de fonctions Next.js.
export function installNextFns({ COURSES, T, L, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  add('nextjs',
    L('nx-41', 'permanentRedirect : redirection permanente', 'permanentRedirect: permanent redirect',
      '`redirect` sert une réponse 307 (temporaire). Pour une redirection **308 (permanente)**, utilise `permanentRedirect`. Importe-le depuis `next/navigation` et appelle `permanentRedirect("/login")` dans la page.',
      '`redirect` serves a 307 (temporary) response. For a **308 (permanent)** redirect, use `permanentRedirect`. Import it from `next/navigation` and call `permanentRedirect("/login")` in the page.',
      '// app/page.js\n',
      [T('Import de permanentRedirect', 'Imports permanentRedirect', { match: 'import\\s*\\{[^}]*permanentRedirect[^}]*\\}\\s*from\\s*[\'"]next/navigation[\'"]' }),
       T('Appel permanentRedirect("/login")', 'Calls permanentRedirect("/login")', { match: 'permanentRedirect\\(\\s*[\'"]/login[\'"]\\s*\\)' })]),

    L('nx-42', 'redirect en dehors du try/catch', 'redirect outside try/catch',
      '`redirect` lève une erreur : dans une Server Action ou un Route Handler, appelle-le **après** le bloc `try/catch`. Corrige `createPost` : déplace `redirect("/posts")` hors du `try`, juste après le `catch`.',
      '`redirect` throws an error: in a Server Action or a Route Handler, call it **after** the `try/catch` block. Fix `createPost`: move `redirect("/posts")` out of the `try`, right after the `catch`.',
      "'use server';\n\nimport { redirect } from 'next/navigation';\n\nexport async function createPost() {\n  try {\n    await savePost();\n    redirect('/posts');\n  } catch (error) {\n    console.error(error);\n  }\n}",
      [T('redirect n’est plus dans le try', 'redirect is no longer inside the try', { match: '^(?![^]*try\\s*\\{[^}]*redirect\\()' }),
       T('redirect("/posts") est appelé après le catch', 'redirect("/posts") is called after the catch', { match: 'catch\\s*\\([^)]*\\)\\s*\\{[^}]*\\}\\s*redirect\\(\\s*[\'"]/posts[\'"]\\s*\\)' })]),

    L('nx-43', 'cookies : vérifier qu’un cookie existe', 'cookies: checking a cookie exists',
      'Dans un Server Component, `(await cookies()).has(nom)` renvoie `true` ou `false`. Écris une page `async` qui lit `const cookieStore = await cookies()`, calcule `const hasCookie = cookieStore.has("theme")` et renvoie `<p>{hasCookie ? "oui" : "non"}</p>`.',
      'In a Server Component, `(await cookies()).has(name)` returns `true` or `false`. Write an `async` page that reads `const cookieStore = await cookies()`, computes `const hasCookie = cookieStore.has("theme")` and returns `<p>{hasCookie ? "oui" : "non"}</p>`.',
      "// app/page.js\nimport { cookies } from 'next/headers';\n\nexport default async function Page() {\n  // ton code ici\n}",
      [T('await cookies()', 'await cookies()', { match: 'await\\s+cookies\\(\\)' }),
       T('cookieStore.has("theme")', 'cookieStore.has("theme")', { match: '\\.has\\(\\s*[\'"]theme[\'"]\\s*\\)' }),
       T('Rend un <p>', 'Returns a <p>', { match: '<p>[^]*hasCookie[^]*</p>' })]),

    L('nx-44', 'cookies : supprimer un cookie', 'cookies: deleting a cookie',
      'Supprimer un cookie n’est possible que dans une Server Function ou un Route Handler. Écris la Server Action `deleteCookie` (`"use server"` en première ligne) qui lit `await cookies()` puis appelle `cookieStore.delete("name")`.',
      'Deleting a cookie is only possible in a Server Function or a Route Handler. Write the Server Action `deleteCookie` (`"use server"` on the first line) that reads `await cookies()` then calls `cookieStore.delete("name")`.',
      "'use server';\n\nimport { cookies } from 'next/headers';\n\nexport async function deleteCookie() {\n  // ton code ici\n}",
      [T('await cookies()', 'await cookies()', { match: 'await\\s+cookies\\(\\)' }),
       T('cookieStore.delete("name")', 'cookieStore.delete("name")', { match: '\\.delete\\(\\s*[\'"]name[\'"]\\s*\\)' }),
       T('"use server" en première ligne', '"use server" on the first line', { match: '^\\s*[\'"]use server[\'"]' })]),

    L('nx-45', 'cookies : écrire un cookie', 'cookies: setting a cookie',
      'HTTP ne permet pas d’écrire un cookie une fois le streaming commencé : `.set()` s’utilise donc dans une Server Function ou un Route Handler. Écris la Server Action `create` qui fait `cookieStore.set("name", "lee", { secure: true })`.',
      'HTTP does not allow setting cookies after streaming starts: `.set()` is therefore used in a Server Function or a Route Handler. Write the Server Action `create` that does `cookieStore.set("name", "lee", { secure: true })`.',
      "'use server';\n\nimport { cookies } from 'next/headers';\n\nexport async function create() {\n  // ton code ici\n}",
      [T('await cookies()', 'await cookies()', { match: 'await\\s+cookies\\(\\)' }),
       T('set("name", "lee", { secure: true })', 'set("name", "lee", { secure: true })', { match: '\\.set\\(\\s*[\'"]name[\'"]\\s*,\\s*[\'"]lee[\'"]\\s*,\\s*\\{\\s*secure\\s*:\\s*true\\s*\\}\\s*\\)' }),
       T('"use server" en première ligne', '"use server" on the first line', { match: '^\\s*[\'"]use server[\'"]' })]),
  );
  Object.assign(SOL, {
    'nx-41': "import { permanentRedirect } from 'next/navigation';\n\nexport default function Page() {\n  permanentRedirect('/login');\n}",
    'nx-42': "'use server';\n\nimport { redirect } from 'next/navigation';\n\nexport async function createPost() {\n  try {\n    await savePost();\n  } catch (error) {\n    console.error(error);\n  }\n  redirect('/posts');\n}",
    'nx-43': "import { cookies } from 'next/headers';\n\nexport default async function Page() {\n  const cookieStore = await cookies();\n  const hasCookie = cookieStore.has('theme');\n  return <p>{hasCookie ? 'oui' : 'non'}</p>;\n}",
    'nx-44': "'use server';\n\nimport { cookies } from 'next/headers';\n\nexport async function deleteCookie() {\n  const cookieStore = await cookies();\n  cookieStore.delete('name');\n}",
    'nx-45': "'use server';\n\nimport { cookies } from 'next/headers';\n\nexport async function create() {\n  const cookieStore = await cookies();\n  cookieStore.set('name', 'lee', { secure: true });\n}",
  });
}
