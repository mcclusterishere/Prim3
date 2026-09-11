---
status: CANON MISSION IMPLEMENTATION
level_id: LVL-02
episode: S1E2
mission: Permission Slip
version: 1.0.0
branch: main
---

# LVL-02 — PERMISSION SLIP

## Mission fantasy

The player's first full ordinary PRIM mission is not "hack the box."

It is:

> **Enter a dangerous, partially controlled facility with lawful authority, incomplete knowledge, civilians, evidence, hostile interference and a scope boundary that matters as much as cover.**

The mission begins as:

```text
WHITE HAT
BLACK BOX
```

The team is authorized.
The environment is not yet understood.

---

# Playable roster

```text
NUSRAT RAHMAN — mission lead / scope & access
MIGUEL SANTOS — physical control / protection / coordination
AYA SHINODA — technical characterization / validation
```

Jordan is not playable and cannot be called as Wildcard in this mission.

This is intentional. Episode 2 must teach the player that PRIM3 is an ensemble before the game teaches the Jordan rescue fantasy.

---

# Map

**Harborline Edge Exchange** — fictional multi-tenant edge/data facility.

Compact tactical map:

```text
A — SERVICE LOBBY
B — LOADING / SERVICE CORRIDOR
C — TARGET TENANT CAGE
D — SHARED CROSS-CONNECT ROOM
E — ADJACENT TENANT CAGES
F — POWER / ENVIRONMENTAL SUPPORT CORRIDOR
G — EVIDENCE EXTRACTION LANE
```

The map should support:
- flanking routes;
- cover;
- doors/access boundaries;
- short sightlines in service corridors;
- vulnerable evidence locations;
- civilian/facility-staff movement;
- technical nodes that require a protected work window.

---

# Initial states

```text
MissionState: STABLE
PictureState: PARTIAL
CivilianSafety: STABLE
EvidenceIntegrity: 100
ServiceHealth: 100
Detection: LOW
Heat: LOW
```

Scope Envelope:

```text
A AUTHORIZED
B AUTHORIZED
C AUTHORIZED
D OBSERVE-ONLY
E OUT-OF-SCOPE
F EMERGENCY-ELIGIBLE
G AUTHORIZED
```

---

# Mission clocks

Suggested Standard values:

```text
ApproachClock: 4
WindowClock: 10
ExtractClock: inactive until evidence custody established
```

The mission should feel deliberate early and suddenly compressed once hostile recovery pressure begins.

---

# Objective chain

## O1 — Establish lawful entry

Player must:
- reach the authorized interior route;
- confirm target tenant/cage identity;
- keep civilians/facility staff out of the active lane;
- avoid entering adjacent tenant space merely because a door is accessible.

Learning behavior:

```text
PHYSICAL ACCESS != AUTHORIZED SCOPE
```

## O2 — Identify the right assets

Several visually similar assets exist in the target cage.

Nusrat verifies scope/provenance.
Aya characterizes technical identity.
Miguel preserves physical custody/space.

Wrong seizure is not a random failure. It comes from insufficient evidence.

## O3 — Preserve evidence

Once the specified assets are identified, hostile recovery pressure begins.

The player must prevent removal/destruction while maintaining EvidenceIntegrity.

Evidence actions include abstracted:
- MARK;
- SEAL;
- HOLD;
- TRANSFER CUSTODY;
- VERIFY IDENTITY.

## O4 — Discover hidden dependency

Aya finds evidence that one target asset is tied to an unrelated live service outside the tenant's expected boundary.

The exact implementation is abstracted.

The mission UI changes:

```text
SERVICE DEPENDENCY: UNKNOWN
BLAST RADIUS: UNKNOWN
DIRECT SEIZURE RISK: HIGH
```

The player is explicitly warned that technical permission to touch the target does not mean the consequences are understood.

## O5 — Earn enough knowledge

The team needs corroboration before the target can be safely removed/isolated.

Possible routes:

### Route 1 — Bounded scope extension
Use already earned evidence to request temporary observation authority for Zone D.

### Route 2 — Slower authorized inference
Remain within existing scope and gather enough indirect evidence from authorized nodes.

### Route 3 — Emergency exception
Only becomes eligible if CivilianSafety or critical service risk crosses its authored emergency threshold.

### Route 4 — Deliberate scope violation
Physically possible in some states, clearly marked unauthorized, persistent consequences.

No route is a dice-roll knowledge test.

## O6 — Resolve target state

Once dependency is sufficiently characterized, perform the bounded technical/evidence action appropriate to the player's earned picture.

Then perform a separate `VERIFY` action.

The mission cannot complete from `CHANGE` alone.

## O7 — Extract

Move evidence and operators to Zone G while hostile pressure continues.

Start:

```text
ExtractClock: 5
```

Loss of Control in Zone G can damage chain/provenance or force partial extraction.

---

# Hostile recovery element

## Purpose

The hostile element exists to force the player to manage physical danger and technical/governance work simultaneously.

It is not a tutorial for real-world tactics.

Fictional hostile behaviors:
- contest corridors;
- rush evidence positions;
- suppress technical work zones;
- attempt to remove marked evidence;
- create diversionary movement;
- force civilians/facility staff to relocate.

Hostiles should prefer objective pressure over suicidal combat.

