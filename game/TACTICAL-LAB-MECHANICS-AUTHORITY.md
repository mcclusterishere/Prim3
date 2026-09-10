---
status: CANON
system: Tactical learning + battlefield lab mechanics
version: 1.0.0
owner: Matthew McCluster
authority: Subordinate only to CANON.md; overrides conflicting PROPOSED gameplay notes
---

# PRIM3 Tactical Lab Mechanics Authority

This document is the authoritative mechanical contract for turning PRIM3 song concepts into playable, XCOM-style battlefield work.

PRIM3 is not a shooter with quizzes inserted between firefights. It is a tactical systems game in which **technical knowledge, physical control, reconnaissance, and kinetic action all spend the same scarce turn economy and all modify the same mission state**.

The core fantasy is:

> Field-R buys information. Field-E buys controlled space and time. Field-T converts that information and time into a technically correct mission result. Kinetic force is one tool for preserving the opportunity to do the work, not a separate game stapled onto it.

No episode-level implementation is mechanically complete until it satisfies this document and `game/LEARNING-MISSION-SOURCE-OF-TRUTH.md`.

---

# 1. Immutable tactical economy

## 1.1 Player phase

Standard squad:
- Field-T — Technical
- Field-E — Entry / Hold
- Field-R — Recon / Overwatch

Each unit receives **2 AP** per player phase. Player activates the three units in any order.

Default squad economy per round = **6 AP**.

That six-AP budget must simultaneously pay for:
- movement;
- cover positioning;
- shooting;
- suppression;
- overwatch;
- entry;
- reconnaissance;
- communication actions;
- protection;
- laboratory interaction;
- evidence handling;
- technical validation;
- recovery / stabilization;
- extraction movement.

This is the primary educational coupling. A correct technical decision that consumes four rounds may still be operationally wrong if the team cannot afford the exposure.

## 1.2 AP is time, attention, and physical opportunity

AP is not literally “two seconds.” It represents a bounded chunk of meaningful action within the current tactical beat.

Examples:
- moving to a rack costs 1 AP because body position changes;
- reading an already-visible status panel may be 0 AP or 1 AP depending on complexity;
- validating three competing telemetry sources costs 1 AP;
- reconfiguring a safe sandbox control may cost 1–2 AP;
- taking a shot costs 1 AP because it consumes attention, position, noise budget, and tempo;
- a careful forensic acquisition step costs 2 AP because accuracy and evidence integrity consume the whole activation.

## 1.3 No free technical work

Any technical task that can change mission outcome must consume one or more of:
- AP;
- Window ticks;
- Detection;
- Power budget;
- Evidence integrity;
- Service availability;
- physical position;
- role resource tokens;
- risk / authorization allowance.

A lab that costs nothing is flavor, not gameplay.

---

# 2. Battlefield lab definition

A **LAB_NODE** is a tactical-world object whose state can affect mission objectives and whose interaction requires application of one or more concept IDs from `learning/SONG-CONCEPT-INDEX.md`.

A LAB_NODE may visually be:
- workstation;
- server rack;
- wireless coverage map;
- incident console;
- evidence table;
- cable / patch panel;
- switchboard;
- access-control station;
- recovery array;
- cloud architecture dashboard;
- hardware bench;
- UPS / power distribution panel;
- sensor / actuator console;
- cost / capacity planning terminal;
- authorization / rules-of-engagement desk;
- service dependency map;
- forensic evidence locker;
- simulated application console;
- identity / access dashboard;
- containment board;
- communications relay;
- Site 0 continuity control.

A LAB_NODE is **diegetic**: it belongs in the location and story. It is never presented as a floating school quiz with no relationship to the operation.

---

# 3. Universal lab state machine

Every substantive LAB_NODE uses some subset of this canonical state machine:

```text
UNSEEN
  -> OBSERVED
  -> CHARACTERIZED
  -> PLAN_SELECTED
  -> WORK_IN_PROGRESS
  -> VALIDATION_PENDING
  -> COMMITTED
  -> VERIFIED
  -> SEALED / STABILIZED

Wrong or interrupted paths may branch to:
  DEGRADED
  CONTAMINATED
  INCONCLUSIVE
  LOCKED_OUT
  UNSAFE
  ABORTED
  RECOVERABLE
```

## 3.1 OBSERVED
Player has physically or remotely discovered the node.

Typical producer:
- R reveals it through picture/intel;
- E enters the space;
- T sees it after reaching the tile.

## 3.2 CHARACTERIZED
The system exposes the variables relevant to this mission.

Examples:
- which logs disagree;
- which disk failed;
- which wireless source is authenticated;
- which service depends on which layer;
- which cable or port corresponds to which endpoint;
- which dataset contains sensitive records;
- which failover path is life-safety critical.

## 3.3 PLAN_SELECTED
Player commits to a technical interpretation or intervention plan.

This is where concept knowledge becomes gameplay. Selection is not always a multiple-choice button: it can be graph routing, classification, ordering, matching, allocation, placement, or state manipulation.

## 3.4 WORK_IN_PROGRESS
One or more AP have been invested. The node can be interrupted by threat, damage, power state, movement, or player abort.

## 3.5 VALIDATION_PENDING
The intervention appears complete but has not yet been proven correct.

PRIM3 treats **validation as a separate verb**. “I changed it” and “I proved it works” are mechanically distinct.

## 3.6 COMMITTED
The chosen state has been applied. Some choices become expensive to reverse.

## 3.7 VERIFIED
The player has gathered confirming evidence that the intended effect occurred.

## 3.8 SEALED / STABILIZED
The result now counts toward mission scoring even if the team must immediately extract.

For evidence-oriented labs this may mean `SEALED`.
For infrastructure/service labs this may mean `STABILIZED`.

---

# 4. Universal technical task atoms

Every lab interaction must be built from one or more **Task Atoms**. These are reusable mechanics attached to concept families.

| Atom | Player activity | Typical role | Typical AP | Educational evidence |
|---|---|---|---:|---|
| OBSERVE | reveal a state without changing it | R/T | 0–1 | identifies relevant signal |
| COMPARE | compare two or more states/sources | R/T | 1 | distinguishes differences |
| CLASSIFY | assign an item/event to the correct category | T/R | 1 | concept recognition |
| PRIORITIZE | order items by urgency/value | T/E/Lead | 1 | understands operational consequence |
| TRACE | follow a dependency/path/topology | R/T | 1 | systems relationship understood |
| MAP | convert observations into a spatial/logical model | R | 1–2 | picture accuracy |
| AUTHORIZE | choose whether an action is in scope | E/T/Lead | 0–1 | governance understanding |
| ISOLATE | separate a component/zone/service | T/E | 1 | containment/segmentation reasoning |
| ROUTE | select a valid path for data/power/people/traffic | R/E/T | 1 | topology and dependency reasoning |
| ALLOCATE | distribute scarce capacity/resources | T/Lead | 1 | capacity/cost/reliability understanding |
| MATCH | connect compatible components/layers | T | 1 | hardware/protocol/service knowledge |
| SEQUENCE | put operations in safe/correct order | T/E | 1–2 | procedure reasoning |
| CONFIGURE | change a sandbox/system state | T | 1–2 | applied technical understanding |
| PRESERVE | protect evidence/data/system state | T/E | 1–2 | integrity/continuity understanding |
| RECOVER | restore from a known-good state | T | 1–2 | backup/recovery understanding |
| VERIFY | test whether an intended result is actually true | T/R | 1 | validation discipline |
| DOCUMENT | capture a defensible record | T/R | 1 | evidence/professional practice |
| WARN | convert picture into team action | R | 0–1 | interpretation under uncertainty |
| HOLD | maintain a physical control condition | E | 1 | space/time management |
| ESCORT | keep another role safely mobile | E | 1 | operational dependency |
| STABILIZE | stop worsening physical/system state | E/T | 1 | triage and continuity |
| ABORT | deliberately stop unsafe/incomplete work | any | 0–1 | judgment and reversibility |

