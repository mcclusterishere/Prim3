import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, beginPlayerPhase, moveUnit, shotPreview } from './tactical-resolver.mjs';
import {
  playerProjection, knownEnemyIds, legalCandidates, evaluate, parseAnswer, createChallenge,
  openHint, answerHint, revealAnswer, bindingKey, WEIGHTS
} from './tactical-hints.mjs';

const BIND = { tenantId: 'tenant-a', playerId: 'player-1', missionId: 'TR02' };

function board(extraUnits = [], extra = {}) {
  return beginPlayerPhase(createState({
    width: 10, height: 10, floors: 1,
    units: [
      { id: 'E1', faction: 'PLAYER', role: 'E', x: 1, y: 1, moveRange: 4, detectionRadius: 6, aim: 75 },
      { id: 'T1', faction: 'PLAYER', role: 'T', x: 1, y: 2, moveRange: 4, detectionRadius: 6 },
      { id: 'H1', faction: 'THREAT', x: 6, y: 1, aim: 70, detectionRadius: 3 },
      ...extraUnits
    ],
    cover: [{ x: 3, y: 2, type: 'HIGH', sides: ['E'] }, { x: 3, y: 0, type: 'LOW', sides: ['E'] }],
    blockers: [{ x: 2, y: 5 }],
    objectives: [{ id: 'NODE', required: true }],
    battlefield: { objectiveTiles: [{ id: 'NODE', x: 4, y: 4 }] },
    ...extra
  }));
}

function solve(session) { // the server knows the answer; tests use it to play the honest player
  const a = session.challenge.secret.answer;
  return a.kind === 'bool' ? (a.value ? 'yes' : 'no') : `${a.value.n}/${a.value.d}`;
}

test('baseline play needs no challenge: every core action works with no hint module involved', () => {
  let s = board();
  s = moveUnit(s, 'E1', { x: 3, y: 2 }, 'MOVE');
  assert.equal(s.units.find((u) => u.id === 'E1').x, 3);
  assert.ok(shotPreview(s, 'E1', 'H1').legal);
});

test('answers: correct, equivalent forms, wrong and unreadable', () => {
  assert.deepEqual(parseAnswer('9/5'), parseAnswer('1.8'));
  assert.deepEqual(parseAnswer('1.80'), parseAnswer('18/10'));
  assert.deepEqual(parseAnswer(' 6 '), parseAnswer('0x6'));
  assert.equal(parseAnswer('lol'), null);
  assert.equal(parseAnswer('1.2345678'), null);

  const { session } = openHint(BIND, board(), 'E1');
  const correct = session.challenge.secret.answer.value;
  const decimal = String(correct.n / correct.d);
  const r = answerHint(session, BIND, board(), decimal);
  assert.equal(r.response.ok, true, 'a decimal equal to the fraction is accepted');

  const w = answerHint(session, BIND, board(), '999');
  assert.equal(w.response.code, 'WRONG');
  assert.equal(w.response.attempts, 1);
  assert.ok(w.response.nextStep, 'a wrong answer gets the first progressive step');
  assert.equal(answerHint(session, BIND, board(), '???').response.code, 'UNREADABLE');
});

test('field emphasis: E math, R science, T IT; explicit field override allowed', () => {
  const p = playerProjection(board([{ id: 'R1', faction: 'PLAYER', role: 'R', x: 0, y: 0 }]));
  assert.equal(createChallenge(BIND, p, 'E1').public.field, 'MATH');
  assert.equal(createChallenge(BIND, p, 'R1').public.field, 'SCIENCE');
  assert.equal(createChallenge(BIND, p, 'T1').public.field, 'IT');
  assert.equal(createChallenge(BIND, p, 'T1', { field: 'MATH' }).public.field, 'MATH');
  assert.notEqual(createChallenge(BIND, p, 'E1', { mastery: 3 }).public.skill, createChallenge(BIND, p, 'E1').public.skill, 'mastery unlocks the harder challenge');
  assert.equal(createChallenge(BIND, p, 'E1').public.prompt.includes('answer'), false, 'the public part never carries the answer');
  assert.equal('secret' in createChallenge(BIND, p, 'E1').public, false);
});

