---
status: CANON
system: Song -> timed concept -> lesson -> role lab -> mission mastery
version: 1.1.0
owner: Matthew McCluster
---

# PRIM3 Learning Mission Source of Truth

This document defines how PRIM3 turns every educational song into an interactive lesson and then into playable application inside the same episode mission.

If a proposed gameplay, episode, lyric-player, lesson, or lab design conflicts with this document, this document wins unless `CANON.md` is deliberately revised.

## Mechanical authority

This document owns the **learning loop**. `game/TACTICAL-LAB-MECHANICS-AUTHORITY.md` owns the detailed battlefield implementation of that loop: AP economy, LAB_NODE state machines, Task Atoms, Field-R Picture/Evidence Tokens, Field-E Control Zones, Field-T technical state, interruption, validation, combat coupling, objective graphs, and mission-spec requirements.

`learning/MISSION-CONCEPT-LAB-MATRIX.md` binds the current 21 episode slots to concrete R/E/T lab concepts, and `learning/missions/LVL-07-EXPOSURE-GRANULAR.md` is the reference implementation for mission-level granularity.

A disconnected quiz, fake terminal typing sequence, unexplained “hack percentage,” or lab that pauses tactical pressure indefinitely does not satisfy this learning contract.

## 1. Core law

**One song = one episode = one mission = one concept set.**

The learning loop is:

```text
MUSIC FILM
  -> timed lyrics
  -> highlighted technical terms
  -> micro-definition / full lesson
  -> HUMAN STORY
  -> MISSION BRIEF
  -> XCOM-style tactical mission
  -> character-specific role labs
  -> operational grade + learning mastery
  -> debrief + exact lyric-cue review
```

The music is not decorative. It is the vocabulary briefing for the mission.
The mission is not a quiz pasted onto an action scene. It forces the player to use the song's concepts as part of completing the operation.

## 2. Music-film learning layer

Every music film must support a **Study Overlay**.

### Timed lyrics
- Lyrics are synchronized to the song using TTML/SRT/DistroKid timing when available.
- `LYRICS.md` remains the preserved owner lyric source.
- Timed files are derived presentation assets and must never silently rewrite owner lyrics.
- Data Breach is the reference package because it already has MP3 + SRT + TTML + DistroKid timed lyric data.

### Clickable terms
A technical term becomes interactive only during the cue in which it is sung/spoken.

Visual behavior:
- active lyric line is captioned normally;
- annotated terms receive a restrained highlight/underline/glow;
- tap/click opens a sidecar concept card without losing the current timestamp;
- closing the card returns to the same point in the music film;
- Study Overlay can be toggled off for a clean cinematic watch.

### Two depths of explanation
**Quick definition** — 1-3 sentences. Answers: “What does this term mean here?”

**Full lesson** — a dedicated concept page containing:
1. plain-language definition;
2. why the lyric invokes it;
3. where it sits in the larger system;
4. a visual/diagram where useful;
5. common misconception;
6. defensive, professional, or systems-thinking context;
7. prerequisite concepts;
8. which episode/mission actions apply it;
9. a short knowledge check or safe mini-simulation;
10. what PRIM3 simplified or fictionalized.

A viewer may continue without opening lessons. Learning completion is tracked, not used as a content paywall.

## 3. Concept annotation data contract

Each song receives a concept manifest derived from the current lyric source and timed lyric file.

Recommended per-song package:

```text
source-material/<song-slug>/
  LYRICS.md
  <timed lyrics>.srt/.ttml/.json        # when supplied/derived
  CONCEPTS.yaml                         # annotation manifest

learning/concepts/
  <concept-id>.md                       # reusable full lesson

learning/missions/
  <episode-id>.yaml                     # song concepts -> role labs -> objectives
```

Minimum concept record:

```yaml
id: wireless.evil-twin
term: Evil twin
aliases: [evil twin AP]
domain: wireless-security
cue:
  start_ms: 0
  end_ms: 0
source_song: evil-twin
quick_definition: "..."
lesson: learning/concepts/wireless.evil-twin.md
prerequisites: [wireless.ssid, wireless.access-point]
roles: [Field-R, Field-T]
mission_actions: [identify-rogue-ap, validate-network-identity]
safety: sandbox-defensive
```

Rules:
- IDs are stable even if display wording changes.
- One concept can appear in multiple songs; do not duplicate its full lesson.
- Every lyric cue may link to zero, one, or several concepts.
- Aliases handle lyric shorthand, slang, acronyms, spelling variants, and compound phrases.
- A concept page may be revised for technical accuracy without rewriting the lyric source.

## 4. XCOM-style instructional mission law

The player controls the standard squad omnisciently in XCOM style:
- **Field-T** — technical operator / system interaction;
- **Field-E** — entry, physical space, protection, continuity;
- **Field-R** — reconnaissance, picture, detection, warning.

All three are player-controlled units. The player chooses their order each Player Phase under the existing 2-AP tactical model.

### Every song mission gets three role labs
Each mission must contain at least one meaningful application for each standard role.

**Field-R lab** applies observation, evidence, topology, source evaluation, detection, signal, or threat-picture concepts.

**Field-E lab** applies physical security, safe routing, equipment handling, continuity, boundary enforcement, environmental state, or team-protection concepts.

**Field-T lab** applies system analysis, configuration, validation, classification, recovery, architecture, evidence, or other technical concepts.

The labs do not have to be identical in length. They must be genuinely tied to the song's vocabulary.

### Labs live inside the tactical board
Labs are mission objects, not separate menu quizzes.

New tile/object tag:

`LAB_NODE`

A LAB_NODE may be:
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

Interacting with a LAB_NODE costs AP and opens a short diegetic task. Threat, clocks, positioning, and role protection still matter.

Example player phase:
1. Field-R spends 1 AP scanning a lane and identifies which wireless source is authorized.
2. Field-E spends 1 AP moving to secure the communications room and 1 AP holding the doorway.
3. Field-T reaches the LAB_NODE and completes a configuration/analysis task based on the concept highlighted in the song.
4. Threat phase resolves.
5. Clock phase advances.

The technical task is therefore part of the mission pressure rather than a disconnected multiple-choice screen.

## 5. Knowledge application model

Every episode has **Learning Objectives** in addition to normal operational objectives.

Each learning objective binds:

```text
lyric cue -> concept ID -> lesson -> role -> LAB_NODE/action -> evidence of mastery
```

Example:

```text
"RAID 1 ... mirroring"
  -> storage.raid1
  -> RAID 1 lesson
  -> Field-T
  -> recovery-array LAB_NODE
  -> player chooses a redundancy layout that survives the simulated drive loss
```

### No binary learning fail
PRIM3 already rejects binary mission failure. Learning follows the same philosophy.

A wrong lab decision causes consequences such as:
- lost time;
- lower take integrity;
- higher detection;
- degraded system state;
- extra recovery work;
- reduced learning mastery;
- alternate debrief dialogue.

It does **not** normally produce a giant “wrong answer / mission failed” interruption.

## 6. Operational grade and Learning Mastery are separate

Keep the existing mission grade channels for operational performance.

Add a parallel **Learning Mastery** score so education can be measured without distorting story outcomes.

Suggested mastery composition:
- 25% concept recognition;
- 45% correct application in role labs;
- 20% transfer question / changed scenario;
- 10% evidence explanation in debrief.

Mastery bands:
- 90-100: Applied
- 75-89: Functional
- 60-74: Developing
- below 60: Review recommended

A player can earn an operational A while showing weak concept mastery, or a tactically messy C while demonstrating strong understanding. Both are useful signals.

## 7. Mission briefing UX

Immediately before PLAY begins, show a compact **Concept Loadout**:
- concepts heard in the song;
- which ones the player opened;
- which role will use each one;
- optional “review before deployment” links.

