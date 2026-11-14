export const SITE_NAME = 'obext.js';

export const UI = {
  courses: { fr: 'Cours', en: 'Courses' },
  heroTitle: { fr: 'Apprends à coder en écrivant du code.', en: 'Learn to code by writing code.' },
  heroSub: { fr: 'JavaScript, React et Next.js, de débutant à expert. Chaque leçon se termine par un exercice corrigé instantanément dans ton navigateur.', en: 'JavaScript, React and Next.js, from beginner to expert. Every lesson ends with an exercise graded instantly in your browser.' },
  start: { fr: 'Commencer gratuitement', en: 'Start for free' },
  path: { fr: 'Un parcours, trois étapes', en: 'One path, three steps' },
  f1t: { fr: 'Zéro vidéo', en: 'No videos' }, f1d: { fr: 'Tu lis un peu, tu codes beaucoup.', en: 'Read a little, code a lot.' },
  f2t: { fr: 'Correction instantanée', en: 'Instant grading' }, f2d: { fr: 'Des tests s’exécutent à chaque clic sur « Vérifier ».', en: 'Tests run every time you click “Check”.' },
  f3t: { fr: 'Certificat', en: 'Certificate' }, f3d: { fr: 'Termine un cours et télécharge ton certificat.', en: 'Finish a course and download your certificate.' },
  lessons: { fr: 'leçons', en: 'lessons' },
  check: { fr: 'Vérifier', en: 'Check' }, checking: { fr: 'Exécution…', en: 'Running…' },
  next: { fr: 'Leçon suivante', en: 'Next lesson' },
  allPass: { fr: 'Bravo, tous les tests passent !', en: 'Well done, all tests pass!' },
  somePass: { fr: 'Pas encore : relis l’énoncé et réessaie.', en: 'Not yet: reread the task and try again.' },
  getCert: { fr: 'Obtenir mon certificat', en: 'Get my certificate' },
  yourName: { fr: 'Ton nom complet', en: 'Your full name' },
  print: { fr: 'Imprimer / enregistrer en PDF', en: 'Print / save as PDF' },
  locked: { fr: 'Termine toutes les leçons du cours pour débloquer ce certificat.', en: 'Finish every lesson in the course to unlock this certificate.' },
  certOf: { fr: 'Certificat de réussite', en: 'Certificate of completion' },
  certText: { fr: 'a terminé avec succès le cours', en: 'has successfully completed the course' },
};

const L = (id, fr, en, bodyFr, bodyEn, starter, tests) => ({ id, title: { fr, en }, body: { fr: bodyFr, en: bodyEn }, starter, tests });
const T = (fr, en, o) => ({ label: { fr, en }, ...o });

export const COURSES = [
  { slug: 'javascript', color: '#FFC83D', icon: 'JS', level: { fr: 'Débutant', en: 'Beginner' },
    title: { fr: 'JavaScript', en: 'JavaScript' },
    desc: { fr: 'Les bases du langage : fonctions, tableaux, objets.', en: 'Language basics: functions, arrays, objects.' },
    lessons: [
      L('js-1', 'Ta première fonction', 'Your first function', 'Une fonction prend des valeurs et en renvoie une. Écris `double(n)` qui renvoie le double de `n`.', 'A function takes values and returns one. Write `double(n)` that returns twice `n`.',
        'function double(n) {\n  // ton code ici\n}', [T('double(4) renvoie 8', 'double(4) returns 8', { expr: 'double(4)', expect: 8 }), T('double(-3) renvoie -6', 'double(-3) returns -6', { expr: 'double(-3)', expect: -6 })]),
      L('js-2', 'Filtrer un tableau', 'Filtering an array', '`filter` garde les éléments qui passent un test. Écris `evens(arr)` qui renvoie seulement les nombres pairs.', '`filter` keeps the items that pass a test. Write `evens(arr)` that returns only the even numbers.',
        'function evens(arr) {\n  // ton code ici\n}', [T('evens([1,2,3,4]) renvoie [2,4]', 'evens([1,2,3,4]) returns [2,4]', { expr: 'evens([1,2,3,4])', expect: [2, 4] }), T('evens([]) renvoie []', 'evens([]) returns []', { expr: 'evens([])', expect: [] })]),
      L('js-3', 'Transformer avec map', 'Transforming with map', '`map` transforme chaque élément. Écris `names(users)` qui renvoie la liste des noms d’un tableau d’objets `{ name }`.', '`map` transforms every item. Write `names(users)` that returns the list of names from an array of `{ name }` objects.',
        'function names(users) {\n  // ton code ici\n}', [T('names([{name:"Ama"},{name:"Kofi"}])', 'names([{name:"Ama"},{name:"Kofi"}])', { expr: 'names([{name:"Ama"},{name:"Kofi"}])', expect: ['Ama', 'Kofi'] })]),
    ] },
  { slug: 'react', color: '#7C8CFF', icon: 'Re', level: { fr: 'Intermédiaire', en: 'Intermediate' },
    title: { fr: 'React', en: 'React' },
    desc: { fr: 'Composants, JSX et état avec useState.', en: 'Components, JSX and state with useState.' },
    lessons: [
      L('re-1', 'Ton premier composant', 'Your first component', 'Un composant est une fonction qui renvoie du JSX. Écris un composant `Hello` qui renvoie un titre `<h1>`.', 'A component is a function that returns JSX. Write a `Hello` component that returns an `<h1>` heading.',
        'function Hello() {\n  // ton code ici\n}', [T('Le composant Hello existe', 'The Hello component exists', { match: 'function\\s+Hello' }), T('Il renvoie un <h1>', 'It returns an <h1>', { match: 'return[\\s\\S]*<h1' })]),
      L('re-2', 'L’état avec useState', 'State with useState', '`useState` garde une valeur qui change. Crée un compteur : `useState(0)` et un bouton avec `onClick` qui appelle `setCount`.', '`useState` holds a value that changes. Build a counter: `useState(0)` and a button with `onClick` that calls `setCount`.',
        "import { useState } from 'react';\n\nexport default function Counter() {\n  // ton code ici\n}", [T('useState(0)', 'useState(0)', { match: 'useState\\(\\s*0\\s*\\)' }), T('Un bouton avec onClick', 'A button with onClick', { match: '<button[^>]*onClick' }), T('setCount est appelé', 'setCount is called', { match: 'setCount\\(' })]),
    ] },
  { slug: 'nextjs', color: '#FF5C8A', icon: 'Nx', level: { fr: 'Avancé', en: 'Advanced' },
    title: { fr: 'Next.js', en: 'Next.js' },
    desc: { fr: 'App Router, pages et Server Components.', en: 'App Router, pages and Server Components.' },
    lessons: [
      L('nx-1', 'Une page avec l’App Router', 'A page with the App Router', 'Le fichier `app/about/page.js` crée la page /about. Exporte par défaut un composant qui affiche un `<h1>`.', 'The file `app/about/page.js` creates the /about page. Default-export a component that renders an `<h1>`.',
        '// app/about/page.js\n', [T('export default', 'export default', { match: 'export\\s+default' }), T('Un <h1> est affiché', 'An <h1> is rendered', { match: '<h1' })]),
      L('nx-2', 'Données côté serveur', 'Server-side data', 'Un Server Component peut être `async`. Récupère des données avec `await fetch(...)` dans la page.', 'A Server Component can be `async`. Fetch data with `await fetch(...)` inside the page.',
        '// app/users/page.js\n', [T('Composant async', 'Async component', { match: 'async\\s+function' }), T('await fetch', 'await fetch', { match: 'await\\s+fetch\\(' })]),
    ] },
];

const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);

add('javascript',
  L('js-4', 'Conditions', 'Conditions', 'Écris `grade(score)` : renvoie "A" si le score est ≥ 90, "B" s’il est ≥ 70, sinon "C".', 'Write `grade(score)`: return "A" if the score is ≥ 90, "B" if ≥ 70, otherwise "C".',
    'function grade(score) {\n  // ton code ici\n}', [T('grade(95) → "A"', 'grade(95) → "A"', { expr: 'grade(95)', expect: 'A' }), T('grade(75) → "B"', 'grade(75) → "B"', { expr: 'grade(75)', expect: 'B' }), T('grade(10) → "C"', 'grade(10) → "C"', { expr: 'grade(10)', expect: 'C' })]),
  L('js-5', 'Réduire un tableau', 'Reducing an array', '`reduce` combine tous les éléments en une seule valeur. Écris `sum(arr)` qui renvoie la somme.', '`reduce` combines all items into one value. Write `sum(arr)` that returns the total.',
    'function sum(arr) {\n  // ton code ici\n}', [T('sum([1,2,3]) → 6', 'sum([1,2,3]) → 6', { expr: 'sum([1,2,3])', expect: 6 }), T('sum([]) → 0', 'sum([]) → 0', { expr: 'sum([])', expect: 0 })]),
  L('js-6', 'Spread et objets', 'Spread and objects', 'L’opérateur `...` copie les propriétés. Écris `merge(a, b)` qui fusionne deux objets (`b` gagne en cas de conflit).', 'The `...` operator copies properties. Write `merge(a, b)` that merges two objects (`b` wins on conflicts).',
    'function merge(a, b) {\n  // ton code ici\n}', [T('merge({x:1},{y:2})', 'merge({x:1},{y:2})', { expr: 'merge({x:1},{y:2})', expect: { x: 1, y: 2 } }), T('b gagne', 'b wins', { expr: 'merge({x:1},{x:5})', expect: { x: 5 } })]),
  L('js-7', 'Closures', 'Closures', 'Une fonction se souvient des variables autour d’elle. Écris `counter()` qui renvoie une fonction : chaque appel renvoie 1, puis 2, puis 3…', 'A function remembers the variables around it. Write `counter()` that returns a function: each call returns 1, then 2, then 3…',
    'function counter() {\n  // ton code ici\n}', [T('3e appel → 3', '3rd call → 3', { expr: '(() => { const c = counter(); c(); c(); return c(); })()', expect: 3 }), T('compteurs indépendants', 'independent counters', { expr: '(() => { const a = counter(); const b = counter(); a(); a(); return b(); })()', expect: 1 })]),
  L('js-8', 'Promesses et async', 'Promises and async', 'Écris `delay(ms, value)` qui renvoie une Promise résolue avec `value` après `ms` millisecondes.', 'Write `delay(ms, value)` that returns a Promise resolved with `value` after `ms` milliseconds.',
    'function delay(ms, value) {\n  // ton code ici\n}', [T('delay(20, "ok") → "ok"', 'delay(20, "ok") → "ok"', { expr: 'delay(20, "ok")', expect: 'ok' })]),
);

add('react',
  L('re-3', 'Les props', 'Props', 'Les props passent des données à un composant. Écris `Greeting({ name })` qui affiche `<p>` avec le nom.', 'Props pass data to a component. Write `Greeting({ name })` that renders a `<p>` with the name.',
    'function Greeting() {\n  // ton code ici\n}', [T('Greeting reçoit { name }', 'Greeting receives { name }', { match: 'function\\s+Greeting\\s*\\(\\s*\\{\\s*name' }), T('{name} est affiché dans un <p>', '{name} is rendered in a <p>', { match: '<p[^>]*>[^<]*\\{\\s*name\\s*\\}' })]),
  L('re-4', 'Listes et clés', 'Lists and keys', 'Affiche un tableau avec `.map(` et donne une `key` unique à chaque élément `<li>`.', 'Render an array with `.map(` and give every `<li>` a unique `key`.',
    'function List({ items }) {\n  // ton code ici\n}', [T('.map( est utilisé', '.map( is used', { match: '\\.map\\(' }), T('Chaque <li> a une key', 'Each <li> has a key', { match: '<li[^>]*key=' })]),
  L('re-5', 'Effets avec useEffect', 'Effects with useEffect', '`useEffect` s’exécute après le rendu. Utilise-le avec un tableau de dépendances vide `[]` pour ne s’exécuter qu’une fois.', '`useEffect` runs after render. Use it with an empty dependency array `[]` so it runs only once.',
    "import { useEffect } from 'react';\n\nexport default function Page() {\n  // ton code ici\n}", [T('useEffect( est appelé', 'useEffect( is called', { match: 'useEffect\\(' }), T('Dépendances []', 'Dependencies []', { match: '\\[\\s*\\]\\s*\\)' })]),
);

