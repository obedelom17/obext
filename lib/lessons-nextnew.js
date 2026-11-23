// Leçons Next.js ajoutées d'après nextjs.org (installation, CSS Modules : pages relues le 2026-11-22).
export function installNextNew({ COURSES, T, L, SOL }) {
  const RE = (id, fr, en, bFr, bEn, starter, component, props, tests) => ({ ...L(id, fr, en, bFr, bEn, starter, []), react: true, component, props, tests });
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  add('nextjs', L("nx-62", "Installation : les scripts de package.json", "Installation: the package.json scripts",
    "Écris `scripts()` : elle renvoie l’objet des trois scripts de base de Next.js, `dev` (`next dev`), `build` (`next build`) et `start` (`next start`).",
    "Write `scripts()`: it returns the object of Next.js’s three basic scripts, `dev` (`next dev`), `build` (`next build`) and `start` (`next start`).",
    "function scripts() {\n  // ton code ici\n}",
    [T("dev, build et start", "dev, build and start", {"expr": "JSON.stringify(scripts())", "expect": "{\"dev\":\"next dev\",\"build\":\"next build\",\"start\":\"next start\"}"})]));
  add('nextjs', RE("nx-63", "CSS Modules : des styles propres au composant", "CSS Modules: component-scoped styles",
    "Dans un vrai projet, tu écris `import styles from './page.module.css'`. Ici, `styles` est simulé juste au-dessus. Écris `Page` : elle renvoie `<h1 className={styles.title}>Bonjour</h1>`.",
    "In a real project you write `import styles from './page.module.css'`. Here, `styles` is simulated just above. Write `Page`: it returns `<h1 className={styles.title}>Bonjour</h1>`.",
    "// Simulé ici. En vrai : import styles from './page.module.css'\nconst styles = { title: 'page_title__x1' };\n\nexport default function Page() {\n  // ton code ici\n}", "Page", {},
    [T("Un <h1> « Bonjour »", "An <h1> “Bonjour”", {"dom": "document.querySelector('#r h1') && document.querySelector('#r h1').textContent", "expect": "Bonjour"}), T("La classe vient de styles.title", "The class comes from styles.title", {"dom": "document.querySelector('#r h1') && document.querySelector('#r h1').className", "expect": "page_title__x1"}), T("className={styles.title}", "className={styles.title}", {"match": "className=\\{\\s*styles\\.title\\s*\\}"})]));
  add('nextjs', L("nx-64", "Structure du projet : de la route à l’URL", "Project structure: from route to URL",
    "Dans le dossier `app`, les dossiers définissent les segments d’URL, et une route n’est publique que s’il y a un fichier `page` ou `route`. Écris `urlFor(path)` : pour `app/blog/page.js` renvoie `\"/blog\"` ; pour `app/page.js`, `\"/\"` ; ignore les groupes `(nom)` ; et renvoie `null` si le fichier n’est ni `page.*` ni `route.*` (un `layout.js`, par exemple).",
    "In the `app` folder, folders define URL segments, and a route is public only if a `page` or `route` file exists. Write `urlFor(path)`: for `app/blog/page.js` return `\"/blog\"`; for `app/page.js`, `\"/\"`; ignore `(name)` groups; and return `null` if the file is neither `page.*` nor `route.*` (a `layout.js`, for example).",
    "function urlFor(path) {\n  // ton code ici\n}",
    [T("app/page.js → /", "app/page.js → /", {"expr": "urlFor('app/page.js')", "expect": "/"}), T("app/blog/page.js → /blog", "app/blog/page.js → /blog", {"expr": "urlFor('app/blog/page.js')", "expect": "/blog"}), T("Segment dynamique conservé", "Dynamic segment kept", {"expr": "urlFor('app/blog/[slug]/page.js')", "expect": "/blog/[slug]"}), T("Groupe (marketing) ignoré", "(marketing) group ignored", {"expr": "urlFor('app/(marketing)/about/page.js')", "expect": "/about"}), T("layout.js n’est pas une route", "layout.js is not a route", {"expr": "urlFor('app/blog/layout.js')", "expect": null}), T("Un fichier de composant n’est pas une route", "A component file is not a route", {"expr": "urlFor('app/blog/Card.js')", "expect": null})]));
  add('nextjs', L("nx-65", "Déploiement : serveur ou export statique", "Deployment: server or static export",
    "Next.js peut être déployé en serveur Node.js (toutes les fonctionnalités) ou en **export statique** (`output: \"export\"`), qui ne gère pas les fonctionnalités nécessitant un serveur. Écris `nextConfig(needsServer)` : si `needsServer` est `false`, renvoie `{ output: \"export\" }` ; sinon, renvoie `{}`.",
    "Next.js can be deployed as a Node.js server (all features) or as a **static export** (`output: \"export\"`), which doesn’t support features that need a server. Write `nextConfig(needsServer)`: if `needsServer` is `false`, return `{ output: \"export\" }`; otherwise, return `{}`.",
    "function nextConfig(needsServer) {\n  // ton code ici\n}",
    [T("Sans serveur → export statique", "No server → static export", {"expr": "nextConfig(false)", "expect": {"output": "export"}}), T("Avec serveur → configuration vide", "With server → empty config", {"expr": "nextConfig(true)", "expect": {}})]));
  Object.assign(SOL, {
    "nx-62": "function scripts() {\n  return {\n    dev: \"next dev\",\n    build: \"next build\",\n    start: \"next start\",\n  };\n}",
    "nx-63": "// Simulé ici. En vrai : import styles from './page.module.css'\nconst styles = { title: 'page_title__x1' };\n\nexport default function Page() {\n  return <h1 className={styles.title}>Bonjour</h1>;\n}",
    "nx-64": "function urlFor(path) {\n  const parts = path.split('/');\n  const file = parts.pop();\n  if (!/^(page|route)\\.(js|jsx|ts|tsx)$/.test(file)) return null;\n  const segments = parts.slice(1).filter((p) => !(p.startsWith('(') && p.endsWith(')')));\n  return '/' + segments.join('/');\n}",
    "nx-65": "function nextConfig(needsServer) {\n  if (!needsServer) {\n    return { output: \"export\" };\n  }\n  return {};\n}",
  });
}
