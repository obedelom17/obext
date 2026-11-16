export const dynamic = 'force-static';
export default function manifest() {
  return {
    id: '/',
    name: 'obext.js — apprendre à coder',
    short_name: 'obext.js',
    lang: 'fr',
    description: 'Apprends HTML, CSS, JavaScript, Node.js, React et Next.js par la pratique.',
    start_url: '/courses/?source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ECEEF0',
    theme_color: '#FF4A1C',
    categories: ['education'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
    shortcuts: [
      { name: 'Cours', url: '/courses/', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Vérifier un certificat', url: '/verify/', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
    ],
  };
}
