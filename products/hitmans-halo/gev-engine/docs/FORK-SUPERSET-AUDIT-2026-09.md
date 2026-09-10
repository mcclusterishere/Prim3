# Seek First / God's Eye View Superset Audit — September 2026

**Status:** active engineering audit  
**Reviewed:** 2026-09-10  
**Product target:** make `mcclusterishere/Seek-First` the richest viewer while preserving `mcclusterishere/mccluster` as the single canonical backend/control plane.

## Executive decision

Do **not** build a second credential-broker backend inside this fork for production.

The target architecture is:

```text
Seek First Superset UI
        |
        | authenticated requests
        v
https://api.mccluster.org/v1/seek-first/*
        |
        +-- canonical McCluster Worker / auth / entitlements
        +-- Supabase spatial/history plane
        +-- Durable Objects / queues where needed
        +-- optional subordinate ingest workers for workloads that do not fit the edge
        |
        +-- public / academic / nonprofit / commercial providers
```

The upstream Vite middleware remains useful as a reference implementation and local-development fallback. It is not the production authority.

## User-repository sweep

The McCluster GitHub account currently exposes 28 repositories. A code search across the estate for the upstream GEV signature and GEV-specific provider symbols found only one complete upstream-style viewer: **`mcclusterishere/Seek-First`**.

`mcclusterishere/mccluster` is not a clone. It is the canonical backend/control plane and now contains a purpose-built `workers/mccluster/src/seek-first/` service.

No other inspected McCluster repository is an exact one-to-one GEV clone or a richer GEV viewer.

### Internal ranking

| Rank | Repository / branch | Classification | Decision |
|---|---|---|---|
| 1 backend | `mccluster/main` | Canonical control plane; broader provider registry, storage, entitlements, auth | Keep as only backend authority |
| 1 viewer | `Seek-First/main` | Direct upstream fork + McCluster deployment documentation | Turn into Superset UI |
| obsolete | `mccluster/claude/gev-spatial-intelligence-c6ep2b` | 0 commits ahead of main, behind main | Delete/archive when housekeeping is authorized |
| obsolete | `mccluster/feature/gev-spatial-intelligence` | 0 ahead, substantially behind main | Delete/archive when housekeeping is authorized |
| salvage | `mccluster/grok/spatial-plane` | 3 unique commits ahead but far behind current main | Do not merge wholesale; salvage missing contracts/tests only |

The `grok/spatial-plane` branch is historically important because it formalized identity-bound application lanes and explicitly prohibited a second Worker. Current `main` has since renamed/evolved the service to `/v1/seek-first` and added owner access, entitlements, persistent spatial history and live AIS. Preserve any still-useful app-identity/capability ideas by reimplementing them against current main, not by merging the stale branch.

## Upstream baseline

Canonical upstream: `bilawalsidhu/gods-eye-view`.

The upstream source code is MIT licensed. Third-party datasets, models and live-provider content retain their own licenses/terms; never assume the MIT license applies to data.

Our fork is currently much closer to upstream than the final McCluster product should be. The meaningful McCluster advantage today lives mostly in the canonical backend rather than the viewer.

## High-signal public derivatives

This is **not a claim that every one of ~4,000+ forks has been line-by-line audited**. It is a high-signal sweep using repository search, fork metadata, recent commit deltas and concrete feature changes. Re-run the audit periodically.

### 1. `uhrichsam4/gods-eye-view` — strongest GEV-specific enhancement candidate found

**Verdict: mine aggressively for patterns; reimplement/cherry-pick selectively.**

Verified useful changes include:

- **Batched Cesium point rendering** using `PointPrimitiveCollection` rather than one Entity per simple marker.
- **Progressive marker construction across frames** to avoid long UI freezes.
- **Viewport culling** so city-level views do not draw the entire global dataset.
- A lightweight **uniform-grid spatial index** with antimeridian handling.
- **Web Worker parsing/normalization** for large data payloads, moving CPU work off the rendering thread.
- Correct elevation handling for batched airport points.
- **Keyless FIRMS fallback** through NASA's public archive when a dedicated key is absent.
- More aggressive wildfire payload filtering/precision normalization for performance and map legibility.
- **OpenSky anonymous and adsb.lol fallback paths** so civil aircraft degrade instead of disappearing when credentials/upstream fail.
- Seed satellite orbital data for first-boot/CelesTrak failure resilience.
- **Collapsible layer taxonomy** rather than an endlessly tall flat layer list.
- OurAirports layer with runway length, surface, lighting and true heading.
- **Conversational think-act-observe voice loop** for multi-step map commands instead of one-command parsing.
- local/free-model/OpenRouter support as an optional AI route.
- cursor-location timezone awareness.
- Retina/WebGL/render-governor/hover-picking optimizations.
- Google 3D tile-streaming/cache tuning.
- immutable caching + honest static 404s + disabled-feature backoff rather than infinite polling.

### 2. Upstream `bilawalsidhu/gods-eye-view`

**Verdict: keep tracking continuously.**

