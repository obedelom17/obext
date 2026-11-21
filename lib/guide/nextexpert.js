export default [
['ex-1', `// app/actions.js
"use server";

export async function subscribe(formData) {
  const email = formData.get("email");
  // ici : écrire en base de données, envoyer un mail…
}`,
 'La directive `"use server"` marque une fonction **asynchrone** comme **Server Function** : elle s’exécute côté serveur. Placée en haut d’un fichier, elle marque toutes les fonctions du fichier ; placée en haut d’une fonction, elle ne marque que celle-ci. Une Server Function appelée depuis un formulaire reçoit automatiquement un objet `FormData` ; `formData.get("nom")` lit le champ dont l’attribut `name` est `nom`.',
 'The `"use server"` directive marks an **async** function as a **Server Function**: it runs on the server. At the top of a file it marks every function in the file; at the top of a function it marks only that one. A Server Function invoked from a form automatically receives a `FormData` object; `formData.get("name")` reads the field whose `name` attribute is `name`.',
 ['Première ligne : `"use server";`.', 'Écris `export async function save(formData) {`.', 'Dedans : `const name = formData.get("name");`.'],
 ['First line: `"use server";`.', 'Write `export async function save(formData) {`.', 'Inside: `const name = formData.get("name");`.'],
 'Vérifie l’authentification avant d’enregistrer, comme le montre la documentation. Les valeurs de retour d’une Server Function sont **sérialisées et envoyées au client** : ne renvoie que ce dont l’interface a besoin, pas des enregistrements bruts de la base.',
 'Verify authentication before saving, as the documentation shows. A Server Function’s return values are **serialised and sent to the client**: only return what the UI needs, not raw database records.'],
['ex-2', `const res = await fetch("https://api.exemple.com/prix", {
  next: { revalidate: 3600 },   // données gardées 1 heure
});`,
 'Dans le « modèle précédent » de mise en cache (projets qui n’utilisent **pas** les Cache Components, apparus en version 16 avec l’option `cacheComponents`), les requêtes `fetch` ne sont **pas mises en cache par défaut**. Tu peux mettre une requête en cache avec `cache: "force-cache"`, ou la **revalider après un délai** avec l’option `next.revalidate` (en secondes) : `fetch(url, { next: { revalidate: 60 } })` garde la réponse 60 secondes avant de la revalider.',
 'In the “previous model” of caching (projects **not** using Cache Components, introduced in version 16 under the `cacheComponents` option), `fetch` requests are **not cached by default**. You can cache a request with `cache: "force-cache"`, or **revalidate it after a delay** with the `next.revalidate` option (in seconds): `fetch(url, { next: { revalidate: 60 } })` keeps the response for 60 seconds before revalidating it.',
 ['Écris `export default async function Page() {`.', 'Appelle `await fetch(url, { next: { revalidate: 60 } })`.', 'Utilise l’URL de ton choix, puis `return` du JSX simple.'],
 ['Write `export default async function Page() {`.', 'Call `await fetch(url, { next: { revalidate: 60 } })`.', 'Use a URL of your choice, then `return` simple JSX.'],
 'Avec les Cache Components activés, ces options sont remplacées par la directive `use cache` et `cacheLife` : vérifie sur la page officielle quel modèle ton projet utilise.',
 'With Cache Components enabled, these options are replaced by the `use cache` directive and `cacheLife`: check the official page for which model your project uses.'],
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
 'Dans l’App Router, les layouts et les pages sont des **Server Components** par défaut. Utilise-les pour le contenu statique, la récupération de données et le référencement ; ils envoient moins de JavaScript au navigateur. Pour l’**interactivité** (état, effets, API du navigateur, `onClick`), ajoute **`"use client"`** tout en haut du fichier : la directive trace la **frontière** entre le serveur et le client, et les composants exportés de ce fichier sont des points d’entrée côté client.',
 'In the App Router, layouts and pages are **Server Components** by default. Use them for static content, data fetching and SEO; they send less JavaScript to the browser. For **interactivity** (state, effects, browser APIs, `onClick`), add **`"use client"`** at the very top of the file: the directive draws the **boundary** between server and client, and components exported from that file are client entry points.',
 ['Première ligne **exactement** : `"use client";`.', 'Importe `useState` depuis `"react"`.', 'Écris un composant qui appelle `useState(0)` (par exemple un compteur).'],
 ['First line **exactly**: `"use client";`.', 'Import `useState` from `"react"`.', 'Write a component that calls `useState(0)` (for example a counter).'],
 'La directive doit être **tout en haut du fichier, avant les imports**. Les props passées d’un Server Component à un Client Component doivent être **sérialisables** : une fonction comme `onClick` ne peut pas traverser la frontière.',
 'The directive must be **at the top of the file, before imports**. Props passed from a Server Component to a Client Component must be **serialisable**: a function such as `onClick` cannot cross the boundary.'],
