export const INTEL_STATE = Object.freeze({
  UNKNOWN: 'UNKNOWN',
  OBSERVED: 'OBSERVED',
  INFERRED: 'INFERRED',
  CORROBORATED: 'CORROBORATED',
  VERIFIED: 'VERIFIED',
  STALE: 'STALE',
  CONTRADICTED: 'CONTRADICTED',
});

const BASE_RANK = Object.freeze({
  [INTEL_STATE.UNKNOWN]: 0,
  [INTEL_STATE.INFERRED]: 1,
  [INTEL_STATE.OBSERVED]: 2,
  [INTEL_STATE.CORROBORATED]: 3,
  [INTEL_STATE.VERIFIED]: 4,
  [INTEL_STATE.STALE]: -1,
  [INTEL_STATE.CONTRADICTED]: -2,
});

export function freshnessState(observedAt, {
  now = Date.now(),
  freshForMs = 60_000,
  staleAfterMs = 5 * 60_000,
} = {}) {
  if (!observedAt) return 'UNKNOWN';
  const timestamp = new Date(observedAt).getTime();
  if (!Number.isFinite(timestamp)) return 'UNKNOWN';
  const age = Math.max(0, now - timestamp);
  if (age <= freshForMs) return 'FRESH';
  if (age <= staleAfterMs) return 'AGING';
  return 'STALE';
}

export function deriveIntelState({
  observed = false,
  inferred = false,
  corroborationCount = 0,
  verified = false,
  contradicted = false,
  stale = false,
} = {}) {
  if (contradicted) return INTEL_STATE.CONTRADICTED;
  if (stale) return INTEL_STATE.STALE;
  if (verified) return INTEL_STATE.VERIFIED;
  if (Number(corroborationCount) >= 2) return INTEL_STATE.CORROBORATED;
  if (observed) return INTEL_STATE.OBSERVED;
  if (inferred) return INTEL_STATE.INFERRED;
  return INTEL_STATE.UNKNOWN;
}

export function compareIntelState(a, b) {
  return (BASE_RANK[a] ?? 0) - (BASE_RANK[b] ?? 0);
}

export function evidenceEnvelope({
  state,
  sourceKey = null,
  sourceUrl = null,
  observedAt = null,
  confidence = null,
  provenance = null,
  contradictions = [],
} = {}) {
  const normalizedConfidence = confidence == null
    ? null
    : Math.max(0, Math.min(1, Number(confidence)));
  return Object.freeze({
    state: state || INTEL_STATE.UNKNOWN,
    source_key: sourceKey,
    source_url: sourceUrl,
    observed_at: observedAt,
    freshness: freshnessState(observedAt),
    confidence: Number.isFinite(normalizedConfidence) ? normalizedConfidence : null,
    provenance: provenance || {},
    contradictions: Object.freeze([...(contradictions || [])]),
  });
}
