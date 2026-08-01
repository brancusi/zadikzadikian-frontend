import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mediaLibrary } from '../src/data/media.ts';
import { validateMediaLibrary, type ContentIdentity } from '../src/lib/media/model.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const seriesDirectory = join(root, 'src/content/series');
const seriesIds = new Set(
  readdirSync(seriesDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.slice(0, -3)),
);

const issues = validateMediaLibrary(mediaLibrary, {
  seriesIds,
  workIds: new Set(),
}).map((issue) => `${issue.code} ${issue.path}: ${issue.message}`);

interface FileIdentity extends ContentIdentity {
  label: string;
  expectedWidth?: number;
  expectedHeight?: number;
}

const identities: FileIdentity[] = mediaLibrary.media.flatMap((media) => {
  const own: FileIdentity[] = [{
    ...media.source,
    label: `${media.id}.source`,
    ...(media.kind === 'image'
      ? { expectedWidth: media.width, expectedHeight: media.height }
      : {}),
  }];

  if (media.kind === 'video') {
    media.accessibility.captions.forEach((caption, index) => own.push({
      path: caption.path,
      sha256: caption.sha256,
      bytes: caption.bytes,
      mime: 'text/vtt',
      label: `${media.id}.captions[${index}]`,
    }));
    own.push({
      path: media.accessibility.transcript.path,
      sha256: media.accessibility.transcript.sha256,
      bytes: media.accessibility.transcript.bytes,
      mime: 'text/plain',
      label: `${media.id}.transcript`,
    });
  }

  return own;
});

function pngDimensions(buffer: Buffer): { width: number; height: number } | undefined {
  const pngSignature = '89504e470d0a1a0a';
  if (buffer.length < 24 || buffer.subarray(0, 8).toString('hex') !== pngSignature) return undefined;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

for (const identity of identities) {
  const path = join(root, identity.path);
  if (!existsSync(path) || !statSync(path).isFile()) {
    issues.push(`missing-file ${identity.label}: ${identity.path}`);
    continue;
  }

  const contents = readFileSync(path);
  const sha256 = createHash('sha256').update(contents).digest('hex');
  if (sha256 !== identity.sha256) {
    issues.push(`checksum-mismatch ${identity.label}: expected ${identity.sha256}, received ${sha256}`);
  }
  if (contents.byteLength !== identity.bytes) {
    issues.push(`byte-mismatch ${identity.label}: expected ${identity.bytes}, received ${contents.byteLength}`);
  }

  if (identity.expectedWidth && identity.expectedHeight) {
    const dimensions = extname(path) === '.png' ? pngDimensions(contents) : undefined;
    if (!dimensions) {
      issues.push(`dimension-check ${identity.label}: build validator does not recognize this image format`);
    } else if (dimensions.width !== identity.expectedWidth || dimensions.height !== identity.expectedHeight) {
      issues.push(
        `dimension-mismatch ${identity.label}: expected ${identity.expectedWidth}x${identity.expectedHeight}, received ${dimensions.width}x${dimensions.height}`,
      );
    }
  }
}

function filesBelow(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

const referencedFiles = new Set(identities.map((identity) => join(root, identity.path)));
const managedFiles = [
  ...filesBelow(join(root, 'src/assets/media')),
  ...filesBelow(join(root, 'public/media')),
];
for (const path of managedFiles) {
  if (!referencedFiles.has(path)) {
    issues.push(`unregistered-file ${relative(root, path)}: media files must have a validated public record`);
  }
}

if (issues.length > 0) {
  console.error(`Media validation failed (${issues.length} issue${issues.length === 1 ? '' : 's'}):`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  const totalBytes = identities.reduce((sum, identity) => sum + identity.bytes, 0);
  console.log(`Media validation passed: ${mediaLibrary.media.length} records, ${mediaLibrary.placements.length} placements, ${totalBytes} source bytes.`);
}
