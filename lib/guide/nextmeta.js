// Explications nx-46 à nx-51, reformulées d'après la page officielle generateMetadata (lue en entier).
export default [
['nx-46', `// app/layout.js
export const metadata = {
  title: {
    template: '%s | Acme',
    default: 'Acme',
  },
}
// app/about/page.js : title: 'About'  →  <title>About | Acme</title>`,
 '`title.template` ajoute un préfixe ou un suffixe aux titres définis dans les segments **enfants** ; `%s` est remplacé par ce titre. `title.default` donne un **titre de secours** aux segments enfants qui n’en définissent pas, et il est **obligatoire** quand on crée un `template`. Attention : le `template` s’applique aux segments enfants, **pas** au segment qui le définit : un `title` dans la `page.js` du même segment que le `layout.js` n’en profite pas.',
 '`title.template` adds a prefix or suffix to titles defined in **child** segments; `%s` is replaced by that title. `title.default` provides a **fallback title** to child segments that don’t define one, and it is **required** when you create a `template`. Note: the `template` applies to child segments, **not** to the segment that defines it: a `title` in the `page.js` of the same segment as the `layout.js` doesn’t benefit from it.',
 ['Exporte `metadata` depuis `app/layout.js`.', 'Dans `title`, écris `template: "%s | Acme"`.', 'Ajoute `default: "Acme"`.'],
 ['Export `metadata` from `app/layout.js`.', 'In `title`, write `template: "%s | Acme"`.', 'Add `default: "Acme"`.'],
 'Un `title.template` défini dans une `page.js` n’a aucun effet : une page est toujours le dernier segment d’une route.',
 'A `title.template` defined in a `page.js` has no effect: a page is always the last segment of a route.'],
['nx-47', `// app/about/page.js
export const metadata = {
  title: { absolute: 'About' },
}
// → <title>About</title>`,
 '`title.absolute` fournit un titre qui **ignore** le `title.template` défini dans les segments parents. Dans une `page.js`, il définit le titre de la route sans suffixe ni préfixe. Dans un `layout.js`, il définit le titre par défaut des segments enfants, toujours en ignorant les templates parents.',
 '`title.absolute` provides a title that **ignores** the `title.template` set in parent segments. In a `page.js` it defines the route’s title with no prefix or suffix. In a `layout.js` it defines the default title for child segments, again ignoring parent templates.',
 ['Exporte `metadata` depuis la page.', 'Écris `title: { absolute: "About" }`.', 'Constate que le titre n’a pas de suffixe.'],
 ['Export `metadata` from the page.', 'Write `title: { absolute: "About" }`.', 'Note that the title has no suffix.'],
 'Un simple `title: "About"` serait, lui, complété par le template du parent.',
 'A plain `title: "About"` would instead be completed by the parent’s template.'],
['nx-48', `export const metadata = {
  metadataBase: new URL('https://acme.com'),
  openGraph: { images: '/og-image.png' },
}
// → og:image = https://acme.com/og-image.png`,
 '`metadataBase` est une option pratique qui donne un **préfixe d’URL** aux champs de métadonnées exigeant une URL complète. Les champs du segment courant et de ses enfants peuvent alors utiliser un **chemin relatif**, composé avec `metadataBase` pour former l’URL complète. On le place souvent dans le `app/layout.js` racine. Utiliser un chemin relatif **sans** `metadataBase` provoque une erreur de build ; si un champ donne déjà une URL absolue, `metadataBase` est ignoré.',
 '`metadataBase` is a convenience option that sets a **URL prefix** for metadata fields requiring a fully qualified URL. Fields in the current segment and below can then use a **relative path**, composed with `metadataBase` to form the full URL. It is typically set in the root `app/layout.js`. Using a relative path **without** `metadataBase` causes a build error; if a field already provides an absolute URL, `metadataBase` is ignored.',
 ['Écris `metadataBase: new URL("https://acme.com")`.', 'Ajoute `openGraph: { images: "/og-image.png" }`.', 'Vérifie : le chemin est relatif.'],
 ['Write `metadataBase: new URL("https://acme.com")`.', 'Add `openGraph: { images: "/og-image.png" }`.', 'Check: the path is relative.'],
 'Les images Open Graph doivent finir en URL absolue : c’est justement ce que `metadataBase` fabrique pour toi.',
 'Open Graph images must end up as absolute URLs: that is exactly what `metadataBase` builds for you.'],
['nx-49', `export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}`,
 'Le champ `robots` définit la balise `<meta name="robots">`. Dans l’exemple de la documentation, `index: true` et `follow: true` donnent `index, follow`. Pour demander aux moteurs de **ne pas indexer** une page ni suivre ses liens, on met ces valeurs à `false`. On peut aussi régler `googleBot` séparément.',
 'The `robots` field defines the `<meta name="robots">` tag. In the documentation’s example, `index: true` and `follow: true` give `index, follow`. To ask engines **not to index** a page or follow its links, set these values to `false`. You can also configure `googleBot` separately.',
 ['Exporte `metadata`.', 'Ajoute `robots: { … }`.', 'Mets `index: false` et `follow: false`.'],
 ['Export `metadata`.', 'Add `robots: { … }`.', 'Set `index: false` and `follow: false`.'],
 'Ce n’est pas une protection : une balise `robots` demande aux moteurs, elle n’empêche personne d’ouvrir la page.',
 'This is not protection: a `robots` tag asks search engines, it doesn’t stop anyone from opening the page.'],
['nx-50', `export const metadata = {
  alternates: {
    canonical: 'https://nextjs.org',
  },
}
// → <link rel="canonical" href="https://nextjs.org" />`,
 'Le champ `alternates` décrit les **variantes** d’une page. Sa clé `canonical` produit `<link rel="canonical">`, qui indique l’adresse de référence d’un contenu. La documentation montre aussi `languages` (versions par langue, avec `hreflang`), `media` et `types`.',
 'The `alternates` field describes a page’s **variants**. Its `canonical` key outputs `<link rel="canonical">`, which indicates a content’s reference address. The documentation also shows `languages` (per-language versions, with `hreflang`), `media` and `types`.',
 ['Exporte `metadata`.', 'Ajoute `alternates: { … }`.', 'Mets `canonical: "https://nextjs.org"`.'],
 ['Export `metadata`.', 'Add `alternates: { … }`.', 'Set `canonical: "https://nextjs.org"`.'],
 'Si tu as défini `metadataBase`, `canonical` peut être un chemin relatif comme `"/"`.',
 'If you defined `metadataBase`, `canonical` can be a relative path such as `"/"`.'],
['nx-51', `import { InteractiveComponent } from './interactive-component'

export const metadata = { title: 'My Page' }

export default function Page() {
  return <InteractiveComponent />
}`,
 '`metadata` et `generateMetadata` ne sont pris en charge que dans les **Server Components**, car les métadonnées doivent être résolues **sur le serveur avant le rendu de la page** : Next.js peut ainsi les inclure dans le HTML initial. Si tu as besoin de fonctionnalités client (hooks, gestionnaires d’événements), garde `page.js` en Server Component et déplace la logique client dans un fichier à part qui commence par `"use client"`.',
 '`metadata` and `generateMetadata` are only supported in **Server Components**, because metadata must be resolved **on the server before the page component is rendered**: that lets Next.js include it in the initial HTML. If you need Client Component features (hooks, event handlers), keep `page.js` a Server Component and move the client logic to a separate file starting with `"use client"`.',
 ['Garde `page.js` sans `"use client"`.', 'Exporte `metadata` avec `title: "My Page"`.', 'Renvoie `<InteractiveComponent />`.'],
 ['Keep `page.js` free of `"use client"`.', 'Export `metadata` with `title: "My Page"`.', 'Return `<InteractiveComponent />`.'],
 'Si tu mets `"use client"` dans `page.js` pour utiliser un hook, tu perds le droit d’exporter `metadata` : sépare les fichiers.',
 'If you put `"use client"` in `page.js` to use a hook, you lose the right to export `metadata`: split the files.'],
];
