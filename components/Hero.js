'use client';
import { useEffect, useState } from 'react';
import { highlight } from '../lib/highlight';
const S = [
  { tab: 'JavaScript', file: 'groupBy.js', code: 'function groupBy(arr, fn) {\n  return arr.reduce((acc, x) => {\n    const k = fn(x);\n    (acc[k] ||= []).push(x);\n    return acc;\n  }, {});\n}', tests: ['groupBy([1,2,3,4], parity)', 'groupBy([], id) → {}', 'entrée non modifiée'] },
  { tab: 'React', file: 'Counter.jsx', code: 'function Counter() {\n  const [n, setN] = useState(0);\n  return (\n    <button onClick={() => setN(n + 1)}>\n      {n}\n    </button>\n  );\n}', tests: ['affiche 0 au départ', 'le clic passe à 1', 'useState est utilisé'] },
  { tab: 'Next.js', file: 'route.js', code: 'export async function GET(request) {\n  const q = new URL(request.url)\n    .searchParams.get("q");\n  return Response.json({ q });\n}', tests: ['?q=hi → { q: "hi" }', 'répond en JSON', 'route valide'] },
];
export default function Hero() {
  const [s, setS] = useState(0);
  const [n, setN] = useState(0);
  const [ok, setOk] = useState(0);
  const cur = S[s];
  useEffect(() => {
    if (n >= cur.code.length) return;
    const id = setTimeout(() => setN(n + 1), n === 0 ? 500 : 24);
    return () => clearTimeout(id);
  }, [n, s]);
  useEffect(() => {
    if (n < cur.code.length) return;
    const id = setTimeout(() => { if (ok < cur.tests.length) setOk(ok + 1); else { setS((s + 1) % S.length); setN(0); setOk(0); } }, ok < cur.tests.length ? 450 : 2800);
    return () => clearTimeout(id);
  }, [n, ok, s]);
  const typed = cur.code.slice(0, n);
  return (
    <div className="term" aria-hidden="true">
      <div className="tabs"><i /><i /><i />
        {S.map((x, i) => <button key={x.tab} className={i === s ? 'on' : ''} onClick={() => { setS(i); setN(0); setOk(0); }}>{x.file}</button>)}
      </div>
      <div className="body">
        <div className="ln">{typed.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}</div>
        <pre><span dangerouslySetInnerHTML={{ __html: highlight(typed) }} /><span className="caret" /></pre>
      </div>
      <ul>{cur.tests.map((x, i) => <li key={x} className={n >= cur.code.length && i < ok ? 'pass' : ''}>{n >= cur.code.length && i < ok ? '✓' : '○'} {x}</li>)}</ul>
    </div>
  );
}
