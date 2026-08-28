---
status: PRODUCTION BRIEF
hybrid_name: Field-T Technical Operator
system: 3D asset pipeline — ChatGPT views + Tripo AI + suit assembly
version: 1.1.0
---

# Field-T — 3D asset brief (item-by-item)

**Authority:** Follow `phenotypes/ASSET-REPLICATION-STANDARD.md` first.  
This file lists objects and sockets. It does **not** override the photo rule.

## Photo rule (non-negotiable)

ChatGPT must produce **four separate image files** per object:

| File | Content |
|------|--------|
| `views/front.png` | Front only |
| `views/back.png` | Back only |
| `views/side_a.png` | Side A only |
| `views/side_b.png` | Side B only |

**Forbidden:** contact sheets, turnaround boards, 2×2 grids, multi-panel cards, front+back+sides in one image.

Each ChatGPT prompt includes:
```
ONE image only. ONE camera angle only. Do not show other sides. No contact sheet, no grid, no multi-view turnaround board, no labels for other angles.
```

Then **Tripo AI** builds one GLB from those four files (multiview preferred).

---

## Pipeline rules
1. **One file = one object mesh.** No combined “kit” meshes until assembly.
2. Every object has a **socket name** on the suit.
3. Filenames: `MCC_FT_<asset_id>`
4. Units: **centimeters**
5. Style: matte institutional charcoal/black, McCluster — not toy, not CoD cartoon
6. Marks: flat `mark_zone` only — no sculpted logos
7. **Four separate view photos before GLB**

### Suit socket map (assembly AI)
| Socket id | Body location |
|-----------|----------------|
| `sock_torso_armor` | Chest/torso over base suit |
| `sock_hip_holster_r` | Right hip (or mirror L) |
| `sock_chest_recorder` | Upper chest center-line |
| `sock_radio_support` | Support-side rib / plate edge |
| `sock_ear_comm` | Ear / under headset |
| `sock_deck_sling` | Torso diagonal sling rest / hand deploy |
| `sock_deck_hand` | Held in hands when deployed |
| `sock_module_chest_a` | Upper chest accessory bay |
| `sock_module_chest_b` | Mid chest accessory bay |
| `sock_module_belt_f` | Front belt |
| `sock_module_belt_r` | Rear / support belt |
| `sock_forearm_l` | Left forearm |
| `sock_forearm_r` | Right forearm |
| `sock_thigh_l` | Left thigh flat |
| `sock_knee_r` | Right knee (optional pad) |
| `sock_boot_l` / `sock_boot_r` | Feet |
| `sock_glove_l` / `sock_glove_r` | Hands |

---

## Object list (asset_ids)

Each of these needs its own **ASSET-CARD.md** + four view PNGs + one GLB.  
Do not generate a “kit sheet” image for any of them.

### Worn
- `base_suit_charcoal` — full technical suit; mannequin 175–185 cm
- `armor_soft_torso_thin` — ~35 × 40 × 2–3 cm
- `gloves_tactile_device`
- `boots_field_quiet`
- `headset_low_profile` (optional)
- `pad_knee_single` (optional) — ~12 × 14 × 3 cm

### Weapon
- `pistol_service_compact` — ~18 cm overall
- `holster_retention`

### Always-on electronics
- `recorder_body_chest` — ~7 × 5 × 2.5 cm
- `radio_team_body` — ~12 × 7 × 3.5 cm
- `radio_inear`

### Decks
- `deck_standard` — ~32 × 22 × 3.5 cm closed
- `deck_hardened` — same box, sealed ports
- `deck_lite` — ~24 × 16 × 2.2 cm

### Modules
- `iface_primary_case` — ~22 × 14 × 6 cm
- `iface_primary_tips` — scene prop only
- `writeblock_bridge` — ~11 × 6 × 3 cm
- `imaging_stack` — ~14 × 8 × 2.5 cm
- `integrity_dongle` — ~5 × 2 × 1 cm
- `isolation_pouch` / `isolation_puck` — split preferred

### Stores / sling
- `store_standard` — ~10 × 7 × 1.5 cm
- `store_pocket` — ~8 × 5 × 0.9 cm
- `store_dual_yoke` — holds two standards
- `sling_deck`

---

## Loadout recipes (assembly only — not photo sheets)

These are **lists of asset_ids** for later assembly.  
They are **not** instructions to draw a multi-item turnaround in one image.

### LIVE
`base_suit_charcoal` + `armor_soft_torso_thin` + `gloves_tactile_device` + `boots_field_quiet` + `holster_retention` + `pistol_service_compact` + `recorder_body_chest` + `radio_team_body` + `radio_inear` + `deck_standard` + `sling_deck` + `iface_primary_case` + `writeblock_bridge` + `store_standard`

### FORENSIC
LIVE + `imaging_stack` + `integrity_dongle` + `store_dual_yoke` (+ 2× `store_standard`); optional `pad_knee_single`

### RAPID
Swap to `deck_lite` + `store_pocket`; writeblock optional; no dual/imaging

### DENIED
Swap to `deck_hardened` + `integrity_dongle`; optional isolation; marks muted

**Full-body kit photos (when needed):** still **four separate files** (front/back/side_a/side_b of the dressed mannequin). Never one contact sheet of the whole kit.

---

## ChatGPT prompt skeleton (one view per run)

```
Single object only. Studio product photo. Clean neutral background.
Matte institutional charcoal/black hard-surface prop. Real-world scale.
[PASTE form + dimensions from ASSET-CARD].
Camera: [FRONT | BACK | SIDE A | SIDE B] only.
ONE image only. ONE camera angle only. Do not show other sides.
No contact sheet, no grid, no multi-view turnaround board, no labels for other angles.
No logos sculpted in. No hands. No second object.
```

Run **four times** per asset_id. Save as `front.png` / `back.png` / `side_a.png` / `side_b.png`.

---

## Tripo

Feed the **four separate** view files. One GLB: `MCC_FT_<asset_id>.glb`. Download immediately.

---

## Priority build order (LIVE)

1. `base_suit_charcoal`  
2. `armor_soft_torso_thin`  
3. `pistol_service_compact` + `holster_retention`  
4. `deck_standard`  
5. `sling_deck`  
6. `iface_primary_case`  
7. `writeblock_bridge`  
8. `store_standard`  
9. `recorder_body_chest`  
10. `radio_team_body` + `radio_inear`  
11. `gloves_tactile_device`  
12. `boots_field_quiet`  
