# PRIM3 Field equipment v01: canon loadout items

These are 18 separate GLBs of the actual LOADOUTS.md items, plus `catalog.json`. The set was supplied by the owner on 2026-11-02 as a single HTML viewer (`PRIM3-Field-Equipment.html`, made with ChatGPT). Each item is original procedural geometry, about 3–9k triangles; the whole set is 1.7 MB.

The items, with the role that carries each:

| Group | Items |
|---|---|
| Weapons | E compact carbine; R overwatch rifle; service sidearm (all); retention holster (all) |
| T equipment | field cyberdeck; interface kit; write-block bridge; offline storage; spare power |
| Observation and comms | R compact binoculars; team radio; E/R comms headset; body camera |
| E kit | entry tool and sheath; access pouch; medical pouch |
| R kit | optics pouch |
| Shared | E/R sling |

## What was kept

- **The models**, extracted byte-exact. All 18 match the SHA-256 in the viewer's own data.
- **The catalog:** id, name, role, category, the loadout item each one interprets, bounds, statistics and **sockets**.
  - Weapons carry `grip_r`, `grip_l`, `sling_front` and `sling_rear`.
  - Carried items carry their own socket, for example `sock_chest_recorder`.
  - These are what the rigged-mannequin pass needs (`mcclusterishere/mccluster` `docs/prim3/ASSET-PIPELINE-PLAN.md`).

## What was changed

- **`body-camera`:** the two red diagonal stripes under the record light were removed (88 triangles collapsed; geometry otherwise unchanged; record light kept). They read as the red `//` mark (LOADOUTS.md no-marks rule). Its preview was re-rendered from the edited model, and its sha256 in `catalog.json` was updated.

## What was not taken

- **The viewer page itself.** It types "PRIM3" in a font, but the owner-supplied lockup is the only PRIM3 mark. Its layout is a good pattern for the in-game inventory and the asset studio.

## How these relate to the other equipment sets

- **The `level1-drafts/` blockouts** were a different 18-slot proposal (E/R/T × primary, sidearm, specialist, throwable, armour, utility). This set follows the canon item list instead.
- **The photo-based image-to-3D pilot** in `mcclusterishere/mccluster` `assets/3d/prim3-operators/items/` is far more realistic but static: 40k triangles and no sockets.
- **The likely final path:** sockets and silhouettes from this set; surface realism from the photo-based generations or a texturing pass.
