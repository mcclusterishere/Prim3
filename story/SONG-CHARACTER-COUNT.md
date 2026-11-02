---
status: CANON
system: Character census from lyric texts
version: 1.1.0
---

# Song → character count (classified)

**Method:** Read each Prim3 lyric file. Count distinct *roles/people* the bars require on screen or in memory.  
**Trees:** `P` = McCluster/Prim3 · `H` = Hitman · `X` = extra (civilian, victim, one-off, crowd).  
**Fill rule:** Prefer **higher roster** (named, recurring, job-linked). Overflow → **extras**.  
**Density target remains:** ≥26 named per side across the series; not every song must invent 26 new people.

---

## Order and continuity note (2026-11-02)

- **Order:** sections now follow the written episode order in `EPISODE-PROGRESSION.md` (owner decision 2026-11-02: track order follows the order on paper; the assumption that the paper order is `EPISODE-PROGRESSION.md` is flagged for the owner). The old numbering (E06 Patch Work, E07 App Attacks, E15 RAID, E16 Evil Twin and so on) is kept in each heading as "was". The three songs the old census skipped (Got Wifi, Data Breach, Virus Types) and the open Song #21 slot have placeholders.
- **Benji:** this census lists Benji as a separate person from McCluster. That matches the owner decision of 2026-11-02 (Benji Chase is a different person). It does **not** match canon on the RAID rows: canon's Hitman-side raider and survivor is **Royce** (`CANON.md` §16, §18). Read "Benji (raid feed)" and the E19 "Benji" row as Royce until the owner says otherwise.
- **Prime:** "Prime" here means **PRIM2** (`CANON.md` §7).
- **Evil Twin (E20) flag:** the E20 census follows the old procedural SIM-swap / Hitgirl / Kiosk version. `story/missions/EVIL-TWIN.md` v2.0 makes Evil Twin PRIM2's confession and provenance verification after RAID and calls the procedural SIM-swap concept obsolete. The census is kept as lyric analysis only; it is not a cast list for the episode.
- The remaining content is the original lyric census, unchanged.

---

## E01 High Alert (global episode 01)
| Role | Tree | Tier |
|------|------|------|
| Prime (speaker) | P / above | **Core** |
| McCluster (raid feed) | P | **Core** |
| Benji (raid feed) | H | **Core** |
| Hire-chain sponsors (addressed) | P/H mixed | **Higher** (2–4 names) |
| Robot / house units | P | systems |
| Cohort silhouette casualties | P | Higher or extra |
| Raider kit operators (fried) | P or H | Extra if unnamed |
**Count:** ~6–10 distinct · Core 3 + higher hire chain

---

## E02 White Grey Black Hat (global episode 02)
| Role | Tree | Tier |
|------|------|------|
| Speaker / operator learning hats | P | **Core** (McCluster) |
| Task force / crew (“we”) | P | Higher (team slots) |
| Client with permission (white box) | X | Extra victim/client |
| Cops (if grey turns malicious) | X | Extra |
| Black-ops trench self | P | same speaker mask |
**Count:** low · 1–2 higher + crew extras · **doctrine episode**

---

## E03 OSINT (global episode 03)
| Role | Tree | Tier |
|------|------|------|
| Speaker (collector) | P | McCluster / Field-R |
| Extortion mark (“quiet cash”) | X | Extra victim |
| Sharing-center / subscription faces | X | Extra |
| Compromised “never compromised” target | X | Extra |
| Aya (mentor optional on screen) | P | **Core** |
**Count:** 1–2 higher + several X marks

---

## E04 Anti Social Engineering (global episode 04)
| Role | Tree | Tier |
|------|------|------|
| Speaker (“I know him / stuck in the mix”) | P | Higher operator |
| Antisocial SE specialist (“he”) | P or H | **Higher** — can be Hitgirl-adjacent or internal |
| Folks who know your social | P/H | Higher crew |
| Lil bro / drone shoulder-surf | P/H | Higher or extra |
| Women phishing / smishing | P/H or X | Hitgirl track or extra |
| Internet pro for cash hit | H or P | Higher |
| Jobless set / drip victims | X | Extra crowd |
| Chemist / gun blueprint guy | H | Higher street |
| Police | X | Extra |
| DEFcon red-team find | P | Higher |
| Studio victim | X | Extra |
**Count:** **rich** · 5–8 higher candidates · rest X

---

## E05 Red Blue Purple White Team (global episode 05)
| Role | Tree | Tier |
|------|------|------|
| Red / Blue / Purple / White seats | P | **Higher** — fill cohort job slots |
| Yellow / Orange / Green code roles | P | Higher or extra |
| Corporate greedy foil | X | Extra |
**Count:** 4–7 team faces → **use to fill Prim3 roster jobs**

---

## E06 Got Wifi (global episode 06)
_Census not yet written. The old census skipped this song. Lyric source: `source-material/got-wifi/LYRICS.md`._

---

## E07 Data Breach (global episode 07)
_Census not yet written. The old census skipped this song. Lyric source: `source-material/data-breach/`._

---

## E08 App Attacks (global episode 08; was "E07")
| Role | Tree | Tier |
|------|------|------|
| Attacker / team | P | McCluster + Field-T |
| Soft-target users | X | Extra victims |
| Admin / RBAC holders | X or P | Extra or internal |
**Count:** medium · 2–3 higher + X users

---

## E09 Virus Types (global episode 09)
_Census not yet written. The old census skipped this song. Lyric source: `source-material/virus-types/LYRICS.md`._

---

