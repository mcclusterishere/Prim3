# Hitman's Halo — GEV Fork / Upstream Harvest Matrix

**Reviewed:** 2026-09-10  
**Branch:** `feature/hitmans-halo-gev-superset`  
**Rule:** Harvest capability, not architectural debt. Production identity, secrets, entitlements, persistence and provider governance stay in the canonical McCluster control plane.

## Ranking of McCluster-owned implementations

| Rank | Codebase | Role | Relative advancement | Action |
|---|---|---|---|---|
| 1 backend | `mcclusterishere/mccluster:main` | auth, source registry, entitlements, persistence, provider adapters | materially beyond stock GEV backend model | keep canonical |
| 1 viewer | `mcclusterishere/Seek-First:main` | richest existing McCluster GEV-derived viewer | upstream-compatible plus McCluster transport/docs | imported into this branch |
| target | `Prim3:feature/hitmans-halo-gev-superset/products/hitmans-halo/gev-engine` | Halo superset | full Seek First tree plus original Halo modules | develop here; do not merge yet |
| salvage | `mccluster:grok/spatial-plane` | earlier identity/capability architecture | 3 unique commits but materially stale | mine concepts only |
| obsolete | `mccluster:claude/gev-spatial-intelligence-c6ep2b` | old spatial backend | absorbed by main | no merge |
| obsolete | `mccluster:feature/gev-spatial-intelligence` | old spatial backend | absorbed by main | no merge |

No other inspected McCluster repository was identified as a complete one-to-one or enhanced GEV viewer clone.

## Public derivatives

### `uhrichsam4/gods-eye-view` — P0 performance mine

Harvest/reimplement:
- Cesium `PointPrimitiveCollection` point batching;
- progressive marker construction across animation frames;
- viewport culling;
- lightweight spatial indexing with antimeridian handling;
- Web Worker payload parsing/normalization;
- airport/static-layer bulk rendering optimizations;
- graceful source fallbacks;
- collapsible layer taxonomy;
- render-governor / hover-picking / tile-streaming optimization patterns;
- disabled/upstream-failure backoff;
- multi-step think/act/observe voice interaction patterns.

Halo status:
- point batching foundation: IMPLEMENTED;
- progressive batching foundation: IMPLEMENTED;
- antimeridian spatial index: IMPLEMENTED;
- Worker payload pipeline: IMPLEMENTED;
- source-health circuit breaker: IMPLEMENTED;
- backend-driven source taxonomy: IMPLEMENTED;
- full high-volume layer conversion: TODO + benchmark.

### `WorldPixelMap/android-gods-eye-view` — P1 distribution mine

Harvest concepts:
- Android/native wrapper ergonomics;
- launcher/deep-link patterns;
- touch-first controls.

Do not import local licensing as authority. Halo entitlement remains server-side.

### `Onesecondafter/gods-eye-view` — P1 hosted-runtime lessons

Harvest:
- health checks;
- explicit host/runtime diagnostics;
- production watcher/HMR removal;
- deployment ergonomics.

Reject:
- parallel production credential broker.

### `AWardPublications/gods-eye-view` — P1 governance pattern library

Harvest concepts:
- tenant-aware principals;
- human approval states;
- governed agent actions;
- audit/event chains;
- decision provenance.

Reimplement these in McCluster's existing identity/entitlement model. Do not merge the divergent application wholesale.

## Verified upstream open PRs — Tier 1

### #166 — keyless place search

**State:** open when reviewed.  
**Capability:** Photon/OSM fallback at all forward-geocode call sites; distinguish a definitive miss from a provider outage; soft viewport bias with an unbiased retry when proximity would select the wrong continent/place; preserve camera-framing semantics.

Halo decision: **PORT CONCEPT / ORIGINAL IMPLEMENTATION.**

Current Halo work:
- `src/platform/keylessGeocode.js` implements canonical-Worker Google first, public Photon fallback, accent-insensitive toponym matching, soft bias, outage-not-miss caching and entitlement-denial non-bypass.
- `src/locations.js` is being rewired to consume that adapter.

### #218 — GTFS-Realtime public transit

**State:** open when reviewed.  
**Capability:** buses/trams/metros/trains/ferries from openly published GTFS-RT; coverage-aware polling; point primitives; interpolation between fixes; staleness handling; per-feed attribution; protobuf decoding; bounded caching/stale-on-error.

Halo decision: **P0/P1 PORT, BUT SPLIT CLIENT/SERVER.**

Client side to harvest/reimplement:
- GTFS-RT decoder;
- moving primitive layer;
- interpolation/removal/staleness logic;
- camera/coverage activation;
- cards/taxonomy.

Canonical backend responsibilities:
- registered-feed URL allowlist;
- fetch/cache/single-flight;
- response-size/time limits;
- attribution/license metadata;
- entitlement lane.

### #219 — keyless A→B directions

**State:** open when reviewed.  
**Capability:** click SET A / SET B, DRIVE/WALK/BIKE profiles, street-following route geometry, maneuver dots, turn-by-turn instructions, SWAP/CLEAR/FLY, OSRM fallback.

Halo decision: **PORT.**

Architecture:
- UI/maneuver parsing belongs in Halo viewer;
- commercial TomTom can remain a canonical source;
- OSRM/public routing fallback should be registered/governed rather than becoming a new secret-bearing Vite backend.

### #236 — local voice provider

**State:** open when reviewed.  
**Capability:** Ollama/Anthropic alternative brain driving the same bounded map tools; browser speech recognition/TTS; typed-command fallback.

Halo decision: **PORT THE PROVIDER-NEUTRAL IDEA, NOT ITS STANDALONE SERVER.**

