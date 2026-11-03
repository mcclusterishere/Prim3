// T technology control: machines, weapons and levels, JAM / TAKE CONTROL / OPERATE / SYNC PULSE,
// R marking, hostile re-take (owner sign-off 2026-11-02; game/TACTICAL-T-CONTROL-RULES.md).
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createState, beginPlayerPhase, beginThreatPhase, moveUnit, findPath, gridDistance, shotPreview, fireWeapon, reload,
  switchWeapon, jamMachine, takeControl, operateDoor, syncPulse, retakeMachine, markMachine,
  techActionPreview, machineObserved, knownMachines, TECH_RULES, REACTION_AIM_PENALTY
} from './tactical-resolver.mjs';
import { playerProjection, knownPaths, knownEnemyIds } from './tactical-hints.mjs';
import { runThreatPhase, threatKnowledge } from './tactical-threat-ai.mjs';

const unit = (s, id) => s.units.find((u) => u.id === id);
const machine = (s, id) => s.machines.find((m) => m.id === id);
const board = (config) => beginPlayerPhase(createState({ width: 16, height: 16, seed: 9, ...config }));
const place = (s, id, patch) => ({ ...s, units: s.units.map((u) => (u.id === id ? { ...u, ...patch } : u)) });
// advance to the PLAYER phase of the next round
const nextRound = (s) => beginPlayerPhase(beginThreatPhase(s));

/* ---------- backward compatibility ---------- */

test('compat: no machines or weapons config adds no keys and changes nothing', () => {
  const s = board({ units: [{ id: 'T', faction: 'PLAYER', role: 'T', x: 0, y: 0 }, { id: 'H', faction: 'THREAT', x: 3, y: 0 }] });
  assert.equal('machines' in s, false);
  assert.equal('rules' in s, false);
  for (const k of ['level', 'weapons', 'readyWeapon', 'syncPulsesUsed']) assert.equal(k in unit(s, 'T'), false, k);
  assert.equal('machines' in playerProjection(s), false);
  assert.deepEqual(knownMachines(s), []);
  assert.deepEqual(s.blockers, []);
  assert.deepEqual([...threatKnowledge(s)], [...threatKnowledge(s, 'H')]);
  assert.throws(() => jamMachine(s, 'T', 'X'), /UNKNOWN_MACHINE/);
  const p = shotPreview(s, 'T', 'H');
  assert.deepEqual([p.damage, p.critDamage, p.hitChance], [3, 5, 70], 'unit defaults, as before');
});

test('config: machine kinds are validated, ids are unique, defaults are filled', () => {
  assert.throws(() => createState({ machines: [{ id: 'L', kind: 'FLOODLIGHT', x: 0, y: 0 }] }), /CAMERA, TURRET or DOOR/);
  assert.throws(() => createState({ machines: [{ id: 'A', kind: 'CAMERA', x: 0, y: 0 }, { id: 'A', kind: 'DOOR', x: 1, y: 0 }] }), /Duplicate/);
  const s = createState({ machines: [{ id: 'C', kind: 'CAMERA', x: 1, y: 1 }, { id: 'T', kind: 'TURRET', x: 2, y: 2 }, { id: 'D', kind: 'DOOR', x: 3, y: 3 }] });
  const [c, t, d] = s.machines;
  assert.deepEqual([c.faction, c.state, c.jammedUntilRound, c.controlledSinceRound, c.detectionRadius], ['THREAT', 'ACTIVE', null, null, 5]);
  assert.deepEqual([t.aim, t.weaponDamage, t.crit, t.critBonus], [70, 3, 10, 2]);
  assert.deepEqual([d.cells, d.open], [[{ x: 3, y: 3, z: 0 }], false]);
  assert.deepEqual(s.blockers, [{ x: 3, y: 3, z: 0, door: 'D' }], 'a closed door is a blocker');
  assert.deepEqual(createState({ machines: [{ id: 'D', kind: 'DOOR', x: 3, y: 3, open: true }] }).blockers, []);
});

/* ---------- weapons and levels ---------- */

const T2 = { id: 'T', faction: 'PLAYER', role: 'T', level: 2, x: 0, y: 0, reserveAmmo: 10,
  weapons: { main: { aim: 80, weaponDamage: 5, crit: 20, critBonus: 3, ammo: 3 }, sidearm: { aim: 60, weaponDamage: 2, ammo: 6 } } };

