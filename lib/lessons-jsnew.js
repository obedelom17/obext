// Leçons JavaScript ajoutées d'après MDN (flatMap, Object.fromEntries, padStart : pages relues le 2026-11-22).
export function installJsNew({ COURSES, T, L, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  add('javascript', L("js-25", "flatMap : transformer puis aplatir", "flatMap: map then flatten",
    "Écris `words(sentences)` : à partir d’un tableau de phrases, renvoie un tableau de tous les mots. Utilise `flatMap` avec `split(\" \")` : chaque phrase donne un tableau de mots, et `flatMap` les met bout à bout.",
    "Write `words(sentences)`: from an array of sentences, return an array of all the words. Use `flatMap` with `split(\" \")`: each sentence gives an array of words, and `flatMap` joins them end to end.",
    "function words(sentences) {\n  // ton code ici\n}",
    [T("[\"a b\", \"c\"] → a, b, c", "[\"a b\", \"c\"] → a, b, c", {"expr": "JSON.stringify(words([\"a b\", \"c\"]))", "expect": "[\"a\",\"b\",\"c\"]"}), T("[] → []", "[] → []", {"expr": "JSON.stringify(words([]))", "expect": "[]"}), T("flatMap est utilisé", "flatMap is used", {"match": "\\.flatMap\\("})]));
  add('javascript', L("js-26", "Object.fromEntries", "Object.fromEntries",
    "Écris `doubleValues(obj)` : renvoie un nouvel objet où chaque valeur est doublée (`{ a: 1, b: 2 }` devient `{ a: 2, b: 4 }`). Utilise `Object.entries`, `map` puis `Object.fromEntries`.",
    "Write `doubleValues(obj)`: return a new object where every value is doubled (`{ a: 1, b: 2 }` becomes `{ a: 2, b: 4 }`). Use `Object.entries`, `map`, then `Object.fromEntries`.",
    "function doubleValues(obj) {\n  // ton code ici\n}",
    [T("{a:1,b:2,c:3} → {a:2,b:4,c:6}", "{a:1,b:2,c:3} → {a:2,b:4,c:6}", {"expr": "JSON.stringify(doubleValues({ a: 1, b: 2, c: 3 }))", "expect": "{\"a\":2,\"b\":4,\"c\":6}"}), T("{} → {}", "{} → {}", {"expr": "JSON.stringify(doubleValues({}))", "expect": "{}"}), T("Object.fromEntries est utilisé", "Object.fromEntries is used", {"match": "Object\\.fromEntries\\("})]));
  add('javascript', L("js-27", "padStart : compléter une chaîne", "padStart: padding a string",
    "Écris `pad2(n)` : renvoie le nombre `n` sous forme de texte d’au moins 2 caractères, complété à gauche par des `\"0\"` (`5` donne `\"05\"`, `12` donne `\"12\"`). Convertis d’abord avec `String(n)`, puis utilise `padStart(2, \"0\")`.",
    "Write `pad2(n)`: return the number `n` as text of at least 2 characters, padded on the left with `\"0\"` (`5` gives `\"05\"`, `12` gives `\"12\"`). First convert with `String(n)`, then use `padStart(2, \"0\")`.",
    "function pad2(n) {\n  // ton code ici\n}",
    [T("5 → \"05\"", "5 → \"05\"", {"expr": "pad2(5)", "expect": "05"}), T("12 → \"12\"", "12 → \"12\"", {"expr": "pad2(12)", "expect": "12"}), T("0 → \"00\"", "0 → \"00\"", {"expr": "pad2(0)", "expect": "00"}), T("padStart est utilisé", "padStart is used", {"match": "\\.padStart\\("})]));
  add('javascript', L("js-28", "Prototypes : Object.create", "Prototypes: Object.create",
    "`personPrototype` contient la méthode `greet`. Écris `makeUser(name)` : crée un objet avec `Object.create(personPrototype)`, donne-lui la propriété `name`, et renvoie-le. `greet` doit rester **héritée** (elle ne doit pas être une propriété propre de l’objet).",
    "`personPrototype` holds the `greet` method. Write `makeUser(name)`: create an object with `Object.create(personPrototype)`, give it the `name` property, and return it. `greet` must stay **inherited** (it must not be an own property of the object).",
    "const personPrototype = {\n  greet() {\n    return \"Bonjour, \" + this.name;\n  },\n};\n\nfunction makeUser(name) {\n  // ton code ici\n}",
    [T("greet() utilise le name", "greet() uses the name", {"expr": "makeUser('Esi').greet()", "expect": "Bonjour, Esi"}), T("Le prototype est personPrototype", "The prototype is personPrototype", {"expr": "Object.getPrototypeOf(makeUser('Esi')) === personPrototype", "expect": true}), T("greet n’est pas une propriété propre", "greet is not an own property", {"expr": "Object.hasOwn(makeUser('Esi'), 'greet')", "expect": false}), T("Object.create( est utilisé", "Object.create( is used", {"match": "Object\\.create\\("})]));
  add('javascript', L("js-29", "Web Storage : enregistrer un objet", "Web Storage: saving an object",
    "Le stockage web ne garde que des **chaînes**. Écris `saveUser(storage, user)` : elle enregistre `user` sous la clé `\"user\"` avec `setItem` après `JSON.stringify`. Écris `loadUser(storage)` : elle lit la clé `\"user\"` avec `getItem` et renvoie l’objet (`JSON.parse`), ou `null` s’il n’y a rien. Dans le navigateur, on passe `localStorage` comme `storage`.",
    "Web storage keeps only **strings**. Write `saveUser(storage, user)`: it stores `user` under the `\"user\"` key with `setItem` after `JSON.stringify`. Write `loadUser(storage)`: it reads the `\"user\"` key with `getItem` and returns the object (`JSON.parse`), or `null` if there is nothing. In the browser, you pass `localStorage` as `storage`.",
    "function saveUser(storage, user) {\n  // ton code ici\n}\n\nfunction loadUser(storage) {\n  // ton code ici\n}",
    [T("Enregistre l’objet en JSON", "Saves the object as JSON", {"expr": "(() => { const s = { d: {}, setItem(k, v) { this.d[k] = String(v); }, getItem(k) { return k in this.d ? this.d[k] : null; } }; saveUser(s, { name: 'Alex' }); return s.d.user; })()", "expect": "{\"name\":\"Alex\"}"}), T("Relit l’objet enregistré", "Reads back the saved object", {"expr": "(() => { const s = { d: {}, setItem(k, v) { this.d[k] = String(v); }, getItem(k) { return k in this.d ? this.d[k] : null; } }; saveUser(s, { name: 'Alex', age: 30 }); return loadUser(s); })()", "expect": {"name": "Alex", "age": 30}}), T("Rien d’enregistré → null", "Nothing saved → null", {"expr": "loadUser({ getItem() { return null; } })", "expect": null}), T("Utilise JSON.stringify", "Uses JSON.stringify", {"match": "JSON\\.stringify\\("}), T("Utilise JSON.parse", "Uses JSON.parse", {"match": "JSON\\.parse\\("})]));
  Object.assign(SOL, {
    "js-25": "function words(sentences) {\n  return sentences.flatMap((s) => s.split(\" \"));\n}",
    "js-26": "function doubleValues(obj) {\n  return Object.fromEntries(\n    Object.entries(obj).map(([key, value]) => [key, value * 2])\n  );\n}",
    "js-27": "function pad2(n) {\n  return String(n).padStart(2, \"0\");\n}",
    "js-28": "const personPrototype = {\n  greet() {\n    return \"Bonjour, \" + this.name;\n  },\n};\n\nfunction makeUser(name) {\n  const user = Object.create(personPrototype);\n  user.name = name;\n  return user;\n}",
    "js-29": "function saveUser(storage, user) {\n  storage.setItem(\"user\", JSON.stringify(user));\n}\n\nfunction loadUser(storage) {\n  const raw = storage.getItem(\"user\");\n  return raw ? JSON.parse(raw) : null;\n}",
  });
}
