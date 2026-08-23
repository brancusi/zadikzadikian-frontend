# Zadikian website design system

This document is the reviewed, summarized production contract for visual design—not a substitute for the supplied source. The three design-system layers are:

1. the complete immutable private reference in [`design-sources/zadikian/original/`](../design-sources/zadikian/original/);
2. this summarized production contract; and
3. the implementation owned by [`src/styles/tokens.css`](../src/styles/tokens.css) and reusable [`src/components/`](../src/components/).

Components and pages consume the implementation tokens and must not declare competing custom properties. Future site design must consult both the complete original source and this contract before changing production code.

## Provenance and intake

The captain/team supplied the private Dropbox archive `Zadikian-Design-System.zip` and authorized retention in this private repository.

- SHA-256: `5adb2e06afb5476316b6ce828a67e6eafcce8e43bf8fae01091afb0ba5e41642`
- Downloaded size: 2,340,201 bytes
- Inventory retained: 75 files; 2,456,068 bytes
- Safety review before extraction: CRC valid; no nested archives, symlinks, executable bits, encrypted entries, absolute paths, `..` traversal, case collisions, OS metadata, dependency caches, credentials, or special file types
- Deterministic provenance, per-file hashes/modes, and the sole exclusion (the ZIP transport container) are recorded in [`design-sources/zadikian/source-manifest.json`](../design-sources/zadikian/source-manifest.json) and [`exclusions.json`](../design-sources/zadikian/exclusions.json).

The source proposal/runtime files, examples, documentation, thumbnails, exports, and artwork references are preserved byte-for-byte but are not executed, installed, imported, or included in the production build. `original/` must not be edited in place; later source revisions require separately identified preserved directories and manifests.

## Authority and boundaries

The supplied system is the complete visual source. This contract reviews and translates it into static Astro, semantic HTML, and repository constraints; it does not adopt the proposal application or its content.

Adopted contracts:

- typography leads: display serif for headings and the name-as-wordmark, text serif for prose, grotesque for navigation and metadata;
- gallery-white surfaces, near-black ink, hairline structure, and restrained gold;
- pigment colors only as small index/key marks, with at most one pigment in a view;
- generous spacing, asymmetric layouts, a dominant axis, and readable body measures;
- square geometry, no elevation, no decorative boxes, no texture, and no gradients;
- no icon set or logo; use words or the approved typographic marks `—`, `→`, `↗`, and `§` when their meaning is clear;
- no text over artwork, no image tint/duotone/silhouette treatment, and no image motion on hover;
- institutional, declarative copy; sentence-case headings; uppercase tracked metadata; canonical artwork tombstones.

The supplied archive was built for acquisition dossiers, not the public website. Its proposal navigation, contact details, prices, product claims, sample facts, work titles, dimensions, and interaction model are examples only. They are not approved website content. Existing preview boundaries in [`README.md`](../README.md) and [`tests/preview-boundaries.test.ts`](../tests/preview-boundaries.test.ts) remain controlling.

## Implementation map

- **Tokens:** `src/styles/tokens.css` is the only custom-property owner.
- **Global application:** `src/styles/global.css` applies reset, typography, focus, layout, responsive, forced-colors, and reduced-motion behavior.
- **Components:** `src/components/` contains Astro translations. `SectionHeading.astro` is the reference translation of the supplied rule/label/display-heading pattern. Existing media and editorial components retain their semantic and privacy contracts while using the system tokens.
- **Media and assets:** all public image/video records continue through `src/lib/media/model.ts` and `scripts/validate-media.ts`. See [`docs/media-intake.md`](./media-intake.md).
- **Contract guard:** `tests/design-system.test.ts` protects token ownership, foundational rules, local-only typography, and representative static integration.

The supplied CSS reused `--text-display`, `--text-body`, and `--text-meta` for both colors and font sizes. The website removes that collision: color roles end in `-color`; type steps begin with `--font-size-`. The supplied `--gold-leaf` gradient is intentionally not implemented because the primary guidance prohibits gradients and gold backgrounds.

## Tokens and roles

### Color and theme