test('weapons: the ready weapon sets shot stats; switching costs 1 AP and keeps each magazine', () => {
  let s = board({ units: [T2, { id: 'H', faction: 'THREAT', x: 4, y: 0, hp: 20 }] });
  const t = unit(s, 'T');
  assert.equal(t.readyWeapon, 'main', 'main by default when carried');
  assert.equal(t.weapons.sidearm.crit, 10, 'missing weapon stat falls back to the unit value');
  let p = shotPreview(s, 'T', 'H');
  assert.deepEqual([p.hitChance, p.critChance, p.damage, p.critDamage], [80, 20, 5, 8]);
  s = fireWeapon(s, 'T', 'H', 99, 99).state;
  assert.deepEqual([unit(s, 'T').ammo, unit(s, 'T').weapons.main.ammo], [2, 2]);
  s = switchWeapon(s, 'T');
  assert.deepEqual([unit(s, 'T').readyWeapon, unit(s, 'T').ap, unit(s, 'T').ammo], ['sidearm', 0, 6]);
  assert.deepEqual(s.events.at(-1), { type: 'WEAPON_SWITCHED', unitId: 'T', readyWeapon: 'sidearm', apCost: 1 });
  p = shotPreview(s, 'T', 'H');
  assert.deepEqual([p.hitChance, p.critChance, p.damage, p.critDamage], [60, 10, 2, 4]);
  assert.throws(() => switchWeapon(s, 'T'), /NOT_ENOUGH_AP/);
  s = switchWeapon(nextRound(s), 'T');
  assert.deepEqual([unit(s, 'T').readyWeapon, unit(s, 'T').ammo], ['main', 2], 'main magazine kept');
  s = reload(s, 'T');
  assert.deepEqual([unit(s, 'T').ammo, unit(s, 'T').weapons.main.ammo, unit(s, 'T').reserveAmmo, unit(s, 'T').weapons.sidearm.ammo], [3, 3, 9, 6]);
});

test('weapons: refusals and the tunable switch cost', () => {
  const s = board({ switchWeaponAp: 2, units: [T2, { id: 'S', faction: 'PLAYER', role: 'T', x: 1, y: 0, weapons: { sidearm: { aim: 60 } } },
    { id: 'N', faction: 'PLAYER', x: 2, y: 0 }] });
  assert.throws(() => switchWeapon(s, 'S'), /NO_OTHER_WEAPON/);
  assert.throws(() => switchWeapon(s, 'N'), /NO_OTHER_WEAPON/);
  assert.equal(unit(switchWeapon(s, 'T'), 'T').ap, 0, 'config.switchWeaponAp 2');
  assert.throws(() => createState({ units: [{ id: 'X', weapons: { sidearm: {} }, readyWeapon: 'main' }] }), /not carried/);
});

/* ---------- gating: role, level, AP ---------- */

function techBoard(tUnit = { id: 'T', faction: 'PLAYER', role: 'T', x: 0, y: 0, detectionRadius: 6 }) {
  return board({ units: [tUnit, { id: 'E', faction: 'PLAYER', role: 'E', x: 0, y: 1, detectionRadius: 6 }],
    machines: [{ id: 'CAM', kind: 'CAMERA', x: 4, y: 0 }, { id: 'DOOR', kind: 'DOOR', x: 3, y: 2 }] });
}

test('tech control: T only; level 2 with the main arm up is refused (no AP spent); the sidearm allows it', () => {
  const s = techBoard();
  assert.throws(() => jamMachine(s, 'E', 'CAM'), /NOT_TECHNICIAN/);
  assert.throws(() => takeControl(s, 'E', 'CAM'), /NOT_TECHNICIAN/);
  assert.throws(() => syncPulse(s, 'E', { x: 3, y: 0 }), /NOT_TECHNICIAN/);
  assert.throws(() => operateDoor(s, 'E', 'DOOR', true), /NOT_TECHNICIAN/);
  assert.equal(unit(jamMachine(s, 'T', 'CAM'), 'T').ap, 1, 'level 1 without weapons: allowed');

  const main = techBoard({ ...T2, detectionRadius: 6 });
  for (const act of [() => jamMachine(main, 'T', 'CAM'), () => takeControl(main, 'T', 'CAM'),
    () => syncPulse(main, 'T', { x: 3, y: 0 }), () => operateDoor(main, 'T', 'DOOR', true)]) assert.throws(act, /MAIN_ARM_READY/);
  assert.equal(techActionPreview(main, 'JAM', 'T', 'CAM').reason, 'MAIN_ARM_READY');
  assert.equal(unit(main, 'T').ap, 2, 'nothing spent');
  const sidearm = switchWeapon(main, 'T');
  const jammed = jamMachine(sidearm, 'T', 'CAM');
  assert.deepEqual([machine(jammed, 'CAM').state, unit(jammed, 'T').ap], ['JAMMED', 0]);
  const level1Main = techBoard({ ...T2, level: 1, detectionRadius: 6 });
  assert.equal(techActionPreview(level1Main, 'JAM', 'T', 'CAM').legal, true, 'level 1: allowed whatever is ready');
  assert.throws(() => jamMachine(place(s, 'T', { ap: 0 }), 'T', 'CAM'), /NOT_ENOUGH_AP/);
  assert.throws(() => takeControl(place(s, 'T', { ap: 1 }), 'T', 'CAM'), /NOT_ENOUGH_AP/);
});

/* ---------- JAM ---------- */

function jamBoard() {
  return board({
    units: [{ id: 'T', faction: 'PLAYER', role: 'T', x: 0, y: 0, detectionRadius: 5 }, { id: 'R', faction: 'PLAYER', role: 'R', x: 9, y: 3 }],
    blockers: [{ x: 0, y: 2 }],
    machines: [
      { id: 'NEAR', kind: 'CAMERA', x: 4, y: 0 },
      { id: 'SEVEN', kind: 'CAMERA', x: 7, y: 0, detectionRadius: 2 },
      { id: 'FAR', kind: 'CAMERA', x: 9, y: 0 },
      { id: 'HIDDEN', kind: 'CAMERA', x: 0, y: 12 },
      { id: 'WALLED', kind: 'CAMERA', x: 0, y: 4, markedBy: ['R'] }
    ]
  });
}

