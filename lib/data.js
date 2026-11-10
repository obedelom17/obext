export const SITE_NAME = 'Kodex';

export const UI = {
  courses: { fr: 'Cours', en: 'Courses' },
  heroTitle: { fr: 'Apprends à coder en écrivant du code.', en: 'Learn to code by writing code.' },
  heroSub: { fr: 'JavaScript, React et Next.js, de débutant à expert. Chaque leçon se termine par un exercice corrigé instantanément dans ton navigateur.', en: 'JavaScript, React and Next.js, from beginner to expert. Every lesson ends with an exercise graded instantly in your browser.' },
  start: { fr: 'Commencer gratuitement', en: 'Start for free' },
  path: { fr: 'Un parcours, trois étapes', en: 'One path, three steps' },
  f1t: { fr: 'Zéro vidéo', en: 'No videos' }, f1d: { fr: 'Tu lis un peu, tu codes beaucoup.', en: 'Read a little, code a lot.' },
  f2t: { fr: 'Correction instantanée', en: 'Instant grading' }, f2d: { fr: 'Des tests s’exécutent à chaque clic sur « Vérifier ».', en: 'Tests run every time you click “Check”.' },
  f3t: { fr: 'Certificat', en: 'Certificate' }, f3d: { fr: 'Termine un cours et télécharge ton certificat.', en: 'Finish a course and download your certificate.' },
  lessons: { fr: 'leçons', en: 'lessons' },
  check: { fr: 'Vérifier', en: 'Check' }, checking: { fr: 'Exécution…', en: 'Running…' },
  next: { fr: 'Leçon suivante', en: 'Next lesson' },
  allPass: { fr: 'Bravo, tous les tests passent !', en: 'Well done, all tests pass!' },
  somePass: { fr: 'Pas encore : relis l’énoncé et réessaie.', en: 'Not yet: reread the task and try again.' },
  getCert: { fr: 'Obtenir mon certificat', en: 'Get my certificate' },
  yourName: { fr: 'Ton nom complet', en: 'Your full name' },
  print: { fr: 'Imprimer / enregistrer en PDF', en: 'Print / save as PDF' },
  locked: { fr: 'Termine toutes les leçons du cours pour débloquer ce certificat.', en: 'Finish every lesson in the course to unlock this certificate.' },
  certOf: { fr: 'Certificat de réussite', en: 'Certificate of completion' },
  certText: { fr: 'a terminé avec succès le cours', en: 'has successfully completed the course' },
};

const L = (id, fr, en, bodyFr, bodyEn, starter, tests) => ({ id, title: { fr, en }, body: { fr: bodyFr, en: bodyEn }, starter, tests });
const T = (fr, en, o) => ({ label: { fr, en }, ...o });

