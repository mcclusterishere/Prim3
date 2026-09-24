---
status: DRAFT
system: PRIM3 <-> Equity Uprise battlefield assimilation preparation
version: 0.1.0
owner: Matthew McCluster
authority: Development proposal only; subordinate to CANON.md and current game authorities
---

# Equity Uprise Battlefield Assimilation Prep

## Purpose

Prepare PRIM3 to use the canonical Equity Uprise digital twin as an assaultable and defensible tactical environment **without merging the two systems yet**.

This is an integration-prep document, not a canon change and not permission to modify Equity Uprise geometry.

The desired long-term result is:

> PRIM3 units fight for control of a real simulated facility whose cameras, access control, power, wireless, network, services, sensors and technical faults all affect what the player can see and do.

The building must remain a systems model first. PRIM3 consumes its state; PRIM3 does not flatten infrastructure into arbitrary health bars.

## Audit basis

This preparation was written against:

- PRIM3 repository: `mcclusterishere/Prim3` main at `74491526b46e175aff7f71ac625d3d63e0eadde0`.
- McCluster / Equity Uprise authority: `mcclusterishere/mccluster` main at `1a1777aed1e0779097e1294731b008b984a934b0`.

Do **not** turn either SHA into a permanent dependency. Runtime/import contracts must validate schema/status/capability and record the source commit used for a session.

Current Equity Uprise electronics report at that audit point:

- 1,883 canonical registry assets;
- 1,330 routed physical connections;
- 18 fixed security cameras;
- 13 AV cameras;
- 15 wireless APs;
- 10 access readers;
- 8 access switches;
- 7 rack UPS units;
- 14 electrical panelboards;
- 29 environment sensors;
- 190 data jacks;
- 187 receptacles;
- 18 Step 4C componentized devices, currently the fixed security-camera archetype.

These are **observations, not API constants**. PRIM3 must discover current capabilities from imported authority rather than hard-code counts.

## What Claude got right

The central synthesis is correct:

PRIM3 and Equity Uprise already own complementary halves of the same future game.

PRIM3 already owns:

- tactical AP economy;
- units and factions in the headless resolver;
- cover, LOS, concealment, firing and extraction;
- mission escalation;
- a mission clock;
- deterministic technical truth;
- tactical/technical/scaffolding difficulty separation;
- bounded lab adapters;
- opponent archetype design;
- the rule that technical state must change the tactical board;
- the Omniscient Command Interface knowledge-state grammar.

Equity Uprise already owns:

- canonical facility geometry;
- stable building/equipment identities;
- physical routing and termination;
- network/power/control relationships;
- a SANDBOX-only electronics state engine;
- fault application and restoration;
- floor-scoped practical labs;
- componentized camera position, aim and optics;
- viewer-visible system state.

That means the missing piece is primarily **assimilation**, not reinvention.

## Corrections / refinements to the comparison

### Counts

The quoted `62 cameras / 56 APs` figures are not the current Step 4B/4C electronics snapshot. Current modeled electronics contain 18 fixed security cameras, 13 AV cameras and 15 wireless APs.

Therefore:

> game mechanics must query the imported snapshot; they may never depend on remembered asset counts.

### Clock and units

The combined system does not lack a clock or units in the abstract.

PRIM3's current `game/runtime/tactical-resolver.mjs` already has:

- player and threat units;
- position;
- AP;
- movement;
- concealment;
- LOS;
- combat;
- extraction;
- `mission.clock`;
- `STABLE -> DEGRADED -> CRITICAL -> TERMINAL`.

The gap is that those units and that clock are **not yet bound to Equity Uprise space/state**.

### Cascade depth

The Equity Uprise sandbox does have `_degradeReverseDependents(..., maxDepth = 1)` as a default helper, but propagation is not globally limited to one edge.

Current special paths include:

- hosted-service reverse dependency propagation at depth 2;
- power propagation at depth 7;
- structured endpoint path propagation;
- access-switch downstream endpoint propagation;
- BAS/access-control specific propagation.

So the assimilation task should not begin by globally increasing a number. It should first define which dependency families should affect tactical knowledge/control and how far each is allowed to propagate.

### First-person movement

A real playable Site 0 FPS prototype exists under `mccluster/_unfinished/site0-game/`. Its own README documents working WASD, sprint, jump, fixed-step movement, agent switching, lifts and HUD work, while also documenting unresolved/untested areas.

It remains `_unfinished`, is stripped from deployment, and is **not canonical Equity Uprise movement authority**.

Assimilation prep may study it later for controller/physics lessons. It must not be silently copied into the canonical building or treated as already merged gameplay.

---

# Ownership boundary

## Equity Uprise / McCluster owns

Equity Uprise remains authoritative for:

- building geometry;
- floor/elevation/room identity;
- canonical building asset IDs;
- electronics device IDs;
- device component identity;
- physical connection graph;
- cable/media type;
- power/network/control/service dependency state;
- sandbox fault semantics;
- lab/runtime state;
- device-specific state representation;
- what exists in the facility.

