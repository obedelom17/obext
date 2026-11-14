import './globals.css';
import { Archivo_Black, Schibsted_Grotesk, Martian_Mono } from 'next/font/google';
import { Providers } from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Fx from '../components/Fx';
import Confetti from '../components/Confetti';
import CommandPalette from '../components/CommandPalette';
const display = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--display' });
const sans = Schibsted_Grotesk({ subsets: ['latin'], variable: '--sans' });
const mono = Martian_Mono({ subsets: ['latin'], variable: '--mono' });
export const metadata = {
  title: { default: 'obext.js — HTML, CSS, JavaScript, React, Next.js', template: '%s · obext.js' },
  description: 'Apprends à coder par la pratique : chaque leçon explique, montre un exemple, puis corrige ton code dans le navigateur. Certificats vérifiables. FR / EN.',
  applicationName: 'obext.js',
  keywords: ['apprendre à coder', 'JavaScript', 'React', 'Next.js', 'HTML', 'CSS', 'learn to code'],
  openGraph: { title: 'obext.js — apprends à coder par la pratique', description: 'HTML, CSS, JavaScript, React et Next.js : exercices corrigés dans le navigateur, certificats vérifiables.', type: 'website', locale: 'fr_FR', alternateLocale: ['en_US'] },
  twitter: { card: 'summary', title: 'obext.js', description: 'Apprends à coder par la pratique. Learn to code by doing.' },
};
export const viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ECEEF0' }, { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' }], width: 'device-width', initialScale: 1 };
const init = "try{var t=localStorage.getItem('ox-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}document.documentElement.classList.add('js')";
export default function RootLayout({ children }) {
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: init }} /></head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <Providers><a className="skip" href="#main">Aller au contenu / Skip to content</a><Fx /><Confetti /><CommandPalette /><Header /><div className="view" id="main" tabIndex={-1}>{children}</div><Footer /></Providers>
      </body>
    </html>
  );
}
