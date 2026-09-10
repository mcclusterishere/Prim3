---
status: CANON
system: Tactical IT mechanics / concept-to-action authority
version: 1.0.0
owner: Matthew McCluster
authority: Subordinate only to CANON.md; supersedes conflicting PROPOSED tactical-learning notes
---

# PRIM3 Tactical IT Mechanics Bible

This document defines the canonical mechanical grammar that binds real IT concepts to PRIM3's XCOM-style tactical battlefield.

The game is not two games — a shooter and an educational minigame — alternating turns. There is one tactical economy. Movement, gunfire, reconnaissance, physical control, technical work, evidence handling, recovery, and extraction all compete for the same AP, clock, position, risk, and attention budget.

The intended player feeling is:

> I cannot finish the technical objective unless I understand the system, and I cannot use that understanding unless I tactically create enough time, information, access, and safety to apply it.

This file should be interpreted together with:
- `CANON.md`
- `game/LEARNING-MISSION-SOURCE-OF-TRUTH.md`
- `game/TACTICAL-XCOM-MECHANICS.md`
- the tactical-lab authority file on `main`
- `learning/SONG-CONCEPT-INDEX.md`
- `learning/MISSION-CONCEPT-LAB-MATRIX.md` or its current equivalent on `main`

If an episode-specific implementation violates this mechanical grammar, the episode implementation is wrong unless canon is deliberately revised.

---

# 0. Design laws

## 0.1 One economy

Every meaningful action consumes or modifies at least one of:
- Action Points (`AP`)
- Approach / Window / Extract ticks
- map position
- line of sight
- cover state
- Control state
- Picture state
- Detection / Heat
- power state
- service state
- evidence integrity
- objective integrity
- authorization allowance
- operator HP / Will / injury state
- role-produced tokens
- consumable kit state

There is no separate free educational phase once the mission starts.

## 0.2 Technical work is deterministic where knowledge is deterministic

PRIM3 does not use a generic “hack chance” for whether a player understands a concept.

A technically correct action is correct because:
- the player gathered sufficient evidence;
- selected the correct interpretation;
- sequenced the intervention correctly;
- had the necessary role/kit/authorization;
- and completed the work without destructive interruption.

Randomness belongs primarily to:
- enemy behavior within bounded AI rules;
- combat hit resolution;
- uncertain environmental events;
- incomplete information;
- damaged components;
- time pressure;
- changing tactical conditions.

Randomness must not turn a correct RAID layout, containment decision, access-scope judgment, or service-dependency interpretation into a wrong answer merely because a hidden dice roll failed.

## 0.3 Validation is always separate from change

`CONFIGURE` does not equal `VERIFY`.
`ISOLATE` does not equal `CONTAINED` until verified.
`RESTORE` does not equal `HEALTHY` until verified.
`COLLECT` does not equal `DEFENSIBLE EVIDENCE` until preserved/sealed.

This separation is one of the most important real-world habits the game teaches.

## 0.4 Kinetic force buys opportunity; it does not replace the objective

Combat can:
- protect a LAB_NODE;
- stop an enemy from physically taking evidence;
- preserve a route;
- delay reinforcements;
- prevent interruption;
- rescue a downed operator;
- suppress a lane while T works;
- destroy a hostile fictional actuator or defensive system when authorized.

Combat cannot, by itself, satisfy an IT-learning objective unless that objective genuinely concerns physical security or cyber-physical safety.

## 0.5 Every concept must produce observable player behavior

A concept is not considered “gamified” merely because it appears in a tooltip.

For each concept taught in a mission, the design must define:
1. what evidence the player can observe;
2. what state the player must infer;
3. what action the player can take because of that inference;
4. what tactical consequence follows;
5. what evidence proves the action worked;
6. how mastery is recorded.

---

# 1. Tactical turn economy

## 1.1 Standard squad

Standard tactical squad:
- Field-R: Recon / external picture
- Field-E: Entry / control / protection
- Field-T: Technical / system objective

Each receives 2 AP per Player Phase.

Total standard squad AP per round: **6 AP**.

Player may activate units in any order and may interleave units unless an action explicitly locks an activation.

Example interleave:
1. R uses 1 AP `Scan Lane`.
2. T uses 1 AP `Characterize Node` using R's new Evidence Token.
3. E uses 1 AP `Move` and 1 AP `Hold`.
4. R uses final AP `Overwatch`.
5. T uses final AP `Configure`.

Interleaving is encouraged because the educational fantasy is cooperative systems work, not three isolated character turns.

## 1.2 AP semantics

AP represents a bundle of:
- time;
- attention;
- body position;
- tool access;
- cognitive focus;
- opportunity under threat.

AP is intentionally abstract and is not a literal fixed number of seconds.

## 1.3 Base AP cost bands

