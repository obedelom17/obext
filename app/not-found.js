import Link from 'next/link';
export default function NotFound() {
  return <main className="wrap"><h1>404</h1><p className="lead">Page introuvable · Page not found</p><Link className="btn" href="/">←</Link></main>;
}
