# Preserved Zadikian site design — 23 August 2026

This revision retains the complete meaningful site-design payload supplied by the captain/design team through the private Dropbox folder named `03`. The payload is preserved byte-for-byte under [`original/`](./original/): **36 files / 2,756,592 bytes**. It includes all six page prototypes, the prototype runtime and interactions, design-system bundle/tokens, nine artwork-reference JPEGs, four editorial text exports, four source DOCX files, and the supplied thumbnail.

## Provenance and intake

- Share: `https://www.dropbox.com/scl/fo/dkvepbrm23mijf3wae4ez/AAeFih0D7qVoqUtCyYNV45k?rlkey=lrmjr1dpr4m5gw9g1askrta9f&dl=0`
- Dropbox response: `03.zip` — **2,523,923 bytes** — SHA-256 `3485cc2adf48d5b29954595075077a6c01facfe9a592f8e88f198bab40e9be1e`
- Nested payload: `Artist website redesign mockup.zip` — **2,523,627 bytes** — SHA-256 `73c2292a098504be98caa5f1f74da75b1ba03ccbad22a99b229b07b504c3f821`
- Payload inventory: **36 entries / 2,756,592 expanded bytes / 1.092× archive-to-expanded ratio**
- Nested document inventory: four ZIP-based DOCX files, 92 entries, 3,700,340 expanded bytes; no macros, embedded objects, or further nested archives

The Dropbox wrapper itself was not generically extracted: it contains an unsafe absolute directory entry named `/` and marks the nested ZIP executable. Intake streamed only the exact nested regular ZIP to a fixed temporary filename, audited it recursively, and then extracted its 36 safe entries with a path-confined writer. CRCs passed. The payload has no encrypted entries, absolute or parent-traversal paths, backslashes, duplicate/case-colliding paths, symlinks, special files, executable modes, OS metadata, dependency caches, or credential signatures.

[`source-manifest.json`](./source-manifest.json) records the request/effective URLs, transport and payload hashes, wrapper and nested-archive review, active-file findings, and every retained path/size/mode/hash/CRC. [`exclusions.json`](./exclusions.json) records every transport and unsafe-path exclusion. There were **no excluded payload entries** and no detected actual secrets.

## Immutable source and production boundary

`original/` is private, immutable reference material. Never edit it in place, execute its JavaScript, install anything from it, or import it into the production build. `support.js`, `image-slot.js`, and the design-system bundle contain prototype-only active behavior including runtime evaluation, fetches, script injection, postMessage, and remote React/Babel/font references. They are retained because they are meaningful design source, not because they are approved architecture.

The prototype's labels, first-person statement, biography, dates, exhibition history, contact addresses, representation, rights claims, captions, titles, dimensions, and institutional claims are design/editorial examples pending owner verification. They are not approved public content. The Astro implementation must use repository-approved routes and preview language and must keep unresolved facts withheld.

All nine `original/assets/web/*.jpg` images are **private artwork reference / not cleared for public use**. The payload supplies no standalone artwork/photography license, photographer credits, crop permission, or public-web approval. Repository retention is not publication permission. The Google Fonts reference also supplies neither font binaries nor a font license. Public media remains governed by [`docs/media-intake.md`](../../../../docs/media-intake.md), [`CONTENT-LICENSE.md`](../../../../CONTENT-LICENSE.md), and `scripts/validate-media.ts`.

The production adaptation lives only in the static Astro implementation: [`src/styles/tokens.css`](../../../../src/styles/tokens.css), reusable [`src/components/`](../../../../src/components/), and [`src/pages/`](../../../../src/pages/). The summarized visual contract remains [`docs/design-system.md`](../../../../docs/design-system.md). The full design-system source at [`design-sources/zadikian/original/`](../../original/) and this complete site-design revision must both be consulted for future visual work.

Run `pnpm validate:design-sources` (included in every normal validation path) to detect additions, deletions, mode drift, or byte changes.

## Future revisions

Never replace this revision or rewrite `original/`, its manifests, or this provenance record. For a later captain-authorized delivery:

1. download into a new ignored worktree-local intake directory;
2. hash and recursively inventory every transport/archive before path-confined extraction;
3. refuse unsafe generic extraction and document every excluded wrapper, path, secret, metadata file, cache, or Git-unsafe entry;
4. preserve the complete meaningful payload under a new dated sibling revision with deterministic manifests; and
5. review rights, facts, routes, design-contract changes, and production adoption separately.
