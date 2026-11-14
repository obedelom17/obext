import hc from './guide/html-css';
import js from './guide/javascript';
import al from './guide/algo';
import re from './guide/react';
import nx from './guide/nextjs';
import ex from './guide/nextexpert';

// Transforme les tuples en { exemple, learn, steps, tip } indexés par id de leçon.
const G = {};
[...hc, ...js, ...al, ...re, ...nx, ...ex].forEach(([id, ex, lf, le, sf, se, tf, te]) => {
  G[id] = { ex, learn: { fr: lf, en: le }, steps: { fr: sf, en: se }, tip: { fr: tf, en: te } };
});
export const GUIDE = G;

// Présentation de chaque cours : objectif, prérequis, durée, ce qu’on saura faire.
export const INTRO = {
  'html-css': {
    time: { fr: '≈ 2 h', en: '≈ 2 h' }, need: { fr: 'Aucun prérequis. Un navigateur suffit.', en: 'No prerequisites. A browser is enough.' },
    goal: { fr: 'Construire une page web complète : du texte structuré jusqu’aux animations.', en: 'Build a complete web page: from structured text to animations.' },
    learn: { fr: ['Structurer une page avec HTML', 'Styler avec les sélecteurs et les classes', 'Comprendre le modèle de boîte', 'Mettre en page avec Flexbox et Grid', 'Adapter au mobile avec les media queries', 'Animer avec @keyframes'], en: ['Structure a page with HTML', 'Style with selectors and classes', 'Understand the box model', 'Lay out with Flexbox and Grid', 'Adapt to mobile with media queries', 'Animate with @keyframes'] },
  },
  javascript: {
    time: { fr: '≈ 8 h', en: '≈ 8 h' }, need: { fr: 'Aucun prérequis. Les premières leçons partent de zéro.', en: 'No prerequisites. The first lessons start from zero.' },
    goal: { fr: 'Maîtriser le langage de la programmation web : fonctions, tableaux, objets, asynchrone.', en: 'Master the language of web programming: functions, arrays, objects, async.' },
    learn: { fr: ['Écrire des fonctions et des conditions', 'Manipuler textes, nombres et tableaux', 'Utiliser map, filter et reduce', 'Comprendre les closures', 'Gérer les erreurs et l’asynchrone', 'Écrire du code propre et testable'], en: ['Write functions and conditions', 'Work with strings, numbers and arrays', 'Use map, filter and reduce', 'Understand closures', 'Handle errors and async code', 'Write clean, testable code'] },
  },
  algorithmes: {
    time: { fr: '≈ 3 h', en: '≈ 3 h' }, need: { fr: 'Les bases de JavaScript (tableaux, boucles, fonctions).', en: 'JavaScript basics (arrays, loops, functions).' },
    goal: { fr: 'Penser comme un programmeur : choisir la bonne méthode, pas seulement une méthode qui marche.', en: 'Think like a programmer: pick the right method, not just one that works.' },
    learn: { fr: ['Rechercher dans un tableau', 'Comprendre la complexité O(n) et O(log n)', 'Utiliser la récursion et la mémoïsation', 'Trier avec diviser pour régner', 'Utiliser Map et pile'], en: ['Search in an array', 'Understand O(n) and O(log n) complexity', 'Use recursion and memoisation', 'Sort with divide and conquer', 'Use Map and stack'] },
  },
  react: {
    time: { fr: '≈ 6 h', en: '≈ 6 h' }, need: { fr: 'JavaScript : fonctions, tableaux, objets, map/filter.', en: 'JavaScript: functions, arrays, objects, map/filter.' },
    goal: { fr: 'Construire des interfaces interactives avec des composants.', en: 'Build interactive interfaces with components.' },
    learn: { fr: ['Écrire des composants en JSX', 'Gérer l’état avec useState et useReducer', 'Passer des données avec les props et le contexte', 'Afficher des listes et du contenu conditionnel', 'Créer des formulaires contrôlés', 'Écrire ses propres hooks'], en: ['Write components in JSX', 'Manage state with useState and useReducer', 'Pass data with props and context', 'Display lists and conditional content', 'Build controlled forms', 'Write your own hooks'] },
  },
  nextjs: {
    time: { fr: '≈ 5 h', en: '≈ 5 h' }, need: { fr: 'Les bases de React (composants, props, état).', en: 'React basics (components, props, state).' },
    goal: { fr: 'Créer un vrai site avec le framework le plus utilisé : routes, données, API.', en: 'Build a real site with the most used framework: routes, data, APIs.' },
    learn: { fr: ['Créer des pages avec l’App Router', 'Récupérer des données côté serveur', 'Utiliser layouts, loading et error', 'Gérer routes dynamiques et navigation', 'Écrire une API avec les Route Handlers'], en: ['Create pages with the App Router', 'Fetch data on the server', 'Use layouts, loading and error files', 'Handle dynamic routes and navigation', 'Write an API with Route Handlers'] },
  },
  'nextjs-expert': {
    time: { fr: '≈ 3 h', en: '≈ 3 h' }, need: { fr: 'Le cours Next.js (niveau débutant à intermédiaire).', en: 'The Next.js course (beginner to intermediate).' },
    goal: { fr: 'Passer au niveau production : performance, sécurité, SEO.', en: 'Move to production level: performance, security, SEO.' },
    learn: { fr: ['Server Actions et formulaires', 'Cache et revalidation', 'Middleware et authentification', 'Server vs Client Components', 'Métadonnées, SEO et streaming'], en: ['Server Actions and forms', 'Caching and revalidation', 'Middleware and authentication', 'Server vs Client Components', 'Metadata, SEO and streaming'] },
  },
};
