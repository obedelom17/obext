export default [
['jb-0', `function hi() {
  return "salut";
}
hi(); // → "salut"`,
 'Tu écris ton code dans l’éditeur, puis « Vérifier » l’exécute contre des tests. Une **fonction** est un petit programme nommé. `return` est le mot qui **renvoie** une valeur à celui qui appelle la fonction. Un texte s’écrit entre guillemets : `"hello"`.',
 'You write code in the editor, then “Check” runs it against tests. A **function** is a small named program. `return` is the word that **sends back** a value to whoever called the function. Text is written between quotes: `"hello"`.',
 ['Dans les accolades de `hello`, remplace le commentaire par `return "hello";`.', 'Clique sur « Vérifier » (ou `Ctrl+Entrée`).', 'Lis le résultat sous l’éditeur : ✓ vert = réussi, ✗ rouge = relis ton code.'],
 ['Inside the braces of `hello`, replace the comment with `return "hello";`.', 'Click “Check” (or `Ctrl+Enter`).', 'Read the result under the editor: green ✓ = passed, red ✗ = re-read your code.'],
 'Sans `return`, la fonction ne renvoie rien (`undefined`) même si tu as écrit la bonne valeur.',
 'Without `return`, the function gives back nothing (`undefined`) even if you wrote the right value.'],
['jb-1', `function hello(name) {
  return "Salut " + name;
}
hello("Esi"); // → "Salut Esi"`,
 'Une fonction reçoit des **paramètres** (ici `name`) : des valeurs qui changent à chaque appel. L’opérateur `+` entre deux textes les **concatène** (les colle bout à bout). Les espaces et la ponctuation font partie du texte.',
 'A function receives **parameters** (here `name`): values that change on each call. The `+` operator between two strings **concatenates** them (glues them end to end). Spaces and punctuation are part of the text.',
 ['Écris `return "Bonjour, " + name + " !";`.', 'Respecte les espaces : une après la virgule, une avant le point d’exclamation.', 'Vérifie avec « Ama » et « Kofi » : les deux tests doivent passer.'],
 ['Write `return "Bonjour, " + name + " !";`.', 'Respect the spaces: one after the comma, one before the exclamation mark.', 'Check with “Ama” and “Kofi”: both tests must pass.'],
 'Un espace manquant fait échouer le test : `"Bonjour,Ama!"` n’est pas égal à `"Bonjour, Ama !"`.',
 'A missing space fails the test: `"Bonjour,Ama!"` is not equal to `"Bonjour, Ama !"`.'],
['jb-2', `const word = "code";
word[0];             // "c"
word.toUpperCase();  // "CODE"
word[0].toUpperCase() + word[1]; // "Co"`,
 'Un texte se comporte comme une suite de lettres numérotées **à partir de 0** : `texte[0]` est la première lettre. Les **méthodes** comme `toUpperCase()` s’appellent avec un point et **renvoient** un nouveau texte (l’original ne change pas).',
 'A string behaves like a row of letters numbered **from 0**: `text[0]` is the first letter. **Methods** like `toUpperCase()` are called with a dot and **return** a new string (the original does not change).',
 ['Récupère la première lettre de `first` avec `first[0]`.', 'Récupère celle de `last` avec `last[0]`.', 'Colle-les avec `+` puis mets le tout en majuscules avec `.toUpperCase()`.'],
 ['Get the first letter of `first` with `first[0]`.', 'Get the one of `last` with `last[0]`.', 'Join them with `+` then upper-case the result with `.toUpperCase()`.'],
 'Les indices commencent à 0, pas à 1 : `first[1]` serait la **deuxième** lettre.',
 'Indexes start at 0, not 1: `first[1]` would be the **second** letter.'],
['jb-3', `10 % 3;  // 1  (10 = 3×3 + 1)
9 % 3;   // 0  (division exacte)
function isMultipleOf5(n) {
  return n % 5 === 0;
}`,
 '`%` (modulo) donne le **reste** de la division entière. Un nombre est pair quand son reste par 2 vaut 0. `===` **compare** deux valeurs et renvoie `true` ou `false` (un seul `=` sert à affecter, pas à comparer).',
 '`%` (modulo) gives the **remainder** of integer division. A number is even when its remainder by 2 is 0. `===` **compares** two values and returns `true` or `false` (a single `=` assigns, it doesn’t compare).',
 ['Calcule `n % 2` : c’est 0 pour un nombre pair, 1 pour un impair.', 'Compare ce reste à 0 avec `=== 0`.', 'Renvoie directement le résultat : `return n % 2 === 0;`.'],
 ['Compute `n % 2`: it is 0 for an even number, 1 for an odd one.', 'Compare that remainder to 0 with `=== 0`.', 'Return the result directly: `return n % 2 === 0;`.'],
 'N’écris pas `if (…) return true; else return false;` : la comparaison est déjà un booléen.',
 'Don’t write `if (…) return true; else return false;`: the comparison is already a boolean.'],
['jb-4', `const adult = age >= 18;
const ok = adult && hasTicket;   // vrai si les DEUX sont vrais
const free = isChild || isSenior; // vrai si AU MOINS UN est vrai`,
 'Un **booléen** vaut `true` ou `false`. `&&` (ET) n’est vrai que si **les deux** côtés le sont ; `||` (OU) l’est si **au moins un** l’est. Les comparateurs `>=`, `<=`, `>`, `<`, `===` produisent des booléens que tu peux combiner.',
 'A **boolean** is `true` or `false`. `&&` (AND) is true only if **both** sides are; `||` (OR) is true if **at least one** is. Comparators `>=`, `<=`, `>`, `<`, `===` produce booleans you can combine.',
 ['Écris la première condition : `age >= 18`.', 'Écris la seconde : `hasId` (c’est déjà un booléen).', 'Relie-les avec `&&` et renvoie le tout.'],
 ['Write the first condition: `age >= 18`.', 'Write the second: `hasId` (it’s already a boolean).', 'Join them with `&&` and return the whole thing.'],
 'Attention à `>=` (supérieur **ou égal**) : un âge de 18 exactement doit être accepté.',
 'Watch out for `>=` (greater than **or equal**): an age of exactly 18 must be accepted.'],
['jb-5', `Math.min(3, 9);   // 3
Math.max(3, 9);   // 9
Math.max(0, Math.min(5, 3)); // 3 : plafonné à 3, plancher à 0`,
 '`Math.min(a, b)` renvoie le plus petit, `Math.max(a, b)` le plus grand. En les **imbriquant**, on borne une valeur : `Math.min` pose un **plafond**, `Math.max` pose un **plancher**. On exécute toujours la parenthèse intérieure en premier.',
 '`Math.min(a, b)` returns the smaller, `Math.max(a, b)` the larger. By **nesting** them you bound a value: `Math.min` sets a **ceiling**, `Math.max` sets a **floor**. The innermost parenthesis runs first.',
 ['Plafonne `n` à `max` : `Math.min(n, max)`.', 'Applique ensuite le plancher `min` autour : `Math.max(min, … )`.', 'Teste les trois cas : trop grand, trop petit, dans l’intervalle.'],
 ['Cap `n` at `max`: `Math.min(n, max)`.', 'Then wrap it with the floor `min`: `Math.max(min, … )`.', 'Test the three cases: too big, too small, in range.'],
 'Inverser `min` et `max` donne un résultat faux sans erreur : vérifie avec les trois tests.',
 'Swapping `min` and `max` gives a wrong result with no error: verify with the three tests.'],
['jb-6', `const out = [];
for (let i = 0; i < 3; i++) {
  out.push(i * 10);
}
// out → [0, 10, 20]`,
 'Une boucle `for` a trois parties : **départ** (`let i = 1`), **condition** pour continuer (`i <= n`), **pas** (`i++` ajoute 1). Le bloc `{ … }` est répété tant que la condition est vraie. `tableau.push(x)` **ajoute** `x` à la fin du tableau.',
 'A `for` loop has three parts: a **start** (`let i = 1`), a **condition** to continue (`i <= n`), a **step** (`i++` adds 1). The `{ … }` block repeats while the condition is true. `array.push(x)` **appends** `x` to the end of the array.',
 ['Crée un tableau vide : `const result = [];`.', 'Écris `for (let i = 1; i <= n; i++) { result.push(i); }`.', 'Après la boucle, `return result;`. Pour `n = 0`, la boucle ne tourne pas : le tableau reste vide.'],
 ['Create an empty array: `const result = [];`.', 'Write `for (let i = 1; i <= n; i++) { result.push(i); }`.', 'After the loop, `return result;`. For `n = 0` the loop never runs: the array stays empty.'],
 'Le `return` doit être **après** la boucle, pas dedans, sinon la fonction s’arrête au premier tour.',
 'The `return` must be **after** the loop, not inside it, or the function stops on the first pass.'],
['jb-7', `"a-b-c".split("-");        // ["a","b","c"]
["a","b","c"].join("+");   // "a+b+c"
"a-b-c".split("-").join(" "); // "a b c"`,
 '`split(sép)` découpe un texte en **tableau**, `reverse()` retourne un tableau **dans l’ordre inverse**, `join(sép)` recolle un tableau en **texte**. On peut les **chaîner** : chaque méthode travaille sur le résultat de la précédente. `split("")` coupe lettre par lettre.',
 '`split(sep)` cuts a string into an **array**, `reverse()` flips an array **backwards**, `join(sep)` glues an array back into a **string**. You can **chain** them: each method works on the previous result. `split("")` cuts letter by letter.',
 ['Découpe : `str.split("")` donne un tableau de lettres.', 'Retourne-le : `.reverse()`.', 'Recolle-le : `.join("")`. Au total : `return str.split("").reverse().join("");`.'],
 ['Split: `str.split("")` gives an array of letters.', 'Flip it: `.reverse()`.', 'Glue it back: `.join("")`. In total: `return str.split("").reverse().join("");`.'],
 '`reverse()` n’existe que sur les tableaux : appelle-le **après** `split`, jamais sur le texte directement.',
 '`reverse()` only exists on arrays: call it **after** `split`, never on the string directly.'],
['jb-8', `let count = 0;
for (const ch of "hello") {
  if (ch === "l") count++;
}
// count → 2`,
 '`for (const ch of texte)` donne chaque lettre à tour de rôle. Un **compteur** est une variable (`let count = 0`) qu’on augmente (`count++`) chaque fois qu’une condition `if` est vraie. `"aeiou".includes(ch)` vaut `true` si `ch` est dans cette chaîne.',
 '`for (const ch of text)` hands you each letter in turn. A **counter** is a variable (`let count = 0`) you increase (`count++`) each time an `if` condition is true. `"aeiou".includes(ch)` is `true` if `ch` is in that string.',
 ['Crée `let count = 0;`.', 'Parcours : `for (const ch of str.toLowerCase()) { … }` (le `toLowerCase` gère les majuscules).', 'Dans la boucle : `if ("aeiou".includes(ch)) count++;` puis `return count;` après.'],
 ['Create `let count = 0;`.', 'Loop: `for (const ch of str.toLowerCase()) { … }` (the `toLowerCase` handles capitals).', 'Inside: `if ("aeiou".includes(ch)) count++;` then `return count;` after the loop.'],
 'Teste « HELLO » : sans `toLowerCase()`, les majuscules ne seraient pas comptées.',
 'Test “HELLO”: without `toLowerCase()`, capital letters wouldn’t be counted.'],
['jb-9', `const colors = ["rouge", "vert", "bleu"];
colors[0];                 // "rouge"
colors.length;             // 3
colors[colors.length - 1]; // "bleu"`,
 'Un tableau est une liste ordonnée. On lit un élément avec son **indice** (à partir de 0). `arr.length` est le **nombre** d’éléments, donc le dernier indice est `arr.length - 1`. Lire un indice qui n’existe pas donne `undefined`, sans erreur.',
 'An array is an ordered list. You read an item with its **index** (from 0). `arr.length` is the **number** of items, so the last index is `arr.length - 1`. Reading an index that doesn’t exist gives `undefined`, with no error.',
 ['Calcule l’indice du dernier élément : `arr.length - 1`.', 'Lis-le : `arr[arr.length - 1]` et renvoie-le.', 'Pour `[]`, `length - 1` vaut -1 et `arr[-1]` est `undefined` : le cas vide marche tout seul.'],
 ['Compute the last index: `arr.length - 1`.', 'Read it: `arr[arr.length - 1]` and return it.', 'For `[]`, `length - 1` is -1 and `arr[-1]` is `undefined`: the empty case works by itself.'],
 '`arr[arr.length]` est une erreur classique : cet indice est **juste après** le dernier élément.',
 '`arr[arr.length]` is a classic mistake: that index is **just past** the last item.'],
['jb-10', `const age = 30;
const person = { name: "Esi", age };      // raccourci pour age: age
const senior = { ...person, senior: age >= 60 };`,
 'Un **objet** regroupe des valeurs nommées : `{ clé: valeur }`. Quand la variable porte le même nom que la clé, on peut écrire `{ name }` au lieu de `{ name: name }`. Une propriété peut être calculée : `adult: age >= 18` stocke `true` ou `false`.',
 'An **object** groups named values: `{ key: value }`. When the variable has the same name as the key, you can write `{ name }` instead of `{ name: name }`. A property can be computed: `adult: age >= 18` stores `true` or `false`.',
 ['Écris `return {` pour ouvrir l’objet renvoyé.', 'Ajoute `name,` et `age,` (raccourci), puis `adult: age >= 18`.', 'Ferme avec `};` et teste avec 20 ans et 12 ans.'],
 ['Write `return {` to open the returned object.', 'Add `name,` and `age,` (shorthand), then `adult: age >= 18`.', 'Close with `};` and test with age 20 and age 12.'],
 'Entre deux propriétés, il faut une **virgule** ; après la dernière, elle est facultative.',
 'Between two properties you need a **comma**; after the last one it is optional.'],
['jb-11', `function total(...prices) {
  // prices est un vrai tableau : [10, 5, 3]
  return prices.length;
}
total(10, 5, 3); // 3`,
 'Les **paramètres rest** `...nums` collectent tous les arguments passés dans **un tableau**. La fonction accepte alors n’importe quel nombre d’arguments, même zéro. `reduce` ou une boucle permettent ensuite de les additionner.',
 '**Rest parameters** `...nums` gather every argument passed into **one array**. The function then accepts any number of arguments, even zero. `reduce` or a loop can then add them up.',
 ['Initialise `let total = 0;`.', 'Parcours `nums` avec `for (const n of nums) { total += n; }`.', '`return total;` : sans argument, la boucle ne tourne pas et on renvoie bien 0.'],
 ['Initialise `let total = 0;`.', 'Loop through `nums` with `for (const n of nums) { total += n; }`.', '`return total;`: with no arguments the loop doesn’t run and you correctly return 0.'],
 '`total += n` signifie `total = total + n` : n’écris pas `total + n` seul, ça ne change rien.',
 '`total += n` means `total = total + n`: don’t write `total + n` alone, it changes nothing.'],
['jb-12', `function twice(fn) {
  fn("a");
  fn("b");
}
twice(console.log); // affiche a puis b`,
 'En JavaScript, une fonction est une **valeur** comme une autre : on peut la passer en argument. On l’appelle alors avec des parenthèses : `fn(i)`. La fonction reçue s’appelle un **callback** : « rappelle-moi ça pour chaque élément ».',
 'In JavaScript a function is a **value** like any other: you can pass it as an argument. You then call it with parentheses: `fn(i)`. The received function is called a **callback**: “call this back for each item”.',
 ['Écris une boucle `for (let i = 0; i < n; i++) { … }`.', 'Dans la boucle, appelle `fn(i)`.', 'Pour `n = 0`, la boucle ne tourne pas : `fn` n’est jamais appelée.'],
 ['Write a loop `for (let i = 0; i < n; i++) { … }`.', 'Inside the loop, call `fn(i)`.', 'For `n = 0` the loop doesn’t run: `fn` is never called.'],
 'Écris `fn(i)` (appel) et non `fn` seul : sans parenthèses, rien n’est exécuté.',
 'Write `fn(i)` (a call) not `fn` alone: without parentheses nothing runs.'],
['jb-13', `const nums = [3, 1, 2];
const sorted = [...nums].sort((a, b) => a - b);
// sorted → [1,2,3]   nums → [3,1,2] (intact)`,
 '`sort` **modifie le tableau d’origine** (on dit qu’il *mute*). Pour garder l’original, on en fait d’abord une **copie** avec `[...arr]`. `sort((a, b) => a - b)` trie des nombres du plus petit au plus grand : une valeur négative signifie « a avant b ».',
 '`sort` **changes the original array** (it *mutates*). To keep the original, first make a **copy** with `[...arr]`. `sort((a, b) => a - b)` sorts numbers smallest to largest: a negative value means “a comes before b”.',
 ['Copie : `[...people]`.', 'Trie la copie : `.sort((a, b) => a.age - b.age)`.', 'Renvoie-la, puis vérifie que le test « ne modifie pas l’original » passe.'],
 ['Copy: `[...people]`.', 'Sort the copy: `.sort((a, b) => a.age - b.age)`.', 'Return it, then check the “doesn’t modify the original” test passes.'],
 'Sans copie, tu trierais aussi le tableau de l’appelant : bug silencieux très fréquent.',
 'Without a copy you would sort the caller’s array too: a very common silent bug.'],
['jb-14', `try {
  JSON.parse("{pas du json");
} catch (error) {
  console.log("invalide");
}`,
 'Certaines opérations **lancent une erreur** qui arrête le programme. `try { … } catch { … }` essaie le premier bloc ; si une erreur survient, le second s’exécute à la place et le programme continue. `JSON.parse` transforme un texte JSON en objet.',
 'Some operations **throw an error** that stops the program. `try { … } catch { … }` tries the first block; if an error occurs, the second one runs instead and the program carries on. `JSON.parse` turns JSON text into an object.',
 ['Écris `try {` et `return JSON.parse(text);`.', 'Ajoute `} catch {` puis `return null;`.', 'Ferme `}` et teste un JSON valide, puis un texte cassé.'],
 ['Write `try {` and `return JSON.parse(text);`.', 'Add `} catch {` then `return null;`.', 'Close `}` and test valid JSON, then broken text.'],
 'Ne laisse jamais un `catch` vide : renvoie une valeur claire (ici `null`).',
 'Never leave an empty `catch`: return a clear value (here `null`).'],
['js-1', `function triple(n) {
  return n * 3;
}
triple(4); // 12`,
 'Une fonction **prend** des valeurs (paramètres) et **renvoie** un résultat avec `return`. Le même code s’exécute à chaque appel avec des valeurs différentes. `*` multiplie.',
 'A function **takes** values (parameters) and **returns** a result with `return`. The same code runs on every call with different values. `*` multiplies.',
 ['Dans `double`, écris `return n * 2;`.', 'Vérifie `double(4)` = 8.', 'Vérifie aussi un négatif : `double(-3)` = -6.'],
 ['Inside `double`, write `return n * 2;`.', 'Check `double(4)` = 8.', 'Also check a negative: `double(-3)` = -6.'],
 'N’oublie pas `return` : sans lui la fonction renvoie `undefined`.',
 'Don’t forget `return`: without it the function returns `undefined`.'],
['js-2', `const nums = [1, 2, 3, 4, 5];
nums.filter((n) => n > 3); // [4, 5]`,
 '`filter` parcourt un tableau et en construit **un nouveau** qui ne garde que les éléments pour lesquels la fonction donnée renvoie `true`. Cette fonction (la « condition ») reçoit chaque élément. Le tableau d’origine ne change pas.',
 '`filter` walks through an array and builds **a new one** keeping only the elements for which the given function returns `true`. That function (the “condition”) receives each element. The original array doesn’t change.',
 ['Appelle `arr.filter(…)`.', 'Passe-lui une fonction fléchée : `(n) => n % 2 === 0`.', 'Renvoie le résultat. Pour `[]`, `filter` renvoie `[]` sans effort.'],
 ['Call `arr.filter(…)`.', 'Give it an arrow function: `(n) => n % 2 === 0`.', 'Return the result. For `[]`, `filter` returns `[]` with no extra work.'],
 'La fonction de `filter` doit renvoyer un **booléen** : `n % 2` seul (0 ou 1) marcherait mais prête à confusion.',
 'The `filter` function should return a **boolean**: `n % 2` alone (0 or 1) would work but is confusing.'],
['js-3', `const users = [{ name: "Esi" }, { name: "Yao" }];
users.map((u) => u.name.toUpperCase()); // ["ESI", "YAO"]`,
 '`map` fabrique un **nouveau tableau de la même taille** : chaque élément est remplacé par ce que renvoie ta fonction. Avec des objets, `u => u.name` extrait une propriété de chacun. Rappelle-toi : `filter` choisit, `map` transforme.',
 '`map` builds a **new array of the same length**: each element is replaced by what your function returns. With objects, `u => u.name` extracts one property from each. Remember: `filter` selects, `map` transforms.',
 ['Appelle `users.map(…)`.', 'Donne-lui `(u) => u.name`.', 'Renvoie le tableau obtenu.'],
 ['Call `users.map(…)`.', 'Give it `(u) => u.name`.', 'Return the resulting array.'],
 'Une fonction fléchée avec des accolades `{ }` exige un `return` explicite ; sans accolades, la valeur est renvoyée automatiquement.',
 'An arrow function with braces `{ }` needs an explicit `return`; without braces the value is returned automatically.'],
['js-4', `function size(n) {
  if (n >= 100) return "grand";
  if (n >= 10) return "moyen";
  return "petit";
}`,
 '`if (condition) { … }` exécute un bloc seulement si la condition est vraie. Dès qu’un `return` s’exécute, la fonction se termine : on peut donc tester du **plus exigeant au moins exigeant** et finir par un cas par défaut.',
 '`if (condition) { … }` runs a block only if the condition is true. As soon as a `return` runs, the function ends: so you can test from **most demanding to least demanding** and finish with a default case.',
 ['Écris `if (score >= 90) return "A";`.', 'Écris `if (score >= 70) return "B";`.', 'Termine par `return "C";` pour tous les autres cas.'],
 ['Write `if (score >= 90) return "A";`.', 'Write `if (score >= 70) return "B";`.', 'Finish with `return "C";` for everything else.'],
 'L’ordre compte : si tu testais `>= 70` en premier, 95 renverrait « B ».',
 'Order matters: if you tested `>= 70` first, 95 would return “B”.'],
['js-5', `[1, 2, 3].reduce((acc, n) => acc + n, 0);
// acc: 0 → 1 → 3 → 6   résultat: 6`,
 '`reduce` **réduit** un tableau à une seule valeur. Tu donnes une fonction `(acc, n) => …` et une **valeur de départ**. À chaque élément, la fonction reçoit l’**accumulateur** (`acc`, le résultat jusque-là) et l’élément, et renvoie le nouvel accumulateur.',
 '`reduce` **boils down** an array into a single value. You give a function `(acc, n) => …` and a **starting value**. For each element, the function receives the **accumulator** (`acc`, the result so far) and the element, and returns the new accumulator.',
 ['Écris `arr.reduce(…)`.', 'Fonction : `(acc, n) => acc + n`.', 'Valeur de départ : `0` en second argument. Elle assure que `sum([])` renvoie 0.'],
 ['Write `arr.reduce(…)`.', 'Function: `(acc, n) => acc + n`.', 'Starting value: `0` as the second argument. It makes `sum([])` return 0.'],
 'Sans valeur de départ, `reduce` plante sur un tableau vide.',
 'Without a starting value, `reduce` throws on an empty array.'],
['js-6', `const a = { x: 1, y: 2 };
const b = { y: 9, z: 3 };
const m = { ...a, ...b }; // { x:1, y:9, z:3 }`,
 '`...obj` **étale** les propriétés d’un objet dans un autre. Quand deux objets ont la même clé, **le dernier écrit gagne**. On crée ainsi un objet **neuf** sans modifier les originaux : une habitude essentielle en React.',
 '`...obj` **spreads** an object’s properties into another. When two objects share a key, **the last one written wins**. This creates a **new** object without changing the originals: an essential habit in React.',
 ['Écris `return {`.', 'Étale `a` puis `b` : `...a, ...b`.', 'Ferme `};`. Comme `b` vient en dernier, il gagne en cas de conflit.'],
 ['Write `return {`.', 'Spread `a` then `b`: `...a, ...b`.', 'Close `};`. Since `b` comes last, it wins on conflicts.'],
 'Inverse l’ordre et tu inverses le gagnant : `...b, ...a` ferait gagner `a`.',
 'Swap the order and you swap the winner: `...b, ...a` makes `a` win.'],
['js-7', `function makeAdder(step) {
  let total = 0;
  return function () {
    total += step;
    return total;
  };
}
const add2 = makeAdder(2);
add2(); // 2   add2(); // 4`,
 'Une fonction définie dans une autre **se souvient** des variables de sa fonction parente, même après que celle-ci a fini : c’est une **closure**. Chaque appel à la fonction parente crée **ses propres** variables, donc des compteurs indépendants.',
 'A function defined inside another **remembers** the variables of its parent function, even after the parent has finished: this is a **closure**. Each call to the parent creates **its own** variables, hence independent counters.',
 ['Dans `counter`, crée `let n = 0;`.', 'Renvoie une fonction : `return () => { n += 1; return n; };`.', 'Vérifie deux compteurs créés séparément : ils ne se mélangent pas.'],
 ['Inside `counter`, create `let n = 0;`.', 'Return a function: `return () => { n += 1; return n; };`.', 'Check two separately created counters: they don’t interfere.'],
 'Mets `let n = 0` **dans** `counter` mais **hors** de la fonction renvoyée, sinon il repart à 0 à chaque appel.',
 'Put `let n = 0` **inside** `counter` but **outside** the returned function, or it resets to 0 on every call.'],
['js-8', `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
await wait(500); // pause de 0,5 s`,
 'Une **Promise** représente une valeur qui arrivera plus tard. `new Promise((resolve) => …)` : tu appelles `resolve(valeur)` quand c’est prêt. `setTimeout(fn, ms)` exécute `fn` après `ms` millisecondes. Avec `await` on attend le résultat.',
 'A **Promise** represents a value that will arrive later. `new Promise((resolve) => …)`: you call `resolve(value)` when it’s ready. `setTimeout(fn, ms)` runs `fn` after `ms` milliseconds. With `await` you wait for the result.',
 ['Renvoie `new Promise((resolve) => { … })`.', 'À l’intérieur : `setTimeout(() => resolve(value), ms);`.', 'Le test attend la promesse et compare avec "ok".'],
 ['Return `new Promise((resolve) => { … })`.', 'Inside: `setTimeout(() => resolve(value), ms);`.', 'The test awaits the promise and compares with "ok".'],
 'Oublier `resolve` : la promesse reste « en attente » pour toujours et le test expire.',
 'Forgetting `resolve`: the promise stays pending forever and the test times out.'],
['js-9', `const cache = new Map();
cache.set("a", 1);
cache.has("a"); // true
cache.get("a"); // 1`,
 'La **mémoïsation** consiste à **mémoriser** le résultat d’un calcul pour ne pas le refaire. Un `Map` est un dictionnaire : `set(clé, valeur)`, `has(clé)`, `get(clé)`. Ici, la clé est l’argument et la valeur son résultat.',
 '**Memoisation** means **remembering** a computation’s result so you don’t redo it. A `Map` is a dictionary: `set(key, value)`, `has(key)`, `get(key)`. Here the key is the argument and the value its result.',
 ['Crée `const cache = new Map();` dans `memoize`.', 'Renvoie `(x) => { … }` : si `cache.has(x)`, renvoie `cache.get(x)`.', 'Sinon calcule `fn(x)`, fais `cache.set(x, résultat)` puis renvoie-le.'],
 ['Create `const cache = new Map();` inside `memoize`.', 'Return `(x) => { … }`: if `cache.has(x)`, return `cache.get(x)`.', 'Otherwise compute `fn(x)`, do `cache.set(x, result)` then return it.'],
 'Teste `cache.has` (pas `cache.get(x)` tout seul) : un résultat légitime `0` ou `false` serait pris pour « absent ».',
 'Test `cache.has` (not `cache.get(x)` alone): a legitimate `0` or `false` result would be mistaken for “missing”.'],
['js-10', `const out = {};
for (const w of ["pomme", "poire", "kiwi"]) {
  const k = w[0];
  (out[k] ||= []).push(w);
}
// { p: ["pomme","poire"], k: ["kiwi"] }`,
 'Grouper = ranger chaque élément dans la **bonne case** d’un objet. La clé vient de `fn(x)`. `out[k] ||= []` crée le tableau la première fois qu’on voit la clé, puis `.push(x)` y ajoute l’élément.',
 'Grouping = putting each element in the **right slot** of an object. The key comes from `fn(x)`. `out[k] ||= []` creates the array the first time the key is seen, then `.push(x)` adds the element.',
 ['Crée `const out = {};`.', 'Pour chaque `x` de `arr` : `const k = fn(x);` puis `(out[k] ||= []).push(x);`.', '`return out;` : pour `[]`, tu renvoies `{}`.'],
 ['Create `const out = {};`.', 'For each `x` of `arr`: `const k = fn(x);` then `(out[k] ||= []).push(x);`.', '`return out;`: for `[]` you return `{}`.'],
 'Les clés d’un objet sont des textes : `true` devient `"true"`.',
 'Object keys are strings: `true` becomes `"true"`.'],
['js-11', `const inc = (n) => n + 1;
const dbl = (n) => n * 2;
const f = (x) => dbl(inc(x));   // inc d’abord
f(3); // 8`,
 '**Composer** deux fonctions, c’est enchaîner : la sortie de l’une devient l’entrée de l’autre. `compose(f, g)(x)` vaut `f(g(x))` : on applique de **droite à gauche**. `reduceRight` parcourt le tableau de fonctions dans ce sens.',
 '**Composing** two functions means chaining them: the output of one becomes the input of the next. `compose(f, g)(x)` equals `f(g(x))`: apply **right to left**. `reduceRight` walks the function array in that direction.',
 ['Renvoie `(x) => …`.', 'Utilise `fns.reduceRight((acc, fn) => fn(acc), x)`.', 'Sans fonction, `reduceRight` renvoie `x` : c’est l’identité.'],
 ['Return `(x) => …`.', 'Use `fns.reduceRight((acc, fn) => fn(acc), x)`.', 'With no function, `reduceRight` returns `x`: that’s the identity.'],
 'Avec `reduce` (gauche→droite) au lieu de `reduceRight`, tu inverserais l’ordre d’application.',
 'With `reduce` (left→right) instead of `reduceRight`, you would reverse the order of application.'],
['js-12', `async function load() {
  try {
    return await fetchData();
  } catch (e) {
    return "échec";
  }
}`,
 'Une fonction `async` renvoie toujours une Promise et permet `await` : on **attend** le résultat comme du code normal. Si la promesse échoue, `await` **lance** une erreur que `try/catch` attrape. Pour réessayer : une boucle, `try`, et on relance la dernière erreur à la fin.',
 'An `async` function always returns a Promise and allows `await`: you **wait** for the result like normal code. If the promise fails, `await` **throws** an error that `try/catch` catches. To retry: a loop, `try`, and rethrow the last error at the end.',
 ['Garde la dernière erreur : `let lastError;`.', 'Boucle `for (let i = 0; i < times; i++)` avec `try { return await fn(); } catch (e) { lastError = e; }`.', 'Après la boucle : `throw lastError;`.'],
 ['Keep the last error: `let lastError;`.', 'Loop `for (let i = 0; i < times; i++)` with `try { return await fn(); } catch (e) { lastError = e; }`.', 'After the loop: `throw lastError;`.'],
 'N’oublie pas `await` devant `fn()` : sinon l’erreur échappe au `catch`.',
 'Don’t forget `await` before `fn()`: otherwise the error escapes the `catch`.'],
['js-13', `function sumDeep(arr) {
  let total = 0;
  for (const x of arr) {
    total += Array.isArray(x) ? sumDeep(x) : x;
  }
  return total;
}`,
 'Une fonction **récursive** s’appelle elle-même sur un problème plus petit. Pour un tableau imbriqué : si l’élément est lui-même un tableau (`Array.isArray(x)`), on le traite avec la même fonction ; sinon on le garde. Il faut toujours un **cas de base** qui arrête la récursion.',
 'A **recursive** function calls itself on a smaller problem. For a nested array: if the element is itself an array (`Array.isArray(x)`), handle it with the same function; otherwise keep it. You always need a **base case** that stops the recursion.',
 ['Crée `const out = [];`.', 'Pour chaque `x` : si `Array.isArray(x)`, `out.push(...flatten(x))`, sinon `out.push(x)`.', '`return out;`. Un tableau déjà plat passe directement par le « sinon ».'],
 ['Create `const out = [];`.', 'For each `x`: if `Array.isArray(x)`, `out.push(...flatten(x))`, otherwise `out.push(x)`.', '`return out;`. An already flat array goes straight through the “otherwise” branch.'],
 'Sans test `Array.isArray`, la fonction s’appellerait sur un nombre et planterait.',
 'Without the `Array.isArray` test, the function would be called on a number and crash.'],
];
