import hc from './guide/html-css';
import js from './guide/javascript';
import re from './guide/react';
import nx from './guide/nextjs';
import ex from './guide/nextexpert';
import dc from './guide/docs';
import nd from './guide/node';
import br from './guide/browser';
import nl from './guide/nextlink';
import nr from './guide/nextroute';
import nf from './guide/nextfiles';
import ni from './guide/nextimage';
import { DOCS } from './guide/links';

// Transforme les tuples en { exemple, learn, steps, tip } indexés par id de leçon.
const G = {};
[...hc, ...js, ...re, ...nx, ...ex, ...dc, ...nd, ...br, ...nl, ...nr, ...nf, ...ni].forEach(([id, ex, lf, le, sf, se, tf, te]) => {
  G[id] = { doc: DOCS[id], ex, learn: { fr: lf, en: le }, steps: { fr: sf, en: se }, tip: { fr: tf, en: te } };
});
export const GUIDE = G;

// Présentation de chaque cours : objectif, prérequis, durée, ce qu’on saura faire.
export const INTRO = {
  nodejs: {
    time: { fr: '≈ 7 h', en: '≈ 7 h' }, need: { fr: 'JavaScript : fonctions, tableaux, objets, promesses et async/await.', en: 'JavaScript: functions, arrays, objects, promises and async/await.' },
    goal: { fr: 'Comprendre comment JavaScript s’exécute côté serveur : modules, fichiers, événements, flux, HTTP, sécurité et tests.', en: 'Understand how JavaScript runs on the server: modules, files, events, streams, HTTP, security and testing.' },
    learn: { fr: ['Organiser du code en modules (CommonJS et ES)', 'Lire et écrire des fichiers sans bloquer le programme', 'Utiliser les événements, les flux et les Buffer', 'Écrire un serveur HTTP, des routes et des middlewares', 'Hacher, signer et générer des jetons avec crypto', 'Tester, gérer les erreurs et arrêter proprement un serveur'], en: ['Organise code into modules (CommonJS and ES)', 'Read and write files without blocking the program', 'Use events, streams and Buffers', 'Write an HTTP server, routes and middleware', 'Hash, sign and generate tokens with crypto', 'Test, handle errors and shut a server down cleanly'] },
  },
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
