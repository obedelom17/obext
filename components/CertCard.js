import { SITE_NAME, UI } from '../lib/data';
import { X } from '../lib/ux';

// Carte du certificat : utilisée pour le vrai certificat et pour l’exemple.
export default function CertCard({ t, lang, color, name, courseTitle, date, id, url, sample = false }) {
  const label = `${SITE_NAME} · ${SITE_NAME} · ${SITE_NAME} · ${SITE_NAME} · `;
  return (
    <div className={`cert${sample ? ' sample' : ''}`} style={{ '--c': color }}>
      {sample && <span className="stamp" aria-hidden="true">{t(X.sampleStamp)}</span>}
      <div className="seal" aria-hidden="true">
        <svg viewBox="0 0 120 120"><defs><path id={sample ? 'cps' : 'cp'} d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs><text><textPath href={sample ? "#cps" : "#cp"} textLength="272" lengthAdjust="spacing">{label}</textPath></text><circle cx="60" cy="60" r="28" /><path d="m47 61 9 9 18-20" /></svg>
      </div>
      <small>{t(X.signedBy)} {SITE_NAME}</small>
      <h1>{t(UI.certOf)}</h1>
      <h2>{name}</h2>
      <p>{t(UI.certText)}</p>
      <h3>{courseTitle}</h3>
      <footer><span>{date}</span><span>ID {id}</span></footer>
      <small>{t(UI.verifyUrl)} : {url}</small>
    </div>
  );
}
