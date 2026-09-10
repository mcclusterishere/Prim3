import test from 'node:test';
import assert from 'node:assert/strict';
import { INTEL_STATE, deriveIntelState, freshnessState } from './evidenceState.js';

test('contradiction outranks verification', () => {
  assert.equal(deriveIntelState({ verified: true, contradicted: true }), INTEL_STATE.CONTRADICTED);
});

test('two corroborating observations elevate state', () => {
  assert.equal(deriveIntelState({ observed: true, corroborationCount: 2 }), INTEL_STATE.CORROBORATED);
});

test('freshness distinguishes fresh aging and stale', () => {
  const now = Date.parse('2026-09-10T05:00:00Z');
  assert.equal(freshnessState('2026-09-10T04:59:30Z', { now, freshForMs: 60_000, staleAfterMs: 300_000 }), 'FRESH');
  assert.equal(freshnessState('2026-09-10T04:57:00Z', { now, freshForMs: 60_000, staleAfterMs: 300_000 }), 'AGING');
  assert.equal(freshnessState('2026-09-10T04:50:00Z', { now, freshForMs: 60_000, staleAfterMs: 300_000 }), 'STALE');
});
