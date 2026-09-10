---
status: CANON
system: PRIM omniscient command / data-fusion tactical interface
version: 1.1.0
source_inspiration: Hitman's Halo data-layer philosophy + PRIM3 XCOM mechanics
---

# PRIM3 Omniscient Command Interface

## Thesis

When PLAY begins, the viewer stops only watching the episode and **enters PRIM mission-control perspective**.

The player controls the episode's assigned mission element through one fused command interface combining XCOM-style tactical control with a data-fusion operating picture.

The player is **not literally becoming Jordan or PRIM3** during ordinary pre-succession missions. `PRIM3` is also Jordan Vale's eventual Mantle index, so gameplay language must preserve that distinction.

The fantasy is not magical omniscience. It is **earned omniscience**:

> The interface can potentially represent the whole battlefield and infrastructure stack, but the player only sees what the team has sensed, inferred, corroborated, unlocked or verified.

The interface teaches a second lesson beneath every certification concept: **data is not the same as truth.**

## Ensemble-control law

Normal PLAY primarily controls the characters actually assigned to the mission. Most ordinary missions launch **without Jordan**.

Mission control may include:
- Field-R;
- Field-E;
- Field-T;
- Cohort/Lead/Defense roles when authored;
- episode-specific specialists;
- Jordan Vale only when specifically assigned or when an approved Wildcard call-up occurs;
- PRIM2 only through a scripted appearance or eligible Apex intervention.

See `game/WILDCARD-INTERVENTION-AUTHORITY.md` and `story/ENSEMBLE-POV-AUTHORITY.md`.

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

## Role identity

### Field-R — THE PICTURE
What exists? Where? What changed? What is approaching? Which source can be trusted? What remains unknown?

### Field-E — THE REALITY
Can we reach it? Is it safe? Who controls this space? Can technical work continue? What happens to people if the system fails?

### Field-T — THE SYSTEM
What connects to what? Which layer is failing? What can be isolated/configured/recovered? Did the intervention work?

## Fused-truth moments

The strongest “omniscience” moments happen when roles converge on one fact. The player feels omniscient because multiple disciplines are fused, not because the interface guesses.

## Interface composition

### Center — battlefield
3D/isometric tactical map, units, movement, cover, visible threats, interactables, animated combat.

### Left rail — layers
Compact mission-relevant data lenses.

### Right rail — selected entity/node
Current state, confidence/freshness, provenance, dependencies, available actions/AP costs and concept-linked rationale when Study Mode is enabled.

### Bottom — squad economy
Current playable character cards, remaining AP, statuses, Control/Picture/technical resources and cross-role combo availability. Do not hard-code the rail to Jordan or even strictly R/E/T when the authored mission uses another composition.

### Top — mission state
Window/Extract clocks, Detection, objective state and critical service/evidence/life-safety warnings.

### Intervention rail
Normally compact or hidden. When relevant it exposes:

```text
MISSION STATE      STABLE / DEGRADED / CRITICAL / TERMINAL
WILDCARD           remaining season authorizations
APEX               remaining campaign authorizations
HOSTILE ESCALATION UNKNOWN / POSSIBLE / LIKELY / ACTIVE
```

When CRITICAL conditions are met and Jordan is off-board, surface `REQUEST WILDCARD`.

When Jordan is already present on an eligible high-value mission and CRITICAL failure persists, surface `REQUEST EXECUTIVE OVERRIDE` or `REQUEST PRIM2` depending on story clearance.

Royce warnings are information-dependent. Strong R/Intel play can improve warning quality without simply cancelling the incursion.

## Hybrid map + graph + timeline rule

- **Map answers WHERE.**
- **Graph answers WHY / WHAT DEPENDS ON WHAT.**
- **Timeline answers WHEN / IN WHAT ORDER.**

## Mission-entry transition

1. Human story produces the incident and decision to deploy.
2. Music film/brief teaches doctrine, vocabulary and expected model.
3. Human escalation reaches the mission threshold.
4. Final cinematic image freezes on the operation.
5. Camera pulls into the PRIM operating picture.
6. Command HUD fades over the same world.
7. Known briefing layers illuminate.
8. Unknown/unverified layers remain dark or uncertain.
9. Player receives control of **the assigned mission element**.

Do not describe this handoff as the player “becoming PRIM3” unless the story has actually reached Jordan's succession and that meaning is deliberately intended.

## Briefing law

> **The briefing teaches the model. The mission attacks the model.**

The brief cannot reveal exact hidden solutions simply because later intervention units possess greater authority.

## Interface progression across seven seasons

### Seasons 1–2
Fewer layers, explicit labels, strong prompts, smaller maps, visible confidence/provenance explanations. Executive interventions may remain deliberately anonymous in player-facing language.

### Seasons 3–4
Conflicting sources, evidence/timeline views, cyber-physical dependency edges, more player inference. Wildcard call-ups become an understood institutional mechanic even if Jordan's deeper history remains hidden.

### Seasons 5–6
Multi-site/cloud/global context, larger dependency graphs, provider/ownership overlays, stale/contradicted data and fewer tutorial prompts. Royce incursion pressure and the meaning of executive attention become more legible.

### Season 7
Full PRIM operating picture, Site 0 multi-floor infrastructure, simultaneous failure domains and PRIM2's superior information position made explicit. Earlier layers return as accumulated player literacy.

## PRIM2 information asymmetry

PRIM2's narrative advantage should be visible through information architecture.

Across earlier seasons, the player repeatedly encounters unexplained situations where the presiding Mantle holder had a more complete Picture, more reliable provenance, earlier telemetry or cross-organization context.

An Apex intervention may expose a **PRIM2-SOURCED** information package. That provenance does not magically convert an inference into verified truth. Authority can expose information; validation law still applies.

By `Evil Twin`, the player learns that PRIM2's apparent omniscience came partly from privately fusing data and mission state across compartments unavailable to ordinary teams.

## Rival escalation

Royce is not represented as another omniscient interface user. His incursion fantasy is physical/organizational disruption: breaking Control, accelerating pressure, moving Hitman pieces and forcing the player's carefully constructed plan to become unstable.

This asymmetry is intentional:

```text
JORDAN — finds another path
PRIM2 — sees/authorizes more of the board
ROYCE — violently changes the board
```

## Real-world bridge principle

The fictional command interface and the separately hosted real-world `Hitman's Halo` capability may share visual/conceptual language, but the game must not rely on live public-world feeds to function.

The campaign uses authored/simulated mission data.

## V1 implementation boundary

A shippable first version needs:
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
- mission-state classification;
- Wildcard request UI/state even if the first vertical slice scripts the result;
- no dependency on real-world surveillance/public feeds.

Use `LVL-07 EXPOSURE` first for Physical, Threat, Service, Identity/Authorization, Evidence and Mission layers. Then `LVL-06 DEAD AIR` proves RF/Network/Power layering.
