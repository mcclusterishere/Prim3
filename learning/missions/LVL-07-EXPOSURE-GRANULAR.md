---
status: REFERENCE IMPLEMENTATION
mission_id: LVL-07
mission_name: Exposure
song: Data Breach
season: 3
episode: 1
system: Tactical learning vertical slice
version: 1.0.0
inherits:
  - game/TACTICAL-LAB-MECHANICS-AUTHORITY.md
  - game/LEARNING-MISSION-SOURCE-OF-TRUTH.md
  - episodes/S03E01-DATA-BREACH.md
---

# LVL-07 — EXPOSURE — Granular Tactical Learning Reference

This is the reference mission for proving that PRIM3 can be a satisfying XCOM-style tactical game and a legitimate applied IT lab at the same time.

The existing episode contract remains authoritative: the personnel/training system is compromised; Jordan finds a pre-recruitment file; the response must contain spread, establish defensible impact scope, preserve evidence, protect people, and avoid response-driven privacy harm.

No offensive procedure is required. All technical systems, identities, traffic, logs, and malware behavior are fictional/sandboxed.

---

# 1. Learning targets

Primary concept IDs:
- `incident.data-breach`
- `incident.breach-indicator`
- `malware.ransomware`
- `physical.usb-risk`
- `rfid.rfid`
- `security.password-attack`
- `security.dictionary-attack`
- `security.brute-force`
- `security.password-hygiene`
- `identity.mfa`
- `incident.supply-chain-attack`
- `vendor.third-party-risk`
- `security.patch-management`
- `incident.abnormal-data-transfer`
- `observability.access-log`
- `incident.unauthorized-access`
- `asset.compromised-asset`
- `crypto.hash`
- `crypto.hash-collision`
- `crypto.salt`
- `incident.containment`
- `forensics.evidence-preservation`

Not all concepts are equally weighted in the tactical slice.

Mission-critical mastery:
1. distinguish an indicator from proof;
2. correlate independent evidence;
3. contain affected scope without unnecessarily killing the whole service;
4. preserve evidence before destructive recovery;
5. protect identity/authentication paths;
6. understand that third-party/supply-chain context changes scope;
7. validate recovery rather than assuming “system is back” means “system is trusted.”

---

# 2. Battlefield map

Grid target: **18 x 24 tiles**.

Zones:

| Zone | Tactical purpose | Technical purpose |
|---|---|---|
| Z-A Public Hall | civilian movement / exposure risk | staff reports and visible symptoms |
| Z-B Operations Center | central cover + command | telemetry / incident timeline LAB_NODE |
| Z-C Identity Room | contested interior | MFA / access-control state LAB_NODE |
| Z-D Personnel Service Room | primary technical objective | service dependency / containment LAB_NODE |
| Z-E Evidence Room | defendable but vulnerable | preservation / chain-of-custody LAB_NODE |
| Z-F Vendor Closet | optional side room | third-party device / supply-chain clue |
| Z-G Loading Corridor | threat entry lane | physical USB/RFID clue path |
| Z-H Extraction Stair | final SAFE zone | physical exit after service stabilization |

Cover intent:
- Public Hall: low cover, many civilians; poor place for a gunfight.
- Operations Center: desks / consoles, medium cover, multiple sight lines.
- Identity Room: tight high cover, one primary and one secondary door.
- Personnel Service Room: equipment racks create narrow lanes; shooting risks hardware damage.
- Evidence Room: high cover but only one normal exit.
- Loading Corridor: long R overwatch lane.

---

# 3. Squad start

Field-R begins in/near Z-G with sight over Loading Corridor and a partial feed from building cameras.

Field-E begins at the Z-A / Z-B boundary controlling staff movement.

Field-T begins inside Z-B at the incident board, one move from the primary telemetry LAB_NODE.

Starting tactical state:
- Detection: 2/10
- Picture: PARTIAL
- Z-B Control: SECURE
- Z-C Control: UNKNOWN
- Z-D Control: UNKNOWN
- Window: 10
- Extract: 6
- Service Health: 68/100
- Evidence Integrity: 3/3 globally available but not yet sealed
- Scope Confidence: 20/100
- Identity Confidence: 60/100

---

# 4. Objective graph

```text
GATE A: Build initial incident picture
  -> PRIMARY 1: Establish credible compromise scope
  -> PRIMARY 2: Contain high-risk affected services
  -> GATE B: Preserve evidence required to justify scope
  -> PRIMARY 3: Restore one trusted critical function
  -> EXTRACT

R vendor clue --------improves------> Scope Confidence
E evidence-room hold -requires------> clean preservation
R loading-lane clue --improves------> physical-access hypothesis
T identity lab -------improves------> safe restoration
T premature wipe -----conflicts-----> Evidence Integrity
Heavy combat Z-D -----risks---------> Service Health / hardware evidence
Optional Jordan file -requires------> authorization + evidence-room access
```