| Cost | Meaning | Typical examples |
|---|---|---|
| 0 AP | free communication/state acknowledgement; does not materially consume tempo | acknowledge warning, inspect already-open compact readout, cancel before commit |
| 1 AP | one bounded tactical or technical action | move, fire, scan, classify, isolate one component, verify one condition |
| 2 AP | full activation / high-focus / careful or physically demanding action | sprint, forensic acquisition stage, deep trace, complex recovery stage, heavy physical interaction |
| 3+ AP | must span multiple activations / rounds | multi-system migration, broad incident scoping, array reconstruction, multi-source architecture recovery |

No single action may cost more than 2 AP in one activation. Costs above 2 are represented as staged progress.

## 1.4 AP cost modifiers

Base technical AP cost may be modified by battlefield state.

### Favorable modifiers
- relevant R Evidence Token: −1 AP once, minimum 1 for a meaningful state-changing action;
- T in SECURE Control Zone: prevents interruption surcharge;
- correct specialist kit: −1 AP or removes mandatory extra stage;
- prior-song mastery at Applied band: may reveal one diagnostic cue or remove one decoy; does not make the action free;
- pre-mission Intel spend: may start a node at OBSERVED or CHARACTERIZED.

### Unfavorable modifiers
- T in CONTESTED space: +1 Window tick on completed multi-stage task;
- T wounded: selected high-focus actions require Will check or extra validation, never random technical answer corruption;
- node on backup/unstable power: additional VERIFY stage;
- incomplete Picture: additional decoy or hidden dependency;
- damaged interface: extra MATCH/TRACE step;
- insufficient authorization: action may be unavailable, flagged emergency-only, or permitted with Compliance consequence;
- low-confidence evidence: intervention can still be chosen, but player sees uncertainty and accepts explicit risk.

## 1.5 AP and clocks are different currencies

AP measures what a unit can do this Player Phase.
Clocks measure how much mission opportunity remains.

A task can cost AP without consuming extra Window ticks, or cost both.

Example:
- `Classify Endpoint` = 1 AP, no direct Window loss.
- `Forensic Image Stage` = 2 AP + 1 Window tick because the acquisition itself consumes mission time.
- `Emergency Isolation` = 1 AP, no extra Window, but lowers Service Health.

This prevents AP from becoming the only expression of time pressure.

---

# 2. Shared battlefield state

## 2.1 Global mission state

Every tactical mission can expose some subset of:

```text
ApproachClock
WindowClock
ExtractClock
Detection
Heat
AlertLevel
PowerState
ServiceHealth
EvidenceIntegrity
ObjectiveIntegrity
CivilianSafety
AuthorizationState
PictureState
ControlState[]
ThreatState[]
LabNodeState[]
```

## 2.2 PictureState — owned primarily by R

Canonical states:
- `CLEAR`: major observed routes/sources characterized; low ambiguity.
- `PARTIAL`: enough information to act but meaningful blind spots remain.
- `UNCERTAIN`: conflicting/insufficient evidence.
- `HOSTILE`: adversary/environment has disrupted R's ability to maintain reliable picture.

PictureState can apply to:
- whole mission;
- a map zone;
- a node;
- a wireless cell;
- a service dependency cluster;
- a route.

## 2.3 ControlState — owned primarily by E

Canonical states:
- `SECURE`: team has meaningful physical control for this tactical beat.
- `CONTESTED`: hostile pressure can interrupt work.
- `LOST`: team cannot safely conduct careful work without exceptional action.

ControlState can attach to:
- room;
- doorway;
- corridor;
- evidence locker;
- power panel;
- LAB_NODE perimeter;
- civilian group;
- extraction lane.

## 2.4 TechnicalState — owned primarily by T

Node-specific technical state may include:
- `UNKNOWN`
- `OBSERVED`
- `CHARACTERIZED`
- `PLAN_SELECTED`
- `WORK_IN_PROGRESS`
- `VALIDATION_PENDING`
- `COMMITTED`
- `VERIFIED`
- `SEALED`
- `STABILIZED`
- `DEGRADED`
- `CONTAMINATED`
- `INCONCLUSIVE`
- `LOCKED_OUT`
- `UNSAFE`
- `RECOVERABLE`
- `ABORTED`

Not every node uses every state.

---

# 3. Role production and role dependency

## 3.1 Field-R produces information as a mechanical resource

R's primary output is not damage. It is **reduced uncertainty**.

R can produce named Evidence Tokens such as:
- `ROUTE_CLEAR_1R`
- `AUTHORIZED_AP_CONFIRMED`
- `POWER_HAZARD_CONFIRMED`
- `CAMERA_ARC_MAPPED`
- `LOG_SOURCE_CORRELATED`
- `TRANSFER_SPIKE_CONFIRMED`
- `PHYSICAL_LABEL_MATCH`
- `RESPONDER_ETA_2R`
- `BACKHAUL_PATH_CONFIRMED`
- `SENSOR_CONTRADICTION_CONFIRMED`

