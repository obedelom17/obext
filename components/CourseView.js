'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from './Providers';
import { COURSES, UI, SOL, EXAMS, isReady } from '../lib/data';
import Editor from './Editor';

const strip = (c) => c.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
const js = (v) => JSON.stringify(v).replace(/</g, '\\u003c');
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/';

function runJS(code, tests) {
  return new Promise((resolve) => {
    const src = `onmessage=async e=>{const {code,clean,tests}=e.data;postMessage(await Promise.all(tests.map(async t=>{try{if(t.match)return new RegExp(t.match).test(clean);const r=await (0,eval)(code.replace(/^\\s*export\\s+(default\\s+)?/gm,'')+'\\n;('+t.expr+')');return JSON.stringify(r)===JSON.stringify(t.expect)}catch(err){return false}})))}`;
    const w = new Worker(URL.createObjectURL(new Blob([src])));
    const stop = setTimeout(() => { w.terminate(); resolve(tests.map(() => false)); }, 2500);
    w.onmessage = (e) => { clearTimeout(stop); w.terminate(); resolve(e.data); };
    w.postMessage({ code, clean: strip(code), tests: tests.map(({ expr, expect, match }) => ({ expr, expect, match })) });
  });
}

function runReact(code, lesson) {
  return new Promise((resolve) => {
    const id = Math.random().toString(36).slice(2);
    const src = code.replace(/^\s*import[^\n]*$/gm, '').replace(/export\s+default\s+/, '');
    const tests = lesson.tests.map(({ dom, expect, pre, match }) => ({ dom, expect, pre, match }));
    const html = `<div id="r"></div><script src="${CDN}react/18.3.1/umd/react.production.min.js"></script><script src="${CDN}react-dom/18.3.1/umd/react-dom.production.min.js"></script><script src="${CDN}babel-standalone/7.24.7/babel.min.js"></script><script>
const {useState,useEffect,useRef,useReducer,useMemo,useCallback,createContext,useContext}=React;const Link=({href,children,...r})=>React.createElement('a',{href,...r},children);const Image=(p)=>React.createElement('img',{src:p.src,alt:p.alt});const usePathname=()=>'/courses';const useRouter=()=>({push(){}});const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const T=${js(tests)},out=T.map(()=>false);try{
const C=(0,eval)(Babel.transform(${js(src)}+'\\n;${lesson.component}',{presets:['react']}).code);
ReactDOM.createRoot(document.getElementById('r')).render(React.createElement(C,${js(lesson.props || {})}));await sleep(80);
for(let i=0;i<T.length;i++){const t=T[i];try{if(t.match){out[i]=new RegExp(t.match).test(${js(strip(code))})}else{if(t.pre){for(const p of [].concat(t.pre)){eval(p);await sleep(60)}}out[i]=JSON.stringify(eval(t.dom))===JSON.stringify(t.expect)}}catch(e){}}
}catch(e){}parent.postMessage({id:${js(id)},out},'*')})()</script>`;
    const f = document.createElement('iframe');
    f.sandbox = 'allow-scripts'; f.style.display = 'none'; f.srcdoc = html;
    const fin = (out) => { window.removeEventListener('message', h); clearTimeout(to); f.remove(); resolve(out); };
    const h = (e) => { if (e.data && e.data.id === id) fin(e.data.out); };
    const to = setTimeout(() => fin(lesson.tests.map(() => false)), 10000);
    window.addEventListener('message', h);
    document.body.appendChild(f);
  });
}
function runHTML(code, lesson) {
  return new Promise((resolve) => {
    const id = Math.random().toString(36).slice(2);
    const tests = lesson.tests.map(({ dom, expect, match }) => ({ dom, expect, match }));
    const html = code + `<script>addEventListener('load',()=>{const T=${js(tests)};const out=T.map(t=>{try{if(t.match)return new RegExp(t.match,'i').test(${js(code)});return JSON.stringify(eval(t.dom))===JSON.stringify(t.expect)}catch(e){return false}});parent.postMessage({id:${js(id)},out},'*')})</script>`;
    const f = document.createElement('iframe');
    f.sandbox = 'allow-scripts'; f.style.cssText = 'position:fixed;left:-9999px;top:0;width:800px;height:600px;border:0'; f.srcdoc = html;
    const fin = (out) => { window.removeEventListener('message', h); clearTimeout(to); f.remove(); resolve(out); };
    const h = (e) => { if (e.data && e.data.id === id) fin(e.data.out); };
    const to = setTimeout(() => fin(lesson.tests.map(() => false)), 6000);
    window.addEventListener('message', h);
    document.body.appendChild(f);
  });
}
const Rich = ({ text }) => text.split('`').map((p, k) => (k % 2 ? <code key={k}>{p}</code> : p));

