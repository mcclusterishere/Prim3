# Hitman's Halo — Superset Feature Set

**Branch:** `feature/hitmans-halo-gev-superset`  
**Status:** feature-establishment branch; do not merge to `main` yet  
**Viewer engine:** full `mcclusterishere/Seek-First` subtree  
**Backend authority:** `mcclusterishere/mccluster` at `/v1/seek-first/*`

## Product rule

Hitman's Halo is not measured by raw feed count. It wins by combining rendering performance, legitimate data breadth, source resilience, provenance, time/history, dependency context, bounded AI interaction, cost governance, and PRIM3's earned-omniscience language in one operating picture.

## P0 — foundation now in this branch

- Full Seek First / God's Eye View engine imported as a history-preserving subtree.
- Canonical McCluster API client retained inside the imported engine.
- Backend-driven layer/source taxonomy: EARTH, AIR, SEA, MOBILITY, INFRASTRUCTURE, ECONOMY, EVENTS, SECURITY, MCCLUSTER.
- Evidence states: UNKNOWN, OBSERVED, INFERRED, CORROBORATED, VERIFIED, STALE, CONTRADICTED.
- Antimeridian-safe spatial grid for viewport filtering.
- Cesium `PointPrimitiveCollection` batching with progressive frame-by-frame construction.
- Bounded agent-tool registry; no arbitrary provider-secret access.
- Hitman's Halo visual/identity layer kept isolated from upstream internals.
- Runtime bootstrap that queries canonical Worker health/readiness/source/entitlement/viewer/capability state.

## P0 — harvest next

### Performance

Reimplement and benchmark the strongest public-fork ideas:
- Web Worker parsing/normalization for large payloads.
- viewport culling before Cesium object construction;
- progressive point construction;
- marker batching;
- lightweight spatial indexing;
- hover/picking throttling;
- render governor and adaptive quality;
- immutable static caching;
- provider-failure retry/backoff rather than tight loops.

### Keyless / low-cost operation

Harvest concepts from upstream PRs without restoring a second production backend:
- **#166:** keyless place search with authoritative-outage vs definitive-miss distinction;
- **#219:** keyless A→B directions and maneuver UI;
- **#218:** GTFS-Realtime public transit layer;
- **#236:** local-model voice interaction, but route model calls through the approved McCluster AI/control plane rather than importing its standalone server endpoint;
- source-specific fallback chains with stale/failure labeling.

### Security and production hardening

Evaluate the upstream hardening set called out in the September dossier (#245, #242, #110, #185, #180, #97, #178). Port only deltas not already covered by the canonical Worker. Priority categories:
- CSP;
- cross-site request gating;
- browser/server key separation;
- URL validation and redirect refusal;
- dependency CVE fixes;
- bounded body sizes/timeouts;
- explicit provider error states.

## P1 — information superiority

### Map + graph + timeline

Every selected object can pivot among:
- **MAP:** where it is;
- **GRAPH:** what it depends on / connects to;
- **TIMELINE:** what changed and when.

Every rendered fact carries where available:
- source;
- source URL;
- observed time;
- freshness;
- confidence;
- provenance;
- entitlement lane;
- persistence policy;
- contradictions/corroboration.

### Entity workspace

Selected entity/event/place workspace:
- track/follow;
- history/revisions;
- nearby events;
- relationships/dependencies;
- annotations;
- pinned evidence;
- source comparison;
- timeline pivot;
- export/share only when the source license permits it.

### Multi-source correlation

Build explicit correlation rather than pretending same-location records are automatically identical:
- spatial proximity;
- temporal proximity;
- provider identifiers;
- corroborating attributes;
- confidence score;
- analyst/user confirmation.

## P1 — public/open data expansion

Prefer open or free public feeds before paid equivalents when semantics are adequate:
- NWS weather/alerts;
- OpenFEMA disaster/assistance data;
- NASA EONET natural events;
- NOAA/NCEI climate data;
- USGS and Landsat;
- Copernicus;
- Census;
- EIA;
- BLS;
- FRED;
- USAspending;
- Grants.gov;
- EPA;
- NHTSA;
- CISA KEV;
- NIST NVD;
- open transit / GTFS-RT;
- OSM/Overpass and permitted public camera catalogs.

## P1 — specialized fork ideas

Evaluate selectively:
- ocean observations/current-field visualization/drift modeling from upstream PR #100;
- live HLS camera rendering from #189, with proxy/storage implemented only in the canonical backend and only for permitted public streams;
- NIFC wildfire incident context;
- OpenSeaMap/OpenSnowMap overlays;
- mobile/tablet render profiles;
- accessibility and recovery of off-screen panels;
- TAK/Cursor-on-Target interoperability for authorized public-safety/research workflows;
- civic-office layers with explicit completeness limits.

Do not automatically import high-risk or license-sensitive surveillance feeds. Any ALPR, Wi-Fi-observation or similar dataset requires a source-by-source terms/privacy/use review before activation or persistence.

## P2 — Halo-native features beyond GEV forks

- infrastructure dependency graph as a first-class view;
- historical change detection from canonical entity revisions;
- contradiction visualization across providers;
- source-health matrix and stale-data overlays;
- per-layer FinOps budget meter;
- entitlement-lane visualization;
- "why do I know this?" provenance explainer;
- "what changed here?" temporal brief;
- area brief generated from bounded selected sources;
- PRIM3 semantic parity: Hidden/Detected/Inferred/Corroborated/Verified mental model;
- owner/admin direct entitlement;
- future PRIME/ASCENDED consumer entitlement from server state only;
- mobile/PWA first, native wrappers later;
- optional local AI, with a manual mode that remains fully usable when AI is unavailable.

## Never-do architecture rules

1. No second authoritative backend.
2. No production provider secrets in the browser.
3. No client-local PRIME/ASCENDED authority.
4. No academic/nonprofit entitlement silently reused for commercial consumers.
5. No persistence when provider terms forbid it.
6. No inference rendered as provider fact.
7. No simulated/demo rows labelled live.
8. No full global point dataset represented as thousands of independent Cesium Entities when batching is viable.
9. No provider outage may take down the entire viewer.
10. No merge to PRIM3 `main` until the feature set and regression gates are accepted.

## Definition of done for the feature-establishment branch

Before merge is even considered:
- upstream feature parity is inventoried;
- selected public-fork gains are implemented or explicitly rejected with reason;
- canonical Worker replaces production secret-bearing Vite routes;
- storage/history endpoints work against the canonical spatial schema;
- desktop + iPad performance baselines exist;
- 10k/50k/100k point benchmarks exist;
- source/provenance/freshness UI exists;
- map/graph/timeline pivot works;
- provider failure degrades locally;
- AI tool use is bounded/auditable;
- licensing/data-source ledger is current;
- full unit suite/build stays green.
