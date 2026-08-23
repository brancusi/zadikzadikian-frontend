# Zadikian site-design implementation

**Source revision:** 23 August 2026

**Status:** Complete static/noindex design implementation; production content, media, contact, indexing, and launch authority remain gated.

## Source and authority

The captain/design team supplied a private Dropbox folder whose nested payload `Artist website redesign mockup.zip` has SHA-256 `73c2292a098504be98caa5f1f74da75b1ba03ccbad22a99b229b07b504c3f821`. All **36 files / 2,756,592 bytes** are retained under [`design-sources/zadikian/site-design/2026-08-23/original/`](../design-sources/zadikian/site-design/2026-08-23/original/) with revision-specific [provenance/safety/file hashes](../design-sources/zadikian/site-design/2026-08-23/source-manifest.json) and [exclusions](../design-sources/zadikian/site-design/2026-08-23/exclusions.json).

The Dropbox response wrapper `03.zip` has SHA-256 `3485cc2adf48d5b29954595075077a6c01facfe9a592f8e88f198bab40e9be1e`. Generic wrapper extraction was refused because it contains an absolute `/` directory entry. The exact nested ZIP was streamed to a fixed temporary path, recursively audited, and path-confined before extraction. All four DOCX containers were reviewed; no macros, embedded objects, secrets, symlinks, special files, traversal, collisions, caches, or unsafe payload entries were present.

Authority remains deliberately separated:

1. the retained design system and site design govern visual direction and interaction intent;
2. [`docs/design-system.md`](./design-system.md) governs the reviewed production adaptation;
3. existing Astro content/media/privacy/preview boundaries govern what may be rendered; and
4. the sitemap/wireframe scout report is planning evidence, not authority over the delivered design or approved content.

## Inspected delivery

All six supplied screens were reviewed in source and rendered at 1440×1000 and 390×844:

| Supplied screen | Implemented route/pattern |
|---|---|
| Home | `/` — full-width opening image, thesis, five chapter rows, evidence band, current-work split, institutional model list, statement handoff |
| Work | `/work/` — five chapter sequence and explicit published-preview index |
| Unit / Structure | reusable `/work/[slug]/` detail header, operations, hero/spec split, selected views, related navigation |
| Artist | `/about/` biography hub, reserved portrait, chronology/evidence columns, collections rule |
| Statements | `/artist-statement/` authorship-gated statement and six-part work-statement structure |
| Information | `/contact/` task routing and press-resource treatment; CV remains its canonical separate route |

The supplied prototype is desktop-authored and has no complete mobile contract: at 390px its rendered pages overflow to 636–872px, and many links measure roughly 13–18px high. The Astro translation therefore preserves the composition rather than those defects: every multi-column pattern reflows at the repository’s 56rem/42rem thresholds, source order controls mobile reading order, primary targets are approximately 44px high, and the document does not rely on horizontal page scrolling.

## Production inventory

- **Shell:** `BaseLayout.astro`, `PreviewBanner.astro`, `SiteHeader.astro`, and expanded `SiteFooter.astro`; one skip link, one main landmark, visible current-page state, and ordinary links.
- **Design components:** existing `SectionHeading`, `ArtworkImage`, `WorkCard`, `EditorialNote`, and `VideoPresentation`, plus `ChapterRow.astro` for the delivered three-column retrospective rhythm.
- **Routes:** `/`, `/work/`, three `/work/{sample}/` pages, `/about/`, `/artist-statement/`, `/cv/`, `/contact/`, and `/404.html`.
- **Media:** 31 placement records route every public visual through `src/lib/media/model.ts`; source artwork remains private and only existing project-created CC0 fixtures render.
- **Runtime:** fully static Astro HTML and responsive images; no client JavaScript, remote fonts, CDN/runtime framework, autoplay, analytics, CMS, form, or third-party request.
- **Tokens:** `src/styles/tokens.css` remains the only production custom-property owner. The implementation reuses paper/ink/gold, Caslon/system families, hairlines, square geometry, spacing, and restrained motion from the landed contract.

