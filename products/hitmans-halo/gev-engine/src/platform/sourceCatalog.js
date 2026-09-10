export const SOURCE_GROUPS = Object.freeze({
  EARTH: 'EARTH',
  AIR: 'AIR',
  SEA: 'SEA',
  MOBILITY: 'MOBILITY',
  INFRASTRUCTURE: 'INFRASTRUCTURE',
  ECONOMY: 'ECONOMY',
  EVENTS: 'EVENTS',
  SECURITY: 'SECURITY',
  MCCLUSTER: 'MCCLUSTER',
  OTHER: 'OTHER',
});

const GROUP_PRIORITY = Object.freeze([
  SOURCE_GROUPS.MCCLUSTER,
  SOURCE_GROUPS.SECURITY,
  SOURCE_GROUPS.INFRASTRUCTURE,
  SOURCE_GROUPS.AIR,
  SOURCE_GROUPS.SEA,
  SOURCE_GROUPS.MOBILITY,
  SOURCE_GROUPS.EARTH,
  SOURCE_GROUPS.EVENTS,
  SOURCE_GROUPS.ECONOMY,
  SOURCE_GROUPS.OTHER,
]);

const GROUP_RULES = Object.freeze([
  [SOURCE_GROUPS.MCCLUSTER, /mccluster|internal|project|asset|facility/i],
  [SOURCE_GROUPS.SECURITY, /vulnerab|cve|kev|security|threat|cyber|exploit/i],
  [SOURCE_GROUPS.INFRASTRUCTURE, /infrastructure|energy|electric|grid|power|facility|network|telecom|datacenter|data-center/i],
  [SOURCE_GROUPS.AIR, /aircraft|aviation|airport|flight|satellite|launch|spaceflight/i],
  [SOURCE_GROUPS.SEA, /vessel|ais|maritime|ocean|port|ship/i],
  [SOURCE_GROUPS.MOBILITY, /traffic|routing|road|bikeshare|transit|vehicle|mobility/i],
  [SOURCE_GROUPS.EARTH, /terrain|imagery|weather|fire|earthquake|geology|environment|climate|earth-observation/i],
  [SOURCE_GROUPS.EVENTS, /event|headline|news|alert|hazard|disaster/i],
  [SOURCE_GROUPS.ECONOMY, /demographic|housing|commuting|business|labor|wage|employment|price|economic|finance|grant|contract|award/i],
]);

function sourceText(source) {
  return [
    source?.key,
    source?.name,
    source?.source_class,
    source?.lane,
    ...(Array.isArray(source?.capabilities) ? source.capabilities : []),
  ].filter(Boolean).join(' ');
}

export function classifySource(source) {
  const text = sourceText(source);
  for (const [group, pattern] of GROUP_RULES) {
    if (pattern.test(text)) return group;
  }
  return SOURCE_GROUPS.OTHER;
}

export function normalizeSource(source) {
  const group = classifySource(source);
  return Object.freeze({
    ...source,
    group,
    configured: Boolean(source?.configured),
    credential_required: Boolean(source?.credential_required),
    capabilities: Object.freeze([...(source?.capabilities || [])]),
    attribution: source?.attribution || null,
    persistence: source?.persistence || 'unknown',
    source_class: source?.source_class || 'UNKNOWN',
    lane: source?.lane || 'UNKNOWN',
  });
}

export function buildSourceCatalog(sources = []) {
  const groups = Object.fromEntries(GROUP_PRIORITY.map((group) => [group, []]));
  for (const raw of sources) {
    const source = normalizeSource(raw);
    groups[source.group].push(source);
  }
  for (const group of GROUP_PRIORITY) {
    groups[group].sort((a, b) => String(a.name || a.key).localeCompare(String(b.name || b.key)));
  }
  return Object.freeze({
    groups: Object.freeze(groups),
    ordered_groups: GROUP_PRIORITY,
    sources: Object.freeze(GROUP_PRIORITY.flatMap((group) => groups[group])),
  });
}
