export const SOURCE_HEALTH = Object.freeze({
  UNKNOWN: 'UNKNOWN',
  HEALTHY: 'HEALTHY',
  DEGRADED: 'DEGRADED',
  OPEN: 'OPEN',
  DISABLED: 'DISABLED',
});

export function createSourceHealthTracker({
  failureThreshold = 3,
  cooldownMs = 30_000,
  now = () => Date.now(),
} = {}) {
  const state = new Map();

  function row(key) {
    if (!state.has(key)) {
      state.set(key, {
        status: SOURCE_HEALTH.UNKNOWN,
        failures: 0,
        last_success_at: null,
        last_failure_at: null,
        open_until: 0,
        disabled: false,
      });
    }
    return state.get(key);
  }

  function canRequest(key) {
    const item = row(key);
    if (item.disabled) return false;
    if (item.status !== SOURCE_HEALTH.OPEN) return true;
    if (now() >= item.open_until) {
      item.status = SOURCE_HEALTH.DEGRADED;
      return true;
    }
    return false;
  }

  function success(key) {
    const item = row(key);
    item.failures = 0;
    item.status = item.disabled ? SOURCE_HEALTH.DISABLED : SOURCE_HEALTH.HEALTHY;
    item.last_success_at = new Date(now()).toISOString();
    item.open_until = 0;
    return snapshot(key);
  }

  function failure(key, { retryable = true } = {}) {
    const item = row(key);
    item.failures += 1;
    item.last_failure_at = new Date(now()).toISOString();
    if (!retryable) {
      item.status = SOURCE_HEALTH.DEGRADED;
    } else if (item.failures >= failureThreshold) {
      item.status = SOURCE_HEALTH.OPEN;
      item.open_until = now() + cooldownMs;
    } else {
      item.status = SOURCE_HEALTH.DEGRADED;
    }
    return snapshot(key);
  }

  function disable(key) {
    const item = row(key);
    item.disabled = true;
    item.status = SOURCE_HEALTH.DISABLED;
    return snapshot(key);
  }

  function enable(key) {
    const item = row(key);
    item.disabled = false;
    item.status = SOURCE_HEALTH.UNKNOWN;
    item.failures = 0;
    item.open_until = 0;
    return snapshot(key);
  }

  function snapshot(key) {
    const item = row(key);
    return Object.freeze({ key, ...item });
  }

  function all() {
    return Object.freeze([...state.keys()].sort().map(snapshot));
  }

  return Object.freeze({ canRequest, success, failure, disable, enable, snapshot, all });
}
