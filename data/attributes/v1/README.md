---
status: DRAFT (reference data; review snapshot)
system: PRIM3 attributes matrix v1, imported 2026-11-02
owner_supplied: 2026-11-02 (made with ChatGPT; "everything from the items to the players")
contract: schemas/prm3-content-registry.schema.json, data/attributes/tools/validate_registry.py
audit: AUDIT.md
---

# PRIM3 attributes matrix v1

**Status: review snapshot. It does not change gameplay.** Nothing in the game reads these files. Canon
still comes from `CANON.md` and the specialist authorities; this matrix is a cited index of them plus
proposals, and its `canon` labels mean "the cited file declared canon at commit `160020b`", not new
approval. Newer owner decisions (2026-11-02) override it where they differ; see `AUDIT.md`.

**Black Signal values are not our stats.** 169 records (2,236 attribute values) describe ChatGPT's
**Black Signal prototype runtime** (`src/engine.js`, `src/world.js` at `ef665bc`), not the canonical
Prim3 resolver (`game/runtime/tactical-resolver.mjs`) that the game runs. Example: its `runtime-role-t`
has 10 HP, 10 move, range 14, aim 74, damage 3; our T has 6 HP, no main arm at level 1, and technology
control. Every such record carries `"provenance": "Black Signal prototype runtime"` in the derived files
below (24 more are `"Black Signal prototype asset (proposed)"`). The prototype grid and instances are
reference only; our level is `transit-relay` on the canonical engine.

## Provenance

