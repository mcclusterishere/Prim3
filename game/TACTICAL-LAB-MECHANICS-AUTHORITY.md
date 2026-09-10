---
status: CANON-SUPPLEMENT
system: Tactical learning + battlefield LAB_NODE mechanics
version: 1.1.0
branch: main
owner: Matthew McCluster
authority: Subordinate to CANON.md, TACTICAL-IT-MECHANICS-BIBLE.md, LEARNING-MISSION-SOURCE-OF-TRUTH.md, and WILDCARD-INTERVENTION-AUTHORITY.md
---

# PRIM3 Tactical Lab Mechanics — Current Supplement

This file retains the LAB_NODE implementation concepts from an earlier tactical authority while removing stale assumptions about a permanently fixed three-person squad.

Current governing files:
- `game/TACTICAL-IT-MECHANICS-BIBLE.md` — primary technical/action grammar;
- `game/LEARNING-MISSION-SOURCE-OF-TRUTH.md` — teaching loop;
- `game/WILDCARD-INTERVENTION-AUTHORITY.md` — Jordan/PRIM2/Royce escalation;
- `schemas/prm3-tactical-learning-mission.schema.json` — machine-readable mission contract;
- `story/ENSEMBLE-POV-AUTHORITY.md` — named-character ownership.

## 1. Tactical economy correction

R/E/T remain the canonical **functional triad**:

- R produces/reduces uncertainty;
- E creates controlled physical opportunity;
- T converts evidence/access into technical result.

They are **not** a requirement that every mission contain exactly three generic units or exactly six total AP.

Normal qualified characters generally receive **2 AP per activation**. Mission composition may include:
- named R/E/T specialists;
- cross-trained operators;
- Leads;
- Defense/support roles;
- episode-specific specialists;
- Jordan after scripted deployment or Wildcard call-up;
- PRIM2 after scripted/Apex intervention.

PRIM2's 3-AP arrival activation is a specialized exception.

The tactical economy is therefore calculated from the actual controlled roster, not hard-coded as `3 units = 6 AP`.

## 2. No free technical work

Any action that can materially change technical mission state must consume or risk at least one meaningful resource:
- AP;
- mission clock;
- position;
- Control/Picture state;
- Detection/Heat;
- service availability;
- evidence integrity;
- power/environment state;
- authorization allowance;
- named consumable/resource.

Viewing information already earned is free unless a separate physical/cognitive action is required to acquire or refresh it.

## 3. LAB_NODE definition

A `LAB_NODE` is a diegetic tactical-world object whose state affects objectives and whose interaction applies one or more real concepts from the PRIM learning graph.

It may be represented as:
- workstation;
- rack/cabling/patch panel;
- wireless/spectrum map;
- incident console;
- evidence table/locker;
- access-control station;
- recovery array;
- cloud/service dependency view;
- hardware bench;
- UPS/power/environment control;
- sensor/actuator interface;
- authorization/document station;
- Site 0 continuity control.

A LAB_NODE is not a floating school quiz.

## 4. Universal LAB_NODE state grammar

A substantive node may use the following progression:

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
```

Failure/interruption branches may include:

```text
DEGRADED
CONTAMINATED
INCONCLUSIVE
LOCKED_OUT
UNSAFE
ABORTED
RECOVERABLE
```

Not every node uses every state.

## 5. Task-atom grammar

Technical/operational work should resolve through the stable task atoms defined by the primary mechanics bible, including:

```text
OBSERVE
COMPARE
CLASSIFY
PRIORITIZE
TRACE
MAP
AUTHORIZE
ISOLATE
ROUTE
ALLOCATE
MATCH
SEQUENCE
CONFIGURE
PRESERVE
RECOVER
VERIFY
DOCUMENT
WARN
HOLD
ESCORT
STABILIZE
ABORT
REQUEST_INTERVENTION
```

The intervention task atom does not itself perform Jordan/PRIM2's abilities; it changes mission state by opening the appropriate executive request flow.

## 6. Deterministic technical correctness

There is no generic hidden “hack roll.”

A technically correct action succeeds because:
- the relevant state/evidence has been discovered;
- the player selected the correct model/action;
- the operator has the required qualification/tool/access;
- the action completes without destructive interruption.

Randomness may affect combat, interruption, physical damage, incomplete information and changing environmental conditions.

It may not secretly invalidate the correct technical answer.

## 7. Validation law

Every meaningful state-changing technical action needs a validation path.

```text
CONFIGURE != VERIFIED
RESTORE != HEALTHY
ISOLATE != CONTAINED until checked
COLLECT != DEFENSIBLE EVIDENCE until preserved/sealed
```

Jordan Wildcard and PRIM2 Apex do not bypass this law.

PRIM2 may provide `PRIM2-SOURCED` data or sovereign authorization; the player still distinguishes source from truth.

## 8. Cross-role coupling

Strong mission design creates causal loops such as:

```text
R establishes a fact
 -> E uses it to create safer physical control
 -> T applies it to technical work
 -> verified T result changes the battlefield
 -> R/E receive a new operational opportunity
```

Character identity should modify how those functions are performed without changing what the underlying concept means.

## 9. Interruption and anchored work

Certain work may anchor an operator to a node for a stage/round.

Physical pressure can:
- interrupt progress;
- damage equipment;
- force abort;
- degrade evidence;
- consume clock;
- require E protection or R warning.

Interruption changes whether the action completes; it does not roll against whether the player's correct technical reasoning was secretly “successful.”

## 10. Intervention interaction

### Jordan
Jordan may restore a route or temporarily cross-support a function. He cannot convert a node directly from unknown to solved without the required evidence/reasoning.

### PRIM2
PRIM2 may expose additional source information or change present authorization. He cannot skip physical prerequisites or validation merely because he holds the Mantle.

### Royce
Royce can attack the opportunity structure around technical work—Control, time, safety, Will, access—but he does not magically corrupt the answer key or become the technical objective himself unless the episode specifically makes his presence part of the system problem.

## 11. Learning Mastery

Intervention can save a mission while Learning Mastery remains incomplete.

A player can leave with:

```text
OPERATIONAL RESULT: B
WILDCARD RECOVERY: YES
LEARNING MASTERY: DEVELOPING
```

That is valid.

A rescue mechanic should protect investment in characters without allowing the player to purchase understanding.

## 12. Mission authoring requirements

Every mission with technical learning must deliberately specify:
- named playable roster;
- functional responsibilities;
- LAB_NODEs;
- concept IDs;
- initial states;
- task stages;
- dependencies;
- wrong-path consequences;
- validation evidence;
- battlefield back-effects;
- interruption conditions;
- mission-state escalation thresholds;
- Wildcard/Apex/Royce eligibility where applicable;
- learning mastery evidence;
- relationship/debrief residue.

## 13. Current design law

> **Technical knowledge determines what should work. Tactical play determines whether the team earns enough time, evidence, access and safety to make it work. Character attachment determines what the player is willing to spend when that plan begins to die.**
