// Leçons « navigateur » : DOM et événements.
// Sources relues le 2026-11-16 : MDN « DOM scripting introduction » et « Introduction to events ».
export function installBrowser({ COURSES, T, H, SOL, cs }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  const S = (body) => `${body}\n<script>\n  // ton code ici\n</script>`;
  const q = (s) => `document.querySelector('${s}')`;
  const click = (s) => `${q(s)}.click()`;

  add('javascript',
    H('dom-1', 'Sélectionner et modifier un élément', 'Select and change an element',
      'Avec `querySelector`, récupère le lien `<a>` dans une variable `link`. Change son texte en « Mozilla Developer Network » (`textContent`) et son adresse en `https://developer.mozilla.org` (`href`).',
      'With `querySelector`, store the `<a>` link in a variable `link`. Change its text to “Mozilla Developer Network” (`textContent`) and its address to `https://developer.mozilla.org` (`href`).',
      S('<p>Va sur le site <a href="https://www.mozilla.org/">de Mozilla</a></p>'),
      [T('Un appel à querySelector', 'A querySelector call', { match: 'querySelector\\(' }),
       T('Texte du lien modifié', 'Link text changed', { dom: `${q('a')}.textContent`, expect: 'Mozilla Developer Network' }),
       T('Adresse du lien modifiée', 'Link address changed', { dom: `${q('a')}.getAttribute('href')`, expect: 'https://developer.mozilla.org' })]),

    H('dom-2', 'Sélectionner plusieurs éléments', 'Select several elements',
      '`querySelectorAll` renvoie une `NodeList` de tous les éléments qui correspondent. Parcours les `<li>` avec `for...of` et donne la classe `item` à chacun (`classList.add`).',
      '`querySelectorAll` returns a `NodeList` of every matching element. Loop over the `<li>` with `for...of` and give each one the class `item` (`classList.add`).',
      S('<ul>\n  <li>Pain</li>\n  <li>Lait</li>\n  <li>Riz</li>\n</ul>'),
      [T('Utilise querySelectorAll', 'Uses querySelectorAll', { match: 'querySelectorAll\\(' }),
       T('Les 3 éléments ont la classe item', 'All 3 items have the class item', { dom: "document.querySelectorAll('li.item').length", expect: 3 })]),

    H('dom-3', 'Créer et ajouter un nœud', 'Create and add a node',
      'Crée un paragraphe avec `document.createElement("p")`, donne-lui le texte « Bonne lecture. » avec `textContent`, puis ajoute-le à la fin de la `<section>` avec `appendChild`.',
      'Create a paragraph with `document.createElement("p")`, give it the text “Bonne lecture.” with `textContent`, then add it at the end of the `<section>` with `appendChild`.',
      S('<section>\n  <h2>Titre</h2>\n</section>'),
      [T('Utilise createElement', 'Uses createElement', { match: 'createElement\\(' }),
       T('Un <p> existe dans la section', 'A <p> exists in the section', { dom: "!!document.querySelector('section > p')", expect: true }),
       T('Le <p> est le dernier enfant avec le bon texte', 'The <p> is the last child with the right text', { dom: "document.querySelector('section').lastElementChild.tagName + ':' + document.querySelector('section').lastElementChild.textContent", expect: 'P:Bonne lecture.' })]),

    H('dom-4', 'Déplacer et supprimer un nœud', 'Move and remove a node',
      'Déplace le paragraphe `#a` à la fin de la `<section>` avec `appendChild` (le nœud est déplacé, pas copié). Supprime ensuite le paragraphe `#c` avec `remove()`. Résultat attendu : B puis A.',
      'Move paragraph `#a` to the end of the `<section>` with `appendChild` (the node is moved, not copied). Then delete paragraph `#c` with `remove()`. Expected result: B then A.',
      S('<section>\n  <p id="a">A</p>\n  <p id="b">B</p>\n  <p id="c">C</p>\n</section>'),
      [T('Ordre final : b puis a', 'Final order: b then a', { dom: "[...document.querySelectorAll('section p')].map((p) => p.id).join(',')", expect: 'b,a' }),
       T('#c a disparu', '#c is gone', { dom: `${q('#c')}`, expect: null }),
       T('#a existe une seule fois (déplacé, pas copié)', '#a exists once (moved, not copied)', { dom: "document.querySelectorAll('#a').length", expect: 1 })]),

    H('dom-5', 'Styles en ligne avec style', 'Inline styles with style',
      'Sur le paragraphe `.note`, utilise la propriété `style` : `color` blanc, `backgroundColor` noir et `padding` de `10px`. Attention : en JavaScript, les noms de propriétés CSS s’écrivent en camelCase.',
      'On the `.note` paragraph, use the `style` property: white `color`, black `backgroundColor` and a `padding` of `10px`. Careful: in JavaScript, CSS property names are written in camelCase.',
      S('<p class="note">Un texte à mettre en valeur.</p>'),
      [T('Texte blanc', 'White text', { dom: "getComputedStyle(document.querySelector('.note')).color", expect: 'rgb(255, 255, 255)' }),
       T('Fond noir', 'Black background', { dom: "getComputedStyle(document.querySelector('.note')).backgroundColor", expect: 'rgb(0, 0, 0)' }),
       T('Marge intérieure de 10px', '10px padding', { dom: "getComputedStyle(document.querySelector('.note')).paddingTop", expect: '10px' }),
       T('Utilise style.backgroundColor', 'Uses style.backgroundColor', { match: 'style\\.backgroundColor' })]),

    H('dom-6', 'Changer de style avec une classe', 'Change style with a class',
      'La classe `.highlight` existe déjà dans le CSS. Ajoute-la au paragraphe avec `classList.add("highlight")`, au lieu d’écrire des styles en ligne.',
      'The `.highlight` class already exists in the CSS. Add it to the paragraph with `classList.add("highlight")` instead of writing inline styles.',
      `<style>\n  .highlight { color: white; background-color: black; padding: 10px; }\n</style>\n<p>Un texte à mettre en valeur.</p>\n<script>\n  // ton code ici\n</script>`,
      [T('Utilise classList.add', 'Uses classList.add', { match: 'classList\\.add\\(' }),
       T('Le paragraphe a la classe highlight', 'The paragraph has the class highlight', { dom: `${q('p')}.classList.contains('highlight')`, expect: true }),
       T('Aucun style en ligne', 'No inline style', { dom: `${q('p')}.getAttribute('style')`, expect: null })]),

    H('ev-1', 'Réagir à un clic', 'Reacting to a click',
      'Avec `addEventListener("click", …)`, fais que chaque clic sur le bouton augmente le nombre affiché dans `#out` (il commence à 0).',
      'With `addEventListener("click", …)`, make each click on the button increase the number shown in `#out` (it starts at 0).',
      S('<button>Compter</button>\n<p id="out">0</p>'),
      [T('Après 1 clic : 1', 'After 1 click: 1', { pre: click('button'), dom: `${q('#out')}.textContent`, expect: '1' }),
       T('Après 2 clics : 2', 'After 2 clicks: 2', { pre: click('button'), dom: `${q('#out')}.textContent`, expect: '2' }),
       T('Utilise addEventListener', 'Uses addEventListener', { match: 'addEventListener\\(' })]),

    H('ev-2', 'L’objet événement', 'The event object',
      'Le gestionnaire reçoit un objet événement (souvent nommé `e` ou `event`). Écoute `keydown` sur `#box` et écris dans `#output` le texte `Touche : ` suivi de `e.key`.',
      'The handler receives an event object (often named `e` or `event`). Listen to `keydown` on `#box` and write into `#output` the text `Touche : ` followed by `e.key`.',
      S('<input id="box" type="text">\n<div id="output"></div>'),
      [T('Touche a → « Touche : a »', 'Key a → “Touche : a”', { pre: `${q('#box')}.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))`, dom: `${q('#output')}.textContent`, expect: 'Touche : a' }),
       T('Touche Enter → « Touche : Enter »', 'Key Enter → “Touche : Enter”', { pre: `${q('#box')}.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))`, dom: `${q('#output')}.textContent`, expect: 'Touche : Enter' })]),

    H('ev-3', 'Empêcher le comportement par défaut', 'Preventing default behavior',
      'Écoute `submit` sur le formulaire. Si un des deux champs est vide, appelle `e.preventDefault()` et écris « Remplis les deux noms ! » dans le `<p>`. Si les deux sont remplis, ne bloque rien.',
      'Listen to `submit` on the form. If either field is empty, call `e.preventDefault()` and write “Remplis les deux noms !” in the `<p>`. If both are filled, block nothing.',
      S('<form action="#">\n  <input id="fname" type="text">\n  <input id="lname" type="text">\n  <button>Envoyer</button>\n</form>\n<p></p>'),
      [T('Champs vides : la soumission est annulée', 'Empty fields: submission is cancelled', { pre: ["window.__e1 = new Event('submit', { cancelable: true, bubbles: true })", `${q('form')}.dispatchEvent(window.__e1)`], dom: 'window.__e1.defaultPrevented', expect: true }),
       T('Le message d’erreur s’affiche', 'The error message is shown', { dom: `${q('p')}.textContent`, expect: 'Remplis les deux noms !' }),
       T('Champs remplis : rien n’est bloqué', 'Fields filled: nothing is blocked', { pre: [`${q('#fname')}.value = 'Ama'`, `${q('#lname')}.value = 'Kofi'`, "window.__e2 = new Event('submit', { cancelable: true, bubbles: true })", `${q('form')}.dispatchEvent(window.__e2)`], dom: 'window.__e2.defaultPrevented', expect: false })]),

    H('ev-4', 'Retirer un écouteur', 'Removing a listener',
      'Écris une fonction nommée `greet` qui augmente le nombre dans `#out`. Branche-la au clic avec `addEventListener`, puis retire-la avec `removeEventListener` **à l’intérieur** de `greet`, pour qu’elle ne s’exécute qu’une fois.',
      'Write a function named `greet` that increases the number in `#out`. Attach it on click with `addEventListener`, then remove it with `removeEventListener` **inside** `greet` so that it runs only once.',
      S('<button>Dire bonjour</button>\n<p id="out">0</p>'),
      [T('Deux clics : le compteur reste à 1', 'Two clicks: the counter stays at 1', { pre: [click('button'), click('button')], dom: `${q('#out')}.textContent`, expect: '1' }),
       T('Utilise removeEventListener', 'Uses removeEventListener', { match: 'removeEventListener\\(' })]),

    H('ev-5', 'Plusieurs écouteurs sur un même événement', 'Several listeners on one event',
      'Branche deux écouteurs `click` sur le bouton : le premier écrit « A » dans `#a`, le second écrit « B » dans `#b`. Les deux doivent s’exécuter au même clic (c’est impossible avec la propriété `onclick`, qui se remplace).',
      'Attach two `click` listeners to the button: the first writes “A” in `#a`, the second writes “B” in `#b`. Both must run on the same click (impossible with the `onclick` property, which gets overwritten).',
      S('<button>Clique</button>\n<p id="a"></p>\n<p id="b"></p>'),
      [T('#a affiche A après un clic', '#a shows A after a click', { pre: click('button'), dom: `${q('#a')}.textContent`, expect: 'A' }),
       T('#b affiche B après le même clic', '#b shows B after the same click', { dom: `${q('#b')}.textContent`, expect: 'B' }),
       T('Deux appels à addEventListener', 'Two addEventListener calls', { match: 'addEventListener\\([^]*addEventListener\\(' }),
       T('Pas de propriété onclick', 'No onclick property', { match: '^(?![^]*\\.onclick)' })]),
  );

  Object.assign(SOL, {
    'dom-1': `<p>Va sur le site <a href="https://www.mozilla.org/">de Mozilla</a></p>\n<script>\n  const link = document.querySelector('a');\n  link.textContent = 'Mozilla Developer Network';\n  link.href = 'https://developer.mozilla.org';\n</script>`,
    'dom-2': `<ul>\n  <li>Pain</li>\n  <li>Lait</li>\n  <li>Riz</li>\n</ul>\n<script>\n  const items = document.querySelectorAll('li');\n  for (const li of items) {\n    li.classList.add('item');\n  }\n</script>`,
    'dom-3': `<section>\n  <h2>Titre</h2>\n</section>\n<script>\n  const sect = document.querySelector('section');\n  const para = document.createElement('p');\n  para.textContent = 'Bonne lecture.';\n  sect.appendChild(para);\n</script>`,
    'dom-4': `<section>\n  <p id="a">A</p>\n  <p id="b">B</p>\n  <p id="c">C</p>\n</section>\n<script>\n  const sect = document.querySelector('section');\n  sect.appendChild(document.querySelector('#a'));\n  document.querySelector('#c').remove();\n</script>`,
    'dom-5': `<p class="note">Un texte à mettre en valeur.</p>\n<script>\n  const note = document.querySelector('.note');\n  note.style.color = 'white';\n  note.style.backgroundColor = 'black';\n  note.style.padding = '10px';\n</script>`,
    'dom-6': `<style>\n  .highlight { color: white; background-color: black; padding: 10px; }\n</style>\n<p>Un texte à mettre en valeur.</p>\n<script>\n  document.querySelector('p').classList.add('highlight');\n</script>`,
    'ev-1': `<button>Compter</button>\n<p id="out">0</p>\n<script>\n  const btn = document.querySelector('button');\n  const out = document.querySelector('#out');\n  let n = 0;\n  btn.addEventListener('click', () => {\n    n++;\n    out.textContent = n;\n  });\n</script>`,
    'ev-2': `<input id="box" type="text">\n<div id="output"></div>\n<script>\n  const box = document.querySelector('#box');\n  const output = document.querySelector('#output');\n  box.addEventListener('keydown', (e) => {\n    output.textContent = \`Touche : \${e.key}\`;\n  });\n</script>`,
    'ev-3': `<form action="#">\n  <input id="fname" type="text">\n  <input id="lname" type="text">\n  <button>Envoyer</button>\n</form>\n<p></p>\n<script>\n  const form = document.querySelector('form');\n  const fname = document.querySelector('#fname');\n  const lname = document.querySelector('#lname');\n  const para = document.querySelector('p');\n  form.addEventListener('submit', (e) => {\n    if (fname.value === '' || lname.value === '') {\n      e.preventDefault();\n      para.textContent = 'Remplis les deux noms !';\n    }\n  });\n</script>`,
    'ev-4': `<button>Dire bonjour</button>\n<p id="out">0</p>\n<script>\n  const btn = document.querySelector('button');\n  const out = document.querySelector('#out');\n  let n = 0;\n  function greet() {\n    n++;\n    out.textContent = n;\n    btn.removeEventListener('click', greet);\n  }\n  btn.addEventListener('click', greet);\n</script>`,
    'ev-5': `<button>Clique</button>\n<p id="a"></p>\n<p id="b"></p>\n<script>\n  const btn = document.querySelector('button');\n  btn.addEventListener('click', () => {\n    document.querySelector('#a').textContent = 'A';\n  });\n  btn.addEventListener('click', () => {\n    document.querySelector('#b').textContent = 'B';\n  });\n</script>`,
  });

  // ───────── Propagation des événements (MDN « Event bubbling ») ─────────
  const OUT = "document.querySelector('#output').textContent";
  add('javascript',
    H('ev-6', 'La propagation (bubbling)', 'Event bubbling',
      'Écris une fonction `handleClick(e)` qui ajoute `e.currentTarget.tagName` suivi d’une virgule à `#output`. Branche-la au clic sur `document.body`, sur `#container` et sur le bouton. Un clic sur le bouton doit afficher `BUTTON,DIV,BODY,` : l’événement **remonte** du plus profond vers le plus haut.',
      'Write a function `handleClick(e)` that appends `e.currentTarget.tagName` followed by a comma to `#output`. Attach it on click to `document.body`, to `#container` and to the button. A click on the button must show `BUTTON,DIV,BODY,`: the event **bubbles up** from the innermost element to the outermost.',
      S('<div id="container">\n  <button>Clique</button>\n</div>\n<pre id="output"></pre>'),
      [T('Clic sur le bouton : BUTTON,DIV,BODY,', 'Click on the button: BUTTON,DIV,BODY,', { pre: click('button'), dom: OUT, expect: 'BUTTON,DIV,BODY,' }),
       T('Clic sur le div : DIV,BODY, s’ajoute', 'Click on the div: DIV,BODY, is added', { pre: click('#container'), dom: OUT, expect: 'BUTTON,DIV,BODY,DIV,BODY,' })]),

    H('ev-7', 'Arrêter la propagation', 'Stopping propagation',
      'Un clic sur `#box` écrit « box » dans `#out`. Un clic sur le bouton `#inner` (qui est dans `#box`) doit écrire « inner » **sans** que `#box` réagisse : appelle `e.stopPropagation()` dans son gestionnaire.',
      'A click on `#box` writes “box” into `#out`. A click on the `#inner` button (which sits inside `#box`) must write “inner” **without** `#box` reacting: call `e.stopPropagation()` in its handler.',
      S('<div id="box">\n  <button id="inner">Dedans</button>\n</div>\n<p id="out"></p>'),
      [T('Clic sur #inner : « inner » (pas écrasé par « box »)', 'Click on #inner: “inner” (not overwritten by “box”)', { pre: click('#inner'), dom: `${q('#out')}.textContent`, expect: 'inner' }),
       T('Clic sur #box : « box »', 'Click on #box: “box”', { pre: click('#box'), dom: `${q('#out')}.textContent`, expect: 'box' }),
       T('Utilise stopPropagation', 'Uses stopPropagation', { match: 'stopPropagation\\(' })]),

    H('ev-8', 'Délégation d’événements', 'Event delegation',
      'Au lieu de brancher un écouteur sur chaque `<li>`, branche **un seul** écouteur `click` sur la `<ul>`. Il doit ajouter la classe `done` à l’élément cliqué, que tu récupères avec `e.target`.',
      'Instead of attaching a listener to every `<li>`, attach **a single** `click` listener to the `<ul>`. It must add the class `done` to the clicked element, which you get from `e.target`.',
      S('<ul>\n  <li>Pain</li>\n  <li>Lait</li>\n  <li>Riz</li>\n</ul>'),
      [T('Clic sur le 2e <li> : il reçoit done', 'Click on the 2nd <li>: it gets done', { pre: click('li:nth-child(2)'), dom: `${q('li:nth-child(2)')}.classList.contains('done')`, expect: true }),
       T('Les autres <li> ne changent pas', 'The other <li> do not change', { dom: "document.querySelectorAll('li.done').length", expect: 1 }),
       T('Un clic sur le 3e <li> fonctionne aussi', 'A click on the 3rd <li> works too', { pre: click('li:nth-child(3)'), dom: "document.querySelectorAll('li.done').length", expect: 2 }),
       T('Un seul addEventListener', 'A single addEventListener', { match: '^(?![^]*addEventListener\\([^]*addEventListener\\()[^]*addEventListener\\(' })]),

    H('ev-9', 'La capture', 'Event capture',
      'Même page que la leçon précédente, mais inverse l’ordre : donne l’option `{ capture: true }` à l’écouteur de `document.body` et de `#container`, pas à celui du bouton. Un clic sur le bouton doit afficher `BODY,DIV,BUTTON,`.',
      'Same page as the earlier lesson, but reverse the order: give the `{ capture: true }` option to the listeners of `document.body` and `#container`, not to the button’s. A click on the button must show `BODY,DIV,BUTTON,`.',
      S('<div id="container">\n  <button>Clique</button>\n</div>\n<pre id="output"></pre>'),
      [T('Clic sur le bouton : BODY,DIV,BUTTON,', 'Click on the button: BODY,DIV,BUTTON,', { pre: click('button'), dom: OUT, expect: 'BODY,DIV,BUTTON,' }),
       T('Utilise capture: true', 'Uses capture: true', { match: 'capture\\s*:\\s*true' })]),
  );

  Object.assign(SOL, {
    'ev-6': `<div id="container">\n  <button>Clique</button>\n</div>\n<pre id="output"></pre>\n<script>\n  const output = document.querySelector('#output');\n  function handleClick(e) {\n    output.textContent += e.currentTarget.tagName + ',';\n  }\n  document.body.addEventListener('click', handleClick);\n  document.querySelector('#container').addEventListener('click', handleClick);\n  document.querySelector('button').addEventListener('click', handleClick);\n</script>`,
    'ev-7': `<div id="box">\n  <button id="inner">Dedans</button>\n</div>\n<p id="out"></p>\n<script>\n  const out = document.querySelector('#out');\n  document.querySelector('#box').addEventListener('click', () => {\n    out.textContent = 'box';\n  });\n  document.querySelector('#inner').addEventListener('click', (e) => {\n    e.stopPropagation();\n    out.textContent = 'inner';\n  });\n</script>`,
    'ev-8': `<ul>\n  <li>Pain</li>\n  <li>Lait</li>\n  <li>Riz</li>\n</ul>\n<script>\n  document.querySelector('ul').addEventListener('click', (e) => {\n    e.target.classList.add('done');\n  });\n</script>`,
    'ev-9': `<div id="container">\n  <button>Clique</button>\n</div>\n<pre id="output"></pre>\n<script>\n  const output = document.querySelector('#output');\n  function handleClick(e) {\n    output.textContent += e.currentTarget.tagName + ',';\n  }\n  document.body.addEventListener('click', handleClick, { capture: true });\n  document.querySelector('#container').addEventListener('click', handleClick, { capture: true });\n  document.querySelector('button').addEventListener('click', handleClick);\n</script>`,
  });

  // ───────── Requêtes réseau avec fetch (MDN « Making network requests with JavaScript ») ─────────
  // Le serveur est simulé (voir FETCH_MOCK dans CourseView.js) : fetch() renvoie de vraies Response.
  const F = (...a) => Object.assign(H(...a), { mockFetch: true });
  const WAIT = ['0', '0'];
  const OUTT = "document.querySelector('#out').textContent";
  add('javascript',
    F('net-1', 'Lire un fichier texte avec fetch', 'Fetching a text file with fetch',
      'Avec `fetch("verse1.txt")`, récupère le texte du fichier et affiche-le dans `#out`. Enchaîne les `.then` : le premier vérifie `response.ok` (sinon il lance une erreur) puis renvoie `response.text()`, le second écrit le texte dans `#out`.',
      'With `fetch("verse1.txt")`, get the file’s text and show it in `#out`. Chain `.then` calls: the first checks `response.ok` (otherwise it throws an error) then returns `response.text()`, the second writes the text into `#out`.',
      S('<pre id="out">Chargement…</pre>'),
      [T('fetch est appelé', 'fetch is called', { match: 'fetch\\(' }),
       T('Le texte du fichier s’affiche', 'The file’s text is shown', { pre: WAIT, dom: OUTT, expect: 'Premier couplet : la mer est calme.' }),
       T('Vérifie response.ok', 'Checks response.ok', { match: 'response\\.ok|\\.ok\\b' })]),

    F('net-2', 'Gérer une erreur HTTP', 'Handling an HTTP error',
      'Le fichier `inconnu.txt` n’existe pas : le serveur répond **404**. Fais `fetch("inconnu.txt")`. Si `!response.ok`, lance `new Error(`HTTP error: ${response.status}`)`. Ajoute un `.catch` qui écrit `Erreur : ` suivi de `error.message` dans `#out`.',
      'The file `inconnu.txt` does not exist: the server answers **404**. Call `fetch("inconnu.txt")`. If `!response.ok`, throw `new Error(`HTTP error: ${response.status}`)`. Add a `.catch` that writes `Erreur : ` followed by `error.message` into `#out`.',
      S('<pre id="out">Chargement…</pre>'),
      [T('Le message d’erreur HTTP s’affiche', 'The HTTP error message is shown', { pre: WAIT, dom: OUTT, expect: 'Erreur : HTTP error: 404' }),
       T('Utilise catch', 'Uses catch', { match: '\\.catch\\(' }),
       T('Lance une erreur avec throw', 'Throws an error', { match: 'throw\\s+new\\s+Error' })]),

    F('net-3', 'Lire du JSON et remplir la page', 'Reading JSON and filling the page',
      'Récupère `products.json` avec `fetch`, lis-le avec `response.json()`, puis crée un `<li>` par produit dans `#list` avec le texte `nom : prix` (par exemple « Haricots : 1.5 »). Vérifie `response.ok` avant.',
      'Fetch `products.json` with `fetch`, read it with `response.json()`, then create one `<li>` per product in `#list` with the text `name : price` (for example “Haricots : 1.5”). Check `response.ok` first.',
      S('<ul id="list"></ul>'),
      [T('Deux <li> sont créés', 'Two <li> are created', { pre: WAIT, dom: "document.querySelectorAll('#list li').length", expect: 2 }),
       T('Premier produit : « Haricots : 1.5 »', 'First product: “Haricots : 1.5”', { dom: "document.querySelector('#list li').textContent", expect: 'Haricots : 1.5' }),
       T('Utilise response.json()', 'Uses response.json()', { match: '\\.json\\(\\)' }),
       T('Vérifie response.ok', 'Checks response.ok', { match: '\\.ok\\b' })]),

    F('net-4', 'Charger selon un choix', 'Loading according to a choice',
      'Écris `updateDisplay(verse)` : elle transforme « Verse 1 » en `verse1.txt` (`replace(" ", "").toLowerCase()`), fait le `fetch` et écrit le texte dans `#out`. Appelle-la au départ avec « Verse 1 », et à chaque `change` du `<select>` avec sa valeur.',
      'Write `updateDisplay(verse)`: it turns “Verse 1” into `verse1.txt` (`replace(" ", "").toLowerCase()`), does the `fetch` and writes the text into `#out`. Call it at start with “Verse 1”, and on every `change` of the `<select>` with its value.',
      S('<select>\n  <option>Verse 1</option>\n  <option>Verse 2</option>\n</select>\n<pre id="out"></pre>'),
      [T('Au départ : verse1', 'At start: verse1', { pre: WAIT, dom: OUTT, expect: 'Premier couplet : la mer est calme.' }),
       T('Après choix de « Verse 2 » : verse2', 'After choosing “Verse 2”: verse2', { pre: [`${q('select')}.value = 'Verse 2'`, `${q('select')}.dispatchEvent(new Event('change'))`, '0', '0'], dom: OUTT, expect: 'Deuxième couplet : le vent se lève.' }),
       T('Fonction updateDisplay', 'updateDisplay function', { match: 'function\\s+updateDisplay|updateDisplay\\s*=' })]),
  );

  Object.assign(SOL, {
    'net-1': `<pre id="out">Chargement…</pre>\n<script>\n  fetch('verse1.txt')\n    .then((response) => {\n      if (!response.ok) {\n        throw new Error(\`HTTP error: \${response.status}\`);\n      }\n      return response.text();\n    })\n    .then((text) => {\n      document.querySelector('#out').textContent = text;\n    });\n</script>`,
    'net-2': `<pre id="out">Chargement…</pre>\n<script>\n  const out = document.querySelector('#out');\n  fetch('inconnu.txt')\n    .then((response) => {\n      if (!response.ok) {\n        throw new Error(\`HTTP error: \${response.status}\`);\n      }\n      return response.text();\n    })\n    .then((text) => {\n      out.textContent = text;\n    })\n    .catch((error) => {\n      out.textContent = \`Erreur : \${error.message}\`;\n    });\n</script>`,
    'net-3': `<ul id="list"></ul>\n<script>\n  const list = document.querySelector('#list');\n  fetch('products.json')\n    .then((response) => {\n      if (!response.ok) {\n        throw new Error(\`HTTP error: \${response.status}\`);\n      }\n      return response.json();\n    })\n    .then((products) => {\n      for (const p of products) {\n        const li = document.createElement('li');\n        li.textContent = \`\${p.name} : \${p.price}\`;\n        list.appendChild(li);\n      }\n    });\n</script>`,
    'net-4': `<select>\n  <option>Verse 1</option>\n  <option>Verse 2</option>\n</select>\n<pre id="out"></pre>\n<script>\n  const select = document.querySelector('select');\n  const out = document.querySelector('#out');\n  function updateDisplay(verse) {\n    const url = verse.replace(' ', '').toLowerCase() + '.txt';\n    fetch(url)\n      .then((response) => {\n        if (!response.ok) {\n          throw new Error(\`HTTP error: \${response.status}\`);\n        }\n        return response.text();\n      })\n      .then((text) => {\n        out.textContent = text;\n      })\n      .catch((error) => {\n        out.textContent = \`Could not fetch verse: \${error}\`;\n      });\n  }\n  select.addEventListener('change', () => updateDisplay(select.value));\n  updateDisplay('Verse 1');\n</script>`,
  });

  // ───────── Cascade, spécificité, héritage (MDN « Handling conflicts ») ─────────
  const ST = (css) => `<style>\n${css}\n</style>`;
  add('html-css',
    H('casc-1', 'Ordre des règles (cascade)', 'Rule order (cascade)',
      'Deux règles de même poids ciblent le même élément : **la dernière gagne**. Ajoute après la règle rouge une seconde règle sur `h1` pour que le titre soit **bleu**.',
      'Two rules of equal weight target the same element: **the last one wins**. After the red rule, add a second rule on `h1` so that the heading is **blue**.',
      `<h1>Mon titre</h1>\n${ST('  h1 { color: red; }\n  /* ta règle ici */')}`,
      [T('Titre bleu', 'Blue heading', { dom: cs('h1', 'color'), expect: 'rgb(0, 0, 255)' }),
       T('Deux règles h1', 'Two h1 rules', { match: 'h1\\s*\\{[^}]*\\}[^]*h1\\s*\\{' })]),

    H('casc-2', 'Une classe pèse plus qu’un élément', 'A class outweighs an element',
      'Le titre a la classe `main-heading`. Ajoute **avant** la règle `h1` une règle `.main-heading` qui le colorie en **rouge**. Elle gagne, bien qu’elle soit écrite en premier : sa spécificité est plus forte.',
      'The heading has the class `main-heading`. Add **before** the `h1` rule a `.main-heading` rule that colours it **red**. It wins even though it is written first: its specificity is higher.',
      `<h1 class="main-heading">Mon titre</h1>\n${ST('  /* ta règle ici */\n  h1 { color: blue; }')}`,
      [T('Titre rouge', 'Red heading', { dom: cs('h1', 'color'), expect: 'rgb(255, 0, 0)' }),
       T('Règle .main-heading', '.main-heading rule', { match: '\\.main-heading\\s*\\{' }),
       T('La règle de classe est écrite avant h1', 'The class rule is written before h1', { match: '\\.main-heading\\s*\\{[^}]*\\}[^]*h1\\s*\\{' })]),

    H('casc-3', 'Compter la spécificité', 'Counting specificity',
      'La règle `#outer a` vaut **1-0-1** (1 identifiant, 0 classe, 1 élément) et colorie le lien en rouge. Écris une règle qui le colorie en **bleu** et qui a une spécificité plus forte, **sans** `!important` ni style en ligne. Indice : ajoute la classe `nav` au sélecteur (1-1-1).',
      'The rule `#outer a` is worth **1-0-1** (1 id, 0 class, 1 element) and colours the link red. Write a rule that colours it **blue** and has a higher specificity, **without** `!important` or an inline style. Hint: add the `nav` class to the selector (1-1-1).',
      `<div id="outer">\n  <a class="nav" href="#">Lien</a>\n</div>\n${ST('  #outer a { color: red; }\n  /* ta règle ici */')}`,
      [T('Lien bleu', 'Blue link', { dom: cs('a', 'color'), expect: 'rgb(0, 0, 255)' }),
       T('Pas de !important', 'No !important', { match: '^(?![^]*!important)' }),
       T('Règle avec #outer', 'Rule using #outer', { match: '#outer[^{]*\\.nav[^{]*\\{|\\.nav[^{]*#outer[^{]*\\{' })]),

    H('casc-4', 'L’héritage', 'Inheritance',
      'Sur la liste `.main`, donne `color: rebeccapurple` et `border: 2px solid #cccccc`. Les `<li>` **héritent** de la couleur (propriété héritée) mais pas de la bordure (propriété non héritée).',
      'On the `.main` list, set `color: rebeccapurple` and `border: 2px solid #cccccc`. The `<li>` **inherit** the colour (an inherited property) but not the border (a non-inherited property).',
      `<ul class="main">\n  <li>Un</li>\n  <li>Deux</li>\n</ul>\n${ST('  /* ton CSS ici */')}`,
      [T('La liste est violette', 'The list is purple', { dom: cs('.main', 'color'), expect: 'rgb(102, 51, 153)' }),
       T('Les <li> héritent de la couleur', 'The <li> inherit the colour', { dom: cs('li', 'color'), expect: 'rgb(102, 51, 153)' }),
       T('La liste a une bordure', 'The list has a border', { dom: cs('.main', 'borderTopWidth'), expect: '2px' }),
       T('Les <li> n’héritent pas de la bordure', 'The <li> do not inherit the border', { dom: cs('li', 'borderTopWidth'), expect: '0px' })]),

    H('casc-5', 'Contrôler l’héritage : inherit', 'Controlling inheritance: inherit',
      'Le `body` est vert, mais un lien reste bleu (couleur par défaut du navigateur). Ajoute une règle `.x a` avec `color: inherit` pour que le lien prenne la couleur de son parent.',
      'The `body` is green, but a link stays blue (the browser’s default). Add a `.x a` rule with `color: inherit` so that the link takes its parent’s colour.',
      `<ul>\n  <li class="x">Un <a href="#">lien</a></li>\n</ul>\n${ST('  body { color: green; }\n  /* ta règle ici */')}`,
      [T('Le lien est vert', 'The link is green', { dom: cs('a', 'color'), expect: 'rgb(0, 128, 0)' }),
       T('Utilise inherit', 'Uses inherit', { match: 'color\\s*:\\s*inherit' })]),

    H('casc-6', 'Tout réinitialiser avec all', 'Resetting everything with all',
      'Deux citations : la première est stylisée. Dans la règle `.fix-this`, utilise la propriété raccourci `all` avec la valeur `unset` pour que la seconde perde **tous** les styles du `blockquote`.',
      'Two quotes: the first is styled. In the `.fix-this` rule, use the shorthand `all` property with the value `unset` so that the second loses **all** the `blockquote` styles.',
      `<blockquote>Stylisée</blockquote>\n<blockquote class="fix-this">Non stylisée</blockquote>\n${ST('  blockquote { background-color: orange; border: 2px solid blue; }\n  .fix-this {\n    /* ta déclaration ici */\n  }')}`,
      [T('Utilise all: unset', 'Uses all: unset', { match: 'all\\s*:\\s*unset' }),
       T('La 2e citation n’a plus de fond', 'The 2nd quote has no background', { dom: cs('.fix-this', 'backgroundColor'), expect: 'rgba(0, 0, 0, 0)' }),
       T('La 2e citation n’a plus de bordure', 'The 2nd quote has no border', { dom: cs('.fix-this', 'borderTopStyle'), expect: 'none' }),
       T('La 1re reste orange', 'The 1st one stays orange', { dom: "getComputedStyle(document.querySelector('blockquote')).backgroundColor", expect: 'rgb(255, 165, 0)' })]),

    H('casc-7', '!important', '!important',
      'L’ID `#winning` impose une bordure. Dans `.better`, écris `border: none !important` : cette déclaration l’emporte malgré la spécificité plus faible. MDN recommande de **ne jamais** l’utiliser sauf nécessité absolue : ici c’est pour comprendre.',
      'The `#winning` ID forces a border. In `.better`, write `border: none !important`: that declaration wins despite the lower specificity. MDN recommends **never** using it unless absolutely necessary: here it is to understand it.',
      `<p class="better" id="winning">Un seul sélecteur pour les gouverner tous.</p>\n${ST('  #winning { border: 1px solid black; }\n  .better {\n    background-color: gray;\n    /* ta déclaration ici */\n  }')}`,
      [T('Pas de bordure', 'No border', { dom: cs('p', 'borderTopStyle'), expect: 'none' }),
       T('border: none !important', 'border: none !important', { match: 'border\\s*:\\s*none\\s*!important' })]),
  );

  Object.assign(SOL, {
    'casc-1': `<h1>Mon titre</h1>\n<style>\n  h1 { color: red; }\n  h1 { color: blue; }\n</style>`,
    'casc-2': `<h1 class="main-heading">Mon titre</h1>\n<style>\n  .main-heading { color: red; }\n  h1 { color: blue; }\n</style>`,
    'casc-3': `<div id="outer">\n  <a class="nav" href="#">Lien</a>\n</div>\n<style>\n  #outer a { color: red; }\n  #outer a.nav { color: blue; }\n</style>`,
    'casc-4': `<ul class="main">\n  <li>Un</li>\n  <li>Deux</li>\n</ul>\n<style>\n  .main { color: rebeccapurple; border: 2px solid #cccccc; }\n</style>`,
    'casc-5': `<ul>\n  <li class="x">Un <a href="#">lien</a></li>\n</ul>\n<style>\n  body { color: green; }\n  .x a { color: inherit; }\n</style>`,
    'casc-6': `<blockquote>Stylisée</blockquote>\n<blockquote class="fix-this">Non stylisée</blockquote>\n<style>\n  blockquote { background-color: orange; border: 2px solid blue; }\n  .fix-this { all: unset; }\n</style>`,
    'casc-7': `<p class="better" id="winning">Un seul sélecteur pour les gouverner tous.</p>\n<style>\n  #winning { border: 1px solid black; }\n  .better { background-color: gray; border: none !important; }\n</style>`,
  });

  // ───────── Le <head> et les métadonnées (MDN « What’s in the head? Web page metadata ») ─────────
  const HS = (head, body) => `<!doctype html>\n<html lang="fr">\n  <head>\n${head}\n  </head>\n  <body>\n${body}\n  </body>\n</html>`;
  const HEAD = (sel) => `document.head.querySelector('${sel}')`;
  add('html-css',
    H('head-1', 'Le squelette d’un document', 'The skeleton of a document',
      'Écris un document HTML complet : `<!doctype html>`, un `<html lang="fr">` qui contient un `<head>` (avec le `<title>` « Ma page ») et un `<body>` (avec un paragraphe `<p>`).',
      'Write a complete HTML document: `<!doctype html>`, an `<html lang="fr">` containing a `<head>` (with the `<title>` “Ma page”) and a `<body>` (with a `<p>` paragraph).',
      '<!-- écris ton document complet ici -->\n',
      [T('Doctype html', 'Doctype html', { dom: 'document.doctype ? document.doctype.name : null', expect: 'html' }),
       T('<html lang="fr">', '<html lang="fr">', { dom: 'document.documentElement.lang', expect: 'fr' }),
       T('<title> dans le <head>', '<title> in the <head>', { dom: `${HEAD('title')} ? ${HEAD('title')}.textContent : null`, expect: 'Ma page' }),
       T('Un <p> dans le <body>', 'A <p> in the <body>', { dom: "!!document.body.querySelector('p')", expect: true })]),

    H('head-2', '<title> et <h1> : deux choses différentes', '<title> and <h1>: two different things',
      'Complète le document : le `<title>` (métadonnée du document, dans le `<head>`) doit valoir « Recettes de cuisine », et le `<h1>` (titre visible du contenu, dans le `<body>`) « Bienvenue ». Un seul `<h1>` par page.',
      'Complete the document: the `<title>` (document metadata, in the `<head>`) must be “Recettes de cuisine”, and the `<h1>` (visible content heading, in the `<body>`) “Bienvenue”. Only one `<h1>` per page.',
      HS('    <!-- ton head ici -->', '    <!-- ton body ici -->'),
      [T('Titre du document', 'Document title', { dom: 'document.title', expect: 'Recettes de cuisine' }),
       T('Un seul <h1> « Bienvenue »', 'A single <h1> “Bienvenue”', { dom: "document.querySelectorAll('h1').length + ':' + (document.querySelector('h1') || { textContent: '' }).textContent", expect: '1:Bienvenue' }),
       T('Le <title> est dans le <head>', 'The <title> is in the <head>', { dom: `!!${HEAD('title')}`, expect: true }),
       T('Le <h1> est dans le <body>', 'The <h1> is in the <body>', { dom: "!!document.body.querySelector('h1')", expect: true })]),

    H('head-3', 'L’encodage des caractères', 'Character encoding',
      'Dans le `<head>`, déclare l’encodage universel avec `<meta charset="utf-8">`, puis ajoute dans le `<body>` un paragraphe contenant `ご飯が熱い。` : une page en `utf-8` affiche toutes les langues.',
      'In the `<head>`, declare the universal encoding with `<meta charset="utf-8">`, then add to the `<body>` a paragraph containing `ご飯が熱い。`: a `utf-8` page displays every language.',
      HS('    <!-- ton head ici -->', '    <!-- ton body ici -->'),
      [T('<meta charset="utf-8"> dans le <head>', '<meta charset="utf-8"> in the <head>', { dom: `${HEAD('meta[charset]')} ? ${HEAD('meta[charset]')}.getAttribute('charset').toLowerCase() : null`, expect: 'utf-8' }),
       T('Le paragraphe japonais est là', 'The Japanese paragraph is there', { dom: "(document.querySelector('body p') || { textContent: '' }).textContent.includes('ご飯が熱い。')", expect: true })]),

    H('head-4', 'Auteur et description', 'Author and description',
      'Dans le `<head>`, ajoute deux `<meta>` avec les attributs `name` et `content` : `name="author"` avec `content="Ama Kofi"`, et `name="description"` avec une description d’au moins 20 caractères. La description est reprise par les moteurs de recherche.',
      'In the `<head>`, add two `<meta>` elements with `name` and `content` attributes: `name="author"` with `content="Ama Kofi"`, and `name="description"` with a description of at least 20 characters. The description is used by search engines.',
      HS('    <meta charset="utf-8">\n    <title>Ma page</title>\n    <!-- tes meta ici -->', '    <p>Contenu</p>'),
      [T('Auteur : Ama Kofi', 'Author: Ama Kofi', { dom: `${HEAD('meta[name="author"]')} ? ${HEAD('meta[name="author"]')}.getAttribute('content') : null`, expect: 'Ama Kofi' }),
       T('Description d’au moins 20 caractères', 'Description of at least 20 characters', { dom: `${HEAD('meta[name="description"]')} ? ${HEAD('meta[name="description"]')}.getAttribute('content').length >= 20 : false`, expect: true })]),

    H('head-5', 'Relier du CSS et du JavaScript', 'Linking CSS and JavaScript',
      'Dans le `<head>`, relie la feuille de style `style.css` avec `<link rel="stylesheet" href="style.css">` et le script `script.js` avec `<script src="script.js" defer></script>`. L’attribut `defer` attend la fin de l’analyse du HTML avant d’exécuter le script.',
      'In the `<head>`, link the stylesheet `style.css` with `<link rel="stylesheet" href="style.css">` and the script `script.js` with `<script src="script.js" defer></script>`. The `defer` attribute waits for the HTML to finish parsing before running the script.',
      HS('    <meta charset="utf-8">\n    <title>Ma page</title>\n    <!-- tes liens ici -->', '    <p>Contenu</p>'),
      [T('<link rel="stylesheet"> dans le <head>', '<link rel="stylesheet"> in the <head>', { dom: `!!${HEAD('link[rel="stylesheet"][href="style.css"]')}`, expect: true }),
       T('<script src="script.js"> dans le <head>', '<script src="script.js"> in the <head>', { dom: `!!${HEAD('script[src="script.js"]')}`, expect: true }),
       T('Le script a defer', 'The script has defer', { dom: `${HEAD('script[src="script.js"]')} ? ${HEAD('script[src="script.js"]')}.defer : false`, expect: true })]),

    H('head-6', 'La langue du document', 'The document’s language',
      'Dans la page, la balise `<html>` doit déclarer la langue principale `fr` (attribut `lang`). La phrase japonaise doit être entourée d’un `<span lang="ja">`, car une partie du document peut avoir sa propre langue. Complète `<html>` et le `<span>`.',
      'In the page, the `<html>` tag must declare the main language `fr` (`lang` attribute). The Japanese phrase must be wrapped in a `<span lang="ja">`, because part of a document can have its own language. Complete `<html>` and the `<span>`.',
      '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>Langues</title>\n  </head>\n  <body>\n    <p>Exemple japonais : ご飯が熱い。</p>\n  </body>\n</html>',
      [T('<html lang="fr">', '<html lang="fr">', { dom: 'document.documentElement.lang', expect: 'fr' }),
       T('Un <span lang="ja">', 'A <span lang="ja">', { dom: "!!document.querySelector('span[lang=\"ja\"]')", expect: true }),
       T('Le span contient la phrase japonaise', 'The span contains the Japanese phrase', { dom: "(document.querySelector('span[lang=\"ja\"]') || { textContent: '' }).textContent", expect: 'ご飯が熱い。' })]),
  );

  Object.assign(SOL, {
    'head-1': `<!doctype html>\n<html lang="fr">\n  <head>\n    <title>Ma page</title>\n  </head>\n  <body>\n    <p>Bonjour</p>\n  </body>\n</html>`,
    'head-2': HS('    <title>Recettes de cuisine</title>', '    <h1>Bienvenue</h1>'),
    'head-3': HS('    <meta charset="utf-8">', '    <p>ご飯が熱い。</p>'),
    'head-4': HS('    <meta charset="utf-8">\n    <title>Ma page</title>\n    <meta name="author" content="Ama Kofi">\n    <meta name="description" content="Une page d’exemple pour apprendre les métadonnées HTML.">', '    <p>Contenu</p>'),
    'head-5': HS('    <meta charset="utf-8">\n    <title>Ma page</title>\n    <link rel="stylesheet" href="style.css">\n    <script src="script.js" defer></script>', '    <p>Contenu</p>'),
    'head-6': `<!doctype html>\n<html lang="fr">\n  <head>\n    <meta charset="utf-8">\n    <title>Langues</title>\n  </head>\n  <body>\n    <p>Exemple japonais : <span lang="ja">ご飯が熱い。</span></p>\n  </body>\n</html>`,
  });
}
