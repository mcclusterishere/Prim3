---
status: CANON
system: Game mechanics, full spine
version: 1.3.0
branch: prim3-adaptive-cyber-range
authority: Subordinate to CANON.md and specialized canonical mechanics, learning, and story authorities
---

# PRIM3 Game Mechanics, Complete Spine

This is the high level rules stack for the browser first XCOM style product. Real time FPS and mobile tactical are later clients of the same mission outcomes.

Specialized authorities:

1. `ADAPTIVE-CYBER-RANGE-AUTHORITY.md`, readiness, adaptation, live lab integration, and evidence traces.
2. `LEARNING-MISSION-SOURCE-OF-TRUTH.md`, PRIM learning loop and mastery law.
3. `TACTICAL-IT-MECHANICS-BIBLE.md`, technical and action grammar.
4. `WILDCARD-INTERVENTION-AUTHORITY.md`, Jordan, PRIM2, and Royce escalation.
5. `OMNISCIENT-COMMAND-INTERFACE.md`, fused mission control UI.
6. `story/ENSEMBLE-POV-AUTHORITY.md`, character and episode ownership.
7. `story/CAST-LIFECYCLE-ATTRITION-PROMOTION-AUTHORITY.md`, recurring cast development, death, vacancy, promotion, and replacement.

# A. Product layers

| Layer | Name | Job |
| --- | --- | --- |
| 0 | Shared outcome rules | Phases, clocks, success states |
| 1 | Learning readiness | Convert PRIM evidence into fair mission preparation |
| 2 | Strategy layer | Choose ops, assign teams, live with consequences |
| 3 | Tactical layer | XCOM style mission play |
| 4 | Cyber range layer | LAB_NODE environments, verification, evidence traces |
| 5 | Progression | Operators, gear, qualifications, learner independence |
| 6 | Campaign structure | Seasons, heat, story gates, intervention scarcity, roster continuity |
| 7 | Presentation clients | Browser tactical, mobile tactical, future FPS using the same outcome writer |

If a feature does not feed learning evidence, mission outcome, character consequence, relationship consequence, or campaign consequence, it is not core version one.

# B. Shared outcome rules

## B1. Mission phases

```text
BRIEF -> APPROACH -> ON OBJECTIVE -> EXTRACT -> AFTERMATH
```

## B2. Clocks

| Phase | Default | Notes |
| --- | ---: | --- |
| Brief | Off | Planning only |
| Approach | 6 | Detection can collapse early |
| Window | 8, commonly 6 if detected | Technical and mission work burns this |
| Extract | 6, 4, or 3 | Clean, collapsed, or hot |
| Aftermath | Off | Scoring, learning evidence, and story residue |

## B3. Mission state ladder

Every tactical mission carries:

```text
STABLE -> DEGRADED -> CRITICAL -> TERMINAL
```

CRITICAL may expose a Jordan Wildcard request. An eligible high value story mission that remains CRITICAL after Jordan is present may expose a PRIM2 Apex request.

Training Range missions do not use story interventions unless an explicit simulator lesson requires a noncanonical demonstration.

## B4. Outcome channels

Mission results are graded rather than binary by default.

Operational score channels remain:

1. Objective value.
2. Team integrity.
3. Exposure.
4. Speed.
5. Authorization compliance.

Learning channels are separate:

1. Technical Mastery.
2. Independence.
3. Transfer.
4. Compliance evidence.

Intervention use is recorded separately.

# C. PRIM readiness layer

## C1. Mission Readiness Profile

Before a scored Mission, the system may build a concept level readiness profile from:

1. Principles mastery and assessment history.
2. Certification objective coverage.
3. Prior Mission performance.
4. Independence and hint use.
5. Prior transfer performance.
6. Rhythm reinforcement state.
7. Immersion context state.
8. Campaign and roster state.

The profile recommends preparation, Technical Challenge, and Scaffolding.

## C2. Fair preparation

Every mission declares a minimum required technical toolset.

Readiness can grant more choice, information, or optional challenge above that floor. It cannot remove required tools because a learner is weak.

High mastery may grant Preparation Credits, better starting intelligence, route choice, extra diagnostic options, reduced prompts, or elite optional objectives.

Developing mastery may grant clearer task boundaries, stronger evidence labels, more coaching, and lower distractor density.

## C3. Rhythm and Immersion resources

Rhythm may grant limited Recall resources that surface mnemonic cues but not answers.

Immersion may grant Context Intel established by the story but not hidden technical solutions.

Neither can auto award technical mastery.

# D. Strategy layer

## D1. What the player manages