No lab should be designed by inventing a one-off UI first. Designers select concept IDs, then choose the task atoms that demonstrate mastery of those concepts.

---

# 5. Role currencies

In addition to AP, each role produces a battlefield resource used by the others.

## 5.1 Field-R produces PICTURE

Picture has four states:
- CLEAR
- PARTIAL
- UNCERTAIN
- HOSTILE

Field-R can also generate **Evidence Tokens** representing confirmed external facts.

Examples:
- authorized access point confirmed;
- route clear for one round;
- camera arc mapped;
- power hazard identified;
- two logs correlate;
- vehicle arrival predicted;
- false signal identified.

Evidence Tokens are not arbitrary buffs. Each token must name the fact it establishes.

Mechanical uses:
- reduce a T lab from 2 AP to 1 AP when R already characterized the relevant variable;
- remove one decoy option;
- reveal a hidden dependency edge;
- prevent a false-positive penalty;
- give E one safe-route tile bonus;
- allow a lab validation attempt without spending an additional Window tick.

## 5.2 Field-E produces CONTROL

Field-E creates **Control Zones** on rooms, doors, corridors, equipment areas, civilians, and extraction paths.

Control states:
- SECURE
- CONTESTED
- LOST

Mechanical uses:
- T working inside SECURE space cannot be interrupted by the first nearby non-damaging threat event;
- T in CONTESTED space pays +1 Window tick on multi-step lab commits;
- T in LOST space cannot begin a 2-AP careful interaction unless a specific emergency perk permits it;
- civilians/evidence inside SECURE space cannot generate accidental exposure events that round;
- E can spend 1 AP to `Guard Tech`, redirecting one attack/interrupt from T;
- E can spend 1 AP to `Hold Equipment`, preventing a LAB_NODE from being physically disabled for one Threat phase.

## 5.3 Field-T produces TECHNICAL STATE

Field-T converts Picture + Control + AP into:
- Take Integrity;
- Service Health;
- Containment;
- Recovery Progress;
- Configuration Confidence;
- Evidence Integrity;
- System Availability;
- Objective Tokens.

T is not automatically the only character who can touch a lab. R and E may perform meaningful technical task atoms where appropriate, but T owns the deepest system interaction and final technical validation in standard missions.

---

# 6. Lab pressure variables

Each LAB_NODE may carry zero or more pressure variables. These are the bridge between the shooting game and the technical game.

## 6.1 TIME
Measured through Approach/Window/Extract clocks.

Wrong choice consequence examples:
- −1 Window;
- extra validation step;
- forced Rapid Triage path;
- objective becomes partial-only.

## 6.2 THREAT
Enemies can:
- interrupt a multi-AP task;
- force T to leave the node;
- damage the node;
- contest E's Control Zone;
- force R to abandon a vantage point;
- consume AP that would otherwise go to the lab.

## 6.3 DETECTION
Noise and visible action alter reinforcement pressure.

Kinetic actions are satisfying and valid, but frequently costly:
- gunfire increases Detection;
- explosive/loud entry increases Detection more;
- suppressive fire may be tactically superior to killing because it buys a lab turn at lower positional cost;
- destroying a piece of infrastructure can remove an enemy advantage while also deleting an optional evidence objective.

## 6.4 POWER
A node can be:
- NORMAL;
- UPS/BACKUP;
- BROWNOUT;
- OFFLINE;
- UNSTABLE.

Power state can alter which lab actions are legal or valuable.

## 6.5 SERVICE HEALTH
0–100 abstract service state.

Some interventions trade containment for availability. The player may intentionally accept lower availability to protect integrity or life safety.

## 6.6 EVIDENCE INTEGRITY
0–3:
- 0 contaminated/unusable;
- 1 weak but usable;
- 2 solid;
- 3 defensible/clean.

## 6.7 CONFIDENCE
Player-facing confidence may be:
- confirmed;
- likely;
- possible;
- unknown.

