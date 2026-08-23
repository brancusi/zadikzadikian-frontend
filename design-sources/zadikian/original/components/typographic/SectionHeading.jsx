export function SectionHeading({ index, label, title, size = 'display' }) {
  const fs = size === 'colossal' ? 'var(--text-colossal)' : size === 'headline' ? 'var(--text-headline)' : 'var(--text-display)';
  return (
    <header style={{ borderTop: '2px solid var(--rule-strong)', paddingTop: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)', marginBottom: 'var(--space-7)' }}>
        <span>{label}</span>
        {index && <span>{index}</span>}
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 400, fontSize: fs, lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-display)', margin: 0, textWrap: 'balance' }}>{title}</h2>
    </header>
  );
}
