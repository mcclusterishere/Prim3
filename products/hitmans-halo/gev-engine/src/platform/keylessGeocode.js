import { mcclusterSeekFirst } from './mcclusterApi.js';

const PHOTON_ENDPOINT = 'https://photon.komoot.io/api/';
const CACHE_LIMIT = 64;
const cache = new Map();

const COARSE_TYPES = Object.freeze({
  country: 'country',
  state: 'administrative_area_level_1',
  county: 'administrative_area_level_2',
  city: 'locality',
  district: 'sublocality',
  locality: 'locality',
  street: 'route',
});

const AREA_KEYS = new Set(['natural', 'water', 'waterway', 'landuse']);

export function normalizeToponym(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function boundsFromExtent(extent) {
  if (!Array.isArray(extent) || extent.length !== 4) return null;
  const [west, north, east, south] = extent.map(Number);
  if (![west, north, east, south].every(Number.isFinite)) return null;
  if (Math.abs(north) > 90 || Math.abs(south) > 90 || Math.abs(west) > 180 || Math.abs(east) > 180) return null;
  return {
    southwest: { lat: Math.min(south, north), lng: Math.min(west, east) },
    northeast: { lat: Math.max(south, north), lng: Math.max(west, east) },
  };
}

function photonTypes(properties = {}) {
  const key = String(properties.osm_key || '');
  const value = String(properties.osm_value || '');
  if (key === 'leisure' && ['park', 'nature_reserve', 'garden'].includes(value)) return ['park'];
  if (key === 'aeroway' && value === 'aerodrome') return ['airport'];
  if (key === 'amenity' && ['university', 'college'].includes(value)) return ['university'];
  if (key === 'place' && ['suburb', 'neighbourhood', 'quarter', 'borough'].includes(value)) return ['sublocality'];
  if (key === 'highway') return ['route'];
  if (AREA_KEYS.has(key)) return ['natural_feature'];
  const coarse = COARSE_TYPES[String(properties.type || '')];
  return coarse ? [coarse] : [];
}

export function normalizePhotonFeature(feature) {
  const coordinates = feature?.geometry?.coordinates;
  const lon = Number(coordinates?.[0]);
  const lat = Number(coordinates?.[1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  const properties = feature?.properties || {};
  const name = String(properties.name || '').trim();
  const labelParts = [name, properties.district, properties.city, properties.state, properties.country]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter((part, index, list) => list.indexOf(part) === index);
  return {
    lat,
    lng: lon,
    name,
    label: labelParts.join(', ') || name,
    types: photonTypes(properties),
    viewport: boundsFromExtent(properties.extent),
    provider: 'photon',
  };
}

function biasCenter(bias) {
  const corners = String(bias || '').split('|');
  if (corners.length !== 2) return null;
  const a = corners[0].split(',').map(Number);
  const b = corners[1].split(',').map(Number);
  if (a.length !== 2 || b.length !== 2 || [...a, ...b].some((value) => !Number.isFinite(value))) return null;
  return { lat: (a[0] + b[0]) / 2, lon: (a[1] + b[1]) / 2 };
}

function selectCandidate(features, query) {
  const target = normalizeToponym(String(query || '').split(',')[0]);
  const rows = Array.isArray(features) ? features : [];
  const exact = rows.find((feature) => normalizeToponym(feature?.properties?.name) === target);
  if (exact) return exact;
  const leading = rows.find((feature) => normalizeToponym(feature?.properties?.name).startsWith(`${target} `));
  if (leading) return leading;
  return null;
}

function trimCache() {
  while (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value);
}

async function photonPass(query, { bias = null, fetchImpl = globalThis.fetch } = {}) {
  const url = new URL(PHOTON_ENDPOINT);
  url.searchParams.set('q', query);
  url.searchParams.set('limit', '5');
  const center = biasCenter(bias);
  if (center) {
    url.searchParams.set('lat', String(center.lat));
    url.searchParams.set('lon', String(center.lon));
  }
  try {
    const response = await fetchImpl(url, { signal: AbortSignal.timeout(6000) });
    if (!response.ok) return { answered: false, features: [] };
    const payload = await response.json();
    return { answered: true, features: Array.isArray(payload?.features) ? payload.features : [] };
  } catch {
    return { answered: false, features: [] };
  }
}

export async function photonGeocode(query, { bias = null, fetchImpl = globalThis.fetch } = {}) {
  const text = String(query || '').trim();
  if (!text) return { answered: true, place: null, provider: 'photon' };
  const key = `${bias || ''}\n${text}`;
  if (cache.has(key)) return cache.get(key);

  const biased = await photonPass(text, { bias, fetchImpl });
  if (!biased.answered) return { answered: false, place: null, provider: 'photon' };

  let feature = selectCandidate(biased.features, text);
  let answered = true;
  if (!feature && bias) {
    const unbiased = await photonPass(text, { fetchImpl });
    answered = unbiased.answered;
    if (!answered) return { answered: false, place: null, provider: 'photon' };
    feature = selectCandidate(unbiased.features, text) || unbiased.features[0] || null;
  } else if (!feature) {
    feature = biased.features[0] || null;
  }

  const outcome = { answered, place: normalizePhotonFeature(feature), provider: 'photon' };
  cache.set(key, outcome);
  trimCache();
  return outcome;
}

function normalizeWorkerGeocode(payload) {
  const records = Array.isArray(payload?.records) ? payload.records : [];
  const row = records[0];
  const p = row?.point;
  if (!row || !Number.isFinite(Number(p?.lat)) || !Number.isFinite(Number(p?.lon))) return null;
  const raw = row.properties || {};
  return {
    lat: Number(p.lat),
    lng: Number(p.lon),
    name: raw.name || row.name || raw.formatted_address || '',
    label: raw.formatted_address || row.name || raw.name || '',
    types: Array.isArray(raw.types) ? raw.types : [],
    viewport: raw.geometry?.bounds || raw.geometry?.viewport || null,
    provider: 'google_maps',
  };
}

export async function geocodeWithHaloFallback(query, {
  bias = null,
  client = mcclusterSeekFirst,
  fetchImpl = globalThis.fetch,
} = {}) {
  try {
    const workerResult = await client.fetchSource('google_maps', { address: String(query || '').trim() });
    const place = normalizeWorkerGeocode(workerResult);
    if (place) return { answered: true, place, provider: 'google_maps', fallback: false };
  } catch (error) {
    if (['authentication', 'entitlement'].includes(error?.category)) throw error;
  }

  const fallback = await photonGeocode(query, { bias, fetchImpl });
  return { ...fallback, fallback: true };
}

export function clearHaloGeocodeCache() {
  cache.clear();
}
