function clampLat(value) {
  return Math.max(-90, Math.min(90, Number(value)));
}

export function normalizeLon(value) {
  let lon = Number(value);
  if (!Number.isFinite(lon)) return NaN;
  lon = ((lon + 180) % 360 + 360) % 360 - 180;
  return lon === -180 ? 180 : lon;
}

export class SpatialGrid {
  constructor({ cellDegrees = 1 } = {}) {
    const size = Number(cellDegrees);
    if (!Number.isFinite(size) || size <= 0 || size > 180) {
      throw new TypeError('cellDegrees must be a finite value in (0, 180]');
    }
    this.cellDegrees = size;
    this.cells = new Map();
    this.items = new Map();
  }

  #cellKey(lat, lon) {
    const y = Math.floor((clampLat(lat) + 90) / this.cellDegrees);
    const x = Math.floor((normalizeLon(lon) + 180) / this.cellDegrees);
    return `${x}:${y}`;
  }

  insert(id, lat, lon, value) {
    if (id === undefined || id === null) throw new TypeError('id is required');
    const y = clampLat(lat);
    const x = normalizeLon(lon);
    if (!Number.isFinite(y) || !Number.isFinite(x)) throw new TypeError('lat/lon must be finite');
    this.remove(id);
    const key = this.#cellKey(y, x);
    const entry = Object.freeze({ id, lat: y, lon: x, value });
    if (!this.cells.has(key)) this.cells.set(key, new Map());
    this.cells.get(key).set(id, entry);
    this.items.set(id, { key, entry });
    return entry;
  }

  remove(id) {
    const indexed = this.items.get(id);
    if (!indexed) return false;
    const cell = this.cells.get(indexed.key);
    cell?.delete(id);
    if (cell?.size === 0) this.cells.delete(indexed.key);
    this.items.delete(id);
    return true;
  }

  clear() {
    this.cells.clear();
    this.items.clear();
  }

  queryBounds({ south, west, north, east }) {
    const loLat = clampLat(Math.min(Number(south), Number(north)));
    const hiLat = clampLat(Math.max(Number(south), Number(north)));
    const loLon = normalizeLon(west);
    const hiLon = normalizeLon(east);
    if (![loLat, hiLat, loLon, hiLon].every(Number.isFinite)) return [];

    const crossesAntimeridian = loLon > hiLon;
    const withinLon = (lon) => crossesAntimeridian
      ? lon >= loLon || lon <= hiLon
      : lon >= loLon && lon <= hiLon;

    const results = [];
    for (const { entry } of this.items.values()) {
      if (entry.lat < loLat || entry.lat > hiLat) continue;
      if (!withinLon(entry.lon)) continue;
      results.push(entry);
    }
    return results;
  }

  get size() {
    return this.items.size;
  }
}
