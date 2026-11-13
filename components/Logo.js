export default function Logo({ size = 30 }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="13" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="5" />
      <rect className="caret" x="25.5" y="5" width="4.5" height="22" fill="var(--signal)" />
    </svg>
  );
}
