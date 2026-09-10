---
status: REFERENCE IMPLEMENTATION
mission_id: LVL-19
mission_name: Hot Site
song: RAID (HOT SITE)
season: 7
episode: 1
system: Tactical learning capstone
version: 1.0.0
inherits:
  - game/TACTICAL-LAB-MECHANICS-AUTHORITY.md
  - episodes/S07E01-RAID-HOT-SITE.md
---

# LVL-19 — HOT SITE — Granular Tactical Learning Capstone

Purpose: prove the PRIM3 system can scale from a contained IT incident into a cinematic multi-floor assault without losing the educational mechanics.

The existing locked story outcome remains: Jordan and Benji enter Site 0 with separate teams, the teams are destroyed, Jordan and Benji survive, nearly fight one another, ally against Prime, defeat him together, and preserve the life-support/succession state required for Evil Twin/Ghost.

All Site 0 systems and attack paths are fictional abstractions.

---

# 1. Capstone concept set

Primary:
- `storage.raid`
- `storage.raid0`
- `storage.striping`
- `storage.raid1`
- `storage.mirroring`
- `storage.raid5`
- `storage.parity`
- `storage.raid6`
- `storage.double-parity`
- `storage.raid10`
- `storage.failure-tolerance`
- `recovery.hot-site`
- `recovery.warm-site`
- `recovery.cold-site`
- `recovery.rto`
- `recovery.resilience`

Transferred concepts from earlier episodes:
- authorization;
- identity/authentication;
- signal vs service;
- containment;
- evidence preservation;
- cloud high availability;
- dependency mapping;
- human override / life safety;
- physical topology;
- hardware/power;
- validation.

Mission thesis:
**Redundancy is not “more copies = safe.” The player must understand which redundancy preserves life, which preserves hostile authority, what failures each design tolerates, and what restoration cost/time follows from each state.**

---

# 2. Mission structure

Full-game version is a checkpointed multi-phase capstone, not literally constrained to a 3-minute play session.

Player-control structure:

```text
PHASE A — Jordan team / Exterior-L1
PHASE B — Benji team / alternate route
PHASE C — alternating viewpoints through Site 0
PHASE D — both teams collapsing / redundancy reveals
PHASE E — Jordan + Benji convergence
PHASE F — Prime control-core fight
PHASE G — succession/life-support validation
```

Each phase contains both kinetic and systems objectives.

---

# 3. Global Site 0 state

Mission-wide state variables:
- Prime Authority: 100
- Life Safety: 100
- Facility Power: 100
- Environmental Control: 100
- Internal Comms: 100
- External Exposure: 0
- Evidence Integrity: 3
- Jordan Team Strength: story-decaying
- Benji Team Strength: story-decaying
- Failover Map Confidence: 0/100
- Hostile Redundancy Remaining: 5 abstract domains
- Safe Redundancy Remaining: 5 abstract domains

The player is not rewarded for simply driving all system-health values to zero.

---

# 4. Redundancy Domains

Each major subsystem is tagged with a failure-domain profile.

## D1 — Command/Authority
Purpose: lets Prime issue orders and control defenses.
Goal: remove hostile write/command capability while retaining enough authenticated continuity for succession handoff.

## D2 — Life Safety
Purpose: suspension/life support, environmental controls, emergency doors.
Goal: preserve.

## D3 — Tactical Defense
Purpose: fictional sensors, locks, automated defensive response, local coordination.
Goal: selectively degrade/disable.

## D4 — Data/Evidence
Purpose: archives, mission records, succession evidence.
Goal: preserve sufficient integrity.

## D5 — Mobility/Power
Purpose: lifts, ramps, doors, power distribution.
Goal: route and stabilize enough to keep moving.

Player actions in one domain can trigger failover into another.

---

# 5. Field-R capstone mechanics

R becomes the **redundancy cartographer**.

