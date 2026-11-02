---
status: PROPOSED
system: Objective-centered tactical coordinates and competitive field training
version: 0.1.0
owner: Matthew McCluster
owner_direction_date: 2026-11-02
implementation_status: Design specification and reference visual; gameplay integration pending
---

# Objective-centered tactical map and E/R/T training

## 1. Owner-requested direction

The tactical map presents its X and Y axes through the middle of the screen. The active primary objective is the origin, **(0,0)**. A competitive training exercise lets Entry, Recon and Technical operators contest that objective.

Every operator retains the shared **Math, Science and Information Technology** foundation, with individual levels and specialties. E/R/T identifies the current field role; it does not assign exclusive ownership of a subject.

These are the owner's requested design requirements. The scoring thresholds, timing and initial arena below are **proposed implementation details**, not approved balance values. This document and its images do not establish finished or deployed gameplay.

## 2. Coordinate contract

- **+X points right; +Y points up.** Negative values point left and down.
- The origin lies at the exact midpoint of the tactical screen: `(width / 2, height / 2)`.
- The map fills that screen behind the HUD. Overlaid controls and responsive panels must not shift the origin.
- X is the horizontal center line; Y is the vertical center line. Both remain readable with signed tick labels. Axis identity must remain understandable without color.
- The announced primary objective has the persistent label **OBJECTIVE (0,0)**.
- The training fixture uses one cell per abstract training unit. No real-world distance is implied.
- Selection shows a coordinate pair in the same frame. Floor/elevation is a separate value and never silently changes X/Y.

Let `p` be a world position, `o` the active objective's world anchor, and `s > 0` one shared pixels-per-unit scale:

```text
display_x = p.x - o.x
display_y = p.y - o.y
screen_x  = width / 2  + s * display_x
screen_y  = height / 2 - s * display_y
```

World positions, navigation, collision and resolver state remain unchanged. Only their display coordinates are translated. One common scale preserves geometry; independent X/Y stretching is forbidden.

Zoom changes `s` around the origin. The teaching view does not silently pan, rotate or follow a selected soldier away from the centered objective. Cinematic transitions return to the same labeled coordinate frame.

### Objectives outside this training exercise

- **Secondary objectives:** remain at their correct nonzero coordinates relative to the active primary anchor.
- **Hidden objective:** do not reveal its location through centering, axes, routes or metadata. Use an explicitly labeled search/briefing view until disclosure permits the objective-centered tactical frame.
- **Primary objective change:** announce the new anchor and frame identifier; recompute labels while preserving physical positions. Do not teleport terrain or operators.
- **Moving objective:** an authored mission must explicitly signal objective tracking and the translating frame. The training objective below is stationary.
- **Multiple equally primary objectives:** the mission must identify an explicit shared objective anchor before using this convention; do not choose a secret target or arbitrary centroid silently.

## 3. Reference visual and fixture

- [Tactical-map PNG](../assets/reference/tactical-map/PRIM3-objective-origin-training-v01.png)
- [Editable tactical-map SVG](../assets/reference/tactical-map/PRIM3-objective-origin-training-v01.svg)
- [Coordinate fixture](../assets/reference/tactical-map/objective-origin-training-v01.json)

The displayed teaching arena spans **-10 through +10** on each axis. Its sample deployment is:

| Operator | Start | Raw Manhattan distance to origin |
|---|---|---:|
| E | (-6,-3) | 9 |
| R | (+6,-3) | 9 |
| T | (0,+9) | 9 |

Equal raw distance does not establish balance. Cover, sight lines, passability, route length, initiative, equipment and role abilities still require testing. The reference is an explanatory layout, not Site 0 geometry or an existing story location. A coaching view may display all three starts; normal gameplay visibility follows earned observation.

## 4. Optional exercise: E versus R versus T

**Working exercise ID:** `EX-ORIGIN-ERT`.

This is a noncanonical simulation with one operator from each role competing for a stationary training relay at `(0,0)`. It is an optional team-training activity, not an added episode or a replacement for TR01, TR02 or TR03. The 66-module course numbering remains unchanged.

