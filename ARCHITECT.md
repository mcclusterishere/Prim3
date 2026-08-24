# PRIM3 MULTIVERSE — GAME ARCHITECT BIBLE

**Branch:** `foundation/season-one-canon`  
**Purpose:** Single entry point for narrative + systems + multi-game development.  
**Status:** Living canon index — read this first, then follow links.

---

## 0. What we are building

Three playable products in one continuity, plus watchable micro-series lanes.

| Product | Fantasy | Default play | Music / show |
|---------|---------|--------------|--------------|
| **Prim3** | Institutional IT / systems operators | XCOM-style turn-based tactical | Prim3 catalog (Patch Work, Hats, OSINT, RAID, Ghost, …) |
| **Hitman** | Brute-force kill-religion, street multinational | CoD-like / **mobile FPS**, high death | Hitshake, Crimewave, Hit-Mode, … (@hitman.halo) |
| **Whip Equipped** | Gig driver → dealership; car as home | **Mobile racing / car progression** (NFS energy) | Later; Bridgeport-set |

**Watch mode:** Prim3 (and optionally Hitman) as ~6-minute episodes; play optional.  
**Real-world layer:** Whip Equipped also = delivery + rental app brand; Prim3 = educational cyber culture + game + series.

---

## 1. Narrative spine (one continuity)

### 1.1 Prim3 myth
- Micro-series: ~**6 min** episodes, **3 per season**, season count follows song inventory (not forced to 7).
- Episode shape: **Opening op** → **Cohort support** → **Progression tick + sting**.
- Early ops starred by **Prime**; later by **protagonist** after agency unlock.
- Protagonist cycles **13 phenotypes** slowly (seat / clearance / role cycle / agency).
- **Hitman** is the kinetic opposite board; Prime double-agents; they fight when he needs cover, cull, or mask.
- **Evil Twin** (season-end): Prime confesses origin embed into Hitman (SIM swap chain → Sponsor).
- **RAID**: protagonist attacks Prime (final mission structure).
- **Ghost in the Wires**: default close — upload Prime into the system; forever mentor; shared rule.

### 1.2 Hitman myth (Benji)
- Protagonist: **Hitman Benji** — Bridgeport/CT energy, 21, college dropout, drug sales through school, **nerd + savage**.
- **6 episodes only** (~one semester): takes over Hitman by outsmarting pure street leadership.
- S1: Headed to the Top → Crimewave → **Hitshake (initiation)**.
- S2: Hit-Mode → Mr. Rogers → **Up for Days (takeover)**.
- Culture: killing as religion, deniable global drops, gang mitosis, uses intel does not worship terminals.

### 1.3 Ending branches
| Choice | Result |
|--------|--------|
| **Do not kill Prime** | Ghost path — AI mentor, wires |
| **Kill Prime** | Dimension → kill alt-self → **Whip Equipped** |

### 1.4 Whip Equipped entry
- Worse America: that world’s Prime died years earlier; economy wrecked.
- He lives in his **car**, sleeps through winter in the **same Bridgeport parking lot** he used to **sell** from in the prior life.
- Climb: gig delivery → shady deals + street racing → dealership.
- Real map: **Bridgeport, CT**.

---

## 2. Document map (read order for architects)

### Story (required)
| Path | Contents |
|------|----------|
| `story/SERIES-ARC.md` | Format, dual brand, hard locks |
| `story/SONG-CATALOG.md` | 16 Prim3 tracks + RAID/Ghost/Evil Twin |
| `story/PROGRESSION.md` | Company advancement rules |
| `story/missions/EVIL-TWIN.md` | Season-end confession mission |
| `story/DUAL-PATH.md` | Why Prim3 and Hitman clash |
| `story/HITMAN-LORE.md` | Brute religion, not IT |
| `story/HITMAN-BRAND.md` | HM + AMMC + halo |
| `story/HITMAN-ORG.md` | Kinetic ranks |
| `story/HITMAN-BENJI.md` | Full 6-ep lock |
| `story/HITMAN-SONGS.md` | Track list + Parking Lot note |
| `story/ENDING-BRANCHES.md` | Ghost vs kill |
| `story/WHIP-EQUIPPED-BRIDGE.md` | Bridgeport lot + car product bridge |

