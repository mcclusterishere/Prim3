import assert from 'node:assert/strict';
import test from 'node:test';

import {
  McClusterApiError,
  classifyApiFailure,
  createMcClusterSeekFirstClient,
  normalizeApiBase,
} from './mcclusterApi.js';

test('normalizeApiBase accepts canonical HTTPS and strips trailing slash', () => {
  assert.equal(
    normalizeApiBase('https://api.mccluster.org/v1/seek-first/'),
    'https://api.mccluster.org/v1/seek-first',
  );
});

test('normalizeApiBase rejects remote plaintext HTTP', () => {
  assert.throws(
    () => normalizeApiBase('http://example.com/v1/seek-first'),
    (error) => error instanceof McClusterApiError && error.code === 'unsafe_api_base',
  );
});

test('failure classification keeps auth, entitlement, rate, provider and schema failures distinct', () => {
  assert.equal(classifyApiFailure(401, {}).category, 'authentication');
  assert.equal(classifyApiFailure(403, {}).category, 'entitlement');
  assert.equal(classifyApiFailure(429, {}).category, 'rate_limit');
  assert.equal(classifyApiFailure(503, { code: 'spatial_schema_not_ready' }).category, 'storage_not_ready');
  assert.equal(classifyApiFailure(503, { code: 'credential_missing' }).category, 'provider_not_configured');
});

test('client sends bearer session and canonical source fetch route', async () => {
  let captured;
  const client = createMcClusterSeekFirstClient({
    getAccessToken: () => 'owner-session-token',
    fetchImpl: async (url, init) => {
      captured = { url: String(url), init };
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    },
  });

  const result = await client.fetchSource('usgs', { lat: 41.3, lon: -72.9 });
  assert.deepEqual(result, { ok: true });
  assert.equal(captured.url, 'https://api.mccluster.org/v1/seek-first/fetch/usgs');
  assert.equal(captured.init.method, 'POST');
  assert.equal(captured.init.headers.authorization, 'Bearer owner-session-token');
  assert.deepEqual(JSON.parse(captured.init.body), { lat: 41.3, lon: -72.9 });
});

test('client exposes storage-not-ready as a structured error instead of generic network failure', async () => {
  const client = createMcClusterSeekFirstClient({
    getAccessToken: () => 'owner-session-token',
    fetchImpl: async () => new Response(JSON.stringify({
      code: 'spatial_schema_not_ready',
      message: 'Spatial migrations have not been applied',
    }), { status: 503, headers: { 'content-type': 'application/json' } }),
  });

  await assert.rejects(
    () => client.timeline({ lat: 41.3, lon: -72.9 }),
    (error) => error instanceof McClusterApiError
      && error.category === 'storage_not_ready'
      && error.code === 'spatial_schema_not_ready',
  );
});
