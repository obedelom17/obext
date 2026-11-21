// Leçons issues de la page officielle « generateMetadata » (nextjs.org/docs/app/api-reference/functions/generate-metadata).
// Page lue en entier le 2026-11-17. Tests par motifs sur le code, comme les autres leçons de fichiers Next.js.
export function installNextMeta({ COURSES, T, L, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  add('nextjs',
    L('nx-46', 'Titre : template et default', 'Title: template and default',
      'Dans `app/layout.js`, `title.template` ajoute un préfixe ou un suffixe aux titres des segments **enfants**. Exporte `metadata` avec `title: { template: "%s | Acme", default: "Acme" }` (un `default` est obligatoire avec un `template`). Une page enfant avec `title: "About"` affichera « About | Acme ».',
      'In `app/layout.js`, `title.template` adds a prefix or suffix to the titles of **child** segments. Export `metadata` with `title: { template: "%s | Acme", default: "Acme" }` (a `default` is required with a `template`). A child page with `title: "About"` will show “About | Acme”.',
      '// app/layout.js\n',
      [T('export const metadata', 'export const metadata', { match: 'export\\s+const\\s+metadata' }),
       T('template "%s | Acme"', 'template "%s | Acme"', { match: 'template\\s*:\\s*[\'"]%s \\| Acme[\'"]' }),
       T('default "Acme"', 'default "Acme"', { match: 'default\\s*:\\s*[\'"]Acme[\'"]' })]),

    L('nx-47', 'Titre : absolute', 'Title: absolute',
      '`title.absolute` donne un titre qui **ignore** le `title.template` des segments parents. Dans `app/about/page.js`, exporte `metadata` avec `title: { absolute: "About" }` : le titre sera « About », sans suffixe.',
      '`title.absolute` provides a title that **ignores** the `title.template` of parent segments. In `app/about/page.js`, export `metadata` with `title: { absolute: "About" }`: the title will be “About”, with no suffix.',
      '// app/about/page.js\n',
      [T('export const metadata', 'export const metadata', { match: 'export\\s+const\\s+metadata' }),
       T('title.absolute "About"', 'title.absolute "About"', { match: 'title\\s*:\\s*\\{\\s*absolute\\s*:\\s*[\'"]About[\'"]' })]),

    L('nx-48', 'metadataBase et chemins relatifs', 'metadataBase and relative paths',
      '`metadataBase` donne un préfixe d’URL aux champs qui demandent une URL complète : les segments courant et enfants peuvent alors utiliser un **chemin relatif**. Exporte `metadata` avec `metadataBase: new URL("https://acme.com")` et `openGraph: { images: "/og-image.png" }`.',
      '`metadataBase` sets a URL prefix for fields that require a fully qualified URL: the current segment and its children can then use a **relative path**. Export `metadata` with `metadataBase: new URL("https://acme.com")` and `openGraph: { images: "/og-image.png" }`.',
      '// app/layout.js\n',
      [T('metadataBase: new URL("https://acme.com")', 'metadataBase: new URL("https://acme.com")', { match: 'metadataBase\\s*:\\s*new\\s+URL\\(\\s*[\'"]https://acme\\.com[\'"]\\s*\\)' }),
       T('openGraph.images relatif', 'relative openGraph.images', { match: 'openGraph\\s*:\\s*\\{[^}]*images\\s*:\\s*[\'"]/og-image\\.png[\'"]' })]),

    L('nx-49', 'robots : index et follow', 'robots: index and follow',
      'Le champ `robots` contrôle l’indexation par les moteurs de recherche : `index` et `follow` valent `true` dans l’exemple de la documentation. Exporte `metadata` avec `robots: { index: false, follow: false }` pour une page à ne pas indexer.',
      'The `robots` field controls indexing by search engines: `index` and `follow` are `true` in the documentation’s example. Export `metadata` with `robots: { index: false, follow: false }` for a page that should not be indexed.',
      '// app/page.js\n',
      [T('export const metadata', 'export const metadata', { match: 'export\\s+const\\s+metadata' }),
       T('robots.index false', 'robots.index false', { match: 'robots\\s*:\\s*\\{[^}]*index\\s*:\\s*false' }),
       T('robots.follow false', 'robots.follow false', { match: 'robots\\s*:\\s*\\{[^}]*follow\\s*:\\s*false' })]),

    L('nx-50', 'alternates : adresse canonique', 'alternates: canonical URL',
      'Le champ `alternates` décrit les variantes d’une page. Exporte `metadata` avec `alternates: { canonical: "https://nextjs.org" }` : Next.js produit `<link rel="canonical" href="https://nextjs.org" />`.',
      'The `alternates` field describes a page’s variants. Export `metadata` with `alternates: { canonical: "https://nextjs.org" }`: Next.js outputs `<link rel="canonical" href="https://nextjs.org" />`.',
      '// app/page.js\n',
      [T('export const metadata', 'export const metadata', { match: 'export\\s+const\\s+metadata' }),
       T('alternates.canonical', 'alternates.canonical', { match: 'alternates\\s*:\\s*\\{\\s*canonical\\s*:\\s*[\'"]https://nextjs\\.org[\'"]' })]),

    L('nx-51', 'metadata : seulement dans un Server Component', 'metadata: Server Components only',
      '`metadata` n’est pris en charge que dans les Server Components. Pour une page interactive, garde `page.js` en Server Component et déplace la partie client dans un autre fichier. Écris `page.js` : exporte `metadata` avec `title: "My Page"` et renvoie `<InteractiveComponent />` (déjà importé), **sans** `"use client"`.',
      '`metadata` is only supported in Server Components. For an interactive page, keep `page.js` a Server Component and move the client part into another file. Write `page.js`: export `metadata` with `title: "My Page"` and return `<InteractiveComponent />` (already imported), **without** `"use client"`.',
      "// app/page.js\nimport { InteractiveComponent } from './interactive-component';\n\n",
      [T('export const metadata avec title', 'export const metadata with title', { match: 'export\\s+const\\s+metadata\\s*=\\s*\\{[^}]*title\\s*:\\s*[\'"]My Page[\'"]' }),
       T('Rend <InteractiveComponent />', 'Renders <InteractiveComponent />', { match: '<InteractiveComponent\\s*/>' }),
       T('Pas de "use client"', 'No "use client"', { match: '^(?![^]*[\'"]use client[\'"])' })]),
  );
  Object.assign(SOL, {
    'nx-46': "export const metadata = {\n  title: {\n    template: '%s | Acme',\n    default: 'Acme',\n  },\n};",
    'nx-47': "export const metadata = {\n  title: {\n    absolute: 'About',\n  },\n};",
    'nx-48': "export const metadata = {\n  metadataBase: new URL('https://acme.com'),\n  openGraph: {\n    images: '/og-image.png',\n  },\n};",
    'nx-49': "export const metadata = {\n  robots: {\n    index: false,\n    follow: false,\n  },\n};",
    'nx-50': "export const metadata = {\n  alternates: {\n    canonical: 'https://nextjs.org',\n  },\n};",
    'nx-51': "import { InteractiveComponent } from './interactive-component';\n\nexport const metadata = {\n  title: 'My Page',\n};\n\nexport default function Page() {\n  return <InteractiveComponent />;\n}",
  });
}
