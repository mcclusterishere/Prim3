---
status: PROPOSED
hybrid_name: Field-T Technical Operator
system: Field module hardware
version: 1.0.0
---

# Field-T — module hardware detail

Every tech module is a **named physical object** with form factor, ports, and limits.  
Built for game inventory + story props + real-feeling institutional kit.

Parent loadouts: `LOADOUTS-ITEMIZED.md`

---

## 1. MCC Cyberdeck — Field Standard
**Slot:** Primary compute  
**Used in:** LIVE, FORENSIC

| Spec | Detail |
|------|--------|
| Form | Rugged slab, ~13–14" class footprint, matte charcoal housing |
| Carry | Chest/shoulder sling or short desk deploy; not a backpack tower |
| Screen | Matte, low-glare; readable in server-room lighting |
| Power | Hot-swap battery brick + one spare in suit pouch |
| Ports | 2× high-speed data, 1× management, 1× power pass-through |
| Storage bay | Accepts one Offline Store cartridge inline |
| OS posture | Offline-capable mission image; no personal cloud |
| Marks | Small exact M on lid; Dual Sight at hinge or status strip |
| Limits | Not emission-hardened; not the lightest; default workhorse |

**Game item id:** `deck_standard`

---

## 2. MCC Cyberdeck — Field Hardened
**Slot:** Primary compute  
**Used in:** DENIED

| Spec | Detail |
|------|--------|
| Form | Same silhouette as Standard so asset reuse is possible; darker RF-aware shell |
| Carry | Same sling/deploy |
| Emissions | Shielded chassis; radios default to minimum; external radios preferred for team voice |
| Ports | Fewer always-on radios; physical port covers; intentional “open port” action |
| Storage bay | Same Offline Store cartridge |
| Behavior | Forces explicit connect actions; no promiscuous auto-discover |
| Marks | Subdued M; no bright status flash by default |
| Limits | Slightly heavier UI friction; slower “spray and pray” scanning |

**Game item id:** `deck_hardened`

---

## 3. MCC Cyberdeck — Field Lite
**Slot:** Primary compute  
**Used in:** RAPID

| Spec | Detail |
|------|--------|
| Form | Half-slab / thick tablet class; one-hand deploy |
| Carry | Hand + short tether or flat chest mount |
| Ports | 1× primary data, 1× power; minimal |
| Storage bay | Pocket Store only (no Dual) |
| Behavior | Fast triage apps only; limited deep imaging |
| Marks | Tiny M; Dual Sight optional on mount |
| Limits | Cannot run full Imaging Stack workflow; built for “get the slice and go” |

**Game item id:** `deck_lite`

---

## 4. MCC Interface Kit — Primary
**Slot:** Tech module  
**Used in:** LIVE, RAPID, DENIED (and FORENSIC if needed)

| Spec | Detail |
|------|--------|
| Form | Hard case ~softback book size; opens to cable reel + tip tray |
| Contents | 1× trunk cable; tip set for common enterprise ports; 2× short jumpers; 1× USB-class bridge; 1× serial/admin adapter |
| Labels | McCluster grey/white tags; no rainbow consumer mess |
| Carry | Clips to belt or deck sling |
| Use action | “Select tip → seat connector → link to deck” |
| Limits | No exotic industrial bus tips (those live in Extended, if ever issued) |

**Game item id:** `iface_primary`  
**Asset note:** One case mesh; tips can be texture variants.

---

## 5. MCC Interface Kit — Extended
**Slot:** Tech module (rare)  
**Used in:** Special LIVE / high-value only

| Spec | Detail |
|------|--------|
| Form | Same case family as Primary; second color stripe on latch |
| Contents | Primary set **plus** 2–3 rare connectors; longer trunk; one media converter puck |
| Carry | Heavier; costs a module slot |
| Limits | Not in RAPID; slows movement; Field-E will complain if it snags |

**Game item id:** `iface_extended`

---

## 6. MCC Write-Block Bridge
**Slot:** Tech module  
**Used in:** LIVE (ready), FORENSIC (mandatory), DENIED (mandatory), RAPID (optional)

| Spec | Detail |
|------|--------|
| Form | Palm-sized inline brick; one “host” face, one “target” face |
| Indicators | Physical write-block LED (green = blocked); cannot be software-faked in-fiction |
| Cables | Short fixed pigtails or uses Interface Kit trunk |
| Behavior | All imaging traffic passes through; write attempts fail closed |
| Carry | Deck pouch or Interface case slot |
| Limits | Adds seconds per connect; RAPID may skip only with explicit risk flag |

**Game item id:** `writeblock`  
**Story rule:** If this light is off during “forensic” claims, the take is contaminated.

---

## 7. MCC Imaging Stack
**Slot:** Tech module  
**Used in:** FORENSIC

| Spec | Detail |
|------|--------|
| Form | Second brick or thin sled that docks to deck + Write-Block |
| Function | Sector image / selective volume capture; progress % on deck |
| Pairing | Requires Write-Block Bridge inline |
| Output | Writes only to Offline Store cartridges |
| Carry | Docked to deck when active; stowed on sling when moving |
| Limits | Not for live lateral movement; operator stays put while imaging |

**Game item id:** `imaging_stack`

