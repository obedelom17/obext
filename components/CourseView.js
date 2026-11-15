'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from './Providers';
import { COURSES, UI, SOL, EXAMS, isReady } from '../lib/data';
import Editor from './Editor';
import Ring from './Ring';
import { X } from '../lib/ux';
import { GUIDE, INTRO } from '../lib/guide';
import { SOURCES } from '../lib/guide/links';
import { NODE_SHIM, nodePrepare } from '../lib/node-shim';
import { highlight } from '../lib/highlight';

const strip = (c) => c.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
const js = (v) => JSON.stringify(v).replace(/</g, '\\u003c');
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/';

const WORKER_SRC = 'onmessage=async e=>{const {code,clean,tests,pre}=e.data;const out=[];const canon=v=>JSON.stringify(v,(k,x)=>x&&typeof x==="object"&&!Array.isArray(x)?Object.keys(x).sort().reduce((o,k)=>(o[k]=x[k],o),{}):x);for(const t of tests){try{if(t.match){out.push(new RegExp(t.match).test(clean));continue}const r=await (0,eval)(pre+code.replace(/^\\s*export\\s+(default\\s+)?/gm,"")+"\\n;("+t.expr+")");out.push(canon(r)===canon(t.expect))}catch(err){out.push(false)}}postMessage(out)}';

// Les tests tournent l’un après l’autre (les leçons Node partagent un système de fichiers simulé).
function runJS(code, tests, lesson = {}) {
  return new Promise((resolve) => {
    const node = !!lesson.node;
    const pre = node ? `globalThis.__VFS=${js(lesson.vfs || {})};\n${NODE_SHIM}\n` : '';
    const w = new Worker(URL.createObjectURL(new Blob([WORKER_SRC])));
    const stop = setTimeout(() => { w.terminate(); resolve(tests.map(() => false)); }, 5000);
    w.onmessage = (e) => { clearTimeout(stop); w.terminate(); resolve(e.data); };
    w.postMessage({ code: node ? nodePrepare(code) : code, clean: strip(code), pre, tests: tests.map(({ expr, expect, match }) => ({ expr, expect, match })) });
  });
}