### Game systems (Prim3 tactical — primary mechanics pack)
| Path | Contents |
|------|----------|
| `game/TACTICAL-XCOM-MECHANICS.md` | AP, T/E/R, clocks, detection |
| `game/GAME-MECHANICS-COMPLETE.md` | Strategy + tactical + progression |
| `game/MECHANICS-GAPS-FILLED.md` | Concealment, gear tables, enemies |
| `game/PRIM3-COMPLETE-VISION.md` | Watch-or-play, graded outcomes (refine vs 6-min) |
| `game/AUDIT-AND-FILL.md` | Grade formula, anti-binary fail |

### Phenotypes / assets (INCOMPLETE — priority when lore pauses)
| Area | Status |
|------|--------|
| `phenotypes/` | Role system, hybrid naming, Field-T deepest loadouts |
| Skins / 3D pipeline | Asset replication standard, Tripo path, open-source gear intent |
| Character sheets | **Not finished** — resume here after architect pass |

---

## 3. Mechanics by product (do not mix incorrectly)

### 3.1 Prim3
- **Turn-based tactical** (XCOM-like)
- Clocks: Approach / Window / Extract
- Roles: Field-T (take), Field-E (space), Field-R (picture)
- Grades S–F; **no binary fail** when real take + people out
- Curriculum verbs from songs (patch, seal, OSINT, hats/boxes, RAID sites)

### 3.2 Hitman
- **FPS / mobile CoD energy**
- High casualty expected; deniable inserts; no backup romance
- Progression is crew rank + fear + contract success, not NODE integrity
- Benji’s brilliance = planning / takeover meta, not Prim3 cyberdeck fantasy

### 3.3 Whip Equipped
- **Car game systems** (separate design pass)
- Stamina/money/fuel/heat from gig work
- Racing competition ladder
- Dealership ownership long goal
- Map: real Bridgeport lots, streets, sell-spot memory spaces
- **Not** TB clocks; **not** Hitman gun-religion as core loop

### 3.4 Shared outcome channels (where stories link)
When a calendar beat touches two brands: **Exposure / Heat / who holds the objective**.  
Prime’s dual board is the narrative router, not a single combat ruleset.

---

## 4. Music = episode / mission identity

- **Prim3:** one song ≈ one episode theme + teachable concept.
- **Hitman:** one song ≈ one Benji episode beat (6 locked).
- **Hard locks:** Evil Twin (season-end confession), RAID (attack on Prime), Ghost (upload close).

---

## 5. Character assets — explicit debt

Lore outran production. Remaining work:

1. Finish **phenotype skins** and per-item 3D briefs (Prim3 side)
2. **Prime** official suit already referenced historically — keep consistent
3. **Benji** visual kit (street nerd-savage — not Dual Sight cosplay)
4. **Hitman** crew looks (halo/HM tags, set identity)
5. **Whip Equipped** protagonist car-as-home look (same soul, colder world)

Asset pipeline canon (when resuming): four separate photos per object (front/back/side A/side B), real-world dimensions, Tripo GLB, no contact sheets — see phenotypes asset standards.

---

## 6. Build priority (recommended)

1. Keep this bible + story folder authoritative  
2. **Resume Prim3 character/phenotype assets**  
3. Lock **Prim3 episode playlist** (song order for S1+)  
4. Ship one **6-min Prim3 episode card** (watch + optional TB)  
5. Hitman FPS prototype only after Prim3 vertical slice  
6. Whip Equipped systems design as **separate** milestone post–kill-branch  

---

## 7. Non-negotiables for any implementer

- Graded outcomes on Prim3 missions (no false “MISSION FAILED” when work landed)
- Hitman is **not** a second IT firm
- Ghost upload ≠ kill path; both valid
- Bridgeport parking lot continuity on Whip Equipped entry
- Micro-episode runtime discipline (~6 min)
- Flavor from owner songs is curriculum/identity, not decoration

---

*Last consolidated: 2026-08-24 — lore + dual path + Benji 6 + endings + Whip bridge + Prim3 tactical pack.*