Mission does not require every optional branch.

---

# 5. Role-specific win conditions

## Field-R
Minimum meaningful contribution:
- produce 2 Evidence Tokens from independent sources;
- correctly classify at least one signal as `indicator`, not `proof`;
- detect one physical or external threat before it reaches a critical room.

Excellent R performance:
- 4+ valid Evidence Tokens;
- no false high-priority alert;
- maintains PARTIAL or CLEAR Picture for at least 70% of Window;
- reveals Vendor Closet clue before containment plan is committed.

## Field-E
Minimum meaningful contribution:
- maintain Control over either Z-B or Z-E while T performs a fragile/anchored action;
- prevent civilians/unrelated staff from entering the active evidence boundary;
- establish a safe path from primary node to extraction.

Excellent E performance:
- both Z-B and Z-E remain SECURE through preservation;
- no civilian enters a contested technical room;
- no lab interruption reaches T during a fragile stage;
- E stabilizes any downed team member without losing evidence-room control.

## Field-T
Minimum meaningful contribution:
- characterize telemetry;
- commit one containment action;
- preserve at least one defensible evidence packet;
- validate one trusted service restoration.

Excellent T performance:
- Evidence Integrity 3;
- Scope Confidence >= 80;
- critical service restored with Identity Confidence >= 80;
- no unnecessary isolation of confirmed-clean systems;
- no skipped validation.

---

# 6. LAB NODE A — Incident Timeline Wall

Location: Z-B Operations Center.
Primary roles: R + T.
Concepts: breach indicators, abnormal data transfer, access logs, unauthorized access, compromised asset.

Initial state: OBSERVED.

Visible cards are fictional and non-operational:
- Staff report: “files renamed / unavailable” at 09:14.
- Endpoint alert: unusual process behavior at 09:08.
- Transfer telemetry: outbound volume spike at 08:57.
- Access log: valid account used from an unusual internal zone at 08:51.
- Badge event: vendor technician entered approved area at 08:35.
- Camera issue: loading camera lost power at 08:29.
- Old alert: storage latency warning previous day.
- Rumor: staff member claims “everything was hacked.”

### Stage A1 — Characterize
T cost: 1 AP.
Result: cards become sortable by time/source/confidence.

### Stage A2 — R Corroboration
R cost: 1 AP per comparison action.
R may create:
- TOKEN `TRANSFER_ANOMALY_CONFIRMED` if telemetry + independent service evidence align;
- TOKEN `PHYSICAL_WINDOW_POSSIBLE` if camera loss + vendor/badge timing justify further physical investigation;
- TOKEN `ACCOUNT_USE_RELEVANT` if access timing correlates with affected service.

A token is not “the attacker did X.” It is a defensible statement of what evidence supports.

### Stage A3 — T Scope Hypothesis
T cost: 1 AP.
Player groups assets into:
- likely affected;
- possibly affected;
- currently no evidence of impact.

Wrong reasoning consequences:
- over-scope: Service Health −10 because too many systems are isolated later;
- under-scope: hidden affected asset remains active and causes a Threat-phase degradation;
- treating rumor as proof: Scope Confidence cap −10 until corrected.

### Validation
T or R cost: 1 AP after additional evidence arrives.
Correctly revised hypothesis earns Scope Confidence +20.

---

# 7. LAB NODE B — Identity / Access Console

Location: Z-C Identity Room.
Primary roles: T; E must create safe access; R can provide account-context Evidence Token.
Concepts: password attacks, password hygiene, MFA, unauthorized access, identity confidence.

Initial state: UNSEEN until Z-C is entered or mapped.

The player sees abstract identity states, not real credentials:
- Account A: password-only, unusual internal sign-in.
- Account B: MFA-enabled, normal device, no anomalous activity.
- Account C: vendor-linked, expired assignment but active session.
- Account D: service identity, high privilege, expected automation pattern.

### Stage B1 — Classify Identity Risk
T cost: 1 AP.
Player chooses which identities require containment/review.

Learning trap:
MFA-enabled does not mean “impossible to compromise”; password-only does not prove compromise. Evidence matters.

### Stage B2 — Protect Critical Authentication
T cost: 1 AP.
Player selects a fictional defensive action set such as:
- preserve trusted admin path;
- suspend suspect vendor session;
- force re-verification on affected user group;
- leave unrelated trusted service identity operational.