Labs should sometimes require action before certainty reaches “confirmed.” R's job is to improve confidence; the player must learn that perfect information is not always available.

## 6.8 AUTHORIZATION
Actions may be:
- explicitly allowed;
- allowed only under emergency condition;
- outside scope;
- unknown pending verification.

A tactically useful but unauthorized action can improve Objective while damaging Compliance/Standing.

---

# 7. Work-in-progress and interruption mechanics

## 7.1 Persistent partial work

Most multi-step labs persist state between turns.

Example:
- Round 3: T spends 1 AP CHARACTERIZE and 1 AP CLASSIFY.
- Threat phase: contact arrives.
- Round 4: E suppresses and holds; R warns of a second route; T spends 1 AP CONFIGURE and 1 AP VERIFY.

The lab did not disappear because combat happened.

## 7.2 Fragile work

Some lab stages are marked `FRAGILE`.

If interrupted during a FRAGILE stage:
- lose current stage progress; or
- reduce evidence integrity by 1; or
- force a re-validation;
- never silently randomize the technical answer.

The consequence comes from interruption, not from fake “hacker RNG.”

## 7.3 Anchored work

Some 2-AP actions `ANCHOR` T to the node until the next player phase.

While anchored:
- T may not Overwatch;
- movement is unavailable;
- E's Guard Tech becomes especially valuable;
- R warning can allow a 0-AP Abort if called before the Threat phase resolves.

This creates the signature PRIM3 tension: **do we spend T's whole turn for a clean technical result while E/R keep the room alive?**

---

# 8. Knowledge difficulty model

Every concept can be tested at four depths.

## 8.1 RECOGNIZE
Identify the correct object/state/category.

Examples:
- identify a failed disk;
- identify which source is an unauthorized AP;
- distinguish SSD from HDD;
- identify a suspicious transfer spike.

## 8.2 INTERPRET
Explain what the state means for the mission.

Examples:
- a strong RF signal does not prove usable authenticated service;
- redundancy does not equal backup;
- a compromised credential does not prove every endpoint is infected;
- high availability does not mean zero downtime.

## 8.3 APPLY
Make the correct intervention under constraints.

Examples:
- isolate the affected segment without cutting responder communications;
- preserve evidence before destructive recovery;
- choose the right recovery site state for the time/cost objective;
- allocate compute/storage/network resources to meet a service requirement.

## 8.4 TRANSFER
Solve a changed scenario without repeating the lyric's wording.

Example:
The player learned mirroring in RAID 1. Later a different mission presents two synchronized service replicas and asks which failure behavior to expect without naming RAID.

Seasonal difficulty should increasingly shift from recognition toward transfer.

---

# 9. Lab UI grammar

A lab UI must preserve tactical context.

Required screen elements:
- mini tactical view or threat strip remains visible;
- AP remaining;
- Window remaining;
- current Control state;
- current Picture state;
- incoming-threat warning if R has detected one;
- concept name(s) being applied only after the player has encountered or unlocked them;
- objective consequence preview where professionally reasonable;
- explicit Commit and Abort where the action is consequential.

Forbidden default behavior:
- pausing all battlefield pressure for unlimited contemplation;
- disconnected trivia question;
- fake terminal typing as the entire mechanic;
- random “hack success percentage” replacing reasoning;
- unexplained red/green answer coloring before commitment.

---

# 10. Kinetic-combat coupling

PRIM3 should still feel excellent as a shooting tactics game.

## 10.1 Combat verbs remain first-class

- Fire — 1 AP
- Overwatch — 1 AP
- Suppress — 1 AP
- Hunker — 1 AP
- Move — 1 AP
- Sprint — 2 AP
- Stabilize — 1 AP
- role-specific weapon/defense actions as authorized by loadout

Animation should make these actions pleasurable to execute. Camera cuts, impact, sound design, cover destruction, recoil, near misses, reaction fire, and character-specific movement are presentation priorities.

## 10.2 Shooting is a trade, not a moral lecture

