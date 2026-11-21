// [id, exemple, comprendre FR, comprendre EN, étapes FR, étapes EN, piège FR, piège EN]
export default [
['hc-1', `<h1>Mon site</h1>
<p>Une phrase de présentation.</p>`,
 'HTML décrit la **structure** d’une page avec des balises. Une balise s’ouvre (`<p>`) et se ferme (`</p>`) autour du contenu qu’elle décrit. Il existe six niveaux de titres, de `<h1>` (le plus haut) à `<h6>` ; MDN recommande de n’utiliser qu’**un seul** `<h1>` par page. `<p>` est un paragraphe de texte.',
 'HTML describes a page’s **structure** with tags. A tag opens (`<p>`) and closes (`</p>`) around the content it describes. There are six heading levels, from `<h1>` (the highest) to `<h6>`; MDN recommends using only **one** `<h1>` per page. `<p>` is a paragraph of text.',
 ['Écris la balise ouvrante `<h1>`, puis le mot Bienvenue, puis la balise fermante `</h1>`.', 'À la ligne suivante, écris `<p>`, une phrase de ton choix, puis `</p>`.', 'Clique sur « Vérifier » : l’aperçu sous l’éditeur affiche ta page.'],
 ['Write the opening tag `<h1>`, then the word Bienvenue, then the closing tag `</h1>`.', 'On the next line, write `<p>`, a sentence of your choice, then `</p>`.', 'Click “Check”: the preview under the editor shows your page.'],
 'N’utilise pas un titre pour **agrandir du texte** : c’est le rôle de la propriété CSS `font-size`. Et ne saute pas de niveau : commence par `<h1>`, puis `<h2>`, et ainsi de suite.',
 'Don’t use a heading to **make text bigger**: that is the job of the CSS `font-size` property. And don’t skip levels: start from `<h1>`, then `<h2>`, and so on.'],
['hc-2', `<a href="https://exemple.com">Mon lien</a>
<img src="photo.jpg" alt="Un chat sur un canapé">`,
 'Un **attribut** s’écrit dans la balise ouvrante : `nom="valeur"`. Pour un lien, `href` contient l’adresse de destination. Pour une image, `src` contient son adresse et `alt` décrit l’image avec des mots (utile aux lecteurs d’écran et si l’image ne charge pas). `<img>` n’a pas de balise fermante.',
 'An **attribute** is written inside the opening tag: `name="value"`. On a link, `href` holds the destination address. On an image, `src` holds its address and `alt` describes the image in words (useful for screen readers and when the image fails to load). `<img>` has no closing tag.',
 ['Écris `<a href="https://example.com">Visiter</a>` : l’adresse va dans `href`, le texte cliquable entre les balises.', 'Écris une image : `<img src="https://picsum.photos/80" alt="…">` et remplace les points par une vraie description.', 'Vérifie : le lien pointe bien vers example.com et `alt` n’est pas vide.'],
 ['Write `<a href="https://example.com">Visiter</a>`: the address goes in `href`, the clickable text goes between the tags.', 'Write an image: `<img src="https://picsum.photos/80" alt="…">` and replace the dots with a real description.', 'Check: the link points to example.com and `alt` is not empty.'],
 'Le texte d’un lien doit indiquer sa **destination** (« Documentation MDN »), pas « cliquez ici ». Ici, l’image a aussi besoin d’une vraie phrase dans `alt`, pour ceux qui ne peuvent pas la voir.',
 'A link’s text should indicate its **destination** (“MDN documentation”), not “click here”. Here, the image also needs a real sentence in `alt`, for people who can’t see it.'],
['hc-3', `<ul>
  <li>Pommes</li>
  <li>Poires</li>
</ul>`,
 '`<ul>` (unordered list) fabrique une liste à puces, `<ol>` (ordered list) une liste numérotée. Dans les deux cas, chaque élément est un `<li>` (list item) **placé à l’intérieur** de la liste.',
 '`<ul>` (unordered list) makes a bulleted list and `<ol>` (ordered list) a numbered one. In both cases each item is an `<li>` (list item) **placed inside** the list.',
 ['Écris `<ul>` puis trois lignes `<li>…</li>` puis `</ul>`.', 'Écris `<ol>` puis deux lignes `<li>…</li>` puis `</ol>`.', 'Vérifie que chaque `<li>` est bien entre l’ouverture et la fermeture de sa liste.'],
 ['Write `<ul>`, then three `<li>…</li>` lines, then `</ul>`.', 'Write `<ol>`, then two `<li>…</li>` lines, then `</ol>`.', 'Check that every `<li>` sits between the opening and closing of its list.'],
 'Un `<li>` seul, sans `<ul>` ou `<ol>` autour, n’est pas une liste valide.',
 'A lone `<li>` with no `<ul>` or `<ol>` around it is not a valid list.'],
['hc-4', `p {
  color: blue;
  font-size: 18px;
}`,
 'CSS décrit l’**apparence**. Une règle = un **sélecteur** (qui est concerné, ici `p`) + des accolades contenant des **déclarations** `propriété: valeur;`. Chaque déclaration se termine par un point-virgule (pour la dernière, il est facultatif mais recommandé).',
 'CSS describes **appearance**. A rule = a **selector** (who is affected, here `p`) + braces containing **declarations** `property: value;`. Every declaration ends with a semicolon (for the last one it is optional but recommended).',
 ['Dans la balise `<style>`, écris `h1 {` puis `color: red;` puis `}`.', 'En dessous, écris `p {` puis `font-size: 20px;` puis `}`.', 'Vérifie : le titre est rouge et le paragraphe est plus grand dans l’aperçu.'],
 ['Inside the `<style>` tag, write `h1 {`, then `color: red;`, then `}`.', 'Below it, write `p {`, then `font-size: 20px;`, then `}`.', 'Check: the heading is red and the paragraph is bigger in the preview.'],
 'Un point-virgule oublié fusionne deux déclarations en une seule, invalide : le navigateur ignore les deux. Relis-les toujours.',
 'A missing semicolon merges two declarations into one invalid one: the browser ignores both. Always double-check them.'],
['hc-5', `.alert {
  background: #ffe9e5;
  padding: 8px;
}`,
 'Plusieurs éléments peuvent partager un style grâce à une **classe**. Dans le HTML on écrit `class="card"` ; dans le CSS on cible cette classe avec un **point** : `.card`. Une classe est réutilisable sur autant d’éléments que tu veux.',
 'Several elements can share a style through a **class**. In HTML you write `class="card"`; in CSS you target that class with a **dot**: `.card`. A class can be reused on as many elements as you like.',
 ['Écris `.card {` (avec le point devant `card`).', 'Ajoute `background: #ffc83d;` puis `border-radius: 12px;`.', 'Ferme avec `}` et vérifie : la carte est jaune avec des coins arrondis.'],
 ['Write `.card {` (with the dot before `card`).', 'Add `background: #ffc83d;` then `border-radius: 12px;`.', 'Close with `}` and check: the card is yellow with rounded corners.'],
 'Sans le point, `card` cible une balise `<card>` qui n’existe pas : rien ne se passe.',
 'Without the dot, `card` targets a `<card>` tag that doesn’t exist: nothing happens.'],
['hc-6', `.box {
  padding: 16px;   /* espace DANS la boîte */
  border: 1px solid black;
  margin: 8px;     /* espace AUTOUR de la boîte */
}`,
 'Tout élément est une boîte à quatre couches, du centre vers l’extérieur : le **contenu**, le `padding` (marge intérieure), la `border` (bordure), le `margin` (marge extérieure). Le padding est dans la bordure, la marge est à l’extérieur.',
 'Every element is a box with four layers, from the centre outwards: the **content**, the `padding` (inner space), the `border`, the `margin` (outer space). Padding is inside the border, margin is outside.',
 ['Sur `.box`, écris `padding: 20px;`.', 'Ajoute `margin: 10px;`.', 'Ajoute `border: 2px solid black;` (épaisseur, style, couleur) et vérifie.'],
 ['On `.box`, write `padding: 20px;`.', 'Add `margin: 10px;`.', 'Add `border: 2px solid black;` (width, style, colour) and check.'],
 'Padding et margin se confondent facilement : retiens « padding = dedans, margin = dehors ».',
 'Padding and margin are easy to mix up: remember “padding = inside, margin = outside”.'],
['hc-7', `.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}`,
 '`display: flex` transforme un conteneur en **boîte flexible** : ses enfants directs se rangent en ligne. `justify-content` répartit les enfants sur l’axe principal (`center`, `space-between`…), `gap` fixe l’espace entre eux. On applique ces règles au **parent**, pas aux enfants.',
 '`display: flex` turns a container into a **flexible box**: its direct children line up in a row. `justify-content` distributes the children along the main axis (`center`, `space-between`…), `gap` sets the space between them. Apply these rules to the **parent**, not the children.',
 ['Dans `.row { … }`, écris `display: flex;`.', 'Ajoute `justify-content: center;` pour centrer A, B et C.', 'Ajoute `gap: 10px;` et regarde l’espace apparaître entre les lettres.'],
 ['Inside `.row { … }`, write `display: flex;`.', 'Add `justify-content: center;` to centre A, B and C.', 'Add `gap: 10px;` and watch the space appear between the letters.'],
 'Si tu oublies `display: flex`, `justify-content` et `gap` n’ont aucun effet.',
 'If you forget `display: flex`, `justify-content` and `gap` do nothing.'],
['hc-8', `.gallery {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 8px;
}`,
 'Grid divise un conteneur en **colonnes et lignes**. `grid-template-columns` définit les colonnes. L’unité `fr` veut dire « une part de l’espace disponible » : `1fr 2fr` donne deux colonnes, la seconde prenant deux fois plus de part de l’espace disponible. Attention : `fr` répartit l’espace **disponible** ; un contenu très large dans une colonne laisse moins d’espace à partager. `repeat(3, 1fr)` est un raccourci pour `1fr 1fr 1fr`.',
 'Grid splits a container into **columns and rows**. `grid-template-columns` defines the columns. The `fr` unit means “one share of the available space”: `1fr 2fr` gives two columns, the second getting twice the share of the available space. Careful: `fr` shares the **available** space; very wide content in one column leaves less space to share. `repeat(3, 1fr)` is a shortcut for `1fr 1fr 1fr`.',
 ['Dans `.grid { … }`, écris `display: grid;`.', 'Ajoute `grid-template-columns: repeat(3, 1fr);`.', 'Vérifie : les éléments 1, 2, 3 sont côte à côte en trois colonnes égales.'],
 ['Inside `.grid { … }`, write `display: grid;`.', 'Add `grid-template-columns: repeat(3, 1fr);`.', 'Check: items 1, 2, 3 sit side by side in three equal columns.'],
 'Flex pour aligner sur **un** axe, Grid pour organiser en **deux** dimensions : les deux se complètent.',
 'Flex aligns along **one** axis, Grid lays out in **two** dimensions: they complement each other.'],
['hc-9', `.sidebar { display: block; }

@media (max-width: 600px) {
  .sidebar { display: none; }
}`,
 'Une **media query** applique des règles seulement si une condition sur l’écran est vraie. `@media (max-width: 600px)` signifie « quand la largeur de la fenêtre d’affichage (viewport) est de 600px ou moins » (téléphones). Les règles dans les accolades **remplacent** celles du dessus (à spécificité égale, la dernière gagne). Sur téléphone, ajoute aussi `<meta name="viewport" content="width=device-width, initial-scale=1">` dans le `<head>` : sans elle, le navigateur affiche la page comme sur un grand écran et la media query ne se déclenche pas comme prévu. C’est la base du design responsive.',
 'A **media query** applies rules only when a screen condition is true. `@media (max-width: 600px)` means “when the viewport width is 600px or less” (phones). The rules inside the braces **override** the ones above (at equal specificity, the last one wins). On phones, also add `<meta name="viewport" content="width=device-width, initial-scale=1">` in the `<head>`: without it, the browser renders the page like on a large screen and the media query doesn’t trigger as expected. It is the foundation of responsive design.',
 ['Sous la règle `.box`, écris `@media (max-width: 600px) {`.', 'À l’intérieur, écris `.box { display: none; }`.', 'Ferme l’accolade du `@media`. Les accolades sont imbriquées : deux fermantes à la fin.'],
 ['Under the `.box` rule, write `@media (max-width: 600px) {`.', 'Inside it, write `.box { display: none; }`.', 'Close the `@media` brace. Braces are nested: two closing ones at the end.'],
 'Compte tes accolades : une seule manquante et toute la feuille de style ne fonctionne plus.',
 'Count your braces: a single missing one and the whole stylesheet stops working.'],
['hc-10', `@keyframes slide {
  from { transform: translateX(0); }
  to   { transform: translateX(40px); }
}
.dot { animation: slide 1s infinite alternate; }`,
 'Une animation CSS a deux parties. D’abord `@keyframes nom` décrit les **étapes** (`from` = début, `to` = fin, ou des pourcentages). Ensuite la propriété `animation: nom durée …` l’**applique** à un élément. `infinite` la répète sans fin et `alternate` inverse le sens à chaque passage.',
 'A CSS animation has two parts. First `@keyframes name` describes the **steps** (`from` = start, `to` = end, or percentages). Then the `animation: name duration …` property **applies** it to an element. `infinite` repeats it forever and `alternate` reverses direction on each pass.',
 ['Écris `@keyframes pulse {` puis `from { opacity: 1; }` puis `to { opacity: 0.3; }` puis `}`.', 'Dans `.pulse { … }`, écris `animation: pulse 1s infinite alternate;`.', 'Vérifie : le point clignote doucement dans l’aperçu.'],
 ['Write `@keyframes pulse {`, then `from { opacity: 1; }`, then `to { opacity: 0.3; }`, then `}`.', 'Inside `.pulse { … }`, write `animation: pulse 1s infinite alternate;`.', 'Check: the dot fades in and out in the preview.'],
 'Le nom dans `animation:` doit être **exactement** celui des `@keyframes`.',
 'The name in `animation:` must match the `@keyframes` name **exactly**.'],
];