add('nextjs',
  L('nx-3', 'Le layout racine', 'The root layout', '`app/layout.js` enveloppe toutes les pages. Il doit recevoir `children` et renvoyer `<html>` et `<body>`.', '`app/layout.js` wraps every page. It must receive `children` and return `<html>` and `<body>`.',
    '// app/layout.js\n', [T('export default', 'export default', { match: 'export\\s+default' }), T('children est reçu', 'children is received', { match: '\\{\\s*children\\s*\\}' }), T('<html> et <body>', '<html> and <body>', { match: '<html[\\s\\S]*<body' })]),
  L('nx-4', 'Routes dynamiques', 'Dynamic routes', 'Le dossier `app/blog/[slug]/page.js` capte /blog/n-importe-quoi. Dans Next.js 15, `params` est une Promise : fais `await params`.', 'The folder `app/blog/[slug]/page.js` matches /blog/anything. In Next.js 15, `params` is a Promise: use `await params`.',
    '// app/blog/[slug]/page.js\n', [T('Composant async', 'Async component', { match: 'async\\s+function' }), T('await params', 'await params', { match: 'await\\s+params' }), T('Utilise slug', 'Uses slug', { match: 'slug' })]),
  L('nx-5', 'Le composant Link', 'The Link component', 'Importe `Link` depuis `next/link` et crée un lien vers /courses avec `href`.', 'Import `Link` from `next/link` and create a link to /courses using `href`.',
    '', [T('Import de next/link', 'Import from next/link', { match: 'import\\s+Link\\s+from\\s+[\'"]next/link[\'"]' }), T('<Link href=…>', '<Link href=…>', { match: '<Link[^>]*href=' })]),
  L('nx-6', 'Route Handlers (API)', 'Route Handlers (API)', '`app/api/hello/route.js` crée une API. Exporte `GET` qui renvoie du JSON avec `Response.json(...)`.', '`app/api/hello/route.js` creates an API. Export `GET` returning JSON with `Response.json(...)`.',
    '// app/api/hello/route.js\n', [T('export async function GET', 'export async function GET', { match: 'export\\s+async\\s+function\\s+GET' }), T('Response.json', 'Response.json', { match: '(Next)?Response\\.json\\(' })]),
);

Object.assign(UI, {
  exam: { fr: 'Examen final', en: 'Final exam' }, submit: { fr: 'Valider', en: 'Submit' },
  examOk: { fr: 'Examen réussi !', en: 'Exam passed!' }, examKo: { fr: 'Il faut au moins 2 bonnes réponses. Réessaie.', en: 'You need at least 2 correct answers. Try again.' },
  sol: { fr: 'Voir la solution', en: 'Show solution' }, solHint: { fr: 'Solution débloquée après 2 essais ratés.', en: 'Solution unlocks after 2 failed attempts.' },
  badges: { fr: 'Badges', en: 'Badges' },
});

add('javascript',
  L('js-9', 'Mémoïsation', 'Memoization', 'Écris `memoize(fn)` : la fonction renvoyée met en cache le résultat par argument, `fn` n’est donc appelée qu’une fois par valeur.', 'Write `memoize(fn)`: the returned function caches results per argument, so `fn` runs only once per value.',
    'function memoize(fn) {\n  // ton code ici\n}', [T('fn appelée une seule fois', 'fn called only once', { expr: '(() => { let n = 0; const f = memoize((x) => { n++; return x * 2; }); f(2); f(2); return n; })()', expect: 1 }), T('Le résultat est correct', 'The result is correct', { expr: 'memoize((x) => x + 1)(4)', expect: 5 })]),
);
add('react', L('re-6', 'Interrupteur ON/OFF', 'ON/OFF toggle', 'Écris `Toggle` : un bouton qui affiche OFF au départ, puis bascule entre ON et OFF à chaque clic.', 'Write `Toggle`: a button that shows OFF at first, then switches between ON and OFF on every click.', 'function Toggle() {\n  // ton code ici\n}', []));

COURSES.push({ slug: 'nextjs-expert', color: '#19C9A0', icon: 'Ex', level: { fr: 'Expert', en: 'Expert' },
  title: { fr: 'Next.js Expert', en: 'Next.js Expert' },
  desc: { fr: 'Server Actions, cache, performance, authentification, tests.', en: 'Server Actions, caching, performance, authentication, testing.' },
  lessons: [
    L('ex-1', 'Server Actions', 'Server Actions', 'Une fonction marquée `"use server"` s’exécute côté serveur. Écris une action `save(formData)` qui lit `formData.get("name")`.', 'A function marked `"use server"` runs on the server. Write an action `save(formData)` that reads `formData.get("name")`.',
      '// app/actions.js\n', [T('Directive "use server"', '"use server" directive', { match: '[\'"]use server[\'"]' }), T('formData.get(...)', 'formData.get(...)', { match: 'formData\\.get\\(' })]),
    L('ex-2', 'Cache et revalidation', 'Caching and revalidation', 'Avec `fetch`, l’option `next: { revalidate: 60 }` garde la réponse en cache 60 secondes.', 'With `fetch`, the option `next: { revalidate: 60 }` keeps the response cached for 60 seconds.',
      '// app/page.js\n', [T('await fetch(', 'await fetch(', { match: 'await\\s+fetch\\(' }), T('revalidate: 60', 'revalidate: 60', { match: 'revalidate\\s*:\\s*60' })]),
    L('ex-3', 'Images optimisées', 'Optimized images', '`next/image` évite les décalages de mise en page. Importe `Image` et affiche une image avec `alt`, `width` et `height`.', '`next/image` prevents layout shift. Import `Image` and render one with `alt`, `width` and `height`.',
      '', [T('Import de next/image', 'Import from next/image', { match: 'from\\s+[\'"]next/image[\'"]' }), T('<Image alt width height>', '<Image alt width height>', { match: '<Image(?=[^>]*alt=)(?=[^>]*width=)(?=[^>]*height=)' })]),
    L('ex-4', 'Authentification avec middleware', 'Auth with middleware', '`middleware.js` s’exécute avant chaque requête. Redirige vers /login si le cookie `token` est absent.', '`middleware.js` runs before every request. Redirect to /login when the `token` cookie is missing.',
      '// middleware.js\n', [T('Fonction middleware', 'middleware function', { match: 'function\\s+middleware' }), T('Lit le cookie token', 'Reads the token cookie', { match: 'cookies\\.get\\(\\s*[\'"]token[\'"]' }), T('NextResponse.redirect', 'NextResponse.redirect', { match: 'NextResponse\\.redirect\\(' })]),
    L('ex-5', 'Écrire des tests', 'Writing tests', 'Un test lance une erreur quand le résultat est faux. Écris `assertEqual(a, b)` qui lance une erreur si `a !== b`.', 'A test throws when the result is wrong. Write `assertEqual(a, b)` that throws if `a !== b`.',
      'function assertEqual(a, b) {\n  // ton code ici\n}', [T('Lance une erreur si différent', 'Throws when different', { expr: '(() => { try { assertEqual(1, 2); } catch (e) { return "threw"; } return "no"; })()', expect: 'threw' }), T('Ne fait rien si égal', 'Does nothing when equal', { expr: '(() => { assertEqual(2, 2); return "ok"; })()', expect: 'ok' })]),
  ] });

const D = (s) => `document.querySelector('${s}')`;
const RX = {
  're-1': { react: true, component: 'Hello', tests: [T('Affiche un <h1>', 'Renders an <h1>', { dom: `!!${D('h1')}`, expect: true })] },
  're-2': { react: true, component: 'Counter', tests: [T('Affiche 0 au départ', 'Shows 0 at start', { dom: "document.body.textContent.includes('0')", expect: true }), T('Le clic passe à 1', 'Click goes to 1', { pre: `${D('button')}.click()`, dom: "document.body.textContent.includes('1')", expect: true })] },
  're-3': { react: true, component: 'Greeting', props: { name: 'Ama' }, tests: [T('Affiche le nom dans un <p>', 'Shows the name in a <p>', { dom: `${D('p')}.textContent.includes('Ama')`, expect: true })] },
  're-4': { react: true, component: 'List', props: { items: ['a', 'b'] }, tests: [T('2 éléments <li>', '2 <li> items', { dom: "document.querySelectorAll('li').length", expect: 2 }), T('Chaque <li> a une key', 'Each <li> has a key', { match: '<li[^>]*key=' })] },
  're-6': { react: true, component: 'Toggle', tests: [T('Affiche OFF au départ', 'Shows OFF at start', { dom: `${D('button')}.textContent`, expect: 'OFF' }), T('Le clic affiche ON', 'Click shows ON', { pre: `${D('button')}.click()`, dom: `${D('button')}.textContent`, expect: 'ON' })] },
};
COURSES.forEach((c) => c.lessons.forEach((l) => Object.assign(l, RX[l.id] || {})));

export const SOL = {
  'js-1': 'function double(n) {\n  return n * 2;\n}',
  'js-2': 'function evens(arr) {\n  return arr.filter((n) => n % 2 === 0);\n}',
  'js-3': 'function names(users) {\n  return users.map((u) => u.name);\n}',
  'js-4': 'function grade(score) {\n  if (score >= 90) return "A";\n  if (score >= 70) return "B";\n  return "C";\n}',
  'js-5': 'function sum(arr) {\n  return arr.reduce((a, b) => a + b, 0);\n}',
  'js-6': 'function merge(a, b) {\n  return { ...a, ...b };\n}',
  'js-7': 'function counter() {\n  let n = 0;\n  return () => ++n;\n}',
  'js-8': 'function delay(ms, value) {\n  return new Promise((r) => setTimeout(() => r(value), ms));\n}',
  'js-9': 'function memoize(fn) {\n  const cache = new Map();\n  return (x) => {\n    if (!cache.has(x)) cache.set(x, fn(x));\n    return cache.get(x);\n  };\n}',
  're-1': 'function Hello() {\n  return <h1>Hello</h1>;\n}',
  're-2': "import { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}",
  're-3': 'function Greeting({ name }) {\n  return <p>Bonjour {name}</p>;\n}',
  're-4': 'function List({ items }) {\n  return (\n    <ul>\n      {items.map((x) => <li key={x}>{x}</li>)}\n    </ul>\n  );\n}',
  're-5': "import { useEffect } from 'react';\n\nexport default function Page() {\n  useEffect(() => {\n    document.title = 'Hello';\n  }, []);\n  return <h1>Hello</h1>;\n}",
  're-6': 'function Toggle() {\n  const [on, setOn] = useState(false);\n  return <button onClick={() => setOn(!on)}>{on ? "ON" : "OFF"}</button>;\n}',
  'nx-1': 'export default function About() {\n  return <h1>About</h1>;\n}',
  'nx-2': 'export default async function Page() {\n  const res = await fetch("https://api.example.com/users");\n  const users = await res.json();\n  return <h1>{users.length}</h1>;\n}',
  'nx-3': 'export default function RootLayout({ children }) {\n  return (\n    <html lang="fr">\n      <body>{children}</body>\n    </html>\n  );\n}',
  'nx-4': 'export default async function Post({ params }) {\n  const { slug } = await params;\n  return <h1>{slug}</h1>;\n}',
  'nx-5': "import Link from 'next/link';\n\nexport default function Nav() {\n  return <Link href=\"/courses\">Courses</Link>;\n}",
  'nx-6': 'export async function GET() {\n  return Response.json({ hello: "world" });\n}',
  'ex-1': "'use server';\n\nexport async function save(formData) {\n  const name = formData.get('name');\n}",
  'ex-2': 'const res = await fetch(url, { next: { revalidate: 60 } });',
  'ex-3': "import Image from 'next/image';\n\n<Image src=\"/a.png\" alt=\"A\" width={400} height={300} />",
  'ex-4': "import { NextResponse } from 'next/server';\n\nexport function middleware(req) {\n  if (!req.cookies.get('token')) {\n    return NextResponse.redirect(new URL('/login', req.url));\n  }\n}",
  'ex-5': 'function assertEqual(a, b) {\n  if (a !== b) throw new Error(`${a} !== ${b}`);\n}',
};