Halo already has `src/agent/toolRegistry.js` as the bounded action surface. Future model providers must call those actions through an authenticated/auditable orchestration path.

Priority model modes:
1. canonical McCluster AI;
2. optional local model;
3. manual/no-AI mode.

### #100 — ocean intelligence stack

**State:** open when reviewed.  
**Capability:** NOAA/NDBC observations, marine forecast separation, GSHHG land/sea mask, animated current field, HF-radar/HYCOM/fallback model hierarchy, explicit provenance, and a clearly labelled stochastic drift simulation.

Halo decision: **HIGH-VALUE P1 PORT, PIECEWISE.**

Recommended order:
1. NDBC observation layer;
2. NOAA/Open-Meteo marine context;
3. current-field visualization;
4. land/sea mask;
5. simulation only with explicit `SIMULATED` status and model/uncertainty disclosure.

Do not imply a probabilistic drift simulation is an observed or operational search-and-rescue product.

### #189 — live HLS/RTMP camera video

**State:** open when reviewed.  
**Capability:** live video instead of refreshed stills, HLS segment handling, optional ffmpeg remuxing for compatible public streams, hls.js, Cesium video texture and playback recovery.

Halo decision: **P1, TERMS-FIRST.**

Viewer:
- video texture/card UX;
- decoder lifecycle/recovery;
- display health.

Canonical backend/subordinate compute:
- registered public source allowlist;
- URL/origin pinning;
- segment proxy/cache where provider terms permit;
- ffmpeg only on a subordinate compute node if required;
- no arbitrary user-supplied camera URLs.

## New upstream signal observed during this build

### #246 — `scan_for_clusters` agent tool

**State:** open when reviewed on 2026-09-10.  
**Capability:** voice/agent action schema for cluster scanning.

Halo decision: **REIMPLEMENT SEMANTICALLY.** Cluster analysis belongs behind Halo's bounded tool registry with declared input bounds, source provenance and an auditable result. Do not mutate the upstream frozen tool schema blindly.

## Security / hardening harvest

The September dossier flags upstream hardening work in #245, #242, #110, #185, #180, #97 and #178. Treat these as an audit queue, not blind cherry-picks.

Required categories before merge:
- Content Security Policy;
- cross-site request gating / origin validation;
- browser-visible vs server-secret credential separation;
- outbound URL validation;
- redirect refusal/revalidation;
- request body caps;
- timeouts and aborts;
- dependency/CVE remediation;
- no open proxy behavior;
- explicit provider error classification;
- safe cache semantics: outage != negative result;
- source-specific persistence/retention rules.

Where the canonical McCluster Worker already provides a stronger control, keep the McCluster control and do not duplicate the Vite implementation.

## Tier 2 feature mine

Evaluate individually after P0 is stable:

| Candidate | Capability | Halo decision |
|---|---|---|
| #12 | TAK / Cursor-on-Target interoperability | authorized public-safety/research lane only |
| #13 | NIFC wildfire incidents | strong public-event layer candidate |
| #11 | WiGLE-derived wireless observations | privacy/terms review first; no automatic persistence |
| #14 | public ALPR/Flock data | high-risk/privacy-sensitive; reject by default absent narrow lawful public source/use case |
| #15 | Meshtastic | potentially useful public mesh layer; terms/source review |
| #116 | Rayhunter | defensive/research context only |
| #205 | global conflict events | provenance/quality review before inclusion |
| #114 | OpenSeaMap/OpenSnowMap overlays | low-cost thematic layer candidate |
| #157 | area intelligence brief | implement as bounded provenance-citing Halo brief, not free-form model fact |
| #51 | typed multi-provider agent | combine concept with Halo bounded tool registry |
| #167 | civic offices | useful government/civic layer with completeness disclaimer |
| #79/#203/#239/#72/#141 | mobile/performance work | evaluate after desktop perf baseline |
| #181/#126/#198/#197/#225/#118 | reliability/recovery work | mine aggressively where not already covered |
| #234/#222/#207/#47/#105/#106 | camera/cinematic features | P2 polish after data semantics/performance |

## Original Halo advantages that should exceed the fork ecosystem

These are not merely copied fork features:

1. **Canonical entitlement firewall** across PUBLIC_OPEN / ACADEMIC / NONPROFIT / COMMERCIAL / INTERNAL / RESTRICTED lanes.
2. **Map + dependency graph + timeline** as equal first-class views.
3. **Evidence-state semantics:** UNKNOWN / OBSERVED / INFERRED / CORROBORATED / VERIFIED / STALE / CONTRADICTED.
4. **Entity history** from canonical revision storage rather than current-state-only map markers.
5. **Source-health circuit breaking** and explicit degraded state.
6. **Per-source provenance/freshness/persistence visibility.**
7. **FinOps/source entitlement ledger** so a cheap academic credential cannot silently subsidize a commercial product.
8. **Bounded AI action vocabulary** with audit hooks.
9. **PRIM3 semantic continuity**: the game teaches the information-state mental model before the real-world companion unlocks.
10. **Server-side PRIME/ASCENDED entitlement** for future players; owner/admin remains independently authorized.

## Import rule

For every harvested feature:

```text
candidate
 -> verify current upstream/fork state
 -> identify exact user value
 -> classify VIEWER vs CANONICAL BACKEND vs SUBORDINATE COMPUTE
 -> check data/software license
 -> reimplement or cherry-pick minimally
 -> preserve required license notices
 -> add tests
 -> benchmark if performance-related
 -> record provider/source terms
 -> only then enable in Halo
```

A larger diff is not inherently a better fork. Halo should be able to explain why each source exists, why the user may see it, how fresh it is, how much it costs, and what evidence supports the rendered conclusion.