export const COURSES = [
  { slug: 'javascript', color: '#FFC83D', icon: 'JS', level: { fr: 'Débutant', en: 'Beginner' },
    title: { fr: 'JavaScript', en: 'JavaScript' },
    desc: { fr: 'Les bases du langage : fonctions, tableaux, objets.', en: 'Language basics: functions, arrays, objects.' },
    lessons: [
      L('js-1', 'Ta première fonction', 'Your first function', 'Une fonction prend des valeurs et en renvoie une. Écris `double(n)` qui renvoie le double de `n`.', 'A function takes values and returns one. Write `double(n)` that returns twice `n`.',
        'function double(n) {\n  // ton code ici\n}', [T('double(4) renvoie 8', 'double(4) returns 8', { expr: 'double(4)', expect: 8 }), T('double(-3) renvoie -6', 'double(-3) returns -6', { expr: 'double(-3)', expect: -6 })]),
      L('js-2', 'Filtrer un tableau', 'Filtering an array', '`filter` garde les éléments qui passent un test. Écris `evens(arr)` qui renvoie seulement les nombres pairs.', '`filter` keeps the items that pass a test. Write `evens(arr)` that returns only the even numbers.',
        'function evens(arr) {\n  // ton code ici\n}', [T('evens([1,2,3,4]) renvoie [2,4]', 'evens([1,2,3,4]) returns [2,4]', { expr: 'evens([1,2,3,4])', expect: [2, 4] }), T('evens([]) renvoie []', 'evens([]) returns []', { expr: 'evens([])', expect: [] })]),
      L('js-3', 'Transformer avec map', 'Transforming with map', '`map` transforme chaque élément. Écris `names(users)` qui renvoie la liste des noms d’un tableau d’objets `{ name }`.', '`map` transforms every item. Write `names(users)` that returns the list of names from an array of `{ name }` objects.',
        'function names(users) {\n  // ton code ici\n}', [T('names([{name:"Ama"},{name:"Kofi"}])', 'names([{name:"Ama"},{name:"Kofi"}])', { expr: 'names([{name:"Ama"},{name:"Kofi"}])', expect: ['Ama', 'Kofi'] })]),
    ] },
  { slug: 'react', color: '#3A2CFF', icon: 'Re', level: { fr: 'Intermédiaire', en: 'Intermediate' },
    title: { fr: 'React', en: 'React' },
    desc: { fr: 'Composants, JSX et état avec useState.', en: 'Components, JSX and state with useState.' },
    lessons: [
      L('re-1', 'Ton premier composant', 'Your first component', 'Un composant est une fonction qui renvoie du JSX. Écris un composant `Hello` qui renvoie un titre `<h1>`.', 'A component is a function that returns JSX. Write a `Hello` component that returns an `<h1>` heading.',
        'function Hello() {\n  // ton code ici\n}', [T('Le composant Hello existe', 'The Hello component exists', { match: 'function\\s+Hello' }), T('Il renvoie un <h1>', 'It returns an <h1>', { match: 'return[\\s\\S]*<h1' })]),
      L('re-2', 'L’état avec useState', 'State with useState', '`useState` garde une valeur qui change. Crée un compteur : `useState(0)` et un bouton avec `onClick` qui appelle `setCount`.', '`useState` holds a value that changes. Build a counter: `useState(0)` and a button with `onClick` that calls `setCount`.',
        "import { useState } from 'react';\n\nexport default function Counter() {\n  // ton code ici\n}", [T('useState(0)', 'useState(0)', { match: 'useState\\(\\s*0\\s*\\)' }), T('Un bouton avec onClick', 'A button with onClick', { match: '<button[^>]*onClick' }), T('setCount est appelé', 'setCount is called', { match: 'setCount\\(' })]),
    ] },
  { slug: 'nextjs', color: '#FF5C8A', icon: 'Nx', level: { fr: 'Avancé', en: 'Advanced' },
    title: { fr: 'Next.js', en: 'Next.js' },
    desc: { fr: 'App Router, pages et Server Components.', en: 'App Router, pages and Server Components.' },
    lessons: [
      L('nx-1', 'Une page avec l’App Router', 'A page with the App Router', 'Le fichier `app/about/page.js` crée la page /about. Exporte par défaut un composant qui affiche un `<h1>`.', 'The file `app/about/page.js` creates the /about page. Default-export a component that renders an `<h1>`.',
        '// app/about/page.js\n', [T('export default', 'export default', { match: 'export\\s+default' }), T('Un <h1> est affiché', 'An <h1> is rendered', { match: '<h1' })]),
      L('nx-2', 'Données côté serveur', 'Server-side data', 'Un Server Component peut être `async`. Récupère des données avec `await fetch(...)` dans la page.', 'A Server Component can be `async`. Fetch data with `await fetch(...)` inside the page.',
        '// app/users/page.js\n', [T('Composant async', 'Async component', { match: 'async\\s+function' }), T('await fetch', 'await fetch', { match: 'await\\s+fetch\\(' })]),
    ] },
];
