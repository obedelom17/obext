export default [
['nx-1', `// app/contact/page.js  →  l’adresse /contact
export default function Contact() {
  return <h1>Contact</h1>;
}`,
 'Avec l’**App Router**, **le dossier est l’adresse**. Un fichier `page.js` dans `app/about/` crée la page `/about`. Il doit **exporter par défaut** un composant React : c’est ce que Next.js affiche pour cette adresse. Pas de configuration de routes à écrire.',
 'With the **App Router**, **the folder is the URL**. A `page.js` file in `app/about/` creates the `/about` page. It must **default-export** a React component: that is what Next.js displays for that address. No route configuration to write.',
 ['Écris `export default function About() {`.', 'Dans la fonction, `return <h1>À propos</h1>;`.', 'Ferme l’accolade. Le test vérifie l’`export default` et la présence d’un `<h1>`.'],
 ['Write `export default function About() {`.', 'Inside, `return <h1>About</h1>;`.', 'Close the brace. The test checks the `export default` and the presence of an `<h1>`.'],
 'Sans `default`, Next.js ne trouve aucun composant et la page est en erreur.',
 'Without `default`, Next.js finds no component and the page errors out.'],
['nx-2', `// app/posts/page.js — un Server Component
export default async function Posts() {
  const res = await fetch("https://api.exemple.com/posts");
  const posts = await res.json();
  return <p>{posts.length} articles</p>;
}`,
 'Dans l’App Router, les composants sont des **Server Components** par défaut : ils s’exécutent sur le serveur, avant l’envoi de la page. Ils peuvent donc être `async` et utiliser `await` **directement**, sans `useEffect` ni état. `fetch` renvoie une réponse que `res.json()` transforme en données.',
 'In the App Router, components are **Server Components** by default: they run on the server, before the page is sent. They can therefore be `async` and use `await` **directly**, with no `useEffect` or state. `fetch` returns a response that `res.json()` turns into data.',
 ['Déclare `export default async function Users() {`.', 'Écris `const res = await fetch("https://jsonplaceholder.typicode.com/users");`.', 'Puis `const users = await res.json();` et `return <p>{users.length}</p>;`.'],
 ['Declare `export default async function Users() {`.', 'Write `const res = await fetch("https://jsonplaceholder.typicode.com/users");`.', 'Then `const users = await res.json();` and `return <p>{users.length}</p>;`.'],
 'Un `await` dans une fonction **non** `async` est une erreur de syntaxe : le mot `async` est obligatoire.',
 'An `await` in a **non**-`async` function is a syntax error: the word `async` is required.'],
['nx-3', `// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}`,
 'Le **layout racine** est la coquille commune à **toutes** les pages : c’est le seul endroit où l’on écrit `<html>` et `<body>`. Next.js lui passe en `children` la page à afficher. Tu y mets ce qui ne change pas : en-tête, pied de page, polices.',
 'The **root layout** is the shell shared by **all** pages: it’s the only place where you write `<html>` and `<body>`. Next.js passes it the page to display as `children`. Put there whatever doesn’t change: header, footer, fonts.',
 ['Écris `export default function RootLayout({ children }) {`.', 'Renvoie `<html lang="fr">` contenant `<body>`.', 'Dans le `<body>`, affiche `{children}` : c’est l’emplacement de la page.'],
 ['Write `export default function RootLayout({ children }) {`.', 'Return `<html lang="en">` containing `<body>`.', 'Inside `<body>`, display `{children}`: that’s where the page goes.'],
 'Si tu oublies `{children}`, aucune page ne s’affichera jamais.',
 'If you forget `{children}`, no page will ever be displayed.'],
['nx-4', `// app/shop/[id]/page.js  →  /shop/42, /shop/shoes…
export default async function Product({ params }) {
  const { id } = await params;
  return <h1>Produit {id}</h1>;
}`,
 'Un dossier entre **crochets** `[slug]` est un **segment dynamique** : il capte n’importe quelle valeur dans l’URL. La valeur arrive dans la prop `params`. Depuis Next.js 15, `params` est une **Promise** : il faut l’attendre avec `await` (donc une page `async`).',
 'A folder in **square brackets** `[slug]` is a **dynamic segment**: it captures any value in the URL. The value arrives in the `params` prop. Since Next.js 15, `params` is a **Promise**: you must `await` it (so the page is `async`).',
 ['Déclare `export default async function Post({ params }) {`.', 'Extrais : `const { slug } = await params;`.', 'Affiche-le : `return <h1>{slug}</h1>;`.'],
 ['Declare `export default async function Post({ params }) {`.', 'Extract: `const { slug } = await params;`.', 'Display it: `return <h1>{slug}</h1>;`.'],
 'Écrire `params.slug` sans `await` donne `undefined` en Next.js 15.',
 'Writing `params.slug` without `await` gives `undefined` in Next.js 15.'],
['nx-5', `import Link from "next/link";

export default function Page() {
  return <Link href="/about">À propos</Link>;
}`,
 '`<Link>` remplace la balise `<a>` pour naviguer **entre les pages de ton site** : la navigation est instantanée (pas de rechargement complet) et Next.js **précharge** les pages visibles à l’écran. On l’importe depuis `next/link`, et la destination va dans `href`.',
 '`<Link>` replaces the `<a>` tag for navigating **between your site’s pages**: navigation is instant (no full reload) and Next.js **prefetches** pages visible on screen. Import it from `next/link`; the destination goes in `href`.',
 ['Importe : `import Link from "next/link";`.', 'Écris `<Link href="/courses">Cours</Link>` dans un composant.', 'Pense à l’`export default` si tu écris une page complète.'],
 ['Import: `import Link from "next/link";`.', 'Write `<Link href="/courses">Courses</Link>` in a component.', 'Remember the `export default` if you write a full page.'],
 'Pour un site **externe**, une balise `<a>` normale reste appropriée.',
 'For an **external** site, a regular `<a>` tag is still appropriate.'],
['nx-6', `// app/api/ping/route.js  →  GET /api/ping
export async function GET() {
  return Response.json({ pong: true });
}`,
 'Un fichier `route.js` crée un **point d’API** au lieu d’une page. Tu y exportes une fonction nommée comme la méthode HTTP : `GET`, `POST`… Elle renvoie une `Response`. `Response.json(objet)` fabrique une réponse JSON avec les bons en-têtes.',
 'A `route.js` file creates an **API endpoint** instead of a page. You export a function named after the HTTP method: `GET`, `POST`… It returns a `Response`. `Response.json(object)` builds a JSON response with the right headers.',
 ['Écris `export async function GET() {`.', 'Renvoie `return Response.json({ message: "hello" });`.', 'Ferme l’accolade. Pas d’`export default` ici : le nom `GET` suffit.'],
 ['Write `export async function GET() {`.', 'Return `return Response.json({ message: "hello" });`.', 'Close the brace. No `export default` here: the name `GET` is enough.'],
 'Le nom de la fonction doit être en **majuscules** (`GET`, pas `get`).',
 'The function name must be in **capitals** (`GET`, not `get`).'],
['nx-7', `import Link from "next/link";

function Menu() {
  return (
    <nav>
      <Link href="/">Accueil</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}`,
 'Un menu est une série de `<Link>`. Plusieurs éléments voisins doivent être **enveloppés** dans un seul parent : ici un `<nav>` (la balise sémantique pour une navigation) ou un fragment `<>…</>`. Le texte du lien est entre les balises, la cible dans `href`.',
 'A menu is a series of `<Link>`s. Sibling elements must be **wrapped** in a single parent: here a `<nav>` (the semantic tag for navigation) or a fragment `<>…</>`. The link text goes between the tags, the target in `href`.',
 ['Renvoie un `<nav>`.', 'Dedans : `<Link href="/">Accueil</Link>`.', 'Puis `<Link href="/courses">Cours</Link>`.'],
 ['Return a `<nav>`.', 'Inside: `<Link href="/">Accueil</Link>`.', 'Then `<Link href="/courses">Cours</Link>`.'],
 'Renvoyer deux `<Link>` côte à côte **sans** parent est une erreur de JSX.',
 'Returning two `<Link>`s side by side **without** a parent is a JSX error.'],
['nx-8', `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Tab({ href, label }) {
  const path = usePathname();
  return <Link href={href} className={path === href ? "on" : ""}>{label}</Link>;
}`,
 '`usePathname()` donne le **chemin actuel** (ex. `/courses`). Comme c’est un **hook**, il ne marche que dans un **Client Component** : le fichier commence par `"use client"`. On compare le chemin à `href` pour mettre en évidence le lien de la page courante.',
 '`usePathname()` gives the **current path** (e.g. `/courses`). Since it’s a **hook**, it only works in a **Client Component**: the file starts with `"use client"`. Compare the path with `href` to highlight the current page’s link.',
 ['Déjà en haut : `"use client"` et les imports.', 'Dans `NavItem({ href, label })` : `const pathname = usePathname();`.', 'Renvoie `<Link href={href} className={pathname === href ? "active" : ""}>{label}</Link>`.'],
 ['Already at the top: `"use client"` and the imports.', 'In `NavItem({ href, label })`: `const pathname = usePathname();`.', 'Return `<Link href={href} className={pathname === href ? "active" : ""}>{label}</Link>`.'],
 'Le test fixe le chemin courant à `/courses` : teste avec `href="/courses"`.',
 'The test sets the current path to `/courses`: test with `href="/courses"`.'],
['nx-9', `import Image from "next/image";

function Logo() {
  return <Image src="/logo.png" alt="Logo du site" width={120} height={40} />;
}`,
 '`<Image>` de `next/image` **optimise** les images : bon format, bonne taille, chargement différé. `width` et `height` réservent la place avant le chargement, ce qui évite que la page « saute ». `alt` décrit l’image pour l’accessibilité. Les nombres s’écrivent entre accolades : `width={80}`.',
 '`<Image>` from `next/image` **optimises** images: right format, right size, lazy loading. `width` and `height` reserve space before loading, so the page doesn’t “jump”. `alt` describes the image for accessibility. Numbers go in braces: `width={80}`.',
 ['Dans `Avatar({ src })`, renvoie `<Image … />`.', 'Passe `src={src}` et un `alt` descriptif (ex. `alt="Photo de profil"`).', 'Ajoute `width={80}` et `height={80}`.'],
 ['In `Avatar({ src })`, return `<Image … />`.', 'Pass `src={src}` and a descriptive `alt` (e.g. `alt="Profile picture"`).', 'Add `width={80}` and `height={80}`.'],
 'Écris `width={80}` et non `width="80"` : ce sont des nombres, pas du texte.',
 'Write `width={80}` not `width="80"`: they’re numbers, not text.'],
['nx-10', `function SectionLayout({ children }) {
  return (
    <div>
      <aside>Menu</aside>
      <main>{children}</main>
    </div>
  );
}`,
 'Un `layout.js` placé dans un **sous-dossier** habille toutes les pages de ce dossier (par exemple `app/dashboard/`). Il **persiste** quand on passe d’une page à l’autre : le menu ne se recharge pas. Les pages arrivent dans `children`.',
 'A `layout.js` placed in a **subfolder** wraps every page in that folder (for example `app/dashboard/`). It **persists** when moving between pages: the menu doesn’t reload. Pages arrive in `children`.',
 ['Reçois `{ children }`.', 'Renvoie un `<div>` avec une `<nav>` (le menu de ton choix).', 'Puis `<main>{children}</main>` pour le contenu de la page.'],
 ['Receive `{ children }`.', 'Return a `<div>` with a `<nav>` (a menu of your choice).', 'Then `<main>{children}</main>` for the page content.'],
 '`<main>` doit **contenir** `{children}` : ne le mets pas à côté.',
 '`<main>` must **contain** `{children}`: don’t put it beside it.'],
['nx-11', `// app/posts/loading.js
export default function Loading() {
  return <p>Un instant…</p>;
}`,
 'Pendant que la page attend ses données, Next.js affiche automatiquement le contenu de **`loading.js`** du même dossier. Il utilise `Suspense` pour toi, et le reste du layout reste visible. Garde-le simple : un texte ou un petit squelette.',
 'While the page waits for its data, Next.js automatically shows the **`loading.js`** content from the same folder. It uses `Suspense` for you, and the rest of the layout stays visible. Keep it simple: a text or a small skeleton.',
 ['Écris `function Loading() {`.', 'Renvoie `<p>Chargement…</p>` avec exactement ce texte, points de suspension compris (`…`).', 'Dans un vrai projet, tu ajouterais `export default` devant.'],
 ['Write `function Loading() {`.', 'Return `<p>Chargement…</p>` with exactly this text, ellipsis included (`…`).', 'In a real project you’d add `export default` in front.'],
 'Le test compare le texte **à la lettre** : « Chargement… » avec le caractère `…`, pas trois points.',
 'The test compares the text **to the letter**: “Chargement…” with the `…` character, not three dots.'],
['nx-12', `"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}`,
 '**`error.js`** attrape les erreurs de la page et affiche une alternative au lieu d’un écran cassé. Il reçoit `error` (l’erreur, avec `error.message`) et `reset` (une fonction pour **réessayer**). Il doit être un **Client Component** : `"use client"` en première ligne.',
 '**`error.js`** catches the page’s errors and shows a fallback instead of a broken screen. It receives `error` (the error, with `error.message`) and `reset` (a function to **retry**). It must be a **Client Component**: `"use client"` on the first line.',
 ['`"use client"` est déjà en première ligne.', 'Reçois `{ error, reset }` et renvoie un `<div>`.', 'Dedans : `<p>{error.message}</p>` et `<button onClick={reset}>Réessayer</button>`.'],
 ['`"use client"` is already on the first line.', 'Receive `{ error, reset }` and return a `<div>`.', 'Inside: `<p>{error.message}</p>` and `<button onClick={reset}>Retry</button>`.'],
 '`onClick={reset}` : sans parenthèses, tu passes la fonction ; `reset()` l’exécuterait trop tôt.',
 '`onClick={reset}`: without parentheses you pass the function; `reset()` would run it too early.'],
['nx-13', `import { cookies } from "next/headers";

export default async function Page() {
  const store = await cookies();
  const theme = store.get("theme")?.value ?? "light";
  return <p>Thème : {theme}</p>;
}`,
 'Les **cookies** sont de petites données que le navigateur renvoie à chaque requête (session, thème…). Côté serveur, `cookies()` de `next/headers` les lit. Depuis Next.js 15, la fonction est **asynchrone** : `await cookies()`. `store.get("nom")` renvoie le cookie, et `?.value` sa valeur.',
 '**Cookies** are small pieces of data the browser sends back with every request (session, theme…). On the server, `cookies()` from `next/headers` reads them. Since Next.js 15 it’s **asynchronous**: `await cookies()`. `store.get("name")` returns the cookie, and `?.value` its value.',
 ['Importe : `import { cookies } from "next/headers";`.', 'Fais une page `async` : `export default async function Page() {`.', 'Lis : `const store = await cookies();` puis affiche par exemple `store.get("theme")?.value`.'],
 ['Import: `import { cookies } from "next/headers";`.', 'Make the page `async`: `export default async function Page() {`.', 'Read: `const store = await cookies();` then display e.g. `store.get("theme")?.value`.'],
 'Utiliser `cookies()` rend la page **dynamique** (rendue à chaque visite) : c’est normal.',
 'Using `cookies()` makes the page **dynamic** (rendered on every visit): that’s expected.'],
['nx-14', `import { redirect } from "next/navigation";

export default function Old() {
  redirect("/new");   // renvoie vers /new immédiatement
}`,
 '`redirect("/chemin")` de `next/navigation` **envoie le visiteur** ailleurs immédiatement, côté serveur. Idéal pour renvoyer un utilisateur non connecté vers `/login`, ou pour une ancienne adresse. Le code après `redirect` ne s’exécute jamais.',
 '`redirect("/path")` from `next/navigation` **sends the visitor** elsewhere immediately, on the server. Ideal for sending a signed-out user to `/login`, or for an old address. Code after `redirect` never runs.',
 ['Importe : `import { redirect } from "next/navigation";`.', 'Dans une page : `export default function Page() { redirect("/login"); }`.', 'Utilise bien des guillemets doubles autour de `"/login"`, comme dans la consigne.'],
 ['Import: `import { redirect } from "next/navigation";`.', 'In a page: `export default function Page() { redirect("/login"); }`.', 'Use double quotes around `"/login"`, as in the instructions.'],
 'N’utilise pas `redirect` dans un `try/catch` : il fonctionne en lançant une erreur spéciale.',
 'Don’t use `redirect` inside a `try/catch`: it works by throwing a special error.'],
['nx-15', `// .env.local
NEXT_PUBLIC_API_URL=https://api.exemple.com
SECRET_KEY=ne-jamais-exposer

// dans un composant :
process.env.NEXT_PUBLIC_API_URL   // ✅ visible partout
process.env.SECRET_KEY            // 🔒 serveur uniquement`,
 'Les **variables d’environnement** se placent dans `.env.local`. Par défaut elles ne sont lisibles que **côté serveur** (parfait pour les clés secrètes). Pour qu’une valeur arrive **dans le navigateur**, son nom doit commencer par **`NEXT_PUBLIC_`**. Tout ce qui porte ce préfixe devient public : n’y mets jamais de secret.',
 '**Environment variables** go in `.env.local`. By default they’re only readable **server-side** (perfect for secret keys). For a value to reach **the browser**, its name must start with **`NEXT_PUBLIC_`**. Anything with that prefix becomes public: never put a secret there.',
 ['Écris `export default function Page() {`.', 'Renvoie `<p>{process.env.NEXT_PUBLIC_SITE_URL}</p>`.', 'Orthographe exacte : `NEXT_PUBLIC_SITE_URL`, majuscules et underscores.'],
 ['Write `export default function Page() {`.', 'Return `<p>{process.env.NEXT_PUBLIC_SITE_URL}</p>`.', 'Exact spelling: `NEXT_PUBLIC_SITE_URL`, capitals and underscores.'],
 'Après modification de `.env.local`, il faut relancer le serveur de développement.',
 'After editing `.env.local`, restart the dev server.'],
['nx-16', `// app/blog/[slug]/page.js
export async function generateStaticParams() {
  return [{ slug: "intro" }, { slug: "faq" }];
}
// → /blog/intro et /blog/faq sont générées au build`,
 'Une route dynamique `[slug]` peut être **pré-générée** au moment du build, pour des pages ultra rapides. `generateStaticParams` **renvoie la liste** des valeurs possibles : un tableau d’objets dont les clés portent le nom du segment (`slug`). Next.js crée une page statique pour chacun.',
 'A dynamic `[slug]` route can be **pre-generated** at build time, for ultra-fast pages. `generateStaticParams` **returns the list** of possible values: an array of objects whose keys are named after the segment (`slug`). Next.js creates a static page for each.',
 ['Écris `export async function generateStaticParams() {`.', 'Renvoie un tableau de deux objets : `[{ slug: "a" }, { slug: "b" }]`.', 'Les clés doivent s’appeler `slug`, comme le dossier `[slug]`.'],
 ['Write `export async function generateStaticParams() {`.', 'Return an array of two objects: `[{ slug: "a" }, { slug: "b" }]`.', 'Keys must be named `slug`, like the `[slug]` folder.'],
 'Chaque objet décrit **une** page : ne mets pas toutes les valeurs dans un seul objet.',
 'Each object describes **one** page: don’t put all values in a single object.'],
['nx-17', `// GET /api/greet?name=Esi
export async function GET(request) {
  const name = new URL(request.url).searchParams.get("name");
  return Response.json({ hello: name });
}`,
 'Les paramètres d’URL (`?q=hi`) se lisent en transformant `request.url` en objet `URL` : `new URL(request.url).searchParams.get("q")`. `searchParams.get("clé")` renvoie la valeur sous forme de **texte** (ou `null` si absente).',
 'URL parameters (`?q=hi`) are read by turning `request.url` into a `URL` object: `new URL(request.url).searchParams.get("q")`. `searchParams.get("key")` returns the value as a **string** (or `null` if missing).',
 ['Écris `export async function GET(request) {`.', 'Lis : `const q = new URL(request.url).searchParams.get("q");`.', 'Renvoie `return Response.json({ q });`.'],
 ['Write `export async function GET(request) {`.', 'Read: `const q = new URL(request.url).searchParams.get("q");`.', 'Return `return Response.json({ q });`.'],
 '`{ q }` est le raccourci de `{ q: q }` : la clé du JSON s’appellera `q`.',
 '`{ q }` is shorthand for `{ q: q }`: the JSON key will be named `q`.'],
['nx-18', `export async function POST(request) {
  const data = await request.json();
  return Response.json({ received: data });
}`,
 'Une requête `POST` envoie des données dans son **corps**. Dans un Route Handler, `await request.json()` lit ce corps et le transforme en objet JavaScript. Le `await` est obligatoire : la lecture du corps est asynchrone, donc la fonction doit être `async`.',
 'A `POST` request sends data in its **body**. In a Route Handler, `await request.json()` reads that body and turns it into a JavaScript object. The `await` is required: reading the body is asynchronous, so the function must be `async`.',
 ['Écris `export async function POST(request) {`.', 'Lis le corps : `const body = await request.json();`.', 'Renvoie `return Response.json({ ok: true, echo: body });`.'],
 ['Write `export async function POST(request) {`.', 'Read the body: `const body = await request.json();`.', 'Return `return Response.json({ ok: true, echo: body });`.'],
 'Un corps ne peut être lu **qu’une seule fois** : ne rappelle pas `request.json()` deux fois.',
 'A body can be read **only once**: don’t call `request.json()` twice.'],
];
