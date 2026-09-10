import test from 'node:test';
import assert from 'node:assert/strict';
import { KnowledgeGraph } from './knowledgeGraph.js';
import { buildTimeline } from './timelineModel.js';
import { chooseFallback } from '../platform/fallbackPolicy.js';
import { SOURCE_HEALTH, createSourceHealthTracker } from '../platform/sourceHealth.js';

test('dependency graph walks outward dependencies', () => {
  const graph = new KnowledgeGraph();
  graph.upsertNode({ id: 'service' });
  graph.upsertNode({ id: 'switch' });
  graph.upsertNode({ id: 'power' });
  graph.upsertEdge({ source: 'service', target: 'switch', type: 'depends_on' });
  graph.upsertEdge({ source: 'switch', target: 'power', type: 'depends_on' });
  assert.deepEqual(graph.dependencyClosure('service').map((x) => x.id), ['switch', 'power']);
});

test('timeline sorts newest first', () => {
  const rows = buildTimeline([
    { id: 'old', observed_at: '2026-01-01T00:00:00Z' },
    { id: 'new', observed_at: '2026-02-01T00:00:00Z' },
  ]);
  assert.deepEqual(rows.map((x) => x.id), ['new', 'old']);
});

test('fallback chooses first available provider', () => {
  assert.equal(chooseFallback('aircraft', { opensky_research: false, adsb_lol: true }), 'adsb_lol');
});

test('source circuit breaker opens after repeated retryable failures', () => {
  let now = 1_000;
  const health = createSourceHealthTracker({ failureThreshold: 2, cooldownMs: 100, now: () => now });
  health.failure('provider');
  assert.equal(health.snapshot('provider').status, SOURCE_HEALTH.DEGRADED);
  health.failure('provider');
  assert.equal(health.snapshot('provider').status, SOURCE_HEALTH.OPEN);
  assert.equal(health.canRequest('provider'), false);
  now += 101;
  assert.equal(health.canRequest('provider'), true);
});