test('JAM: observed, ≤ 8 tiles, line of sight; deterministic; lasts until the start of T\'s next phase', () => {
  const s = jamBoard();
  assert.throws(() => jamMachine(s, 'T', 'FAR'), /OUT_OF_RANGE/, '9 tiles (observed by R)');
  assert.throws(() => jamMachine(s, 'T', 'HIDDEN'), /NOT_OBSERVED/);
  assert.throws(() => jamMachine(s, 'T', 'WALLED'), /NO_LINE_OF_SIGHT/, 'observed through R\'s mark');
  assert.equal(machineObserved(s, 'SEVEN'), true, 'R sees it');
  assert.equal(techActionPreview(s, 'JAM', 'T', 'SEVEN').distance, 7);
  const j = jamMachine(s, 'T', 'NEAR');
  assert.deepEqual(j.rng, s.rng, 'no rolls');
  const cam = machine(j, 'NEAR');
  assert.deepEqual([cam.state, cam.jammedUntilRound, cam.jammedPhase], ['JAMMED', 2, 'PLAYER']);
  assert.deepEqual(j.events.at(-1), { type: 'MACHINE_JAMMED', actorId: 'T', machineId: 'NEAR', kind: 'CAMERA', untilRound: 2, untilPhase: 'PLAYER' });
  assert.throws(() => jamMachine(j, 'T', 'NEAR'), /ALREADY_JAMMED/);
  const threat = beginThreatPhase(j);
  assert.equal(machine(threat, 'NEAR').state, 'JAMMED', 'still jammed through the threat phase');
  const back = beginPlayerPhase(threat);
  assert.equal(machine(back, 'NEAR').state, 'ACTIVE');
  assert.deepEqual(back.events.at(-1), { type: 'MACHINE_RESTORED', machineId: 'NEAR', state: 'ACTIVE' });
});

/* ---------- R marking ---------- */

test('MARK (R only): 1 AP, line of sight, within detection radius; a marked machine stays observed', () => {
  let s = board({ units: [{ id: 'T', faction: 'PLAYER', role: 'T', x: 0, y: 0, detectionRadius: 2 }, { id: 'R', faction: 'PLAYER', role: 'R', x: 6, y: 3, detectionRadius: 5 }],
    blockers: [{ x: 6, y: 5 }],
    machines: [{ id: 'C', kind: 'CAMERA', x: 4, y: 0 }, { id: 'FAR', kind: 'CAMERA', x: 12, y: 3 }, { id: 'BEHIND', kind: 'CAMERA', x: 6, y: 6 }] });
  assert.throws(() => markMachine(s, 'T', 'C'), /NOT_RECON/);
  assert.throws(() => markMachine(s, 'R', 'FAR'), /OUT_OF_RANGE/);
  assert.throws(() => markMachine(s, 'R', 'BEHIND'), /NO_LINE_OF_SIGHT/);
  assert.throws(() => markMachine(place(s, 'R', { ap: 0 }), 'R', 'C'), /NOT_ENOUGH_AP/);
  assert.throws(() => takeControl(place(s, 'R', { x: 15, y: 15 }), 'T', 'C'), /NOT_OBSERVED/, 'T alone cannot see it');
  s = markMachine(s, 'R', 'C');
  assert.deepEqual(machine(s, 'C').markedBy, ['R']);
  assert.deepEqual(s.events.at(-1), { type: 'MACHINE_MARKED', actorId: 'R', machineId: 'C', kind: 'CAMERA' });
  assert.throws(() => markMachine(s, 'R', 'C'), /ALREADY_MARKED/);
  const away = moveUnit(nextRound(s), 'R', { x: 12, y: 8 }, 'DASH');
  assert.equal(gridDistance(unit(away, 'R'), machine(away, 'C'), away) > 5, true);
  assert.equal(machineObserved(away, 'C'), true);
  assert.equal(machine(takeControl(away, 'T', 'C'), 'C').state, 'CONTROLLED');
});

/* ---------- TAKE CONTROL ---------- */

