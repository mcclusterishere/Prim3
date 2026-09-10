# PRIM3 schema enforcement

These schemas turn the canonical tactical-learning design into machine-checkable content contracts.

## Required validators

- `prm3-concept-mechanic.schema.json` — every reusable concept-to-gameplay binding.
- `prm3-tactical-learning-mission.schema.json` — every machine-readable mission definition.

## Authority

Schemas implement, and may not contradict:
1. `CANON.md`
2. `game/TACTICAL-IT-MECHANICS-BIBLE.md`
3. `game/LEARNING-MISSION-SOURCE-OF-TRUTH.md`
4. `game/WILDCARD-INTERVENTION-AUTHORITY.md`
5. `story/ENSEMBLE-POV-AUTHORITY.md`

If prose canon changes, update the schema deliberately in the same continuity pass.

## Shipping rule

A tactical-learning mission is not implementation-ready if its machine-readable mission manifest fails schema validation.

The mission validator now requires the implementation to express:
- episode owner, Jordan-presence state, mission lead and primary playable POVs;
- a **named playable roster**, rather than hard-coding three generic protagonist slots;
- the mission functions that must be covered (`R`, `E`, `T`, Lead, Defense, Support, Authority, Wildcard or other authored functions);
- `STABLE / DEGRADED / CRITICAL / TERMINAL` mission state and explicit crisis thresholds;
- Jordan state: `SCRIPTED_ASSIGNMENT`, `OFF_BOARD_WILDCARD`, or `LOCKED_OUT`;
- Wildcard eligibility, arrival delay/ingress and consequence write;
- PRIM2 Apex eligibility, mission classification, story-visibility state and authority/information contribution;
- Royce Incursion eligibility, telegraph rule, ingress/resolution and Jordan `OLD_BUSINESS` state;
- objective graph and LAB_NODE state;
- deterministic technical reasoning and explicit validation;
- threat schedule and kinetic/technical coupling;
- Learning Mastery that cannot be auto-awarded by Jordan/PRIM2 intervention;
- operational scoring that records intervention use separately from mission grade;
- debrief-to-lyric links and acceptance tests.

## Functional-role correction

Older schema versions required literal `Field-R`, `Field-E`, and `Field-T` objects on every mission.

That is superseded.

R/E/T remain the core **technical mission functions**, but named characters may be cross-trained, leads/defense/specialists may participate, and some authored missions can distribute those functions differently. The schema therefore validates required functions and their character assignments instead of forcing every episode into the same three-person cast.

## Intervention implementation data

The prose authority is:
- `game/WILDCARD-INTERVENTION-AUTHORITY.md`

The machine-readable action vocabulary is:
- `game/INTERVENTION-ACTION-REGISTRY.yaml`

Canonical Standard default balance remains:
- 2 non-scripted Jordan Wildcard calls per season;
- 3 non-scripted PRIM2 Apex calls across the campaign;
- maximum 2 non-scripted Royce Incursions per season with a two-mission cooldown.

Story-scripted appearances are separate from those pools.

## Reference mission migration

`learning/missions/LVL-07-EXPOSURE.json` was authored against the older schema and must be migrated before it is treated as a current schema-valid reference implementation. Its story/learning concepts may still be useful, but its machine-readable shape cannot silently override the ensemble/intervention schema.