## Content and design adaptations

Adopted from the delivery:

- work-first opening and large editorial serif hierarchy;
- five-chapter retrospective rhythm, asymmetric image/text grids, evidence band, and complete index concept;
- captions as visible records, strong section rules, spare metadata, statement side note, chronology rows, contact routing, and press-resource list;
- full-width or dominant images with text beside/below, never over artwork;
- ordinary chapter/index/previous/next links and static semantic HTML.

Deliberately withheld or changed:

- the new first-person statement is privately retained but not reproduced because its own source requires artist approval;
- prototype biography, birth/migration dates, chronology, exhibitions, collections, collaborators, representation, addresses, email, phone, social account, current-project claims, titles, media, dimensions, component counts, and rights language are not treated as approved facts;
- all nine source JPEGs remain reference-only/not cleared; a reserved abstract fixture replaces the proposed portrait;
- remote Google Fonts, React/Babel CDN, `new Function` runtime, image-slot bridge, and prototype postMessage/fetch behavior are not adopted;
- supplied mobile overflow, missing H1s on two screens, undersized targets, and desktop-only grids are corrected;
- Information is split across canonical `/contact/` and `/cv/`; Artist Statement remains a secondary route linked from About/footer rather than displacing the approved four-item primary navigation.

## Redirects and metadata

`netlify.toml` adds only exact one-hop 301 migrations for implemented equivalents:

- `/bio` → `/about/`
- `/resume` → `/cv/`
- `/path-to-nine-work` → `/work/path-to-nine/`
- `/work/gold-stacks` → `/work/stacks/`
- `/solis` → `/work/solis/`

Conditional or omitted content is not redirected to Home. Astro keeps directory-format trailing slashes. Every route retains `noindex, nofollow, noarchive`; `robots.txt`, Netlify `X-Robots-Tag`, CSP, and static output remain unchanged. A public canonical origin is intentionally not invented while the repository remains a noindex preview.

## Validation and remaining gates

Run `pnpm validate` for preserved-source integrity, media rights/accessibility/reference checks, Astro type checking, static build, Vitest boundaries, and HTML validation. Browser acceptance covers every route at desktop/mobile and one-pixel breakpoint edges, 200%/400% effective zoom widths, overflow, focus order/visibility, reduced motion, forced colors, image loading, metadata, console/network errors, and page-weight-sensitive routes.

### Recorded browser acceptance

The normal Chrome adapter could not discover its fixed system path, so the available Chrome-for-Testing binary was launched without changing shared paths through a worktree-local Playwright Core runner. The same runner was also used to inspect the six delivered prototypes before implementation.

- 20 complete implementation captures: all 10 routes at 1440×1000 and 390×844;
- 36 breakpoint/zoom runs across Home, Work, Stacks, and Artist Statement at 320, 400, 671/672/673, 800, and 895/896/897 CSS pixels (minimum width, 400%/200% effective widths, and one-pixel edges around 42rem/56rem);
- zero horizontal page overflows, broken images, external requests, failed responses, console errors, or undersized primary targets;
- one H1 and one main per route; exact noindex metadata; no canonical invented in preview; no script elements;
- keyboard sequence verified through skip link, wordmark, primary navigation, and chapter links with a visible 3px outline;
- reduced-motion and forced-colors media both active, with visible image/current-navigation borders;
- representative local transfer totals: Home 43,207 bytes, Work 6,192 bytes, and Stacks 13,424 bytes during the measured run.

`pnpm validate` remains the reproducible repository gate. Browser evidence and screenshots are task-local QA artifacts rather than committed public media.

Still deferred: production indexing/canonical origin, public artwork or portrait ingestion, first-person copy approval, factual biography/CV/exhibition/collection review, representation/contact verification, form/privacy operations, press downloads, real video/provider activation, conditional legacy dispositions, activity pages, DNS, and launch approval.
