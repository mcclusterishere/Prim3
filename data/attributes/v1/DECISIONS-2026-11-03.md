---
status: §1-§3 OWNER-APPROVED (2026-11-03; §2-§3 delegated by the owner); §4-§5 PROPOSED
system: PRIM3 attributes matrix v1 — owner decisions of 2026-11-03 and the values they put in the matrix
date: 2026-11-03
answers: AUDIT.md §7 owner questions 1, 2, 3 and 5 (issues 5, 8-12, 15, 16, 17)
applied_by: tools/apply_decisions.py (catalog.json and every derived file; idempotent)
engine: game/runtime/tactical-resolver.mjs, per-unit `syncPulsePerMission` (tests in game/runtime/tactical-t-control-rules.test.mjs)
---

# Attributes matrix: decisions of 2026-11-03

The owner's words (2026-11-03), answering `AUDIT.md` §7:

> "No, don't take the Black Signal prototype numbers. I was just giving you the fish. You're supposed to
> spit out the bones... I want you to make up an answer for the matrix in number two, country badges.
> On screen only, I guess, whatever your recommendation is, and for equipment, real world sizes, you
> should propose something."

How each answer is labelled here:

| § | Topic | Label | Why |
| --- | --- | --- | --- |
| 1 | Black Signal numbers | **OWNER-APPROVED** | The owner decided it directly. |
| 2 | Extra Sync Pulses (level-2 upgrade) | **OWNER-APPROVED (delegated)** | "make up an answer for the matrix in number two": the owner delegated the numbers; this file sets them. |
| 3 | Country badges | **OWNER-APPROVED (delegated)** | "On screen only, I guess, whatever your recommendation is." |
| 4 | Equipment real-world sizes | **PROPOSED** | "you should propose something": a proposal until the owner accepts the numbers. |
| 5 | T's fifth module | **PROPOSED** | Not asked directly; part of AUDIT question 5. |

In the matrix, §1-§3 values carry `origin: canon` with this file as their source; §4-§5 values carry
`origin: proposed`. Every changed value cites source `src.d3c1520261103a` (this file).

## 1. Black Signal prototype numbers: not adopted

The matrix's unit numbers from ChatGPT's Black Signal prototype runtime (E 12 HP, T 10 HP with a rifle,
ranges 14-23 on a 128-cell grid, and everything else from `src/engine.js` / `src/world.js` at `ef665bc`)
are **not canon and not targets**. The game's stats stay the canonical resolver's and the levels'
(Transit / Relay today).

In the matrix they are **relabelled, not deleted**:

- The 169 entities with provenance `Black Signal prototype runtime` change `status: runtime` to
  **`status: reference`** and gain the tag `black-signal-reference`. Their `implementation` stays
  `runtime`, which in this matrix only ever meant "runs in the Black Signal prototype".
- Their 1,677 attributes with `origin: runtime`, and the 36 prototype facts on the 18 equipment-asset
  records (`asset.rigged`, `asset.attached_to_mission_operators`), change to **`origin: reference`**,
  each with the note "Black Signal prototype value; reference only, not adopted".
- `provenance` in `entities.json` / `attributes.json` is unchanged, so the prototype origin stays visible.
- The game adapter (AUDIT §8) refuses `reference` values by default, so none of them can reach a level.

## 2. Level-2 Sync Pulse upgrade: Overclock

Matrix record: `upgrade.t.overclock` (category Systems, kind `upgrade`).

| Attribute | Value |
| --- | --- |
| Name | **Overclock** |
| Role | T |
| When | Offered at the **level-2 promotion**; optional (the player may decline it) |
| Cost | **1 upgrade point** at the level-2 promotion (how many points a promotion grants is not set here) |
| Effect | **+1 Sync Pulse per mission: 2 in all** (level 1 and level 2 without the upgrade: 1) |
| Each pulse | Unchanged: **1 AP**, thrown to a tile **≤ 5** in line of sight, **radius 3** on that floor |
| Own machines | Each pulse **still jams the squad's own machines** in its area (owner, 2026-11-02) |
| Main arm | **Compatible.** The level-2 main arm comes with the promotion; Overclock is bought on top. As with every T control action at level 2, a pulse needs the sidearm up (`MAIN_ARM_READY` otherwise). |
| Engine | The adapter writes `syncPulsePerMission: 2` on that unit. Units without it use the mission rule (`config.syncPulsePerMission`, default 1). `techActionPreview(…'SYNC_PULSE'…)` reports `pulsesLeft`; the third pulse fails `PULSE_SPENT`. |

The name is plain on purpose: it says what it does (the slate runs harder) and draws no mark.

## 3. Country badges: on-screen UI only

