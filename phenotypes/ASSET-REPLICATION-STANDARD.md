---
status: CANON PRODUCTION RULE
system: Asset pipeline
version: 1.0.0
---

# Asset replication standard (do not break)

## The rule

Every asset in this world must be described clearly enough that **any model reading this repo** can regenerate **the same object** every time:

1. **Real-world dimensions** (cm)
2. **Four orthographic views**: Front · Back · Side A · Side B
3. Same materials, proportions, mount points, and institutional style

No vague “tactical brick.” No “ roughly phone-sized.” If ChatGPT cannot draw the same prop four times from the repo text alone, the description is incomplete.

---

## Pipeline (locked order)

```
1. Write / read ASSET CARD in repo (this standard)
2. ChatGPT → four views of that exact asset (Front, Back, Side A, Side B)
3. Tripo AI → GLB from those views (image-to-model or multiview-to-model)
4. Store GLB + cards in repo under assets/
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
| **materials** | Exact matte/ gloss / textile / polymer language |
| **Front** | What you see looking at the primary face |
| **Back** | Opposite face |
| **Side A** | Usually operator-left or port side — say which |
| **Side B** | Opposite side |
| **mount / socket** | `sock_…` id and how it attaches |
| **mark_zone** | Where decals go; geometry must not invent logos |
| **do not** | Explicit anti-features (no MOLLE garden, no bright LEDs, etc.) |
| **ChatGPT image prompt block** | Copy-paste block that forces four consistent views |
| **Tripo note** | image-to-model vs multiview; face_limit if game mesh |
| **output filename** | `MCC_FT_<asset_id>.glb` |

### Dimension rule

- Always **centimeters**
- Bounding box is mandatory
- If the object is worn (boot, glove, suit), give **human scale** (e.g. fits 175–185 cm mannequin) **and** key panel sizes
- Thickness matters (armor depth, deck closed height)

### View rule (Front / Back / Side A / Side B)

Each view section answers:

- Silhouette
- Visible ports, latches, lenses, straps
- What must align across views (e.g. hinge always rear on deck)

Side A / Side B must be defined once per object (e.g. Side A = left when object faces you).

---

## Required: Assembled Kit Card

Each skin/loadout gets a kit card:

`assets/canon/kits/field-t/LIVE/KIT-CARD.md` (example)

### Kit card must include

| Section | Required content |
|---------|------------------|
| **kit_id** | e.g. `FT_LIVE` |
| **phenotype** | Field-T Technical Operator |
| **skin name** | LIVE Exploitation |
| **mannequin** | Height range, stance |
| **layer order** | Base suit → armor → belts → modules → hand/held |
| **object list** | Every asset_id in the kit |
| **socket map** | asset_id → sock_id + placement notes in cm from landmarks |
| **total bulk notes** | What must stay free (e.g. forearms for device work) |
| **ChatGPT full-body prompt block** | Assembled human + kit, four views |
| **replicable checklist** | Same kit every time if this card is followed |

---

## ChatGPT multiview contract

When generating pictures from a card:

1. One asset per generation set (never multiple props in one frame for Tripo source)
2. Neutral studio, clean background, no hands unless the card says worn-on-body
3. Same scale reference implied by cm in the card
4. Output **Front, Back, Side A, Side B** as four matched images
5. No invented logos — blank `mark_zone` only

Those four images feed **Tripo AI** (multiview-to-model preferred when all four exist).

---

## Tripo contract

1. One GLB per asset_id  
2. Prefer multiview from the four ChatGPT views  
3. Download immediately (URLs expire)  
4. Store as `MCC_FT_<asset_id>.glb` next to the asset card  
5. Do not merge objects into one GLB until **assembly** stage  

---

## Repo layout (target)

```
assets/canon/
  props/
    field-t/
      MCC_FT_deck_standard/
        ASSET-CARD.md
        views/  (front.png back.png side_a.png side_b.png)
        MCC_FT_deck_standard.glb
  kits/
    field-t/
      LIVE/
        KIT-CARD.md
      FORENSIC/
        KIT-CARD.md
```

Phenotype docs point here; they do not replace asset cards.

---

## Non-negotiables

1. **Replicable every time** — repo text is the source of truth  
2. **Real-world dimensions in cm**  
3. **Four views per object** before trusting a GLB  
4. **Objects first, assembly second**  
5. **Skins are lists of objects + sockets**, not vibes  
6. **Marks from masters only** — never AI-invented M or Dual Sight geometry  

If a description cannot drive identical Front/Back/Side A/Side B generations, expand the card until it can.
