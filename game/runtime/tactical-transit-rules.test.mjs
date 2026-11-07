// Floors, links, heights, overwatch, positioned interactions and extraction zones (2026-11-02).
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createState, beginPlayerPhase, beginThreatPhase, moveUnit, findPath, computeReach, hasLineOfSight,
  gridDistance, shotPreview, enterOverwatch, technicalAction, extractUnit, drawRolls, REACTION_AIM_PENALTY
} from './tactical-resolver.mjs';
import { playerProjection, knownPaths, legalCandidates, createChallenge, openHint, answerHint } from './tactical-hints.mjs';

const unit = (s, id) => s.units.find((u) => u.id === id);

// A warehouse roof (z 1, x 4..7, y 4..7, 6 m) reached by stairs from (3,5) ground to (4,5) roof, cost 2.
function transit(extra = {}) {
  return createState({
    width: 12, height: 12, floors: 2,
    surfaces: [{ z: 1, x: 4, y: 4, w: 4, d: 4, height: 6 }],
    links: [{ id: 'stairs-a', from: { x: 3, y: 5, z: 0 }, to: { x: 4, y: 5, z: 1 }, cost: 2 }],
    units: [{ id: 'P', faction: 'PLAYER', role: 'E', x: 1, y: 5, moveRange: 6 }],
    ...extra
  });
}

/* ---------- backward compatibility ---------- */

// The original single-floor rules, copied verbatim, as the reference.
function refLine(a, b) {
  const cells = []; let x0 = a.x, y0 = a.y; const x1 = b.x, y1 = b.y;
  const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; let err = dx + dy;
  while (!(x0 === x1 && y0 === y1)) { const e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; } if (!(x0 === x1 && y0 === y1)) cells.push({ x: x0, y: y0, z: a.z || 0 }); }
  return cells;
}
function refLos(state, a, b) {
  if ((a.z || 0) !== (b.z || 0)) return false;
  const bl = new Set(state.blockers.map((i) => `${i.x}:${i.y}:${i.z}`));
  return !refLine(a, b).some((c) => bl.has(`${c.x}:${c.y}:${c.z}`));
}
function refPath(state, u, dest, maxSteps) {
  if (dest.z !== u.z) return null;
  const key = (x, y) => `${x}:${y}`; const prev = new Map([[key(u.x, u.y), null]]); let frontier = [{ x: u.x, y: u.y }];
  const blocked = (x, y) => state.blockers.some((i) => i.x === x && i.y === y && i.z === u.z);
  const occ = (x, y) => state.units.some((o) => !o.dead && o.id !== u.id && o.x === x && o.y === y && o.z === u.z);
  for (let steps = 0; frontier.length && steps < maxSteps; steps += 1) {
    const nf = [];
    for (const c of frontier) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = c.x + dx, y = c.y + dy, k = key(x, y);
      if (prev.has(k) || x < 0 || y < 0 || x >= state.width || y >= state.height || blocked(x, y) || occ(x, y)) continue;
      prev.set(k, c);
      if (x === dest.x && y === dest.y) { const p = [{ x, y, z: u.z }]; for (let at = c; at && !(at.x === u.x && at.y === u.y); at = prev.get(key(at.x, at.y))) p.unshift({ x: at.x, y: at.y, z: u.z }); return p; }
      nf.push({ x, y });
    }
    frontier = nf;
  }
  return null;
}
function lcg(seed) { let s = seed >>> 0; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 2 ** 32; }; }

