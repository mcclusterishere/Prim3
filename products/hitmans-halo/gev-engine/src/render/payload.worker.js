import { normalizePointRows } from './payloadNormalizer.js';

self.onmessage = (event) => {
  const { id, operation, rows, options } = event.data || {};
  try {
    if (operation !== 'normalize-points') throw new Error(`Unsupported payload operation: ${operation}`);
    const data = normalizePointRows(rows || [], options || {});
    self.postMessage({ id, ok: true, data });
  } catch (error) {
    self.postMessage({ id, ok: false, error: error?.message || String(error) });
  }
};
