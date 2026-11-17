// Leçons issues de la page officielle « Image Component » (nextjs.org/docs/app/api-reference/components/image). Relue le 2026-11-17.
// Le double de <Image> de l'éditeur expose width, height, fill, sizes, quality, placeholder et blurDataURL via data-*.
export function installNextImage({ COURSES, T, NX, SOL }) {
  const add = (slug, ...ls) => COURSES.find((c) => c.slug === slug).lessons.push(...ls);
  const IM = "import Image from 'next/image';\n\n";
  const stub = (name) => `function ${name}() {\n  // ton code ici\n}`;
  const IMG = "document.querySelector('#r img')";
  add('nextjs',
    NX('nx-36', 'Image : remplir le parent avec fill', 'Image: fill the parent with fill',
      'Quand la largeur et la hauteur sont inconnues, la prop booléenne `fill` fait grandir l’image jusqu’à la taille de son élément parent. Écris `Banner` : un `<div style={{ position: "relative", height: 200 }}>` qui contient `<Image src="/banner.jpg" alt="Bannière" fill />`, sans `width` ni `height`.',
      'When the width and height are unknown, the boolean `fill` prop makes the image expand to the size of its parent element. Write `Banner`: a `<div style={{ position: "relative", height: 200 }}>` containing `<Image src="/banner.jpg" alt="Bannière" fill />`, with no `width` or `height`.',
      IM + stub('Banner'), 'Banner', {},
      [T('L’image a fill', 'The image has fill', { dom: `${IMG}.getAttribute('data-fill')`, expect: 'true' }),
       T('Pas de width ni de height', 'No width or height', { dom: `${IMG}.getAttribute('data-width') + '|' + ${IMG}.getAttribute('data-height')`, expect: 'null|null' }),
       T('Le parent est positionné', 'The parent is positioned', { dom: "document.querySelector('#r div').style.position", expect: 'relative' })]),

    NX('nx-37', 'Image : la prop sizes', 'Image: the sizes prop',
      'Avec `fill`, la prop `sizes` indique la largeur que l’image occupe selon l’écran. Écris `Cell` : un `<div style={{ position: "relative", height: 200 }}>` avec `<Image fill src="/example.png" alt="Exemple" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />`.',
      'With `fill`, the `sizes` prop tells which width the image takes depending on the screen. Write `Cell`: a `<div style={{ position: "relative", height: 200 }}>` with `<Image fill src="/example.png" alt="Exemple" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />`.',
      IM + stub('Cell'), 'Cell', {},
      [T('sizes exact', 'Exact sizes', { dom: `${IMG}.getAttribute('data-sizes')`, expect: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' }),
       T('fill est actif', 'fill is on', { dom: `${IMG}.getAttribute('data-fill')`, expect: 'true' })]),

    NX('nx-38', 'Image : alt vide pour une image décorative', 'Image: empty alt for a decorative image',
      'Si l’image est purement décorative ou n’est pas destinée à l’utilisateur, la propriété `alt` doit être une chaîne vide. Écris `Decor` : `<Image src="/pattern.png" alt="" width={100} height={100} />`.',
      'If the image is purely decorative or not intended for the user, the `alt` property should be an empty string. Write `Decor`: `<Image src="/pattern.png" alt="" width={100} height={100} />`.',
      IM + stub('Decor'), 'Decor', {},
      [T('alt est une chaîne vide', 'alt is an empty string', { dom: `${IMG}.getAttribute('alt')`, expect: '' }),
       T('width et height de 100', 'width and height of 100', { dom: `${IMG}.getAttribute('data-width') + 'x' + ${IMG}.getAttribute('data-height')`, expect: '100x100' })]),

    NX('nx-39', 'Image : la qualité', 'Image: quality',
      '`quality` est un entier de 1 à 100 : plus il est élevé, meilleure est la qualité et plus le fichier est gros (75 par défaut). Écris `Photo` : `<Image src="/me.png" alt="Moi" width={500} height={500} quality={80} />`.',
      '`quality` is an integer from 1 to 100: the higher, the better the quality and the larger the file (default 75). Write `Photo`: `<Image src="/me.png" alt="Moi" width={500} height={500} quality={80} />`.',
      IM + stub('Photo'), 'Photo', {},
      [T('quality vaut 80', 'quality is 80', { dom: `${IMG}.getAttribute('data-quality')`, expect: '80' }),
       T('La taille est 500x500', 'The size is 500x500', { dom: `${IMG}.getAttribute('data-width') + 'x' + ${IMG}.getAttribute('data-height')`, expect: '500x500' })]),

    NX('nx-40', 'Image : flou pendant le chargement', 'Image: blur while loading',
      'Pour une image distante, Next.js ne peut pas deviner un aperçu flou au moment du build : tu fournis `width`, `height` et la prop optionnelle `blurDataURL`. Écris `Remote` : `<Image src="/photo.jpg" alt="Photo" width={300} height={200} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQ" />`.',
      'For a remote image, Next.js cannot guess a blurred preview at build time: you provide `width`, `height` and the optional `blurDataURL` prop. Write `Remote`: `<Image src="/photo.jpg" alt="Photo" width={300} height={200} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQ" />`.',
      IM + stub('Remote'), 'Remote', {},
      [T('placeholder vaut blur', 'placeholder is blur', { dom: `${IMG}.getAttribute('data-placeholder')`, expect: 'blur' }),
       T('blurDataURL est une image en data:', 'blurDataURL is a data: image', { dom: `(${IMG}.getAttribute('data-blur') || '').startsWith('data:image/')`, expect: true }),
       T('width et height fournis', 'width and height provided', { dom: `${IMG}.getAttribute('data-width') + 'x' + ${IMG}.getAttribute('data-height')`, expect: '300x200' })]),
  );
  Object.assign(SOL, {
    'nx-36': IM + 'function Banner() {\n  return (\n    <div style={{ position: "relative", height: 200 }}>\n      <Image src="/banner.jpg" alt="Bannière" fill />\n    </div>\n  );\n}',
    'nx-37': IM + 'function Cell() {\n  return (\n    <div style={{ position: "relative", height: 200 }}>\n      <Image fill src="/example.png" alt="Exemple" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />\n    </div>\n  );\n}',
    'nx-38': IM + 'function Decor() {\n  return <Image src="/pattern.png" alt="" width={100} height={100} />;\n}',
    'nx-39': IM + 'function Photo() {\n  return <Image src="/me.png" alt="Moi" width={500} height={500} quality={80} />;\n}',
    'nx-40': IM + 'function Remote() {\n  return <Image src="/photo.jpg" alt="Photo" width={300} height={200} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQ" />;\n}',
  });
}
