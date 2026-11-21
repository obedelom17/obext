// Explications du cours Node.js (d’après https://nodejs.org/docs/latest/api/).
export default [
['nd-1', `// node app.js Ama
console.log(process.argv);
// ['/usr/bin/node', '/chemin/app.js', 'Ama']
const name = process.argv[2]; // 'Ama'`,
 '**Node.js** est un programme qui exécute du JavaScript **en dehors du navigateur** (sur ton ordinateur ou un serveur). Quand tu tapes `node app.js Ama` dans un terminal, Node lance le fichier `app.js` et garde la ligne de commande dans le tableau **`process.argv`**. Ses deux premières cases sont fixes : le chemin de `node` et celui du fichier. **Tes arguments commencent à l’indice 2.**',
 '**Node.js** is a program that runs JavaScript **outside the browser** (on your computer or a server). When you type `node app.js Ama` in a terminal, Node runs the `app.js` file and keeps the command line in the **`process.argv`** array. Its first two slots are fixed: the path of `node` and the path of the file. **Your arguments start at index 2.**',
 ['Lis le premier argument utile : `argv[2]`.', 'S’il n’existe pas, `argv[2]` vaut `undefined` : utilise `??` pour donner « monde ».', 'Renvoie `"Bonjour, " + (argv[2] ?? "monde")`.'],
 ['Read the first useful argument: `argv[2]`.', 'If it doesn’t exist, `argv[2]` is `undefined`: use `??` to default to “monde”.', 'Return `"Bonjour, " + (argv[2] ?? "monde")`.'],
 'Commencer à l’indice 0 ou 1 est l’erreur classique : tu lirais `node` ou le nom du fichier.',
 'Starting at index 0 or 1 is the classic mistake: you’d read `node` or the file name.'],
['nd-2', `// PORT=8080 node app.js
const port = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === "production";`,
 'Les **variables d’environnement** sont des réglages donnés au programme **depuis l’extérieur** (port, clés secrètes, mode). On les lit dans l’objet `process.env`. Détail essentiel : **ce sont toujours des textes** (`"8080"`, pas `8080`) et `"false"` est un texte non vide, donc « vrai » ! Il faut convertir : `Number(…)` pour un nombre, `=== "true"` pour un booléen.',
 '**Environment variables** are settings given to the program **from the outside** (port, secret keys, mode). You read them from the `process.env` object. Key detail: **they are always strings** (`"8080"`, not `8080`) and `"false"` is a non-empty string, hence truthy! You must convert: `Number(…)` for a number, `=== "true"` for a boolean.',
 ['Écris `port: Number(env.PORT) || 3000` : si `PORT` est absent, `Number(undefined)` vaut `NaN`, donc `|| 3000` prend le relais.', 'Écris `debug: env.DEBUG === "true"`.', 'Écris `mode: env.NODE_ENV ?? "development"`, puis renvoie les trois propriétés dans un objet.'],
 ['Write `port: Number(env.PORT) || 3000`: if `PORT` is missing, `Number(undefined)` is `NaN`, so `|| 3000` takes over.', 'Write `debug: env.DEBUG === "true"`.', 'Write `mode: env.NODE_ENV ?? "development"`, then return the three properties in an object.'],
 'Affecter une valeur à `process.env.NOM` la **convertit en texte** (comportement déprécié) : `process.env.test = undefined` écrit le texte « undefined ». Pour supprimer une variable, utilise `delete process.env.NOM`.',
 'Assigning a value to `process.env.NAME` **converts it to a string** (a deprecated behaviour): `process.env.test = undefined` writes the string “undefined”. To remove a variable, use `delete process.env.NAME`.'],
['nd-3', `// math.js
function double(n) { return n * 2; }
module.exports = { double };

// app.js
const { double } = require("./math.js");`,
 'Un **module** est un fichier qui expose des choses aux autres. En **CommonJS** (le système historique de Node), un fichier **exporte** en remplissant `module.exports` et un autre **importe** avec `require("./fichier.js")`. Ce qui n’est pas exporté reste privé au fichier. Beaucoup de paquets npm existants utilisent encore ce format.',
 'A **module** is a file that exposes things to others. In **CommonJS** (Node’s historical system), a file **exports** by filling `module.exports` and another **imports** with `require("./file.js")`. Anything not exported stays private to the file. Many existing npm packages still use this format.',
 ['Écris la fonction `add(a, b)` qui renvoie `a + b`.', 'Écris `sub(a, b)` qui renvoie `a - b`.', 'Termine par `module.exports = { add, sub };`.'],
 ['Write the function `add(a, b)` returning `a + b`.', 'Write `sub(a, b)` returning `a - b`.', 'Finish with `module.exports = { add, sub };`.'],
 'N’écris pas `module.exports.add = add` **puis** `module.exports = {…}` : la deuxième ligne écrase la première.',
 'Don’t write `module.exports.add = add` **then** `module.exports = {…}`: the second line overwrites the first.'],
['nd-4', `// utils.js  (avec "type": "module" dans package.json)
import path from "node:path";
export function base(file) { return path.basename(file); }

// app.js
import { base } from "./utils.js";`,
 'Les **modules ES** (ESM) sont la syntaxe de module standard de JavaScript : `import` et `export`. Node.js les reconnaît pour les fichiers `.mjs` et pour les `.js` d’un paquet dont le `package.json` contient `"type": "module"`. Avec `import`, une **extension de fichier** doit être donnée pour résoudre un chemin relatif ou absolu (`./util.js`), et les index de répertoire doivent aussi être entièrement précisés. Dans un module ES, `require`, `exports` et `module.exports` n’existent pas, ni `__filename` et `__dirname` : on utilise `import.meta.filename` et `import.meta.dirname`.',
 '**ES modules** (ESM) are JavaScript’s standard module syntax: `import` and `export`. Node.js recognises them for `.mjs` files and for `.js` files in a package whose `package.json` contains `"type": "module"`. With `import`, a **file extension** must be provided to resolve a relative or absolute specifier (`./util.js`), and directory indexes must also be fully specified. In an ES module, `require`, `exports` and `module.exports` don’t exist, nor do `__filename` and `__dirname`: use `import.meta.filename` and `import.meta.dirname`.',
 ['L’import est déjà là : `import path from "node:path"`.', 'Écris `export function fileExt(file) {`.', 'Renvoie `path.extname(file).slice(1).toLowerCase()` : `extname` donne `.PNG`, `slice(1)` enlève le point.'],
 ['The import is already there: `import path from "node:path"`.', 'Write `export function fileExt(file) {`.', 'Return `path.extname(file).slice(1).toLowerCase()`: `extname` gives `.PNG`, `slice(1)` removes the dot.'],
 'Pour charger un fichier JSON avec `import`, la syntaxe `with { type: "json" }` est obligatoire : `import config from "./package.json" with { type: "json" }`.',
 'To load a JSON file with `import`, the `with { type: "json" }` syntax is mandatory: `import config from "./package.json" with { type: "json" }`.'],
['nd-5', `{
  "name": "mon-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": { "start": "node index.js" },
  "dependencies": { "express": "^4.19.0" }
}`,
 '`package.json` est la **carte d’identité** d’un projet Node. Il contient son `name`, sa `version`, son `type` (`"module"` pour `import`/`export`), ses `scripts` (des commandes qu’on lance avec `npm run nom`, ou `npm start`) et ses `dependencies` (les paquets npm utilisés). `npm install` lit ce fichier pour télécharger les dépendances dans `node_modules`. Sans champ `type`, Node.js lit les fichiers `.js` comme du **CommonJS** ; la documentation Node.js recommande de toujours écrire `type`, même quand tout le code est en CommonJS (`"commonjs"`), pour être explicite.',
 '`package.json` is a Node project’s **identity card**. It holds its `name`, `version`, `type` (`"module"` for `import`/`export`), `scripts` (commands run with `npm run name`, or `npm start`) and `dependencies` (the npm packages used). `npm install` reads this file to download the dependencies into `node_modules`. Without a `type` field, Node.js reads `.js` files as **CommonJS**; the Node.js documentation recommends always writing `type`, even when all the code is CommonJS (`"commonjs"`), to be explicit.',
 ['Renvoie un objet avec `name` (le paramètre), `version: "1.0.0"`, `type: "module"`.', 'Ajoute `scripts: { start: "node index.js", test: "node --test" }`.', 'Teste avec `"demo"` : tu dois retrouver ces quatre propriétés (`name`, `version`, `type`, `scripts`).'],
 ['Return an object with `name` (the parameter), `version: "1.0.0"`, `type: "module"`.', 'Add `scripts: { start: "node index.js", test: "node --test" }`.', 'Test with `"demo"`: you should find those four properties (`name`, `version`, `type`, `scripts`).'],
 'N’ajoute jamais `node_modules` à Git : `npm install` le recrée à partir de `package.json`.',
 'Never add `node_modules` to Git: `npm install` recreates it from `package.json`.'],
['nd-6', `import path from "node:path";
path.basename("/a/b/c.txt");        // "c.txt"
path.basename("/a/b/c.txt", ".txt"); // "c"
path.extname("/a/b/c.txt");         // ".txt"
path.dirname("/a/b/c.txt");         // "/a/b"`,
 'Le module **`node:path`** fournit des utilitaires pour manipuler les chemins de fichiers et de dossiers, avec le **séparateur propre à la plateforme** (Windows utilise la barre oblique inverse). Il ne consulte **pas** le système de fichiers pour vérifier qu’un chemin est valide. `dirname` renvoie le dossier, `basename` le nom avec extension (un second argument retire un suffixe), `extname` l’extension depuis le **dernier** point, avec ce point.',
 'The **`node:path`** module provides utilities for working with file and directory paths, using the **platform’s own separator** (Windows uses the backslash). It does **not** consult the file system to check that a path is valid. `dirname` returns the directory, `basename` the name with its extension (a second argument removes a suffix), `extname` the extension from the **last** `.`, including that dot.',
 ['Garde l’extension : `const ext = path.extname(p);`.', 'Prépare `dir: path.dirname(p)` et `base: path.basename(p)`.', 'Pour `name`, retire l’extension : `path.basename(p, ext)`.'],
 ['Keep the extension: `const ext = path.extname(p);`.', 'Prepare `dir: path.dirname(p)` and `base: path.basename(p)`.', 'For `name`, strip the extension: `path.basename(p, ext)`.'],
 '`extname` prend le **dernier** point du nom : `index.test.js` donne `.js`. Si le nom commence par un point et n’en contient pas d’autre (`.index`), ou n’en contient aucun, le résultat est une chaîne **vide**.',
 '`extname` takes the **last** dot of the name: `index.test.js` gives `.js`. If the name starts with a dot and has no other (`.index`), or has none at all, the result is an **empty** string.'],
['nd-7', `import path from "node:path";
const base = "/srv/public";
path.resolve(base, "img/a.png");   // "/srv/public/img/a.png"
path.resolve(base, "../secret");   // "/srv/secret"  ← sorti du dossier !`,
 'Une **faille classique** : un visiteur demande `/../../etc/passwd` et ton serveur lui envoie un fichier secret (« path traversal »). `path.resolve(base, chemin)` calcule le chemin **absolu final** en interprétant les `..`. Il suffit ensuite de vérifier que ce résultat **commence par `base` suivi d’un séparateur** (`base + path.sep`). Le séparateur évite qu’un dossier voisin comme `/srv/public-secret` soit pris pour valide.',
 'A **classic vulnerability**: a visitor asks for `/../../etc/passwd` and your server sends them a secret file (“path traversal”). `path.resolve(base, path)` computes the **final absolute path** by interpreting the `..`. Then just check that the result **starts with `base` followed by a separator** (`base + path.sep`). The separator prevents a neighbouring folder like `/srv/public-secret` from being accepted.',
 ['Calcule `const full = path.resolve(base, userPath);`.', 'Teste `full === base || full.startsWith(base + path.sep)`.', 'Renvoie `full` si c’est vrai, sinon `null`.'],
 ['Compute `const full = path.resolve(base, userPath);`.', 'Test `full === base || full.startsWith(base + path.sep)`.', 'Return `full` if true, otherwise `null`.'],
 'N’utilise pas `startsWith(base)` seul : `/srv/public-secret` commence bien par `/srv/public`.',
 'Don’t use `startsWith(base)` alone: `/srv/public-secret` does start with `/srv/public`.'],
['nd-8', `const url = new URL("https://exemple.com/a/b?x=1&y=2#top");
url.host;                         // "exemple.com"
url.pathname;                     // "/a/b"
url.searchParams.get("x");        // "1"
Object.fromEntries(url.searchParams); // { x: "1", y: "2" }`,
 '`URL` (disponible partout, dans Node comme dans le navigateur) découpe une adresse en morceaux : `host`, `pathname`, `search`, `hash`… `url.searchParams` est un objet **`URLSearchParams`** : `get("x")`, `has`, `append`, et il se parcourt comme une liste de paires. `Object.fromEntries(url.searchParams)` le transforme en objet simple. Évite de découper les adresses avec des expressions régulières.',
 '`URL` (available everywhere, in Node and in browsers) splits an address into pieces: `host`, `pathname`, `search`, `hash`… `url.searchParams` is a **`URLSearchParams`** object: `get("x")`, `has`, `append`, and it iterates as a list of pairs. `Object.fromEntries(url.searchParams)` turns it into a plain object. Avoid cutting addresses with regular expressions.',
 ['Crée `const url = new URL(u);`.', 'Renvoie `host: url.host` et `path: url.pathname`.', 'Ajoute `query: Object.fromEntries(url.searchParams)`.'],
 ['Create `const url = new URL(u);`.', 'Return `host: url.host` and `path: url.pathname`.', 'Add `query: Object.fromEntries(url.searchParams)`.'],
 '`new URL("/chemin")` sans domaine lance une erreur : il faut une adresse complète (ou une base en 2e argument).',
 '`new URL("/path")` without a domain throws: you need a full address (or a base as 2nd argument).'],
['nd-9', `import { promisify } from "node:util";
import { readFile } from "node:fs";

const readFileAsync = promisify(readFile);
const text = await readFileAsync("a.txt", "utf8");`,
 'Avant les promesses, Node utilisait des **callbacks « erreur d’abord »** : `fonction(args, (err, valeur) => …)`. `util.promisify(fn)` convertit une telle fonction en fonction qui **renvoie une promesse** : tu peux alors utiliser `await` et `try/catch`. Condition : le callback doit être le **dernier** argument et suivre la forme `(err, valeur)`.',
 'Before promises, Node used **error-first callbacks**: `function(args, (err, value) => …)`. `util.promisify(fn)` converts such a function into one that **returns a promise**: you can then use `await` and `try/catch`. Condition: the callback must be the **last** argument and follow the `(err, value)` shape.',
 ['Écris `const doubleAsync = promisify(slowDouble);`.', 'Dans `run`, écris `return await doubleAsync(n);`.', 'Teste : `run(21)` doit donner 42.'],
 ['Write `const doubleAsync = promisify(slowDouble);`.', 'In `run`, write `return await doubleAsync(n);`.', 'Test: `run(21)` should give 42.'],
 'Passe la **fonction** à `promisify` (`slowDouble`), pas son résultat (`slowDouble(2)`).',
 'Pass the **function** to `promisify` (`slowDouble`), not its result (`slowDouble(2)`).'],
['nd-10', `import os from "node:os";
os.platform();       // "linux", "darwin" (Mac), "win32"
os.cpus().length;    // nombre de cœurs
os.totalmem();       // mémoire totale en octets
os.homedir();        // dossier personnel`,
 'Le module **`node:os`** donne des informations sur la machine où tourne le programme : système (`platform`), processeurs (`cpus()` renvoie un **tableau**, d’où `.length` pour les compter), mémoire (`totalmem`, `freemem`), dossiers (`homedir`, `tmpdir`). Utile pour adapter un programme à son environnement. **Attention** : la documentation Node.js précise que `os.cpus().length` ne doit pas servir à calculer le parallélisme disponible ; pour décider combien de processus ou de fils lancer, utilise **`os.availableParallelism()`**.',
 'The **`node:os`** module gives information about the machine the program runs on: system (`platform`), processors (`cpus()` returns an **array**, hence `.length` to count them), memory (`totalmem`, `freemem`), folders (`homedir`, `tmpdir`). Handy for adapting a program to its environment. **Careful**: the Node.js documentation states that `os.cpus().length` should not be used to compute the available parallelism; to decide how many processes or threads to start, use **`os.availableParallelism()`**.',
 ['Appelle `os.platform()` pour la propriété `platform`.', 'Compte les processeurs avec `os.cpus().length`.', 'Ajoute `tmp: os.tmpdir()` et renvoie l’objet.'],
 ['Call `os.platform()` for the `platform` property.', 'Count the processors with `os.cpus().length`.', 'Add `tmp: os.tmpdir()` and return the object.'],
 'Ici l’environnement est simulé : sur ta vraie machine, les valeurs seront celles de ton ordinateur.',
 'Here the environment is simulated: on your real machine, the values will be your computer’s.'],
['nd-11', `import { EventEmitter } from "node:events";

class Door extends EventEmitter {
  open() { this.emit("opened", Date.now()); }
}
const d = new Door();
d.on("opened", (t) => console.log("ouverte à", t));
d.open();`,
 'Une grande partie de Node fonctionne avec des **événements** : un objet **émet** (`emit`) un signal nommé, et d’autres parties du code **écoutent** (`on`) ce signal. `EventEmitter` fournit ce mécanisme. On crée souvent sa propre classe qui **étend** `EventEmitter` : `class Chat extends EventEmitter`. Les arguments de `emit` arrivent dans la fonction passée à `on`. Les serveurs HTTP, les flux et les processus sont tous des `EventEmitter`.',
 'Much of Node works with **events**: an object **emits** (`emit`) a named signal, and other parts of the code **listen** (`on`) to it. `EventEmitter` provides that mechanism. You often create your own class that **extends** `EventEmitter`: `class Chat extends EventEmitter`. The arguments of `emit` arrive in the function passed to `on`. HTTP servers, streams and processes are all `EventEmitter`s.',
 ['Écris `class Chat extends EventEmitter {`.', 'Dedans, une méthode `say(msg) {`.', 'Dans `say`, écris `this.emit("message", msg);`.'],
 ['Write `class Chat extends EventEmitter {`.', 'Inside, a method `say(msg) {`.', 'In `say`, write `this.emit("message", msg);`.'],
 '`emit` appelle les écouteurs **de façon synchrone**, dans l’ordre où ils ont été enregistrés ; les valeurs qu’ils renvoient sont ignorées. `emit` renvoie `true` si l’événement avait des écouteurs, `false` sinon.',
 '`emit` calls the listeners **synchronously**, in the order they were registered; the values they return are ignored. `emit` returns `true` if the event had listeners, `false` otherwise.'],
['nd-12', `const em = new EventEmitter();
em.on("tick", () => console.log("à chaque fois"));
em.once("tick", () => console.log("une seule fois"));
em.emit("tick"); // les deux
em.emit("tick"); // seulement le premier`,
 '`on` écoute **à chaque** émission. `once` écoute **une seule fois** puis se retire tout seul (idéal pour « quand c’est prêt »). `off` (ou `removeListener`) retire un écouteur à la main. Retirer les écouteurs devenus inutiles évite les **fuites de mémoire**. `listenerCount("ping")` dit combien d’écouteurs sont branchés.',
 '`on` listens on **every** emission. `once` listens **only once** then removes itself (ideal for “when ready”). `off` (or `removeListener`) removes a listener by hand. Removing listeners that are no longer needed avoids **memory leaks**. `listenerCount("ping")` tells how many listeners are attached.',
 ['Crée `const em = new EventEmitter();` et un objet `out = { once: 0, on: 0 }`.', 'Branche `em.once("ping", () => out.once++)` et `em.on("ping", () => out.on++)`.', 'Boucle `times` fois avec `em.emit("ping")`, puis renvoie `out`.'],
 ['Create `const em = new EventEmitter();` and an object `out = { once: 0, on: 0 }`.', 'Attach `em.once("ping", () => out.once++)` and `em.on("ping", () => out.on++)`.', 'Loop `times` times with `em.emit("ping")`, then return `out`.'],
 'Un événement émis sans écouteur est simplement perdu (`emit` renvoie `false`). L’exception est l’événement **`error`** : sans écouteur, l’erreur est **lancée** et le processus s’arrête ; la documentation conseille d’ajouter toujours un écouteur pour l’événement `error`. Au-delà de 10 écouteurs sur un même événement, Node avertit d’une possible fuite de mémoire.',
 'An event emitted with no listener is simply lost (`emit` returns `false`). The exception is the **`error`** event: with no listener, the error is **thrown** and the process exits; the documentation advises always adding a listener for the `error` event. Beyond 10 listeners on a single event, Node warns about a possible memory leak.'],
['nd-13', `import { setTimeout as sleep } from "node:timers/promises";

console.log("début");
await sleep(1000);   // attend 1 seconde
console.log("1 s plus tard");`,
 '`setTimeout` classique utilise un callback. Le module **`node:timers/promises`** fournit la même chose sous forme de **promesse** : `await setTimeout(ms, valeur)` attend `ms` millisecondes puis renvoie `valeur`. On l’importe souvent sous un autre nom (`as sleep`) pour éviter la confusion avec le `setTimeout` global.',
 'The classic `setTimeout` uses a callback. The **`node:timers/promises`** module provides the same thing as a **promise**: `await setTimeout(ms, value)` waits `ms` milliseconds then returns `value`. It’s often imported under another name (`as sleep`) to avoid confusion with the global `setTimeout`.',
 ['L’import avec `as sleep` est déjà écrit.', 'Dans `waitFor`, écris `return sleep(ms, value);`.', 'Teste : `waitFor(10, "ok")` doit se résoudre en `"ok"`.'],
 ['The import with `as sleep` is already written.', 'In `waitFor`, write `return sleep(ms, value);`.', 'Test: `waitFor(10, "ok")` should resolve to `"ok"`.'],
 'Une fonction `async` qui renvoie une promesse n’a pas besoin de `await` devant : le résultat sera le même.',
 'An `async` function returning a promise doesn’t need `await` in front: the result is the same.'],
['nd-14', `async function sequence(tasks) {
  const out = [];
  for (const task of tasks) {
    out.push(await task());   // attend CHAQUE tâche avant la suivante
  }
  return out;
}`,
 'Node est **asynchrone** : une tâche lente (réseau, fichier) ne bloque pas les autres. Mais parfois l’**ordre compte** : la tâche 2 a besoin du résultat de la tâche 1. Dans ce cas on utilise une boucle `for…of` avec `await` à l’intérieur : chaque tâche **termine avant que la suivante démarre**. Ne mets pas `await` dans un `forEach` : il n’attend pas.',
 'Node is **asynchronous**: a slow task (network, file) doesn’t block the others. But sometimes **order matters**: task 2 needs task 1’s result. In that case, use a `for…of` loop with `await` inside: each task **finishes before the next one starts**. Don’t put `await` in a `forEach`: it doesn’t wait.',
 ['Crée `const results = [];`.', 'Écris `for (const task of tasks) {` puis `results.push(await task());`.', 'Après la boucle, `return results;`.'],
 ['Create `const results = [];`.', 'Write `for (const task of tasks) {` then `results.push(await task());`.', 'After the loop, `return results;`.'],
 '`tasks.forEach(async (t) => await t())` lance **tout en même temps** et ne se laisse pas attendre.',
 '`tasks.forEach(async (t) => await t())` starts **everything at once** and can’t be awaited.'],
['nd-15', `async function all(tasks) {
  // lance tout de suite, attend ensemble
  return Promise.all(tasks.map((task) => task()));
}`,
 'Quand les tâches sont **indépendantes**, les lancer en parallèle est bien plus rapide : trois requêtes de 1 s prennent 1 s au total, pas 3. `tasks.map((t) => t())` démarre toutes les tâches (on obtient un tableau de promesses) et `Promise.all` attend qu’**elles soient toutes terminées**, en gardant l’ordre de la liste. Si **une seule** échoue, `Promise.all` échoue aussitôt (les autres tâches, elles, continuent de s’exécuter : le rejet ne les annule pas).',
 'When tasks are **independent**, starting them in parallel is much faster: three 1 s requests take 1 s in total, not 3. `tasks.map((t) => t())` starts every task (you get an array of promises) and `Promise.all` waits for **all of them to finish**, keeping list order. If **even one** fails, `Promise.all` fails immediately (the other tasks keep running: the rejection doesn’t cancel them).',
 ['Appelle chaque tâche : `tasks.map((task) => task())`.', 'Entoure avec `Promise.all(…)`.', 'Renvoie le résultat : `return Promise.all(…);`.'],
 ['Call each task: `tasks.map((task) => task())`.', 'Wrap it with `Promise.all(…)`.', 'Return the result: `return Promise.all(…);`.'],
 'Ne mets pas `await` dans le `map` : tu les rendrais séquentielles sans t’en rendre compte.',
 'Don’t put `await` inside the `map`: you’d make them sequential without noticing.'],
['nd-16', `const results = await Promise.allSettled([
  fetch("/a"), fetch("/b"), fetch("/c"),
]);
// chaque élément : { status: "fulfilled", value } ou { status: "rejected", reason }`,
 '`Promise.all` s’arrête à la **première** erreur. Quand tu veux **tout tenter** et faire le bilan ensuite (envoyer 100 e-mails, par exemple), utilise **`Promise.allSettled`** : elle attend que toutes les promesses soient terminées et renvoie, pour chacune, un objet `{ status: "fulfilled", value }` ou `{ status: "rejected", reason }`. Aucune exception n’est lancée.',
 '`Promise.all` stops at the **first** error. When you want to **try everything** and tally up afterwards (sending 100 e-mails, for example), use **`Promise.allSettled`**: it waits for all promises to finish and returns, for each, an object `{ status: "fulfilled", value }` or `{ status: "rejected", reason }`. No exception is thrown.',
 ['Écris `const r = await Promise.allSettled(promises);`.', 'Compte les réussies : `r.filter((x) => x.status === "fulfilled").length`.', 'Compte les échouées avec `"rejected"` et renvoie `{ ok, failed }`.'],
 ['Write `const r = await Promise.allSettled(promises);`.', 'Count successes: `r.filter((x) => x.status === "fulfilled").length`.', 'Count failures with `"rejected"` and return `{ ok, failed }`.'],
 'Le statut est écrit `"fulfilled"` (pas `"success"` ni `"resolved"`).',
 'The status is spelled `"fulfilled"` (not `"success"` or `"resolved"`).'],
['nd-17', `import fs from "node:fs";

const text = fs.readFileSync("notes.txt", "utf8"); // lit
fs.writeFileSync("copie.txt", text);               // écrit (remplace)
fs.appendFileSync("log.txt", "une ligne\\n");        // ajoute à la fin`,
 '`node:fs` (« file system ») lit et écrit des fichiers. Les versions **`Sync`** (`readFileSync`) **bloquent** le programme jusqu’à la fin : pratiques pour un script ou au démarrage. **Précise toujours l’encodage** (`"utf8"`) pour recevoir un **texte** ; sans lui, tu reçois un `Buffer` (des octets bruts). `writeFileSync` **remplace** le contenu existant ; `appendFileSync` ajoute à la fin.',
 '`node:fs` (“file system”) reads and writes files. The **`Sync`** versions (`readFileSync`) **block** the program until they finish: handy for a script or at startup. **Always specify the encoding** (`"utf8"`) to receive a **string**; without it you get a `Buffer` (raw bytes). `writeFileSync` **replaces** existing content; `appendFileSync` adds at the end.',
 ['Lis la source : `const text = fs.readFileSync(src, "utf8");`.', 'Mets en majuscules : `text.toUpperCase()`.', 'Écris : `fs.writeFileSync(dst, text.toUpperCase());`.'],
 ['Read the source: `const text = fs.readFileSync(src, "utf8");`.', 'Upper-case it: `text.toUpperCase()`.', 'Write: `fs.writeFileSync(dst, text.toUpperCase());`.'],
 'Dans un serveur, évite les versions `Sync` : elles bloquent **toutes** les requêtes pendant la lecture.',
 'In a server, avoid the `Sync` versions: they block **all** requests during the read.'],
['nd-18', `import fs from "node:fs/promises";

try {
  const text = await fs.readFile("config.json", "utf8");
  const config = JSON.parse(text);
} catch (error) {
  console.error(error.code); // "ENOENT" si le fichier n’existe pas
}`,
 '`node:fs/promises` offre les mêmes fonctions que `fs`, mais sous forme de **promesses** (`await fs.readFile(…)`) : elles **ne bloquent pas** le programme. C’est la forme recommandée dans un serveur. Si le fichier n’existe pas, la promesse est **rejetée** avec une erreur dont le code est `ENOENT`. Lire un fichier JSON = lire le texte puis `JSON.parse`.',
 '`node:fs/promises` offers the same functions as `fs`, but as **promises** (`await fs.readFile(…)`): they **don’t block** the program. It’s the recommended form in a server. If the file doesn’t exist, the promise is **rejected** with an error whose code is `ENOENT`. Reading a JSON file = reading the text then `JSON.parse`.',
 ['Écris `const text = await fs.readFile(file, "utf8");`.', 'Écris `return JSON.parse(text);`.', 'N’ajoute pas de `try/catch` : l’erreur doit remonter à l’appelant.'],
 ['Write `const text = await fs.readFile(file, "utf8");`.', 'Write `return JSON.parse(text);`.', 'Don’t add a `try/catch`: the error must bubble up to the caller.'],
 'Un JSON invalide fait aussi échouer `JSON.parse` : prévois ce cas dans un vrai programme.',
 'Invalid JSON also makes `JSON.parse` fail: plan for that case in a real program.'],
['nd-19', `import fs from "node:fs";

const names = fs.readdirSync("./src");   // ["a.js", "b.md", "lib"]
const js = names.filter((n) => n.endsWith(".js"));`,
 '`fs.readdirSync(dossier)` renvoie un **tableau de noms** (fichiers **et** sous-dossiers, sans leur chemin). On le combine avec les méthodes de tableau : `filter` pour garder certains noms, `sort` pour trier. Pour savoir si un nom est un dossier, on utilise `fs.statSync(chemin).isDirectory()`. Pense à recomposer le chemin complet avec `path.join(dossier, nom)`.',
 '`fs.readdirSync(folder)` returns an **array of names** (files **and** sub-folders, without their path). Combine it with array methods: `filter` to keep some names, `sort` to order them. To know whether a name is a folder, use `fs.statSync(path).isDirectory()`. Remember to rebuild the full path with `path.join(folder, name)`.',
 ['Liste le dossier : `fs.readdirSync(dir)`.', 'Garde les noms `.js` : `.filter((name) => name.endsWith(".js"))`.', 'Trie avec `.sort()` et renvoie le tout.'],
 ['List the folder: `fs.readdirSync(dir)`.', 'Keep `.js` names: `.filter((name) => name.endsWith(".js"))`.', 'Sort with `.sort()` and return it all.'],
 'L’ordre de `readdir` dépend du système : trie toujours si l’ordre doit être fiable.',
 '`readdir` order depends on the system: always sort if order must be reliable.'],
['nd-20', `import fs from "node:fs";

try {
  fs.readFileSync("absent.txt", "utf8");
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("fichier absent");   // cas attendu : on le gère
  } else {
    throw error;                      // cas inattendu : on relance
  }
}`,
 'Les erreurs de fichiers ont un **code** lisible : `ENOENT` (n’existe pas), `EACCES` (permission refusée), `EISDIR` (c’est un dossier), `EEXIST` (existe déjà). Le bon réflexe : **gérer uniquement l’erreur que tu attends**, et **relancer** (`throw error`) toutes les autres. Attraper tout sans distinction cache de vrais bugs.',
 'File errors have a readable **code**: `ENOENT` (doesn’t exist), `EACCES` (permission denied), `EISDIR` (it’s a folder), `EEXIST` (already exists). The right reflex: **handle only the error you expect**, and **rethrow** (`throw error`) all others. Catching everything indiscriminately hides real bugs.',
 ['Entoure la lecture d’un `try { … } catch (error) { … }`.', 'Dans le `catch` : `if (error.code === "ENOENT") return null;`.', 'Sinon, relance avec `throw error;`.'],
 ['Wrap the read in a `try { … } catch (error) { … }`.', 'In the `catch`: `if (error.code === "ENOENT") return null;`.', 'Otherwise rethrow with `throw error;`.'],
 'Un `catch` qui renvoie toujours `null` transforme un problème de permission en « fichier absent » : dangereux.',
 'A `catch` that always returns `null` turns a permission problem into “file missing”: dangerous.'],
['nd-21', `import fs from "node:fs";
import path from "node:path";

fs.mkdirSync("a/b/c", { recursive: true });  // crée a, a/b, a/b/c
fs.writeFileSync(path.join("a/b/c", "x.json"), "{}");`,
 '`writeFileSync` échoue si le **dossier parent n’existe pas**. `fs.mkdirSync(dossier, { recursive: true })` crée tous les niveaux manquants, et **ne se plaint pas** si le dossier existe déjà : parfait avant d’écrire. `JSON.stringify(data, null, 2)` produit un JSON **joliment indenté** de 2 espaces, lisible par un humain.',
 '`writeFileSync` fails if the **parent folder doesn’t exist**. `fs.mkdirSync(folder, { recursive: true })` creates all missing levels, and **doesn’t complain** if the folder already exists: perfect before writing. `JSON.stringify(data, null, 2)` produces **nicely indented** JSON with 2 spaces, readable by humans.',
 ['Trouve le dossier : `path.dirname(file)`.', 'Crée-le : `fs.mkdirSync(path.dirname(file), { recursive: true });`.', 'Écris : `fs.writeFileSync(file, JSON.stringify(data, null, 2));`.'],
 ['Find the folder: `path.dirname(file)`.', 'Create it: `fs.mkdirSync(path.dirname(file), { recursive: true });`.', 'Write: `fs.writeFileSync(file, JSON.stringify(data, null, 2));`.'],
 'Sans `{ recursive: true }`, `mkdirSync` lance une erreur si le dossier existe déjà.',
 'Without `{ recursive: true }`, `mkdirSync` throws if the folder already exists.'],
['nd-22', `import { createReadStream } from "node:fs";

const stream = createReadStream("gros.txt", "utf8");
for await (const chunk of stream) {
  console.log("morceau de", chunk.length, "caractères");
}`,
 'Lire un énorme fichier d’un coup saturerait la mémoire. Un **flux** (`stream`) le livre **par morceaux** (`chunk`). Un `Readable` est un objet qu’on parcourt avec **`for await (const chunk of flux)`**. Attention : **un morceau ne coïncide pas avec une ligne** — un `\\n` peut tomber à cheval entre deux morceaux, donc on recolle avant de découper.',
 'Reading a huge file at once would saturate memory. A **stream** delivers it **in pieces** (`chunk`). A `Readable` is an object you walk with **`for await (const chunk of stream)`**. Careful: **a chunk doesn’t match a line** — a `\\n` can fall across two chunks, so glue them back together before splitting.',
 ['Crée `let text = "";`.', 'Écris `for await (const chunk of readable) { text += chunk; }`.', 'Découpe : `text.split("\\n").filter(Boolean).length`.'],
 ['Create `let text = "";`.', 'Write `for await (const chunk of readable) { text += chunk; }`.', 'Split: `text.split("\\n").filter(Boolean).length`.'],
 '`filter(Boolean)` retire les lignes vides, par exemple celle qui suit le dernier `\\n`.',
 '`filter(Boolean)` removes empty lines, for example the one after the last `\\n`.'],
['nd-23', `import { Transform } from "node:stream";

const shout = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});
// source.pipe(shout).pipe(destination)`,
 'Un `Transform` est un **maillon** d’une chaîne de flux : il **reçoit** des données, les **modifie**, et les **renvoie**. Dans `transform(chunk, encoding, callback)`, tu calcules le résultat puis tu appelles **`callback(erreur, résultat)`** : `null` comme erreur si tout va bien. On les enchaîne avec `.pipe()` ou `pipeline()` : lire, compresser, chiffrer, écrire, sans jamais tout garder en mémoire.',
 'A `Transform` is a **link** in a stream chain: it **receives** data, **changes** it, and **sends it on**. In `transform(chunk, encoding, callback)`, you compute the result then call **`callback(error, result)`**: `null` as the error if all is well. They’re chained with `.pipe()` or `pipeline()`: read, compress, encrypt, write, without ever holding everything in memory.',
 ['Renvoie `new Transform({ … })`.', 'Dedans, écris la méthode `transform(chunk, encoding, callback) {`.', 'Appelle `callback(null, chunk.toString().toUpperCase());`.'],
 ['Return `new Transform({ … })`.', 'Inside, write the method `transform(chunk, encoding, callback) {`.', 'Call `callback(null, chunk.toString().toUpperCase());`.'],
 '`chunk` est un `Buffer` : appelle `.toString()` avant d’utiliser des méthodes de texte.',
 '`chunk` is a `Buffer`: call `.toString()` before using string methods.'],
['nd-24', `const buf = Buffer.from("hé");
buf.length;               // 3 octets (é en prend 2)
buf.toString("hex");      // "68c3a9"
buf.toString("base64");   // "aMOp"
Buffer.from("aMOp", "base64").toString(); // "hé"`,
 'Un **`Buffer`** est une suite d’**octets** (nombres de 0 à 255) : c’est ce que Node utilise pour les fichiers, les images, le réseau. Un caractère n’est pas toujours **un** octet : en UTF-8, « é » en prend **2**. D’où la différence entre `text.length` (caractères) et `Buffer.byteLength(text)` (octets). On convertit entre représentations : `toString("hex")`, `toString("base64")`, `Buffer.from(chaîne, "base64")`.',
 'A **`Buffer`** is a sequence of **bytes** (numbers 0 to 255): it’s what Node uses for files, images, the network. A character isn’t always **one** byte: in UTF-8, “é” takes **2**. Hence the difference between `text.length` (characters) and `Buffer.byteLength(text)` (bytes). You convert between representations: `toString("hex")`, `toString("base64")`, `Buffer.from(string, "base64")`.',
 ['Crée `const buf = Buffer.from(text);`.', 'Renvoie `hex: buf.toString("hex")` et `base64: buf.toString("base64")`.', 'Ajoute `bytes: Buffer.byteLength(text)`.'],
 ['Create `const buf = Buffer.from(text);`.', 'Return `hex: buf.toString("hex")` and `base64: buf.toString("base64")`.', 'Add `bytes: Buffer.byteLength(text)`.'],
 'Base64 **n’est pas du chiffrement** : n’importe qui peut le décoder. Il sert à transporter des octets sous forme de texte.',
 'Base64 is **not encryption**: anyone can decode it. It’s for carrying bytes as text.'],
['nd-25', `import { createHash } from "node:crypto";

createHash("sha256").update("abc").digest("hex");
// "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"`,
 'Une **fonction de hachage** transforme n’importe quel texte en une **empreinte** de taille fixe (64 caractères hexadécimaux pour SHA-256). Deux propriétés : le **même texte** donne **toujours la même** empreinte, et on ne peut **pas retrouver** le texte à partir de l’empreinte. On s’en sert pour vérifier l’intégrité d’un fichier ou comparer sans stocker l’original. **Pour les mots de passe**, SHA-256 seul ne suffit pas : utilise une fonction conçue pour cela, comme **`crypto.scrypt`** (ou `crypto.pbkdf2`), volontairement coûteuse en calcul et en mémoire pour décourager les attaques par force brute.',
 'A **hash function** turns any text into a fixed-size **fingerprint** (64 hex characters for SHA-256). Two properties: the **same text** **always** gives the same fingerprint, and you **can’t recover** the text from the fingerprint. Used to check a file’s integrity or compare without storing the original. **For passwords**, plain SHA-256 isn’t enough: use a function designed for that, such as **`crypto.scrypt`** (or `crypto.pbkdf2`), deliberately expensive in computation and memory to discourage brute-force attacks.',
 ['Importe `createHash` (déjà fait).', 'Écris `createHash("sha256")` puis `.update(text)`.', 'Termine par `.digest("hex")` et renvoie le résultat.'],
 ['`createHash` is already imported.', 'Write `createHash("sha256")` then `.update(text)`.', 'Finish with `.digest("hex")` and return the result.'],
 'Sans `"hex"`, `digest()` renvoie un `Buffer` et non un texte.',
 'Without `"hex"`, `digest()` returns a `Buffer`, not a string.'],
['nd-26', `import { createHmac } from "node:crypto";

const secret = process.env.SECRET;
const signature = createHmac("sha256", secret).update("user:42").digest("hex");
// on envoie "user:42" + signature ; le serveur la recalcule pour vérifier`,
 'Un **HMAC** est une empreinte calculée **avec une clé secrète**. Seul celui qui connaît le secret peut produire (ou vérifier) la bonne signature : si quelqu’un modifie le message, la signature ne correspond plus. C’est la base des jetons de session et des webhooks. Pour **comparer** deux signatures, utilise `crypto.timingSafeEqual`, qui évite de laisser fuiter des informations par le temps de calcul.',
 'An **HMAC** is a fingerprint computed **with a secret key**. Only someone who knows the secret can produce (or verify) the right signature: if someone alters the message, the signature no longer matches. It’s the basis of session tokens and webhooks. To **compare** two signatures, use `crypto.timingSafeEqual`, which avoids leaking information through computation time.',
 ['Appelle `createHmac("sha256", secret)`.', 'Ajoute `.update(message)`.', 'Termine par `.digest("hex")` et renvoie.'],
 ['Call `createHmac("sha256", secret)`.', 'Add `.update(message)`.', 'Finish with `.digest("hex")` and return.'],
 'N’inclus jamais le secret dans le message ni dans la réponse : seule la **signature** circule.',
 'Never include the secret in the message or the response: only the **signature** travels.'],
['nd-27', `import { randomBytes, randomUUID } from "node:crypto";

randomBytes(16).toString("hex"); // 32 caractères imprévisibles
randomUUID();                     // "3b241101-e2bb-4255-8caf-4136c566a962"`,
 '`Math.random()` est **prévisible** : à ne jamais utiliser pour un mot de passe temporaire, un jeton de session ou un lien de réinitialisation. `crypto.randomBytes(n)` fournit des octets **cryptographiquement sûrs**. Chaque octet fait **2 caractères hexadécimaux** : 16 octets → 32 caractères. `crypto.randomUUID()` donne un identifiant unique prêt à l’emploi.',
 '`Math.random()` is **predictable**: never use it for a temporary password, a session token or a reset link. `crypto.randomBytes(n)` provides **cryptographically secure** bytes. Each byte is **2 hexadecimal characters**: 16 bytes → 32 characters. `crypto.randomUUID()` gives a ready-made unique id.',
 ['Importe `randomBytes` (déjà fait).', 'Appelle `randomBytes(16)`.', 'Convertis avec `.toString("hex")` et renvoie.'],
 ['`randomBytes` is already imported.', 'Call `randomBytes(16)`.', 'Convert with `.toString("hex")` and return.'],
 'Le test vérifie aussi que tu n’as **pas** utilisé `Math.random` : c’est volontaire.',
 'The test also checks you did **not** use `Math.random`: that’s deliberate.'],
['nd-28', `import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bonjour");
});
server.listen(3000);   // http://localhost:3000`,
 'Un serveur web Node tient en quelques lignes. `http.createServer(fonction)` crée le serveur ; la fonction est appelée **à chaque requête** avec deux objets : **`req`** (la requête : `method`, `url`, `headers`) et **`res`** (la réponse que tu construis). `res.writeHead(code, en-têtes)` envoie le **code de statut** et les **en-têtes** ; `res.end(texte)` envoie le **corps** et **termine** la réponse. Sans `end`, le navigateur attend indéfiniment.',
 'A Node web server fits in a few lines. `http.createServer(function)` creates the server; the function is called **on every request** with two objects: **`req`** (the request: `method`, `url`, `headers`) and **`res`** (the response you build). `res.writeHead(code, headers)` sends the **status code** and **headers**; `res.end(text)` sends the **body** and **finishes** the response. Without `end`, the browser waits forever.',
 ['Écris `res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });`.', 'Écris `res.end("Hello Node");`.', 'Ici la requête est simulée : aucun port à ouvrir, ton `handler` est testé directement.'],
 ['Write `res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });`.', 'Write `res.end("Hello Node");`.', 'Here the request is simulated: no port to open, your `handler` is tested directly.'],
 'N’oublie jamais `res.end()` : c’est lui qui envoie la réponse.',
 'Never forget `res.end()`: it’s what sends the response.'],
['nd-29', `function handler(req, res) {
  if (req.method === "GET" && req.url === "/ping") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ pong: true }));
  }
  res.writeHead(404);
  res.end();
}`,
 'Le **routage** choisit quoi répondre selon `req.method` (GET, POST…) et `req.url`. Les **codes de statut** expriment le résultat : `200` OK, `201` créé, `400` requête invalide, `404` introuvable, `405` méthode non autorisée, `500` erreur serveur. Pour répondre en **JSON**, envoie l’en-tête `Content-Type: application/json` et un corps `JSON.stringify(objet)`. Une petite fonction `send(res, code, data)` évite de répéter ces deux lignes.',
 '**Routing** picks what to reply depending on `req.method` (GET, POST…) and `req.url`. **Status codes** express the outcome: `200` OK, `201` created, `400` invalid request, `404` not found, `405` method not allowed, `500` server error. To reply in **JSON**, send the `Content-Type: application/json` header and a `JSON.stringify(object)` body. A small `send(res, code, data)` function avoids repeating those two lines.',
 ['Écris une fonction `send(res, status, data)` : `writeHead` avec JSON puis `res.end(JSON.stringify(data))`.', 'Dans `handler`, refuse d’abord les méthodes autres que `GET` (405).', 'Puis traite `/health`, `/users`, et termine par la réponse 404.'],
 ['Write a `send(res, status, data)` function: `writeHead` with JSON then `res.end(JSON.stringify(data))`.', 'In `handler`, first reject methods other than `GET` (405).', 'Then handle `/health`, `/users`, and finish with the 404 response.'],
 'Dans une fonction avec plusieurs réponses possibles, utilise `return send(…)` pour ne pas répondre deux fois.',
 'In a function with several possible replies, use `return send(…)` so you don’t reply twice.'],
['nd-30', `function readBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => callback(body));
}`,
 'Le **corps** d’une requête `POST` n’arrive **pas d’un coup** : la requête est un flux qui émet plusieurs événements **`"data"`** (un morceau à chaque fois) puis **`"end"`** (c’est fini). On accumule les morceaux dans une variable, et **seulement dans `"end"`** on traite le tout, par exemple avec `JSON.parse`. Un JSON invalide lance une exception : entoure `JSON.parse` d’un `try/catch` et réponds **`400`**.',
 'A `POST` request’s **body** doesn’t arrive **all at once**: the request is a stream that emits several **`"data"`** events (one chunk at a time) then **`"end"`** (it’s over). You accumulate the chunks in a variable, and **only in `"end"`** process the whole, for example with `JSON.parse`. Invalid JSON throws: wrap `JSON.parse` in a `try/catch` and reply **`400`**.',
 ['Crée `let body = "";` puis `req.on("data", (chunk) => (body += chunk));`.', 'Dans `req.on("end", () => { … })`, essaie `JSON.parse(body)`.', 'En cas de succès réponds `201` avec `{ received }`, sinon `400` avec `{ error: "Invalid JSON" }`.'],
 ['Create `let body = "";` then `req.on("data", (chunk) => (body += chunk));`.', 'In `req.on("end", () => { … })`, try `JSON.parse(body)`.', 'On success reply `201` with `{ received }`, otherwise `400` with `{ error: "Invalid JSON" }`.'],
 'Limite toujours la taille du corps dans un vrai serveur : sinon un visiteur peut envoyer des gigaoctets.',
 'Always limit the body size in a real server: otherwise a visitor can send gigabytes.'],
['nd-31', `const res = await fetch("https://api.exemple.com/users/7");
if (!res.ok) throw new Error("HTTP " + res.status);
const user = await res.json();`,
 'Depuis Node 18, **`fetch`** est intégré, comme dans le navigateur. Il renvoie une promesse de `Response`. **Important** : `fetch` ne rejette la promesse **que pour une panne réseau** — une réponse `404` ou `500` est une réponse « normale ». C’est à toi de tester **`res.ok`** (vrai pour 200 à 299) et de lancer une erreur sinon. Ensuite `res.json()` lit le corps (c’est aussi une promesse).',
 'Since Node 18, **`fetch`** is built in, as in the browser. It returns a promise of a `Response`. **Important**: `fetch` only rejects the promise **for a network failure** — a `404` or `500` is a “normal” response. It’s up to you to test **`res.ok`** (true for 200 to 299) and throw an error otherwise. Then `res.json()` reads the body (also a promise).',
 ['Appelle `const res = await fetch("https://api.exemple.com/users/" + id);`.', 'Si `!res.ok`, `throw new Error("HTTP " + res.status);`.', 'Sinon `return res.json();`.'],
 ['Call `const res = await fetch("https://api.exemple.com/users/" + id);`.', 'If `!res.ok`, `throw new Error("HTTP " + res.status);`.', 'Otherwise `return res.json();`.'],
 'Dans cette leçon, `fetch` est simulé par le test : aucune vraie requête réseau n’est envoyée.',
 'In this lesson, `fetch` is simulated by the test: no real network request is sent.'],
['nd-32', `// Un middleware reçoit le contexte et "next" (la suite de la chaîne)
async function logger(ctx, next) {
  console.log("avant");
  await next();          // passe la main au suivant
  console.log("après");  // reprend quand tous les suivants ont fini
}`,
 'Un **middleware** est un maillon d’une chaîne qui traite une requête : il peut la **modifier**, **vérifier** quelque chose (identité, JSON valide), **journaliser**… puis appeler **`next()`** pour passer au maillon suivant. Le code **après** `await next()` s’exécute **au retour**, dans l’ordre inverse — comme des poupées russes. Si un middleware n’appelle pas `next()`, la chaîne **s’arrête** (par exemple un refus d’accès). Express et Koa fonctionnent ainsi.',
 'A **middleware** is a link in a chain that processes a request: it can **modify** it, **check** something (identity, valid JSON), **log**… then call **`next()`** to pass to the next link. Code **after** `await next()` runs **on the way back**, in reverse order — like Russian dolls. If a middleware doesn’t call `next()`, the chain **stops** (for example an access refusal). Express and Koa work this way.',
 ['Écris une fonction interne `dispatch(i)` qui prend le middleware numéro `i`.', 'S’il n’existe pas, renvoie `Promise.resolve()`.', 'Sinon appelle `fn(ctx, () => dispatch(i + 1))` et renvoie son résultat ; démarre avec `dispatch(0)`.'],
 ['Write an inner function `dispatch(i)` that takes middleware number `i`.', 'If it doesn’t exist, return `Promise.resolve()`.', 'Otherwise call `fn(ctx, () => dispatch(i + 1))` and return its result; start with `dispatch(0)`.'],
 'Le deuxième paramètre de chaque middleware est une **fonction** : ne l’appelle pas à l’avance, elle doit lancer le **suivant**.',
 'Each middleware’s second parameter is a **function**: don’t call it in advance, it must start the **next one**.'],
['nd-33', `class NotFoundError extends Error {
  constructor(what) {
    super(what + " introuvable");
    this.name = "NotFoundError";
    this.status = 404;
  }
}
try { throw new NotFoundError("Utilisateur"); }
catch (e) { console.log(e.status, e.message); }`,
 '`throw new Error("…")` ne dit pas **quel type** de problème c’est. Une **classe d’erreur personnalisée** étend `Error` et ajoute des informations utiles (ici le code HTTP `status`). Le constructeur appelle **`super(message)`** pour initialiser le message. On donne un `name` explicite : il apparaît dans les journaux et permet d’identifier l’erreur. Un seul `catch` peut ensuite répondre au bon code selon `error.status`.',
 '`throw new Error("…")` doesn’t say **what kind** of problem it is. A **custom error class** extends `Error` and adds useful information (here the HTTP `status` code). The constructor calls **`super(message)`** to initialise the message. Give it an explicit `name`: it shows up in logs and identifies the error. A single `catch` can then reply with the right code depending on `error.status`.',
 ['Écris `class HttpError extends Error {`.', 'Dans `constructor(status, message)`, appelle `super(message);` en premier.', 'Ajoute `this.status = status;` et `this.name = "HttpError";`.'],
 ['Write `class HttpError extends Error {`.', 'In `constructor(status, message)`, call `super(message);` first.', 'Add `this.status = status;` and `this.name = "HttpError";`.'],
 'Appelle `super(…)` avant tout `this.…`, sinon JavaScript lance une erreur de référence.',
 'Call `super(…)` before any `this.…`, or JavaScript throws a reference error.'],
['nd-34', `import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin });
for await (const line of rl) {
  console.log("Tu as tapé :", line);
}`,
 '`process.stdin` est l’**entrée standard** : ce que l’utilisateur tape dans le terminal, ou ce qu’un autre programme lui envoie (`cat fichier | node app.js`). Le module **`node:readline`** la découpe **ligne par ligne**. `createInterface({ input: process.stdin })` crée l’interface, et on la parcourt avec `for await (const line of rl)`. Idéal pour de petits outils en ligne de commande.',
 '`process.stdin` is the **standard input**: what the user types in the terminal, or what another program sends (`cat file | node app.js`). The **`node:readline`** module splits it **line by line**. `createInterface({ input: process.stdin })` creates the interface, and you walk it with `for await (const line of rl)`. Ideal for small command-line tools.',
 ['Importe `readline` depuis `"node:readline"`.', 'Crée `const rl = readline.createInterface({ input: process.stdin });`.', 'Parcours : `for await (const line of rl) { … }`.'],
 ['Import `readline` from `"node:readline"`.', 'Create `const rl = readline.createInterface({ input: process.stdin });`.', 'Walk it: `for await (const line of rl) { … }`.'],
 'Cet exercice est vérifié par la **forme** du code : il ne peut pas lire un vrai clavier dans le navigateur.',
 'This exercise is checked by the **shape** of the code: it can’t read a real keyboard in the browser.'],
['nd-35', `import { execFile } from "node:child_process";

execFile("git", ["log", "-1", "--oneline"], (error, stdout) => {
  if (error) throw error;
  console.log(stdout);
});`,
 '`node:child_process` lance **d’autres programmes**. **`execFile(programme, [arguments], callback)`** exécute le programme **directement**, avec ses arguments dans un **tableau** : chaque argument reste un argument, quoi qu’il contienne. À l’inverse, **`exec("commande en texte")`** passe par un **shell** : si une partie du texte vient d’un utilisateur (`"ls " + dossier`), il peut y glisser `; rm -rf /` — c’est l’**injection de commandes**. Préfère toujours `execFile` ou `spawn`.',
 '`node:child_process` runs **other programs**. **`execFile(program, [arguments], callback)`** runs the program **directly**, with its arguments in an **array**: each argument stays one argument, whatever it contains. By contrast, **`exec("command as text")`** goes through a **shell**: if part of the text comes from a user (`"ls " + folder`), they can slip in `; rm -rf /` — that’s **command injection**. Always prefer `execFile` or `spawn`.',
 ['Importe `execFile` depuis `"node:child_process"`.', 'Écris `execFile("ls", ["-l"], (error, stdout) => { … })`.', 'Dans le callback, relance l’erreur si elle existe, sinon affiche `stdout`.'],
 ['Import `execFile` from `"node:child_process"`.', 'Write `execFile("ls", ["-l"], (error, stdout) => { … })`.', 'In the callback, rethrow the error if any, otherwise print `stdout`.'],
 'Le test refuse `exec(` : c’est la mauvaise habitude à ne pas prendre.',
 'The test rejects `exec(`: that’s the bad habit not to pick up.'],
['nd-36', `import { Worker, isMainThread, parentPort } from "node:worker_threads";

if (isMainThread) {
  const w = new Worker(new URL(import.meta.url));
  w.on("message", (msg) => console.log("reçu :", msg));
} else {
  parentPort.postMessage("calcul terminé");
}`,
 'JavaScript n’exécute **qu’une chose à la fois** par fil. Un calcul long (compresser, calculer des millions de nombres) **bloque** tout le serveur. Les **`worker_threads`** lancent du code dans un **autre fil**, en parallèle. Le fichier se partage en deux rôles : si **`isMainThread`**, on crée `new Worker(fichier)` et on écoute `"message"` ; sinon, on est **dans** le worker et on répond avec **`parentPort.postMessage(…)`**. Les données sont **copiées** entre fils (algorithme de clonage structuré) ; seuls les `ArrayBuffer` transférés ou les `SharedArrayBuffer` partagent la mémoire. Les workers servent aux calculs **gourmands en processeur** : ils n’aident guère pour les entrées-sorties, que les API asynchrones de Node.js gèrent déjà mieux. Dans un vrai programme, on réutilise un **groupe de workers** plutôt qu’en créer un par tâche.',
 'JavaScript runs **only one thing at a time** per thread. A long computation (compressing, crunching millions of numbers) **blocks** the entire server. **`worker_threads`** run code in **another thread**, in parallel. The file splits into two roles: if **`isMainThread`**, create `new Worker(file)` and listen for `"message"`; otherwise you’re **inside** the worker and answer with **`parentPort.postMessage(…)`**. Data is **copied** between threads (structured clone algorithm); only transferred `ArrayBuffer`s or `SharedArrayBuffer`s share memory. Workers are for **CPU-intensive** work: they help little with I/O, which Node.js’s asynchronous APIs already handle better. In a real program you reuse a **pool of workers** rather than creating one per task.',
 ['Importe `Worker`, `isMainThread` et `parentPort` depuis `"node:worker_threads"`.', 'Si `isMainThread` : `const worker = new Worker(__filename);` puis `worker.on("message", …)`.', 'Sinon : `parentPort.postMessage(42);`.'],
 ['Import `Worker`, `isMainThread` and `parentPort` from `"node:worker_threads"`.', 'If `isMainThread`: `const worker = new Worker(__filename);` then `worker.on("message", …)`.', 'Otherwise: `parentPort.postMessage(42);`.'],
 'Un worker coûte cher à démarrer : réserve-le aux calculs lourds, pas aux petites tâches.',
 'A worker is costly to start: reserve it for heavy computations, not small tasks.'],
['nd-37', `import cluster from "node:cluster";
import os from "node:os";

if (cluster.isPrimary) {
  for (let i = 0; i < os.availableParallelism(); i++) cluster.fork();
} else {
  // chaque worker démarre le serveur HTTP
}`,
 'Un processus Node n’utilise **qu’un seul cœur** du processeur. Avec **`node:cluster`**, un processus **principal** (`cluster.isPrimary`) lance plusieurs **copies** de lui-même (`cluster.fork()`), généralement une par cœur, et tous les workers **partagent le même port**. Les requêtes sont réparties entre eux. Le nombre de workers se calcule avec `os.availableParallelism()` (et non `os.cpus().length`, que la documentation déconseille pour cet usage).',
 'A Node process uses **only one core** of the processor. With **`node:cluster`**, a **primary** process (`cluster.isPrimary`) starts several **copies** of itself (`cluster.fork()`), usually one per core, and all workers **share the same port**. Requests are spread among them. The number of workers is computed with `os.availableParallelism()` (not `os.cpus().length`, which the documentation advises against for this purpose).',
 ['Importe `cluster`, `os` et `http`.', 'Si `cluster.isPrimary`, boucle sur le nombre de cœurs avec `cluster.fork();`.', 'Sinon, crée un serveur `http.createServer(…).listen(3000)`.'],
 ['Import `cluster`, `os` and `http`.', 'If `cluster.isPrimary`, loop over the core count with `cluster.fork();`.', 'Otherwise, create a server `http.createServer(…).listen(3000)`.'],
 'Les workers ne partagent **pas** leur mémoire : un état gardé en mémoire (sessions…) doit aller dans une base externe.',
 'Workers do **not** share memory: state kept in memory (sessions…) must go in an external database.'],
['nd-38', `import assert from "node:assert/strict";

assert.strictEqual(1 + 1, 2);             // ok : silencieux
assert.deepStrictEqual({ a: 1 }, { a: 1 }); // compare le contenu
assert.throws(() => JSON.parse("{"));        // vérifie qu’une erreur est lancée
assert.strictEqual(1, 2);                     // ❌ lance une AssertionError`,
 'Le module **`node:assert`** vérifie qu’une chose est vraie. **Si c’est vrai, il ne fait rien ; si c’est faux, il lance une `AssertionError`.** `strictEqual(a, b)` compare avec `===` (types compris), `deepStrictEqual` compare le **contenu** de deux objets ou tableaux, `throws(fn)` vérifie qu’une fonction lance bien une erreur. C’est le socle de tous les tests : un test qui échoue est simplement une assertion qui lance.',
 'The **`node:assert`** module checks that something is true. **If true, it does nothing; if false, it throws an `AssertionError`.** `strictEqual(a, b)` compares with `===` (types included), `deepStrictEqual` compares the **content** of two objects or arrays, `throws(fn)` checks that a function does throw an error. It’s the foundation of all tests: a failing test is simply an assertion that throws.',
 ['Importe `assert` depuis `"node:assert/strict"`.', 'Boucle sur `cases` : `for (const [input, expected] of cases) {`.', 'Dedans : `assert.strictEqual(fn(input), expected);` puis, après la boucle, `return "ok";`.'],
 ['Import `assert` from `"node:assert/strict"`.', 'Loop over `cases`: `for (const [input, expected] of cases) {`.', 'Inside: `assert.strictEqual(fn(input), expected);` then, after the loop, `return "ok";`.'],
 '`assert/strict` rend **toutes** les comparaisons strictes : c’est la version recommandée.',
 '`assert/strict` makes **all** comparisons strict: it’s the recommended version.'],
['nd-39', `// sum.test.js
import test from "node:test";
import assert from "node:assert";

test("additionne deux nombres", () => {
  assert.strictEqual(1 + 2, 3);
});
// lancer : node --test`,
 'Node embarque son propre **lanceur de tests**, sans rien installer : **`node:test`**. Tu écris `test("description", () => { … })` avec des assertions dedans, puis tu lances `node --test` : Node trouve les fichiers `*.test.js`, les exécute et affiche un rapport. Une fonction de test qui **ne lance pas d’erreur** est réussie ; une erreur la fait **échouer**. `describe` / `it` sont aussi disponibles pour regrouper.',
 'Node ships its own **test runner**, with nothing to install: **`node:test`**. You write `test("description", () => { … })` with assertions inside, then run `node --test`: Node finds `*.test.js` files, runs them and prints a report. A test function that **doesn’t throw** passes; an error makes it **fail**. `describe` / `it` are also available for grouping.',
 ['Importe `test` depuis `"node:test"` et `assert` depuis `"node:assert"`.', 'Écris `test("additionne", () => {`.', 'Dedans, `assert.strictEqual(1 + 1, 2);` puis ferme `});`.'],
 ['Import `test` from `"node:test"` and `assert` from `"node:assert"`.', 'Write `test("adds", () => {`.', 'Inside, `assert.strictEqual(1 + 1, 2);` then close `});`.'],
 'Nomme chaque test avec une **phrase** qui décrit le comportement attendu : le rapport sera lisible.',
 'Name each test with a **sentence** describing the expected behaviour: the report will be readable.'],
['nd-40', `process.on("uncaughtException", (err) => {
  console.error("Crash :", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error("Promesse rejetée :", reason);
  process.exitCode = 1;
});`,
 'Un `process` est aussi un **EventEmitter**. **`uncaughtException`** est émis quand une erreur n’est attrapée nulle part ; **`unhandledRejection`** quand une promesse est rejetée sans `catch`. Les écouter permet de **journaliser** avant de s’arrêter. Après une `uncaughtException`, l’état du programme est **incertain** : le bon réflexe est de **quitter** (`process.exit(1)`) et de laisser un superviseur (pm2, Docker) le relancer. Un **code de sortie 0** veut dire « tout va bien », **autre chose** signale une erreur.',
 'A `process` is also an **EventEmitter**. **`uncaughtException`** is emitted when an error is caught nowhere; **`unhandledRejection`** when a promise is rejected without a `catch`. Listening to them lets you **log** before stopping. After an `uncaughtException`, the program’s state is **uncertain**: the right reflex is to **quit** (`process.exit(1)`) and let a supervisor (pm2, Docker) restart it. An **exit code of 0** means “all is well”, **anything else** signals an error.',
 ['Écris `process.on("uncaughtException", (error) => { … });`.', 'Écris `process.on("unhandledRejection", (reason) => { … });`.', 'Dans chacun, journalise avec `console.error`, puis termine avec `process.exit(1)` ou `process.exitCode = 1`.'],
 ['Write `process.on("uncaughtException", (error) => { … });`.', 'Write `process.on("unhandledRejection", (reason) => { … });`.', 'In each, log with `console.error`, then finish with `process.exit(1)` or `process.exitCode = 1`.'],
 'La documentation décrit `uncaughtException` comme un mécanisme **rudimentaire**, à n’utiliser qu’en **dernier recours** : sa bonne utilisation est un nettoyage **synchrone** des ressources avant l’arrêt, jamais une reprise normale du programme.',
 'The documentation describes `uncaughtException` as a **crude** mechanism, to be used only as a **last resort**: its correct use is **synchronous** cleanup of resources before shutting down, never resuming normal operation.'],
['nd-41', `// version = majeur.mineur.correctif
// 1.4.2 → patch → 1.4.3   (correction de bug)
// 1.4.2 → minor → 1.5.0   (nouvelle fonction, compatible)
// 1.4.2 → major → 2.0.0   (changement qui peut casser)`,
 'npm utilise le **versionnage sémantique** : `MAJEUR.MINEUR.CORRECTIF`. On augmente le **correctif** pour une correction de bug, le **mineur** pour une nouvelle fonctionnalité **compatible**, le **majeur** pour un changement qui **peut casser** le code existant. Quand on monte un niveau, ceux **à droite repartent à 0**. Dans `package.json`, `^1.4.2` accepte les mises à jour mineures et correctives, `~1.4.2` seulement les correctives.',
 'npm uses **semantic versioning**: `MAJOR.MINOR.PATCH`. You raise the **patch** for a bug fix, the **minor** for a **compatible** new feature, the **major** for a change that **may break** existing code. When you raise a level, the ones **to its right reset to 0**. In `package.json`, `^1.4.2` accepts minor and patch updates, `~1.4.2` only patch updates.',
 ['Sépare : `const [major, minor, patch] = version.split(".").map(Number);`.', 'Pour `"major"`, renvoie `(major + 1) + ".0.0"` ; pour `"minor"`, `major + "." + (minor + 1) + ".0"`.', 'Dans tous les autres cas (patch), renvoie `major + "." + minor + "." + (patch + 1)`.'],
 ['Split: `const [major, minor, patch] = version.split(".").map(Number);`.', 'For `"major"`, return `(major + 1) + ".0.0"`; for `"minor"`, `major + "." + (minor + 1) + ".0"`.', 'In all other cases (patch), return `major + "." + minor + "." + (patch + 1)`.'],
 'Sans `.map(Number)`, `"2" + 1` donnerait `"21"` : convertis avant d’additionner.',
 'Without `.map(Number)`, `"2" + 1` would give `"21"`: convert before adding.'],
['nd-42', `# .env
PORT=3000
SECRET="une phrase secrète"
DB_URL=postgres://u:p@h/db?sslmode=require`,
 'Un fichier **`.env`** liste les réglages d’un projet, une ligne `CLE=valeur`. Il contient souvent des **secrets** : **ne le mets jamais dans Git** (ajoute `.env` à `.gitignore`). Node.js sait le charger avec l’option `--env-file=.env` ou avec `process.loadEnvFile()` (fichier `./.env` par défaut) ; une variable `NODE_OPTIONS` écrite dans ce fichier n’a pas d’effet. Ici tu écris toi-même l’analyse : ignorer les lignes vides et les **commentaires** (`#`), couper **au premier `=`** (la valeur peut en contenir), retirer les espaces et les guillemets.',
 'An **`.env`** file lists a project’s settings, one `KEY=value` line each. It often holds **secrets**: **never put it in Git** (add `.env` to `.gitignore`). Node.js can load it with the `--env-file=.env` option or with `process.loadEnvFile()` (the `./.env` file by default); a `NODE_OPTIONS` variable written in that file has no effect. Here you write the parsing yourself: skip empty lines and **comments** (`#`), split **at the first `=`** (the value may contain one), trim spaces and quotes.',
 ['Découpe en lignes : `text.split("\\n")` et pour chacune `line.trim()` ; ignore si vide ou si elle commence par `#`.', 'Cherche le premier `=` avec `line.indexOf("=")` : la clé est avant, la valeur après (`slice`).', 'Nettoie : `trim()` sur la clé et la valeur, puis retire les guillemets avec `.replace(/^["\']|["\']$/g, "")`.'],
 ['Split into lines: `text.split("\\n")` and for each `line.trim()`; skip if empty or starting with `#`.', 'Find the first `=` with `line.indexOf("=")`: the key is before, the value after (`slice`).', 'Clean up: `trim()` on key and value, then strip quotes with `.replace(/^["\']|["\']$/g, "")`.'],
 'Avec `line.split("=")`, une valeur contenant `=` serait coupée en morceaux : utilise `indexOf`.',
 'With `line.split("=")`, a value containing `=` would be cut into pieces: use `indexOf`.'],
['nd-43', `const server = http.createServer(handler).listen(3000);

process.on("SIGTERM", () => {
  console.log("arrêt demandé");
  server.close(() => process.exit(0)); // finit les requêtes en cours puis quitte
});`,
 'Quand on déploie une nouvelle version, l’hébergeur envoie le signal **`SIGTERM`**. Sur les plateformes non-Windows, `SIGTERM` et `SIGINT` ont un gestionnaire par défaut qui termine le processus avec le code **128 + numéro du signal**. Dès que tu installes un **écouteur** (`process.on("SIGTERM", …)`), ce comportement par défaut est **supprimé** : Node.js ne quitte plus tout seul, c’est à toi de le faire. Le bon schéma : appeler **`server.close(callback)`** (il **refuse les nouvelles connexions** et attend la fin des requêtes en cours), et dans le callback, fermer le reste (base de données…) puis **`process.exit(0)`**.',
 'When deploying a new version, the host sends the **`SIGTERM`** signal. On non-Windows platforms, `SIGTERM` and `SIGINT` have a default handler that ends the process with exit code **128 + signal number**. As soon as you install a **listener** (`process.on("SIGTERM", …)`), that default behaviour is **removed**: Node.js no longer exits on its own, it is up to you. The right pattern: call **`server.close(callback)`** (it **stops accepting new connections** and waits for in-flight requests), and in the callback, close the rest (database…) then **`process.exit(0)`**.',
 ['Le serveur est déjà créé dans le code de départ.', 'Écris `process.on("SIGTERM", () => { … });`.', 'Dedans : `server.close(() => { process.exit(0); });`.'],
 ['The server is already created in the starter code.', 'Write `process.on("SIGTERM", () => { … });`.', 'Inside: `server.close(() => { process.exit(0); });`.'],
 'Appelle `process.exit(0)` **dans** le callback de `close`, pas avant : sinon tu coupes les requêtes en cours.',
 'Call `process.exit(0)` **inside** the `close` callback, not before: otherwise you cut in-flight requests.'],
];
