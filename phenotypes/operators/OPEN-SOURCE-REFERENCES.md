---
status: CANON
system: Open-source reference links for field kit 3D / photo modeling
version: 1.0.0
---

# Open-source technology references

Use these **official / primary** sources for product photos, form factor, and FOSS identity when modeling Field-T / Field-E / Field-R kit assets. Prefer real photos from these projects over generated contact sheets.

Linked from `FIELD-KITS.md`.

---

## Field-T — compute & forensics

### Cyberdeck / SBC platform
| Resource | URL | Use |
|----------|-----|-----|
| **Raspberry Pi (official)** | https://www.raspberrypi.com/ | Board form factor, product photography language |
| **Raspberry Pi 5 product** | https://www.raspberrypi.com/products/raspberry-pi-5/ | High-end deck brain |
| **RPI_DEV cyberdeck (STL + photos)** | https://github.com/sector07-dev/RPI_DEV | Full open cyberdeck: STL, KiCad, BOM, build photos |
| **SimpleDeck (Pi 4, OpenSCAD)** | https://github.com/pgattic/simpledeck | Glueless portable deck; clear photos of assembled unit |
| **SATUNIX CYBERDECK (Pi 400)** | https://github.com/SATUNIX/CYBERDECK | Network-audit deck aesthetic |
| **HasNate618 cyberdeck** | https://github.com/HasNate618/cyberdeck | Handheld terminal deck WIP |

### Network / analysis software (deck UI identity)
| Resource | URL | Use |
|----------|-----|-----|
| **Wireshark** | https://www.wireshark.org/ | Packet UI screens / brand-free in-game overlays |
| **Wireshark download** | https://www.wireshark.org/download.html | Official builds |
| **Nmap** | https://nmap.org/ | Scanner identity |
| **Nmap download** | https://nmap.org/download.html | Official builds |

### Forensic imaging / integrity
| Resource | URL | Use |
|----------|-----|-----|
| **The Sleuth Kit + Autopsy (home)** | https://www.sleuthkit.org/ | Primary forensics FOSS |
| **Autopsy product page** | https://www.sleuthkit.org/autopsy/ | GUI imaging/analysis look |
| **Autopsy download** | https://www.sleuthkit.org/autopsy/download.php | Official installer page |
| **Sleuth Kit download** | https://www.sleuthkit.org/sleuthkit/download.php | CLI library |
| **Guymager (SourceForge)** | http://guymager.sourceforge.net | FOSS forensic imager (E01/dd); GUI screens for Imaging Stack |
| **Guymager Debian man** | https://manpages.debian.org/testing/guymager/guymager.1.en.gz | Tool identity |
| **BitCurator — Imaging with Guymager** | https://bitcurator.github.io/documentation/All%20Step-by-Step%20Guides/Imaging%20and%20Recovery%20Guides/Imaging%20with%20Guymager/ | Screenshot-rich workflow reference |

---

## Field-R — RF / picture / UAV

### SDR brick
| Resource | URL | Use |
|----------|-----|-----|
| **RTL-SDR (Osmocom wiki)** | https://osmocom.org/projects/rtl-sdr/wiki | Canonical open RTL-SDR project |
| **rtl-sdr GitHub (Osmocom mirror)** | https://github.com/osmocom/rtl-sdr | Source + hardware context |
| **RTL-SDR.com (community + dongle photos)** | https://www.rtl-sdr.com/about-rtl-sdr | Dongle form factor photos |
| **RTL-SDR Blog V4 guide** | https://www.rtl-sdr.com/v4/ | Current hardware reference photos |
| **GNU Radio** | https://www.gnuradio.org/ | SDR software stack |
| **GNU Radio about** | https://www.gnuradio.org/about/ | Project identity |
| **Kismet** | https://www.kismetwireless.net/ | Wi-Fi/BT/RF situational awareness |
| **Kismet download** | https://www.kismetwireless.net/download/ | Official builds |

### Micro-UAV autopilot
| Resource | URL | Use |
|----------|-----|-----|
| **ArduPilot GitHub** | https://github.com/ArduPilot/ardupilot | Autopilot source |
| **ArduPilot site** | https://ardupilot.org | Vehicle/FC photos, docs |
| **PX4 User Guide** | https://docs.px4.io/ | Open autopilot stack; airframe references |
| **PX4 intro** | https://px4.gitbook.io/px4-user-guide | Overview |

---

## Field-E — soft goods / tools (non-weapon)

| Resource | URL | Note |
|----------|-----|------|
| Industrial **Halligan-style** tool geometry | Public fire-service tool category (search manufacturer catalogs for photo ref only) | Game item is geometry + stats — no fabrication guide |
| Civilian **IFAK / trauma pouch** packing | American College of Surgeons “Stop the Bleed” public materials | Inventory fantasy only |
| DIY plate-carrier **sewing patterns** | Community pattern sites / airsoft DIY (verify license per pattern before redistributing STL) | Armor *silhouette* only |

**Weapons / sidearms / primaries:** no open-source build links. Model from licensed game art direction + **stats only**.

---

## How to use for 3D
1. Pull reference stills from the linked project pages / GitHub READMEs (many include device photos).
2. Feed **real product photos** into Tripo / mesh pipeline per asset.
3. Reskin to Prim3 materials (matte black / ivory / muted Dual Sight) — keep open form factor.
4. Four separate views per finished Prim3 asset still required for consistency pipeline; source refs can be real-world.

---

## License discipline
- FOSS software: use for **identity and UI reference**; ship game-original UI unless license allows.
- Hardware photos: check each repo/site license before redistributing photos inside commercial builds; **modeling from** publicly visible form is standard practice — redistributing third-party photos may need permission.
- Prefer generating/owning final textures after using refs for proportion.
