---
status: PROPOSED
system: PRIM3 omniscient command / data-fusion tactical interface
version: 0.1.0
source_inspiration: Hitman's Halo data-layer philosophy + PRIM3 XCOM mechanics
---

# PRIM3 Omniscient Command Interface

## Thesis

When PLAY begins, the viewer stops watching PRIM3 and **becomes PRIM3**.

The player controls Field-R, Field-E and Field-T through one fused command interface that combines XCOM-style tactical control with a data-fusion operating picture.

The fantasy is not magical omniscience. It is **earned omniscience**:

> The interface can potentially represent the whole battlefield and infrastructure stack, but the player only sees what the team has sensed, inferred, corroborated, unlocked or verified.

The interface therefore teaches a second lesson beneath every certification concept: **data is not the same as truth.**

## 1. One world, four semantic zoom levels

The game should avoid separate disconnected menus for map, intel, lab and combat.

The same mission world supports four zoom states:

1. **Area View** — mission perimeter, approaches, extraction, external signals, regional dependencies.
2. **Tactical View** — XCOM grid, cover, units, doors, civilians, threats, LAB_NODEs.
3. **Systems View** — logical overlays for network, identity, services, power, wireless, telemetry, authorization and dependencies.
4. **Node View** — focused LAB_NODE interaction where the player performs the actual technical task.

The camera should transition smoothly between them so the player feels like they are moving through one operational model rather than launching minigames.

## 2. Canonical data layers

Every mission enables only the layers relevant to its concept set, but the global layer vocabulary should remain stable.

### Physical Layer
- rooms
- doors
- cover
- stairs/lifts
- civilians
- equipment
- rack/closet locations
- hazards
- extraction routes

Primary producer: Field-E + static mission intel.

### Threat Layer
- confirmed hostiles
- suspected contacts
- patrol history
- firing arcs
- last-known positions
- reinforcement routes
- detection/noise events

Primary producer: Field-R.

### Sensor / Observation Layer
- cameras
- motion/acoustic sensors
- public/mission-authorized feeds
- visual observations
- environmental telemetry
- sensor coverage/blind zones

Primary producer: Field-R.

### RF / Communications Layer
- access points
- signal coverage
- interference
- radio links
- responder channels
- wired/wireless backhaul relationships

Primary producer: Field-R + Field-T.

### Network Layer
- endpoints
- switches/routers
- network segments
- logical paths
- service ports at abstract defensive/administrative depth
- trusted/untrusted boundaries
- topology/dependency edges

Primary producer: Field-T.

### Identity / Authorization Layer
- roles
- credentials/identity state
- access zones
- MFA/trust relationships
- mission scope
- rules of engagement
- authorization limits

Primary producer: Field-T + Field-E / mission authority.

### Service Layer
- application/service health
- upstream/downstream dependencies
- provider responsibility
- criticality
- recovery state
- availability

Primary producer: Field-T.

### Power / Environment Layer
- mains/UPS/generator state
- PDU/power zones
- cooling/HVAC
- temperature/environment
- life-safety dependencies

Primary producer: Field-E + Field-T.

### Evidence Layer
- evidence objects
- provenance
- chain/custody state
- confidence
- timestamps
- contradictions
- integrity

Primary producer: Field-R + Field-T.

### Mission Layer
- primary/secondary/ghost objectives
- clocks
- authorization
- route constraints
- extraction requirements
- persistent story consequences

Primary producer: mission authority; modified by all roles.

## 3. Data-state grammar

Every data object/edge can carry a knowledge state:

```text
HIDDEN
-> DETECTED
-> INFERRED
-> CORROBORATED
-> VERIFIED

May degrade to:
STALE
CONTRADICTED
COMPROMISED
UNKNOWN
```

Definitions:
- HIDDEN: not yet known to the player.
- DETECTED: something exists, identity/function uncertain.
- INFERRED: a plausible interpretation exists.
- CORROBORATED: multiple independent observations support it.
- VERIFIED: strong enough to use as a trusted mission fact.
- STALE: once-useful information may no longer describe current state.
- CONTRADICTED: another source materially disagrees.
- COMPROMISED: source may itself be manipulated/untrustworthy.
- UNKNOWN: information is explicitly unavailable.

No UI should silently promote DETECTED or INFERRED information to VERIFIED.

## 4. Layer unlock mechanics

Layer visibility itself is not a reward animation; it is the direct result of role action.

Examples:
- R scans a roofline -> Threat Layer reveals a suspected route.
- R correlates two cameras -> route becomes CORROBORATED.
- E enters an IDF -> Physical Layer reveals rack/door/equipment positions.
- E secures the IDF -> Control state becomes SECURE.
- T surveys a switch/controller -> Network Layer reveals new topology edges.
- T traces a dependency -> Service Layer exposes an upstream relationship.
- R confirms the external AP while T confirms controller inventory -> RF object becomes VERIFIED.
- T restores trusted monitoring -> parts of the Threat/Sensor Layer become more reliable.

The player therefore experiences knowledge acquisition as tactical progress.

## 5. The cost rule

**Viewing already-earned information is free. Acquiring, refreshing, validating or acting on information costs tactical opportunity.**

Do not charge AP merely to toggle a UI layer.

AP may be charged for:
- scanning;
- querying a node;
- comparing sources;
- moving into observation position;
- tracing dependencies;
- validating identity;
- refreshing stale data;
- physically accessing a control point;
- configuring infrastructure;
- verifying the result.

This keeps the interface usable without making information free.

## 6. Three roles as three intelligence disciplines

### Field-R — THE PICTURE
R answers:
- What exists?
- Where is it?
- What changed?
- What is approaching?
- Which observation can we trust?
- What is still unknown?

R primarily expands spatial, threat, RF, sensor and evidence layers.

