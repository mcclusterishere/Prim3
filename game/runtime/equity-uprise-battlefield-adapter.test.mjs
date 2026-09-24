import test from 'node:test';
import assert from 'node:assert/strict';

import {
  deriveCameraKnowledge,
  deriveCameraObservationVolumes,
  deriveObservedEntityIds,
  pointObservedByCamera
} from './equity-uprise-battlefield-adapter.mjs';

function camera(id, position, aim, state = 'lab_complete') {
  return {
    asset_id: id,
    archetype: 'camera',
    maturity: state,
    position_ft: position,
    aim_vector: aim,
    optics: {
      horizontal_fov_deg: 90,
      vertical_fov_deg: 60,
      training_range_ft: 10
    }
  };
}

const components = {
  schema_version: '1.0.0',
  status: 'step4c-device-components',
  devices: [
    camera('CAM-A', [0, 0, 0], [1, 0, 0]),
    camera('CAM-B', [10, 10, 0], [-1, 0, 0]),
    {
      asset_id: 'WAP-IGNORED',
      archetype: 'wireless_ap',
      position_ft: [5, 5, 0]
    }
  ]
};

test('camera observation is derived from canonical device geometry without hard-coded counts', () => {
  const result = deriveCameraObservationVolumes({ deviceComponents: components });

  assert.equal(result.coordinate_space, 'equity-uprise-core-v2-feet');
  assert.equal(result.camera_count, 2);
  assert.equal(result.active_camera_count, 2);
  assert.deepEqual(
    result.observation_volumes.map((item) => item.source_asset_id),
    ['CAM-A', 'CAM-B']
  );
});

test('changed-only sandbox snapshots treat absent cameras as baseline available', () => {
  const result = deriveCameraObservationVolumes({
    deviceComponents: components,
    sandboxSnapshot: {
      execution_target: 'SANDBOX',
      live_control_allowed: false,
      asset_states: [
        {
          asset_id: 'CAM-A',
          availability: 'unavailable',
          active_fault_ids: ['poe_disabled']
        }
      ]
    }
  });

  const a = result.observation_volumes.find((item) => item.source_asset_id === 'CAM-A');
  const b = result.observation_volumes.find((item) => item.source_asset_id === 'CAM-B');

  assert.equal(a.source_state, 'OFFLINE');
  assert.equal(a.contributes_observation, false);
  assert.deepEqual(a.active_fault_ids, ['poe_disabled']);

  assert.equal(b.source_state, 'ONLINE');
  assert.equal(b.contributes_observation, true);
  assert.equal(result.active_camera_count, 1);
});

test('camera frustum sees forward points and rejects behind, lateral and out-of-range points', () => {
  const [volume] = deriveCameraObservationVolumes({
    deviceComponents: {
      status: 'step4c-device-components',
      devices: [camera('CAM-A', [0, 0, 0], [1, 0, 0])]
    }
  }).observation_volumes;

  assert.equal(pointObservedByCamera(volume, [5, 0, 0]), true);
  assert.equal(pointObservedByCamera(volume, [5, 2, 1]), true);
  assert.equal(pointObservedByCamera(volume, [-1, 0, 0]), false);
  assert.equal(pointObservedByCamera(volume, [2, 3, 0]), false);
  assert.equal(pointObservedByCamera(volume, [11, 0, 0]), false);
});

test('camera state directly changes PRIM3 observed entities', () => {
  const entities = [
    { id: 'ASSAULT-01', position_ft: [5, 0, 0] },
    { id: 'ASSAULT-02', position_ft: [4, 8, 0] },
    { id: 'DEFENDER-01', position_ft: [3, 1, 0] }
  ];

  const baseline = deriveCameraKnowledge({
    deviceComponents: {
      status: 'step4c-device-components',
      devices: [camera('CAM-A', [0, 0, 0], [1, 0, 0])]
    },
    sandboxSnapshot: {
      execution_target: 'SANDBOX',
      live_control_allowed: false,
      asset_states: []
    },
    entities
  });

  assert.deepEqual(baseline.observed_entity_ids, ['ASSAULT-01', 'DEFENDER-01']);

  const blinded = deriveCameraKnowledge({
    deviceComponents: {
      status: 'step4c-device-components',
      devices: [camera('CAM-A', [0, 0, 0], [1, 0, 0])]
    },
    sandboxSnapshot: {
      execution_target: 'SANDBOX',
      live_control_allowed: false,
      asset_states: [
        {
          asset_id: 'CAM-A',
          availability: 'unavailable',
          active_fault_ids: ['camera_link_down']
        }
      ]
    },
    entities
  });

  assert.deepEqual(blinded.observed_entity_ids, []);
  assert.equal(blinded.active_camera_count, 0);
});

test('degraded cameras still observe but carry reduced confidence', () => {
  const result = deriveCameraObservationVolumes({
    deviceComponents: {
      status: 'step4c-device-components',
      devices: [camera('CAM-A', [0, 0, 0], [1, 0, 0])]
    },
    sandboxSnapshot: {
      execution_target: 'SANDBOX',
      live_control_allowed: false,
      asset_states: [
        {
          asset_id: 'CAM-A',
          availability: 'degraded',
          active_fault_ids: ['rf_attenuation']
        }
      ]
    }
  });

  assert.equal(result.observation_volumes[0].contributes_observation, true);
  assert.equal(result.observation_volumes[0].confidence, 'REDUCED');
});

test('adapter refuses anything that is not explicitly SANDBOX-only', () => {
  assert.throws(
    () => deriveCameraObservationVolumes({
      deviceComponents: components,
      sandboxSnapshot: {
        execution_target: 'LIVE',
        live_control_allowed: true,
        asset_states: []
      }
    }),
    /SANDBOX/
  );

  assert.throws(
    () => deriveCameraObservationVolumes({
      deviceComponents: components,
      sandboxSnapshot: {
        execution_target: 'SANDBOX',
        live_control_allowed: true,
        asset_states: []
      }
    }),
    /LIVE control/
  );
});

test('observed entity output is deterministic and de-duplicated', () => {
  const volumes = deriveCameraObservationVolumes({
    deviceComponents: components
  }).observation_volumes;

  const entities = [
    { id: 'B', position_ft: [5, 0, 0] },
    { id: 'A', position_ft: [6, 0, 0] },
    { id: 'B', position_ft: [5, 0, 0] }
  ];

  assert.deepEqual(
    deriveObservedEntityIds({ observationVolumes: volumes, entities }),
    ['A', 'B']
  );
});
