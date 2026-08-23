export function Folio({ left, center, right }) {
  const meta = { fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)' };
  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--rule)', paddingTop: 'var(--space-3)', gap: 'var(--space-5)' }}>
      <span style={meta}>{left}</span>
      <span style={{ ...meta, textAlign: 'center' }}>{center}</span>
      <span style={{ ...meta, color: 'var(--text-display)' }}>{right}</span>
    </footer>
  );
}
