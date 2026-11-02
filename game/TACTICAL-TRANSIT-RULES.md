---
status: DRAFT
system: PRIM3 tactical core — floors, heights, overwatch, positioned interactions, threat AI
code: game/runtime/tactical-resolver.mjs, game/runtime/tactical-threat-ai.mjs, game/runtime/tactical-hints.mjs
tests: game/runtime/tactical-transit-rules.test.mjs, game/runtime/tactical-threat-ai.test.mjs
authority: game/TACTICAL-CORE-MECHANICS.yaml, game/XCOM2-MECHANIC-ADAPTATION-AUTHORITY.md
approved: owner, 2026-11-02 (engine work for the Transit / Relay level)
---

# Floors, heights, reaction fire and threat turns

Every addition is opt-in through config. A state created without these fields behaves exactly as
before (tested against a verbatim copy of the original sight and path rules).

## New config (createState)
| Field | Meaning |
| --- | --- |
| `surfaces: [{ z, x, y, w, d, height }]` | Walkable rects on upper floors. With it, a cell on `z > 0` is walkable only inside a rect of that `z`. `height` = metres, used for sight. Without it, every in-bounds cell on every floor is walkable (original rule). |
| `links: [{ id, from:{x,y,z}, to:{x,y,z}, cost }]` | Stairs/ladders, both ways. `cost` = whole movement steps ≥ 1. |
| `blockers[i].h` | Blocker height in metres. Absent = full-height wall. |
| `seed` | Seed for `state.rng = { seed, n }` (default 1). |
| `nodes[i].at = { x, y, z, range, roles }` | Positioned interaction: the actor must be on that floor within Manhattan `range` (default 1) and, if `roles` is given, have a listed role. |
| technical truth `effectOnVerified.removeBlockers: [{x,y,z}]` | Removes those blockers when the node becomes VERIFIED (a gate opening). Not copied into `battlefield`. |
| `battlefield.extractionZone = { x, y, z, r }` | `extractUnit` requires a living, standing unit within Manhattan `r` on that floor. |
| `battlefield.coordinateFrame = { x0, y0, yUp }` | Hints only: the coordinates a player reads become `X = x − x0`, `Y = yUp ? y0 − y : y − y0`. |
| unit `weaponRange` (optional) | Shots beyond it are illegal (`OUT_OF_RANGE`). Absent = no maximum (range penalty only, as before). |
| unit `patrol` (optional) | Cells an unaware threat walks between. |

## Rules and the values chosen where canon is silent
Canon requires vertical floors, stairs/ladders, elevation, line of sight from geometry and elevation,
overwatch reaction fire, and hostile awareness by local senses plus an alert network, with no access to
the learner model. It gives no numbers for the following; these are conservative, tunable values:

- **Eye height 1.6 m** above the surface a unit stands on (0 on the ground, the surface `height` on a roof).
- **Sight across floors** (only with `surfaces`): the eye-to-eye line is blocked by a blocker whose
  vertical span overlaps the line's height across that cell, or by a roof slab it passes through
  (slab = the top **0.3 m** of a surface on floor ≥ 1). A ground blocker without `h` reaches the roof above
  it (or, in the open, the lowest roof height on floor 1); an upper-floor blocker sits on its surface.
  Same-floor results without heights equal the original rule.
- **Distance across floors**: Manhattan x/y, only with `surfaces`; otherwise Infinity (original).
- **Elevation bonus**: unchanged, attacker on a higher floor +10.
- **Overwatch reaction aim penalty: −15.** Canon names overwatch (1 AP, reaction fire on hostile
  movement) but sets no aim modifier; −15 is the conventional value for the genre.
- **Overwatch trigger**: each step of the walked path (including the first). Every opposing watcher with a
  legal shot fires once: overwatch consumed, no AP, one round of ammo, firing breaks its concealment. A
  concealed mover is a target only once that watcher detects it (radius + sight), which breaks its
  concealment. A downed or killed mover stops on that cell. Two rolls per shot (hit, crit).
- **Rolls**: `moveUnit(..., { rolls })` takes an array (consumed in order, then the state PRNG) or a
  function returning 0–99; otherwise the seeded `state.rng`.
- **Overwatch and hunker expiry**: at the start of the unit's own side's next phase (already the case).
- **Movement into a link**: a link step costs `cost`; a route's total cost must fit the move range.

## Threat AI (`runThreatPhase(state, { rng })`)
Acts only through the resolver's actions. Awareness: a player unit is known when any living threat
detects it now (alert network), or it shot at a threat this round. Unaware threats hold or walk their
patrol and never shoot. Aware threats, in unit order: fire at ≥ 50 % (firing ends the activation);
else reload an empty magazine; else MOVE (never dash) to the best reachable tile (cover facing the
nearest known target: HIGH 3 / LOW 2; a legal shot: 2 + hit% / 100; ≥ 3 tiles from every known player:
+1, else −2; ties: lower cost, then z, y, x), then fire if any shot is legal, else overwatch.
Planning treats only threats and known players as occupied; an unknown player on the route interrupts
the move exactly as for the player side. Deterministic for a given state and rng.

## Known limits
- Sight samples Bresenham cells with a half-tile height window: a coarse, conservative approximation, not ray casting.
- Concealment on the move is still checked at the stop cell, except where an overwatching enemy detects the mover.
- The threat AI has no flanking or grenade logic, does not coordinate beyond shared knowledge, and fires
  any legal shot with leftover AP even when it is poor.

## Extension
Machines, weapons and levels, T technology control and hostile re-take: [`TACTICAL-T-CONTROL-RULES.md`](TACTICAL-T-CONTROL-RULES.md) (DRAFT, owner numbers 2026-11-02).
