// Explications nx-32 à nx-34, reformulées d'après la page officielle « route.js ».
export default [
['nx-32', `// app/dashboard/[team]/route.js   →   /dashboard/1
export async function GET(request, { params }) {
  const { team } = await params; // '1'
  return Response.json({ team });
}`,
 'Un `route.js` peut vivre dans un dossier à **segment dynamique**, comme `app/dashboard/[team]/route.js`. Le gestionnaire reçoit alors un second argument optionnel, le `context`, dont la seule valeur est `params`. Dans les versions récentes, `params` est une **Promise** qui se résout en un objet : pour `/dashboard/1`, on obtient `{ team: "1" }`. On l’attend avec `await params`.',
 'A `route.js` can live in a folder with a **dynamic segment**, like `app/dashboard/[team]/route.js`. The handler then receives an optional second argument, the `context`, whose only value is `params`. In recent versions `params` is a **Promise** that resolves to an object: for `/dashboard/1` you get `{ team: "1" }`. You wait for it with `await params`.',
 ['Écris `export async function GET(request, { params })`.', 'Lis la valeur avec `const { team } = await params;`.', 'Renvoie `Response.json({ team })`.'],
 ['Write `export async function GET(request, { params })`.', 'Read the value with `const { team } = await params;`.', 'Return `Response.json({ team })`.'],
 'Dans Next.js 13 et 14, `params` était un simple objet ; la version 15 en a fait une Promise. Fie-toi à la version de ton projet.',
 'In Next.js 13 and 14, `params` was a plain object; version 15 made it a Promise. Rely on your project’s version.'],
['nx-33', `// app/blog/[...slug]/route.js   →   /blog/1/2
const { slug } = await params; // ['1', '2']`,
 'Un dossier écrit `[...slug]` est un segment **attrape-tout** : il capte tout le reste de l’adresse. La documentation donne l’exemple `app/blog/[...slug]/route.js` : l’URL `/blog/1/2` produit `{ slug: ["1", "2"] }`. La valeur est donc un **tableau** de morceaux d’adresse, que l’on peut recoller avec `join("/")`.',
 'A folder written `[...slug]` is a **catch-all** segment: it captures the rest of the address. The documentation gives the example `app/blog/[...slug]/route.js`: the URL `/blog/1/2` produces `{ slug: ["1", "2"] }`. The value is therefore an **array** of address pieces, which you can glue back with `join("/")`.',
 ['Attends `params` et extrais `slug`.', 'Appelle `slug.join("/")`.', 'Renvoie `Response.json({ path })`.'],
 ['Wait for `params` and extract `slug`.', 'Call `slug.join("/")`.', 'Return `Response.json({ path })`.'],
 'Avec `[team]` tu reçois du texte, avec `[...slug]` un tableau : le type de la valeur dépend des crochets.',
 'With `[team]` you get a string, with `[...slug]` an array: the value’s type depends on the brackets.'],
['nx-34', `export const revalidate = 60;

export async function GET() {
  return Response.json({ ok: true });
}`,
 'L’historique de la page officielle note qu’avec la version 15, la mise en cache par défaut des handlers `GET` est passée de **statique** à **dynamique**. Pour **revalider** des données en cache, on exporte l’option de configuration de segment de route `revalidate`, une durée en secondes : `export const revalidate = 60`. Cette constante s’écrit à côté des fonctions `GET`, `POST`… dans le même fichier `route.js`.',
 'The official page’s version history notes that with version 15 the default caching for `GET` handlers changed from **static** to **dynamic**. To **revalidate** cached data, you export the `revalidate` route segment config option, a duration in seconds: `export const revalidate = 60`. This constant is written next to the `GET`, `POST`… functions in the same `route.js` file.',
 ['Écris `export const revalidate = 60;` en haut du fichier.', 'Ajoute `export async function GET()`.', 'Renvoie `Response.json({ ok: true })`.'],
 ['Write `export const revalidate = 60;` at the top of the file.', 'Add `export async function GET()`.', 'Return `Response.json({ ok: true })`.'],
 'Le nom doit être exactement `revalidate` : une autre orthographe est ignorée par Next.js.',
 'The name must be exactly `revalidate`: any other spelling is ignored by Next.js.'],
];
