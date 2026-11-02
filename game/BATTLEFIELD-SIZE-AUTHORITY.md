---
status: OWNER DIRECTION
system: Game / battlefield extent
version: 1.0.0
owner_direction_date: 2026-11-02
supersedes: the −50…+50 minimum and the −64…+64 reference extent proposed in OBJECTIVE-CENTERED-TRAINING.md (Prim3 PR #17)
---

# Battlefield size: minimum extents

The owner's direction, 2026-11-02:

> "I don't think any level should be under 100 absolute value from each axis… 100 for the training for the team, and then 150 for a real scenario." It "can't be so … easy and boring."

## The rule

| Level type | Minimum extent on **both** X and Y | Grid |
|---|---|---|
| **Team training** (Training Range, E/R/T exercises) | **−100 … +100** | at least 201 × 201 tiles |
| **Real scenario** (story missions, live operations) | **−150 … +150** | at least 301 × 301 tiles |
| Any level, of any kind | never under ±100 on either axis | — |

- **Origin:** the objective sits at **(0, 0)**, the centre, as in the objective-centred training design. Its distances are signed, so a coordinate tells you which side of the objective you are on.
- **Height:** elevation (Z) is not capped by this rule. Use as many floors, roofs and bridges as the level needs.
- **Larger is allowed.** The minimum is a floor, never a target to shrink toward.

## "Not easy and boring"

Extent alone does not make a level interesting. Every level must also have:
- **several real approaches** to the objective (ground, elevated, flank or water), none of them a safe default;
- **meaningful cover and sightlines,** so position decides fights; open ground has a cost;
- **elevation that matters,** for example roofs, stairs and bridges with an aim bonus and exposure trade-offs;
- **travel that takes turns,** so the objective clock and AP force choices;
- **opposition that can contest the objective,** not just stand in the way.

Exact tuning is still proposed and must be playtested.

## Consequences for existing work

- **Codex's PR #17 battlefield (−64…+64):** a good layout reference, but **below this minimum**. Grow it to at least ±100 before it is a Training Range level.
- **The 10 × 10 courtyard** (the tactics preview in `mcclusterishere/mccluster` and the PlayCanvas courtyard study): a **mechanics test bed only**, never a level.
- **Engineering:** 201² to 301² tiles (40,401 to 90,601 per floor) rules out one mesh per tile and per-frame full scans. Large maps need:
  - chunked terrain and instancing;
  - visibility culling;
  - bounded, local path queries;
  - fog-of-war computed incrementally.

  The resolver's `findPath` already bounds its search by the move range. Nothing in this rule changes course numbering, story chronology or learning authority.
