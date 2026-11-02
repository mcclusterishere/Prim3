---
status: DRAFT
system: PRIM3 tactical core — machines, weapons and levels, T technology control, hostile re-take
code: game/runtime/tactical-resolver.mjs, game/runtime/tactical-threat-ai.mjs, game/runtime/tactical-hints.mjs
tests: game/runtime/tactical-t-control-rules.test.mjs
authority: phenotypes/operators/field-technical/T-LEVEL1-CONTROL-DRAFT.md ("Owner decisions", signed off 2026-11-02),
  game/KINETIC-TECHNICAL-COUPLING-AUTHORITY.md (T = sidearm self-defense + system interaction)
previous extension: game/TACTICAL-TRANSIT-RULES.md
---

# T technology control

Every addition is opt-in through config. A state created without `machines`, unit `weapons` /
`level`, `switchWeaponAp` or `syncPulsePerMission` has no new keys and behaves exactly as before;
all 74 earlier tests pass unchanged.

Source tags: **owner** = owner decision, 2026-11-02 (T-LEVEL1-CONTROL-DRAFT.md); **chosen** = an
engine default picked here where the owner did not set a value; tunable without touching canon.

## New config

| Field | Meaning | Source |
| --- | --- | --- |
| `machines: [{ id, kind, x, y, z, faction, detectionRadius?, aim?, weaponDamage?, crit?, critBonus?, weaponRange?, cells?, open?, markedBy? }]` | Battlefield machines. `kind`: `CAMERA`, `TURRET` or `DOOR`. `faction`: `THREAT` (default) or `PLAYER`. Machines are not units. Floodlights and repeaters are out of scope. | owner (classes), chosen (fields) |
| machine `detectionRadius` | Default **5** (the unit default). Used by cameras to spot and by turrets to detect a concealed mover. | chosen |
| turret `aim`, `weaponDamage`, `crit`, `critBonus` | Defaults **70 / 3 / 10 / 2** (the unit defaults). No ammo: a turret never runs dry. | chosen |
| door `cells` | Default: the door's own tile. Blockers while the door is closed. | owner |
| door `open` | Default **false** (closed). | chosen |
| unit `level` | Default 1. | owner |
| unit `weapons: { main?, sidearm? }` | Each a set of shot stats (`aim`, `weaponDamage`, `crit`, `critBonus`, `ammo`, `magazineSize`, `weaponRange`). A missing stat falls back to the unit's own value. | owner (main + sidearm), chosen (fallback) |
| unit `readyWeapon` | `main` or `sidearm`. Default: `main` if carried, else `sidearm`. Naming a weapon the unit does not carry is a config error. | chosen (default) |
| `switchWeaponAp` | AP to switch weapons. Default **1**. | owner ("engine default 1 AP, held as data") |
| `syncPulsePerMission` | Pulses per T per mission. Default **1**. | owner (once per mission at level 1) |

