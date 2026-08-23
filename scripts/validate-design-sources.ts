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

interface SiteSourceManifest {
  schemaVersion: number;
  sourceRevision: string;
  provenance: {
    downloadResponse: { filename: string; bytes: number; sha256: string };
    payloadArchive: {
      filename: string;
      bytes: number;
      sha256: string;
      entryCount: number;
      expandedBytes: number;
    };
  };
  safetyReview: {
    genericWrapperExtractionRefused: boolean;
    nestedArchiveReview: { unsafeFindings: number };
  };
  retention: {
    root: string;
    fileCount: number;
    totalBytes: number;
    files: RetainedFile[];
  };
}

interface SiteExclusionsManifest {
  schemaVersion: number;
  sourceRevision: string;
  payloadArchiveSha256: string;
  excludedPayloadEntries: string[];
  excludedTransportArtifacts: Array<{
    path: string;
    bytes: number;
    sha256: string | null;
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

function inventory(root: string, directory: string, observed: string[], label: string): void {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name);
    const sourcePath = relative(root, absolutePath).split(sep).join('/');
    const stats = lstatSync(absolutePath);
    if (stats.isSymbolicLink()) {
      issues.push(`${label} special path is not permitted: ${sourcePath} (symlink)`);
    } else if (stats.isDirectory()) {
      inventory(root, absolutePath, observed, label);
    } else if (stats.isFile()) {
      observed.push(sourcePath);
    } else {
      issues.push(`${label} special path is not permitted: ${sourcePath}`);
    }
  }
}

const observedPaths: string[] = [];
inventory(originalRoot, originalRoot, observedPaths, 'design-system');
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

const siteRevisionRoot = join(sourceRoot, 'site-design/2026-08-23');
const siteManifest = JSON.parse(
  readFileSync(join(siteRevisionRoot, 'source-manifest.json'), 'utf8'),
) as SiteSourceManifest;
const siteExclusions = JSON.parse(
  readFileSync(join(siteRevisionRoot, 'exclusions.json'), 'utf8'),
) as SiteExclusionsManifest;
const siteOriginalRoot = join(siteRevisionRoot, 'original');
const expectedSite = {
  revision: 'site-design-2026-08-23-73c2292a0985',
  wrapperName: '03.zip',
  wrapperBytes: 2_523_923,
  wrapperSha256: '3485cc2adf48d5b29954595075077a6c01facfe9a592f8e88f198bab40e9be1e',
  archiveName: 'Artist website redesign mockup.zip',
  archiveBytes: 2_523_627,
  archiveSha256: '73c2292a098504be98caa5f1f74da75b1ba03ccbad22a99b229b07b504c3f821',
  entries: 36,
  expandedBytes: 2_756_592,
};

if (siteManifest.schemaVersion !== 1) issues.push('site-design source manifest schemaVersion must be 1');
if (siteManifest.sourceRevision !== expectedSite.revision) issues.push('unexpected site-design source revision');
if (siteManifest.provenance.downloadResponse.filename !== expectedSite.wrapperName) issues.push('site-design wrapper name changed');
if (siteManifest.provenance.downloadResponse.bytes !== expectedSite.wrapperBytes) issues.push('site-design wrapper byte count changed');
if (siteManifest.provenance.downloadResponse.sha256 !== expectedSite.wrapperSha256) issues.push('site-design wrapper SHA-256 changed');
if (siteManifest.provenance.payloadArchive.filename !== expectedSite.archiveName) issues.push('site-design payload archive name changed');
if (siteManifest.provenance.payloadArchive.bytes !== expectedSite.archiveBytes) issues.push('site-design payload archive byte count changed');
if (siteManifest.provenance.payloadArchive.sha256 !== expectedSite.archiveSha256) issues.push('site-design payload archive SHA-256 changed');
if (siteManifest.provenance.payloadArchive.entryCount !== expectedSite.entries) issues.push('site-design payload entry count changed');
if (siteManifest.provenance.payloadArchive.expandedBytes !== expectedSite.expandedBytes) issues.push('site-design payload expanded bytes changed');
if (!siteManifest.safetyReview.genericWrapperExtractionRefused) issues.push('site-design unsafe wrapper extraction refusal must remain recorded');
if (siteManifest.safetyReview.nestedArchiveReview.unsafeFindings !== 0) issues.push('site-design nested archive review must remain safe');
if (siteManifest.retention.root !== 'original') issues.push('site-design retention root must remain original');

