'use client';
import { useEffect, useRef, useState } from 'react';
// Compteur à rouleaux : chaque chiffre défile jusqu’à sa valeur.
export default function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const digits = String(to).split('');
  return (
    <span ref={ref} className="odo" role="text" aria-label={`${to}${suffix}`}>
      {digits.map((d, i) => (
        <span key={i} className="od" aria-hidden="true">
          <span className="strip" style={{ '--n': on ? Number(d) + 10 : 0, '--i': digits.length - i }}>
            {Array.from({ length: 20 }, (_, k) => <span key={k}>{k % 10}</span>)}
          </span>
        </span>
      ))}
      {suffix}
    </span>
  );
}
