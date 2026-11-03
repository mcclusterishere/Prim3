---
status: PROPOSED
system: Workplace simulation persistence and knowledge-state contract ("the building needs memory")
version: 0.1.0
authority_parent: CANON.md §2, §4, §8, §13, §22; story/EQUITY-UPRISE-WORKPLACE-CANON.md; story/CAST-LIFECYCLE-ATTRITION-PROMOTION-AUTHORITY.md
source: Prim3 Issue #19 (P0 "Living continuity", P0 "Separate knowledge from physical access")
implementers: mccluster building authority (geometry, viewers, tactical adapter); PRIM3 episode compilers; WATCH/PLAY runtimes
---

# World Memory Contract — PROPOSAL

> **If you die, the building changes.** (`CANON.md` §4)

This contract says what any implementation of the Equity Uprise workplace simulation must **remember** between scenes, episodes, seasons and saves, and what it must **never know too early**. It is written for builders: the mccluster building authority (which owns geometry and workstations and is read-only from this repo), the episode staging compiler Issue #19 asks for, and the WATCH/PLAY runtimes. It names fields, not file formats. Where a field already exists in the mccluster side (`workplace-occupancy-v1.json`, the Core V2 floor programs), this contract references it rather than redefining it.

Two ideas, kept separate on purpose:

1. **World state** — where things and people are, and what has happened to them. Persistent, forward-only, visible.
2. **Knowledge state** — what each character, and separately the audience, *knows* at a given episode index. Tracked per character per episode. Never inferred from position.

A character can stand on Floor 6 in S1E1 and know nothing F6 teaches in S7. A character can be dead for fifteen episodes and know more than anyone in the building (`story/arcs/MIGUEL-SANTOS-DIES-TWICE.md`). The simulation must be able to render both without leaking.

---

## 1. Existing pattern this builds on

The isolation discipline already exists on the mccluster side; this contract extends it to story memory rather than inventing a new one:

- **Interaction modes are gated per floor program.** Floor 1's *Emergency Exercise* mode in `core-v2-floor-programs.json` is accessible only to authorised participants or an instructor, and is played through the PRIM3 tactical adapter as a drill against the canonical building data (`docs/prim3/EQUITY-UPRISE-BUILDING-IN-PRIM3.md`). The building is one; the *mode* decides what the viewer is allowed to do and see in it.
- **MISSION and TRAINING environments are isolated by construction.** The lab-recipe compiler exposes only named, reviewed primitives (`CREATE_ISOLATED_ENVIRONMENT`, `CLONE_APPROVED_TEMPLATE`, `RESTORE_SNAPSHOT`, …) and no freeform command, so nothing in a mission can reach outside its sanctioned state.
- **Issue #19** names the third mode: an authorised, gated **WORKPLACE** viewer, separate from MISSION/TRAINING, sharing immutable scenario/character/prop IDs with WATCH and PLAY.

The rule this contract takes from that pattern: **a mode is a view over one world state with its own permission set.** WORKPLACE, MISSION and TRAINING read the same building, the same cast IDs and the same persisted objects. What differs is the authorised action set and the knowledge-state ceiling (§3.4). No mode may write world state that another mode cannot later read; no mode may read knowledge above its episode index.

---

## 2. World state — what must persist

All world state is **forward-only**: an episode may add to it or change it; nothing resets it to a default because a new episode began. A save, a replay from the same seed, a WATCH export and a PLAY session at the same `(episodeId, sourceRevision)` must agree on the pre-state (`preStateHash`) and produce a recorded `postStateDiff`.

### 2.1 Objects

Every object with story meaning has a stable `objectId`, an owner (character or floor), an anchor (a named workstation or room from `workplace-occupancy-v1.json` / the floor programs), a `firstSeen` episode index and a `state` string. Objects are never silently removed; they move, change state or are archived with an episode index.

Minimum object classes:

