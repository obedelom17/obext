export const dynamic = 'force-static';
export default function manifest() {
  return {
    name: 'obext.js', short_name: 'obext.js', lang: 'fr',
    description: 'Apprends HTML, CSS, JavaScript, React et Next.js par la pratique.',
    start_url: '/courses/', display: 'standalone', background_color: '#ECEEF0', theme_color: '#FF4A1C',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