['ex-7', `export const metadata = {
  title: "Tarifs — Mon site",
  description: "Découvrez nos formules et leurs prix.",
};`,
 'Les métadonnées servent à améliorer le **référencement (SEO)** et le **partage** de ta page. Pour définir des métadonnées statiques, tu **exportes un objet `metadata`** depuis un fichier `layout.js` ou `page.js` : par exemple `title` et `description`. Next.js résout automatiquement ces métadonnées et crée les balises `<head>` correspondantes. Ces exports ne sont pris en charge que dans les Server Components.',
 'Metadata improves your page’s **search engine optimisation (SEO)** and **shareability**. To define static metadata, you **export a `metadata` object** from a `layout.js` or `page.js` file: for example `title` and `description`. Next.js automatically resolves this metadata and creates the relevant `<head>` tags. These exports are only supported in Server Components.',
 ['Écris `export const metadata = {`.', 'Ajoute `title: "Ma page",` et `description: "Une phrase qui décrit la page.",`.', 'Ferme avec `};` puis écris la page avec son `export default`.'],
 ['Write `export const metadata = {`.', 'Add `title: "My page",` and `description: "A sentence describing the page.",`.', 'Close with `};` then write the page with its `export default`.'],
 'Les métadonnées **basées sur des fichiers** (icônes, images Open Graph…) ont une priorité plus haute et remplacent l’objet `metadata`.',
 '**File-based** metadata (icons, Open Graph images…) has a higher priority and overrides the `metadata` object.'],
['ex-8', `import { Suspense } from "react";

<Suspense fallback={<p>Chargement…</p>}>
  <SlowReviews />   {/* composant async lent */}
</Suspense>`,
 'Quand on utilise `async/await` dans un Server Component, Next.js passe en rendu dynamique et attend la fin de la récupération avant d’afficher la page. Le **streaming** découpe la page en morceaux et les envoie au client **au fur et à mesure** qu’ils sont prêts, pour que l’utilisateur voie une partie de la page sans attendre. La documentation propose deux façons : le fichier `loading.js` (pour toute la page) et le composant **`<Suspense>`** de React (pour des parties précises). `fallback` montre un contenu de remplacement en attendant.',
 'When you use `async/await` in a Server Component, Next.js opts into dynamic rendering and waits for fetching to finish before showing the page. **Streaming** breaks the page into chunks and sends them to the client **as they become ready**, so the user sees part of the page without waiting. The documentation offers two ways: the `loading.js` file (for a whole page) and React’s **`<Suspense>`** component (for specific parts). `fallback` shows placeholder content while waiting.',
 ['Importe : `import { Suspense } from "react";`.', 'Entoure ton composant lent : `<Suspense fallback={<p>…</p>}>`.', 'Ferme avec `</Suspense>`. `fallback` est obligatoire.'],
 ['Import: `import { Suspense } from "react";`.', 'Wrap your slow component: `<Suspense fallback={<p>…</p>}>`.', 'Close with `</Suspense>`. `fallback` is required.'],
 'Avec `<Suspense>`, tu choisis plus finement quelles parties de la page arrivent en premier : le reste du contenu s’affiche sans attendre le composant lent.',
 'With `<Suspense>` you choose more precisely which parts of the page arrive first: the rest of the content displays without waiting for the slow component.'],
