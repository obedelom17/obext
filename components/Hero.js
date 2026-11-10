'use client';
import { useEffect, useState } from 'react';
const CODE = 'function double(n) {\n  return n * 2;\n}';
const TESTS = ['double(4) → 8', 'double(-3) → -6', 'double(0) → 0'];
export default function Hero() {
  const [n, setN] = useState(0);
  const [ok, setOk] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((x) => (x < CODE.length ? x + 1 : x)), 70);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (n < CODE.length) return;
    const id = setInterval(() => setOk((o) => (o < TESTS.length ? o + 1 : o)), 500);
    const reset = setTimeout(() => { setN(0); setOk(0); }, 6000);
    return () => { clearInterval(id); clearTimeout(reset); };
  }, [n]);
  return (
    <div className="editor" aria-hidden="true">
      <div className="bar"><i /><i /><i /><b>double.js</b></div>
      <pre>{CODE.slice(0, n)}<span className="caret" /></pre>
      <ul>{TESTS.map((x, i) => <li key={x} className={i < ok ? 'pass' : ''}>{i < ok ? '✓' : '○'} {x}</li>)}</ul>
    </div>
  );
}
