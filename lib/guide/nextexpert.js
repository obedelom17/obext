export default [
['ex-1', `// app/actions.js
"use server";

export async function subscribe(formData) {
  const email = formData.get("email");
  // ici : écrire en base de données, envoyer un mail…
}`,
 'Une **Server Action** est une fonction qui s’exécute **sur le serveur** mais que tu appelles depuis l’interface, sans écrire d’API. La directive `"use server"` la marque. Avec un formulaire, elle reçoit un objet `FormData` ; `formData.get("nom")` lit le champ dont l’attribut `name` est `nom`.',
 'A **Server Action** is a function that runs **on the server** but that you call from the UI, with no API to write. The `"use server"` directive marks it. With a form it receives a `FormData` object; `formData.get("name")` reads the field whose `name` attribute is `name`.',
 ['Première ligne : `"use server";`.', 'Écris `export async function save(formData) {`.', 'Dedans : `const name = formData.get("name");`.'],
 ['First line: `"use server";`.', 'Write `export async function save(formData) {`.', 'Inside: `const name = formData.get("name");`.'],
 'Les actions sont publiques en pratique : **valide toujours** les données et vérifie l’identité de l’utilisateur.',
 'Actions are effectively public: **always validate** the data and check the user’s identity.'],
['ex-2', `const res = await fetch("https://api.exemple.com/prix", {
  next: { revalidate: 3600 },   // données gardées 1 heure
});`,
 'Sans cache, chaque visite refait l’appel réseau : lent et coûteux. **`next: { revalidate: 60 }`** dit à Next.js de **garder la réponse 60 secondes**, puis de la rafraîchir en arrière-plan. C’est le meilleur compromis entre vitesse et fraîcheur pour des données qui changent peu.',
 'Without caching, every visit repeats the network call: slow and costly. **`next: { revalidate: 60 }`** tells Next.js to **keep the response for 60 seconds**, then refresh it in the background. It’s the best compromise between speed and freshness for data that rarely changes.',
 ['Écris `export default async function Page() {`.', 'Appelle `await fetch(url, { next: { revalidate: 60 } })`.', 'Utilise l’URL de ton choix, puis `return` du JSX simple.'],
 ['Write `export default async function Page() {`.', 'Call `await fetch(url, { next: { revalidate: 60 } })`.', 'Use a URL of your choice, then `return` simple JSX.'],
 '`revalidate: 0` désactive le cache : à réserver aux données qui doivent être toujours à jour.',
 '`revalidate: 0` disables caching: keep it for data that must always be up to date.'],
['ex-3', `import Image from "next/image";

<Image src="/hero.jpg" alt="Équipe au travail" width={1200} height={600} priority />`,
 '`next/image` étend la balise `<img>` pour une optimisation automatique : images servies à la bonne taille selon l’appareil, formats modernes comme WebP. Comme `width` et `height` sont connus, Next.js peut en déduire le rapport largeur/hauteur et éviter le décalage de mise en page. La propriété `priority` (`true`) marque une image comme prioritaire et la précharge ; le chargement différé est alors désactivé pour elle. Vérifie sur la page officielle de la version de ton projet si `priority` y est toujours la bonne option.',
 '`next/image` extends the `<img>` element for automatic optimisation: images served at the right size for each device, modern formats like WebP. Since `width` and `height` are known, Next.js can infer the aspect ratio and avoid layout shift. The `priority` prop (`true`) marks an image as high priority and preloads it; lazy loading is then disabled for it. Check the official page for your project’s version to see whether `priority` is still the right option.',
 ['Importe `Image` depuis `"next/image"`.', 'Écris `<Image src="/photo.jpg" alt="Une photo" width={400} height={300} />`.', 'Mets-le dans un composant avec un `return`.'],
 ['Import `Image` from `"next/image"`.', 'Write `<Image src="/photo.jpg" alt="A photo" width={400} height={300} />`.', 'Put it in a component with a `return`.'],
 'Pour une image de **décor**, `alt=""` est correct ; ici il faut une vraie description.',
 'For a **decorative** image, `alt=""` is correct; here you need a real description.'],
['ex-4', `// proxy.js  (à la racine, au même niveau que app/)
import { NextResponse } from "next/server";

export function proxy(request) {
  if (!request.cookies.get("token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],   // sans matcher : toutes les requêtes
};`,
 'Le **Proxy** est du code qui s’exécute **sur le serveur, avant qu’une requête soit terminée** : il peut la **rediriger**, la **réécrire**, modifier ses **en-têtes** ou répondre directement. Dans la documentation actuelle de Next.js, la convention `middleware` est **dépréciée et renommée `proxy`** : le fichier s’appelle `proxy.js` (ou `.ts`), à la racine du projet (ou dans `src`), et il exporte une fonction nommée `proxy` (ou un export par défaut). Il reçoit un `NextRequest` ; `NextResponse.next()` laisse passer, `NextResponse.redirect(url)` redirige. **Sans `matcher`, il s’exécute sur toutes les requêtes**, y compris les fichiers statiques : cible précisément avec `config.matcher`.',
 'The **Proxy** is code that runs **on the server, before a request completes**: it can **redirect** it, **rewrite** it, modify its **headers** or respond directly. In the current Next.js documentation, the `middleware` convention is **deprecated and renamed `proxy`**: the file is `proxy.js` (or `.ts`), at the project root (or in `src`), and exports a function named `proxy` (or a default export). It receives a `NextRequest`; `NextResponse.next()` lets it through, `NextResponse.redirect(url)` redirects. **Without a `matcher`, it runs on every request**, static files included: target precisely with `config.matcher`.',
 ['Écris `export function proxy(request) {`.', 'Si `!request.cookies.get("token")`, renvoie `NextResponse.redirect(new URL("/login", request.url))`.', 'Sinon `return NextResponse.next();`, et limite avec `export const config = { matcher: [...] }`.'],
 ['Write `export function proxy(request) {`.', 'If `!request.cookies.get("token")`, return `NextResponse.redirect(new URL("/login", request.url))`.', 'Otherwise `return NextResponse.next();`, and limit with `export const config = { matcher: [...] }`.'],
 'Le proxy ne remplace pas la vérification dans chaque Server Action : un cookie présent ne prouve pas qu’il est valide.',
 'The proxy doesn’t replace checking inside each Server Action: a cookie being present doesn’t prove it is valid.'],
['ex-5', `function assert(cond, message) {
  if (!cond) throw new Error(message);
}
assert(1 + 1 === 2, "les maths marchent"); // silencieux`,
 'Un test automatisé **échoue en lançant une erreur** quand le résultat n’est pas celui attendu, et **ne fait rien** quand tout va bien. `throw new Error("message")` lance une erreur qui arrête la fonction. Les frameworks (Jest, Vitest) construisent leur `expect(…).toBe(…)` sur ce principe.',
 'An automated test **fails by throwing an error** when the result isn’t the expected one, and **does nothing** when all is well. `throw new Error("message")` throws an error that stops the function. Frameworks (Jest, Vitest) build their `expect(…).toBe(…)` on this principle.',
 ['Écris `if (a !== b) {`.', 'Dedans : `throw new Error("Attendu " + b + " mais reçu " + a);`.', 'Rien d’autre : si `a === b`, la fonction se termine sans bruit.'],
 ['Write `if (a !== b) {`.', 'Inside: `throw new Error("Expected " + b + " but got " + a);`.', 'Nothing else: if `a === b` the function ends silently.'],
 'Ne renvoie pas `false` : un test qui « renvoie faux » sans erreur passerait inaperçu.',
 'Don’t return `false`: a test that “returns false” without throwing would go unnoticed.'],
['ex-6', `"use client";   // ← première ligne du fichier
import { useState } from "react";

export default function Like() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
 'Par défaut, tout composant est un **Server Component** : rapide, léger, mais **sans** `useState`, `useEffect` ni `onClick`. Dès qu’il faut de l’**interactivité**, on ajoute **`"use client"`** tout en haut du fichier pour en faire un **Client Component**. Règle : garde « client » le plus bas possible dans l’arbre.',
 'By default every component is a **Server Component**: fast, light, but **without** `useState`, `useEffect` or `onClick`. When you need **interactivity**, add **`"use client"`** at the very top of the file to make it a **Client Component**. Rule: keep “client” as low as possible in the tree.',
 ['Première ligne **exactement** : `"use client";`.', 'Importe `useState` depuis `"react"`.', 'Écris un composant qui appelle `useState(0)` (par exemple un compteur).'],
 ['First line **exactly**: `"use client";`.', 'Import `useState` from `"react"`.', 'Write a component that calls `useState(0)` (for example a counter).'],
 'La directive doit être **avant** tout import : placée plus bas, elle est ignorée.',
 'The directive must come **before** any import: placed lower, it’s ignored.'],
['ex-7', `export const metadata = {
  title: "Tarifs — Mon site",
  description: "Découvrez nos formules et leurs prix.",
};`,
 'Les **métadonnées** alimentent l’onglet du navigateur, les résultats Google et les aperçus de partage. Dans une page ou un layout, tu **exportes un objet `metadata`** avec au moins `title` (l’onglet) et `description` (la phrase sous le lien dans Google). C’est la base du **SEO**.',
 '**Metadata** feeds the browser tab, Google results and share previews. In a page or layout, you **export a `metadata` object** with at least `title` (the tab) and `description` (the sentence under the link in Google). It’s the foundation of **SEO**.',
 ['Écris `export const metadata = {`.', 'Ajoute `title: "Ma page",` et `description: "Une phrase qui décrit la page.",`.', 'Ferme avec `};` puis écris la page avec son `export default`.'],
 ['Write `export const metadata = {`.', 'Add `title: "My page",` and `description: "A sentence describing the page.",`.', 'Close with `};` then write the page with its `export default`.'],
 'Une `description` idéale fait environ 150 caractères : assez pour informer, pas trop pour ne pas être coupée.',
 'An ideal `description` is about 150 characters: enough to inform, not so long that it gets cut off.'],
['ex-8', `import { Suspense } from "react";

<Suspense fallback={<p>Chargement…</p>}>
  <SlowReviews />   {/* composant async lent */}
</Suspense>`,
 '`Suspense` permet le **streaming** : la page s’affiche tout de suite, et la partie lente arrive **plus tard** dans le même emplacement. En attendant, `fallback` montre un contenu de remplacement. Résultat : l’utilisateur voit le reste de la page sans attendre le composant le plus lent.',
 '`Suspense` enables **streaming**: the page displays right away, and the slow part arrives **later** in the same spot. Meanwhile `fallback` shows placeholder content. Result: the user sees the rest of the page without waiting for the slowest component.',
 ['Importe : `import { Suspense } from "react";`.', 'Entoure ton composant lent : `<Suspense fallback={<p>…</p>}>`.', 'Ferme avec `</Suspense>`. `fallback` est obligatoire.'],
 ['Import: `import { Suspense } from "react";`.', 'Wrap your slow component: `<Suspense fallback={<p>…</p>}>`.', 'Close with `</Suspense>`. `fallback` is required.'],
 'Place `Suspense` **autour** du composant lent, pas dedans, sinon il ne sert à rien.',
 'Put `Suspense` **around** the slow component, not inside it, or it does nothing.'],
['ex-9', `// app/[lang]/page.js  →  /fr, /en
export default async function Home({ params }) {
  const { lang } = await params;
  return <h1>{lang === "fr" ? "Accueil" : "Home"}</h1>;
}`,
 'L’**internationalisation** la plus simple utilise un **segment dynamique** : `app/[lang]/` capte `/fr`, `/en`… La page lit `lang` avec `await params` (Promise en Next.js 15) puis choisit les textes selon la langue. Le `?:` ternaire convient pour deux langues ; pour davantage, un objet de traductions.',
 'The simplest **internationalisation** uses a **dynamic segment**: `app/[lang]/` captures `/fr`, `/en`… The page reads `lang` with `await params` (a Promise in Next.js 15) then picks texts by language. The `?:` ternary works for two languages; for more, a translation object.',
 ['Déclare `export default async function Page({ params }) {`.', 'Lis : `const { lang } = await params;`.', 'Renvoie `<h1>{lang === "fr" ? "Bonjour" : "Hello"}</h1>`.'],
 ['Declare `export default async function Page({ params }) {`.', 'Read: `const { lang } = await params;`.', 'Return `<h1>{lang === "fr" ? "Bonjour" : "Hello"}</h1>`.'],
 'N’oublie pas les **guillemets** autour de `"fr"` : sans eux, `fr` serait une variable.',
 'Don’t forget the **quotes** around `"fr"`: without them, `fr` would be a variable.'],
['ex-10', `import { notFound } from "next/navigation";

export default async function Product({ params }) {
  const { id } = await params;
  const item = await findProduct(id);
  if (!item) notFound();          // affiche la page 404
  return <h1>{item.name}</h1>;
}`,
 'Pour gérer une ressource manquante, importe `notFound` depuis `next/navigation`. Appeler `notFound()` lève une erreur qui **termine le rendu** du segment de route où elle est levée, et Next.js affiche l’interface définie par `not-found.js`. Il ajoute aussi une balise `<meta name="robots" content="noindex" />` pour que la page ne soit pas indexée. Il suffit d’écrire `notFound()` : pas besoin de `return notFound()`.',
 'To handle a missing resource, import `notFound` from `next/navigation`. Calling `notFound()` throws an error that **terminates rendering** of the route segment where it is thrown, and Next.js shows the UI defined by `not-found.js`. It also injects a `<meta name="robots" content="noindex" />` tag so the page isn’t indexed. Just write `notFound()`: there is no need for `return notFound()`.',
 ['Importe : `import { notFound } from "next/navigation";`.', 'Dans un composant : `const item = null;` (simule une donnée absente).', 'Écris `if (!item) notFound();`.'],
 ['Import: `import { notFound } from "next/navigation";`.', 'In a component: `const item = null;` (simulates missing data).', 'Write `if (!item) notFound();`.'],
 'Comme toute exception, `notFound()` remonte la pile d’appels : un `try/catch` autour de l’appel l’**avale**, et l’interface 404 ne s’affiche pas.',
 'Like any exception, `notFound()` travels up the call stack: a `try/catch` around the call **swallows** it, and the 404 UI does not render.'],
['ex-11', `// actions.js
"use server";
export async function send(formData) { /* … */ }

// page.js
import { send } from "./actions";
<form action={send}>
  <input name="email" />
  <button>Envoyer</button>
</form>`,
 'Brancher une Server Action à un formulaire est direct : tu passes la fonction à l’attribut **`action`** du `<form>`. À l’envoi, Next.js appelle la fonction sur le serveur avec un `FormData`. Ça marche même **sans JavaScript** côté navigateur. N’oublie pas `"use server"` dans l’action.',
 'Wiring a Server Action to a form is direct: pass the function to the **`action`** attribute of the `<form>`. On submit, Next.js calls the function on the server with a `FormData`. It works even **without JavaScript** in the browser. Don’t forget `"use server"` in the action.',
 ['Écris `async function save(formData) {` avec `"use server";` comme première ligne **dans** la fonction.', 'Renvoie `<form action={save}>`.', 'Ajoute un `<input name="email" />` et un bouton de type submit.'],
 ['Write `async function save(formData) {` with `"use server";` as the first line **inside** the function.', 'Return `<form action={save}>`.', 'Add an `<input name="email" />` and a submit button.'],
 'Dans `action={save}` on passe la fonction **sans** parenthèses.',
 'In `action={save}` you pass the function **without** parentheses.'],
];
