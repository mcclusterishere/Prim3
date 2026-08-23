---
status: PRODUCTION BRIEF
hybrid_name: Field-T Technical Operator
system: 3D asset pipeline — TreePo + suit assembly
version: 1.0.0
---

# Field-T — 3D asset brief (item-by-item)

Each row is **one exportable 3D asset**.  
Built for **TreePo AI** (generate each object alone) then a **suit-assembly AI** (snap objects to named sockets on the body).

## Pipeline rules
1. **One file = one object.** No combined “kit” meshes.
2. Every object has a **socket name** where it attaches on the suit.
3. Use exact **asset_id** strings below in filenames: `MCC_FT_<asset_id>`.
4. Units: **centimeters**. Origin: object resting pose, contact face down or back-to-body.
5. Style: matte institutional charcoal/black, minimal gloss, McCluster — not toy, not CoD cartoon, not consumer gadget rainbow.
6. Marks: leave a **flat decal region** (named UV island `mark_zone`) where M / Dual Sight can be applied later from masters — do not sculpt wrong logos into geometry.

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

## A. Worn body assets

### A1 — Base suit
| Field | Value |
|-------|--------|
| **asset_id** | `base_suit_charcoal` |
| **filename** | `MCC_FT_base_suit_charcoal` |
| **object** | Full-body technical field suit (shirt + trousers as one wearable or split upper/lower if tool requires) |
| **size** | Human adult male/female fit; design on neutral mannequin 175–185 cm |
| **materials** | Matte charcoal technical textile; subtle panel seams; no fashion drape |
| **details** | Flat pockets; cable pass loops at waist; no MOLLE garden |
| **socket** | Skin / body root (worn, not held) |
| **assembly** | First layer under all modules |

### A2 — Soft torso plate
| Field | Value |
|-------|--------|
| **asset_id** | `armor_soft_torso_thin` |
| **filename** | `MCC_FT_armor_soft_torso_thin` |
| **object** | Thin soft armor carrier, torso only |
| **size** | ~35 cm wide × 40 cm tall × 2–3 cm thick at plates; low bulk at shoulders |
| **materials** | Matte black textile + thin rigid insert read |
| **details** | One small `mark_zone` on upper left chest; two module strap points front |
| **socket** | `sock_torso_armor` |
| **assembly** | Snaps over base suit chest |

### A3 — Tactile gloves
| Field | Value |
|-------|--------|
| **asset_id** | `gloves_tactile_device` |
| **filename** | `MCC_FT_gloves_tactile_device` |
| **object** | Pair of device-work gloves (export pair or L/R) |
| **size** | Standard adult hand |
| **materials** | Matte dark elastomer palm, textile back |
| **details** | Thin fingertips; no hard knuckles |
| **socket** | `sock_glove_l` / `sock_glove_r` |

### A4 — Quiet-sole boots
| Field | Value |
|-------|--------|
| **asset_id** | `boots_field_quiet` |
| **filename** | `MCC_FT_boots_field_quiet` |
| **object** | Pair field boots |
| **size** | Adult; ankle height |
| **materials** | Matte black; rubber sole with shallow tread |
| **details** | Low profile; not paratrooper bulk |
| **socket** | `sock_boot_l` / `sock_boot_r` |

### A5 — Low-profile headset (optional)
| Field | Value |
|-------|--------|
| **asset_id** | `headset_low_profile` |
| **filename** | `MCC_FT_headset_low_profile` |
| **object** | Slim comms headset, no full helmet |
| **size** | Head-worn; mic boom short |
| **materials** | Matte black polymer + fabric pads |
| **socket** | Head bone / `sock_ear_comm` related |
| **note** | Never model as Prime M-helmet |

### A6 — Single knee pad (optional)
| Field | Value |
|-------|--------|
| **asset_id** | `pad_knee_single` |
| **filename** | `MCC_FT_pad_knee_single` |
| **object** | One knee pad |
| **size** | ~12 × 14 × 3 cm |
| **socket** | `sock_knee_r` (default right) |

---

## B. Weapon + carry

### B1 — Service pistol compact
| Field | Value |
|-------|--------|
| **asset_id** | `pistol_service_compact` |
| **filename** | `MCC_FT_pistol_service_compact` |
| **object** | Compact service sidearm only |
| **size** | ~18 cm overall length class |
| **materials** | Matte dark polymer + subdued metal |
| **details** | Clean institutional; no race gun optics party |
| **socket** | Nested in holster; or `sock_hip_holster_r` when holstered |

### B2 — Retention holster
| Field | Value |
|-------|--------|
| **asset_id** | `holster_retention` |
| **filename** | `MCC_FT_holster_retention` |
| **object** | Low-profile retention holster |
| **size** | Fits compact pistol |
| **materials** | Matte polymer / composite |
| **socket** | `sock_hip_holster_r` |
| **assembly** | Holster on hip; pistol parented inside holster |