test('TAKE CONTROL: 2 AP, ≤ 6 tiles; one machine per actor; the previous one is released', () => {
  let s = board({ units: [{ id: 'T', faction: 'PLAYER', role: 'T', x: 0, y: 0, detectionRadius: 8 }],
    machines: [{ id: 'A', kind: 'CAMERA', x: 6, y: 0 }, { id: 'B', kind: 'TURRET', x: 0, y: 5 }, { id: 'SEVEN', kind: 'CAMERA', x: 7, y: 0 }] });
  assert.throws(() => takeControl(s, 'T', 'SEVEN'), /OUT_OF_RANGE/);
  assert.equal(techActionPreview(s, 'JAM', 'T', 'SEVEN').legal, true, 'jam reaches 8');
  s = takeControl(s, 'T', 'A');
  const a = machine(s, 'A');
  assert.deepEqual([a.faction, a.state, a.controlledSinceRound, a.controlledBy, unit(s, 'T').ap], ['PLAYER', 'CONTROLLED', 1, 'T', 0]);
  assert.deepEqual(s.events.at(-1), { type: 'MACHINE_CONTROLLED', actorId: 'T', machineId: 'A', kind: 'CAMERA', round: 1 });
  s = nextRound(s);
  assert.throws(() => takeControl(s, 'T', 'A'), /FRIENDLY_MACHINE/);
  s = takeControl(s, 'T', 'B');
  assert.deepEqual([machine(s, 'A').faction, machine(s, 'A').state, machine(s, 'A').controlledBy], ['THREAT', 'ACTIVE', null]);
  assert.deepEqual([machine(s, 'B').faction, machine(s, 'B').controlledSinceRound], ['PLAYER', 2]);
  assert.deepEqual(s.events.slice(-2).map((e) => e.type), ['MACHINE_RELEASED', 'MACHINE_CONTROLLED']);
  assert.deepEqual(s.events.at(-2), { type: 'MACHINE_RELEASED', actorId: 'T', machineId: 'A', kind: 'CAMERA', faction: 'THREAT' });
});

/* ---------- cameras ---------- */

function cameraBoard() {
  return board({ units: [
    { id: 'P', faction: 'PLAYER', role: 'E', x: 0, y: 0, concealed: true, detectionRadius: 2 },
    { id: 'T', faction: 'PLAYER', role: 'T', x: 3, y: 3, detectionRadius: 6 },
    { id: 'H', faction: 'THREAT', x: 15, y: 15, detectionRadius: 2 }],
  machines: [{ id: 'CAM', kind: 'CAMERA', x: 6, y: 0, detectionRadius: 3 }] });
}

test('camera: an ACTIVE hostile camera breaks concealment like unit detection; a jammed one does not', () => {
  const s = cameraBoard();
  const seen = moveUnit(s, 'P', { x: 4, y: 0 });
  assert.equal(unit(seen, 'P').concealed, false);
  assert.ok(seen.events.some((e) => e.type === 'CONCEALMENT_BROKEN' && e.unitId === 'P' && e.reason === 'DETECTION'));
  const jammed = jamMachine(s, 'T', 'CAM');
  const quiet = moveUnit(jammed, 'P', { x: 4, y: 0 });
  assert.equal(unit(quiet, 'P').concealed, true);
  const walled = board({ units: s.units, blockers: [{ x: 5, y: 0 }], machines: [{ id: 'CAM', kind: 'CAMERA', x: 6, y: 0, detectionRadius: 3 }] });
  assert.equal(unit(moveUnit(walled, 'P', { x: 4, y: 0 }), 'P').concealed, true, 'no line of sight: no detection');
});

test('camera: hostile ACTIVE cameras feed the threat alert network; jammed or controlled ones do not', () => {
  const s = place(cameraBoard(), 'P', { concealed: false, x: 4, y: 0 });
  assert.deepEqual([...threatKnowledge(beginThreatPhase(s))], ['P'], 'H sees nothing itself');
  assert.equal(runThreatPhase(beginThreatPhase(s)).decisions[0].aware, true);
  assert.deepEqual([...threatKnowledge(beginThreatPhase(jamMachine(s, 'T', 'CAM')))], []);
  const ours = takeControl(s, 'T', 'CAM');
  assert.deepEqual([...threatKnowledge(beginThreatPhase(ours))], []);
});

test('camera: a camera the squad controls adds its sight to the player projection', () => {
  const s = board({ units: [{ id: 'T', faction: 'PLAYER', role: 'T', x: 0, y: 0, detectionRadius: 6 }, { id: 'H', faction: 'THREAT', x: 9, y: 0 }],
    machines: [{ id: 'CAM', kind: 'CAMERA', x: 6, y: 0, detectionRadius: 4 }] });
  assert.deepEqual(playerProjection(s).units.map((u) => u.id), ['T']);
  assert.deepEqual([...knownEnemyIds(s)], []);
  const ours = takeControl(s, 'T', 'CAM');
  assert.deepEqual(playerProjection(ours).units.map((u) => u.id), ['T', 'H']);
  const pm = playerProjection(ours).machines;
  assert.deepEqual(pm.map((m) => [m.id, m.state, m.faction, m.observed]), [['CAM', 'CONTROLLED', 'PLAYER', true]]);
});

/* ---------- turrets ---------- */

function turretBoard(extra = {}) {
  return board({ units: [
    { id: 'P', faction: 'PLAYER', role: 'E', x: 0, y: 2, hp: 10, moveRange: 6 },
    { id: 'Q', faction: 'PLAYER', role: 'R', x: 0, y: 4, hp: 10, moveRange: 6 },
    { id: 'T', faction: 'PLAYER', role: 'T', x: 3, y: 3, detectionRadius: 6 }],
  machines: [{ id: 'GUN', kind: 'TURRET', x: 6, y: 0, aim: 80 }], ...extra });
}

