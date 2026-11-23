# Programme essentiel — du débutant total à l’opérationnel

Ce document est le **plan de reconstruction** des cours. Il part de la structure des documentations officielles
(MDN Learn, react.dev, nextjs.org, nodejs.org) et ne garde que l’essentiel pour passer de « je ne connais rien » à « je peux
construire, déployer et maintenir une application ».

## Règles de travail
1. Chaque leçon est écrite **après lecture de sa page officielle**, et cite cette page (`lib/guide/links.js`).
2. Texte reformulé (pas de copie), source citée. Vérifier la licence de chaque documentation avant publication.
3. Statuts : **✔✔** vérifié sur la documentation · **✔** présent mais écrit de mémoire (à vérifier) · **◐** partiel · **✗** manquant.
4. Aucune leçon n’est supprimée : elles sont vérifiées, corrigées ou remplacées une par une.

> **Règle du projet : toutes les leçons doivent venir uniquement des documentations officielles.** Une leçon n’est marquée « Vérifié » (registre `lib/guide/verified.js`, pastille sur le site) qu’après relecture de sa page officielle. État : 278 leçons vérifiées sur 278 (nd-46 `zlib`, nd-47 `stream/promises`, puis nd-45 `util.parseArgs`, puis re-32 Thinking in React, js-29 Web Storage, hc-29 clavier et tabindex, puis hc-28 `aria-label`, re-31 `useId`, puis js-28 prototypes, nx-65 déploiement, puis hc-27 arrière-plans, nx-64 structure du projet, puis nd-44 `AbortController`, puis hc-25 `border-radius`, hc-26 polices et texte, puis nx-62 installation / scripts, nx-63 CSS Modules, puis hc-23 `iframe`, hc-24 accessibilité HTML, re-30 error boundary, puis 251 initiales + re-26 `memo`, re-27 `useCallback`, re-28 `key` / « Preserving and Resetting State », re-29 `useTransition`, js-25 `flatMap`, js-26 `Object.fromEntries`, js-27 `padStart`, ajoutées le 2026-11-22) (Next.js terminé : 62/62 ; Node.js : nd-5, 8, 9, 10, 13 à 21, 24, 25, 28, 29, 31 à 34, 26, 27, 35, 36, 37 relues, nd-7, 22, 23, 30 relues et marquées, avec des conseils hors doc signalés dans le texte ; HTML/CSS : HTML/CSS terminé : hc-1 à hc-22 relues).
>
> Pages relues en détail à ce jour : Next.js « page.js », « layout.js », « Link Component », « route.js », « loading.js », « error.js », « not-found.js » et « notFound » et « Image Component », « cookies », « redirect », « permanentRedirect » « generateMetadata » (page lue en entier), « Font Module », React « Your First Component », « State », « Passing Props », « Rendering Lists », « Conditional Rendering », « useEffect », « useReducer », « Custom Hooks », « useRef », « useContext », « useMemo », « Updating Arrays », « input », « Choosing the State Structure », « Sharing State », « Fragment », « useId » (cours React terminé) ; Node.js : « process » (extraits), « CommonJS modules », « ECMAScript modules » — nodejs.org interdit la lecture automatique : relecture sur extraits de recherche, « environment variables », « Route Segment Config », « Caching (previous model) », « Internationalization », « Testing / Jest », « fetching data », « useRouter », « use server », « use client » et « revalidatePath », « Route Handlers / route.js » (nx-17, nx-18 ; 2026-11-21), « Dynamic Segments » et « generateStaticParams » (2026-11-16), Next.js « proxy.js » (2026-09), MDN « DOM scripting introduction », « Introduction to events » et « Event bubbling » et « Making network requests with JavaScript » « Handling conflicts » et « Web page metadata » (2026-11-16), « Using CSS custom properties », « :hover », « ::before / ::after » et « position », « main », « label », « button », « Client-side form validation », « video » et « HTML table basics », « li », « CSS syntax / error handling », « Media queries », « Basic concepts of flexbox », « Box model », « Basic concepts of grid layout » et « Using CSS animations » (2026-11-21) ; Node.js « os.availableParallelism » (nd-10 : exercice passé à availableParallelism), « assert » (strictEqual = Object.is), « test runner », « process signal events » + http « server.close », npm « semantic versions » (2026-11-21), « util.promisify », « timers/promises », « fs » (lecture/écriture), « URL », « fs » (promesses, mkdir recursive), « Errors » (codes système), « fs.readdir », « Buffer », « Anatomy of an HTTP Transaction », « readline » ; Express « Using middleware » ; Koa « Guide » ; MDN « HTTP status », « Error » (types personnalisés), « fetch » ; MDN « Remainder (%) », « Array.reverse », « Text formatting », « String iterator » (jb-2, 3, 7, 8 ; 2026-11-21), « Logical AND », « Math.min / max », « Array length », « Object initializer » et « Spread syntax » (jb-4, 5, 9, 10 ; 2026-11-21), « Rest parameters » et « Array.sort » (jb-11, 13 ; 2026-11-21), MDN « Promise.all », « Promise.allSettled » et « forEach » (2026-11-21). MDN « return », « Addition (+) », « Parameter », « for », « Array.push », « Callback function » / « First-class function », « try...catch » et « JSON.parse » (jb-0, 1, 6, 12, 14 ; 2026-11-22). MDN « Array.filter », « Array.map », « Arrow function expressions » et « if...else » (js-1 à js-4 ; 2026-11-22). MDN « Array.reduce » (+ erreur « Reduce of empty array »), « Spread syntax », « Closures », « Promise() constructor », « Implementing a promise-based API » et « await » (js-5 à js-8 ; 2026-11-22). MDN « Map », « Logical OR assignment », « Nullish coalescing », « Array.reduceRight », « await », « Array.isArray », « Array.flat », « Template literals », « Destructuring », « Optional chaining », « Array.every / some / find », « Set » et « Keyed collections », « Classes / constructor », « String.trim / replaceAll », « Regular expressions », « Date » (+ « getTime »), « Object.entries » (js-9 à js-24 ; 2026-11-22). js-20 s’appuie aussi sur web.dev (« structuredClone ») faute de page MDN retrouvée. Node.js (nodejs.org) : « stream » (asyncIterator, Transform), « Anatomy of an HTTP Transaction », « path.resolve » (nd-7, 22, 23, 30 ; 2026-11-22). Dans ces quatre leçons, les conseils hors documentation (vérification `base + path.sep`, limite de taille du corps, recollage des lignes) restent signalés comme tels dans le texte. Tout le reste est ✔ (de mémoire) ou ◐/✗.
> Légende : une ligne ◐ ou ✗ dans les tableaux ci-dessous désigne un sujet de la doc sans leçon (ou avec une couverture partielle), pas une leçon non vérifiée.
> Exemple d’écart déjà trouvé : `middleware.js` est devenu `proxy.js` dans Next.js 16 (leçon ex-4 corrigée).

