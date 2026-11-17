export default [
['nx-1', `// app/contact/page.js  →  l’adresse /contact
export default function Contact() {
  return <h1>Contact</h1>;
}`,
 'Avec l’**App Router**, **le dossier est l’adresse**. Un fichier `page.js` dans `app/about/` crée la page `/about`. Il doit **exporter par défaut** un composant React : c’est ce que Next.js affiche pour cette adresse. Pas de configuration de routes à écrire.',
 'With the **App Router**, **the folder is the URL**. A `page.js` file in `app/about/` creates the `/about` page. It must **default-export** a React component: that is what Next.js displays for that address. No route configuration to write.',
 ['Écris `export default function About() {`.', 'Dans la fonction, `return <h1>À propos</h1>;`.', 'Ferme l’accolade. Le test vérifie l’`export default` et la présence d’un `<h1>`.'],
 ['Write `export default function About() {`.', 'Inside, `return <h1>About</h1>;`.', 'Close the brace. The test checks the `export default` and the presence of an `<h1>`.'],
 'Un fichier `page` est indispensable pour qu’un segment de route soit **accessible publiquement** : sans lui, le dossier seul n’a pas d’adresse.',
 'A `page` file is required to make a route segment **publicly accessible**: a folder on its own has no URL.'],
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
 'Le **layout racine** est le layout le plus haut du dossier `app` (en général `app/layout.js`). Il est **obligatoire** et c’est lui qui définit les balises `<html>` et `<body>`, ainsi que l’interface partagée par toute l’application. Next.js remplit sa prop `children` avec le segment de route enveloppé : une page ou un layout enfant.',
 'The **root layout** is the top-most layout in the `app` directory (usually `app/layout.js`). It is **required** and it defines the `<html>` and `<body>` tags, along with the UI shared across the whole application. Next.js fills its `children` prop with the route segment it wraps: a page or a child layout.',
 ['Écris `export default function RootLayout({ children }) {`.', 'Renvoie `<html lang="fr">` contenant `<body>`.', 'Dans le `<body>`, affiche `{children}` : c’est l’emplacement de la page.'],
 ['Write `export default function RootLayout({ children }) {`.', 'Return `<html lang="en">` containing `<body>`.', 'Inside `<body>`, display `{children}`: that’s where the page goes.'],
 'N’ajoute pas à la main de balises `<title>` ou `<meta>` dans le layout racine : Next.js recommande l’API Metadata, qui gère le streaming et évite les doublons dans le `<head>`.',
 'Don’t add `<title>` or `<meta>` tags by hand in the root layout: Next.js recommends the Metadata API, which handles streaming and avoids duplicated `<head>` elements.'],
['nx-4', `// app/shop/[id]/page.js  →  /shop/42, /shop/shoes…
export default async function Product({ params }) {
  const { id } = await params;
  return <h1>Produit {id}</h1>;
}`,
 'Un dossier entre **crochets** `[slug]` est un **segment dynamique** : il capte n’importe quelle valeur dans l’URL. La valeur arrive dans la prop `params`. Depuis Next.js 15, `params` est une **Promise** : il faut l’attendre avec `await` (donc une page `async`).',
 'A folder in **square brackets** `[slug]` is a **dynamic segment**: it captures any value in the URL. The value arrives in the `params` prop. Since Next.js 15, `params` is a **Promise**: you must `await` it (so the page is `async`).',
 ['Déclare `export default async function Post({ params }) {`.', 'Extrais : `const { slug } = await params;`.', 'Affiche-le : `return <h1>{slug}</h1>;`.'],
 ['Declare `export default async function Post({ params }) {`.', 'Extract: `const { slug } = await params;`.', 'Display it: `return <h1>{slug}</h1>;`.'],
 'En Next.js 15, lire `params` de façon synchrone marche encore par compatibilité, mais ce comportement sera abandonné : utilise `await` (ou `use` dans un Client Component).',
 'In Next.js 15, reading `params` synchronously still works for backwards compatibility, but that behaviour will be deprecated: use `await` (or `use` in a Client Component).'],