### Field-E — THE REALITY
E answers:
- Can we physically reach it?
- Is the room safe?
- Who controls this space?
- Can T remain here long enough to work?
- Is there a manual or physical fallback?
- What happens to people if the system fails?

E primarily turns map geometry, safety and access into reliable operational conditions.

### Field-T — THE SYSTEM
T answers:
- What is this connected to?
- Which layer is actually failing?
- What can be isolated/configured/recovered?
- Which identity or service relationship is valid?
- Did the intervention actually work?

T primarily expands network, identity, service, evidence and infrastructure dependency layers.

## 7. Fused truth / omniscience moments

The strongest interface moments happen when multiple roles converge on one fact.

Example: suspected rogue wireless source.

1. R detects unusual RF at a location: DETECTED.
2. R maps coverage and movement: INFERRED rogue source.
3. E reaches the room and visually confirms an unlisted device: CORROBORATED.
4. T checks approved controller/inventory state and validates identity/backhaul mismatch: VERIFIED.
5. The interface fuses the observations and unlocks the correct containment actions.

The feeling is omniscient because the player sees all three perspectives at once. The information is still earned by the team.

## 8. Interface composition

The default screen should remain visually readable as a game.

### Center: battlefield
- 3D/isometric tactical map
- units and movement
- cover
- visible threats
- interactables
- animated combat

### Left rail: layers
A compact stack of mission-relevant data lenses. Avoid showing ten always-on overlays.

Recommended behavior:
- one primary layer active;
- one comparison layer ghosted;
- critical alerts may temporarily surface themselves.

### Right rail: selected entity/node
Shows only mission-useful information:
- identity/name
- current state
- confidence/freshness
- provenance
- dependency relationships
- available actions/AP cost
- concept-linked rationale when Study Mode is enabled

### Bottom: squad action economy
- R / E / T cards
- remaining AP
- statuses
- Control/Picture/technical resources
- queued/available combo actions

### Top: mission state
- Window/Extract clock
- Detection
- objective state
- service/evidence/life-safety warnings

### Optional timeline drawer
Important events can be scrubbed by timestamp for incident-response and evidence-heavy missions.

## 9. Hybrid map + graph rule

PRIM3 should not choose between a geographic/tactical map and a Palantir-like entity graph.

The systems graph should be **anchored to battlefield entities**.

Examples:
- click a server rack -> fan outward to switch, power, storage, service and identity dependencies;
- click an AP -> show RF coverage spatially while backhaul/controller/VLAN/identity edges appear logically;
- click a person -> show authorized role/access state without exposing irrelevant personal data;
- click a service -> show which physical and logical nodes support it.

The graph answers **why**. The map answers **where**. Tactical play needs both.

## 10. Mission-entry transition

The handoff from episode to game should itself sell the fantasy.

Recommended sequence:
1. Human story produces the incident and the decision to deploy.
2. Music film/brief teaches the doctrine, vocabulary, ideal plan and concept relationships.
3. Final bar/visual freezes on the target/incident.
4. Cinematic camera pulls upward.
5. PRIM3 command HUD fades over the same world.
6. Known briefing layers illuminate.
7. Unknown layers remain dark/uncertain.
8. Player receives control of R/E/T.

No loading-screen feeling if technically avoidable. The viewer should feel like the cinematic was always the same simulation they are now controlling.

## 11. Briefing must teach doctrine, not reveal puzzle answers

The song/music film should communicate:
- what the system is;
- what normal/good state looks like;
- the key concepts;
- the intended doctrine;
- the major risks;
- what the team believes the operation will require.

It should **not** reveal:
- exact enemy positions;
- exact correct lab choices;
- the true root cause when uncertainty is part of the mission;
- surprise story information;
- every dependency edge.

The dramatic contract is:

> The briefing teaches the model. The mission attacks the model.

The player succeeds by understanding the concept well enough to adapt when reality differs from the ideal explanation.

## 12. Interface progression across seven seasons

The command interface itself should mature with Jordan/player knowledge.

### Seasons 1-2
- fewer layers
- explicit labels
- strong prompts
- small maps
- visible provenance/confidence explanations

### Seasons 3-4
- more conflicting sources
- evidence/timeline views
- cyber-physical dependency edges
- player expected to infer more

### Seasons 5-6
- multi-site/cloud/global context
- larger dependency graphs
- provider/ownership overlays
- stale/contradicted information
- fewer explicit tutorial prompts

### Season 7
- full PRIM3 operating picture
- Site 0 multi-floor infrastructure
- multiple simultaneous failure domains
- Prime's own information advantage becomes visible
- earlier data layers return as accumulated player literacy

The final game should make the player feel genuinely more omniscient because they have learned how to interpret more layers, not simply because the UI unlocked more buttons.

## 13. Realistic implementation boundary

A shippable first version does not need a full live-world intelligence platform.

V1 should implement:
- authored mission map;
- authored entity/dependency graph;
- deterministic data states;
- 5-7 layer types total in the first vertical slice;
- layer toggles;
- confidence/provenance/freshness metadata;
- XCOM AP control;
- LAB_NODE interaction;
- smooth tactical <-> systems <-> node zoom;
- scripted mission data updates;
- no dependency on real-world surveillance feeds.

Later versions may integrate simulation/procedural systems where justified.

The design goal is the **interaction model**, not recreating a real intelligence platform.

## 14. Vertical-slice recommendation

Use `LVL-07 EXPOSURE` first because it naturally needs:
- Physical
- Threat
- Service
- Identity/Authorization
- Evidence
- Mission

Then `LVL-06 DEAD AIR` proves spatial RF/network layering with:
- Physical
- RF/Communications
- Network
- Power/Environment
- Threat
- Mission

If both work, the interface grammar is broad enough to support the rest of the album.