const Q = (fr, en, o) => ({ q: { fr, en }, o });
const B = (fr, en) => ({ fr, en });
export const EXAMS = {
  javascript: [
    Q('Que renvoie [1,2,3].map(n => n * 2) ?', 'What does [1,2,3].map(n => n * 2) return?', ['[2, 4, 6]', '6', '[1, 2, 3]']),
    Q('Quelle méthode garde seulement certains éléments ?', 'Which method keeps only some items?', ['map', 'filter', 'push']),
    Q('Une closure, c’est…', 'A closure is…', [B('un type de boucle', 'a kind of loop'), B('une erreur de syntaxe', 'a syntax error'), B('une fonction qui se souvient des variables de son contexte', 'a function that remembers variables from its scope')]),
    Q('Que vaut typeof null ?', 'What is typeof null?', ['"null"', '"object"', '"undefined"']),
    Q('Que fait await ?', 'What does await do?', [B('Attend la résolution d’une Promise', 'Waits for a Promise to resolve'), B('Arrête le programme', 'Stops the program'), B('Crée une boucle', 'Creates a loop')]),
  ],
  react: [
    Q('Quel hook garde un état local ?', 'Which hook keeps local state?', ['useMemo', 'useRoute', 'useState']),
    Q('À quoi sert key dans une liste ?', 'What is key for in a list?', [B('Identifier chaque élément', 'Identify each item'), B('Styliser l’élément', 'Style the item'), B('Trier la liste', 'Sort the list')]),
    Q('useEffect avec [] s’exécute…', 'useEffect with [] runs…', [B('à chaque frappe', 'on every keystroke'), B('une fois après le premier rendu', 'once after the first render'), B('jamais', 'never')]),
    Q('Comment passer des données à un composant enfant ?', 'How do you pass data to a child component?', [B('Par l’URL', 'Through the URL'), B('Par une variable CSS', 'Through a CSS variable'), B('Par les props', 'Through props')]),
    Q('Qu’est-ce que le JSX ?', 'What is JSX?', [B('Une syntaxe proche du HTML dans JavaScript', 'HTML-like syntax inside JavaScript'), B('Un langage de base de données', 'A database language'), B('Un framework CSS', 'A CSS framework')]),
  ],
  nextjs: [
    Q('Quel fichier crée la page /about ?', 'Which file creates the /about page?', ['app/about/page.js', 'pages/about.css', 'app/about.txt']),
    Q('Dans Next.js 15, params est…', 'In Next.js 15, params is…', [B('un nombre', 'a number'), B('une classe CSS', 'a CSS class'), B('une Promise', 'a Promise')]),
    Q('Que fait app/layout.js ?', 'What does app/layout.js do?', [B('Il gère la base de données', 'It manages the database'), B('Il enveloppe toutes les pages', 'It wraps every page'), B('Il compile le CSS', 'It compiles the CSS')]),
    Q('Quel élément navigue sans rechargement complet ?', 'Which element navigates without a full reload?', ['<a>', '<Link>', '<iframe>']),
    Q('Quel fichier crée une API ?', 'Which file creates an API?', ['app/api/data/data.css', 'app/api/data.html', 'app/api/data/route.js']),
  ],
  'nextjs-expert': [
    Q('À quoi sert "use server" ?', 'What is "use server" for?', [B('Chiffrer les cookies', 'Encrypt cookies'), B('Marquer du code qui s’exécute côté serveur', 'Mark code that runs on the server'), B('Activer le mode sombre', 'Enable dark mode')]),
    Q('revalidate: 60 signifie…', 'revalidate: 60 means…', [B('la réponse est en cache 60 secondes', 'the response is cached for 60 seconds'), B('la page expire après 60 requêtes', 'the page expires after 60 requests'), B('le serveur redémarre toutes les 60 s', 'the server restarts every 60 s')]),
    Q('Quand s’exécute middleware.js ?', 'When does middleware.js run?', [B('au build seulement', 'at build time only'), B('au clic sur un bouton', 'on a button click'), B('avant chaque requête concernée', 'before each matching request')]),
    Q('Pourquoi utiliser next/image ?', 'Why use next/image?', [B('Compresser le JavaScript', 'Compress JavaScript'), B('Optimiser les images et éviter les décalages', 'Optimize images and avoid layout shift'), B('Héberger les images', 'Host images')]),
    Q('Un test échoue quand…', 'A test fails when…', [B('une assertion lance une erreur', 'an assertion throws'), B('le code est trop court', 'the code is too short'), B('le fichier est vide', 'the file is empty')]),
  ],
};

export const isReady = (c, done) => c.lessons.every((l) => done[l.id]) && (!EXAMS[c.slug] || done['exam-' + c.slug]);
export const BADGES = [
  { id: 'first', icon: '🚀', t: B('Première leçon', 'First lesson'), test: (d) => Object.keys(d).length > 0 },
  ...COURSES.map((c) => ({ id: c.slug, icon: '🏅', t: B(`${c.title.fr} terminé`, `${c.title.en} complete`), test: (d) => isReady(c, d) })),
  { id: 'all', icon: '👑', t: B('Parcours complet', 'Full path'), test: (d) => COURSES.every((c) => isReady(c, d)) },
];

Object.assign(UI, {
  examKo: { fr: 'Il faut au moins 70 % de bonnes réponses. Réessaie.', en: 'You need at least 70% correct answers. Try again.' },
  login: { fr: 'Connexion', en: 'Log in' }, register: { fr: 'Créer un compte', en: 'Sign up' }, logout: { fr: 'Déconnexion', en: 'Log out' },
  email: { fr: 'E-mail', en: 'Email' }, password: { fr: 'Mot de passe (8 caractères min.)', en: 'Password (min. 8 characters)' }, fullName: { fr: 'Nom complet (affiché sur le certificat)', en: 'Full name (shown on the certificate)' },
  loginReq: { fr: 'Connecte-toi pour passer l’examen et obtenir ton certificat.', en: 'Log in to take the exam and get your certificate.' },
  syncErr: { fr: 'Erreur de synchronisation : réessaie dans un instant.', en: 'Sync error: try again in a moment.' },
  errCreds: { fr: 'E-mail ou mot de passe incorrect.', en: 'Wrong email or password.' }, errExists: { fr: 'Ce compte existe déjà.', en: 'This account already exists.' }, errInvalid: { fr: 'Vérifie les champs saisis.', en: 'Check the fields.' },
  verifyTitle: { fr: 'Vérifier un certificat', en: 'Verify a certificate' }, valid: { fr: 'Certificat authentique', en: 'Authentic certificate' }, invalid: { fr: 'Certificat introuvable', en: 'Certificate not found' },
  issued: { fr: 'délivré le', en: 'issued on' }, verifyUrl: { fr: 'Lien de vérification', en: 'Verification link' },
});

// ---- Lot 2 : leçons avancées et expert ----
const R = (l, x) => Object.assign(l, x);
const dq = (s) => `document.querySelector('${s}')`;

add('javascript',
  L('js-10', 'Grouper des données', 'Grouping data', 'Écris `groupBy(arr, fn)` : renvoie un objet dont les clés sont les résultats de `fn` et les valeurs les tableaux d’éléments correspondants.', 'Write `groupBy(arr, fn)`: return an object whose keys are the results of `fn` and whose values are the matching item arrays.',
    'function groupBy(arr, fn) {\n  // ton code ici\n}', [T('Pairs et impairs', 'Odd and even', { expr: 'groupBy([1,2,3,4], (n) => (n % 2 ? "odd" : "even"))', expect: { odd: [1, 3], even: [2, 4] } }), T('Tableau vide → {}', 'Empty array → {}', { expr: 'groupBy([], (x) => x)', expect: {} })]),
  L('js-11', 'Composition de fonctions', 'Function composition', 'Écris `compose(...fns)` : renvoie une fonction qui applique les fonctions de droite à gauche.', 'Write `compose(...fns)`: return a function that applies the functions from right to left.',
    'function compose(...fns) {\n  // ton code ici\n}', [T('compose(+1, ×2)(5) → 11', 'compose(+1, ×2)(5) → 11', { expr: 'compose((x) => x + 1, (x) => x * 2)(5)', expect: 11 }), T('Sans fonction → identité', 'No functions → identity', { expr: 'compose()(7)', expect: 7 })]),
  L('js-12', 'Réessayer une opération', 'Retrying an operation', 'Écris `async function retry(fn, times)` : rappelle `fn` jusqu’à ce qu’elle réussisse, avec au plus `times` essais ; si tous échouent, relance la dernière erreur.', 'Write `async function retry(fn, times)`: call `fn` again until it succeeds, with at most `times` attempts; if all fail, rethrow the last error.',
    'async function retry(fn, times) {\n  // ton code ici\n}', [T('Réussit au 3e essai', 'Succeeds on attempt 3', { expr: '(async () => { let n = 0; const r = await retry(async () => { n++; if (n < 3) throw new Error("x"); return "ok"; }, 5); return [r, n]; })()', expect: ['ok', 3] }), T('Échoue après 2 essais', 'Fails after 2 attempts', { expr: '(async () => { try { await retry(async () => { throw new Error("x"); }, 2); } catch (e) { return "failed"; } return "no"; })()', expect: 'failed' })]),
  L('js-13', 'Aplatir récursivement', 'Deep flatten', 'Écris `flatten(arr)` qui aplatit un tableau imbriqué à toutes les profondeurs.', 'Write `flatten(arr)` that flattens a nested array at every depth.',
    'function flatten(arr) {\n  // ton code ici\n}', [T('[1,[2,[3,[4]]]] → [1,2,3,4]', '[1,[2,[3,[4]]]] → [1,2,3,4]', { expr: 'flatten([1,[2,[3,[4]]]])', expect: [1, 2, 3, 4] }), T('Tableau plat inchangé', 'Flat array unchanged', { expr: 'flatten([1,2])', expect: [1, 2] })]),
);

add('react',
  R(L('re-7', 'Champ contrôlé', 'Controlled input', 'Écris `Echo` : un `<input>` contrôlé par `useState` et un `<p>` qui affiche ce qui est tapé.', 'Write `Echo`: an `<input>` controlled with `useState` and a `<p>` that shows what is typed.', 'function Echo() {\n  // ton code ici\n}', []),
    { react: true, component: 'Echo', tests: [T('Le <p> suit la saisie', 'The <p> follows typing', { pre: `const i = ${dq('input')}; Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(i, 'Ama'); i.dispatchEvent(new Event('input', { bubbles: true }))`, dom: `${dq('p')}.textContent`, expect: 'Ama' }), T('L’input est contrôlé (value=)', 'The input is controlled (value=)', { match: '<input[^>]*value=' })] }),
  R(L('re-8', 'Rendu conditionnel', 'Conditional rendering', 'Écris `Status({ online })` : un `<p>` qui affiche ON si `online` est vrai, sinon OFF.', 'Write `Status({ online })`: a `<p>` showing ON if `online` is true, otherwise OFF.', 'function Status({ online }) {\n  // ton code ici\n}', []),
    { react: true, component: 'Status', props: { online: true }, tests: [T('online → ON', 'online → ON', { dom: `${dq('p')}.textContent`, expect: 'ON' }), T('Le cas OFF existe', 'The OFF case exists', { match: 'OFF' })] }),
  R(L('re-9', 'useReducer', 'useReducer', 'Écris `Stepper` avec `useReducer` : deux boutons (+ puis −) et un `<span>` qui affiche la valeur, qui démarre à 0.', 'Write `Stepper` with `useReducer`: two buttons (+ then −) and a `<span>` showing the value, starting at 0.', 'function Stepper() {\n  // ton code ici\n}', []),
    { react: true, component: 'Stepper', tests: [T('Démarre à 0', 'Starts at 0', { dom: `${dq('span')}.textContent`, expect: '0' }), T('Deux clics sur + → 2', 'Two clicks on + → 2', { pre: ["document.querySelectorAll('button')[0].click()", "document.querySelectorAll('button')[0].click()"], dom: `${dq('span')}.textContent`, expect: '2' }), T('Un clic sur − → 1', 'One click on − → 1', { pre: "document.querySelectorAll('button')[1].click()", dom: `${dq('span')}.textContent`, expect: '1' }), T('useReducer est utilisé', 'useReducer is used', { match: 'useReducer\\(' })] }),
  R(L('re-10', 'Hook personnalisé', 'Custom hook', 'Écris un hook `useToggle(initial)` qui renvoie `[valeur, basculer]`, puis `Panel` : un bouton qui affiche "closed" puis "open" à chaque clic.', 'Write a `useToggle(initial)` hook that returns `[value, toggle]`, then `Panel`: a button that shows "closed" then "open" on each click.', 'function useToggle(initial = false) {\n  // ton code ici\n}\n\nfunction Panel() {\n  // ton code ici\n}', []),
    { react: true, component: 'Panel', tests: [T('Affiche closed', 'Shows closed', { dom: `${dq('button')}.textContent`, expect: 'closed' }), T('Le clic affiche open', 'Click shows open', { pre: `${dq('button')}.click()`, dom: `${dq('button')}.textContent`, expect: 'open' }), T('Le hook useToggle existe', 'The useToggle hook exists', { match: 'function\\s+useToggle' })] }),
);

add('nextjs-expert',
  L('ex-6', 'Server et Client Components', 'Server and Client Components', 'Par défaut, un composant est un Server Component. Ajoute `"use client"` tout en haut du fichier pour pouvoir utiliser `useState`.', 'By default a component is a Server Component. Add `"use client"` at the very top of the file to use `useState`.',
    '// app/Counter.js\n', [T('"use client" en première ligne', '"use client" on the first line', { match: '^\\s*["\']use client["\']' }), T('useState(', 'useState(', { match: 'useState\\(' })]),
  L('ex-7', 'Métadonnées et SEO', 'Metadata and SEO', 'Exporte `metadata` depuis une page pour définir le `title` et la `description` de l’onglet et des moteurs de recherche.', 'Export `metadata` from a page to set the `title` and `description` for the tab and search engines.',
    '// app/about/page.js\n', [T('export const metadata', 'export const metadata', { match: 'export\\s+const\\s+metadata' }), T('title', 'title', { match: 'title\\s*:' }), T('description', 'description', { match: 'description\\s*:' })]),
  L('ex-8', 'Streaming avec Suspense', 'Streaming with Suspense', 'Importe `Suspense` depuis `react` et entoure un composant lent avec `<Suspense fallback={...}>` pour afficher le reste de la page sans attendre.', 'Import `Suspense` from `react` and wrap a slow component in `<Suspense fallback={...}>` to show the rest of the page without waiting.',
    '', [T('Import de Suspense', 'Suspense import', { match: 'import\\s*\\{[^}]*Suspense[^}]*\\}\\s*from\\s*["\']react["\']' }), T('<Suspense fallback=…>', '<Suspense fallback=…>', { match: '<Suspense[^>]*fallback=' })]),
  L('ex-9', 'Internationalisation', 'Internationalization', 'Dans `app/[lang]/page.js`, lis `lang` avec `await params` et affiche "Bonjour" si `lang === "fr"`, sinon "Hello".', 'In `app/[lang]/page.js`, read `lang` with `await params` and render "Bonjour" if `lang === "fr"`, otherwise "Hello".',
    '// app/[lang]/page.js\n', [T('const { lang } = await params', 'const { lang } = await params', { match: '\\{\\s*lang\\s*\\}\\s*=\\s*await\\s+params' }), T('Compare lang à "fr"', 'Compares lang to "fr"', { match: 'lang\\s*===\\s*["\']fr["\']' })]),
  L('ex-10', 'Pages introuvables', 'Not-found pages', 'Importe `notFound` depuis `next/navigation` et appelle `notFound()` quand une donnée n’existe pas.', 'Import `notFound` from `next/navigation` and call `notFound()` when a record does not exist.',
    '', [T('Import de notFound', 'notFound import', { match: 'from\\s+["\']next/navigation["\']' }), T('Appel notFound()', 'notFound() call', { match: 'notFound\\(\\)' })]),
  L('ex-11', 'Formulaires et Server Actions', 'Forms and Server Actions', 'Branche une Server Action à un formulaire : `<form action={save}>`, avec `"use server"` dans l’action.', 'Wire a Server Action to a form: `<form action={save}>`, with `"use server"` inside the action.',
    '', [T('"use server"', '"use server"', { match: '["\']use server["\']' }), T('<form action={…}>', '<form action={…}>', { match: '<form[^>]*action=\\{' })]),
);