test('compat: a state without the new config keeps the original LOS, paths, distance and shape', () => {
  for (let seed = 1; seed <= 25; seed += 1) {
    const r = lcg(seed);
    const blockers = [];
    for (let i = 0; i < 30; i += 1) blockers.push({ x: Math.floor(r() * 14), y: Math.floor(r() * 14), z: 0 });
    const s = beginPlayerPhase(createState({ width: 14, height: 14, blockers,
      units: [{ id: 'A', faction: 'PLAYER', x: 0, y: 0 }, { id: 'B', faction: 'THREAT', x: 13, y: 13 }].filter((u) => !blockers.some((b) => b.x === u.x && b.y === u.y)) }));
    const a = s.units[0]; if (!a) continue;
    for (let k = 0; k < 20; k += 1) {
      const p = { x: Math.floor(r() * 14), y: Math.floor(r() * 14), z: 0 }, q = { x: Math.floor(r() * 14), y: Math.floor(r() * 14), z: 0 };
      assert.equal(hasLineOfSight(s, p, q), refLos(s, p, q));
      assert.deepEqual(findPath(s, a.id, p, 8), refPath(s, a, p, 8));
    }
  }
  const s = createState({ units: [{ id: 'A', x: 0, y: 0 }] });
  assert.equal(s.surfaces, null);
  assert.deepEqual(s.links, []);
  assert.deepEqual(s.rng, { seed: 1, n: 0 });
  assert.equal(gridDistance({ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }), Infinity);
  assert.equal(hasLineOfSight(createState({ floors: 2 }), { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 1 }), false);
  assert.ok(!('weaponRange' in s.units[0]) && !('patrol' in s.units[0]), 'no new unit keys unless given');
  assert.deepEqual(Object.keys(createState({ nodes: [{ id: 'N' }] }).nodes[0]), ['id', 'state', 'required']);
});

/* ---------- floors, surfaces, links ---------- */

test('stairs: a link costs its declared steps, and the route may end on the roof', () => {
  const s = beginPlayerPhase(transit());
  const path = findPath(s, 'P', { x: 5, y: 5, z: 1 }, 6);
  assert.deepEqual(path, [{ x: 2, y: 5, z: 0 }, { x: 3, y: 5, z: 0 }, { x: 4, y: 5, z: 1 }, { x: 5, y: 5, z: 1 }]);
  assert.equal(computeReach(s, 'P', 6).costAt(5, 5, 1), 5, '2 steps + stairs 2 + 1 step');
  const moved = moveUnit(s, 'P', { x: 5, y: 5, z: 1 });
  assert.deepEqual([unit(moved, 'P').x, unit(moved, 'P').y, unit(moved, 'P').z, unit(moved, 'P').ap], [5, 5, 1, 1]);
  assert.deepEqual(moved.events.at(-1).path, path);
  const short = beginPlayerPhase(transit({ units: [{ id: 'P', faction: 'PLAYER', x: 1, y: 5, moveRange: 4 }] }));
  assert.throws(() => moveUnit(short, 'P', { x: 5, y: 5, z: 1 }), /No traversable path/, 'cost 5 > range 4');
  assert.equal(findPath(short, 'P', { x: 4, y: 5, z: 1 }, 4).length, 3, 'cost exactly 4 fits');
});

test('a supplied route may take a link step; a floor jump without a link is refused', () => {
  const s = beginPlayerPhase(transit());
  const ok = moveUnit(s, 'P', { x: 4, y: 6, z: 1 }, 'MOVE', { path: [{ x: 2, y: 5, z: 0 }, { x: 3, y: 5, z: 0 }, { x: 4, y: 5, z: 1 }, { x: 4, y: 6, z: 1 }] });
  assert.deepEqual([unit(ok, 'P').x, unit(ok, 'P').y, unit(ok, 'P').z], [4, 6, 1]);
  assert.throws(() => moveUnit(s, 'P', { x: 4, y: 6, z: 1 }, 'MOVE', { path: [{ x: 2, y: 5, z: 0 }, { x: 3, y: 5, z: 0 }, { x: 3, y: 6, z: 0 }, { x: 4, y: 6, z: 1 }] }), /leaves the floor/);
  const tight = beginPlayerPhase(transit({ units: [{ id: 'P', faction: 'PLAYER', x: 1, y: 5, moveRange: 4 }] }));
  assert.throws(() => moveUnit(tight, 'P', { x: 4, y: 6, z: 1 }, 'MOVE', { path: [{ x: 2, y: 5, z: 0 }, { x: 3, y: 5, z: 0 }, { x: 4, y: 5, z: 1 }, { x: 4, y: 6, z: 1 }] }), /outside movement range/, '4 steps but cost 5');
  const noLinks = beginPlayerPhase(transit({ links: [] }));
  assert.throws(() => moveUnit(noLinks, 'P', { x: 4, y: 5, z: 1 }), /another floor/);
});