Actions:
- `TRACE FAILOVER` — 1 AP: follow one discovered dependency edge.
- `COMPARE MIRRORS` — 1 AP: determine whether two apparent nodes are redundant peers, upstream/downstream, or decoys.
- `MARK FAILURE DOMAIN` — 1 AP: group nodes whose loss would share a consequence.
- `WARN FAILOVER` — 0 AP when an enemy/system state is predicted to recover through another path.
- `VERIFY DARK` — 1 AP: prove a supposedly disabled path did not return through alternate service.
- standard Scan/Overwatch/Mark Threat remain active.

R Evidence Tokens:
- `HOSTILE_FAILOVER_PATH`
- `LIFE_SAFETY_DEPENDENCY`
- `MIRRORED_CONTROL_NODE`
- `PARITY_RECOVERY_AVAILABLE`
- `COLD_PATH_TOO_SLOW`
- `HOT_PATH_ACTIVE`
- `FAILURE_DOMAIN_SHARED`

R's core risk:
spending AP on shooting protects the squad now; spending AP on failover mapping prevents Prime from coming back through another subsystem next turn.

---

# 6. Field-E capstone mechanics

E turns redundancy into physical space.

Actions:
- hold stair/lift/ramp junctions;
- escort T across moving failure domains;
- preserve access to a life-safety panel while abandoning another route;
- manually stabilize doors/power isolation states;
- defend a node during 2-AP anchored work;
- choose which room/route to surrender when the team can no longer hold both.

New E capstone action: `SACRIFICE ZONE` — 1 AP.
- deliberately yields one Control Zone to preserve another;
- may close a route permanently;
- can prevent team wipe or protect life-safety node;
- creates story/grade consequence but is not automatically failure.

New E capstone action: `MANUAL HOLD` — 2 AP.
- physically maintains a failing door/power/mechanical state for one Threat phase;
- E cannot fire/Overwatch during that activation;
- lets T/R finish a critical lab stage.

---

# 7. Field-T capstone mechanics

T must reason about array/recovery/failover state and authority, not perform live intrusion procedures.

Core actions:
- characterize array/failover topology;
- predict failure tolerance;
- choose which redundancy to preserve or sever;
- select hot/warm/cold restoration behavior under time pressure;
- validate that hostile authority did not silently fail over;
- preserve life-support/succession-critical identity state;
- recover trusted path from known-good fictional state.

New T capstone action: `FAILURE TEST` — 1 AP.
- applies a simulated/contained failure to one displayed abstract subsystem;
- player predicts resulting availability before commit;
- system then reveals actual result;
- mastery comes from model accuracy, not exploit skill.

New T capstone action: `SELECTIVE FAILOVER` — 2 AP ANCHORED.
- routes service/authority through chosen surviving path;
- can save life safety or accidentally preserve Prime's hostile control if dependency reasoning is wrong.

---

# 8. RAID Array Lab

Node: B4/B5 continuity control.
Roles: R/T/E.

Visual abstraction:
several fictional disk arrays are shown as blocks with capacity/performance/redundancy behavior.

The player is asked to reason from state rather than answer “what is RAID 5?”

Example scenario A:
- four data members shown striped with no redundancy;
- one member marked failed;
- player predicts recoverability.

Correct reasoning:
- data set unavailable/unrecoverable under mission abstraction.

Example scenario B:
- mirrored pair;
- one member failed;
- player predicts availability and replacement/rebuild need.

Example scenario C:
- parity-protected array with one failed member and degraded state;
- player must choose whether to spend time rebuilding before exposing it to another simulated fault.

Example scenario D:
- double-parity abstraction;
- player chooses which simultaneous failure count remains survivable.

Example scenario E:
- RAID 10 visual;
- player must reason about mirror-pair failure distribution, not simply memorize “two drives can fail.”

No real destructive disk commands are shown.