## E10 Installation Types (global episode 10; was "E08")
| Role | Tree | Tier |
|------|------|------|
| Installer / path-chooser | P | McCluster |
| “Brothers die searching” | P/H | Higher fallen or extra |
**Count:** low · path doctrine

---

## E11 Dive In (global episode 11; was "E09")
| Role | Tree | Tier |
|------|------|------|
| Field diver | P | Field-R slot |
| Drone / physical support | P | Higher |
| Dumpster / street witnesses | X | Extra |
**Count:** 2–3 higher + X

---

## E12 IoT (global episode 12; was "E10")
| Role | Tree | Tier |
|------|------|------|
| Operator | P | Higher |
| Soft-device owners | X | Extra civilians |
| Compound sensors (Prime’s) | P | systems |
**Count:** 1–2 higher + X

---

## E13 IaaS SaaS PaaS (global episode 13; was "E11")
| Role | Tree | Tier |
|------|------|------|
| Server / speaker | P | Higher institutional |
| Client who “signed in / feels so right” | X or P | Extra or Maren-adjacent |
**Count:** low–medium

---

## E14 Cap Ex vs Op Ex (global episode 14; was "E12")
| Role | Tree | Tier |
|------|------|------|
| Speaker | P | McCluster |
| **Wifey (CapEx)** | P | **Core Aya** |
| **Sidepiece (OpEx)** | X or P | Extra or named rival interest |
| Right-guy / crime-scene CapEx source | H or X | Extra or Hitman money |
**Count:** 2–4 · love economics

---

## E15 Trappin From The Cloud (global episode 15; was "E13")
| Role | Tree | Tier |
|------|------|------|
| Cloud trapper (speaker) | P | Higher |
| Friend plotting when you get paid | X or P | Extra or rival |
| Supply locations / weight | H/P | Extra logistics |
**Count:** 2–3 higher + X

---

## E16 Per Diem (global episode 16; was "E14")
| Role | Tree | Tier |
|------|------|------|
| Grinder (speaker) | P | McCluster / cohort |
| Seasonal vs hybrid peers | P | Higher cohort fills |
**Count:** 2–5 cohort faces → **roster fill**

---

## E17 Patch Work (global episode 17; was "E06")
| Role | Tree | Tier |
|------|------|------|
| Speaker (patch / love) | P | **Core** McCluster or duet |
| Partner (“been with you since sandbox”) | P | **Core Aya Shinoda** |
| Network people mad at “us” | P | Extra coworkers |
| Leeches / old scripts / virus voices | X | Extra |
| Ex’s (XSS double) | X | Extra past |
**Count:** 2 core lovers + light extras · **relationship episode**

---

## E18 Song #21 — OPEN (global episode 18)
_Protected slot. No lyrics exist; no census until the owner supplies Song #21._

---

## E19 RAID (global episode 19; was "E15")
| Role | Tree | Tier |
|------|------|------|
| Prime | P | Core |
| McCluster | P | Core |
| Benji | H | Core |
| Outer-site defenders | P | Higher building defense ×2+ |
| Raid teams both sides | P+H | Higher field slots |
| Casualties | either | Extra if unnamed |
**Count:** **high** · use to fill defense + field jobs both trees

---

## E20 Evil Twin (global episode 20; was "E16")
| Role | Tree | Tier |
|------|------|------|
| Prime (speaker) | above | Core |
| Hitgirl + jewelry / evil twin SSID | H or dual | **Higher Hitgirl-H** |
| Finsta hitter / Insta add | H | same or second Hitgirl |
| Lil bro / kiosk SIM | H-deniable | **Higher Kiosk** |
| Phone-drop mark (hot walk-past) | H | **Lower Exec** (higher) |
| Man-in-browser / relay crew | P/H | Higher cyber slots |
| Hitgirl dinner / necklace | P | **Higher Hitgirl-M Harvard Gymnast** |
| Politician lunch mark | X | Extra (or named sponsor if recurring) |
| Sponsor / “on the children” / millions cover | X→Higher if series | **Sponsor** if kept |
| Reddit / news distraction crowd | X | Extra |
| Team taxing streets | H/P | Higher crew |
**Count:** **highest single song** · 8–12 distinct · prioritize Higher for Hitgirls, Kiosk, Lower Exec, Gymnast, Sponsor; politicians/reddit = X unless overflow needed for 26

---

## E21 Ghost In The Wires (global episode 21; ending mode)
| Role | Tree | Tier |
|------|------|------|
| Prime-as-ghost | above/P | Core |
| McCluster | P | Core |
| Wire / infrastructure as presence | P | systems |
**Count:** core pair + system

---

## Summary — where the bodies are

| Song | Higher pressure | Extra pressure |
|------|-----------------|----------------|
| High Alert | hire chain, dual raiders | kit ops |
| Anti Social | SE specialist, crew, DEFcon | drip victims, police |
| Teams | full color seats | corporate foil |
| Patch Work | McCluster + Aya | network noise |
| CapEx/OpEx | Aya + optional side | rental faces |
| RAID | both raid rosters + defense | unnamed dead |
| **Evil Twin** | **Hitgirl-H, Kiosk, Lower Exec, Hitgirl-M, cyber crew, optional Sponsor** | politicians, reddit, crowd |

**Doctrine-light songs** (White/Grey/Black, Install, IoT, IaaS): few new faces — teach with existing roster on camera.

---

## Fill order (toward 26+26)
1. Lock Evil Twin Highers with legal names  
2. Fill Red/Blue/Purple/White team seats on Prim3  
3. Fill RAID defense + field pairs both sides  
4. Anti Social SE specialist + drone/lil-bro if not same as Kiosk  
5. Only then mass extras  
