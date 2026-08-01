export const approvedPublicRightsStates = ['approved-public-web', 'fixture-approved'] as const;

export type RightsState =
  | (typeof approvedPublicRightsStates)[number]
  | 'pending-review'
  | 'restricted'
  | 'rejected';

export interface ContentIdentity {
  /** Repository path to an immutable, checksummed web source or inert fixture descriptor. */
  path: string;
  sha256: string;
  bytes: number;
  mime: string;
}

export interface CreatorCredit {
  creator: string;
  role: 'artist' | 'photographer' | 'filmmaker' | 'designer' | 'studio';
  creditLine: string;
}

export interface PublicRights {
  state: RightsState;
  license: string;
  reviewedOn?: string;
}

export interface RelatedContent {
  workIds: readonly string[];
  seriesIds: readonly string[];
}

export interface FocalPoint {
  x: number;
  y: number;
}

interface MediaBase {
  id: string;
  visibility: 'public' | 'withheld';
  source: ContentIdentity;
  rights: PublicRights;
  credit: CreatorCredit;
  /** Opaque editorial reference only; never a private path, contract, or permission record. */
  provenanceRef: string;
  defaultCaption: string;
  altGuidance: string;
  related: RelatedContent;
}

export interface ImageMedia extends MediaBase {
  kind: 'image';
  width: number;
  height: number;
  focal: FocalPoint;
}

export interface CaptionTrack {
  path: string;
  sha256: string;
  bytes: number;
  language: string;
  label: string;
  kind: 'captions' | 'subtitles';
}

export interface TranscriptMetadata {
  path: string;
  sha256: string;
  bytes: number;
  language: string;
  label: string;
  text: string;
}

export interface VideoMedia extends MediaBase {
  kind: 'video';
  width: number;
  height: number;
  durationSeconds: number;
  presentation: 'inert-design-study' | 'public-playback';
  poster: {
    mediaId: string;
    frameTimeSeconds: number;
    focal: FocalPoint;
  };
  accessibility: {
    captions: readonly CaptionTrack[];
    transcript: TranscriptMetadata;
    audioDescription: 'not-required' | 'descriptive-transcript' | 'track';
  };
}

export type MediaRecord = ImageMedia | VideoMedia;

export interface MediaPlacement {
  id: string;
  mediaId: string;
  context: string;
  alt?: string;
  decorative?: boolean;
}

export interface MediaLibrary {
  media: readonly MediaRecord[];
  placements: readonly MediaPlacement[];
}

export interface ReferenceIndex {
  workIds: ReadonlySet<string>;
  seriesIds: ReadonlySet<string>;
}

export interface MediaValidationIssue {
  code:
    | 'broken-reference'
    | 'duplicate-id'
    | 'forbidden-private-field'
    | 'invalid-accessibility'
    | 'invalid-dimensions'
    | 'invalid-metadata'
    | 'invalid-rights'
    | 'unsafe-source';
  path: string;
  message: string;
}

const idPattern = /^(?:img|vid|placement)-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sha256Pattern = /^[0-9a-f]{64}$/;
const immutableFilenamePattern = /--([0-9a-f]{12})\.[a-z0-9]+$/;
const opaqueReferencePattern = /^prov-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const forbiddenPrivateKeys = new Set([
  'archivalLocation',
  'archiveUri',
  'contract',
  'masterLocation',
  'permissionDocument',
  'permissionEvidence',
  'releaseDocument',
]);

function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

function isFocalPoint(value: FocalPoint): boolean {
  return Number.isFinite(value.x) && value.x >= 0 && value.x <= 1
    && Number.isFinite(value.y) && value.y >= 0 && value.y <= 1;
}

function validateSafePath(path: string, sha256: string): string | undefined {
  if (
    path.includes('://')
    || path.startsWith('//')
    || path.includes('\\')
    || path.includes('?')
    || path.includes('#')
    || path.split('/').includes('..')
  ) {
    return 'must be a local path without a URL, traversal, query, or fragment';
  }

  if (!path.startsWith('src/assets/media/') && !path.startsWith('public/media/')) {
    return 'must stay below src/assets/media/ or public/media/';
  }

  const match = path.match(immutableFilenamePattern);
  if (!match || match[1] !== sha256.slice(0, 12)) {
    return 'must use a content-addressed filename ending --<sha256[0:12]>.ext';
  }

  return undefined;
}

