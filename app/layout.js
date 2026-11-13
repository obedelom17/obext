import './globals.css';
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Fx from '../components/Fx';
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--serif' });
const sans = Geist({ subsets: ['latin'], variable: '--sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--mono' });
export const metadata = { title: 'obext.js — HTML, CSS, JavaScript, React, Next.js', description: 'Apprends à coder par la pratique : exercices corrigés dans le navigateur, certificats vérifiables. FR / EN.' };
const init = "try{var t=localStorage.getItem('ox-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}document.documentElement.classList.add('js')";
export default function RootLayout({ children }) {
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: init }} /></head>
      <body className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
        <Providers><Fx /><Header />{children}<Footer /></Providers>
      </body>
    </html>
  );
}