export default function CourseView({ slug }) {
  const { t, done, markDone, user, api, ready: loaded } = useApp();
  const course = COURSES.find((c) => c.slug === slug);
  const [i, setI] = useState(0);
  const [codes, setCodes] = useState({});
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(false);
  const [tries, setTries] = useState({});
  const [showSol, setShowSol] = useState(false);
  const [exam, setExam] = useState(false);
  const [ans, setAns] = useState({});
  const [er, setEr] = useState(null);
  const [err, setErr] = useState('');
  const lesson = course.lessons[i];
  const code = codes[lesson.id] ?? lesson.starter;
  const exm = EXAMS[slug];
  const lessonsDone = course.lessons.every((l) => done[l.id]);
  const ready = isReady(course, done);
  const passed = res && res.every(Boolean);
  const failed = tries[lesson.id] || 0;
  useEffect(() => { setRes(null); setShowSol(false); }, [i]);
  useEffect(() => { if (!loaded) return; const k = course.lessons.findIndex((l) => !done[l.id]); setI(k < 0 ? 0 : k); }, [loaded]);
  useEffect(() => { try { setCodes(JSON.parse(localStorage.getItem('ox-code') || '{}')); } catch {} }, []);
  useEffect(() => { if (Object.keys(codes).length) try { localStorage.setItem('ox-code', JSON.stringify(codes)); } catch {} }, [codes]);
  async function run() {
    setBusy(true);
    const r = lesson.html ? await runHTML(code, lesson) : lesson.react ? await runReact(code, lesson) : await runJS(code, lesson.tests);
    setRes(r); setBusy(false);
    if (r.every(Boolean)) markDone(lesson.id);
    else setTries((x) => ({ ...x, [lesson.id]: (x[lesson.id] || 0) + 1 }));
  }
  function onKey(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); return; }
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const el = e.target; const s = el.selectionStart;
    setCodes({ ...codes, [lesson.id]: code.slice(0, s) + '  ' + code.slice(el.selectionEnd) });
    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 2; });
  }
  async function submitExam() {
    setErr('');
    if (!user) return setErr(t(UI.loginReq));
    const r = await api('exam', { course: slug, answers: exm.map((q, k) => ans[k] ?? -1) });
    if (!r.ok) return setErr(t(UI.syncErr));
    setEr(r.data);
    if (r.data.passed) markDone('exam-' + slug);
  }
  const cert = `/certificate/?c=${slug}`;
  return (
    <main className="page lesson" style={{ '--c': course.color }}>
      <aside>
        <Link href="/courses/" className="back">← {t(UI.courses)}</Link>
        <h2>{t(course.title)}</h2>
        <div className="prog"><i style={{ width: `${(course.lessons.filter((l) => done[l.id]).length / course.lessons.length) * 100}%` }} /></div>
        {course.lessons.map((l, k) => (
          <button key={l.id} className={!exam && k === i ? 'on' : ''} onClick={() => { setExam(false); setI(k); }}>
            <span className={done[l.id] ? 'ok' : ''}>{done[l.id] ? '✓' : k + 1}</span>{t(l.title)}
          </button>
        ))}
        {exm && lessonsDone && <button className={exam ? 'on' : ''} onClick={() => setExam(true)}><span>{done['exam-' + slug] ? '✓' : '★'}</span>{t(UI.exam)}</button>}
        {ready && <Link className="btn" href={cert}>{t(UI.getCert)}</Link>}
      </aside>
      {exam ? (
        <section className="pane">
          <h1>{t(UI.exam)}</h1>
          {exm.map((q, k) => (
            <div key={k} className="q"><p><b>{k + 1}. {t(q.q)}</b></p>
              {q.o.map((o, j) => <label key={j}><input type="radio" name={'q' + k} checked={ans[k] === j} onChange={() => setAns({ ...ans, [k]: j })} /> {t(o)}</label>)}
            </div>
          ))}
          <div className="row"><button className="btn" onClick={submitExam}>{t(UI.submit)}</button>{er && er.passed && <Link className="btn alt" href={cert}>{t(UI.getCert)}</Link>}{!user && <Link className="btn alt" href="/account/">{t(UI.login)}</Link>}</div>
          {err && <p className="msg">{err}</p>}
          {er && <p className={`msg ${er.passed ? 'ok' : ''}`}>{er.score}/{er.total} — {er.passed ? t(UI.examOk) : t(UI.examKo)}</p>}
        </section>
      ) : (
        <section key={lesson.id} className="pane">
          <div className="kick">{t(UI.lesson)} {String(i + 1).padStart(2, '0')} / {String(course.lessons.length).padStart(2, '0')}</div>
          <h1>{t(lesson.title)}</h1>
          <p className="lead"><Rich text={t(lesson.body)} /></p>
          <Editor value={code} onKeyDown={onKey} onChange={(e) => setCodes({ ...codes, [lesson.id]: e.target.value })} />
          {lesson.html && <iframe className="preview" title="preview" sandbox="allow-scripts" srcDoc={code} />}
          <div className="row">
            <button className="btn" onClick={run} disabled={busy}>{busy ? t(UI.checking) : t(UI.check)}</button>
            {passed && i < course.lessons.length - 1 && <button className="btn alt" onClick={() => setI(i + 1)}>{t(UI.next)} →</button>}
            {passed && i === course.lessons.length - 1 && (exm && lessonsDone ? <button className="btn alt" onClick={() => setExam(true)}>{t(UI.exam)} →</button> : ready && <Link className="btn alt" href={cert}>{t(UI.getCert)}</Link>)}
          </div>
          <ul className="results">
            {lesson.tests.map((x, k) => <li key={k} className={res ? (res[k] ? 'pass' : 'fail') : ''}>{res ? (res[k] ? '✓' : '✗') : '○'} {t(x.label)}</li>)}
          </ul>
          {res && <p className={`msg ${passed ? 'ok' : ''}`}>{passed ? t(UI.allPass) : t(UI.somePass)}</p>}
          {!passed && SOL[lesson.id] && (failed >= 2
            ? <div><button className="btn alt" onClick={() => setShowSol(!showSol)}>{t(UI.sol)}</button>{showSol && <pre className="sol">{SOL[lesson.id]}</pre>}</div>
            : <p className="hint">{t(UI.solHint)}</p>)}
        </section>
      )}
    </main>
  );
}