test('turret: always on overwatch; reaction rules and penalty; once per mover per move, re-arms for the next', () => {
  const s = turretBoard();
  const moved = moveUnit(s, 'P', { x: 4, y: 2 }, 'MOVE', { rolls: [0, 99] });
  const shots = moved.events.filter((e) => e.type === 'TURRET_SHOT');
  assert.equal(shots.length, 1, 'several steps in sight, one shot');
  // (1,2) → (6,0): 7 tiles: aim 80 − 4 range − 15 reaction
  assert.equal(shots[0].hitChance, 80 - 4 - REACTION_AIM_PENALTY);
  assert.deepEqual(shots[0], { type: 'TURRET_SHOT', watcherId: 'GUN', targetId: 'P', at: { x: 1, y: 2, z: 0 }, hit: true, critical: false, damage: 3, hitChance: 61, machineId: 'GUN' });
  assert.equal(unit(moved, 'P').hp, 7);
  const again = moveUnit(moved, 'Q', { x: 3, y: 4 }, 'MOVE', { rolls: [99, 99] });
  assert.equal(again.events.filter((e) => e.type === 'TURRET_SHOT').length, 2, 're-armed for the next mover');
  const seeded = moveUnit(s, 'P', { x: 4, y: 2 });
  assert.deepEqual(seeded.rng, { seed: 9, n: 2 }, 'two rolls from the state PRNG');
  assert.deepEqual(moveUnit(s, 'P', { x: 4, y: 2 }).events, seeded.events, 'deterministic');
});

test('turret: a jammed turret does not fire; a controlled one fires on threats instead', () => {
  const s = turretBoard();
  const jammed = jamMachine(s, 'T', 'GUN');
  assert.equal(moveUnit(jammed, 'P', { x: 4, y: 2 }, 'MOVE', { rolls: [0, 99] }).events.some((e) => e.type === 'TURRET_SHOT'), false);
  const hostile = turretBoard({ units: [...s.units, { id: 'H', faction: 'THREAT', x: 10, y: 3, hp: 10 }] });
  const ours = beginThreatPhase(takeControl(hostile, 'T', 'GUN'));
  const r = moveUnit(ours, 'H', { x: 7, y: 3 }, 'MOVE', { rolls: [0, 99] });
  const shot = r.events.find((e) => e.type === 'TURRET_SHOT');
  assert.equal(shot.targetId, 'H');
  assert.equal(shot.watcherId, 'GUN');
});

/* ---------- doors ---------- */

// A wall at x = 5 (y 0..6) with a door at (5, 3).
function doorBoard(units, doorExtra = {}) {
  return board({ width: 10, height: 7, units,
    blockers: [0, 1, 2, 4, 5, 6].map((y) => ({ x: 5, y })),
    machines: [{ id: 'D', kind: 'DOOR', x: 5, y: 3, ...doorExtra }, { id: 'C', kind: 'CAMERA', x: 9, y: 6 }] });
}

test('door: controlled by T, opened (paths change) and closed; never closed on a unit', () => {
  let s = doorBoard([{ id: 'T', faction: 'PLAYER', role: 'T', x: 2, y: 3, detectionRadius: 5 }, { id: 'E', faction: 'PLAYER', role: 'E', x: 1, y: 4, moveRange: 8 }]);
  assert.equal(findPath(s, 'E', { x: 8, y: 3 }, 8), null, 'closed door: no way through');
  assert.ok(playerProjection(s).blockers.some((b) => b.x === 5 && b.y === 3), 'a known closed door is a wall for the player');
  assert.throws(() => operateDoor(s, 'T', 'D', true), /NOT_CONTROLLED/);
  assert.throws(() => operateDoor(s, 'T', 'C', true), /NOT_A_DOOR/);
  s = takeControl(s, 'T', 'D');
  assert.throws(() => operateDoor(s, 'T', 'D', true), /NOT_ENOUGH_AP/);
  s = nextRound(s);
  assert.throws(() => operateDoor(s, 'T', 'D', false), /ALREADY_CLOSED/);
  const far = place(s, 'T', { x: 0, y: 6 });
  assert.throws(() => operateDoor(far, 'T', 'D', true), /OUT_OF_RANGE|NO_LINE_OF_SIGHT/);
  s = operateDoor(s, 'T', 'D', true);
  assert.deepEqual(s.events.at(-1), { type: 'DOOR_OPERATED', actorId: 'T', machineId: 'D', open: true, cells: [{ x: 5, y: 3, z: 0 }] });
  assert.equal(s.blockers.some((b) => b.door === 'D'), false);
  assert.ok(findPath(s, 'E', { x: 8, y: 3 }, 8));
  assert.ok(knownPaths(playerProjection(s), 'E').pathTo(8, 3), 'the hint planner sees the opening');
  assert.throws(() => operateDoor(s, 'T', 'D', true), /ALREADY_OPEN/);
  s = moveUnit(s, 'E', { x: 5, y: 3 });
  assert.throws(() => operateDoor(s, 'T', 'D', false), /DOOR_OCCUPIED/);
  s = moveUnit(nextRound(s), 'E', { x: 6, y: 3 });
  s = operateDoor(s, 'T', 'D', false);
  assert.deepEqual(s.blockers.filter((b) => b.door === 'D'), [{ x: 5, y: 3, z: 0, door: 'D' }]);
  assert.equal(findPath(s, 'T', { x: 7, y: 3 }, 8), null);
});