Battlefield coupling:
- correct array reasoning keeps evidence archive available;
- wrong reasoning can make optional records unavailable, reducing Evidence Integrity/Scope for later Evil Twin confession verification;
- a firefight near storage/power nodes may force T to act while array is already degraded.

---

# 9. Hot / Warm / Cold Site Lab

Node: B4/B5 continuity orchestration.
Concepts: hot site, warm site, cold site, restoration cost/time, resilience.

The player sees three fallback environments:

HOT:
- high readiness;
- high ongoing cost;
- fastest mission recovery;
- may also preserve Prime's hostile control if blindly activated.

WARM:
- partial readiness;
- moderate restore time;
- lower ongoing burden.

COLD:
- bare infrastructure;
- slowest restoration;
- least immediately useful under assault.

Task:
The system presents multiple services with different RTO/life-safety requirements. Player must assign restore targets to fallback environments.

Examples:
- life support requires near-immediate continuity;
- public analytics archive can tolerate long delay;
- hostile tactical command should not be failed over even if a hot site exists;
- evidence archive may accept slower but integrity-preserving restoration.

Task atoms:
CLASSIFY -> PRIORITIZE -> ALLOCATE -> CONFIGURE -> VERIFY.

Kinetic pressure:
Prime's defenses exploit every extra round. Choosing slower restoration can be technically sound but tactically costly.

---

# 10. Failure-domain battlefield puzzle

R discovers three routes appear independent.

T learns two share the same power domain.

E physically sees that the “separate” corridors converge on one vulnerable utility room.

The player must combine all three perspectives to mark `FAILURE_DOMAIN_SHARED`.

If missed:
- one attack/hazard removes both supposedly redundant paths simultaneously;
- later debrief explicitly distinguishes component redundancy from failure-domain independence.

This is a signature multi-role teaching moment.

---

# 11. Prime's Tactical Failover AI

Prime's defense behavior should imitate a highly resilient system.

Instead of simply spawning more enemies:
- disabled camera coverage may shift to another sensor layer;
- lost corridor control may activate alternate route/door geometry;
- disabled local command may fall back to degraded autonomous behavior;
- communications loss may increase enemy confusion but also reduce player intel;
- damaged power may move systems to backup with reduced capability;
- destroyed equipment may permanently remove both enemy and player options.

The player should learn to ask:
**What replaced the thing I just took away?**

That question is the mechanical heart of RAID.

---

# 12. Kinetic set-piece coupling

## Set piece A — Mirrored Corridors
Two apparently equivalent routes.
R identifies threat distribution.
E chooses which route to hold.
T discovers both share one control/power dependency.
A firefight can sever the shared dependency, collapsing both routes.

## Set piece B — Parity Under Fire
A continuity subsystem is already degraded.
T can complete a rebuild/recovery step over multiple turns.
E/R must hold while Prime pushes a second failure event.
If the player understands failure tolerance, they know why the second event matters.

## Set piece C — Hot Site Trap
Prime deliberately offers an easy hot failover path.
Activating it restores facility capability fast — including hostile control.
Player must isolate authority from life-safety continuity before committing.

## Set piece D — Final Authority Room
Combat and technical work happen simultaneously.
Jordan/Benji must survive Prime while T/R/E-equivalent actions across surviving characters disable hostile command paths but preserve life support.
Technical completion weakens Prime's tactical board; combat buys the turns required to complete technical state transition.

---

# 13. Story-locked team collapse as mechanics

The canonical deaths cannot be erased by perfect play.

But player skill still matters through **what those deaths buy**.

Each doomed teammate can leave behind one state:
- preserved Evidence Token;
- stabilized door/route;
- ammunition/medical resource;
- mapped failover edge;
- damaged defense node;
- saved civilian/life-safety subsystem;
- final radio clue.

Strong play changes whether the death creates useful continuity or pure loss.

The game must never present locked deaths as caused by the player answering a technical question incorrectly when canon says otherwise.

---

# 14. Jordan / Benji convergence

