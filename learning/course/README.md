# PRIM3 LMS publication contract

Status: `CANON-DERIVED`

The PRIM3 repository owns **canonical course source content and source mappings**. The McCluster repository owns **the three certification foundation modules, instructional decomposition, delivery, account state, progress, assessment experience and the public LMS shell**.

This split is deliberate.

```text
mcclusterishere/Prim3
  21 canonical episode and song source units
  canon + source material + episode and game authorities
           |
           | publishes learning/course/course-feed.json
           v
api.mccluster.org/v1/prim3/course
  McCluster Worker validates and caches the feed
  McCluster prepends 3 songless certification foundations
  McCluster expands every source unit into exactly 3 modules
           |
           v
matthew.mccluster.org/prim3.html
  3 certification foundation modules
  63 PRIM3 aligned modules
  66 instructional modules total
```

## Canonical LMS relationship

The complete LMS contains exactly **66 modules**.

```text
3 McCluster certification foundation modules
+ 21 PRIM3 source units × 3 LMS modules per source unit
= 66 total LMS modules
```

The number **63** refers only to the PRIM3 aligned subtotal. It is not the complete LMS module count.

The first three LMS modules are not attached to any PRIM3 song or episode. They exist so Security Plus and Network Plus material that is missing from the album can be taught without cramming unrelated concepts into song based lessons.

The first PRIM3 source unit begins at LMS module M04.

## Source of truth

The feed is derived from, and must not overrule:

1. `CANON.md`
2. `MAIN-STATUS.md`
3. `game/LEARNING-MISSION-SOURCE-OF-TRUTH.md`
4. `learning/MISSION-CONCEPT-LAB-MATRIX.md`
5. episode and source packages linked by each source unit

If those authorities change, update the feed in the same pull request when course facing meaning changes.

## Feed rules

`course-feed.json` is machine readable publication metadata, not a new canon authority and not the finished LMS curriculum.

Required guarantees:

* stable `schema_version`
* stable source course ID
* exactly 21 source publication entries
* stable source publication IDs `M01` through `M21`
* sequence, season and episode mapping
* song title or explicit `null` for a protected open source slot
* source concept clusters
* source learning objectives
* R E T lab names where defined
* repository relative source pointers
* development and readiness status

The source publication IDs `M01` through `M21` are **not McCluster LMS module IDs**. McCluster maps the first PRIM3 source entry to LMS modules M04 through M06, the second source entry to M07 through M09, and continues until the twenty first source entry maps to M64 through M66.

Do not copy learner progress into this repository. Learner progress belongs to McCluster and its shared Supabase control plane.

## Learning layers

For PRIM3 aligned modules the four learning layers remain:

1. **LEARN** conventional required coursework and assessment
2. **REMEMBER** song and retention layer
3. **WATCH** canonical narrative episode
4. **LAB** practical scenario application

The three McCluster certification foundation modules use LEARN without claiming a PRIM3 song or episode companion. They are deliberately songless and episodeless.

Guided LMS progression is controlled by LEARN. Music, WATCH and LAB reinforce related concepts where a PRIM3 source unit exists, but they never bypass required instruction or assessment.

## Certification coverage

McCluster is responsible for distributing complete coverage of the current CompTIA Security Plus SY0 701 and Network Plus N10 009 objective inventories across the fixed 66 module LMS.

PRIM3 source concepts should be used wherever they genuinely support those objectives. Missing certification material is McCluster enrichment and must never be falsely attributed to a song.

## Safety

The existing PRIM3 learning authorities remain in force. Offensive security material is represented through authorized, fictional, sandboxed, defensive, architectural, evidence, validation or non operational simulation contexts.

## McCluster ingestion

The McCluster Worker fetches the feed from the PRIM3 `main` branch, validates the source schema, preserves the 21 source units, adds the three certification foundations and expands each source unit into its three LMS modules.

This keeps the repositories independent while allowing the public LMS to reflect current PRIM3 canon without forcing PRIM3 to own learner accounts, progress or certification curriculum that is not part of the songs.
