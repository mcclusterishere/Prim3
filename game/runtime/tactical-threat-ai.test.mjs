import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createState, beginPlayerPhase, beginThreatPhase, fireWeapon, shotPreview } from './tactical-resolver.mjs';
import { runThreatPhase, threatKnowledge } from './tactical-threat-ai.mjs';

const unit = (s, id) => s.units.find((u) => u.id === id);

function threatTurn(units, extra = {}) {
  return beginThreatPhase(beginPlayerPhase(createState({ width: 14, height: 14, seed: 7, units, ...extra })));
}

test('precondition: only in the THREAT phase', () => {
  const s = beginPlayerPhase(createState({ units: [{ id: 'H', faction: 'THREAT' }] }));
  assert.throws(() => runThreatPhase(s), /THREAT phase/);
});

test('unaware threats never act or shoot; with a patrol route they walk it', () => {
  const units = [{ id: 'P', faction: 'PLAYER', x: 1, y: 1 }, { id: 'H', faction: 'THREAT', x: 12, y: 12, detectionRadius: 3 }];
  const idle = runThreatPhase(threatTurn(units));
  assert.deepEqual(idle.events, []);
  assert.deepEqual(idle.decisions, [{ unitId: 'H', aware: false, action: 'HOLD' }]);
  const patrol = runThreatPhase(threatTurn([units[0], { ...units[1], patrol: [{ x: 12, y: 12 }, { x: 12, y: 9 }] }]));
  assert.deepEqual(patrol.events.map((e) => e.type), ['MOVE']);
  assert.deepEqual([unit(patrol.state, 'H').x, unit(patrol.state, 'H').y], [12, 9]);
  assert.equal(patrol.events.some((e) => e.type === 'FIRE'), false);
});

test('aware threat with a ≥50 % shot fires; the alert network shares what one threat sees', () => {
  const s = threatTurn([
    { id: 'P', faction: 'PLAYER', x: 2, y: 2, hp: 6 },
    { id: 'SPOT', faction: 'THREAT', x: 4, y: 2, detectionRadius: 4, aim: 10 },
    { id: 'GUN', faction: 'THREAT', x: 2, y: 8, detectionRadius: 1, aim: 80 }
  ]);
  assert.deepEqual([...threatKnowledge(s)], ['P']);
  const r = runThreatPhase(s, { rng: [0, 99, 0, 99, 0, 99, 0, 99] });
  const gun = r.decisions.find((d) => d.unitId === 'GUN');
  assert.equal(gun.action, 'FIRE', 'GUN cannot see P itself but knows through SPOT');
  assert.ok(gun.hitChance >= 50);
  assert.ok(r.events.some((e) => e.type === 'FIRE' && e.attackerId === 'GUN' && e.hit));
});

test('a player who fired this round is known even outside every detection radius', () => {
  let s = beginPlayerPhase(createState({ width: 14, height: 14, units: [
    { id: 'P', faction: 'PLAYER', x: 1, y: 1, aim: 0 }, { id: 'H', faction: 'THREAT', x: 10, y: 1, detectionRadius: 2, aim: 80 }] }));
  assert.equal(threatKnowledge(beginThreatPhase(s)).size, 0);
  s = fireWeapon(s, 'P', 'H', 99, 99).state;
  s = beginThreatPhase(s);
  assert.deepEqual([...threatKnowledge(s)], ['P']);
  assert.notEqual(runThreatPhase(s).decisions[0].action, 'HOLD');
});

test('empty magazine: reload, then act on the remaining AP', () => {
  const r = runThreatPhase(threatTurn([
    { id: 'P', faction: 'PLAYER', x: 2, y: 2 }, { id: 'H', faction: 'THREAT', x: 6, y: 2, detectionRadius: 6, aim: 80, ammo: 0, magazineSize: 3, reserveAmmo: 6 }]));
  assert.deepEqual(r.decisions.map((d) => d.action), ['RELOAD', 'FIRE']);
  assert.equal(unit(r.state, 'H').ap, 0);
});

test('poor shot: MOVE (never DASH) to a scored tile, then fire if legal or overwatch', () => {
  const s = threatTurn([
    { id: 'P', faction: 'PLAYER', x: 2, y: 2 }, { id: 'H', faction: 'THREAT', x: 8, y: 2, detectionRadius: 8, aim: 55 }],
  { cover: [{ x: 2, y: 2, type: 'HIGH', sides: ['E'] }, { x: 7, y: 5, type: 'HIGH', sides: ['W', 'N'] }] });
  assert.ok(shotPreview(s, 'H', 'P').hitChance < 50);
  const r = runThreatPhase(s, { rng: () => 99 });
  assert.equal(r.decisions[0].action, 'MOVE');
  assert.ok(!r.events.some((e) => e.type === 'DASH'));
  const h = unit(r.state, 'H');
  assert.ok(Math.abs(h.x - 2) + Math.abs(h.y - 2) >= 3, 'keeps its distance');
  assert.ok(['FIRE', 'OVERWATCH'].includes(r.decisions[1].action));
});