Upstream remains the reference for broad feature compatibility, provider fixes, security hardening, map behavior and community contributions. Do not freeze our fork at a historical point; maintain an upstream merge/rebase strategy while keeping McCluster-specific code isolated behind clear modules.

### 3. `Onesecondafter/gods-eye-view` — hosted-runtime engineering

**Verdict: mine operational lessons, not backend architecture.**

Useful patterns:
- authenticated hosted wrapper;
- host-header handling;
- watcher/HMR removal for hosted environments;
- dedicated `/healthz` for platform health checks;
- Docker/Render deployment lessons.

Because McCluster already has a canonical Worker, do not import its parallel credential-broker architecture.

### 4. `WorldPixelMap/android-gods-eye-view` — mobile/native packaging

**Verdict: retain as a distribution reference.**

Useful direction:
- Android wrapper/native packaging;
- launcher/mobile ergonomics;
- entitlement/licensing UX patterns.

Do not copy a local trial/license mechanism as the source of truth. McCluster entitlements remain server-side.

### 5. `bobbyhug/gods-eye-view` — keyless/hosted resilience

**Verdict: compare before porting.**

Reported changes include keyless map operation and hosted-domain support. Much keyless behavior is now present upstream, so only port deltas that current upstream/Seek First does not already contain.

### 6. `dhapre109/gods-eye-view` — Cloudflare Pages packaging

**Verdict: low-priority.**

A Pages/Wrangler deployment manifest is useful as packaging reference, but the McCluster product already has a stronger Worker/control-plane architecture.

### 7. `AWardPublications/gods-eye-view` — broad governance/agent transformation

**Verdict: pattern library only; never wholesale merge.**

This derivative has evolved into a substantially different product. Interesting reusable concepts include:
- tenant-aware principals;
- human-in-the-loop approvals;
- audit/event chains;
- governed agent actions;
- role/approval policies;
- decision provenance.

Those ideas fit McCluster's existing entitlement/audit direction, but the implementation/domain model is too divergent to treat as a normal GEV feature fork.

## Feature priority matrix

| Feature | Source | Value | Port strategy |
|---|---|---:|---|
| Worker-based payload parsing | uhrichsam4 | P0 | Reimplement in viewer |
| Point batching | uhrichsam4 | P0 | Reimplement + benchmark |
| Viewport culling/spatial index | uhrichsam4 | P0 | Reimplement + antimeridian tests |
| Graceful/keyless source fallbacks | uhrichsam4/upstream | P0 | Prefer canonical Worker adapters |
| Layer groups/taxonomy | uhrichsam4 | P0 | Rework around McCluster source registry |
| Canonical API client | McCluster | P0 | Build locally in Seek First |
| Provenance/confidence/freshness UI | PRIM3/McCluster | P0 | Original McCluster feature |
| Entity graph + timeline | McCluster/PRIM3 | P0 | Original McCluster feature |
| Multi-step AI command loop | uhrichsam4 + McCluster | P1 | Tool calls must be bounded and auditable |
| Airports/aviation context | uhrichsam4 | P1 | Add via Worker/source registry where terms permit |
| Mobile/PWA/native wrapper | WorldPixelMap | P1 | Build after desktop interaction stabilizes |
| HITL/approval/audit chain | AWard patterns | P1 | Implement in canonical Worker, not viewer |
| Hosted Vite broker | Onesecondafter | NO | Not production architecture |
| Local trial/license gate | Android derivatives | NO | Server entitlement is authority |

## What makes Seek First a genuine superset

The winning product is not the fork with the most feeds. It should combine:

1. **Best renderer performance** — batching, culling, worker parsing, adaptive quality.
2. **Best data resilience** — source fallback, cache freshness, explicit stale state, provider health.
3. **Best information semantics** — provenance, confidence, freshness, contradictions and verification state.
4. **Best system model** — map + entity/dependency graph + timeline.
5. **Best operating model** — one backend, entitlement lanes, usage budgets, source terms and auditability.
6. **Best AI interaction** — constrained multi-step agent that can inspect current view state and explain its evidence.
7. **Best education/product bridge** — PRIM3 earned-omniscience UI and post-game Prime entitlement share the same conceptual language.
8. **Best owner experience** — immediate owner access with no campaign gate.

## Rules for importing fork work

- Verify the change still solves a current problem before porting it.
- Prefer reimplementation when a fork has diverged heavily.
- Preserve MIT notices for copied/substantial source code.
- Re-check every dataset/provider license independently.
- Benchmark performance changes against the current viewer; do not port optimization folklore.
- Add regression tests for every imported behavior.
- Provider secrets, entitlements, persistent ingestion and app identity belong in `mccluster`, not this viewer.

## Continuous fork intelligence

Re-run this audit when:
- upstream publishes a release;
- a high-signal fork adds a substantial commit;
- a provider changes access/terms;
- a McCluster feature overlaps an upstream implementation.

The end state is a maintained **superset**, not a one-time fork snapshot.
