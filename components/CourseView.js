'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from './Providers';
import { COURSES, UI } from '../lib/data';

function runTests(code, tests) {
  return new Promise((resolve) => {
    const src = `onmessage=e=>{const {code,tests}=e.data;postMessage(tests.map(t=>{try{if(t.match)return new RegExp(t.match).test(code);const r=(0,eval)(code+'\\n;('+t.expr+')');return JSON.stringify(r)===JSON.stringify(t.expect)}catch(err){return false}}))}`;
    const w = new Worker(URL.createObjectURL(new Blob([src])));
    const stop = setTimeout(() => { w.terminate(); resolve(tests.map(() => false)); }, 2000);
    w.onmessage = (e) => { clearTimeout(stop); w.terminate(); resolve(e.data); };
    w.postMessage({ code, tests: tests.map(({ expr, expect, match }) => ({ expr, expect, match })) });
  });
}
const Rich = ({ text }) => text.split('`').map((p, k) => (k % 2 ? <code key={k}>{p}</code> : p));

export default function CourseView({ slug }) {
  const { t, done, markDone } = useApp();
  const course = COURSES.find((c) => c.slug === slug);
  const [i, setI] = useState(0);
  const [codes, setCodes] = useState({});
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(false);
  const lesson = course.lessons[i];
  const code = codes[lesson.id] ?? lesson.starter;
  useEffect(() => setRes(null), [i]);
  const all = course.lessons.every((l) => done[l.id]);
  const passed = res && res.every(Boolean);
  async function run() {
    setBusy(true);
    const r = await runTests(code, lesson.tests);
    setRes(r); setBusy(false);
    if (r.every(Boolean)) markDone(lesson.id);
  }
  function onKey(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const el = e.target;
    const s = el.selectionStart;
    setCodes({ ...codes, [lesson.id]: code.slice(0, s) + '  ' + code.slice(el.selectionEnd) });
    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 2; });
  }
  return (
    <main className="wrap lesson" style={{ '--c': course.color }}>
      <aside>
        <Link href="/courses/" className="back">← {t(UI.courses)}</Link>
        <h2>{t(course.title)}</h2>
        {course.lessons.map((l, k) => (
          <button key={l.id} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <span>{done[l.id] ? '✓' : k + 1}</span>{t(l.title)}
          </button>
        ))}
        {all && <Link className="btn" href={`/certificate/?c=${slug}`}>{t(UI.getCert)}</Link>}
      </aside>
      <section key={lesson.id} className="pane">
        <h1>{t(lesson.title)}</h1>
        <p className="lead"><Rich text={t(lesson.body)} /></p>
        <textarea spellCheck={false} value={code} onKeyDown={onKey} onChange={(e) => setCodes({ ...codes, [lesson.id]: e.target.value })} />
        <div className="row">
          <button className="btn" onClick={run} disabled={busy}>{busy ? t(UI.checking) : t(UI.check)}</button>
          {passed && i < course.lessons.length - 1 && <button className="btn alt" onClick={() => setI(i + 1)}>{t(UI.next)} →</button>}
          {passed && i === course.lessons.length - 1 && all && <Link className="btn alt" href={`/certificate/?c=${slug}`}>{t(UI.getCert)}</Link>}
        </div>
        <ul className="results">
          {lesson.tests.map((x, k) => <li key={k} className={res ? (res[k] ? 'pass' : 'fail') : ''}>{res ? (res[k] ? '✓' : '✗') : '○'} {t(x.label)}</li>)}
        </ul>
        {res && <p className={`msg ${passed ? 'ok' : ''}`}>{passed ? t(UI.allPass) : t(UI.somePass)}</p>}
      </section>
    </main>
  );
}
