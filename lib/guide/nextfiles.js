export default [
['nx-35', `'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}`,
 'Un `error.js` ne peut pas attraper les erreurs du layout racine, puisqu’il est imbriqué dedans. Pour cela, la documentation prévoit une variante, **`app/global-error.js`**, placée dans le dossier racine `app`. Lorsqu’il est actif, il **remplace le layout racine** : il doit donc définir lui-même les balises `<html>` et `<body>`. Comme `error.js`, c’est un **Client Component** (`"use client"`) qui reçoit `error` et `reset`.',
 'An `error.js` cannot catch errors from the root layout, since it is nested inside it. For this, the documentation provides a variation, **`app/global-error.js`**, located in the root `app` directory. When active, it **replaces the root layout**: it must therefore define the `<html>` and `<body>` tags itself. Like `error.js`, it is a **Client Component** (`"use client"`) receiving `error` and `reset`.',
 ['Mets `"use client"` en première ligne.', 'Renvoie `<html>` avec un `<body>`.', 'Dans le `<body>` : un `<h2>` et un `<button onClick={() => reset()}>`.'],
 ['Put `"use client"` on the first line.', 'Return `<html>` with a `<body>`.', 'In the `<body>`: an `<h2>` and a `<button onClick={() => reset()}>`.'],
 'C’est un cas plus rare : la documentation le décrit comme moins courant, car la plupart des erreurs sont déjà attrapées par un `error.js` plus bas dans l’arbre.',
 'It is a rarer case: the documentation describes it as less common, since most errors are already caught by an `error.js` lower in the tree.'],
];
