const { SectionHeading, PullQuote, WorkFigure, SpecList, CVList, PressItem } = window.ZadikianDesignSystem_41ec0e;
const IMG = window.propIMG, meta = window.propMeta;

function WorksPage() {
  return (
    <div>
      <SectionHeading index="02" label="Works for acquisition" title="Pigmented plaster, 2024–2026" />
      <p style={{ margin: 'var(--space-6) 0 0', maxWidth: 'var(--measure-body)', color: 'var(--text-body)' }}>
        Cast, stacked, and pigmented through the mass — not painted — each work extends the brick logic of the Venice pavilion to freestanding, human-scale volumes. Titles and dimensions below are placeholders pending studio records.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'var(--space-9)', marginTop: 'var(--space-8)', alignItems: 'start' }}>
        <WorkFigure src={IMG('A-009')} title="Untitled" year="2025" medium="Pigmented plaster" dimensions="Dimensions on request" edition="Unique" catalogNo="A-009" />
        <SpecList items={[
          { label: 'Provenance', value: 'The artist; Tony Shafrazi | Gallery Without Walls' },
          { label: 'Exhibited', value: 'Studio, Brooklyn, 2025' },
          { label: 'Condition', value: 'Excellent' },
          { label: 'Price', value: 'On request' },
        ]} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-7)', marginTop: 'var(--space-9)' }}>
        <WorkFigure src={IMG('A-020')} title="Untitled" year="2025" medium="Pigmented plaster" catalogNo="A-020" />
        <WorkFigure src={IMG('A-023')} title="Untitled" year="2025" medium="Pigmented plaster" catalogNo="A-023" />
        <WorkFigure src={IMG('A-026')} title="Untitled" year="2025" medium="Pigmented plaster" catalogNo="A-026" />
      </div>
    </div>
  );
}

function ProjectPage() {
  return (
    <div>
      <SectionHeading index="03" label="Future work · site-specific" title="A proposal in the elemental unit" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 'var(--space-9)', marginTop: 'var(--space-8)', alignItems: 'start' }}>
        <div>
          <p style={{ margin: 0, color: 'var(--text-body)' }}>
            Zadikian proposes a commissioned installation built on site from cast plaster blocks, pigmented through the mass and assembled over the course of the exhibition — the arrangement remaining separate, movable, alive. As in Venice, the room becomes a working studio; precision, repetition, and attentive labour are the medium as much as the plaster.
          </p>
          <div style={{ marginTop: 'var(--space-7)' }}>
            <SpecList items={[
              { label: 'Scale', value: 'Sized to site · survey required' },
              { label: 'Duration', value: 'Built over the run of the exhibition' },
              { label: 'Crew', value: 'The artist with two studio assistants' },
              { label: 'Precedent', value: 'The Studio, Armenian Pavilion, Venice, 2026' },
            ]} />
          </div>
        </div>
        <figure style={{ margin: 0 }}>
          <img src={IMG('A-015')} alt="Installation view" style={{ display: 'block', width: '100%' }} />
          <figcaption style={{ ...meta, marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Installation view, 2026</span><span>A-015</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function CVPage() {
  return (
    <div>
      <SectionHeading index="04" label="Curriculum vitae" title="Selected history" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-9)', marginTop: 'var(--space-8)', alignItems: 'start' }}>
        <CVList heading="Selected exhibitions" entries={[
          { year: 2026, text: 'The Studio, Armenian Pavilion, 61st Venice Biennale (cur. Tony Shafrazi, Tina Chakarian)' },
          { year: 2025, text: 'RETURN, Cafesjian Center for the Arts, Yerevan' },
          { year: 2025, text: 'Made in USA, Independent 20th Century, New York' },
          { year: 2024, text: 'Path to Nine, Brooklyn Museum, New York' },
          { year: 1984, text: 'The New Portrait, MoMA PS1, New York (gilded entrance)' },
          { year: 1978, text: '1,000 Gold Bricks, Tony Shafrazi Gallery, Tehran' },
          { year: 1975, text: '1,000 Bricks Gilded in 22 Carat Gold Leaf, P.S.1, Long Island City' },
        ]} />
        <CVList heading="Chronology" entries={[
          { year: 1948, text: 'Born Yerevan, Soviet Armenia' },
          { year: 1963, text: 'Enters the Art Academy of Yerevan' },
          { year: 1967, text: 'Escapes the USSR across the Araks River' },
          { year: 1969, text: 'San Francisco; assistant to Beniamino Bufano' },
          { year: 1974, text: 'New York; assists Richard Serra on the oil-stick wall drawings' },
          { year: 2026, text: 'Represents Armenia, Venice Biennale' },
        ]} />
      </div>
    </div>
  );
}

function PressPage() {
  return (
    <div>
      <SectionHeading index="05" label="Press" title="Selected citations" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8) var(--space-9)', marginTop: 'var(--space-8)', alignItems: 'start' }}>
        <PressItem quote="One of the leading sculptors in the realm of contemporary alchemy." publication="The Armenian Mirror-Spectator" year="2026" />
        <PressItem quote="Minimal and monumental, singular and interdependent, each unit holds the tension between one and many." publication="La Biennale di Venezia" year="2026" />
        <PressItem quote="He's more involved in this presentation than anything in his life as a dealer." publication="ARTnews" author="Elizabeth Dee on Tony Shafrazi" year="2025" />
        <PressItem quote="A legend, mythmaker, and voyager across geographical and artistic boundaries." publication="Encyclopedia of Design" year="2021" />
      </div>
      <div style={{ marginTop: 'var(--space-10)', borderTop: '1px solid var(--gold)', paddingTop: 'var(--space-5)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 'var(--text-title)', color: 'var(--text-display)' }}>Tony Shafrazi | Gallery Without Walls</div>
        <div style={meta}>info@tonyshafrazigallery.com · +1 212 274 9300</div>
      </div>
    </div>
  );
}

Object.assign(window, { WorksPage, ProjectPage, CVPage, PressPage });
