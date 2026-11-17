// Leçon issue de la page officielle « error.js » (section global-error.js). Relue le 2026-11-17.
export function installNextFiles({ COURSES, T, NX, SOL, dq }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  add('nextjs',
    NX('nx-35', 'Erreurs du layout racine : global-error.js', 'Root layout errors: global-error.js',
      'Pour gérer les erreurs du layout racine, on utilise `app/global-error.js`. Il remplace le layout racine quand il est actif : il doit donc écrire ses propres balises `<html>` et `<body>`. Écris `GlobalError({ error, reset })` : `"use client"` en haut, un `<h2>` « Une erreur est survenue ! » et un `<button onClick={() => reset()}>`.',
      'To handle errors in the root layout, use `app/global-error.js`. It replaces the root layout when active, so it must define its own `<html>` and `<body>` tags. Write `GlobalError({ error, reset })`: `"use client"` at the top, an `<h2>` “Une erreur est survenue !” and a `<button onClick={() => reset()}>`.',
      "'use client';\n\nfunction GlobalError({ error, reset }) {\n  // ton code ici\n}", 'GlobalError', { error: { message: 'Oups' } },
      [T('Titre « Une erreur est survenue ! »', 'Heading “Une erreur est survenue !”', { dom: "(document.querySelector('#r h2') || { textContent: '' }).textContent", expect: 'Une erreur est survenue !' }),
       T('Balises <html> et <body>', '<html> and <body> tags', { match: '<html[^>]*>[^]*<body[^>]*>' }),
       T('"use client" en première ligne', '"use client" on the first line', { match: '^\\s*["\']use client["\']' }),
       T('Bouton qui appelle reset()', 'Button that calls reset()', { match: 'onClick=\\{[^}]*reset\\(\\)' })]),
  );
  Object.assign(SOL, {
    'nx-35': "'use client';\n\nfunction GlobalError({ error, reset }) {\n  return (\n    <html>\n      <body>\n        <h2>Une erreur est survenue !</h2>\n        <button onClick={() => reset()}>Réessayer</button>\n      </body>\n    </html>\n  );\n}",
  });
}