The game should never shame the player simply for using kinetic tools in a kinetic mission. Instead, every shot has concrete system consequences.

Possible benefits:
- removes an immediate threat;
- preserves Control;
- prevents a lab interruption;
- stops an enemy from damaging a node;
- buys one more technical turn;
- opens a route.

Possible costs:
- Detection;
- ammunition/reload AP;
- collateral equipment damage;
- destroyed evidence;
- responder escalation;
- injury risk from prolonged contact;
- mission heat / compliance penalties depending on scope.

## 10.3 Technical victory can create combat advantage

Labs must also affect the kinetic board.

Examples:
- restore lighting to remove enemy concealment;
- establish trusted communications so R can share marks;
- restore door controls to create cover/route options;
- correctly map cameras so E can choose a quieter entry;
- restore sensor confidence so reaction-fire lanes become visible;
- stabilize power so extraction lift becomes available;
- validate a service path that reduces reinforcement timing.

Technical work is therefore not only “the objective.” It can change the gunfight.

---

# 11. Cross-role combo actions

These are canonical cooperative patterns.

## 11.1 R -> T: CORROBORATED INPUT
R spends 1 AP to establish an Evidence Token tied to a lab variable.

T consumes the token to:
- remove one false option;
- reduce characterization cost by 1 AP once;
- improve validation confidence.

## 11.2 E -> T: PROTECTED WINDOW
E spends 1 AP adjacent to T or controlling the node room.

Until next player phase:
- first non-catastrophic interruption against T is ignored/redirected;
- T may complete one FRAGILE stage without interruption loss.

## 11.3 R -> E: ROUTE CALL
R spends 1 AP to mark a safe/less-observed route.

E and one adjacent teammate may each gain +1 tile on their next Move or avoid one detection trigger on that route.

## 11.4 T -> R: SENSOR RESTORE
T stabilizes a technical sensor/communications node.

R gains:
- wider Scan Lane;
- one additional Evidence Token opportunity;
- or converts Picture from HOSTILE to UNCERTAIN if the mission supports it.

## 11.5 T -> E: CONTROL RESTORE
T restores a door, camera, alarm, lighting, or environmental state.

E gains a new Control Zone option or converts one LOST area to CONTESTED.

## 11.6 TRIAD ACTION: HARD WINDOW
Requirements:
- R has CLEAR/PARTIAL picture and spends 1 AP warning/marking;
- E spends 1 AP Hold;
- T spends 2 AP on an anchored lab stage.

Result:
- the lab stage completes at maximum integrity;
- but the squad has spent 4 of its 6 AP and accepted major positional risk.

This should be one of the signature animations/gameplay moments of PRIM3.

---

# 12. Concept-to-mechanic binding rules

Every concept ID must declare one or more **mechanical expressions**. Use the following families.

## 12.1 IDENTITY / AUTHENTICATION
Mechanics:
- compare claimed identity to trusted evidence;
- choose factor combinations;
- classify authentication vs authorization;
- isolate compromised identity scope;
- preserve trusted access while revoking suspect access.

Never require entering real credentials or reproducing credential theft procedures.

## 12.2 NETWORKING / WIRELESS
Mechanics:
- map nodes/links;
- distinguish physical signal from authenticated service;
- route traffic through viable paths;
- identify rogue/unknown devices using sandbox indicators;
- segment systems;
- trace dependencies across Layers 1–2 and higher abstractions;
- manage interference/dead zones.

## 12.3 STORAGE / RAID / RECOVERY
Mechanics:
- identify failed components;
- select striping/mirroring/parity behavior from visual array states;
- predict survivability after simulated failures;
- choose restore/failover priority;
- trade RTO, cost, capacity, and resilience;
- verify restored data/service.

## 12.4 INCIDENT RESPONSE / MALWARE
Mechanics:
- classify symptoms;
- prioritize containment;
- isolate affected assets;
- preserve volatile/forensic evidence;
- choose recovery order;
- distinguish confirmed compromise from suspicion;
- protect unaffected operations.

