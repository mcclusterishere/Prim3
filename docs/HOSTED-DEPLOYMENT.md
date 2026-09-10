# Hosted Seek First / God's Eye View

## Architecture status

**Supersedes the earlier standalone-Vite-server recommendation.**

McCluster already has a canonical backend/control plane in `mcclusterishere/mccluster`, deployed through Worker `mccluster` at `api.mccluster.org`. That backend now contains the Seek First provider gateway, entitlements, storage interfaces and live-feed coordination.

Therefore the production architecture is:

```text
Seek First / GEV viewer
       |
       v
canonical McCluster authentication
       |
       v
https://api.mccluster.org/v1/seek-first/*
       |
       +-- source registry + entitlement firewall
       +-- provider adapters
       +-- Durable Objects / queues where appropriate
       +-- Supabase spatial/history persistence where allowed
       +-- optional subordinate ingest/compute workers
```

The upstream `vite.config.js` broker remains a useful local-development/reference implementation. **It is not a second production backend.**

## Why the distinction matters

Upstream GEV places many provider proxies, caches, OAuth/token operations and an AIS WebSocket process inside Vite middleware. That architecture is sensible for a local-first application but duplicates responsibilities that McCluster's Worker already owns.

Production Seek First must not maintain a second set of:
- user sessions;
- provider credentials;
- entitlements/licensing decisions;
- persistent spatial state;
- usage/quota policy.

## Owner deployment

The owner does not need a dedicated VM merely to access the rich GEV viewer.

The owner target is:

```text
Owner browser
 -> Cloudflare Access / McCluster login
 -> hosted Seek First static viewer
 -> api.mccluster.org/v1/seek-first/*
```

The viewer can be delivered from the existing McCluster web surface, Cloudflare Pages, Workers Assets, or another static/CDN surface that does not become a competing backend.

The private owner console should request:
- `/v1/seek-first/viewer/config`
- `/v1/seek-first/sources?lane=INTERNAL`
- `/v1/seek-first/entitlements?lane=INTERNAL`
- `/v1/seek-first/readiness`
- `/v1/seek-first/fetch/:source`
- `/v1/seek-first/live/ais`
- spatial query/history/timeline endpoints as they become schema-ready.

## Optional VM / container

The existing files under `deploy/` are now **optional/experimental reference material**, not the canonical owner deployment.

Provision an always-on VM only when measured workloads require a process that Worker/Durable Objects/Queues should not carry, for example:
- sustained long-lived feed ingestion;
- heavy CPU/geospatial preprocessing;
- video/media transforms;
- bulk ETL;
- dedicated local-model inference;
- specialized caches.

Any such host is subordinate to the canonical control plane. It receives authenticated jobs and returns normalized results. It does not become an end-user credential broker.

## Credentials

### Browser-visible only when a provider technically requires it
- restricted Google Maps browser key
- restricted Cesium ion public/read token

### Server-side only
- OpenAI API credentials
- OpenSky OAuth credentials
- AISStream key
- FIRMS key
- TomTom key
- commercial/academic provider secrets
- all other private credentials

Provider-side origin/API restrictions and quotas remain mandatory for browser-consumable tokens.

## Access classes

### OWNER / ADMIN
Immediate access. Does not need to complete PRIM3.

### PRIME / ASCENDED PLAYER
Future consumer entitlement after satisfying the canonical PRIM3 completion/mastery rule.

### NON-PRIME
No real-world GEV workspace; may use fictional/simulated PRIM3 mission layers.

Entitlement is always server-side.

## Current engineering priorities

1. Keep the canonical Worker healthy and its migrations applied.
2. Finish required Worker configuration (Access, Supabase auth/provider configuration, source credentials).
3. Convert this fork into the Superset viewer using `docs/SEEK-FIRST-SUPERSET-ROADMAP.md`.
4. Build a canonical client transport for `/v1/seek-first/*`.
5. Port renderer/performance improvements from high-signal public forks.
6. Add provenance/confidence/freshness, map+graph+timeline and bounded AI control.
7. Add player Prime entitlement only after owner flow is stable.

See also:
- `docs/FORK-SUPERSET-AUDIT-2026-09.md`
- `docs/SEEK-FIRST-SUPERSET-ROADMAP.md`
- `mccluster/docs/control-plane/SEEK-FIRST-PRODUCT-ARCHITECTURE.md`
