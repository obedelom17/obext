// Explications des leçons DOM et événements (reformulées d’après MDN « DOM scripting introduction » et « Introduction to events »).
export default [
['dom-1', `const link = document.querySelector('a');
link.textContent = 'Mozilla Developer Network';
link.href = 'https://developer.mozilla.org';`,
 'Le navigateur transforme ta page HTML en un arbre d’objets : le **DOM**. Pour agir sur un élément, il faut d’abord le **sélectionner** et garder une référence dans une variable. `document.querySelector("a")` renvoie le **premier** élément qui correspond au sélecteur CSS donné. Ensuite, tu modifies ses propriétés : `textContent` pour le texte, `href` pour l’adresse d’un lien.',
 'The browser turns your HTML page into a tree of objects: the **DOM**. To act on an element you must first **select** it and keep a reference in a variable. `document.querySelector("a")` returns the **first** element matching the given CSS selector. Then you change its properties: `textContent` for the text, `href` for a link’s address.',
 ['Écris `const link = document.querySelector("a");`.', 'Change le texte : `link.textContent = "…";`.', 'Change l’adresse : `link.href = "…";`.'],
 ['Write `const link = document.querySelector("a");`.', 'Change the text: `link.textContent = "…";`.', 'Change the address: `link.href = "…";`.'],
 'Le script doit venir **après** l’élément dans la page (par exemple juste avant `</body>`), sinon `querySelector` renvoie `null`.',
 'The script must come **after** the element in the page (for example just before `</body>`), otherwise `querySelector` returns `null`.'],
['dom-2', `const items = document.querySelectorAll('li');
for (const li of items) {
  li.classList.add('item');
}`,
 '`querySelector` ne renvoie qu’un élément. Pour agir sur **tous** les éléments qui correspondent, utilise `querySelectorAll`, qui renvoie une `NodeList` : un objet semblable à un tableau, que l’on parcourt avec `for...of`. Les anciennes méthodes `getElementById` et `getElementsByTagName` existent aussi, mais `querySelector` est l’approche moderne recommandée : elle accepte n’importe quel sélecteur CSS.',
 '`querySelector` only returns one element. To act on **every** matching element, use `querySelectorAll`, which returns a `NodeList`: an array-like object you can loop over with `for...of`. The older `getElementById` and `getElementsByTagName` also exist, but `querySelector` is the recommended modern approach: it accepts any CSS selector.',
 ['Récupère tous les `<li>` avec `querySelectorAll("li")`.', 'Parcours-les avec `for (const li of items)`.', 'Dans la boucle, ajoute la classe avec `li.classList.add("item")`.'],
 ['Get every `<li>` with `querySelectorAll("li")`.', 'Loop over them with `for (const li of items)`.', 'Inside the loop, add the class with `li.classList.add("item")`.'],
 'Une `NodeList` n’est pas un vrai tableau : elle n’a pas `map` ni `filter`. Convertis-la avec `[...items]` si besoin.',
 'A `NodeList` is not a real array: it has no `map` or `filter`. Convert it with `[...items]` if needed.'],
['dom-3', `const sect = document.querySelector('section');
const para = document.createElement('p');
para.textContent = 'Bonne lecture.';
sect.appendChild(para);`,
 'Pour ajouter du contenu, on **crée** un nœud puis on le **place** dans l’arbre. `document.createElement("p")` fabrique un élément qui n’est encore nulle part dans la page. Tu règles son contenu (`textContent`), puis `parent.appendChild(enfant)` l’ajoute comme **dernier enfant** du parent. Tant que tu n’as pas fait `appendChild`, rien n’apparaît.',
 'To add content you **create** a node, then **place** it in the tree. `document.createElement("p")` builds an element that is not in the page yet. You set its content (`textContent`), then `parent.appendChild(child)` adds it as the parent’s **last child**. Until you call `appendChild`, nothing shows up.',
 ['Sélectionne la section avec `querySelector`.', 'Crée le paragraphe avec `createElement("p")` et règle son `textContent`.', 'Ajoute-le avec `sect.appendChild(para)`.'],
 ['Select the section with `querySelector`.', 'Create the paragraph with `createElement("p")` and set its `textContent`.', 'Add it with `sect.appendChild(para)`.'],
 'Crée le texte avec `textContent`, pas avec `innerHTML`, quand le texte vient d’un utilisateur : `innerHTML` interprète le HTML et ouvre la porte aux injections.',
 'Set text with `textContent`, not `innerHTML`, when the text comes from a user: `innerHTML` parses HTML and opens the door to injection.'],
['dom-4', `sect.appendChild(document.querySelector('#a')); // déplace
document.querySelector('#c').remove();           // supprime`,
 'Un nœud ne peut avoir qu’**un seul** emplacement dans le DOM. Si tu fais `appendChild` avec un élément déjà présent, il est **déplacé**, pas dupliqué. Pour obtenir une copie, utilise `cloneNode()`. Pour supprimer un élément dont tu as la référence, `element.remove()` suffit (l’ancienne forme `parent.removeChild(element)` fonctionne aussi).',
 'A node can only have **one** place in the DOM. If you `appendChild` an element that is already there, it is **moved**, not duplicated. To get a copy, use `cloneNode()`. To delete an element you hold a reference to, `element.remove()` is enough (the older `parent.removeChild(element)` also works).',
 ['Sélectionne la section et `#a`.', 'Appelle `sect.appendChild(a)` pour déplacer `#a` à la fin.', 'Sélectionne `#c` et appelle `.remove()`.'],
 ['Select the section and `#a`.', 'Call `sect.appendChild(a)` to move `#a` to the end.', 'Select `#c` and call `.remove()`.'],
 'Après `remove()`, la variable pointe encore vers l’élément (hors de la page) : tu pourrais le remettre plus tard.',
 'After `remove()`, the variable still points to the element (outside the page): you could put it back later.'],
['dom-5', `const note = document.querySelector('.note');
note.style.color = 'white';
note.style.backgroundColor = 'black';
note.style.padding = '10px';`,
 'La propriété `style` d’un élément permet d’écrire des **styles en ligne**. Les noms CSS à tirets deviennent du **camelCase** : `background-color` s’écrit `backgroundColor`, `text-align` s’écrit `textAlign`. Les valeurs sont des chaînes de caractères, unité comprise (`"10px"`).',
 'An element’s `style` property lets you write **inline styles**. Hyphenated CSS names become **camelCase**: `background-color` is `backgroundColor`, `text-align` is `textAlign`. Values are strings, unit included (`"10px"`).',
 ['Sélectionne `.note`.', 'Écris `note.style.color = "white"`.', 'Écris `note.style.backgroundColor = "black"` puis `note.style.padding = "10px"`.'],
 ['Select `.note`.', 'Write `note.style.color = "white"`.', 'Write `note.style.backgroundColor = "black"` then `note.style.padding = "10px"`.'],
 'Écrire `background-color` avec un tiret ne marche pas : `note.style.background-color` est lu comme une soustraction.',
 'Writing `background-color` with a hyphen does not work: `note.style.background-color` is read as a subtraction.'],
['dom-6', `.highlight { color: white; background-color: black; }

document.querySelector('p').classList.add('highlight');`,
 'Les styles en ligne mélangent CSS et JavaScript. L’autre méthode, plus propre, consiste à écrire les styles dans le CSS sous une **classe**, puis à ajouter ou retirer cette classe depuis JavaScript : `classList.add("x")`, `classList.remove("x")`, `classList.toggle("x")`, `classList.contains("x")`. Les petits besoins ponctuels se règlent avec `style`, les applications plus grandes préfèrent les classes.',
 'Inline styles mix CSS and JavaScript. The other, cleaner method is to write the styles in CSS under a **class**, then add or remove that class from JavaScript: `classList.add("x")`, `classList.remove("x")`, `classList.toggle("x")`, `classList.contains("x")`. Small one-off needs can use `style`; larger apps prefer classes.',
 ['Sélectionne le paragraphe.', 'Appelle `classList.add("highlight")` dessus.', 'Vérifie dans l’aperçu que le style s’applique.'],
 ['Select the paragraph.', 'Call `classList.add("highlight")` on it.', 'Check in the preview that the style applies.'],
 'Le nom passé à `classList.add` n’a pas de point : `"highlight"`, pas `".highlight"`.',
 'The name passed to `classList.add` has no dot: `"highlight"`, not `".highlight"`.'],
['ev-1', `const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  // ce code s'exécute à chaque clic
});`,
 'Un **événement** est un signal envoyé par le navigateur quand quelque chose se passe : clic, touche pressée, formulaire envoyé, page chargée… Pour y réagir, on attache un **écouteur** avec `élément.addEventListener("click", fonction)`. Le premier argument est le nom de l’événement, le second la fonction (le **gestionnaire**) appelée à chaque fois qu’il se produit. C’est le mécanisme recommandé.',
 'An **event** is a signal sent by the browser when something happens: a click, a key press, a form submission, a page load… To react to it you attach a **listener** with `element.addEventListener("click", function)`. The first argument is the event name, the second is the function (the **handler**) called each time it happens. This is the recommended mechanism.',
 ['Sélectionne le bouton et `#out`.', 'Garde un compteur `let n = 0`.', 'Dans `addEventListener("click", …)`, fais `n++` puis `out.textContent = n`.'],
 ['Select the button and `#out`.', 'Keep a counter `let n = 0`.', 'Inside `addEventListener("click", …)`, do `n++` then `out.textContent = n`.'],
 'Passe la fonction elle-même, sans parenthèses : `addEventListener("click", maFonction)`. Avec `maFonction()`, elle s’exécute tout de suite.',
 'Pass the function itself, without parentheses: `addEventListener("click", myFunction)`. With `myFunction()`, it runs immediately.'],
['ev-2', `box.addEventListener('keydown', (e) => {
  output.textContent = \`Touche : \${e.key}\`;
});`,
 'Le navigateur passe automatiquement au gestionnaire un **objet événement** (nommé `e`, `evt` ou `event`). Sa propriété `target` désigne l’élément sur lequel l’événement a eu lieu. Certains événements ajoutent des propriétés propres : pour `keydown`, l’objet est un `KeyboardEvent` dont `key` donne la touche pressée.',
 'The browser automatically passes the handler an **event object** (named `e`, `evt` or `event`). Its `target` property is the element the event occurred on. Some events add their own properties: for `keydown`, the object is a `KeyboardEvent` whose `key` tells you which key was pressed.',
 ['Sélectionne `#box` et `#output`.', 'Écoute `keydown` sur `#box` avec une fonction qui prend `e`.', 'Écris `output.textContent = "Touche : " + e.key`.'],
 ['Select `#box` and `#output`.', 'Listen to `keydown` on `#box` with a function taking `e`.', 'Write `output.textContent = "Touche : " + e.key`.'],
 'Le nom du paramètre est libre, mais reste cohérent : si tu écris `(event)`, utilise `event.key`, pas `e.key`.',
 'The parameter name is free, but stay consistent: if you write `(event)`, use `event.key`, not `e.key`.'],
['ev-3', `form.addEventListener('submit', (e) => {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'Remplis les deux noms !';
  }
});`,
 'Certains événements ont un **comportement par défaut** : envoyer un formulaire recharge la page vers l’adresse de l’attribut `action`. `e.preventDefault()` annule ce comportement. C’est la base de la validation de formulaire côté navigateur : on vérifie les champs, et si quelque chose ne va pas, on bloque l’envoi et on affiche un message. Cette vérification reste faible : le serveur doit toujours revalider.',
 'Some events have a **default behavior**: submitting a form reloads the page towards the `action` address. `e.preventDefault()` cancels it. It is the basis of in-browser form validation: you check the fields, and if something is wrong you block the submission and show a message. This check is weak: the server must always validate again.',
 ['Écoute `submit` sur le formulaire.', 'Teste si un des champs est vide (`value === ""`).', 'Dans ce cas : `e.preventDefault()` puis écris le message dans le `<p>`.'],
 ['Listen to `submit` on the form.', 'Test whether either field is empty (`value === ""`).', 'In that case: `e.preventDefault()` then write the message in the `<p>`.'],
 'Écoute `submit` sur le **formulaire**, pas `click` sur le bouton : le formulaire peut aussi être envoyé avec la touche Entrée.',
 'Listen to `submit` on the **form**, not `click` on the button: a form can also be submitted with the Enter key.'],
['ev-4', `function greet() {
  // …
  btn.removeEventListener('click', greet);
}
btn.addEventListener('click', greet);`,
 '`removeEventListener("click", fonction)` retire un écouteur. Pour que cela marche, il faut lui donner **la même fonction** que celle passée à `addEventListener` : une fonction **nommée**, pas une fonction anonyme écrite à la volée (deux fonctions identiques en apparence sont deux objets différents). Retirer des écouteurs devenus inutiles allège les gros programmes, et permet de faire changer d’action au même bouton.',
 '`removeEventListener("click", function)` removes a listener. For it to work you must give it **the same function** that was passed to `addEventListener`: a **named** function, not an anonymous one written inline (two functions that look identical are two different objects). Removing listeners that are no longer needed lightens big programs, and lets the same button change its action.',
 ['Déclare `function greet() { … }` qui augmente le compteur.', 'Dans `greet`, appelle `btn.removeEventListener("click", greet)`.', 'Branche-la avec `btn.addEventListener("click", greet)`.'],
 ['Declare `function greet() { … }` that increases the counter.', 'Inside `greet`, call `btn.removeEventListener("click", greet)`.', 'Attach it with `btn.addEventListener("click", greet)`.'],
 'Avec une fonction fléchée anonyme, tu ne pourras jamais la retirer : tu n’as pas de référence à lui redonner.',
 'With an anonymous arrow function you can never remove it: you have no reference to give back.'],
['ev-5', `btn.addEventListener('click', functionA);
btn.addEventListener('click', functionB); // les deux s'exécutent`,
 'En appelant `addEventListener` plusieurs fois avec des gestionnaires différents, plusieurs fonctions réagissent au même événement. Les anciennes écritures sont moins souples : la **propriété** `element.onclick = fonction` ne garde qu’**un** gestionnaire (le suivant remplace le précédent), et l’**attribut HTML** `<button onclick="…">` mélange HTML et JavaScript, devient ingérable dès que la page grandit, et est parfois interdit par les serveurs pour des raisons de sécurité. MDN conseille de ne jamais l’utiliser.',
 'By calling `addEventListener` several times with different handlers, several functions react to the same event. The older forms are less flexible: the **property** `element.onclick = function` keeps only **one** handler (the next replaces the previous), and the **HTML attribute** `<button onclick="…">` mixes HTML and JavaScript, becomes unmanageable as the page grows, and is sometimes forbidden by servers for security reasons. MDN advises never to use it.',
 ['Sélectionne le bouton.', 'Ajoute un premier `addEventListener("click", …)` qui écrit « A » dans `#a`.', 'Ajoute un second `addEventListener("click", …)` qui écrit « B » dans `#b`.'],
 ['Select the button.', 'Add a first `addEventListener("click", …)` that writes “A” in `#a`.', 'Add a second `addEventListener("click", …)` that writes “B” in `#b`.'],
 'Avec `onclick`, seul le dernier gestionnaire assigné survit : c’est un bug classique.',
 'With `onclick`, only the last assigned handler survives: a classic bug.'],
['ev-6', `document.body.addEventListener('click', handleClick);
container.addEventListener('click', handleClick);
button.addEventListener('click', handleClick);
// clic sur le bouton → BUTTON, DIV, BODY`,
 'Les éléments HTML sont imbriqués. Quand tu cliques sur un bouton placé dans un `<div>`, tu cliques aussi, implicitement, sur le `<div>`. Si les deux ont un écouteur, **les deux s’exécutent** : d’abord celui de l’élément le plus profond (le bouton), puis celui de son parent, puis celui du parent du parent, jusqu’en haut. On dit que l’événement **remonte** (*bubbles up*). Dans le gestionnaire, `e.currentTarget` désigne l’élément **auquel l’écouteur est attaché**.',
 'HTML elements are nested. When you click a button placed inside a `<div>`, you also implicitly click the `<div>`. If both have a listener, **both run**: first the innermost element’s (the button), then its parent’s, then its grandparent’s, all the way up. The event is said to **bubble up**. Inside the handler, `e.currentTarget` is the element **the listener is attached to**.',
 ['Écris `handleClick(e)` qui ajoute `e.currentTarget.tagName + ","` à `#output`.', 'Branche-la sur `document.body`, sur `#container` et sur le bouton.', 'Clique sur le bouton et lis l’ordre dans `#output`.'],
 ['Write `handleClick(e)` that appends `e.currentTarget.tagName + ","` to `#output`.', 'Attach it to `document.body`, to `#container` and to the button.', 'Click the button and read the order in `#output`.'],
 'Un clic « touche » tous les ancêtres de l’élément cliqué : un écouteur sur `body` voit donc presque tous les clics de la page.',
 'A click “touches” every ancestor of the clicked element: a listener on `body` therefore sees almost every click on the page.'],
['ev-7', `inner.addEventListener('click', (e) => {
  e.stopPropagation();
  out.textContent = 'inner';
});`,
 'La remontée peut poser problème. Exemple de MDN : une vidéo placée dans un bloc ; cliquer sur la vidéo la lance, mais le clic remonte au bloc, dont l’écouteur le cache. La solution est `e.stopPropagation()`, à appeler dans le gestionnaire de l’élément interne : l’événement **ne remonte plus** vers les autres éléments.',
 'Bubbling can cause problems. MDN’s example: a video placed inside a box; clicking the video plays it, but the click bubbles to the box, whose listener hides it. The fix is `e.stopPropagation()`, called in the inner element’s handler: the event **no longer bubbles** to other elements.',
 ['Écris un écouteur `click` sur `#box` qui met « box » dans `#out`.', 'Écris un écouteur `click` sur `#inner` qui met « inner ».', 'Dans celui de `#inner`, appelle `e.stopPropagation()`.'],
 ['Write a `click` listener on `#box` that puts “box” in `#out`.', 'Write a `click` listener on `#inner` that puts “inner”.', 'In `#inner`’s listener, call `e.stopPropagation()`.'],
 'À utiliser avec parcimonie : si tu coupes la remontée, d’autres parties du code qui comptaient sur cet événement ne le verront plus.',
 'Use sparingly: if you cut the bubbling, other parts of the code that relied on that event will no longer see it.'],
['ev-8', `list.addEventListener('click', (e) => {
  e.target.classList.add('done');
});`,
 'La remontée est aussi très utile. Pour réagir aux clics sur **beaucoup** d’éléments enfants, on ne branche pas un écouteur sur chacun : on en met **un seul sur le parent**, et les événements des enfants remontent jusqu’à lui. C’est la **délégation d’événements**. Dans le gestionnaire, `e.target` est l’élément **sur lequel l’événement a eu lieu** (le plus profond), alors que `e.currentTarget` reste le parent qui porte l’écouteur.',
 'Bubbling is also very useful. To react to clicks on **many** child elements you do not attach a listener to each one: you put **a single one on the parent**, and the children’s events bubble up to it. This is **event delegation**. In the handler, `e.target` is the element **the event occurred on** (the innermost one), while `e.currentTarget` stays the parent that carries the listener.',
 ['Sélectionne la `<ul>`.', 'Branche un écouteur `click` sur la `<ul>`.', 'Dans le gestionnaire, ajoute la classe `done` à `e.target`.'],
 ['Select the `<ul>`.', 'Attach a `click` listener to the `<ul>`.', 'In the handler, add the class `done` to `e.target`.'],
 'Si un `<li>` contient d’autres balises (un `<span>`, une icône), `e.target` peut être cet élément interne, pas le `<li>`.',
 'If a `<li>` contains other tags (a `<span>`, an icon), `e.target` may be that inner element rather than the `<li>`.'],
['ev-9', `document.body.addEventListener('click', handleClick, { capture: true });
container.addEventListener('click', handleClick, { capture: true });
button.addEventListener('click', handleClick);`,
 'Il existe une autre forme de propagation : la **capture**. C’est l’ordre inverse de la remontée : l’événement se déclenche d’abord sur l’élément le **moins imbriqué**, puis sur des éléments de plus en plus profonds, jusqu’à la cible. Elle est **désactivée par défaut** ; on l’active avec l’option `{ capture: true }` de `addEventListener`. Les navigateurs modernes gèrent les deux phases (héritage d’un compromis entre d’anciens navigateurs) ; presque tous les écouteurs utilisent la remontée, plus naturelle la plupart du temps.',
 'There is another form of propagation: **capture**. It is the reverse order of bubbling: the event fires first on the **least nested** element, then on deeper and deeper ones, until the target. It is **disabled by default**; you enable it with the `{ capture: true }` option of `addEventListener`. Modern browsers handle both phases (a legacy of a compromise between old browsers); almost all listeners use bubbling, which makes more sense most of the time.',
 ['Reprends la page de la leçon précédente.', 'Ajoute `{ capture: true }` en 3e argument pour `body` et `#container`.', 'Laisse l’écouteur du bouton tel quel et vérifie l’ordre.'],
 ['Reuse the previous lesson’s page.', 'Add `{ capture: true }` as the 3rd argument for `body` and `#container`.', 'Leave the button’s listener as is and check the order.'],
 'Le troisième argument peut aussi être un simple `true`, mais l’objet `{ capture: true }` se lit mieux.',
 'The third argument can also be a bare `true`, but the `{ capture: true }` object reads better.'],
['net-1', `fetch('verse1.txt')
  .then((response) => {
    if (!response.ok) throw new Error('HTTP error: ' + response.status);
    return response.text();
  })
  .then((text) => { out.textContent = text; });`,
 'Dans le modèle classique, charger une nouvelle donnée recharge toute la page. Avec l’**API Fetch**, ton JavaScript demande **seulement la donnée utile** au serveur (une requête HTTP), puis met à jour la page avec le DOM : c’est plus rapide et consomme moins de données. `fetch(url)` est **asynchrone** et renvoie une **promesse**. Quand la réponse arrive, le premier `.then` reçoit un objet `Response`. `response.text()` lit le corps en texte ; c’est aussi asynchrone, donc on **renvoie** sa promesse et on enchaîne un second `.then`.',
 'In the classic model, loading a new piece of data reloads the whole page. With the **Fetch API**, your JavaScript asks the server for **only the useful data** (one HTTP request), then updates the page with the DOM: it is faster and uses less data. `fetch(url)` is **asynchronous** and returns a **promise**. When the response arrives, the first `.then` receives a `Response` object. `response.text()` reads the body as text; it is also asynchronous, so you **return** its promise and chain a second `.then`.',
 ['Appelle `fetch("verse1.txt")`.', 'Dans le premier `.then`, vérifie `response.ok` puis `return response.text()`.', 'Dans le second `.then`, écris le texte dans `#out`.'],
 ['Call `fetch("verse1.txt")`.', 'In the first `.then`, check `response.ok` then `return response.text()`.', 'In the second `.then`, write the text into `#out`.'],
 'Ici, le serveur est **simulé** par la leçon. Sur ton propre ordinateur, MDN rappelle que les navigateurs refusent les requêtes HTTP depuis un fichier local : il faut passer par un serveur local.',
 'Here the server is **simulated** by the lesson. On your own computer, MDN points out that browsers refuse HTTP requests from a local file: you need to go through a local server.'],
['net-2', `.then((response) => {
  if (!response.ok) throw new Error('HTTP error: ' + response.status);
  return response.text();
})
.catch((error) => { out.textContent = 'Erreur : ' + error.message; });`,
 'Une requête peut échouer. Le piège de `fetch` : une réponse **404** ou **500** est quand même une réponse, donc la promesse **n’est pas rejetée**. C’est à toi de tester `response.ok` (vrai pour les statuts 200 à 299) et de lancer toi-même une erreur avec `throw new Error(...)`. En ajoutant un `.catch` à la fin de la chaîne, tu attrapes **toutes** les erreurs : celles que tu as lancées, celles du réseau, celles des `.then`. Une application complète affiche le message à l’écran plutôt que dans la console.',
 'A request can fail. The `fetch` trap: a **404** or **500** response is still a response, so the promise is **not rejected**. It is up to you to test `response.ok` (true for statuses 200 to 299) and to throw an error yourself with `throw new Error(...)`. By adding a `.catch` at the end of the chain, you catch **all** errors: the ones you threw, network errors, errors inside the `.then` handlers. A complete app shows the message on screen rather than in the console.',
 ['Appelle `fetch("inconnu.txt")`.', 'Si `!response.ok`, `throw new Error(...)` avec le statut.', 'Ajoute `.catch((error) => …)` qui écrit `Erreur : ` + `error.message` dans `#out`.'],
 ['Call `fetch("inconnu.txt")`.', 'If `!response.ok`, `throw new Error(...)` with the status.', 'Add `.catch((error) => …)` that writes `Erreur : ` + `error.message` into `#out`.'],
 'Sans le test `response.ok`, une page 404 serait lue comme si tout allait bien.',
 'Without the `response.ok` test, a 404 page would be read as if everything were fine.'],
['net-3', `fetch('products.json')
  .then((response) => {
    if (!response.ok) throw new Error('HTTP error: ' + response.status);
    return response.json();
  })
  .then((products) => { /* créer les <li> */ });`,
 'Les données échangées avec un serveur sont souvent du **JSON**. `response.json()` lit le corps et le transforme en objet ou tableau JavaScript (c’est asynchrone aussi : on renvoie sa promesse). Tu peux ensuite parcourir les données et construire des éléments avec les méthodes DOM vues plus haut : `createElement`, `textContent`, `appendChild`. C’est la boucle classique d’une page pilotée par les données : **demander, lire, afficher**.',
 'Data exchanged with a server is often **JSON**. `response.json()` reads the body and turns it into a JavaScript object or array (also asynchronous: you return its promise). You can then loop over the data and build elements with the DOM methods seen earlier: `createElement`, `textContent`, `appendChild`. It is the classic loop of a data-driven page: **ask, read, display**.',
 ['Appelle `fetch("products.json")` et vérifie `response.ok`.', 'Renvoie `response.json()`.', 'Dans le `.then` suivant, crée un `<li>` par produit et ajoute-le à `#list`.'],
 ['Call `fetch("products.json")` and check `response.ok`.', 'Return `response.json()`.', 'In the next `.then`, create one `<li>` per product and add it to `#list`.'],
 'Pour une image, MDN utilise `response.blob()` au lieu de `json()` : le format de lecture dépend du type de ressource.',
 'For an image, MDN uses `response.blob()` instead of `json()`: the reading method depends on the resource type.'],
['net-4', `function updateDisplay(verse) {
  const url = verse.replace(' ', '').toLowerCase() + '.txt';
  fetch(url).then(/* … */);
}
select.addEventListener('change', () => updateDisplay(select.value));
updateDisplay('Verse 1');`,
 'On combine ici événements et réseau : quand l’utilisateur change la valeur d’un `<select>`, l’événement `change` se déclenche, et ton gestionnaire appelle une fonction qui construit l’URL du fichier voulu puis lance `fetch`. Il faut aussi charger une valeur **au départ**, sinon la zone reste vide tant que l’utilisateur n’a rien choisi.',
 'Here events and networking combine: when the user changes a `<select>` value, the `change` event fires, and your handler calls a function that builds the wanted file’s URL then runs `fetch`. You must also load a value **at start**, otherwise the area stays empty until the user picks something.',
 ['Écris `updateDisplay(verse)` qui fabrique l’URL.', 'Dans cette fonction, fais le `fetch` et affiche le texte dans `#out`.', 'Appelle-la au départ, puis à chaque `change` du `<select>`.'],
 ['Write `updateDisplay(verse)` that builds the URL.', 'In that function, do the `fetch` and show the text in `#out`.', 'Call it at start, then on every `change` of the `<select>`.'],
 'Les serveurs distinguent souvent majuscules et minuscules et n’aiment pas les espaces dans les noms de fichiers : d’où le `toLowerCase()` et le `replace`.',
 'Servers are often case-sensitive and dislike spaces in file names: hence `toLowerCase()` and `replace`.'],
['casc-1', `h1 { color: red; }
h1 { color: blue; }   /* le titre est bleu */`,
 'CSS signifie *Cascading Style Sheets* : le mot **cascade** est essentiel. Quand deux règles s’appliquent au même élément avec des valeurs différentes pour la même propriété, il faut décider laquelle gagne. Si elles ont le **même poids** (même source, même sélecteur), c’est **la dernière dans l’ordre du code** qui l’emporte. Seules les propriétés en conflit sont remplacées, pas la règle entière.',
 'CSS stands for *Cascading Style Sheets*: the word **cascade** is essential. When two rules apply to the same element with different values for the same property, something must decide which one wins. If they have the **same weight** (same source, same selector), **the last one in code order** wins. Only the conflicting properties are replaced, not the whole rule.',
 ['Garde la règle `h1 { color: red; }`.', 'Écris juste après une seconde règle `h1 { color: blue; }`.', 'Vérifie dans l’aperçu : le titre est bleu.'],
 ['Keep the `h1 { color: red; }` rule.', 'Write right after it a second `h1 { color: blue; }` rule.', 'Check the preview: the heading is blue.'],
 'L’ordre ne compte que si le poids est identique. Un sélecteur plus spécifique gagne même s’il est écrit avant.',
 'Order only matters when the weight is identical. A more specific selector wins even if it is written first.'],
['casc-2', `.main-heading { color: red; }   /* spécificité 0-1-0 */
h1 { color: blue; }              /* spécificité 0-0-1 */`,
 'La **spécificité** est l’algorithme que le navigateur utilise pour choisir quelle valeur s’applique. Un sélecteur d’**élément** (`h1`) est peu spécifique : il vise tous les éléments de ce type. Un sélecteur de **classe** (`.main-heading`) est plus spécifique, donc plus lourd. Un **identifiant** (`#id`) l’est encore plus. Le titre ci-dessous est rouge même si `color: blue` vient plus tard : la classe l’emporte.',
 '**Specificity** is the algorithm the browser uses to pick which value applies. An **element** selector (`h1`) is not very specific: it targets every element of that type. A **class** selector (`.main-heading`) is more specific, hence heavier. An **id** (`#id`) is heavier still. The heading below is red even though `color: blue` comes later: the class wins.',
 ['Écris `.main-heading { color: red; }` en premier.', 'Laisse `h1 { color: blue; }` après.', 'Constate que le titre reste rouge.'],
 ['Write `.main-heading { color: red; }` first.', 'Leave `h1 { color: blue; }` after it.', 'Note that the heading stays red.'],
 'Les sélecteurs d’attribut et les pseudo-classes ont le même poids qu’une classe ; les pseudo-éléments le même poids qu’un élément.',
 'Attribute selectors and pseudo-classes have the same weight as a class; pseudo-elements have the same weight as an element.'],
['casc-3', `#outer a       → 1-0-1
#outer a.nav   → 1-1-1   (gagne)
.nav           → 0-1-0`,
 'La spécificité se mesure avec trois colonnes, des centaines aux unités : **identifiants** (1 point dans la colonne ID par `#id`), **classes** (colonne classe : `.x`, `[attr]`, `:hover`), **éléments** (colonne élément : `a`, `::before`). On compare **colonne par colonne en partant de la gauche** ; on ne regarde la colonne suivante qu’en cas d’égalité. Une seule colonne ID l’emporte donc sur un million de classes. Le sélecteur universel `*`, les combinateurs (`>`, `+`, `~`, espace) et `:where()` ne comptent pas.',
 'Specificity is measured with three columns, from hundreds to ones: **ids** (1 point in the ID column per `#id`), **classes** (class column: `.x`, `[attr]`, `:hover`), **elements** (element column: `a`, `::before`). You compare **column by column starting from the left**; you only look at the next column in case of a tie. A single ID therefore beats a million classes. The universal selector `*`, combinators (`>`, `+`, `~`, space) and `:where()` do not count.',
 ['Calcule `#outer a` : 1 identifiant et 1 élément → 1-0-1.', 'Écris un sélecteur plus fort, par exemple `#outer a.nav` (1-1-1).', 'Donne-lui `color: blue`.'],
 ['Compute `#outer a`: 1 id and 1 element → 1-0-1.', 'Write a stronger selector, for example `#outer a.nav` (1-1-1).', 'Give it `color: blue`.'],
 'MDN conseille d’ajouter une classe plutôt que de s’appuyer sur un identifiant : un identifiant est très lourd et difficile à surcharger.',
 'MDN advises adding a class rather than relying on an id: an id is very heavy and hard to override.'],
['casc-4', `.main { color: rebeccapurple; border: 2px solid #ccc; }
/* les <li> héritent de color, pas de border */`,
 'Certaines propriétés sont **héritées** : la valeur posée sur un parent descend aux enfants, sauf s’ils en ont une à eux. C’est le cas de `color` et `font-family`. D’autres ne le sont pas : `width`, `margin`, `padding`, `border`. Sinon, une bordure sur une liste en mettrait une sur chaque `<li>`, ce qui serait absurde. La page de référence de chaque propriété indique si elle est héritée (rubrique « Formal definition »).',
 'Some properties are **inherited**: a value set on a parent flows down to children, unless they have their own. This is the case for `color` and `font-family`. Others are not: `width`, `margin`, `padding`, `border`. Otherwise a border on a list would put one on every `<li>`, which would be absurd. Each property’s reference page says whether it is inherited (the “Formal definition” box).',
 ['Écris une règle `.main`.', 'Mets-y `color: rebeccapurple` et `border: 2px solid #cccccc`.', 'Observe : le texte des `<li>` est violet, mais ils n’ont pas de bordure.'],
 ['Write a `.main` rule.', 'Put `color: rebeccapurple` and `border: 2px solid #cccccc` in it.', 'Observe: the `<li>` text is purple, but they have no border.'],
 'Tu peux souvent deviner si une propriété est héritée : celles qui touchent au texte le sont, celles qui touchent à la boîte ne le sont pas.',
 'You can often guess whether a property is inherited: text-related ones are, box-related ones are not.'],
['casc-5', `.x a { color: inherit; }   /* prend la couleur du parent */`,
 'CSS fournit cinq valeurs universelles, acceptées par **toutes** les propriétés : `inherit` (prend la valeur du parent : « active l’héritage »), `initial` (valeur initiale de la propriété), `unset` (se comporte comme `inherit` si la propriété est héritée, sinon comme `initial`), `revert` (revient au style par défaut du navigateur) et `revert-layer` (revient à la valeur d’une couche de cascade précédente). Ici, le lien est bleu par défaut ; avec `color: inherit`, il prend la couleur de son parent `<li>`, donc le vert du `body`.',
 'CSS provides five universal values, accepted by **every** property: `inherit` (takes the parent’s value: “turns inheritance on”), `initial` (the property’s initial value), `unset` (acts like `inherit` if the property is inherited, otherwise like `initial`), `revert` (back to the browser’s default style) and `revert-layer` (back to the value of a previous cascade layer). Here the link is blue by default; with `color: inherit` it takes its parent `<li>`’s colour, so the `body`’s green.',
 ['Garde `body { color: green; }`.', 'Écris `.x a { color: inherit; }`.', 'Vérifie que le lien devient vert.'],
 ['Keep `body { color: green; }`.', 'Write `.x a { color: inherit; }`.', 'Check that the link turns green.'],
 'Avec `initial`, le lien deviendrait **noir** (valeur initiale de `color`), pas bleu : le bleu vient de la feuille de style du navigateur.',
 'With `initial`, the link would become **black** (the initial value of `color`), not blue: the blue comes from the browser’s own stylesheet.'],
['casc-6', `.fix-this {
  all: unset;
}`,
 'La propriété raccourci `all` applique une de ces valeurs universelles à **presque toutes** les propriétés d’un coup. `all: unset` est pratique pour effacer des styles et repartir d’un point de départ connu. Dans l’exemple, la seconde citation a la classe `fix-this` : elle perd la couleur de fond, la bordure, et les autres styles du `blockquote`. Essaie aussi `initial`, `inherit` ou `revert` pour voir la différence.',
 'The shorthand `all` property applies one of these universal values to **almost all** properties at once. `all: unset` is handy to erase styles and start again from a known point. In the example, the second quote has the `fix-this` class: it loses its background colour, its border, and the other `blockquote` styles. Also try `initial`, `inherit` or `revert` to see the difference.',
 ['Dans `.fix-this`, écris `all: unset;`.', 'Observe la seconde citation dans l’aperçu.', 'Teste `all: revert` pour comparer.'],
 ['In `.fix-this`, write `all: unset;`.', 'Look at the second quote in the preview.', 'Try `all: revert` to compare.'],
 '`all` n’affecte pas `direction` ni `unicode-bidi`, et touche aussi `display` : l’élément peut changer d’apparence plus que prévu.',
 '`all` does not affect `direction` nor `unicode-bidi`, and it also touches `display`: the element may change more than you expect.'],
['casc-7', `.better {
  border: none !important;
}`,
 'Le drapeau `!important`, placé après une valeur, rend **cette déclaration** plus forte que tout le reste du calcul de cascade, y compris les styles en ligne. La seule façon de le contrer est un autre `!important` de même spécificité écrit plus tard, ou de spécificité plus forte. MDN le **déconseille fortement** : il casse le fonctionnement normal de la cascade et rend le débogage pénible dans une grande feuille de style. Il est utile de le reconnaître dans le code des autres, ou quand on ne peut pas modifier le CSS d’un CMS. Les styles en ligne (`style="…"`) battent déjà toute spécificité normale (1-0-0-0).',
 'The `!important` flag, placed after a value, makes **that declaration** stronger than everything else in the cascade calculation, including inline styles. The only way to counter it is another `!important` of the same specificity written later, or of higher specificity. MDN **strongly advises against** it: it breaks the normal way the cascade works and makes debugging painful in a large stylesheet. It is useful to recognise it in other people’s code, or when you cannot edit a CMS’s CSS. Inline styles (`style="…"`) already beat any normal specificity (1-0-0-0).',
 ['Repère la règle `#winning` qui met une bordure.', 'Dans `.better`, écris `border: none !important;`.', 'Constate que la bordure disparaît malgré l’identifiant.'],
 ['Spot the `#winning` rule that sets a border.', 'In `.better`, write `border: none !important;`.', 'Note that the border disappears despite the id.'],
 'Pour les styles marqués `!important`, l’ordre de priorité entre feuilles est inversé : un utilisateur peut ainsi imposer ses propres réglages (par exemple une grande police).',
 'For `!important` styles, the priority order between stylesheets is reversed: a user can thus force their own settings (for example a large font).'],
];