test('player overwatch fires on threat movement (through moveUnit)', () => {
  const s = threatTurn([
    { id: 'P', faction: 'PLAYER', x: 2, y: 2, overwatch: true, aim: 90 },
    { id: 'H', faction: 'THREAT', x: 9, y: 2, detectionRadius: 9, aim: 40, hp: 3, canBeDowned: false }],
  { cover: [{ x: 2, y: 2, type: 'HIGH', sides: ['E'] }, { x: 8, y: 4, type: 'HIGH', sides: ['W'] }] });
  // beginPlayerPhase cleared P's overwatch; set it as if P chose overwatch with its last AP
  const watching = { ...s, units: s.units.map((u) => (u.id === 'P' ? { ...u, overwatch: true } : u)) };
  const r = runThreatPhase(watching, { rng: () => 0 });
  const shot = r.events.find((e) => e.type === 'OVERWATCH_SHOT');
  assert.ok(shot, 'the threat walked into the watched lane');
  assert.equal(shot.watcherId, 'P');
  assert.equal(unit(r.state, 'H').dead, true);
  assert.equal(r.events.filter((e) => e.type === 'FIRE').length, 0, 'a dead threat does nothing more');
});

test('downed or dead threats do nothing', () => {
  const r = runThreatPhase(threatTurn([
    { id: 'P', faction: 'PLAYER', x: 2, y: 2 },
    { id: 'D', faction: 'THREAT', x: 5, y: 2, downed: true, detectionRadius: 9 },
    { id: 'X', faction: 'THREAT', x: 6, y: 2, dead: true, detectionRadius: 9 }]));
  assert.deepEqual(r.events, []);
  assert.deepEqual(r.decisions, []);
});

function skirmish(learnerProfile, seed = 11) {
  return beginThreatPhase(beginPlayerPhase(createState({ width: 14, height: 14, seed, learnerProfile,
    units: [
      { id: 'R1', faction: 'PLAYER', role: 'R', x: 2, y: 2, overwatch: false },
      { id: 'T1', faction: 'PLAYER', role: 'T', x: 3, y: 5 },
      { id: 'H1', faction: 'THREAT', x: 9, y: 3, detectionRadius: 8, aim: 60 },
      { id: 'H2', faction: 'THREAT', x: 10, y: 8, detectionRadius: 8, aim: 65, ammo: 0, magazineSize: 4 },
      { id: 'H3', faction: 'THREAT', x: 12, y: 12, detectionRadius: 2, patrol: [{ x: 12, y: 12 }, { x: 8, y: 12 }] }
    ],
    cover: [{ x: 2, y: 2, type: 'LOW', sides: ['E'] }, { x: 7, y: 4, type: 'HIGH', sides: ['W'] }, { x: 8, y: 6, type: 'LOW', sides: ['W', 'N'] }],
    blockers: [{ x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }]
  })));
}

test('deterministic: same seed → same events and decisions; the PRNG lives in the state', () => {
  const a = runThreatPhase(skirmish(null));
  const b = runThreatPhase(skirmish(null));
  assert.deepEqual(a.events, b.events);
  assert.deepEqual(a.decisions, b.decisions);
  assert.deepEqual(a.state.units, b.state.units);
  assert.ok(a.state.rng.n > 0, 'shots drew from state.rng');
  const fn = () => { let i = 0; return () => (i++ * 37) % 100; };
  assert.deepEqual(runThreatPhase(skirmish(null), { rng: fn() }).events, runThreatPhase(skirmish(null), { rng: fn() }).events);
});

test('never reads the learner model: different hidden profiles give identical play', () => {
  const a = runThreatPhase(skirmish({ weakConcept: 'dns', assessmentScore: 12 }));
  const b = runThreatPhase(skirmish({ weakConcept: 'routing', assessmentScore: 99, mastery: { a: 1 } }));
  assert.deepEqual(a.events, b.events);
  assert.deepEqual(a.decisions, b.decisions);
  const source = readFileSync(new URL('./tactical-threat-ai.mjs', import.meta.url), 'utf8').replace(/^\s*\/\/.*$/gm, '');
  assert.equal(/learnerProfile|technicalTruth/.test(source), false, 'no code path mentions the learner model or technical truth');
});
