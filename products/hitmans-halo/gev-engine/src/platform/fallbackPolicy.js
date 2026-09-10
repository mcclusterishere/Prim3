export const FALLBACK_CHAINS = Object.freeze({
  basemap: Object.freeze(['google_maps', 'cesium_ion', 'esri_world_imagery', 'openstreetmap']),
  geocode: Object.freeze(['google_maps', 'photon', 'nominatim']),
  aircraft: Object.freeze(['opensky_research', 'adsb_lol']),
  fires: Object.freeze(['nasa_firms', 'nasa_eonet']),
  earth_observation: Object.freeze(['planet_research', 'copernicus', 'landsat']),
  routing: Object.freeze(['tomtom', 'osrm']),
  ai: Object.freeze(['mccluster_ai', 'local_model', 'manual']),
});

export function chooseFallback(chainName, availability = {}) {
  const chain = FALLBACK_CHAINS[chainName];
  if (!chain) throw new Error(`Unknown fallback chain: ${chainName}`);
  for (const source of chain) {
    const state = availability[source];
    if (state === true || state?.available === true) return source;
  }
  return null;
}

export function fallbackPlan(chainName, availability = {}) {
  const chain = FALLBACK_CHAINS[chainName];
  if (!chain) throw new Error(`Unknown fallback chain: ${chainName}`);
  return chain.map((source, index) => ({
    source,
    priority: index,
    available: availability[source] === true || availability[source]?.available === true,
    reason: availability[source]?.reason || null,
  }));
}
