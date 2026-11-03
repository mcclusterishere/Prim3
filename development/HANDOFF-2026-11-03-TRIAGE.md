---
status: DRAFT
system: Triage of the owner's PRIM3 handoff kit of 2026-11-03 (adopt / adapt / drop)
date: 2026-11-03
authority_parent: CANON.md
---

# Handoff kit of 2026-11-03: triage

**Status: DRAFT.** A record of what was taken from the kit, what was changed to fit, and what was left out. It promotes nothing to canon.

The owner's instruction: "Eat the fish, spit out the bones." The kit ("PRIM3 — Episode 02 and World Operations", DRAFT integration kit) audited Prim3 `main` at `160020b` and the McCluster review branch at `4934c3e`. Since then the owner's story decisions landed on this branch (consolidation proposal v1.1.0, `development/DECISIONS.md`) and the attributes matrix gained its own decisions (`claude/attributes-matrix-20261102`, `data/attributes/v1/DECISIONS-2026-11-03.md`). Everything below is judged against that current state, not against `160020b`.

Rules applied throughout: no prototype balance numbers; no second engine, database, backend, globe stack or canon store; no purple; no drawn or approximated logos; real countries and people are never enemies; fiction is labelled; old pre-consolidation names and rules (Royce, the playable E02 trio, the nine-minute cap, "no deaths in E02") are replaced by current canon.

## Verdict by area

| Area | Verdict | One line |
|---|---|---|
| Story: Episode 02 bible and decision data | **ADAPT** | Strong scene, choice and consequence detail, written for the pre-consolidation trio; moved onto Aya's solo under the cover shoot as a DRAFT. |
| Story: audit (continuity conflicts) | **ADAPT** | Twelve conflicts checked against this branch: six fixed already, eight still open and now listed in the proposal §8.1. |
| Story: episode index, character arcs, cast-globe, validation | **DROP** (regenerate later) | Derived snapshots of `160020b` (35 "Royce" mentions in the index alone, trio availability); regenerate from current canon instead of patching. |
| Engine: authority overlay and its tools | **DROP** | Pinned to the release hash the matrix no longer has; the matrix's own §1 relabel already does the job. |
| Engine: engine profiles | **ADOPT as reference** | Pinned observations (Transit T 6 HP, sidearm + cyberdeck, no `weaponRange`) kept as reference, never defaults. |
| Engine: extension fields, mission inventory | **ADAPT as notes** | The origin / deployment / mentioned-place / selected-country distinction is kept as a rule; no fields added until a record uses one. |
| Baseline (release catalog, schema, validation) | **ADOPT** | The release's own schema and 45/45 validation report were missing from both deliveries; kept as-supplied. |
| News: dispatch compiler, schema, adapter, tests | **ADAPT (one rule) / DROP (code)** | The existing mission-drafts path stays the only one; its validator gained the kit's "a headline is never evidence of a cause" rule. |
| App: offline globe, Cesium adapter, decision study, portable HTML | **DROP** | A second globe stack with an ion-token path and a second state reducer; the World already has a globe and the game has a resolver. |
| Research | **ADOPT as notes** | Two files are copies of control-repo docs (drop the copies); the source notes (GDELT geolocation error, ReliefWeb, USGS) are kept below. |

## Story

