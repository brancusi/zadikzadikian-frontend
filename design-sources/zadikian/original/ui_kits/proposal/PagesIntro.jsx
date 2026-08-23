const DS = window.ZadikianDesignSystem_41ec0e;
const { SectionHeading, PullQuote, Folio, WorkFigure, Tombstone, SpecList, CVList, PressItem, Button } = DS;
const IMG = (n) => `../../assets/web/${n}.jpg`;
const meta = { fontFamily: 'var(--font-grotesque)', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)' };

function CoverPage() {
  return (
    <div style={{ display: 'grid', gridTemplateRows: '1fr auto', minHeight: '100%' }}>
      <div style={{ padding: 'var(--space-9) 0 var(--space-8)' }}>
        <div style={meta}>Acquisition proposal · Prepared for the collection committee</div>
        <h1 style={{ fontSize: 'var(--text-colossal)', marginTop: 'var(--space-7)' }}>Zadik<br />Zadikian</h1>
        <div style={{ borderTop: '1px solid var(--gold)', width: 120, margin: 'var(--space-7) 0' }}></div>
        <div style={{ fontFamily: 'var(--font-serif-text)', fontSize: 'var(--text-lede)', maxWidth: 'var(--measure-lede)', color: 'var(--text-body)' }}>
          Monumental pigmented-plaster works, 2024–2026, with a proposal for a site-specific installation.
        </div>
      </div>
      <div>
        <img src={IMG('A-001')} alt="Installation view" style={{ display: 'block', width: '100%' }} />
        <div style={{ ...meta, marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Represented by Tony Shafrazi | Gallery Without Walls, New York</span><span>A-001</span>
        </div>
      </div>
    </div>
  );
}

function StatementPage() {
  const P = ({ children }) => <p style={{ margin: '0 0 var(--space-5)', maxWidth: 'var(--measure-body)' }}>{children}</p>;
  return (
    <div>
      <SectionHeading index="01" label="The artist" title="Sixty years of material conviction" />
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-9)', marginTop: 'var(--space-8)', alignItems: 'start' }}>
        <div style={{ fontFamily: 'var(--font-serif-text)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-body)' }}>
          <P>Zadik Zadikian (b. 1948, Yerevan) trained at the Art Academy of Yerevan before escaping the Soviet Union at nineteen, swimming the Araks River under fire. Arriving in San Francisco in 1969, he assisted the sculptor Beniamino Bufano; in New York from 1974 he became a friend and assistant of Richard Serra, producing the large black oil-stick wall drawings — the first of which Serra titled <em>Zadikian</em>.</P>
          <P>His 1975 installation <em>1,000 Bricks Gilded in 22 Carat Gold Leaf</em> at P.S.1 announced the two constants of his practice: the brick as elemental unit, and surface as transformation. In 1978 he stacked a thousand gold-leafed mud bricks at Tony Shafrazi's Tehran gallery, weeks before the revolution took every one of them.</P>
          <P>Five decades on, the work has returned to the center of the conversation: <em>Path to Nine</em> at the Brooklyn Museum (2024), the retrospective <em>RETURN</em> at the Cafesjian Center for the Arts, Yerevan (2025), and the Armenian Pavilion at the 61st Venice Biennale (2026) — co-curated by Shafrazi — where the studio itself became the work.</P>
        </div>
        <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
          <PullQuote quote="My work is about filling a void." attribution="Zadik Zadikian" />
          <SpecList items={[
            { label: 'Born', value: '1948, Yerevan, Armenia' },
            { label: 'Lives', value: 'New York' },
            { label: 'Since', value: 'P.S.1, 1975 · Tehran, 1978 · MoMA PS1, 1984' },
            { label: 'Current', value: 'Armenian Pavilion, Venice Biennale, 2026' },
          ]} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CoverPage, StatementPage, propIMG: IMG, propMeta: meta });