['nx-5', `import Link from "next/link";

export default function Page() {
  return <Link href="/about">À propos</Link>;
}`,
 '`<Link>` est un composant React qui **étend la balise `<a>`** pour offrir le **préchargement** et la **navigation côté client** entre les routes. C’est le moyen principal de naviguer entre les routes dans Next.js. On l’importe depuis `next/link`, et la destination va dans `href` (la seule prop obligatoire).',
 '`<Link>` is a React component that **extends the `<a>` tag** to provide **prefetching** and **client-side navigation** between routes. It is the primary way to navigate between routes in Next.js. Import it from `next/link`; the destination goes in `href` (the only required prop).',
 ['Importe : `import Link from "next/link";`.', 'Écris `<Link href="/courses">Cours</Link>` dans un composant.', 'Pense à l’`export default` si tu écris une page complète.'],
 ['Import: `import Link from "next/link";`.', 'Write `<Link href="/courses">Courses</Link>` in a component.', 'Remember the `export default` if you write a full page.'],
 'Le préchargement n’est **actif qu’en production** : tu ne le verras pas avec `next dev`.',
 'Prefetching is **only enabled in production**: you won’t see it with `next dev`.'],
['nx-6', `// app/api/ping/route.js  →  GET /api/ping
export async function GET() {
  return Response.json({ pong: true });
}`,
 'Un fichier `route.js` crée un **point d’API** au lieu d’une page. Tu y exportes une fonction nommée comme la méthode HTTP : `GET`, `POST`… Elle renvoie une `Response`. `Response.json(objet)` fabrique une réponse JSON avec les bons en-têtes.',
 'A `route.js` file creates an **API endpoint** instead of a page. You export a function named after the HTTP method: `GET`, `POST`… It returns a `Response`. `Response.json(object)` builds a JSON response with the right headers.',
 ['Écris `export async function GET() {`.', 'Renvoie `return Response.json({ message: "hello" });`.', 'Ferme l’accolade. Pas d’`export default` ici : le nom `GET` suffit.'],
 ['Write `export async function GET() {`.', 'Return `return Response.json({ message: "hello" });`.', 'Close the brace. No `export default` here: the name `GET` is enough.'],
 'Les méthodes prises en charge sont `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` et `OPTIONS`, exportées sous ces noms exacts, en majuscules.',
 'The supported methods are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` and `OPTIONS`, exported under these exact names, in uppercase.'],
['nx-7', `import Link from "next/link";

function Menu() {
  return (
    <nav>
      <Link href="/">Accueil</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}`,
 'Un menu est une série de `<Link>`, regroupés ici dans un `<nav>`. Le texte du lien est entre les balises, la cible dans `href`. Les attributs d’une balise `<a>` comme `className` ou `target="_blank"` peuvent être passés à `<Link>` : ils sont transmis à l’élément `<a>` sous-jacent.',
 'A menu is a series of `<Link>`s, grouped here in a `<nav>`. The link text goes between the tags, the target in `href`. `<a>` attributes such as `className` or `target="_blank"` can be passed to `<Link>`: they reach the underlying `<a>` element.',
 ['Renvoie un `<nav>`.', 'Dedans : `<Link href="/">Accueil</Link>`.', 'Puis `<Link href="/courses">Cours</Link>`.'],
 ['Return a `<nav>`.', 'Inside: `<Link href="/">Accueil</Link>`.', 'Then `<Link href="/courses">Cours</Link>`.'],
 'Un `<Link>` qui entre dans la fenêtre d’affichage est préchargé : `prefetch={false}` désactive ce comportement.',
 'A `<Link>` that enters the viewport is prefetched: `prefetch={false}` turns that off.'],
