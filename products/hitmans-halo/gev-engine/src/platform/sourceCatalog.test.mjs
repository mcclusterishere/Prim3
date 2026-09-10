import test from 'node:test';
import assert from 'node:assert/strict';
import { SOURCE_GROUPS, buildSourceCatalog, classifySource } from './sourceCatalog.js';

test('classifies infrastructure ahead of generic economy words', () => {
  assert.equal(classifySource({ key: 'eia', capabilities: ['electricity', 'grid-flows', 'prices'] }), SOURCE_GROUPS.INFRASTRUCTURE);
});

test('classifies aircraft and maritime sources', () => {
  assert.equal(classifySource({ key: 'adsb_lol', capabilities: ['aircraft'] }), SOURCE_GROUPS.AIR);
  assert.equal(classifySource({ key: 'aisstream', capabilities: ['vessels', 'ais'] }), SOURCE_GROUPS.SEA);
});

test('catalog preserves every source exactly once', () => {
  const catalog = buildSourceCatalog([
    { key: 'usgs', name: 'USGS', capabilities: ['earthquake'] },
    { key: 'fred', name: 'FRED', capabilities: ['finance'] },
    { key: 'nvd', name: 'NVD', capabilities: ['cve', 'vulnerability'] },
  ]);
  assert.equal(catalog.sources.length, 3);
  assert.equal(catalog.groups.EARTH.length, 1);
  assert.equal(catalog.groups.ECONOMY.length, 1);
  assert.equal(catalog.groups.SECURITY.length, 1);
});
