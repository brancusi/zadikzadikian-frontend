export function Button({ children, variant = 'outline', onClick, disabled = false, href }) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: 'inline-block', boxSizing: 'border-box', cursor: disabled ? 'default' : 'pointer',
    fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase',
    padding: '14px 28px', border: '1px solid var(--ink)', borderRadius: 0, background: 'transparent', color: 'var(--ink)',
    textDecoration: 'none', transition: 'background .18s ease, color .18s ease, border-color .18s ease', opacity: disabled ? 0.35 : 1,
  };
  const styles = {
    solid: { ...base, background: hover && !disabled ? 'var(--gold-deep)' : 'var(--ink)', borderColor: hover && !disabled ? 'var(--gold-deep)' : 'var(--ink)', color: 'var(--paper)' },
    outline: { ...base, background: hover && !disabled ? 'var(--ink)' : 'transparent', color: hover && !disabled ? 'var(--paper)' : 'var(--ink)' },
    text: { ...base, border: 'none', padding: '14px 0', color: hover && !disabled ? 'var(--gold)' : 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1px' },
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} onClick={disabled ? undefined : onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={styles[variant] || styles.outline}>{children}</Tag>
  );
}
