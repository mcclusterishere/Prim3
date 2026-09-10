# PRIM3 schema enforcement

These schemas turn the canonical tactical-learning design into machine-checkable content contracts.

## Required validators

- `prm3-concept-mechanic.schema.json` — every reusable concept-to-gameplay binding.
- `prm3-tactical-learning-mission.schema.json` — every machine-readable mission definition.

## Authority

Schemas implement, and may not contradict:
1. `CANON.md`
2. `game/LEARNING-MISSION-SOURCE-OF-TRUTH.md`
3. `game/TACTICAL-LAB-MECHANICS-AUTHORITY.md`

If prose canon changes, update the schema deliberately in the same change set.

## Shipping rule

A tactical-learning mission is not implementation-ready if its machine-readable mission manifest fails schema validation.

The validator deliberately requires:
- at least three concept IDs;
- explicit Field-R, Field-E, Field-T responsibilities;
- objective graph nodes/edges;
- multiple LAB_NODE definitions;
- per-stage Task Atom + AP cost + state transition + player reasoning;
- wrong-path consequences;
- separate validation behavior;
- threat schedule;
- kinetic/technical coupling;
- mastery telemetry;
- five-channel operational scoring;
- debrief-to-lyric links;
- acceptance tests.

`learning/missions/LVL-07-EXPOSURE.json` is the first machine-readable reference mission.