function runReact(code, lesson) {
  return new Promise((resolve) => {
    const id = Math.random().toString(36).slice(2);
    const src = code.replace(/^\s*import[^\n]*$/gm, '').replace(/export\s+default\s+/, '');
    const tests = lesson.tests.map(({ dom, expect, pre, match }) => ({ dom, expect, pre, match }));
    const html = `<div id="r"></div><script src="${CDN}react/18.3.1/umd/react.production.min.js"></script><script src="${CDN}react-dom/18.3.1/umd/react-dom.production.min.js"></script><script src="${CDN}babel-standalone/7.24.7/babel.min.js"></script><script>
const {useState,useEffect,useRef,useReducer,useMemo,useCallback,createContext,useContext,useId,memo,Fragment,useLayoutEffect}=React;const Link=({href,children,...r})=>React.createElement('a',{href,...r},children);const Image=(p)=>React.createElement('img',{src:p.src,alt:p.alt});const usePathname=()=>'/courses';const useRouter=()=>({push(){}});const sleep=ms=>new Promise(r=>setTimeout(r,ms));
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
// Serveur simulé pour les leçons fetch : le navigateur n’a pas de vrai serveur ici, mais fetch() renvoie de vraies Response.
const FETCH_MOCK = `<script>(function(){const F={'verse1.txt':'Premier couplet : la mer est calme.','verse2.txt':'Deuxième couplet : le vent se lève.','products.json':JSON.stringify([{name:'Haricots',price:1.5},{name:'Maïs',price:1.2}])};window.fetch=async(url)=>{await new Promise((r)=>setTimeout(r,5));const k=String(url).replace(/^\\.?\\//,'');if(Object.prototype.hasOwnProperty.call(F,k))return new Response(F[k],{status:200,headers:{'Content-Type':k.endsWith('.json')?'application/json':'text/plain'}});return new Response('Not found',{status:404,statusText:'Not Found'})}})()</script>`;
const prep = (code, lesson) => (lesson.mockFetch ? FETCH_MOCK + code : code);
function runHTML(code, lesson) {
  return new Promise((resolve) => {
    const id = Math.random().toString(36).slice(2);
    const tests = lesson.tests.map(({ dom, expect, match, pre }) => ({ dom, expect, match, pre }));
    const html = prep(code, lesson) + `<script>addEventListener('load',async()=>{const T=${js(tests)};const sl=(ms)=>new Promise((r)=>setTimeout(r,ms));const out=[];for(const t of T){let ok=false;try{if(t.match){ok=new RegExp(t.match,'i').test(${js(code)})}else{if(t.pre){for(const p of [].concat(t.pre)){eval(p);await sl(40)}}ok=JSON.stringify(eval(t.dom))===JSON.stringify(t.expect)}}catch(e){ok=false}out.push(ok)}parent.postMessage({id:${js(id)},out},'*')})</script>`;
    const f = document.createElement('iframe');
    f.sandbox = 'allow-scripts'; f.style.cssText = 'position:fixed;left:-9999px;top:0;width:800px;height:600px;border:0'; f.srcdoc = html;
    const fin = (out) => { window.removeEventListener('message', h); clearTimeout(to); f.remove(); resolve(out); };
    const h = (e) => { if (e.data && e.data.id === id) fin(e.data.out); };
    const to = setTimeout(() => fin(lesson.tests.map(() => false)), 6000);
    window.addEventListener('message', h);
    document.body.appendChild(f);
  });
}
// Gras (**…**) et code (`…`) peuvent s’imbriquer : on lit le texte d’un seul trait.
const Rich = ({ text }) => {
  let bold = false;
  return text.split(/(`[^`]*`|\*\*)/).filter(Boolean).map((p, k) => {
    if (p === '**') { bold = !bold; return null; }
    const node = p.length > 1 && p[0] === '`' && p.endsWith('`') ? <code key={k}>{p.slice(1, -1)}</code> : p;
    return bold ? <strong key={k}>{node}</strong> : node;
  });
};

function Example({ code, t }) {
  const [ok, setOk] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(code); setOk(true); setTimeout(() => setOk(false), 1600); } catch {} };
  return (
    <figure className="exm">
      <figcaption><span>{t(X.exH)}</span><button className="linkish" onClick={copy}>{ok ? t(X.copied) : t(X.copy)}</button></figcaption>
      <pre><code dangerouslySetInnerHTML={{ __html: highlight(code) }} /></pre>
    </figure>
  );
}

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
  const checkRef = useRef(null);
  const G = GUIDE[course.lessons[i].id];
  const lesson = course.lessons[i];
  const code = codes[lesson.id] ?? lesson.starter;
  const exm = EXAMS[slug];
  const lessonsDone = course.lessons.every((l) => done[l.id]);
  const ready = isReady(course, done);
  const passed = res && res.every(Boolean);
  const failed = tries[lesson.id] || 0;
  useEffect(() => { setRes(null); setShowSol(false); }, [i]);
  useEffect(() => {
    if (!loaded) return;
    const want = window.__oxGoto || location.hash.slice(1); window.__oxGoto = null;
    const g = course.lessons.findIndex((l) => l.id === want);
    if (g >= 0) { setExam(false); setI(g); return; }
    const k = course.lessons.findIndex((l) => !done[l.id]); setI(k < 0 ? 0 : k);
  }, [loaded]);
  useEffect(() => {
    const go = (e) => { const g = course.lessons.findIndex((l) => l.id === e.detail); if (g >= 0) { setExam(false); setI(g); window.__oxGoto = null; } };
    addEventListener('ox:goto', go); return () => removeEventListener('ox:goto', go);
  }, [slug]);
  useEffect(() => { try { setCodes(JSON.parse(localStorage.getItem('ox-code') || '{}')); } catch {} }, []);
  useEffect(() => { if (Object.keys(codes).length) try { localStorage.setItem('ox-code', JSON.stringify(codes)); } catch {} }, [codes]);
  async function run() {
    setBusy(true);
    const r = lesson.html ? await runHTML(code, lesson) : lesson.react ? await runReact(code, lesson) : await runJS(code, lesson.tests, lesson);
    setRes(r); setBusy(false);
    if (r.every(Boolean)) {
      markDone(lesson.id);
      const b = checkRef.current && checkRef.current.getBoundingClientRect();
      dispatchEvent(new CustomEvent('ox:burst', { detail: { x: b ? b.left + b.width / 2 : innerWidth / 2, y: b ? b.top : innerHeight / 2, power: 1 } }));
    }
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
    if (r.data.passed) { markDone('exam-' + slug); dispatchEvent(new CustomEvent('ox:burst', { detail: { x: innerWidth / 2, y: innerHeight * 0.6, power: 2 } })); }
  }
  if (!loaded) return <main className="page" aria-busy="true" />;
  if (!user) {
    const it = INTRO[slug];
    return (
      <main className="page gate" style={{ '--c': course.color }}>
        <Link href="/courses/" className="back">← {t(UI.courses)}</Link>
        <div className="gate-box">
          <i className="tile" aria-hidden="true">{course.icon}</i>
          <h1>{t(course.title)}</h1>
          <p className="lead">{t(course.desc)}</p>
          {it && <ul className="gate-list">{t(it.learn).map((x) => <li key={x}>{x}</li>)}</ul>}
          <div className="gate-cta">
            <h2>{t(X.gateTitle)}</h2>
            <p>{t(X.gateText)}</p>
            <div className="row"><Link className="btn" href="/account/">{t(X.createAcc)}</Link><Link className="btn ghost" href="/certificate/exemple/">{t(X.seeSample)}</Link></div>
          </div>
        </div>
      </main>
    );
  }
  const cert = `/certificate/?c=${slug}`;
  const nDone = course.lessons.filter((l) => done[l.id]).length;
  const file = lesson.html ? 'index.html' : lesson.react ? 'App.jsx' : lesson.node ? 'index.js' : 'solution.js';
  const nPass = res ? res.filter(Boolean).length : 0;
  const answered = exm ? Object.keys(ans).length : 0;
  return (
    <main className="page lesson" style={{ '--c': course.color }}>
      <aside>
        <Link href="/courses/" className="back">← {t(UI.courses)}</Link>
        <div className="aside-h"><Ring value={nDone / course.lessons.length} size={64} color="var(--c)" /><h2>{t(course.title)}</h2></div>
        <div className="steps">
          {course.lessons.map((l, k) => (
            <button key={l.id} className={!exam && k === i ? 'on' : ''} onClick={() => { setExam(false); setI(k); }}>
              <span className={done[l.id] ? 'ok' : ''}>{done[l.id] ? '✓' : k + 1}</span>{t(l.title)}
            </button>
          ))}
          {exm && lessonsDone && <button className={`${exam ? 'on' : ''}${done['exam-' + slug] ? '' : ' pulse'}`} onClick={() => setExam(true)}><span className={done['exam-' + slug] ? 'ok' : ''}>{done['exam-' + slug] ? '✓' : '★'}</span>{t(UI.exam)}</button>}
        </div>
        {ready && <Link className="btn" href={cert}>{t(UI.getCert)}</Link>}
      </aside>
      {exam ? (
        <section className="pane">
          <h1>{t(UI.exam)}</h1>
          <div className="prog" aria-hidden="true"><i style={{ width: `${(answered / exm.length) * 100}%` }} /></div>
          <p className="hint">{answered}/{exm.length} {t(X.answered)}</p>
          {exm.map((q, k) => (
            <div key={k} className="q"><p><b>{k + 1}. {t(q.q)}</b></p>
              {q.o.map((o, j) => <label key={j} className={ans[k] === j ? 'sel' : ''}><input type="radio" name={'q' + k} checked={ans[k] === j} onChange={() => setAns({ ...ans, [k]: j })} /><span className="rd" /> {t(o)}</label>)}
            </div>
          ))}
          <div className="row"><button className="btn" onClick={submitExam}>{t(UI.submit)}</button>{er && er.passed && <Link className="btn alt" href={cert}>{t(UI.getCert)}</Link>}{!user && <Link className="btn alt" href="/account/">{t(UI.login)}</Link>}</div>
          {err && <p className="msg shake">{err}</p>}
          {er && <p className={`msg ${er.passed ? 'ok' : ''}`}>{er.score}/{er.total} — {er.passed ? t(UI.examOk) : t(UI.examKo)}</p>}
        </section>
      ) : (
        <section key={lesson.id} className="pane">
          <div className="kick">{t(UI.lesson)} {i + 1} / {course.lessons.length}</div>
          <h1>{t(lesson.title)}</h1>
          {i === 0 && INTRO[slug] && (
            <section className="intro">
              <div><span className="lbl">{t(X.goalH)}</span><p>{t(INTRO[slug].goal)}</p></div>
              <div className="meta"><span><b>{t(X.timeH)}</b> {t(INTRO[slug].time)}</span><span><b>{t(X.needH)}</b> {t(INTRO[slug].need)}</span>{SOURCES[slug] && <span><b>{t(X.docH)}</b> <a className="u" href={SOURCES[slug].url} target="_blank" rel="noopener noreferrer">{SOURCES[slug].name}</a></span>}</div>
              <div><span className="lbl">{t(X.willLearn)}</span><ul>{t(INTRO[slug].learn).map((x) => <li key={x}>{x}</li>)}</ul></div>
            </section>
          )}
          {G && (
            <section className="guide">
              <h2 className="gh"><i>1</i>{t(X.learnH)}</h2>
              <p className="gp"><Rich text={t(G.learn)} /></p>
              <Example code={G.ex} t={t} />
              {G.doc && <a className="doclink" href={G.doc} target="_blank" rel="noopener noreferrer"><span>{t(X.docH)}</span><b>{(SOURCES[slug] || {}).name}</b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg></a>}
              <h2 className="gh"><i>2</i>{t(X.stepsH)}</h2>
              <ol className="gsteps">{t(G.steps).map((x, k) => <li key={k}><Rich text={x} /></li>)}</ol>
              <p className="tipbox"><b>{t(X.tipH)}</b> <Rich text={t(G.tip)} /></p>
              <h2 className="gh"><i>3</i>{t(X.yourTurn)}</h2>
            </section>
          )}
          {lesson.node && <p className="nodenote">{t(X.nodeNote)}</p>}
          <p className="task"><span className="lbl">{t(X.taskH)}</span><Rich text={t(lesson.body)} /></p>
          <div className={`ed-wrap${passed ? ' won' : ''}`}>
            <div className="ed-bar"><span className="file">{file}</span><button className="linkish" onClick={() => setCodes({ ...codes, [lesson.id]: lesson.starter })}>{t(X.reset)}</button></div>
            <Editor value={code} onKeyDown={onKey} onChange={(e) => setCodes({ ...codes, [lesson.id]: e.target.value })} />
          </div>
          {lesson.html && <div className="pv"><span className="lbl">{t(X.preview)}</span><iframe className="preview" title="preview" sandbox="allow-scripts" srcDoc={prep(code, lesson)} /></div>}
          <div className="row">
            <button ref={checkRef} className={`btn${busy ? ' busy' : ''}`} onClick={run} disabled={busy}>{busy ? t(UI.checking) : t(UI.check)}</button>
            <span className="kh">{t(X.runHint)}</span>
            {passed && i < course.lessons.length - 1 && <button className="btn alt pop" onClick={() => setI(i + 1)}>{t(UI.next)} →</button>}
            {passed && i === course.lessons.length - 1 && (exm && lessonsDone ? <button className="btn alt pop" onClick={() => setExam(true)}>{t(UI.exam)} →</button> : ready && <Link className="btn alt pop" href={cert}>{t(UI.getCert)}</Link>)}
          </div>
          <span className="lbl">{t(X.checksH)}</span>
          <ul className="results">
            {lesson.tests.map((x, k) => <li key={k + ':' + (res ? 'r' : 'i')} style={{ '--i': k }} className={res ? (res[k] ? 'pass' : 'fail') : ''}>{res ? (res[k] ? '✓' : '✗') : '○'} {t(x.label)}</li>)}
          </ul>
          {res && <p className={`msg ${passed ? 'ok win' : 'shake'}`} key={tries[lesson.id] + ':' + nPass}>{passed ? <><svg className="tick" width="22" height="22" viewBox="0 0 52 52" aria-hidden="true"><path d="m12 27 9 9 19-20" /></svg>{t(X.lessonDone)} · {t(UI.allPass)}</> : `${nPass}/${res.length} ${t(X.passedN)} · ${t(UI.somePass)}`}</p>}
          {!passed && SOL[lesson.id] && (failed >= 2
            ? <div><button className="btn alt" onClick={() => setShowSol(!showSol)}>{t(UI.sol)}</button>{showSol && <pre className="sol">{SOL[lesson.id]}</pre>}</div>
            : <p className="hint">{t(UI.solHint)}</p>)}
          <div className="nav2">
            <button className="linkish" disabled={i === 0} onClick={() => setI(i - 1)}>← {t(X.prev)}</button>
            {i < course.lessons.length - 1 && <button className="linkish" onClick={() => setI(i + 1)}>{t(X.nextL)} →</button>}
          </div>
        </section>
      )}
    </main>
  );
}
