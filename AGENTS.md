# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Run the complete local gate with `pnpm validate`; `package.json` is authoritative for pinned tool versions.
- Preserve the public preview boundaries documented in `README.md` and enforced by `tests/preview-boundaries.test.ts` until a separately approved production phase.
- Keep Astro output fully static. `astro.config.ts` deliberately omits the current Netlify adapter because it emits a runtime Function; Netlify configuration remains in `netlify.toml`.
- Netlify remains the authoritative host; the separate noindex Railway preview and its guarded operations are owned by `docs/operations/railway-staging.md`.
- Keep `cms/` isolated from the static site's package graph and runtime. Validate it separately with `pnpm --dir cms check`; `docs/operations/cms-nonproduction.md` owns its Railway, bootstrap, backup, and deferred-integration boundaries.
- Route all public image/video records through `src/lib/media/model.ts`; `scripts/validate-media.ts` is the build-time rights, accessibility, reference, and content-identity gate.
- Visual work must consult the immutable design system in `design-sources/zadikian/original/`, the latest complete site design in `design-sources/zadikian/site-design/2026-08-23/original/`, `docs/design-system.md`, and `docs/site-design-implementation.md`; `src/styles/tokens.css` remains the sole production token owner. Never execute or edit preserved source in place; `scripts/validate-design-sources.ts` guards both manifests.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