---

## C. Always-on electronics

### C1 — Body recorder
| Field | Value |
|-------|--------|
| **asset_id** | `recorder_body_chest` |
| **filename** | `MCC_FT_recorder_body_chest` |
| **object** | Flat rectangular body camera / recorder |
| **size** | ~7 × 5 × 2.5 cm |
| **materials** | Matte black polymer; one lens glass |
| **details** | Small `mark_zone` on face; lens may suggest Dual Sight geometry without copying mark masters |
| **socket** | `sock_chest_recorder` |

### C2 — Team radio body unit
| Field | Value |
|-------|--------|
| **asset_id** | `radio_team_body` |
| **filename** | `MCC_FT_radio_team_body` |
| **object** | Compact torso radio brick |
| **size** | ~12 × 7 × 3.5 cm |
| **materials** | Matte charcoal polymer, short stub antenna |
| **socket** | `sock_radio_support` |

### C3 — In-ear / bone element
| Field | Value |
|-------|--------|
| **asset_id** | `radio_inear` |
| **filename** | `MCC_FT_radio_inear` |
| **object** | Single in-ear piece + thin wire or wireless bud |
| **size** | Ear scale |
| **socket** | `sock_ear_comm` |

---

## D. Cyberdecks (three variants — same family)

### D1 — Deck Standard
| Field | Value |
|-------|--------|
| **asset_id** | `deck_standard` |
| **filename** | `MCC_FT_deck_standard` |
| **object** | Rugged clamshell / slab laptop-class field deck |
| **size** | ~32 × 22 × 3.5 cm closed |
| **materials** | Matte charcoal hard shell; rubberized corners |
| **details** | Lid exterior `mark_zone` for small M; front edge status strip (geometry only); hinge rear; visible port door on right side |
| **ports (modeled)** | 2× rectangular data shutters, 1× round power, 1× cartridge bay mouth on front or side |
| **socket carried** | `sock_deck_sling` |
| **socket deployed** | `sock_deck_hand` or flat on prop surface |

### D2 — Deck Hardened
| Field | Value |
|-------|--------|
| **asset_id** | `deck_hardened` |
| **filename** | `MCC_FT_deck_hardened` |
| **object** | Same bounding box as Standard |
| **diff from Standard** | Deeper port covers (lids closed by default); thicker edge gasket; no bright status strip; darker shell |
| **socket** | same as Standard |
| **TreePo tip** | Generate as variant of Standard with “shielded sealed ports, darker RF shell, no LED strip” |

### D3 — Deck Lite
| Field | Value |
|-------|--------|
| **asset_id** | `deck_lite` |
| **filename** | `MCC_FT_deck_lite` |
| **object** | Thick tablet / half-slab |
| **size** | ~24 × 16 × 2.2 cm |
| **details** | One data port shutter; one power; small bay for Pocket Store; hand straps optional as separate asset if needed |
| **socket** | `sock_deck_hand` or flat chest clip `sock_module_chest_a` |

---

## E. Interface + integrity modules

### E1 — Interface Kit Primary (closed case)
| Field | Value |
|-------|--------|
| **asset_id** | `iface_primary_case` |
| **filename** | `MCC_FT_iface_primary_case` |
| **object** | Hard rectangular case, latch front |
| **size** | ~22 × 14 × 6 cm |
| **materials** | Matte grey-black hard case |
| **details** | Latch, hinge, subtle M `mark_zone`; interior not required for v1 if lid stays closed on suit |
| **socket** | `sock_module_belt_f` or `sock_thigh_l` |

### E2 — Interface tips tray (optional open-state prop)
| Field | Value |
|-------|--------|
| **asset_id** | `iface_primary_tips` |
| **filename** | `MCC_FT_iface_primary_tips` |
| **object** | Small tray with 4–5 distinct connector tips + coiled trunk cable |
| **size** | Fits inside case footprint |
| **use** | Only for detail shots / deployed desk scenes |
| **socket** | None on body; scene prop |

### E3 — Write-Block Bridge
| Field | Value |
|-------|--------|
| **asset_id** | `writeblock_bridge` |
| **filename** | `MCC_FT_writeblock_bridge` |
| **object** | Inline brick with two distinct faces |
| **size** | ~11 × 6 × 3 cm |
| **details** | One recessed LED lens (green when active); HOST label emboss side A; TARGET side B; short pigtail stubs or port mouths both ends |
| **socket** | `sock_module_chest_b` or clipped to deck when in use |
| **assembly** | On suit as stowed brick; can move to deck port in deployed pose |

