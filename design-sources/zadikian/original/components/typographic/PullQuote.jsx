export function PullQuote({ quote, attribution, source }) {
  return (
    <figure style={{ margin: 0, maxWidth: '26ch' }}>
      <blockquote style={{ margin: 0, fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', fontSize: 'var(--text-headline)', lineHeight: 1.22, letterSpacing: '-0.01em', color: 'var(--text-display)', textWrap: 'balance' }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      {(attribution || source) && (
        <figcaption style={{ marginTop: 'var(--space-5)', fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)' }}>
          {attribution}{attribution && source ? ', ' : ''}{source}
        </figcaption>
      )}
    </figure>
  );
}