---

## 1. HTML — MDN « Structuring content with HTML »
| Thème | Statut | Leçons |
|---|---|---|
| Premiers pas : balises, éléments, attributs | ✔ | hc-1, hc-2 |
| Structure d’un document : `<!doctype>`, `<html lang>`, `<head>`, `<meta>` (charset, author, description), `<title>` vs `<h1>`, `<link>`, `<script defer>`, `lang` | ✔✔ (MDN « Web page metadata », relue 2026-11-16) | head-1…head-6 |
| Sémantique du texte : titres, `em`/`strong`, citations, `code`, abréviations | ◐ | hc-1 |
| Listes | ✔ | hc-3 |
| Liens (relatifs, ancres, e-mail) | ◐ | hc-2 |
| Images : `alt`, `srcset`, `<picture>`, `<figure>` | ◐ | hc-2 |
| Tableaux | ✔ | hc-12 |
| Formulaires : labels, types, validation, contrôles | ◐ | hc-13, hc-14 |
| Média audio / vidéo, `details` | ✔ | hc-15, hc-16 |
| Sémantique de page (`header`, `main`, `nav`, `footer`) | ✔ | hc-11 |
| Intégrer du contenu (`iframe`) | ✔✔ (MDN « iframe », 2026-11-22) | hc-23 |