### E4 — Imaging Stack
| Field | Value |
|-------|--------|
| **asset_id** | `imaging_stack` |
| **filename** | `MCC_FT_imaging_stack` |
| **object** | Thin sled / second brick that docks to deck edge |
| **size** | ~14 × 8 × 2.5 cm |
| **details** | Alignment rails; one status window; docks visually to deck front edge |
| **socket stowed** | `sock_module_belt_r` |
| **socket deployed** | Child of `deck_standard` dock empty |

### E5 — Integrity Dongle
| Field | Value |
|-------|--------|
| **asset_id** | `integrity_dongle` |
| **filename** | `MCC_FT_integrity_dongle` |
| **object** | Thumb-size token |
| **size** | ~5 × 2 × 1 cm |
| **details** | Cap + body; tiny `mark_zone` |
| **socket** | `sock_forearm_l` lanyard point or deck port park |

### E6 — Isolation Sleeve set
| Field | Value |
|-------|--------|
| **asset_id** | `isolation_sleeve` |
| **filename** | `MCC_FT_isolation_sleeve` |
| **object** | Flat Faraday pouch + separate small filter puck |
| **size** | Pouch ~18 × 12 cm flat; puck ~6 × 4 × 2 cm |
| **export** | Prefer **two assets**: `isolation_pouch`, `isolation_puck` if TreePo splits cleanly |
| **socket** | `sock_module_belt_r` or thigh |

---

## F. Offline stores (same family, three sizes)

### F1 — Store Standard
| Field | Value |
|-------|--------|
| **asset_id** | `store_standard` |
| **filename** | `MCC_FT_store_standard` |
| **object** | Thick SSD / cartridge brick |
| **size** | ~10 × 7 × 1.5 cm |
| **details** | Insertion bevel; wipe tab geometry; small M zone |
| **socket stowed** | `sock_module_chest_a` or belt |
| **socket seated** | Child of deck cartridge bay |

### F2 — Store Pocket
| Field | Value |
|-------|--------|
| **asset_id** | `store_pocket` |
| **filename** | `MCC_FT_store_pocket` |
| **object** | Slimmer cartridge |
| **size** | ~8 × 5 × 0.9 cm |
| **socket** | Chest pocket / Lite deck bay |

### F3 — Store Dual yoke
| Field | Value |
|-------|--------|
| **asset_id** | `store_dual_yoke` |
| **filename** | `MCC_FT_store_dual_yoke` |
| **object** | Frame holding **two** Standard cartridges |
| **size** | ~12 × 10 × 2.5 cm with cartridges installed |
| **assembly** | Yoke is one asset; instance `store_standard` ×2 into yoke sockets `bay_a` `bay_b` |
| **socket on body** | `sock_module_belt_f` |

---

## G. Sling / mounting hardware

### G1 — Deck sling
| Field | Value |
|-------|--------|
| **asset_id** | `sling_deck` |
| **filename** | `MCC_FT_sling_deck` |
| **object** | Short diagonal sling with deck clip plate |
| **socket** | Torso; deck clicks to clip plate (`sock_deck_sling`) |

---

## Loadout → asset checklist (assembly recipes)

### LIVE
`base_suit_charcoal` + `armor_soft_torso_thin` + `gloves_tactile_device` + `boots_field_quiet` + `holster_retention` + `pistol_service_compact` + `recorder_body_chest` + `radio_team_body` + `radio_inear` + `deck_standard` + `sling_deck` + `iface_primary_case` + `writeblock_bridge` + `store_standard`

### FORENSIC
LIVE swap: add `imaging_stack` + `integrity_dongle` + `store_dual_yoke` (+ 2× `store_standard`); optional `pad_knee_single`; keep writeblock mandatory

### RAPID
Swap deck → `deck_lite`; store → `store_pocket`; keep iface + pistol + recorder + radio; writeblock optional; no dual, no imaging stack

### DENIED
Swap deck → `deck_hardened`; add `integrity_dongle`; optional `isolation_sleeve`; Dual Sight marks muted (material/decal state, not new mesh)

---

## TreePo prompt skeleton (per item)

Use this pattern for each asset_id:

```
Single object, studio product shot style model reference, matte institutional charcoal/black materials,
McCluster field equipment, no logos sculpted in, clean hard-surface, real-world scale,
[OBJECT DESCRIPTION FROM TABLE], isolated object, no hands, no torso, no environment,
game-ready prop, sharp edges controlled, minimal bevels
```

Then assemble in the second AI using **socket ids** and the loadout recipes above.

---

## Priority build order (fewest assets → playable Field-T LIVE)

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

That set alone builds **LIVE**. Variants unlock FORENSIC / RAPID / DENIED.
