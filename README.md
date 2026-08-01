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
- Native Astro static output with Netlify `dist` publishing and restrictive preview headers
- Node `24.18.0` and pnpm `11.18.0`, pinned in repository files and lockfile
- Vitest boundary tests plus static HTML validation
- No client JavaScript, server runtime, database, form processing, analytics, CMS, or third-party media

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

## Content model

Sample series records live in `src/content/series/` and are validated by `src/content.config.ts`. The literal `status: sample` boundary is intentional. The production migration should replace fixtures only after asset-level rights, credits, metadata, alt decisions, and factual review are complete.

Netlify continuous deployment should be provided by the repository's existing Git integration. GitHub Actions validates but does not perform a second deployment. The Netlify adapter is intentionally absent: current adapter releases emit a runtime function, while this preview must remain entirely static.
