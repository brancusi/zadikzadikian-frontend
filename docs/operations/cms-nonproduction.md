# Nonproduction catalog CMS operations

This runbook owns the isolated Strapi Community foundation only. The CMS is not a production catalog, is not consumed by the Astro preview, and has no production DNS, custom domain, Cloudflare R2, imgix, Netlify hook, production content, or persistent app-container media.

## Railway topology and ownership

| Resource | Name | ID |
| --- | --- | --- |
| Workspace | `atd - non-production` | `1a5cb049-2b5a-479c-ab3e-ce1fbadf324f` |
| Project | `zadikian-cms-nonproduction` | `adaf4c32-c441-43ef-89cf-c94c6d039065` |
| Environment (active) | `nonproduction` | `7cd6b6d6-975f-4c80-81ec-97881323995d` |
| Environment (empty platform default) | `production` | `8807958d-456f-458f-af86-b6527bc026d7` |
| Service | `strapi-cms` | `b8d600e3-6b15-4fea-894d-c7b8dc56cc66` |
| Strapi deployment | local source, terminal `SUCCESS` | `ba361e0f-4b2b-44ce-b1e5-649812843e42` |
| PostgreSQL service | `Postgres` | `adf04ca4-2b11-4ac6-8863-849654088ee4` |
| PostgreSQL deployment | image `postgres-ssl:18` | `390d31e8-24f8-4a91-9b9f-29ed3a6fd2ad` |
| Railway service domain | <https://strapi-cms-nonproduction.up.railway.app> | `4a2c49f9-4d3f-4d9a-863e-7d26a64e6b89` |

The active environment has exactly one Strapi instance and one PostgreSQL instance in Amsterdam. PostgreSQL has its Railway-managed `postgres-volume` at `/var/lib/postgresql/data`; Strapi has no volume. `DATABASE_URL` resolves to the PostgreSQL private `.railway.internal` endpoint. The database has no public domain or TCP proxy. The platform-created `production` environment is intentionally empty; do not deploy into it.

This is a one-off local-source verification deployment from `fm/zadikian-strapi-railway-foundation-a1`. No GitHub trigger was created or changed, and the separate static staging project's approved `main` trigger remains authoritative for that site.

## Configuration contract

Source-controlled application configuration lives in `cms/config/` and `cms/Dockerfile`; project-level Railway intent lives in `cms/.railway/railway.ts`. The Strapi image uses Node `24.18.0`, pnpm `11.18.0`, PostgreSQL, `NODE_ENV=production`, `$PORT`, and a 300-second `/_health` deployment check. `railway config plan` currently reports no drift.

Configured application variable names (values intentionally omitted):

- `NODE_ENV`, `HOST`, `PUBLIC_URL`
- `PROXY_KOA`, `PROXY_IP_HEADER`, `PROXY_MAX_IPS`
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`
- `DATABASE_URL`, `DATABASE_SSL`, `DATABASE_SSL_REJECT_UNAUTHORIZED`, `DATABASE_POOL_MIN`, `DATABASE_POOL_MAX`, `DATABASE_CONNECTION_TIMEOUT`, `DATABASE_DEBUG`
- `CRON_ENABLED`, `TRANSFER_REMOTE_ENABLED`, `WEBHOOKS_POPULATE_RELATIONS`
- `STRAPI_TELEMETRY_DISABLED`, `STRAPI_UPDATE_NOTIFICATIONS`, `FLAG_DOC_LINKS`
- `UPLOAD_PROVIDER`

Railway injects its standard `RAILWAY_*` names. `DATABASE_URL` is a Railway reference to `${{Postgres.DATABASE_URL}}`; no database credential is copied into Git. `UPLOAD_PROVIDER=local` is deliberately disposable. The `S3_*` and `MEDIA_CSP_ORIGIN` names documented in `cms/.env.example` are not configured on Railway.

## Deploy and verify

Run from `cms/` with an authenticated Railway CLI. First run `railway config plan` and inspect any proposed project-level change; an apply requires explicit authorization. Keep every deployment target ID explicit:

```bash
railway config plan

railway up . --path-as-root \
  --project adaf4c32-c441-43ef-89cf-c94c6d039065 \
  --environment 7cd6b6d6-975f-4c80-81ec-97881323995d \
  --service b8d600e3-6b15-4fea-894d-c7b8dc56cc66 \
  --detach -m "Verify Strapi Community foundation"

