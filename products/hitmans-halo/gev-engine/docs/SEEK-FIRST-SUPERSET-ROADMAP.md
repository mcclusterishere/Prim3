# Seek First Superset Roadmap

**Architecture:** viewer satellite over the canonical McCluster control plane  
**Backend authority:** `mcclusterishere/mccluster` / `https://api.mccluster.org`  
**Viewer:** `mcclusterishere/Seek-First`

## North star

Build a public-data spatial operating picture that is materially stronger than stock God's Eye View in five dimensions at once:

- rendering performance;
- breadth/resilience of legitimate data sources;
- provenance/confidence/system semantics;
- AI-assisted exploration;
- PRIM3 game/product integration.

Do not measure advancement by raw layer count alone.

## Phase 0 — architecture cleanup

### Objective
Remove ambiguity about where backend authority lives.

- `mccluster` owns identity, authorization, provider credentials, entitlement lanes, persistence, usage controls and normalized provider access.
- `Seek-First` owns Cesium/WebGL presentation, interaction, local render state and client-side visual transforms.
- upstream Vite `/api/*` middleware remains local-development/reference code while migration is underway; production features must prefer `/v1/seek-first/*`.
- any future VM/container is a subordinate ingest/compute node, never an independent auth/provider gateway.

### Exit criteria
- production viewer can boot without relying on secret-bearing Vite middleware;
- all secret provider calls traverse canonical Worker services;
- owner login works end-to-end;
- provider readiness is visible in UI.

## Phase 1 — McCluster transport adapter

Create a thin typed/validated client around:

```text
GET  /v1/seek-first/health
GET  /v1/seek-first/readiness
GET  /v1/seek-first/sources?lane=INTERNAL
GET  /v1/seek-first/entitlements?lane=INTERNAL
GET  /v1/seek-first/viewer/config
GET  /v1/seek-first/capabilities
POST /v1/seek-first/fetch/:source
GET  /v1/seek-first/live/ais
GET  /v1/seek-first/nearby
GET  /v1/seek-first/bbox
GET  /v1/seek-first/timeline
GET  /v1/seek-first/entities/:id/history
```

Transport must distinguish:
- authentication failure;
- entitlement denial;
- provider not configured;
- provider outage;
- stale cached response;
- schema/storage unavailable;
- malformed response.

Do not convert all of those into a generic `network error` toast.

## Phase 2 — performance engine

Port/reimplement the strongest proven renderer optimizations found in public derivatives:

1. Web Worker parsing/normalization for large static/live payloads.
2. PointPrimitiveCollection-based marker batching for simple point layers.
3. Progressive rendering over animation frames.
4. Viewport culling before Cesium object construction.
5. Lightweight spatial grid indexes for hit-testing/culling.
6. Antimeridian-safe spatial queries.
7. render governor based on camera motion/device performance.
8. throttle expensive hover/picking operations.
9. immutable caching for hashed static assets.
10. disabled/upstream-failed layer backoff rather than tight retry loops.

### Benchmark gates
Record on at least desktop Chrome + Safari/iPad:
- first interactive time;
- 10k, 50k, 100k point load time;
- average frame rate while stationary/moving;
- heap growth after layer toggle cycles;
- main-thread long tasks >50 ms;
- Cesium primitive/entity count.

## Phase 3 — McCluster layer operating system

Replace a flat toggle wall with a registry-driven taxonomy.

Suggested top-level groups:
- **EARTH** — terrain, imagery, fires, earthquakes, environment
- **AIR** — civilian/military aircraft, airports, launches
- **SEA** — AIS/vessels, ports where available
- **MOBILITY** — traffic, bikeshare, transport
- **INFRASTRUCTURE** — energy, facilities, networks, critical dependencies
- **ECONOMY** — Census, BLS, FRED, EIA, USAspending
- **EVENTS** — GDELT, alerts, hazards
- **SECURITY** — public defensive vulnerability/context feeds
- **MCCLUSTER** — authorized internal projects/assets/facilities

Each layer card should display:
- source;
- last refresh;
- freshness state;
- entitlement lane;
- attribution;
- confidence where meaningful;
- persistence policy;
- provider health;
- cost/rate-budget indicator where relevant.

## Phase 4 — map + graph + timeline

Implement the PRIM3/earned-omniscience semantic model in the real viewer.