Every token must state what fact was established. No generic `+1 TECH` token.

### R mechanical verbs

| Action | AP | Primary concept families | Battlefield output |
|---|---:|---|---|
| Scan Lane | 1 | observation, surveillance, RF, physical topology | reveal threats/sources in lane |
| Compare Sources | 1 | corroboration, logs, telemetry, sensor trust | Evidence Token or ambiguity flag |
| Map Topology | 1–2 | networking, dependency graph, OSINT, site mapping | reveals edges / route costs |
| Mark Threat | 1 | threat prioritization | ally aim / target priority benefit |
| Validate External State | 1 | verification, out-of-band checking | removes one false assumption |
| Warn | 0–1 | alerting, incident communication | enables reaction/abort/route change |
| Quiet Route | 2 | reconnaissance, risk management | movement/detection benefit |
| Overwatch | 1 | kinetic protection | reaction fire and lane denial |
| Suppressive Observation | 1 | visual control + kinetic support | reduces enemy movement confidence |

R should often face a meaningful choice between `Overwatch` and `Compare Sources`: shoot potential movers or spend the AP reducing technical uncertainty.

## 3.2 Field-E produces controlled physical opportunity

E's primary output is **space in which other work remains possible**.

### E mechanical verbs

| Action | AP | Primary concept families | Battlefield output |
|---|---:|---|---|
| Move | 1 | spatial planning | position |
| Breach / Open | 1–2 | access / physical security | creates entry path, may add Detection |
| Bypass Authorized Barrier | 2 | physical access under scope | quieter access, lower Detection |
| Hold Angle | 1 | physical security / control | Control Zone + kinetic reaction |
| Guard Tech | 1 | team dependency | absorbs/prevents first interruption against T |
| Hold Equipment | 1 | asset protection | protects node from physical disablement |
| Escort | 1 | continuity / people safety | moves protected unit/group with benefit |
| Stabilize Person | 1 | life safety | stops bleed / worsening injury |
| Stabilize Physical System | 1 | cyber-physical continuity | temporary safe state on power/door/HVAC prop |
| Route Civilians | 1 | continuity / safety | moves people out of hazard / privacy zone |
| Secure Evidence Zone | 1 | chain of custody | raises evidence-area ControlState |
| Suppress | 1 | kinetic control | lowers hostile aim / blocks sprint |
| Fire | 1 | kinetic | removes/pressures threat |

E should frequently choose between killing an enemy and preserving a Control Zone. A kill can remove one threat; a hold can protect T against several forms of interruption.

## 3.3 Field-T converts opportunity into objective state

T's output is the mission's technical result.

### T mechanical verbs

| Action | AP | Primary concept families | Output |
|---|---:|---|---|
| Observe Node | 0–1 | identification | exposes visible node state |
| Characterize | 1 | diagnosis, logs, hardware, service state | reveals relevant variables |
| Classify | 1 | malware, incident, hardware, data | assigns correct category / narrows action set |
| Compare | 1 | versions, hashes, logs, configs | detects meaningful difference |
| Trace | 1 | dependency, routing, data flow | reveals upstream/downstream relationship |
| Authorize | 0–1 | scope, least privilege, ROE | action legality/risk state |
| Isolate | 1 | segmentation, containment | changes connectivity/availability |
| Preserve | 1–2 | evidence, backup, data integrity | protects recoverability / evidence score |
| Sequence | 1 | install, recovery, patching, failover | orders staged work |
| Configure | 1–2 | networking, cloud, identity, system state | applies change |
| Recover | 1–2 | backup, DR, rollback | restores trusted state |
| Verify | 1 | validation, monitoring, hashing | confirms intended result |
| Seal | 1 | evidence / take | locks scoring value |
| Document | 1 | professional practice, chain of custody | produces defensibility / debrief evidence |
| Abort | 0–1 | reversibility / safety | stops unsafe work, may preserve partial state |
| Fire | 1 | kinetic self-defense | consumes technical tempo, lower baseline proficiency than E/R |

T should regularly face a choice between `Verify` and immediate movement. The game must reward verification but never pretend survival is less important than perfect process.

---

# 4. Technical Task Atom ontology

Every technical lab step must instantiate one of the following atoms. Episode designers may combine atoms but should not invent synonym mechanics unless necessary.

## 4.1 OBSERVE

Player question: **What exists or changed?**

UI forms:
- inspect rack/indicator;
- read compact event tile;
- highlight physical label;
- view spectrum segment;
- inspect service graph node;
- view sensor reading.

Typical result:
- node becomes OBSERVED;
- new datum appears;
- no conclusion yet.

## 4.2 COMPARE

Player question: **What differs, agrees, or conflicts?**

UI forms:
- side-by-side logs;
- before/after config;
- two hash values;
- two signal sources;
- two device inventories;
- two invoices/cost models;
- redundant path states.

Correct result can generate an Evidence Token.

