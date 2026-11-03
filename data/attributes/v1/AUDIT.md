---
status: DRAFT (audit; changes no gameplay and no canon)
system: PRIM3 attributes matrix v1 — audit against the engine, the owner's 2026-11-02 decisions, and the 30 open issues; harvest plan; game adapter proposal
date: 2026-11-02
inputs: data/attributes/v1/ (this import);
  engine origin/claude/t-control-rules-20261102 @ 2a7f440 (game/runtime/tactical-resolver.mjs, game/TACTICAL-T-CONTROL-RULES.md, game/TACTICAL-TRANSIT-RULES.md);
  level mcclusterishere/mccluster HEAD js/prim3-tactics/levels/transit-relay.mjs;
  equipment origin/claude/level1-equipment-drafts-20261102 @ c93be79;
  story origin/claude/story-consolidation-20261102 @ e6386eb
---

# Attributes matrix v1: audit

## 1. Verdict in five lines

1. The import is faithful: every count round-trips, the catalog hash matches the release QA, and all 68 canon snapshots equal this repo at `160020b` (`README.md`).
2. The matrix is a **snapshot of `main` before today**. It contains none of the 2026-11-02 owner decisions: no Jam / Take Control / Sync Pulse, no level-2 main arm, no role colours, no solo trio, and it still makes Benji McCluster's alias.
3. Its only concrete unit numbers are the **Black Signal prototype runtime** (ChatGPT's `src/engine.js`), on a different grid scale. They are not our stats and are not proposed as targets.
4. Its weapon and ammunition **fields exist but are empty**: all 18 `weapon.*` keys have 0 defined values. The owner's "amount and cost of extra Sync Pulses will come from the matrix" cannot be read from it yet; it must be authored.
5. The valuable part is the **structure**: stable IDs, attribute states, the status/implementation split, explicit relations, the field dictionary. That is adopted now (§9) as Prim3's content-registry contract.

## 2. What is in the matrix

| Domain (workbook sheet) | Rows | What |
| --- | ---: | --- |
| People | 201 | 101 characters + Pylon; 72 countries; 5 factions, 2 teams; **5 prototype role templates and 9 prototype unit instances**; 6 enemy archetypes |
| Phenotypes | 37 | 29 phenotypes (incl. 12 Hitman mirrors), 5 support roles, 3 wear definitions |
| Weapons & Ammo | 10 | 3 weapons (E primary, R optic primary, service pistol), 3 ammo families, 3 round variants, 1 training projectile; all `design_only` / `schema_only` |
| Gear & World | 370 | 84 equipment identities + 7 loadouts; 18 equipment GLBs + 24 environment assets (prototype art, proposed); 43 prototype world instances; 32 materials; 135 world objects; 13 campaign resources |
| Actions & Learning | 701 | 89 actions (75 canon design, 14 prototype); 36 states; 108 systems/rules; 446 learning records (305 concepts, 57 namespace bindings, 21 course modules, 61 curriculum topics, 2 prototype); 7 missions (5 canon designs, 2 prototype); 24 objective/lab-node records |

Entity status: 864 canon (cited, not newly approved), 265 proposed, 169 prototype runtime, 21 reference. Attribute states: 7,588 defined, 4,426 unknown, 8 not applicable, 4 conflict.

## 3. Matrix field → engine field

Engine: `normalizeUnit`, `normalizeWeapon`, `normalizeMachine`, `TECH_RULES` in `game/runtime/tactical-resolver.mjs` @ `2a7f440`.

| Matrix field (unit) | Defined values | Engine field (unit) | Fit |
| --- | ---: | --- | --- |
| `actor.hp_max` (HP) | 5, prototype only | `hp`, `maxHp` (HP, default 6) | Same unit. Prototype range 7–12; ours 5–8 |
| `actor.ap_max` (AP) | 5, prototype | `maxAp` (default 2) | Same; all 2 |
| `actor.move_budget` (movement points, weighted path) | 5, prototype | `moveRange` (tiles, Manhattan; links cost whole steps; Dash ×2) | **Different scale.** Prototype map 128 × 128 cells; ours 64 × 64 tiles |
| `actor.aim` (percentage points) | 5, prototype | `aim` (per unit, or per weapon in `weapons.main/sidearm`) | Same unit |
| `weapon.aim_modifier` (pp) | 0 | `weapons[slot].aim` is **absolute**, not a modifier | Adapter must add actor aim + modifier, or the matrix stores absolute aim |
| `actor.base_damage`, `weapon.base_damage` (HP) | 5 / 0 | `weaponDamage` | Same unit; weapon value never authored |
| `actor.attack_range`, `weapon.range` (game-grid unit) | 5 / 0 | `weaponRange` (optional hard maximum; beyond 6 tiles −4 aim per tile regardless) | Scale differs; ours is optional |
| `weapon.magazine_capacity` (rounds) | 0 | `magazineSize`, initial `ammo` | No value |
| `weapon.reserve_max` (rounds) | 0 | `reserveAmmo` (shared by both weapons) | No value; engine has one shared pool |
| `weapon.reload_ap` | 0 | `reload` fixed 1 AP | No engine knob |
| `weapon.rounds_per_action` | 0 | one round per shot, fixed | No engine knob |
| `item.equip_ap` | 0 | `switchWeaponAp` (global, default 1) | Global, not per item |
| `actor.vision_radius` | 0 | `detectionRadius` (default 5; Transit 8–13) | Name differs; no value |
| `actor.hearing_radius`, `actor.reaction_budget` | 0 | none | No engine home |
| `action.ap` (AP) | 63 (canon design actions) | `TECH_RULES.*_AP`, fixed action costs | No tech-control actions in the matrix |
| `action.uses`, `action.uses_per_round`, `action.uses_per_intervention` | 1 / 2 / 3 | `syncPulsePerMission` (global) | Pulse count needs a per-unit field (§8) |
| `action.cooldown` (turns) | 0 | Jam: no re-jam while jammed; re-take protection 3 rounds | Partial |
| `ammo.damage_multiplier`, `ammo.cover_damage_multiplier`, `ammo.noise_level`, `ammo.effect_id` | 3 proposals each | none | Proposals only; no engine home |

**Engine fields with no matrix home:** `crit`, `critBonus`, `level`, `weapons.{main,sidearm}`, `readyWeapon`, `canBeDowned`, `concealed`, `patrol`, `syncPulsesUsed`; the whole machine class (`CAMERA` / `TURRET` / `DOOR` with `detectionRadius`, turret `aim/weaponDamage/crit/critBonus`, door `cells/open`); and the tech-control constants (Jam 1 AP ≤ 8, Control 2 AP ≤ 6, Pulse 1 AP thrown ≤ 5 radius 3, re-take 2 AP ≤ 6 after 3 rounds, Mark 1 AP, Door 1 AP ≤ 6). The matrix's nearest records are `lab-object.door`, `lab-object.camera_or_scan_station` and the canon rule `design.kinetic-technical-coupling-authority.9-1-camera-triggers`.

**Matrix attributes with no engine home yet** (all `unknown` today unless noted): inventory and slots (`actor.inventory_slots`, `actor.loadout_id`, `item.slot`, `item.inventory_size`, `item.mass`, `item.stack_max`), economy (`item.purchase_cost`), durability and repair (`item.durability_max`, `item.repair_action_id`, 244 `durability points` values on world objects), progression (`actor.progression_id`, `item.unlock_rule_id`), resistance and armor (`actor.resistance_profile_id`, `ammo.armor_modifier`), noise (`weapon.noise_level`, `ammo.noise_level`), ammunition families and variants, destructible cover, presentation (animation, sound, projectile, equipped asset and sockets), and identity bindings (country, phenotype, character on a unit).

## 4. Stat differences that matter

| Unit | Transit / Relay today (canonical engine) | Black Signal prototype runtime (matrix) | Canon design (FIELD-KITS, cited by the matrix) |
| --- | --- | --- | --- |
| E | hp 8, aim 72, move 7, dmg 3, ammo 4/8, detection 9 | hp 12, aim 78, move 12, range 16, dmg 4 | Primary "Dmg 3–4"; sidearm "Dmg 2–3, Close/Mid, 1 AP" |
| R | hp 6, aim 80, move 8, dmg 4, ammo 3/6, detection 12 | hp 10, aim 82, move 14, range 21, dmg 3 | Optic primary "Overwatch +Aim"; no number |
| T | hp 6, aim 62, move 7, dmg 2, ammo 6/12, detection 8 | hp 10, aim 74, move 10, range 14, dmg 3, special `hack` | Sidearm only (FO-T-STD); "Dmg 2–3" |
| Hostiles | hp 5, aim 60–66, move 6, detection 10–13 (dmg 3, ammo 4/8, crit 10 by default) | guard hp 7 aim 64 move 14 range 15; sentry hp 7 aim 68 move 14 range 23; dmg 3; overrides H3 hp 8, H6 hp 9 | none |

What matters:
- **Health.** The prototype's squad has 10–12 HP against hostiles at 7–9 and damage 3–4, so a player unit survives 3–4 hits. Ours has 6–8 HP against damage 3 (5 on a crit), so 2–3 hits. Ours is deliberately more lethal, which fits canon's dangerous-mission law (`CANON.md` §4). Do not import the prototype numbers.
- **Movement and range** are not comparable: the prototype counts weighted points on a 128-cell map; ours counts tiles on 64. A 1:2 scale would put the prototype's moves at 5–7 tiles, close to ours, but its attack ranges (14–23) would become 7–12 hard limits, which our level does not use.
- **T.** The prototype T shoots like a rifleman (aim 74, dmg 3, range 14) and has a generic `hack`. Ours has a weaker sidearm (aim 62, dmg 2) and four deterministic control actions. This is the largest gap and the prototype is the wrong one.
- **The game's own values are consistent with canon design ranges:** E dmg 3 is inside "3–4"; T dmg 2 inside the sidearm's "2–3". The matrix offers no canon numbers to correct them.
- **Transit's T1 sets one unnamed weapon** (dmg 2, ammo 6/12) and no `level` or `weapons`. The engine treats that as level 1 with technology control, which matches the owner. To make "no main arm at level 1" structural rather than implicit, the level should declare `level: 1, weapons: { sidearm: {...} }` (adapter, §8).
- **Hostile damage and ammo** in Transit are engine defaults, not authored. The matrix does not author them either.

## 5. Conflicts with the owner's decisions of 2026-11-02

| Decision | What the matrix says | Conflict | Action |
| --- | --- | --- | --- |
| T level 1: no main arm; main arm is technology control (Jam, Take Control, Sync Pulse once per mission, own machines jammed too) | No tech-control actions; prototype T has a long-range weapon and `hack`; `loadout.fo-t-*` keep the sidearm-only kit (agrees) | **Yes** (missing and contradicted by the prototype T) | Add tech-control action records and machine kinds to the registry (§9 Adapt) |
| Level 2: main arm joins the sidearm; control only with the sidearm up; extra pulses an optional level-2 upgrade | No levels, no `weapons.main/sidearm`, no upgrade, no pulse count | **Missing** | Author `upgrade.t.sync-pulse-extra` (amount, cost) as owner numbers; engine needs a per-unit count (§8) |
| Role colours: E amber, R teal, T lime, never purple | No role-colour field. No purple anywhere in the matrix's colours (the only "purple" is the security term *purple team*, a learning concept, which is fine). The T kit's screen accent is teal (`#57968f` on the prototype T; "restrained teal display" on `asset.equipment.field-cyberdeck`), which is R's colour | **Yes, minor** | Add `presentation.role_colour` to role/equipment records: E amber, R teal, T lime `#8BD346` (as in the equipment drafts) |
| Benji Chase is a different person from Matthew McCluster (applied on the story branch as: different from McCluster) | `person.mccluster` has `alias.benji = "Benji"`; `person.royce` key ties "McCluster/Benji"; `person.sora-gymnast-okada` says "Do not use a present-day Benji dossier separate from McCluster"; `person.maren-quill` mentions a "Hitman/Benji prequel" | **Yes, direct** | Drop the alias in any Prim3 use; regenerate after the story branch lands (`CANON.md` §9 there) |
| Whip Equipped is the prequel | No Whip Equipped record at all; "Hitman/Benji prequel" wording | **Missing / stale** | Story records come from canon after the story branch merges |
| First three missions are solo: Royce (US) E, Aya Shinoda (Japan) T, Hana Lee (South Korea) R; they open mid professional shoot under concealment | Royce: nation unknown, Hitman sovereign, no playable role. Hana: `legacy`, `historical_or_outside`, dead before the series, no playable role. Aya: Japan, Field-T (agrees). No solo-mission or opening-under-concealment rule. The prototype names its E/R/T **Arjun / Rafael / Aya** | **Yes** | Royce country US and E; Hana R as Aya's reconstruction (story branch §2, owner-approved); drop the prototype names |
| LOADOUTS no-marks rule | The matrix's `asset.equipment.body-camera` is the **pre-edit** model (sha `≠` the equipment branch): it still has the two red diagonal stripes that read as the red `//` mark. The itemized T loadouts (`loadout.fo-t-live`, `-rapid`, …) keep a "Marks: Dual Sight readable" slot from `LOADOUTS-ITEMIZED.md`, while `LOADOUTS.md` keeps the ID panels blank | **Yes** | Use the equipment branch's `field-equipment-v01` body camera; never the matrix's |
| Equipment sets (`field-equipment-v01`, `level1-drafts`) | The matrix's 18 equipment models are the same set as `field-equipment-v01` (same IDs, bounds, sockets, statistics; 17 of 18 hashes equal; body camera differs, above). It has none of the 18 `level1-drafts` (E01–T06), so no T01 level-2 carbine, no T04 Sync Pulse puck, no E04 smoke or R04 beacon | **Missing** | Register the level-1 drafts as proposed equipment with role colours |

No matrix record draws or redraws a mark. It treats the M helmet and the brand marks only as references.

### Story consolidation (`origin/claude/story-consolidation-20261102`, pushed during this audit)

It overlaps the matrix on people, not on stats:
- It applies the Benji Chase decision across 60+ files (`CANON.md` §9 and others). The matrix predates it and is stale there.
- Its §1 and §2 are owner-approved: one spine; LVL-01 Royce (US, E), LVL-02 Aya (Japan, T), LVL-03 Hana (South Korea, R) as **Aya's reconstruction of GLASSHOUSE** (Hana is dead before the series, which the matrix records correctly). Order is its Owner Question 1 ("ERT" as types or as order).
- It makes F4 Media + Culture's location production unit the cover department, which is the "mid professional shoot" opening.
- It repairs the Jordan Vale damage, which resolves matrix issue 3.
- When it merges, regenerate this registry from the new commit as `data/attributes/v2/` rather than patching v1.

## 6. The 30 open issues

Classes: **Decided** (an owner decision or current canon already answers it; cited), **Contradiction** (sources disagree and canon order resolves it), **Open** (needs an owner or design decision), **Prototype** (a gap in the Black Signal prototype, not in our engine).

| # | Issue | Class | Basis / recommendation |
| ---: | --- | --- | --- |
| 1 | `identity.canon.secondary-promotion` | Decided | `CANON.md` §3 promotes Hana, Ren, Tariq, Zayd, Bigga Lex individually; story branch §2 makes Hana playable (owner 2026-11-02). Keep others proposed. |
| 2 | `identity.canon.succession-aliases` (Prime-N1) | Contradiction | Current canon: PRIM2 and McCluster / eventual PRIM3; story branch migrates stale Prime-N1 wording. Keep old IDs as aliases only. |
| 3 | `identity.canon.asset-jordan-vale` | Decided | Story branch commit `a4098c2` "Repair the Sept 24 Jordan Vale → McCluster replacement damage (owner-confirmed)". No Jordan Vale character. |
| 4 | `identity.canon.layla-country` | **Open** | Owner sets Layla Mansour's country. |
| 5 | `identity.canon.country-patches` | **Open** | FO-01 forbids patches; LOADOUTS no-marks keeps ID panels blank; the badge request is ChatGPT's record of "current user direction", not an owner decision in this repo. Recommend: country shown in UI (portrait, roster card), not on the 3D model, until the owner decides. |
| 6 | `identity.canon.black-mannequin-coverage` | **Open** | Recommend: mannequin is a render style layer, separate from role, wear and identity; Pylon, formal suits and the M helmet stay exceptions. |
| 7 | `identity.canon.trainee-field-transition` | Contradiction | CO-02 v1.0 (current) wins over legacy FO-01: promotion to Cohort-01 before external missions. |
| 8 | `equipment.deck-standard-dimension` | **Open** | Production scale, not gameplay. Decide at the asset pipeline (fit to rig). |
| 9 | `equipment.deck-lite-dimension` | **Open** | Same. |
| 10 | `equipment.writeblock-dimension` | **Open** | Same. |
| 11 | `equipment.store-dimension` | **Open** | Same. |
| 12 | `equipment.integrity-dongle-dimension` | **Open** | Same. |
| 13 | `equipment.writeblock-led-semantics` | **Open** | Teaching content; pick one meaning before any lesson uses it. Note its "blocked = amber" LED collides with E's role amber; prefer a status colour that is not a role colour. |
| 14 | `equipment.deck-count` | Contradiction | Canon FIELD-KITS: one deck. Drop the higher proposed ceiling. |
| 15 | `equipment.denied-module-cap` | **Open** | Owner/design: what the optional fifth module displaces. |
| 16 | `equipment.mesh-scale` | Decided | `level1-drafts/CANON-RECONCILIATION.md`: draft art, not canon; game units, no real-world size inferred. |
| 17 | `equipment.field-country-badges` | **Open** | Same decision as 5. |
| 18 | `runtime.ammo-definitions` | **Open** | Our engine already has magazine, reserve, reload and empty-magazine refusal. Ammo families and variants stay unimplemented proposals until the owner wants them. |
| 19 | `runtime.weapon-inventory` | Decided | Owner 2026-11-02: main + sidearm, switch 1 AP, T level 1 sidearm only; implemented as `weapons` / `readyWeapon` / `switchWeapon` (`2a7f440`). |
| 20 | `runtime.phenotype-runtime` | **Open** | Recommend the adapter binds phenotype by ID for presentation only (§8); no stats from phenotype. |
| 21 | `runtime.country-runtime` | Decided for the trio | Story branch §2 (owner-approved): Royce US, Aya Japan, Hana South Korea. Engine needs no country field; it is presentation data. |
| 22 | `runtime.real-time-route` | Prototype | Canon is turn based (`TACTICAL-CORE-MECHANICS.yaml` turn model). Do not adopt. |
| 23 | `runtime.physics-lessons` | **Open** | Learning design; bind to concept IDs when a mission needs it. |
| 24 | `runtime.visibility-runtime` | Prototype (solved here) | Our engine has detection radius, concealment, fog of war, `playerProjection`, cameras. |
| 25 | `runtime.collision-vs-visual` | Decided (in principle) | Adopt: logical object IDs drive gameplay, visual part IDs drive appearance. Transit already uses logical blockers. |
| 26 | `runtime.default-vs-builder` | Prototype | Not applicable to our engine. |
| 27 | `claims.…-design-field-role` (T vs R) | Decided | Not a real conflict: FIELD-KITS says R's pistol is "the same service pistol family as T/E". `field-equipment-v01` `service-sidearm` is role `E/R/T`; the drafts give each role a sidearm (E02, R02, T02). Field role = E, R, T. |
| 28 | `claims.…-design-look` | Contradiction (merge) | Both say one compact black service pistol. Keep T's fuller wording. |
| 29 | `claims.…-design-effect` | Contradiction (merge) | "Dmg 2–3, Close/Mid, 1 AP; last resort — loud Detection" (T section) refines "Baseline kinetic" (R section). Use the specific one for all roles. |
| 30 | `claims.…-design-open-source` | Contradiction (merge) | "Game stats only" in both. |

Tally (one class per issue): **Decided 7** (1, 3, 16, 19, 21, 25, 27); **Contradiction 6** (2, 7, 14, 28, 29, 30), each resolved by canon order or a merge; **Open 14** (4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 17, 18, 20, 23); **Prototype-only 3** (22, 24, 26). Of the 14 open, only 4, 5/17 and 15 need the owner; 8–12 are production scale, 13, 20 and 23 are design work, 6 and 18 have a recommended default.

## 7. Owner questions

1. **Black Signal numbers.** The matrix's unit values (E 12 HP, T 10 HP with a rifle, ranges 14–23) are ChatGPT's prototype. Keep the Transit / Relay values as the game's stats (recommended), or adopt any prototype value? Nothing changes until you choose.
2. **Extra Sync Pulses (level-2 upgrade).** The matrix has no amount or cost. How many extra pulses, and what does the upgrade cost?
3. **Country badges** (issues 5 and 17): UI only, or on the model (as a decal from locked masters)?
4. **Layla Mansour's country** (issue 4).
5. **Equipment production scale** (issues 8–12) and the fifth T module (issue 15): needed before production meshes, not before play.

## 8. Game adapter proposal (document only; no engine change in this branch)

### How a level would read stats by ID

Today `transit-relay.mjs` hard-codes each unit's numbers. With an adapter, a level names **IDs** and the adapter produces exactly the `createState` config the engine already takes:

```js
// level data (proposal)
units: [
  { id: 'E1', role: 'E', profile: 'profile.transit.e', character: 'person.royce', x: 44, y: 52 },
  { id: 'T1', role: 'T', profile: 'profile.transit.t', character: 'person.aya-shinoda', level: 1, x: 49, y: 53 },
  { id: 'H1', faction: 'THREAT', profile: 'profile.transit.hostile', overrides: { aim: 62 }, x: 38, y: 27 }
]
// adapter: game/runtime/content-adapter.mjs (proposed)
// resolveUnit(registry, unit) -> { hp, maxHp, maxAp, moveRange, aim, crit, critBonus,
//   weaponDamage, ammo, magazineSize, reserveAmmo, detectionRadius, weaponRange?,
//   level, weapons: { main?, sidearm? }, readyWeapon?, syncPulsePerMission? }
```

Rules:
- **A profile is a registry entity** (`kind: unit_profile`, our status, our numbers), e.g. `profile.transit.t` with `actor.hp_max = 6`, `actor.move_budget = 7` (unit `tiles`), `actor.vision_radius = 8`, `actor.loadout_id = loadout.t.level1`. The first profiles are **today's Transit values, copied exactly**, so the switch changes nothing (the engine's 74+ tests and a Transit snapshot test prove it).
- **Weapons by ID.** `loadout.t.level1` → `sidearm: equipment.pistol_service_compact`; level 2 adds `main: <level-2 T arm>`. The weapon entity carries `weapon.base_damage`, `weapon.magazine_capacity`, `weapon.range`, absolute aim (or `actor.aim + weapon.aim_modifier`), crit fields.
- **Resolution order:** weapon definition → unit profile → instance `overrides` → engine default. A value whose state is `unknown` is skipped, never read as 0; if nothing supplies it, the engine default applies and the adapter reports it, so missing data is visible.
- **Only `defined` values from an allowed status** (`canon`, or a profile the owner approved) are used. `proposed` values and anything with Black Signal provenance are refused by default.
- Characters and phenotypes bind by ID for **presentation only** (name, portrait, country, role colour). No stat comes from nationality, phenotype or appearance.
- The adapter runs at build time or level load, outside the resolver; the resolver stays data-agnostic and deterministic.

