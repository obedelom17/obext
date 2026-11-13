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

## Ajouter du contenu
Cours > leçons > tests dans `lib/data.js`. Questions d'examen : `EXAMS` dans `lib/data.js` **et** réponses (index) dans `server/answers.js`.
Nom du site : `SITE_NAME` dans `lib/data.js` et titre dans `app/layout.js`.

## Vérifier que la base est bien connectée
Après déploiement, ouvre `https://TON-SITE.pages.dev/api/health` :
- `{"jwtSecret":true,"databaseUrl":true,"database":true,"tables":true}` : tout est bon ;
- `databaseUrl:false` ou `jwtSecret:false` : la variable manque dans Cloudflare Pages (puis relance un déploiement) ;
- `database:false` : la chaîne `DATABASE_URL` est fausse ou incomplète ;
- `tables:false` : `neon.sql` n'a pas été exécuté dans la base.
