export function PressItem({ quote, publication, author, year }) {
  return (
    <article style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--space-4)', maxWidth: '52ch' }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-serif-text)', fontSize: 'var(--text-lede)', lineHeight: 1.45, color: 'var(--text-display)' }}>&ldquo;{quote}&rdquo;</p>
      <p style={{ margin: 'var(--space-3) 0 0', fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)' }}>
        {author && <span>{author}, </span>}<span style={{ color: 'var(--text-display)' }}>{publication}</span>{year && <span>, {year}</span>}
      </p>
    </article>
  );
}