if (siteExclusions.schemaVersion !== 1) issues.push('site-design exclusions schemaVersion must be 1');
if (siteExclusions.sourceRevision !== siteManifest.sourceRevision) issues.push('site-design exclusions revision differs from source manifest');
if (siteExclusions.payloadArchiveSha256 !== expectedSite.archiveSha256) issues.push('site-design exclusions payload SHA-256 changed');
if (siteExclusions.excludedPayloadEntries.length !== 0) issues.push('all safe site-design payload entries must remain retained');
if (
  siteExclusions.excludedTransportArtifacts.length !== 3
  || siteExclusions.excludedTransportArtifacts[0]?.path !== expectedSite.wrapperName
  || siteExclusions.excludedTransportArtifacts[0]?.bytes !== expectedSite.wrapperBytes
  || siteExclusions.excludedTransportArtifacts[0]?.sha256 !== expectedSite.wrapperSha256
  || siteExclusions.excludedTransportArtifacts[1]?.path !== '03.zip!/'
  || siteExclusions.excludedTransportArtifacts[2]?.path !== '03.zip!/Artist website redesign mockup.zip'
  || siteExclusions.excludedTransportArtifacts[2]?.bytes !== expectedSite.archiveBytes
  || siteExclusions.excludedTransportArtifacts[2]?.sha256 !== expectedSite.archiveSha256
) {
  issues.push('site-design transport exclusions changed');
}

const siteManifestPaths = siteManifest.retention.files.map((file) => file.path);
const sortedSiteManifestPaths = [...siteManifestPaths].sort();
if (new Set(siteManifestPaths).size !== siteManifestPaths.length) issues.push('site-design manifest contains duplicate paths');
if (siteManifestPaths.some((path, index) => path !== sortedSiteManifestPaths[index])) issues.push('site-design manifest paths are not sorted');
siteManifestPaths.filter((path) => !isSafeRelativePath(path)).forEach((path) => issues.push(`unsafe site-design manifest path: ${path}`));

const observedSitePaths: string[] = [];
inventory(siteOriginalRoot, siteOriginalRoot, observedSitePaths, 'site-design');
observedSitePaths.sort();
observedSitePaths.filter((path) => !siteManifestPaths.includes(path)).forEach((path) => issues.push(`unmanifested site-design source file: ${path}`));
siteManifestPaths.filter((path) => !observedSitePaths.includes(path)).forEach((path) => issues.push(`missing preserved site-design source file: ${path}`));

let siteTotalBytes = 0;
for (const file of siteManifest.retention.files) {
  if (!observedSitePaths.includes(file.path)) continue;
  const absolutePath = join(siteOriginalRoot, ...file.path.split('/'));
  const stats = lstatSync(absolutePath);
  const contents = readFileSync(absolutePath);
  const mode = stats.mode & 0o111 ? '100755' : '100644';
  const sha256 = createHash('sha256').update(contents).digest('hex');
  siteTotalBytes += contents.byteLength;
  if (file.mode !== mode) issues.push(`site-design mode mismatch ${file.path}: expected ${file.mode}, received ${mode}`);
  if (file.bytes !== contents.byteLength) issues.push(`site-design byte mismatch ${file.path}: expected ${file.bytes}, received ${contents.byteLength}`);
  if (file.sha256 !== sha256) issues.push(`site-design checksum mismatch ${file.path}: expected ${file.sha256}, received ${sha256}`);
}

if (siteManifest.retention.fileCount !== expectedSite.entries) issues.push('site-design retained file count must remain 36');
if (siteManifest.retention.files.length !== siteManifest.retention.fileCount) issues.push('site-design manifest count does not match its file list');
if (observedSitePaths.length !== siteManifest.retention.fileCount) issues.push(`observed ${observedSitePaths.length} site-design files, expected ${siteManifest.retention.fileCount}`);
if (siteManifest.retention.totalBytes !== expectedSite.expandedBytes) issues.push('site-design retained byte count must remain 2,756,592');
if (siteTotalBytes !== siteManifest.retention.totalBytes) issues.push(`observed ${siteTotalBytes} site-design bytes, expected ${siteManifest.retention.totalBytes}`);

if (issues.length > 0) {
  console.error(`Preserved design-source validation failed:\n- ${issues.join('\n- ')}`);
  process.exit(1);
}

console.log(`Validated preserved Zadikian sources: design system ${observedPaths.length} files / ${totalBytes} bytes; site design ${observedSitePaths.length} files / ${siteTotalBytes} bytes.`);
