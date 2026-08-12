import { describe, expect, it } from 'vitest';
import { mediaLibrary } from '../src/data/media';
import { validateMediaLibrary, type MediaLibrary } from '../src/lib/media/model';

const references = {
  workIds: new Set<string>(),
  seriesIds: new Set(['path-to-nine', 'stacks', 'solis']),
};

type MutableLibrary = {
  media: Array<Record<string, unknown>>;
  placements: Array<Record<string, unknown>>;
};

function mutableLibrary(): MutableLibrary {
  return structuredClone(mediaLibrary) as unknown as MutableLibrary;
}

function validate(library: MutableLibrary) {
  return validateMediaLibrary(library as unknown as MediaLibrary, references);
}

describe('provider-neutral media validation', () => {
  it('accepts the checked-in fixture library', () => {
    expect(validateMediaLibrary(mediaLibrary, references)).toEqual([]);
  });

  it('rejects duplicate stable IDs and broken references', () => {
    const library = mutableLibrary();
    library.media.push(structuredClone(library.media[0]!));
    library.placements[0]!.mediaId = 'img-missing-v1';

    const issues = validate(library);
    expect(issues.some((issue) => issue.code === 'duplicate-id')).toBe(true);
    expect(issues.some((issue) => issue.code === 'broken-reference')).toBe(true);
  });

  it('rejects missing intrinsic dimensions and mutable or external sources', () => {
    const library = mutableLibrary();
    library.media[0]!.width = 0;
    const source = library.media[0]!.source as Record<string, unknown>;
    source.path = 'https://images.squarespace-cdn.com/latest.jpg?width=1200';

    const issues = validate(library);
    expect(issues.some((issue) => issue.code === 'invalid-dimensions')).toBe(true);
    expect(issues.some((issue) => issue.code === 'unsafe-source')).toBe(true);
  });

  it('gates public media on an approved rights state', () => {
    const library = mutableLibrary();
    const rights = library.media[0]!.rights as Record<string, unknown>;
    rights.state = 'pending-review';

    expect(validate(library).some((issue) => issue.code === 'invalid-rights')).toBe(true);
  });

  it('requires an alt or decorative decision for every image placement', () => {
    const library = mutableLibrary();
    delete library.placements[0]!.alt;

    const issues = validate(library);
    expect(issues).toContainEqual(expect.objectContaining({ code: 'invalid-accessibility' }));
  });

  it('requires poster, captions, transcript, and audio-description decisions for public video', () => {
    const library = mutableLibrary();
    const video = library.media.find((media) => media.kind === 'video')!;
    const accessibility = video.accessibility as Record<string, unknown>;
    accessibility.captions = [];
    accessibility.transcript = { path: '', text: '' };
    accessibility.audioDescription = '';
    video.poster = { mediaId: 'img-missing-poster', frameTimeSeconds: 0, focal: { x: 0.5, y: 0.5 } };

    const issues = validate(library);
    expect(issues.filter((issue) => issue.code === 'invalid-accessibility').length).toBeGreaterThanOrEqual(3);
    expect(issues.some((issue) => issue.path.endsWith('.poster.mediaId'))).toBe(true);
  });

  it('keeps private evidence and archival locations out of public records', () => {
    const library = mutableLibrary();
    library.media[0]!.permissionEvidence = '/private/contracts/release.pdf';
    library.media[0]!.archivalLocation = 'studio-drive://masters';

    expect(validate(library).filter((issue) => issue.code === 'forbidden-private-field')).toHaveLength(2);
  });
});