test('roofs: only surface cells are walkable on an upper floor; without surfaces every cell is', () => {
  const s = beginPlayerPhase(transit({ units: [{ id: 'P', faction: 'PLAYER', x: 5, y: 5, z: 1, moveRange: 6 }] }));
  assert.throws(() => moveUnit(s, 'P', { x: 9, y: 5, z: 1 }), /not a walkable surface/);
  assert.throws(() => moveUnit(s, 'P', { x: 8, y: 5, z: 1 }, 'MOVE', { path: [{ x: 6, y: 5, z: 1 }, { x: 7, y: 5, z: 1 }, { x: 8, y: 5, z: 1 }] }), /not a walkable surface/);
  assert.ok(computeReach(s, 'P', 6).cells.every((c) => c.z === 0 || (c.x >= 4 && c.x <= 7 && c.y >= 4 && c.y <= 7)));
  const old = beginPlayerPhase(createState({ width: 6, height: 6, floors: 2, units: [{ id: 'P', faction: 'PLAYER', x: 0, y: 0, z: 1 }] }));
  assert.doesNotThrow(() => moveUnit(old, 'P', { x: 3, y: 3, z: 1 }), 'no surfaces config: original rule');
});

/* ---------- heights and line of sight ---------- */

test('line of sight: a tall blocker blocks, low cover does not; roof slab blocks; roof edge sees over a container', () => {
  const flat = createState({ width: 10, height: 3, blockers: [{ x: 3, y: 0, h: 3 }] });
  assert.equal(hasLineOfSight(flat, { x: 0, y: 0, z: 0 }, { x: 6, y: 0, z: 0 }), false, 'h 3 m > eye line 1.6 m');
  const low = createState({ width: 10, height: 3, blockers: [{ x: 3, y: 0, h: 1 }] });
  assert.equal(hasLineOfSight(low, { x: 0, y: 0, z: 0 }, { x: 6, y: 0, z: 0 }), true, 'h 1 m: see over it');

  const s = transit({ blockers: [{ x: 9, y: 6, z: 0, h: 2.6 }] });
  assert.equal(hasLineOfSight(s, { x: 6, y: 6, z: 1 }, { x: 8, y: 6, z: 0 }), false, 'roof interior → base of the wall: the slab is in the way');
  assert.equal(hasLineOfSight(s, { x: 7, y: 6, z: 1 }, { x: 11, y: 6, z: 0 }), true, 'roof edge sees over the 2.6 m container');
  assert.equal(hasLineOfSight(s, { x: 8, y: 6, z: 0 }, { x: 11, y: 6, z: 0 }), false, 'from the yard the container blocks');
  assert.equal(hasLineOfSight(s, { x: 5, y: 5, z: 0 }, { x: 5, y: 9, z: 0 }), true, 'a ground line under a 6 m roof passes below the slab');
  const roofWall = transit({ blockers: [{ x: 6, y: 5, z: 1 }] });
  assert.equal(hasLineOfSight(roofWall, { x: 4, y: 5, z: 1 }, { x: 7, y: 5, z: 1 }), false, 'full-height wall on the roof');
  assert.equal(hasLineOfSight(roofWall, { x: 4, y: 5, z: 0 }, { x: 7, y: 5, z: 0 }), true, 'a roof wall does not block the floor below');
});

test('same-floor sight with surfaces and no heights equals the original rule', () => {
  const blockers = [{ x: 2, y: 2 }, { x: 3, y: 7 }, { x: 8, y: 1 }, { x: 5, y: 9 }, { x: 9, y: 9 }];
  const s = transit({ blockers });
  const old = createState({ width: 12, height: 12, blockers });
  const r = lcg(7);
  for (let i = 0; i < 300; i += 1) {
    const p = { x: Math.floor(r() * 12), y: Math.floor(r() * 12), z: 0 }, q = { x: Math.floor(r() * 12), y: Math.floor(r() * 12), z: 0 };
    assert.equal(hasLineOfSight(s, p, q), hasLineOfSight(old, p, q));
  }
});