- A country badge appears **only on screen**: the **HUD unit chip**, the **roster card**, and the **World
  globe card**.
- It is **never on a 3D model, texture, decal or patch.** FO-01 (no external flags or unit patches) and the
  no-marks rule for models (no M, no Dual Sight, no red `//` on 3D kit) stand unchanged.
- Form: a **small chip with a flag swatch or the ISO 3166-1 alpha-2 code**. No national emblem, coat of
  arms, seal or logo is drawn.
- **No stat comes from nationality** (`country.grants_combat_modifier: false` and
  `presentation.countryChangesCombatStats: false` are kept).

In the matrix: `presentation.black-mannequin` gains `presentation.countryBadgeSurfaces`,
`presentation.countryBadgeOnModel: false` and `presentation.countryBadgeForm`, and its identity cue reads
"country badge (on-screen UI only)". All 72 countries gain `country.badge_surfaces` and
`country.badge_on_model: false`. `country.badge_asset_id` stays `unknown` on purpose: the chip is a UI
component built from the code, not an asset. Issues `identity.canon.country-patches` and
`equipment.field-country-badges` are marked decided.

## 4. Equipment real-world sizes (PROPOSED)

### Rules

1. **Kit is sized in real metres and kilograms.** The table is the size authority for kit until the owner
   changes it. Classes are generic real-world classes; no brand or model is implied, and no operating
   internals are specified.
2. **L x W x H are the three bounding extents, longest first**, as carried or worn at rest (weapons: muzzle
   to stock, stock extended; straps laid flat; decks closed).
3. **GLBs are normalized to these sizes**: one uniform scale per model so its longest bounding extent equals
   L. Never stretch non-uniformly. If the other two extents then differ from W and H by more than 15%,
   the mesh is flagged for rework, not squashed. Articulated models (a deck with its lid open, binoculars on
   their hinge) are measured in the closed or neutral pose. Worn armour and clothing are **fitted to the
   rig** and checked against the table, not scaled to it.
4. **Kit attached to an operator inherits the operator's scale.** The operator is normalized to a real
   height (proposed adult reference 1.75 m), so kit never needs its own correction.
5. **Grid and rendering scale.** The task brief proposed "1 game grid tile = 1 m". The McCluster renderer
   already documents a different assumption, so this file **records the documented one and does not
   override it**: `js/prim3-tactics/level3d.mjs` maps tiles to world units with `M = metres / TILE_M`,
   and `js/prim3-tactics/levels/transit-relay.mjs` sets `TILE_M = 1.6` ("one tile ≈ 1.6 m"), with
   heights in metres as the resolver expects. A level owns its `TILE_M`; real-size kit is converted with
   the same `M()`. Two inconsistencies to settle at the asset pass: the level renderer builds mannequins
   "in metres x1.18" then scales by 0.55, and the older courtyard view (`board3d.mjs`) stands any
   authored model at 2.15 world units with 1 tile = 1 unit. **Owner question:** keep 1.6 m per tile, or
   move levels to 1 m per tile? Nothing in this file depends on the answer; only `TILE_M` changes.
6. Sizes are presentation and production data. **No rule reads them** (inventory cells and encumbrance
   are not decided).

### Table

Matrix records gain `item.size_m` `{L, W, H}` and `item.mass` (kg) on equipment and weapon records, or
`asset.target_size_m` on the 3D-asset records (`field-equipment-v01`). `item.mass` changes its unit from
"game mass unit" to **kg** (it had no defined value before). Level-1 draft IDs (E01-T06,
`phenotypes/operators/equipment/level1-drafts` on `claude/level1-equipment-drafts-20261102`) are listed
for the asset pass; they are not matrix records yet.

