---
status: CANON INDEX
system: PRIM3 song-to-episode-to-level coverage
version: 1.0.0
branch: main
---

# PRIM3 episode / playable-level index

PRIM3 has **20 existing owner songs** and **21 locked episode slots**. Every
existing song owns one episode and one playable mission level. Global Episode
18 remains a protected placeholder for **Song #21** and must not be invented.

The five longer episode drafts already in this directory remain authoritative
development documents at their declared status. The newer chapter blueprints
fill every missing slot with a consistent merge contract so story, production,
and game work can grow without being trapped in one giant file.

| Level | Season | Song | Mission | Chapter state |
|---:|---:|---|---|---|
| 01 | S1E1 | High Alert | The Blip | [full proposed draft](S01E01-THE-BLIP.md) |
| 02 | S1E2 | White Grey Black Hat | Permission Slip | [full proposed draft](S01E02-WHITE-GREY-BLACK-HAT.md) |
| 03 | S1E3 | OSINT | Open Book | [full proposed draft](S01E03-OSINT.md) |
| 04 | S2E1 | Anti Social Engineering | The Human Layer | [merge-ready blueprint](S02E01-ANTI-SOCIAL-ENGINEERING.md) |
| 05 | S2E2 | Red Blue Purple White Team | Four Colors | [merge-ready blueprint](S02E02-RED-BLUE-PURPLE-WHITE-TEAM.md) |
| 06 | S2E3 | Got Wifi | Dead Air | [merge-ready blueprint](S02E03-GOT-WIFI.md) |
| 07 | S3E1 | Data Breach | Exposure | [merge-ready blueprint](S03E01-DATA-BREACH.md) |
| 08 | S3E2 | App Attacks | Bad Input | [merge-ready blueprint](S03E02-APP-ATTACKS.md) |
| 09 | S3E3 | Virus Types | Patient Zero | [merge-ready blueprint](S03E03-VIRUS-TYPES.md) |
| 10 | S4E1 | Installation Types | Clean Install | [merge-ready blueprint](S04E01-INSTALLATION-TYPES.md) |
| 11 | S4E2 | Dive In | Dumpster Signal | [merge-ready blueprint](S04E02-DIVE-IN.md) |
| 12 | S4E3 | IoT | House of Eyes | [merge-ready blueprint](S04E03-IOT.md) |
| 13 | S5E1 | IaaS, SaaS, PaaS | Shared Responsibility | [merge-ready blueprint](S05E01-IAAS-SAAS-PAAS.md) |
| 14 | S5E2 | Cap Ex Vs. Op Ex | Own the Exit | [merge-ready blueprint](S05E02-CAP-EX-VS-OP-EX.md) |
| 15 | S5E3 | Trappin From The Cloud | Elastic | [merge-ready blueprint](S05E03-TRAPPIN-FROM-THE-CLOUD.md) |
| 16 | S6E1 | Per Diem | Road Kit | [merge-ready blueprint](S06E01-PER-DIEM.md) |
| 17 | S6E2 | Patch Work | Trust Boundary | [merge-ready blueprint](S06E02-PATCH-WORK.md) |
| 18 | S6E3 | **Song #21 - open** | **Mission #18 - open** | [protected placeholder](S06E03-OPEN-SONG-21.md) |
| 19 | S7E1 | RAID (HOT SITE) | Hot Site | [merge-ready blueprint](S07E01-RAID-HOT-SITE.md) |
| 20 | S7E2 | Evil Twin | Mirror Room | [full proposed draft](S07E02-EVIL-TWIN.md) |
| 21 | S7E3 | Ghost In The Wires | Last Process | [full proposed draft](S07E03-GHOST-IN-THE-WIRES.md) |

## File roles

- `CHAPTER-TEMPLATE.md` defines the shared merge fields.
- `story/EPISODE-PROGRESSION.md` owns order.
- `story/EPISODE-MISSION-BIBLE.md` owns the cross-season mission spine.
- Each episode file owns expandable local detail.
- `source-material/<song>/` preserves owner lyrics separately from adaptation.

## Expansion rule

Expand one chapter at a time. New scene, character, mechanic, or technical
detail should enter the local episode file first, then update the cross-season
bible only when it changes shared continuity. AI additions remain `DRAFT` or
`PROPOSED` until Matthew McCluster approves them.
