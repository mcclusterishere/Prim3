---
ai_reader: PRIMARY_SPEC_FILE
system: Prim3 field kit physical specifications
version: 1.0.0
unit: millimeters unless noted
---

# Asset physical specifications

Each block is self-contained metadata for ChatGPT / Tripo / any 3D pipeline.

---

## DECK-STD — Field cyberdeck (standard)

```yaml
asset_id: DECK-STD
class: Field-T
role: primary_compute
based_on:
  - Raspberry Pi 5 SBC geometry as internal brain
  - Portable cyberdeck slab form (RPI_DEV / SimpleDeck community)
photo_refs:
  - https://www.raspberrypi.com/products/raspberry-pi-5/
  - https://github.com/sector07-dev/RPI_DEV
  - https://github.com/pgattic/simpledeck
  - https://www.raspberrypi.com/
```

### Physical description (for image gen)
A thick rectangular **slab computer** about the footprint of a small 13–14″ laptop but thicker and denser. Matte charcoal/black polymer or powder-coated aluminum shell. No glossy consumer laptop lid logo. One short edge has a dense **port cluster**: USB-C, USB-A, Ethernet-style RJ45, small HDMI, and a row of exposed GPIO-style pins under a rubber dust flap. Opposite short edge has a **sling/D-ring** and a recessed power button. Top face is mostly flat with a dark matte display bezel (display may be closed/covered in field shots). Bottom has shallow rubber feet and a battery door seam. Optional muted institutional stripe (ivory, 4 mm) along one long edge only — no bright RGB.