test('cross-floor range and the elevation bonus', () => {
  const s = transit({ units: [
    { id: 'ROOF', faction: 'PLAYER', x: 7, y: 6, z: 1, aim: 60 },
    { id: 'YARD', faction: 'PLAYER', x: 7, y: 9, z: 0, aim: 60 },
    { id: 'H', faction: 'THREAT', x: 11, y: 6, z: 0 }
  ] });
  assert.equal(gridDistance(unit(s, 'ROOF'), unit(s, 'H'), s), 4);
  const high = shotPreview(s, 'ROOF', 'H');
  assert.equal(high.legal, true);
  assert.equal(high.distance, 4);
  const level = shotPreview(s, 'YARD', 'H');
  assert.equal(level.distance, 7);
  assert.equal(high.hitChance, 70, 'aim 60 + 10 elevation');
  assert.equal(level.hitChance, 56, 'aim 60 − 4 range, no elevation');
});

/* ---------- overwatch ---------- */

function watched(extraUnits = [], extra = {}) {
  return beginPlayerPhase(createState({ width: 12, height: 12, seed: 42,
    units: [
      { id: 'P', faction: 'PLAYER', x: 0, y: 2, hp: 6, moveRange: 6 },
      { id: 'H', faction: 'THREAT', x: 6, y: 0, aim: 80, ammo: 2, ap: 0, overwatch: true, weaponDamage: 3 },
      ...extraUnits
    ], ...extra }));
}

test('overwatch fires on the first step in its sight: no AP, ammo used, reaction penalty, event before MOVE', () => {
  const s = watched();
  const atFirst = { ...s, units: s.units.map((u) => (u.id === 'P' ? { ...u, x: 1, y: 2 } : u)) };
  const expected = shotPreview(atFirst, 'H', 'P', { reaction: true });
  assert.equal(expected.hitChance, shotPreview(atFirst, 'H', 'P').hitChance - REACTION_AIM_PENALTY);
  const next = moveUnit(s, 'P', { x: 4, y: 2 }, 'MOVE', { rolls: [0, 99] });
  const shots = next.events.filter((e) => e.type === 'OVERWATCH_SHOT');
  assert.equal(shots.length, 1);
  assert.deepEqual(shots[0], { type: 'OVERWATCH_SHOT', watcherId: 'H', targetId: 'P', at: { x: 1, y: 2, z: 0 }, hit: true, critical: false, damage: 3, hitChance: expected.hitChance });
  const h = unit(next, 'H');
  assert.deepEqual([h.overwatch, h.ap, h.ammo], [false, 0, 1]);
  assert.equal(unit(next, 'P').hp, 3);
  assert.deepEqual([unit(next, 'P').x, unit(next, 'P').y], [4, 2], 'survived: walks the rest');
  assert.equal(next.events.at(-1).type, 'MOVE');
  assert.ok(next.events.indexOf(shots[0]) < next.events.length - 1);
});

test('overwatch that downs or kills the mover stops it on that cell', () => {
  const s = watched([], {});
  const frail = { ...s, units: s.units.map((u) => (u.id === 'P' ? { ...u, hp: 3 } : u)) };
  const downed = moveUnit(frail, 'P', { x: 4, y: 2 }, 'MOVE', { rolls: [0, 99] });
  const p = unit(downed, 'P');
  assert.deepEqual([p.x, p.y, p.downed, p.dead], [1, 2, true, false]);
  const ev = downed.events.at(-1);
  assert.equal(ev.type, 'MOVE');
  assert.deepEqual(ev.destination, { x: 1, y: 2, z: 0 });
  assert.deepEqual(ev.path, [{ x: 1, y: 2, z: 0 }]);
  assert.equal(ev.interrupted, 'OVERWATCH');
  const mortal = { ...frail, units: frail.units.map((u) => (u.id === 'P' ? { ...u, canBeDowned: false } : u)) };
  assert.equal(unit(moveUnit(mortal, 'P', { x: 4, y: 2 }, 'MOVE', { rolls: [0, 99] }), 'P').dead, true);
  const miss = moveUnit(frail, 'P', { x: 4, y: 2 }, 'MOVE', { rolls: [99, 99] });
  assert.deepEqual([unit(miss, 'P').x, unit(miss, 'P').hp], [4, 3], 'a miss lets it through');
});

