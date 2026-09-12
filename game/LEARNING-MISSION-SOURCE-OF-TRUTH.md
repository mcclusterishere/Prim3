---
status: CANON
system: Principles -> reinforcement -> readiness -> Mission -> evidence -> remediation
version: 2.1.0
owner: Matthew McCluster
branch: prim3-adaptive-cyber-range
---

# PRIM3 Learning Mission Source of Truth

This document defines how PRIM3 turns conventional instruction, music, story, and practical Mission play into one measurable learning system.

If proposed gameplay, episode, lyric player, lesson, lab, or mission adaptation conflicts with this document, this document wins unless `CANON.md` or a more specialized canonical authority deliberately revises the rule.

## 1. Mechanical authorities

Use this learning authority together with:

1. `game/ADAPTIVE-CYBER-RANGE-AUTHORITY.md`, readiness, adaptation, live labs, evidence traces, and remediation.
2. `game/TRAINING-RANGE-AUTHORITY.md`, the exact current M01 through M03 Training Range mapping.
3. `game/TACTICAL-IT-MECHANICS-BIBLE.md`, battlefield technical grammar.
4. `game/WILDCARD-INTERVENTION-AUTHORITY.md`, Jordan, PRIM2, and Royce escalation.
5. `game/OMNISCIENT-COMMAND-INTERFACE.md`, fused mission control perspective.
6. `story/ENSEMBLE-POV-AUTHORITY.md`, episode and playable character ownership.
7. `learning/MISSION-CONCEPT-LAB-MATRIX.md`, source unit concept applications.
8. `learning/COMPTIA-OBJECTIVE-ALIGNMENT-2026.md`, certification alignment.

A disconnected quiz, fake terminal typing sequence, unexplained hack percentage, or lab that pauses tactical pressure indefinitely does not satisfy this learning contract.

## 2. Core PRIM law

The four learning modalities are:

```text
P  PRINCIPLES  Learn it.
R  RHYTHM      Remember it.
I  IMMERSION   See it.
M  MISSIONS    Do it.
```

Principles is the conventional instructional authority.

Rhythm is memory reinforcement.

Immersion is narrative and consequence reinforcement.

Missions is applied performance.

The learning system must remain educationally valid if a learner uses Principles without the entertainment layers. Rhythm, Immersion, and Missions deepen retention, context, application, and transfer. They do not replace required Principles mastery.

## 3. Fixed 66 module Principles structure

The conventional learning layer contains exactly **66 Principles modules** under the current curriculum contract.

```text
M01  Security Foundations and Risk
M02  Networking Foundations
M03  Identity, Cryptography and Access

M04 through M66
21 canonical PRIM3 source units x 3 instructional modules each
```

The first three modules are songless certification foundations because the songs do not cover every required precursor and later modules should not be overloaded merely to preserve a smaller course count.

PRIM3 source publication still contains 21 canonical source units. McCluster LMS owns the 66 module instructional decomposition.

## 4. Story and Mission structure

The story remains:

```text
7 seasons
3 canonical episodes per season
21 canonical episodes
21 canonical story Missions
```

For each canonical source unit:

```text
1 song or protected source slot
1 episode
1 canonical story Mission
3 Principles modules
```

The first three songless Principles modules receive three noncanonical simulator Missions:

```text
TR01-RISK-AND-CONTROLS
M01 Security Foundations and Risk

TR02-NETWORK-PATH
M02 Networking Foundations

TR03-TRUST-AND-IDENTITY
M03 Identity, Cryptography and Access
```

These Training Range Missions do not create episodes, songs, seasons, or story consequences.

Optional side operations may exist under the game rules without becoming canonical episodes.

## 5. Governing learning loop

```text
P PRINCIPLES
  -> instruction
  -> conventional assessment
  -> concept and objective mastery state

R RHYTHM
  -> mnemonic and recall reinforcement

I IMMERSION
  -> human context, story, consequence, and systems context

MISSION READINESS PROFILE
  -> concept readiness
  -> preparation advantages
  -> Technical Challenge recommendation
  -> Scaffolding recommendation

M MISSIONS
  -> tactical cyber range
  -> real or simulated LAB_NODE work
  -> transfer under pressure

EVIDENCE TRACE
  -> what the learner actually observed, chose, changed, verified, and explained

MASTERY + REMEDIATION
  -> Technical Mastery
  -> Independence
  -> Transfer
  -> Compliance
  -> targeted return to Principles, Rhythm, Immersion, or another Mission
```

