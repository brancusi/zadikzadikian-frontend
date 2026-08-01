# Media intake and publication gate

Real media remains outside this preview until an authorized owner supplies source masters and approves each publication record. The 255 image URLs and four videos found by public inventory are evidence for migration planning only: they are not approved masters, rights evidence, or sources to download, hotlink, republish, or upload.

## Intake checklist

Complete every step for each image or video before changing its visibility to public.

1. **Receive an owner-supplied master.** Record the transfer date and an opaque provenance reference. Do not ingest from Squarespace, YouTube, Mux, a browser cache, or another public CDN.
2. **Confirm rights and credits.** Identify rights holder, creator/photographer/filmmaker, approved credit line, public-web permission, license or usage scope, crop/alteration permission, and review/expiry date. Obtain any required model, property, music, exhibition, memorial, or community releases. Portraits, people, nude studies, and memorial work require heightened review.
3. **Preserve the source identity.** Calculate a full SHA-256 checksum and record bytes, MIME type, intrinsic dimensions, and video duration. Retain the archival master and private permission evidence in owner-controlled systems—not this public media record or repository.
4. **Create a web-source derivative.** Normalize orientation and color, strip nonessential private metadata, set reviewed dimensions/quality, checksum the derivative, and name it `<stable-id>--<sha12>.<ext>`. Never overwrite a file at a mutable URL.
5. **Complete public metadata.** Assign a stable typed ID; creator and credit; opaque provenance reference; rights state; caption; alt guidance; focal point; and related work/series IDs. Verify artwork title, date, materials, dimensions, edition, and image-to-record association separately.
6. **Review every placement.** Choose useful contextual alt text or `decorative: true` for each placement. Review responsive crops and focal position at mobile and desktop sizes. Captions and credits do not replace alt text.
7. **Prepare video accessibility.** Supply a reviewed poster/frame time, language metadata, human-corrected WebVTT captions, linked HTML/plain-text transcript, meaningful sound cues, and an audio-description or descriptive-transcript decision. Test controls and playback only after a provider is approved.
8. **Validate and review.** Run `pnpm validate`, inspect generated responsive output, perform keyboard/mobile/desktop review, and obtain editorial, crop/color, credit, rights, and accessibility signoff in the pull request.

Private contracts, release files, permission notes, archival URIs, signing keys, API credentials, personal addresses, and storage locations must never be added to `src/data/media.ts`. Public records contain only an opaque provenance reference.

## Current preview implementation

- `src/lib/media/model.ts` is the provider-neutral image/video contract and strict validator.
- `src/data/media.ts` contains public fixture records and placement decisions.
- `scripts/validate-media.ts` verifies references, rights, accessibility metadata, files, dimensions, bytes, SHA-256 digests, and content-addressed names before every production build.
- `src/lib/media/image-provider.ts` is the sole image-source/URL adapter. Astro creates static AVIF/WebP width candidates; Netlify serves the fingerprinted output with immutable caching.
- `src/lib/media/video-provider.ts` is the provider boundary. It supports only the inert local study; it has no Mux IDs, URLs, credentials, requests, analytics, or playback.

## Decisions required before real ingestion

- Which exact images and videos may be published, and which sensitive/person/nude/memorial records remain withheld.
- Who owns each master and public-web permission; exact creator, copyright, and credit wording; release status; territory/duration; and crop/alteration permission.
- Whether approved web-source derivatives may be distributed in public Git under the repository-size gate or must use an artist-controlled immutable origin.
- The authoritative work/series metadata and factual associations for each asset.
- The initial video list, source-master ownership, maximum quality, public playback policy, Mux account owner, privacy/analytics posture, and provider budget. Mux activation remains a separately reviewed phase.
- Who gives final editorial, rights, crop/color, alt, caption, transcript, and audio-description approval, and how review/expiry dates are maintained.

None of these decisions authorizes domain/DNS changes, a current-site migration, or an external service operation.