test('door: line of sight, and JAM does not change open or closed', () => {
  const blocked = doorBoard([{ id: 'T', faction: 'PLAYER', role: 'T', x: 2, y: 1, detectionRadius: 5 }, { id: 'R', faction: 'PLAYER', role: 'R', x: 4, y: 3 }],
    {});
  const walled = { ...blocked, blockers: [...blocked.blockers, { x: 3, y: 2, z: 0 }] };
  assert.throws(() => takeControl(walled, 'T', 'D'), /NO_LINE_OF_SIGHT/);
  const s = doorBoard([{ id: 'T', faction: 'PLAYER', role: 'T', x: 2, y: 3, detectionRadius: 5 }], { open: true });
  const j = jamMachine(s, 'T', 'D');
  assert.deepEqual([machine(j, 'D').state, machine(j, 'D').open, j.blockers.some((b) => b.door === 'D')], ['JAMMED', true, false]);
  const closed = jamMachine(doorBoard([{ id: 'T', faction: 'PLAYER', role: 'T', x: 2, y: 3, detectionRadius: 5 }]), 'T', 'D');
  assert.deepEqual([machine(closed, 'D').open, closed.blockers.some((b) => b.door === 'D')], [false, true]);
});

test('door: one the player never observed is not revealed; a route through it is interrupted on contact', () => {
  const s = doorBoard([{ id: 'P', faction: 'PLAYER', role: 'E', x: 1, y: 3, detectionRadius: 2, moveRange: 8 }]);
  const p = playerProjection(s);
  assert.deepEqual(p.machines, [], 'neither the door nor the camera is known');
  assert.equal(p.blockers.some((b) => b.x === 5 && b.y === 3), false);
  const route = knownPaths(p, 'P').pathTo(7, 3);
  assert.ok(route.some((c) => c.x === 5 && c.y === 3), 'the planner thinks the gap is open');
  const r = moveUnit(s, 'P', { x: 7, y: 3 }, 'MOVE', { path: route });
  const ev = r.events.find((e) => e.type === 'MOVE_INTERRUPTED');
  assert.deepEqual(ev.blockedAt, { x: 5, y: 3, z: 0 });
  assert.deepEqual([unit(r, 'P').x, unit(r, 'P').y, unit(r, 'P').ap], [4, 3, 1]);
  const after = playerProjection(r);
  assert.deepEqual(after.machines.map((m) => [m.id, m.open, m.observed]), [['D', false, true]], 'seen on contact');
  assert.equal(knownPaths(after, 'P').pathTo(7, 3), null, 'now a wall to the planner');
  assert.throws(() => moveUnit(r, 'P', { x: 7, y: 3 }, 'MOVE', { path: [{ x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }] }), /crosses a wall/, 'a known door is a wall');
  const left = moveUnit(r, 'P', { x: 1, y: 3 });
  const remembered = playerProjection(left).machines.find((m) => m.id === 'D');
  assert.deepEqual([remembered.observed, remembered.lastSeenRound, remembered.open], [false, 1, false], 'remembered, not live');
});

/* ---------- SYNC PULSE ---------- */

function pulseBoard(extra = {}) {
  return board({ units: [
    { id: 'T', faction: 'PLAYER', role: 'T', x: 0, y: 5, detectionRadius: 5 },
    { id: 'E', faction: 'PLAYER', role: 'E', x: 5, y: 6 },
    { id: 'IN', faction: 'THREAT', x: 6, y: 6 },
    { id: 'OUT', faction: 'THREAT', x: 5, y: 9 },
    { id: 'UP', faction: 'THREAT', x: 5, y: 5, z: 1 }],
  floors: 2,
  machines: [{ id: 'A', kind: 'CAMERA', x: 5, y: 7 }, { id: 'B', kind: 'TURRET', x: 8, y: 5 }, { id: 'C', kind: 'CAMERA', x: 9, y: 5 },
    { id: 'HIGH', kind: 'CAMERA', x: 5, y: 5, z: 1 }],
  ...extra });
}

