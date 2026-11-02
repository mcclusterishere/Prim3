---
status: DRAFT (owner direction and numbers signed off 2026-11-02; engine work next)
system: Operators / Field T — level-one primary and level-two unlock
owner_direction_date: 2026-11-02
---

# T at level one: technology is the main arm

## Owner direction (2026-11-02)

> "They gotta get to level 2 ... not a sidearm, a main arm ... make their main arm be like the ability to control technology."

What this means:
- **Level 1:** T has **no long gun**. T keeps the **holstered sidearm** from LOADOUTS.md (FO-T-STD: "a sidearm only, no long gun"). T's primary is **control of technology**, through the field cyberdeck.
- **Level 2:** T unlocks a **main arm**, a long gun. Which weapon is still open; it needs its own loadout pair (LOADOUTS.md: a new profile is a new pair, never a silent edit).
- The equipment draft **T01 Technical carbine** therefore becomes T's **level-two** primary, not level one (`../equipment/level1-drafts/CANON-RECONCILIATION.md`).

This fits existing canon:
- `game/KINETIC-TECHNICAL-COUPLING-AUTHORITY.md` gives T a combat identity of "sidearm self-defense ... occasional environment/system interaction that is stronger than firing".
- The same file says technical work can "change cameras, remove an enemy control path".
- `game/TACTICAL-CORE-MECHANICS.yaml` already allows `promotions_and_ability_unlocks: true`.

## Proposed level-one control actions (numbers for owner sign-off)

All of these target **machines**, a new battlefield object class: security camera, sentry turret, powered door, floodlight, comms repeater (later: drones). People are never targets.

Each machine needs four things:
- a position;
- a faction (who it serves);
- a state: ACTIVE, JAMMED or CONTROLLED;
- an effect: a camera spots like a unit with a detection radius; a turret has overwatch; a door is a removable blocker; a floodlight lights tiles.

| Action | AP | Reach | Effect | Limit |
|---|---|---|---|---|
| **JAM** | 1 | A machine in T's line of sight, ≤ 8 tiles | The machine is JAMMED until T's next turn: cameras stop spotting, turrets cannot fire, doors stay as they are, lights go dark | none |
| **TAKE CONTROL** | 2 | A machine in line of sight, ≤ 6 tiles, already *observed* (seen this turn by T, or marked by R) | The machine is CONTROLLED and serves the squad until a hostile re-takes it, which is possible only after 3 rounds: a camera adds its sight to the squad's fog of war, a turret takes overwatch against threats, a door opens or locks on T's command | One controlled machine at a time |
| **SYNC PULSE** (the T04 puck) | 1 | Thrown to a tile ≤ 5 tiles away, in line of sight | Visible **area effect**, radius 3: every compatible machine in the area is JAMMED for 1 round. Hostiles in the area lose the alert network for 1 round: they share nothing they spot | Once per mission at level 1 |

Rules these follow (unchanged canon):
- Technical truth is deterministic; no dice for control actions. Combat stays stochastic.
- An action is offered only when the engine accepts it, and the preview shows exactly what will change.
- Machines and their states are information. A machine the squad has not seen is never shown or targetable (fog of war).
- Each action is a resolver action with events (`MACHINE_JAMMED`, `MACHINE_CONTROLLED`, `SYNC_PULSE`), so the renderer only plays them.

## Owner decisions (2026-11-02)

1. **Numbers approved:** JAM ≤ 8 tiles; TAKE CONTROL ≤ 6 tiles; SYNC PULSE radius 3, thrown ≤ 5, once per mission at level one.
2. **Level two: the main arm joins the sidearm.** T then carries both. From level two on, tech control is available **only while the sidearm is the ready weapon**. With the main arm up, T cannot use JAM, TAKE CONTROL or SYNC PULSE.
   - Switching weapons is an action.
   - Engine default: **1 AP to switch**, held as data so it can be tuned.
3. **Hostiles can re-take a controlled machine, after about 3 turns.**
   - A machine the squad controls is protected for **3 rounds**.
   - After that, an aware hostile with line of sight within 6 tiles may spend 2 AP to re-take it, and it serves them again.
   - Without a re-take, control stays with the squad.

## Questions that were put to the owner (answered above)

1. **Ranges and counts:** are 8 / 6 / radius 3, once per mission, right for level one?
2. **The level-two main arm:** which weapon, and does it replace the sidearm or join it?
3. **Hostile counterplay:** at level one, can threats re-take a controlled machine (an enemy technician), or not?

When these are signed off:
- the rules go into `game/runtime/tactical-resolver.mjs`, with tests;
- Transit / Relay gets machines: cameras on B-1 and C-3, a sentry turret by the relay, and the service gate becomes a powered door T can open;
- the game re-vendors the engine.