test('overwatch rolls default to the seeded state PRNG: deterministic and copied with the state', () => {
  const s = watched();
  const a = moveUnit(s, 'P', { x: 4, y: 2 });
  const b = moveUnit(s, 'P', { x: 4, y: 2 });
  assert.deepEqual(a.events, b.events);
  assert.deepEqual(a.rng, { seed: 42, n: 2 }, 'one hit roll + one crit roll');
  assert.deepEqual(s.rng, { seed: 42, n: 0 }, 'input state untouched');
  const d = drawRolls(s, 2);
  const shot = a.events.find((e) => e.type === 'OVERWATCH_SHOT');
  assert.equal(shot.hit, d.rolls[0] < shot.hitChance);
  const fn = moveUnit(s, 'P', { x: 4, y: 2 }, 'MOVE', { rolls: () => 0 });
  assert.equal(fn.events.find((e) => e.type === 'OVERWATCH_SHOT').critical, true);
});

test('no reaction without a legal shot, against a concealed mover the watcher cannot detect, or from a friendly', () => {
  const walled = watched([], { blockers: [0, 1, 2, 3, 4, 5].map((y) => ({ x: 5, y })) });
  assert.equal(moveUnit(walled, 'P', { x: 3, y: 2 }).events.some((e) => e.type === 'OVERWATCH_SHOT'), false);
  const sneaky = watched();
  const hidden = { ...sneaky, units: sneaky.units.map((u) => (u.id === 'P' ? { ...u, concealed: true } : u)) };
  const next = moveUnit(hidden, 'P', { x: 0, y: 4 });
  assert.equal(next.events.some((e) => e.type === 'OVERWATCH_SHOT'), false, 'outside detection radius 5: still concealed');
  assert.equal(unit(next, 'P').concealed, true);
  const friendly = watched([{ id: 'P2', faction: 'PLAYER', x: 6, y: 4, overwatch: true }]);
  assert.equal(moveUnit(friendly, 'P', { x: 4, y: 2 }, 'MOVE', { rolls: [99, 99] }).events.filter((e) => e.type === 'OVERWATCH_SHOT').length, 1, 'only the hostile watcher');
});

test('overwatch and hunker expire at the start of their own side\'s next phase', () => {
  let s = beginThreatPhase(createState({ units: [{ id: 'P', faction: 'PLAYER', x: 0, y: 0 }, { id: 'H', faction: 'THREAT', x: 5, y: 5 }] }));
  s = enterOverwatch(s, 'H');
  s = beginPlayerPhase(s);
  assert.equal(unit(s, 'H').overwatch, true, 'still watching through the player phase');
  s = enterOverwatch(s, 'P');
  s = beginThreatPhase(s);
  assert.equal(unit(s, 'H').overwatch, false);
  assert.equal(unit(s, 'P').overwatch, true);
  s = beginPlayerPhase(s);
  assert.equal(unit(s, 'P').overwatch, false);
});

/* ---------- positioned interactions and extraction ---------- */

function relay(extra = {}) {
  return beginPlayerPhase(createState({ width: 12, height: 12,
    units: [{ id: 'T1', faction: 'PLAYER', role: 'T', x: 1, y: 1 }, { id: 'E1', faction: 'PLAYER', role: 'E', x: 5, y: 4 }],
    blockers: [{ x: 8, y: 3 }, { x: 8, y: 4 }, { x: 0, y: 9 }],
    nodes: [{ id: 'GATE', state: 'VALIDATION_PENDING', at: { x: 5, y: 5, z: 0, range: 1, roles: ['T'] } }],
    technicalTruth: { nodes: { GATE: { actions: { VALIDATION_PENDING: { VERIFY: { next: 'VERIFIED', apCost: 1 } } },
      effectOnVerified: { gateOpen: true, removeBlockers: [{ x: 8, y: 3, z: 0 }, { x: 8, y: 4 }] } } } },
    battlefield: { extractionZone: { x: 10, y: 10, z: 0, r: 1 } },
    ...extra
  }));
}

