---
status: DRAFT
system: Operators / Field — level-one equipment blockouts
owner_supplied: 2026-11-02 (made with ChatGPT; original procedural Blender geometry)
---

# Level-one equipment drafts against canon

18 blockouts, 3 roles × 6 slots (`README.md`, `asset_manifest.json`, `models/*.glb`, `source/*.blend`). This sheet checks each one against `../../LOADOUTS.md` (FO-E-AE, FO-R-SO-v02, FO-T-STD) before any of them is put on an operator or into the game.

**Status: draft art, not canon.**
- Nothing here is wired into the tactics game.
- Nothing here changes a loadout.
- The canon loadout photographs stay the authority.

## Item by item

| ID | Draft | Closest canon item | Verdict |
|---|---|---|---|
| E01 | Entry carbine | E 13 Compact carbine + sling | Matches the role |
| E02 | Compact backup | E 11 Service sidearm (+12 holster) | Matches |
| E03 | Blunt breach kit | E 14 Entry tool + sheath | Matches the role. Canon is a pry-style tool on the hip, not a case |
| E04 | Smoke capsule | none | **New ability.** Needs a canon rule first |
| E05 | Reinforced entry armor | E 03 Protective carrier | Matches |
| E06 | Rescue harness pack | E 16 Medical pouch (closest) | Partly matches. Canon has no rescue pack |
| R01 | Precision carbine | R 17 Scoped overwatch rifle (+18 sling) | Matches the role. Canon is a scoped rifle, slung muzzle-down |
| R02 | Recon pistol | R 15 Service sidearm (+16 holster) | Matches |
| R03 | Evidence scanner | R 09 Observation recorder / R 12 RF sense brick | Partly matches |
| R04 | Sensor beacon | none | **New ability.** Needs a canon rule first |
| R05 | Light recon armor | R 03 Light soft vest | Matches |
| R06 | Observation optic | R 10 Compact binoculars (+11 pouch) | Matches |
| T01 | Technical carbine | none at level 1 | **Owner decided (2026-11-02):** T has no main gun at level 1; the main arm is control of technology. T01 becomes T's **level-two** main arm candidate. See `../../field-technical/T-LEVEL1-CONTROL-DRAFT.md` |
| T02 | Specialist backup | T Holstered sidearm | Matches |
| T03 | Control terminal | T Field cyberdeck (on its deck sling) | Matches the role. Canon is an open clamshell deck held at the waist |
| T04 | Sync Pulse puck | none | **New ability.** It is the T-device area effect the owner proposed; it needs a canon rule (radius, what it affects, AP) before it is used |
| T05 | Insulated technical armor | T Soft torso armor (zip-front vest) | Matches |
| T06 | Repair module | T Interface kit / Spare power (belt pouches) | Partly matches |

## Two owner calls before any of this goes on a character

1. ~~Role colours~~ **decided (owner, 2026-11-02): equipment carries role colours, and no colour is ever purple.**
   - E is amber; R is teal; T is **lime** (`#8BD346`), replacing violet.
   - The T models' `T_Violet` material is now `T_Lime`, with its colour value changed and the geometry unchanged.
   - The previews and the generator script are updated to match.
   - Two files still show the old violet, as records only: `source/PRIM3_Level1_Editable.blend` (it needs Blender to edit) and `VALIDATION.json` (the supplier's original run).
   - Watch: R's teal is close to the squad's teal team glow in the Day and Night looks.
2. ~~T01~~ decided: level-two main arm; level one is technology control (see `T-LEVEL1-CONTROL-DRAFT.md`).

## Before production

This follows the kit's own README and `docs/prim3/ASSET-PIPELINE-PLAN.md` in `mcclusterishere/mccluster`:
- fit to the rigged mannequin and its sockets;
- refine, retopologise and UV-unwrap;
- bake maps and make LODs;
- test the poses.

No marks: none of the drafts carries the M, Dual Sight or `//`, and none may gain one except as a decal from the locked masters.