Object.assign(SOL, {
  'js-10': 'function groupBy(arr, fn) {\n  return arr.reduce((acc, x) => {\n    const k = fn(x);\n    (acc[k] ||= []).push(x);\n    return acc;\n  }, {});\n}',
  'js-11': 'function compose(...fns) {\n  return (x) => fns.reduceRight((acc, f) => f(acc), x);\n}',
  'js-12': 'async function retry(fn, times) {\n  for (let i = 1; ; i++) {\n    try {\n      return await fn();\n    } catch (e) {\n      if (i >= times) throw e;\n    }\n  }\n}',
  'js-13': 'function flatten(arr) {\n  return arr.reduce((a, x) => a.concat(Array.isArray(x) ? flatten(x) : x), []);\n}',
  're-7': 'function Echo() {\n  const [text, setText] = useState("");\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <p>{text}</p>\n    </div>\n  );\n}',
  're-8': 'function Status({ online }) {\n  return <p>{online ? "ON" : "OFF"}</p>;\n}',
  're-9': 'function Stepper() {\n  const [n, dispatch] = useReducer((s, a) => (a === "+" ? s + 1 : s - 1), 0);\n  return (\n    <div>\n      <button onClick={() => dispatch("+")}>+</button>\n      <button onClick={() => dispatch("-")}>-</button>\n      <span>{n}</span>\n    </div>\n  );\n}',
  're-10': 'function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  return [on, () => setOn(!on)];\n}\n\nfunction Panel() {\n  const [open, toggle] = useToggle();\n  return <button onClick={toggle}>{open ? "open" : "closed"}</button>;\n}',
  'ex-6': '"use client";\n\nimport { useState } from "react";\n\nexport default function Counter() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}',
  'ex-7': 'export const metadata = {\n  title: "À propos",\n  description: "Qui sommes-nous ?",\n};',
  'ex-8': 'import { Suspense } from "react";\n\nexport default function Page() {\n  return (\n    <Suspense fallback={<p>Chargement…</p>}>\n      <SlowList />\n    </Suspense>\n  );\n}',
  'ex-9': 'export default async function Page({ params }) {\n  const { lang } = await params;\n  return <h1>{lang === "fr" ? "Bonjour" : "Hello"}</h1>;\n}',
  'ex-10': 'import { notFound } from "next/navigation";\n\nexport default async function Page({ params }) {\n  const post = await getPost((await params).slug);\n  if (!post) notFound();\n  return <h1>{post.title}</h1>;\n}',
  'ex-11': 'export default function Page() {\n  async function save(formData) {\n    "use server";\n    const name = formData.get("name");\n  }\n  return (\n    <form action={save}>\n      <input name="name" />\n      <button>OK</button>\n    </form>\n  );\n}',
});

// ---- Lot 3 : bases de JavaScript pour débutants (placées au début du cours) ----
const jsCourse = COURSES.find((c) => c.slug === 'javascript');
const J = (id, fr, en, bFr, bEn, starter, tests) => L(id, fr, en, bFr, bEn, starter, tests);
const fn = (name, args) => `function ${name}(${args}) {\n  // ton code ici\n}`;
jsCourse.lessons.unshift(
  J('jb-1', 'Texte et fonctions', 'Text and functions', 'Une fonction se déclare avec `function nom(paramètres) { return … }`. Le `+` colle deux textes. Écris `greet(name)` qui renvoie "Bonjour, " suivi du nom et de " !".', 'A function is declared with `function name(params) { return … }`. The `+` glues two strings. Write `greet(name)` that returns "Bonjour, " followed by the name and " !".',
    fn('greet', 'name'), [T('greet("Ama")', 'greet("Ama")', { expr: 'greet("Ama")', expect: 'Bonjour, Ama !' }), T('greet("Kofi")', 'greet("Kofi")', { expr: 'greet("Kofi")', expect: 'Bonjour, Kofi !' })]),
  J('jb-2', 'Méthodes de texte', 'String methods', 'Un texte a des méthodes comme `toUpperCase()`, et on lit une lettre avec `texte[0]`. Écris `initials(first, last)` qui renvoie les initiales en majuscules.', 'A string has methods like `toUpperCase()`, and you read a letter with `text[0]`. Write `initials(first, last)` that returns the initials in uppercase.',
    fn('initials', 'first, last'), [T('initials("ama","kofi") → "AK"', 'initials("ama","kofi") → "AK"', { expr: 'initials("ama","kofi")', expect: 'AK' }), T('Déjà en majuscules', 'Already uppercase', { expr: 'initials("Zoe","Lee")', expect: 'ZL' })]),
  J('jb-3', 'Nombres et reste', 'Numbers and remainder', 'L’opérateur `%` donne le reste d’une division. Écris `isEven(n)` qui renvoie `true` si `n` est pair, sinon `false`.', 'The `%` operator gives the remainder of a division. Write `isEven(n)` that returns `true` if `n` is even, otherwise `false`.',
    fn('isEven', 'n'), [T('isEven(4) → true', 'isEven(4) → true', { expr: 'isEven(4)', expect: true }), T('isEven(7) → false', 'isEven(7) → false', { expr: 'isEven(7)', expect: false }), T('isEven(0) → true', 'isEven(0) → true', { expr: 'isEven(0)', expect: true })]),
  J('jb-4', 'Logique booléenne', 'Boolean logic', '`&&` signifie « et », `||` signifie « ou ». Écris `canVote(age, hasId)` : vrai seulement si `age` ≥ 18 **et** `hasId` est vrai.', '`&&` means “and”, `||` means “or”. Write `canVote(age, hasId)`: true only if `age` ≥ 18 **and** `hasId` is true.',
    fn('canVote', 'age, hasId'), [T('canVote(20, true)', 'canVote(20, true)', { expr: 'canVote(20, true)', expect: true }), T('canVote(17, true)', 'canVote(17, true)', { expr: 'canVote(17, true)', expect: false }), T('canVote(30, false)', 'canVote(30, false)', { expr: 'canVote(30, false)', expect: false })]),
  J('jb-5', 'Limiter une valeur', 'Clamping a value', '`Math.min` et `Math.max` renvoient le plus petit et le plus grand de leurs arguments. Écris `clamp(n, min, max)` qui garde `n` entre `min` et `max`.', '`Math.min` and `Math.max` return the smallest and largest of their arguments. Write `clamp(n, min, max)` that keeps `n` between `min` and `max`.',
    fn('clamp', 'n, min, max'), [T('clamp(15, 0, 10) → 10', 'clamp(15, 0, 10) → 10', { expr: 'clamp(15, 0, 10)', expect: 10 }), T('clamp(-5, 0, 10) → 0', 'clamp(-5, 0, 10) → 0', { expr: 'clamp(-5, 0, 10)', expect: 0 }), T('clamp(5, 0, 10) → 5', 'clamp(5, 0, 10) → 5', { expr: 'clamp(5, 0, 10)', expect: 5 })]),
  J('jb-6', 'La boucle for', 'The for loop', 'Une boucle `for (let i = 1; i <= n; i++)` répète un bloc. Écris `countTo(n)` qui renvoie le tableau `[1, 2, …, n]` (utilise `push`).', 'A `for (let i = 1; i <= n; i++)` loop repeats a block. Write `countTo(n)` that returns the array `[1, 2, …, n]` (use `push`).',
    fn('countTo', 'n'), [T('countTo(3) → [1,2,3]', 'countTo(3) → [1,2,3]', { expr: 'countTo(3)', expect: [1, 2, 3] }), T('countTo(0) → []', 'countTo(0) → []', { expr: 'countTo(0)', expect: [] })]),
  J('jb-7', 'Inverser un texte', 'Reversing a string', 'On enchaîne les méthodes : `split("")` découpe en lettres, `reverse()` inverse un tableau, `join("")` recolle. Écris `reverse(str)`.', 'Methods chain: `split("")` cuts into letters, `reverse()` reverses an array, `join("")` glues back. Write `reverse(str)`.',
    fn('reverse', 'str'), [T('reverse("abc") → "cba"', 'reverse("abc") → "cba"', { expr: 'reverse("abc")', expect: 'cba' }), T('reverse("") → ""', 'reverse("") → ""', { expr: 'reverse("")', expect: '' })]),
  J('jb-8', 'Compter les voyelles', 'Counting vowels', 'Parcours le texte avec `for (const ch of str)` et teste chaque lettre avec `"aeiou".includes(ch)`. Écris `countVowels(str)` (en minuscules ou majuscules).', 'Walk through the text with `for (const ch of str)` and test each letter with `"aeiou".includes(ch)`. Write `countVowels(str)` (lowercase or uppercase).',
    fn('countVowels', 'str'), [T('countVowels("banana") → 3', 'countVowels("banana") → 3', { expr: 'countVowels("banana")', expect: 3 }), T('countVowels("HELLO") → 2', 'countVowels("HELLO") → 2', { expr: 'countVowels("HELLO")', expect: 2 }), T('countVowels("rhythm") → 0', 'countVowels("rhythm") → 0', { expr: 'countVowels("rhythm")', expect: 0 })]),
  J('jb-9', 'Le dernier élément', 'The last item', 'Un tableau se lit par indice : `arr[0]` est le premier, `arr.length - 1` donne l’indice du dernier. Écris `lastItem(arr)` ; pour un tableau vide, renvoie `undefined`.', 'An array is read by index: `arr[0]` is the first, `arr.length - 1` gives the last index. Write `lastItem(arr)`; for an empty array, return `undefined`.',
    fn('lastItem', 'arr'), [T('lastItem([1,2,3]) → 3', 'lastItem([1,2,3]) → 3', { expr: 'lastItem([1,2,3])', expect: 3 }), T('Tableau vide → undefined', 'Empty array → undefined', { expr: 'lastItem([]) === undefined', expect: true })]),
  J('jb-10', 'Créer un objet', 'Creating an object', 'Un objet regroupe des propriétés : `{ name: "Ama", age: 20 }`. Écris `makeUser(name, age)` qui renvoie `{ name, age, adult }` où `adult` vaut `true` si `age` ≥ 18.', 'An object groups properties: `{ name: "Ama", age: 20 }`. Write `makeUser(name, age)` that returns `{ name, age, adult }` where `adult` is `true` if `age` ≥ 18.',
    fn('makeUser', 'name, age'), [T('makeUser("Ama", 20)', 'makeUser("Ama", 20)', { expr: 'makeUser("Ama", 20)', expect: { name: 'Ama', age: 20, adult: true } }), T('makeUser("Kojo", 12)', 'makeUser("Kojo", 12)', { expr: 'makeUser("Kojo", 12)', expect: { name: 'Kojo', age: 12, adult: false } })]),
  J('jb-11', 'Paramètres rest', 'Rest parameters', '`...nums` récupère tous les arguments dans un tableau. Écris `sumAll(...nums)` qui renvoie leur somme (0 s’il n’y en a aucun).', '`...nums` collects all arguments into an array. Write `sumAll(...nums)` that returns their sum (0 if there are none).',
    'function sumAll(...nums) {\n  // ton code ici\n}', [T('sumAll(1, 2, 3) → 6', 'sumAll(1, 2, 3) → 6', { expr: 'sumAll(1, 2, 3)', expect: 6 }), T('sumAll() → 0', 'sumAll() → 0', { expr: 'sumAll()', expect: 0 })]),
  J('jb-12', 'Les callbacks', 'Callbacks', 'On peut passer une fonction à une autre fonction. Écris `repeat(n, fn)` qui appelle `fn(i)` pour `i` de 0 à `n - 1`.', 'You can pass a function to another function. Write `repeat(n, fn)` that calls `fn(i)` for `i` from 0 to `n - 1`.',
    fn('repeat', 'n, fn'), [T('repeat(3, push) → [0,1,2]', 'repeat(3, push) → [0,1,2]', { expr: '(() => { const r = []; repeat(3, (i) => r.push(i)); return r; })()', expect: [0, 1, 2] }), T('repeat(0, …) n’appelle rien', 'repeat(0, …) calls nothing', { expr: '(() => { let c = 0; repeat(0, () => c++); return c; })()', expect: 0 })]),
  J('jb-13', 'Trier sans casser', 'Sorting safely', '`sort` modifie le tableau d’origine. Copie-le d’abord avec `[...people]`. Écris `sortByAge(people)` qui renvoie une copie triée par `age` croissant.', '`sort` mutates the original array. Copy it first with `[...people]`. Write `sortByAge(people)` that returns a copy sorted by ascending `age`.',
    fn('sortByAge', 'people'), [T('Trie par âge', 'Sorts by age', { expr: 'sortByAge([{n:"a",age:30},{n:"b",age:20}]).map((p) => p.n)', expect: ['b', 'a'] }), T('Ne modifie pas l’original', 'Does not mutate the original', { expr: '(() => { const p = [{n:"a",age:30},{n:"b",age:20}]; sortByAge(p); return p[0].n; })()', expect: 'a' })]),
  J('jb-14', 'Gérer les erreurs', 'Handling errors', '`JSON.parse` lance une erreur si le texte est invalide. Entoure-le d’un `try { … } catch { … }`. Écris `safeParse(text)` qui renvoie l’objet, ou `null` si le texte est invalide.', '`JSON.parse` throws if the text is invalid. Wrap it in `try { … } catch { … }`. Write `safeParse(text)` that returns the object, or `null` if the text is invalid.',
    fn('safeParse', 'text'), [T('JSON valide', 'Valid JSON', { expr: 'safeParse("{\\"a\\":1}")', expect: { a: 1 } }), T('Texte invalide → null', 'Invalid text → null', { expr: 'safeParse("oops")', expect: null })]),
);