The arrows describe the instructional relationship, not a rigid entertainment consumption order.

## 6. Principles layer

Principles must comprehensively teach required course content independently of songs, episodes, and Missions.

Every required Security Plus and Network Plus objective, including applicable nested bullets, must ultimately have explicit conventional instructional coverage. A Plus foundation content may be included where it creates necessary precursor knowledge.

The objective graph should distinguish at least:

```text
TAUGHT
ASSESSED
RHYTHM_REINFORCED
IMMERSION_REINFORCED
MISSION_APPLIED
TRANSFER_PROVEN
```

No objective is comprehensively covered merely because a lyric mentions a term.

## 7. Rhythm layer

Music is a mnemonic and retrieval layer.

Every music film may support a Study Overlay with timed lyrics, clickable technical terms, quick definitions, Principles links, prerequisites, Mission previews, debrief return links, and fictionalization notes.

Owner lyrics remain preserved source material and timed presentation assets may not silently rewrite them.

Qualifying Rhythm engagement may create a limited **Recall** resource in a Mission.

Recall may surface a mnemonic, term, lyric cue, or doctrine reminder. It may not reveal the hidden technical answer, execute a technical action, or award mastery by itself.

## 8. Immersion layer

Episodes provide human context, system stakes, organizational history, and consequences.

Qualifying Immersion engagement may create **Context Intel** when the information is established in story canon and would be legitimately available to the deployed team.

Context Intel may include system ownership, prior incident history, organizational relationships, character trust context, business or human consequences, and previously established physical facts.

Immersion does not replace technical instruction and may not hand the learner an otherwise hidden lab solution.

## 9. Mission Readiness Profile

Before a scored Mission, PRIM may generate a concept level Mission Readiness Profile.

Inputs may include:

1. Principles mastery.
2. Certification objective mastery.
3. Assessment scores and attempts.
4. Prior Mission Technical Mastery.
5. Independence.
6. Transfer.
7. Rhythm reinforcement.
8. Immersion context.
9. Campaign and roster state.

A single aggregate score is insufficient by itself.

Academic strength may improve preparation and agency. Academic weakness may increase Scaffolding. Weakness may not remove the minimum tools required for a fair solution.

## 10. Mission instructional modes

Mission learning support should support at least three modes.

### Assisted

Explicit guidance, visible task structure, generous coaching, and immediate reversible feedback.

### Applied

Scenario goals are clear but the learner chooses more of the procedure and connects multiple concepts.

### Challenge

Minimal guidance. The learner independently diagnoses, acts, validates, and explains. Hints may lower Independence without making an eventually correct technical result incorrect.

These modes are separate from Tactical Challenge.

## 11. Tactical Challenge, Technical Challenge, and Scaffolding

PRIM does not assume game skill equals IT skill.

Every adaptive Mission separates:

```text
TACTICAL CHALLENGE
TECHNICAL CHALLENGE
SCAFFOLDING
```

Tactical Challenge changes battlefield pressure.

Technical Challenge changes ambiguity, concept integration, distractors, evidence completeness, transfer distance, and validation depth.

Scaffolding changes hints, task decomposition, evidence labels, and interface guidance.

A technically advanced learner who is new to tactical games may receive advanced technical work under lower tactical pressure.

A strong tactical gamer with weak technical foundations may receive demanding battlefield play around foundation level technical work.

## 12. Concept annotation contract

Recommended package:

```text
source-material/<song-slug>/
  LYRICS.md
  <timed lyrics>.srt/.ttml/.json
  CONCEPTS.yaml

learning/concepts/
  <concept-id>.md

learning/missions/
  <mission-id>.yaml
```

Minimum concept records should preserve:

1. Stable concept ID.
2. Term and aliases.
3. Domain.
4. Principles module IDs.
5. Certification objective IDs.
6. Prerequisites.
7. Rhythm cue where applicable.
8. Immersion scene where applicable.
9. Mission actions.
10. Mastery evidence.
11. Safety and fictionalization state.

## 13. Ensemble instructional Mission law

The classic field triad remains the functional teaching grammar:

1. **Field R**, Picture, observation, evidence, topology, warning.
2. **Field E**, access, control, safety, protection, physical continuity.
3. **Field T**, system analysis, configuration, recovery, validation.

This does not mean every Mission stars three generic characters or Jordan.

The player controls named characters assigned to a story Mission. Training Range Missions may use explicit simulator operators.

Most ordinary story Missions launch without Jordan.

## 14. LAB_NODE law

Labs exist inside the tactical world rather than as disconnected menu quizzes.

