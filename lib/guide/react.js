export default [
['re-1', `function Title() {
  return <h2>Un titre</h2>;
}
// utilisation : <Title />`,
 'Un **composant** React est une **fonction** dont le nom commence par une **majuscule** et qui renvoie du **JSX** : du HTML écrit directement dans le JavaScript. On l’utilise comme une balise : `<Title />`. Une expression JavaScript s’insère dans le JSX avec des accolades `{ }`.',
 'A React **component** is a **function** whose name starts with a **capital letter** and that returns **JSX**: HTML written directly inside JavaScript. You use it like a tag: `<Title />`. A JavaScript expression goes inside JSX with curly braces `{ }`.',
 ['Dans `Hello`, écris `return <h1>…</h1>;` avec le texte de ton choix.', 'Le JSX ne doit avoir **qu’un seul élément racine** (ici le `<h1>`).', 'Vérifie : un `<h1>` apparaît dans l’aperçu.'],
 ['Inside `Hello`, write `return <h1>…</h1>;` with the text of your choice.', 'JSX must have **a single root element** (here the `<h1>`).', 'Check: an `<h1>` appears in the preview.'],
 'Un composant nommé `hello` en minuscule serait lu comme une balise HTML inexistante.',
 'A component named `hello` in lower case would be read as a non-existent HTML tag.'],
['re-2', `const [likes, setLikes] = useState(0);
// likes = valeur actuelle ; setLikes(n) = la change
<button onClick={() => setLikes(likes + 1)}>
  👍 {likes}
</button>`,
 'L’**état** est la mémoire d’un composant. `useState(0)` renvoie une paire `[valeur, fonction]`, ici `count` et `setCount`, avec `0` comme valeur de départ. Appeler `setCount(…)` **change la valeur et redessine** le composant. Ne modifie jamais `count` directement.',
 '**State** is a component’s memory. `useState(0)` returns a pair `[value, function]`, here `count` and `setCount`, with `0` as the starting value. Calling `setCount(…)` **changes the value and re-renders** the component. Never modify `count` directly.',
 ['Écris `const [count, setCount] = useState(0);`.', 'Renvoie un `<button onClick={() => setCount(count + 1)}>` qui affiche `{count}`.', 'Teste : le bouton affiche 0, puis 1 après un clic.'],
 ['Write `const [count, setCount] = useState(0);`.', 'Return a `<button onClick={() => setCount(count + 1)}>` that shows `{count}`.', 'Test: the button shows 0, then 1 after a click.'],
 '`count++` ne redessine rien : seul le setter `setCount` déclenche un nouveau rendu.',
 '`count++` re-renders nothing: only the setter `setCount` triggers a new render.'],
['re-3', `function Hello({ name }) {
  return <p>Salut {name}</p>;
}
// <Hello name="Esi" />`,
 'Les **props** sont les paramètres d’un composant : on les passe comme des attributs HTML (`<Greeting name="Esi" />`) et on les reçoit dans un objet, qu’on **déstructure** : `function Greeting({ name })`. Elles sont **en lecture seule**.',
 '**Props** are a component’s parameters: you pass them like HTML attributes (`<Greeting name="Esi" />`) and receive them in an object, which you **destructure**: `function Greeting({ name })`. They are **read-only**.',
 ['Change la signature en `function Greeting({ name })`.', 'Renvoie `<p>` contenant `{name}` entre accolades.', 'Le test appelle le composant avec un nom et cherche ce nom dans le `<p>`.'],
 ['Change the signature to `function Greeting({ name })`.', 'Return a `<p>` containing `{name}` in braces.', 'The test renders the component with a name and looks for it in the `<p>`.'],
 'Dans le JSX, `{name}` affiche la variable ; écrire `name` tout seul afficherait le mot « name ».',
 'In JSX, `{name}` displays the variable; writing `name` alone would display the word “name”.'],
['re-4', `<ul>
  {fruits.map((f) => (
    <li key={f}>{f}</li>
  ))}
</ul>`,
 'Pour afficher une liste, on **transforme** un tableau en éléments JSX avec `.map(…)`. Chaque élément doit avoir une prop `key` **unique et stable** (un identifiant, pas l’indice si la liste change) : React s’en sert pour savoir quel élément a changé.',
 'To display a list, you **transform** an array into JSX elements with `.map(…)`. Each element needs a **unique, stable** `key` prop (an id, not the index if the list changes): React uses it to know which element changed.',
 ['Renvoie un `<ul>`.', 'Dedans, `{items.map((item) => <li key={item}>{item}</li>)}`.', 'Vérifie : autant de `<li>` que d’éléments, chacun avec sa `key`.'],
 ['Return a `<ul>`.', 'Inside, `{items.map((item) => <li key={item}>{item}</li>)}`.', 'Check: as many `<li>` as items, each with its `key`.'],
 'La `key` va sur l’élément **le plus externe** renvoyé par `map`, pas sur son contenu.',
 'The `key` goes on the **outermost** element returned by `map`, not on its content.'],
['re-5', `useEffect(() => {
  document.title = "Bonjour";
}, []);  // [] = une seule fois, au premier affichage`,
 'Un **effet** exécute du code **après** l’affichage, pour tout ce qui sort de React : charger des données, changer le titre de l’onglet, démarrer un minuteur. Le **tableau de dépendances** décide quand : `[]` = une seule fois ; `[x]` = à chaque changement de `x` ; absent = à chaque rendu.',
 'An **effect** runs code **after** display, for anything outside React: loading data, changing the tab title, starting a timer. The **dependency array** decides when: `[]` = once; `[x]` = whenever `x` changes; missing = on every render.',
 ['Importe `useEffect` (déjà fait dans le code de départ).', 'Dans `Page`, écris `useEffect(() => { document.title = "Hello"; }, []);`.', 'Renvoie un contenu simple, par exemple `<h1>Page</h1>`.'],
 ['`useEffect` is imported (already in the starter code).', 'Inside `Page`, write `useEffect(() => { document.title = "Hello"; }, []);`.', 'Return simple content, for example `<h1>Page</h1>`.'],
 'Sans `[]`, l’effet se relance à **chaque** rendu : danger de boucle infinie si tu modifies un état dedans.',
 'Without `[]`, the effect re-runs on **every** render: infinite-loop risk if you set state inside it.'],
['re-6', `const [open, setOpen] = useState(false);
<button onClick={() => setOpen(!open)}>
  {open ? "ouvert" : "fermé"}
</button>`,
 'Un état booléen se **bascule** avec `!` (le NON logique) : `setOn(!on)` donne `true` si c’était `false` et inversement. L’opérateur ternaire `condition ? a : b` choisit quoi afficher dans le JSX.',
 'A boolean state is **flipped** with `!` (logical NOT): `setOn(!on)` gives `true` if it was `false` and vice versa. The ternary operator `condition ? a : b` chooses what to display in JSX.',
 ['Crée `const [on, setOn] = useState(false);`.', 'Renvoie un `<button onClick={() => setOn(!on)}>`.', 'Dans le bouton, affiche `{on ? "ON" : "OFF"}`.'],
 ['Create `const [on, setOn] = useState(false);`.', 'Return a `<button onClick={() => setOn(!on)}>`.', 'Inside it, display `{on ? "ON" : "OFF"}`.'],
 'Le texte des tests est exact : « ON » et « OFF » en majuscules.',
 'The tests expect exact text: “ON” and “OFF” in capitals.'],
['re-7', `const [text, setText] = useState("");
<input value={text} onChange={(e) => setText(e.target.value)} />
<p>{text}</p>`,
 'Un champ **contrôlé** : React est la source de vérité. L’`<input>` affiche `value={state}` et, à chaque frappe, `onChange` met l’état à jour avec `e.target.value` (la valeur saisie). Tout ce qui dépend de cet état (ici le `<p>`) se met à jour en direct.',
 'A **controlled** input: React is the source of truth. The `<input>` shows `value={state}` and on each keystroke `onChange` updates the state with `e.target.value` (the typed value). Everything depending on that state (here the `<p>`) updates live.',
 ['Crée `const [text, setText] = useState("");`.', 'Écris `<input value={text} onChange={(e) => setText(e.target.value)} />`.', 'Ajoute `<p>{text}</p>` juste en dessous. Enveloppe les deux dans un `<div>`.'],
 ['Create `const [text, setText] = useState("");`.', 'Write `<input value={text} onChange={(e) => setText(e.target.value)} />`.', 'Add `<p>{text}</p>` right below. Wrap both in a `<div>`.'],
 'Un `value` sans `onChange` rend le champ impossible à modifier.',
 'A `value` without `onChange` makes the field impossible to edit.'],
['re-8', `function Badge({ admin }) {
  if (admin) return <b>Admin</b>;
  return <span>Membre</span>;
}`,
 'Le **rendu conditionnel** affiche des choses différentes selon une valeur. Trois outils : un `if` avec `return` anticipé, le ternaire `cond ? <A/> : <B/>`, et `cond && <A/>` (affiche A seulement si `cond` est vrai). Un composant peut aussi renvoyer `null` pour ne rien afficher.',
 '**Conditional rendering** displays different things depending on a value. Three tools: an `if` with early `return`, the ternary `cond ? <A/> : <B/>`, and `cond && <A/>` (shows A only if `cond` is true). A component can also return `null` to display nothing.',
 ['Utilise un ternaire dans un `<p>` : `{online ? "ON" : "OFF"}`.', 'Reçois la prop : `function Status({ online })`.', 'Teste avec `online` vrai (ON) et faux (OFF).'],
 ['Use a ternary in a `<p>`: `{online ? "ON" : "OFF"}`.', 'Receive the prop: `function Status({ online })`.', 'Test with `online` true (ON) and false (OFF).'],
 '`{count && <p>…</p>}` affiche un `0` parasite quand `count` vaut 0 : préfère `count > 0 && …`.',
 '`{count && <p>…</p>}` displays a stray `0` when `count` is 0: prefer `count > 0 && …`.'],
['re-9', `function reducer(state, action) {
  if (action === "add") return state + 1;
  return state;
}
const [n, dispatch] = useReducer(reducer, 0);
<button onClick={() => dispatch("add")}>+</button>`,
 '`useReducer` est un `useState` pour les cas où plusieurs **actions** modifient l’état. Tu écris une fonction `reducer(état, action)` qui **renvoie le nouvel état**, et tu **déclenches** une action avec `dispatch(action)`. Toute la logique de changement est centralisée au même endroit.',
 '`useReducer` is a `useState` for cases where several **actions** change the state. You write a `reducer(state, action)` function that **returns the new state**, and **trigger** an action with `dispatch(action)`. All the change logic lives in one place.',
 ['Écris `function reducer(state, action)` : renvoie `state + 1` pour `"inc"`, `state - 1` pour `"dec"`.', 'Dans `Stepper` : `const [n, dispatch] = useReducer(reducer, 0);`.', 'Deux boutons (`dispatch("inc")`, `dispatch("dec")`) et un `<span>{n}</span>`.'],
 ['Write `function reducer(state, action)`: return `state + 1` for `"inc"`, `state - 1` for `"dec"`.', 'In `Stepper`: `const [n, dispatch] = useReducer(reducer, 0);`.', 'Two buttons (`dispatch("inc")`, `dispatch("dec")`) and a `<span>{n}</span>`.'],
 'Le premier bouton du test doit être « + », le second « − » : respecte cet ordre dans le JSX.',
 'The test expects the first button to be “+” and the second “−”: respect that order in the JSX.'],
['re-10', `function useCounter() {
  const [n, setN] = useState(0);
  const inc = () => setN(n + 1);
  return [n, inc];
}
// const [n, inc] = useCounter();`,
 'Un **hook personnalisé** est une fonction dont le nom commence par `use` et qui utilise d’autres hooks. Il permet de **réutiliser de la logique** d’état entre composants. Il renvoie ce que tu veux : souvent un tableau `[valeur, action]` ou un objet.',
 'A **custom hook** is a function whose name starts with `use` and that uses other hooks. It lets you **reuse state logic** across components. It returns whatever you want: often an array `[value, action]` or an object.',
 ['Dans `useToggle`, crée `const [v, setV] = useState(initial);`.', 'Renvoie `[v, () => setV(!v)]`.', 'Dans `Panel`, `const [open, toggle] = useToggle();` puis un bouton `onClick={toggle}` affichant `{open ? "open" : "closed"}`.'],
 ['In `useToggle`, create `const [v, setV] = useState(initial);`.', 'Return `[v, () => setV(!v)]`.', 'In `Panel`, `const [open, toggle] = useToggle();` then a button `onClick={toggle}` showing `{open ? "open" : "closed"}`.'],
 'Appelle les hooks toujours au **niveau supérieur** d’un composant ou d’un hook, jamais dans une condition ou une boucle.',
 'Always call hooks at the **top level** of a component or hook, never inside a condition or loop.'],
['re-11', `function Box({ children }) {
  return <section>{children}</section>;
}
// <Box><p>Contenu</p></Box>`,
 '`children` est une prop spéciale : **tout ce que tu écris entre la balise ouvrante et fermante** d’un composant. Elle permet de fabriquer des conteneurs réutilisables (cartes, modales, mises en page) qui ne savent rien de leur contenu : c’est la **composition**.',
 '`children` is a special prop: **everything you write between a component’s opening and closing tags**. It lets you build reusable containers (cards, modals, layouts) that know nothing about their content: this is **composition**.',
 ['Reçois `{ title, children }`.', 'Renvoie un `<div>` avec `<h2>{title}</h2>`.', 'Puis `{children}` juste en dessous pour afficher le contenu fourni.'],
 ['Receive `{ title, children }`.', 'Return a `<div>` with `<h2>{title}</h2>`.', 'Then `{children}` right below to display the provided content.'],
 'Oublier `{children}` : le contenu placé entre les balises n’est jamais affiché.',
 'Forgetting `{children}`: the content placed between the tags is never displayed.'],
['re-12', `function handleSubmit(e) {
  e.preventDefault();   // empêche le rechargement de la page
  setSent(true);
}
<form onSubmit={handleSubmit}>…</form>`,
 'Par défaut, envoyer un `<form>` **recharge la page**. En React on veut garder le contrôle : `onSubmit` reçoit l’événement `e`, et `e.preventDefault()` annule le rechargement. On lit alors l’état des champs contrôlés et on affiche le résultat.',
 'By default, submitting a `<form>` **reloads the page**. In React you want to stay in control: `onSubmit` receives the event `e`, and `e.preventDefault()` cancels the reload. You then read the controlled fields’ state and display the result.',
 ['Crée deux états : `email` (`""`) et `sent` (`false`).', 'Écris un `<form onSubmit>` : `e.preventDefault(); setSent(true);`.', 'Affiche `{sent && <p>Bienvenue, {email}</p>}` sous le formulaire.'],
 ['Create two states: `email` (`""`) and `sent` (`false`).', 'Write a `<form onSubmit>`: `e.preventDefault(); setSent(true);`.', 'Display `{sent && <p>Bienvenue, {email}</p>}` under the form.'],
 'Le message ne doit apparaître **qu’après** l’envoi, pas pendant la saisie.',
 'The message must appear **only after** submission, not while typing.'],
['re-13', `setItems([...items, newItem]);   // ajoute SANS muter
setText("");                      // vide le champ`,
 'Pour ajouter à une liste en état, on crée un **nouveau tableau** : `[...items, nouveau]`. Ne fais jamais `items.push(…)` : React ne verrait pas de changement. Après l’ajout, on remet le champ à vide. N’oublie pas la `key` en affichant la liste.',
 'To add to a list held in state, create a **new array**: `[...items, newItem]`. Never do `items.push(…)`: React wouldn’t see a change. After adding, reset the field to empty. Don’t forget the `key` when displaying the list.',
 ['Deux états : `text` (`""`) et `items` (`[]`).', 'Un `<input>` contrôlé et un bouton « Ajouter » : `setItems([...items, text]); setText("");`.', 'Affiche `<ul>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>`.'],
 ['Two states: `text` (`""`) and `items` (`[]`).', 'A controlled `<input>` and an “Ajouter” button: `setItems([...items, text]); setText("");`.', 'Display `<ul>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>`.'],
 'Le bouton doit s’appeler « Ajouter » : le test le cherche par son texte.',
 'The button must be labelled “Ajouter”: the test finds it by its text.'],
['re-14', `const total = items.reduce((s, it) => s + it.price, 0);
// pas de useState pour total : on le CALCULE à chaque rendu`,
 'Si une valeur peut se **calculer** à partir d’un état ou de props, ne la stocke pas dans un nouvel état : calcule-la directement dans le composant. Moins d’états = moins de bugs de synchronisation. `reduce` additionne les prix.',
 'If a value can be **computed** from state or props, don’t store it in new state: compute it directly in the component. Fewer states = fewer sync bugs. `reduce` adds the prices up.',
 ['Reçois `{ items }` (tableau d’objets `{ price }`).', 'Calcule `const total = items.reduce((sum, it) => sum + it.price, 0);`.', 'Renvoie `<strong>{total}</strong>`.'],
 ['Receive `{ items }` (array of `{ price }` objects).', 'Compute `const total = items.reduce((sum, it) => sum + it.price, 0);`.', 'Return `<strong>{total}</strong>`.'],
 'Pas de `useState` ni de `useEffect` ici : une simple variable locale suffit.',
 'No `useState` or `useEffect` here: a plain local variable is enough.'],
['re-15', `function Parent() {
  const [v, setV] = useState(0);
  return (
    <>
      <Show value={v} />
      <button onClick={() => setV(v + 1)}>+</button>
    </>
  );
}`,
 'Quand plusieurs composants ont besoin des mêmes données, on **remonte l’état** dans leur parent commun. Le parent possède l’état, passe la valeur à l’enfant par une **prop**, et c’est le parent qui la modifie. Les données descendent, les événements remontent.',
 'When several components need the same data, **lift the state up** to their common parent. The parent owns the state, passes the value down through a **prop**, and the parent is the one that changes it. Data flows down, events flow up.',
 ['`Display({ value })` renvoie `<p>{value}</p>`.', 'Dans `Parent`, `const [n, setN] = useState(0);`.', 'Renvoie `<Display value={n} />` et un `<button onClick={() => setN(n + 1)}>`, dans un `<div>`.'],
 ['`Display({ value })` returns `<p>{value}</p>`.', 'In `Parent`, `const [n, setN] = useState(0);`.', 'Return `<Display value={n} />` and a `<button onClick={() => setN(n + 1)}>`, inside a `<div>`.'],
 '`Display` ne doit avoir **aucun état** : il se contente d’afficher ce qu’il reçoit.',
 '`Display` must have **no state**: it just displays what it receives.'],
['re-16', `const ref = useRef(0);
ref.current = 5;        // change la valeur SANS redessiner
// lire : ref.current`,
 '`useRef` renvoie un objet `{ current }` qui **survit entre les rendus** mais dont la modification **ne redessine pas** le composant. Utile pour garder une valeur « en coulisses » (l’ancienne valeur, un minuteur) ou un élément du DOM. Mise à jour dans un `useEffect`, après le rendu.',
 '`useRef` returns a `{ current }` object that **survives between renders** but whose changes **do not re-render** the component. Useful to keep a value “backstage” (the previous value, a timer) or a DOM element. Update it in a `useEffect`, after render.',
 ['État : `const [n, setN] = useState(0);` et `const prev = useRef();`.', 'Dans un `useEffect(() => { prev.current = n; }, [n]);` mémorise la valeur courante après chaque rendu.', 'Affiche `<p>now:{n} prev:{prev.current ?? ""}</p>`.'],
 ['State: `const [n, setN] = useState(0);` and `const prev = useRef();`.', 'In a `useEffect(() => { prev.current = n; }, [n]);` store the current value after each render.', 'Display `<p>now:{n} prev:{prev.current ?? ""}</p>`.'],
 'Pendant le rendu, `prev.current` contient encore l’ancienne valeur : c’est exactement ce qu’on veut afficher.',
 'During render, `prev.current` still holds the old value: that’s exactly what we want to display.'],
['re-17', `const shown = names.filter((n) =>
  n.toLowerCase().includes(query.toLowerCase())
);`,
 'Un **filtre en direct** combine un champ contrôlé (`query`) et une **donnée dérivée** : la liste affichée se calcule à chaque rendu avec `filter`. Pas besoin d’un second état. `includes` teste si un texte en contient un autre ; passer en minuscules rend la recherche insensible à la casse.',
 'A **live filter** combines a controlled field (`query`) and **derived data**: the displayed list is computed on each render with `filter`. No second state needed. `includes` tests whether a string contains another; lower-casing makes the search case-insensitive.',
 ['`const [q, setQ] = useState("");` et un `<input>` contrôlé.', 'Calcule `const shown = items.filter((it) => it.toLowerCase().includes(q.toLowerCase()));`.', 'Affiche `shown.map(...)` dans un `<ul>` avec des `<li key={it}>`.'],
 ['`const [q, setQ] = useState("");` and a controlled `<input>`.', 'Compute `const shown = items.filter((it) => it.toLowerCase().includes(q.toLowerCase()));`.', 'Display `shown.map(...)` in a `<ul>` with `<li key={it}>`.'],
 'Ne stocke pas `shown` dans un état : il se recalcule tout seul à chaque frappe.',
 'Don’t store `shown` in state: it recomputes by itself on each keystroke.'],
['re-18', `const LangContext = createContext("fr");
function Child() {
  const lang = useContext(LangContext);
  return <p>{lang}</p>;
}
<LangContext.Provider value="en"><Child /></LangContext.Provider>`,
 'Le **contexte** transmet une valeur à tous les composants d’une branche **sans passer par les props** de chaque niveau. Trois étapes : `createContext(défaut)` crée le contexte, `<Contexte.Provider value=…>` fournit la valeur à ses descendants, `useContext(Contexte)` la lit n’importe où en dessous.',
 '**Context** passes a value to every component in a branch **without threading props** through each level. Three steps: `createContext(default)` creates it, `<Context.Provider value=…>` provides the value to its descendants, `useContext(Context)` reads it anywhere below.',
 ['Le contexte `ThemeContext` est déjà créé dans le code de départ.', 'Dans `Badge`, `const theme = useContext(ThemeContext);` puis `<p>{theme}</p>`.', 'Dans `App`, entoure `<Badge />` de `<ThemeContext.Provider value="dark">`.'],
 ['`ThemeContext` is already created in the starter code.', 'In `Badge`, `const theme = useContext(ThemeContext);` then `<p>{theme}</p>`.', 'In `App`, wrap `<Badge />` in `<ThemeContext.Provider value="dark">`.'],
 'Sans `Provider`, `useContext` renvoie la valeur par défaut (« light ») au lieu de « dark ».',
 'Without the `Provider`, `useContext` returns the default value (“light”) instead of “dark”.'],
['re-19', `setItems(items.filter((x) => x !== target));   // ✅ nouveau tableau
// items.splice(i, 1)                              // ❌ modifie l’original`,
 'Supprimer sans **muter** : `filter` crée un **nouveau tableau** sans l’élément. `splice` modifie le tableau existant : React ne détecte pas toujours le changement. Règle d’or : en React, on ne modifie jamais un état, on en crée une nouvelle version.',
 'Delete without **mutating**: `filter` creates a **new array** without the item. `splice` modifies the existing array: React doesn’t always detect the change. Golden rule: in React you never modify state, you create a new version.',
 ['`const [items, setItems] = useState(["a", "b", "c"]);`.', 'Affiche chaque `item` dans un `<li key={item}>` avec un `<button>`.', 'Au clic : `setItems(items.filter((x) => x !== item));`.'],
 ['`const [items, setItems] = useState(["a", "b", "c"]);`.', 'Display each `item` in an `<li key={item}>` with a `<button>`.', 'On click: `setItems(items.filter((x) => x !== item));`.'],
 'Le test cherche le mot `filter` dans ton code et refuse `splice`.',
 'The test looks for the word `filter` in your code and rejects `splice`.'],
['re-20', `{open && <p>Contenu caché</p>}
// quand open === false, le <p> n’existe PAS dans le DOM`,
 'Un **accordéon** combine un état booléen et un rendu conditionnel. Avec `{open && <p>…</p>}`, quand `open` est faux le `<p>` **n’est pas créé du tout** (différent de `display: none` qui le cache seulement). Le bouton bascule l’état à chaque clic.',
 'An **accordion** combines a boolean state with conditional rendering. With `{open && <p>…</p>}`, when `open` is false the `<p>` **isn’t created at all** (unlike `display: none`, which only hides it). The button flips the state on each click.',
 ['`const [open, setOpen] = useState(false);`.', 'Un `<button onClick={() => setOpen(!open)}>Détails</button>`.', 'Dessous : `{open && <p>…</p>}` avec le texte de ton choix.'],
 ['`const [open, setOpen] = useState(false);`.', 'A `<button onClick={() => setOpen(!open)}>Détails</button>`.', 'Below it: `{open && <p>…</p>}` with the text of your choice.'],
 'Le bouton doit s’appeler exactement « Détails » et rester affiché, ouvert ou fermé.',
 'The button must be labelled exactly “Détails” and stay displayed, open or closed.'],
];