Object.assign(SOL, {
  'jb-1': 'function greet(name) {\n  return "Bonjour, " + name + " !";\n}',
  'jb-2': 'function initials(first, last) {\n  return (first[0] + last[0]).toUpperCase();\n}',
  'jb-3': 'function isEven(n) {\n  return n % 2 === 0;\n}',
  'jb-4': 'function canVote(age, hasId) {\n  return age >= 18 && hasId;\n}',
  'jb-5': 'function clamp(n, min, max) {\n  return Math.min(Math.max(n, min), max);\n}',
  'jb-6': 'function countTo(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) out.push(i);\n  return out;\n}',
  'jb-7': 'function reverse(str) {\n  return str.split("").reverse().join("");\n}',
  'jb-8': 'function countVowels(str) {\n  let n = 0;\n  for (const ch of str.toLowerCase()) {\n    if ("aeiou".includes(ch)) n++;\n  }\n  return n;\n}',
  'jb-9': 'function lastItem(arr) {\n  return arr[arr.length - 1];\n}',
  'jb-10': 'function makeUser(name, age) {\n  return { name, age, adult: age >= 18 };\n}',
  'jb-11': 'function sumAll(...nums) {\n  let total = 0;\n  for (const n of nums) total += n;\n  return total;\n}',
  'jb-12': 'function repeat(n, fn) {\n  for (let i = 0; i < n; i++) fn(i);\n}',
  'jb-13': 'function sortByAge(people) {\n  return [...people].sort((a, b) => a.age - b.age);\n}',
  'jb-14': 'function safeParse(text) {\n  try {\n    return JSON.parse(text);\n  } catch {\n    return null;\n  }\n}',
});

EXAMS.javascript.push(
  Q('Que renvoie "5" + 3 en JavaScript ?', 'What does "5" + 3 return in JavaScript?', ['8', '"53"', 'NaN']),
  Q('Quelle boucle convient pour parcourir un tableau ?', 'Which loop suits walking through an array?', ['for...of', 'if...else', 'switch']),
  Q('Que fait JSON.parse sur un texte invalide ?', 'What does JSON.parse do with invalid text?', [B('Il renvoie null', 'It returns null'), B('Il lance une erreur', 'It throws an error'), B('Il renvoie undefined', 'It returns undefined')]),
);

// ---- Lot 4 : React (rendu réel dans le navigateur) ----
const typeInto = (sel, v) => `{ const i = document.querySelector('${sel}'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(i, '${v}'); i.dispatchEvent(new Event('input', { bubbles: true })); }`;
const RE = (id, fr, en, bFr, bEn, starter, component, props, tests) => R(L(id, fr, en, bFr, bEn, starter, []), { react: true, component, props, tests });
add('react',
  RE('re-11', 'Children et composition', 'Children and composition', 'La prop spéciale `children` contient ce qu’on place entre les balises. Écris `Card({ title, children })` : un `<h2>` avec le titre, puis les enfants.', 'The special `children` prop holds whatever is placed between the tags. Write `Card({ title, children })`: an `<h2>` with the title, then the children.',
    'function Card() {\n  // ton code ici\n}', 'Card', { title: 'Hi', children: 'Body' },
    [T('Le titre est dans un <h2>', 'The title is in an <h2>', { dom: `${dq('h2')}.textContent`, expect: 'Hi' }), T('Les enfants sont affichés', 'The children are rendered', { dom: "document.body.textContent.includes('Body')", expect: true })]),
  RE('re-12', 'Formulaires', 'Forms', 'Gère un formulaire : un `<input>` contrôlé et un `onSubmit` qui appelle `e.preventDefault()` puis affiche dans un `<p>` « Bienvenue, » suivi de l’e-mail saisi. Écris `Login`.', 'Handle a form: a controlled `<input>` and an `onSubmit` that calls `e.preventDefault()` then shows in a `<p>` “Bienvenue, ” followed by the typed email. Write `Login`.',
    'function Login() {\n  // ton code ici\n}', 'Login', {},
    [T('Avant l’envoi : pas de message', 'Before submit: no message', { dom: `!${dq('p')} || ${dq('p')}.textContent === ''`, expect: true }), T('Après l’envoi : message', 'After submit: message', { pre: [typeInto('input', 'ama@x.com'), "document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))"], dom: `${dq('p')}.textContent`, expect: 'Bienvenue, ama@x.com' }), T('preventDefault est appelé', 'preventDefault is called', { match: 'preventDefault\\(' })]),
  RE('re-13', 'Liste dynamique', 'Dynamic list', 'Écris `Todo` : un `<input>`, un bouton « Ajouter » et une liste `<ul>`. Chaque clic ajoute le texte saisi comme un `<li>` (n’oublie pas la `key`).', 'Write `Todo`: an `<input>`, an “Add” button and a `<ul>` list. Each click adds the typed text as an `<li>` (do not forget the `key`).',
    'function Todo() {\n  // ton code ici\n}', 'Todo', {},
    [T('Liste vide au départ', 'Empty list at start', { dom: "document.querySelectorAll('li').length", expect: 0 }), T('Deux ajouts → deux <li>', 'Two adds → two <li>', { pre: [typeInto('input', 'A'), "document.querySelector('button').click()", typeInto('input', 'B'), "document.querySelector('button').click()"], dom: "document.querySelectorAll('li').length", expect: 2 }), T('Le premier est « A »', 'The first one is “A”', { dom: `${dq('li')}.textContent`, expect: 'A' })]),
  RE('re-14', 'Données dérivées', 'Derived data', 'Ne stocke pas ce qu’on peut calculer. Écris `Cart({ items })` : un `<strong>` qui affiche la somme des `price` des articles.', 'Do not store what you can compute. Write `Cart({ items })`: a `<strong>` showing the sum of the items’ `price`.',
    'function Cart() {\n  // ton code ici\n}', 'Cart', { items: [{ name: 'a', price: 2 }, { name: 'b', price: 3 }] },
    [T('Total = 5', 'Total = 5', { dom: `${dq('strong')}.textContent`, expect: '5' })]),
  RE('re-15', 'Remonter l’état', 'Lifting state up', 'L’état vit dans le parent. Écris `Display({ value })` (un `<p>`) et `Parent` : il garde `n` avec `useState(0)`, affiche `<Display value={n} />` et un bouton qui ajoute 1.', 'State lives in the parent. Write `Display({ value })` (a `<p>`) and `Parent`: it keeps `n` with `useState(0)`, renders `<Display value={n} />` and a button that adds 1.',
    'function Display() {\n  // ton code ici\n}\n\nfunction Parent() {\n  // ton code ici\n}', 'Parent', {},
    [T('Affiche 0', 'Shows 0', { dom: `${dq('p')}.textContent`, expect: '0' }), T('Le clic passe à 1', 'Click goes to 1', { pre: `${dq('button')}.click()`, dom: `${dq('p')}.textContent`, expect: '1' }), T('Parent utilise <Display', 'Parent uses <Display', { match: '<Display' })]),
  RE('re-16', 'useRef', 'useRef', 'Un `useRef` garde une valeur entre deux rendus sans en provoquer. Écris `Prev` : un bouton qui augmente `n`, et un `<p>` au format `now:N prev:M` où `M` est la valeur précédente (vide au début).', 'A `useRef` keeps a value across renders without causing one. Write `Prev`: a button that increments `n`, and a `<p>` in the format `now:N prev:M` where `M` is the previous value (empty at first).',
    'function Prev() {\n  // ton code ici\n}', 'Prev', {},
    [T('Départ : now:0 prev:', 'Start: now:0 prev:', { dom: `${dq('p')}.textContent`, expect: 'now:0 prev:' }), T('Deux clics : now:2 prev:1', 'Two clicks: now:2 prev:1', { pre: [`${dq('button')}.click()`, `${dq('button')}.click()`], dom: `${dq('p')}.textContent`, expect: 'now:2 prev:1' }), T('useRef est utilisé', 'useRef is used', { match: 'useRef\\(' })]),
  RE('re-17', 'Filtrer en direct', 'Live filtering', 'Écris `Search({ items })` : un `<input>` et une liste `<ul>` qui n’affiche que les éléments contenant le texte saisi.', 'Write `Search({ items })`: an `<input>` and a `<ul>` list showing only the items that contain the typed text.',
    'function Search() {\n  // ton code ici\n}', 'Search', { items: ['apple', 'banana', 'avocado'] },
    [T('3 éléments au départ', '3 items at start', { dom: "document.querySelectorAll('li').length", expect: 3 }), T('« ap » → 1 élément', '“ap” → 1 item', { pre: typeInto('input', 'ap'), dom: "document.querySelectorAll('li').length", expect: 1 }), T('C’est « apple »', 'It is “apple”', { dom: `${dq('li')}.textContent`, expect: 'apple' })]),
  RE('re-18', 'Le contexte', 'Context', 'Le contexte évite de passer une prop à chaque niveau. Crée `ThemeContext` avec `createContext`, un composant `Badge` qui lit la valeur avec `useContext` dans un `<p>`, et `App` qui fournit "dark" via `ThemeContext.Provider`.', 'Context avoids passing a prop at every level. Create `ThemeContext` with `createContext`, a `Badge` component reading the value with `useContext` in a `<p>`, and `App` providing "dark" through `ThemeContext.Provider`.',
    'const ThemeContext = createContext("light");\n\nfunction Badge() {\n  // ton code ici\n}\n\nfunction App() {\n  // ton code ici\n}', 'App', {},
    [T('Badge affiche dark', 'Badge shows dark', { dom: `${dq('p')}.textContent`, expect: 'dark' }), T('useContext est utilisé', 'useContext is used', { match: 'useContext\\(' })]),
  RE('re-19', 'Supprimer sans muter', 'Removing without mutating', 'Écris `Removable` : une liste `a`, `b`, `c` en état, chaque `<li>` a un bouton qui le retire. Utilise `filter`, jamais `splice`.', 'Write `Removable`: a list `a`, `b`, `c` kept in state, each `<li>` has a button that removes it. Use `filter`, never `splice`.',
    'function Removable() {\n  // ton code ici\n}', 'Removable', {},
    [T('3 éléments au départ', '3 items at start', { dom: "document.querySelectorAll('li').length", expect: 3 }), T('Supprimer le premier', 'Remove the first one', { pre: "document.querySelector('li button').click()", dom: "document.querySelectorAll('li').length", expect: 2 }), T('Le premier restant est « b »', 'The first remaining is “b”', { dom: `${dq('li')}.textContent.startsWith('b')`, expect: true }), T('filter est utilisé', 'filter is used', { match: '\\.filter\\(' })]),
  RE('re-20', 'Accordéon', 'Accordion', 'Écris `Accordion` : un bouton « Détails » qui affiche ou cache un `<p>` à chaque clic (le `<p>` n’existe pas dans le DOM quand c’est fermé).', 'Write `Accordion`: a “Details” button that shows or hides a `<p>` on each click (the `<p>` is not in the DOM while closed).',
    'function Accordion() {\n  // ton code ici\n}', 'Accordion', {},
    [T('Fermé au départ', 'Closed at start', { dom: "document.querySelectorAll('p').length", expect: 0 }), T('Un clic ouvre', 'One click opens', { pre: `${dq('button')}.click()`, dom: "document.querySelectorAll('p').length", expect: 1 }), T('Un second clic ferme', 'A second click closes', { pre: `${dq('button')}.click()`, dom: "document.querySelectorAll('p').length", expect: 0 })]),
);

