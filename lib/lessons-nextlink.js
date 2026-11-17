// Leçons issues de la page officielle « Link Component » (nextjs.org/docs/app/api-reference/components/link).
// Relue le 2026-11-16. Le double de <Link> utilisé par l'éditeur expose replace/scroll/prefetch via data-*.
export function installNextLink({ COURSES, T, NX, SOL, dq }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  const IM = "import Link from 'next/link';\n\n";
  const stub = (name, args = '') => `function ${name}(${args}) {\n  // ton code ici\n}`;
  const A = dq('a');
  add('nextjs',
    NX('nx-25', 'Link : href en objet', 'Link: object href',
      'La prop `href` accepte une chaîne **ou un objet**. Écris `AboutLink` : un `<Link>` dont `href` est l’objet `{ pathname: "/about", query: { name: "test" } }`, avec le texte « About ». Il mène à `/about?name=test`.',
      'The `href` prop accepts a string **or an object**. Write `AboutLink`: a `<Link>` whose `href` is the object `{ pathname: "/about", query: { name: "test" } }`, with the text “About”. It leads to `/about?name=test`.',
      IM + stub('AboutLink'), 'AboutLink', {},
      [T('Le lien mène à /about?name=test', 'The link goes to /about?name=test', { dom: `${A}.getAttribute('href')`, expect: '/about?name=test' }),
       T('Le texte est « About »', 'The text is “About”', { dom: `${A}.textContent`, expect: 'About' }),
       T('href est un objet avec pathname', 'href is an object with pathname', { match: 'href=\\{\\{[^}]*pathname' })]),

    NX('nx-26', 'Link : remplacer l’historique', 'Link: replace history',
      'Par défaut, `<Link>` **ajoute** une entrée à l’historique du navigateur. Avec la prop booléenne `replace`, il **remplace** l’entrée actuelle. Écris `AboutLink` : un `<Link href="/about" replace>` avec le texte « About us ».',
      'By default, `<Link>` **pushes** an entry onto the browser history. With the boolean `replace` prop it **replaces** the current entry. Write `AboutLink`: a `<Link href="/about" replace>` with the text “About us”.',
      IM + stub('AboutLink'), 'AboutLink', {},
      [T('Le lien mène à /about', 'The link goes to /about', { dom: `${A}.getAttribute('href')`, expect: '/about' }),
       T('La prop replace est active', 'The replace prop is on', { dom: `${A}.getAttribute('data-replace')`, expect: 'true' }),
       T('Le texte est « About us »', 'The text is “About us”', { dom: `${A}.textContent`, expect: 'About us' })]),

    NX('nx-27', 'Link : garder la position de défilement', 'Link: keep the scroll position',
      'Par défaut (`scroll` vaut `true`), si la nouvelle page n’est pas visible dans l’écran, Next.js défile vers le haut de son premier élément. Avec `scroll={false}`, il ne le fait pas. Écris `DashLink` : `<Link href="/dashboard" scroll={false}>` avec le texte « Dashboard ».',
      'By default (`scroll` is `true`), if the new page is not visible in the viewport, Next.js scrolls to the top of its first element. With `scroll={false}` it does not. Write `DashLink`: `<Link href="/dashboard" scroll={false}>` with the text “Dashboard”.',
      IM + stub('DashLink'), 'DashLink', {},
      [T('Le lien mène à /dashboard', 'The link goes to /dashboard', { dom: `${A}.getAttribute('href')`, expect: '/dashboard' }),
       T('scroll vaut false', 'scroll is false', { dom: `${A}.getAttribute('data-scroll')`, expect: 'false' }),
       T('Le texte est « Dashboard »', 'The text is “Dashboard”', { dom: `${A}.textContent`, expect: 'Dashboard' })]),

    NX('nx-28', 'Link : désactiver le préchargement', 'Link: disable prefetching',
      'Quand un `<Link>` entre dans la fenêtre d’affichage, Next.js précharge la route en arrière-plan (en production seulement). `prefetch={false}` désactive ce préchargement. Écris `DashLink` : `<Link href="/dashboard" prefetch={false}>` avec le texte « Dashboard ».',
      'When a `<Link>` enters the viewport, Next.js prefetches the route in the background (in production only). `prefetch={false}` turns that off. Write `DashLink`: `<Link href="/dashboard" prefetch={false}>` with the text “Dashboard”.',
      IM + stub('DashLink'), 'DashLink', {},
      [T('Le lien mène à /dashboard', 'The link goes to /dashboard', { dom: `${A}.getAttribute('href')`, expect: '/dashboard' }),
       T('prefetch vaut false', 'prefetch is false', { dom: `${A}.getAttribute('data-prefetch')`, expect: 'false' })]),

    NX('nx-29', 'Link : lister des routes dynamiques', 'Link: listing dynamic routes',
      'Pour lier des segments dynamiques, utilise les littéraux de gabarit. Écris `PostList({ posts })` : une `<ul>` avec un `<li key={post.id}>` par article, contenant un `<Link href={`/blog/${post.slug}`}>` dont le texte est `post.title`.',
      'To link to dynamic segments, use template literals. Write `PostList({ posts })`: a `<ul>` with one `<li key={post.id}>` per post, containing a `<Link href={`/blog/${post.slug}`}>` whose text is `post.title`.',
      IM + stub('PostList', '{ posts }'), 'PostList', { posts: [{ id: 1, title: 'Hello', slug: 'hello' }, { id: 2, title: 'Next', slug: 'next-js' }] },
      [T('Deux liens', 'Two links', { dom: "document.querySelectorAll('li a').length", expect: 2 }),
       T('Premier lien : /blog/hello', 'First link: /blog/hello', { dom: `${A}.getAttribute('href')`, expect: '/blog/hello' }),
       T('Second lien : texte « Next », /blog/next-js', 'Second link: text “Next”, /blog/next-js', { dom: "(() => { const a = document.querySelectorAll('li a')[1]; return a.textContent + '|' + a.getAttribute('href') })()", expect: 'Next|/blog/next-js' }),
       T('Littéral de gabarit', 'Template literal', { match: '`/blog/\\$\\{' })]),

    NX('nx-30', 'Link : aller à une ancre', 'Link: scrolling to an id',
      'Comme `<Link>` produit un élément `<a>`, tu peux ajouter une ancre `#` à `href` pour défiler jusqu’à l’élément qui porte cet `id`. Écris `SettingsLink` : `<Link href="/dashboard#settings">` avec le texte « Settings ».',
      'Since `<Link>` renders an `<a>` element, you can append a `#` hash to `href` to scroll to the element with that `id`. Write `SettingsLink`: `<Link href="/dashboard#settings">` with the text “Settings”.',
      IM + stub('SettingsLink'), 'SettingsLink', {},
      [T('href contient l’ancre', 'href contains the hash', { dom: `${A}.getAttribute('href')`, expect: '/dashboard#settings' }),
       T('Le texte est « Settings »', 'The text is “Settings”', { dom: `${A}.textContent`, expect: 'Settings' })]),

    NX('nx-31', 'Link : attributs de la balise <a>', 'Link: <a> tag attributes',
      'Des attributs de `<a>` comme `className` ou `target="_blank"` peuvent être passés à `<Link>` : ils arrivent sur l’élément `<a>` sous-jacent. Écris `DocsLink` : un `<Link href="/docs" className="link" target="_blank">` avec le texte « Docs ».',
      '`<a>` attributes such as `className` or `target="_blank"` can be passed to `<Link>`: they reach the underlying `<a>` element. Write `DocsLink`: a `<Link href="/docs" className="link" target="_blank">` with the text “Docs”.',
      IM + stub('DocsLink'), 'DocsLink', {},
      [T('Classe link', 'Class link', { dom: `${A}.className`, expect: 'link' }),
       T('target _blank', 'target _blank', { dom: `${A}.getAttribute('target')`, expect: '_blank' }),
       T('Destination /docs', 'Destination /docs', { dom: `${A}.getAttribute('href')`, expect: '/docs' })]),
  );

  Object.assign(SOL, {
    'nx-25': `import Link from 'next/link';\n\nfunction AboutLink() {\n  return (\n    <Link href={{ pathname: '/about', query: { name: 'test' } }}>\n      About\n    </Link>\n  );\n}`,
    'nx-26': `import Link from 'next/link';\n\nfunction AboutLink() {\n  return (\n    <Link href="/about" replace>\n      About us\n    </Link>\n  );\n}`,
    'nx-27': `import Link from 'next/link';\n\nfunction DashLink() {\n  return (\n    <Link href="/dashboard" scroll={false}>\n      Dashboard\n    </Link>\n  );\n}`,
    'nx-28': `import Link from 'next/link';\n\nfunction DashLink() {\n  return (\n    <Link href="/dashboard" prefetch={false}>\n      Dashboard\n    </Link>\n  );\n}`,
    'nx-29': "import Link from 'next/link';\n\nfunction PostList({ posts }) {\n  return (\n    <ul>\n      {posts.map((post) => (\n        <li key={post.id}>\n          <Link href={`/blog/${post.slug}`}>{post.title}</Link>\n        </li>\n      ))}\n    </ul>\n  );\n}",
    'nx-30': `import Link from 'next/link';\n\nfunction SettingsLink() {\n  return <Link href="/dashboard#settings">Settings</Link>;\n}`,
    'nx-31': `import Link from 'next/link';\n\nfunction DocsLink() {\n  return (\n    <Link href="/docs" className="link" target="_blank">\n      Docs\n    </Link>\n  );\n}`,
  });
}