['nx-8', `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Tab({ href, label }) {
  const path = usePathname();
  return <Link href={href} className={path === href ? "on" : ""}>{label}</Link>;
}`,
 '`usePathname()` donne le **chemin actuel** (ex. `/courses`). La documentation de `Link` l’utilise pour repérer un lien actif : on compare `pathname` à l’`href` du lien et on ajoute une classe quand ils sont égaux. Dans son exemple, le composant est un **Client Component** (le fichier commence par `"use client"`).',
 '`usePathname()` gives the **current path** (e.g. `/courses`). The `Link` documentation uses it to spot an active link: compare `pathname` to the link’s `href` and add a class when they match. In its example, the component is a **Client Component** (the file starts with `"use client"`).',
 ['Déjà en haut : `"use client"` et les imports.', 'Dans `NavItem({ href, label })` : `const pathname = usePathname();`.', 'Renvoie `<Link href={href} className={pathname === href ? "active" : ""}>{label}</Link>`.'],
 ['Already at the top: `"use client"` and the imports.', 'In `NavItem({ href, label })`: `const pathname = usePathname();`.', 'Return `<Link href={href} className={pathname === href ? "active" : ""}>{label}</Link>`.'],
 'Le test fixe le chemin courant à `/courses` : teste avec `href="/courses"`.',
 'The test sets the current path to `/courses`: test with `href="/courses"`.'],
['nx-9', `import Image from "next/image";

function Logo() {
  return <Image src="/logo.png" alt="Logo du site" width={120} height={40} />;
}`,
 'Le composant `Image` de Next.js **étend la balise `<img>`** pour optimiser automatiquement les images : il sert des images à la bonne taille pour chaque appareil, dans des formats modernes comme WebP. Les propriétés `src`, `alt`, `width` et `height` sont requises. `width` et `height` sont la taille **intrinsèque** de l’image en pixels : elles servent à déduire le rapport largeur/hauteur et à éviter le décalage de mise en page pendant le chargement. `alt` décrit l’image pour l’accessibilité.',
 'The Next.js `Image` component **extends the `<img>` element** to optimise images automatically: it serves correctly sized images for each device, in modern formats like WebP. The `src`, `alt`, `width` and `height` props are required. `width` and `height` are the image’s **intrinsic** size in pixels: they are used to infer the aspect ratio and avoid layout shift while the image loads. `alt` describes the image for accessibility.',
 ['Dans `Avatar({ src })`, renvoie `<Image … />`.', 'Passe `src={src}` et un `alt` descriptif (ex. `alt="Photo de profil"`).', 'Ajoute `width={80}` et `height={80}`.'],
 ['In `Avatar({ src })`, return `<Image … />`.', 'Pass `src={src}` and a descriptive `alt` (e.g. `alt="Profile picture"`).', 'Add `width={80}` and `height={80}`.'],
 'Tu dois fournir `width` **et** `height`, sauf si l’image est importée statiquement ou si tu utilises `fill`.',
 'You must provide `width` **and** `height`, unless the image is statically imported or you use `fill`.'],
['nx-10', `function SectionLayout({ children }) {
  return (
    <div>
      <aside>Menu</aside>
      <main>{children}</main>
    </div>
  );
}`,
 'Un `layout.js` placé dans un **sous-dossier** (par exemple `app/dashboard/`) définit une interface partagée par les routes de ce dossier. Il reçoit en `children` une page ou un autre layout, et s’imbrique dans le layout racine. Les layouts sont mis en cache côté client pendant la navigation et ne sont pas re-rendus : le menu ne se recharge pas.',
 'A `layout.js` placed in a **subfolder** (for example `app/dashboard/`) defines a UI shared by the routes in that folder. It receives a page or another layout as `children`, and nests inside the root layout. Layouts are cached on the client during navigation and are not re-rendered: the menu doesn’t reload.',
 ['Reçois `{ children }`.', 'Renvoie un `<div>` avec une `<nav>` (le menu de ton choix).', 'Puis `<main>{children}</main>` pour le contenu de la page.'],
 ['Receive `{ children }`.', 'Return a `<div>` with a `<nav>` (a menu of your choice).', 'Then `<main>{children}</main>` for the page content.'],
 'Contrairement à une page, un layout **ne reçoit pas** `searchParams`. Pour lire les paramètres de requête, utilise la prop `searchParams` de la page, ou le hook `useSearchParams` dans un Client Component.',
 'Unlike a page, a layout **does not receive** `searchParams`. To read query parameters, use the page’s `searchParams` prop, or the `useSearchParams` hook in a Client Component.'],
