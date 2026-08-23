# Preserved Zadikian design-system source

This directory retains the complete private design reference supplied by the captain/team and authorized by them for repository retention. The verified `Zadikian-Design-System.zip` contained **75 files / 2,456,068 bytes**; every archive entry is preserved byte-for-byte under [`original/`](./original/).

## Boundaries

- `original/` is immutable source/reference material. Do not edit it in place, execute its JavaScript, install its dependencies, or connect it to the production build.
- All proposal copy, contacts, runtime files, examples, screenshots/thumbnails, exports, and artwork are retained for private reference—not adopted as site content.
- In particular, `original/assets/web/*.jpg` is **reference-only / not cleared for public use**. The archive contains no explicit artwork or photography license. Fonts are referenced but no font files or license were supplied. Public use of any source asset still requires [`docs/media-intake.md`](../../docs/media-intake.md), [`CONTENT-LICENSE.md`](../../CONTENT-LICENSE.md), and the repository media/license gate.
- The reviewed production adaptation remains the summarized contract in [`docs/design-system.md`](../../docs/design-system.md), the token implementation in [`src/styles/tokens.css`](../../src/styles/tokens.css), and reusable Astro components in [`src/components/`](../../src/components/). Future design work must consult both this complete source and that summarized contract.

[`source-manifest.json`](./source-manifest.json) records archive provenance, safety results, and each retained path, byte size, Git mode, and SHA-256. [`exclusions.json`](./exclusions.json) records every exclusion. The only excluded artifact was the downloaded ZIP transport container itself: there were no excluded archive entries, unsafe/special paths, credentials, OS metadata, dependency caches, or Git-unsafe entries. Hidden `.thumbnail` files and all nine artwork JPEGs are intentionally retained.

Run `pnpm validate:design-sources` (also part of the normal check/build/test/validate paths) to detect changes, deletions, mode changes, or additions.

## Later revisions

Never replace or rewrite `original/` or its manifests. Intake a later captain-authorized archive with the same hash, safety, credential, and license review; preserve it under a separately identified sibling revision; add revision-specific deterministic manifests and exclusions; then review any production-contract change separately. This keeps each source revision and its provenance intact.