The exercise uses simulated tags and temporary disablement. It cannot kill story characters, consume campaign equipment, change relationships, or spend Wildcard/Apex/Royce state. Use practice equipment and fictional or isolated lab interfaces.

### Common objective actions

All three roles receive the required objective tool and may perform both actions from an orthogonally adjacent interaction tile:

1. **CLAIM RELAY — proposed 1 AP:** request control through the common training interface.
2. **VERIFY CONTROL — proposed 1 AP:** check the resulting relay state through the common readout.

The relay occupies the origin tile; the fixture's final interaction/collision rules must agree with that footprint. Taking an interaction does not itself prove success. A failed prerequisite has a visible explanation and produces no verified claim.

Specialist methods can help establish access or information, but no role receives exclusive access to claiming, verifying or winning. E can protect space, R can improve observation, and T can diagnose the relay. Their shared subject knowledge can support additional authored methods.

### Proposed round, contest and win rules

- Each ordinary operator receives **2 AP** per activation, using existing movement and action rules.
- Resolve scoring once after all three sides complete a round, not immediately after the first activation.
- A verified claimant earns **1 control point** if still active and adjacent, and no active rival is adjacent at that evaluation.
- Two or more active opposing operators adjacent to the relay make it **CONTESTED**: nobody scores.
- Leaving the interaction zone or being tagged out invalidates that operator's claim. Changing a candidate claim requires fresh verification.
- First to **3 control points** wins; after **8 rounds**, highest score wins, with equal scores recorded as a draw.
- A tagged-out operator returns at its authored spawn on its next activation, with its claim cleared. A blocked spawn defers return; it never displaces another operator.
- A heat reset restores starting positions, AP, relay state and points. No campaign state is reset or modified.

Begin with a three-heat rotation so each participant experiences E, R and T, each spawn, and each initiative position. Rotate assignments independently; add heats if a role remains tied to one spawn or initiative slot. Repeat with changed arena conditions before drawing conclusions about balance. Team play may later use mixed-role squads; this exhibition is not a mandatory three-person campaign roster.

## 5. Learning and results

The exercise can teach signed coordinates, distance, route costs, observation, measurement, device state and validation through actions in the arena. Each concept requires observable evidence and a defined consequence.

Keep **match score**, **concept mastery**, **independence** and **transfer** separate. Tags, victories and repeated identical inputs do not automatically award Math, Science or IT mastery. Developing learners retain required tools and receive assistance. Tactical difficulty and learning difficulty remain independent.

## 6. Integration and acceptance

Reuse `game/runtime/tactical-resolver.mjs`, [shared role actions](ROLE-ACTION-REGISTRY.yaml), LAB_NODE validation and the existing readiness/evidence machinery. Display-frame translation must not alter resolver coordinates, collision, observation permissions or technical truth. Human-versus-AI and multiplayer support are later implementation decisions; this reference does not claim either exists.

Account state and learner progress remain on the canonical McCluster control plane. Add no separate progress store or backend in Prim3.

Acceptance requires:

1. Origin remains centered at phone, tablet and desktop sizes, including zoom and HUD changes.
2. Objective projects to `(0,0)` and screen center; negative coordinates and selected coordinates are correct.
3. Hidden objectives stay hidden; explicit rebasing preserves world positions.
4. Every role can claim, verify and win; contests and resets resolve deterministically.
5. Simulation results cannot mutate campaign state or award unrelated mastery.
6. Final gameplay meets the existing playable 3D Training Range contract. This static reference alone does not satisfy it.

## 7. Existing authorities

- [Foundation canon](../CANON.md)
- [Training Range Authority](TRAINING-RANGE-AUTHORITY.md)
- [Omniscient Command Interface](OMNISCIENT-COMMAND-INTERFACE.md)
- [Adaptive Cyber Range Authority](ADAPTIVE-CYBER-RANGE-AUTHORITY.md)
- [Tactical IT Mechanics Bible](TACTICAL-IT-MECHANICS-BIBLE.md)

Merge through the repository's canon-change review process. Promote approved requirements deliberately; retain untested tuning as proposed.
