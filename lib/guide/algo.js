export default [
['al-1', `function indexOfFirstNegative(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) return i;   // trouvé : on s’arrête
  }
  return -1;                    // jamais trouvé
}`,
 'La **recherche linéaire** regarde les éléments un par un, dans l’ordre, jusqu’à trouver celui qu’on cherche. On renvoie son **indice** (sa position, à partir de 0). Si la boucle se termine sans rien trouver, on renvoie `-1` : une valeur qui ne peut pas être un indice valide. Au pire on regarde les *n* éléments : on dit que c’est en **O(n)**.',
 '**Linear search** looks at elements one by one, in order, until it finds the one you want. You return its **index** (its position, from 0). If the loop ends with nothing found, return `-1`: a value that can’t be a valid index. In the worst case you look at all *n* elements: we say it’s **O(n)**.',
 ['Écris une boucle `for` avec un indice `i` de 0 à `arr.length - 1`.', 'Dans la boucle, si `arr[i] === x`, `return i;` tout de suite.', 'Après la boucle (rien trouvé), `return -1;`.'],
 ['Write a `for` loop with an index `i` from 0 to `arr.length - 1`.', 'Inside the loop, if `arr[i] === x`, `return i;` right away.', 'After the loop (nothing found), `return -1;`.'],
 'Place `return -1` **après** la boucle, pas dedans, sinon tu abandonnes dès le premier élément différent.',
 'Put `return -1` **after** the loop, not inside it, or you give up at the first non-matching element.'],
['al-2', `// Deviner un nombre entre 1 et 100 :
// 50 ? trop petit → 51..100
// 75 ? trop grand → 51..74
// … on coupe l’intervalle en deux à chaque essai`,
 'La **recherche dichotomique** ne marche que sur un tableau **trié**. On garde deux bornes `lo` et `hi`, on regarde l’élément du **milieu** : s’il est trop petit on garde la moitié droite, trop grand la moitié gauche. À chaque tour on élimine la moitié du tableau : c’est en **O(log n)**, ultra rapide (1 million d’éléments → 20 étapes).',
 '**Binary search** only works on a **sorted** array. Keep two bounds `lo` and `hi`, look at the **middle** element: if it’s too small keep the right half, too big keep the left half. Each round discards half the array: **O(log n)**, extremely fast (1 million items → 20 steps).',
 ['Pose `let lo = 0, hi = arr.length - 1;`.', 'Tant que `lo <= hi` : `mid = Math.floor((lo + hi) / 2)`. Si `arr[mid] === x`, renvoie `mid`.', 'Si `arr[mid] < x`, `lo = mid + 1`, sinon `hi = mid - 1`. Hors de la boucle : `return -1`.'],
 ['Set `let lo = 0, hi = arr.length - 1;`.', 'While `lo <= hi`: `mid = Math.floor((lo + hi) / 2)`. If `arr[mid] === x`, return `mid`.', 'If `arr[mid] < x`, `lo = mid + 1`, otherwise `hi = mid - 1`. Outside the loop: `return -1`.'],
 'Oublie le `+ 1` / `- 1` et tu peux boucler à l’infini sur le même `mid`.',
 'Forget the `+ 1` / `- 1` and you can loop forever on the same `mid`.'],
['al-3', `const memo = new Map();
function fact(n) {
  if (n <= 1) return 1;               // cas de base
  if (memo.has(n)) return memo.get(n); // déjà calculé
  const r = n * fact(n - 1);
  memo.set(n, r);
  return r;
}`,
 'Fibonacci : chaque nombre est la somme des deux précédents (0, 1, 1, 2, 3, 5, 8…). La version récursive naïve recalcule les mêmes valeurs des millions de fois. La **mémoïsation** garde chaque résultat dans un `Map` : on ne calcule chaque `fib(k)` qu’**une seule fois**. Temps : de exponentiel à linéaire.',
 'Fibonacci: each number is the sum of the two before (0, 1, 1, 2, 3, 5, 8…). The naive recursive version recomputes the same values millions of times. **Memoisation** stores each result in a `Map`: each `fib(k)` is computed **only once**. Time goes from exponential to linear.',
 ['Crée `const memo = new Map();` **avant** la fonction.', 'Cas de base : `if (n < 2) return n;`.', 'Si `memo.has(n)` renvoie `memo.get(n)` ; sinon calcule `fib(n-1) + fib(n-2)`, mémorise avec `memo.set`, puis renvoie.'],
 ['Create `const memo = new Map();` **before** the function.', 'Base case: `if (n < 2) return n;`.', 'If `memo.has(n)` return `memo.get(n)`; otherwise compute `fib(n-1) + fib(n-2)`, store with `memo.set`, then return.'],
 'Si le `Map` est créé **dans** `fib`, il est recréé à chaque appel et ne sert à rien.',
 'If the `Map` is created **inside** `fib`, it’s recreated on every call and is useless.'],
['al-4', `"Ça va ?".toLowerCase().replace(/[^a-z0-9]/g, "");
// "avaa" → on garde seulement lettres et chiffres
// (Ç devient vide car hors a-z : à toi de voir si ça suffit)`,
 'Un **palindrome** se lit pareil dans les deux sens. Avant de comparer, on **normalise** : minuscules, et suppression de tout ce qui n’est pas lettre ou chiffre. La regex `/[^a-z0-9]/g` veut dire « tout caractère qui n’est PAS a-z ou 0-9, partout (g) ». Ensuite on compare le texte à son inverse.',
 'A **palindrome** reads the same both ways. Before comparing, **normalise**: lower-case it and remove everything that isn’t a letter or digit. The regex `/[^a-z0-9]/g` means “any character that is NOT a-z or 0-9, everywhere (g)”. Then compare the text to its reverse.',
 ['Mets en minuscules : `str.toLowerCase()`.', 'Nettoie avec `.replace(/[^a-z0-9]/g, "")`.', 'Compare avec l’inverse : `clean === clean.split("").reverse().join("")`.'],
 ['Lower-case: `str.toLowerCase()`.', 'Clean with `.replace(/[^a-z0-9]/g, "")`.', 'Compare with the reverse: `clean === clean.split("").reverse().join("")`.'],
 'Stocke le texte nettoyé dans une variable : tu en as besoin deux fois (original et inversé).',
 'Store the cleaned text in a variable: you need it twice (original and reversed).'],
['al-5', `// Fusionner [1,4] et [2,3] :
// compare 1 et 2 → 1 ; compare 4 et 2 → 2 ; 4 et 3 → 3 ; reste 4
// résultat [1,2,3,4]`,
 '**Diviser pour régner** : un tableau de 0 ou 1 élément est déjà trié (cas de base). Sinon on le coupe en deux, on trie chaque moitié **récursivement**, puis on **fusionne** : on compare les têtes des deux moitiés triées et on prend toujours la plus petite. Complexité **O(n log n)**.',
 '**Divide and conquer**: an array of 0 or 1 element is already sorted (base case). Otherwise cut it in two, sort each half **recursively**, then **merge**: compare the heads of the two sorted halves and always take the smaller. Complexity **O(n log n)**.',
 ['Cas de base : `if (arr.length < 2) return [...arr];` (copie, pas l’original).', 'Coupe : `mid = Math.floor(arr.length / 2)` et `mergeSort(arr.slice(0, mid))`, `mergeSort(arr.slice(mid))`.', 'Fusionne avec deux indices `i`, `j` : pousse le plus petit des deux, puis ajoute le reste (`slice(i)`, `slice(j)`).'],
 ['Base case: `if (arr.length < 2) return [...arr];` (a copy, not the original).', 'Cut: `mid = Math.floor(arr.length / 2)` and `mergeSort(arr.slice(0, mid))`, `mergeSort(arr.slice(mid))`.', 'Merge with two indexes `i`, `j`: push the smaller of the two, then add the leftovers (`slice(i)`, `slice(j)`).'],
 'N’utilise pas `arr.sort()` : il modifierait l’entrée et ce n’est pas l’exercice.',
 'Don’t use `arr.sort()`: it would mutate the input and isn’t the point of the exercise.'],
['al-6', `const seen = new Map();   // valeur → indice
for (let i = 0; i < nums.length; i++) {
  const need = target - nums[i];
  if (seen.has(need)) return [seen.get(need), i];
  seen.set(nums[i], i);
}`,
 'Two Sum : trouver deux nombres dont la somme vaut `target`. La méthode naïve (deux boucles) est en O(n²). Avec un `Map` on fait **un seul passage** : pour chaque nombre, on calcule le **complément** `target - nombre` et on regarde s’il a déjà été vu. Complexité **O(n)**.',
 'Two Sum: find two numbers adding up to `target`. The naive approach (two loops) is O(n²). With a `Map` you do **a single pass**: for each number, compute the **complement** `target - number` and check whether it was already seen. Complexity **O(n)**.',
 ['Crée `const seen = new Map();` (valeur → indice).', 'Pour chaque `i` : `need = target - nums[i]`. Si `seen.has(need)`, renvoie `[seen.get(need), i]`.', 'Sinon `seen.set(nums[i], i)`. Après la boucle, `return null`.'],
 ['Create `const seen = new Map();` (value → index).', 'For each `i`: `need = target - nums[i]`. If `seen.has(need)`, return `[seen.get(need), i]`.', 'Otherwise `seen.set(nums[i], i)`. After the loop, `return null`.'],
 'Consulte le `Map` **avant** d’y ajouter le nombre courant, sinon un nombre pourrait s’associer à lui-même.',
 'Check the `Map` **before** adding the current number, or a number could pair with itself.'],
['al-7', `const stack = [];
stack.push("a");   // empile
stack.push("b");
stack.pop();       // "b" : dépile le DERNIER entré`,
 'Une **pile** (stack) fonctionne en « dernier entré, premier sorti » : `push` empile, `pop` dépile le dernier. Pour les parenthèses : à chaque ouvrante on **empile** la fermante attendue ; à chaque fermante, on **dépile** et on vérifie que c’est la bonne. À la fin, la pile doit être vide.',
 'A **stack** works “last in, first out”: `push` adds, `pop` removes the last one. For brackets: on each opening one **push** the expected closing one; on each closing one, **pop** and check it’s the right one. At the end the stack must be empty.',
 ['Fais un objet de correspondance : `{ "(": ")", "[": "]", "{": "}" }`.', 'Pour chaque caractère : si c’est une ouvrante, `stack.push(pairs[ch])` ; si c’est une fermante, `if (stack.pop() !== ch) return false`.', 'Après la boucle : `return stack.length === 0;`.'],
 ['Make a lookup object: `{ "(": ")", "[": "]", "{": "}" }`.', 'For each character: if it’s an opening one, `stack.push(pairs[ch])`; if it’s a closing one, `if (stack.pop() !== ch) return false`.', 'After the loop: `return stack.length === 0;`.'],
 '`"((("` ne déclenche jamais d’erreur dans la boucle : c’est le test de pile vide final qui le rejette.',
 '`"((("` never triggers an error in the loop: only the final empty-stack check rejects it.'],
['al-8', `const counts = {};
for (const w of ["a", "b", "a"]) {
  counts[w] = (counts[w] || 0) + 1;
}
// { a: 2, b: 1 }`,
 'Compter des occurrences = parcourir les éléments et **incrémenter** un compteur par clé dans un objet. `counts[w] || 0` donne 0 si le mot n’a pas encore été vu (la valeur est `undefined`). Pour découper un texte en mots : `text.split(" ")`.',
 'Counting occurrences = walk the elements and **increment** one counter per key in an object. `counts[w] || 0` gives 0 if the word hasn’t been seen yet (the value is `undefined`). To split text into words: `text.split(" ")`.',
 ['Découpe : `text.toLowerCase().split(" ")`.', 'Pour chaque mot `w` : `counts[w] = (counts[w] || 0) + 1;`.', '`return counts;`. Chaîne vide : voir la note ci-dessous.'],
 ['Split: `text.toLowerCase().split(" ")`.', 'For each word `w`: `counts[w] = (counts[w] || 0) + 1;`.', '`return counts;`. Empty string: see the note below.'],
 '`"".split(" ")` renvoie `[""]` (un mot vide) : filtre les mots vides pour obtenir `{}`.',
 '`"".split(" ")` returns `[""]` (one empty word): filter out empty words to get `{}`.'],
];
