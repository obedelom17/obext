// Leçons React reprises d'après react.dev (useRef relu le 2026-11-17).
export function installReactDocs({ COURSES, T, L, SOL }) {
  const RE = (id, fr, en, bFr, bEn, starter, component, props, tests) => ({ ...L(id, fr, en, bFr, bEn, starter, []), react: true, component, props, tests });
  const put = (slug, l) => { const c = COURSES.find((c) => c.slug === slug); const i = c.lessons.findIndex((x) => x.id === l.id); if (i >= 0) c.lessons[i] = l; else c.lessons.push(l); };
  put('react', RE("re-16", "useRef : accéder à un élément du DOM", "useRef: accessing a DOM element",
    "Un `useRef` peut contenir un nœud du DOM. Écris `Form` : crée `const inputRef = useRef(null)`, attache-le à l’`<input>` avec `ref={inputRef}`, et fais qu’un clic sur le bouton « Focus » appelle `inputRef.current.focus()`.",
    "A `useRef` can hold a DOM node. Write `Form`: create `const inputRef = useRef(null)`, attach it to the `<input>` with `ref={inputRef}`, and make a click on the “Focus” button call `inputRef.current.focus()`.",
    "function Form() {\n  // ton code ici\n}", "Form", {},
    [T("Cliquer sur le bouton donne le focus à l’input", "Clicking the button focuses the input", {"pre": "document.querySelector('#r button').click()", "dom": "document.activeElement && document.activeElement.tagName", "expect": "INPUT"}), T("useRef(null)", "useRef(null)", {"match": "useRef\\(\\s*null\\s*\\)"}), T("ref={inputRef} sur l’input", "ref={inputRef} on the input", {"match": "<input[^>]*ref=\\{inputRef\\}"}), T("inputRef.current.focus()", "inputRef.current.focus()", {"match": "inputRef\\.current\\.focus\\(\\)"})]));
  Object.assign(SOL, {
    "re-16": "function Form() {\n  const inputRef = useRef(null);\n\n  function handleClick() {\n    inputRef.current.focus();\n  }\n\n  return (\n    <>\n      <input ref={inputRef} />\n      <button onClick={handleClick}>Focus</button>\n    </>\n  );\n}",
  });
}