### Dimensions (assembled deck target)
| Part | mm |
|------|-----|
| Overall length | 320 |
| Overall width | 220 |
| Overall thickness (closed) | 45 |
| Display diagonal (if open) | ~330 (13") class |
| Port cluster depth protrusion | 8 |
| Sling D-ring ID | 12 |

### Internal brain reference (not always visible)
**Raspberry Pi 5 board** (official):
- Board: **85.6 × 56.5 mm** (approx height with components ~15–21 mm)
- Weight board only: ~46–50 g
- Official case (ref only): ~98.5 × 70.3 × 33 mm

### Materials
- Shell: matte ABS / nylon or soft-touch PC; non-reflective
- Ports: dark metal / black plastic
- Screws: black hex, recessed
- Never: Apple/Dell/HP chrome logos, transparent RGB acrylic

### Views required
`DECK-STD_front` · `DECK-STD_back` · `DECK-STD_sideA` · `DECK-STD_sideB`

---

## DECK-LITE — Rapid / pocket deck

```yaml
asset_id: DECK-LITE
class: Field-T
role: rapid_compute
based_on:
  - Raspberry Pi Zero 2 W scale as core
  - Pocket cyberdeck / slate form
photo_refs:
  - https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/
  - https://datasheets.raspberrypi.com/rpizero2/raspberry-pi-zero-2-w-product-brief.pdf
```

### Physical description
A **hand-sized slate**: thick phone / thin tablet hybrid. Matte black. USB-C on bottom edge, mini display on face (or blank armored faceplate for DENIED look). Belt/plate clip on back. Far fewer ports than DECK-STD. Can be held in one hand.

### Dimensions
| Part | mm |
|------|-----|
| Overall length | 140 |
| Overall width | 80 |
| Thickness | 22 |
| Clip protrusion | 6 |

### Core board reference
**Raspberry Pi Zero 2 W**: **65 × 30 mm** board; ~68 × 32 mm with connectors.

### Views
`DECK-LITE_front` · `DECK-LITE_back` · `DECK-LITE_sideA` · `DECK-LITE_sideB`

---

## DECK-HARD — Denied / hardened deck

```yaml
asset_id: DECK-HARD
class: Field-T
role: low_emission_compute
based_on: DECK-STD geometry + Faraday-leaning sleeve aesthetic
photo_refs: same as DECK-STD plus muted military tablet language
```

### Physical description
Same outer envelope as DECK-STD but **no visible status LEDs** until a panel is opened. Corners slightly more armored. Optional fabric/elastic Faraday sleeve shown in separate prop shot (dark mesh/fabric, conductive sheen, not shiny). Dual Sight marks absent or painted over.

### Dimensions
Same as DECK-STD (+2 mm thickness if sleeve on).

### Views
`DECK-HARD_front` · `DECK-HARD_back` · `DECK-HARD_sideA` · `DECK-HARD_sideB`

---

## WRITEBLOCK — Write-block bridge

```yaml
asset_id: WRITEBLOCK
class: Field-T
role: forensic_integrity
based_on: inline USB/SATA bridge brick (hardware write-blocker product category)
software_identity: Guymager / Sleuth Kit imaging capability
photo_refs:
  - http://guymager.sourceforge.net
  - https://www.sleuthkit.org/
  - https://www.sleuthkit.org/autopsy/
  - https://bitcurator.github.io/documentation/All%20Step-by-Step%20Guides/Imaging%20and%20Recovery%20Guides/Imaging%20with%20Guymager/
```

### Physical description
Palm-sized **rectangular brick** between cable runs. Matte black plastic or aluminum. One end: USB-C or USB-A host. Other end: SATA data + power or USB device. Single **status LED** (armed = dim green, blocked = amber). Engraved or printed “INTEGRITY” or blank institutional text — no commercial brand.

### Dimensions
| Part | mm |
|------|-----|
| Length | 75 |
| Width | 40 |
| Height | 18 |
| Cable stub length (each side) | 80 |

### Views
`WRITEBLOCK_front` · `WRITEBLOCK_back` · `WRITEBLOCK_sideA` · `WRITEBLOCK_sideB`

---

## IMG-STORE — Dual imaging store (SSD pair)

```yaml
asset_id: IMG-STORE
class: Field-T
role: forensic_bulk_storage
based_on: 2.5″ SSD in rugged external enclosures
photo_refs:
  - typical 2.5" USB SSD enclosure product photos (generic aluminum)
software_identity: Guymager / Autopsy acquisition targets
```

### Physical description
Two identical **rugged SSD bricks** labeled A and B, short tether or Y-cable to deck. Aluminum shell, black rubber end caps, USB-C. LED activity pinhole. Institutional stencil “STORE-A” / “STORE-B”.

### Dimensions (each unit)
| Part | mm |
|------|-----|
| Length | 128 |
| Width | 79 |
| Height | 15 |
| Combined pouch footprint | 130 × 85 × 35 |

(Reference: common 2.5″ tool-free enclosures ~128 × 79 × 15 mm.)

### Views
`IMG-STORE_front` · `IMG-STORE_back` · `IMG-STORE_sideA` · `IMG-STORE_sideB` (show pair or single consistently — prefer **single unit** + separate pair assembly shot only if requested)

---

## SEAL-DONGLE — Integrity seal dongle

```yaml
asset_id: SEAL-DONGLE
class: Field-T
role: take_seal
based_on: USB thumb device / security key form
```

### Physical description
USB-C (or USB-A) **thumb device**, 50 mm long, matte black body, single ivory band 3 mm from tip. No commercial logo. Slightly heavier visual weight than a cheap flash drive (ceramic/metal feel).

### Dimensions
| Part | mm |
|------|-----|
| Length (including connector) | 52 |
| Width | 18 |
| Thickness | 8 |

### Views
`SEAL-DONGLE_front` · `SEAL-DONGLE_back` · `SEAL-DONGLE_sideA` · `SEAL-DONGLE_sideB`

---

## SDR-BRICK — RF sense brick (Field-R)

```yaml
asset_id: SDR-BRICK
class: Field-R
role: rf_situational_awareness
based_on: RTL-SDR Blog V4 class USB SDR dongle + short antenna
photo_refs:
  - https://www.rtl-sdr.com/about-rtl-sdr
  - https://www.rtl-sdr.com/v4/
  - https://osmocom.org/projects/rtl-sdr/wiki
  - https://github.com/osmocom/rtl-sdr
  - https://www.gnuradio.org/
  - https://www.kismetwireless.net/
```

### Physical description
**Aluminum USB dongle** body, conductive black/dark grey metal, SMA female antenna port on the end opposite USB-A male. Short stub or telescoping monopole antenna attached for hero shots. Tiny bias-tee LED window optional. USB-A plugs into deck or a short pigtail to a belt brick. Look dense and tool-like, not toy.

### Dimensions
| Part | mm |
|------|-----|
| Dongle body length (ex USB) | ~70 |
| Body width | ~28 |
| Body height | ~14 |
| Full length including USB-A | ~95 |
| SMA antenna stub (stowed) | 80 |
| Weight class | ~40–60 g |

(Amazon listing class: product box ~70 × 135 × 15 mm for dongle packaging; body is USB-stick scale in aluminum.)

### Views
`SDR-BRICK_front` · `SDR-BRICK_back` · `SDR-BRICK_sideA` · `SDR-BRICK_sideB`

---

## UAV-MICRO — Micro quad (optional Field-R)

```yaml
asset_id: UAV-MICRO
class: Field-R
role: mobile_perimeter_sensor
based_on: small quadcopter + open autopilot (ArduPilot / PX4) identity
photo_refs:
  - https://github.com/ArduPilot/ardupilot
  - https://ardupilot.org
  - https://docs.px4.io/
flight_controller_ref:
  - Pixhawk-class FC: ~81.5 × 50 × 15.5 mm, ~38 g (legacy Pixhawk overview)
  - Modern FC module example: ~39 × 32 × 15 mm class
```

### Physical description
Folded **ultralight quadcopter**, institutional matte black arms, no bright racing colors. Props folded along arms. Camera module under belly (small). No toy stickers. Fits in a soft pouch ~200 × 150 × 50 mm when folded.

### Dimensions (flight-ready approximate)
| Part | mm |
|------|-----|
| Diagonal motor-to-motor | 180 |
| Height (props level) | 45 |
| Folded length | 160 |
| Folded width | 80 |
| Folded height | 50 |

### Views
`UAV-MICRO_front` · `UAV-MICRO_back` · `UAV-MICRO_sideA` · `UAV-MICRO_sideB`

---

## CARRIER-E — Soft-mid plate carrier (Field-E)

```yaml
asset_id: CARRIER-E
class: Field-E
role: armor_platform
based_on: low-profile plate carrier silhouette (DIY/SAPI-cut pattern culture)
note: silhouette and materials only — not a branded real carrier
```

### Physical description
Low-profile **plate carrier**, black Cordura-like fabric, minimal MOLLE on front (2–3 rows), institutional ID panel (blank or Dual Sight muted), shoulder straps with thin padding, cummerbund. No huge kangaroo overload. Looks professional institutional, not operator Instagram.

### Dimensions (worn ref)
| Part | mm |
|------|-----|
| Front panel height | 320 |
| Front panel width | 280 |
| Thickness with soft plates | 40 |
| Shoulder strap width | 50 |

### Views
`CARRIER-E_front` · `CARRIER-E_back` · `CARRIER-E_sideA` · `CARRIER-E_sideB`

---

## IFAK-E — Med pouch

```yaml
asset_id: IFAK-E
class: Field-E
role: stabilize
based_on: civilian IFAK / trauma pouch form
```

### Physical description
Rectangular zippered pouch, marked with subdued medical cross (grey on black), MOLLE straps on back, ~ horizontal belt mount. Contents not spilled unless requested.

### Dimensions
| Part | mm |
|------|-----|
| Length | 150 |
| Width | 100 |
| Depth | 60 |

### Views
`IFAK-E_front` · `IFAK-E_back` · `IFAK-E_sideA` · `IFAK-E_sideB`

---

## BINOC-R — Compact binoculars (Field-R)

```yaml
asset_id: BINOC-R
class: Field-R
role: optical_scan
```

### Physical description
Compact roof-prism binoculars, rubber armored matte black, no chrome. Center focus wheel. Lens caps optional on strap.

### Dimensions
| Part | mm |
|------|-----|
| Length | 120 |
| Width (hinge open mid) | 110 |
| Height | 45 |

### Views
`BINOC-R_front` · `BINOC-R_back` · `BINOC-R_sideA` · `BINOC-R_sideB`

---

## Software-only identities (UI overlays, not physical meshes)

These are **not** separate 3D bodies; use for screen content on DECK-STD when UI is visible:

| ID | URL | Notes |
|----|-----|-------|
| Wireshark | https://www.wireshark.org/ | Packet list UI — rebrand colors |
| Nmap | https://nmap.org/ | Terminal scan output |
| Autopsy | https://www.sleuthkit.org/autopsy/ | Case tree UI |
| Guymager | http://guymager.sourceforge.net | Imaging progress UI |
| GNU Radio | https://www.gnuradio.org/ | Flowgraph aesthetic |
| Kismet | https://www.kismetwireless.net/ | Device list / RF UI |

---

## Stats-only (no FOSS build refs)

| asset_id | Note |
|----------|------|
| SIDEARM-F | Compact service pistol silhouette — game stats only |
| PRIMARY-E | Short SMG/carbine — game stats only |
| DMR-OPTIC-R | Long optic on light primary — glass can be modeled; weapon stats only |

---

## Global Prim3 material overrides
- Primary: matte black / charcoal (#1a1a1a–#2a2a2a)
- Accent: ivory muted (#e8e4d9) thin marks only
- Warning: constrained red only on med cross or sealed evidence tags
- No RGB gaming glow
- No real brand wordmarks on final assets