['nx-11', `// app/posts/loading.js
export default function Loading() {
  return <p>Un instant…</p>;
}`,
 'Le fichier spécial **`loading.js`** te permet de créer une interface de chargement avec React Suspense. Il affiche **immédiatement**, depuis le serveur, un état de chargement pendant que le contenu du segment de route arrive en continu (*streaming*) ; le vrai contenu le remplace dès qu’il est prêt. Placé dans le même dossier que la page, il est imbriqué dans `layout.js` et enveloppe automatiquement `page.js` et ses enfants dans une frontière `<Suspense>` : le layout reste donc visible. Par défaut c’est un Server Component, et il n’accepte aucun paramètre. On y met par exemple un squelette ou un indicateur de chargement.',
 'The special **`loading.js`** file lets you create a loading UI with React Suspense. It shows an **instant** loading state from the server while the route segment’s content streams in; the real content replaces it as soon as it is ready. Placed in the same folder as the page, it is nested inside `layout.js` and automatically wraps `page.js` and its children in a `<Suspense>` boundary: the layout therefore stays visible. By default it is a Server Component, and it accepts no parameters. You can put a skeleton or a spinner in it, for example.',
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
 '**`error.js`** gère les erreurs d’exécution inattendues et affiche une interface de secours. Il enveloppe un segment de route et ses enfants dans une **Error Boundary** React : quand une erreur est levée à l’intérieur, le composant d’erreur s’affiche à la place. Il reçoit `error` (l’objet `Error`, avec `error.message`) et `reset`, une fonction qui tente de refaire le rendu du contenu de la frontière ; si cela réussit, l’interface de secours est remplacée par le résultat. Une frontière d’erreur doit être un **Client Component** : `"use client"` en première ligne.',
 '**`error.js`** handles unexpected runtime errors and shows a fallback UI. It wraps a route segment and its children in a React **Error Boundary**: when an error is thrown inside, the error component shows instead. It receives `error` (the `Error` object, with `error.message`) and `reset`, a function that tries to re-render the boundary’s contents; if that succeeds, the fallback UI is replaced by the result. An error boundary must be a **Client Component**: `"use client"` on the first line.',
 ['`"use client"` est déjà en première ligne.', 'Reçois `{ error, reset }` et renvoie un `<div>`.', 'Dedans : `<p>{error.message}</p>` et `<button onClick={reset}>Réessayer</button>`.'],
 ['`"use client"` is already on the first line.', 'Receive `{ error, reset }` and return a `<div>`.', 'Inside: `<p>{error.message}</p>` and `<button onClick={reset}>Retry</button>`.'],
 'Un `error.js` ne capte **pas** les erreurs levées par le `layout.js` du **même** segment, car il est imbriqué à l’intérieur : place-le dans le segment parent. Pour le layout racine, la documentation prévoit `app/global-error.js`.',
 'An `error.js` does **not** catch errors thrown by the **same** segment’s `layout.js`, because it is nested inside it: put it in the parent segment. For the root layout, the documentation provides `app/global-error.js`.'],
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
 '`{ q }` est le raccourci de `{ q: q }` : la clé du JSON s’appellera `q`. Avec un `NextRequest`, la propriété `request.nextUrl` donne un objet URL étendu déjà analysé.',
 '`{ q }` is shorthand for `{ q: q }`: the JSON key will be named `q`. With a `NextRequest`, the `request.nextUrl` property gives an extended, already parsed URL object.'],
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
