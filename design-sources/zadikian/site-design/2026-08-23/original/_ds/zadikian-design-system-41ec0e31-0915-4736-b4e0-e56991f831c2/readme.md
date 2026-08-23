# Zadikian Design System

A design system for **art project proposals and acquisition dossiers** for sculptor **Zadik Zadikian** (b. 1948, Yerevan), represented by gallerist-curator **Tony Shafrazi** (Tony Shafrazi | Gallery Without Walls). Zadikian — trained in Soviet Armenia, mentored by Beniamino Bufano, a longtime friend and assistant of Richard Serra in 1970s New York — is known for monumental gold-leafed installations (1,000 Bricks Gilded in 22 Carat Gold Leaf, P.S.1, 1975; Path to Nine, Brooklyn Museum, 2024) and, most recently, human-scale pigmented plaster-brick structures (The Studio, Armenian Pavilion, 61st Venice Biennale, 2026).

The system exists to produce documents aimed at **institutions, curators, gallerists, and prominent collectors**: acquisition proposals in the six and seven figures, site-specific project proposals, artist bio/CV, work statements, and press dossiers. Its aesthetic anchors are the New York School (Newman, Rothko, Rauschenberg) through Minimalism and Post-Minimalism (Andre, Judd, Serra), executed in a strictly contemporary register: typography and imagery front and center, everything else silent.

## Sources
- Mounted folder `numbered/` — 28 photographs of pigmented cast-plaster works, filenames `A-0NN_DSC0NNNN.jpeg`, each watermarked with its catalog number (A-001…A-028). 9 copied and web-optimized into `assets/web/`. Several originals exceed 30 MB and could not be copied (A-002…A-008 range partially, see caveats).
- Web research: zadikzadikian.com/bio; labiennale.org (Armenian Pavilion 2026, "The Studio"); ARTnews, BOMB Magazine, Canvas, Armenian Weekly coverage of Zadikian/Shafrazi.
- No brand assets (logo, fonts, existing collateral) were provided. **There is no logo**: the artist's name set in the display serif *is* the mark.

## CONTENT FUNDAMENTALS
- **Register**: institutional, spare, declarative. The vernacular of the frontier art world — museum wall text and gallery press releases, not marketing. No superlatives that sell; facts that assert. ("Each unit holds the tension between one and many" — not "stunning, one-of-a-kind sculpture.")
- **Person**: third person for the artist ("Zadikian casts…"); first person only inside quoted artist statements. The reader is never addressed as "you."
- **Casing**: sentence case for prose and headlines. UPPERCASE (letterspaced, small) reserved for metadata labels: PROVENANCE, EDITION, DIMENSIONS. Work titles in *italic*: *Path to Nine*, 2024.
- **Tombstone discipline**: works are always identified in canonical order — *Title*, year. Medium. Dimensions (in, then cm). Edition/unique. Never paraphrased.
- **Numbers**: dimensions in inches with cm in parentheses; years never abbreviated; prices spelled as figures ($1,200,000) and only in the SpecList, never in prose.
- **No emoji, ever. No exclamation marks.** Rhetorical mode: understatement backed by provenance — museums named, years given, witnesses cited.
- Example caption: `*Column IX*, 2025. Pigmented plaster. 108 × 24 × 24 in (274 × 61 × 61 cm). Unique.`

## VISUAL FOUNDATIONS
- **Color**: gallery white (`--paper` #FBFAF6, warm like a primed wall) and near-black ink (#161512). One accent: **gold** (#A8842C), the artist's signature material — used at hairline scale (rules, folios, links on hover), never as a background. The five **pigment primaries** (cadmium, chrome, ultramarine, turquoise, magenta) come from the cast works and appear ONLY as thin index marks, chart keys, or catalog-number chips — the artwork supplies the color; the page stays out of its way. Max one pigment per spread.
- **Type**: display serif (Libre Caslon Display) at very large sizes — 64–128px, tight leading (1.02), slight negative tracking — is the system's primary visual event, in the lineage of museum catalog typography. Body is Libre Caslon Text 17/1.62 at a 62ch measure. All metadata, captions, labels, folios are the grotesque (Helvetica Neue stack) at 11–13px; uppercase labels tracked +0.14em. Serif speaks, grotesque annotates. Never mix roles.
- **Spacing**: extravagant. Page margins clamp(32px, 7vw, 120px); sections separated by 96–240px. White space is treated as material, like the empty gallery around a plinth.
- **Backgrounds**: flat paper white only. No gradients, no textures, no patterns. Full-bleed photography is the only permitted "background" — one image per spread, uncropped where possible.
- **Imagery**: the supplied installation photography — saturated pigmented volumes in raw brick/white-cube spaces, warm daylight. Never silhouette, tint, duotone, or overlay text on the work itself. Protection: text sits beside or below images, not on them (a narrow white caption band is the exception on full-bleed covers).
- **Borders/rules**: 1px hairlines (`--rule` #E4E0D6) structure lists and tables; a 2px black rule (`--rule-strong`) opens major sections, à la Judd's certainty. No boxes around content.
- **Corners/shadows**: radius 0 everywhere. No drop shadows, no cards floating on the page — edges are square and objects sit flat, like the work.
- **Animation**: near none. Opacity fades ≤ 240ms ease on page transitions; links transition color 180ms. Nothing moves that doesn't have to.
- **Hover**: text → gold; images → none. **Press**: opacity .7, no shrink.
- **Layout**: asymmetric grids with one dominant axis; folios and running heads fixed at the page edge in grotesque caps. Blur/transparency: unused.

## ICONOGRAPHY
- **There are no icons.** The system communicates through type. Navigation and interaction use words ("Next", "Index") or typographic marks: — (em dash), → (U+2192), § for sections, ↗ for external links. These unicode marks are set in the grotesque.
- No icon font, no SVG icon set, no emoji. If a consuming design truly needs a glyph the type can't supply, stop and ask before importing anything.
- Catalog numbers (A-001…) act as identity marks and may be set huge in the grotesque as an index device, echoing the photography's watermarks.

## FONT SUBSTITUTIONS (flag)
No font files were provided. Substitutes chosen from Google Fonts:
- **Libre Caslon Display / Libre Caslon Text** standing in for the Caslon 540 / Big Caslon / Canela genre used by frontier galleries and museum catalogs.
- **Helvetica Neue system stack** (Arial fallback on Windows) for the grotesque — the art world's lingua franca. No webfont is shipped for it.
If the studio has licensed fonts (e.g. Canela, Neue Haas Grotesk), supply the files and these tokens swap in place.

## Index
- `styles.css` → imports `tokens/` (fonts, colors, typography, spacing, base)
- `assets/web/` — 9 web-optimized artwork photographs (A-001, 009, 011, 015, 017, 020, 023, 026, 028)
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/typographic/` — SectionHeading, PullQuote, Folio
- `components/catalog/` — WorkFigure, Tombstone, SpecList
- `components/editorial/` — CVList, PressItem
- `components/core/` — Button
- `ui_kits/proposal/` — sample acquisition proposal (cover, work, bio/CV, press) — click-through
- `SKILL.md` — agent skill entry point

## Intentional additions
No source defined UI components (photography only), so the component set was authored from the document needs stated in the brief: proposal primitives (tombstones, spec tables, CV rows, press citations) plus one minimal Button for interactive contexts.
