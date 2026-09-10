const DEFAULT_API_BASE = 'https://api.mccluster.org/v1/seek-first';

export const SEEK_FIRST_SESSION_KEY = 'mcc.seek-first.session';

export class McClusterApiError extends Error {
  constructor(message, {
    status = 0,
    code = 'mccluster_api_error',
    category = 'unknown',
    detail = null,
    retryable = false,
    url = null,
  } = {}) {
    super(message);
    this.name = 'McClusterApiError';
    this.status = status;
    this.code = code;
    this.category = category;
    this.detail = detail;
    this.retryable = retryable;
    this.url = url;
  }
}

export function normalizeApiBase(value) {
  const text = String(value || DEFAULT_API_BASE).trim().replace(/\/+$/, '');
  if (!/^https:\/\//i.test(text) && !/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$)/i.test(text)) {
    throw new McClusterApiError('McCluster API base must be HTTPS (localhost is allowed for development)', {
      status: 0,
      code: 'unsafe_api_base',
      category: 'configuration',
      retryable: false,
      url: text,
    });
  }
  return text;
}

function safeJsonParse(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function classifyApiFailure(status, payload = null) {
  const code = String(payload?.code || payload?.error?.code || '').trim();
  const message = String(payload?.message || payload?.error?.message || payload?.error || '').trim();

  if (status === 401) return { category: 'authentication', code: code || 'authentication_required', retryable: false };
  if (status === 403) return { category: 'entitlement', code: code || 'entitlement_denied', retryable: false };
  if (status === 404) return { category: 'not_found', code: code || 'not_found', retryable: false };
  if (status === 409) return { category: 'state_conflict', code: code || 'state_conflict', retryable: false };
  if (status === 429) return { category: 'rate_limit', code: code || 'rate_limited', retryable: true };
  if (status === 503 && /schema|migration|spatial/i.test(`${code} ${message}`)) {
    return { category: 'storage_not_ready', code: code || 'spatial_schema_not_ready', retryable: false };
  }
  if (status === 503 && /credential|configured|provider/i.test(`${code} ${message}`)) {
    return { category: 'provider_not_configured', code: code || 'provider_not_configured', retryable: false };
  }
  if (status >= 500) return { category: 'provider_or_backend', code: code || 'upstream_failure', retryable: true };
  return { category: 'request', code: code || 'request_failed', retryable: false };
}

function readSessionStorageToken(storage) {
  if (!storage || typeof storage.getItem !== 'function') return null;
  const raw = storage.getItem(SEEK_FIRST_SESSION_KEY);
  if (!raw) return null;
  const parsed = safeJsonParse(raw);
  if (!parsed) return null;
  return String(parsed.access_token || parsed.accessToken || parsed.session?.access_token || '').trim() || null;
}

export function browserSessionToken() {
  try {
    return readSessionStorageToken(globalThis?.sessionStorage);
  } catch {
    return null;
  }
}

function appendQuery(url, values = {}) {
  for (const [key, value] of Object.entries(values || {})) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value)) {
      for (const item of value) url.searchParams.append(key, String(item));
    } else {
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

export function createMcClusterSeekFirstClient({
  apiBase = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MCCLUSTER_SEEK_FIRST_API) || DEFAULT_API_BASE,
  getAccessToken = browserSessionToken,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  credentials = 'include',
} = {}) {
  const base = normalizeApiBase(apiBase);
  if (typeof fetchImpl !== 'function') {
    throw new McClusterApiError('No fetch implementation is available', {
      code: 'fetch_unavailable',
      category: 'configuration',
    });
  }

  async function request(path, {
    method = 'GET',
    query = null,
    body = undefined,
    signal = undefined,
    headers = {},
    auth = true,
  } = {}) {
    const url = appendQuery(new URL(`${base}/${String(path || '').replace(/^\/+/, '')}`), query || {});
    const token = auth ? await Promise.resolve(getAccessToken?.()) : null;
    const requestHeaders = {
      accept: 'application/json',
      ...headers,
    };
    if (body !== undefined && !requestHeaders['content-type']) requestHeaders['content-type'] = 'application/json';
    if (token) requestHeaders.authorization = `Bearer ${token}`;

    let response;
    try {
      response = await fetchImpl(url, {
        method,
        credentials,
        headers: requestHeaders,
        body: body === undefined ? undefined : (typeof body === 'string' ? body : JSON.stringify(body)),
        signal,
      });
    } catch (error) {
      throw new McClusterApiError('McCluster API is unreachable', {
        status: 0,
        code: 'network_error',
        category: 'network',
        retryable: true,
        detail: error?.message || null,
        url: url.toString(),
      });
    }

    const text = await response.text();
    const payload = safeJsonParse(text);
    if (!response.ok) {
      const classification = classifyApiFailure(response.status, payload);
      throw new McClusterApiError(
        String(payload?.message || payload?.error?.message || payload?.error || `McCluster API request failed (${response.status})`),
        {
          status: response.status,
          ...classification,
          detail: payload,
          url: url.toString(),
        },
      );
    }

    if (payload !== null) return payload;
    return text;
  }

  return Object.freeze({
    apiBase: base,
    request,
    health: () => request('health', { auth: false }),
    readiness: () => request('readiness'),
    sources: (lane = 'INTERNAL') => request('sources', { query: { lane } }),
    entitlements: (lane = 'INTERNAL') => request('entitlements', { query: { lane } }),
    viewerConfig: () => request('viewer/config'),
    capabilities: () => request('capabilities'),
    fetchSource: (sourceKey, input = {}) => request(`fetch/${encodeURIComponent(sourceKey)}`, { method: 'POST', body: input }),
    ingestSource: (sourceKey, input = {}) => request(`ingest/${encodeURIComponent(sourceKey)}`, { method: 'POST', body: input }),
    liveAis: () => request('live/ais'),
    nearby: (query) => request('nearby', { query }),
    bbox: (query) => request('bbox', { query }),
    timeline: (query) => request('timeline', { query }),
    entities: (query = {}) => request('entities', { query }),
    entityHistory: (entityId, query = {}) => request(`entities/${encodeURIComponent(entityId)}/history`, { query }),
    projects: () => request('projects'),
    layers: () => request('layers'),
    ingestionRuns: (query = {}) => request('ingestion-runs', { query }),
  });
}

export const mcclusterSeekFirst = createMcClusterSeekFirstClient();
