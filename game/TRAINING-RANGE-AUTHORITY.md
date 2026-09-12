---
status: CANON
system: PRIM Training Range foundation mission authority
version: 2.0.0
owner: Matthew McCluster
branch: game-mechanics-canon-v2
authority: Specialized authority for the three noncanonical Training Range missions. Where older examples conflict with this file or game/XCOM2-MECHANIC-ADAPTATION-AUTHORITY.md, the newer authorities win.
---

# PRIM3 Training Range Authority

## 1. Purpose

The first three Principles modules are songless certification foundations. They receive practical Missions without creating new songs, episodes, seasons or story canon.

The current Principles foundation is authoritative:

```text
M01  Security Foundations and Risk
M02  Networking Foundations
M03  Identity, Cryptography and Access
```

Any older Training Range example that assigns M01 through M03 to alert triage, scope and evidence, or monitoring infrastructure is stale. Those High Alert lessons now begin at M04.

## 2. Presentation law

Training Range means a real playable tactical simulation.

TR01, TR02 and TR03 must use the same fundamental 3D game grammar as later story Missions:

1. visible playable characters;
2. turn based movement;
3. action points;
4. cover and flanking;
5. line of sight;
6. weapons and combat;
7. hostile or environmental pressure;
8. objective zones;
9. LAB_NODE interaction;
10. extraction and debrief.

They are noncanonical only in story consequence. They are not allowed to be lesser gameplay products.

A form only interface, quiz board or browser card flow may exist as an internal systems harness, but it does not satisfy the final Training Range presentation contract.

The current lightweight McCluster Training Range implementation is classified as the **Training Range Systems Harness**. It proves readiness, variant selection, technical truth locking, evidence traces, scoring and persistence. It is retained as infrastructure and automated test surface, not presented as the finished tactical game.

## 3. Training Range 01

```text
Mission ID: TR01-RISK-AND-CONTROLS
Principles: M01 Security Foundations and Risk
```

Primary practical targets:

1. Confidentiality, integrity and availability.
2. Threat, vulnerability, likelihood, impact and risk.
3. Proportional security controls.
4. Data state and trust concepts where appropriate.
5. Validation of residual risk rather than assuming a control worked.

Game fantasy:

The player deploys a small squad into a compromised simulation facility. Hostile training units and physical pressure interfere with access to evidence and infrastructure. The squad must establish enough physical control for the technical operator to inspect the affected system, identify the material risk, apply the proportional control and verify the result.

Combat protects opportunity. Eliminating every hostile does not complete the technical objective.

Canonical machine readable learning mission:

`learning/missions/TRAINING-RANGE-01-RISK-AND-CONTROLS.yaml`

## 4. Training Range 02

```text
Mission ID: TR02-NETWORK-PATH
Principles: M02 Networking Foundations
```

Primary practical targets:

1. Layered traffic flow.
2. Hosts, addressing and subnets.
3. Switching and routing.
4. Default gateways.
5. DNS and DHCP.
6. Ports and protocols.
7. End to end validation.

Game fantasy:

The squad enters a multi room or multi floor network facility during an active service failure. Operators must secure infrastructure spaces, maintain access to network equipment and protect the technical operator while the learner traces the service path. The final Node View should eventually use the isolated Network Range adapter rather than a fake multiple choice representation of a network.

Correct repair changes tactical state, such as communications, doors, sensors, cameras or objective access.

Canonical machine readable learning mission:

`learning/missions/TRAINING-RANGE-02-NETWORK-PATH.yaml`

## 5. Training Range 03

```text
Mission ID: TR03-TRUST-AND-IDENTITY
Principles: M03 Identity, Cryptography and Access
```

Primary practical targets:

1. Identification, authentication, authorization and accounting.
2. Authentication factors and multifactor authentication.
3. Least privilege and access models.
4. Symmetric and asymmetric cryptography purpose.
5. Hashing and digital signatures.
6. Certificates, PKI and trust validation.
7. Key management foundations.

Game fantasy:

The squad enters an access controlled training complex containing synthetic identities, compromised trust states and hostile simulation forces. Tactical movement and physical access create opportunities to inspect identity and trust nodes. The learner restores least privilege, distinguishes valid from compromised trust and verifies the resulting state before extraction.

Canonical machine readable learning mission:

`learning/missions/TRAINING-RANGE-03-TRUST-AND-IDENTITY.yaml`

## 6. Shared Training Range rules

All three ranges:

1. Are noncanonical simulators for story purposes.
2. Disable story consequences.
3. Do not consume Jordan Wildcard, PRIM2 Apex or Royce story state.
4. Use the normal tactical resolver, cover model, combat model and LAB_NODE contracts.
5. Use playable 3D characters in the final implementation.
6. Preserve minimum required tools at every readiness level.
7. Keep Tactical Challenge independent from Technical Challenge.
8. Use Scaffolding as learner support rather than punishment.
9. Record evidence traces for Technical Mastery, Independence, Transfer and Compliance.
10. Require deterministic verification for state changing technical work.
11. Allow stochastic combat while keeping technical truth deterministic.
12. Require extraction or authored mission termination after the technical objective resolves.
13. Make the technical state visibly affect the battlefield where possible.
14. Never award technical mastery merely for combat success.

## 7. Systems Harness rule

The systems harness remains useful and should not be thrown away.

Its job is to validate the machinery underneath the eventual game:

1. M Account gate.
2. Principles prerequisite.
3. Mission Readiness Profile.
4. Approved variant selection.
5. preparation resources;
6. evidence traces;
7. scoring separation;
8. progress persistence.

When the 3D tactical client exists, it should call the same underlying learning and persistence systems rather than reimplement them.

## 8. Build order

The implementation path is now mechanics first.

### Gate 1

Headless tactical resolver:

1. grid and movement;
2. AP economy;
3. cover and flanking;
4. line of sight;
5. concealment;
6. shooting and damage;
7. hostile turns;
8. mission objective state;
9. LAB_NODE state.

### Gate 2

Greybox 3D tactical client:

1. camera;
2. selectable characters;
3. movement preview;
4. cover indicators;
5. enemy turns;
6. shooting;
7. downed and extraction states;
8. LAB_NODE interaction.

### Gate 3

One complete TR01 greybox mission.

It must already feel like a game before final art exists.

### Gate 4

Asset production control plane and final content pipeline.

### Gate 5

TR02 and TR03 complete tactical missions with real lab adapters where appropriate.

After the three Training Range missions work end to end, the preferred rich story vertical slice remains `Data Breach / Exposure`, followed by `Dead Air` for RF, network and power integration.

## 9. Related authorities

1. `game/XCOM2-MECHANIC-ADAPTATION-AUTHORITY.md`
2. `game/TACTICAL-CORE-MECHANICS.yaml`
3. `game/TACTICAL-IT-MECHANICS-BIBLE.md`
4. `game/ADAPTIVE-CYBER-RANGE-AUTHORITY.md`
5. `game/KINETIC-TECHNICAL-COUPLING-AUTHORITY.md`
6. `game/OMNISCIENT-COMMAND-INTERFACE.md`
