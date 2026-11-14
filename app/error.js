'use client';
export default function Error({ error, reset }) {
  return (
    <main className="page errp">
      <h1>Oups. / Oops.</h1>
      <p className="lead">Une erreur est survenue. Réessaie, ou recharge la page. / Something went wrong. Try again or reload.</p>
      <button className="btn" onClick={reset}>Réessayer / Retry</button>
    </main>
  );
}