### Map
Answers WHERE.

### Graph
Answers WHAT IS CONNECTED / DEPENDS ON WHAT.

### Timeline
Answers WHEN / IN WHAT ORDER.

Selecting one entity should allow pivots between all three without losing context.

Knowledge semantics:

```text
OBSERVED
INFERRED
CORROBORATED
VERIFIED
STALE
CONTRADICTED
UNKNOWN
```

Public-feed facts should preserve source provenance; model inference must never silently render as provider fact.

## Phase 5 — entity workspace

For a selected entity/event/place:
- track/follow;
- source history;
- revisions/observations;
- related entities;
- nearby events;
- timeline;
- notes/annotations;
- pinned evidence;
- compare sources;
- share/debrief state where licensing permits.

Use the current canonical backend entity/history endpoints rather than inventing a second persistence store.

## Phase 6 — AI copilot

Adopt the best part of the think-act-observe pattern without creating an unconstrained browser agent.

The model may call a bounded tool vocabulary such as:
- move camera;
- enable/disable layer;
- search places;
- select entity;
- ask backend for source/history/nearby/timeline;
- summarize current operating picture;
- compare two selected sources;
- create a user annotation.

Every tool invocation should have:
- authenticated user;
- declared purpose;
- bounded arguments;
- structured result;
- optional audit event;
- cost attribution when a paid provider/model is used.

Support an inexpensive default AI tier and a higher-quality owner-selected tier.

## Phase 7 — resiliency and keyless mode

A provider outage should remove one capability, not kill the console.

Build explicit fallback chains where provider terms/data semantics allow:
- photorealistic 3D -> alternate basemap/terrain;
- authenticated aircraft -> approved anonymous/public fallback;
- keyed fire feed -> public FIRMS/EONET fallback where licensing and recency are clear;
- fresh cache -> stale-but-labelled cache -> layer unavailable;
- AI unavailable -> map remains fully usable manually.

Never disguise simulated/demo data as live data.

## Phase 8 — mobile / tablet

PRIM3 and GEV should be first-class on iPad and usable on Android.

Prioritize responsive/PWA support before wrapping native shells.

Then consider:
- Android shell/reference from public derivative work;
- iOS packaging if required;
- device-safe graphics quality presets;
- touch-first layer controls;
- background/resume data refresh;
- deep links to saved views.

Entitlement remains server-side regardless of packaging.

## Phase 9 — PRIM3 bridge

In-game:
- authored/simulated data only;
- same semantic layer language;
- same map/graph/timeline mental model;
- earned omniscience through R/E/T.

Post-game:
- normal player account receives `ASCENDED` / GEV entitlement only after canonical completion rule;
- owner/admin receives immediate internal entitlement;
- real viewer uses public/authorized data sources.

The game should teach the interface before the real-world product unlocks it.

## Phase 10 — scale

Owner V1 can run on existing Worker/Supabase allowances plus provider quotas.

Add extra infrastructure only when measurements require it:
- Durable Object for live connection/state coordination;
- Queue for ingestion jobs;
- object storage for allowed derived/cache artifacts;
- specialized VM/container for long-lived or CPU-heavy jobs;
- PostGIS scaling/read replicas where justified;
- edge cache/CDN for cacheable normalized responses.

A VM is **not** automatically the backend. It is a worker attached to the backend.

## Never-do list

- no second authoritative backend;
- no duplicate credential stores in browser-facing deployments;
- no academic/nonprofit data silently reused for commercial products;
- no client-side `prime=true` entitlement authority;
- no provider data persistence when terms prohibit it;
- no fake confidence/verification labels;
- no global dataset rendered as thousands of individual Cesium Entities when a primitive/batched representation is sufficient;
- no feature that depends on one upstream being alive for the whole console to boot.

## Definition of “most advanced”

Seek First can defensibly call itself a superset when it has:

- upstream GEV feature parity or documented intentional replacements;
- measured superior large-layer performance;
- broader legitimate source catalog through McCluster;
- graceful provider degradation;
- source/entitlement/cost visibility;
- map + graph + timeline navigation;
- provenance/confidence/freshness semantics;
- bounded multi-step AI control;
- mobile/tablet quality;
- owner + Prime entitlement integration;
- continuous upstream/fork intelligence rather than one-time copying.
