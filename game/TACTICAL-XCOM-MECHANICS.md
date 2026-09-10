---
status: CANON-SUPPLEMENT
system: Game — XCOM-style tactical layer
version: 1.1.0
branch: main
authority: Subordinate to CANON.md, TACTICAL-IT-MECHANICS-BIBLE.md, and WILDCARD-INTERVENTION-AUTHORITY.md
---

# PRIM3 Tactical Mechanics — XCOM-Style Layer

Turn-based tactical missions use a shared AP/grid/state resolver. This file describes the XCOM-like control feel; detailed technical correctness belongs to `TACTICAL-IT-MECHANICS-BIBLE.md`, and elite intervention rules belong to `WILDCARD-INTERVENTION-AUTHORITY.md`.

## 1. Ensemble deployment law

Most missions launch **without Jordan Vale**.

The normal playable force is the named cast actually assigned to that episode or side operation. The classic technical field grammar remains:

- **R — Picture / Recon**
- **E — Physical Reality / Entry / Protection**
- **T — System / Technical Objective**

But those are mission functions, not three mandatory generic people.

A mission may deploy:
- one or more R/E/T-qualified characters;
- a Cohort/Lead;
- Defense personnel;
- support/specialists;
- mixed or cross-trained characters;
- Jordan only if scripted or called as Wildcard;
- PRIM2 only if scripted or called through an eligible Apex intervention.

Episode ownership and tactical deployment are separate. Calling Jordan into Aya's mission does not make it Jordan's episode.

## 2. Mission spine

```text
BRIEF
 -> APPROACH
 -> ON OBJECTIVE
 -> EXTRACT
 -> AFTERMATH
```

Mission escalation state runs alongside those phases:

```text
STABLE -> DEGRADED -> CRITICAL -> TERMINAL
```

The phase answers **where the operation is**.
The escalation state answers **how close the current plan is to unacceptable loss**.

## 3. Turn structure

1. Player Phase — activate controlled characters in any order.
2. Threat Phase — hostile actors, automated systems and environmental pressure resolve.
3. Clock/State Phase — clocks, mission state and escalation conditions update.

Standard characters receive **2 AP** per Player Phase. Unused AP does not carry.

Special exception:
- PRIM2 receives **3 AP on his Apex-arrival activation**, then 2 AP on later activations.

## 4. Tactical information

The board must preserve the earned-knowledge model:

```text
HIDDEN
 -> DETECTED
 -> INFERRED
 -> CORROBORATED
 -> VERIFIED
```

Information can also become stale, contradicted, compromised or unknown.

A boss character does not grant magical truth. Even `PRIM2-SOURCED` information retains provenance and may require independent validation.

## 5. Movement / positioning

Representative AP costs:
- Move — 1 AP
- Sprint — 2 AP
- Hunker / defensive posture — 1 AP
- Interact — normally 1 AP
- high-focus staged technical work — up to 2 AP per activation

Exact movement/range numbers are balance values and may be tuned without changing canon.

## 6. Kinetic rule

Combat buys or protects opportunity. It does not substitute for the technical objective.

Kinetic actions may:
- preserve a route;
- protect a LAB_NODE;
- save a downed operator;
- hold a zone;
- deny hostile movement;
- stop physical destruction of evidence/critical equipment.

A mission whose lesson is technical may not be passed merely by killing every hostile.

## 7. Downed / death / extraction

`HP <= 0` may place a character in **Downed** state when the mission rules allow rescue.

A still-living Downed character may be stabilized.

A completed death persists.

Jordan and PRIM2 can arrive in time to prevent a death; they cannot reverse one that already happened.

Leaving a character behind can produce capture, missing/separated status or death depending on the authored mission state. Do not globally equate “not extracted” with one outcome.

## 8. Technical-action rule

Correct technical reasoning is deterministic.

No generic `hack chance` may make the correct technical answer randomly fail.

Randomness belongs to:
- hostile behavior;
- combat resolution;
- interruption;
- damaged equipment;
- incomplete information;
- environmental change;
- time pressure.

Validation remains distinct from change.

## 9. Standard field functions

### R — THE PICTURE
Representative actions:
- Scan Lane
- Compare Sources
- Map Topology
- Mark Threat
- Validate External State
- Warn
- Quiet Route
- Overwatch

R primarily reduces uncertainty.

### E — THE REALITY
Representative actions:
- Move / Breach / Open
- Hold Angle
- Guard Tech
- Secure Evidence Zone
- Escort
- Stabilize Person
- Stabilize Physical System
- Establish/Shift Perimeter

E primarily creates physical opportunity and preserves people/work.

### T — THE SYSTEM
Representative actions:
- Observe / Characterize / Classify
- Compare
- Trace Dependency
- Check Authorization
- Isolate
- Preserve
- Sequence
- Configure
- Recover
- Verify
- Document
- Seal