railway deployment list \
  --project adaf4c32-c441-43ef-89cf-c94c6d039065 \
  --environment 7cd6b6d6-975f-4c80-81ec-97881323995d \
  --service b8d600e3-6b15-4fea-894d-c7b8dc56cc66 \
  --limit 5 --json
```

A queued build is not deployed. Poll until the newest deployment reaches terminal `SUCCESS`; on `FAILED` or `CRASHED`, inspect bounded build/runtime logs before changing anything.

After `SUCCESS`:

```bash
curl -sS -D - -o /dev/null \
  https://strapi-cms-nonproduction.up.railway.app/_health
curl -fsS -o /dev/null -w '%{http_code}\n' \
  https://strapi-cms-nonproduction.up.railway.app/admin
curl -fsS -o /dev/null -w '%{http_code}\n' \
  https://strapi-cms-nonproduction.up.railway.app/admin/auth/register-admin
```

`/_health` must return `204`, every response must retain `X-Robots-Tag: noindex, nofollow, noarchive`, and the admin routes must return `200`.

Final verification on 2026-08-23 observed:

- Strapi deployment `ba361e0f-4b2b-44ce-b1e5-649812843e42`: terminal `SUCCESS`, one running Amsterdam replica, Dockerfile builder, `/_health` deployment check, and no volume mounts;
- PostgreSQL deployment `390d31e8-24f8-4a91-9b9f-29ed3a6fd2ad`: terminal `SUCCESS`, one running Amsterdam replica, and ready `postgres-volume`;
- `GET /_health`: `204`, Strapi readiness header, and the nonproduction robots header;
- `GET /admin` and `GET /admin/auth/register-admin`: `200` with the nonproduction robots header;
- `GET /admin/init`: `hasAdmin=false`, confirming no human credential was created or exposed;
- `GET /robots.txt`: `200` with `User-agent: *` / `Disallow: /`;
- database public-domain and TCP-proxy inventories: empty; and
- `railway config plan`: no drift from `.railway/railway.ts`.

## First administrator bootstrap

Secure bootstrap URL: <https://strapi-cms-nonproduction.up.railway.app/admin/auth/register-admin>

The captain must open that URL, use a captain-controlled email address, generate a unique high-entropy password in the team's password manager, submit the first-administrator form once, and retain the credential only in that password manager. Do not send the password through chat, Git, Railway variables, logs, or a PR. This foundation intentionally creates no administrator automatically.

## Backup and restore expectations

- PostgreSQL is the only durable state in this slice. Railway volume attachment is not, by itself, a reviewed backup policy. Before entering irreplaceable content, the captain must select and verify Railway backup/PITR retention and perform a restore drill into a separate nonproduction target.
- Logical backups should use `pg_dump --format=custom --no-owner --no-acl` from a trusted, private connection with credentials supplied at runtime. Encrypt the artifact and record the database/Strapi versions and checksum. Never commit dumps (`cms/.gitignore` excludes them).
- A restore changes database state and requires separate approval. Restore into an empty compatible PostgreSQL target, run the pinned Strapi image, and validate admin login, row counts, relations, and media references before considering promotion. Never overwrite this environment merely to test a backup.
- Strapi transfer/export artifacts are useful for controlled content movement but are not substitutes for PostgreSQL backups.
- Local-provider uploads live in the disposable Strapi container and are excluded from backups. Do not upload real media. Future private R2 storage needs a separately approved retention/versioning, signing, URL, and recovery policy.

## Future deterministic catalog automation

Later slices should treat reviewed `src/**/schema.json`, component definitions, database migrations, and generated TypeScript declarations as versioned authority. Automation should use stable external catalog/media IDs, idempotent upserts, checksummed inputs, explicit dry-run/diff output, machine-readable validation failures, and an auditable pinned source revision. It must not scrape production pages, infer publish state, or use marketplace templates/Admin-only edits as long-term schema authority.

Catalog schemas, public URL policy, draft/publish semantics, media retention/signing, and static-site build hooks remain deliberately undecided.

## Guarded changes

Destructive cleanup, database restore, `production`-environment deployment, custom domains, R2/imgix credentials, Netlify hooks, and source-trigger changes require separate captain approval. Before any allowed mutation, re-run account/context checks and match the exact project, environment, and service IDs above. Never operate on Money Monk, `zadikian-staging`, `zadikian-sitemap-review-a1`, or another project.