test('the board challenge is computed from this board with the resolver distance rule', () => {
  const p = playerProjection(board());
  const ch = createChallenge(BIND, p, 'E1');
  assert.equal(ch.public.skill, 'math.manhattan-distance');
  assert.deepEqual(ch.secret.answer.value, { n: 6, d: 1 }); // (1,1) → objective (4,4)
});

test('a correct answer unlocks a LEGAL suggestion and never acts', () => {
  const s = board();
  const { session } = openHint(BIND, s, 'E1');
  const r = answerHint(session, BIND, s, solve(session));
  assert.equal(r.response.ok, true);
  assert.equal(r.response.autoAction, false);
  const sug = r.response.suggestion;
  if (sug.action === 'MOVE') assert.doesNotThrow(() => moveUnit(s, 'E1', sug, 'MOVE'), 'the suggestion is accepted by the real resolver');
  assert.equal(s.units.find((u) => u.id === 'E1').ap, 2, 'no AP spent by the hint');
  assert.ok(r.response.why.some((l) => /not a guaranteed/.test(l)), 'never called perfect or guaranteed');
  assert.ok(r.response.masteryEvidence && r.response.masteryEvidence.independent);
});

test('candidates obey square bounds, move range, blockers and occupancy', () => {
  const p = playerProjection(board());
  const c = legalCandidates(p, 'E1');
  for (const t of c) {
    assert.ok(t.x >= 0 && t.y >= 0 && t.x < 10 && t.y < 10);
    assert.ok(Math.abs(t.x - 1) + Math.abs(t.y - 1) <= 4);
  }
  assert.ok(!c.some((t) => t.x === 1 && t.y === 2), 'own squad tile excluded');
  const fenced = playerProjection(beginPlayerPhase(createState({ width: 3, height: 3, units: [{ id: 'E1', faction: 'PLAYER', role: 'E', x: 0, y: 0, moveRange: 9 }] })));
  assert.equal(legalCandidates(fenced, 'E1').length, 9, '8 tiles + HOLD on a 3×3 board, nothing outside it');
});

test('fog of war: a hidden hostile changes neither the hint nor the binding', () => {
  const plain = board();
  const withHidden = board([{ id: 'H9', faction: 'THREAT', x: 9, y: 9, aim: 99, detectionRadius: 9 }], { blockers: [{ x: 2, y: 5 }, { x: 8, y: 8 }, { x: 8, y: 9 }, { x: 9, y: 8 }] });
  // H9 is far and boxed in: no player has line of sight within detection range
  assert.equal(knownEnemyIds(withHidden).has('H9'), false);
  const a = evaluate(playerProjection(plain), 'E1');
  const b = evaluate(playerProjection({ ...withHidden, blockers: plain.blockers }), 'E1');
  assert.deepEqual(b.top, a.top);
  assert.equal(playerProjection(withHidden).units.some((u) => u.id === 'H9'), false, 'hidden units never enter the projection');
  // host-provided fog layer wins: listing nobody hides even a visible hostile
  assert.equal(playerProjection(plain, { knownEnemyIds: [] }).units.some((u) => u.faction === 'THREAT'), false);
});

test('a changed board invalidates the hint (stale turn / moved unit / new round)', () => {
  const s = board();
  const { session } = openHint(BIND, s, 'E1');
  const moved = moveUnit(s, 'T1', { x: 0, y: 2 }, 'MOVE');
  assert.equal(answerHint(session, BIND, moved, solve(session)).response.code, 'STALE_BOARD');
  const nextRound = beginPlayerPhase(s);
  assert.equal(answerHint(session, BIND, nextRound, solve(session)).response.code, 'STALE_BOARD');
});

test('unit and account isolation', () => {
  const s = board();
  assert.throws(() => openHint(BIND, s, 'H1'), /UNKNOWN_OR_FOREIGN_UNIT/);
  const { session } = openHint(BIND, s, 'E1');
  assert.equal(answerHint(session, { ...BIND, playerId: 'player-2' }, s, solve(session)).response.code, 'NOT_YOUR_HINT');
  assert.equal(answerHint(session, { ...BIND, tenantId: 'tenant-b' }, s, solve(session)).response.code, 'NOT_YOUR_HINT');
  const p = playerProjection(s);
  assert.notEqual(bindingKey(BIND, p, 'E1'), bindingKey({ ...BIND, playerId: 'player-2' }, p, 'E1'));
  assert.notEqual(bindingKey(BIND, p, 'E1'), bindingKey(BIND, p, 'T1'));
});