No real commands or attack procedures are shown.

### Stage B3 — Verify
T cost: 1 AP.
Checks whether authorized critical staff can still access required service while suspect session paths are no longer active.

Success:
- Identity Confidence +25;
- unlocks safer restoration option at Node C.

Failure:
- if player disables everything: Service Health −15 but risk falls;
- if player leaves high-confidence suspect path active: later Threat phase can re-degrade restored service.

E interaction:
Z-C is a narrow room. E can Hold Door for 1 AP. If not controlled, T's Verify stage can be interrupted by hostile/crowd entry.

---

# 8. LAB NODE C — Personnel Service Dependency Board

Location: Z-D.
Primary role: T.
Support: R identifies external dependency; E protects anchored work.
Concepts: containment, compromised asset, patch management, cloud/on-prem boundary, recovery, validation.

Dependencies shown as a fictional graph:

```text
Personnel UI
  -> Application Service
  -> Identity Provider
  -> Personnel DB
  -> Notification Queue
  -> Backup Store
  -> Vendor Sync
```

Some dependencies are healthy, some suspect, one unknown.

### Stage C1 — Trace
T cost: 1 AP.
Player follows observed indicators into the dependency graph.

R Evidence Tokens can reveal:
- `VENDOR_SYNC_HIGH_RISK`
- `EXTERNAL_TRANSFER_PATH_CONFIRMED`
- `NOTIFICATION_QUEUE_CLEAN`

### Stage C2 — Select Containment Scope
T cost: 1 AP.
Options are represented by selecting graph edges/nodes to isolate, not by entering commands.

Tradeoff:
- narrow containment preserves Service Health but requires higher Scope Confidence;
- broad containment is safer against spread but disrupts training/personnel operations;
- wrong dependency cut can also disable notification to affected people.

### Stage C3 — Commit Containment
T cost: 2 AP; ANCHORED + FRAGILE.
Requires either:
- Z-D Control SECURE; or
- E uses Protected Window.

Threat interruption without protection:
- current commit is incomplete;
- Service Health −5;
- T must spend 1 AP next activation to re-characterize state.

### Stage C4 — Validate Containment
T cost: 1 AP.
Validation checks fictional service telemetry and whether suspicious transfer/access behavior stops while critical unaffected pathways remain.

Skipping validation:
The UI allows it. Mission continues. A hidden “residual path” event may occur 1–2 Threat phases later.

---

# 9. LAB NODE D — Evidence Preservation Station

Location: Z-E.
Primary role: T.
Required support: E physical control for best integrity.
Concepts: evidence preservation, hash, salt/collision at conceptual level, chain/documentation.

### Stage D1 — Choose Evidence Set
T cost: 1 AP.
Player has limited storage/time and must choose priority artifacts:
- relevant logs;
- affected service state;
- identity events;
- transfer telemetry;
- optional Jordan pre-recruitment record;
- low-value unrelated bulk data.

Over-collection costs Window and creates privacy Exposure.

### Stage D2 — Preserve
T cost: 2 AP; ANCHORED + FRAGILE.
If Z-E SECURE: maximum integrity possible.
If CONTESTED: integrity max 2.
If LOST: cannot begin careful preservation.

### Stage D3 — Integrity Verification
T cost: 1 AP.
Player compares abstract verification values and confirms preserved data matches the recorded source state.

The lesson explains hashes as integrity fingerprints and salts in their proper authentication-storage context; it does not turn “hashing” into a magic encryption/decryption mechanic.

Success:
- Evidence Integrity 3;
- Scope Confidence +15;
- debrief can defend causal findings.

Skip:
- evidence may still count at Integrity 1–2 but debrief confidence is weaker.

E role:
E controls the door and people. If a responder enters without authorization during preservation, Exposure +1 and Integrity may fall.

---

# 10. LAB NODE E — Vendor Closet

Location: Z-F.
Primary role: R first, T second.
Concepts: supply-chain attack, third-party risk, patch management, asset inventory.

Optional node.

R action — Inspect External Context: 1 AP.
Finds fictional vendor equipment/service record mismatch.

T action — Compare Inventory State: 1 AP.
Determines that one vendor-linked component is outside expected maintenance state.

The node does **not** prove that the vendor caused the breach.

Correct interpretation creates TOKEN `THIRD_PARTY_SCOPE_RELEVANT` and raises Scope Confidence only if correlated with other evidence.

Wrong interpretation — “vendor = attacker” — creates a debrief bias flag and can cause unnecessary isolation.

---

# 11. LAB NODE F — Loading Corridor Physical Clue

Location: Z-G.
Primary role: R/E.
Concepts: physical USB/device risk, RFID, evidence handling.