| System | Player manages |
| --- | --- |
| Roster | Named recurring ensemble operators by qualification, health, and availability |
| Deployment | Who actually goes on the next operation |
| Loadouts | Kits attached to roles for that operation |
| Heat | How loud the institution is in the world |
| Standing | Institutional trust and authority access |
| Intel | Known targets, modifiers, warnings, story missions |
| Recovery | Injured or fatigued operators unavailable |
| Vacancies | Work and roles left uncovered after death, transfer, or departure |
| Promotion | Existing support people absorbing new responsibility |
| Onboarding | New arrivals integrating unevenly into the social and operational graph |
| Wildcard | Scarce Jordan call up authorizations |
| Apex | Scarce PRIM2 intervention authorizations |
| Hitman pressure | Eligibility pressure for hostile escalation including Royce |

Jordan is not a normal selectable roster slot on most story missions.

## D2. Strategy turn

1. Advance time where campaign structure permits.
2. Resolve injury recovery, fatigue, Heat, and Hitman pressure changes.
3. Resolve vacancy and workload consequences.
4. Receive intelligence, sponsor offers, or episode mission.
5. Train, reassign, promote, or prepare kit where allowed.
6. Resolve onboarding and relationship friction.
7. Select or accept operation.
8. Build Mission Readiness Profile where learning mode applies.
9. Assign team and preparation resources.
10. Brief and launch tactical.

## D3. Resources

Core ordinary economy:

1. Budget.
2. Heat.
3. Standing.
4. Intel.
5. Roster availability.
6. Workload and staffing pressure.

Special escalation economy:

```text
WildcardAuthorizationsSeason
ApexAuthorizationsCampaign
ExecutiveAttention
PrimDebt
HitmanPressure
RoyceCooldown
RoyceIncursionsSeason
```

Budget does not directly purchase Jordan or PRIM2.

Canonical Standard balance remains:

1. Jordan Wildcard, 2 nonscripted calls per season.
2. PRIM2 Apex, 3 nonscripted calls per seven season campaign.
3. Royce, maximum 2 nonscripted incursions per season, one per mission, then a two mission cooldown.

Story scripted appearances do not consume these pools.

## D4. Roster continuity

The roster is not auto normalized after loss.

Death, departure, transfer, and injury may produce understaffed deployments, cross training pressure, delayed options, fatigue, support character promotion, reduced capability, and different briefing combinations.

A vacancy can remain open for multiple operations.

## D5. Replacement and promotion

The game does not spawn a generic replacement immediately after loss.

Possible paths:

```text
INTERNAL PROMOTION
CROSS TRAINING
TRANSFER
NEW HIRE OR RECRUIT
NO REPLACEMENT
```

Newcomers do not inherit predecessor relationship values.

# E. Mission kinds

Every mission declares one kind:

```text
TRAINING_RANGE
CANONICAL_EPISODE
SIDE_OPERATION
```

Training Range is a noncanonical simulator exercise attached to songless foundation learning.

Canonical Episode is one of the fixed 21 story missions.

Side Operation is optional campaign play that may develop resources, roster, Heat, Standing, Intel, or retention without creating a television episode.

Operational mission types remain:

| Type | Primary job | Typical success |
| --- | --- | --- |
| Data extraction | Technical work on a node | defensible sealed take |
| Secure and hold | maintain control while work completes | objective survives Window |
| Ghost survey | build Picture with minimal exposure | useful verified intel |
| Denial | prevent hostile use of an objective | objective denied within authorization |
| Recovery | extract person, evidence, or system asset | asset reaches SAFE |
| Continuity | keep service or life safety process alive | service remains or reaches viable state |
| Story beat | authored constraints | mission specific |
| Training exercise | practical skill evidence | declared learning state reached and verified |

All use the same core state grammar where applicable.

# F. Tactical layer

## F1. Turn order

1. Player Phase.
2. Threat Phase.
3. Clock and State Phase.

Standard operators receive 2 AP per Player Phase unless a specialized canonical intervention rule says otherwise.

## F2. Standard mission element

The classic technical field triad remains:

1. Field R, Picture and reconnaissance.
2. Field E, physical control and protection.
3. Field T, technical objective.

Story missions may field other qualified named characters, Leads, Defense personnel, or specialists.

The game controls people, not abstract job icons.

## F3. Jordan intervention

Most story missions launch without Jordan.

When a valid mission reaches CRITICAL, the player may request him through the executive chain if he is off board, a Wildcard Authorization remains, the mission permits it, and a plausible arrival route exists.

Jordan restores options rather than auto solving technical work.

Core identity remains:

```text
ANOTHER PATH
ADAPTIVE ROLE
RALLY THE ROOM
FAILOVER INSTINCT
```

## F4. PRIM2 intervention

PRIM2 can become a nonscripted second stage rescue only on eligible high value missions after Jordan is already present and CRITICAL failure persists or returns.