test('retry safety: wrong answers do not freeze play, a repeat correct answer earns no second reward', () => {
  const s = board();
  let { session } = openHint(BIND, s, 'E1');
  for (let i = 0; i < 2; i += 1) session = answerHint(session, BIND, s, '12345').session;
  assert.doesNotThrow(() => moveUnit(s, 'E1', { x: 2, y: 1 }, 'MOVE'), 'normal play continues while a hint is open');
  const first = answerHint(session, BIND, s, solve(session));
  assert.ok(first.response.masteryEvidence);
  assert.equal(first.response.masteryEvidence.independent, false, 'solved after retries is not "independent"');
  const again = answerHint(first.session, BIND, s, solve(session));
  assert.equal(again.response.already, true);
  assert.equal(again.response.masteryEvidence, undefined);
  assert.equal(again.session.rewardIssued, true);
});

test('a revealed answer unlocks the hint but never counts as mastery', () => {
  const s = board();
  let { session } = openHint(BIND, s, 'E1');
  assert.equal(revealAnswer(session).response.code, 'KEEP_TRYING');
  for (let i = 0; i < session.challenge.secret.steps.length; i += 1) session = answerHint(session, BIND, s, '12345').session;
  session = revealAnswer(session).session;
  const r = answerHint(session, BIND, s, solve(session));
  assert.equal(r.response.ok, true);
  assert.equal(r.response.masteryEvidence, null);
});

test('deterministic scoring, explicit weights, ties reported', () => {
  const p = playerProjection(board());
  assert.deepEqual(evaluate(p, 'E1'), evaluate(p, 'E1'));
  // open, symmetric board: several tiles reach the objective equally
  const open = playerProjection(beginPlayerPhase(createState({ width: 9, height: 9,
    units: [{ id: 'E1', faction: 'PLAYER', role: 'E', x: 4, y: 0, moveRange: 2 }],
    objectives: [{ id: 'O', required: true }], battlefield: { objectiveTiles: [{ id: 'O', x: 4, y: 8 }] } })));
  const r = evaluate(open, 'E1');
  assert.equal(r.top.features.objectiveProgress, 2);
  assert.ok(r.ties.length >= 1);
  assert.equal(WEIGHTS.incomingExpectedDamage, 1);
});

test('cover and exposure come from the resolver: high cover facing the hostile beats open ground', () => {
  const p = playerProjection(board());
  const r = evaluate(p, 'E1');
  const covered = r.candidates.find((c) => c.x === 3 && c.y === 2);
  const open = r.candidates.find((c) => c.x === 3 && c.y === 1);
  assert.ok(covered.features.incomingExpected < open.features.incomingExpected);
});

test('unreachable or unknown objective: said plainly, no invented progress', () => {
  const noTiles = board([], { battlefield: {} });
  const { session } = openHint(BIND, noTiles, 'E1');
  const r = answerHint(session, BIND, noTiles, solve(session));
  assert.ok(r.response.why.some((l) => /No reachable objective tile is known/.test(l)));
  assert.ok(r.response.suggestion.features.objectiveProgress === 0);
  const otherFloor = board([], { floors: 2, battlefield: { objectiveTiles: [{ id: 'NODE', x: 4, y: 4, z: 1 }] } });
  const e = evaluate(playerProjection(otherFloor), 'E1');
  assert.equal(e.objective.distance, Infinity);
});

test('hints only in the player phase; a unit with no AP gets HOLD only', () => {
  const brief = createState({ units: [{ id: 'E1', faction: 'PLAYER', role: 'E', x: 0, y: 0 }] });
  assert.throws(() => openHint(BIND, brief, 'E1'), /PLAYER_PHASE/);
  const s = board();
  const spent = moveUnit(moveUnit(s, 'E1', { x: 2, y: 1 }, 'MOVE'), 'E1', { x: 3, y: 1 }, 'MOVE');
  assert.deepEqual(legalCandidates(playerProjection(spent), 'E1').map((c) => c.action), ['HOLD']);
});