R can detect a dropped/abandoned fictional access artifact or device near the camera outage zone.

E must secure the tile before collection.

Task sequence:
1. R OBSERVE — 1 AP.
2. E CONTROL tile — 1 AP.
3. R/T DOCUMENT/PRESERVE — 1 AP.

The object is a clue, not automatic proof of compromise.

If picked up casually during a fight without evidence handling:
- clue still exists;
- Evidence Integrity for that artifact drops;
- debrief explicitly teaches why provenance matters.

---

# 12. Kinetic threat system

This mission must contain real shooting-game pressure.

Threat types:

## T1 — Opportunistic Intruder
- HP 4
- Aim moderate
- moves toward evidence/service areas if Detection >= 4
- goal: retrieve/destroy a fictional device or evidence item, not “kill all players.”

## T2 — Confused Armed Security
- starts neutral/uncertain;
- can become hostile if player enters restricted zone without proper authorization state or fires first;
- creates a governance/compliance tension.

## T3 — Evidence Destruction Actor
- low combat strength;
- prioritizes Z-E or Vendor Closet;
- forces R/E to protect the technical objective.

## T4 — Crowd / Noncombatant pressure
- not shootable hostile units;
- occupy tiles, obstruct routes, create privacy/exposure consequences if badly managed.

Threat schedule is partially state-driven rather than fully scripted.

---

# 13. Threat schedule

Round 1:
- no guaranteed gunfire;
- staff movement creates pathing pressure;
- R sees loading-camera anomaly.

Round 2:
- suspicious movement appears in Z-G if Detection >= 3;
- Vendor Closet becomes discoverable.

Round 3:
- one Intruder enters if player has begun containment or Evidence Integrity remains unsealed;
- otherwise delayed one round.

Round 4:
- if shots fired, Armed Security advances toward noise;
- if no shots, security calls for verification instead.

Round 5:
- affected service degrades if Scope hypothesis missed one high-confidence asset;
- otherwise no technical degradation.

Round 6:
- Evidence Destruction Actor may attempt Z-E if vendor clue was discovered;
- R warning gives E one round to reposition.

Later:
- reinforcement pressure is driven by Detection;
- Window expiration forces Extract with whatever is stabilized/sealed.

---

# 14. Tactical-combat / lab interactions

## Shooting inside Z-D
Benefit:
- immediate threat removal.

Cost:
- +2 Detection per gunfire event group;
- 20% abstract chance of equipment-state degradation if firing through rack lanes;
- if equipment degrades, T gets an additional validation/recovery step.

This is not random punishment: affected rack lanes are visibly marked as infrastructure risk before the shot.

## Suppression in Z-D
- 1 AP E/R action;
- lower immediate equipment risk than aggressive cross-room fire;
- buys T a Protected Window if enemy remains pinned.

## Overwatch Z-G
- lets R protect the loading lane while still generating early-warning value;
- however R spending both AP on Overwatch + reposition means no evidence comparison that turn.

## Guard Tech
E spends 1 AP adjacent to T.
- first interrupt against T is redirected/ignored;
- enables a 2-AP anchored containment/preservation action under contact.

## Technical tactical advantage
Successful containment can disable one hostile door-control behavior.
Successful Identity validation can make building security treat the squad as verified, preventing Armed Security from becoming hostile.
Successful telemetry work can reveal one enemy approach marker to R.

---

# 15. Example six-round sequence

This is not the only solution. It demonstrates intended coupling.

## Round 1 — Build picture
R: Scan Loading Corridor (1 AP), compare camera/badge timing (1 AP) -> `PHYSICAL_WINDOW_POSSIBLE`.
E: establish Z-B Control (1 AP), route two staff groups away from incident area (1 AP).
T: characterize Timeline Wall (1 AP), create initial scope hypothesis (1 AP).
Threat: no contact. Window remains 10 except mission clock tick rules.

## Round 2 — Split attention
R: move toward Vendor Closet sightline (1 AP), inspect vendor context (1 AP).
E: move to Z-C door (1 AP), Hold Door (1 AP).
T: move to Identity Console (1 AP), classify identity risk (1 AP).
Threat: suspicious actor enters loading corridor.

## Round 3 — First contact vs technical progress
R: Mark Threat (1 AP), Overwatch (1 AP).
E: Protected Window at Z-C (1 AP), Suppress/hold angle toward connecting corridor (1 AP).
T: protect critical authentication path (1 AP), Verify (1 AP).
Threat: intruder moves, triggers R Overwatch. Identity state stays stable.