test('SYNC PULSE: ≤ 5 tiles in sight, radius 3 on that floor, machines jammed, hostiles silenced, once per mission', () => {
  const s = pulseBoard();
  assert.throws(() => syncPulse(s, 'T', { x: 6, y: 5 }), /OUT_OF_RANGE/);
  assert.throws(() => syncPulse({ ...s, blockers: [{ x: 3, y: 5, z: 0 }] }, 'T', { x: 5, y: 5 }), /NO_LINE_OF_SIGHT/);
  assert.throws(() => syncPulse(place(s, 'T', { ap: 0 }), 'T', { x: 5, y: 5 }), /NOT_ENOUGH_AP/);
  const r = syncPulse(s, 'T', { x: 5, y: 5 });
  assert.deepEqual(r.events.at(-1), { type: 'SYNC_PULSE', actorId: 'T', at: { x: 5, y: 5, z: 0 }, radius: 3, machines: ['A', 'B'], units: ['IN'] });
  assert.deepEqual(r.machines.map((m) => m.state), ['JAMMED', 'JAMMED', 'ACTIVE', 'ACTIVE']);
  assert.deepEqual(unit(r, 'IN').statuses, ['NETWORK_SILENCED']);
  assert.deepEqual([unit(r, 'OUT').statuses, unit(r, 'E').statuses, unit(r, 'UP').statuses], [[], [], []]);
  assert.deepEqual([unit(r, 'T').syncPulsesUsed, unit(r, 'T').ap], [1, 1]);
  assert.deepEqual(r.rng, s.rng, 'no rolls');
  assert.throws(() => syncPulse(nextRound(r), 'T', { x: 5, y: 5 }), /PULSE_SPENT/);
  const two = pulseBoard({ syncPulsePerMission: 2 });
  assert.doesNotThrow(() => syncPulse(nextRound(syncPulse(two, 'T', { x: 5, y: 5 })), 'T', { x: 5, y: 5 }));
  // jams last 1 round; silence lasts one threat turn
  let t = beginThreatPhase(r);
  assert.deepEqual([machine(t, 'A').state, unit(t, 'IN').statuses], ['JAMMED', ['NETWORK_SILENCED']]);
  t = beginPlayerPhase(t);
  assert.deepEqual([machine(t, 'A').state, machine(t, 'B').state], ['ACTIVE', 'ACTIVE']);
  assert.deepEqual(unit(t, 'IN').statuses, ['NETWORK_SILENCED'], 'until the next-but-one threat phase');
  t = beginThreatPhase(t);
  assert.deepEqual(unit(t, 'IN').statuses, []);
  assert.equal('networkSilencedUntilRound' in unit(t, 'IN'), false);
});

test('SYNC PULSE: a silenced hostile neither shares nor receives alert knowledge in the threat AI', () => {
  const units = [
    { id: 'P', faction: 'PLAYER', x: 2, y: 2, hp: 6 },
    { id: 'T', faction: 'PLAYER', role: 'T', x: 2, y: 4, detectionRadius: 5 },
    { id: 'SPOT', faction: 'THREAT', x: 4, y: 2, detectionRadius: 4, aim: 10 },
    { id: 'GUN', faction: 'THREAT', x: 2, y: 9, detectionRadius: 1, aim: 80 }];
  const s = board({ width: 14, height: 14, units, seed: 7 });
  const plain = runThreatPhase(beginThreatPhase(s), { rng: () => 0 });
  assert.equal(plain.decisions.find((d) => d.unitId === 'GUN').aware, true, 'shared by the network');
  const pulsed = beginThreatPhase(syncPulse(s, 'T', { x: 4, y: 2 }));
  assert.deepEqual([...threatKnowledge(pulsed)], [], 'SPOT shares nothing');
  assert.deepEqual([...threatKnowledge(pulsed, 'SPOT')], ['P', 'T'], 'SPOT still knows what it sees');
  const r = runThreatPhase(pulsed, { rng: () => 0 });
  assert.deepEqual(r.decisions.find((d) => d.unitId === 'GUN'), { unitId: 'GUN', aware: false, action: 'HOLD' });
  assert.equal(r.decisions.find((d) => d.unitId === 'SPOT').aware, true);
  // a silenced unit receives nothing either: GUN silenced, a camera sees P
  const cam = board({ width: 14, height: 14, units: [units[0], units[1], { ...units[3], x: 2, y: 7 }],
    machines: [{ id: 'EYE', kind: 'CAMERA', x: 5, y: 2, detectionRadius: 4 }] });
  const silencedGun = beginThreatPhase(syncPulse(cam, 'T', { x: 2, y: 7 }));
  assert.deepEqual([...threatKnowledge(silencedGun)], ['P'], 'the camera still feeds the network');
  assert.deepEqual([...threatKnowledge(silencedGun, 'GUN')], [], 'but GUN is cut off');
});

/* ---------- RE-TAKE ---------- */

function retakeBoard() {
  return board({ units: [
    { id: 'T1', faction: 'PLAYER', role: 'T', x: 2, y: 2, detectionRadius: 6 },
    { id: 'T2', faction: 'PLAYER', role: 'T', x: 2, y: 6, detectionRadius: 6 },
    { id: 'H1', faction: 'THREAT', x: 6, y: 4, detectionRadius: 6, aim: 10 },
    { id: 'H2', faction: 'THREAT', x: 7, y: 4, detectionRadius: 6, aim: 10 },
    { id: 'FAR', faction: 'THREAT', x: 15, y: 15, detectionRadius: 2 }],
  machines: [{ id: 'CAM', kind: 'CAMERA', x: 4, y: 2 }, { id: 'GUN', kind: 'TURRET', x: 4, y: 6 }] });
}

