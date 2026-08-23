# Railway staging operations

This is the runbook for the **nonproduction design-preview** deployment on Railway. Netlify remains the authoritative production host. The Railway project has no custom domain, production integration, database, persistent storage, background process, or production-parity claim.

## Topology and ownership

| Resource | Name | ID |
| --- | --- | --- |
| Workspace | `atd - non-production` | `1a5cb049-2b5a-479c-ab3e-ce1fbadf324f` |
| Project | `zadikian-staging` | `22ce4e4c-7a09-4700-9003-f6e704eb150a` |
| Environment | `staging` | `cbe54ea8-ad0b-4dcf-bb58-493a5fbd446c` |
| Service | `web` | `989e90da-009b-4493-a2bd-3c7f8cc6e662` |
| GitHub trigger | `main`, Wait for CI enabled | `f885e0dc-c9d1-4218-a330-7604f7f16e9d` |
| Railway domain | <https://web-staging-5146.up.railway.app> | `d21a2ca0-45b7-4b83-ae41-ba5791403921` |

The service uses one replica in Railway's Amsterdam region with no resource-limit override or paid add-on. The project contains one environment and one service; bucket, volume, database, cron, worker, and custom-domain inventories are empty.

## Deployment flow

Railway's GitHub source is `brancusi/zadikzadikian-frontend`, branch `main`. Accepted pushes to `main` create deployments automatically. **Wait for CI** is enabled, so the repository's push workflow must succeed before Railway proceeds; a failed check suite is skipped rather than released.

Railpack detects Node, pnpm, and static Astro output. It installs the pinned Node and pnpm versions, runs `pnpm build`, and serves `dist` with Caddy. `Caddyfile` is a narrow static-host override: it preserves the preview headers, immutable asset caching, directory routes, and a real `404` response without adding Docker or an application server. The health check is `/` with a 120-second timeout. There is no runtime secret or start-command override.

Configured variable names (values intentionally omitted):

- `RAILPACK_STATIC_FILE_ROOT`
- `RAILWAY_ENVIRONMENT_ID`, `RAILWAY_ENVIRONMENT_NAME`
- `RAILWAY_PROJECT_ID`, `RAILWAY_PROJECT_NAME`
- `RAILWAY_SERVICE_ID`, `RAILWAY_SERVICE_NAME`
- `RAILWAY_PRIVATE_DOMAIN`, `RAILWAY_PUBLIC_DOMAIN`, `RAILWAY_STATIC_URL`

The `RAILWAY_*` names are platform-provided. No application secret is configured.

## Preview and form boundaries

Every rendered route has `noindex, nofollow, noarchive` metadata, `robots.txt` disallows all crawling, and Caddy sends the matching `X-Robots-Tag`. The page banner identifies the site as a design preview. Railway does not change Netlify, Cloudflare, registrar, or custom-domain state.

The contact treatment contains no `<form>`, active address, or submission integration. Consequently staging cannot submit to Netlify Forms or any production endpoint, cannot silently discard contact data, and sends no test contact traffic. If a form is introduced later, keep it disabled on staging until a separately reviewed nonproduction handler and explicit user-visible outcome exist.

## Verification

Use Railway CLI calls with an explicit project, environment, and service and poll every detached deployment to a terminal state:

```bash
railway deployment list \
  --project 22ce4e4c-7a09-4700-9003-f6e704eb150a \
  --environment cbe54ea8-ad0b-4dcf-bb58-493a5fbd446c \
  --service 989e90da-009b-4493-a2bd-3c7f8cc6e662 \
  --limit 5 --json

railway domain list \
  --project 22ce4e4c-7a09-4700-9003-f6e704eb150a \
  --environment cbe54ea8-ad0b-4dcf-bb58-493a5fbd446c \
  --service 989e90da-009b-4493-a2bd-3c7f8cc6e662 --json
```

A release is verified only after the newest deployment reports `SUCCESS`. Then check:

```bash
curl -fsSI https://web-staging-5146.up.railway.app/
curl -fsS https://web-staging-5146.up.railway.app/robots.txt
curl -fsS https://web-staging-5146.up.railway.app/contact/
curl -sS -o /dev/null -w '%{http_code}\n' \
  https://web-staging-5146.up.railway.app/route-that-does-not-exist
```

Confirm key routes and responsive images return `200`, the first response includes `X-Robots-Tag`, robots disallow `/`, contact contains no form, and the unknown route returns `404`. Complete desktop and mobile browser checks with no console errors after every merged visual change.

Initial source deployment `dc77e53f-1990-4e7e-ae8c-9b99a0c6c187` reached `SUCCESS` on 2026-08-23 for main commit `f3e6368c199659f5d9b7fc10f98e2abce803f063`.

## Troubleshooting

### GitHub source discovery

The initial source configuration was accepted, but deploy-from-source returned `No GitHub installation found for repo` even though GitHub App settings already listed the repository. The trigger was a deploy lookup before Railway had refreshed its GitHub integration mapping; GitHub-side repository selection masked the stale Railway-side connection, and the visible symptom was a source service with no deployment. Reconnecting the GitHub integration in Railway refreshed discovery and immediately produced the successful main deployment above. The trigger now reads back as GitHub repository `brancusi/zadikzadikian-frontend`, branch `main`, `checkSuites: true`.

If this recurs, do not upload credentials or broaden repository access. In Railway, refresh **Add → GitHub Repository**, then disconnect/reconnect this service source and re-read its trigger. Railway's official [GitHub autodeploy troubleshooting](https://docs.railway.com/deployments/github-autodeploys#troubleshooting) says caches may take a few minutes to refresh and recommends those steps before reinstalling the GitHub App. `railway up` is suitable for an explicitly approved one-off local release, but it does not establish or prove the required GitHub trigger and must not silently replace this deployment model.

### Build or runtime failure

1. Confirm the exact linked context with `railway status --json`.
2. Read bounded build logs with `railway logs --service 989e90da-009b-4493-a2bd-3c7f8cc6e662 --environment cbe54ea8-ad0b-4dcf-bb58-493a5fbd446c --build --lines 200 --json`.
3. Confirm the pinned Node/pnpm versions and media/design-source validators succeeded.
4. Check runtime and HTTP logs with bounded `railway logs` calls.
5. Fix in the repository and let an accepted `main` commit deploy; do not add a second server, database, or secret to bypass the failure.

## Guarded cleanup

Cleanup is destructive and requires explicit captain approval. Before any removal, re-run `railway whoami --json`, `railway status --json`, and `railway project list --json`; verify the workspace, project, environment, and service IDs above exactly. Remove only project `22ce4e4c-7a09-4700-9003-f6e704eb150a`. Never use a name-only or ambient-context delete, and never touch another project, production host, Netlify site, or Cloudflare record.