| Kit file | Verdict | Where it landed / why |
|---|---|---|
| `story/EPISODE-02-BIBLE.md` | **ADAPT** | `story/episodes/S1E2-PERMISSION-SLIP-SOLO-PLAY-DRAFT.md` (DRAFT). Kept: the sixteen scenes' staging and dialogue specimens, authorization vs knowledge as two axes, the evidence fixtures, the four routes and their entry conditions, outcome precedence, mandatory VERIFY, learning beats A–F, relationship payloads. Changed: PLAY is Aya's solo with Nusrat on comms and Miguel at the exterior (proposal §2.4); the mission opens mid shoot under concealment and the call is the go signal (§3.1, §3.5); Royce → Benjamin "Benji" Chase; Season 1 deaths allowed but never from a failure roll (§3.7); runtime band 20–35; no clock numbers. |
| `story/episode-02.json` | **ADAPT** | `story/episodes/S1E2-PERMISSION-SLIP-DECISIONS.draft.json` (generated from the kit file, then rewritten): 16 scenes with cover phases, 16 PLAY choices (all Aya; two new cover choices C01 break and C02 re-cover), 4 WATCH beats (Nusrat D01–D03, McCluster D18), 23 facts, 7 zones, 4 routes, 6 outcomes plus a separate cover-aftermath axis, 10 knowledge locks (solo and cover locks added; device lock marked OPEN). `royceIncursion` → `benjiIncursion`; `person.royce` kept as the stable ID. Referential checks pass (every required fact exists, every choice points at a scene). |
| `story/STORY-AUDIT.md` | **ADAPT** | Its twelve conflicts were checked on this branch. Fixed already: runtime, Layla's country, Memory 01's roster, McCluster's early relationship, the role mismatch, the "Benji is McCluster" line. Still open: proposal §8.1 A1–A8 (device identifier vs ordinary error, Harborline's country, who receives the call, Aya's location in Scenes 1–3, the trio level doc, the "locked" 48-person pool, proposed biographies under canon names, unpicked casualty slots). Its whole-story table is stale (Royce; "Benji is McCluster's earlier identity") and is not copied. |
| `story/EPISODE-INDEX.json`, `CHARACTER-ARCS.json`, `cast-globe.json`, `VALIDATION.json` | **DROP** | Snapshots of `160020b`: Royce throughout, E02 availability for the old trio, 102 identities including legacy and historical people. Regenerate from current canon when the globe needs it (follow-up below). The principle survives: origin is not deployment, unknown stays null. |
| `story/ADOPT-ADAPT-DROP.json` | **Used, not kept** | Its adopt/adapt/drop list is folded into this document. Its OPEN items (Harborline's country; audio timing; casualty classes; E06, RAID, E18) are in proposal §8.1 or §8 question 13. |

## Engine and matrix

Landed on `claude/attributes-matrix-20261102`, commit `7f23865` (`data/attributes/v1/DECISIONS-2026-11-03.md` §4, §5, §7, §8).

| Kit file | Verdict | Where it landed / why |
|---|---|---|
| `engine/authority-overlay.json` (+ schema, build, validate, tests, migration report, overlay validation) | **DROP** | Pinned to the release catalog hash `7331ba19…`; the matrix's catalog changed with the 2026-11-03 decisions. The matrix already relabels the same 169 Black Signal records `reference` (§1), and AUDIT §8's adapter refuses reference values. The overlay's one rule worth having (a missing engine binding never falls back to a prototype value) is already that adapter rule. |
| `engine/engine-profiles.json` | **ADOPT (reference)** | `data/attributes/v1/reference/engine-profiles.handoff-2026-11-03.json`. Observations at pinned revisions only. The grid scale has since changed (3.54 m per tile) and the review level is being reworked, so they age; the resolver and the level stay the authority. |
| `engine/extension-fields.json`, `extension-record.schema.json` | **ADAPT (as a rule)** | Not added to the field dictionary (no record uses them). The distinction they encode — identity origin vs current deployment vs news-mentioned place vs globe selection — is the rule for any World globe card (matrix DECISIONS §8; follow-up below). |
| `engine/mission-inventory.json` | **DROP** | Pre-consolidation: no solo LVL-01–03. The matrix's AUDIT §9 regeneration pass maps missions to the 21 episodes and the approved solos. |
| `engine/ENGINE-AUTHORITY.md` | **ADOPT (facts already held)** | Its corrections (prototype T 10 HP is not ours; Transit T is 6 HP; production deployment unverified) match the matrix AUDIT. Nothing new to copy. |
| `engine/evidence/*` | **DROP** | Copies of files that exist in their own repos. |
| `baseline/catalog.schema.json`, `baseline/validation.json` | **ADOPT** | `data/attributes/v1/source/release/` as-supplied (the release README listed them; neither delivery had them). `baseline/catalog.json` is byte-identical to the release (hash `7331ba19…`) and is already reproducible with `build_from_release.py`, so it is not copied again. |

Also on that commit, from today's owner answers (not from the kit): the equipment sizes table and the T fifth-module rule are owner-approved ("I accept your proposals"); the grid is 1 tile = 3.54 m ("instead of 1.6, make it like 3.54"), kit sizes unchanged; `person.royce` displays as Benjamin "Benji" Chase (US); Layla Mansour's country is Jordan. `validate_registry.py`: valid, and every negative self-test is rejected.

## News

| Kit file | Verdict | Where it landed / why |
|---|---|---|
| `news/dispatch-compiler.js`, `dispatch.schema.json`, tests, fixtures | **DROP (code) / ADAPT (one rule)** | The McCluster repo already has the news-to-mission path (`workers/mccluster/src/prim3/mission-drafts.js`, Core `prim3-mission/1` validator, `docs/prim3/NEWS-TO-MISSION.md`). A second compiler and envelope would be a second path. Taken: "a headline, source country or geotag is never proof of a perpetrator, motive or false flag" → McCluster branch `claude/prim3-mission-attribution-20261103`, commit `7cbde000` (validator rejects "false flag" and "what really happened" phrasings; task and doc state the rule; core 398/398, worker 7/7). |
| `news/world-news-adapter.js` | **DROP** | Re-wraps the existing `/v1/world/news` route. Its semantics are already documented in the McCluster repo (`lon`, ISO2 `country`, mentioned place, `native_only` state). |
| `news/NEWS-TO-MISSION.md` | **ADAPT (ideas, follow-up)** | Useful ideas not yet in the McCluster path, recorded as follow-ups: freeze a launched dispatch's source snapshot, seed and template version so a reload keeps its truth; do not use a retracted source; corroboration by independent source groups, not syndicated copies. |

## App

| Kit file | Verdict | Why |
|---|---|---|
| `app/globe.js`, `world.js`, `assets/*geojson`, `build-world.py` | **DROP** | A second, standalone canvas globe. The World (`prim3-world.html`, `js/prim3-world/*` on McCluster `claude/whole-platform-20261102`) already has one. |
| `app/cesium-adapter.js` | **DROP** | A second Cesium loader with a Cesium ion token path. Any Cesium use goes through the platform's existing adapter and approved configuration; no token in client code. |
| `app/decision-study.js`, `decision-tests.cjs` | **DROP (code) / ADOPT (invariants)** | A second state reducer. Its invariants (no clean win without VERIFY; clock pressure never unlocks an emergency; an unauthorized success keeps its breach; a skipped observation does not erase a danger) are in the E02 draft's routes, outcomes and locks. |
| `app/index.html`, `app.js`, `data.js`, `cast.json`, `styles.css`, `host-integration.*`, `PRIM3-Campaign-Globe.html`, `build_campaign.py` | **DROP** | A standalone menu around the dropped globe; its cast data is the pre-consolidation snapshot. No purple was found in it; phone rules it follows (44 px taps, 16 px inputs, zoom enabled, no overflow at 390 px) are already McCluster law. |

## Research

| Kit file | Verdict | Why |
|---|---|---|
| `research/WORLD-DATA-AND-NATIVE-NEWS.md`, `WORLD-NEWS-GLOBE-EVENT-FEED.md` | **DROP (copies)** | Copies of McCluster docs (`docs/control-plane/WORLD-DATA-AND-NATIVE-NEWS.md`, `docs/action-network/WORLD-NEWS-GLOBE-EVENT-FEED.md`); the originals stay the source. |
| Source notes in `news/NEWS-TO-MISSION.md` §7 | **ADOPT as notes** | GDELT's DOC/GEO location is a place the article mentions and its documentation describes geolocation error, so it is never an incident site or a cause. ReliefWeb's API needs a pre-approved `appname` (possible future provider, not connected). USGS GeoJSON carries origin time, update time and status (a model for revision-aware sources). Branching narrative is tested as plain data; no new narrative runtime. |

## Follow-ups (not done here)

1. **Owner decisions** listed in proposal §8.1 (device identifier vs ordinary error; Harborline's country; casualty picks).
2. **`game/LVL-02-PERMISSION-SLIP.md` solo revision** (draft notes in the E02 draft §8).
3. **World card for Episode 2** on McCluster `claude/whole-platform-20261102` (`data/prim3/world-missions.json`): an authored story card for "Permission Slip" (Aya, T, solo; Harborline unplaced until A2 is decided). Not done here because the World files are being changed on another branch now.
4. **Dispatch freezing**: when a news-inspired draft is launched, store its source snapshot, seed and template version so a reload keeps its truth.
5. **Regenerate** the episode index, character arcs and globe cast from current canon when the globe needs them.
6. **Matrix regeneration pass** (AUDIT §9), including the remaining "McCluster/Benji" alias text.
7. **Grid renderer**: `TILE_M = 3.54` in `js/prim3-tactics/` belongs to the McCluster grid work already in progress.