## 4.3 CLASSIFY

Player question: **What kind of thing is this?**

UI forms:
- drag event cards into categories;
- tag endpoint symptoms;
- choose data sensitivity class;
- identify storage topology;
- label cloud responsibility layer;
- classify install strategy.

Incorrect classification does not show a school-style red X. It causes the player to operate under the wrong model until evidence contradicts it or validation fails.

## 4.4 TRACE

Player question: **What depends on / connects to what?**

UI forms:
- graph edge tracing;
- route highlighting;
- cable/port matching;
- service dependency chain;
- data-flow path;
- power path;
- failover chain.

Wrong trace may:
- isolate the wrong component;
- keep a threat path alive;
- drop a critical service;
- waste AP;
- reduce Confidence.

## 4.5 MAP

Player question: **Can I construct the correct spatial/logical picture?**

R-heavy mechanic used for:
- RF coverage;
- cameras;
- physical topology;
- OSINT route/custody chain;
- endpoint propagation;
- Site 0 dependency map.

## 4.6 PRIORITIZE

Player question: **What matters first under limited time?**

UI forms:
- reorder incident events;
- queue restore targets;
- triage endpoints;
- choose responder traffic priority;
- choose evacuation/system sequence.

A correct priority choice may not maximize every score channel. Tradeoffs are intentional.

## 4.7 AUTHORIZE

Player question: **Are we permitted to do this here, now, for this purpose?**

UI forms:
- scope overlay;
- access tag;
- emergency exception toggle;
- role permission matrix.

Out-of-scope actions may remain mechanically possible in selected story contexts but visibly affect Compliance and consequences.

## 4.8 ISOLATE

Player question: **What must be separated to stop propagation or reduce risk?**

Used for:
- compromised endpoints;
- network segments;
- untrusted IoT clusters;
- service components;
- suspect wireless equipment;
- physical evidence areas.

Isolation always exposes what availability/connectivity is sacrificed.

## 4.9 ROUTE

Player question: **Which path should traffic, power, people, or the team use?**

Routing can be:
- digital;
- physical;
- power;
- recovery;
- evacuation;
- communications.

## 4.10 MATCH

Player question: **Which components belong together or are compatible?**

Used for:
- cable-to-port;
- interface-to-device;
- hardware bus/component;
- service responsibility;
- physical asset label to record;
- backup image to target system.

## 4.11 SEQUENCE

Player question: **In what order must changes happen?**

Used heavily in:
- installation/migration;
- patching;
- backup/recovery;
- failover;
- evidence capture;
- service restoration;
- power transition.

Sequence tasks use visible dependencies so the player reasons rather than memorizes arbitrary order.

## 4.12 CONFIGURE

Player question: **What controlled change should I apply?**

Config UI must expose only the variables needed to demonstrate the concept. It should feel like a system, not reproduce dangerous operational tooling.

Examples:
- choose approved AP/backhaul/power relation;
- assign network zones;
- choose RBAC role mapping;
- select recovery target;
- allocate cloud capacity;
- set fail-safe state;
- choose storage redundancy model.

## 4.13 PRESERVE

Player question: **What must remain unchanged/recoverable/defensible?**

Used for:
- evidence;
- logs;
- backups;
- user data;
- pre-change configuration;
- chain of custody;
- critical life-safety state.

## 4.14 RECOVER

Player question: **How do I return to a trusted usable state?**

Recovery never means “click restore and done.” It usually requires:
1. choose trusted source;
2. choose scope;
3. apply recovery;
4. verify outcome.

## 4.15 VERIFY

Player question: **How do I know the result is true?**

Verification sources can include:
- independent telemetry;
- service test;
- hash comparison;
- second sensor;
- user/responder confirmation;
- physical observation;
- dependency state.

## 4.16 DOCUMENT

Player question: **Can another person reconstruct what we did and why?**

Documentation may produce:
- Evidence Integrity;
- Compliance score;
- debrief detail;
- future mission Intel;
- reduced uncertainty in later story consequences.

## 4.17 WARN

Player question: **What must the team know now?**

Warnings can create reaction windows, permit 0-AP aborts, or alter route options.

## 4.18 HOLD / ESCORT / STABILIZE

These are E's bridge between physical and technical gameplay.

A technical objective can require a physical condition to remain true:
- rack room secure;
- evidence room access controlled;
- UPS panel reachable;
- civilians outside privacy boundary;
- relay position held;
- T protected while anchored.

---

# 5. LAB_NODE canonical schema

Every substantive lab node must declare at least:

```yaml
id: string
mission_id: string
world_object: string
zone: string
owner_role: R|E|T|shared
concept_ids: []
prerequisites: []
initial_state: UNKNOWN|OBSERVED|...
terminal_state: SEALED|STABILIZED|VERIFIED|...
steps: []
pressure_links: []
kinetic_links: []
wrong_model_consequences: []
interrupt_rules: []
recovery_paths: []
mastery_evidence: []
operational_outputs: []
```

