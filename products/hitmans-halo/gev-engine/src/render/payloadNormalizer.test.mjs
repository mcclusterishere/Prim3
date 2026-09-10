import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePointRows } from './payloadNormalizer.js';

test('normalizes supported coordinate shapes and drops invalid rows', () => {
  const rows = normalizePointRows([
    { id: 'a', lat: 41, lon: -73 },
    { external_id: 'b', point: { lat: 42, lng: -72 } },
    { id: 'bad', lat: 999, lon: 1 },
  ]);
  assert.deepEqual(rows.map((row) => row.id), ['a', 'b']);
});

test('caps payload output', () => {
  const input = Array.from({ length: 10 }, (_, i) => ({ id: i, lat: 0, lon: i }));
  assert.equal(normalizePointRows(input, { maxRows: 3 }).length, 3);
});
