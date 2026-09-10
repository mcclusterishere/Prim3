import test from 'node:test';
import assert from 'node:assert/strict';
import { SpatialGrid, normalizeLon } from './spatialGrid.js';

test('normalizes longitudes', () => {
  assert.equal(normalizeLon(190), -170);
  assert.equal(normalizeLon(-190), 170);
});

test('queries ordinary bounds', () => {
  const grid = new SpatialGrid({ cellDegrees: 5 });
  grid.insert('a', 41, -73, { name: 'a' });
  grid.insert('b', 10, 10, { name: 'b' });
  assert.deepEqual(grid.queryBounds({ south: 40, west: -75, north: 42, east: -70 }).map((x) => x.id), ['a']);
});

test('queries bounds across the antimeridian', () => {
  const grid = new SpatialGrid({ cellDegrees: 5 });
  grid.insert('east', 0, 179, {});
  grid.insert('west', 0, -179, {});
  grid.insert('middle', 0, 0, {});
  const ids = new Set(grid.queryBounds({ south: -5, west: 170, north: 5, east: -170 }).map((x) => x.id));
  assert.deepEqual(ids, new Set(['east', 'west']));
});
