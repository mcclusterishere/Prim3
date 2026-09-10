# Hitman's Halo — Resource, Budget & Access Plan

**Branch status:** feature establishment only; not approved for merge  
**Backend authority:** existing McCluster Worker + Supabase  
**Rule:** eligibility creates source/consumer lanes; it never turns restricted data into unrestricted data.

## Cost target

### Tier 0 — prototype / owner research

Target incremental infrastructure cost: **$0** when existing Cloudflare/Supabase allowances and open public sources are sufficient.

Use:
- the existing McCluster Worker;
- the existing Supabase project;
- static/CDN viewer delivery;
- open/keyless providers first;
- manual map interaction if AI budget is exhausted.

### Tier 1 — reliable owner production

Planning floor: **about $30/month** if neither paid component is already covered:
- Cloudflare Workers Paid: about $5/month starting tier;
- Supabase Pro: about $25/month starting tier.

Do not add a dedicated VM merely because the client renders a large globe. Add compute only when measured workloads require a persistent process, more CPU/RAM, long-lived ingest, bulk ETL or model inference.

### Tier 2 — rich private console

Planning target: **$30–$75/month** after capping paid mapping/AI usage and exhausting open/free/approved-credit paths first.

### Tier 3 — commercial/multi-user

Do not budget by today's private-console economics. Commercial mapping, aviation, maritime, imagery and AI terms can dominate. Re-price each provider for the actual consumer lane before public launch.

## Access lanes

```text
PUBLIC_OPEN -> general public/open-data sources subject to source terms
ACADEMIC    -> university/research use only unless separately licensed
NONPROFIT   -> nonprofit mission use only unless separately licensed
COMMERCIAL  -> paid/commercial product rights
INTERNAL    -> owner/control-plane visibility over legitimately acquired sources
RESTRICTED  -> explicit contract, agreement, consent or authorization only
```

The owner console may combine multiple legitimately acquired lanes for internal analysis, but the backend must filter what can flow into a player/customer/public session.

## Public/open government backbone — use first

Priority additions/expansions:
- National Weather Service API — forecasts, observations and alerts;
- OpenFEMA — disaster, assistance, mitigation and NFIP datasets;
- NASA EONET — natural-event GeoJSON and linked layer metadata;
- NOAA/NCEI — climate and station data;
- USGS / Landsat;
- NASA FIRMS;
- Census;
- EIA;
- BLS;
- FRED;
- USAspending;
- Grants.gov;
- EPA;
- NHTSA;
- CISA Known Exploited Vulnerabilities;
- NIST NVD;
- FAA SWIM/SWIFT public-release feeds after the required agreement/subscription process;
- Copernicus Data Space;
- OSM/Overpass;
- GTFS-Realtime feeds where operators publish them.

Government/open data is the cheapest strategic advantage because many of these sources require no special institutional status at all.

## Nonprofit leverage

### Google for Nonprofits / Maps Public Programs

Verified Google for Nonprofits organizations can apply for additional Google Maps Platform credits **starting at $250/month** and Google Earth credits **starting at $75/month** under the current public-program terms.

Use it for:
- photorealistic map/3D costs;
- geocoding/places where justified;
- nonprofit/public-interest Halo surfaces.

Reference: https://developers.google.com/maps/billing-and-pricing/public-programs

### Microsoft for Nonprofits

Current Microsoft nonprofit offer: **$2,000 USD Azure services credit per year**, renewable while eligible.

Use it for optional/subordinate workloads such as:
- batch geospatial jobs;
- object storage;
- queues;
- AI/search experiments;
- disaster-recovery compute;
- ETL.

Do not move identity/entitlement authority merely to consume the credit.

Reference: https://www.microsoft.com/en-us/nonprofits/azure

### AWS Nonprofit Credit Program

AWS currently advertises **up to $5,000 in promotional AWS credit** for eligible nonprofits, distributed through TechSoup/partner NGOs where applicable.

Use it for optional batch/archival/compute jobs whose economics favor AWS.

Reference: https://aws.amazon.com/government-education/nonprofits/nonprofit-credit-program/

## Student / academic leverage

### Planet Education & Research

Current Basic E&R access permits approved university students/researchers to view/download up to **3,000 km²/month** for non-commercial research. Nonprofit and government employees are directed to other Planet programs rather than the E&R lane.

Use it only inside an ACADEMIC/research entitlement unless separate rights are granted.

Reference: https://www.planet.com/industries/education-and-research/

### Azure for Students / GitHub Student Pack

Treat these as development/prototyping benefits. Never assume a student benefit licenses a paid commercial product. Keep a separate credential owner and expiry/renewal record for every student benefit.

## Veteran axis

Do not invent a universal veteran API entitlement. Veteran status is potentially valuable for:
- education/certification reimbursement;
- entrepreneurship/procurement programs;
- Veteran-service applications that legitimately use VA developer APIs;
- federal contracting pathways where eligibility applies.

It is **not** a general permission to access restricted government operational data.

## FAA SWIM / SWIFT

FAA describes SWIFT Portal/SWIM Cloud Distribution Service as a publicly accessible cloud system providing near-real-time FAA SWIM data. Access requires the subscription process and Service Access Agreement; agreements are renewed annually under current support guidance.

This is a potentially high-value public-release aviation lane, but it is not an aviation-safety/operational control feed and must retain FAA terms/limitations.

References:
- https://www.faa.gov/air_traffic/technology/swim/products/get_connected
- https://support.swim.faa.gov/

## FinOps ledger required for every provider

Record before activation:

```text
source_key
provider
source_class
consumer_lane
credential_owner
terms_url
commercial_use_allowed
public_display_allowed
redistribution_allowed
persistence_allowed
retention_limit
free_quota
paid_rate
grant_or_credit
credit_expiration
attribution_required
fallback_source
backend_adapter
current_health
```

## Purchasing order

1. Exhaust PUBLIC_OPEN sources.
2. Activate nonprofit credits only for nonprofit-eligible workloads.
3. Activate student/research entitlements only for academic lanes.
4. Use veteran/procurement programs where they actually fit.
5. Buy commercial feeds only for capabilities open/public sources cannot satisfy.
6. Add dedicated compute only after telemetry demonstrates a bottleneck.
7. Keep provider-side budget/quota controls as the hard financial backstop.
