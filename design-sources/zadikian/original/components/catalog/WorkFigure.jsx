import { Tombstone } from './Tombstone.jsx';

export function WorkFigure({ src, alt, title, year, medium, dimensions, edition, catalogNo, bleed = false }) {
  return (
    <figure style={{ margin: 0 }}>
      <img src={src} alt={alt || title} style={{ display: 'block', width: '100%', height: bleed ? '100%' : 'auto', objectFit: bleed ? 'cover' : 'initial' }} />
      <figcaption style={{ marginTop: 'var(--space-4)' }}>
        <Tombstone title={title} year={year} medium={medium} dimensions={dimensions} edition={edition} catalogNo={catalogNo} />
      </figcaption>
    </figure>
  );
}