| Item | Value |
| --- | --- |
| Supplied | 2026-11-02, by the owner. Two deliveries; the "newer release" (`v2/`) is byte-identical to the first (same SHA-256 for both files). |
| Primary record | `catalog.json`, the typed registry. The release's standalone HTML embeds it as `window.PRIM3_REGISTRY`; it is re-serialized here exactly as the HTML's own "download JSON" does, and the result matches the release QA hash. |
| `catalog.json` SHA-256 | `7331ba19d6685e3d9ac02b1efb5a47c4b791f0ff5de35b0616ca6b18d88008a3` (matches `QA.md` of the release) |
| Workbook (human view) | `source/PRIM3-Attributes-Matrix.xlsx`, SHA-256 `d8284b9bad7a5606186c714d604a5b9c79891eb4161aeeae30d2fbe668f141df`; identical to the copy embedded in the HTML |
| Release HTML (not committed, 8.7 MB of mostly preview images) | `attrs.html`, SHA-256 `7d73e6b492e33c4adb33ffb544c1d1b82566602246d768571cb2ca75a62a10b9` |
| Canon snapshot | `mcclusterishere/Prim3` `160020bdeac4afa0cd3f25638169e657af55bc29` (this repo's `main` at import). All 68 cited canon files were checked byte-for-byte against that commit and match, so they are **not** copied here. |
| Prototype snapshot | PRIM3 Black Signal `ef665bc2c37438ce11d3c727358d3349c4da4888`. Its 11 cited files and the 2 proposal files are kept in `source/evidence/` (hash-checked), because they exist nowhere in this repo. |

The HTML embeds only `catalog.json`, the workbook and the 81 cited source files. The release README also
lists `catalog.schema.json`, `coverage.json`, `validation.json`, `instances.json`, `runtime-cell-runs.json`,
`runtime-render-parts.json`, `runtime-operator-parts.json` and `cells.csv`: **none of these were in either
delivery.** The 52 instances are present as catalog entities (category "Mission instances"); the grid run
encoding and render-part files are not. Our own registry contract replaces the missing schema and validator
(below).

## Files

| File | Content | Count |
| --- | --- | ---: |
| `catalog.json` | Complete typed registry: entities with attributes and relations, fields, sources, issues | 1,319 entities |
| `entities.json` | One row per stable ID: kind, category, source status, implementation status, gaps, `attributeCount`, `provenance` | 1,319 |
| `attributes.json` | One row per attribute (long text whole, never split), with `entityId`, value, state, unit, origin, sources, note, `provenance` | 12,026 |
| `relationships.json` | Directed links `fromId` → `toId` with type and note | 1,511 |
| `fields.json` | Field dictionary: key, label, type, unit, definition, applies-to, required-for | 1,246 |
| `issues.json` | The matrix's open issues (triaged in `AUDIT.md`) | 30 |
| `sources.json` | Cited files with repository, commit and SHA-256 | 81 |
| `people.json` | Workbook sheet "People": characters, countries, factions, prototype roles and instances | 201 rows |
| `phenotypes.json` | Workbook sheet "Phenotypes": phenotypes, roles, wear | 37 rows |
| `weapons.json` | Workbook sheet "Weapons & Ammo" | 10 rows |
| `gear.json` | Workbook sheet "Gear & World": equipment, materials, world objects, assets | 370 rows |
| `actions.json` | Workbook sheet "Actions & Learning": actions, states, systems, learning, missions | 701 rows |
| `SHA256SUMS` | SHA-256 of every file in this folder except itself (and `AUDIT.md`, added after) | |
| `manifest.json` | Hashes, counts, attribute states and origins, provenance totals, snapshot checks, problems (empty) | |
| `source/` | The original workbook and the non-Prim3 evidence snapshots | 14 files |
| `tools/build_from_release.py` | Regenerates everything above from the release | |

Attribute states: 7,588 `defined`, 4,426 `unknown`, 8 `not_applicable`, 4 `conflict`. Origins: 3,695
canon, 6,152 proposed, 1,713 runtime, 466 reference. Entity status: 864 canon, 265 proposed, 169 runtime,
21 reference.

The brief described the sheets by their row counts (Entities 1,325, Attributes 12,304, Relationships 1,517,
Fields 1,252, Issues 36, Sources 87). Each sheet has six title/header rows; the records are 1,319 / 12,298
rows / 1,511 / 1,246 / **30** / 81. The Attributes sheet's 12,298 rows concatenate to exactly 12,026
values.

## Round-trip checks (all pass; the build exits non-zero otherwise)

- `catalog.json` re-serialization reproduces the release SHA-256.
- Entity, attribute, relationship, field, issue and source counts are equal across catalog, workbook and
  the catalog's own `summary`, and equal to the expected numbers above.
- The workbook's and catalog's entity ID sets are identical.
- Every attribute's concatenated workbook value (Parts joined in Part order) equals the catalog value
  (numbers numerically, booleans and JSON values structurally; an empty string is a blank cell), and its
  State matches.
- Every relation target exists; every cited snapshot matches its recorded SHA-256; every canon snapshot
  matches this repo at `160020b`.
- `python3 -I data/attributes/tools/validate_registry.py data/attributes/v1/catalog.json --self-test`:
  valid, and all 12 deliberate corruptions rejected. The catalog also validates against
  `schemas/prm3-content-registry.schema.json` with a standard JSON Schema 2020-12 engine.

## Regenerate

Python 3 standard library plus `openpyxl`:

```sh
python3 -I data/attributes/v1/tools/build_from_release.py \
  --html /path/to/attrs.html --xlsx /path/to/matrix.xlsx \
  --out data/attributes/v1 --prim3 .
python3 -I data/attributes/tools/validate_registry.py data/attributes/v1/catalog.json --self-test
```

A new matrix release goes into `data/attributes/v2/`; v1 stays as the record of what the owner supplied
on 2026-11-02.

## Reading a record

- **Source status** (`canon`, `proposed`, `reference`, `runtime`) says where a definition stands;
  **implementation** (`runtime`, `asset_only`, `design_only`, `schema_only`) says whether it is in a
  playable game. Here `runtime` means the Black Signal prototype, never our engine.
- `unknown` and `not_applicable` are `null` and are never zero. `conflict` keeps every source claim.
- Definitions (a role, a weapon, a phenotype) and instances (a deployed unit, a placed object) have
  different IDs.
- Relations are explicit; never associate records by matching names.