## 12.5 APPLICATION SECURITY
Mechanics:
- identify trust boundaries;
- classify malformed/untrusted input;
- select validation/sanitization/segmentation controls;
- review simplified code/data-flow blocks;
- preserve service while isolating a vulnerable component;
- verify secure behavior in a sandbox.

No real exploit payloads are required to demonstrate mastery.

## 12.6 CLOUD / DISTRIBUTED SYSTEMS
Mechanics:
- match service responsibility to IaaS/PaaS/SaaS layer;
- allocate compute/storage/networking;
- trace service dependencies;
- scale resources against load;
- select high-availability/failover arrangements;
- make CapEx/OpEx cost tradeoffs;
- recover degraded services.

## 12.7 HARDWARE / MEDIA / CABLING
Mechanics:
- identify components;
- match connector/media to requirement;
- trace signal/data path;
- assemble a valid chain;
- diagnose missing/incorrect link;
- trade bandwidth/distance/interference/compatibility.

## 12.8 OS / INSTALLATION / PATCHING
Mechanics:
- choose clean vs in-place strategy;
- preserve/migrate data;
- validate compatibility;
- sequence backup, change, test, rollback;
- classify update/patch effects;
- preserve signed/integrity-checked state.

## 12.9 GOVERNANCE / AUTHORIZATION / OSINT
Mechanics:
- establish scope;
- label evidence as public/owner-provided/restricted;
- corroborate sources;
- track confidence;
- choose authorized next action;
- preserve chain/documentation;
- separate fact from inference.

## 12.10 IOT / CYBER-PHYSICAL
Mechanics:
- distinguish sensor vs actuator;
- establish safe physical state;
- isolate unreliable automation;
- choose manual override;
- reason about stale/conflicting telemetry;
- preserve life-safety dependencies.

---

# 13. Mission objective graph

Every story mission must contain an **Objective Graph**, not a single boolean.

Node types:
- GATE — must happen before downstream work;
- PRIMARY — weighted mission objective;
- SECONDARY — valuable but optional;
- GHOST — difficult low-exposure objective;
- LEARNING — concept mastery event;
- SAFETY — life/safety constraint;
- STORY — continuity event;
- EXTRACT — end-condition.

Edges may be:
- requires;
- improves;
- conflicts-with;
- risks;
- unlocks;
- substitutes-for.

Example:

```text
[R map trusted signal] --improves--> [T restore responder service]
[E secure relay room] --requires-for-clean--> [T anchored configuration]
[T restore service] --unlocks--> [R wider picture]
[gunfight in relay room] --risks--> [equipment integrity]
[public Wi-Fi secondary] --conflicts-with-time--> [responder primary]
```

Mission designers must be able to draw this graph before building the map.

---

# 14. Lab scoring telemetry

Every lab records structured evidence rather than only “passed/failed.”

Minimum telemetry:
- concept IDs encountered;
- concept IDs opened in Study Overlay;
- task atoms attempted;
- first choice;
- final committed choice;
- reversals/aborts;
- AP spent;
- rounds spent;
- role performing action;
- Evidence Tokens used;
- Control state during work;
- Picture state during work;
- interruptions;
- validation performed or skipped;
- operational consequence;
- mastery depth demonstrated: Recognize/Interpret/Apply/Transfer.

This makes later retention studies possible without changing the game design.

---

# 15. Character progression tied to knowledge

XP alone cannot grant advanced technical perks.

A perk may require:
- mission XP threshold;
- AND one or more concept mastery flags.

Examples:

Field-T `Clean Image`:
- Technical XP threshold;
- mastery of evidence preservation + integrity concepts;
- completed one high-integrity lab under pressure.

Field-R `Signal Discipline`:
- Recon XP threshold;
- mastery of signal-vs-service / confidence concepts;
- completed two corroboration actions without false alarm.

Field-E `Protected Window`:
- Entry XP threshold;
- completed multiple Guard/Hold interactions where T finished a lab;
- mastery of physical boundary / life-safety concepts relevant to those missions.

