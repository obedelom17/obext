export default [
['re-1', `function Title() {
  return <h2>Un titre</h2>;
}
// utilisation : <Title />`,
 'Un **composant** React est une **fonction** dont le nom commence par une **majuscule** et qui renvoie du **JSX** : du HTML écrit directement dans le JavaScript. On l’utilise comme une balise : `<Title />`. Une expression JavaScript s’insère dans le JSX avec des accolades `{ }`.',
 'A React **component** is a **function** whose name starts with a **capital letter** and that returns **JSX**: HTML written directly inside JavaScript. You use it like a tag: `<Title />`. A JavaScript expression goes inside JSX with curly braces `{ }`.',
 ['Dans `Hello`, écris `return <h1>…</h1>;` avec le texte de ton choix.', 'Le JSX ne doit avoir **qu’un seul élément racine** (ici le `<h1>`).', 'Vérifie : un `<h1>` apparaît dans l’aperçu.'],
 ['Inside `Hello`, write `return <h1>…</h1>;` with the text of your choice.', 'JSX must have **a single root element** (here the `<h1>`).', 'Check: an `<h1>` appears in the preview.'],
 'React distingue les composants des balises HTML par la majuscule : les noms de composants commencent toujours par une **majuscule**, alors que les balises HTML sont en minuscules. Ne définis jamais un composant à l’intérieur d’un autre : déclare-le au niveau supérieur du fichier.',
 'React tells components from HTML tags by the capital letter: component names always start with a **capital letter**, while HTML tags are lowercase. Never define a component inside another component: declare it at the top level of the file.'],
['re-2', `const [likes, setLikes] = useState(0);
// likes = valeur actuelle ; setLikes(n) = la change
<button onClick={() => setLikes(likes + 1)}>
  👍 {likes}
</button>`,
 'L’**état** est la mémoire d’un composant. `useState(0)` renvoie une paire `[valeur, fonction]`, ici `count` et `setCount`, avec `0` comme valeur de départ. Appeler `setCount(…)` **change la valeur et redessine** le composant. Ne modifie jamais `count` directement.',
 '**State** is a component’s memory. `useState(0)` returns a pair `[value, function]`, here `count` and `setCount`, with `0` as the starting value. Calling `setCount(…)` **changes the value and re-renders** the component. Never modify `count` directly.',
 ['Écris `const [count, setCount] = useState(0);`.', 'Renvoie un `<button onClick={() => setCount(count + 1)}>` qui affiche `{count}`.', 'Teste : le bouton affiche 0, puis 1 après un clic.'],
 ['Write `const [count, setCount] = useState(0);`.', 'Return a `<button onClick={() => setCount(count + 1)}>` that shows `{count}`.', 'Test: the button shows 0, then 1 after a click.'],
 'Mettre à jour l’état ne change que la valeur du **prochain** rendu : dans le gestionnaire en cours, la variable garde sa valeur (appeler `setNumber(number + 1)` trois fois donne 1, pas 3). Seul le setter demande un nouveau rendu à React.',
 'Updating state only changes the value for the **next** render: inside the current handler the variable keeps its value (calling `setNumber(number + 1)` three times gives 1, not 3). Only the setter asks React for a new render.'],
['re-3', `function Hello({ name }) {
  return <p>Salut {name}</p>;
}
// <Hello name="Esi" />`,
 'Les **props** sont les paramètres d’un composant : on les passe comme des attributs HTML (`<Greeting name="Esi" />`) et on les reçoit dans un objet, qu’on **déstructure** : `function Greeting({ name })`. Elles sont **en lecture seule**.',
 '**Props** are a component’s parameters: you pass them like HTML attributes (`<Greeting name="Esi" />`) and receive them in an object, which you **destructure**: `function Greeting({ name })`. They are **read-only**.',
 ['Change la signature en `function Greeting({ name })`.', 'Renvoie `<p>` contenant `{name}` entre accolades.', 'Le test appelle le composant avec un nom et cherche ce nom dans le `<p>`.'],
 ['Change the signature to `function Greeting({ name })`.', 'Return a `<p>` containing `{name}` in braces.', 'The test renders the component with a name and looks for it in the `<p>`.'],
 'N’essaie pas de « changer les props » : les props sont immuables. Pour réagir à une saisie de l’utilisateur, il faut utiliser l’**état**.',
 'Don’t try to “change props”: props are immutable. To respond to user input, you need to use **state**.'],
['re-4', `<ul>
  {fruits.map((f) => (
    <li key={f}>{f}</li>
  ))}
</ul>`,
 'Pour afficher une liste, on **transforme** un tableau en éléments JSX avec `.map(…)`. Chaque élément doit avoir une prop `key` **unique et stable** (un identifiant, pas l’indice si la liste change) : React s’en sert pour savoir quel élément a changé.',
 'To display a list, you **transform** an array into JSX elements with `.map(…)`. Each element needs a **unique, stable** `key` prop (an id, not the index if the list changes): React uses it to know which element changed.',
 ['Renvoie un `<ul>`.', 'Dedans, `{items.map((item) => <li key={item}>{item}</li>)}`.', 'Vérifie : autant de `<li>` que d’éléments, chacun avec sa `key`.'],
 ['Return a `<ul>`.', 'Inside, `{items.map((item) => <li key={item}>{item}</li>)}`.', 'Check: as many `<li>` as items, each with its `key`.'],
 'Les clés doivent être **uniques parmi les frères**, ne doivent pas **changer**, et ne doivent pas être **générées pendant le rendu** (pas de `key={Math.random()}`). Utiliser l’indice du tableau comme clé mène souvent à des bugs subtils et déroutants.',
 'Keys must be **unique among siblings**, must not **change**, and must not be **generated while rendering** (no `key={Math.random()}`). Using the array index as a key often leads to subtle and confusing bugs.'],
['re-5', `useEffect(() => {
  document.title = "Bonjour";
}, []);  // [] = une seule fois, au premier affichage`,
 '`useEffect` est un Hook qui te permet de **synchroniser un composant avec un système externe** (chargement de données, minuteur, titre de l’onglet…). Il exécute du code **après** l’affichage. Le **tableau de dépendances** liste toutes les valeurs réactives utilisées dans l’effet : `[]` = une seule fois, `[x]` = quand `x` change, et **sans tableau** l’effet se relance après chaque rendu. Si tu ne synchronises rien avec un système externe, tu n’as probablement pas besoin d’un effet.',
 '`useEffect` is a Hook that lets you **synchronise a component with an external system** (data loading, a timer, the tab title…). It runs code **after** the display. The **dependency array** lists all the reactive values used inside the effect: `[]` = once, `[x]` = when `x` changes, and **without an array** the effect re-runs after every render. If you aren’t synchronising anything with an external system, you probably don’t need an effect.',
 ['Importe `useEffect` (déjà fait dans le code de départ).', 'Dans `Page`, écris `useEffect(() => { document.title = "Hello"; }, []);`.', 'Renvoie un contenu simple, par exemple `<h1>Page</h1>`.'],
 ['`useEffect` is imported (already in the starter code).', 'Inside `Page`, write `useEffect(() => { document.title = "Hello"; }, []);`.', 'Return simple content, for example `<h1>Page</h1>`.'],
 'Si tu oublies le tableau (le second argument), l’effet se relance après **chaque** rendu.',
 'If you omit the array (the second argument), the effect re-runs after **every** re-render.'],
['re-6', `const [open, setOpen] = useState(false);
<button onClick={() => setOpen(!open)}>
  {open ? "ouvert" : "fermé"}
</button>`,
 'Un état booléen (`true` / `false`) pilote ce qui s’affiche. Le gestionnaire d’événement appelle le setter avec la valeur opposée, ce qui demande à React un **nouveau rendu**. L’opérateur ternaire `condition ? a : b` choisit alors quoi afficher dans le JSX.',
 'A boolean state (`true` / `false`) drives what is displayed. The event handler calls the setter with the opposite value, which asks React for a **new render**. The ternary operator `condition ? a : b` then picks what to display in the JSX.',
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
 'Quand tu donnes `value` à un `<input>`, tu dois aussi lui donner un gestionnaire `onChange` qui met à jour la valeur : sans lui, le champ est en lecture seule.',
 'When you pass `value` to an `<input>`, you must also pass an `onChange` handler that updates the value: without it, the field is read-only.'],
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
 'Le réducteur doit être **pur** : il reçoit l’état courant et l’action, et **renvoie** l’état suivant, sans modifier l’état existant. Par convention, une action est un objet avec une propriété `type`.',
 'The reducer must be **pure**: it takes the current state and the action, and **returns** the next state, without modifying the existing state. By convention, an action is an object with a `type` property.'],
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
 'Un Hook personnalisé partage de la **logique**, pas de l’**état** : chaque composant qui l’appelle obtient son propre état. Son nom commence par `use` suivi d’une majuscule.',
 'A custom Hook shares **logic**, not **state**: each component that calls it gets its own state. Its name starts with `use` followed by a capital letter.'],
