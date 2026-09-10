# Owner-hosted GEV cost model

**Verified:** 2026-09-10  
**Scope:** one authenticated owner, full Seek First / God's Eye View runtime, not public multi-user SaaS.

Prices are external and may change. Re-check provider pricing before materially scaling usage.

## Recommended owner stack

| Component | Recommended starting choice | Monthly budget |
|---|---|---:|
| VM | DigitalOcean Basic, 4 GiB RAM / 2 vCPU / 80 GiB SSD | $24.00 |
| VM backup | Weekly backup, optional | $4.80 |
| Cloudflare Tunnel + Access | Free tier, owner-only | $0.00 |
| Domain/subdomain | Existing domain, e.g. `prime.mcluster.org` | $0 incremental |
| Google 3D Tiles / Places | Pay-as-you-go with free monthly caps | $0 target |
| Cesium ion | Not required for owner V1 when using direct Google / fallback map sources | $0 target |
| OpenSky | Standard/anonymous credit model | $0 target |
| AISStream | Free API key / WebSocket | $0 target |
| NASA FIRMS | Free MAP_KEY | $0 target |
| TomTom | Free monthly request allowance | $0 target |
| OpenAI Realtime/HUD | Usage based; set a provider budget | $10 suggested initial cap |

### Practical total

- **Bare owner runtime:** about **$24/month** before usage-based APIs.
- **Recommended owner runtime with weekly VM backup:** about **$28.80/month** before usage-based APIs.
- **Recommended initial all-in budget ceiling:** **$40/month** by adding a $10 OpenAI budget and keeping Google/TomTom within free caps.
- This is a budget target, not a guarantee: Google/OpenAI usage can exceed it unless provider-side quotas/budgets are configured.

## Current price references

### DigitalOcean

Current Basic Droplet pricing lists 4 GiB / 2 vCPU / 80 GiB SSD / 4 TB transfer at $24/month. Weekly basic backups add 20% of Droplet cost; daily backups add 30%.

Sources:
- https://www.digitalocean.com/pricing/droplets
- https://docs.digitalocean.com/products/backups/details/pricing/

### AWS Lightsail alternative

A comparable Lightsail Linux/Unix bundle with public IPv4 is currently $24/month for 4 GB RAM, 2 vCPU, 80 GB SSD and 4 TB transfer. It is a valid alternative if AWS is preferred.

Source:
- https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-bundles.html

### Cloudflare Access

Cloudflare's Zero Trust free tier currently covers teams under 50 users. That is sufficient for a single-owner authentication gate in front of GEV.

Source:
- https://www.cloudflare.com/sase/products/access/

### Google Maps Platform

Current Google Maps Platform pay-as-you-go pricing includes:

- Photorealistic 3D Tiles: first 1,000 billable events/month free, then $6.00 per 1,000 in the first paid tier.
- Places Nearby Search Pro: first 5,000 events/month free, then $32.00 per 1,000 in the first paid tier.

For a single owner, keep usage below the free caps initially and configure provider quotas/budget alerts.

Source:
- https://developers.google.com/maps/billing-and-pricing/pricing

### Cesium ion

Cesium Community is currently free for eligible personal/non-commercial use. Commercial individual pricing is currently $149/month. The owner V1 does not require a paid Cesium plan because Seek First can use a direct Google Maps key and has keyless/fallback map sources.

Source:
- https://cesium.com/platform/cesium-ion/pricing/

### OpenAI Realtime

Seek First supports a standard and mini voice tier. Current published rates include:

- `gpt-realtime-2.1`: text $4/M input, $24/M output; audio $32/M input, $64/M output.
- `gpt-realtime-2.1-mini`: text $0.60/M input, $2.40/M output; audio $10/M input, $20/M output.

Use Mini for routine map interaction when cost matters and Standard when higher reasoning/tool reliability is worth the spend. The app also contains per-session spend guards, but a provider-side monthly usage limit remains the hard financial backstop.

Sources:
- https://developers.openai.com/api/docs/models/gpt-realtime-2.1
- https://developers.openai.com/api/docs/models/gpt-realtime-2.1-mini

### OpenSky

OpenSky uses API credits rather than a normal per-request dollar bill for standard access. Current quotas include 400 daily credits anonymously and 4,000 daily credits for a standard authenticated user per endpoint bucket. The application already has adaptive caching to conserve credits.

Source:
- https://openskynetwork.github.io/opensky-api/rest.html

### AISStream

AISStream advertises its real-time WebSocket feed as free. Keep the API key server-side; its own documentation explicitly tells web applications to consume the WebSocket on the backend and proxy only needed data to clients.

Sources:
- https://aisstream.io/
- https://aisstream.io/documentation

### NASA FIRMS

FIRMS MAP_KEY registration is free. The documented default limit is 5,000 transactions per 10-minute interval.

Source:
- https://firms.modaps.eosdis.nasa.gov/api/map_key/

### TomTom

TomTom currently advertises 200,000 free monthly requests for relevant map APIs. Seek First also has an application-side daily tile budget governor.

Source:
- https://docs.tomtom.com/pricing

## Scale trigger

Do not pay for a larger VM merely because the browser renders a large 3D globe. Cesium/WebGL rendering happens primarily on the client device. Scale the VM when observed server metrics show pressure from proxy concurrency, live AIS ingest, cache memory, media proxying or multiple simultaneous users.

Suggested upgrade trigger:
- sustained memory >75%;
- sustained CPU >70%;
- swap pressure;
- proxy latency increasing under ordinary use;
- multiple concurrent authenticated users;
- AIS/CCTV workload competing with other proxy traffic.

At that point, move to 8 GiB / 4 vCPU and begin extracting the Vite middleware into a dedicated production API service.
