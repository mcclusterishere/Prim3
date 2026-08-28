---
status: DRAFT CHAPTER BLUEPRINT
season: 5
episode: 1
global_episode: 13
level_id: LVL-13
song: IaaS, SaaS, PaaS
mission: Shared Responsibility
runtime_target: 9 minutes
---

# S5E1 - IAAS, SAAS, PAAS

## Merge contract

This chapter expands the locked service-model episode. It must teach ownership
and dependencies without treating a vendor contract as proof that a task is
someone else's problem.

## Chapter promise

A mission-supporting service fails across infrastructure, platform, and
application boundaries. Every team can plausibly say “not our layer.” The
player wins by building one shared map of responsibility and forcing the right
owner to act.

## Song payload

- **Technical:** IaaS/PaaS/SaaS, virtualization, networking, storage, firmware,
  runtime, dashboards, uptime, hybrid models, and shared responsibility.
- **Human:** service as labor, invisible maintenance, overprivileged workers,
  and the temptation to sell certainty no one team controls.
- **Visual:** service layers as physical floors; the performer descends from a
  polished dashboard to power, cables, servers, and exhausted operators.
- **Safety:** gameplay focuses on ownership, health, escalation, and recovery;
  legally/ethically questionable lyric boasts are framed as risks, not options.

## Nine-minute episode

### 0:00-3:00 - Music film

The hook cycles through three polished “service” rooms. Each opens beneath
itself until the audience sees the people, power, cooling, network, runtime,
and software that make the clean interface possible.

### 3:00-6:00 - Human story

Jordan is finally invited into architecture meetings. He expects clarity and
finds status games: each group owns enough to defend itself but not enough to
restore the whole. His frustration risks alienating the one operator who knows
the missing dependency.

### 6:00-9:00 - Watch / Play mission

WATCH resolves the incident once the correct layer accepts ownership. PLAY
requires the player to map dependencies, assign responsibility, escalate with
evidence, restore a minimum path, and verify the user-visible service rather
than stopping at a green component light.

## Playable level contract

- **Player role:** Jordan as cross-layer incident coordinator.
- **Environment:** layered service map connected to infrastructure room,
  platform operations, software support, and field-user view.
- **Primary objective:** restore the minimum mission-critical service.
- **Optional objectives:** preserve data; avoid changing layers outside the
  team's authority; record the ownership gap for governance review.
- **Complication:** several components are healthy in isolation while the end-
  to-end service remains broken.
- **Exit state:** service works; responsibility ambiguity is documented as a
  design defect rather than forgotten after recovery.

## Player verbs

Map, inspect health, assign owner, escalate, restore, test end-to-end, document.

## Graded outcomes

| Channel | Strong result | Weak but continuing result |
|---|---|---|
| Objective | End-to-end service restored | Temporary workaround restores limited service |
| Team | Owners collaborate and learn | Teams comply while relationships deteriorate |
| Exposure | Changes stay within intended layers | Cross-layer improvisation creates new risk |
| Integrity | Ownership/escalation is auditable | Player edits what they do not own |
| Time | Dependency map finds the right owner early | Component-by-component guessing wastes time |

## Persistent state written by the level

Jordan gains architecture influence and records an unresolved ownership gap.
That record becomes relevant to the budget/control decision in `Own the Exit`
and the distributed scale of `Elastic`.

## Prime background trace

- **Visible trace:** Jordan's layered dependency map match-cuts to the same map
  surrounding a sleeping figure in the suspension system; an unnamed authority
  resolves one cross-layer escalation without entering the room.
- **First-watch meaning:** surreal music-film imagery plus routine executive
  escalation.
- **Ghost payoff:** Prime was actively working across every service layer while
  asleep, and the unnamed resolver was his distributed authority.

## Technology accuracy gate

- **Sensor / input:** component health, provider status, logs, dependency map,
  and end-user reports.
- **Compute / reasoning:** trace the service from user request through software,
  platform, infrastructure, and network dependencies.
- **Energy / infrastructure:** data-center power/cooling, compute, storage,
  network, runtime, and application.
- **Access / authorization:** each team acts only within its layer; Jordan
  coordinates and escalates.
- **Human decision owner:** incident commander plus named layer owners.
- **Failure mode:** green components hide broken service, responsibility gaps
  delay recovery, or an out-of-scope change creates a second incident.
- **Real concept taught:** service models divide responsibilities differently;
  the division must be understood end-to-end.
- **Fictional extrapolation:** walkable layer visualization only.

## Production and game assets

- Multi-layer service environment/UI - `NEEDED`
- Dependency/ownership graph mechanic - `NEEDED`
- Four team stations and field-user feedback - `NEEDED`
- Song master/timed lyrics - `NEEDED`
- Escalation/debrief consequence system - `NEEDED`

## Merge hooks

- **Reads from:** Pylon and the cyber-physical ownership lesson.
- **Writes to:** executive visibility and vendor/control pressure.
- **Reusable systems:** dependency graph, ownership tags, end-to-end verification.
- **Owner decisions:** mission-supported service and the layer that ultimately
  owns the defect.