['re-11', `function Box({ children }) {
  return <section>{children}</section>;
}
// <Box><p>Contenu</p></Box>`,
 '`children` est une prop spéciale : **tout ce que tu écris entre la balise ouvrante et fermante** d’un composant. Elle permet de fabriquer des conteneurs réutilisables (cartes, modales, mises en page) qui ne savent rien de leur contenu : c’est la **composition**.',
 '`children` is a special prop: **everything you write between a component’s opening and closing tags**. It lets you build reusable containers (cards, modals, layouts) that know nothing about their content: this is **composition**.',
 ['Reçois `{ title, children }`.', 'Renvoie un `<div>` avec `<h2>{title}</h2>`.', 'Puis `{children}` juste en dessous pour afficher le contenu fourni.'],
 ['Receive `{ title, children }`.', 'Return a `<div>` with `<h2>{title}</h2>`.', 'Then `{children}` right below to display the provided content.'],
 'Un composant qui utilise `children` a comme un « trou » que le parent remplit avec n’importe quel JSX. On s’en sert souvent pour des enveloppes visuelles : panneaux, grilles, cartes.',
 'A component using `children` has a sort of “hole” that its parent fills with arbitrary JSX. It is often used for visual wrappers: panels, grids, cards.'],
['re-12', `function handleSubmit(e) {
  e.preventDefault();   // empêche le rechargement de la page
  setSent(true);
}
<form onSubmit={handleSubmit}>…</form>`,
 'Par défaut, le navigateur envoie les données du formulaire à l’URL courante et **recharge la page**. On change ce comportement avec `e.preventDefault()` dans le gestionnaire `onSubmit`. Les données se lisent soit dans l’état des champs contrôlés, soit avec `new FormData(e.target)`.',
 'By default, the browser sends the form data to the current URL and **refreshes the page**. You override that behaviour by calling `e.preventDefault()` in the `onSubmit` handler. The data is read either from the state of controlled fields, or with `new FormData(e.target)`.',
 ['Crée deux états : `email` (`""`) et `sent` (`false`).', 'Écris un `<form onSubmit>` : `e.preventDefault(); setSent(true);`.', 'Affiche `{sent && <p>Bienvenue, {email}</p>}` sous le formulaire.'],
 ['Create two states: `email` (`""`) and `sent` (`false`).', 'Write a `<form onSubmit>`: `e.preventDefault(); setSent(true);`.', 'Display `{sent && <p>Bienvenue, {email}</p>}` under the form.'],
 'Le message ne doit apparaître **qu’après** l’envoi, pas pendant la saisie.',
 'The message must appear **only after** submission, not while typing.'],
