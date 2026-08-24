---
ai_reader: REQUIRED_FIRST
system: Prim3 field kit 3D asset modeling
version: 1.0.0
---

# FOR ChatGPT / ANY MODELING AI — READ THIS FIRST

## Your job
You are generating **reference images and/or 3D-ready descriptions** for Prim3 field kit props.

## Hard rules
1. **One object per image.** Never put front/back/left/right on the same sheet.
2. Generate **four separate images** per asset when asked for views: FRONT, BACK, SIDE_A (left), SIDE_B (right).
3. Use **real-world centimeters** from `SPECS.md`. Do not invent scale.
4. Materials: matte institutional black / charcoal; optional muted ivory Dual Sight marks only if the asset card says so.
5. Prefer proportions from the **photo reference URLs** in each asset card.
6. No logos of real brands on final Prim3 skins (Raspberry Pi logo, Wireshark shark, etc. stripped or replaced with Prim3 blank).
7. Weapons: if an asset is marked `stats_only`, do not invent open-source gun construction; keep generic service-weapon silhouette.
8. Output filenames when saving: `{asset_id}_{view}.png` e.g. `DECK-STD_front.png`.

## Workflow
1. Open `SPECS.md`
2. Pick `asset_id`
3. Read dimensions_mm, materials, form, photo_refs
4. Emit four single-view images OR a structured mesh brief for Tripo
5. Reskin to Prim3 (matte black, no consumer logos)

## Related canon
- Kit roles: `../FIELD-KITS.md`
- Link index: `../OPEN-SOURCE-REFERENCES.md`
- Field-T itemization: `../field-technical/LOADOUTS-ITEMIZED.md`

## Primary data file
**All physical detail lives in `SPECS.md` in this folder.**
