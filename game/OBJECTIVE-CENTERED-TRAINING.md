---
status: PROPOSED
system: Objective-centered 3D tactical battlefields and competitive field training
version: 0.2.0
owner: Matthew McCluster
owner_direction_date: 2026-11-02
supersedes: The small flat v01 reference and its -10 through +10 arena extent
implementation_status: 3D scene reference and design specification; tactical gameplay integration pending
---

# Objective-centered 3D battlefield and E/R/T training

## 1. Owner-requested direction

The active primary objective is the origin, **(0,0)**, and stays at the center of the tactical view. Entry, Recon and Technical operators can compete for that objective in a substantial 3D battlefield.

On 2026-11-02, the owner rejected the initial small overhead grid. The replacement requirements are:

- **Every training arena must extend at least from -50 to +50 on both X and Y.** That is a minimum 100-unit span in each horizontal dimension. The replacement reference extends from **-64 to +64**, a **128 × 128** battlefield.
- Show a **3D tactical view**, with real height, climbable structures, rooftops, elevated firing positions and routes above and below ground-level approaches.
- Fill that space with meaningful terrain, substantial cover and multiple difficult routes. An empty oversized border around a small arena does not satisfy the requirement.
- Make approaching and occupying the objective dangerous. Operators can engage, damage and eliminate opponents in the simulation, including from elevated positions while rivals cross or interact with the objective.

Every operator retains the shared **Math, Science and Information Technology** foundation, with different levels and specialties. E/R/T identifies a field role; it does not assign exclusive ownership of a subject.

These are recorded owner requirements. Specific layouts, equipment tuning, scoring thresholds and timings below remain **proposed**. The 3D reference is an inspectable scene, not a claim that the combat game has been implemented.

## 2. Coordinate and camera contract

### World coordinates

- **X and Y describe the horizontal battlefield plane. Z describes elevation.** Display a selected position as `(x,y)` with a separate elevation value, or explicitly as `(x,y,z)`.
- The primary objective's horizontal anchor is always labeled **OBJECTIVE (0,0)**. Elevation does not silently change X or Y.
- Each training arena's objective-relative playable bounds must include `x = -50`, `x = +50`, `y = -50` and `y = +50` or extend farther. These are minimum extents, not maximums.
- Terrain, routes and usable positions must occupy the larger battlefield; blank scenery and inaccessible padding do not count as playable extent.
- One unit is an abstract training unit unless an authored mission declares a physical scale. One shared scale preserves X/Y geometry; independent axis stretching is forbidden.

For a world position `p` and the announced objective anchor `o`:

```text
objective_relative_position = p - o
horizontal_display_pair    = (p.x - o.x, p.y - o.y)
elevation                   = p.z - o.z
```

World positions, navigation, collision and resolver state stay unchanged. Translation defines the displayed coordinate frame; it does not move the physical arena.

### 3D tactical view

The camera target is the objective anchor. It projects to the exact midpoint of the full tactical canvas, `(width / 2, height / 2)`. Overlaid HUD panels must not shift that midpoint. Orbit and zoom preserve the target; selecting an operator does not silently pan the origin away.

The **projected world X and Y axes intersect at that center**. In an angled 3D view they appear diagonal or foreshortened, as real projected axes should. Label their identities and signs. Do not draw a horizontal/vertical screen crosshair and mislabel it as rotated world geometry. A separate screen-center reticle may identify the origin.

A north-up plan-view option can show +X to the right and +Y upward, with horizontal and vertical axes. In that view, with a common scale `s`:

```text
screen_x = width / 2  + s * (p.x - o.x)
screen_y = height / 2 - s * (p.y - o.y)
```

The primary view remains 3D. Plan view supports coordinate instruction and inspection; it does not replace the battlefield presentation. At high zoom, edge indicators can identify off-screen bounds without distorting the coordinate scale.

### Other objective cases

Secondary objectives retain their correct nonzero coordinates. A hidden primary objective must not leak through camera centering, axes, labels or route metadata: use an explicitly labeled search/briefing view until disclosure permits this frame. A changed primary anchor requires an announced rebase and frame identifier while preserving physical positions. Moving objectives require authored tracking behavior. Multiple equally primary objectives require an explicit shared anchor, not a silently chosen centroid. This training reference uses one stationary relay.

## 3. Replacement reference: 128 × 128 battlefield