State: `state.machines[i]` carries `state` (`ACTIVE` / `JAMMED` / `CONTROLLED`), `jammedUntilRound`,
`jammedPhase`, `resumeState`, `controlledSinceRound`, `controlledBy`, `homeFaction`, `markedBy`
and `playerSeen` (the player side's last sighting). A closed door's cells are in `state.blockers`
tagged `door: <id>`. Units may gain `syncPulsesUsed` and `networkSilencedUntilRound`.

## Machines

- **Camera**: an ACTIVE (or squad-CONTROLLED) camera spots for its faction like a unit: its own
  `detectionRadius`, the existing height-aware line of sight. A hostile camera breaks concealment
  exactly as unit detection does (at the mover's stop cell, `CONCEALMENT_BROKEN` / `DETECTION`) and
  feeds the threat alert network. A camera the squad controls (or owns) adds its sight to the
  player's fog of war. A JAMMED camera does neither. (owner)
- **Turret**: an ACTIVE or CONTROLLED turret always holds overwatch for its faction and fires on
  opposing movement with the existing reaction rules: −15 reaction aim, two rolls (hit, crit), a
  concealed mover only once the turret detects it. It re-arms without limit but fires **at most once per
  mover per move** (chosen). Turrets fire after unit overwatch on the same step (chosen). It cannot move.
  Event `TURRET_SHOT`. A JAMMED turret does not fire. (owner)
- **Door**: closed = its cells are walls (movement and sight). JAM does not change open or closed. (owner)
- Cameras and turrets do not occupy or block tiles. (chosen)

## Weapons and levels

With `weapons`, `shotPreview`, `fireWeapon` and `reload` use the ready weapon's stats and magazine;
the unit's top-level shot stats always mirror the ready weapon. Each weapon keeps its own magazine;
`reserveAmmo` is shared (chosen). Without `weapons`, nothing changes.

`switchWeapon(state, unitId)`: costs `switchWeaponAp` (1). Refused: `NO_OTHER_WEAPON`, `NOT_ENOUGH_AP`,
`INVALID_UNIT_STATE`. Event `WEAPON_SWITCHED { unitId, readyWeapon, apCost }`.

## Technology control (T only)

Allowed when `role === 'T'` and (`level === 1` or `readyWeapon === 'sidearm'`). A level ≥ 2 T with the
main arm ready is refused (`MAIN_ARM_READY`), as is a level ≥ 2 T with no `weapons` at all (no sidearm
ready). (owner) Every control action is deterministic: no rolls. A refusal throws before anything is
spent; `techActionPreview` returns the same verdict without acting.

| Action | AP | Reach | Needs | Effect | Source |
| --- | --- | --- | --- | --- | --- |
| `jamMachine(state, actorId, machineId)` | 1 | ≤ 8 tiles, line of sight | observed; not the squad's own; not already jammed | `JAMMED` until the start of the actor's next phase | owner (AP, range, duration); chosen (no re-jam, no own machines) |
| `takeControl(state, actorId, machineId)` | 2 | ≤ 6, line of sight | observed; not the squad's own | `faction: PLAYER`, `CONTROLLED`, `controlledSinceRound = round`. One per actor: the previous one goes back to its own faction, ACTIVE (`MACHINE_RELEASED`). Taking a jammed machine clears the jam. | owner; chosen (jam cleared) |
| `operateDoor(state, actorId, machineId, open)` | 1 | ≤ 6, line of sight | a door CONTROLLED by the squad (not jammed) | opens (blockers removed) or closes (blockers restored); refuses to close on an occupied cell | owner (operate); chosen (AP, range, sight) |
| `syncPulse(state, actorId, {x,y,z})` | 1 | target tile ≤ 5, line of sight | `syncPulsesUsed < syncPulsePerMission` | radius 3 (Manhattan, target floor): every machine JAMMED for 1 round (same expiry as JAM); every opposing living unit `NETWORK_SILENCED` | owner; owner 2026-11-02: own machines inside are jammed too, and the once-per-mission limit holds at level ≥ 2 unless T has the optional level-2 upgrade (extra pulses; amount to come from the attribute matrix); chosen: no sight check inside the area |

Refusal codes: `UNKNOWN_UNIT`, `INVALID_UNIT_STATE`, `NOT_TECHNICIAN`, `MAIN_ARM_READY`,
`UNKNOWN_MACHINE`, `FRIENDLY_MACHINE`, `ALREADY_JAMMED`, `NOT_OBSERVED`, `NOT_A_DOOR`,
`NOT_CONTROLLED`, `MACHINE_JAMMED`, `ALREADY_OPEN`, `ALREADY_CLOSED`, `DOOR_OCCUPIED`,
`INVALID_TARGET`, `PULSE_SPENT`, `OUT_OF_RANGE`, `NO_LINE_OF_SIGHT`, `NOT_ENOUGH_AP`, and for the
actions below `NOT_RECON`, `ALREADY_MARKED`, `NOT_HOSTILE`, `PROTECTED`. Checks run in that order
(role and level first, AP last).

Distances are `gridDistance` with the state (Manhattan; across floors only when `surfaces` are
configured). Line of sight is the actor's eye line to the machine's tile.

## Observed

A machine is observed by the player side when, at the moment of the action, a living, standing player
unit or a working player camera has it within its detection radius and in line of sight, or a player
unit is in `markedBy`, or the machine serves the squad (owned or controlled). (owner; downed units do
not observe and the squad always knows its own machines: chosen)

`markMachine(state, actorId, machineId)` (R only): 1 AP, line of sight, within the R's detection radius.
Adds the R to `markedBy`; a mark lasts the mission (chosen). Event `MACHINE_MARKED`.

## Re-take (hostile)

`retakeMachine(state, hostileId, machineId)`: 2 AP, ≤ 6 tiles, line of sight, only when
`round − controlledSinceRound ≥ 3` (refused `PROTECTED` before). The machine returns to
`faction: THREAT`, ACTIVE. The squad learns of the lost link at once (its last sighting is updated).
Control otherwise stays with the squad, including if the controlling T goes down (chosen). (owner)

## Phase upkeep

- JAMMED ends at the start of the jamming side's next phase (`jammedUntilRound`, `jammedPhase`); the
  machine returns to the state it had (ACTIVE or CONTROLLED). Event `MACHINE_RESTORED { machineId, state }`
  (chosen: an added event, so a renderer that only plays events can show it).
- `NETWORK_SILENCED` ends at the start of the unit's next-but-one THREAT phase
  (`networkSilencedUntilRound`): a pulse in the player phase of round r silences the THREAT phase of
  round r and ends at the THREAT phase of round r + 1. (owner: "for 1 round")
- Overwatch and hunker are unchanged.

## Events

`MACHINE_JAMMED { actorId, machineId, kind, untilRound, untilPhase }`,
`MACHINE_CONTROLLED { actorId, machineId, kind, round }`,
`MACHINE_RELEASED { actorId, machineId, kind, faction }`,
`DOOR_OPERATED { actorId, machineId, open, cells }`,
`SYNC_PULSE { actorId, at, radius, machines, units }`,
`MACHINE_RETAKEN { hostileId, machineId, kind }`,
`WEAPON_SWITCHED { unitId, readyWeapon, apCost }`,
`MACHINE_MARKED { actorId, machineId, kind }`,
`TURRET_SHOT { watcherId, targetId, at, hit, critical, damage, hitChance, machineId }` (as `OVERWATCH_SHOT`, `watcherId` = the turret id),
`MACHINE_RESTORED { machineId, state }`.
Status: `NETWORK_SILENCED`.

## Player projection and hints

- `playerProjection(state).machines` (present only when the state has `machines`): machines observed now
  (live values, `observed: true`) and machines observed before (their last sighting, `observed: false`,
  `lastSeenRound`). A machine never observed is absent. `knownMachines(state)` in the resolver returns
  the same list.
- Fog of war: cameras the squad controls or owns see for the squad.
- `blockers`: a closed door the player knows of is a wall (`door: <id>`); a door the player has never
  observed (or last saw open) is not. `knownPaths` therefore plans through it, and `moveUnit` with that
  route stops on the last free tile with `MOVE_INTERRUPTED` (AP spent), exactly as for an unseen unit.
  Without a supplied route the resolver plans authoritatively around every closed door.
- The concealment term of the hint evaluator also counts known hostile ACTIVE cameras.

## Threat AI

- Awareness includes hostile ACTIVE cameras.
- A `NETWORK_SILENCED` threat neither shares nor receives alert knowledge: it knows only what it detects
  itself and who shot at it this round (`threatKnowledge(state, unitId)`); the network view
  `threatKnowledge(state)` leaves it out.
- An aware threat that the resolver allows to re-take a squad-controlled machine (2 AP, ≤ 6, line of
  sight, protection over) does so before anything else: turret, then camera, then door; ties by
  distance, then id. That uses its 2 AP.
- Hostiles know their own facility's doors: the AI plans around every closed door (chosen).
- Deterministic for a given seed; never reads the learner model or technical truth (unchanged test).

## Known limits

- `SYNC_PULSE` and other events list every affected machine, including ones the player has not
  observed: the event log is authoritative, and a client must filter it through the projection.
- The hint evaluator does not score turret fire or offer control actions as suggestions.
- The threat AI does not avoid squad-controlled turrets when it moves.
- Concealment against cameras is checked at the mover's stop cell, as for units.
- The level-two main arm itself is still open (owner): `weapons.main` is generic stats.

## Owner decisions after implementation (2026-11-02)

- **Sync Pulse at level 2:** still once per mission by default. Extra pulses are an **optional level-2 upgrade**. The amount and cost will come from the owner's attribute matrix, which is being built separately; until then `syncPulsePerMission` (global) is the only knob. A per-unit override for the upgrade is the expected follow-up.
- **Sync Pulse jams the squad's own machines** inside its area. Confirmed by the owner, now canon for this draft.
