// DRAFT assimilation prototype.
// PRIM3 consumes Equity Uprise state; it never mutates building authority here.

const EPSILON = 1e-9;

function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object`);
  }
  return value;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite`);
  return number;
}

function vec3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new TypeError(`${label} must be a three-number array`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${label}[${index}]`));
}

function magnitude(vector) {
  return Math.hypot(vector[0], vector[1], vector[2]);
}

function normalize(vector, label = 'vector') {
  const length = magnitude(vector);
  if (length <= EPSILON) throw new TypeError(`${label} may not be zero-length`);
  return vector.map((entry) => entry / length);
}

function subtract(left, right) {
  return [left[0] - right[0], left[1] - right[1], left[2] - right[2]];
}

function dot(left, right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0]
  ];
}

function stableAssetStateMap(sandboxSnapshot) {
  if (sandboxSnapshot == null) return new Map();

  requireObject(sandboxSnapshot, 'sandboxSnapshot');
  if (sandboxSnapshot.execution_target !== 'SANDBOX') {
    throw new Error('Equity Uprise battlefield import requires SANDBOX execution_target');
  }
  if (sandboxSnapshot.live_control_allowed !== false) {
    throw new Error('Equity Uprise battlefield import refuses LIVE control');
  }

  const states = Array.isArray(sandboxSnapshot.asset_states)
    ? sandboxSnapshot.asset_states
    : [];

  return new Map(states.map((state, index) => {
    requireObject(state, `sandboxSnapshot.asset_states[${index}]`);
    if (typeof state.asset_id !== 'string' || !state.asset_id) {
      throw new TypeError(`sandboxSnapshot.asset_states[${index}].asset_id is required`);
    }
    const availability = state.availability || 'available';
    if (!['available', 'degraded', 'unavailable'].includes(availability)) {
      throw new TypeError(`Unsupported Equity Uprise availability: ${availability}`);
    }
    return [state.asset_id, state];
  }));
}

function normalizeCameraRecord(record, index, stateMap) {
  requireObject(record, `deviceComponents.devices[${index}]`);
  if (record.archetype !== 'camera') return null;
  if (typeof record.asset_id !== 'string' || !record.asset_id) {
    throw new TypeError(`camera record ${index} is missing asset_id`);
  }

  const origin = vec3(record.position_ft, `${record.asset_id}.position_ft`);
  const aim = normalize(vec3(record.aim_vector, `${record.asset_id}.aim_vector`), `${record.asset_id}.aim_vector`);
  const optics = requireObject(record.optics, `${record.asset_id}.optics`);
  const horizontalFov = finiteNumber(optics.horizontal_fov_deg, `${record.asset_id}.optics.horizontal_fov_deg`);
  const verticalFov = finiteNumber(optics.vertical_fov_deg, `${record.asset_id}.optics.vertical_fov_deg`);
  const range = finiteNumber(optics.training_range_ft, `${record.asset_id}.optics.training_range_ft`);

  if (horizontalFov <= 0 || horizontalFov >= 180) throw new TypeError(`${record.asset_id} horizontal FOV is invalid`);
  if (verticalFov <= 0 || verticalFov >= 180) throw new TypeError(`${record.asset_id} vertical FOV is invalid`);
  if (range <= 0) throw new TypeError(`${record.asset_id} range must be positive`);

  // ElectronicsSandbox.snapshot({changed_only:true}) omits baseline-normal
  // assets. Absence therefore means baseline available, not unknown.
  const state = stateMap.get(record.asset_id);
  const availability = state?.availability || 'available';
  const sourceState = availability === 'unavailable'
    ? 'OFFLINE'
    : availability === 'degraded'
      ? 'DEGRADED'
      : 'ONLINE';

  return {
    source_asset_id: record.asset_id,
    source_type: 'camera',
    coordinate_space: 'equity-uprise-core-v2-feet',
    source_state: sourceState,
    contributes_observation: sourceState !== 'OFFLINE',
    confidence: sourceState === 'DEGRADED' ? 'REDUCED' : sourceState === 'ONLINE' ? 'NORMAL' : 'NONE',
    origin_ft: origin,
    aim_vector: aim,
    horizontal_fov_deg: horizontalFov,
    vertical_fov_deg: verticalFov,
    range_ft: range,
    active_fault_ids: Array.isArray(state?.active_fault_ids) ? [...state.active_fault_ids].sort() : []
  };
}

/**
 * Convert canonical Equity Uprise Step 4C camera records plus a SANDBOX
 * snapshot into deterministic observation volumes for PRIM3.
 *
 * This function does not fetch, mutate, regenerate, or control the building.
 */
export function deriveCameraObservationVolumes({ deviceComponents, sandboxSnapshot = null }) {
  requireObject(deviceComponents, 'deviceComponents');
  if (deviceComponents.status !== 'step4c-device-components') {
    throw new Error('PRIM3 requires the Step 4C Equity Uprise device component catalog');
  }
  if (!Array.isArray(deviceComponents.devices)) {
    throw new TypeError('deviceComponents.devices must be an array');
  }

  const stateMap = stableAssetStateMap(sandboxSnapshot);
  const volumes = deviceComponents.devices
    .map((record, index) => normalizeCameraRecord(record, index, stateMap))
    .filter(Boolean)
    .sort((left, right) => left.source_asset_id.localeCompare(right.source_asset_id));

  return {
    adapter_version: '0.1.0-draft',
    coordinate_space: 'equity-uprise-core-v2-feet',
    source_status: deviceComponents.status,
    camera_count: volumes.length,
    active_camera_count: volumes.filter((volume) => volume.contributes_observation).length,
    observation_volumes: volumes
  };
}

function observationBasis(volume) {
  const forward = normalize(vec3(volume.aim_vector, 'volume.aim_vector'), 'volume.aim_vector');
  let worldUp = [0, 0, 1];
  if (Math.abs(dot(forward, worldUp)) > 0.98) worldUp = [0, 1, 0];
  const right = normalize(cross(forward, worldUp), 'camera right vector');
  const up = normalize(cross(right, forward), 'camera up vector');
  return { forward, right, up };
}

/**
 * Test whether a point in canonical Equity Uprise feet coordinates lies
 * inside an active camera's simplified perspective frustum.
 */
export function pointObservedByCamera(volume, pointFt) {
  requireObject(volume, 'volume');
  if (volume.contributes_observation !== true) return false;

  const origin = vec3(volume.origin_ft, 'volume.origin_ft');
  const point = vec3(pointFt, 'pointFt');
  const toPoint = subtract(point, origin);
  const distance = magnitude(toPoint);
  if (distance <= EPSILON) return true;
  if (distance > finiteNumber(volume.range_ft, 'volume.range_ft')) return false;

  const { forward, right, up } = observationBasis(volume);
  const forwardDistance = dot(toPoint, forward);
  if (forwardDistance <= EPSILON) return false;

  const horizontalAngle = Math.atan2(Math.abs(dot(toPoint, right)), forwardDistance) * 180 / Math.PI;
  const verticalAngle = Math.atan2(Math.abs(dot(toPoint, up)), forwardDistance) * 180 / Math.PI;

  return horizontalAngle <= finiteNumber(volume.horizontal_fov_deg, 'volume.horizontal_fov_deg') / 2
    && verticalAngle <= finiteNumber(volume.vertical_fov_deg, 'volume.vertical_fov_deg') / 2;
}

/**
 * Resolve which tactical entities are currently observed by at least one
 * imported camera. Entity positions remain in the source building coordinate
 * space until a later authored tactical/nav transform is introduced.
 */
export function deriveObservedEntityIds({ observationVolumes, entities }) {
  if (!Array.isArray(observationVolumes)) throw new TypeError('observationVolumes must be an array');
  if (!Array.isArray(entities)) throw new TypeError('entities must be an array');

  const observed = [];
  for (const entity of entities) {
    requireObject(entity, 'entity');
    if (typeof entity.id !== 'string' || !entity.id) throw new TypeError('entity.id is required');
    const position = vec3(entity.position_ft, `${entity.id}.position_ft`);
    if (observationVolumes.some((volume) => pointObservedByCamera(volume, position))) {
      observed.push(entity.id);
    }
  }
  return [...new Set(observed)].sort();
}

/**
 * First complete assimilation proof:
 * sandbox state -> camera volumes -> observed entity IDs.
 */
export function deriveCameraKnowledge({ deviceComponents, sandboxSnapshot = null, entities = [] }) {
  const observation = deriveCameraObservationVolumes({ deviceComponents, sandboxSnapshot });
  return {
    ...observation,
    observed_entity_ids: deriveObservedEntityIds({
      observationVolumes: observation.observation_volumes,
      entities
    })
  };
}
