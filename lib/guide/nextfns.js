// Explications nx-41 à nx-45, reformulées d'après les pages officielles cookies, redirect et permanentRedirect.
export default [
['nx-41', `import { permanentRedirect } from 'next/navigation'

permanentRedirect('/login') // 308`,
 '`permanentRedirect` redirige l’utilisateur vers une autre URL, comme `redirect`, mais avec le code **308 (permanent)** au lieu de 307. Il s’emploie typiquement après une mutation qui change l’URL canonique d’une ressource, par exemple après qu’un utilisateur a changé de nom d’utilisateur. Il accepte aussi des URL absolues, y compris vers des liens externes. Comme `redirect`, il n’a pas besoin de `return`.',
 '`permanentRedirect` redirects the user to another URL, like `redirect`, but with the **308 (permanent)** status instead of 307. It is typically used after a mutation that changes a resource’s canonical URL, for example after a user changes their username. It also accepts absolute URLs, including external links. Like `redirect`, it does not need a `return`.',
 ['Importe `permanentRedirect` depuis `next/navigation`.', 'Écris une page `Page()`.', 'Dedans : `permanentRedirect("/login")`.'],
 ['Import `permanentRedirect` from `next/navigation`.', 'Write a `Page()` page.', 'Inside: `permanentRedirect("/login")`.'],
 'Choisis 308 seulement si la nouvelle adresse est définitive : un 307 dit « temporaire ».',
 'Choose 308 only if the new address is final: a 307 means “temporary”.'],
['nx-42', `try {
  await savePost();
} catch (error) {
  console.error(error);
}
redirect('/posts'); // en dehors du try`,
 'Dans les Server Actions et les Route Handlers, `redirect` doit être appelé **en dehors** du bloc `try`, car il fonctionne en **levant une erreur** : si l’appel est dans le `try`, c’est ton propre `catch` qui l’attrape et la redirection n’a pas lieu. La page `redirect` de la documentation donne un exemple de mutation : on appelle la base de données dans le `try`, on gère l’erreur dans le `catch`, puis on redirige après.',
 'In Server Actions and Route Handlers, `redirect` must be called **outside** the `try` block, because it works by **throwing an error**: if the call is inside the `try`, your own `catch` catches it and the redirection doesn’t happen. The documentation’s `redirect` page gives a mutation example: you call the database in the `try`, handle the error in the `catch`, then redirect afterwards.',
 ['Repère `redirect("/posts")` dans le `try`.', 'Supprime-le de là.', 'Réécris `redirect("/posts")` après la fin du `catch`.'],
 ['Spot `redirect("/posts")` inside the `try`.', 'Remove it from there.', 'Write `redirect("/posts")` again after the end of the `catch`.'],
 'Même règle pour `permanentRedirect` et `notFound()` : ils lèvent aussi une erreur.',
 'Same rule for `permanentRedirect` and `notFound()`: they also throw an error.'],
['nx-43', `const cookieStore = await cookies()
const hasCookie = cookieStore.has('theme')`,
 'La documentation de `cookies` montre `(await cookies()).has(name)`, une méthode qui prend le nom d’un cookie et renvoie un **booléen** : `true` s’il existe, `false` sinon. Elle s’utilise dans un Server Component asynchrone. Comme `cookies` est une API dynamique, la route passe en rendu dynamique.',
 'The `cookies` documentation shows `(await cookies()).has(name)`, a method that takes a cookie name and returns a **boolean**: `true` if it exists, `false` otherwise. It is used in an async Server Component. Since `cookies` is a Dynamic API, the route moves to dynamic rendering.',
 ['Fais une page `async`.', 'Écris `const cookieStore = await cookies();`.', 'Calcule `cookieStore.has("theme")` et affiche « oui » ou « non » dans un `<p>`.'],
 ['Make the page `async`.', 'Write `const cookieStore = await cookies();`.', 'Compute `cookieStore.has("theme")` and show “oui” or “non” in a `<p>`.'],
 '`has` ne dit pas quelle est la valeur du cookie : pour la lire, utilise `get`.',
 '`has` doesn’t tell the cookie’s value: to read it, use `get`.'],
['nx-44', `'use server'

export async function deleteCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('name')
}`,
 'Supprimer un cookie n’est possible que dans une **Server Function** ou un **Route Handler**, parce que ces opérations qui modifient l’état doivent écrire les en-têtes de la réponse (c’est le navigateur qui stocke réellement les cookies). La documentation donne **trois façons** : la méthode `delete()`, écrire un nouveau cookie du même nom avec une valeur vide, ou mettre `maxAge` à 0, ce qui l’expire immédiatement (`maxAge` est en secondes).',
 'Deleting a cookie is only possible in a **Server Function** or a **Route Handler**, because these state-modifying operations must write the response headers (the browser actually stores the cookies). The documentation gives **three ways**: the `delete()` method, setting a new cookie of the same name with an empty value, or setting `maxAge` to 0, which expires it immediately (`maxAge` is in seconds).',
 ['Mets `"use server"` en première ligne.', 'Lis `const cookieStore = await cookies();`.', 'Appelle `cookieStore.delete("name")`.'],
 ['Put `"use server"` on the first line.', 'Read `const cookieStore = await cookies();`.', 'Call `cookieStore.delete("name")`.'],
 'Dans un Server Component, appeler `delete` n’est pas permis : le rendu a déjà commencé à répondre.',
 'Calling `delete` in a Server Component is not allowed: rendering has already started answering.'],
['nx-45', `'use server'

export async function create() {
  const cookieStore = await cookies()
  cookieStore.set('name', 'lee', { secure: true })
}`,
 'La méthode `set` écrit un cookie : `cookieStore.set("name", "lee")`, avec un objet d’options facultatif (`secure: true`, ou en forme objet `{ name, value, httpOnly: true, path: "/" }`). HTTP ne permet pas d’écrire un cookie une fois le **streaming** commencé : `set` ne s’utilise donc que dans une **Server Function** ou un **Route Handler**. Après un `set` ou un `delete` dans une Server Action, Next.js refait le rendu de la page et des layouts pour refléter la nouvelle valeur.',
 'The `set` method writes a cookie: `cookieStore.set("name", "lee")`, with an optional options object (`secure: true`, or in object form `{ name, value, httpOnly: true, path: "/" }`). HTTP does not allow setting a cookie once **streaming** has started: `set` is therefore only used in a **Server Function** or a **Route Handler**. After a `set` or `delete` in a Server Action, Next.js re-renders the current page and layouts so the UI reflects the new value.',
 ['Mets `"use server"` en première ligne.', 'Lis `const cookieStore = await cookies();`.', 'Appelle `cookieStore.set("name", "lee", { secure: true })`.'],
 ['Put `"use server"` on the first line.', 'Read `const cookieStore = await cookies();`.', 'Call `cookieStore.set("name", "lee", { secure: true })`.'],
 'Ne mets jamais de secret lisible dans un cookie sans `httpOnly` : le JavaScript de la page pourrait le lire.',
 'Never put a readable secret in a cookie without `httpOnly`: the page’s JavaScript could read it.'],
];
