// Explications des leçons ajoutées d’après les documentations officielles.
export default [
['hc-11', `<header>Logo + menu</header>
<main>Contenu principal</main>
<footer>Mentions légales</footer>`,
 'Les balises **sémantiques** disent **ce que contient** une zone, pas seulement son apparence : `<header>` (en-tête), `<main>` (contenu principal, un seul **visible** par page), `<footer>` (pied de page), `<nav>`, `<section>`, `<article>`. Le contenu de `<main>` doit être propre à la page : pas de menu ni de pied de page répétés. Les moteurs de recherche et les lecteurs d’écran s’en servent pour comprendre la page. Elles se comportent comme un `<div>`, mais avec du sens.',
 '**Semantic** tags say **what a region contains**, not just how it looks: `<header>`, `<main>` (main content, only one **visible** one per page), `<footer>`, `<nav>`, `<section>`, `<article>`. The content of `<main>` should be unique to the page: no repeated menu or footer. Search engines and screen readers use them to understand the page. They behave like a `<div>`, but with meaning.',
 ['Écris `<header>` et, dedans, `<h1>Mon site</h1>`.', 'Écris `<main>` avec un paragraphe `<p>`.', 'Écris `<footer>` avec une ligne de texte.'],
 ['Write `<header>` and, inside it, `<h1>My site</h1>`.', 'Write `<main>` with a `<p>` paragraph.', 'Write `<footer>` with a line of text.'],
 'N’utilise pas `<div>` partout : une page lisible par les technologies d’assistance repose sur ces balises.',
 'Don’t use `<div>` everywhere: a page readable by assistive technologies relies on these tags.'],
['hc-12', `<table>
  <thead><tr><th>Fruit</th><th>Prix</th></tr></thead>
  <tbody>
    <tr><td>Mangue</td><td>500</td></tr>
  </tbody>
</table>`,
 'Un `<table>` affiche des données en **lignes et colonnes**. `<tr>` est une ligne, `<th>` une cellule d’**en-tête** (en gras par défaut) et `<td>` une cellule de **données**. `<thead>` regroupe la ligne d’en-tête, `<tbody>` le corps. N’utilise les tableaux que pour des données, jamais pour la mise en page.',
 'A `<table>` shows data in **rows and columns**. `<tr>` is a row, `<th>` a **header** cell (bold by default) and `<td>` a **data** cell. `<thead>` groups the header row, `<tbody>` the body. Use tables for data only, never for layout.',
 ['Écris `<table>` puis `<thead>`, `<tr>`, deux `<th>` : Nom et Âge.', 'Écris `<tbody>` puis deux lignes `<tr>`, chacune avec deux `<td>`.', 'Ferme tout dans l’ordre inverse : `</tbody></table>`.'],
 ['Write `<table>` then `<thead>`, `<tr>`, two `<th>`: Name and Age.', 'Write `<tbody>` then two `<tr>` rows, each with two `<td>`.', 'Close everything in reverse order: `</tbody></table>`.'],
 'Une cellule `<td>` doit toujours être dans un `<tr>`, lui-même dans le tableau.',
 'A `<td>` cell must always be inside a `<tr>`, itself inside the table.'],
['hc-13', `<form>
  <label for="nom">Nom</label>
  <input id="nom">
  <button>Valider</button>
</form>`,
 'Un `<form>` regroupe des champs à envoyer. Chaque champ a besoin d’un `<label>` **relié** à lui : l’attribut `for` du label doit être égal à l’`id` de l’input. Résultat : un clic sur le texte active le champ, et les lecteurs d’écran annoncent le nom du champ. Un `<button>` dans un formulaire l’envoie.',
 'A `<form>` groups fields to submit. Every field needs a `<label>` **linked** to it: the label’s `for` attribute must equal the input’s `id`. Result: clicking the text focuses the field, and screen readers announce the field’s name. A `<button>` inside a form submits it.',
 ['Écris `<form>` … `</form>`.', 'Dedans : `<label for="email">E-mail</label>` puis `<input id="email">`.', 'Ajoute `<button>Envoyer</button>` avant la fermeture du formulaire.'],
 ['Write `<form>` … `</form>`.', 'Inside: `<label for="email">E-mail</label>` then `<input id="email">`.', 'Add `<button>Envoyer</button>` before the form closes.'],
 'Le `for` du label et l’`id` de l’input doivent être identiques, majuscules comprises.',
 'The label’s `for` and the input’s `id` must be identical, capitals included.'],
['hc-14', `<input type="number" min="1" max="10" required>
<input type="password" minlength="8" placeholder="8 caractères">`,
 'L’attribut `type` change le comportement du champ : `email`, `number`, `password`, `date`… Le navigateur ajoute alors **sa propre validation** : `required` rend le champ obligatoire, `minlength`/`min`/`max` fixent des limites. `placeholder` affiche un exemple grisé (il ne remplace pas un `<label>`). Cette validation aide l’utilisateur, mais elle se contourne facilement : le serveur doit **toujours** revérifier les données.',
 'The `type` attribute changes the field’s behaviour: `email`, `number`, `password`, `date`… The browser then adds **its own validation**: `required` makes the field mandatory, `minlength`/`min`/`max` set limits. `placeholder` shows a greyed-out hint (it doesn’t replace a `<label>`). This validation helps the user but is easy to bypass: the server must **always** re-check the data.',
 ['Écris `<input type="email">`.', 'Ajoute `required` dans la balise.', 'Ajoute `placeholder="toi@exemple.com"`.'],
 ['Write `<input type="email">`.', 'Add `required` inside the tag.', 'Add `placeholder="you@example.com"`.'],
 '`required` s’écrit sans valeur : c’est un attribut booléen (présent = vrai).',
 '`required` is written with no value: it’s a boolean attribute (present = true).'],
['hc-15', `<audio controls>
  <source src="chant.mp3" type="audio/mpeg">
  Ton navigateur ne lit pas l’audio.
</audio>`,
 '`<video>` et `<audio>` intègrent des médias. `controls` affiche les boutons lecture/pause/volume. Dedans, une ou plusieurs `<source>` proposent des **formats** (`type` indique lequel) : le navigateur prend le premier qu’il sait lire. Le texte placé à l’intérieur est un repli pour les vieux navigateurs.',
 '`<video>` and `<audio>` embed media. `controls` shows play/pause/volume buttons. Inside, one or more `<source>` offer **formats** (`type` says which): the browser takes the first one it can play. Text placed inside is a fallback for old browsers.',
 ['Écris `<video controls>` … `</video>`.', 'Dedans : `<source src="film.mp4" type="video/mp4">`.', 'Vérifie que `controls` est bien dans la balise ouvrante `<video>`.'],
 ['Write `<video controls>` … `</video>`.', 'Inside: `<source src="film.mp4" type="video/mp4">`.', 'Check that `controls` is in the opening `<video>` tag.'],
 '`<source>` n’a pas de balise fermante, comme `<img>`.',
 '`<source>` has no closing tag, like `<img>`.'],
['hc-16', `<details>
  <summary>Question fréquente</summary>
  <p>La réponse apparaît au clic.</p>
</details>`,
 '`<details>` crée un bloc que le visiteur peut **ouvrir et fermer**, sans aucun JavaScript. `<summary>` est le titre cliquable (toujours visible), qui doit être le **premier enfant** de `<details>` ; le reste n’apparaît qu’à l’ouverture. L’attribut booléen `open` le rend ouvert au départ.',
 '`<details>` creates a block the visitor can **open and close**, with no JavaScript at all. `<summary>` is the clickable title (always visible), and must be the **first child** of `<details>`; the rest only shows when open. The boolean `open` attribute makes it open at the start.',
 ['Écris `<details>` … `</details>`.', 'Premier enfant : `<summary>Plus d’infos</summary>`.', 'Ajoute ensuite un `<p>` avec le contenu caché. N’écris pas `open`.'],
 ['Write `<details>` … `</details>`.', 'First child: `<summary>Plus d’infos</summary>`.', 'Then add a `<p>` with the hidden content. Don’t write `open`.'],
 '`<summary>` doit être le **premier** enfant de `<details>`.',
 '`<summary>` must be the **first** child of `<details>`.'],
['hc-17', `:root {
  --accent: #0a8f4b;
  --gap: 12px;
}
.card { border: 2px solid var(--accent); padding: var(--gap); }`,
 'Une **variable CSS** (propriété personnalisée) commence par deux tirets : `--brand: #ff4a1c;`. On la déclare dans un sélecteur (`:root` = toute la page) et on l’utilise avec `var(--brand)`. Changer la valeur à un seul endroit met à jour tout le site : c’est la base des thèmes clair/sombre.',
 'A **CSS variable** (custom property) starts with two dashes: `--brand: #ff4a1c;`. You declare it in a selector (`:root` = the whole page) and use it with `var(--brand)`. Changing the value in one place updates the whole site: it’s the foundation of light/dark themes.',
 ['Dans `<style>`, écris `:root { --brand: #ff4a1c; }`.', 'Écris `.brand { color: var(--brand); }`.', 'Vérifie que le texte devient orange.'],
 ['In `<style>`, write `:root { --brand: #ff4a1c; }`.', 'Write `.brand { color: var(--brand); }`.', 'Check the text turns orange.'],
 'Les noms sont sensibles à la casse : `--Brand` et `--brand` sont deux variables différentes.',
 'Names are case-sensitive: `--Brand` and `--brand` are two different variables.'],
['hc-18', `a { color: blue; }
a:hover { color: red; }        /* au survol */
input:focus { outline: 2px solid; } /* au focus */`,
 'Une **pseudo-classe** cible un **état** d’un élément, avec deux-points : `:hover` (souris dessus), `:focus` (champ actif), `:first-child`, `:disabled`… Elle se colle au sélecteur : `.btn:hover`. Elle permet d’ajouter de l’interactivité sans JavaScript. Attention : sur écran tactile, selon le navigateur, `:hover` peut ne jamais s’appliquer, ou rester actif après un toucher. Ne cache donc jamais une information essentielle derrière un survol.',
 'A **pseudo-class** targets an element’s **state**, with a colon: `:hover` (mouse over), `:focus` (active field), `:first-child`, `:disabled`… It attaches to the selector: `.btn:hover`. It adds interactivity without JavaScript. Careful: on touch screens, depending on the browser, `:hover` may never match, or may stay active after a tap. So never hide essential information behind a hover.',
 ['Écris `.btn:hover {` (sans espace avant les deux-points).', 'Ajoute `background: #ffc83d;`.', 'Ferme `}` et survole le bouton dans l’aperçu.'],
 ['Write `.btn:hover {` (no space before the colon).', 'Add `background: #ffc83d;`.', 'Close `}` and hover the button in the preview.'],
 '`.btn :hover` (avec espace) cible un descendant : un détail qui change tout.',
 '`.btn :hover` (with a space) targets a descendant: one detail that changes everything.'],
['hc-19', `.tag::before {
  content: "★ ";
  color: gold;
}`,
 'Un **pseudo-élément** (deux fois deux-points) crée un morceau virtuel d’un élément : `::before` juste avant son contenu, `::after` juste après. Il ne s’affiche que si la propriété `content` est présente. C’est utile pour du contenu **décoratif** (icônes, guillemets…) qui n’a pas sa place dans le HTML. MDN déconseille d’y mettre du contenu important : les lecteurs d’écran ne le lisent pas de façon fiable.',
 'A **pseudo-element** (double colon) creates a virtual piece of an element: `::before` just before its content, `::after` just after. It only displays if the `content` property is present. It’s useful for **decorative** content (icons, quote marks…) that doesn’t belong in the HTML. MDN advises against putting important content there: screen readers don’t reliably read it.',
 ['Écris `.tag::before {`.', 'Ajoute `content: "★ ";` avec les guillemets.', 'Ferme `}` : l’étoile apparaît devant « Nouveau ».'],
 ['Write `.tag::before {`.', 'Add `content: "★ ";` with the quotes.', 'Close `}`: the star appears before “Nouveau”.'],
 'Sans `content`, le pseudo-élément n’existe pas. Même vide, écris `content: "";`.',
 'Without `content`, the pseudo-element doesn’t exist. Even if empty, write `content: "";`.'],
['hc-20', `.card { position: relative; }
.close {
  position: absolute;   /* sort du flux */
  top: 8px;
  right: 8px;           /* repère : .card */
}`,
 '`position: absolute` **sort** l’élément du flux normal et le place par rapport au **plus proche ancêtre positionné** (qui a `position` autre que `static`). Pour que `.badge` se place par rapport à `.parent`, il faut donc `.parent { position: relative; }`. Ensuite `top`, `right`, `bottom`, `left` donnent la distance aux bords.',
 '`position: absolute` **removes** the element from normal flow and places it relative to the **nearest positioned ancestor** (one whose `position` isn’t `static`). For `.badge` to be placed relative to `.parent`, you need `.parent { position: relative; }`. Then `top`, `right`, `bottom`, `left` give the distance from the edges.',
 ['Écris `.parent { position: relative; }`.', 'Écris `.badge { position: absolute; }`.', 'Ajoute `top: 0; right: 0;` dans `.badge`.'],
 ['Write `.parent { position: relative; }`.', 'Write `.badge { position: absolute; }`.', 'Add `top: 0; right: 0;` inside `.badge`.'],
 'Sans `position: relative` sur le parent, le badge se place par rapport au **bloc conteneur initial** (la zone de départ de la page, de la taille de la fenêtre), pas par rapport à son parent.',
 'Without `position: relative` on the parent, the badge is placed relative to the **initial containing block** (the page’s starting area, sized like the viewport), not its parent.'],
['hc-21', `.link {
  color: black;
  transition: color 0.3s ease;
}
.link:hover { color: red; }`,
 'Normalement, un changement de style est **instantané**. `transition` le rend progressif : `transition: propriété durée courbe`. Elle se met sur l’état **de base** de l’élément (pas sur `:hover`), pour que l’animation marche à l’aller **et** au retour. `all` anime toutes les propriétés qui changent ; nommer la propriété est plus précis et évite d’animer autre chose par accident. Sans durée (`0s` par défaut), rien ne s’anime.',
 'Normally, a style change is **instant**. `transition` makes it gradual: `transition: property duration curve`. Put it on the element’s **base** state (not on `:hover`) so the animation works both ways. `all` animates every property that changes; naming the property is more precise and avoids animating something by accident. Without a duration (`0s` by default), nothing animates.',
 ['Dans la règle `.btn { … }`, ajoute `transition: background 0.3s;`.', 'Garde `.btn:hover` tel quel.', 'Survole le bouton : le fond change en douceur.'],
 ['In the `.btn { … }` rule, add `transition: background 0.3s;`.', 'Keep `.btn:hover` as is.', 'Hover the button: the background changes smoothly.'],
 'Une `transition` placée seulement dans `:hover` ne s’anime qu’à l’entrée, pas à la sortie.',
 'A `transition` placed only in `:hover` animates only on the way in, not on the way out.'],
['hc-22', `.main { width: calc(100% - 240px); }  /* page moins sidebar */
h1 { font-size: 2rem; }        /* 2 × taille de base */
.hero { height: 50vh; }        /* moitié de l’écran */`,
 'Les **unités** : `px` fixe, `%` relatif au parent, `rem` relatif à la taille de police de l’**élément racine** (`<html>`, souvent 16px par défaut, mais l’utilisateur peut la modifier), `vw`/`vh` relatifs à la largeur et à la hauteur de la **fenêtre** (viewport). `calc()` **calcule** avec des unités différentes : `calc(100% - 40px)` = toute la largeur moins 40px. Les espaces autour de `-` et `+` sont **obligatoires**.',
 '**Units**: `px` fixed, `%` relative to the parent, `rem` relative to the font size of the **root element** (`<html>`, often 16px by default, but users can change it), `vw`/`vh` relative to the width and height of the **viewport**. `calc()` **computes** with mixed units: `calc(100% - 40px)` = full width minus 40px. Spaces around `-` and `+` are **required**.',
 ['Écris `.col {`.', 'Ajoute `width: calc(100% - 40px);`.', 'Ajoute `font-size: 1.5rem;` (24px si la base est 16px).'],
 ['Write `.col {`.', 'Add `width: calc(100% - 40px);`.', 'Add `font-size: 1.5rem;` (24px if the base is 16px).'],
 '`calc(100%-40px)` sans espaces est invalide : la règle est ignorée.',
 '`calc(100%-40px)` with no spaces is invalid: the rule is ignored.'],
['js-14', `const name = "Esi";
const msg = \`Salut \${name}, 2 + 2 = \${2 + 2}\`;
// "Salut Esi, 2 + 2 = 4"`,
 'Un **template literal** s’écrit entre **backticks** (accents graves) et permet d’insérer n’importe quelle expression avec `${…}`. Plus lisible que de coller des textes avec `+`, et il accepte aussi plusieurs lignes. Attention : ce sont bien des backticks, pas des guillemets.',
 'A **template literal** is written between **backticks** and lets you insert any expression with `${…}`. More readable than gluing strings with `+`, and it also supports multiple lines. Careful: these are backticks, not quotes.',
 ['Écris `return`, puis ouvre le texte avec un backtick (l’accent grave).', 'Insère le nom avec `${name}` à l’intérieur du texte.', 'Ajoute « a », l’âge avec `${age}`, « ans », puis ferme avec un second backtick et `;`.'],
 ['Write `return`, then open the text with a backtick (the grave accent).', 'Insert the name with `${name}` inside the text.', 'Add “a”, the age with `${age}`, “ans”, then close with a second backtick and `;`.'],
 'Le test attend exactement « Ama a 20 ans » : surveille les espaces.',
 'The test expects exactly “Ama a 20 ans”: watch the spaces.'],
['js-15', `const [first, second] = ["a", "b"];   // tableau
const { name, age } = { name: "Esi", age: 20 }; // objet
function show({ name }) { return name; }       // dans un paramètre`,
 'La **déstructuration** extrait des valeurs en une ligne. Pour un tableau : `const [a, b] = arr` prend les éléments **par position**. Pour un objet : `const { name } = obj` les prend **par nom**. Elle fonctionne aussi dans les paramètres d’une fonction : c’est partout en React (`function Card({ title })`).',
 '**Destructuring** extracts values in one line. For an array: `const [a, b] = arr` takes elements **by position**. For an object: `const { name } = obj` takes them **by name**. It also works in function parameters: it’s everywhere in React (`function Card({ title })`).',
 ['Écris `const [a, b] = pair;`.', 'Renvoie `[b, a]`.', 'Teste avec `[1, 2]` : tu dois obtenir `[2, 1]`.'],
 ['Write `const [a, b] = pair;`.', 'Return `[b, a]`.', 'Test with `[1, 2]`: you should get `[2, 1]`.'],
 'Les crochets `[ ]` servent aux tableaux, les accolades `{ }` aux objets : ne les mélange pas.',
 'Square brackets `[ ]` are for arrays, braces `{ }` for objects: don’t mix them up.'],
['js-16', `const user = { profile: null };
user.profile?.name;          // undefined, sans erreur
user.profile?.name ?? "anonyme"; // "anonyme"`,
 'Lire une propriété d’une valeur `undefined` ou `null` **plante** le programme. Le **chaînage optionnel** `?.` s’arrête proprement et renvoie `undefined` à la place. L’opérateur `??` (coalescence) donne une **valeur par défaut** seulement si la gauche est `null` ou `undefined` (contrairement à `||`, qui remplace aussi `0` et `""`).',
 'Reading a property of an `undefined` or `null` value **crashes** the program. **Optional chaining** `?.` stops cleanly and returns `undefined` instead. The `??` operator (nullish coalescing) gives a **default value** only if the left side is `null` or `undefined` (unlike `||`, which also replaces `0` and `""`).',
 ['Écris `user?.address?.city`.', 'Ajoute `?? "inconnue"` à la suite.', 'Renvoie le tout : `return user?.address?.city ?? "inconnue";`.'],
 ['Write `user?.address?.city`.', 'Append `?? "inconnue"`.', 'Return it all: `return user?.address?.city ?? "inconnue";`.'],
 'Le test `cityOf(null)` plante sans `?.` juste après `user`.',
 'The `cityOf(null)` test crashes without `?.` right after `user`.'],
['js-17', `const ages = [12, 20, 31];
ages.every((a) => a >= 18); // false : tous ?
ages.some((a) => a >= 18);  // true  : au moins un ?
ages.find((a) => a >= 18);  // 20    : le premier`,
 'Trois méthodes de tableau répondent à des questions : `every` « **tous** les éléments passent-ils le test ? », `some` « **au moins un** ? », `find` « donne-moi le **premier** qui passe ». Elles s’arrêtent dès que la réponse est connue. `every` sur un tableau vide renvoie `true` (rien ne contredit).',
 'Three array methods answer questions: `every` “do **all** elements pass the test?”, `some` “**at least one**?”, `find` “give me the **first** that passes”. They stop as soon as the answer is known. `every` on an empty array returns `true` (nothing contradicts it).',
 ['Appelle `people.every(…)`.', 'Donne-lui `(p) => p.age >= 18`.', 'Renvoie le résultat : un booléen.'],
 ['Call `people.every(…)`.', 'Give it `(p) => p.age >= 18`.', 'Return the result: a boolean.'],
 'Ne confonds pas `filter` (renvoie un tableau) et `every`/`some` (renvoient un booléen).',
 'Don’t confuse `filter` (returns an array) with `every`/`some` (return a boolean).'],
['js-18', `const set = new Set([1, 2, 2, 3]);
set.size;      // 3
set.has(2);    // true
[...set];      // [1, 2, 3]`,
 'Un `Set` est une collection de valeurs **uniques** : ajouter deux fois la même ne change rien. `new Set(tableau)` supprime les doublons, `[...set]` le retransforme en tableau. `has`, `add`, `delete` et `size` complètent l’outil.',
 'A `Set` is a collection of **unique** values: adding the same one twice changes nothing. `new Set(array)` removes duplicates, `[...set]` turns it back into an array. `has`, `add`, `delete` and `size` complete the toolkit.',
 ['Crée le Set : `new Set(arr)`.', 'Étale-le dans un tableau : `[...new Set(arr)]`.', 'Renvoie ce tableau.'],
 ['Create the Set: `new Set(arr)`.', 'Spread it into an array: `[...new Set(arr)]`.', 'Return that array.'],
 'Les valeurs sont comparées comme avec `===` : deux objets différents ne sont jamais « égaux ».',
 'Values are compared like `===`: two distinct objects are never “equal”.'],
['js-19', `class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    return this.name + " aboie";
  }
}
new Dog("Rex").bark(); // "Rex aboie"`,
 'Une **classe** est un plan pour fabriquer des objets. Le `constructor` s’exécute à `new Counter()` et initialise l’objet, qu’on désigne par **`this`**. Les **méthodes** (`inc()`) se déclarent sans le mot `function`. Chaque `new` crée une instance indépendante avec ses propres données.',
 'A **class** is a blueprint for making objects. The `constructor` runs on `new Counter()` and initialises the object, referred to as **`this`**. **Methods** (`inc()`) are declared without the `function` keyword. Every `new` creates an independent instance with its own data.',
 ['Écris `class Counter {`.', 'Dedans : `constructor() { this.value = 0; }`.', 'Puis `inc() { this.value += 1; }` et ferme la classe.'],
 ['Write `class Counter {`.', 'Inside: `constructor() { this.value = 0; }`.', 'Then `inc() { this.value += 1; }` and close the class.'],
 'Dans une méthode, écris `this.value`, pas juste `value` : sans `this`, ce serait une variable inexistante.',
 'In a method, write `this.value`, not just `value`: without `this` it would be a non-existent variable.'],
['js-20', `const original = { list: [1, 2] };
const copy = JSON.parse(JSON.stringify(original));
copy.list.push(3);
original.list; // [1, 2] : intact`,
 'Une copie « superficielle » (`{ ...obj }`) partage les objets imbriqués avec l’original. Pour une copie **profonde**, une astuce simple : transformer l’objet en texte JSON (`JSON.stringify`) puis le relire (`JSON.parse`). Limite : seules les données JSON passent (pas les fonctions, ni les `Date` telles quelles).',
 'A “shallow” copy (`{ ...obj }`) shares nested objects with the original. For a **deep** copy, a simple trick: turn the object into JSON text (`JSON.stringify`) then read it back (`JSON.parse`). Limit: only JSON data survives (no functions, no `Date` as-is).',
 ['Transforme en texte : `JSON.stringify(obj)`.', 'Relis-le : `JSON.parse(…)` autour.', 'Renvoie : `return JSON.parse(JSON.stringify(obj));`.'],
 ['Turn into text: `JSON.stringify(obj)`.', 'Read it back: wrap in `JSON.parse(…)`.', 'Return: `return JSON.parse(JSON.stringify(obj));`.'],
 'Le deuxième test modifie la copie : si l’original change, ta copie n’était que superficielle.',
 'The second test edits the copy: if the original changes, your copy was only shallow.'],
['js-21', `"  Salut  ".trim();            // "Salut"
"a b c".replaceAll(" ", "-");  // "a-b-c"
"abc".includes("b");           // true
"abc".startsWith("a");         // true`,
 'Les textes ont beaucoup de méthodes utiles : `trim()` enlève les espaces aux extrémités, `toLowerCase()` met en minuscules, `replaceAll(a, b)` remplace **toutes** les occurrences (`replace` seul ne remplace que la première), `includes`, `startsWith`, `endsWith`, `slice`, `padStart`… On les **chaîne** de gauche à droite.',
 'Strings have many useful methods: `trim()` removes spaces at the ends, `toLowerCase()` lower-cases, `replaceAll(a, b)` replaces **every** occurrence (`replace` alone only replaces the first), `includes`, `startsWith`, `endsWith`, `slice`, `padStart`… You **chain** them left to right.',
 ['Commence par `title.trim()`.', 'Enchaîne `.toLowerCase()`.', 'Termine par `.replaceAll(" ", "-")` et renvoie le tout.'],
 ['Start with `title.trim()`.', 'Chain `.toLowerCase()`.', 'Finish with `.replaceAll(" ", "-")` and return it all.'],
 'Fais `trim()` en premier : sinon les espaces des bords deviendraient des tirets.',
 'Do `trim()` first: otherwise the edge spaces would become dashes.'],
['js-22', `/\\d+/.test("abc123");        // true : contient des chiffres
/^\\d+$/.test("abc123");      // false : doit TOUT être chiffres
"a1b22".match(/\\d+/g);       // ["1", "22"]`,
 'Une **expression régulière** décrit un motif de texte, entre barres obliques : `/motif/`. `.test(texte)` renvoie `true`/`false`. Les briques : `\\S` = un caractère non-espace, `\\d` = un chiffre, `+` = « un ou plusieurs », `^` = début, `$` = fin, `\\.` = un vrai point. Sans `^` et `$`, le motif peut apparaître n’importe où.',
 'A **regular expression** describes a text pattern, between slashes: `/pattern/`. `.test(text)` returns `true`/`false`. Building blocks: `\\S` = a non-space character, `\\d` = a digit, `+` = “one or more”, `^` = start, `$` = end, `\\.` = a literal dot. Without `^` and `$`, the pattern can appear anywhere.',
 ['Écris le motif : `/^\\S+@\\S+\\.\\S+$/`.', 'Applique-le avec `.test(str)`.', 'Renvoie le résultat. Teste « a@b.co » (vrai) et « a@b » (faux).'],
 ['Write the pattern: `/^\\S+@\\S+\\.\\S+$/`.', 'Apply it with `.test(str)`.', 'Return the result. Test “a@b.co” (true) and “a@b” (false).'],
 'Le point doit être échappé `\\.` : sinon `.` signifie « n’importe quel caractère ».',
 'The dot must be escaped `\\.`: otherwise `.` means “any character”.'],
['js-23', `const a = new Date("2024-01-01");
const b = new Date("2024-01-02");
b - a;                    // 86400000 (millisecondes)
(b - a) / 86400000;       // 1 jour`,
 'Un objet `Date` représente un instant. Soustraire deux dates donne la différence en **millisecondes**. Une journée = 24 × 60 × 60 × 1000 = **86 400 000 ms**. `Math.round` évite les petits décalages (heure d’été, etc.). `new Date("AAAA-MM-JJ")` lit une date ISO.',
 'A `Date` object represents a moment. Subtracting two dates gives the difference in **milliseconds**. One day = 24 × 60 × 60 × 1000 = **86,400,000 ms**. `Math.round` avoids small shifts (daylight saving, etc.). `new Date("YYYY-MM-DD")` reads an ISO date.',
 ['Crée les deux dates : `new Date(a)` et `new Date(b)`.', 'Soustrais-les : `new Date(b) - new Date(a)`.', 'Divise par `86400000` et arrondis avec `Math.round(…)`.'],
 ['Create both dates: `new Date(a)` and `new Date(b)`.', 'Subtract them: `new Date(b) - new Date(a)`.', 'Divide by `86400000` and round with `Math.round(…)`.'],
 'Les mois de `new Date(2024, 0, 1)` commencent à 0 : préfère les textes ISO pour éviter ce piège.',
 'Months in `new Date(2024, 0, 1)` start at 0: prefer ISO strings to avoid this trap.'],
['js-24', `const o = { a: 1, b: 2 };
Object.keys(o);    // ["a", "b"]
Object.values(o);  // [1, 2]
Object.entries(o); // [["a", 1], ["b", 2]]`,
 'Pour parcourir un objet : `Object.keys` donne les clés, `Object.values` les valeurs, `Object.entries` des **paires** `[clé, valeur]`. Combiné avec `map` et la déstructuration `([k, v]) => …`, tu transformes un objet en tableau, puis `join` le colle en texte.',
 'To walk through an object: `Object.keys` gives the keys, `Object.values` the values, `Object.entries` **pairs** `[key, value]`. Combined with `map` and destructuring `([k, v]) => …`, you turn an object into an array, then `join` glues it into text.',
 ['Écris `Object.entries(obj)`.', 'Enchaîne `.map(([k, v]) => k + "=" + v)`.', 'Termine par `.join("&")` et renvoie.'],
 ['Write `Object.entries(obj)`.', 'Chain `.map(([k, v]) => k + "=" + v)`.', 'Finish with `.join("&")` and return.'],
 'Pour `{}`, `entries` renvoie `[]` et `join` donne `""` : le cas vide marche seul.',
 'For `{}`, `entries` returns `[]` and `join` gives `""`: the empty case works by itself.'],
['re-21', `function Row() {
  return (
    <>
      <td>A</td>
      <td>B</td>
    </>
  );
}`,
 'Un composant ne peut renvoyer **qu’un seul élément racine**. Pour renvoyer plusieurs éléments sans ajouter de `<div>` inutile dans la page, on les entoure d’un **fragment** : `<>…</>` (forme courte de `<Fragment>`). Il n’apparaît pas dans le HTML final.',
 'A component can only return **one root element**. To return several elements without adding a needless `<div>` to the page, wrap them in a **fragment**: `<>…</>` (short form of `<Fragment>`). It doesn’t appear in the final HTML.',
 ['Écris `return (` puis `<>`.', 'Dedans : `<h1>Titre</h1>` et `<p>Texte</p>`.', 'Ferme avec `</>` puis `);`.'],
 ['Write `return (` then `<>`.', 'Inside: `<h1>Titre</h1>` and `<p>Texte</p>`.', 'Close with `</>` then `);`.'],
 'Si tu as besoin d’une `key` sur un fragment dans une liste, utilise `<Fragment key={…}>`.',
 'If you need a `key` on a fragment in a list, use `<Fragment key={…}>`.'],
['re-22', `const sorted = useMemo(
  () => [...items].sort(),
  [items]            // recalculé seulement si items change
);`,
 '`useMemo` **mémorise le résultat d’un calcul** entre deux rendus : la fonction n’est rejouée que si une valeur du tableau de dépendances change. Utile pour un calcul coûteux (tri, filtre d’une grande liste). Ce n’est qu’une **optimisation** : le résultat doit être identique sans lui.',
 '`useMemo` **remembers a computation’s result** between renders: the function only re-runs if a value in the dependency array changes. Useful for an expensive computation (sorting, filtering a big list). It’s only an **optimisation**: the result must be identical without it.',
 ['Importe `useMemo` (déjà fait).', 'Écris `const total = useMemo(() => items.reduce((s, n) => s + n, 0), [items]);`.', 'Renvoie `<p>{total}</p>`.'],
 ['`useMemo` is already imported.', 'Write `const total = useMemo(() => items.reduce((s, n) => s + n, 0), [items]);`.', 'Return `<p>{total}</p>`.'],
 'Selon la documentation, `useMemo` n’est utile que dans quelques cas : le calcul est **nettement lent** et ses dépendances changent **rarement**, ou la valeur est passée à un composant enveloppé dans `memo`. Ne t’appuie dessus que comme **optimisation** : si ton code ne marche pas sans lui, corrige d’abord le vrai problème.',
 'According to the documentation, `useMemo` is only valuable in a few cases: the calculation is **noticeably slow** and its dependencies **rarely change**, or the value is passed to a component wrapped in `memo`. Rely on it only as a **performance optimisation**: if your code doesn’t work without it, fix the underlying problem first.'],
['re-23', `function Email() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>E-mail</label>
      <input id={id} type="email" />
    </>
  );
}`,
 '`useId` génère un **identifiant unique et stable** pour relier des éléments (label ↔ input) sans risque de doublon, même si le composant est affiché plusieurs fois. En JSX, l’attribut HTML `for` s’écrit **`htmlFor`** (car `for` est un mot réservé de JavaScript).',
 '`useId` generates a **unique, stable id** to link elements (label ↔ input) with no risk of duplicates, even if the component is displayed several times. In JSX, the HTML `for` attribute is written **`htmlFor`** (since `for` is a reserved JavaScript word).',
 ['Écris `const id = useId();`.', 'Renvoie un `<label htmlFor={id}>`.', 'Puis un `<input id={id} />`, le tout dans un `<div>`.'],
 ['Write `const id = useId();`.', 'Return a `<label htmlFor={id}>`.', 'Then an `<input id={id} />`, all inside a `<div>`.'],
 'N’utilise pas `useId` pour les `key` d’une liste : elles doivent venir de tes données.',
 'Don’t use `useId` for list `key`s: they must come from your data.'],
['re-24', `<button
  className={"btn " + size}
  style={{ backgroundColor: "gold", marginTop: 8 }}
>
  OK
</button>`,
 'En JSX, la classe CSS s’écrit **`className`** (et non `class`). L’attribut `style` prend un **objet** JavaScript, d’où les doubles accolades : `style={{ … }}` (les premières ouvrent du JS, les secondes sont l’objet). Les propriétés s’écrivent en **camelCase** (`backgroundColor`), et un nombre vaut des pixels.',
 'In JSX, the CSS class is written **`className`** (not `class`). The `style` attribute takes a JavaScript **object**, hence the double braces: `style={{ … }}` (the first open JS, the second are the object). Properties are written in **camelCase** (`backgroundColor`), and a number means pixels.',
 ['Reçois `{ level }` en paramètre.', 'Renvoie `<div className={"alert " + level} …>`.', 'Ajoute `style={{ padding: 8 }}` et un texte dedans.'],
 ['Receive `{ level }` as a parameter.', 'Return `<div className={"alert " + level} …>`.', 'Add `style={{ padding: 8 }}` and some text inside.'],
 'Respecte l’espace dans `"alert "` : sans lui, tu obtiens `alertwarn` au lieu de `alert warn`.',
 'Keep the space in `"alert "`: without it you get `alertwarn` instead of `alert warn`.'],
['re-25', `useEffect(() => {
  const onResize = () => console.log("resize");
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize); // nettoyage
}, []);`,
 'Une fonction `setup` peut **renvoyer** une fonction de **nettoyage**. Après chaque nouveau rendu dont les dépendances ont changé, React exécute d’abord le nettoyage avec les **anciennes** valeurs, puis relance l’effet avec les nouvelles. Quand le composant est retiré du DOM, React exécute aussi le nettoyage. C’est ce qui permet d’arrêter un minuteur ou de retirer un écouteur : sans nettoyage, les minuteurs s’accumulent.',
 'A `setup` function can **return** a **cleanup** function. After every re-render with changed dependencies, React first runs the cleanup with the **old** values, then runs the effect again with the new ones. When the component is removed from the DOM, React runs the cleanup too. This is what lets you stop a timer or remove a listener: without cleanup, timers pile up.',
 ['Crée un état : `const [n, setN] = useState(0);`.', 'Dans `useEffect`, `const id = setInterval(() => setN((x) => x + 1), 1000);`.', 'Renvoie `() => clearInterval(id)` et affiche `<p>{n}</p>`.'],
 ['Create a state: `const [n, setN] = useState(0);`.', 'In `useEffect`, `const id = setInterval(() => setN((x) => x + 1), 1000);`.', 'Return `() => clearInterval(id)` and display `<p>{n}</p>`.'],
 'En mode Strict, React exécute **un cycle supplémentaire** (démarrage puis nettoyage) avant le vrai démarrage, **uniquement en développement**. Si cela pose problème, c’est qu’il manque un nettoyage.',
 'In Strict Mode, React runs **one extra** setup-and-cleanup cycle before the real setup, **in development only**. If this causes a problem, a cleanup is missing.'],
['nx-19', `// app/not-found.js
export default function NotFound() {
  return <h1>Oups, introuvable</h1>;
}`,
 'Le fichier **`not-found.js`** affiche une interface quand la fonction `notFound()` est levée dans un segment de route. À la racine, `app/not-found.js` gère aussi toutes les adresses qui ne correspondent à aucune route de l’application. Next.js renvoie le code HTTP `200` pour les réponses en streaming et `404` sinon. Par défaut c’est un Server Component, et il n’accepte aucune prop. L’exemple de la documentation propose un lien de retour vers l’accueil.',
 'The **`not-found.js`** file renders a UI when the `notFound()` function is thrown within a route segment. At the root, `app/not-found.js` also handles every URL that matches no route in your application. Next.js returns the `200` HTTP status code for streamed responses and `404` otherwise. By default it is a Server Component, and it accepts no props. The documentation’s example offers a link back to the home page.',
 ['Écris le composant `NotFound`.', 'Renvoie un `<div>` avec `<h1>404</h1>`.', 'Ajoute `<Link href="/">Retour</Link>` (l’import est déjà là).'],
 ['Write the `NotFound` component.', 'Return a `<div>` with `<h1>404</h1>`.', 'Add `<Link href="/">Retour</Link>` (the import is already there).'],
 'Le texte du titre doit être exactement `404`, sans autre mot dans le `<h1>`.',
 'The heading text must be exactly `404`, with no other word in the `<h1>`.'],
['nx-20', `// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: "Article : " + slug };
}`,
 'Un `export const metadata` est **fixe**. Quand le titre ou la description dépendent d’**informations dynamiques** (paramètres de la route, données externes, métadonnées des segments parents), on exporte à la place la fonction **`generateMetadata`**, qui renvoie un objet `Metadata`. Elle reçoit un objet avec `params` (une **Promise**, contenant les paramètres dynamiques de la route) et `searchParams` (disponible seulement dans `page.js`), puis un second argument `parent` (une promesse des métadonnées déjà résolues des segments parents). Next.js résout les métadonnées et crée automatiquement les balises `<head>`. Elles ne sont prises en charge que dans les Server Components.',
 'An `export const metadata` is **fixed**. When the title or description depends on **dynamic information** (route parameters, external data, parent segments’ metadata), export the **`generateMetadata`** function instead, which returns a `Metadata` object. It receives an object with `params` (a **Promise** holding the route’s dynamic parameters) and `searchParams` (only available in `page.js`), then a second argument `parent` (a promise of the already-resolved parent segments’ metadata). Next.js resolves the metadata and automatically creates the relevant `<head>` tags. They are only supported in Server Components.',
 ['Écris `export async function generateMetadata({ params }) {`.', 'Lis la valeur : `const { slug } = await params;`.', 'Renvoie `return { title: slug };`.'],
 ['Write `export async function generateMetadata({ params }) {`.', 'Read the value: `const { slug } = await params;`.', 'Return `return { title: slug };`.'],
 'Tu ne peux pas exporter **à la fois** `metadata` et `generateMetadata` dans le même fichier.',
 'You can’t export **both** `metadata` and `generateMetadata` in the same file.'],
['nx-21', `import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

// <body className={roboto.className}>`,
 '`next/font` **optimise automatiquement tes polices** (y compris les polices personnalisées) et supprime les requêtes réseau externes, pour améliorer la confidentialité et les performances. Les fichiers CSS et de police sont **téléchargés au moment du build** et auto-hébergés avec le reste de tes fichiers statiques : le navigateur n’envoie aucune requête à Google. Tu importes la police (`Inter`), tu la configures (`subsets`) puis tu appliques `.className` à un élément du layout. La documentation recommande les **polices variables** pour de meilleures performances.',
 '`next/font` **automatically optimises your fonts** (including custom fonts) and removes external network requests, for improved privacy and performance. CSS and font files are **downloaded at build time** and self-hosted with the rest of your static assets: the browser sends no request to Google. You import the font (`Inter`), configure it (`subsets`) then apply `.className` to an element of the layout. The documentation recommends **variable fonts** for the best performance.',
 ['Importe : `import { Inter } from "next/font/google";`.', 'Crée : `const inter = Inter({ subsets: ["latin"] });`.', 'Dans le layout, écris `<body className={inter.className}>`.'],
 ['Import: `import { Inter } from "next/font/google";`.', 'Create: `const inter = Inter({ subsets: ["latin"] });`.', 'In the layout, write `<body className={inter.className}>`.'],
 'Avec une police variable, tu n’as pas à indiquer le poids ; avec une police **non variable**, la propriété `weight` est obligatoire.',
 'With a variable font you don’t have to set the weight; with a **non-variable** font, the `weight` property is required.'],
['nx-22', `"use client";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();
  return <button onClick={() => router.back()}>Retour</button>;
}`,
 'Le hook `useRouter` te permet de **changer de route par programmation**, dans un Client Component (`"use client"`). La documentation recommande d’utiliser `<Link>` pour naviguer, sauf besoin précis. Méthodes de `useRouter()` : `router.push(href)` (navigation côté client, ajoute une entrée à l’historique), `router.replace(href)` (sans nouvelle entrée), `router.refresh()` (nouvelle requête au serveur, rechargement des données et nouveau rendu des Server Components), `router.prefetch(href)`, `router.back()` et `router.forward()`.',
 'The `useRouter` hook lets you **change routes programmatically**, inside a Client Component (`"use client"`). The documentation recommends using `<Link>` for navigation unless you have a specific requirement. `useRouter()` methods: `router.push(href)` (client-side navigation, adds a history entry), `router.replace(href)` (no new entry), `router.refresh()` (a new request to the server, re-fetching data and re-rendering Server Components), `router.prefetch(href)`, `router.back()` and `router.forward()`.',
 ['Première ligne : `"use client";` (déjà là).', 'Importe `useRouter` depuis `"next/navigation"` et écris `const router = useRouter();`.', 'Dans un bouton : `onClick={() => router.push("/courses")}`.'],
 ['First line: `"use client";` (already there).', 'Import `useRouter` from `"next/navigation"` and write `const router = useRouter();`.', 'In a button: `onClick={() => router.push("/courses")}`.'],
 'Importe depuis `next/navigation`, pas `next/router` (qui est l’ancien Pages Router).',
 'Import from `next/navigation`, not `next/router` (which is the old Pages Router).'],
['nx-23', `// app/api/note/route.js
export async function DELETE(request) {
  // supprimer en base…
  return Response.json({ ok: true });
}`,
 'Un Route Handler exporte **une fonction par méthode HTTP** prise en charge : `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` et `OPTIONS`. Next.js appelle celle qui correspond à la requête. Si tu n’exportes pas `OPTIONS`, Next.js l’implémente automatiquement et renseigne l’en-tête de réponse `Allow` d’après les autres méthodes exportées.',
 'A Route Handler exports **one function per supported HTTP method**: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` and `OPTIONS`. Next.js calls the one that matches the request. If you don’t export `OPTIONS`, Next.js implements it automatically and sets the `Allow` response header based on the other exported methods.',
 ['Écris `export async function DELETE() {`.', 'Renvoie `return Response.json({ deleted: true });`.', 'Ferme l’accolade.'],
 ['Write `export async function DELETE() {`.', 'Return `return Response.json({ deleted: true });`.', 'Close the brace.'],
 'Tu peux exporter plusieurs méthodes dans le même fichier `route.js` : une fonction par méthode.',
 'You can export several methods in the same `route.js` file: one function per method.'],
['nx-24', `// app/shop/page.js  →  /shop?cat=shoes
export default async function Shop({ searchParams }) {
  const { cat } = await searchParams;
  return <h1>Catégorie : {cat ?? "toutes"}</h1>;
}`,
 'Les **paramètres de requête** (`?q=chat`) arrivent dans la prop **`searchParams`** de la page. Comme `params`, c’est une **Promise** en Next.js 15 : `await searchParams`. Utiliser `searchParams` rend la page **dynamique** (rendue à chaque requête). C’est un objet JavaScript simple, pas une instance de `URLSearchParams`. Idéal pour le filtrage, la pagination et le tri.',
 '**Query parameters** (`?q=cat`) arrive in the page’s **`searchParams`** prop. Like `params`, it’s a **Promise** in Next.js 15: `await searchParams`. Using `searchParams` makes the page **dynamic** (rendered at request time). It is a plain JavaScript object, not a `URLSearchParams` instance. Ideal for filtering, pagination and sorting.',
 ['Déclare `export default async function Page({ searchParams }) {`.', 'Lis : `const { q } = await searchParams;`.', 'Renvoie par exemple `<p>Recherche : {q}</p>`.'],
 ['Declare `export default async function Page({ searchParams }) {`.', 'Read: `const { q } = await searchParams;`.', 'Return for example `<p>Search: {q}</p>`.'],
 'Une valeur est du **texte**, un **tableau de textes** si le paramètre est répété (`?a=1&a=2`), ou `undefined` : convertis avec `Number(…)` si besoin.',
 'A value is a **string**, an **array of strings** if the parameter is repeated (`?a=1&a=2`), or `undefined`: convert with `Number(…)` if needed.'],
['ex-12', `"use server";
import { revalidatePath } from "next/cache";

export async function addPost(formData) {
  // ... enregistrer ...
  revalidatePath("/posts");   // la liste se met à jour
}`,
 '`revalidatePath`, importé de `next/cache`, **invalide à la demande** les données en cache d’un chemin précis. Il peut être appelé dans une **Server Function** ou un **Route Handler**, mais pas dans un Client Component ni dans un middleware. Il n’invalide le cache que lorsque le chemin est **visité la prochaine fois**. Dans une Server Action, la page affichée est mise à jour tout de suite.',
 '`revalidatePath`, imported from `next/cache`, **invalidates cached data on demand** for a specific path. It can be called in a **Server Function** or a **Route Handler**, but not in a Client Component or middleware. It only invalidates the cache when the path is **next visited**. In a Server Action, the page being viewed updates immediately.',
 ['Première ligne : `"use server";`.', 'Importe : `import { revalidatePath } from "next/cache";`.', 'Dans l’action, après l’écriture : `revalidatePath("/");`.'],
 ['First line: `"use server";`.', 'Import: `import { revalidatePath } from "next/cache";`.', 'In the action, after the write: `revalidatePath("/");`.'],
 'Pour un chemin à **segment dynamique** (`/product/[slug]`), le paramètre `type` (`"page"` ou `"layout"`) est obligatoire ; pour un chemin littéral comme `/product/1`, omets-le. N’ajoute pas `/page` ou `/layout` au chemin.',
 'For a path with a **dynamic segment** (`/product/[slug]`), the `type` parameter (`"page"` or `"layout"`) is required; for a literal path such as `/product/1`, omit it. Don’t append `/page` or `/layout` to the path.'],
['ex-13', `// app/news/page.js
export const revalidate = 600;   // 10 minutes

export default async function News() {
  const res = await fetch("https://api.exemple.com/news");
  return <p>{(await res.json()).length} articles</p>;
}`,
 'La **configuration de segment de route** règle le comportement d’une page, d’un layout ou d’un Route Handler en **exportant des variables** : `dynamic`, `dynamicParams`, `revalidate`, `fetchCache`, `runtime`, `preferredRegion`. `export const revalidate = 3600;` fixe, en secondes, la durée de revalidation de la route (valeurs possibles : `false`, `0` ou un nombre). Ces options concernent les projets qui n’utilisent pas les Cache Components : avec eux, elles sont remplacées par `use cache` et `cacheLife`.',
 '**Route segment config** sets the behaviour of a Page, Layout or Route Handler by **exporting variables**: `dynamic`, `dynamicParams`, `revalidate`, `fetchCache`, `runtime`, `preferredRegion`. `export const revalidate = 3600;` sets the route’s revalidation time, in seconds (possible values: `false`, `0` or a number). These options apply to projects not using Cache Components: with them, they are replaced by `use cache` and `cacheLife`.',
 ['Écris `export const revalidate = 3600;`.', 'Écris la page : `export default function Page() { … }`.', 'Renvoie un simple `<h1>`.'],
 ['Write `export const revalidate = 3600;`.', 'Write the page: `export default function Page() { … }`.', 'Return a simple `<h1>`.'],
 'Les valeurs doivent pouvoir être **analysées statiquement** : `revalidate = 600` est valide, mais `revalidate = 60 * 10` ne l’est pas.',
 'Values must be **statically analysable**: `revalidate = 600` is valid, but `revalidate = 60 * 10` is not.'],
];