Each step must declare:

```yaml
step_id: string
atom: OBSERVE|COMPARE|CLASSIFY|TRACE|MAP|PRIORITIZE|AUTHORIZE|ISOLATE|ROUTE|MATCH|SEQUENCE|CONFIGURE|PRESERVE|RECOVER|VERIFY|DOCUMENT|WARN|HOLD|ESCORT|STABILIZE|ABORT
role: R|E|T|shared
ap_cost: 0|1|2
window_cost: integer
requires_control: SECURE|NOT_LOST|none
requires_picture: CLEAR|PARTIAL_OR_BETTER|none
requires_tokens: []
consumes_tokens: []
produces_tokens: []
anchors_operator: true|false
fragile: true|false
interrupt_effect: string
success_state_delta: {}
misapplication_state_delta: {}
```

Mission files must be machine-readable enough that a future tactical engine can consume the same data used by narrative/curriculum tools.

---

# 6. Interruption and anchoring

## 6.1 Anchored actions

An action marked `anchors_operator: true` prevents voluntary movement until:
- the step completes;
- T aborts;
- an interrupt forces detachment.

Examples:
- careful imaging stage;
- physical cable/interface operation;
- recovery commit;
- multi-system failover commit.

## 6.2 Interrupt classes

### Soft interrupt
Examples:
- nearby movement;
- non-damaging alarm;
- brief communications disruption.

Effect:
- no progress loss if Control = SECURE;
- otherwise add revalidation requirement.

### Hard interrupt
Examples:
- operator hit;
- node physically damaged;
- power transition during fragile write;
- forced movement.

Effect is node-specific and declared in schema.

### Catastrophic interrupt
Reserved for visible world-state failures, not arbitrary RNG.

Examples:
- rack destroyed;
- evidence physically removed;
- life-safety power bus lost;
- room becomes inaccessible.

Must create a branch/recovery objective, not necessarily instant mission failure.

## 6.3 E protection interaction

`Guard Tech` can negate or redirect the first qualifying operator-targeted hard interrupt that round.

`Hold Equipment` can negate the first node-targeted physical disablement that round.

These mechanics make E directly responsible for the quality of technical work, not just enemy kills.

## 6.4 R warning interaction

If R has previously established a relevant Evidence Token or uses `Warn` before Threat resolution, T may receive one of:
- free Abort;
- safe detach preserving current stage;
- one-step earlier reaction;
- reduced interruption penalty.

The exact benefit must match the information R actually discovered.

---

# 7. Combat-to-technology coupling

## 7.1 Gunfire

Gunfire may:
- raise Detection;
- alter civilian panic;
- damage fragile props if line of fire crosses them;
- create smoke/noise that degrades R Picture;
- force T interruption;
- suppress/kill enemies who would otherwise interrupt lab work.

## 7.2 Suppression

Suppression is deliberately important in PRIM3 because it is the quintessential “buy technical time” action.

A suppressed threat may:
- lose Sprint;
- have reduced Aim;
- delay node contest;
- fail to reach T this Threat phase.

This can make 1 AP of suppression worth more than a low-probability kill attempt.

## 7.3 Overwatch

Overwatch protects:
- approaches to LAB_NODEs;
- Control Zones;
- extraction paths;
- R vantage points.

R gets the strongest long-lane Overwatch synergy, while E gets stronger close-control synergy.

## 7.4 Cover and technical work

LAB_NODE placement matters.

Node interaction tiles can be:
- exposed;
- half-cover adjacent;
- full-cover adjacent;
- physically shielded but with poor exit geometry.

Designers should create situations where the technically ideal node position is tactically uncomfortable.

## 7.5 Destructible objective ecology

Selected mission props may be destructible:
- relay;
- power panel;
- evidence cabinet;
- sensor;
- server enclosure;
- door control;
- physical route barrier.

Destruction can simplify one tactical problem while worsening the technical objective.

Example:
shooting a hostile actuator control may stop an immediate threat but remove telemetry needed to understand the root cause.

## 7.6 Injury and cognition

Wounded T does not become randomly “bad at computers.”

Instead injury can:
- reduce movement;
- create Will checks for anchored actions under fire;
- make 2-AP careful work tactically harder to justify;
- require E escort;
- increase interruption sensitivity.

Correct technical reasoning remains correct.

---

# 8. Technology-to-combat coupling

Technical success must frequently reshape tactical play.

Possible outputs:
- camera arc disabled or verified safe;
- door state restored;
- safe route opened;
- responder ETA delayed/accelerated;
- hostile fictional sensor becomes unreliable;
- lighting changes LOS;
- power restored to elevator/extract path;
- authenticated comms allow coordinated reinforcement;
- building telemetry reveals hidden movement;
- containment prevents hostile propagation into a security subsystem;
- network segmentation stops a cyber-physical cascade;
- recovered access-control state reduces door hazards;
- correct failover preserves life safety while removing hostile control path.