function findForbiddenPrivateFields(value: unknown, path: string, issues: MediaValidationIssue[]): void {
  if (!value || typeof value !== 'object') return;

  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}.${key}`;
    if (forbiddenPrivateKeys.has(key)) {
      issues.push({
        code: 'forbidden-private-field',
        path: childPath,
        message: 'private permission evidence and archival locations cannot enter public media records',
      });
    }
    findForbiddenPrivateFields(child, childPath, issues);
  }
}

function validateIdentity(identity: ContentIdentity, path: string, issues: MediaValidationIssue[]): void {
  if (!sha256Pattern.test(identity.sha256)) {
    issues.push({ code: 'unsafe-source', path: `${path}.sha256`, message: 'must be a lowercase SHA-256 digest' });
  }

  const unsafeReason = validateSafePath(identity.path, identity.sha256);
  if (unsafeReason) {
    issues.push({ code: 'unsafe-source', path: `${path}.path`, message: unsafeReason });
  }

  if (!isPositiveInteger(identity.bytes)) {
    issues.push({ code: 'invalid-metadata', path: `${path}.bytes`, message: 'must be a positive integer' });
  }

  if (!/^[a-z]+\/[a-z0-9.+-]+$/.test(identity.mime)) {
    issues.push({ code: 'invalid-metadata', path: `${path}.mime`, message: 'must be an explicit MIME type' });
  }
}

function duplicateIds(values: readonly { id: string }[], path: string, issues: MediaValidationIssue[]): void {
  const seen = new Set<string>();
  values.forEach((value, index) => {
    if (!idPattern.test(value.id)) {
      issues.push({ code: 'invalid-metadata', path: `${path}[${index}].id`, message: 'must be a stable, lowercase typed ID' });
    }
    if (seen.has(value.id)) {
      issues.push({ code: 'duplicate-id', path: `${path}[${index}].id`, message: `duplicate ID: ${value.id}` });
    }
    seen.add(value.id);
  });
}

export function validateMediaLibrary(
  library: MediaLibrary,
  references: ReferenceIndex = { workIds: new Set(), seriesIds: new Set() },
): MediaValidationIssue[] {
  const issues: MediaValidationIssue[] = [];
  duplicateIds(library.media, 'media', issues);
  duplicateIds(library.placements, 'placements', issues);
  findForbiddenPrivateFields(library, 'library', issues);

  const mediaById = new Map(library.media.map((media) => [media.id, media]));
  const approvedRights = new Set<RightsState>(approvedPublicRightsStates);

  library.media.forEach((media, index) => {
    const path = `media[${index}]`;
    validateIdentity(media.source, `${path}.source`, issues);

    if (!isPositiveInteger(media.width) || !isPositiveInteger(media.height)) {
      issues.push({ code: 'invalid-dimensions', path, message: 'intrinsic width and height must be positive integers' });
    }

    if (media.visibility === 'public' && !approvedRights.has(media.rights.state)) {
      issues.push({ code: 'invalid-rights', path: `${path}.rights.state`, message: 'public media requires an approved rights state' });
    }

    if (
      !media.credit.creator.trim()
      || !media.credit.creditLine.trim()
      || !media.defaultCaption.trim()
      || !media.altGuidance.trim()
      || !opaqueReferencePattern.test(media.provenanceRef)
    ) {
      issues.push({
        code: 'invalid-metadata',
        path,
        message: 'creator, credit, caption, alt guidance, and an opaque provenance reference are required',
      });
    }

    media.related.workIds.forEach((id) => {
      if (!references.workIds.has(id)) {
        issues.push({ code: 'broken-reference', path: `${path}.related.workIds`, message: `unknown work ID: ${id}` });
      }
    });
    media.related.seriesIds.forEach((id) => {
      if (!references.seriesIds.has(id)) {
        issues.push({ code: 'broken-reference', path: `${path}.related.seriesIds`, message: `unknown series ID: ${id}` });
      }
    });

    if (media.kind === 'image') {
      if (!isFocalPoint(media.focal)) {
        issues.push({ code: 'invalid-metadata', path: `${path}.focal`, message: 'focal coordinates must be between 0 and 1' });
      }
      if (!media.source.mime.startsWith('image/')) {
        issues.push({ code: 'invalid-metadata', path: `${path}.source.mime`, message: 'image records require an image MIME type' });
      }
      return;
    }

    if (!Number.isFinite(media.durationSeconds) || media.durationSeconds <= 0) {
      issues.push({ code: 'invalid-metadata', path: `${path}.durationSeconds`, message: 'video duration must be greater than zero' });
    }

    const poster = mediaById.get(media.poster.mediaId);
    if (!poster || poster.kind !== 'image') {
      issues.push({ code: 'broken-reference', path: `${path}.poster.mediaId`, message: 'video poster must reference an image record' });
    }
    if (!isFocalPoint(media.poster.focal)) {
      issues.push({ code: 'invalid-metadata', path: `${path}.poster.focal`, message: 'poster focal coordinates must be between 0 and 1' });
    }

    if (media.visibility === 'public') {
      if (media.accessibility.captions.length === 0) {
        issues.push({ code: 'invalid-accessibility', path: `${path}.accessibility.captions`, message: 'public video requires captions' });
      }
      if (!media.accessibility.transcript?.path || !media.accessibility.transcript.text.trim()) {
        issues.push({ code: 'invalid-accessibility', path: `${path}.accessibility.transcript`, message: 'public video requires a linked, readable transcript' });
      }
      if (!media.accessibility.audioDescription) {
        issues.push({ code: 'invalid-accessibility', path: `${path}.accessibility.audioDescription`, message: 'public video requires an audio-description decision' });
      }
    }

    media.accessibility.captions.forEach((caption, captionIndex) => {
      validateIdentity(
        { path: caption.path, sha256: caption.sha256, bytes: caption.bytes, mime: 'text/vtt' },
        `${path}.accessibility.captions[${captionIndex}]`,
        issues,
      );
      if (!caption.path.endsWith('.vtt') || !caption.language || !caption.label) {
        issues.push({ code: 'invalid-accessibility', path: `${path}.accessibility.captions[${captionIndex}]`, message: 'caption track requires WebVTT, language, and label' });
      }
    });

    const transcript = media.accessibility.transcript;
    if (transcript) {
      validateIdentity(
        { path: transcript.path, sha256: transcript.sha256, bytes: transcript.bytes, mime: 'text/plain' },
        `${path}.accessibility.transcript`,
        issues,
      );
      if (!transcript.path.endsWith('.txt') || !transcript.language || !transcript.label) {
        issues.push({ code: 'invalid-accessibility', path: `${path}.accessibility.transcript`, message: 'transcript requires a plain-text file, language, and label' });
      }
    }
  });

  library.placements.forEach((placement, index) => {
    const path = `placements[${index}]`;
    const media = mediaById.get(placement.mediaId);
    if (!media) {
      issues.push({ code: 'broken-reference', path: `${path}.mediaId`, message: `unknown media ID: ${placement.mediaId}` });
    } else if (media.kind !== 'image') {
      issues.push({ code: 'broken-reference', path: `${path}.mediaId`, message: 'image placements must reference image records' });
    }

    const hasAlt = typeof placement.alt === 'string' && placement.alt.trim().length > 0;
    const isDecorative = placement.decorative === true;
    if (hasAlt === isDecorative) {
      issues.push({
        code: 'invalid-accessibility',
        path,
        message: 'every placement must choose exactly one: useful alt text or decorative: true',
      });
    }
    if (!placement.context.trim()) {
      issues.push({ code: 'invalid-metadata', path: `${path}.context`, message: 'placement context is required' });
    }
  });

  return issues;
}

export function assertValidMediaLibrary(library: MediaLibrary, references?: ReferenceIndex): void {
  const issues = validateMediaLibrary(library, references);
  if (issues.length > 0) {
    const details = issues.map((issue) => `${issue.code} ${issue.path}: ${issue.message}`).join('\n');
    throw new Error(`Media validation failed:\n${details}`);
  }
}