### What the engine lacks to honour the matrix

| Gap | Smallest change | Why |
| --- | --- | --- |
| Pulse count is global (`syncPulsePerMission`) | **Per-unit `syncPulsePerMission`** in `normalizeUnit` (`unit.syncPulsePerMission ?? rules.syncPulsePerMission`), used where `PULSE_SPENT` is checked (line ~1120) | The optional level-2 upgrade gives one T more pulses without changing others (owner, 2026-11-02) |
| Tech-control numbers are frozen constants | Let `config.techRules` override `TECH_RULES` key by key, like `switchWeaponAp` | So the registry can author them; defaults unchanged |
| Weapon aim is absolute | Optional `aimModifier` on a weapon: `aim = weapon.aim ?? unit.aim + (weapon.aimModifier ?? 0)` | Matches the matrix's `weapon.aim_modifier` |
| Reload is fixed 1 AP; one round per shot | Optional `reloadAp`, `roundsPerShot` on a weapon (default 1, 1) | Matrix fields `weapon.reload_ap`, `weapon.rounds_per_action` |
| `reserveAmmo` is shared | Keep; optionally per-weapon `reserve` later | Only if ammo families are adopted |
| Units carry no content IDs | Pass-through `profileId`, `characterId`, `loadoutId` on units (ignored by rules, kept in state and events) | Saves and debriefs can name what was used |
| Switch cost is global | Optional per-weapon `equipAp` falling back to `switchWeaponAp` | Matrix `item.equip_ap` |

