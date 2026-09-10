# Owner Seek First / GEV quickstart

**Current architecture:** rich hosted viewer over the existing canonical McCluster Worker/Supabase backend.

> This file supersedes the earlier VM-first quickstart. A DigitalOcean/other VM is optional specialized compute, not the default owner backend.

## Target topology

```text
YOU
 -> Cloudflare Access / McCluster owner login
 -> hosted Seek First viewer
 -> https://api.mccluster.org/v1/seek-first/*
 -> canonical McCluster Worker
 -> entitlement/licensing firewall
 -> Supabase spatial/history plane
 -> approved provider APIs
```

## 1. Keep one backend

The canonical backend is `mcclusterishere/mccluster`, Worker `mccluster`, API origin `https://api.mccluster.org`.

Do not deploy the upstream GEV Vite credential broker as a second production authority.

The Vite middleware remains useful for local development and as a reference while its capabilities are migrated into the canonical Worker.

## 2. Activate the canonical spatial schema

The current Worker already contains `/v1/seek-first/*` routes for sources, entitlements, provider brokering, AIS, entity queries, nearby/bbox queries, timeline and history.

Those persistence/history routes require the committed Supabase migrations in `mccluster`:

```text
supabase/migrations/20260909034000_spatial_intelligence.sql
supabase/migrations/20260909034100_spatial_observation_idempotency.sql
supabase/migrations/20260909040000_spatial_entity_history.sql
```

Apply them through the repository's canonical Supabase migration workflow so local/remote migration history remains synchronized.

## 3. Finish Access configuration

`/internal/seek-first` is intended to sit behind Cloudflare Access plus the McCluster owner check.

The Worker expects:

```text
SEEK_FIRST_ACCESS_TEAM_DOMAIN
SEEK_FIRST_ACCESS_AUD
```

Use a durable deployment-safe configuration method. If the team domain is safe to commit as a non-secret Worker var, place it in `wrangler.toml`; otherwise provision it as a secret. Do not rely on an untracked dashboard plaintext variable that a deployment can overwrite.

The AUD should remain treated as deployment configuration/secret according to the existing environment policy.

## 4. Viewer transport

`src/platform/mcclusterApi.js` is the canonical viewer transport layer.

Default API base:

```text
https://api.mccluster.org/v1/seek-first
```

It provides explicit calls for:
- health/readiness;
- source catalog;
- entitlements;
- viewer config/capabilities;
- provider fetch/ingest;
- live AIS;
- nearby/bbox/timeline;
- entities/history;
- projects/layers/ingestion runs.

It also keeps authentication, entitlement, rate-limit, provider-not-configured and schema-not-ready failures distinct.

## 5. Provider activation

Prioritize open/public sources first, then activate paid/restricted providers only when their added capability justifies the cost.

Useful source classes already exist in the backend:

```text
PUBLIC_OPEN
ACADEMIC
NONPROFIT
COMMERCIAL
INTERNAL
RESTRICTED
```

The owner interface may show legitimately acquired sources from multiple lanes. A player/commercial consumer may only receive sources whose provider terms allow that lane.

## 6. Host the viewer

The final viewer is a static/CDN web application plus browser rendering. It may be delivered from an existing McCluster web surface, Cloudflare Pages/Workers Assets or an equivalent static host.

The viewer should never receive server-side provider secrets.

Browser-visible tokens may exist only where a provider technically requires them and must use strict origin/API/asset restrictions.

## 7. Owner access vs Prime/player access

Owner flow:

```text
OWNER LOGIN
 -> owner authorization
 -> Seek First viewer
 -> INTERNAL source lane
```

Owner access is immediate and independent of PRIM3 completion.

Future player flow:

```text
PRIM3 completion/mastery
 -> ASCENDED entitlement
 -> authenticated GEV session
 -> player-allowed source set
```

A client-side save flag never authorizes real-world access.

## 8. Budget target

If the existing Worker and Supabase included quotas are sufficient, the prototype can have nearly zero incremental fixed hosting cost.

If dedicated paid tiers are needed, budget approximately:

```text
Cloudflare Workers Paid   ~$5/month minimum
Supabase Pro              ~$25/month
------------------------------------------
reliable platform floor   ~$30/month
```

Then separately cap Google/AI/commercial provider usage. See `docs/HOSTING-COST-MODEL-2026-09.md` and the canonical cost/eligibility ledger in `mccluster`.

## 9. Optional compute node

Provision a VM/container only when telemetry proves a workload belongs there, such as:
- bulk raster/geospatial processing;
- sustained CPU-heavy ETL;
- dedicated model inference;
- media transforms;
- specialized long-running ingestion that is unsuitable for Worker/Durable Objects.

A compute node authenticates to the canonical control plane and returns normalized results. It does not own end-user identity, entitlements or the master credential store.

## 10. Owner-V1 acceptance test

```text
Cloudflare Access/owner auth works
canonical Worker health/readiness is green
Seek First viewer uses /v1/seek-first/*
private provider secrets never reach browser
source/entitlement state is visible
spatial migrations are applied
nearby/bbox/history/timeline answer from Supabase
provider failure degrades one layer, not whole app
owner bypasses PRIM3 campaign gate
```

See also:
- `docs/HOSTED-DEPLOYMENT.md`
- `docs/FORK-SUPERSET-AUDIT-2026-09.md`
- `docs/SEEK-FIRST-SUPERSET-ROADMAP.md`
