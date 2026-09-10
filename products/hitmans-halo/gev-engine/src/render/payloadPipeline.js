import { normalizePointRows } from './payloadNormalizer.js';

export function createPayloadPipeline({ WorkerImpl = globalThis.Worker } = {}) {
  let worker = null;
  let unavailable = typeof WorkerImpl !== 'function';
  let sequence = 0;
  const pending = new Map();

  function ensureWorker() {
    if (worker || unavailable) return worker;
    try {
      worker = new WorkerImpl(new URL('./payload.worker.js', import.meta.url), { type: 'module' });
      worker.onmessage = (event) => {
        const { id, ok, data, error } = event.data || {};
        const request = pending.get(id);
        if (!request) return;
        pending.delete(id);
        if (ok) request.resolve(data);
        else request.reject(new Error(error || 'Payload worker failed'));
      };
      worker.onerror = () => {
        unavailable = true;
        for (const request of pending.values()) request.reject(new Error('Payload worker unavailable'));
        pending.clear();
        worker?.terminate?.();
        worker = null;
      };
    } catch {
      unavailable = true;
      worker = null;
    }
    return worker;
  }

  async function normalizePoints(rows, options = {}) {
    const active = ensureWorker();
    if (!active) return normalizePointRows(rows, options);
    sequence += 1;
    const id = `hh-payload-${sequence}`;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      active.postMessage({ id, operation: 'normalize-points', rows, options });
    }).catch(() => normalizePointRows(rows, options));
  }

  function destroy() {
    for (const request of pending.values()) request.reject(new Error('Payload pipeline destroyed'));
    pending.clear();
    worker?.terminate?.();
    worker = null;
  }

  return Object.freeze({ normalizePoints, destroy, get workerAvailable() { return !unavailable; } });
}