The site has one intentional light theme. `--paper` (`#fbfaf6`) is the page surface, with `--paper-warm` reserved for plinth-like media support. `--ink` and `--ink-2` carry headings and body copy. `--gold` is a hairline/index accent; text interactions use darker `--gold-deep` for contrast.

The source's tertiary ink (`#8b857a`) does not reach 4.5:1 against paper at small metadata sizes. It remains a non-text primitive; `--text-meta-color` uses the accessible `--ink-meta-accessible` role. Do not put pigment colors, source gold, or tertiary ink behind or into required text without a new contrast review.

There is no dark theme in the supplied system. Do not infer one. Forced-colors behavior must remain usable.

### Typography

The intended families are Libre Caslon Display, Libre Caslon Text, and a Helvetica Neue grotesque. The archive contains no font binaries or font license. Production therefore uses local/system fallbacks and makes no font or CDN request. Licensed, repository-owned files may be added later only with their license/provenance and local `@font-face` declarations; update the three family tokens rather than component CSS.

Display type uses tight leading and slight negative tracking. Body copy is 17px/1.62 at no more than 62ch. Metadata is 11–13px, grotesque, and uppercase only for short labels. Never fake weights that a supplied font does not contain.

### Spacing, geometry, and elevation

Spacing follows the 4px-derived sequence `--space-1` through `--space-12`. Page margins use `clamp(32px, 7vw, 120px)` and major sections normally separate by 96–240px where viewport and content permit. Rules are 1px; major openers are 2px. Radius and shadow are always none.

### Motion

Only color and opacity transitions are permitted: 180ms for interaction and no more than 240ms for a future page fade. Pressed controls may use 0.7 opacity; they must not shrink. Artwork does not animate. All nonessential motion is removed under `prefers-reduced-motion: reduce`.

## Responsive behavior

The archive supplies desktop proposal examples but no complete responsive component contract. The website preserves its tested mobile-first reflow and standardizes the existing thresholds:

- narrow: `42rem` — navigation, cards, and dense records become a single column;
- wide: `56rem` — hero, editorial, and media/detail splits become a single column below this point.

Custom properties cannot drive media-query conditions, so `--breakpoint-narrow` and `--breakpoint-wide` document the values while `global.css` repeats the literals. Tests keep them aligned. Type and page margins scale fluidly. No layout may require horizontal scrolling at the repository minimum width of 20rem. Reading and keyboard order must remain meaningful when grids collapse.

## Component and extension rules

1. Use the nearest semantic HTML element first. Links navigate; buttons act; headings do not skip levels; lists and definition lists retain their meaning.
2. Compose existing components before adding variants. Add a token only when a reusable role cannot be expressed by the existing scale.
3. Add or change tokens only in `src/styles/tokens.css`, with a semantic role and contract/test update. Do not define custom properties in pages or components except runtime media focal/aspect variables owned by `ArtworkImage.astro`.
4. Keep page-specific layout values local only when they are genuinely compositional—not disguised color, type, spacing, radius, shadow, motion, or breakpoint primitives.
5. Preserve visible focus, 44px-equivalent target sizing where practical, keyboard operation, text zoom, 4.5:1 normal-text contrast, and 3:1 focus/non-text contrast.
6. Respect reduced motion and forced colors. Hover must never be the sole way to expose information.
7. Keep the site fully static and free of client JavaScript unless a separate review changes that constraint.
8. Keep forms, privacy, media rights, and deployment boundaries at least as strict as the current repository contracts.

## Asset and license decisions

All nine archive artwork JPEGs are retained privately under `design-sources/zadikian/original/assets/web/` as **reference-only / not cleared for public use**. None is imported into `src/`, `public/`, or the production build. The source says they were copied from a mounted `numbered/` folder but grants no photographer credit, license, public-web permission, or crop/alteration scope, so public use still fails this repository's media/license gate. Existing project-created CC0 fixtures remain the safe production fallback.

The source's font references are preserved, but the archive contains neither font binaries nor a font license. No logo or icon asset exists in the source; the artist name set in the display family is the wordmark. The archive contains no standalone asset license. Any future public asset must retain its license/provenance evidence and pass [`docs/media-intake.md`](./media-intake.md) before use.
