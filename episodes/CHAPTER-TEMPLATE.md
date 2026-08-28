---
status: TEMPLATE
system: PRIM3 episode / playable-level chapter
version: 1.1.0
---

# PRIM3 episode / level chapter template

Use one copy of this structure for every song. A **level** here means the
playable mission attached to an episode; it does not automatically mean one of
Site 0's nine architectural floors.

## Identity

- **Global episode / level:**
- **Season / episode:**
- **Song:**
- **Mission:**
- **Source lyrics:** `source-material/<song>/LYRICS.md`
- **Development state:** `DRAFT`, `PROPOSED`, or `CANON`

## Merge contract

Record what is locked, what this chapter adds, and what must remain open. The
chapter may elaborate existing canon, but it may not silently replace
`CANON.md`, `story/EPISODE-PROGRESSION.md`, or an owner-locked chronology.

## Chapter promise

One paragraph stating the human problem, technical problem, and playable
fantasy in plain English.

## Song payload

- **Technical payload:** concepts carried by the lyrics.
- **Human payload:** emotion, temptation, contradiction, or relationship
  pressure carried by the song.
- **Visual vocabulary:** repeatable images, colors, objects, and motion.
- **Safety translation:** how offensive language or methods become defensive,
  authorized, or abstracted gameplay rather than an abuse tutorial.

## Nine-minute episode

### 0:00-3:00 - Music film

State the visual thesis, performer/perspective, beginning, escalation, and
image that hands off to the human story.

### 3:00-6:00 - Human story

State the ordinary-life pressure, relationship conflict, choice, and emotional
residue that must survive into later episodes.

### 6:00-9:00 - Watch / Play mission

State the authored WATCH action and the equivalent PLAY objective. Both must
resolve the same major story event unless canon explicitly branches.

## Playable level contract

- **Player role:**
- **Environment:**
- **Entry state:**
- **Primary loop:** Observe -> decide -> act -> verify -> extract/debrief.
- **Primary objective:**
- **Optional objectives:**
- **Complication:**
- **Exit state:**
- **Target first-play duration:** approximately three minutes for the episode
  cut; a replayable version may run longer.

## Player verbs

List only verbs the build must actually support: move, inspect, compare,
route, verify, isolate, assign, restore, escort, operate, or similar.

## Outcome channels

Every mission reports:

- **Objective** - useful result secured.
- **Team** - who returns and in what condition.
- **Exposure** - visibility, disruption, and collateral consequences.
- **Integrity** - authorization, evidence, compliance, and safety boundaries.
- **Time** - speed of stabilization.

Avoid false binary failure. Weak outcomes must create recoverable consequences,
not erase the episode.

## Persistent state written by the level

Record relationship, injury, evidence, exposure, resource, authority, and
Prime-background-presence changes that later chapters may read.

## Prime background trace

- **Visible trace:** the exact shot, sound, interface state, object, or action
  that is genuinely present on first watch.
- **First-watch meaning:** the ordinary explanation available at this point in
  the story.
- **Ghost payoff:** what the same trace proves once Prime's distributed presence
  and hidden authority are understood.

Coordinate the trace with `story/PRIME-LURK-LEDGER.md`. It must not depend on a
later continuity cheat.

## Technology accuracy gate

- **Sensor / input:**
- **Compute / reasoning:**
- **Energy / infrastructure:**
- **Access / authorization path:**
- **Human decision owner:**
- **Failure mode:**
- **Real concept taught:**
- **Fictional extrapolation:** `NONE` unless explicitly identified.

## Production and game assets

List required location geometry, characters, props, UI, animation, VFX, music,
SFX, voice, and cinematic transitions. Mark each item `EXISTS`, `NEEDED`, or
`OPTIONAL`.

## Merge hooks

- **Reads from:** prior continuity and required source files.
- **Writes to:** later chapters and persistent state.
- **Reusable systems:** mechanics or assets another episode can inherit.
- **Owner decisions still required:** consequential choices only.

## Completion gate

A chapter is ready to graduate from blueprint to episode draft only when its
human conflict, mission loop, technical gate, five outcomes, continuity writes,
Prime trace, and minimum asset list are all present.