| Class | Examples already implied by canon or proposals | Persistence rule |
|---|---|---|
| **Personal effects** | photographs, jokes pinned to monitors, notes, a desk stamp (Nusrat), bench tools sorted badly (Minh) | accumulate; never cleared while the person holds the desk |
| **Work artefacts** | case folders, a tagged gateway on a bench, a half-finished timeline pinned to a lead desk, an unsigned letter in an office, a notebook | visible in every scene at their anchor until an episode moves them |
| **Equipment** | issued devices, road kits, laminated access cards, radios | ownership transfers are episode events; a dead person's equipment is inherited or stays |
| **Vacancy markers** | an unassigned call sign, a greyed roster card, an empty chair, a kit someone else keeps packing | created by loss; persist until an episode fills them, and filling is itself a recorded event |
| **Evidence** | bagged hardware, logs, approval slips | chain of custody is a list of `(episodeIndex, holder, anchor)` |

### 2.2 Seating and workstations

- Each character has one `homeAnchor` (the named workstation in the roster) and may have `secondaryAnchors` (Arjun and Emre on L7).
- `homeAnchor` changes only on a recorded **seating event**: promotion, transfer, demotion, injury accommodation, death, departure, or an owner-approved reshuffle. Seating events carry an episode index and a reason.
- When a seating event vacates an anchor, the anchor enters `VACANT` with a `vacatedBy` and `vacatedAt`. It stays `VACANT` until a later seating event fills it. The simulation may show the vacancy (empty chair, dark monitor, a neighbour's overflow) and must not auto-populate it with a background archetype (`EQUITY-UPRISE-WORKPLACE-CANON.md`: do not use anonymous mannequins where a recurring role exists; `CANON.md` §4: death does not create a replacement).
- A promotion that moves someone up a floor changes their `homeAnchor` and leaves their old anchor `VACANT` the same way a death does. The building should look different after a promotion.

### 2.3 Vacancy and loss

When a character dies, departs or is removed (`CAST-LIFECYCLE-ATTRITION-PROMOTION-AUTHORITY.md` §7–§11), the following must be written and persisted, not merely narrated:

- `homeAnchor` → `VACANT`;
- their open work artefacts → reassigned, orphaned (visible, unowned) or archived, each a recorded event;
- their equipment → inherited by a named person or left at the anchor;
- their schedule slots (§2.4) → covered by named people (doubles, cross-training) or left uncovered with a visible gap;
- relationship edges (§2.5) → frozen at last value with a `grief` overlay for named others, which decays only by episode events, never by time alone.

Test case: Miguel Santos after S1E2. Access desk `VACANT` from global 02 to the arc's return; Nusrat's schedule gains his shifts; his call sign is `UNASSIGNED` as an object; his badge is an object in Nusrat's drawer; a kit packed "like Miguel" exists on L7 in S6E1. All of that is world state and is true in every mode, including a mode whose viewer does not know the arc.

### 2.4 Schedules and routines

- Each character has a weekly `routine`: shifts, recurring tables, recurring elevator pairings, the briefing one person is always late to, maintenance complaints, the ride share. These are the mandatory texture of `CAST-LIFECYCLE-ATTRITION-PROMOTION-AUTHORITY.md` §4 and they are **data**, so that a five-second ritual in Episode 03 can be rendered identically in Episode 15 and then broken.
- Routines change only by recorded events (loss, promotion, injury, a relationship change, a new habit written in an episode's development ledger).
- After-hours states are part of the routine: which floors are lit, who is in the building at 3 a.m. (Aya at her bench in S6E2), what Pylon does when nobody is watching.

### 2.5 Relationships

- The qualitative ledger in `story/CHARACTER-RELATIONSHIP-STATE.md` (very low → very high; trust, dependence, affection, resentment) is the source. The simulation holds the **current** value per edge plus a history of `(episodeIndex, delta, cause)`.
- Edges change only through recorded episode events (the development write every appearing character must receive, `CANON.md` §2). Background simulation may *express* an edge (who sits with whom, who borrows from whom) but may not *move* it.

### 2.6 Institutional state

- Open cases, tickets and their reopen counts (`AGENCY-CASE-SPINE.md`); contracts and their signatures; policies in force (Li Wei's decision rule after S5E2); which floor's access lists include whom.
- Role-based access is in-world and persists; editorial spotlight (`SEASON-REVEAL-MAP.md` §4.1) is **not** stored as access. There is no field for "floor revealed".

### 2.7 Building systems

- Pylon's behaviours, overrides and anomalies are world state with episode indices, so that House of Eyes (S4E3) can show a contradiction that was first logged in S2E3 as interference.
- Physical damage, repairs, replaced hardware and the firmware train in service are persisted so that B1 looks like a floor that has been maintained for seven years.

---

## 3. Knowledge state — who knows what, and when

### 3.1 Facts

A **fact** is any story truth that some characters know before others, or that the audience learns at a specific point. Each fact has:

```text
factId            stable id
summary           writer-facing one line (never rendered)
revealIndex       the global episode index (01–21) at which the AUDIENCE may learn it
revealMode        SHOWN | IMPLIED | REINTERPRETED   (how the audience learns it)
authority         the canon/proposal file that owns it
```

Examples (indices from current canon and the DRAFT arc; the arc's are provisional):

| factId | revealIndex | authority |
|---|---:|---|
| `b1.is_staffed_workplace` | 01 (never hidden) | `EQUITY-UPRISE-WORKPLACE-CANON.md` |
| `prim.succession_index_meaning` | per `CANON.md` §7, reveal-gated | `CANON.md` |
| `hana.nis_role` | reveal-gated, not before canon allows | `AYA-HANA-INTELLIGENCE-CANON.md` |
| `benji.is_clone` | 20 (Evil Twin) | `BENJI-CHASE-JANUS-ORIGIN-CANON.md` |
| `miguel.alive_after_s1e2` | 17 (Aya's rescue) / 18 (shown) | arc DRAFT |
| `case0417.single_supplier_conflict` | 12 (House of Eyes) | `AGENCY-CASE-SPINE.md` PROPOSED |

### 3.2 Per-character knowledge

For every recurring character and every fact, a state **per episode index**:

```text
UNAWARE        does not know; would not recognise the fact if shown
SUSPECTS       has noticed something; could not state the fact
KNOWS          could state the fact
KNOWS_HIDES    knows and is actively concealing it from named others
BELIEVES_FALSE holds a specific false version (e.g. "Miguel is dead")
```

Transitions happen only at episode events and are recorded as `(characterId, factId, episodeIndex, from, to, cause)`. A character's state may be *ahead* of the audience (Miguel in S1E3 knows `miguel.alive_after_s1e2`; PRIM2 knows most things) and the simulation must hold that without rendering it.

### 3.3 Audience knowledge

The audience is a separate knowledge holder, `AUDIENCE`, with the same state vocabulary. Its state for a fact becomes `KNOWS` at `revealIndex` and not before. `SUSPECTS` is allowed earlier only where the owning authority lists a planted beat (the Miguel arc §4 table is exactly such a list: every row is an `AUDIENCE: UNAWARE → SUSPECTS` event with a stated cover reading).

### 3.4 The no-leak rule

Any renderer, compiler, viewer, ambient behaviour, dialogue line, prop label, log entry, UI string, achievement, save-file name or debug overlay operating at episode index **k** may only express facts whose `revealIndex ≤ k`, or whose owning authority lists a planted beat at index ≤ k. This is checked, not trusted:

- **Dialogue and audio:** every authored line is tagged with the facts it expresses; the compiler refuses a line whose fact index exceeds the episode index.
- **Objects:** an object's visible label and state may not encode a future fact (a bench tag may say "build matches building sensors" only from global 08; a drawer may contain Miguel's badge from 03, because the badge's presence expresses only `miguel.certified_dead`, which the audience knows).
- **Ambient behaviour:** a character in `KNOWS_HIDES` behaves as the cover reading until the reveal; the simulation picks animations and schedules from the cover state, not the true state. Nusrat packs the kit because she grieves, and the renderer knows nothing else.
- **Modes:** WORKPLACE, MISSION and TRAINING each run with an explicit `episodeIndexCeiling`. A free-roam WORKPLACE viewer defaults to the lowest index the viewer has reached in WATCH/PLAY, never to 21.
- **Saves and replays:** a save stores `episodeIndexCeiling`; a same-seed replay at a lower ceiling must not leak objects or lines introduced at a higher one.
- **Site 0, PRIM numbering, McCluster's pre-college life, PRIM2's body:** never expressed at HQ before their indices. B1, by contrast, has no index: it is never a leak.

### 3.5 Position is not knowledge

Being in a room grants nothing. The simulation must not derive a knowledge transition from co-location, line of sight, or proximity to an object. Only an authored episode event moves knowledge. (A PLAY session may create *player* knowledge; it may not create *character* knowledge outside the authored transition set, because players vary and the spine does not.)

---

## 4. Event record (aligns with Issue #19's proposed event data)

One record per authored scene or mission, produced by the staging compiler and consumed by every mode:

```text
episodeId              S01E01 … S07E03 (global index derived)
sourceRevision         git revision of the canonical script the scene was compiled from
seasonSpotlightFloor   F1 | F2 | F3 | F4 | F5 | L7 | F6   (editorial; never an access value)
castPresence           [characterId, presenceClass A|B|C|D, anchor]  (classes per EPISODE-MISSION-BIBLE §2)
workspaceAnchor        named anchors used, from workplace-occupancy-v1.json
physicalAccess         in-world access decisions actually exercised (role, door, override)
audienceKnowledge      facts whose AUDIENCE state changes in this scene, with revealMode
characterKnowledge     per-character transitions (§3.2)
actorActions           blocking, prop handoffs, routine beats performed
dialogueAudioId        authored lines, each tagged with expressed factIds
timelineTicks          timecoded beats
cameraShots            shot manifest (WATCH)
preStateHash           hash of world state the scene expects
postStateDiff          world-state changes written forward (§2): objects, seating, vacancies, routines, edges, institutional state
playStateConstraints   what PLAY may vary without breaking the spine (CANON §1: grade, injury, exposure, resources, relationship state, staffing, debrief detail)
deliveryStatus         concept | staged | reviewed | approved
```

A scene is not **staged** until its `postStateDiff` is applied and the next scene's `preStateHash` matches. A season is not **continuous** until every vacancy, seating event and routine change in its episodes' diffs is visible in the WORKPLACE mode at that season's ceiling.

---

## 5. Acceptance tests (what "the building has memory" means in practice)

1. **Vacancy test.** Run WORKPLACE at ceiling 03. The F1 access desk is `VACANT`, Nusrat's routine includes Miguel's shifts, and no background archetype occupies the desk. Run at ceiling 01: Miguel is at the desk.
2. **Promotion test.** Apply a seating event that moves a Cohort-03 lead to F3. At the next ceiling the F2 lead desk is `VACANT` and the person's effects have moved; the elevator pairing that used to include them is broken.
3. **Object test.** The tagged gateway is on the B1 bench at every ceiling from 08 through 11 and is on F4 at 12. Its label at 08–11 does not mention the supplier conflict.
4. **Leak test.** Enumerate every rendered string, label, log and animation choice at ceiling k; assert no expressed `factId` has `revealIndex > k` and no unplanted `SUSPECTS` beat.
5. **Replay test.** Same seed, same `(episodeId, sourceRevision)`, same ceiling: identical `preStateHash`, identical `postStateDiff`.
6. **Mode agreement test.** WORKPLACE, MISSION and TRAINING at the same ceiling render the same seating, the same vacancies, the same objects at the same anchors.
7. **Spotlight test.** Change `seasonSpotlightFloor` for an episode; nothing about access, seating or knowledge changes. If anything does, the implementation has stored editorial as world state.

---

## 6. Boundaries

- This contract does not define geometry, navigation, rigs or performance budgets; those are the mccluster building authority's and Issue #19's P0/P1 items.
- It does not add facts, deaths, reveals or indices. Every `revealIndex` is read from the owning canon or proposal file; where that file is DRAFT or PROPOSED, so is the index.
- It does not store what PRIM2 knows about Site 0 in any HQ-side state. PRIM2's knowledge is authored at Site 0's authority and only his *interfaces* at F6 are HQ objects (`CANON.md` §17; `world/equity-uprise-workplace-roster.v1.json`: `physical_body_here: false`).

> **The building remembers everything. It tells you only what this year allows.**
