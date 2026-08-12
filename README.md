# Zadik Zadikian website preview

A static, noindex design preview for the proposed replacement artist website. It demonstrates an image-led visual direction and representative information architecture without migrating the current site's media or publishing unresolved launch content.

## Preview boundaries

- **Not a production launch or migration approval.** The custom domain, DNS, registrar, Cloudflare, current Squarespace site, forms, analytics, CMS, Mux, and paid services are untouched.
- Every visual is an original geometric interface fixture labeled **not an artwork by Zadik Zadikian**.
- Biographical conflicts, private contact details, current representation, project status, portrait rights, staging video, and redirect dispositions remain withheld.
- All routes include `noindex, nofollow, noarchive`; `robots.txt` disallows crawling and Netlify supplies a matching `X-Robots-Tag` header.

See [CONTENT-LICENSE.md](./CONTENT-LICENSE.md) for the content/media boundary.

## Stack

- Astro `7.1.6`, static output, strict TypeScript
- Native Astro responsive image generation (AVIF/WebP width candidates) with Netlify `dist` publishing and immutable fingerprinted assets
- Node `24.18.0` and pnpm `11.18.0`, pinned in repository files and lockfile
- Strict media/rights/accessibility validation, Vitest boundary tests, and static HTML validation
- No client JavaScript, server runtime, database, form processing, analytics, CMS, active video player, or third-party media

## Local development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Run the complete local gate:

```bash
pnpm validate
```

That performs Astro type checking, a production build, focused preview-boundary tests, and accessibility-oriented static HTML validation.

## Representative routes

- `/` — first-screen design direction and selected sample series
- `/work/` — sample work index
- `/work/path-to-nine/`, `/work/stacks/`, `/work/solis/` — clearly labeled sample series pages
- `/about/` — biography and statement treatment with disputed facts withheld
- `/cv/` — structured CV treatment using non-factual model entries
- `/contact/` — task-based contact treatment with no active channels or form
- `/404.html` — static not-found treatment

## Content and media model

Sample series records live in `src/content/series/` and are validated by `src/content.config.ts`. The literal `status: sample` boundary is intentional.

`src/lib/media/model.ts` defines one provider-neutral image/video record with stable IDs, checksummed sources, intrinsic metadata, rights/credit/provenance, focal and relationship data, placement-level alt decisions, and video poster/caption/transcript requirements. `scripts/validate-media.ts` validates records and source files before every production build. Provider logic is isolated in `src/lib/media/`; the current video adapter is intentionally inert.

All included visuals are tiny, project-created design studies—not Zadikian artworks. Informative placements have contextual alt text; linked-card studies are deliberately decorative. The homepage has one deliberate eager/high-priority image; other fixture images are lazy. Core gallery browsing and previous/next navigation use ordinary links with no JavaScript.

## Media intake gate

Real media may replace fixtures only after this minimum checklist is complete:

1. receive owner-supplied masters—never scrape or hotlink a public CDN;
2. confirm public-web rights, creator/credit, crop permission, and any model/property/music/community releases;
3. calculate master and web-derivative checksums and create immutable content-addressed filenames;
4. review intrinsic dimensions, color/orientation, focal point, caption, related records, and placement-specific alt/decorative decisions;
5. provide a reviewed poster, human-corrected captions, transcript, and audio-description decision for every public video; and
6. pass build validation plus editorial, rights, accessibility, mobile/desktop crop, and color review.

Private permission evidence and archival locations stay outside public records. Decisions still required before real ingestion include the approved asset list, sensitive portrait/nude/memorial holds, master ownership and exact credits, Git versus artist-controlled web-source origin, authoritative work associations, Mux scope/account/privacy/budget, and named final approvers.

See [the complete media intake and publication gate](./docs/media-intake.md).

Netlify continuous deployment should be provided by the repository's existing Git integration. GitHub Actions validates but does not perform a second deployment. The Netlify adapter is intentionally absent: current adapter releases emit a runtime function, while this preview must remain entirely static.
