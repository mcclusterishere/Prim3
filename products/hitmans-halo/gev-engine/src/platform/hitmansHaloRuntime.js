import { createMcClusterSeekFirstClient } from './mcclusterApi.js';
import { buildSourceCatalog } from './sourceCatalog.js';

export const HITMANS_HALO_RUNTIME_EVENT = 'hitmans-halo:runtime';

function settledValue(result, fallback = null) {
  return result?.status === 'fulfilled' ? result.value : fallback;
}

function settledError(result) {
  if (result?.status !== 'rejected') return null;
  const error = result.reason;
  return {
    name: error?.name || 'Error',
    message: error?.message || String(error),
    code: error?.code || null,
    category: error?.category || null,
    status: error?.status || 0,
    retryable: Boolean(error?.retryable),
  };
}

export async function bootHitmansHaloRuntime({
  client = createMcClusterSeekFirstClient(),
  lane = 'INTERNAL',
  dispatch = true,
} = {}) {
  const [health, readiness, sources, entitlements, viewerConfig, capabilities] = await Promise.allSettled([
    client.health(),
    client.readiness(),
    client.sources(lane),
    client.entitlements(lane),
    client.viewerConfig(),
    client.capabilities(),
  ]);

  const rawSources = settledValue(sources, []);
  const sourceRows = Array.isArray(rawSources)
    ? rawSources
    : (rawSources?.sources || rawSources?.data || []);

  const snapshot = Object.freeze({
    product: 'HITMANS_HALO',
    backend: client.apiBase,
    lane,
    generated_at: new Date().toISOString(),
    health: settledValue(health),
    readiness: settledValue(readiness),
    source_catalog: buildSourceCatalog(sourceRows),
    entitlements: settledValue(entitlements),
    viewer_config: settledValue(viewerConfig),
    capabilities: settledValue(capabilities),
    errors: Object.freeze([
      settledError(health),
      settledError(readiness),
      settledError(sources),
      settledError(entitlements),
      settledError(viewerConfig),
      settledError(capabilities),
    ].filter(Boolean)),
  });

  if (dispatch && typeof globalThis?.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
    globalThis.dispatchEvent(new CustomEvent(HITMANS_HALO_RUNTIME_EVENT, { detail: snapshot }));
  }
  return snapshot;
}
