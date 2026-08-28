---
status: CANON PRODUCTION RULE
system: Asset pipeline
version: 1.1.0
---

# Asset replication standard (do not break)

## The rule

Every asset in this world must be described clearly enough that **any model reading this repo** can regenerate **the same object** every time:

1. **Real-world dimensions** (cm)
2. **Four orthographic views**: Front · Back · Side A · Side B
3. Same materials, proportions, mount points, and institutional style

No vague “tactical brick.” No “roughly phone-sized.” If ChatGPT cannot draw the same prop four times from the repo text alone, the description is incomplete.

---

## Pipeline (locked order)

```
1. Write / read ASSET CARD in repo (this standard)
2. ChatGPT → four SEPARATE photos (one Front, one Back, one Side A, one Side B)
3. Tripo AI → GLB from those four files (multiview-to-model preferred)
4. Store GLB + cards + view PNGs in repo under assets/
5. Assemble kits later (sockets + phenotype skins)
```

Do not skip to assembly before cards and GLBs exist.

---

## Hierarchy

```
Phenotype (role)
  └── Skin (worn identity / loadout look)
        └── Objects (discrete 3D assets on that skin)
              └── Assembled kit (full recipe + dimensions + sockets)
```

- **Phenotype** = who they are (e.g. Field-T Technical Operator)
- **Skin** = which loadout look (e.g. LIVE / FORENSIC / RAPID / DENIED)
- **Object** = one mesh (deck, holster, write-block, boot…)
- **Assembled kit** = every object + where it sits on the body, in cm

---

## Required: Object Asset Card

Every single object gets its own card. Filename pattern:

`assets/canon/props/field-t/MCC_FT_<asset_id>/ASSET-CARD.md`

### Card must include

| Section | Required content |
|---------|------------------|
| **asset_id** | Stable id, e.g. `deck_standard` |
| **display_name** | Human name |
| **phenotype / skin** | Which role and loadouts use it |
| **real-world dimensions** | L × W × H in **cm** (and mass class if useful) |
| **form summary** | One tight paragraph: shape, silhouette, what it is |
| **materials** | Exact matte / gloss / textile / polymer language |
| **Front** | What you see looking at the primary face |
| **Back** | Opposite face |
| **Side A** | Defined once (e.g. left when object faces camera) |
| **Side B** | Opposite side |
| **mount / socket** | `sock_…` id and how it attaches |
| **mark_zone** | Where decals go; geometry must not invent logos |
| **do not** | Explicit anti-features |
| **ChatGPT prompts** | **Four separate prompt blocks** — one per view |
| **Tripo note** | Multiview from four files; face_limit if game mesh |
| **output filename** | `MCC_FT_<asset_id>.glb` |

### Dimension rule

- Always **centimeters**
- Bounding box is mandatory
- Worn items: mannequin height range **and** key panel sizes
- Thickness matters

### View rule

Each view section describes only that camera. Side A / Side B defined once per object.

---

## HARD RULE: One photo per view — never a contact sheet

**ChatGPT must generate four individual image files.**

| File | Content |
|------|--------|
| `front.png` | **Only** the Front view |
| `back.png` | **Only** the Back view |
| `side_a.png` | **Only** Side A |
| `side_b.png` | **Only** Side B |

### Forbidden
- One image that shows front + back + sides together
- “Reference sheet,” “turnaround sheet,” “character sheet,” “ortho sheet,” or “model sheet” layouts
- 2×2 grids, film strips, or labeled multi-panel cards
- Any second object in the frame

### Why
Tripo multiview expects **separate** view images. A multi-photo card confuses the model and breaks replication.

### How to prompt ChatGPT
- Run **four separate generations** (or four explicit single-view requests)
- Each prompt says: **single object, single camera angle, full frame, no other views in the image**
- Each prompt names exactly one view: Front **or** Back **or** Side A **or** Side B
- Do **not** ask for “front back left right in one image”

### Prompt line to include every time
```
ONE image only. ONE camera angle only. Do not show other sides. No contact sheet, no grid, no multi-view turnaround board, no labels for other angles.
```

---

## Required: Assembled Kit Card

Each skin/loadout gets a kit card:

`assets/canon/kits/field-t/LIVE/KIT-CARD.md` (example)

Same four-file rule for full-body kit turnarounds: **four separate photos**, not one sheet.

| Section | Required content |
|---------|------------------|
| **kit_id** | e.g. `FT_LIVE` |
| **phenotype** | Field-T Technical Operator |
| **skin name** | LIVE Exploitation |
| **mannequin** | Height range, stance |
| **layer order** | Base → armor → modules → hand/held |
| **object list** | Every asset_id |
| **socket map** | asset_id → sock_id + cm placement |
| **ChatGPT prompts** | Four separate full-body prompts (F/B/A/B) |
| **replicable checklist** | Same kit every time from this card |

---

## ChatGPT contract (summary)

1. One asset per generation  
2. **One view per image file**  
3. Four files total per asset: front, back, side_a, side_b  
4. Neutral studio, clean background  
5. No invented logos  
6. No multi-panel cards — ever  

---

## Tripo contract

1. Feed **four separate** view files into multiview-to-model when possible  
2. One GLB per asset_id  
3. Download immediately  
4. Store `MCC_FT_<asset_id>.glb` beside the card and `views/` folder  

---

## Repo layout (target)

```
assets/canon/props/field-t/MCC_FT_deck_standard/
  ASSET-CARD.md
  views/
    front.png      ← single view only
    back.png       ← single view only
    side_a.png     ← single view only
    side_b.png     ← single view only
  MCC_FT_deck_standard.glb
```

---

## Non-negotiables

1. Replicable every time from repo text  
2. Real-world dimensions in cm  
3. **Four separate photos per object — never one multi-view card**  
4. Objects first, assembly second  
5. Skins = objects + sockets  
6. Marks from masters only  