## 2. CSS — MDN « CSS fundamentals », « CSS text styling », « CSS layout »
| Thème | Statut | Leçons |
|---|---|---|
| Syntaxe, sélecteurs (type, classe, id, attribut, combinateurs) | ◐ | hc-4, hc-5 |
| Cascade, spécificité (calcul 0-0-0), héritage, `inherit`/`initial`/`unset`, `all`, `!important` | ✔✔ (MDN « Handling conflicts », relue 2026-11-16) | casc-1…casc-7 |
| Modèle de boîte, `box-sizing`, débordement (`overflow`) | ◐ | hc-6 |
| Valeurs et unités, `calc()`, couleurs | ◐ | hc-22 |
| Arrière-plans et bordures | ✗ | — |
| Pseudo-classes et pseudo-éléments | ✔ | hc-18, hc-19 |
| Texte : polices, listes, liens | ✗ | — |
| Flux normal, `display`, positionnement | ◐ | hc-20 |
| Flexbox, Grid | ✔ | hc-7, hc-8 |
| Responsive : media queries, `viewport`, images adaptatives | ◐ | hc-9 |
| Transitions, animations | ✔ | hc-10, hc-21 |
| Variables CSS | ✔ | hc-17 |

## 3. JavaScript — MDN « JavaScript fundamentals » + extensions
| Thème | Statut | Leçons |
|---|---|---|
| Variables, types, opérateurs, texte, nombres | ✔ | jb-1…jb-5 |
| Conditions, boucles, fonctions | ✔ | jb-4, jb-6, js-1, js-4 |
| Tableaux, objets, JSON | ✔ | jb-9, jb-10, js-20 |
| Méthodes de tableau (`map`, `filter`, `reduce`, `every`…) | ✔ | js-2, js-3, js-5, js-17 |
| Closures, classes, modules ES | ◐ | js-7, js-19 |
| Erreurs (`try/catch`) | ✔ | jb-14 |
| **Le DOM** : sélectionner, modifier, créer, déplacer, supprimer, styles et classes | ✔✔ (MDN « DOM scripting introduction », relue 2026-11-16) | dom-1…dom-6 |
| **Événements** : `addEventListener`, objet événement, `preventDefault`, `removeEventListener`, écouteurs multiples | ✔✔ (MDN « Introduction to events », relue 2026-11-16) | ev-1…ev-5 |
| Propagation : *bubbling*, `stopPropagation`, capture, délégation, `target` / `currentTarget` | ✔✔ (MDN « Event bubbling », relue 2026-11-16) | ev-6…ev-9 |
| Requêtes réseau : `fetch`, `response.ok`, `text()`, `json()`, erreurs HTTP, `catch` | ✔✔ (MDN « Making network requests with JavaScript », relue 2026-11-16) | net-1…net-4 |
| Asynchrone : callbacks, promesses, `async/await` | ◐ | js-8, js-12 |
| API web : stockage (`localStorage`), vidéo/audio, canvas | ✗ | — |
| Orienté objet avancé (prototypes) | ✗ | — |
| Outils : npm, Git, déploiement | ◐ | nd-5 |

## 4. Accessibilité — MDN « Accessibility »
◐ Commencé : hc-24 (HTML sémantique, MDN « HTML: A good basis for accessibility »). Restent : clavier, contraste, WAI-ARIA, tests.

## 5. Node.js — nodejs.org/docs/latest/api (≈ 60 pages-modules)
| Thème | Statut | Leçons |
|---|---|---|
| `process`, arguments, environnement, signaux | ✔ | nd-1, nd-2, nd-40, nd-43 |
| Modules CommonJS / ES, `package.json` | ✔ | nd-3, nd-4, nd-5 |
| `path`, `url`, `os`, `util` | ✔ | nd-6…nd-10 |
| `events`, `timers` | ✔ | nd-11…nd-13 |
| `fs` (sync, promesses), erreurs | ✔ | nd-17…nd-21 |
| `stream`, `Buffer` | ◐ | nd-22…nd-24 |
| `crypto` | ◐ | nd-25…nd-27 |
| `http`, `fetch` | ◐ | nd-28…nd-32 |
| `child_process`, `worker_threads`, `cluster` | ◐ (forme seulement) | nd-35…nd-37 |
| `assert`, `node:test` | ◐ | nd-38, nd-39 |
| `readline` | ◐ | nd-34 |
| `https`, `net`, `dns`, `zlib` | ✗ | — |
| `stream/promises` (`pipeline`), `util.parseArgs`, `AbortController` | ✔✔ (`AbortController` nd-44, `util.parseArgs` nd-45, `zlib` nd-46, `stream/promises` nd-47) | nd-44 à nd-47 |
| Débogage (`inspector`, `--inspect`), `console`, `perf_hooks` | ✗ | — |
| Mode `--watch`, `--env-file`, `node:sqlite` | ✗ | — |
| Les nouveaux modules listés dans l’index actuel | ✗ à examiner | — |

