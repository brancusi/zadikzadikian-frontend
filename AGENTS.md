# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Run the complete local gate with `pnpm validate`; `package.json` is authoritative for pinned tool versions.
- Preserve the public preview boundaries documented in `README.md` and enforced by `tests/preview-boundaries.test.ts` until a separately approved production phase.
- Keep Astro output fully static. `astro.config.ts` deliberately omits the current Netlify adapter because it emits a runtime Function; Netlify configuration remains in `netlify.toml`.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