Object.assign(SOL, {
  're-11': 'function Card({ title, children }) {\n  return (\n    <div>\n      <h2>{title}</h2>\n      {children}\n    </div>\n  );\n}',
  're-12': 'function Login() {\n  const [email, setEmail] = useState("");\n  const [sent, setSent] = useState(false);\n  return (\n    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      {sent && <p>Bienvenue, {email}</p>}\n    </form>\n  );\n}',
  're-13': 'function Todo() {\n  const [text, setText] = useState("");\n  const [items, setItems] = useState([]);\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <button onClick={() => setItems([...items, text])}>Ajouter</button>\n      <ul>{items.map((x, i) => <li key={i}>{x}</li>)}</ul>\n    </div>\n  );\n}',
  're-14': 'function Cart({ items }) {\n  const total = items.reduce((s, x) => s + x.price, 0);\n  return <strong>{total}</strong>;\n}',
  're-15': 'function Display({ value }) {\n  return <p>{value}</p>;\n}\n\nfunction Parent() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <Display value={n} />\n      <button onClick={() => setN(n + 1)}>+1</button>\n    </div>\n  );\n}',
  're-16': 'function Prev() {\n  const [n, setN] = useState(0);\n  const prev = useRef();\n  useEffect(() => { prev.current = n; });\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>+</button>\n      <p>now:{n} prev:{prev.current}</p>\n    </div>\n  );\n}',
  're-17': 'function Search({ items }) {\n  const [q, setQ] = useState("");\n  return (\n    <div>\n      <input value={q} onChange={(e) => setQ(e.target.value)} />\n      <ul>{items.filter((x) => x.includes(q)).map((x) => <li key={x}>{x}</li>)}</ul>\n    </div>\n  );\n}',
  're-18': 'const ThemeContext = createContext("light");\n\nfunction Badge() {\n  const theme = useContext(ThemeContext);\n  return <p>{theme}</p>;\n}\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Badge />\n    </ThemeContext.Provider>\n  );\n}',
  're-19': 'function Removable() {\n  const [items, setItems] = useState(["a", "b", "c"]);\n  return (\n    <ul>\n      {items.map((x) => (\n        <li key={x}>{x}<button onClick={() => setItems(items.filter((y) => y !== x))}>x</button></li>\n      ))}\n    </ul>\n  );\n}',
  're-20': 'function Accordion() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(!open)}>Détails</button>\n      {open && <p>Contenu</p>}\n    </div>\n  );\n}',
});

EXAMS.react.push(
  Q('Pourquoi ne pas modifier directement un tableau d’état ?', 'Why not mutate a state array directly?', [B('React ne détecte pas le changement', 'React cannot detect the change'), B('JavaScript l’interdit', 'JavaScript forbids it'), B('Le navigateur plante', 'The browser crashes')]),
  Q('Quel hook lit une valeur sans passer les props à chaque niveau ?', 'Which hook reads a value without passing props at every level?', ['useRef', 'useContext', 'useMemo']),
  Q('Comment un enfant modifie-t-il l’état de son parent ?', 'How does a child update its parent’s state?', [B('Avec document.write', 'With document.write'), B('En modifiant ses propres props', 'By mutating its own props'), B('Avec une fonction reçue en props', 'With a function received as a prop')]),
);

// ---- Lot 5 : Next.js (composants exécutés avec des doubles de next/link, next/image, next/navigation) ----
const NX = (id, fr, en, bFr, bEn, starter, component, props, tests) => RE(id, fr, en, bFr, bEn, starter, component, props, tests);
const stub = (name) => `function ${name}() {\n  // ton code ici\n}`;
add('nextjs',
  NX('nx-7', 'Un menu de navigation', 'A navigation menu', 'Écris `Nav` : deux `<Link>` de `next/link`, « Accueil » vers `/` et « Cours » vers `/courses`.', 'Write `Nav`: two `<Link>`s from `next/link`, “Accueil” to `/` and “Cours” to `/courses`.',
    "import Link from 'next/link';\n\n" + stub('Nav'), 'Nav', {},
    [T('Deux liens', 'Two links', { dom: "document.querySelectorAll('a').length", expect: 2 }), T('Le second pointe vers /courses', 'The second points to /courses', { dom: "document.querySelectorAll('a')[1].getAttribute('href')", expect: '/courses' }), T('<Link> est utilisé', '<Link> is used', { match: '<Link' })]),
  NX('nx-8', 'Lien actif', 'Active link', 'Dans un Client Component, `usePathname()` donne l’URL courante. Écris `NavItem({ href, label })` : un `<Link>` avec la classe `active` quand `usePathname()` vaut `href`. (Ici le chemin courant est `/courses`.)', 'In a Client Component, `usePathname()` returns the current URL. Write `NavItem({ href, label })`: a `<Link>` with the class `active` when `usePathname()` equals `href`. (Here the current path is `/courses`.)',
    "'use client';\nimport Link from 'next/link';\nimport { usePathname } from 'next/navigation';\n\n" + stub('NavItem'), 'NavItem', { href: '/courses', label: 'Cours' },
    [T('Le lien est actif', 'The link is active', { dom: `${dq('a')}.className`, expect: 'active' }), T('Le texte est « Cours »', 'The text is “Cours”', { dom: `${dq('a')}.textContent`, expect: 'Cours' }), T('usePathname est utilisé', 'usePathname is used', { match: 'usePathname\\(' })]),
  NX('nx-9', 'Images avec next/image', 'Images with next/image', 'Écris `Avatar({ src })` : un composant `<Image>` avec `src`, un `alt` non vide, `width` et `height`.', 'Write `Avatar({ src })`: an `<Image>` component with `src`, a non-empty `alt`, `width` and `height`.',
    "import Image from 'next/image';\n\n" + stub('Avatar'), 'Avatar', { src: '/a.png' },
    [T('Le src est transmis', 'The src is forwarded', { dom: `${dq('img')}.getAttribute('src')`, expect: '/a.png' }), T('alt non vide', 'Non-empty alt', { dom: `${dq('img')}.alt.length > 0`, expect: true }), T('width et height', 'width and height', { match: '<Image(?=[^>]*width=)(?=[^>]*height=)' })]),
  NX('nx-10', 'Layout de section', 'Section layout', 'Un layout reçoit `children`. Écris `DashboardLayout({ children })` : une `<nav>` et un `<main>` qui contient les enfants.', 'A layout receives `children`. Write `DashboardLayout({ children })`: a `<nav>` and a `<main>` containing the children.',
    stub('DashboardLayout'), 'DashboardLayout', { children: 'Hello' },
    [T('Une <nav> existe', 'A <nav> exists', { dom: `!!${dq('nav')}`, expect: true }), T('<main> contient les enfants', '<main> contains the children', { dom: `${dq('main')}.textContent`, expect: 'Hello' })]),
  NX('nx-11', 'États de chargement', 'Loading states', '`app/dashboard/loading.js` s’affiche pendant le chargement de la page. Écris `Loading` : un `<p>` avec le texte exact « Chargement… ».', '`app/dashboard/loading.js` shows while the page loads. Write `Loading`: a `<p>` with the exact text “Chargement…”.',
    stub('Loading'), 'Loading', {},
    [T('<p>Chargement…</p>', '<p>Chargement…</p>', { dom: `${dq('p')}.textContent`, expect: 'Chargement…' })]),
  NX('nx-12', 'Gestion des erreurs', 'Error handling', '`error.js` doit être un Client Component. Écris `ErrorPage({ error, reset })` : `"use client"` en haut, un `<p>` avec `error.message` et un `<button onClick={reset}>`.', '`error.js` must be a Client Component. Write `ErrorPage({ error, reset })`: `"use client"` at the top, a `<p>` with `error.message` and a `<button onClick={reset}>`.',
    "'use client';\n\n" + stub('ErrorPage'), 'ErrorPage', { error: { message: 'Oups' } },
    [T('Affiche le message', 'Shows the message', { dom: `${dq('p')}.textContent`, expect: 'Oups' }), T('"use client" en première ligne', '"use client" on the first line', { match: '^\\s*["\']use client["\']' }), T('Bouton onClick={reset}', 'Button onClick={reset}', { match: 'onClick=\\{\\s*reset' })]),
);
add('nextjs',
  L('nx-13', 'Lire les cookies', 'Reading cookies', 'Dans Next.js 15, `cookies()` est asynchrone. Importe-le depuis `next/headers` et lis `await cookies()` dans un composant serveur.', 'In Next.js 15, `cookies()` is asynchronous. Import it from `next/headers` and read `await cookies()` in a server component.',
    '// app/page.js\n', [T('Import de next/headers', 'next/headers import', { match: 'from\\s+["\']next/headers["\']' }), T('await cookies()', 'await cookies()', { match: 'await\\s+cookies\\(\\)' })]),
  L('nx-14', 'Rediriger', 'Redirecting', 'Importe `redirect` depuis `next/navigation` et envoie les visiteurs vers `/login` avec `redirect("/login")`.', 'Import `redirect` from `next/navigation` and send visitors to `/login` with `redirect("/login")`.',
    '', [T('Import de next/navigation', 'next/navigation import', { match: 'from\\s+["\']next/navigation["\']' }), T('redirect("/login")', 'redirect("/login")', { match: 'redirect\\(\\s*["\']/login["\']\\s*\\)' })]),
  L('nx-15', 'Variables d’environnement', 'Environment variables', 'Seules les variables préfixées `NEXT_PUBLIC_` sont visibles dans le navigateur. Affiche `process.env.NEXT_PUBLIC_SITE_URL` dans une page.', 'Only variables prefixed `NEXT_PUBLIC_` are visible in the browser. Render `process.env.NEXT_PUBLIC_SITE_URL` in a page.',
    '// app/page.js\n', [T('export default', 'export default', { match: 'export\\s+default' }), T('NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_SITE_URL', { match: 'process\\.env\\.NEXT_PUBLIC_SITE_URL' })]),
  L('nx-16', 'Pages statiques dynamiques', 'Static dynamic pages', '`generateStaticParams` liste les valeurs à pré-générer. Écris `async function generateStaticParams()` qui renvoie `[{ slug: "a" }, { slug: "b" }]`.', '`generateStaticParams` lists the values to pre-render. Write `async function generateStaticParams()` returning `[{ slug: "a" }, { slug: "b" }]`.',
    'export async function generateStaticParams() {\n  // ton code ici\n}', [T('Renvoie a et b', 'Returns a and b', { expr: 'generateStaticParams()', expect: [{ slug: 'a' }, { slug: 'b' }] })]),
  L('nx-17', 'Route Handler : paramètres', 'Route Handler: query params', 'Écris `GET(request)` : lis le paramètre `q` de l’URL (`new URL(request.url).searchParams.get("q")`) et renvoie `Response.json({ q })`.', 'Write `GET(request)`: read the `q` query parameter (`new URL(request.url).searchParams.get("q")`) and return `Response.json({ q })`.',
    'export async function GET(request) {\n  // ton code ici\n}', [T('?q=hi → {q:"hi"}', '?q=hi → {q:"hi"}', { expr: '(async () => { const r = await GET(new Request("http://x/api?q=hi")); return await r.json(); })()', expect: { q: 'hi' } })]),
  L('nx-18', 'Route Handler : POST', 'Route Handler: POST', 'Écris `POST(request)` : lis le corps JSON avec `await request.json()` et renvoie `Response.json({ ok: true, echo: body })`.', 'Write `POST(request)`: read the JSON body with `await request.json()` and return `Response.json({ ok: true, echo: body })`.',
    'export async function POST(request) {\n  // ton code ici\n}', [T('Renvoie le corps reçu', 'Echoes the received body', { expr: '(async () => { const r = await POST(new Request("http://x/api", { method: "POST", body: JSON.stringify({ a: 1 }) })); return await r.json(); })()', expect: { ok: true, echo: { a: 1 } } })]),
);
jsCourse.lessons.unshift(L('jb-0', 'Bienvenue : comment ça marche', 'Welcome: how it works', 'Tu écris du code dans l’éditeur, puis tu cliques sur « Vérifier » (ou `Ctrl+Entrée`). Les tests s’affichent en dessous. Pour commencer, écris `hello()` qui renvoie le texte "hello".', 'You write code in the editor, then click “Check” (or `Ctrl+Enter`). The tests appear below. To start, write `hello()` that returns the text "hello".',
  'function hello() {\n  // ton code ici\n}', [T('hello() → "hello"', 'hello() → "hello"', { expr: 'hello()', expect: 'hello' })]));

