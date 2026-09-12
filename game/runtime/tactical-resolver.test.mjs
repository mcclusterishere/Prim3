import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createState,
  beginPlayerPhase,
  beginThreatPhase,
  resolveClockStatePhase,
  coverForAttack,
  shotPreview,
  moveUnit,
  enterOverwatch,
  hunkerDown,
  reload,
  fireWeapon,
  setObjectiveState,
  technicalAction,
  extractUnit,
  missionComplete,
  applyDirectorPressure,
  threatView,
  stableHash
} from './tactical-resolver.mjs';

function baseState(overrides = {}) {
  return createState({
    width: 12,
    height: 12,
    floors: 1,
    units: [
      { id: 'R1', faction: 'PLAYER', role: 'R', x: 1, y: 1, concealed: true, aim: 80, ammo: 1, magazineSize: 4, reserveAmmo: 8 },
      { id: 'T1', faction: 'PLAYER', role: 'T', x: 2, y: 1, aim: 70 },
      { id: 'H1', faction: 'THREAT', x: 6, y: 1, hp: 6, canBeDowned: false, detectionRadius: 3, aim: 70 }
    ],
    cover: [
      { x: 6, y: 1, type: 'HIGH', sides: ['W'] },
      { x: 6, y: 2, type: 'LOW', sides: ['N'] }
    ],
    blockers: [],
    objectives: [{ id: 'PRIMARY', required: true }],
    nodes: [{ id: 'NODE1', state: 'UNSEEN', required: true }],
    technicalTruth: {
      nodes: {
        NODE1: {
          actions: {
            UNSEEN: { OBSERVE: { next: 'OBSERVED', apCost: 1 } },
            OBSERVED: { CHARACTERIZE: { next: 'CHARACTERIZED', apCost: 1 } },
            CHARACTERIZED: { PLAN: { next: 'PLAN_SELECTED', apCost: 1 } },
            PLAN_SELECTED: { APPLY: { next: 'VALIDATION_PENDING', apCost: 1 } },
            VALIDATION_PENDING: { VERIFY: { next: 'VERIFIED', apCost: 1 } }
          },
          effectOnVerified: { camerasOnline: true }
        }
      }
    },
    learnerProfile: { weakConcept: 'dns', assessmentScore: 61 },
    ...overrides
  });
}

test('player phase refreshes standard operators to two AP', () => {
  const state = beginPlayerPhase(baseState());
  assert.equal(state.round, 1);
  assert.equal(state.phase, 'PLAYER');
  assert.equal(state.units.find((unit) => unit.id === 'R1').ap, 2);
  assert.equal(state.units.find((unit) => unit.id === 'T1').ap, 2);
});

test('standard move costs one AP and dash costs two', () => {
  let state = beginPlayerPhase(baseState());
  state = moveUnit(state, 'R1', { x: 3, y: 1 }, 'MOVE');
  assert.equal(state.units.find((unit) => unit.id === 'R1').ap, 1);

  state = beginPlayerPhase(state);
  state = moveUnit(state, 'R1', { x: 7, y: 1 }, 'DASH');
  assert.equal(state.units.find((unit) => unit.id === 'R1').ap, 0);
});

test('moving into an observed detection zone breaks concealment', () => {
  let state = beginPlayerPhase(baseState());
  state = moveUnit(state, 'R1', { x: 2, y: 2 }, 'MOVE');
  const player = state.units.find((unit) => unit.id === 'R1');
  assert.equal(player.concealed, true);

  state = beginPlayerPhase(state);
  state = moveUnit(state, 'R1', { x: 4, y: 1 }, 'MOVE');
  assert.equal(state.units.find((unit) => unit.id === 'R1').concealed, false);
  assert.ok(state.events.some((event) => event.type === 'CONCEALMENT_BROKEN'));
});

