# Seek First / GEV Cost Model — September 2026

**Verified:** 2026-09-10  
**Scope:** owner-first Seek First Superset UI using the existing canonical McCluster Worker/Supabase backend.

> This document supersedes the earlier assumption that an additional DigitalOcean VM is required for owner hosting.

## Canonical architecture

```text
Seek First Superset viewer
   -> canonical McCluster authentication
   -> api.mccluster.org/v1/seek-first/*
   -> Cloudflare Worker / Durable Objects / provider adapters
   -> Supabase spatial plane
   -> provider APIs
```

A separate VM is optional specialized compute/ingest infrastructure, not the baseline backend.

## Fixed-cost bands

| Band | Components | Incremental fixed target |
|---|---|---:|
| Existing-stack prototype | existing Worker + existing Supabase plan + static viewer + public/open feeds | ~$0 if current included quotas suffice |
| Reliable owner production | Workers Paid + Supabase Pro, if neither is already paid | about $30/month |
| Rich owner console | above + deliberately capped Google/AI usage | target ~$30–75/month |
| Research-enhanced | approved student/academic/nonprofit data programs | often $0 direct source cost but lane/terms restricted |
| Multi-user product | production DB/compute + commercial provider licensing | usage/contract driven |

## Current platform references

### Cloudflare Workers

Current Workers Paid minimum: **$5/month per account**, with increased included usage for Workers/Pages Functions/KV/Hyperdrive and Durable Objects eligibility. If the McCluster account is already on Paid, Seek First may add little or no fixed incremental Worker cost until usage crosses included allowances.

Source: https://developers.cloudflare.com/workers/platform/pricing/

### Supabase

Current pricing:
- Free: $0, 500 MB database, 50k MAU, 5 GB egress; project can pause after one week of inactivity.
- Pro: from **$25/month**, 8 GB disk, 100k MAU, 250 GB egress, daily backups, and $10/month compute credit currently covering one Micro project.

For an owner-only prototype, Free can be adequate if the project is already active. For a dependable production control/data plane, budget Pro unless an existing paid plan already covers the project.

Source: https://supabase.com/pricing

### Google Maps Platform

Photorealistic 3D Tiles currently include **1,000 free monthly billable events**, then **$6 per 1,000** in the first paid tier. Other Maps/Places SKUs have their own free caps.

Verified Google for Nonprofits organizations may apply to Public Programs for additional credits; the current nonprofit program advertises Google Maps Platform credits starting at **$250/month** for approved organizations.

Sources:
- https://developers.google.com/maps/billing-and-pricing/pricing
- https://developers.google.com/maps/billing-and-pricing/public-programs

### OpenAI Realtime

AI voice/HUD is variable usage, not a fixed hosting cost. Default the owner experience to a lower-cost realtime model tier and enforce provider-side project limits in addition to application-side per-session guards.

### Cesium ion

Do not make a paid Cesium plan a V1 requirement. Use Google direct 3D where appropriate plus open/keyless basemap/terrain fallbacks. Add paid Cesium only if its commercial asset/terrain/streaming capabilities create measurable value that alternatives do not.

## Data-source cost strategy

### Prefer $0/public sources first

Examples already in the McCluster source registry:
- Census
- EIA
- BLS
- FRED
- USAspending
- Grants.gov
- EPA
- USGS
- NHTSA
- CelesTrak
- OSM/Overpass
- GDELT
- NASA FIRMS
- Copernicus

High-value public additions planned:
- National Weather Service
- OpenFEMA
- NASA EONET v3
- CISA KEV
- NIST NVD 2.0
- NOAA/NCEI climate data

### Academic/nonprofit sources are not automatically commercial sources

The canonical McCluster entitlement firewall must preserve source terms. Student/nonprofit eligibility can legitimately strengthen the owner/research experience while the player-facing/commercial lane uses only separately licensed sources.

Important examples:
- Planet Education & Research Basic is free/limited but non-commercial research only.
- OpenSky research access can be enhanced for institutional researchers, but its published terms require a written license for operational integration into a live product/service.
- Google/Mapbox nonprofit programs may subsidize approved nonprofit use without automatically converting the entitlement into unrestricted commercial redistribution rights.

## External credit opportunities

These can fund **optional** compute/storage/processing without moving backend authority away from McCluster.

- Microsoft for Nonprofits: currently **$2,000/year Azure credit** for eligible nonprofits.
- AWS Nonprofit Credit Program: currently advertises **up to $5,000 AWS Promotional Credit** for eligible nonprofits; exact available offer/partner path must be verified at application time.
- Azure for Students: currently **$100 credit** for eligible full-time students.
- GitHub Student Developer Pack: useful for current partner tooling, but the DigitalOcean offer is no longer a 2026 budget lever; GitHub announced it ended July 31, 2026 and prior promotional credits expired August 1, 2026.
- Cloudflare Project Galileo: potentially valuable Business/Zero Trust/Workers security benefits for qualifying vulnerable public-interest organizations, not a generic nonprofit free-hosting entitlement.

Full program and licensing ledger lives in the canonical backend repository at:
`docs/control-plane/SEEK-FIRST-COST-AND-ELIGIBILITY-LEDGER-2026-09.md`.

## When a VM becomes justified

Do **not** provision a VM just because GEV is visually heavy; Cesium/WebGL rendering happens mostly on the client.

Add a subordinate VM/container only when measured workloads require it, such as:
- persistent feed processing that is uneconomical/inappropriate at the edge;
- bulk geospatial ETL;
- image/raster processing;
- local/dedicated model inference;
- heavy media transforms;
- large cache/materialization jobs.

At that point a ~$24/month 4 GiB / 2-vCPU instance remains a reasonable first compute node, but it is controlled by the canonical backend rather than becoming a second credential broker.

## Cost-control invariants

1. Provider-side hard budget/quota before paid API activation.
2. Per-source usage telemetry by user/org/lane.
3. Cache where provider terms allow.
4. Bounding-box/viewport queries instead of global polling.
5. Source fallbacks where semantics permit.
6. Browser-visible tokens restricted by origin/API/asset scope.
7. Academic/nonprofit entitlements never silently fund a commercial consumer.
8. No larger infrastructure until measurements justify it.
