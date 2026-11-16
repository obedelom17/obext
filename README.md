# obext.js — apprendre JavaScript, React et Next.js (FR/EN)

Frontend statique (export Next.js) + API sur Cloudflare Pages Functions + base Neon (Postgres).

## 1. Base de données Neon
1. Crée un projet sur https://neon.tech (plan gratuit).
2. Ouvre l'éditeur SQL et exécute le contenu de `neon.sql`.
3. Copie la chaîne de connexion (`DATABASE_URL`).

## 2. Cloudflare Pages
- Connecte le dépôt GitHub.
- Build command : `npm run build` — Build output directory : `out`
- Variables d'environnement (Settings > Variables and secrets, en « Secret » pour les deux dernières) :
  - `NODE_VERSION=20`
  - `DATABASE_URL` = chaîne Neon
  - `JWT_SECRET` = longue chaîne aléatoire (ex. `openssl rand -hex 32`)
- Le dossier `functions/` est déployé automatiquement comme API (`/api/...`).

## Développement local
```
cp .dev.vars.example .dev.vars   # remplis les valeurs
npm install
npm run pages:dev                # build + wrangler pages dev (site + API)
```
`npm run dev` seul lance le site sans l'API (pas de comptes).

## Sécurité : ce qui est fait / non fait
- Mots de passe : PBKDF2-SHA256 (100 000 itérations, limite de Cloudflare), sel aléatoire. Session : cookie HttpOnly signé HMAC, 30 jours.
- Réponses de l'examen et notation : côté serveur uniquement. Certificats : ID aléatoire, vérifiables sur `/verify/`.
- Les leçons sont validées par le navigateur : un utilisateur technique peut déclarer une leçon réussie sans l'avoir faite. Seul l'examen est contrôlé par le serveur.
- Pas de limitation de débit ni de réinitialisation de mot de passe par e-mail.

## Accès aux leçons
Les leçons sont réservées aux comptes (écran de connexion dans `components/CourseView.js`). Attention : le site est un export statique, ce verrouillage est un verrou d'interface ; le contenu pédagogique reste dans le code envoyé au navigateur. Un exemple public de certificat est sur `/certificate/exemple/`.

## Cours Node.js
Le cours Node.js (`lib/node-course.js`, explications dans `lib/guide/node.js`) s'exécute dans un Node simulé (`tools/node-shim.src.js`) : fichiers en mémoire, requêtes HTTP de test, aucun réseau réel. Après toute modification de `tools/node-shim.src.js`, relancer `node tools/build-shim.mjs` pour régénérer `lib/node-shim.js`.

## Application installable (PWA)
- `app/manifest.js` (nom, couleurs, icônes, raccourcis), icônes générées depuis le vrai logo dans `public/icons/`, service worker `public/sw.js`, page `public/offline.html`.
- `components/Install.js` : enregistre le service worker (en production seulement) et affiche un bandeau « Installer l’application » 4 s après l’arrivée (Chrome, Edge, Android). Sur iPhone, le bandeau explique « Partager → Sur l’écran d’accueil ». Refusé, il ne revient pas avant 14 jours ; un lien « Installer » reste dans le menu mobile et le pied de page.
- Pour tester : `npm run build`, servir `out/` en HTTPS (ou sur Cloudflare Pages), puis Chrome → DevTools → Application → Manifest.

## Leçons navigateur (DOM, événements, fetch)
Elles sont dans `lib/lessons-browser.js` (exercices et solutions) et `lib/guide/browser.js` (explications). Les leçons `net-*` utilisent un **serveur simulé** : `FETCH_MOCK` dans `components/CourseView.js` remplace `fetch` par une version qui sert `verse1.txt`, `verse2.txt`, `products.json` et répond 404 pour le reste, avec de vraies `Response`. Le lanceur HTML sait aussi exécuter des étapes `pre` (clics, frappes simulés) avant de vérifier la page.

## Ajouter du contenu
Cours > leçons > tests dans `lib/data.js`. Le contenu pédagogique de chaque leçon (explication, exemple, étapes, piège) est dans `lib/guide/*.js` (un fichier par cours, une entrée par `id` de leçon, FR + EN) ; la présentation de chaque cours est dans `INTRO` de `lib/guide.js`. Les leçons ajoutées (avec des liens vers les documentations officielles, sans en reprendre tout le contenu) sont dans `lib/lessons-docs.js` (exercices et solutions) et `lib/guide/docs.js` (explications) ; les liens vers les pages officielles sont dans `lib/guide/links.js`. Les textes de l'interface ajoutés au redesign sont dans `lib/ux.js`. Questions d'examen : `EXAMS` dans `lib/data.js` **et** réponses (index) dans `server/answers.js`.
Nom du site : `SITE_NAME` dans `lib/data.js` et titre dans `app/layout.js`.

## Vérifier que la base est bien connectée
Après déploiement, ouvre `https://TON-SITE.pages.dev/api/health` :
- `{"jwtSecret":true,"databaseUrl":true,"database":true,"tables":true}` : tout est bon ;
- `databaseUrl:false` ou `jwtSecret:false` : la variable manque dans Cloudflare Pages (puis relance un déploiement) ;
- `database:false` : la chaîne `DATABASE_URL` est fausse ou incomplète ;
- `tables:false` : `neon.sql` n'a pas été exécuté dans la base.

## Design
Direction éditoriale « suisse » : grille visible, très grosses lettres, un seul accent (`--signal`), curseur-caret personnalisé, bascule clair/sombre en révélation circulaire (View Transitions API), barre de progression de scroll en CSS pur. Les couleurs et la grille sont dans les variables en haut de `app/globals.css`.
Polices (Google Fonts via `next/font`) : Archivo Black (titres), Schibsted Grotesk (texte), Martian Mono (code et étiquettes). Si ton Next.js refuse un nom de police au build, remplace-le dans `app/layout.js`.
Logo : `components/Logo.js` (un « o » et un curseur de saisie) et `app/icon.svg`.
