// Explications des leçons React reprises d'après react.dev.
export default [
["re-16", "const inputRef = useRef(null)\n\nfunction handleClick() {\n  inputRef.current.focus()\n}\n\n// <input ref={inputRef} />",
 "Un **ref** est un objet à une seule propriété, `current`. Il est particulièrement courant de s’en servir pour manipuler le **DOM**, et React le gère directement : tu déclares un ref avec la valeur initiale `null`, tu le passes à l’attribut `ref` d’un nœud JSX, et une fois le nœud créé et affiché, React place ce nœud dans `ref.current`. Tu peux alors appeler ses méthodes, comme `focus()`. Les refs se lisent et s’écrivent dans les **gestionnaires d’événements** et les **effets**, pas pendant le rendu.",
 "A **ref** is an object with a single property, `current`. It is particularly common to use a ref to manipulate the **DOM**, and React has built-in support for it: you declare a ref with the initial value `null`, pass it to a JSX node’s `ref` attribute, and once the node is created and on screen, React sets that node into `ref.current`. You can then call its methods, such as `focus()`. Refs are read and written in **event handlers** and **effects**, not during rendering.",
 ["Déclare `const inputRef = useRef(null)`.", "Passe-le à l’input : `<input ref={inputRef} />`.", "Dans le gestionnaire du bouton, appelle `inputRef.current.focus()`."],
 ["Declare `const inputRef = useRef(null)`.", "Pass it to the input: `<input ref={inputRef} />`.", "In the button’s handler, call `inputRef.current.focus()`."],
 "Ne lis ni n’écris `ref.current` pendant le rendu (sauf pour l’initialisation) : le comportement du composant deviendrait imprévisible. Si une information sert à l’affichage, utilise l’**état**.",
 "Do not read or write `ref.current` during rendering (except for initialisation): your component’s behaviour would become unpredictable. If information is used for rendering, use **state**."],
];
