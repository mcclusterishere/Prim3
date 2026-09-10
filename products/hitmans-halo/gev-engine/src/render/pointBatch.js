import * as Cesium from 'cesium';
import { SpatialGrid } from './spatialGrid.js';

function nextFrame() {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(resolve);
    else setTimeout(resolve, 0);
  });
}

function normalizePoint(item, index) {
  const lat = Number(item?.lat ?? item?.latitude ?? item?.point?.lat);
  const lon = Number(item?.lon ?? item?.lng ?? item?.longitude ?? item?.point?.lon ?? item?.point?.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return {
    id: item?.id ?? item?.external_id ?? `point-${index}`,
    lat,
    lon,
    altitude: Number(item?.altitude ?? item?.height ?? 0) || 0,
    pixelSize: Number(item?.pixelSize ?? 5) || 5,
    color: item?.color || Cesium.Color.WHITE,
    outlineColor: item?.outlineColor || Cesium.Color.BLACK,
    outlineWidth: Number(item?.outlineWidth ?? 0) || 0,
    show: item?.show !== false,
    payload: item,
  };
}

export function createPointBatchLayer(viewer, {
  id = 'hitmans-halo-points',
  cellDegrees = 1,
  batchSize = 1000,
  defaultPixelSize = 5,
} = {}) {
  if (!viewer?.scene?.primitives) throw new TypeError('Cesium viewer with scene.primitives is required');

  const collection = new Cesium.PointPrimitiveCollection();
  collection.show = true;
  viewer.scene.primitives.add(collection);

  const spatialIndex = new SpatialGrid({ cellDegrees });
  const pointsById = new Map();
  let generation = 0;
  let destroyed = false;

  async function replace(items = [], { progressive = true } = {}) {
    generation += 1;
    const activeGeneration = generation;
    collection.removeAll();
    spatialIndex.clear();
    pointsById.clear();

    const normalized = items.map(normalizePoint).filter(Boolean);
    for (let start = 0; start < normalized.length; start += batchSize) {
      if (destroyed || activeGeneration !== generation) return { cancelled: true, count: pointsById.size };
      const chunk = normalized.slice(start, start + batchSize);
      for (const point of chunk) {
        const primitive = collection.add({
          id: point.id,
          position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat, point.altitude),
          pixelSize: point.pixelSize || defaultPixelSize,
          color: point.color,
          outlineColor: point.outlineColor,
          outlineWidth: point.outlineWidth,
          show: point.show,
        });
        pointsById.set(point.id, { primitive, point });
        spatialIndex.insert(point.id, point.lat, point.lon, point);
      }
      if (progressive && start + batchSize < normalized.length) await nextFrame();
    }
    viewer.scene.requestRender?.();
    return { cancelled: false, count: pointsById.size };
  }

  function setVisibleBounds(bounds) {
    const visibleIds = new Set(spatialIndex.queryBounds(bounds).map((entry) => entry.id));
    for (const [pointId, item] of pointsById) item.primitive.show = item.point.show && visibleIds.has(pointId);
    viewer.scene.requestRender?.();
    return visibleIds.size;
  }

  function showAll() {
    for (const item of pointsById.values()) item.primitive.show = item.point.show;
    viewer.scene.requestRender?.();
  }

  function clear() {
    generation += 1;
    collection.removeAll();
    spatialIndex.clear();
    pointsById.clear();
    viewer.scene.requestRender?.();
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    clear();
    if (!collection.isDestroyed?.()) viewer.scene.primitives.remove(collection);
  }

  return Object.freeze({
    id,
    collection,
    spatialIndex,
    replace,
    setVisibleBounds,
    showAll,
    clear,
    destroy,
    get size() { return pointsById.size; },
  });
}