When both survivor paths meet:
- both initially appear as HOSTILE/UNKNOWN units on each other's tactical picture;
- each has incomplete evidence;
- player receives a short high-pressure recognition/authorization decision;
- aggressive action is possible and can injure the other, but hard canon prevents death here;
- identifying Prime as common hostile authority converts state to TEMPORARY ALLY.

This is a transfer of earlier lessons:
- indicators are not proof;
- identity/authorization matters;
- incomplete information under pressure;
- do not destroy the asset/system/person you still require to complete the real objective.

---

# 15. Final succession lab

The mission does **not** finish when Prime's HP reaches the defeat threshold.

That only unlocks the final technical state.

Node: Suspension / Authority Core.

States:
- PRIME_PHYSICAL_DEFEATED
- PRIME_IDENTITY_STILL_VALID
- LIFE_SUPPORT_REQUIRED
- HOSTILE_COMMAND_PATHS_PARTIALLY_ACTIVE
- SUCCESSION_PATH_AVAILABLE

Player must:
1. classify which identity/authority paths are still active;
2. preserve life support;
3. remove/contain hostile physical command;
4. verify Site 0 no longer accepts independent hostile actuator/personnel commands;
5. leave the system in the exact state required for Evil Twin/Ghost.

This makes the final “boss fight” both kinetic and technical.

---

# 16. AP pressure example

Player has surviving T/E/R-equivalent triad during a parity-defense sequence.

R:
- TRACE FAILOVER — 1 AP;
- identifies second hostile path;
- OVERWATCH — 1 AP.

E:
- HOLD storage-control room — 1 AP;
- SUPPRESS incoming defender — 1 AP.

T:
- FAILURE TEST — 1 AP;
- learns current array can tolerate one more specific abstract fault;
- must choose between VERIFY/REBUILD with remaining 1 AP or start moving toward next floor.

Threat phase:
- Prime pushes a second failure event and an armed defender moves.

The education and combat are the same decision economy.

---

# 17. Scoring

Operational Objective:
- Prime defeated;
- hostile authority removed;
- life safety preserved;
- succession state viable.

Team:
- locked survivor state remains Jordan + Benji;
- score reflects injury severity, resources, what doomed teammates preserved, and avoidable noncombatant harm.

Exposure:
- uncontrolled external effects;
- evidence destruction;
- cascading systems outside Site 0.

Integrity:
- life-safety preservation;
- verified authority transition;
- evidence continuity;
- no destructive shortcut that makes Evil Twin/Ghost impossible.

Time:
- how many failover cycles Prime forces before defeat.

Learning Mastery weighting:
- 15% RAID 0/striping behavior
- 15% RAID 1/mirroring
- 15% parity / RAID 5
- 10% double parity / RAID 6
- 10% RAID 10 failure reasoning
- 15% hot/warm/cold recovery tradeoffs
- 10% failure-domain reasoning
- 10% selective failover / validation

---

# 18. Acceptance tests

- player experiences high-quality cover shooting, reaction fire, suppression, destruction, movement, and dramatic animations;
- technical objectives cannot be ignored and still produce the best outcome;
- killing every visible enemy does not automatically solve hidden failover paths;
- technical success changes enemy behavior/route/system availability;
- combat choices can destroy or preserve technical options;
- R mapping, E physical control, and T technical reasoning are all required at multiple points;
- RAID concepts are demonstrated through failure behavior, not vocabulary trivia;
- hot/warm/cold sites are understood through restoration tradeoffs under pressure;
- at least one failure-domain puzzle requires all three roles;
- story-locked deaths remain canon while player performance changes their operational residue;
- Prime's physical defeat does not end the mission before authority/life-support validation;
- Evil Twin starts from the exact state this mission writes;
- no real facility attack procedure or live target is modeled.

If this mission works, PRIM3 has proven that its learning mechanics can survive a full-scale cinematic tactical climax rather than only controlled tutorial environments.