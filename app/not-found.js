import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="page nf">
      <div className="nf-big" aria-hidden="true">4<span className="blk" />4</div>
      <h1>Page introuvable <small>Page not found</small></h1>
      <Link className="btn" href="/">← Accueil / Home</Link>
    </main>
  );
}
