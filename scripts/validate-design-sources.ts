import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { isAbsolute, join, posix, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

interface RetainedFile {
  path: string;
  bytes: number;
  mode: '100644';
  sha256: string;
}

interface SourceManifest {
  schemaVersion: number;
  sourceRevision: string;
  provenance: {
    archiveName: string;
    archiveBytes: number;
    archiveSha256: string;
    archiveEntryCount: number;
    archiveExpandedBytes: number;
  };
  retention: {
    root: string;
    fileCount: number;
    totalBytes: number;
    files: RetainedFile[];
  };
}

interface ExclusionsManifest {
  schemaVersion: number;
  sourceRevision: string;
  archiveSha256: string;
  excludedArchiveEntries: string[];
  excludedExternalArtifacts: Array<{
    path: string;
    bytes: number;
    sha256: string;
  }>;
}

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url));
const sourceRoot = join(repositoryRoot, 'design-sources/zadikian');
const manifest = JSON.parse(
  readFileSync(join(sourceRoot, 'source-manifest.json'), 'utf8'),
) as SourceManifest;
const exclusions = JSON.parse(
  readFileSync(join(sourceRoot, 'exclusions.json'), 'utf8'),
) as ExclusionsManifest;
const originalRoot = join(sourceRoot, 'original');
const issues: string[] = [];

const expectedArchive = {
  name: 'Zadikian-Design-System.zip',
  bytes: 2_340_201,
  sha256: '5adb2e06afb5476316b6ce828a67e6eafcce8e43bf8fae01091afb0ba5e41642',
  entries: 75,
  expandedBytes: 2_456_068,
};

if (manifest.schemaVersion !== 1) issues.push('source manifest schemaVersion must be 1');
if (manifest.sourceRevision !== 'original-5adb2e06afb5') issues.push('unexpected source revision');
if (manifest.provenance.archiveName !== expectedArchive.name) issues.push('archive name changed');
if (manifest.provenance.archiveBytes !== expectedArchive.bytes) issues.push('archive byte count changed');
if (manifest.provenance.archiveSha256 !== expectedArchive.sha256) issues.push('archive SHA-256 changed');
if (manifest.provenance.archiveEntryCount !== expectedArchive.entries) issues.push('archive entry count changed');
if (manifest.provenance.archiveExpandedBytes !== expectedArchive.expandedBytes) issues.push('archive expanded byte count changed');
if (manifest.retention.root !== 'original') issues.push('retention root must remain original');

if (exclusions.schemaVersion !== 1) issues.push('exclusions manifest schemaVersion must be 1');
if (exclusions.sourceRevision !== manifest.sourceRevision) issues.push('exclusions source revision differs from source manifest');
if (exclusions.archiveSha256 !== expectedArchive.sha256) issues.push('exclusions archive SHA-256 changed');
if (exclusions.excludedArchiveEntries.length !== 0) issues.push('all safe archive entries must remain retained');
if (
  exclusions.excludedExternalArtifacts.length !== 1
  || exclusions.excludedExternalArtifacts[0]?.path !== expectedArchive.name
  || exclusions.excludedExternalArtifacts[0]?.bytes !== expectedArchive.bytes
  || exclusions.excludedExternalArtifacts[0]?.sha256 !== expectedArchive.sha256
) {
  issues.push('the ZIP transport container must be the only external exclusion');
}

const manifestPaths = manifest.retention.files.map((file) => file.path);
const sortedManifestPaths = [...manifestPaths].sort();
if (new Set(manifestPaths).size !== manifestPaths.length) issues.push('source manifest contains duplicate paths');
if (manifestPaths.some((path, index) => path !== sortedManifestPaths[index])) issues.push('source manifest paths are not sorted');

function isSafeRelativePath(path: string): boolean {
  return path.length > 0
    && !isAbsolute(path)
    && !path.includes('\\')
    && !path.includes('\0')
    && posix.normalize(path) === path
    && !path.split('/').includes('..');
}

const observedPaths: string[] = [];
function inventory(directory: string): void {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name);
    const sourcePath = relative(originalRoot, absolutePath).split(sep).join('/');
    const stats = lstatSync(absolutePath);
    if (stats.isSymbolicLink()) {
      issues.push(`special path is not permitted: ${sourcePath} (symlink)`);
    } else if (stats.isDirectory()) {
      inventory(absolutePath);
    } else if (stats.isFile()) {
      observedPaths.push(sourcePath);
    } else {
      issues.push(`special path is not permitted: ${sourcePath}`);
    }
  }
}
inventory(originalRoot);
observedPaths.sort();

for (const path of manifestPaths) {
  if (!isSafeRelativePath(path)) issues.push(`unsafe manifest path: ${path}`);
}
for (const path of observedPaths.filter((path) => !manifestPaths.includes(path))) {
  issues.push(`unmanifested source file: ${path}`);
}
for (const path of manifestPaths.filter((path) => !observedPaths.includes(path))) {
  issues.push(`missing preserved source file: ${path}`);
}

let totalBytes = 0;
for (const file of manifest.retention.files) {
  if (!observedPaths.includes(file.path)) continue;
  const absolutePath = join(originalRoot, ...file.path.split('/'));
  const stats = lstatSync(absolutePath);
  const contents = readFileSync(absolutePath);
  const mode = stats.mode & 0o111 ? '100755' : '100644';
  const sha256 = createHash('sha256').update(contents).digest('hex');
  totalBytes += contents.byteLength;
  if (file.mode !== mode) issues.push(`mode mismatch ${file.path}: expected ${file.mode}, received ${mode}`);
  if (file.bytes !== contents.byteLength) issues.push(`byte mismatch ${file.path}: expected ${file.bytes}, received ${contents.byteLength}`);
  if (file.sha256 !== sha256) issues.push(`checksum mismatch ${file.path}: expected ${file.sha256}, received ${sha256}`);
}

if (manifest.retention.fileCount !== expectedArchive.entries) issues.push('retained file count must remain 75');
if (manifest.retention.files.length !== manifest.retention.fileCount) issues.push('manifest file count does not match its file list');
if (observedPaths.length !== manifest.retention.fileCount) issues.push(`observed ${observedPaths.length} files, expected ${manifest.retention.fileCount}`);
if (manifest.retention.totalBytes !== expectedArchive.expandedBytes) issues.push('retained byte count must remain 2,456,068');
if (totalBytes !== manifest.retention.totalBytes) issues.push(`observed ${totalBytes} bytes, expected ${manifest.retention.totalBytes}`);

if (issues.length > 0) {
  console.error(`Preserved design-source validation failed:\n- ${issues.join('\n- ')}`);
  process.exit(1);
}

console.log(`Validated preserved Zadikian source: ${observedPaths.length} files / ${totalBytes} bytes.`);