His authority can expose information and alter permission. It cannot alter physical truth, bypass validation, or resurrect losses.

## F5. Royce incursion

Royce is the opposing board's elite escalation threat. He specializes in breaking Control, forcing route changes, increasing Will pressure, disrupting objective tempo, coordinating Hitman units, and punishing overextension.

He is not a substitute for the technical LAB_NODE problem.

# G. Cyber range layer

## G1. LAB_NODE execution

A LAB_NODE remains a diegetic world object whose technical state affects the mission.

Node View may expose one of these adapter classes:

```text
SIMULATION
TERMINAL
REMOTE_DESKTOP
NETWORK_RANGE
PACKET_ANALYSIS
SIEM
HARDWARE_SIM
DOCUMENT_EVIDENCE
```

The technical workspace remains part of the mission context.

## G2. Deterministic technical correctness

There is no generic hack chance for technical correctness.

A correct action succeeds when the learner has sufficient evidence, chooses an appropriate action, possesses required access and tools, completes the work, and validates it when required.

Randomness belongs to interruption, incomplete information, physical damage, tactical pressure, and changing environment.

## G3. Verification

Technical grading should prefer resulting system state and evidence over a required click path.

Multiple valid solution paths should be accepted when they satisfy the same objective and authorization requirements.

Configuration and verification remain separate states.

## G4. Tactical back effects

Verified technical work may change the board by restoring communications, reopening access routes, improving sensor confidence, containing propagation, restoring continuity, protecting evidence, or changing objective viability.

Physical and tactical pressure may affect technical work through time, access, power, interruption, equipment damage, or evidence integrity.

# H. Adaptive mission systems

## H1. Mission Variant Compiler

Runs before mission launch and chooses only approved scenario primitives.

It can adapt faults, distractors, transfer requirements, starting intelligence, optional objectives, preparation advantages, Technical Challenge, and Scaffolding.

It cannot generate unsafe live targets or unvalidated infrastructure actions.

## H2. Mission Director

Runs during play and adapts pacing rather than technical truth.

It may tune patrol timing, reinforcement timing, interruptions, environmental complications, temporary quiet, authored false signals, and threat tempo.

It may not secretly replace the correct technical answer after a learner has reasoned correctly.

## H3. Threat AI

Threat AI knows only what hostile actors could know in the fiction.

It cannot inspect quiz scores, readiness scores, or hidden learner weakness data in order to cheat.

## H4. Learning Evaluator

The evaluator consumes evidence traces and determines Technical Mastery, Independence, Transfer, and Compliance evidence.

It is logically separate from the Variant Compiler.

# I. Progression and loss

## I1. Ordinary qualification path

```text
Cohort 02 Trainee
    -> Cohort 01 Operator
    -> Field qualification or cross training tags
    -> Cohort 03 Lead or authored specialist progression
```

An operator may earn R, E, or T qualification through training and mission performance.

PRIM succession is not the top node of ordinary XP.

PRIM0, PRIM1, PRIM2, and PRIM3 are Primary Root Identity Mantle succession identities, not generic ranks.

## I2. XP channels

| Channel | Gained by |
| --- | --- |
| Technical | verified technical objectives and defensible evidence |
| Entry | access, holds, protection, stabilization |
| Recon | Picture building, warning, route, evidence work |
| Survival | extracting alive and preserving others |
| Leadership | sound command under pressure |

Learner Technical Mastery is not identical to a character's XP.

## I3. Perks

Keep perk trees small, readable, and character sensitive. Perks enhance established strengths and do not replace the learner's need to make correct technical decisions.

## I4. Injury, death, and casualty class

| Result | Strategy effect |
| --- | --- |
| Downed but extracted | downtime and relationship residue |
| Critical injury | extended unavailability and possible role redistribution |
| Permanent disability | changed capability and life, not automatic removal |
| Transfer or resignation | vacancy plus relationship consequences |
| Death | removed, vacancy, workload, and grief persist |
| Repeated deployment | fatigue and Will pressure |

Recurring characters retain authored casualty classes such as STORY LOCKED, PROTECTED UNTIL, and CAMPAIGN VARIABLE.

Intervention can prevent future loss if it arrives in time. It cannot reverse completed death.

# J. Campaign structure

## J1. Canon story structure

PRIM3 has:

1. 7 seasons.
2. 3 canonical episodes per season.
3. 21 canonical episode missions.
4. 1 canonical source slot per episode.

The 66 module Principles course does not alter this story count.

Three Training Range missions exist for Principles modules M01 through M03 and are explicitly noncanonical simulation exercises.

Optional Side Operations may exist without adding television episodes.

## J2. Failure is data

