---
status: CANON
system: Song -> timed concept -> lesson -> role lab -> mission mastery
version: 1.2.0
owner: Matthew McCluster
branch: main
---

# PRIM3 Learning Mission Source of Truth

This document defines how PRIM3 turns every educational song into an interactive lesson and then into playable application inside the same episode mission.

If proposed gameplay, episode, lyric-player, lesson or lab design conflicts with this document, this document wins unless `CANON.md` or a more specialized canonical gameplay authority deliberately revises the rule.

## Mechanical authorities

This document owns the **learning loop**.

Use together with:
- `game/TACTICAL-IT-MECHANICS-BIBLE.md` — detailed battlefield technical grammar;
- `game/WILDCARD-INTERVENTION-AUTHORITY.md` — Jordan/PRIM2/Royce escalation;
- `game/OMNISCIENT-COMMAND-INTERFACE.md` — fused mission-control perspective;
- `story/ENSEMBLE-POV-AUTHORITY.md` — episode and playable-character ownership;
- `learning/MISSION-CONCEPT-LAB-MATRIX.md` — 21 episode slots to R/E/T concept applications.

A disconnected quiz, fake terminal typing sequence, unexplained “hack percentage,” or lab that pauses tactical pressure indefinitely does not satisfy this learning contract.

## 1. Core law

**One song = one episode = one canonical mission = one concept set.**

The learning loop is:

```text
MUSIC FILM
  -> timed lyrics
  -> highlighted technical terms
  -> micro-definition / full lesson
  -> HUMAN STORY
  -> MISSION BRIEF
  -> XCOM-style tactical mission
  -> character-specific role applications
  -> operational grade + learning mastery
  -> debrief + exact lyric-cue review
```

The music is not decorative. It is vocabulary/mental-model preparation for the mission.

The mission is not a quiz pasted onto an action scene. It forces the player to use the song's concepts while managing time, people, uncertainty and consequence.

## 2. Music-film learning layer

Every music film should support a **Study Overlay**.

### Timed lyrics
- Lyrics are synchronized using supplied/derived timing data when available.
- `LYRICS.md` remains the preserved owner lyric source.
- Timed presentation assets must not silently rewrite the owner lyrics.

### Clickable terms
A technical term becomes interactive during the cue where it appears.

The overlay may provide:
- restrained visual annotation;
- quick definition;
- full lesson;
- prerequisite/dependency links;
- mission application preview;
- later debrief return link.

A viewer may continue without opening lessons.

### Two explanation depths

**Quick definition** answers: “What does this mean here?”

**Full lesson** should cover:
1. plain-language definition;
2. why the lyric invokes it;
3. where it sits in the larger system;
4. visual/diagram where useful;
5. common misconception;
6. defensive/professional/system context;
7. prerequisites;
8. which mission actions apply it;
9. safe knowledge check/simulation;
10. what PRIM3 simplified or fictionalized.

## 3. Concept annotation contract

Recommended package:

```text
source-material/<song-slug>/
  LYRICS.md
  <timed lyrics>.srt/.ttml/.json
  CONCEPTS.yaml

learning/concepts/
  <concept-id>.md

learning/missions/
  <episode-id>.yaml
```

Minimum concept record should preserve:
- stable concept ID;
- lyric term/aliases;
- domain;
- cue time;
- quick definition;
- full lesson pointer;
- prerequisites;
- applicable roles;
- mission actions;
- safety/fictionalization state.

## 4. Ensemble instructional mission law

The classic field triad remains the **functional teaching grammar**:

- **Field-R** — Picture, observation, evidence, topology, warning;
- **Field-E** — access, control, safety, protection, physical continuity;
- **Field-T** — system analysis, configuration, recovery, validation.

But this does **not** mean every mission stars three generic characters or Jordan.

The player controls the named characters actually assigned to the episode mission.

Those characters may include:
- one or more R/E/T-qualified operators;
- Leads/Defense/cohort/specialist roles;
- episode-specific mixed teams;
- Jordan only if scripted or called as Wildcard;
- PRIM2 only if scripted or called through eligible Apex intervention.

Most ordinary PLAY missions launch **without Jordan**.

### Functional coverage requirement

Every canonical song mission must meaningfully exercise the song's required technical perspectives. In many episodes that means R/E/T applications. It does **not** require every perspective to be embodied by one fixed recurring trio.

A character can be cross-trained, a mission can divide work across several people, and a non-Jordan character can own the decisive technical choice.

This protects both education and ensemble storytelling.

## 5. LAB_NODE rule

Labs exist inside the tactical board, not as disconnected menu quizzes.

A `LAB_NODE` may be:
- terminal;
- evidence board;
- rack/cabling panel;
- wireless map;
- incident console;
- hardware bench;
- architecture dashboard;
- recovery console;
- sensor-control panel;
- document/authorization station.

Interacting costs tactical opportunity. Threat, clocks, position, physical control and role protection remain relevant.

## 6. Deterministic technical mastery

Technical correctness is **not** a generic probability roll.

A correct technical action is correct because the player:
- gathered sufficient evidence;
- interpreted it correctly;
- chose the correct action/sequence;
- possessed the required tools/authorization;
- and completed the work without destructive interruption.

Randomness may change the battlefield around the player. It may not silently turn a correct answer into a wrong one.

## 7. Knowledge application model

Each learning objective binds:

