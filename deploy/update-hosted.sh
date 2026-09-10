#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/seek-first}"
APP_USER="${APP_USER:-gev}"
BRANCH="${BRANCH:-main}"

if [[ ${EUID} -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/update-hosted.sh" >&2
  exit 1
fi

if [[ ! -d "${APP_DIR}/.git" ]]; then
  echo "No checkout found at ${APP_DIR}. Run deploy/bootstrap-ubuntu.sh first." >&2
  exit 1
fi

git -C "${APP_DIR}" fetch origin "${BRANCH}"
git -C "${APP_DIR}" checkout "${BRANCH}"
git -C "${APP_DIR}" pull --ff-only origin "${BRANCH}"
chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"

sudo -u "${APP_USER}" env PATH="/usr/local/bin:/usr/bin:/bin" bash -lc \
  "cd '${APP_DIR}' && npm ci && npm test && npm run build"

systemctl restart seek-first
sleep 2
curl -fsS -o /dev/null http://127.0.0.1:4173/

echo "Hosted GEV updated to $(git -C "${APP_DIR}" rev-parse --short HEAD) and passed loopback health check."
