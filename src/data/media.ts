import type { ImageMedia, MediaLibrary, MediaPlacement, VideoMedia } from '../lib/media/model';

const fixtureRights = {
  state: 'fixture-approved',
  license: 'CC0-1.0',
  reviewedOn: '2026-08-01',
} as const;

const fixtureCredit = {
  creator: 'Zadik website preview project',
  role: 'designer',
  creditLine: 'Design study: Zadik website preview project · CC0 1.0',
} as const;

const images = [
  {
    kind: 'image',
    id: 'img-fixture-threshold-wide-v1',
    visibility: 'public',
    source: {
      path: 'src/assets/media/fixtures/threshold-wide--3207a4e1df4f.png',
      sha256: '3207a4e1df4fc828831ad924de51781dd018b61812c7a85a4584ecd348b118eb',
      bytes: 15243,
      mime: 'image/png',
    },
    width: 1440,
    height: 1080,
    focal: { x: 0.5, y: 0.54 },
    rights: fixtureRights,
    credit: fixtureCredit,
    provenanceRef: 'prov-fixture-threshold-wide-v1',
    defaultCaption: 'Threshold geometry in paper, charcoal, and muted gold.',
    altGuidance: 'Describe the abstract doorway, converging planes, and central square when the image is informative.',
    related: { workIds: [], seriesIds: ['path-to-nine'] },
  },
  {
    kind: 'image',
    id: 'img-fixture-threshold-portrait-v1',
    visibility: 'public',
    source: {
      path: 'src/assets/media/fixtures/threshold-portrait--49e1670e34a8.png',
      sha256: '49e1670e34a8a6654e6d6cd37f1d8fa2da8292c3e6ce96c83ad2c94ee77f0f6d',
      bytes: 14880,
      mime: 'image/png',
    },
    width: 900,
    height: 1200,
    focal: { x: 0.5, y: 0.55 },
    rights: fixtureRights,
    credit: fixtureCredit,
    provenanceRef: 'prov-fixture-threshold-portrait-v1',
    defaultCaption: 'Portrait art-direction crop of the threshold study.',
    altGuidance: 'Use the same contextual description as the wide threshold placement; do not describe the crop itself.',
    related: { workIds: [], seriesIds: ['path-to-nine'] },
  },
  {
    kind: 'image',
    id: 'img-fixture-stack-v1',
    visibility: 'public',
    source: {
      path: 'src/assets/media/fixtures/stack-study--b1b954c134cd.png',
      sha256: 'b1b954c134cd72dd9024597ee83cc18310e1ba81c1b9625286f1b28a2c2aad8f',
      bytes: 7281,
      mime: 'image/png',
    },
    width: 1440,
    height: 1080,
    focal: { x: 0.5, y: 0.61 },
    rights: fixtureRights,
    credit: fixtureCredit,
    provenanceRef: 'prov-fixture-stack-v1',
    defaultCaption: 'Six open gold-toned units arranged against a charcoal field.',
    altGuidance: 'Describe the six repeated open units and stepped arrangement, without calling them Zadikian works.',
    related: { workIds: [], seriesIds: ['stacks'] },
  },
  {
    kind: 'image',
    id: 'img-fixture-field-v1',
    visibility: 'public',
    source: {
      path: 'src/assets/media/fixtures/field-study--58cdcd8b4b14.png',
      sha256: '58cdcd8b4b14e46b7a996ba8a45cc116ffddd684191772bbf760a5ed849573a1',
      bytes: 8634,
      mime: 'image/png',
    },
    width: 1440,
    height: 1080,
    focal: { x: 0.5, y: 0.42 },
    rights: fixtureRights,
    credit: fixtureCredit,
    provenanceRef: 'prov-fixture-field-v1',
    defaultCaption: 'Circular light above an irregular charcoal field.',
    altGuidance: 'Describe the central circle, radiating lines, and dark lower field when the image adds information.',
    related: { workIds: [], seriesIds: ['solis'] },
  },
  {
    kind: 'image',
    id: 'img-fixture-process-poster-v1',
    visibility: 'public',
    source: {
      path: 'src/assets/media/fixtures/process-poster--3a494f5af5e1.png',
      sha256: '3a494f5af5e15ff3d98bf062ae9298fc003e0dcc9ab2317d24115843e79e7cbc',
      bytes: 6263,
      mime: 'image/png',
    },
    width: 1280,
    height: 720,
    focal: { x: 0.5, y: 0.5 },
    rights: fixtureRights,
    credit: fixtureCredit,
    provenanceRef: 'prov-fixture-process-poster-v1',
    defaultCaption: 'Inert poster for a project-created video presentation study.',
    altGuidance: 'Describe the gold circle, pale play symbol, and repeated blocks; state that this is a design study.',
    related: { workIds: [], seriesIds: ['stacks'] },
  },
] as const satisfies readonly ImageMedia[];

