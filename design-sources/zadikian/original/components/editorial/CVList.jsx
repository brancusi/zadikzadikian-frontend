export function CVList({ heading, entries = [] }) {
  return (
    <section>
      {heading && <h3 style={{ fontFamily: 'var(--font-grotesque)', fontWeight: 400, fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)', margin: '0 0 var(--space-4)', borderBottom: '2px solid var(--rule-strong)', paddingBottom: 'var(--space-2)' }}>{heading}</h3>}
      <div>
        {entries.map((e, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 'var(--space-5)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--rule)' }}>
            <span style={{ fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-meta)', color: 'var(--text-meta)', paddingTop: '2px' }}>{e.year}</span>
            <span style={{ fontFamily: 'var(--font-serif-text)', fontSize: 'var(--text-body)', lineHeight: 1.45, color: 'var(--text-display)' }}>{e.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