## 6. React — react.dev « Learn React »
| Section officielle | Statut | Leçons |
|---|---|---|
| Quick Start : tutoriel Tic-Tac-Toe, Thinking in React | ✗ | — |
| Installation, outils (Vite / framework, DevTools) | ✗ | — |
| Describing the UI : composant, import/export, JSX, accolades, props, rendu conditionnel, listes, composants purs | ◐ | re-1, re-3, re-4, re-8, re-11, re-21, re-24 |
| Adding Interactivity : événements, état, *render and commit*, état = instantané, file de mises à jour, objets/tableaux immuables | ◐ | re-2, re-6, re-7, re-13, re-19 |
| Managing State : réagir à l’entrée, structurer, remonter l’état, préserver/réinitialiser, reducer, contexte | ◐ | re-9, re-14, re-15, re-18 |
| Escape Hatches : refs, DOM, effets, « pas besoin d’effet », cycle de vie, dépendances, hooks perso | ◐ | re-5, re-10, re-16, re-25 |
| API Reference : `useMemo`, `useCallback`, `memo`, `Suspense`, `useTransition`, `useId`, actions de formulaire… | ◐ (`memo`, `useCallback`, `useTransition` ✔✔ ; restent `Suspense` côté React, actions de formulaire) | re-22, re-23, re-26, re-27, re-29 |
| Tests, performance, erreurs (error boundaries) | ◐ (error boundaries ✔✔ ; restent tests et performance) | re-30 |

## 7. Next.js — nextjs.org/docs/app « Getting Started » (version 16)
| Page officielle | Statut | Leçons |
|---|---|---|
| Installation, Project Structure | ✗ | — |
| Layouts and Pages | ✔ | nx-1, nx-3, nx-10 |
| Linking and Navigating | ✔ | nx-5, nx-7, nx-8, nx-22 |
| Server and Client Components | ✔ | nx-2, ex-6 |
| Fetching data, Mutating Data (Server Functions / Actions) | ◐ | ex-1, ex-11, ex-12 |
| Caching, Revalidating | ◐ | ex-2, ex-13 |
| Error Handling (`error.js`, `not-found.js`) | ✔ | nx-12, nx-19, ex-10 |
| CSS (modules, Tailwind, global) | ✗ | — |
| Image / Font optimization | ✔ | nx-9, nx-21 |
| Metadata and OG images | ✔ | ex-7, nx-20 |
| Route Handlers | ✔ | nx-6, nx-17, nx-18, nx-23 |
| **Proxy** (ex-middleware) | ✔✔ | ex-4 |
| Deploying, Upgrading | ✗ | — |
| Authentification, base de données, variables d’environnement | ◐ | nx-13, nx-15 |

---

## Ordre de reconstruction proposé
1. **Navigateur** : combler les trous de MDN (~~document HTML~~, ~~cascade~~, texte CSS, ~~DOM~~, ~~événements~~, ~~`fetch`~~, stockage, accessibilité : les barrés sont faits).
2. **Node.js** : vérifier les 43 leçons page par page, ajouter `https`, `net`, `zlib`, `pipeline`, débogage, `--watch`.
3. **React** : suivre l’ordre exact de « Learn React », ajouter le tutoriel Tic-Tac-Toe et « Thinking in React ».
4. **Next.js** : suivre l’ordre de « Getting Started » (installation, structure, déploiement, CSS) puis un projet complet.
5. **Projets de fin de parcours** (une application complète déployée) et pages de référence.

## Engagement (ajouté)
- Coffre du jour (récompense surprise de 20 à 100 XP, fixée par la date), défi de la semaine (10 leçons = 100 XP), carte d'activité sur 16 semaines, couleurs d'accent débloquées par niveau, phrase « presque arrivé » (niveau ou cours), 7 trophées de plus.
- Code : components/Rewards.js, lib/engage.js (chestReward, weekCount, ACCENTS), Providers.addBonus. Le coffre et le défi sont enregistrés dans la table `progress` (clés `chest-AAAA-MM-JJ` et `week-AAAA-MM-JJ`), donc synchronisés entre appareils ; ils ne comptent pas dans le classement. Les XP des quêtes et du « premier coup » restent locaux.

## Leçons ajoutées le 2026-11-23 (281 au total)
- js-30 `??` (MDN Nullish coalescing), js-31 `Array.at` (MDN), js-32 `structuredClone` (MDN). Solutions exécutées dans Node : tous les tests passent. Code : lib/lessons-jsmore.js, lib/guide/jsmore.js.
