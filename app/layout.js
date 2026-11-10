import './globals.css';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { Providers } from '../components/Providers';
import Header from '../components/Header';
const sans = Bricolage_Grotesque({ subsets: ['latin'], variable: '--sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--mono' });
export const metadata = { title: 'Kodex — JavaScript, React, Next.js', description: 'Learn JavaScript, React and Next.js by writing code. FR/EN.' };
export default function RootLayout({ children }) {
  return (
    <html lang="fr"><body className={`${sans.variable} ${mono.variable}`}>
      <Providers><Header />{children}</Providers>
    </body></html>
  );
}