The player therefore has to decide whether Miguel:
- protects Aya;
- holds extraction;
- rescues a civilian;
- stops evidence removal;
- or chases a hostile route.

He cannot do all of them at once.

---

# Character mechanics

## Nusrat — SCOPE ANCHOR

Passive:

When Nusrat is within command/communications integrity, the player receives clearer scope-state warnings and cannot accidentally perform a protected out-of-scope state-changing action without an explicit confirmation.

This does not prevent deliberate violation.

### BOUNDED REQUEST — 1 AP + mission cost
Creates a Scope Extension Request on one eligible zone/action using already earned evidence.

### HOLD THE LINE — once per mission
Prevent one pressure event from automatically collapsing an authorization/evidence state while the team completes a pending verification step.

Interpretation: Nusrat buys procedural time, not magic immunity.

## Miguel — HUMAN CONTROL

### SECURE PASSAGE
Improve Control in one adjacent civilian/evidence corridor and reduce interruption risk.

### TALK THEM THROUGH
Stabilize one civilian/facility-staff group or reduce the cost of repositioning them out of danger.

### CUSTODY HANDOFF
Transfer an evidence/civilian protection responsibility without breaking chain/state when conditions are met.

## Aya — TECHNICAL TRUTH

### CHARACTERIZE NODE
Advance TechnicalState using earned evidence.

### BLAST-RADIUS CHECK
Reveal one additional dependency warning when sufficient observations exist.

### VERIFY STATE
Perform the mandatory post-change validation step more efficiently when operating in SECURE Control.

---

# Shared tactical-learning loop

The mission should repeatedly produce:

```text
NUSRAT: Are we allowed to do this?
AYA: Do we understand what this will do?
MIGUEL: Can we safely create the time/space to do it?
```

No one question dominates the others.

That triangle is the real tutorial.

---

# Escalation beats

## Beat A — calm entry
The player learns scope coloring and basic Evidence/Control/Picture state.

## Beat B — similar assets
The player learns not to assume identity from appearance.

## Beat C — hostile recovery appears
The player learns that tactical pressure does not suspend scope rules.

## Beat D — hidden dependency
The obvious objective becomes dangerous.

## Beat E — scope decision
The player chooses extension / authorized alternative / emergency / violation.

## Beat F — extraction
The player must protect the evidence and people after the technical problem is already solved.

---

# Grading

Five-channel grading can include:

```text
OBJECTIVE
TEAM
EXPOSURE
INTEGRITY
TIME
```

Episode-specific Integrity criteria:
- evidence chain preserved;
- no unnecessary out-of-scope action;
- any extension properly bounded;
- emergency authority used only under qualifying state;
- final state verified.

A fast unauthorized win should score worse on Integrity than a slower defensible operation.

A slow operation that gets people hurt can still be worse overall than a justified emergency exception.

There is no single morality meter that automatically knows the answer.

---

# Example outcome matrix

| Outcome | Tactical | Scope | Service | Story meaning |
|---|---|---|---|---|
| Clean | target/evidence secured | bounded | preserved | Nusrat's model works under pressure |
| Costly lawful | secured | bounded | degraded | process was right but not free |
| Emergency save | secured | exception used | life/safety preserved | review required; urgency was real |
| Cowboy win | secured | violated | mixed | team 'wins' and institution loses trust |
| Partial | some evidence lost | bounded | preserved | restraint saved collateral at cost of objective |
| Collapse | critical evidence and/or people lost | mixed | mixed | campaign consequence, not automatic reload |

---

# Narrative hooks during PLAY

Short contextual dialogue should advance character state rather than explain controls.

Examples:
- Miguel notices Nusrat is overchecking her first command decisions and tells her the team needs a decision, not a performance.
- Aya gets irritated when task-force pressure treats technical uncertainty as hesitation.
- Nusrat asks Aya to state confidence, not certainty.
- Miguel reminds both that facility staff are listening to how they talk about people whose systems are under investigation.

Jordan should not remotely solve the mission.

His episode development already happened in Act I by accepting the boundary.

---

# Campaign writes

Strong mission:

```text
NUSRAT_COMMAND_CONFIDENCE +1
MIGUEL_HUMANE_SECURITY_REPUTATION +1
AYA_NUSRAT_TRUST +1
INSTITUTIONAL_SCOPE_DISCIPLINE +1
```

Scope violation path may instead write:

```text
COMPLIANCE_DEBT +1
HELEN_REVIEW_REQUIRED true
NUSRAT_SELF_DOUBT +1 or NUSRAT_DEFIANCE +1 depending choice
AYA_INSTITUTIONAL_TRUST -1
```

These writes can alter dialogue/debriefs without breaking the main story spine.

---

# Anti-frustration rule

LVL-02 does **not** expose Wildcard or Apex rescue mechanics.

The mission is tuned so competent use of the three assigned characters is sufficient.

The player needs to first believe:

> **These people can carry a mission.**

Only later does the game earn the fantasy of calling Jordan because the mission has become extraordinary.

---

# Safety / abstraction

All adversary, authorization and technical interactions are fictionalized and abstracted.

The mission teaches concepts of scope, evidence, system dependency, validation, least privilege and consequence without providing operational instructions for real-world intrusion, bypass, credential theft or exploitation.

---

# Governing line

> **You are not trying to prove you can touch everything in the building. You are trying to prove you know what should remain untouched.**