['re-13', `setItems([...items, newItem]);   // ajoute SANS muter
setText("");                      // vide le champ`,
 'Un tableau dans l’état se traite comme **en lecture seule** : on ne le modifie pas avec `push()` ou `pop()`. À chaque ajout, on passe à la fonction de mise à jour un **nouveau tableau** : `[...items, nouveau]` (la syntaxe de décomposition fait le travail de `push`). Après l’ajout, on remet le champ à vide. N’oublie pas la `key` en affichant la liste.',
 'An array in state is treated as **read-only**: you don’t change it with `push()` or `pop()`. On every addition, you pass the setter a **new array**: `[...items, newItem]` (the spread syntax does the job of `push`). After adding, you reset the field. Don’t forget the `key` when displaying the list.',
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
 'Ne stocke pas dans l’état ce que tu peux **calculer pendant le rendu** : c’est de l’état redondant (comme `fullName`, calculé à partir de `firstName` et `lastName`). Ne recopie pas non plus une prop dans l’état : l’état n’est initialisé qu’au **premier** rendu et ne suivrait pas ses nouvelles valeurs.',
 'Don’t store in state what you can **calculate during rendering**: that is redundant state (like `fullName`, computed from `firstName` and `lastName`). Don’t mirror a prop in state either: state is only initialised during the **first** render and would not follow its new values.'],
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
 '`Display` ne doit avoir **aucun état** : pour chaque donnée, **un seul** composant la détient (la « source unique de vérité ») ; les autres reçoivent la valeur par des props.',
 '`Display` must have **no state**: for each piece of data, **one** component holds it (the “single source of truth”); the others receive the value through props.'],
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
 'Ne stocke pas `shown` dans un état : ce serait de l’**état redondant**, puisque la liste se calcule à partir de `query` pendant le rendu.',
 'Don’t store `shown` in state: that would be **redundant state**, since the list is calculated from `query` during rendering.'],
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
 'Sans fournisseur (`Provider`) au-dessus, `useContext` renvoie la valeur **par défaut** donnée à `createContext` : un repli de « dernier recours », statique, qui ne change jamais. Un `useContext` n’est pas affecté par un fournisseur renvoyé par le même composant : il doit être **au-dessus**. Dans les versions récentes de React, on peut aussi écrire `<MonContexte value=…>` directement, sans `.Provider`.',
 'With no `Provider` above, `useContext` returns the **default** value given to `createContext`: a “last resort” fallback, static, that never changes. A `useContext` call is not affected by a provider returned from the same component: it must be **above**. In recent React versions you can also write `<MyContext value=…>` directly, without `.Provider`.'],