- [3D scene preview](../assets/reference/tactical-map/PRIM3-objective-origin-training-v02.html)
- [Rendered 3D battlefield](../assets/reference/tactical-map/PRIM3-objective-origin-training-v02.png)
- [Scene and coordinate data](../assets/reference/tactical-map/objective-origin-training-v02.json)
- [Reference notes and reproduction](../assets/reference/tactical-map/README.md)

The proposed environment is an industrial ravine and ruined transit compound. Low routes, broken working yards, elevated decks, roofs, bridges, ramps and stairs create different exposure and travel choices. The scene records reference walk-surface levels at **-4, 0, 4, 5.55, 12.55 and 16.55 units**. Railings, parapets and rooftop apparatus can extend above those surfaces; these are not the total geometry bounds. Cover and route geometry must be treated as spatial objects, not painted floor icons.

The displayed coach deployment is:

| Role | Horizontal start | Elevation | Visual purpose |
|---|---|---:|---|
| E — Entry | (-48,-30) | 0 | Approach through ground-level cover and structures |
| R — Recon | (+44,-44) | 12.55 | Show elevated observation and ranged pressure |
| T — Technical | (-4,+52) | 4.1 | Approach through infrastructure and layered access |

These are presentation starts, not a balanced competitive fixture. Different elevations and distances are intentional in the visual. Final match starts need measured travel costs, visibility, cover, equipment and initiative testing. All three shown operators are visible because this is a coaching reference; gameplay must still respect earned observation.

The old `v01` PNG, SVG and JSON remain historical artifacts. Their -10 through +10 extent and flat presentation are **superseded and do not meet the current training requirements**. This arena is not established Site 0 geometry or story-location canon.

## 4. Traversal, cover and danger

The large field must offer several connected approaches to the center rather than one long exposed walk. Author distinct lower, ground-level and elevated routes, with recognizable route changes and intermediate positions. Include substantial breaks in sight lines, traversable interiors or passages, cover clusters, stairs or ramps and authored climb links. Mark an actual access route to any usable rooftop or platform; an isolated decorative roof is not a playable vantage point.

Elevated positions must create observable pressure on portions of the objective approach. Recon should be able to observe or engage an exposed rival from a roof or platform when the game's line-of-sight and equipment rules permit. Height alone does not grant omniscience, guaranteed hits or visibility through walls. Provide interruptions to those sight lines and alternative approaches, so one static vantage cannot see every spawn and every objective interaction position.

Climbing, vaulting, changing floor, crossing bridges, moving through cover, aiming and firing use the existing tactical time/AP economy. Their availability and cost depend on authored geometry, operator capability and equipment. A visual ramp is not proof of a working navigation link. Preview overlays must distinguish illustrative routes from resolver-validated movement.

The relay and its interaction zone remain exposed to combat according to physical sight lines. Claiming or verifying grants no immunity, pause in hostile pressure or automatic protection. Damage, blocked access, loss of position and elimination can interrupt a control attempt. Cover and collision must match the visible world, including vertical separation and blocked shots between floors.

## 5. Optional exercise: E versus R versus T

**Working exercise ID:** `EX-ORIGIN-ERT`.

One operator from each role contests a stationary training relay at `(0,0)`. This is an optional exercise, not an added story episode or a replacement for TR01, TR02 or TR03. The 66-module course numbering remains unchanged.

Combat uses the normal shooting, hit, damage, downed and elimination contracts. A simulated kill removes the opponent from active contest until the exercise's return rule applies. Training has no permanent character death or campaign equipment loss, and cannot spend Wildcard/Apex/Royce state. That separation concerns story consequences; it does not remove weapons, danger or combat from the exercise.

### Common objective actions

All three roles receive the required objective tool and can perform:

1. **CLAIM RELAY — proposed 1 AP:** request control through the common training interface from a valid nearby interaction position.
2. **VERIFY CONTROL — proposed 1 AP:** check the resulting relay state through the common readout.

Author the interaction zone as reachable ground-level positions around the relay's actual footprint. The v02 scene declares candidate positions **(-4,0,0), (+4,0,0), (0,-4,0) and (0,+4,0)** around its 2.4 × 2.4 relay cabinet. These are authored interaction anchors, not validated collision or navigation results. The v01 convention of immediately adjacent tiles is superseded. Final collision, interaction range, platform surface and elevation checks must agree with the rendered structure. Being above the relay on another floor is not automatically being in range. Failed prerequisites have a visible explanation and produce no verified claim.