A technical objective that never affects what happens on the board should be challenged as insufficiently integrated.

---

# 9. Threat AI roles relative to labs

Enemies are not all simple shooters. Missions may include fictional adversary roles with tactical goals.

## 9.1 Interdictor
Goal: move toward T / LAB_NODE and force interruption.

## 9.2 Flanker
Goal: break E Control Zone by attacking from uncovered route.

## 9.3 Saboteur
Goal: damage or disable mission infrastructure.

## 9.4 Retriever
Goal: physically take evidence/objective item and move toward exit.

## 9.5 Spotter
Goal: improve enemy Detection/aim by maintaining LOS rather than dealing high damage.

## 9.6 Controller
Goal: operate a fictional environmental/door/sensor control object.

## 9.7 Responder
Goal depends on mission legitimacy/visibility. May be neutral, confused, or hostile based on Exposure/authorization context.

## 9.8 Civilian / noncombatant
Not an enemy. Can create congestion, uncertainty, privacy exposure, or rescue obligations.

Mission AI should pressure the concept being taught. Example: a Data Breach mission should include an evidence-retrieval threat or privacy/custody problem, not merely random riflemen spawned because combat is expected.

---

# 10. Concept family -> mechanics mapping

This section defines the default mechanic families for recurring IT concepts.

## 10.1 Authorization / scope / least privilege

Relevant atoms:
- AUTHORIZE
- CLASSIFY
- ROUTE
- DOCUMENT

Battlefield expressions:
- doors/assets colored by scope state;
- actions mechanically available but compliance-risky;
- emergency condition changes legal action set;
- role permissions vary.

Mastery evidence:
- avoids unauthorized shortcut;
- recognizes ambiguous asset and seeks clarification;
- chooses least-privilege path that still meets objective.

## 10.2 Logs / telemetry / monitoring / incident indicators

Relevant atoms:
- OBSERVE
- COMPARE
- TRACE
- PRIORITIZE
- VERIFY

Battlefield expressions:
- R builds timeline from distributed sources;
- T uses confirmed timeline to reduce containment scope;
- wrong correlation wastes Window or isolates wrong service.

## 10.3 Networking / topology / routing

Relevant atoms:
- MAP
- TRACE
- ROUTE
- MATCH
- CONFIGURE
- VERIFY

Battlefield expressions:
- logical edges mirror physical paths;
- damaged switch/backhaul/power segment changes route;
- R may discover physical topology clue that simplifies T's graph.

## 10.4 Wireless / RF

Relevant atoms:
- MAP
- COMPARE
- CLASSIFY
- TRACE
- CONFIGURE
- VERIFY

Battlefield expressions:
- coverage heatmap overlays grid;
- strong signal != authenticated service;
- obstacles/weather/power affect coverage;
- R maps signal, E reaches/holds relay, T restores trusted service.

## 10.5 Identity / MFA / biometrics / credentials

Relevant atoms:
- CLASSIFY
- AUTHORIZE
- COMPARE
- ISOLATE
- VERIFY

Battlefield expressions:
- identity state influences door/service trust;
- compromised credential changes confidence, not automatic guilt;
- second-factor/biometric concept shown as layered evidence, not magical security.

## 10.6 Malware families

Relevant atoms:
- OBSERVE
- CLASSIFY
- MAP
- ISOLATE
- PRESERVE
- RECOVER
- VERIFY

Battlefield expressions:
- different endpoints exhibit different symptom cards;
- propagation map changes over rounds if containment delayed;
- E physically quarantines devices/areas;
- T restores trusted assets after isolation.

No executable malware behavior is taught.

## 10.7 Application security / input validation / RBAC

Relevant atoms:
- TRACE
- CLASSIFY
- ISOLATE
- CONFIGURE
- VERIFY

Battlefield expressions:
- abstract data-flow graph;
- untrusted-input paths represented as colored tokens/flows;
- player protects privileged function boundaries;
- safe-mode workflow can alter mission reinforcements/continuity.

No exploit payload construction.

## 10.8 Patching / versions / secure update

Relevant atoms:
- COMPARE
- PRIORITIZE
- SEQUENCE
- PRESERVE
- CONFIGURE
- VERIFY
- RECOVER

Battlefield expressions:
- version/dependency graph;
- maintenance window;
- compatibility risk;
- signed/verified package cues;
- rollback state.

## 10.9 Installation / migration / backup / rollback

Relevant atoms:
- MATCH
- PRIORITIZE
- SEQUENCE
- PRESERVE
- CONFIGURE
- VERIFY
- RECOVER

Battlefield expressions:
- endpoints have compatibility and downtime constraints;
- migration can be interrupted by physical pressure;
- correct pre-change preservation provides recovery path.

## 10.10 Cloud IaaS / PaaS / SaaS / shared responsibility

