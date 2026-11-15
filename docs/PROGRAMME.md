# Programme essentiel — du débutant total à l’opérationnel

Ce document est le **plan de reconstruction** des cours. Il part de la structure des documentations officielles
(MDN Learn, react.dev, nextjs.org, nodejs.org) et ne garde que l’essentiel pour passer de « je ne connais rien » à « je peux
construire, déployer et maintenir une application ».

## Règles de travail
1. Chaque leçon est écrite **après lecture de sa page officielle**, et cite cette page (`lib/guide/links.js`).
2. Texte reformulé (pas de copie), source citée. Vérifier la licence de chaque documentation avant publication.
3. Statuts : **✔✔** vérifié sur la documentation · **✔** présent mais écrit de mémoire (à vérifier) · **◐** partiel · **✗** manquant.
4. Aucune leçon n’est supprimée : elles sont vérifiées, corrigées ou remplacées une par une.

> Point de départ honnête : à ce jour, une seule page a été relue en détail (Next.js « proxy.js », 2026-09). Tout le reste est ✔ (de mémoire) ou ◐/✗.
> Exemple d’écart déjà trouvé : `middleware.js` est devenu `proxy.js` dans Next.js 16 (leçon ex-4 corrigée).

---

## 1. HTML — MDN « Structuring content with HTML »
| Thème | Statut | Leçons |
|---|---|---|
| Premiers pas : balises, éléments, attributs | ✔ | hc-1, hc-2 |
| Structure d’un document : `<!doctype>`, `<html lang>`, `<head>`, `<meta>`, `<title>` | ✗ | — |
| Sémantique du texte : titres, `em`/`strong`, citations, `code`, abréviations | ◐ | hc-1 |
| Listes | ✔ | hc-3 |
| Liens (relatifs, ancres, e-mail) | ◐ | hc-2 |
| Images : `alt`, `srcset`, `<picture>`, `<figure>` | ◐ | hc-2 |
| Tableaux | ✔ | hc-12 |
| Formulaires : labels, types, validation, contrôles | ◐ | hc-13, hc-14 |
| Média audio / vidéo, `details` | ✔ | hc-15, hc-16 |
| Sémantique de page (`header`, `main`, `nav`, `footer`) | ✔ | hc-11 |
| Intégrer du contenu (`iframe`), scripts | ✗ | — |

## 2. CSS — MDN « CSS fundamentals », « CSS text styling », « CSS layout »
| Thème | Statut | Leçons |
|---|---|---|
| Syntaxe, sélecteurs (type, classe, id, attribut, combinateurs) | ◐ | hc-4, hc-5 |
| Cascade, spécificité, héritage | ✗ | — |
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
| **Le DOM** : sélectionner, modifier, créer des éléments | ✗ | — |
| **Événements** du navigateur (`addEventListener`, délégation) | ✗ | — |
| Asynchrone : callbacks, promesses, `async/await`, `fetch` | ◐ | js-8, js-12 |
| API web : stockage (`localStorage`), vidéo/audio, canvas | ✗ | — |
| Orienté objet avancé (prototypes) | ✗ | — |
| Outils : npm, Git, déploiement | ◐ | nd-5 |

## 4. Accessibilité — MDN « Accessibility »
✗ Entièrement à créer (HTML sémantique accessible, clavier, contraste, WAI-ARIA, tests).

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
| `stream/promises` (`pipeline`), `util.parseArgs`, `AbortController` | ✗ | — |
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
| API Reference : `useMemo`, `useCallback`, `memo`, `Suspense`, `useTransition`, `useId`, actions de formulaire… | ◐ | re-22, re-23 |
| Tests, performance, erreurs (error boundaries) | ✗ | — |

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
1. **Navigateur** : combler les trous de MDN (document HTML, cascade, texte CSS, **DOM**, **événements**, `fetch`, stockage, accessibilité).
2. **Node.js** : vérifier les 43 leçons page par page, ajouter `https`, `net`, `zlib`, `pipeline`, débogage, `--watch`.
3. **React** : suivre l’ordre exact de « Learn React », ajouter le tutoriel Tic-Tac-Toe et « Thinking in React ».
4. **Next.js** : suivre l’ordre de « Getting Started » (installation, structure, déploiement, CSS) puis un projet complet.
5. **Projets de fin de parcours** (une application complète déployée) et pages de référence.