A LAB_NODE may be a terminal, evidence board, rack, switch console, wireless map, incident console, hardware bench, architecture dashboard, recovery console, sensor control panel, document station, isolated Linux environment, isolated Windows environment, network topology, packet analysis workspace, or SIEM workspace.

Interacting consumes tactical opportunity. Threat, clocks, position, physical control, authorization, and role protection remain relevant.

## 15. One world, four views

The Mission interface uses:

```text
AREA VIEW
TACTICAL VIEW
SYSTEMS VIEW
NODE VIEW
```

Node View may expose a real isolated technical environment in the same browser.

The lab is the system inside the tactical object, not a disconnected school website.

## 16. Deterministic technical mastery

Technical correctness is not a generic probability roll.

A correct technical action is correct because the learner:

1. Gathered sufficient evidence.
2. Interpreted it correctly.
3. Chose an appropriate action or sequence.
4. Possessed the required tool and authorization.
5. Completed the work without destructive interruption.
6. Validated the result where validation is required.

Randomness may affect combat, interruption, physical damage, incomplete information, and environmental change. It may not secretly turn a technically correct answer into an incorrect answer.

## 17. Complete objective binding

Each certification objective should eventually bind through the whole learning system:

```text
certification objective
 -> nested bullet where applicable
 -> concept ID
 -> Principles module
 -> conventional assessment
 -> Rhythm reinforcement where applicable
 -> Immersion reinforcement where applicable
 -> character or role application
 -> LAB_NODE action
 -> evidence trace
 -> mastery decision
 -> remediation target
```

Incorrect application should create diegetic consequences where practical, such as lost time, unnecessary isolation, lower evidence integrity, degraded service, higher exposure, extra recovery work, or alternate debrief dialogue.

Do not normally interrupt with a giant red X.

## 18. Stealth assessment

Missions collect structured evidence traces from normal play.

Examples include:

1. Relevant telemetry inspected before escalation.
2. Independent sources compared.
3. Evidence preserved before destructive remediation.
4. Scope checked before a change.
5. Appropriate containment boundary selected.
6. Correct layer configured.
7. Restoration independently verified.
8. Hint requested.
9. Poor configuration reversed.
10. Changed transfer scenario solved.

Evidence must be explainable enough to support a later mastery report.

## 19. Separate result channels

Keep separate:

```text
OPERATIONAL GRADE
TECHNICAL MASTERY
INDEPENDENCE
TRANSFER
COMPLIANCE
```

A player can execute tactically well while misunderstanding a technical concept.

A player can understand a concept while making an expensive tactical decision.

Suggested Technical Mastery composition remains available as an authoring default:

1. 25 percent recognition.
2. 45 percent application.
3. 20 percent transfer.
4. 10 percent evidence explanation or debrief.

Suggested bands:

```text
90 to 100  Applied
75 to 89   Functional
60 to 74   Developing
below 60   Review recommended
```

These weights may be refined by validated assessment research without changing the separation law.

## 20. Adaptive system separation

Adaptive Missions use four logically separate systems.

### Mission Variant Compiler

Chooses an approved scenario variant before deployment using readiness, campaign state, certification objectives, concept targets, Technical Challenge, and Scaffolding.

### Mission Director

Controls pacing and recoverable pressure during play. It may alter patrol timing, interruption, reinforcement timing, environmental complications, temporary quiet, and authored signal noise.

It may not alter hidden technical truth merely because the learner is succeeding.

### Threat AI

Controls hostile actors using only information they could know in fiction.

Threat AI may not inspect assessment scores or hidden readiness data to cheat.

### Learning Evaluator

Scores evidence traces and produces mastery evidence. It is logically separate from scenario generation.

## 21. Intervention and mastery law

Jordan and PRIM2 can save an operation without auto passing the lesson.

Jordan may reveal another credible route, cross support a function, stabilize tempo, or create another chance to apply the concept.

PRIM2 may expose additional sourced information or change present authorization. That does not make unverified information true and does not grant automatic learning credit.

Royce may create pressure and changed conditions. His presence must not convert a technical lesson into nothing but a boss fight.

## 22. Mission briefing

Before PLAY, show a compact Mission Readiness view that may include:

1. Target concepts.
2. Relevant Principles modules.
3. Certification objectives.
4. Readiness bands.
5. Rhythm Recall resources.
6. Immersion Context Intel.
7. Required minimum tools.
8. Optional preparation choices.
9. Tactical Challenge.
10. Technical Challenge.
11. Scaffolding mode.