This turns education into capability without making the game feel like school certification screens.

---

# 16. Failure and wrong-answer design

There is no generic “incorrect” modal.

Wrong technical reasoning should manifest as a system consequence the player can read and learn from.

Examples:
- misclassify a benign endpoint as compromised -> unnecessary isolation -> service health drops;
- fail to preserve evidence -> later scope confidence decreases;
- choose the wrong recovery priority -> low-value service returns while critical path remains down;
- trust raw signal strength -> responder channel still fails authentication;
- misunderstand redundancy -> next simulated failure collapses the selected array;
- skip validation -> system appears healthy until Threat phase exposes the hidden defect.

The debrief then explains the causal chain and links back to the exact lyric/concept lesson.

---

# 17. Anti-trivia standard

A lab fails design review if the correct answer can be selected solely because the player memorized a vocabulary definition without reasoning about the current mission state.

A shipping lab should contain at least two of:
- incomplete information;
- competing objectives;
- time pressure;
- spatial risk;
- changing environment;
- evidence quality differences;
- resource scarcity;
- need for cross-role cooperation;
- reversible vs irreversible actions;
- validation step;
- consequence that emerges later rather than immediately.

---

# 18. Mission pacing standard

A standard 12–20 minute playable operation should target:
- 2–4 meaningful kinetic contacts;
- 2–5 substantive lab interactions;
- 1 cross-role dependency moment minimum;
- 1 forced tradeoff between combat tempo and technical quality;
- 1 validation/recovery moment;
- 1 optional objective that tempts overextension;
- 1 extract phase where prior technical state changes the route or pressure.

Short authored 3-minute episode PLAY slices may compress these into fewer turns while the full game version expands them.

---

# 19. Required mission-spec fields

Every mission implementation file must declare:

```yaml
mission_id:
song:
concept_ids:
map:
  zones:
  lab_nodes:
  cover_profile:
  threat_entries:
clocks:
  approach:
  window:
  extract:
roles:
  field_r:
    required_actions:
    produced_evidence_tokens:
  field_e:
    required_actions:
    control_zones:
  field_t:
    required_actions:
    anchored_steps:
objective_graph:
lab_nodes:
  - id:
    concept_ids:
    task_atoms:
    states:
    ap_costs:
    dependencies:
    wrong_path_consequences:
    validation:
    scoring:
threat_schedule:
kinetic_choices:
learning_mastery:
operational_scoring:
debrief_links:
```

A mission with empty role fields is incomplete.

---

# 20. Safety boundary for real-world technical concepts

PRIM3 may teach accurate professional reasoning while keeping offensive procedures sandboxed and non-operational.

Required design practice:
- use fictional/sandbox hosts, identities, networks, facilities, and data;
- represent offensive techniques through detection, symptoms, architecture, or abstract simulation when procedural detail would be harmful;
- never require real credentials or third-party targets;
- never link a mission success condition to live exploitation of an external system;
- prefer remediation, evidence, validation, system design, and controlled range behavior.

This does not require making the game vague. The player should still understand the real concept, the system relationship, and the consequence of correct or incorrect reasoning.

---

# 21. Definition of mechanically complete

A PRIM3 mission is mechanically complete only when all are true:

- the song's concept IDs are enumerated;
- at least three concepts materially alter gameplay;
- every standard role has a meaningful mission contribution;
- at least one LAB_NODE requires cross-role dependency;
- at least one lab is multi-stage;
- at least one lab can be interrupted by battlefield pressure;
- at least one technical success changes the tactical/kinetic board;
- at least one kinetic choice changes technical risk or quality;
- objective graph is explicit;
- wrong technical reasoning produces a causal mission consequence;
- validation exists as a separate action where appropriate;
- operational grade and Learning Mastery are separately scoreable;
- debrief can explain what happened using the exact concept IDs and lyric cues;
- the mission remains interesting even to a player who never opens the full lesson text.

That is the baseline. PRIM3's target is not “educational enough.” The target is a tactical system in which understanding the technology is one of the player's strongest weapons.