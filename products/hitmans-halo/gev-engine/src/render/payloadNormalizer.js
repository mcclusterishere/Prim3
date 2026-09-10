export function normalizePointRows(rows = [], { maxRows = 100_000 } = {}) {
  const output = [];
  const limit = Math.max(0, Math.min(Number(maxRows) || 0, 250_000));
  for (let index = 0; index < rows.length && output.length < limit; index += 1) {
    const row = rows[index];
    const lat = Number(row?.lat ?? row?.latitude ?? row?.point?.lat);
    const lon = Number(row?.lon ?? row?.lng ?? row?.longitude ?? row?.point?.lon ?? row?.point?.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) continue;
    output.push({
      id: row?.id ?? row?.external_id ?? `${index}`,
      lat,
      lon,
      altitude: Number(row?.altitude ?? row?.height ?? 0) || 0,
      entity_type: row?.entity_type || row?.kind || null,
      observed_at: row?.observed_at || null,
      source_key: row?.source_key || null,
      properties: row?.properties || null,
    });
  }
  return output;
}