test('directional high cover protects from the covered side and flanking removes it', () => {
  const state = baseState();
  const target = state.units.find((unit) => unit.id === 'H1');
  const westAttacker = { x: 1, y: 1, z: 0 };
  const southAttacker = { x: 6, y: 8, z: 0 };

  const protectedView = coverForAttack(state, target, westAttacker);
  assert.equal(protectedView.type, 'HIGH');
  assert.equal(protectedView.flanked, false);
  assert.equal(protectedView.bonus, 40);

  const flankView = coverForAttack(state, target, southAttacker);
  assert.equal(flankView.type, 'NONE');
  assert.equal(flankView.flanked, true);
});

test('flanking creates a better shot than firing through high cover', () => {
  const state = baseState({
    units: [
      { id: 'WEST', faction: 'PLAYER', x: 1, y: 1, aim: 80, ammo: 4 },
      { id: 'SOUTH', faction: 'PLAYER', x: 6, y: 7, aim: 80, ammo: 4 },
      { id: 'H1', faction: 'THREAT', x: 6, y: 1, hp: 6, canBeDowned: false }
    ]
  });
  const covered = shotPreview(state, 'WEST', 'H1');
  const flanked = shotPreview(state, 'SOUTH', 'H1');
  assert.equal(covered.cover, 'HIGH');
  assert.equal(flanked.flanked, true);
  assert.ok(flanked.hitChance > covered.hitChance);
});

test('hunker creates a defensive accuracy penalty for the attacker', () => {
  let state = beginThreatPhase(baseState({
    units: [
      { id: 'P1', faction: 'PLAYER', x: 1, y: 1, aim: 75, ammo: 4 },
      { id: 'H1', faction: 'THREAT', x: 5, y: 1, aim: 75, ammo: 4 }
    ]
  }));
  const before = shotPreview(state, 'H1', 'P1').hitChance;
  state.phase = 'PLAYER';
  state.units.find((unit) => unit.id === 'P1').ap = 2;
  state = hunkerDown(state, 'P1');
  const after = shotPreview(state, 'H1', 'P1').hitChance;
  assert.ok(after < before);
});

test('reload consumes one AP and moves ammunition from reserve to magazine', () => {
  let state = beginPlayerPhase(baseState());
  state = reload(state, 'R1');
  const unit = state.units.find((item) => item.id === 'R1');
  assert.equal(unit.ap, 1);
  assert.equal(unit.ammo, 4);
  assert.equal(unit.reserveAmmo, 5);
});

test('weapon resolution can be stochastic while remaining seedable by supplied rolls', () => {
  let state = beginPlayerPhase(baseState({
    cover: [],
    units: [
      { id: 'P1', faction: 'PLAYER', x: 1, y: 1, aim: 90, ammo: 4, weaponDamage: 3 },
      { id: 'H1', faction: 'THREAT', x: 4, y: 1, hp: 6, canBeDowned: false }
    ]
  }));
  const result = fireWeapon(state, 'P1', 'H1', 0, 100);
  assert.equal(result.result.hit, true);
  assert.equal(result.state.units.find((unit) => unit.id === 'P1').ap, 1);
  assert.equal(result.state.units.find((unit) => unit.id === 'H1').hp, 3);
});

test('combat success does not complete a technical objective', () => {
  let state = beginPlayerPhase(baseState({
    cover: [],
    units: [
      { id: 'P1', faction: 'PLAYER', x: 1, y: 1, aim: 95, ammo: 4, weaponDamage: 99 },
      { id: 'H1', faction: 'THREAT', x: 4, y: 1, hp: 3, canBeDowned: false }
    ]
  }));
  state = fireWeapon(state, 'P1', 'H1', 0, 0).state;
  assert.equal(state.units.find((unit) => unit.id === 'H1').dead, true);
  assert.equal(state.objectives.find((objective) => objective.id === 'PRIMARY').state, 'OPEN');
  assert.equal(state.nodes.find((node) => node.id === 'NODE1').state, 'UNSEEN');
  assert.equal(missionComplete(state), false);
});

