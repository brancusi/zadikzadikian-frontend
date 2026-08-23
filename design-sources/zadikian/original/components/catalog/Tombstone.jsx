export function Tombstone({ title, year, medium, dimensions, edition, catalogNo, align = 'left' }) {
  return (
    <div style={{ textAlign: align, maxWidth: '48ch' }}>
      <div style={{ fontFamily: 'var(--font-serif-text)', fontSize: 'var(--text-body)', color: 'var(--text-display)' }}>
        <em>{title}</em>{year ? `, ${year}` : ''}
      </div>
      <div style={{ marginTop: 'var(--space-2)', fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-meta)', lineHeight: 'var(--leading-meta)', color: 'var(--text-meta)' }}>
        {medium && <div>{medium}</div>}
        {dimensions && <div>{dimensions}</div>}
        {edition && <div>{edition}</div>}
        {catalogNo && <div style={{ marginTop: 'var(--space-2)', letterSpacing: 'var(--tracking-caption)', color: 'var(--text-display)' }}>{catalogNo}</div>}
      </div>
    </div>
  );
}