test('positioned node: out of position or wrong role is refused with no AP spent; in position works and opens the gate', () => {
  const s = relay();
  assert.throws(() => technicalAction(s, 'T1', 'GATE', 'VERIFY'), /not in position/);
  assert.throws(() => technicalAction(s, 'E1', 'GATE', 'VERIFY'), /Role E cannot operate/);
  assert.equal(unit(s, 'T1').ap, 2);
  const placed = { ...s, units: s.units.map((u) => (u.id === 'T1' ? { ...u, x: 5, y: 6 } : u)) };
  const r = technicalAction(placed, 'T1', 'GATE', 'VERIFY');
  assert.equal(r.accepted, true);
  assert.deepEqual(r.state.blockers, [{ x: 0, y: 9, z: 0 }]);
  assert.equal(r.state.battlefield.gateOpen, true);
  assert.equal('removeBlockers' in r.state.battlefield, false);
  assert.deepEqual(r.state.events.at(-1), { type: 'BLOCKERS_REMOVED', nodeId: 'GATE', cells: [{ x: 8, y: 3, z: 0 }, { x: 8, y: 4, z: 0 }] });
  const offFloor = { ...placed, units: placed.units.map((u) => (u.id === 'T1' ? { ...u, z: 1 } : u)), floors: 2 };
  assert.throws(() => technicalAction(offFloor, 'T1', 'GATE', 'VERIFY'), /not in position/);
});

test('extraction zone: only a living, standing unit inside the radius on that floor extracts', () => {
  const s = relay();
  assert.throws(() => extractUnit(s, 'T1'), /not in the extraction zone/);
  const inZone = { ...s, units: s.units.map((u) => (u.id === 'T1' ? { ...u, x: 10, y: 11 } : u)) };
  assert.ok(extractUnit(inZone, 'T1').mission.extractedUnitIds.includes('T1'));
  const corner = { ...s, units: s.units.map((u) => (u.id === 'T1' ? { ...u, x: 11, y: 11 } : u)) };
  assert.throws(() => extractUnit(corner, 'T1'), /not in the extraction zone/, 'Manhattan 2 > r 1');
  const downed = { ...inZone, units: inZone.units.map((u) => (u.id === 'T1' ? { ...u, downed: true } : u)) };
  assert.throws(() => extractUnit(downed, 'T1'), /cannot extract/);
});

/* ---------- performance ---------- */

test('performance: full reach over 64×64×2 with ~1500 blocker cells is well under 50 ms', () => {
  const r = lcg(2026);
  const blockers = [];
  const seen = new Set();
  while (blockers.length < 1500) {
    const b = { x: Math.floor(r() * 64), y: Math.floor(r() * 64), z: r() < 0.85 ? 0 : 1 };
    const k = `${b.x}:${b.y}:${b.z}`;
    if (seen.has(k) || b.x % 8 === 0 || b.y % 8 === 0) continue; // keep street corridors open
    seen.add(k); blockers.push(b);
  }
  const surfaces = [{ z: 1, x: 10, y: 10, w: 20, d: 12, height: 7 }, { z: 1, x: 36, y: 30, w: 18, d: 20, height: 6 }];
  const links = [{ id: 's1', from: { x: 9, y: 12, z: 0 }, to: { x: 10, y: 12, z: 1 }, cost: 2 }, { id: 's2', from: { x: 35, y: 32, z: 0 }, to: { x: 36, y: 32, z: 1 }, cost: 2 }];
  const s = beginPlayerPhase(createState({ width: 64, height: 64, floors: 2, blockers, surfaces, links,
    units: [{ id: 'P', faction: 'PLAYER', x: 0, y: 0 }, { id: 'H', faction: 'THREAT', x: 63, y: 63 }] }));
  computeReach(s, 'P', Infinity); // warm the JIT
  const fresh = { ...s, blockers: [...s.blockers] }; // defeat the geometry cache: time the index build too
  const t0 = performance.now();
  const reach = computeReach(fresh, 'P', Infinity);
  const ms = performance.now() - t0;
  assert.ok(reach.cells.length > 2500, `reached ${reach.cells.length}`);
  assert.ok(reach.cells.some((c) => c.z === 1), 'up the stairs');
  assert.ok(ms < 50, `reach took ${ms.toFixed(1)} ms`);
  const t1 = performance.now();
  for (let i = 0; i < 50; i += 1) hasLineOfSight(s, { x: 0, y: 0, z: 0 }, { x: 63, y: 40, z: 0 });
  assert.ok(performance.now() - t1 < 50, '50 long sight lines under 50 ms');
});

/* ---------- hints: preview = execution, display frame ---------- */

