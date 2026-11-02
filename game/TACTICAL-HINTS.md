---
status: DRAFT
system: PRIM3 tactical core — optional learning-unlocked hints
code: game/runtime/tactical-hints.mjs (+ tactical-hints.test.mjs)
authority: game/TACTICAL-CORE-MECHANICS.yaml, game/runtime/tactical-resolver.mjs
---

# Optional learning-unlocked tactical hints

Owner direction (2026-11-02): normal turn-based play stays easy and needs no problem-solving. A player
*may* ask for a hint for the active unit; solving a learning challenge unlocks a legal, explained
suggestion. This supersedes earlier ideas of requiring an equation for every basic action.

## Flow
1. `openHint(binding, state, unitId)` in the PLAYER phase. `binding = {tenantId, playerId, missionId}`.
2. A challenge is generated from the current board and the unit's field:
   **E → math** (grid distance on this board; expected value at higher mastery),
   **R → science** (inverse-square falloff, rates), **T → IT** (subnet hosts, hex). A host may pass
   `field` to cross-train. Answers are checked with exact rational arithmetic — never a language model.
   `1.8`, `9/5`, `1.80` are the same answer.
3. `answerHint(session, binding, state, input)`:
   - wrong → a progressive step, play continues; after all steps, `revealAnswer` is allowed;
   - board changed since opening (any unit, AP, round, phase, known hostile) → `STALE_BOARD`;
   - another tenant/player → `NOT_YOUR_HINT`;
   - correct → the suggestion. Mastery evidence is recorded **once**, never after a reveal, and is
     marked `independent:false` when it took retries.
4. The hint **never acts**: no move, no AP spent (`autoAction:false`).

## Target-bound challenges
A host may pass `target` (the tile the player is previewing). The challenge then asks about that tile, the
public part carries `geometry` {origin, target, dx, dy} so the board can draw the two runs, and the target is
part of the binding: swapping it after solving makes the session stale.

## What the evaluator sees (fog of war)
Only `playerProjection(state)`: own squad, board geometry, cover, blockers, objectives and the hostiles
the player knows. Default "known" rule uses supported mechanics only (a living squad member has line of
sight and the hostile is within that member's `detectionRadius`); a host fog layer can pass
`knownEnemyIds` instead. Hidden hostiles, technical truth and RNG never enter the evaluator, so the
suggestion and the binding are identical whether or not an unseen hostile exists (tested).

## How it scores (deterministic, explicit weights — `WEIGHTS`)
Candidates: HOLD, plus every MOVE tile reachable by an **orthogonal step path over known geometry**
(`knownPaths`: walls and known units block a step; steps ≤ `moveRange`). That is stricter than the
resolver's `moveUnit`, which only checks destination distance; the phone preview uses the same function,
so the board never offers a tile the hint would refuse. Unknown hostiles can still block the real move.
For each candidate, using the resolver's own `shotPreview` on the projected board:
- objective progress (tiles closer to the nearest open objective; `battlefield.objectiveTiles`),
- expected incoming damage from known hostiles (Σ hit% × damage, crits included),
- expected outgoing damage if an action point remains,
- concealment break (inside a known hostile's detection radius while concealed).
Ties within `tieEpsilon` are reported. The wording always says "strong given what you know", never perfect.

## Known limits (stated, not invented)
- Objectives and LAB nodes have no positions in the resolver; positions come from
  `battlefield.objectiveTiles`. Without them the hint says no objective tile is known.
- `moveUnit` itself has no pathfinding (destination distance only); hints and the preview path-check over
  known walls. Making `moveUnit` enforce the same path is an engine rule change for the owner to approve.
- A hostile the player cannot see may occupy a suggested tile; the resolver will then refuse the move.
- Threat stats unknown to the player are the resolver's defaults; no damage/visibility rule is invented.
- Square grid only. A hex adapter must be a separate, separately verified module.
- Challenge bank is small and authored here; a verified LMS generator should replace it when one exists
  on a reachable ref (the private math LMS `5d76d704` is not on the remote).

## Movement legality (2026-11-02)

`moveUnit` validates the route, not only the endpoint:
- **Destination:** whole-tile coordinates on the unit's own floor, not a wall, not its current tile.
- **Server-side check:** without a supplied route, the resolver finds the shortest orthogonal path around walls and units (`findPath`) within the move or dash range. If none exists, it refuses and spends nothing.
- **Supplied route:** a client passes the route the player chose: `moveUnit(state, id, dest, mode, { path })`, planned with `knownPaths` over what the player knows. The resolver checks each step for bounds, walls, adjacency and range. If a step meets a unit the player could not know about, the move stops on the last free tile, the AP is spent, and a `MOVE_INTERRUPTED` event is recorded. A refusal therefore never reveals a hidden unit before contact.
- **Recorded path:** `MOVE`/`DASH` events carry the walked `path`, so a renderer animates the committed route, not its own guess.