test('RE-TAKE: refused before 3 rounds of squad control, allowed at 3; range, sight, AP', () => {
  let s = takeControl(retakeBoard(), 'T1', 'CAM'); // round 1
  assert.throws(() => retakeMachine(beginThreatPhase(s), 'H1', 'GUN'), /NOT_CONTROLLED/);
  assert.throws(() => retakeMachine(beginThreatPhase(s), 'T2', 'CAM'), /NOT_HOSTILE/);
  for (const round of [1, 2, 3]) {
    const t = beginThreatPhase(s);
    assert.equal(t.round, round);
    if (round < 3) assert.throws(() => retakeMachine(t, 'H1', 'CAM'), /PROTECTED/, `round ${round}`);
    s = beginPlayerPhase(t);
  }
  let t = beginThreatPhase(s);
  assert.equal(t.round - machine(t, 'CAM').controlledSinceRound, 3);
  assert.throws(() => retakeMachine(t, 'FAR', 'CAM'), /OUT_OF_RANGE/);
  assert.throws(() => retakeMachine({ ...t, blockers: [{ x: 5, y: 3, z: 0 }] }, 'H1', 'CAM'), /NO_LINE_OF_SIGHT/);
  assert.throws(() => retakeMachine(place(t, 'H1', { ap: 1 }), 'H1', 'CAM'), /NOT_ENOUGH_AP/);
  t = retakeMachine(t, 'H1', 'CAM');
  const cam = machine(t, 'CAM');
  assert.deepEqual([cam.faction, cam.state, cam.controlledBy, cam.controlledSinceRound, unit(t, 'H1').ap], ['THREAT', 'ACTIVE', null, null, 0]);
  assert.deepEqual(t.events.at(-1), { type: 'MACHINE_RETAKEN', hostileId: 'H1', machineId: 'CAM', kind: 'CAMERA' });
  assert.equal(playerProjection(beginPlayerPhase(t)).machines.find((m) => m.id === 'CAM').faction, 'THREAT', 'the squad sees the lost link');
});

test('threat AI: an aware hostile with 2 AP re-takes first, turret before camera; deterministic', () => {
  let s = takeControl(takeControl(retakeBoard(), 'T1', 'CAM'), 'T2', 'GUN');
  for (let i = 0; i < 3; i += 1) s = nextRound(s);
  const early = runThreatPhase(beginThreatPhase(takeControl(takeControl(retakeBoard(), 'T1', 'CAM'), 'T2', 'GUN')), { rng: () => 99 });
  assert.equal(early.decisions.some((d) => d.action === 'RETAKE'), false, 'protected in round 1');
  const t = beginThreatPhase(s);
  assert.equal(t.round, 4);
  const r = runThreatPhase(t, { rng: () => 99 });
  assert.deepEqual(r.decisions.slice(0, 2), [
    { unitId: 'H1', aware: true, action: 'RETAKE', machineId: 'GUN', kind: 'TURRET' },
    { unitId: 'H2', aware: true, action: 'RETAKE', machineId: 'CAM', kind: 'CAMERA' }]);
  assert.deepEqual([machine(r.state, 'GUN').faction, machine(r.state, 'CAM').faction], ['THREAT', 'THREAT']);
  assert.deepEqual(r.decisions.find((d) => d.unitId === 'FAR'), { unitId: 'FAR', aware: true, action: 'MOVE', to: r.decisions.find((d) => d.unitId === 'FAR').to }, 'out of reach: no re-take');
  const again = runThreatPhase(beginThreatPhase(s), { rng: () => 99 });
  assert.deepEqual(again.events, r.events);
  assert.deepEqual(again.decisions, r.decisions);
  const seeded = runThreatPhase(beginThreatPhase(s));
  assert.deepEqual(runThreatPhase(beginThreatPhase(s)).events, seeded.events, 'same seed, same play');
});

/* ---------- projection ---------- */

test('projection: unobserved machines are hidden; observed and marked ones are shown with their state', () => {
  const s = board({ units: [{ id: 'T', faction: 'PLAYER', role: 'T', x: 0, y: 0, detectionRadius: 5 }, { id: 'R', faction: 'PLAYER', role: 'R', x: 0, y: 15 }],
    machines: [{ id: 'SEEN', kind: 'CAMERA', x: 3, y: 0 }, { id: 'UNSEEN', kind: 'TURRET', x: 12, y: 0 }, { id: 'MARKED', kind: 'TURRET', x: 12, y: 12, markedBy: ['R'] },
      { id: 'OWN', kind: 'CAMERA', x: 15, y: 8, faction: 'PLAYER' }] });
  const p = playerProjection(s);
  assert.deepEqual(p.machines.map((m) => m.id), ['SEEN', 'MARKED', 'OWN']);
  assert.equal(JSON.stringify(p).includes('UNSEEN'), false);
  const jammed = playerProjection(jamMachine(s, 'T', 'SEEN')).machines.find((m) => m.id === 'SEEN');
  assert.deepEqual([jammed.state, jammed.faction, jammed.observed], ['JAMMED', 'THREAT', true]);
  assert.equal(knownMachines(s).length, 3);
});

test('TECH_RULES: the owner numbers', () => {
  assert.deepEqual([TECH_RULES.JAM_RANGE, TECH_RULES.CONTROL_RANGE, TECH_RULES.PULSE_RANGE, TECH_RULES.PULSE_RADIUS, TECH_RULES.PULSE_PER_MISSION,
    TECH_RULES.RETAKE_PROTECTION_ROUNDS, TECH_RULES.RETAKE_RANGE, TECH_RULES.RETAKE_AP, TECH_RULES.JAM_AP, TECH_RULES.CONTROL_AP, TECH_RULES.PULSE_AP,
    TECH_RULES.SWITCH_WEAPON_AP], [8, 6, 5, 3, 1, 3, 6, 2, 1, 2, 1, 1]);
  assert.ok(Object.isFrozen(TECH_RULES));
});