Object.assign(SOL, {
  'jb-0': 'function hello() {\n  return "hello";\n}',
  'nx-7': "import Link from 'next/link';\n\nfunction Nav() {\n  return (\n    <nav>\n      <Link href=\"/\">Accueil</Link>\n      <Link href=\"/courses\">Cours</Link>\n    </nav>\n  );\n}",
  'nx-8': "'use client';\nimport Link from 'next/link';\nimport { usePathname } from 'next/navigation';\n\nfunction NavItem({ href, label }) {\n  const pathname = usePathname();\n  return <Link href={href} className={pathname === href ? 'active' : ''}>{label}</Link>;\n}",
  'nx-9': "import Image from 'next/image';\n\nfunction Avatar({ src }) {\n  return <Image src={src} alt=\"Avatar\" width={64} height={64} />;\n}",
  'nx-10': 'function DashboardLayout({ children }) {\n  return (\n    <div>\n      <nav>Menu</nav>\n      <main>{children}</main>\n    </div>\n  );\n}',
  'nx-11': 'function Loading() {\n  return <p>Chargement…</p>;\n}',
  'nx-12': "'use client';\n\nfunction ErrorPage({ error, reset }) {\n  return (\n    <div>\n      <p>{error.message}</p>\n      <button onClick={reset}>Réessayer</button>\n    </div>\n  );\n}",
  'nx-13': "import { cookies } from 'next/headers';\n\nexport default async function Page() {\n  const store = await cookies();\n  return <p>{store.get('token')?.value}</p>;\n}",
  'nx-14': "import { redirect } from 'next/navigation';\n\nexport default function Page() {\n  redirect('/login');\n}",
  'nx-15': 'export default function Page() {\n  return <a href={process.env.NEXT_PUBLIC_SITE_URL}>Site</a>;\n}',
  'nx-16': 'export async function generateStaticParams() {\n  return [{ slug: "a" }, { slug: "b" }];\n}',
  'nx-17': 'export async function GET(request) {\n  const q = new URL(request.url).searchParams.get("q");\n  return Response.json({ q });\n}',
  'nx-18': 'export async function POST(request) {\n  const body = await request.json();\n  return Response.json({ ok: true, echo: body });\n}',
});

EXAMS.nextjs.push(
  Q('Quel hook donne l’URL courante côté client ?', 'Which hook gives the current URL on the client?', ['useRoute', 'usePathname', 'useHref']),
  Q('Quel fichier affiche un état de chargement pour une route ?', 'Which file shows a loading state for a route?', ['wait.js', 'spinner.css', 'loading.js']),
  Q('Un Route Handler GET se définit avec…', 'A GET Route Handler is defined with…', ['export default GET', 'export async function GET', 'module.exports = GET']),
);

// ---- Lot 6 : nouveaux cours (HTML & CSS, Algorithmes), interface, tableau de bord ----
const cs = (sel, prop) => `getComputedStyle(document.querySelector('${sel}')).${prop}`;
const H = (id, fr, en, bFr, bEn, starter, tests) => R(L(id, fr, en, bFr, bEn, starter, tests), { html: true });
const sty = '<style>\n  /* ton CSS ici */\n</style>';
COURSES.unshift({ slug: 'html-css', color: '#F5A524', icon: 'Hc', level: { fr: 'Débutant', en: 'Beginner' },
  title: { fr: 'HTML & CSS', en: 'HTML & CSS' },
  desc: { fr: 'Structure, style, mise en page, responsive et animations.', en: 'Structure, styling, layout, responsive design and animations.' },
  lessons: [
    H('hc-1', 'Titres et paragraphes', 'Headings and paragraphs', 'Une page web s’écrit en HTML. `<h1>` est le titre principal, `<p>` un paragraphe. Écris un `<h1>` « Bienvenue » et au moins un `<p>`.', 'A web page is written in HTML. `<h1>` is the main heading, `<p>` a paragraph. Write an `<h1>` “Bienvenue” and at least one `<p>`.',
      '<!-- écris ton HTML ici -->\n', [T('Titre « Bienvenue »', 'Heading “Bienvenue”', { dom: "document.querySelector('h1').textContent.trim()", expect: 'Bienvenue' }), T('Au moins un paragraphe', 'At least one paragraph', { dom: "document.querySelectorAll('p').length >= 1", expect: true })]),
    H('hc-2', 'Liens et images', 'Links and images', '`<a href="…">` crée un lien, `<img src="…" alt="…">` une image. Crée un lien « Visiter » vers https://example.com, et une image avec un `alt` non vide.', '`<a href="…">` creates a link, `<img src="…" alt="…">` an image. Create a “Visiter” link to https://example.com, and an image with a non-empty `alt`.',
      '<!-- écris ton HTML ici -->\n', [T('Lien vers example.com', 'Link to example.com', { dom: "document.querySelector('a').getAttribute('href')", expect: 'https://example.com' }), T('Texte « Visiter »', 'Text “Visiter”', { dom: "document.querySelector('a').textContent.trim()", expect: 'Visiter' }), T('Image avec alt', 'Image with alt', { dom: "document.querySelector('img').alt.length > 0", expect: true })]),
    H('hc-3', 'Listes', 'Lists', 'Crée une liste à puces `<ul>` avec 3 `<li>`, puis une liste numérotée `<ol>` avec 2 `<li>`.', 'Create a bulleted `<ul>` list with 3 `<li>`, then a numbered `<ol>` list with 2 `<li>`.',
      '<!-- écris ton HTML ici -->\n', [T('<ul> avec 3 éléments', '<ul> with 3 items', { dom: "document.querySelectorAll('ul > li').length", expect: 3 }), T('<ol> avec 2 éléments', '<ol> with 2 items', { dom: "document.querySelectorAll('ol > li').length", expect: 2 })]),
    H('hc-4', 'Sélecteurs CSS', 'CSS selectors', 'Un sélecteur choisit les éléments à styler : `h1 { color: red; }`. Rends le `<h1>` rouge et donne au `<p>` une taille de `20px`.', 'A selector picks the elements to style: `h1 { color: red; }`. Make the `<h1>` red and give the `<p>` a font size of `20px`.',
      `<h1>Titre</h1>\n<p>Texte</p>\n${sty}`, [T('h1 rouge', 'Red h1', { dom: cs('h1', 'color'), expect: 'rgb(255, 0, 0)' }), T('p en 20px', 'p at 20px', { dom: cs('p', 'fontSize'), expect: '20px' })]),
    H('hc-5', 'Classes', 'Classes', 'Une classe se cible avec un point : `.card { … }`. Donne à `.card` le fond `#ffc83d` et un `border-radius` de `12px`.', 'A class is targeted with a dot: `.card { … }`. Give `.card` the background `#ffc83d` and a `border-radius` of `12px`.',
      `<div class="card">Carte</div>\n${sty}`, [T('Fond #ffc83d', 'Background #ffc83d', { dom: cs('.card', 'backgroundColor'), expect: 'rgb(255, 200, 61)' }), T('Coins arrondis 12px', '12px rounded corners', { dom: cs('.card', 'borderTopLeftRadius'), expect: '12px' })]),
    H('hc-6', 'Le modèle de boîte', 'The box model', 'Chaque élément est une boîte : contenu, `padding`, `border`, `margin`. Donne à `.box` un padding de `20px`, une marge de `10px` et une bordure de `2px solid`.', 'Every element is a box: content, `padding`, `border`, `margin`. Give `.box` a `20px` padding, a `10px` margin and a `2px solid` border.',
      `<div class="box">Boîte</div>\n${sty}`, [T('padding 20px', 'padding 20px', { dom: cs('.box', 'paddingTop'), expect: '20px' }), T('margin 10px', 'margin 10px', { dom: cs('.box', 'marginTop'), expect: '10px' }), T('bordure 2px', '2px border', { dom: cs('.box', 'borderTopWidth'), expect: '2px' })]),
    H('hc-7', 'Flexbox', 'Flexbox', 'Flexbox aligne des éléments sur un axe. Sur `.row` : `display: flex`, `justify-content: center` et `gap: 10px`.', 'Flexbox lines up items along an axis. On `.row`: `display: flex`, `justify-content: center` and `gap: 10px`.',
      `<div class="row"><span>A</span><span>B</span><span>C</span></div>\n${sty}`, [T('display: flex', 'display: flex', { dom: cs('.row', 'display'), expect: 'flex' }), T('Centré', 'Centered', { dom: cs('.row', 'justifyContent'), expect: 'center' }), T('gap 10px', 'gap 10px', { dom: cs('.row', 'columnGap'), expect: '10px' })]),
    H('hc-8', 'Grille CSS', 'CSS Grid', 'Grid dessine des lignes et des colonnes. Sur `.grid` : `display: grid` et trois colonnes égales avec `grid-template-columns: repeat(3, 1fr)`.', 'Grid draws rows and columns. On `.grid`: `display: grid` and three equal columns with `grid-template-columns: repeat(3, 1fr)`.',
      `<div class="grid"><i>1</i><i>2</i><i>3</i></div>\n${sty}`, [T('display: grid', 'display: grid', { dom: cs('.grid', 'display'), expect: 'grid' }), T('3 colonnes', '3 columns', { dom: `${cs('.grid', 'gridTemplateColumns')}.split(' ').length`, expect: 3 })]),
    H('hc-9', 'Responsive design', 'Responsive design', 'Une media query adapte le style à l’écran : `@media (max-width: 600px) { … }`. Cache `.box` (`display: none`) sur les écrans de 600px ou moins.', 'A media query adapts the style to the screen: `@media (max-width: 600px) { … }`. Hide `.box` (`display: none`) on screens 600px wide or less.',
      '<div class="box">Box</div>\n<style>\n  .box { display: block; }\n  /* ton @media ici */\n</style>', [T('@media (max-width: 600px)', '@media (max-width: 600px)', { match: '@media[^{]*max-width\\s*:\\s*600px' }), T('.box masquée dans la media query', '.box hidden inside the media query', { match: '@media[^{]*\\{[^}]*\\.box[^}]*display\\s*:\\s*none' })]),
    H('hc-10', 'Animations CSS', 'CSS animations', 'Une animation se déclare avec `@keyframes` puis s’applique avec `animation`. Crée `@keyframes pulse` (opacité de 1 à 0.3) et applique-la à `.pulse`.', 'An animation is declared with `@keyframes` then applied with `animation`. Create `@keyframes pulse` (opacity from 1 to 0.3) and apply it to `.pulse`.',
      `<div class="pulse">●</div>\n${sty}`, [T('@keyframes pulse', '@keyframes pulse', { match: '@keyframes\\s+pulse' }), T('.pulse est animée', '.pulse is animated', { dom: cs('.pulse', 'animationName'), expect: 'pulse' })]),
  ] });

COURSES.splice(2, 0, { slug: 'algorithmes', color: '#35D6A5', icon: 'Al', level: { fr: 'Intermédiaire', en: 'Intermediate' },
  title: { fr: 'Algorithmes', en: 'Algorithms' },
  desc: { fr: 'Recherche, récursion, tri, piles et dictionnaires.', en: 'Searching, recursion, sorting, stacks and maps.' },
  lessons: [
    L('al-1', 'Recherche linéaire', 'Linear search', 'Écris `linearSearch(arr, x)` qui renvoie l’indice de `x` dans `arr`, ou `-1` s’il est absent.', 'Write `linearSearch(arr, x)` returning the index of `x` in `arr`, or `-1` if it is absent.',
      fn('linearSearch', 'arr, x'), [T('Trouve 9 à l’indice 2', 'Finds 9 at index 2', { expr: 'linearSearch([5,3,9], 9)', expect: 2 }), T('Absent → -1', 'Missing → -1', { expr: 'linearSearch([1], 2)', expect: -1 })]),
    L('al-2', 'Recherche dichotomique', 'Binary search', 'Sur un tableau **trié**, coupe l’intervalle en deux à chaque étape. Écris `binarySearch(arr, x)` (indice ou `-1`).', 'On a **sorted** array, halve the interval at each step. Write `binarySearch(arr, x)` (index or `-1`).',
      fn('binarySearch', 'arr, x'), [T('binarySearch([1,3,5,7,9], 7) → 3', 'binarySearch([1,3,5,7,9], 7) → 3', { expr: 'binarySearch([1,3,5,7,9], 7)', expect: 3 }), T('Absent → -1', 'Missing → -1', { expr: 'binarySearch([1,3,5], 4)', expect: -1 }), T('Grand tableau', 'Large array', { expr: 'binarySearch(Array.from({ length: 1000000 }, (_, i) => i * 2), 1999998)', expect: 999999 })]),
    L('al-3', 'Récursion et mémoïsation', 'Recursion and memoization', 'Écris `fib(n)` (suite de Fibonacci : `fib(0)=0`, `fib(1)=1`). Attention : `fib(45)` est beaucoup trop lent sans mémoïsation.', 'Write `fib(n)` (Fibonacci: `fib(0)=0`, `fib(1)=1`). Careful: `fib(45)` is far too slow without memoization.',
      fn('fib', 'n'), [T('fib(10) → 55', 'fib(10) → 55', { expr: 'fib(10)', expect: 55 }), T('fib(45) rapide', 'fib(45) is fast', { expr: 'fib(45)', expect: 1134903170 })]),
    L('al-4', 'Palindromes', 'Palindromes', 'Écris `isPalindrome(str)` : vrai si le texte se lit pareil dans les deux sens, en ignorant la casse, les espaces et la ponctuation.', 'Write `isPalindrome(str)`: true if the text reads the same both ways, ignoring case, spaces and punctuation.',
      fn('isPalindrome', 'str'), [T('Phrase célèbre', 'Famous sentence', { expr: 'isPalindrome("A man, a plan, a canal: Panama")', expect: true }), T('hello → false', 'hello → false', { expr: 'isPalindrome("hello")', expect: false })]),
    L('al-5', 'Tri fusion', 'Merge sort', 'Diviser pour régner : coupe en deux, trie chaque moitié, fusionne. Écris `mergeSort(arr)` qui renvoie une **copie** triée sans modifier `arr`.', 'Divide and conquer: split in two, sort each half, merge. Write `mergeSort(arr)` returning a sorted **copy** without mutating `arr`.',
      fn('mergeSort', 'arr'), [T('Trie [5,2,9,1]', 'Sorts [5,2,9,1]', { expr: 'mergeSort([5,2,9,1])', expect: [1, 2, 5, 9] }), T('Ne modifie pas l’entrée', 'Does not mutate the input', { expr: '(() => { const a = [3,1,2]; mergeSort(a); return a; })()', expect: [3, 1, 2] })]),
    L('al-6', 'Two Sum avec un Map', 'Two Sum with a Map', 'Écris `twoSum(nums, target)` : renvoie les deux indices dont les valeurs font `target`, ou `null`. Un `Map` évite la double boucle.', 'Write `twoSum(nums, target)`: return the two indices whose values add up to `target`, or `null`. A `Map` avoids the double loop.',
      fn('twoSum', 'nums, target'), [T('twoSum([2,7,11,15], 9) → [0,1]', 'twoSum([2,7,11,15], 9) → [0,1]', { expr: 'twoSum([2,7,11,15], 9)', expect: [0, 1] }), T('Aucune paire → null', 'No pair → null', { expr: 'twoSum([1,2], 10)', expect: null })]),
    L('al-7', 'Parenthèses équilibrées', 'Balanced brackets', 'Une **pile** (dernier entré, premier sorti) vérifie l’équilibre. Écris `isBalanced(str)` pour `()`, `[]` et `{}`.', 'A **stack** (last in, first out) checks balance. Write `isBalanced(str)` for `()`, `[]` and `{}`.',
      fn('isBalanced', 'str'), [T('"([]{})" → true', '"([]{})" → true', { expr: 'isBalanced("([]{})")', expect: true }), T('"([)]" → false', '"([)]" → false', { expr: 'isBalanced("([)]")', expect: false }), T('"(((" → false', '"(((" → false', { expr: 'isBalanced("(((")', expect: false }), T('"" → true', '"" → true', { expr: 'isBalanced("")', expect: true })]),
    L('al-8', 'Fréquence des mots', 'Word frequency', 'Écris `countWords(text)` : un objet qui compte chaque mot (en minuscules, séparés par des espaces).', 'Write `countWords(text)`: an object counting each word (lowercase, separated by spaces).',
      fn('countWords', 'text'), [T('"a b a" → {a:2,b:1}', '"a b a" → {a:2,b:1}', { expr: 'countWords("a b a")', expect: { a: 2, b: 1 } }), T('Chaîne vide → {}', 'Empty string → {}', { expr: 'countWords("")', expect: {} })]),
  ] });