```text
lyric cue
 -> concept ID
 -> lesson
 -> character/role application
 -> LAB_NODE/action
 -> evidence of mastery
```

Incorrect application creates diegetic consequences such as:
- lost time;
- lower objective/evidence integrity;
- degraded system state;
- additional recovery work;
- higher exposure;
- lower Learning Mastery;
- alternate debrief dialogue.

Do not normally interrupt with a school-style giant red X.

## 8. Operational grade and Learning Mastery are separate

A player can execute tactically well but misunderstand a technical concept, or understand the concept while making a costly operational decision.

Keep those signals separate.

Suggested mastery composition remains:
- 25% recognition;
- 45% application;
- 20% transfer to changed scenario;
- 10% evidence explanation/debrief.

Suggested bands:
- 90–100 Applied
- 75–89 Functional
- 60–74 Developing
- below 60 Review recommended

## 9. Intervention/mastery law

Jordan and PRIM2 can **save the mission without auto-passing the lesson**.

### Jordan Wildcard
Jordan may:
- reveal a credible alternate route using earned information;
- cross-support R/E/T functions;
- stabilize tempo/people;
- help create another chance to apply the concept.

Jordan may not simply perform the entire scored learning objective while the player watches and award mastery to another character/player.

If Jordan performs a required technical step, the player must still make the relevant concept decision or complete a transfer/validation task to earn full mastery.

### PRIM2 Apex
PRIM2 may expose additional `PRIM2-SOURCED` information or change present authorization. That does not make unverified information true and does not grant automatic learning credit.

Apex rescue can preserve a character and still leave the Learning Report saying:

> **Mission survived. Concept not mastered. Review recommended.**

That distinction is intentional.

### Royce
Royce creates additional pressure. He can force the player to apply concepts under changed conditions, but his presence must not convert a technical lesson into nothing but a boss fight.

## 10. Briefing UX

Immediately before PLAY, show a compact Concept Loadout:
- concepts heard in the song;
- which were opened/reviewed;
- which mission functions may apply them;
- optional review links.

Do not require lesson completion unless a separate Guided Curriculum mode deliberately does so.

## 11. Debrief UX

After the mission, show two distinct reports.

### Operational Report
- grade;
- team integrity;
- objective/take;
- exposure;
- time;
- compliance;
- intervention use;
- named character consequences.

### Learning Report
- concept mastery;
- concepts correctly applied;
- concepts missed/misapplied;
- character/role performance;
- exact lyric-cue replay links;
- lesson review links.

Intervention-specific states may include:

```text
WILDCARD_USED
APEX_USED
ROYCE_INCURSION
INDEPENDENT_COMMAND
WILDCARD_RECOVERY
APEX_RECOVERY
```

## 12. Episode authoring requirement

Every episode chapter must explicitly contain:

```text
### Episode owner
### Base playable roster
### Jordan state: scripted / off-board wildcard / locked out
### Wildcard eligibility + crisis trigger
### Apex eligibility + mission classification
### Royce incursion eligibility + telegraph rule
### Song concept set
### Timed lyric annotations
### Study Overlay beats
### Character/role lab applications
### Learning objectives
### Mastery evidence
### Debrief review cues
### Relationship/consequence write
```

An episode is not implementation-complete until these are populated or explicitly marked not applicable.

## 13. Difficulty progression

Concept tasks progress through:
1. Recognize
2. Interpret
3. Apply
4. Transfer

Early seasons emphasize Recognize/Interpret. Later seasons increasingly require Apply/Transfer and cross-song integration.

Difficulty may alter tactical pressure/intervention scarcity. It should not require technical misinformation to become harder.

## 14. Cross-song concept graph

Concepts are reusable nodes.

Examples:
- authorization: White/Grey/Black Hat -> OSINT -> App Attacks -> endgame governance;
- identity/authentication: Virus Types -> Data Breach -> Evil Twin -> IoT;
- network media: Got Wifi -> Ghost In The Wires -> IoT;
- redundancy/recovery: RAID -> Trappin From The Cloud -> Site 0 continuity;
- trust/input/change control: Patch Work -> App Attacks -> succession authority.

Later missions should require prior concepts so retention is measurable.

## 15. Safety and realism

PRIM3 teaches systems reasoning, defensive response, architecture, controlled simulation and professional decision-making.

Do not make real third-party exploitation, live credential abuse, fraud, evasion, sabotage or other actionable wrongdoing the educational requirement.

When lyrics dramatize or exaggerate a technique, lessons must identify what is fictionalized/simplified.

## 16. Reference implementation

`Data Breach / Exposure` remains a strong end-to-end learning vertical slice because the repo already contains timing/audio material.

The tactical prototype should now use a **named ensemble team**, preserve the Wildcard/Apex state model, and permit a crisis branch where a Jordan request can occur without making Jordan the episode owner.

## 17. Definition of done per song

A song package is learning-complete only when:
- owner lyrics are preserved;
- timed lyrics exist or are authored;
- relevant concepts are annotated;
- definitions/lessons are linked;
- character-specific tactical applications exist;
- mission actions bind to concept IDs;
- mastery evidence is scoreable;
- intervention use cannot bypass mastery;
- debrief returns to lyric cues;
- technical accuracy is reviewed;
- fictionalization/simplification is marked.

That is the canonical PRIM3 teaching loop.