['re-19', `setItems(items.filter((x) => x !== target));   // ✅ nouveau tableau
// items.splice(i, 1)                              // ❌ modifie l’original`,
 'Pour retirer un élément d’un tableau de l’état, le plus simple est de le **filtrer** : `filter` produit un **nouveau tableau** qui ne contient plus l’élément, sans modifier l’original. `splice` modifie, lui, le tableau existant : à éviter dans l’état. Les tableaux de l’état se traitent comme en lecture seule.',
 'To remove an item from an array in state, the easiest way is to **filter** it out: `filter` produces a **new array** that no longer contains the item, without modifying the original. `splice`, on the other hand, modifies the existing array: avoid it in state. Arrays in state are treated as read-only.',
 ['`const [items, setItems] = useState(["a", "b", "c"]);`.', 'Affiche chaque `item` dans un `<li key={item}>` avec un `<button>`.', 'Au clic : `setItems(items.filter((x) => x !== item));`.'],
 ['`const [items, setItems] = useState(["a", "b", "c"]);`.', 'Display each `item` in an `<li key={item}>` with a `<button>`.', 'On click: `setItems(items.filter((x) => x !== item));`.'],
 '`slice` et `splice` ont des noms proches mais agissent très différemment : `slice` **copie** un tableau (ou une partie), `splice` le **modifie**.',
 '`slice` and `splice` have similar names but behave very differently: `slice` **copies** an array (or part of it), `splice` **mutates** it.'],
['re-20', `{open && <p>Contenu caché</p>}
// quand open === false, le <p> n’existe PAS dans le DOM`,
 'Un **accordéon** combine un état booléen et un rendu conditionnel. Avec `{open && <p>…</p>}`, quand `open` est faux React **n’affiche rien** à cet endroit. Le bouton bascule l’état à chaque clic.',
 'An **accordion** combines a boolean state and conditional rendering. With `{open && <p>…</p>}`, when `open` is false React **renders nothing** in that spot. The button flips the state on every click.',
 ['`const [open, setOpen] = useState(false);`.', 'Un `<button onClick={() => setOpen(!open)}>Détails</button>`.', 'Dessous : `{open && <p>…</p>}` avec le texte de ton choix.'],
 ['`const [open, setOpen] = useState(false);`.', 'A `<button onClick={() => setOpen(!open)}>Détails</button>`.', 'Below it: `{open && <p>…</p>}` with the text of your choice.'],
 'Le bouton doit s’appeler exactement « Détails » et rester affiché, ouvert ou fermé.',
 'The button must be labelled exactly “Détails” and stay displayed, open or closed.'],
];