Specialties support different approaches: E can establish close access, R can gather information and exert ranged pressure, and T can diagnose or alter authored infrastructure. Every role can still claim, verify and win. Technical changes require a valid authored access path and deterministic verification; correct knowledge is not a random hacking roll.

### Proposed scoring and reset rules

- Ordinary operators receive **2 AP** per activation under the existing tactical rules. Movement allowance and traversal costs come from the resolver, not an assumption that every AP equals one map unit.
- Evaluate control after all three sides complete a round. A verified, active claimant in the interaction zone earns **1 point** if no active rival occupies that zone.
- Opposing active occupants make the zone **CONTESTED** and prevent scoring. A distant enemy can threaten or eliminate the claimant through combat; mere distant visibility does not itself count as zone occupancy.
- Leaving the zone, becoming downed or being eliminated clears the claim. A later claim requires fresh verification.
- Proposed victory is **3 control points**. Determine any round limit from measured route costs and engagement tests on the full-size arena; the old eight-round example is withdrawn.
- Proposed return is at the eliminated operator's next activation at an authored spawn, with its claim cleared. A blocked spawn defers return rather than displacing another operator. Spawn visibility and repeated elimination loops must be tested before approving this rule.
- A heat reset restores starting positions, AP, exercise equipment, relay state and score. It does not reset or change campaign state.

Rotate roles, starts and initiative independently across heats; three heats are a starting sample, not proof of fairness. Repeat with varied terrain and objective conditions before approving balance. Later mixed-role squad training may reuse the format; this exercise does not impose a three-person campaign roster.

## 6. Shared learning foundation

Math can support signed coordinates, relative displacement, route cost, distance and elevation reasoning. Science can support observation, physical limits and authored interactions with movement or materials. IT can support communications, device state, access and verification. All three domains are available to every operator at different levels of mastery and practice.

Require evidence of the relevant concept in an action and its result. Keep match score, concept mastery, independence and transfer separate. Combat victories, eliminations and repeated identical inputs do not automatically award subject mastery. Learners retain required tools and receive appropriate assistance; tactical difficulty and learning difficulty remain independent.

## 7. Integration and acceptance

Reuse `game/runtime/tactical-resolver.mjs`, [shared role actions](ROLE-ACTION-REGISTRY.yaml), LAB_NODE validation and the existing readiness/evidence machinery. Camera and coordinate presentation must not alter physical state, visibility permissions or technical truth. Account and learner progress remain on the canonical McCluster control plane; this reference adds no separate backend.

A generated mesh scene, camera controls and route overlays establish visual intent. They do not establish implemented combat, navigation, multiplayer, extraction or persistence. The final tactical client must satisfy the existing playable 3D Training Range authority.

Acceptance requires:

1. Every training arena includes at least [-50,+50] on both horizontal axes, with substantial playable terrain across those extents. The replacement reference is [-64,+64].
2. The objective stays at (0,0) and projects to the exact tactical-canvas center through orbit, zoom, resize and HUD changes. Projected axes, signs and elevation remain truthful.
3. Elevated playable positions have real traversal links, collision and navigation. Multiple approaches reach the objective without relying on an inaccessible decorative route.
4. Cover, sight lines and combat respect the 3D world. A supported elevated position can threaten an exposed objective approach; blockers and alternate approaches can interrupt that threat.
5. E, R and T can move, use cover, attack, take damage, be eliminated, claim, verify and win under the same resolver. Interaction grants no combat immunity.
6. Tests distinguish physical contest, distant fire, downed/eliminated claimants, interruption, respawn and reset. Round duration is validated against full-size travel costs.
7. Hidden objectives and unobserved enemies stay hidden. Explicit coordinate rebasing preserves world geometry and state.
8. Simulation outcomes do not mutate campaign state or award unrelated mastery. Final gameplay includes the required mission termination and debrief.

## 8. Existing authorities

- [Foundation canon](../CANON.md)
- [Training Range Authority](TRAINING-RANGE-AUTHORITY.md)
- [Omniscient Command Interface](OMNISCIENT-COMMAND-INTERFACE.md)
- [Adaptive Cyber Range Authority](ADAPTIVE-CYBER-RANGE-AUTHORITY.md)
- [Tactical IT Mechanics Bible](TACTICAL-IT-MECHANICS-BIBLE.md)

Merge through the repository's canon-change review process. Promote approved requirements deliberately; retain untested tuning as proposed.
