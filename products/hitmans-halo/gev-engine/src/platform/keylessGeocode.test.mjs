import test from 'node:test';
import assert from 'node:assert/strict';
import { clearHaloGeocodeCache, geocodeWithHaloFallback, normalizePhotonFeature, normalizeToponym, photonGeocode } from './keylessGeocode.js';

test('normalizes accented toponyms', () => {
  assert.equal(normalizeToponym('Huế, Việt Nam'), 'hue viet nam');
});

test('normalizes Photon extent order and area type', () => {
  const place = normalizePhotonFeature({
    geometry: { coordinates: [105.85, 21.03] },
    properties: { name: 'Lake', osm_key: 'water', osm_value: 'lake', extent: [105.8, 21.1, 105.9, 21.0] },
  });
  assert.deepEqual(place.viewport, {
    southwest: { lat: 21, lng: 105.8 },
    northeast: { lat: 21.1, lng: 105.9 },
  });
  assert.deepEqual(place.types, ['natural_feature']);
});

test('does not cache an unanswered Photon outage', async () => {
  clearHaloGeocodeCache();
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    if (calls === 1) throw new Error('offline');
    return { ok: true, json: async () => ({ features: [{ geometry: { coordinates: [2.2945, 48.8584] }, properties: { name: 'Eiffel Tower' } }] }) };
  };
  assert.equal((await photonGeocode('Eiffel Tower', { fetchImpl })).answered, false);
  assert.equal((await photonGeocode('Eiffel Tower', { fetchImpl })).place.name, 'Eiffel Tower');
  assert.equal(calls, 2);
});

test('uses public fallback when canonical Google source is not configured', async () => {
  clearHaloGeocodeCache();
  const client = { fetchSource: async () => { const error = new Error('missing'); error.category = 'provider_not_configured'; throw error; } };
  const fetchImpl = async () => ({ ok: true, json: async () => ({ features: [{ geometry: { coordinates: [-97.7431, 30.2672] }, properties: { name: 'Austin', type: 'city' } }] }) });
  const result = await geocodeWithHaloFallback('Austin', { client, fetchImpl });
  assert.equal(result.provider, 'photon');
  assert.equal(result.place.types[0], 'locality');
});

test('does not bypass authentication/entitlement denial with public fallback', async () => {
  const denied = new Error('no entitlement');
  denied.category = 'entitlement';
  const client = { fetchSource: async () => { throw denied; } };
  await assert.rejects(() => geocodeWithHaloFallback('Austin', { client, fetchImpl: async () => { throw new Error('must not run'); } }), denied);
});
