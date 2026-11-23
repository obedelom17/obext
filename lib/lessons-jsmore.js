// Leçons JavaScript ajoutées d'après MDN (?? , Array.at, structuredClone : pages relues le 2026-11-23).
export function installJsMore({ COURSES, T, L, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  add('javascript', L("js-30", "Valeur par défaut avec ??", "Default values with ??",
    "Écris `pageSize(options)` : renvoie `options.size` si cette valeur existe, sinon `10`. Attention : `0` est une valeur valide (une page de taille 0) et doit être conservée. Utilise l’opérateur `??`, qui ne remplace la valeur que lorsqu’elle est `null` ou `undefined`.",
    "Write `pageSize(options)`: return `options.size` if it exists, otherwise `10`. Careful: `0` is a valid value (a page of size 0) and must be kept. Use the `??` operator, which only replaces the value when it is `null` or `undefined`.",
    "function pageSize(options) {\n  // ton code ici\n}",
    [T("{size: 25} → 25", "{size: 25} → 25", {"expr": "JSON.stringify(pageSize({ size: 25 }))", "expect": "25"}), T("{size: 0} → 0", "{size: 0} → 0", {"expr": "JSON.stringify(pageSize({ size: 0 }))", "expect": "0"}), T("{} → 10", "{} → 10", {"expr": "JSON.stringify(pageSize({}))", "expect": "10"}), T("{size: null} → 10", "{size: null} → 10", {"expr": "JSON.stringify(pageSize({ size: null }))", "expect": "10"}), T("?? est utilisé", "?? is used", {"match": "\\?\\?"})]));
  add('javascript', L("js-31", "at : lire depuis la fin", "at: reading from the end",
    "Écris `lastItem(arr)` qui renvoie le dernier élément d’un tableau, et `secondLast(arr)` qui renvoie l’avant-dernier. Utilise `at()` avec un index négatif au lieu de calculer `arr.length - 1`. Si l’élément n’existe pas, `at()` renvoie `undefined`.",
    "Write `lastItem(arr)` returning the last item of an array, and `secondLast(arr)` returning the second-to-last. Use `at()` with a negative index instead of computing `arr.length - 1`. If the item doesn’t exist, `at()` returns `undefined`.",
    "function lastItem(arr) {\n  // ton code ici\n}\n\nfunction secondLast(arr) {\n  // ton code ici\n}",
    [T("lastItem([1,2,3]) → 3", "lastItem([1,2,3]) → 3", {"expr": "JSON.stringify(lastItem([1, 2, 3]))", "expect": "3"}), T("secondLast([1,2,3]) → 2", "secondLast([1,2,3]) → 2", {"expr": "JSON.stringify(secondLast([1, 2, 3]))", "expect": "2"}), T("lastItem([]) → undefined", "lastItem([]) → undefined", {"expr": "String(lastItem([]))", "expect": "undefined"}), T("secondLast([9]) → undefined", "secondLast([9]) → undefined", {"expr": "String(secondLast([9]))", "expect": "undefined"}), T("at( est utilisé", ".at( is used", {"match": "\\.at\\("})]));
  add('javascript', L("js-32", "structuredClone : copie profonde", "structuredClone: deep copy",
    "Écris `addTag(post, tag)` : renvoie une **copie** de `post` dont le tableau `tags` contient en plus `tag`, **sans modifier l’objet d’origine**. Un simple `{ ...post }` ne suffit pas, car il ne copie que le premier niveau : fais d’abord une copie profonde avec `structuredClone`.",
    "Write `addTag(post, tag)`: return a **copy** of `post` whose `tags` array also contains `tag`, **without changing the original object**. A simple `{ ...post }` is not enough, because it only copies the first level: first make a deep copy with `structuredClone`.",
    "function addTag(post, tag) {\n  // ton code ici\n}",
    [T("La copie contient le nouveau tag", "The copy contains the new tag", {"expr": "JSON.stringify(addTag({ title: 'A', tags: ['js'] }, 'web').tags)", "expect": "[\"js\",\"web\"]"}), T("L’original n’est pas modifié", "The original is not modified", {"expr": "(() => { const p = { title: 'A', tags: ['js'] }; addTag(p, 'web'); return JSON.stringify(p.tags); })()", "expect": "[\"js\"]"}), T("Le titre est conservé", "The title is kept", {"expr": "addTag({ title: 'A', tags: [] }, 'x').title", "expect": "A"}), T("structuredClone est utilisé", "structuredClone is used", {"match": "structuredClone\\("})]));
  Object.assign(SOL, {
    "js-30": "function pageSize(options) {\n  return options.size ?? 10;\n}",
    "js-31": "function lastItem(arr) {\n  return arr.at(-1);\n}\n\nfunction secondLast(arr) {\n  return arr.at(-2);\n}",
    "js-32": "function addTag(post, tag) {\n  const copy = structuredClone(post);\n  copy.tags.push(tag);\n  return copy;\n}",
  });
}
