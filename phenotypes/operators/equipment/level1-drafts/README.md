# PRIM3 / Level-one equipment draft kit

18 original procedural 3D blockouts • 3 roles × 6 slots • Blender 4.3.2

These are editable starting meshes, not finished production assets. No fal, Tripo, paid generation, external meshes or copied textures were used. Designed independently for this request. The older Black Signal kit was identified in conversation, but its source bytes were unavailable: compatibility with that kit or its characters has NOT been verified.

## Open and use

- Open `source/PRIM3_Level1_Editable.blend`. Each item has its own named collection, root empty, separate mesh parts and materials. The sheet layout is for browsing, not equipment mounting.
- Import one of the 18 `models/*.glb` files into Blender or your engine. Each export is individually centered and includes baked bevel geometry, named parts and PBR color materials; studio lights/camera are excluded.
- `previews/` contains front, back and three-quarter views of every item plus three contact sheets. Those are actual renders of the supplied geometry.
- `asset_manifest.json` maps IDs, slots, collections, paths and source bounds. `VALIDATION.json` records fresh GLB imports, finite geometry, positive bounds, part/triangle counts and material assignments.

## Roles and slots

| Slot | E / Entry / amber | R / Recon / teal | T / Technical / violet |
|---|---|---|---|
| Primary | E01 Entry carbine | R01 Precision carbine | T01 Technical carbine |
| Sidearm | E02 Compact backup | R02 Recon pistol | T02 Specialist backup |
| Specialist | E03 Blunt breach kit | R03 Evidence scanner | T03 Control terminal |
| Throwable | E04 Smoke capsule | R04 Sensor beacon | T04 Sync Pulse puck |
| Armor | E05 Reinforced entry armor | R05 Light recon armor | T05 Insulated technical armor |
| Utility | E06 Rescue harness pack | R06 Observation optic | T06 Repair module |

The slot arrangement is a proposal for the level-one art inventory, not a claim about implemented gameplay. No drone or higher-tier equipment is included. All devices and weapons are fictional exterior-only game props: no operating internals, manufacturing drawings or real equipment specifications.

## Coordinates and attachments

Blender source uses Z-up and front -Y; glTF exports Y-up and front +Z. Long primary silhouettes run along the source X axis. Units are meters at an **artistic** scale only. Origins are assembly-centered, not hand/character sockets. Where provided, `socket_mount` empties are suggested mounting locators, not fitted or verified rig attachments.

To attach: select the actual character bone/socket, establish a local offset in the target game, and test idle/walk/crouch/aim poses for intersections. Do not assume all assets share one usable offset. Armor is a hollow hard-shell draft, not skinned clothing; fit/retopology and weighting must be performed against the real mannequin. Rescue harness is a compact carried pack silhouette, not a wearable strap rig.

## Reproduce

With Blender 4.3+ installed:

```sh
blender -b --python source/build_equipment.py -- --out /path/to/new-output
blender -b --python /path/to/new-output/source/validate_equipment.py
```

The generator writes meshes, rendered previews, the Blender assembly and the manifest. It does not copy its own source or the validation script to the new folder: copy `source/validate_equipment.py` there before the second command, or run validation from this original kit after regenerating here. `--no-render` skips PNG rendering. Contact sheets were composed from the generated PNGs, not generated concept art.

## Claude refinement handoff

1. Inspect each asset and preserve the IDs/role palette. Work from the Blender collection or individual GLB, not from screenshots.
2. Fit armor and carried equipment to the actual character. Preserve distinct Entry/Recon/Technical silhouettes and six slots each.
3. Refine silhouette, edge hierarchy, seams, fasteners and role-specific details; these are deliberately simplified forms, not the desired final visual fidelity.
4. Retopologize, UV unwrap, bake appropriate maps and create LODs/collision proxies. Current materials are flat PBR assignments, not authored texture maps; the material name `Dark_Brushed_Metal` is a palette label, not a brushed texture.
5. Rig only where needed, establish hand grips/holsters/mount offsets, and test animations. Nothing in this kit is already rigged, animated or skin-weighted.
6. Verify mobile frame time, draw calls, download size and engine lighting. Current exports keep parts separate for editing, rather than optimizing draw calls.
7. Integrate into existing asset registry and loadouts only after checking current repository contracts. This package changes no repo, database, deployment, gameplay or billing state.

## Provenance and validation limits

Original procedural geometry authored for this request on 2026-11-02. Blender built-in primitives and original scripted shapes; no external model licenses or vendor assets involved. Reusable for the user's game development. Validation establishes structural importability, not final topology quality, skin compatibility, physics behavior, exact reproduction across Blender versions, or mobile production readiness. Render previews and geometry were visually inspected as draft blockouts.
