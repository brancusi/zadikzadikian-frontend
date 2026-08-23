# Zadik Zadikian catalog CMS

This isolated workspace is the version-pinned **Strapi Community 5** foundation for a nonproduction catalog. It is not connected to the public Astro preview, contains no catalog schemas or production content, and does not change the static site's Netlify deployment model.

## Pinned stack

- Node `24.18.0`
- pnpm `11.18.0`
- Strapi Community `5.52.1` with TypeScript
- PostgreSQL through `pg` `8.20.0`
- Strapi's official `@strapi/provider-upload-aws-s3` `5.52.1` seam (disabled by default)

`package.json`, `pnpm-lock.yaml`, the Node version files, and `Dockerfile` are authoritative. Do not use a marketplace template as the application's source of truth.

## Local development

From `cms/`:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm env:dev
docker compose up -d postgres
pnpm develop
```

`pnpm env:dev` creates a mode-`0600`, ignored `.env` with fresh local-only secrets and refuses to overwrite an existing file. The Compose password is a committed development fixture, not a deployable secret. Open <http://localhost:1337/admin> and create a disposable local administrator.

Stop the database with `docker compose stop`. Remove its local data only when intentionally resetting development with `docker compose down --volumes`.

## Checks and schema types

```bash
pnpm typecheck
pnpm build
pnpm check
pnpm types:generate
```

After an approved schema change, run `pnpm types:generate` and commit both the schema JSON and `types/generated/` result. Generated types are outputs, never a substitute for reviewed schema files. No catalog content types are defined in this foundation.

## Deployment and operations

The production-stage container listens on `$PORT`, uses PostgreSQL exclusively, serves Strapi's `/_health` readiness route, and returns a nonproduction `X-Robots-Tag` on every route. Railway project intent lives in `.railway/railway.ts`; run `railway config plan` before any separately authorized apply. The app container has no volume: with `UPLOAD_PROVIDER=local`, uploaded files are disposable and must not hold real media. The installed S3 provider remains inactive until the captain approves the private R2 URL/signing/retention policy and supplies credentials outside Git.

See [`../docs/operations/cms-nonproduction.md`](../docs/operations/cms-nonproduction.md) for Railway inventory, deployment, admin bootstrap, backup/restore, and future catalog-automation expectations.
