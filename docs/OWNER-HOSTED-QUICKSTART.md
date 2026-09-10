# Owner-hosted GEV quickstart

This is the shortest path from a fresh Ubuntu VM to a private, authenticated God's Eye View instance.

## Target topology

```text
YOU
 -> Cloudflare Access login
 -> prime.mcluster.org (recommended hostname)
 -> Cloudflare Tunnel
 -> 127.0.0.1:4173 on the VM
 -> Seek First / GEV preview runtime
 -> public + configured provider APIs
```

Port 4173 must remain closed to the public internet.

## 1. Create the VM

Recommended starting size: 4 GiB RAM / 2 vCPU / about 80 GiB SSD.

Ubuntu LTS is the expected host OS for the included bootstrap script.

## 2. Clone and bootstrap

SSH into the VM and run:

```bash
git clone https://github.com/mcclusterishere/Seek-First.git
cd Seek-First
sudo bash deploy/bootstrap-ubuntu.sh
```

The script:
- installs required base packages;
- installs Node 24.14.0 unless overridden;
- creates the non-login `gev` service account;
- installs the canonical checkout at `/opt/seek-first`;
- creates `/etc/seek-first/gev.env` from the safe template if it does not already exist;
- runs `npm ci` and `npm run build`;
- installs/enables the hardened `seek-first.service` systemd unit;
- verifies that GEV answers only on `127.0.0.1:4173`.

## 3. Add provider keys

Edit:

```bash
sudo nano /etc/seek-first/gev.env
```

For immediate keyless operation, leave optional providers blank.

For the fuller owner experience, prioritize:

1. `GOOGLE_MAPS_API_KEY` — direct photorealistic 3D + place context; browser-visible by design, so restrict it to the final hostname and only the required Google APIs.
2. `OPENAI_API_KEY` — voice/HUD; server-only.
3. `OPENSKY_CLIENT_ID` + `OPENSKY_CLIENT_SECRET` — higher authenticated aviation credit allowance; server-only. Set `OPENSKY_AUTH_MODE=oauth` after adding them.
4. `AISSTREAM_API_KEY` — live vessel WebSocket; server-only.
5. `FIRMS_MAP_KEY` — active fires; server-only.
6. `TOMTOM_API_KEY` — live traffic; server-only.
7. `LL2_API_TOKEN` — optional higher launch-data allowance.
8. `CESIUM_ION_TOKEN` — optional; not required for the initial direct-Google/fallback owner deployment.

Then:

```bash
sudo systemctl restart seek-first
sudo systemctl status seek-first --no-pager
```

## 4. Create the Cloudflare Tunnel

Cloudflare currently recommends remotely managed tunnels for most deployments.

In Cloudflare Dashboard:

1. Networking -> Tunnels.
2. Create a tunnel named `seek-first-owner`.
3. Select Linux and run the generated `cloudflared` install/service command on the GEV VM.
4. Add a Published application route:
   - hostname: `prime.mcluster.org` (recommended)
   - service: `http://127.0.0.1:4173`
5. If origin Host validation becomes an issue, use the repository's `deploy/cloudflared-config.example.yml` pattern so the origin receives `Host: localhost` rather than weakening Vite's host checks.

Do not open TCP/4173 in the cloud firewall.

## 5. Protect it with Cloudflare Access

Before treating the hostname as usable, create a Cloudflare Access self-hosted application for the GEV hostname and allow only the owner's identity.

For owner V1, Cloudflare Access is the login gate. The game-completion Prime entitlement is intentionally separate and comes later for player accounts.

Acceptance test:

```text
not authenticated -> GEV denied
owner authenticated -> GEV loads
browser -> never receives OpenAI/OpenSky/AISStream private credentials
VM public network -> port 4173 closed
```

## 6. Budget controls

At provider level:

- OpenAI: start with a low monthly project/organization usage limit and increase only after measuring real use.
- Google Cloud: create a billing budget, restrict the browser API key by hostname/API, and cap relevant APIs where available.
- Keep `GEV_RATELIMIT_OPENAI_PER_MIN` and `GEV_RATELIMIT_GOOGLE_PER_MIN` enabled as application-side guards.
- Keep `TOMTOM_DAILY_TILE_BUDGET` below the provider allowance until real usage is observed.

Application-side limits are not hard billing caps; provider-side controls are.

## 7. Update later

On the VM:

```bash
sudo bash /opt/seek-first/deploy/update-hosted.sh
```

That updater:
- fast-forwards `main`;
- installs exact dependencies;
- runs the test suite;
- builds;
- restarts GEV;
- requires a successful loopback health check.

A manual GitHub Actions workflow is also included at `.github/workflows/deploy-hosted.yml`. It expects repository secrets:

- `GEV_HOST`
- `GEV_SSH_USER`
- `GEV_SSH_KEY`
- `GEV_KNOWN_HOSTS`

The SSH user should have narrowly scoped passwordless sudo permission only for the hosted update command rather than unrestricted root access.

## 8. Owner access vs player Prime access

Owner/admin access exists immediately for development and real-world use.

Future player flow remains:

```text
PRIM3 completion
 -> server records ASCENDED status
 -> entitlement service grants GEV access
 -> authenticated GEV gateway accepts the player
```

The owner account is not required to complete the campaign. It receives an administrative entitlement independently of gameplay.
