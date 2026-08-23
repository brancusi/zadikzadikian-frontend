# Preserved Zadikian design sources

This directory retains two complete, private, captain-authorized references:

1. the original design system: `Zadikian-Design-System.zip`, **75 files / 2,456,068 bytes**, preserved byte-for-byte under [`original/`](./original/); and
2. the complete site-design delivery dated 23 August 2026: **36 files / 2,756,592 bytes**, preserved under [`site-design/2026-08-23/original/`](./site-design/2026-08-23/original/) with its own [README](./site-design/2026-08-23/README.md) and deterministic manifests.

## Boundaries

- Both preserved `original/` trees are immutable source/reference material. Do not edit them in place, execute their JavaScript, install dependencies from them, or connect them to the production build.
- All proposal/site copy, contacts, runtime files, examples, screens, screenshots/thumbnails, exports, documents, and artwork are retained for private reference—not automatically adopted as site content.
- Every preserved `assets/web/*.jpg` is **reference-only / not cleared for public use**. Neither delivery contains an explicit artwork/photography license, complete credit, or public-web permission. Fonts are referenced but no font files or license were supplied. Public use still requires [`docs/media-intake.md`](../../docs/media-intake.md), [`CONTENT-LICENSE.md`](../../CONTENT-LICENSE.md), and the repository media/license gate.
- The reviewed production adaptation remains the summarized contract in [`docs/design-system.md`](../../docs/design-system.md), implementation record in [`docs/site-design-implementation.md`](../../docs/site-design-implementation.md), token implementation in [`src/styles/tokens.css`](../../src/styles/tokens.css), reusable Astro components, and pages. Future visual work must consult the complete design system, the complete latest site design, the summarized contract, and the Astro implementation.

The root [`source-manifest.json`](./source-manifest.json) and [`exclusions.json`](./exclusions.json) guard the design-system delivery. The site-design revision has separate [source](./site-design/2026-08-23/source-manifest.json) and [exclusion](./site-design/2026-08-23/exclusions.json) manifests, including its unsafe Dropbox wrapper finding and recursively reviewed DOCX containers.

Run `pnpm validate:design-sources` (also part of normal check/build/test/validate paths) to detect changes, deletions, mode changes, or additions in both immutable source trees.

## Later revisions

Never replace or rewrite either retained revision or its manifests. Intake a later captain-authorized delivery with the same hash, recursive safety, credential, and license review; preserve it under a separately identified dated sibling revision; add deterministic manifests and exclusions; then review production-contract and implementation changes separately. This keeps every source revision and its provenance intact.