Do not require lesson completion to start the mission unless a separate Guided Curriculum mode explicitly does so.

## 8. Debrief UX

After the mission, the report contains two cards:

**Operational Report**
- mission grade;
- team;
- exposure;
- objective/take;
- integrity/compliance;
- time.

**Learning Report**
- concept mastery;
- concepts successfully applied;
- concepts missed or misapplied;
- role-by-role performance;
- “Replay lyric cue” links that jump back to the exact timestamp where the concept appeared;
- “Open lesson” links for review.

This closes the mnemonic loop: hear it -> see it -> define it -> apply it -> review it in the same musical context.

## 9. Episode authoring requirement

Every episode chapter must explicitly contain:

```text
### Song concept set
### Timed lyric annotations
### Music-film Study Overlay beats
### Field-R lab
### Field-E lab
### Field-T lab
### Learning objectives
### Mastery evidence
### Debrief review cues
```

An episode is not implementation-complete until all of those sections are populated.

## 10. Difficulty progression

Concept tasks progress through four depths:

1. **Recognize** — identify the concept or signal.
2. **Interpret** — explain what it means in this situation.
3. **Apply** — use it to make the mission decision.
4. **Transfer** — solve a changed scenario without being given the lyric wording.

Early seasons emphasize Recognize/Interpret. Later seasons increasingly require Apply/Transfer and cross-song combinations.

## 11. Cross-song concept graph

Concepts are reusable nodes, not isolated vocabulary lists.

Examples:
- `authorization` connects White/Grey/Black Hat -> OSINT -> App Attacks -> final governance decisions;
- `identity/authentication` connects Virus Types -> Data Breach -> Evil Twin -> IoT;
- `network-media` connects Got Wifi -> Ghost In The Wires -> IoT;
- `redundancy/recovery` connects RAID (Hot Site) -> Trappin From The Cloud -> final Site 0 continuity systems;
- `input-validation` connects Patch Work -> App Attacks.

Later missions should deliberately require concepts learned in earlier songs so retention, not just exposure, is measurable.

## 12. Safety and realism

Technical realism is required, but PRIM3 is not an actionable abuse manual.

- Offensive concepts are taught through recognition, architecture, defensive response, controlled simulation, or fictional/sandbox targets.
- Real credentials, real third-party targets, live exploitation instructions, or operational abuse procedures do not belong in curriculum content.
- Labs should teach *why a system behaves this way* and *how to reason about it*.
- When the lyric dramatizes or exaggerates a technique, the lesson must say what is fictionalized or simplified.

## 13. Reference implementation: Data Breach

Data Breach should be the first end-to-end vertical slice because the repo already has the full timing/audio package.

Prototype flow:
1. play the existing MP3;
2. render SRT/TTML captions;
3. annotate concepts such as breach indicators, ransomware, USB/RFID physical risk, password attacks, MFA, supply-chain risk, access logs, abnormal data transfer, hashing/salts;
4. click any active concept to open its card/lesson;
5. enter Mission 07 — Exposure;
6. assign role labs around recognition, containment/physical protection, and evidence/system classification;
7. return Learning Mastery plus exact lyric-cue review links.

The detailed reference mission is now `learning/missions/LVL-07-EXPOSURE-GRANULAR.md`.

Once Data Breach works, the same data contract applies to the other nineteen current owner tracks and the protected Song #21 slot when supplied.

## 14. Definition of done per song

A song package is learning-complete only when:
- owner lyrics are preserved;
- timed lyrics exist or have been authored;
- all technical/operational terms are annotated;
- every annotation links to a quick definition;
- substantial terms link to a full lesson;
- the episode has three role labs;
- mission actions bind back to concept IDs;
- mastery evidence is scoreable;
- debrief links back to lyric timestamps;
- technical accuracy has been reviewed;
- fictionalization/simplification is marked.

That is the canonical PRIM3 teaching loop.