PRIM3 must not regenerate any of those to make a mission convenient.

## PRIM3 owns

PRIM3 remains authoritative for:

- player/threat units;
- squad composition;
- AP economy;
- turn/phase order;
- tactical clock;
- opponent intent;
- threat AI;
- assault/defense objectives;
- tactical knowledge;
- fog of war;
- mission grading;
- story consequence;
- intervention mechanics;
- difficulty/scaffolding;
- how building state becomes tactical opportunity/pressure.

## Adapter owns

The assimilation adapter is allowed to:

1. read an exported Equity Uprise snapshot;
2. validate source/sandbox boundaries;
3. normalize building state into PRIM3 tactical observations;
4. derive knowledge/visibility/control consequences;
5. map stable building IDs into mission entities;
6. emit PRIM3-side session state.

It is **not** allowed to:

- write back to Equity Uprise authority files;
- move or regenerate building geometry;
- create fake substitute building assets;
- enable LIVE building control;
- run freeform shell/network actions;
- target real third-party systems;
- open public network egress;
- let Threat AI read learner mastery data.

---

# Assimilation architecture

## Layer 0 — read-only building package

A PRIM3 session eventually consumes a versioned package containing or referencing:

- canonical building geometry;
- asset registry;
- electronics manifest;
- physical connections;
- Step 4C device component catalog;
- SANDBOX state snapshot;
- source commit/schema metadata.

PRIM3 records the imported version for replay.

The game never edits the source package.

## Layer 1 — observation adapter

First executable bridge:

`sandbox state -> available cameras -> observation volumes -> tactical knowledge`

Inputs already exist:

- camera `asset_id`;
- `position_ft`;
- `aim_vector`;
- horizontal/vertical FOV;
- training range;
- sandbox `availability`.

Output is a deterministic list of observation volumes in Equity Uprise coordinates.

No new art.
No new geometry.
No new camera placement.

If a camera becomes unavailable, its observation volume disappears.

If it becomes degraded, the volume remains but may carry reduced-confidence provenance.

This repository now contains a DRAFT pure adapter prototype for this calculation:

`game/runtime/equity-uprise-battlefield-adapter.mjs`

## Layer 2 — fog / knowledge fusion

PRIM3's Omniscient Command Interface already defines:

`HIDDEN -> DETECTED -> INFERRED -> CORROBORATED -> VERIFIED`

Camera coverage should feed that grammar, not create a second visibility vocabulary.

Examples:

- enemy inside one online authorized camera volume -> DETECTED;
- same enemy corroborated by R direct LOS -> CORROBORATED;
- camera feed unavailable -> camera contributes nothing;
- stale/degraded sensor -> DETECTED/STALE according to mission rule;
- R physically verifies empty corridor -> that observation can beat stale telemetry.

Fog of war therefore becomes a systems outcome.

## Layer 3 — access / doors

Next assimilation target after cameras:

- readers;
- controllers;
- doors/locks;
- identity/authorization state;
- physical path traversal.

Required law:

> A door is never just “locked because level design says so” when the imported building exposes a relevant access-control dependency.

PRIM3 still decides mission authorization and tactical interaction cost.

Equity Uprise decides the simulated technical state of the device/path.

## Layer 4 — network / power / service consequence

Import selected sandbox effects into tactical board state.

Examples:

- access-switch loss -> downstream PoE endpoints disappear from observation/comms;
- IDF UPS loss -> affected closet/endpoints lose availability according to sandbox state;
- RADIUS/certificate problems -> approved identity/wireless access changes;
- BAS/controller state -> sensor confidence changes;
- service restoration -> mission information/support returns.

Do not invent duplicate propagation in PRIM3 when Equity Uprise already computed the affected asset IDs.

PRIM3 should consume the sandbox result and decide the **game consequence**.

## Layer 5 — spatial tactical binding

Bind PRIM3 units to the facility.

This requires an explicit authored transform between:

- Equity Uprise source coordinates;
- renderer/world meters if needed;
- PRIM3 tactical cells/nav representation.

Do not quantize the building and then treat the quantized copy as new authority.

The tactical grid/navmesh is an interaction layer over the facility.

## Layer 6 — opponent intent

This is where the combined system actually gains an adversary.

Equity Uprise faults do not “want” anything.

PRIM3 Threat AI does.

Opponent goals should operate in mission language such as:

- reach an objective zone;
- remain unobserved;
- deny defender Picture;
- interrupt T;
- retrieve an evidence item;
- sabotage a declared simulated node;
- seize a route;
- delay restoration;
- exfiltrate;
- force a defender tradeoff.

Enemy intent must not require freeform real-world exploit generation.

Technical disruption comes from approved simulation/fault actions authored for the mission.

---

# Assault / defense model

The same imported building supports both sides.

## ASSAULT fantasy

The assaulting side attempts to create and exploit seams in:

- Picture;
- Control;
- access;
- communications;
- service continuity;
- defender response time.

Possible objectives:

- cross a defended route unseen;
- reach a declared objective room;
- hold a LAB_NODE long enough for a simulated action;
- deny selected observation coverage;
- recover/extract a mission object;
- force a defender to choose between restoring infrastructure and contesting units;
- exfiltrate before defender restoration closes the window.

An assault win is not synonymous with killing everyone.

## DEFENSE fantasy

The defending side attempts to preserve or restore:

- Picture;
- Control;
- life-safety constraints;
- access integrity;
- communications;
- service continuity;
- evidence/objective integrity.

Possible objectives:

- detect and localize intrusion;
- maintain camera coverage;
- protect an IDF/panel/LAB_NODE;
- isolate a simulated compromised path;
- restore PoE/network/power;
- secure a route;
- preserve evidence;
- contain or repel hostile units;
- verify that restored systems actually work.

A defense win is not synonymous with killing everyone.

## Shared state

Recommended tactical mission state additions:

```
PictureState
ControlState[]
ObservedVolumes[]
KnowledgeObjects[]
InfrastructureEffects[]
AssaultObjectives[]
DefenseObjectives[]
```

Do not duplicate canonical building `asset_states` inside this structure. Keep a reference to source asset IDs plus derived game consequence.

---

# First vertical slice: BLIND THE FLOOR / RESTORE THE PICTURE

This is the recommended first proof because cameras are currently the most mature Step 4C devices.

## Starting state

- one selected Equity Uprise floor;
- fixed security cameras online;
- defender Picture includes their observation volumes;
- one assault element;
- one defense element;
- one technical objective tied to an authored simulated camera/PoE fault;
- no live controls;
- no public egress.

## Assault route

1. Assault moves under the current observation model.
2. A mission-authored simulated event applies an approved sandbox fault such as `camera_link_down` or `poe_disabled` to the declared training target.
3. Equity Uprise sandbox computes affected asset/connection state.
4. PRIM3 re-runs the observation adapter.
5. Lost camera coverage creates real blind space.
6. Assault can exploit the blind area for movement/objective progress.

The game does **not** teach a real intrusion procedure. The mission exposes a bounded fictional/sandbox action whose consequence is computed by the real digital-twin state graph.

## Defense route

1. Defender notices Picture loss or a contradictory/stale feed.
2. R/E/T compete for AP:
   - R establishes what is actually unseen;
   - E protects the relevant physical zone;
   - T traces/restores the declared sandbox fault.
3. Sandbox state returns the camera path to available.
4. Observation adapter restores the camera volume.
5. Defender Picture returns.
6. A separate VERIFY step confirms the restored observation before mission credit.

## Why this proves the concept

The exact same action changes:

- the technical system;
- the camera device;
- the sensor layer;
- fog of war;
- unit movement risk;
- attacker opportunity;
- defender workload.

That is the PRIM3 design law working as one game.

---

# Device maturity rule

PRIM3 should consume Equity Uprise's device-maturity truth.

A registry object is not automatically a rich tactical device.

Current camera maturity is `lab_complete`.

Other electronics still range from placeholder to recognizable/componentized.

Therefore PRIM3 must support a capability gate:

```
CAN_RENDER
CAN_INSPECT
CAN_OBSERVE
CAN_CHANGE_STATE
CAN_RUN_LAB_BEHAVIOR
```

A mission may use a device only to the depth that its imported archetype supports.

Do not fake missing device behavior merely to make a mission work.

---

# Safety / realism boundary

The value of this system is that it teaches infrastructure causality without becoming a live intrusion tool.

Required invariants:

- execution target = SANDBOX;
- live control = false;
- public network egress = none;
- no real credentials;
- no real third-party targets;
- no freeform exploit/command generation;
- mission faults use approved simulation vocabulary;
- real technical relationships remain truthful;
- assault mechanics describe game objectives and simulated consequences, not operational attack instructions.

---

# Assimilation sequence

Do not merge the game into Equity Uprise yet.

Prepare in this order:

1. **camera observation adapter** — pure and deterministic;
2. import-contract/schema fixture;
3. tactical knowledge/fog tests;
4. single-floor greybox using canonical building coordinates;
5. camera-loss assault/defense scenario;
6. access-control/door adapter;
7. switch/PoE and power consequence adapter;
8. bind PRIM3 units to building nav representation;
9. opponent goal utility;
10. only then evaluate Site 0 movement code for reusable controller/physics pieces;
11. only after those gates decide whether any runtime code should be assimilated into the canonical McCluster viewer.

## Merge gate

No assimilation into Equity Uprise until all of these are true:

- PRIM3 can load a frozen building package without editing it;
- camera observation results are deterministic;
- fault -> building state -> visibility consequence is replayable;
- attacker and defender can both complete a small mission;
- technical truth remains separate from Threat AI;
- the building runs normally with PRIM3 absent;
- PRIM3 gracefully rejects incompatible/stale building packages;
- no LIVE control path exists;
- owner reviews the play feel.

Until then, this branch is preparation only.