T converts evidence and access into technical mission state.

Full action grammar is in `ROLE-ACTION-REGISTRY.yaml` and `TACTICAL-IT-MECHANICS-BIBLE.md`.

## 10. Wildcard request — Jordan Vale

When an eligible mission reaches **CRITICAL** while Jordan is off-board and a seasonal authorization remains, mission control may expose:

```text
EXECUTIVE CHANNEL OPEN
REQUEST WILDCARD
```

Standard campaign pool:

> **2 non-scripted Jordan Wildcard Authorizations per season.**

Jordan does not instantly spawn. Each mission authors an ingress and arrival delay, normally **1–3 rounds after approval**.

Jordan's tactical purpose is to restore options:
- `ANOTHER PATH`
- `ADAPTIVE ROLE`
- `RALLY THE ROOM`
- `FAILOVER INSTINCT`

He is not a permanent fourth class and not an automatic objective-completion button.

## 11. Apex request — PRIM2

An eligible high-value mission may expose Apex intervention only when:
- Jordan is already present;
- the mission is appropriately classified Critical/State/Strategic;
- CRITICAL failure persists or returns for at least one full round;
- command/communications still permit escalation;
- PRIM2 is not story-locked out.

Standard campaign pool:

> **3 non-scripted PRIM2 Apex Authorizations across the entire seven-season campaign.**

Before the reveal, the UI may say:

```text
REQUEST EXECUTIVE OVERRIDE
```

Later it may explicitly say:

```text
REQUEST PRIM2
```

PRIM2's identity is broader information + sovereign authority, not an unlimited cheat code.

## 12. Royce Incursion

Royce is a persistent Hitman-side elite incursion, not a generic hard target.

Standard non-scripted limits:
- maximum **2 Royce Incursions per season**;
- maximum **1 per mission**;
- **2-mission cooldown** after a non-scripted incursion;
- story-authored missions may override;
- final RAID is not constrained by the random-incursion cap.

Royce specializes in:
- breaking/contesting Control Zones;
- pressuring isolated or wounded characters;
- forcing route changes;
- disrupting objective tempo;
- escalating Will pressure;
- coordinating Hitman units.

He does not become a technical omniscient just because he is an apex threat.

His intended emotional effect is similar to an XCOM Chosen arrival:

> **The mission you planned is suddenly not the mission you are playing.**

## 13. Intervention asymmetry

```text
ENSEMBLE -> solves the mission
JORDAN   -> restores optionality
PRIM2    -> expands picture / authority
ROYCE    -> destabilizes control / tempo
```

This asymmetry is mandatory. Do not build three reskinned super-soldiers.

## 14. Mission grade interaction

Intervention use is not automatic failure or grade-capping.

The battlefield outcome still determines the operational grade.

Separate ribbons/flags can record:
- `INDEPENDENT_COMMAND`
- `WILDCARD_RECOVERY`
- `APEX_RECOVERY`
- `OBJECTIVE_SALVAGED`
- `ROYCE_REPULSED`
- `SURVIVOR_EXTRACTION`

Learning Mastery is scored separately. Jordan/PRIM2 may save the people and mission state without auto-awarding concept mastery.

## 15. Intervention cannot rewind

Interventions may act on current recoverable state.

They may not:
- resurrect;
- rewind clocks;
- restore destroyed evidence beyond recovery;
- zero Heat/Detection;
- undo a permanently lost objective condition;
- retroactively authorize an already completed unauthorized action.

## 16. Tactical UI requirements

Always show the information needed to make a fair decision:
- selected character AP / HP / Will / status;
- relevant mission clocks;
- Detection/Heat where relevant;
- objective/evidence state;
- Picture / Control / Technical state;
- current mission escalation state;
- earned information confidence/provenance;
- Wildcard availability when eligible;
- Apex availability when eligible;
- hostile escalation warning quality when earned.

## 17. Build order

A useful vertical slice should prove this sequence:

1. named ensemble team launches without Jordan;
2. normal R/E/T cooperation works;
3. mission can degrade naturally;
4. CRITICAL state is legible and fair;
5. player may request Jordan;
6. Jordan arrives after delay and restores options;
7. a test scenario can remain critical enough to expose PRIM2 Apex;
8. a separate/variant scenario supports a Royce Incursion;
9. aftermath records who saved whom and what intervention was spent;
10. Learning Mastery remains independent of rescue use.

## 18. Tactical success test

The tactical layer works when the player does **not** want Jordan on every mission.

They should want Aya to solve Aya's problem, Chioma to command Chioma's team, Rafael to own the picture, and the rest of the cast to become legends in their own right.

Jordan becomes exciting precisely because the player sees the CRITICAL alert and thinks:

> **Oh shit. Call the Wildcard.**

And PRIM2 becomes mythic because, a few times in the whole campaign, Jordan is already there and the player still has to ask:

> **Who does the Wildcard call?**