| Item | Class | L x W x H (m) | Mass (kg) | Matrix records | Level-1 drafts |
| --- | --- | --- | ---: | --- | --- |
| Compact carbine (entry) | short-barrel carbine, stock extended (0.62 m collapsed) | 0.7 x 0.24 x 0.07 | 3 | `equipment.primary_e`, `asset.equipment.e-compact-carbine` | E01 |
| Technical carbine (T level-2 main arm) | carbine, stock extended | 0.76 x 0.23 x 0.07 | 3.1 | none yet | T01 |
| Precision carbine | carbine with magnified optic | 0.84 x 0.25 x 0.07 | 3.8 | none yet | R01 |
| Overwatch / designated marksman rifle | marksman rifle with optic, no bipod | 1 x 0.27 x 0.08 | 4.8 | `equipment.primary_r_optic`, `asset.equipment.r-overwatch-rifle` | - |
| Service sidearm | compact service pistol, loaded | 0.19 x 0.135 x 0.035 | 0.85 | `equipment.pistol_service_compact`, `asset.equipment.service-sidearm` | R02 |
| Compact backup pistol | subcompact pistol, loaded | 0.165 x 0.115 x 0.03 | 0.7 | none yet | E02, T02 |
| Retention holster | belt holster for the service sidearm | 0.24 x 0.09 x 0.06 | 0.35 | `equipment.holster_retention`, `asset.equipment.retention-holster` | - |
| Soft-mid plate carrier (front panel) | carrier with soft panels; fit to rig | 0.32 x 0.28 x 0.04 | 3.6 | `equipment.carrier_e` | - |
| Reinforced entry armor | carrier with thin hard plates; fit to rig | 0.33 x 0.28 x 0.06 | 7.2 | none yet | E05 |
| Thin front/back plates (pair) | two thin hard plates | 0.3 x 0.24 x 0.022 | 2.8 | `equipment.thin_hard_plates` | - |
| Light soft armor (no plate) | soft torso vest; fit to rig | 0.32 x 0.27 x 0.025 | 2.2 | `equipment.armor_r_light` | R05 |
| Thin soft / insulated technical armor | thin soft torso vest; fit to rig | 0.32 x 0.27 x 0.025 | 2.3 | `equipment.armor_soft_torso_thin` | T05 |
| Field helmet (generic; no record yet) | high-cut protective helmet | 0.27 x 0.22 x 0.18 | 1.4 | none yet | - |
| Team radio | handheld radio with stub antenna | 0.22 x 0.065 x 0.04 | 0.4 | `equipment.team_radio`, `asset.equipment.team-radio` | - |
| Radio in-ear piece | in-ear earpiece | 0.03 x 0.02 x 0.02 | 0.01 | `equipment.radio_inear` | - |
| Comms headset | over-ear electronic hearing protection | 0.2 x 0.19 x 0.1 | 0.35 | `asset.equipment.comms-headset` | - |
| Low-profile headset | single-band low-profile headset | 0.17 x 0.15 x 0.05 | 0.12 | `equipment.headset_low_profile` | - |
| Body camera | chest-mounted recorder | 0.085 x 0.055 x 0.03 | 0.14 | `equipment.body_recorder`, `asset.equipment.body-camera` | - |
| Compact binoculars | compact binocular (canon 120 x 110 x 45 mm) | 0.12 x 0.11 x 0.045 | 0.35 | `equipment.compact_binoculars`, `asset.equipment.compact-binoculars` | - |
| Observation optic | compact spotting scope | 0.3 x 0.09 x 0.08 | 1.1 | none yet | R06 |
| Field cyberdeck (standard) | rugged laptop, closed | 0.32 x 0.22 x 0.045 | 2.6 | `equipment.deck_standard`, `asset.equipment.field-cyberdeck` | - |
| Field cyberdeck (hardened) | rugged laptop, closed, lower emission | 0.32 x 0.22 x 0.047 | 2.9 | `equipment.deck_hardened` | - |
| Field cyberdeck (lite) | pocket compute unit with clip | 0.14 x 0.08 x 0.022 | 0.35 | `equipment.deck_lite` | - |
| T control slate | rugged tablet | 0.28 x 0.19 x 0.025 | 1.3 | none yet | T03 |
| Micro quad drone | folded (0.18 m motor-to-motor open), sub-250 g class | 0.16 x 0.08 x 0.05 | 0.249 | `equipment.micro_uav` | - |
| Interface kit | cable and adapter roll pouch | 0.24 x 0.18 x 0.05 | 0.6 | `equipment.iface_primary`, `asset.equipment.interface-kit` | - |
| Interface kit (extended) | larger cable and adapter roll pouch | 0.26 x 0.2 x 0.06 | 0.9 | `equipment.iface_extended` | - |
| Write-block bridge | inline hardware write blocker | 0.075 x 0.04 x 0.018 | 0.12 | `equipment.writeblock`, `asset.equipment.write-block-bridge` | - |
| Offline store (standard) | removable storage cartridge | 0.08 x 0.055 x 0.012 | 0.06 | `equipment.store_standard`, `asset.equipment.offline-storage` | - |
| Offline store (dual) | redundant cartridge pair | 0.128 x 0.079 x 0.015 | 0.15 | `equipment.store_dual` | - |
| Offline store (pocket) | pocket flash storage | 0.06 x 0.02 x 0.009 | 0.01 | `equipment.store_pocket` | - |
| Integrity dongle | hash/crypto helper key | 0.052 x 0.018 x 0.008 | 0.012 | `equipment.integrity_dongle` | - |
| Isolation sleeve | shielded pouch with inline filter puck | 0.2 x 0.12 x 0.03 | 0.2 | `equipment.isolation_sleeve` | - |
| RF sense brick | USB radio dongle with antenna stub (canon ~95 mm, ~40 g) | 0.095 x 0.028 x 0.014 | 0.04 | `equipment.rf_sense_brick` | - |
| Spare power | battery pack | 0.14 x 0.09 x 0.04 | 0.45 | `equipment.spare_power`, `asset.equipment.spare-power` | - |
| Sync Pulse puck | thrown disc emitter | 0.09 x 0.09 x 0.035 | 0.25 | none yet | T04 |
| Smoke capsule | hand-thrown smoke canister | 0.15 x 0.064 x 0.064 | 0.45 | none yet | E04 |
| Sensor beacon / throwable sensor | thrown sensor | 0.1 x 0.07 x 0.07 | 0.2 | `equipment.throwable_sensor` | R04 |
| Entry tool + sheath | compact pry tool | 0.36 x 0.12 x 0.03 | 0.9 | `asset.equipment.entry-tool` | - |
| Blunt breach kit | forcible-entry bar | 0.76 x 0.18 x 0.08 | 4.1 | `equipment.breach_tools` | E03 |
| Evidence scanner | handheld scanner | 0.18 x 0.08 x 0.04 | 0.45 | none yet | R03 |
| Repair module | small tool case | 0.2 x 0.12 x 0.06 | 0.8 | none yet | T06 |
| Rescue harness pack | compact carried pack | 0.3 x 0.22 x 0.12 | 1.8 | none yet | E06 |
| Medical pouch | individual first-aid pouch, filled (canon 150 x 100 x 60 mm) | 0.15 x 0.1 x 0.06 | 0.45 | `equipment.medical_pouch`, `asset.equipment.medical-pouch` | - |
| Access-tool pouch | small tool pouch, filled | 0.16 x 0.1 x 0.05 | 0.25 | `asset.equipment.access-pouch` | - |
| Optics pouch | binocular pouch, empty | 0.17 x 0.15 x 0.11 | 0.15 | `equipment.optics_pouch`, `asset.equipment.optics-pouch` | - |
| Field sling | two-point sling laid flat | 1.4 x 0.032 x 0.004 | 0.18 | `equipment.rifle_sling`, `asset.equipment.rifle-sling` | - |
| Deck sling | carry strap for the cyberdeck laid flat | 1.3 x 0.038 x 0.004 | 0.15 | `equipment.sling_deck` | - |
| Field utility belt | belt laid flat | 1.1 x 0.045 x 0.01 | 0.45 | `equipment.utility_belt` | - |
| Knee pad (single) | strap-on knee pad | 0.22 x 0.13 x 0.05 | 0.25 | `equipment.pad_knee_single` | - |

