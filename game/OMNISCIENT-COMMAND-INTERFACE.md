---
status: CANON
system: PRIM3 omniscient command / data-fusion tactical interface
version: 1.0.0
source_inspiration: Seek-First God's Eye View data-layer philosophy + PRIM3 XCOM mechanics
---

# PRIM3 Omniscient Command Interface

## Thesis

When PLAY begins, the viewer stops watching PRIM3 and **becomes PRIM3**.

The player controls Field-R, Field-E and Field-T through one fused command interface combining XCOM-style tactical control with a data-fusion operating picture.

The fantasy is not magical omniscience. It is **earned omniscience**:

> The interface can potentially represent the whole battlefield and infrastructure stack, but the player only sees what the team has sensed, inferred, corroborated, unlocked or verified.

The interface teaches a second lesson beneath every certification concept: **data is not the same as truth.**

## One world, four semantic zoom levels

1. **Area View** — mission perimeter, approaches, extraction, external signals and regional dependencies.
2. **Tactical View** — XCOM grid, cover, units, doors, civilians, threats and LAB_NODEs.
3. **Systems View** — logical overlays for network, identity, services, power, wireless, telemetry, authorization and dependencies.
4. **Node View** — focused LAB_NODE interaction where actual technical work occurs.

These views are one world, not separate minigames. Camera and selection context should transition smoothly between them.

## Canonical data layers

Every mission enables only relevant layers. The layer vocabulary remains stable across the campaign.

### Physical
Rooms, doors, cover, stairs/lifts, people, equipment, racks/closets, hazards, extraction. Primary producer: E + briefing intel.

### Threat
Confirmed/suspected hostiles, patrol history, firing arcs, last-known position, reinforcement routes, detection/noise. Primary producer: R.

### Sensor / Observation
Cameras, mission-authorized/public observations, environmental telemetry, coverage and blind zones. Primary producer: R.

### RF / Communications
APs, RF coverage, interference, responder channels, radio links and wired/wireless backhaul relationships. Primary producer: R + T.

### Network
Endpoints, switches, routers, segments, abstract service paths/ports, topology, trusted/untrusted boundaries and dependencies. Primary producer: T.

### Identity / Authorization
Roles, identity state, MFA/trust relationships, access zones, mission scope, rules of engagement and authorization limits. Primary producer: T + E / mission authority.

### Service
Service/application health, upstream/downstream dependencies, ownership, criticality, recovery and availability. Primary producer: T.

### Power / Environment
Mains/UPS/generator/PDU zones, cooling/HVAC, environmental state and life-safety dependencies. Primary producer: E + T.

### Evidence
Evidence objects, provenance, custody, confidence, timestamps, contradictions and integrity. Primary producer: R + T.

### Mission
Primary/secondary/hidden objectives, clocks, authorization, route constraints, extraction and persistent story consequences. Primary producer: mission authority; modified by all roles.

## Knowledge-state grammar

Every data object/edge can carry a state:

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

- **HIDDEN:** not yet known.
- **DETECTED:** something exists; identity/function uncertain.
- **INFERRED:** plausible interpretation.
- **CORROBORATED:** multiple independent observations support it.
- **VERIFIED:** strong enough to use as trusted mission fact.
- **STALE:** once-useful information may no longer describe current state.
- **CONTRADICTED:** another credible source disagrees.
- **COMPROMISED:** the source may itself be manipulated/untrustworthy.
- **UNKNOWN:** information is explicitly unavailable.

The UI may never silently promote DETECTED or INFERRED information to VERIFIED.

## Layer unlock mechanics

Layer visibility is direct tactical/technical progress, not a decorative reward.

Examples:
- R scans a roofline -> Threat Layer reveals suspected route.
- R correlates two independent observations -> route becomes CORROBORATED.
- E enters an IDF -> Physical Layer gains equipment/rack detail.
- E secures the IDF -> zone becomes SECURE.
- T surveys an authorized switch/controller -> Network Layer reveals topology edges.
- T traces a dependency -> Service Layer exposes upstream/downstream relationships.
- R confirms an external AP while T validates approved inventory/controller state -> RF object becomes VERIFIED.
- T restores trusted monitoring -> parts of Threat/Sensor state become more reliable.

## Cost rule

**Viewing information already earned is free. Acquiring, refreshing, validating or acting on information costs tactical opportunity.**

Do not charge AP for toggling a layer or reading an already-known fact.

AP may be charged for scanning, querying a node, comparing sources, moving into observation position, tracing dependencies, validating identity, refreshing stale data, reaching a physical control point, configuring infrastructure and verifying results.

## Role identity

### Field-R — THE PICTURE
R answers: What exists? Where? What changed? What is approaching? Which source can be trusted? What remains unknown?

R mainly expands spatial, threat, RF, sensor and evidence state.

### Field-E — THE REALITY
E answers: Can we reach it? Is it safe? Who controls this space? Can T remain here long enough to work? Is there a manual/physical fallback? What happens to people if the system fails?

E turns geometry, access and safety into reliable operational conditions.

### Field-T — THE SYSTEM
T answers: What is connected to what? Which layer is failing? What can be isolated/configured/recovered? Which identity/service relationship is valid? Did the intervention actually work?