test('hints: knownPaths uses the resolver reach, includes the stair step, and the path executes as previewed', () => {
  const s = beginPlayerPhase(transit());
  const p = playerProjection(s);
  const { dist, pathTo, key } = knownPaths(p, 'P');
  assert.equal(dist.get(key(5, 5, 1)), 5);
  const route = pathTo(5, 5, 1);
  assert.deepEqual(route, [{ x: 2, y: 5, z: 0 }, { x: 3, y: 5, z: 0 }, { x: 4, y: 5, z: 1 }, { x: 5, y: 5, z: 1 }]);
  const moved = moveUnit(s, 'P', { x: 5, y: 5, z: 1 }, 'MOVE', { path: route });
  assert.deepEqual(moved.events.at(-1).path, route);
  assert.ok(legalCandidates(p, 'P').some((c) => c.z === 1 && c.x === 5 && c.y === 5 && c.steps === 5));
  assert.ok(!legalCandidates(p, 'P').some((c) => c.z === 1 && c.x > 7), 'never offers off-roof air');
});

test('hints: the display frame changes what the player reads, not the engine cells or the answer', () => {
  const make = (battlefield) => beginPlayerPhase(createState({ width: 10, height: 10,
    units: [{ id: 'E1', faction: 'PLAYER', role: 'E', x: 2, y: 7 }], objectives: [{ id: 'O' }],
    battlefield: { objectiveTiles: [{ id: 'O', x: 5, y: 3 }], ...battlefield } }));
  const bind = { tenantId: 't', playerId: 'p', missionId: 'm' };
  const plain = createChallenge(bind, playerProjection(make({})), 'E1');
  assert.match(plain.public.prompt, /\(2, 7\).*\(5, 3\)/);
  assert.equal('display' in plain.public.geometry, false);
  const framed = createChallenge(bind, playerProjection(make({ coordinateFrame: { x0: 1, y0: 9, yUp: true } })), 'E1');
  assert.match(framed.public.prompt, /\(1, 2\).*\(4, 6\)/);
  assert.deepEqual(framed.public.geometry.origin, { x: 2, y: 7 }, 'engine cells kept for drawing');
  assert.deepEqual(framed.public.geometry.display, { origin: { x: 1, y: 2 }, target: { x: 4, y: 6 } });
  assert.deepEqual(framed.secret.answer, plain.secret.answer);
  assert.ok(framed.secret.steps.every((l) => !/\b7\b/.test(l)), 'no engine row in the worked steps');
  const s = make({ coordinateFrame: { x0: 1, y0: 9, yUp: false } });
  const { session } = openHint(bind, s, 'E1');
  const a = session.challenge.secret.answer.value;
  const r = answerHint(session, bind, s, `${a.n}/${a.d}`);
  const sug = r.response.suggestion;
  assert.deepEqual(sug.display, { x: sug.x - 1, y: sug.y - 9 });
  assert.ok(r.response.why[0].includes(`(${sug.x - 1}, ${sug.y - 9})`));
});

test('adjacent cells on different floors: a floor slab between them blocks sight; open air over the lower cell does not', () => {
  const surfaces = [
    { id: 'upper', z: 1, x: 0, y: 0, w: 4, d: 4, height: 0 },
    { id: 'basement', z: 2, x: 0, y: 0, w: 4, d: 4, height: -4.1 },
    { id: 'roof', z: 3, x: 0, y: 0, w: 2, d: 4, height: 8 }
  ];
  const s = createState({ width: 6, height: 4, floors: 4, surfaces, units: [] });
  assert.equal(hasLineOfSight(s, { x: 1, y: 1, z: 1 }, { x: 2, y: 1, z: 2 }), false, 'Floor 1 does not see the basement next door through the slab');
  assert.equal(hasLineOfSight(s, { x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: 2 }), false, 'nor straight down');
  assert.equal(hasLineOfSight(s, { x: 2, y: 1, z: 2 }, { x: 1, y: 1, z: 1 }), false, 'symmetric');
  assert.equal(hasLineOfSight(s, { x: 1, y: 1, z: 3 }, { x: 2, y: 1, z: 1 }), true, 'a roof edge sees the open floor beside it');
  assert.equal(hasLineOfSight(s, { x: 1, y: 1, z: 1 }, { x: 3, y: 1, z: 2 }), false, 'two cells away the intermediate slab check already blocks');
});
