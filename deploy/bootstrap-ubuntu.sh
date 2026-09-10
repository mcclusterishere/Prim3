#!/usr/bin/env bash
set -euo pipefail

# One-time bootstrap for a fresh Ubuntu VM.
# Usage:
#   sudo bash deploy/bootstrap-ubuntu.sh
# Optional overrides:
#   NODE_VERSION=24.14.0 APP_DIR=/opt/seek-first APP_USER=gev sudo -E bash deploy/bootstrap-ubuntu.sh

NODE_VERSION="${NODE_VERSION:-24.14.0}"
APP_DIR="${APP_DIR:-/opt/seek-first}"
APP_USER="${APP_USER:-gev}"
REPO_URL="${REPO_URL:-https://github.com/mcclusterishere/Seek-First.git}"
ENV_DIR="/etc/seek-first"
ENV_FILE="${ENV_DIR}/gev.env"
SERVICE_FILE="/etc/systemd/system/seek-first.service"

if [[ ${EUID} -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/bootstrap-ubuntu.sh" >&2
  exit 1
fi

apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl git xz-utils

case "$(dpkg --print-architecture)" in
  amd64) NODE_ARCH="x64" ;;
  arm64) NODE_ARCH="arm64" ;;
  *) echo "Unsupported architecture: $(dpkg --print-architecture)" >&2; exit 1 ;;
esac

NODE_BASE="/usr/local/lib/nodejs/node-v${NODE_VERSION}-linux-${NODE_ARCH}"
if [[ ! -x "${NODE_BASE}/bin/node" ]]; then
  tmp="$(mktemp -d)"
  trap 'rm -rf "${tmp:-}"' EXIT
  curl -fsSLo "${tmp}/node.tar.xz" "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz"
  mkdir -p /usr/local/lib/nodejs
  tar -xJf "${tmp}/node.tar.xz" -C /usr/local/lib/nodejs
fi
ln -sfn "${NODE_BASE}/bin/node" /usr/local/bin/node
ln -sfn "${NODE_BASE}/bin/npm" /usr/local/bin/npm
ln -sfn "${NODE_BASE}/bin/npx" /usr/local/bin/npx
ln -sfn "${NODE_BASE}/bin/corepack" /usr/local/bin/corepack || true

if ! id -u "${APP_USER}" >/dev/null 2>&1; then
  useradd --system --create-home --home-dir "/home/${APP_USER}" --shell /usr/sbin/nologin "${APP_USER}"
fi

if [[ ! -d "${APP_DIR}/.git" ]]; then
  mkdir -p "$(dirname "${APP_DIR}")"
  git clone "${REPO_URL}" "${APP_DIR}"
else
  git -C "${APP_DIR}" fetch origin main
  git -C "${APP_DIR}" checkout main
  git -C "${APP_DIR}" pull --ff-only origin main
fi

chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"
mkdir -p "${APP_DIR}/.gev-cache" "${ENV_DIR}"
chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}/.gev-cache"

if [[ ! -f "${ENV_FILE}" ]]; then
  cp "${APP_DIR}/deploy/gev.env.example" "${ENV_FILE}"
  chmod 600 "${ENV_FILE}"
  echo "Created ${ENV_FILE}. Add provider keys there before enabling paid layers."
else
  echo "Keeping existing ${ENV_FILE}; no secrets were overwritten."
fi

sudo -u "${APP_USER}" env PATH="/usr/local/bin:/usr/bin:/bin" bash -lc "cd '${APP_DIR}' && npm ci && npm run build"

cp "${APP_DIR}/deploy/seek-first.service" "${SERVICE_FILE}"
systemctl daemon-reload
systemctl enable seek-first
systemctl restart seek-first

sleep 2
if curl -fsS -o /dev/null http://127.0.0.1:4173/; then
  echo
  echo "GEV is running locally on the VM at http://127.0.0.1:4173"
  echo "It is NOT exposed publicly. Good."
else
  echo
  echo "GEV did not answer on loopback. Inspect: journalctl -u seek-first -n 100 --no-pager" >&2
  exit 1
fi

echo
echo "NEXT:"
echo "  1. Edit ${ENV_FILE} and add the provider credentials you want."
echo "  2. systemctl restart seek-first"
echo "  3. Install cloudflared and create a Cloudflare Tunnel to 127.0.0.1:4173."
echo "  4. Protect the hostname with Cloudflare Access before allowing remote use."
echo "  5. Keep TCP/4173 closed in the VM firewall/security group."