T expands network, identity, service, evidence and infrastructure dependency state.

## Fused-truth moments

The strongest “omniscience” moments happen when roles converge on one fact.

Example — suspected rogue wireless source:
1. R detects unusual RF: DETECTED.
2. R maps coverage/source behavior: INFERRED.
3. E reaches the room and confirms an unlisted physical device: CORROBORATED.
4. T validates controller/inventory/backhaul mismatch: VERIFIED.
5. The fused interface exposes the justified containment options.

The player feels omniscient because they see multiple disciplines fused at once; the knowledge was still earned.

## Interface composition

### Center — battlefield
3D/isometric tactical map, units, movement, cover, visible threats, interactables, animated combat.

### Left rail — layers
Compact mission-relevant data lenses. Normally one primary layer plus at most one ghost comparison layer. Critical events may temporarily surface themselves.

### Right rail — selected entity/node
Current state, confidence/freshness, provenance, dependency relationships, available actions/AP cost and concept-linked rationale when Study Mode is enabled.

### Bottom — squad economy
R/E/T cards, remaining AP, statuses, Control/Picture/technical resources and cross-role combo availability.

### Top — mission state
Window/Extract clocks, Detection, objective state, and critical service/evidence/life-safety warnings.

### Optional timeline drawer
Timestamped event history for incident/evidence-heavy missions.

## Hybrid map + graph + timeline rule

PRIM3 does not choose between tactical map and entity/dependency graph.

- **Map answers WHERE.**
- **Graph answers WHY / WHAT DEPENDS ON WHAT.**
- **Timeline answers WHEN / IN WHAT ORDER.**

Systems graphs remain anchored to battlefield entities. Clicking a rack may reveal switch, power, storage, service and identity dependencies. Clicking an AP may reveal RF coverage spatially while controller/backhaul/VLAN/authentication relationships appear logically.

## Mission-entry transition

The handoff must sell the transformation from viewer to PRIM3:

1. Human story produces the incident and decision to deploy.
2. Music film/brief teaches doctrine, vocabulary and expected model.
3. Human escalation reaches the mission threshold.
4. Final cinematic image freezes on the operation.
5. Camera pulls into the PRIM3 operating picture.
6. Command HUD fades over the same world.
7. Known briefing layers illuminate.
8. Unknown/unverified layers remain dark or uncertain.
9. Player receives control of R/E/T.

Avoid a disconnected loading-screen feeling where technically practical.

## Briefing law

The music film communicates what the system is, normal/good state, key concepts, intended doctrine, major risks and what the team believes it will face.

It must not reveal exact enemy positions, exact correct lab choices, hidden root causes, surprise story information or every dependency edge.

> **The briefing teaches the model. The mission attacks the model.**

## Interface progression across seven seasons

### Seasons 1–2
Fewer layers, explicit labels, strong prompts, smaller maps, visible confidence/provenance explanations.

### Seasons 3–4
Conflicting sources, evidence/timeline views, cyber-physical dependency edges, more player inference.

### Seasons 5–6
Multi-site/cloud/global context, larger dependency graphs, provider/ownership overlays, stale/contradicted data and fewer tutorial prompts.

### Season 7
Full PRIM3 operating picture, Site 0 multi-floor infrastructure, simultaneous failure domains, and Prime's superior information position made explicit. Earlier layers return as accumulated player literacy.

The player becomes more “omniscient” because they understand more of what the interface means, not merely because more buttons unlock.

## Prime information asymmetry

Prime's narrative advantage should be visible through information architecture.

Across earlier seasons, the player repeatedly encounters unexplained situations where Prime appears to have had a more complete Picture, more reliable provenance, earlier telemetry or cross-organization context.

By `Evil Twin`, the player learns that Prime's apparent omniscience came partly from privately fusing data and mission state across compartments that Jordan and Benji were never allowed to see together.

This makes the interface itself part of the moral conflict: the question is not whether comprehensive situational awareness is useful; it is **who is allowed to see, decide, write and audit the fused picture.**

## Real-world bridge principle

PRIM3's fictional command interface and the separately hosted real-world `Seek-First / God's Eye View` capability may share visual and conceptual language, but the game must not rely on live public-world feeds to function.

The campaign uses authored/simulated mission data. Real-world public-data access is a post-game/product entitlement, not a hidden dependency in the educational missions.

A player who completes the succession arc and earns Prime status may unlock an authenticated real-world situational-awareness workspace inspired by the same layer/provenance philosophy, subject to provider terms, access controls, privacy rules and rate limits.

## V1 implementation boundary

A shippable first game version needs:
- authored tactical map;
- authored entity/dependency graph;
- deterministic data states;
- 5–7 layer types in first vertical slice;
- layer toggles;
- confidence/provenance/freshness metadata;
- XCOM AP control;
- LAB_NODE interaction;
- smooth Tactical <-> Systems <-> Node context shifts;
- scripted mission data updates;
- no dependency on real-world surveillance/public feeds.

Use `LVL-07 EXPOSURE` first for Physical, Threat, Service, Identity/Authorization, Evidence and Mission layers. Then `LVL-06 DEAD AIR` proves RF/Network/Power layering.