Poor mission performance can change injury, death, vacancies, workload, Heat, Standing, relationships, available intelligence, resources, debrief dialogue, and later mission conditions.

It can also create learning remediation targets.

A poor result does not casually soft lock the seven season story.

## J3. Authority pressure

Exceeding mission authority may produce tactical success but compliance consequences.

PRIM2 may alter present authorization where canon permits. He cannot retroactively legalize an earlier unauthorized action.

# K. Difficulty contract

PRIM uses three independent settings.

## K1. Tactical Challenge

Representative levels:

```text
STORY
STANDARD
VETERAN
GHOST
```

It may tune enemy Aim or HP, detection gain, Window size, responder timing, Will pressure, intervention scarcity, hostile escalation pressure, and casualty recovery windows.

Canonical intervention defaults remain:

| Tactical Challenge | Wildcard per season | Apex per campaign | Royce cap per season |
| --- | ---: | ---: | ---: |
| Story | 3 | 4 | 1 |
| Standard | 2 | 3 | 2 |
| Veteran | 1 | 2 | 2 |
| Ghost | 1 | 1 | 3 |

## K2. Technical Challenge

Representative levels:

```text
FOUNDATION
APPLIED
ADVANCED
TRANSFER
```

It may tune ambiguity, distractor density, concept integration, transfer distance, evidence completeness, and validation depth.

It may not inject false technical rules merely to become harder.

## K3. Scaffolding

Representative levels:

```text
HIGH
STANDARD
LOW
NONE
```

It may tune hint availability, task decomposition, evidence labeling, interface guidance, and reversible coaching.

## K4. Independence scoring

Hints and scaffolding may reduce Independence scoring without converting an eventually correct technical result into an incorrect one.

# L. Multi client contract

| Client | Must preserve |
| --- | --- |
| Browser tactical | AP, grid, state rules, semantic views, LAB_NODE adapters, intervention ladder |
| Mobile tactical | same resolver, reduced interface complexity, remote lab handoff where practical |
| Future FPS | same phases, objective states, technical verification, and campaign consequences expressed in real time |

The preferred browser tactical renderer is PlayCanvas for the current implementation phase, but renderer choice is subordinate to the shared outcome and learning contracts.

# M. Version one completion checklist

### Readiness

1. Mission Readiness Profile.
2. Minimum required toolset enforcement.
3. Preparation Credits.
4. Rhythm Recall resource.
5. Immersion Context Intel.
6. Separate Technical Challenge and Scaffolding.

### Strategy

1. Ensemble roster.
2. Mission and episode board.
3. Budget, Heat, Standing, and Intel.
4. Injury downtime.
5. Vacancy and workload tracking.
6. Promotion and cross training.
7. Wildcard and Apex pools.
8. Hitman pressure and Royce cooldown.
9. Aftermath writeback.

### Tactical

1. Grid, line of sight, cover, and flank.
2. 2 AP standard turns.
3. R, E, T technical tactical grammar.
4. Detection.
5. Approach, Window, and Extract clocks.
6. Mission state ladder.
7. Downed, stabilize, injury, and death.
8. Jordan request and delayed arrival.
9. PRIM2 Apex state.
10. Royce incursion state.
11. Graded operational outcome.

### Cyber range

1. LAB_NODE adapter interface.
2. Browser terminal adapter.
3. Remote desktop adapter contract.
4. Network range adapter contract.
5. Deterministic verifier interface.
6. Evidence trace writer.
7. Lab session isolation and expiration.
8. Technical result to battlefield state bridge.

### Learning

1. Technical Mastery.
2. Independence.
3. Transfer.
4. Compliance evidence.
5. Objective progress writeback.
6. Remediation recommendation.
7. Variant Compiler.
8. Mission Director.
9. Threat AI knowledge boundary.
10. Learning Evaluator separation.

### Content

1. Training Range 01.
2. Training Range 02.
3. Training Range 03.
4. Data Breach and Exposure canonical vertical slice.
5. Dead Air network and RF slice.
6. One Wildcard rescue test.
7. One Apex intervention test.
8. One Royce incursion test.
9. One vacancy and reassignment test.

# N. Governing gameplay feeling

PRIM3 should make the technical task and the tactical situation matter to each other.

The learner should sometimes know exactly what must be done technically but still have to create enough time and safety to do it.

The learner should sometimes win the operation but leave knowing the technical concept still needs work.

The learner should sometimes fail an operation but prove genuine technical understanding that changes what the system teaches next.

The campaign should still create the emotional moment where the player sees a collapsing mission, a named character at risk, one Wildcard Authorization remaining, and decides:

> **Fuck the perfect grade. Call Jordan. Get them home.**

That rescue can save the people. It cannot purchase understanding.