Do not expose hidden grading rules or exact fault answers.

## 23. Mission debrief

After a Mission, show:

### Operational Report

Grade, team integrity, objective value, exposure, time, compliance, intervention use, and named character consequences.

### Learning Report

Technical Mastery, Independence, Transfer, concepts correctly applied, concepts missed, evidence supporting the result, and certification objective progress.

### Remediation

Exact Principles section, relevant assessment review, Rhythm cue where available, Immersion scene where available, and guided replay or changed transfer Mission where useful.

## 24. Foundation Training Range authoring requirement

The current three foundation Missions are exactly:

```text
TR01-RISK-AND-CONTROLS
M01 Security Foundations and Risk

TR02-NETWORK-PATH
M02 Networking Foundations

TR03-TRUST-AND-IDENTITY
M03 Identity, Cryptography and Access
```

Each must declare Principles module ID, concept IDs, certification objective IDs, minimum required toolset, LAB_NODE adapters, verifier contract, evidence trace contract, Tactical Challenge range, Technical Challenge range, Scaffolding range, and remediation targets.

Training Range Missions do not write story canon consequences.

## 25. Canonical episode authoring requirement

Every canonical episode chapter must explicitly contain or reference:

```text
Episode owner
Base playable roster
Jordan state
Wildcard eligibility and crisis trigger
Apex eligibility and mission classification
Royce incursion eligibility and telegraph rule
Song concept set
Principles module IDs
Certification objective IDs
Timed lyric annotations
Study Overlay beats
Immersion context beats
Mission Readiness inputs
Character or role lab applications
LAB_NODE adapters
Learning objectives
Evidence trace requirements
Mastery evidence
Debrief review cues
Relationship and consequence write
```

An episode is not implementation complete until these are populated or explicitly marked not applicable.

## 26. Difficulty progression

Concept tasks progress through:

```text
RECOGNIZE
INTERPRET
APPLY
TRANSFER
```

Early experiences may emphasize Recognize and Interpret. Later Missions increasingly require Apply, Transfer, cross objective integration, and independent validation.

Harder technical difficulty may increase ambiguity and transfer demand. It may not require technical misinformation.

## 27. Cross source concept graph

Concepts are reusable nodes.

Examples include:

```text
authorization
White Grey Black Hat -> OSINT -> App Attacks -> governance

identity and authentication
Virus Types -> Data Breach -> Evil Twin -> IoT

network media
Got Wifi -> Ghost In The Wires -> IoT

redundancy and recovery
RAID -> Trappin From The Cloud -> Site 0 continuity

trust, input, and change control
Patch Work -> App Attacks -> succession authority
```

Later Missions should require previously learned concepts so delayed retention and transfer can be measured.

## 28. Safety and realism

PRIM3 teaches systems reasoning, defensive response, architecture, controlled simulation, troubleshooting, evidence, recovery, and professional decision making.

Do not make real third party exploitation, live credential abuse, fraud, evasion, sabotage, or other unauthorized wrongdoing the educational requirement.

Live labs must use isolated and authorized training environments.

When lyrics dramatize or exaggerate a technique, Principles and Study Overlay content must identify relevant simplification or fictionalization.

## 29. Build order

Build order is:

1. `TR01-RISK-AND-CONTROLS`, smallest end to end readiness and evidence trace proof.
2. `TR02-NETWORK-PATH`, first isolated Network Range adapter proof.
3. `TR03-TRUST-AND-IDENTITY`, identity and synthetic trust proof.
4. `Data Breach / Exposure`, first rich canonical episode vertical slice.
5. `Dead Air`, RF, Network, and Power integration proof.

## 30. Definition of done per canonical source unit

A source unit is learning complete only when:

1. Three Principles modules are mapped.
2. Required certification objectives and nested bullets are mapped.
3. Owner lyrics are preserved.
4. Timed lyrics exist where Rhythm is used.
5. Relevant concepts are annotated.
6. Principles explanations and assessments are linked.
7. Immersion context is linked.
8. Character specific tactical applications exist.
9. Mission actions bind to concept IDs.
10. LAB_NODE adapters are declared.
11. Mastery evidence is scoreable.
12. Intervention use cannot bypass mastery.
13. Debrief returns to exact remediation resources.
14. Technical accuracy is reviewed.
15. Safety and fictionalization are marked.

## 31. Governing learning law

> **Principles teaches it. Rhythm helps the learner remember it. Immersion helps the learner see why it matters. Missions make the learner do it. Evidence determines what the learner actually proved.**