Notes:
- The conflicting dimension claims of issues 8-12 are resolved by the rows above (deck standard 45 mm
  closed; deck lite, write-block, store and dongle at the SPECS.md envelopes). The canon dimensions in
  FIELD-KITS / SPECS.md (binoculars, medical pouch, carrier panel, micro quad, RF brick) were kept.
- The **M helmet** and the other Prime armour are **not sized here**: they come from the owner's locked
  masters, never from a table.
- A generic **field helmet** row is given for when one is modelled; the matrix has no such record.

## 5. T's fifth module (PROPOSED)

Issue `equipment.denied-module-cap`: the DENIED loadout lists Module A-E, but create-a-class rule 3
caps T at **4 tech modules**.

**Proposal: the cap stays 4, and there is no fifth slot.** The Isolation Sleeve (authorized only) is a
conditional swap: when authorized it **takes Module D and displaces the Integrity Dongle**; the hardened
deck does the integrity check in software for that mission. Without authorization, DENIED carries the
Dongle as Module D. Reasons: one rule for every loadout, a real trade (shielding vs a hardware check),
and no new slot competing with the level-2 promotion, which already brings the main arm and Overclock.

In the matrix: `loadout.max_modules: 4` on the four T loadouts, and `loadout.module_rule` on
`loadout.fo-t-denied`.

## 6. Also fixed: the T kit's screen accent

The T accent is **lime `#8BD346`**; teal is R's colour and purple is never used. The matrix had teal in
two places, both corrected: `asset.equipment.field-cyberdeck` ("restrained teal display" now "restrained
lime (#8BD346) display accent") and the prototype's `geometry.operator.t` (two emissive screen parts
`#57968f` now `#8BD346`, noted on the attribute).

## Still open

- Layla Mansour's country (AUDIT question 4).
- Grid scale (§4 rule 5): 1.6 m per tile as documented, or 1 m.
- Whether the §4 sizes and the §5 module rule are accepted as they stand.