test('technical action is deterministic and rejects the wrong operation without random failure', () => {
  let state = beginPlayerPhase(baseState());
  const wrong = technicalAction(state, 'T1', 'NODE1', 'APPLY');
  assert.equal(wrong.accepted, false);
  assert.equal(wrong.state.nodes.find((node) => node.id === 'NODE1').state, 'UNSEEN');
  assert.equal(wrong.state.units.find((unit) => unit.id === 'T1').ap, 2);

  const correct = technicalAction(state, 'T1', 'NODE1', 'OBSERVE');
  assert.equal(correct.accepted, true);
  assert.equal(correct.nodeState, 'OBSERVED');
  assert.equal(correct.state.units.find((unit) => unit.id === 'T1').ap, 1);
});

test('verified LAB_NODE can change tactical battlefield state', () => {
  let state = baseState({
    nodes: [{ id: 'NODE1', state: 'VALIDATION_PENDING', required: true }],
    units: [
      { id: 'T1', faction: 'PLAYER', role: 'T', x: 2, y: 1, aim: 70 },
      { id: 'H1', faction: 'THREAT', x: 6, y: 1, hp: 6, canBeDowned: false }
    ]
  });
  state = beginPlayerPhase(state);
  const result = technicalAction(state, 'T1', 'NODE1', 'VERIFY');
  assert.equal(result.accepted, true);
  assert.equal(result.state.nodes.find((node) => node.id === 'NODE1').state, 'VERIFIED');
  assert.equal(result.state.battlefield.camerasOnline, true);
  assert.ok(result.state.events.some((event) => event.type === 'LAB_NODE_VERIFIED'));
});

test('mission requires technical node and objective state before completion', () => {
  let state = baseState({ extractionRequired: false, nodes: [{ id: 'NODE1', state: 'VERIFIED', required: true }] });
  assert.equal(missionComplete(state), false);
  state = setObjectiveState(state, 'PRIMARY', 'COMPLETE');
  assert.equal(missionComplete(state), true);
});

test('extraction can remain a separate completion requirement', () => {
  let state = baseState({
    extractionRequired: true,
    nodes: [{ id: 'NODE1', state: 'VERIFIED', required: true }],
    objectives: [{ id: 'PRIMARY', required: true, state: 'COMPLETE' }]
  });
  assert.equal(missionComplete(state), false);
  state = extractUnit(state, 'R1');
  state = extractUnit(state, 'T1');
  assert.equal(missionComplete(state), true);
});

test('Mission Director can alter pressure but cannot mutate technical truth', () => {
  const state = baseState();
  const truthHash = stableHash(state.technicalTruth);
  const pressured = applyDirectorPressure(state, { type: 'QUEUE_REINFORCEMENT', amount: 2 });
  assert.equal(pressured.mission.reinforcementsQueued, 2);
  assert.equal(stableHash(pressured.technicalTruth), truthHash);
  assert.throws(() => applyDirectorPressure(state, { type: 'CHANGE_TECHNICAL_ANSWER', value: 'wrong' }), /outside the approved pressure vocabulary/);
});

test('Threat AI view does not expose hidden learner profile or technical truth', () => {
  const state = baseState();
  const view = threatView(state);
  assert.equal(Object.hasOwn(view, 'learnerProfile'), false);
  assert.equal(Object.hasOwn(view, 'technicalTruth'), false);
  assert.equal(JSON.stringify(view).includes('assessmentScore'), false);
  assert.equal(JSON.stringify(view).includes('weakConcept'), false);
});

test('clock phase escalates mission state without changing technical truth', () => {
  let state = baseState({ clock: 3 });
  const hash = state.technicalTruthHash;
  state = resolveClockStatePhase(state);
  assert.equal(state.mission.clock, 2);
  assert.equal(state.mission.escalation, 'CRITICAL');
  assert.equal(state.technicalTruthHash, hash);
});

test('Overwatch consumes an action point and is preserved as reaction state', () => {
  let state = beginPlayerPhase(baseState());
  state = enterOverwatch(state, 'R1');
  const unit = state.units.find((item) => item.id === 'R1');
  assert.equal(unit.ap, 1);
  assert.equal(unit.overwatch, true);
});
