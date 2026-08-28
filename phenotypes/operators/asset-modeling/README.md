---
ai_reader: REQUIRED_FIRST
system: Prim3 field kit 3D asset modeling
version: 1.1.0
---

# FOR ChatGPT / ANY MODELING AI — READ THIS FIRST

## Your job
Generate **reference images** for Prim3 field kit props (and/or Tripo-ready descriptions).

## Hard rules
1. **One object per image.** Never front/back/left/right on one sheet.
2. Four separate images per asset when views requested: FRONT, BACK, SIDE_A, SIDE_B.
3. Use **millimeters** from `SPECS.md`. Do not invent scale.
4. **Brand every institutional asset with the M emblem** (white geometric M + two red Dual Sight bars). Placement: `BRANDING.md`. Full mark: `assets/brand/prim3/M-EMBLEM.md`.
5. Materials: matte institutional black/charcoal; ivory only as thin accents.
6. Prefer proportions from **photo_refs** in each SPECS card.
7. Strip third-party logos (Pi, Wireshark, etc.); replace with Prim3 M where a logo belongs.
8. `stats_only` weapons: generic silhouette only — still can show small M on holster/furniture if institutional.
9. Filenames: `{asset_id}_{view}.png`.

## Workflow
1. Read this file
2. Read `BRANDING.md`
3. Open `SPECS.md` → pick `asset_id`
4. Generate four single-view images with correct M placement
5. Matte black Prim3 skin — not consumer tech advertising

## Files in this folder
| File | Purpose |
|------|---------|
| README.md | This instruction block |
| BRANDING.md | M emblem placement per asset |
| SPECS.md | Dimensions, materials, photo refs |
| INDEX.md | Pointer |