Each is opt-in with today's defaults, the same pattern the T-control work used, so a state without the new fields behaves exactly as now.

## 9. Harvest: Adopt / Adapt / Drop

Owner direction (2026-11-02): "eat the fish and spit out the bones."

### Adopt (copied as-is; done on this branch)

| Item | Where it lives now | Next step |
| --- | --- | --- |
| Stable definition IDs vs instance IDs | `schemas/prm3-content-registry.schema.json` (`entity`), `README.md` "Reading a record" | New Prim3 reference data uses this shape; mission levels refer to definitions by ID |
| Attribute states `defined` / `unknown` / `not_applicable` / `conflict`; unknown is never zero | Schema `attribute` rules; enforced by `data/attributes/tools/validate_registry.py` (negative tests "unknown replaced with zero", "not_applicable replaced with zero", "conflict collapsed") | The adapter (§8) treats `unknown` as absent |
| Source status vs implementation status | Schema `sourceStatus` / `implementationStatus`; validator rejects a proposal claiming runtime | Map `CANON` / `PROPOSED` / `DRAFT` / `DEPRECATED` labels (AGENTS.md) onto `status` when we author records |
| Explicit relations | Schema `relation`; validator checks every target | Associate by ID only, never by name |
| Schema and stdlib validator with negative tests | `schemas/prm3-content-registry.schema.json`; `data/attributes/tools/validate_registry.py --self-test` (12 corruptions, all rejected; the catalog also passes a standard JSON Schema 2020-12 engine). The release's own `catalog.schema.json` and validator were **not** in the delivery, so these are Prim3's own, written to the same contract | Run in CI for any `data/attributes/v*/catalog.json` (owner to enable; no Actions added here) |
| Field dictionary | `data/attributes/v1/fields.json` (1,246 keys); the validator requires every attribute key to be listed and type-checks values | New fields (role colour, tech-control actions, upgrade amounts) are added to the dictionary first |

