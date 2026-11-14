export default function Ring({ value, size = 64, color = 'var(--pri)', mini = false }) {
  const sw = mini ? 3.5 : 5, r = size / 2 - sw, c = 2 * Math.PI * r;
  return (
    <svg className={`ring${mini ? ' mini' : ''}`} width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${Math.round(value * 100)}%`}>
      <circle cx={size / 2} cy={size / 2} r={r} className="rb" strokeWidth={sw} />
      <circle cx={size / 2} cy={size / 2} r={r} className="rf" strokeWidth={sw} stroke={color} strokeDasharray={c} strokeDashoffset={c * (1 - value)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      {!mini && <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{Math.round(value * 100)}%</text>}
    </svg>
  );
}