Relevant atoms:
- MAP
- CLASSIFY
- TRACE
- AUTHORIZE
- CONFIGURE
- VERIFY

Battlefield expressions:
- layered service graph;
- each layer has owner/responsibility tag;
- only controlled layers may be changed;
- end-to-end verification requires multiple layer states.

## 10.11 CapEx / OpEx / capacity / cost

Relevant atoms:
- COMPARE
- ALLOCATE
- PRIORITIZE
- CONFIGURE
- VERIFY

Battlefield expressions:
- resource budget becomes part of mission planning;
- player allocates temporary/owned capacity under load;
- cheaper tactical choice can create slower recovery or future cost.

## 10.12 Hardware / CPU / memory / storage / PCIe / power

Relevant atoms:
- OBSERVE
- CLASSIFY
- MATCH
- TRACE
- ALLOCATE
- VERIFY

Battlefield expressions:
- physical hardware bench/rack;
- compatibility matching;
- load/power limits;
- component failure affects tactical services.

## 10.13 RAID / redundancy / parity / recovery sites

Relevant atoms:
- CLASSIFY
- MATCH
- ALLOCATE
- TRACE
- CONFIGURE
- RECOVER
- VERIFY

Battlefield expressions:
- array diagram tied to physical disks/links;
- failure-domain events occur during battle;
- player must distinguish redundancy from backup;
- hot/warm/cold site tradeoff affects restoration time and capability.

## 10.14 IoT / sensors / actuators / segmentation / fail-safe

Relevant atoms:
- COMPARE
- CLASSIFY
- TRACE
- ISOLATE
- ROUTE
- CONFIGURE
- VERIFY
- STABILIZE

Battlefield expressions:
- sensor values can disagree with physical reality;
- actuator states change doors/HVAC/lights;
- E can manually stabilize physical state;
- T segments automation and restores only trusted control.

## 10.15 OSINT / corroboration / confidence

Relevant atoms:
- OBSERVE
- COMPARE
- MAP
- TRACE
- CLASSIFY
- DOCUMENT

Battlefield expressions:
- evidence board plus physical map;
- multiple public/owner-provided sources;
- confidence level affects available tactical routes;
- rival team arrival turns analysis into time-sensitive physical objective.

---

# 11. Mastery event model

The engine records **what the player demonstrated**, not just final correctness.

Possible mastery events:

```text
concept.recognized
concept.misclassified
concept.corroborated
concept.applied
concept.applied_under_uncertainty
concept.validated
concept.failed_validation
concept.transferred
concept.overridden_by_tactical_need
concept.recovered_after_error
concept.explained_in_debrief
```

Each event stores:
- concept ID;
- mission;
- role;
- node;
- timestamp/turn;
- evidence observed;
- action chosen;
- result;
- whether lesson help was opened.

A player who makes an initially wrong classification and then correctly uses new evidence to recover can earn meaningful mastery credit for correction.

---

# 12. Lab error philosophy

## 12.1 Errors should create game state, not red-X pedagogy

Wrong actions can cause:
- lost AP;
- lost Window;
- lower Service Health;
- lower Evidence Integrity;
- higher Detection;
- more enemies/responders;
- additional recovery stage;
- alternate route;
- partial objective;
- debrief criticism;
- future story consequence.

## 12.2 Error must be diagnosable

The player should eventually be able to understand **why** the action failed through:
- changed telemetry;
- validation result;
- R observation;
- physical consequence;
- debrief explanation;
- lyric-cue review.

## 12.3 No arbitrary gotchas

A mission can surprise the player with hidden information, but must not require knowledge that was neither:
- taught in current/prior song material;
- discoverable in mission evidence;
- or explicitly identified as a transfer challenge.

---

# 13. Kinetic fun standard

PRIM3 remains a satisfying tactical action game.

Every major mission should consider:
- visually readable cover transitions;
- flanking opportunities;
- overwatch lanes;
- suppression decisions;
- destructible/interactive environment;
- arrival animations for responders;
- role-specific movement/interaction animations;
- cinematic camera cuts on high-impact actions;
- weapon handling appropriate to role;
- damage/injury feedback;
- close calls around LAB_NODEs;
- tactical extraction under pressure.

The technical objective should create the reason the firefight matters.

Example:
not “kill five guards, then do the computer.”
Instead:
- R discovers an evidence retriever is moving toward the secure room;
- E must choose between holding T's room and intercepting the retriever;
- T is one step from sealing the incident timeline;
- shooting the retriever through the glass risks destroying the storage unit;
- suppression buys one round but raises Detection;
- completing T's isolation can electronically secure an internal door and change the geometry.

That is PRIM3's target texture.

---

# 14. Required mission authoring fields

Every playable song mission must define:

1. `concept_set`
2. `learning_objectives`
3. `operational_objectives`
4. `map_zones`
5. `role_start_positions`
6. `R_nodes`
7. `E_control_objectives`
8. `T_nodes`
9. `task_atom_graph`
10. `AP_costs`
11. `clock_costs`
12. `PictureState rules`
13. `ControlState rules`
14. `technical state variables`
15. `enemy roles`
16. `enemy lab interactions`
17. `kinetic-to-tech consequences`
18. `tech-to-kinetic consequences`
19. `interrupt rules`
20. `wrong-model consequences`
21. `recovery paths`
22. `optional objectives`
23. `authorization boundaries`
24. `operational grade outputs`
25. `mastery events`
26. `lyric-cue review bindings`
27. `canon story state writes`

A mission missing these is a blueprint, not implementation authority.

---

# 15. Designer acceptance tests

A mission is rejected if any answer below is “no.”

### Concept integration
- Can the player fail to understand a concept and see a specific battlefield consequence?
- Can the player demonstrate understanding without opening a school-style quiz?
- Does the mission use at least one task atom for every primary concept?

### Role integration
- Does R generate information that changes E/T options?
- Does E create/control space that changes R/T viability?
- Does T produce technical state that changes the board or mission outcome?

### AP integration
- Is there at least one round where shooting competes directly with lab progress for AP?
- Is there at least one meaningful reason to delay technical work for tactical positioning?
- Is there at least one meaningful reason to continue technical work despite tactical danger?

### Validation
- Does at least one key change require explicit verification?
- Can a superficially successful but unverified intervention produce a weaker outcome?

### Recovery
- Can the player recover from at least one technical mistake without restarting?
- Can the player extract with partial technical value?

### Kinetic interest
- Does combat pressure the actual mission system rather than exist as filler?
- Does at least one technical success alter combat geometry, information, or threat pressure?

### Story
- Does the lab advance the episode's human conflict or continuity rather than pause it?

---

# 16. Canonical one-round example — wireless mission

Initial state:
- Window = 5
- Picture = PARTIAL
- relay room = CONTESTED
- T has reached wireless console
- hostile Interdictor is two moves from relay room
- unknown AP overlaps responder channel

Player Phase:
1. R `Compare Sources` (1 AP) using spectrum + approved inventory.
   - produces `AUTHORIZED_AP_CONFIRMED`.
2. T `Trace` (1 AP).
   - Evidence Token removes decoy backhaul edge.
3. E `Hold Angle` (1 AP).
   - relay room becomes SECURE for current round.
4. T `Configure` (1 AP).
   - selects approved AP + viable backhaul.
   - state -> VALIDATION_PENDING.
5. R now chooses:
   - `Overwatch` to stop Interdictor, or
   - `Validate External State` to independently confirm responder traffic.
6. E now chooses:
   - `Suppress` Interdictor, or
   - `Guard Tech` in case contact reaches the room.

There is no isolated “wireless quiz.” The player demonstrates wireless understanding through a tactical chain whose completion depends on six-AP squad management.

---

# 17. Canonical one-round example — incident response mission

Initial state:
- Window = 4
- evidence room SECURE
- operations floor CONTESTED
- T has classified a personnel service as affected but containment is unverified
- Retriever enemy is moving toward evidence exit

Player Phase options:
- R can spend 1 AP correlating an access-log event with a transfer spike, narrowing containment scope.
- E can spend 1 AP protecting T or move to intercept Retriever.
- T can spend 1 AP isolating the broader service immediately, losing availability, or wait for R's evidence and isolate a narrower dependency.
- Any unit can spend AP on fire/suppression.

Correct IT knowledge does not remove the tactical decision. It makes the consequences legible.

---

# 18. Content scaling rule

Season progression should not mainly add bigger numbers. It should add **dependency depth**.

Early missions:
- one node;
- one concept family;
- obvious evidence;
- short action graph.

Mid missions:
- multiple nodes;
- competing objectives;
- cross-role evidence;
- partial uncertainty;
- recovery paths.

Late missions:
- multiple interacting infrastructure domains;
- prior-song concept transfer;
- adversary manipulation of information;
- cyber-physical consequences;
- authorization conflicts;
- simultaneous R/E/T objectives;
- dynamic failover;
- story-locked costs.

The capstone RAID mission should feel difficult because the player must integrate seven seasons of systems thinking while surviving Site 0, not because enemies simply have enormous HP.

---

# 19. Definition of done

The tactical IT layer is complete for a concept only when:
- concept ID exists;
- lyric cue exists or is planned;
- lesson exists or is planned;
- at least one observable signal exists;
- at least one inference exists;
- at least one player action applies the concept;
- action has explicit AP/clock/state cost;
- wrong application changes world state;
- validation path exists;
- tactical pressure can interact with the task;
- task can interact back with tactical pressure;
- mastery event is recorded;
- debrief can explain the result;
- exact lyric cue can be replayed.

That is the minimum mechanical standard for PRIM3's educational claim.