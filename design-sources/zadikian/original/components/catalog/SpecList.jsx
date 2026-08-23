export function SpecList({ items = [] }) {
  return (
    <dl style={{ margin: 0, borderTop: '2px solid var(--rule-strong)' }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 'var(--space-5)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--rule)' }}>
          <dt style={{ fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)', paddingTop: '3px' }}>{it.label}</dt>
          <dd style={{ margin: 0, fontFamily: 'var(--font-serif-text)', fontSize: 'var(--text-body)', color: 'var(--text-display)' }}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