['ex-9', `// app/[lang]/page.js  →  /fr, /en
export default async function Home({ params }) {
  const { lang } = await params;
  return <h1>{lang === "fr" ? "Accueil" : "Home"}</h1>;
}`,
 'Le routage peut être internationalisé par **sous-chemin** (`/fr/products`) ou par **domaine** (`my-site.fr/products`). La documentation demande d’imbriquer tous les fichiers spéciaux de `app/` sous **`app/[lang]`** : le routeur gère alors dynamiquement les langues et transmet le paramètre `lang` à chaque layout et à chaque page. Dans une page, `lang` se lit avec `const { lang } = await params` (`params` est une Promise). Le contenu traduit vient de **dictionnaires** chargés côté serveur.',
 'Routing can be internationalised by **sub-path** (`/fr/products`) or by **domain** (`my-site.fr/products`). The documentation asks you to nest all special files under **`app/[lang]`**: the router then dynamically handles the languages and forwards the `lang` parameter to every layout and page. In a page, `lang` is read with `const { lang } = await params` (`params` is a Promise). Translated content comes from **dictionaries** loaded on the server.',
 ['Déclare `export default async function Page({ params }) {`.', 'Lis : `const { lang } = await params;`.', 'Renvoie `<h1>{lang === "fr" ? "Bonjour" : "Hello"}</h1>`.'],
 ['Declare `export default async function Page({ params }) {`.', 'Read: `const { lang } = await params;`.', 'Return `<h1>{lang === "fr" ? "Bonjour" : "Hello"}</h1>`.'],
 '`lang` est typé `string` : la documentation ajoute une fonction `hasLocale` qui le restreint aux langues prises en charge et garantit qu’une **404** est renvoyée si une traduction manque, plutôt qu’une erreur d’exécution.',
 '`lang` is typed as `string`: the documentation adds a `hasLocale` function that narrows it to the supported languages and ensures a **404** is returned if a translation is missing, rather than a runtime error.'],
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
 'React étend l’élément HTML `<form>` pour qu’une Server Function soit appelée par la propriété **`action`**. À l’envoi, la fonction reçoit automatiquement un objet `FormData`, dont on lit les champs avec ses méthodes natives (`formData.get("nom")`). On peut définir la fonction **en ligne** dans un Server Component (avec `"use server"` en première ligne de la fonction) ou dans un fichier à part.',
 'React extends the HTML `<form>` element so that a Server Function is invoked with the **`action`** prop. On submit, the function automatically receives a `FormData` object, whose fields you read with its native methods (`formData.get("name")`). You can define the function **inline** in a Server Component (with `"use server"` as the first line of the function) or in a separate file.',
 ['Écris `async function save(formData) {` avec `"use server";` comme première ligne **dans** la fonction.', 'Renvoie `<form action={save}>`.', 'Ajoute un `<input name="email" />` et un bouton de type submit.'],
 ['Write `async function save(formData) {` with `"use server";` as the first line **inside** the function.', 'Return `<form action={save}>`.', 'Add an `<input name="email" />` and a submit button.'],
 'Par convention, une Server Action est une fonction asynchrone utilisée avec `startTransition` : cela se fait automatiquement quand elle est passée à l’`action` d’un `<form>` ou au `formAction` d’un `<button>`.',
 'By convention, a Server Action is an async function used with `startTransition`: this happens automatically when it is passed to a `<form>`’s `action` or a `<button>`’s `formAction`.'],
];