const videos = [
  {
    kind: 'video',
    id: 'vid-fixture-process-study-v1',
    visibility: 'public',
    source: {
      path: 'public/media/fixtures/process-study-descriptor--aead727f62f8.json',
      sha256: 'aead727f62f8681cf50afb28859a7f6011de03f26bb24fd49129f0fb21daf9c2',
      bytes: 239,
      mime: 'application/json',
    },
    width: 1280,
    height: 720,
    durationSeconds: 12,
    presentation: 'inert-design-study',
    poster: {
      mediaId: 'img-fixture-process-poster-v1',
      frameTimeSeconds: 6,
      focal: { x: 0.5, y: 0.5 },
    },
    accessibility: {
      captions: [
        {
          path: 'public/media/fixtures/process-study-captions--3b314c097dc0.vtt',
          sha256: '3b314c097dc01511de57a77a3454bc890288ede339ab7b6790047245a1ecc230',
          bytes: 205,
          language: 'en',
          label: 'English captions',
          kind: 'captions',
        },
      ],
      transcript: {
        path: 'public/media/fixtures/process-study-transcript--3dc85f84b5cb.txt',
        sha256: '3dc85f84b5cb31e6ad1b8783add089ad393d5cc6040ed8496c9b44c19a50e3f7',
        bytes: 285,
        language: 'en',
        label: 'Plain-text transcript',
        text: 'This inert preview represents a twelve-second video treatment. Soft workshop ambience begins. A geometric form moves through three stages in this project-created design study. The sound fades. No artwork or footage by Zadik Zadikian is included.',
      },
      audioDescription: 'descriptive-transcript',
    },
    rights: fixtureRights,
    credit: {
      creator: 'Zadik website preview project',
      role: 'filmmaker',
      creditLine: 'Inert video design study: Zadik website preview project · CC0 1.0',
    },
    provenanceRef: 'prov-fixture-process-video-v1',
    defaultCaption: 'Provider-neutral, inert presentation study for a future reviewed video adapter.',
    altGuidance: 'The poster placement describes the visual; the transcript describes the proposed temporal sequence and sound.',
    related: { workIds: [], seriesIds: ['stacks'] },
  },
] as const satisfies readonly VideoMedia[];