Object.assign(SOL, {
  'hc-1': '<h1>Bienvenue</h1>\n<p>Premier paragraphe.</p>',
  'hc-2': '<a href="https://example.com">Visiter</a>\n<img src="logo.png" alt="Logo">',
  'hc-3': '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JS</li>\n</ul>\n<ol>\n  <li>Un</li>\n  <li>Deux</li>\n</ol>',
  'hc-4': '<h1>Titre</h1>\n<p>Texte</p>\n<style>\n  h1 { color: red; }\n  p { font-size: 20px; }\n</style>',
  'hc-5': '<div class="card">Carte</div>\n<style>\n  .card { background: #ffc83d; border-radius: 12px; }\n</style>',
  'hc-6': '<div class="box">Boîte</div>\n<style>\n  .box { padding: 20px; margin: 10px; border: 2px solid black; }\n</style>',
  'hc-7': '<div class="row"><span>A</span><span>B</span><span>C</span></div>\n<style>\n  .row { display: flex; justify-content: center; gap: 10px; }\n</style>',
  'hc-8': '<div class="grid"><i>1</i><i>2</i><i>3</i></div>\n<style>\n  .grid { display: grid; grid-template-columns: repeat(3, 1fr); }\n</style>',
  'hc-9': '<div class="box">Box</div>\n<style>\n  .box { display: block; }\n  @media (max-width: 600px) {\n    .box { display: none; }\n  }\n</style>',
  'hc-10': '<div class="pulse">●</div>\n<style>\n  @keyframes pulse { from { opacity: 1; } to { opacity: 0.3; } }\n  .pulse { animation: pulse 1s infinite alternate; }\n</style>',
  'al-1': 'function linearSearch(arr, x) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === x) return i;\n  }\n  return -1;\n}',
  'al-2': 'function binarySearch(arr, x) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    if (arr[mid] === x) return mid;\n    if (arr[mid] < x) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}',
  'al-3': 'function fib(n, memo = {}) {\n  if (n < 2) return n;\n  if (memo[n]) return memo[n];\n  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));\n}',
  'al-4': 'function isPalindrome(str) {\n  const s = str.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return s === [...s].reverse().join("");\n}',
  'al-5': 'function mergeSort(arr) {\n  if (arr.length < 2) return [...arr];\n  const mid = arr.length >> 1;\n  const a = mergeSort(arr.slice(0, mid));\n  const b = mergeSort(arr.slice(mid));\n  const out = [];\n  while (a.length && b.length) out.push(a[0] <= b[0] ? a.shift() : b.shift());\n  return [...out, ...a, ...b];\n}',
  'al-6': 'function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];\n    seen.set(nums[i], i);\n  }\n  return null;\n}',
  'al-7': 'function isBalanced(str) {\n  const pairs = { ")": "(", "]": "[", "}": "{" };\n  const stack = [];\n  for (const ch of str) {\n    if ("([{".includes(ch)) stack.push(ch);\n    else if (pairs[ch] && stack.pop() !== pairs[ch]) return false;\n  }\n  return stack.length === 0;\n}',
  'al-8': 'function countWords(text) {\n  const out = {};\n  for (const w of text.toLowerCase().split(/\\s+/).filter(Boolean)) out[w] = (out[w] || 0) + 1;\n  return out;\n}',
});

EXAMS['html-css'] = [
  Q('Quelle balise crée un lien ?', 'Which tag creates a link?', ['<link>', '<a>', '<href>']),
  Q('Quelle propriété CSS positionne des éléments sur l’axe principal en Flexbox ?', 'Which CSS property positions items along the main axis in Flexbox?', ['float', 'z-index', 'justify-content']),
  Q('Dans le modèle de boîte, de l’intérieur vers l’extérieur :', 'In the box model, from inside to outside:', [B('contenu, padding, bordure, marge', 'content, padding, border, margin'), B('contenu, marge, bordure, padding', 'content, margin, border, padding'), B('padding, contenu, marge, bordure', 'padding, content, margin, border')]),
  Q('Quel sélecteur cible la classe card ?', 'Which selector targets the card class?', ['#card', '.card', 'card()']),
  Q('À quoi sert l’attribut alt d’une image ?', 'What is the alt attribute of an image for?', [B('Décrire l’image (accessibilité)', 'Describe the image (accessibility)'), B('Changer sa taille', 'Change its size'), B('Choisir son format', 'Choose its format')]),
];
EXAMS.algorithmes = [
  Q('Complexité d’une recherche dichotomique ?', 'Complexity of a binary search?', ['O(n)', 'O(n²)', 'O(log n)']),
  Q('Pourquoi mémoïser Fibonacci ?', 'Why memoize Fibonacci?', [B('Pour éviter de recalculer les mêmes valeurs', 'To avoid recomputing the same values'), B('Pour écrire moins de lignes', 'To write fewer lines'), B('Pour trier les résultats', 'To sort the results')]),
  Q('Quelle structure est « dernier entré, premier sorti » ?', 'Which structure is “last in, first out”?', ['queue', 'stack', 'Map']),
  Q('Complexité du tri fusion ?', 'Complexity of merge sort?', ['O(n²)', 'O(n log n)', 'O(log n)']),
  Q('Un Map JavaScript permet…', 'A JavaScript Map allows…', [B('des recherches par clé quasi instantanées', 'near-instant key lookups'), B('un tri automatique', 'automatic sorting'), B('de dupliquer un tableau', 'duplicating an array')]),
];

BADGES.splice(0, BADGES.length,
  { id: 'first', icon: '🚀', t: B('Première leçon', 'First lesson'), test: (d) => Object.keys(d).length > 0 },
  ...COURSES.map((c) => ({ id: c.slug, icon: '🏅', t: B(`${c.title.fr} terminé`, `${c.title.en} complete`), test: (d) => isReady(c, d) })),
  { id: 'all', icon: '👑', t: B('Parcours complet', 'Full path'), test: (d) => COURSES.every((c) => isReady(c, d)) });

Object.assign(UI, {
  badge: { fr: 'Plateforme d’apprentissage · FR / EN', en: 'Learning platform · EN / FR' },
  heroA: { fr: 'Apprends à coder', en: 'Learn to code' }, heroB: { fr: 'comme les pros.', en: 'like the pros.' },
  heroSub2: { fr: 'Chaque leçon explique d’abord, montre un exemple, puis te demande d’écrire le code : il est corrigé sur l’instant, dans ton navigateur. HTML, CSS, JavaScript, React, Next.js, et un certificat vérifiable à la fin de chaque cours.', en: 'Every lesson explains first, shows an example, then asks you to write the code: it’s graded on the spot, in your browser. HTML, CSS, JavaScript, React, Next.js, and a verifiable certificate at the end of every course.' },
  verify: { fr: 'Vérifier un certificat', en: 'Verify a certificate' },
  sCourses: { fr: 'cours', en: 'courses' }, sLessons: { fr: 'leçons interactives', en: 'interactive lessons' }, sLangs: { fr: 'langues', en: 'languages' },
  pathSub: { fr: 'Un parcours progressif, chaque étape s’appuie sur la précédente.', en: 'A progressive path, each step builds on the previous one.' },
  featTitle: { fr: 'Conçu pour apprendre en faisant', en: 'Built to learn by doing' },
  f4t: { fr: 'Vérifiable', en: 'Verifiable' }, f4d: { fr: 'Chaque certificat a un identifiant public vérifiable par un recruteur.', en: 'Every certificate has a public ID that a recruiter can verify.' },
  f1d2: { fr: 'Tu lis quelques lignes, tu écris du code. Pas de vidéo de 40 minutes.', en: 'Read a few lines, write code. No 40-minute video.' },
  f2d2: { fr: 'Les tests s’exécutent dans ton navigateur : JavaScript, rendu React, HTML et CSS réels.', en: 'Tests run in your browser: real JavaScript, React rendering, HTML and CSS.' },
  f3d2: { fr: 'Solutions débloquées après deux essais, progression sauvegardée sur ton compte.', en: 'Solutions unlock after two attempts, progress saved to your account.' },
  ctaTitle: { fr: 'Prêt à écrire ta première ligne ?', en: 'Ready to write your first line?' },
  ctaSub: { fr: 'Gratuit, sans vidéo, directement dans le navigateur.', en: 'Free, no videos, right in your browser.' },
  dash: { fr: 'Tableau de bord', en: 'Dashboard' }, resume: { fr: 'Reprendre', en: 'Resume' },
  kDone: { fr: 'leçons réussies', en: 'lessons completed' }, kCourses: { fr: 'cours terminés', en: 'courses completed' }, kPct: { fr: 'progression globale', en: 'overall progress' },
  footTag: { fr: 'Apprendre le code par la pratique.', en: 'Learn to code by practicing.' },
});

// ---- Refonte : textes de la nouvelle interface ----
Object.assign(UI, {
  badge: { fr: 'Apprendre le code · FR / EN', en: 'Learn to code · EN / FR' },
  h1a: { fr: 'Zéro vidéo.', en: 'No videos.' }, h1b: { fr: 'Du vrai code.', en: 'Real code.' }, h1c: { fr: 'Jusqu’à Next.js.', en: 'Up to Next.js.' },
  heroSub2: { fr: 'Chaque leçon explique d’abord, montre un exemple, puis te demande d’écrire le code : il est corrigé sur l’instant, dans ton navigateur. HTML, CSS, JavaScript, React, Next.js, et un certificat vérifiable à la fin de chaque cours.', en: 'Every lesson explains first, shows an example, then asks you to write the code: it’s graded on the spot, in your browser. HTML, CSS, JavaScript, React, Next.js, and a verifiable certificate at the end of every course.' },
  pathLbl: { fr: '[01] Parcours', en: '[01] Curriculum' }, methodLbl: { fr: '[02] Méthode', en: '[02] Method' }, numsLbl: { fr: '[03] En chiffres', en: '[03] By the numbers' },
  methodTitle: { fr: 'Quatre principes. Zéro remplissage.', en: 'Four principles. Zero filler.' },
  open: { fr: 'ouvrir', en: 'open' }, ctaBig: { fr: 'Commence.', en: 'Start.' },
  f1d2: { fr: 'Quelques lignes à lire, beaucoup de code à écrire. Aucune vidéo de quarante minutes.', en: 'A few lines to read, a lot of code to write. No forty-minute videos.' },
  f2d2: { fr: 'JavaScript, rendu React, HTML et CSS réels : les tests tournent dans ton navigateur.', en: 'Real JavaScript, React rendering, HTML and CSS: tests run in your browser.' },
  f3d2: { fr: 'Bloqué ? La solution se débloque après deux essais. Ta progression te suit sur ton compte.', en: 'Stuck? The solution unlocks after two tries. Your progress follows your account.' },
  lesson: { fr: 'Leçon', en: 'Lesson' }, exercise: { fr: 'Exercice', en: 'Exercise' },
});
