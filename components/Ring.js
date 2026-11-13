export default function Ring({ value, size = 64, color = 'var(--pri)' }) {
  const r = size / 2 - 5, c = 2 * Math.PI * r;
  return (
    <svg className="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${Math.round(value * 100)}%`}>
      <circle cx={size / 2} cy={size / 2} r={r} className="rb" />
      <circle cx={size / 2} cy={size / 2} r={r} className="rf" stroke={color} strokeDasharray={c} strokeDashoffset={c * (1 - value)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{Math.round(value * 100)}%</text>
    </svg>
  );
}