const placements = [
  {
    id: 'placement-home-hero-wide',
    mediaId: 'img-fixture-threshold-wide-v1',
    context: 'Home page first visual encounter',
    alt: 'Abstract design study: a gold-edged doorway converges on a small illuminated square in a charcoal interior.',
  },
  {
    id: 'placement-home-hero-mobile',
    mediaId: 'img-fixture-threshold-portrait-v1',
    context: 'Home page first visual encounter below 42rem',
    alt: 'Abstract design study: a tall gold-edged doorway converges on a small illuminated square in a charcoal interior.',
  },
  {
    id: 'placement-home-chapter-ground',
    mediaId: 'img-fixture-field-v1',
    context: 'Home retrospective-path row: Ground',
    alt: 'Project-created field study with a pale circle above an irregular charcoal horizon; not an artwork.',
  },
  {
    id: 'placement-home-chapter-field',
    mediaId: 'img-fixture-threshold-wide-v1',
    context: 'Home retrospective-path row: Field',
    alt: 'Project-created threshold study with converging planes and a square of light; not an artwork.',
  },
  {
    id: 'placement-home-chapter-unit',
    mediaId: 'img-fixture-stack-v1',
    context: 'Home retrospective-path row: Unit',
    alt: 'Project-created study of six repeated open units in a stepped arrangement; not an artwork.',
  },
  {
    id: 'placement-home-chapter-body',
    mediaId: 'img-fixture-threshold-wide-v1',
    context: 'Home retrospective-path row: Body',
    alt: 'Project-created threshold geometry reserving a rights-gated body chapter; not an artwork.',
  },
  {
    id: 'placement-home-chapter-open',
    mediaId: 'img-fixture-field-v1',
    context: 'Home retrospective-path row: Open structure',
    alt: 'Project-created light-and-field geometry reserving an open-structure chapter; not an artwork.',
  },
  {
    id: 'placement-home-current',
    mediaId: 'img-fixture-stack-v1',
    context: 'Home current-work module held for publication review',
    alt: 'Project-created repeated-unit study standing in for a held current-work placement; not an artwork.',
  },
  {
    id: 'placement-work-chapter-ground',
    mediaId: 'img-fixture-field-v1',
    context: 'Work index reserved Ground chapter',
    alt: 'Project-created field study marking a reserved, unpublished Ground chapter; not an artwork.',
  },
  {
    id: 'placement-work-chapter-body',
    mediaId: 'img-fixture-threshold-wide-v1',
    context: 'Work index reserved Body chapter',
    alt: 'Project-created threshold study marking a rights-gated Body chapter; not an artwork.',
  },
  {
    id: 'placement-work-chapter-open',
    mediaId: 'img-fixture-stack-v1',
    context: 'Work index reserved Open structure chapter',
    alt: 'Project-created repeated-unit study marking a held Open structure chapter; not an artwork.',
  },
  {
    id: 'placement-about-portrait',
    mediaId: 'img-fixture-threshold-portrait-v1',
    context: 'About page reserved portrait placement',
    alt: 'Abstract project-created threshold used to reserve portrait space while portrait rights remain pending.',
  },
  ...(['path-to-nine', 'stacks', 'solis'] as const).flatMap((seriesId) => {
    const mediaId = {
      'path-to-nine': 'img-fixture-threshold-wide-v1',
      stacks: 'img-fixture-stack-v1',
      solis: 'img-fixture-field-v1',
    }[seriesId];
    return [
      {
        id: `placement-home-card-${seriesId}`,
        mediaId,
        context: `Home linked sample-series card: ${seriesId}`,
        decorative: true,
      },
      {
        id: `placement-work-index-${seriesId}`,
        mediaId,
        context: `Work-index linked sample-series card: ${seriesId}`,
        decorative: true,
      },
    ];
  }),
  {
    id: 'placement-series-hero-path-to-nine',
    mediaId: 'img-fixture-threshold-wide-v1',
    context: 'Path to Nine sample-series hero',
    alt: 'Abstract threshold study with converging gold planes, a charcoal interior, and a centered square of light.',
  },
  {
    id: 'placement-series-hero-stacks',
    mediaId: 'img-fixture-stack-v1',
    context: 'Stacks sample-series hero',
    alt: 'Abstract stack study of six open gold-toned units stepping upward against a charcoal field.',
  },
  {
    id: 'placement-series-hero-solis',
    mediaId: 'img-fixture-field-v1',
    context: 'Solis sample-series hero',
    alt: 'Abstract field study with a pale gold circle and rays above an irregular charcoal horizon.',
  },
  ...(['path-to-nine', 'stacks', 'solis'] as const).flatMap((seriesId) => [
    {
      id: `placement-gallery-${seriesId}-threshold`,
      mediaId: 'img-fixture-threshold-wide-v1',
      context: `${seriesId} editorial gallery, threshold study`,
      alt: 'Geometric design study of a gold-edged threshold receding toward a square of light.',
    },
    {
      id: `placement-gallery-${seriesId}-stack`,
      mediaId: 'img-fixture-stack-v1',
      context: `${seriesId} editorial gallery, stack study`,
      alt: 'Geometric design study of six repeated open gold-toned units in a stepped arrangement.',
    },
    {
      id: `placement-gallery-${seriesId}-field`,
      mediaId: 'img-fixture-field-v1',
      context: `${seriesId} editorial gallery, field study`,
      alt: 'Geometric design study of a radiant circle suspended over a dark, uneven field.',
    },
  ]),
  {
    id: 'placement-video-process-poster',
    mediaId: 'img-fixture-process-poster-v1',
    context: 'Inert provider-neutral video presentation poster',
    alt: 'Video design-study poster with a gold circle, pale play symbol, and four repeated blocks on charcoal.',
  },
] as const satisfies readonly MediaPlacement[];

export const mediaLibrary = {
  media: [...images, ...videos],
  placements,
} as const satisfies MediaLibrary;

export function getMediaRecord(id: string) {
  const media = mediaLibrary.media.find((record) => record.id === id);
  if (!media) throw new Error(`Unknown media ID: ${id}`);
  return media;
}

export function getImageRecord(id: string): ImageMedia {
  const media = getMediaRecord(id);
  if (media.kind !== 'image') throw new Error(`Media is not an image: ${id}`);
  return media;
}

export function getVideoRecord(id: string): VideoMedia {
  const media = getMediaRecord(id);
  if (media.kind !== 'video') throw new Error(`Media is not a video: ${id}`);
  return media;
}

export function getMediaPlacement(id: string): MediaPlacement {
  const placement = mediaLibrary.placements.find((record) => record.id === id);
  if (!placement) throw new Error(`Unknown media placement ID: ${id}`);
  return placement;
}
