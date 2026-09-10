from pathlib import Path

p = Path('products/hitmans-halo/gev-engine/src/locations.js')
s = p.read_text()

old_import = "import { viewportBias, placesNearViewRecovery } from './annotations/annotationResolver.js';"
new_import = old_import + "\nimport { geocodeWithHaloFallback } from './platform/keylessGeocode.js';"
if "./platform/keylessGeocode.js" not in s:
    if old_import not in s:
        raise SystemExit('annotation resolver import not found')
    s = s.replace(old_import, new_import, 1)

old_lines = [
    "  const apiKey = window.__GOOGLE_MAPS_API_KEY__ || import.meta.env.GOOGLE_MAPS_API_KEY;",
    "  if (!apiKey) throw new Error('No Google Maps API key available for geocoding');",
    "",
    "  const beforeFly = typeof options.beforeFly === 'function' ? options.beforeFly : null;",
    "  const mayFly = () => beforeFly === null || beforeFly() !== false;",
    "",
    "  // Viewport-biased geocode — the same bias annotationResolver's geocodePlace uses:",
    "  // \"Sixth Street\" spoken over Austin must prefer the Sixth Street on screen, not a",
    "  // same-named road in another city (or the wrong end of town — the W 6th vs E 6th bug).",
    "  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`;",
    "  const bias = viewportBias(viewer);",
    "  if (bias) url += `&bounds=${bias}`;",
    "  const response = await fetch(url);",
    "  const data = await response.json();",
    "",
    "  const result = (data.status === 'OK' && data.results?.length) ? data.results[0] : null;",
    "  let lat = result?.geometry.location.lat;",
    "  let lng = result?.geometry.location.lng;",
    "  let label = result ? result.formatted_address : null;",
    "  let types = result?.types || [];",
    "  let viewport = result ? (result.geometry.bounds || result.geometry.viewport) : null;",
]

new_lines = [
    "  const apiKey = window.__GOOGLE_MAPS_API_KEY__ || import.meta.env.GOOGLE_MAPS_API_KEY;",
    "",
    "  const beforeFly = typeof options.beforeFly === 'function' ? options.beforeFly : null;",
    "  const mayFly = () => beforeFly === null || beforeFly() !== false;",
    "",
    "  // Hitman's Halo asks the canonical McCluster Worker first. If its Google source is",
    "  // unavailable (not an auth/entitlement denial), the public Photon/OSM adapter provides",
    "  // a keyless fallback. Outages are never memoized as definitive misses.",
    "  const bias = viewportBias(viewer);",
    "  const geocode = await geocodeWithHaloFallback(query, { bias });",
    "  const result = geocode?.place || null;",
    "  let lat = result?.lat;",
    "  let lng = result?.lng;",
    "  let label = result?.label || null;",
    "  let types = result?.types || [];",
    "  let viewport = result?.viewport || null;",
]

old = '\n'.join(old_lines)
new = '\n'.join(new_lines)
if old not in s:
    if 'const geocode = await geocodeWithHaloFallback' not in s:
        raise SystemExit('expected Google geocode block not found')
else:
    s = s.replace(old, new, 1)

old_recovery = "  const recovered = await placesNearViewRecovery(viewer, query, result ? { lat, lon: lng } : null);"
new_recovery = "  const recovered = apiKey ? await placesNearViewRecovery(viewer, query, result ? { lat, lon: lng } : null) : null;"
if old_recovery in s:
    s = s.replace(old_recovery, new_recovery, 1)

p.write_text(s)