---

## 8. MCC Offline Store — Standard
**Slot:** Tech module / storage  
**Used in:** LIVE, DENIED

| Spec | Detail |
|------|--------|
| Form | Thick cartridge / SSD brick; slides into deck bay or hangs on data leash |
| Capacity | “One serious take” fiction unit (not consumer TB marketing) |
| Encryption | At-rest key tied to mission profile |
| Marks | Small M + mission wipe tab |
| Limits | One primary; loss of cartridge = loss of take |

**Game item id:** `store_standard`

---

## 9. MCC Offline Store — Dual
**Slot:** Tech module / storage  
**Used in:** FORENSIC

| Spec | Detail |
|------|--------|
| Form | Twin cartridges in a yoke or linked pair |
| Function | Mirror or split: primary + redundant |
| Behavior | Integrity Dongle can cross-check both |
| Carry | Heavier; costs space |
| Limits | Not for RAPID |

**Game item id:** `store_dual`  
**Asset note:** Reuse Standard cartridge mesh ×2 + yoke.

---

## 10. MCC Offline Store — Pocket
**Slot:** Tech module / storage  
**Used in:** RAPID

| Spec | Detail |
|------|--------|
| Form | Single slim cartridge; fits Lite deck or chest pocket |
| Capacity | “One high-value slice” only |
| Behavior | Forces selective collection |
| Limits | Cannot hold full Forensic mirror |

**Game item id:** `store_pocket`

---

## 11. MCC Integrity Dongle
**Slot:** Tech module  
**Used in:** FORENSIC, DENIED

| Spec | Detail |
|------|--------|
| Form | Thumb-size hardware token; USB-class or deck pogo |
| Function | Hash / sign manifest of what was collected; time-stamp helper |
| Pairing | Works with Offline Store + deck mission log |
| Carry | Lanyard or deck port park |
| Limits | Does not collect data; only proves what you claim you collected |

**Game item id:** `integrity_dongle`

---

## 12. MCC Isolation Sleeve
**Slot:** Tech module (authorized only)  
**Used in:** DENIED

| Spec | Detail |
|------|--------|
| Form | Faraday-style pouch + small inline filter puck (two-piece) |
| Function | Park a seized drive/phone or quiet a noisy link; not a magic “hack win” button |
| Use | Explicit deploy action; blocks wireless on bagged device |
| Limits | Does not replace Hardened deck; overuse is a tell |

**Game item id:** `isolation_sleeve`

---

## 13. MCC Body Recorder — Chest / Deck-link
**Slot:** Universal recorder  
**Used in:** All

| Spec | Detail |
|------|--------|
| Form | Flat chest unit or deck-synced puck |
| Function | Continuous mission AV + event markers |
| Link | Local store; optional deck sync |
| Marks | Lens may echo Dual Sight geometry |
| Limits | Always on for Field-T; “forgot to record” is a discipline fail |

**Game item id:** `body_recorder`

---

## 14. MCC Team Radio — Short + In-ear
**Slot:** Universal comms  
**Used in:** All

| Spec | Detail |
|------|--------|
| Form | Compact body radio + bone or in-ear element |
| Function | Team net only; brevity preferred |
| DENIED behavior | Minimum traffic profile |
| RAPID behavior | High-tempo allowed |
| Limits | Not a public cell phone; no personal music fantasy |

**Game item id:** `team_radio`

---

## Hardware by loadout (quick matrix)

| Module | LIVE | FORENSIC | RAPID | DENIED |
|--------|------|----------|-------|--------|
| Deck Standard | ● | ● | — | — |
| Deck Hardened | — | — | — | ● |
| Deck Lite | — | — | ● | — |
| Interface Primary | ● | ○ | ● | ● |
| Interface Extended | ○ | ○ | — | — |
| Write-Block | ○ ready | ● mandatory | ○ optional | ● |
| Imaging Stack | — | ● | — | — |
| Store Standard | ● | — | — | ● |
| Store Dual | — | ● | — | — |
| Store Pocket | — | — | ● | — |
| Integrity Dongle | — | ● | — | ● |
| Isolation Sleeve | — | — | — | ○ auth |
| Body Recorder | ● | ● | ● | ● |
| Team Radio | ● | ● | ● | ● min |

● = equipped  ○ = optional / conditional  — = not used

---

## Interaction verbs (game)

| Item | Player verbs |
|------|----------------|
| Cyberdeck | Deploy, stow, unlock mission image |
| Interface Kit | Open, select tip, connect, disconnect |
| Write-Block | Inline, verify LED, remove |
| Imaging Stack | Start image, pause, seal to store |
| Offline Store | Seat, eject, hand to Lead for exfil |
| Integrity Dongle | Sign manifest |
| Isolation Sleeve | Bag device, unbag |

---

## Asset reuse map

| Shared mesh | Variants |
|-------------|----------|
| Cyberdeck body | Standard / Hardened skin / Lite scale |
| Store cartridge | Standard / Pocket scale; Dual = 2× + yoke |
| Interface case | Primary / Extended latch stripe |
| Brick modules | Write-Block, Imaging Stack, Isolation puck (related family) |

This keeps the “far less assets than CoD” rule while still feeling item-specific.