### Adapt (worth having; changed to fit canon and engine; plan only)

| Item | Matrix source | Concrete next step | Target path |
| --- | --- | --- | --- |
| Learning: 305 concepts, 57 namespace bindings, 21 course modules, 61 curriculum topics | `concept.*`, `learning-binding.*`, `course.M01`–`M21`, `curriculum.*` | Map each course module M01–M21 to its episode, and each concept to `learning/CONCEPT-MECHANIC-BINDING-RULES.yaml` entries; flag the 61 proposed curriculum topics as DRAFT. M01–M03 sources change with the solo trio (story branch §2 downstream list) | `learning/registry/concept-index.v1.json` |
| 5 mission specs + lab/objective records | `mission.design.dead-air`, `.exposure`, `.tr01`–`.tr03`; 12 lab nodes, 12 objectives | Map to the 21 episodes and to the approved solo LVL-01 Royce E / LVL-02 Aya T / LVL-03 Hana R; validate against `schemas/prm3-tactical-learning-mission.schema.json` | `learning/missions/registry-map.v1.json` |
| 101 people and 29 phenotypes | `person.*`, `phenotype.*` | Merge with `story/CAST-NATIONS.md` and story canon after the story branch merges; fix Royce (US, E), Hana (R, reconstruction), drop `alias.benji`; flag Layla's country | `characters/registry/people.v2.json` |
| Equipment sockets | `field-equipment-v01` sockets (`grip_r`, `grip_l`, `sling_*`, …) | Use as attachment points when fitting kit to the rigged mannequin; take the body camera from the equipment branch, not the matrix; add role colours | `phenotypes/operators/equipment/field-equipment-v01/catalog.json` (already there on the equipment branch) |
| Ammo families and variants | `ammo.family.*`, `ammo.variant.*`, `projectile.training-beacon` | Keep as **unimplemented proposals**; adopt only if the owner wants ammo types. The training marker round is the best candidate (fits training ranges) | registry only |
| The 30 open issues | `issues.json` | Owner answers §7; then record each resolution in the next registry version | `data/attributes/v2/issues.json` |
| Grid run-length encoding | `grid.black-signal-cells` (`grid.encoding`; the run file itself was not delivered) | Encode level grids as horizontal runs per floor (walkable, height, cover) for the level generator and saves; keep logic, navigation and render batching separate (the handoff's rule) | `game/runtime/grid-runs.mjs` (proposed) |

### Drop (bones)

- Anything that would create a **second engine or database**: the Black Signal `src/engine.js` / `world.js`, its Level Forge, its hosted site and "copy `src/registry/` into the project" step. The canonical resolver and McCluster's data plane stay the only ones.
- The **Black Signal runtime numbers** as targets (§4).
- Names and roles that contradict the owner: `alias.benji` on McCluster and the related lines; the prototype's Arjun / Rafael / Aya as the E / R / T; Royce's unknown country; Hana as non-playable.
- **Purple**: none present in colours; keep it that way (the T accent becomes lime, not teal).
- **Any drawn mark**: the matrix's pre-edit body camera (red stripes reading as `//`); any badge or patch modelled onto operators without the owner's decision; marks only ever from the locked masters.