## Round 4 — Primary node
R: compare vendor clue to transfer path (1 AP), create `THIRD_PARTY_SCOPE_RELEVANT` (1 AP).
E: move/escort T toward Z-D (1 AP), secure Z-D door (1 AP).
T: move to Dependency Board (1 AP), Trace dependencies (1 AP).
Threat: Armed Security approaches because prior shot raised Detection.

## Round 5 — Hard Window
R: warn/mark security approach (1 AP), reposition for Z-D lane (1 AP).
E: Guard Tech / Protected Window (1 AP), Hold Angle (1 AP).
T: Commit Containment (2 AP ANCHORED).
Threat: security reaches controlled lane; E's position prevents direct interruption.

## Round 6 — Validate or chase perfection
R: maintain picture or move to evidence clue.
E: choose whether to hold Z-D or pivot Z-E.
T: Validate Containment (1 AP), then either begin evidence preservation path or restore trusted critical function (1 AP).

At this point the player has experienced the defining PRIM3 question: **Do I keep shooting to make the room safer, or spend the squad's AP proving the technical work is actually correct?**

---

# 16. Operational scoring

Existing five channels remain.

Suggested mission-specific inputs:

## Objective
- +35 scope >= 70 and containment verified
- +25 trusted critical function restored
- +15 notification path protected
- +15 Jordan record lawfully preserved
- +10 vendor/physical clue correctly classified

## Team
- standard injury/death rules
- additional penalty for avoidable civilian harm

## Exposure
- Detection peak
- unauthorized staff allowed into evidence area
- unnecessary disclosure of personal records
- public-hall gunfire penalty

## Integrity
- evidence integrity
- authorization boundaries
- validation performed
- no destructive recovery before preservation where required

## Time
- Window/Extract remaining

---

# 17. Learning Mastery scoring

Mission-specific mastery weighting:

- 15% Indicators vs proof
- 15% Corroboration / scope confidence
- 20% Containment reasoning
- 20% Evidence preservation
- 10% Identity/MFA reasoning
- 10% Third-party/supply-chain reasoning
- 10% Validation / recovery discipline

Mastery is inferred from actions and causal choices, not a final ten-question exam.

---

# 18. Debrief examples

## Player contained correctly but skipped evidence preservation
Operational result may still be B/A depending on team/exposure.
Learning report:
- Containment: Applied
- Evidence Preservation: Developing
- Scope Confidence: limited because destructive changes occurred before sealing evidence
- Review cue: jump to the lyric segment tied to access logs / breach recognition / defensive controls

## Player preserved perfect evidence but allowed spread too long
- Evidence: Applied
- Containment: Developing
- Operational Time/Objective penalties
- lesson: evidence perfection is not the only incident-response priority.

## Player broadly shut everything down
- may successfully stop spread;
- Service Health and Time suffer;
- mastery report distinguishes “effective containment” from “appropriately scoped containment.”

## Player used R/E/T together efficiently
- R evidence removes false options;
- E protects fragile preservation;
- T finishes with fewer wasted AP;
- debrief explicitly credits cross-role systems thinking.

---

# 19. Presentation priorities

The lab must look and sound as polished as combat.

When T commits containment:
- tactical camera pushes toward the rack/console;
- service graph animates routes closing/opening;
- E remains visibly in cover in foreground/background;
- R warnings can cut into the UI as voice and tactical markers;
- shots/impacts outside the room remain audible;
- progress animation is caused by player reasoning, not random bar filling.

When R confirms a correlation:
- evidence cards physically align on the timeline;
- map markers update in-world;
- squad barks reference the new fact.

When E secures a technical room:
- door/angle state visibly changes;
- T's UI shows `CONTROL: SECURE`;
- fragile-action risk visibly decreases.

Correct technical reasoning should feel **powerful**, not administrative.

---

# 20. Reference-implementation acceptance test

LVL-07 is not a successful vertical slice until a tester can say yes to all:

1. I fired weapons and used cover/overwatch/suppression in the same mission where I performed incident-response work.
2. My shooting decisions changed my technical options or risk.
3. My technical success changed the tactical battlefield.
4. Field-R gave me information I actually needed for a lab.
5. Field-E bought physical safety/time I actually needed for a lab.
6. Field-T had to reason, not merely press “hack.”
7. I could make a technically wrong choice and understand its consequence from the system behavior.
8. Validation mattered separately from configuration.
9. The mission could continue after partial technical failure.
10. The debrief could tell me exactly which Data Breach concepts I demonstrated and which I should review.
11. None of the educational interactions required live targets, real credentials, or actionable intrusion instructions.
12. The mission was still fun if I ignored the optional lesson pages.

If any answer is no, the vertical slice is not done.