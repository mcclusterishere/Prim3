function timeValue(item) {
  const value = item?.occurred_at || item?.observed_at || item?.recorded_at || item?.created_at;
  const time = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(time) ? time : 0;
}

export function normalizeTimelineItem(item) {
  return Object.freeze({
    id: item?.id || crypto.randomUUID?.() || String(Math.random()),
    kind: item?.kind || item?.event_type || item?.observation_type || 'unknown',
    source_key: item?.source_key || null,
    label: item?.label || item?.name || item?.metric || 'Untitled event',
    detail: item?.detail || item?.value_text || null,
    occurred_at: item?.occurred_at || item?.observed_at || item?.recorded_at || item?.created_at || null,
    lat: Number.isFinite(Number(item?.lat)) ? Number(item.lat) : null,
    lon: Number.isFinite(Number(item?.lon)) ? Number(item.lon) : null,
    provenance: item?.provenance || {},
    properties: item?.properties || item?.payload || {},
  });
}

export function buildTimeline(items = [], { newestFirst = true } = {}) {
  const normalized = items.map(normalizeTimelineItem);
  normalized.sort((a, b) => newestFirst ? timeValue(b) - timeValue(a) : timeValue(a) - timeValue(b));
  return Object.freeze(normalized);
}

export function groupTimelineByDay(items = []) {
  const groups = new Map();
  for (const item of buildTimeline(items)) {
    const stamp = item.occurred_at ? new Date(item.occurred_at) : null;
    const key = stamp && !Number.isNaN(stamp.valueOf()) ? stamp.toISOString().slice(0, 10) : 'unknown';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return Object.freeze([...groups.entries()].map(([date, rows]) => Object.freeze({ date, items: Object.freeze(rows) })));
}
