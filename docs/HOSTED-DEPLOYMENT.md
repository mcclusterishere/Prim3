# Hosted God's Eye View / Seek First

## Purpose

This document defines a practical path for hosting the full God's Eye View runtime remotely instead of requiring every user to run it on their own computer.

The current application is **not only a static Vite front end**. `vite.config.js` also registers server middleware for OpenSky, CelesTrak, Overpass, CCTV, ADS-B, AISStream, terrain, TomTom, FIRMS, regional briefing, weather, launches, radio, OpenAI Realtime, Google Places and related caches/authentication. The AIS layer also maintains a server-side websocket/cache.

The repository's existing `SECURITY.md` correctly describes the Vite dev/preview server as a credential broker and not a hardened public production service.

Therefore there are two hosting stages:

1. **Private hosted runtime now** — run the existing preview server on an always-on VM, loopback-only, behind strong external authentication.
2. **Multi-user production runtime later** — extract server middleware into a dedicated authenticated API/gateway service with durable rate limiting, observability and user entitlements.

---

## Stage 1 — private hosted runtime

### Recommended topology

```text
Browser
  -> HTTPS + identity gate
  -> reverse proxy / secure tunnel
  -> 127.0.0.1:4173
  -> Vite preview + GEV proxy middleware
  -> public upstream feeds / configured providers
```

The GEV process should remain bound to loopback. Do **not** expose port 4173 directly to the public internet.

An authenticated Cloudflare Tunnel/Access deployment is a good fit when the domain is already managed through Cloudflare. A conventional HTTPS reverse proxy with strong authentication is also valid.

### Host requirements

- always-on Linux VM
- Node.js version supported by `package.json` (currently Node 24.14+ in the 24.x line or supported 26.x)
- Git
- enough memory/CPU for Vite preview, Cesium static delivery, proxy caching and live AIS processing
- persistent disk for checkout and `.gev-cache`
- outbound HTTPS/WebSocket access to configured data providers

### Install

```bash
sudo mkdir -p /opt/seek-first
sudo chown "$USER":"$USER" /opt/seek-first
git clone https://github.com/mcclusterishere/Seek-First.git /opt/seek-first
cd /opt/seek-first
npm ci
npm run build
```

Create a protected environment file outside the repository or provision equivalent service-manager secrets.

At minimum the application can run keyless with reduced capability. For the fuller experience configure the provider values documented in `.env.example`.

### Provider credential classes

**Browser-visible by design — restrict at provider:**
- `GOOGLE_MAPS_API_KEY`
- `CESIUM_ION_TOKEN`

These values can be seen by browser clients. Restrict the Google key by HTTP referrer/domain and allowed APIs. Restrict the Cesium token to read-only assets and approved URLs according to current provider capabilities/terms.

**Server-side only:**
- `OPENAI_API_KEY`
- `OPENSKY_CLIENT_ID`
- `OPENSKY_CLIENT_SECRET`
- `AISSTREAM_API_KEY`
- `LL2_API_TOKEN` when used
- `FIRMS_MAP_KEY` when used
- `TOMTOM_API_KEY` when used

Never deliver these secrets to a game client or player account.

### Hosted runtime command

Build first, then run preview on loopback:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

The preview runtime is still an interim deployment, not the final multi-user architecture. External authentication is mandatory for private remote use.

### systemd example

Create `/etc/systemd/system/seek-first.service`:

```ini
[Unit]
Description=Seek First / God's Eye View
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=gev
Group=gev
WorkingDirectory=/opt/seek-first
EnvironmentFile=/etc/seek-first/gev.env
ExecStart=/usr/bin/npm run preview -- --host 127.0.0.1 --port 4173
Restart=always
RestartSec=5
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/opt/seek-first/.gev-cache

[Install]
WantedBy=multi-user.target
```

Adjust the Node/npm path if Node is installed somewhere other than `/usr/bin`.

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now seek-first
sudo systemctl status seek-first
```

### Cloudflare Tunnel example

Keep GEV on loopback. Point a separately authenticated tunnel at it. If Vite/preview host checking sees the public hostname, configure the tunnel origin request to send a local Host header such as `localhost` rather than opening Vite's host policy globally.

Conceptually:

```yaml
ingress:
  - hostname: <your-gev-domain>
    service: http://127.0.0.1:4173
    originRequest:
      httpHostHeader: localhost
  - service: http_status:404
```

Protect the hostname with Cloudflare Access or an equivalent identity-aware proxy before allowing internet reachability.

### Private-owner acceptance checks

Before considering the deployment usable:

- site is unreachable without authentication;
- port 4173 is not internet-exposed;
- server-only provider secrets never appear in browser source/devtools/network payloads;
- Google/Cesium browser tokens are origin/API restricted;
- OpenSky aircraft layer works and observes provider limits;
- AIS websocket reconnects after service restart;
- voice token endpoint returns only ephemeral sessions, not the OpenAI key;
- CCTV/Overpass/terrain/weather/launch/radio layers load through expected fixed proxies;
- `.gev-cache` persists across process restarts;
- provider-side budgets/quotas are configured;
- logs do not record secrets.

---

## Stage 2 — production multi-user architecture

Do not scale the current Vite credential broker directly to arbitrary public users.

Refactor toward:

```text
GEV WEB CLIENT
   |
AUTH / ENTITLEMENT GATEWAY
   |
GEV API
   |-- provider proxy adapters
   |-- OAuth/token service
   |-- AIS websocket ingest
   |-- shared caches
   |-- rate limiter
   |-- audit/usage logs
   |-- user/layer entitlements
   |
PUBLIC / COMMERCIAL DATA PROVIDERS
```

### Production services to extract from `vite.config.js`

- OpenSky OAuth + state-vector proxy/cache
- CelesTrak proxy/cache
- Overpass proxy/cache
- CCTV registered-source proxy
- adsb.lol / ADS-B helpers
- AISStream websocket ingest/cache
- terrain heights proxy
- TomTom traffic proxy/budget governor
- FIRMS proxy
- regional briefing/weather
- launches
- radio directory controls
- OpenAI Realtime ephemeral-token endpoint
- HUD summary endpoint
- Google Places context endpoint

### Required production additions

- authenticated user sessions
- per-user and per-entitlement authorization
- shared/distributed rate limiting rather than process-local counters
- provider quota accounting
- durable audit logs
- abuse controls
- health checks
- metrics/alerts
- structured secret management
- cache storage appropriate to provider terms
- deployment rollback
- dependency/provider outage handling

---

## PRIM3 integration

The hosted GEV should not trust a client-side game-save flag.

Recommended flow:

```text
PRIM3 account
 -> campaign/mastery service
 -> final succession completion
 -> server writes PRIME entitlement
 -> authenticated session obtains short-lived GEV access claim
 -> GEV gateway verifies claim
 -> authorized layers load
```

Suggested claims:

```json
{
  "prime_status": "ASCENDED",
  "gev_access": true,
  "layer_tier": "prime"
}
```

The actual token must be server-signed and short-lived.

Owner/admin access should be a separate administrative entitlement so the system can be used privately before the game is complete or publicly released.

---

## Security / product principle

The unlock grants access to the application, **not ownership of shared provider credentials**.

All data remains subject to the original providers' current terms, quotas, attribution and permitted-use rules. Public-source observations should preserve provenance/freshness and should not be represented as authoritative intelligence merely because they appear in a fused interface.
