---
status: CANON-SUPPLEMENT
system: Game mechanics — supplemental gap fill
version: 1.1.0
branch: main
authority: Subordinate to CANON.md, TACTICAL-IT-MECHANICS-BIBLE.md, and WILDCARD-INTERVENTION-AUTHORITY.md
---

# Mechanics Gaps Filled — Current Supplement

This file fills implementation details that do not belong in the higher-level game spine. Where an older value conflicts with a specialized canonical authority, the specialized authority wins.

## 1. Concealment

Missions may begin `CONCEALED` when the brief says so.

Concealment can break through:
- hostile visual confirmation;
- loud authorized/unauthorized action;
- Detection threshold;
- scripted story trigger;
- environmental exposure.

Breaking concealment changes threat behavior. It does not itself prove the technical objective failed.

## 2. Deployment and extract

### Normal deployment

Most missions launch with named ensemble characters selected from the qualified roster.

A classic technical element is up to three primary field roles:
- R;
- E;
- T.

Story missions may add/replace roles with Leads, Defense, trainees or other specialists.

Jordan is **not** a normal selectable deployment slot unless the episode explicitly assigns him.

### Intervention deployment

Jordan Wildcard and PRIM2 Apex arrivals use mission-authored ingress/ETA rules from `WILDCARD-INTERVENTION-AUTHORITY.md`. They never teleport onto an arbitrary tile.

### Extract

- living units, carried evidence and mission assets must reach the authored SAFE/EXTRACT condition;
- partial extraction is allowed and writes real consequences;
- a player may choose to abandon an objective to preserve people;
- leaving a named operator behind does not automatically mean death: capture, separation, unknown status or death must be authored/derived from the mission state;
- intervention units do not erase an extraction clock already spent.

## 3. Inventory

Per-character inventory can include:
- armor;
- sidearm;
- optional primary where role/mission permits;
- role kit;
- utilities;
- carried objective/evidence.

Dropped evidence remains part of battlefield state. `Seal` protects evidence integrity; it does not teleport the evidence to safety.

## 4. Weapons and force

Kinetic equipment exists to create/protect operational opportunity, not replace the technical objective.

Exact damage/aim numbers remain playtest values unless repeated in a higher authority. Episode authors should prefer mission-specific authorization and consequences over building every operation around lethal force.

## 5. Armor and mobility

Armor trades protection against:
- movement;
- signature;
- fatigue/encumbrance;
- tool access where relevant.

Exact numeric modifiers remain balance data, not story canon.

## 6. Camera / device interaction — deterministic correction

Older drafts used generic `Tech vs 5` checks. That is superseded.

A correct technical/device action succeeds because the player:
- identified the correct device/path;
- gathered sufficient evidence;
- has the required role/tool/authorization;
- selected the correct action;
- and completes it without interruption.

Randomness may affect:
- whether the operator is interrupted;
- enemy behavior;
- physical damage;
- incomplete evidence;
- timing pressure.

Randomness may **not** turn the correct technical answer into failure through a hidden generic hack roll.

## 7. Low-profile movement

After global concealment breaks, individual characters may still reduce signature through:
- route choice;
- physical cover;
- sensor blind spots already established by evidence;
- role abilities;
- appropriate kit.

Do not treat low-profile state as magical invisibility.

## 8. Enemy roster

Normal opposition may include:
- guards/responders;
- automated sensors/cameras;
- drones/robotic systems where authored;
- hardened objective defenders;
- environment/system hazards;
- Hitman elements in relevant missions.

`Royce` is not a generic enemy tier. He is a persistent named incursion character governed separately.

## 9. Objective objects

Representative objective state includes:
- Sealed Take;
- Raw/Unsealed Take;
- Intel/Evidence;
- VIP/Asset;
- Service/Continuity state;
- Authorization/Compliance state.

The object must preserve provenance and mission consequence.

## 10. Engineering / kit bench

The strategy layer may provide a small readable equipment bench. It should not become a 40-node research maze.

Ordinary Budget can support:
- protective equipment;
- role tools;
- recovery;
- replacement consumables;
- mission-preparation kit.

Budget **cannot directly purchase** Jordan Wildcard or PRIM2 Apex calls.

## 11. Training

Training can improve:
- role XP;
- cross-training qualifications;
- fatigue/recovery;
- character-specific perks.

Progression may not turn ordinary operators into PRIM Mantle holders through XP.

## 12. Side-operation generator

Procedural/semi-authored mission generation is allowed only for **side operations**, not to replace the fixed 21 canonical episode missions.

Side-op parameters may vary:
- map template;
- node count;
- Detection;
- clocks;
- opposition;
- mission risk;
- Hitman Pressure;
- Wildcard eligibility;
- Royce eligibility.

A side op may affect campaign state but may not rewrite locked episode canon.

## 13. Lead unit

A Lead is a real named character, not merely a fourth generic class slot.

Possible command verbs include:
- reposition;
- focus/prioritize;
- call extract;
- rally;
- authorize within delegated scope.

A Lead does not replace R/E/T technical functions.

Jordan's `RALLY THE ROOM` and PRIM2's `COMMAND PRIORITY` are separate intervention abilities with their own scarcity/rules.

## 14. Capture, death and rescue

### Downed
A living Downed operator can be stabilized/rescued.

### Death
A completed death persists unless the story explicitly defines otherwise. Jordan/PRIM2 cannot reverse it.

### Left behind
Outcome depends on authored mission context:
- captured;
- missing/separated;
- stranded;
- killed;
- recovered later.

If capture is valid, it may generate a rescue side op or alter a later episode condition.

## 15. Required tactical UI

The player must be able to read:
- selected character AP/HP/Will/status;
- phase/clocks;
- Detection/Heat where relevant;
- objective/evidence state;
- Picture/Control/Technical state;
- confidence/provenance on information;
- mission state: `STABLE / DEGRADED / CRITICAL / TERMINAL`;
- current Wildcard availability when eligible;
- current Apex availability when eligible;
- hostile escalation warning quality when earned;
- intervention consequences after use.

## 16. Intervention implementation requirements

A mission that allows Jordan must define:
- crisis trigger;
- request path;
- arrival delay;
- arrival route;
- usable Wildcard abilities;
- relationship/debrief residue.

A mission that allows PRIM2 must additionally define:
- why it is Critical/State/Strategic enough;
- why Jordan is already present;
- what persists long enough to justify Apex escalation;
- what information/authority PRIM2 adds;
- what cannot be saved anymore.

A mission eligible for Royce must define:
- telegraph quality;
- ingress/trigger;
- objective behavior;
- retreat/separation condition;
- survival continuity with the locked finale.

## 17. Current completeness assessment

Strong/specifiable now:
- AP/clock grammar;
- R/E/T dependency;
- deterministic technical work;
- graded outcomes;
- ensemble roster principle;
- persistent injury/death;
- Wildcard/Apex rescue ladder;
- Royce hostile incursion structure;
- side-op vs episode distinction.

Still requiring playtest/content implementation:
- exact numeric combat balance;
- character-specific perk values;
- per-episode intervention eligibility;
- per-episode crisis thresholds;
- Royce adaptation/encounter tuning;
- full save schema;
- UI implementation;
- final map/content volume.

**The mechanics are conceptually coherent enough to prototype. The next risk is no longer missing framework; it is failing to instantiate the framework character-by-character and mission-by-mission.**
