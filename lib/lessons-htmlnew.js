// Leçons HTML ajoutées d'après MDN (iframe, accessibilité : pages relues le 2026-11-22).
export function installHtmlNew({ COURSES, T, H, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  const E = "<!-- écris ton HTML ici -->\n";
  add('html-css', H("hc-23", "iframe : intégrer une autre page", "iframe: embedding another page",
    "Intègre une page externe avec un `<iframe>` : `src=\"https://example.com\"`, un attribut `title` qui décrit son contenu, `width=\"300\"`, `height=\"200\"` et `loading=\"lazy\"`.",
    "Embed an external page with an `<iframe>`: `src=\"https://example.com\"`, a `title` attribute describing its content, `width=\"300\"`, `height=\"200\"` and `loading=\"lazy\"`.",
    E,
    [T("src=\"https://example.com\"", "src=\"https://example.com\"", {"dom": "document.querySelector('iframe') && document.querySelector('iframe').getAttribute('src')", "expect": "https://example.com"}), T("Un attribut title non vide", "A non-empty title attribute", {"dom": "!!(document.querySelector('iframe') && document.querySelector('iframe').getAttribute('title'))", "expect": true}), T("width 300 et height 200", "width 300 and height 200", {"dom": "!!document.querySelector('iframe[width=\"300\"][height=\"200\"]')", "expect": true}), T("loading=\"lazy\"", "loading=\"lazy\"", {"dom": "!!document.querySelector('iframe[loading=\"lazy\"]')", "expect": true})]));
  add('html-css', H("hc-24", "Accessibilité : la bonne balise", "Accessibility: the right tag",
    "Cette page n’utilise que des `<div>`. Remplace le premier par un `<h1>` (« Mon lecteur ») et le second par un vrai `<button type=\"button\">` (« Lire la vidéo »). Il ne doit rester aucun `<div>`.",
    "This page uses only `<div>`s. Replace the first with an `<h1>` (“Mon lecteur”) and the second with a real `<button type=\"button\">` (“Lire la vidéo”). No `<div>` should remain.",
    "<div>Mon lecteur</div>\n<div>Lire la vidéo</div>\n",
    [T("Un <h1> « Mon lecteur »", "An <h1> “Mon lecteur”", {"dom": "document.querySelector('h1') && document.querySelector('h1').textContent", "expect": "Mon lecteur"}), T("Un <button> « Lire la vidéo »", "A <button> “Lire la vidéo”", {"dom": "document.querySelector('button') && document.querySelector('button').textContent", "expect": "Lire la vidéo"}), T("Plus aucun <div>", "No <div> left", {"dom": "document.querySelectorAll('div').length", "expect": 0})]));
  add('html-css', H("hc-25", "Bordures arrondies", "Rounded borders",
    "Donne à `.card` une bordure `2px solid #333` et des coins arrondis avec `border-radius: 12px`.",
    "Give `.card` a `2px solid #333` border and rounded corners with `border-radius: 12px`.",
    "<div class=\"card\">Carte</div>\n<style>\n  /* ton CSS ici */\n</style>",
    [T("Bordure de 2px", "2px border", {"dom": "getComputedStyle(document.querySelector('.card')).borderTopWidth", "expect": "2px"}), T("Bordure solid", "solid border", {"dom": "getComputedStyle(document.querySelector('.card')).borderTopStyle", "expect": "solid"}), T("Coins arrondis de 12px", "12px rounded corners", {"dom": "getComputedStyle(document.querySelector('.card')).borderTopLeftRadius", "expect": "12px"})]));
  add('html-css', H("hc-26", "Texte : police, alignement et style", "Text: font, alignment and style",
    "Donne à `.titre` une `font-family` qui finit par la famille générique `sans-serif` (par exemple `Helvetica, Arial, sans-serif`), puis `text-align: center` et `font-style: italic`.",
    "Give `.titre` a `font-family` that ends with the generic family `sans-serif` (for example `Helvetica, Arial, sans-serif`), then `text-align: center` and `font-style: italic`.",
    "<p class=\"titre\">Bienvenue</p>\n<style>\n  /* ton CSS ici */\n</style>",
    [T("font-family finit par sans-serif", "font-family ends with sans-serif", {"match": "font-family\\s*:[^;}]*sans-serif\\s*;?"}), T("Texte centré", "Centered text", {"dom": "getComputedStyle(document.querySelector('.titre')).textAlign", "expect": "center"}), T("Texte en italique", "Italic text", {"dom": "getComputedStyle(document.querySelector('.titre')).fontStyle", "expect": "italic"})]));
  add('html-css', H("hc-27", "Arrière-plans : couleur, taille, répétition", "Backgrounds: color, size, repeat",
    "`.hero` a déjà une `background-image`. Ajoute-lui `background-color: #f0f0f0` (affichée sous l’image), `background-repeat: no-repeat`, `background-size: cover` et `background-position: center`.",
    "`.hero` already has a `background-image`. Add `background-color: #f0f0f0` (shown under the image), `background-repeat: no-repeat`, `background-size: cover` and `background-position: center`.",
    "<div class=\"hero\">Bienvenue</div>\n<style>\n  .hero {\n    height: 120px;\n    background-image: url(\"photo.jpg\");\n    /* ton CSS ici */\n  }\n</style>",
    [T("Couleur de fond #f0f0f0", "#f0f0f0 background color", {"dom": "getComputedStyle(document.querySelector('.hero')).backgroundColor", "expect": "rgb(240, 240, 240)"}), T("Image non répétée", "Image not repeated", {"dom": "getComputedStyle(document.querySelector('.hero')).backgroundRepeat", "expect": "no-repeat"}), T("background-size: cover", "background-size: cover", {"dom": "getComputedStyle(document.querySelector('.hero')).backgroundSize", "expect": "cover"}), T("Image centrée", "Image centered", {"dom": "getComputedStyle(document.querySelector('.hero')).backgroundPosition", "expect": "50% 50%"})]));
  add('html-css', H("hc-28", "ARIA : donner un nom à un bouton-icône", "ARIA: naming an icon button",
    "Ce bouton ne contient que le symbole « × » : un lecteur d’écran n’a aucun nom à annoncer. Ajoute `aria-label=\"Fermer\"` au `<button>`, et `aria-hidden=\"true\"` au `<span>` pour que le symbole décoratif soit ignoré.",
    "This button contains only the “×” symbol: a screen reader has no name to announce. Add `aria-label=\"Fermer\"` to the `<button>`, and `aria-hidden=\"true\"` to the `<span>` so the decorative symbol is ignored.",
    "<button type=\"button\">\n  <span>×</span>\n</button>\n",
    [T("aria-label=\"Fermer\" sur le bouton", "aria-label=\"Fermer\" on the button", {"dom": "document.querySelector('button') && document.querySelector('button').getAttribute('aria-label')", "expect": "Fermer"}), T("aria-hidden=\"true\" sur le symbole", "aria-hidden=\"true\" on the symbol", {"dom": "document.querySelector('button span') && document.querySelector('button span').getAttribute('aria-hidden')", "expect": "true"})]));
  add('html-css', H("hc-29", "Clavier : focus et tabindex", "Keyboard: focus and tabindex",
    "Le `<div class=\"menu\">` joue le rôle d’un menu mais ne peut pas recevoir le focus au clavier. Ajoute-lui `tabindex=\"0\"` pour l’intégrer à l’ordre de tabulation, puis une règle `.menu:focus` qui lui donne un contour visible : `outline: 3px solid #0057d8`. (En vrai, une balise `<button>` serait préférable.)",
    "The `<div class=\"menu\">` acts as a menu but can’t receive keyboard focus. Add `tabindex=\"0\"` to include it in the tab order, then a `.menu:focus` rule giving it a visible outline: `outline: 3px solid #0057d8`. (In real life, a `<button>` tag would be preferable.)",
    "<div class=\"menu\">Menu</div>\n<style>\n  /* ton CSS ici */\n</style>",
    [T("tabindex=\"0\" : atteignable à la tabulation", "tabindex=\"0\": reachable by tabbing", {"dom": "document.querySelector('.menu').getAttribute('tabindex')", "expect": "0"}), T("Règle .menu:focus", "A .menu:focus rule", {"match": "\\.menu:focus\\s*\\{"}), T("Contour #0057d8 au focus", "#0057d8 outline on focus", {"match": "\\.menu:focus\\s*\\{[^}]*outline\\s*:[^;}]*#0057d8"})]));
  Object.assign(SOL, {
    "hc-23": "<iframe src=\"https://example.com\" title=\"Page d’exemple\" width=\"300\" height=\"200\" loading=\"lazy\"></iframe>",
    "hc-24": "<h1>Mon lecteur</h1>\n<button type=\"button\">Lire la vidéo</button>",
    "hc-25": "<div class=\"card\">Carte</div>\n<style>\n  .card {\n    border: 2px solid #333;\n    border-radius: 12px;\n  }\n</style>",
    "hc-26": "<p class=\"titre\">Bienvenue</p>\n<style>\n  .titre {\n    font-family: Helvetica, Arial, sans-serif;\n    text-align: center;\n    font-style: italic;\n  }\n</style>",
    "hc-27": "<div class=\"hero\">Bienvenue</div>\n<style>\n  .hero {\n    height: 120px;\n    background-image: url(\"photo.jpg\");\n    background-color: #f0f0f0;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n  }\n</style>",
    "hc-28": "<button type=\"button\" aria-label=\"Fermer\">\n  <span aria-hidden=\"true\">×</span>\n</button>",
    "hc-29": "<div class=\"menu\" tabindex=\"0\">Menu</div>\n<style>\n  .menu:focus {\n    outline: 3px solid #0057d8;\n  }\n</style>",
  });
}
