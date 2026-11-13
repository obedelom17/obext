'use client';
import { useRef } from 'react';
import { highlight } from '../lib/highlight';
export default function Editor({ value, onChange, onKeyDown }) {
  const pre = useRef(null);
  const lines = value.split('\n').length;
  const h = `calc(${Math.max(lines, 9)} * 1.7em + 2rem)`;
  return (
    <div className="ed">
      <div className="gut" aria-hidden="true">{Array.from({ length: Math.max(lines, 9) }, (_, i) => <i key={i}>{i + 1}</i>)}</div>
      <div className="stack" style={{ height: h }}>
        <pre ref={pre} aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlight(value) + '\n' }} />
        <textarea style={{ height: h }} wrap="off" spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-label="code" value={value} onChange={onChange} onKeyDown={onKeyDown} onScroll={(e) => { pre.current.scrollLeft = e.target.scrollLeft; }} />
      </div>
    </div>
  );
}
