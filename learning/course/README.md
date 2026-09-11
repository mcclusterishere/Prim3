# PRIM3 LMS publication contract

Status: `CANON-DERIVED`

The PRIM3 repository owns **course source content and canonical mappings**. The McCluster repository owns **delivery, account state, progress, assessment UX and the public LMS shell**.

This split is deliberate:

```text
mcclusterishere/Prim3
  canon + source material + episode/game authorities
           |
           | publishes learning/course/course-feed.json
           v
api.mccluster.org/v1/prim3/course
  McCluster Worker validates + caches the feed
           |
           v
matthew.mccluster.org/prim3.html
  conventional LMS + music/watch/lab companions
```

## Source of truth

The feed is derived from, and must not overrule:

1. `CANON.md`
2. `MAIN-STATUS.md`
3. `game/LEARNING-MISSION-SOURCE-OF-TRUTH.md`
4. `learning/MISSION-CONCEPT-LAB-MATRIX.md`
5. episode/source packages linked by each module

If those authorities change, update the feed in the same PR when the course-facing meaning changes.

## Feed rules

`course-feed.json` is machine-readable publication metadata, not a new canon authority.

Required guarantees:

- stable `schema_version`;
- stable course ID;
- stable module IDs (`M01` through `M21`);
- sequence, season and episode mapping;
- song title or explicit `null` for the protected open slot;
- concept cluster;
- learning objectives;
- R/E/T lab names where defined;
- repository-relative source pointers;
- development/readiness status.

Do not copy learner progress into this repository. Progress belongs to McCluster/Supabase.

## Four-layer contract

The published course always exposes four aligned layers:

1. **LEARN** — conventional required coursework and assessment;
2. **REMEMBER** — song/retention layer;
3. **WATCH** — canonical narrative episode;
4. **LAB** — PLAY/LAB_NODE application.

Guided LMS progression is controlled by **LEARN**. Music, WATCH and PLAY reinforce the same concepts but do not silently bypass required assessments.

## Safety

The existing PRIM3 learning authorities remain in force. Offensive-security material is represented through authorized, fictional, sandboxed, defensive, architectural, evidence, validation or non-operational simulation contexts.

## McCluster ingestion

The McCluster Worker fetches the feed from the PRIM3 `main` branch, validates the schema and serves a normalized copy from `api.mccluster.org`. This keeps the two Git repositories independent while allowing McCluster to build the course from PRIM3's current source-of-truth metadata.
