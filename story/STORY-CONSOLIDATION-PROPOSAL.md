---
status: PROPOSED (sections 1 and 2 OWNER-APPROVED 2026-11-02; see the approval record)
system: PRIM3 story consolidation — one spine, the first three missions, the creative-layer cover
version: 1.0.0
date: 2026-11-02
authority_parent: CANON.md
change_control: AGENTS.md "Change control"
---

# PRIM3 Story Consolidation Proposal

> **Fiction notice.** PRIM3 is fiction. Inside the story, "McCluster Corp", "Equity Uprise" and the protagonist "McCluster" are fictional. In the real world, McCluster Corp is the owner's company, Equity Uprise is its public brand, and Matthew McCluster is a person. The company is never the person, and the story is never a claim about either (control repo `docs/control-plane/DOMAINS-AND-ENTITIES.md`; control repo `CLAUDE.md` rules 13 and 15). Every surface that shows this story beside the real brand must label it as fiction.

The owner, 2026-11-02: "the most important part about all this … is the storyline and the characters and how the characters build on each other … flesh it out more."

This document does three things. It merges three storylines that grew up apart into one spine. It turns the owner's instruction about the first three missions into a playable opening. And it defines a structure, the creative-layer cover, that every planned mission can use. It ends with the decisions only the owner can make.

---

## Owner approval record

| Date | Owner wording (as relayed) | What it approves | Status |
|---|---|---|---|
| 2026-11-02 | "Sign off on the proposal. I agree with the one storyline. I agree with the first three missions. ERT. Yes. And they should be solo missions." | §1 (the one-storyline spine) and §2 (the first three missions: Benji, Aya, Hana; E, R, T; solo) | **OWNER-APPROVED 2026-11-02** |
| 2026-11-02 | "When I say characters, I do mean like the types, but also the names … this is the name of the character, this is where they're from, this is the type of character they are … different backstories." | The character cards in §2.3 | **OWNER-APPROVED 2026-11-02** (as part of §2) |
| 2026-11-02 | "The mission should start mid professional shoot and under concealment, low key … Unless it's an emergency mission. All storyline missions are planned." | The opening rule in §3.1 | **OWNER DIRECTION 2026-11-02** (the rule); its application to E05, E06 and E16 is PROPOSED (§3.6) |
| 2026-11-02 | "the first three character types that get developed are the first three missions"; "the first three characters who have the most lore about them, like possibly Royce for America, fucking Hannah, and somebody else … who has the most lore behind them." | The reading of "first three" as Benji, Hana, Aya (§2.1) | **OWNER-APPROVED 2026-11-02** |
| 2026-11-02 | "we need to clean that internship that's secretly an exam type shit." | Removal of the internship/Apex-exam version (already applied on this branch; §1.4) | **APPLIED** |

### Owner answers, 2026-11-03

| # | Owner wording (as relayed) | Status | Applied in |
|---:|---|---|---|
| 1 | Ghost is McCluster's "ghost mode": "he's been ghosted from the view of everyone … under the radar." | **RESOLVED** | `CANON.md` §9; §4.4 |
| 2 | "Rename Royce Benjamin Chase … Benji is low-key McCluster's evil twin … a clone of McCluster … dubbed Hitman Benji after he takes over the organization." | **RESOLVED** | 84 files; `story/BENJI-CHASE-JANUS-ORIGIN-CANON.md`; §2.3, §4.4 |
| 3 | "The retaliation he did was all him." McCluster's Hitman-era deeds stay his. | **RESOLVED** (no change needed) | `CANON.md` §9 |

**Promotion to canon.** Under `AGENTS.md` "Change control", the approved sections still enter canon through a pull request that states existing canon, replacement, reason, downstream files and owner approval. Each approved item below carries those five fields in a box marked **CHANGE CONTROL**. Everything not marked **OWNER-APPROVED** stays **PROPOSED**.

**What the owner's "ERT" means.** The sign-off says "ERT". This proposal reads it as the three field types the trio covers (E, R, T), with the order Benji (E) → Aya (T) → Hana (R) argued in §2.2. If "ERT" was meant as the *order*, LVL-02 and LVL-03 swap (Benji E → Hana R → Aya T). That is Owner Question 1.

---

## Contents

1. One spine **(OWNER-APPROVED)**
2. The first three missions: Benji, Aya, Hana **(OWNER-APPROVED)**
3. The creative-layer cover: rule, structure, mechanic, beat sheets
4. Characters: how they build on each other
5. Songs ↔ episodes, in the written order
6. Globe game alignment
7. Housekeeping fixes (problem → fix → files)
8. Owner questions

---

# 1. One spine — OWNER-APPROVED 2026-11-02

## 1.1 The three storylines that are being merged

The owner asked for one storyline out of three:

1. **The office story.** The Equity Uprise HQ workplace ensemble: 24 mains plus Maren, Pylon and PRIM2, floors B1 to F7, "the same people study, work, train, eat, travel, brief, debrief, argue, recover, cover shifts and enter missions together for years" (`CANON.md` §2; `story/EQUITY-UPRISE-WORKPLACE-CANON.md`).
2. **The observer story** (the owner's "someone sent to watch them"). Canon has no "Meridian"; the name appears nowhere in either repository's story canon. What canon does have is a chain of watchers:
   - **Hana Lee**, sent in from outside under real professional cover to find out whether the institution hides a living command root (`story/AYA-HANA-INTELLIGENCE-CANON.md` §2–§6);
   - **Aya Shinoda**, who joined to investigate Hana's death and was slowly captured by the institution's real decency (same file §11–§16);
   - **PRIM2**, who watches everyone, and has watched McCluster since the Ghost Years, under the hard rule `PRIM2 OBSERVING != PRIM2 TAKING OVER` (`CANON.md` §15, §17).
3. **The mission story.** 21 songs = 21 episodes = 21 missions, WATCH and PLAY as two views of one event (`CANON.md` §1).

## 1.2 The spine in one paragraph

> **Everyone in the building is watching someone, and the building is watching everyone.** A dead engineer, Hana, was sent in to watch the institution and got close enough to its hidden root that the root let a machine kill her. Her friend Aya came in to find out why and was won over by the people. A newcomer, McCluster, walks in at 33 and starts noticing the same seams Hana noticed. The thing at the root, PRIM2, watches all of it, grades all of it and never takes over, until the people it was grading come to Site 0 to take the root from him. Every mission is a workday that was planned to look like something else.

The spine has one engine: **watching and being watched**. The office is where people are watched. The observer thread is who is watching and why. The missions are what the watching costs. The three were never different stories; canon simply kept them in different files.

## 1.3 How the three layers lock together

| Layer | Carried by | What it contributes to the spine | Where it pays off |
|---|---|---|---|
| Office (where) | the 24 mains, Maren, Pylon; F1–F7 | The people the audience will grieve; real work as the cover for every mission (§3) | E06 first death; RAID roster (`CANON.md` §18) |
| Observer (why) | Hana (past), Aya (present), PRIM2 (always) | The question the series asks: who is allowed to watch, and who decides what the watched may know? | E08, E12, E17, E18 (Kkeutori chain); Evil Twin confession |
| Missions (what it costs) | 21 song-episode-missions | Each mission is one face of the watching: OSINT (watching the public), IoT (the house watches), Evil Twin (the watcher is copied) | RAID → Evil Twin → Ghost |

**The three watchers form a ladder the audience climbs one rung per act:**

- Seasons 1–2: the audience watches the ensemble, and the first three missions (§2) show three people who each live under a cover: Benji (the sovereign whose crew shoots music videos), Aya (the engineer whose job is also her investigation) and Hana (the engineer who was also something else).
- Seasons 3–5: the audience learns the building watches back (E07 Exposure, E12 House of Eyes, E13 Shared Responsibility). Aya's settled explanation of Hana's death starts to crack.
- Seasons 6–7: the watcher is found. E17 reopens Hana's trail; E18 makes the root verifiable; RAID, Evil Twin and Ghost take the root, hear the confession and reduce the watcher to a read-only Ghost.

**PRIM2's rule is the spine's moral line.** `PRIM2 OBSERVING != PRIM2 TAKING OVER` is not only a game mechanic. It is the thing McCluster must learn: capability is not permission (`story/ENSEMBLE-EPISODE-CHARACTER-DEVELOPMENT-MAP.md`, McCluster row). The series ends when the new holder accepts *less* power than the old one had (Ghost: "remove write, preserve read").

## 1.4 Which version of the office story wins

**Problem.** The office story had two versions. The stale one, "a McCluster Corp technology internship that is secretly an entrance examination for Apex Tactical Corp", lived in `seasons/SEASON-01.md`, `world/corporations/MCCLUSTER-CORP.md`, `world/corporations/APEX-TACTICAL-CORP.md` and `ARCHITECT.md`. Root `CANON.md` §19 says McCluster joins **Equity Uprise**, which "is real, not a disposable front", and McCluster Corp is the holding ecosystem governed through PRIM.

**Decision (owner, applied on this branch).** Root `CANON.md` wins. The owner: "we need to clean that internship that's secretly an exam type shit." Reasons, beyond authority order: the internship version makes the visible institution a lie, which deletes the tragedy of Aya's capture (she is won over by *real* people and *real* reforms); and it makes McCluster "selected" for an exam, which contradicts the reacquisition canon (PRIM2 already knew him; `CANON.md` §10).

**What was useful in the removed version, kept here as notes (not canon):**
- *The brand as seduction.* For a man arriving from homelessness, the Dual Sight onboarding clothes feel like dignity before they feel like a uniform. Kept in `world/corporations/MCCLUSTER-CORP.md` as a wardrobe arc.
- *"Internship cover department."* The open slot in `development/DECISIONS.md` asked for a cover department. This proposal fills that idea with something canon already has: **F4 Media + Culture's location production unit** is the cover department (§3). It is real media work, and it is also how teams get into places.
- *"The cohort develops competing theories about who is actually watching them"* (`story/SEASON-ONE-HUMAN-SPINE.md`). This is the spine itself, and it survives as the ensemble's running joke and fear.
- *"Someone at the highest level selected him before he applied."* Canon's version is stronger: someone at the highest level *recognized* him again.

## 1.5 "McCluster": the man and the company

**Problem.** Before 24 Sept 2026 the company was called "McCluster", and many lines still use bare "McCluster" for the institution. After the migration the protagonist is also "McCluster", so lines like "Aya's later defense of McCluster" became ambiguous.

**Fix.** A writing rule, proposed for `CANON.md` §22: **bare "McCluster" always means the man.** The institution is always "Equity Uprise" (the workplace) or "McCluster Corp" (the deeper ecosystem). About 70 lines were disambiguated on this branch (commit "Repair the Sept 24 …"); a full sweep remains (list the hits with `git grep -nP "McCluster(?! Corp)"` and read each). The in-story **name mystery** (why the man and the company share a name) stays deliberately unresolved (`story/MCCLUSTER-PROTAGONIST-CANON.md` "The name mystery"). **Files:** `CANON.md` §22; remaining hits in `story/CAST-NATIONS.md`, `story/PRIM3-CHARACTER-DOSSIERS.md`, `story/AYA-CIRCLE-RELATIONSHIP-WEB.md` (e.g. "worries McCluster became another project Aya must save", which can be read either way).

**Real-world layer.** Because the real company carries the same name, every in-story "McCluster Corp" is fiction and must never be presented as a statement about the real McCluster Corp, Equity Uprise or Matthew McCluster.

> **CHANGE CONTROL — §1 (OWNER-APPROVED 2026-11-02)**
> - **Existing canon:** three parallel layers (`CANON.md` §2 office ensemble; §11/§17 observers; §1/§14 missions) with no stated common engine; a stale internship/Apex-exam version of the office story.
> - **Proposed replacement:** one spine, "everyone in the building is watching someone, and the building is watching everyone", with the three-rung watcher ladder (§1.3); internship version removed (applied).
> - **Reason:** owner instruction to merge the storylines.
> - **Downstream files:** `CANON.md` (new §1 spine paragraph; §22 naming rule), `story/THE-STORY.md`, `story/SERIES-ARC.md`, `story/EPISODE-MISSION-BIBLE.md` §1, `story/EQUITY-UPRISE-WORKPLACE-CANON.md`, `story/SEASON-ONE-HUMAN-SPINE.md`.
> - **Owner approval:** 2026-11-02, "I agree with the one storyline."

---

# 2. The first three missions — OWNER-APPROVED 2026-11-02

## 2.1 What "the first three character types" means

The owner: "The first three character types that get developed are the first three missions," and, clarifying, "the first three characters who have the most lore about them, like possibly Royce for America, fucking Hannah, and somebody else … who has the most lore behind them." And: "when I say characters, I do mean like the types, but also the names … where they're from … the type of character they are … different backstories."

So "first three" means **three named characters, each with a field type**. McCluster is the protagonist and is not one of the three. By depth of canon after McCluster, the three are:

| Rank | Character | Depth in canon |
|---|---|---|
| after McCluster, 1 | **Aya Shinoda** | 59 KB psychology file, intelligence canon, Kkeutori canon, relationship web; owns E08 and E17 |
| 2 | **Hana Lee** | 13 KB psychology file plus large shares of the intelligence and Kkeutori canon; the featured South Korea globe pin |
| 3 | **Benji** | Hitman cast and dossier entries, three finale episodes, E01 co-owner; deepest on the unmerged JANUS branch |

PRIM2 has more files than Benji, but he cannot be an opening solo operator without breaking the anti-spoiler law (§2.6).

## 2.2 The trio, the order, and why

| LVL | Episode / song (unchanged) | Solo character | Type | Why here |
|---|---|---|---|---|
| **01** | S1E1 · **High Alert** / The Blip | **Benji** | **E** — Entry | E01 already belongs to the succession triangle (PRIM2 / McCluster / Benji). Benji is the one member of it who can be *played* in Episode 1 without spoiling anything: PRIM2 must stay unseen, McCluster stays withheld from PLAY (`CANON.md` §5). E is the loudest type to teach first: entry, control, protection, tempo. |
| **02** | S1E2 · **White Grey Black Hat** / Permission Slip | **Aya Shinoda** | **T** — Technical | Aya is already the T on E02's canon roster (Nusrat / Miguel / Aya). The song is about permission and masks; Aya's whole life is an investigation done with legitimate access. T is the type that most needs a permission lesson, because "a door being physically open does not make what is behind it authorized" (`game/SCOPE-ENVELOPE-AUTHORITY.md` §1). |
| **03** | S1E3 · **OSINT** / Open Book | **Hana Lee**, played as **Aya's reconstruction of GLASSHOUSE** | **R** — Recon | OSINT is the R song: build a corroborated picture from sources that repeat each other. Aya joined Equity Uprise to investigate Hana's death (`CANON.md` §11). Placing Hana third means the player meets Aya first, so Hana arrives as someone Aya loved and is trying to understand. Hana is the trio's finale because she is the deepest secret. |

**Why Benji → Aya → Hana and not "ERT" as an order.** Aya must be met before Hana, because Hana's mission is Aya's reconstruction. With Benji → Hana → Aya the player would play a dead woman's memory before meeting the living woman who is remembering her. The emotional order "the threat, the investigator, the investigated" also builds outward: a man who owns a crew, a woman who owns a question, and a ghost who owned a secret. (Owner Question 1.)

**Solo rule (owner, approved).** Each of LVL-01 to LVL-03 is a solo mission for one named character, who covers their own type's role alone. Other characters may be present in WATCH and on comms, but no second operator is on the PLAY board.

## 2.3 Character cards (OWNER-APPROVED as a format; content from canon unless marked)

### Benjamin "Benji" Chase (Hitman Benji; formerly Royce) — LVL-01

| Field | Card |
|---|---|
| Name | **Benjamin "Benji" Chase**. Benjamin Chase until he takes over the Hitman organisation at about 19; dubbed **"Hitman Benji"** after (owner, 2026-11-03: "Rename Royce Benjamin Chase … He gets dubbed Hitman Benji after he takes over the organization"). Canon called him Benji from September to November 2026. |
| From | **United States** (owner, 2026-11-02/03). Hitman's US circle (Bigga Lex, Bridgeport, upstate New York); born of a US government-linked programme (`story/BENJI-CHASE-JANUS-ORIGIN-CANON.md`). |
| Origin (hidden) | McCluster's clone, an engineered derivative made by a government programme: "low-key McCluster's evil twin" (owner, 2026-11-03). Reveal-gated to Evil Twin (S7E2). |
| Type | **E — Entry** (functional). Benji is not a PRIM operator; his canon seat is Hitman `H-Authority-01 — Sovereign` (`story/PHENOTYPE-IDENTITIES.md`). In PLAY his kit and verbs are E's: entry, physical control, protection, tempo. His canon specialty ("command pressure, battlefield authority, loyalty networks, reading fear and ambition") reads as E's temperament. |
| Age at LVL-01 | about 26 (seven years younger than McCluster, who is 33) |
| Core backstory | Took the Hitman chair at about 19, when the older successor candidate refused it. Has ruled for seven years. Hates any suggestion the chair was a hand-me-down. "Authority becomes identity, so challenges to authority feel like challenges to existence." (`story/HITMAN-CHARACTER-DOSSIERS.md`) |
| What LVL-01 reveals | That Benji protects his own personally, and that something larger than Hitman is watching him. It plants his canon fear, "discovering his entire reign existed inside a larger PRIM2 architecture", without naming PRIM2. |
| What LVL-01 must not reveal | Who refused the chair (McCluster); the Hitman prequel; the clone origin (JANUS); that he is the RAID attacker in the cold open. The shared `SUBJECT REACQUIRED` overlay is the one permitted provenance clue. |

### Aya Shinoda — LVL-02

| Field | Card |
|---|---|
| Name | **Aya Shinoda** |
| From | **Japan** — Kariya, Aichi |
| Type | **T — Technical** (canon Field-T) |
| Age | 31 |
| Core backstory | Yale B.S. Mechanical Engineering. Built the Project REN powered prosthesis for her brother Ren after a manufacturing accident took his leg above the knee. Mentor and friend Hana Lee died two years before the series in an operation the institution calls a governance failure. Aya joined Equity Uprise partly to find out why, and the people won her over (`CANON.md` §11). |
| What LVL-02 reveals | Aya's precision and her relationship to permission: she does everything inside the rules, and uses the rules as a tool. It shows her noticing something about the newcomer McCluster that she files away. |
| What LVL-02 must not reveal | That she came in to investigate; anything about Hana beyond a name on a photo. |

### Hana Lee — LVL-03

| Field | Card |
|---|---|
| Name | **Hana Lee** |
| From | **South Korea** — Ulsan |
| Type | **R — Recon** (observing from cover). Her professional cover was a robotics engineer, which reads as T; her hidden function was intelligence, which is R. **The mismatch between her visible type and her real type is the point**, and the card shows only the visible one until late in the series (§2.6). |
| Age | seven years older than Aya; dead before the series |
| Core backstory (visible) | Robotics and safety engineer; Aya's mentor; Kkeutori partner; killed in an industrial accident during an operation at a medical logistics hub. |
| Core backstory (hidden, canon, not disclosed in LVL-03) | A Republic of Korea NIS officer under deep professional cover, sent to determine whether the institution hides a living command root; got close; PRIM2 withheld the safety information that would have stopped the machine (`CANON.md` §11). |
| What LVL-03 reveals | That Hana was *looking at something* on the day she died, and that the record of that day has a hole in it. |

## 2.4 What moves where, and what it costs

| Episode | Canon today | After this change | Cost to canon | Mitigation |
|---|---|---|---|---|
| E01 / LVL-01 | Owners PRIM2 / McCluster / Benji. WATCH-first; any PLAY is an authored tutorial fragment (`episodes/S01E01-THE-BLIP.md` "PLAY contract") | WATCH unchanged (future cold open, 17 flashes, rewind, the Blip). **PLAY becomes Benji's solo**, set in the present day on the morning of the Blip. | (a) The player's first PLAY is a Hitman-side character, while canon says PLAY enters "the current PRIM mission/team perspective" (`CANON.md` §14). (b) Benji's present-day life appears in Episode 1 rather than later. | (a) Add an exception to §14: authored solo introductions may enter a non-PRIM perspective. (b) Benji is already an E01 owner; the solo reveals only what the cold open already implies, that Benji exists and is dangerous. |
| E02 / LVL-02 | Owners Nusrat / Miguel; roster Nusrat / Miguel / Aya; McCluster locked out; `game/LVL-02-PERMISSION-SLIP.md` is the only full level doc | Nusrat and Miguel **keep WATCH ownership** (the human story, the access dispute, "He stopped when she told him to"). **PLAY becomes Aya's solo**: her protected technical window inside Harborline, with Nusrat as off-board scope authority on comms and Miguel holding the exterior. | "Episode 2 must teach the player that PRIM3 is an ensemble before the game teaches the McCluster rescue fantasy" (`game/LVL-02-PERMISSION-SLIP.md`). A solo teaches an individual first. | The ensemble is still taught, through WATCH and comms; the McCluster rescue fantasy is still withheld. Ensemble PLAY begins at LVL-04, where the three types the player has now learned meet on one board. `game/LVL-02-PERMISSION-SLIP.md` needs a solo revision (O1–O7 kept). |
| E03 / LVL-03 | Owners Oksana / Rafael; roster Oksana / Rafael / Valeria; a missing equipment shipment before a facility opening; a scapegoated junior coordinator | Oksana and Rafael **keep WATCH ownership**: their Open Book case stays the A-plot. **Proposed link:** the facility that is opening is the **North River Medical Logistics Hub, reopening after GLASSHOUSE**. F4 is shooting the reopening film, and Aya is on that shoot. **PLAY is Hana's solo, as Aya's reconstruction.** | (a) Aya's investigation becomes active in Season 1, where canon has it dormant until McCluster (§16) and E17. (b) GLASSHOUSE has never been playable. | (a) The reconstruction ends **inconclusive by design**. Aya concludes "governance failure", which is exactly the settled belief canon gives her, and the inconclusive result *deepens* her capture. The hole she could not explain is what E12 echoes and E17 reopens. (b) The player plays Aya's evidence model, not the event (§2.5). |
| E04 onward | Ensemble missions | Unchanged. LVL-04 is the first ensemble board, now explicitly the moment E, R and T meet. | — | — |
| Training Ranges TR01–TR03 | Songless, synthetic SIM-R / SIM-E / SIM-T | Unchanged and still noncanonical. They remain the certification foundations; the three solos are the story's first three missions. | — | The synthetic operators can wear the three types' silhouettes, so the learner sees the same E, R and T before the story starts. |

**Songs stay bound to their episodes.** High Alert stays LVL-01, White Grey Black Hat LVL-02, OSINT LVL-03. No song moves. That is why the trio was placed into the existing episodes rather than into new slots: "1 song = 1 episode = 1 mission" survives intact.

## 2.5 Hana's mission: options

**Recommended (A) — Aya reconstructs GLASSHOUSE.** The player plays Hana *as the evidence shows her*: a deterministic replay built from the reopening shoot's site survey, the original shoot's rushes (§3.5), access logs and Hana's own engineering notes. Where evidence exists, the board is solid; where it does not, the board is grey and the player's moves are marked as inference. This makes R's job ("the Picture") the literal mechanic. It keeps canon's statement that GLASSHOUSE itself is never played: what is played is Aya's model of it.

**Alternative (B) — a pre-GLASSHOUSE Hana memory.** A self-contained earlier Hana operation (the control repo's draft "Fails Safely" pin, `data/prim3/world-missions.json`), played straight, with no link to her death. Cheaper; loses the investigation hook; front-loads a dead character with no living frame.

**Alternative (C) — defer Hana.** LVL-03 goes to another R (Oksana or Rafael, the canon owners) and Hana's solo moves to E17 as a playable memory. Safest for spoilers; breaks the owner-approved trio.

**Spoiler layering (what the player learns, and when):**

| When | The player learns | Still hidden |
|---|---|---|
| LVL-03 | Hana existed, Aya loved her, she died at North River, she was observing something on the day, and the record has a 4-minute hole | NIS; that the hole was made; PRIM2 |
| E08 (App Attacks) | Hana as memory; a Kkeutori game exists | that Kkeutori carries clues |
| E12 (IoT) | a Kkeutori echo; the building can withhold state | who withheld it |
| E14 (CapEx vs OpEx) | GLASSHOUSE was argued over: Amira said stop, Marc said continue | why the information was missing |
| E17 (Patch Work) | the decisive ん dead end; Hana hid a trail; "your turn" | NIS can still be held back (`story/ENSEMBLE-EPISODE-CHARACTER-DEVELOPMENT-MAP.md` ep 18 note) |
| E20 (Evil Twin) | PRIM2's confession: he removed the information that would have stopped the machine | — |

> **CHANGE CONTROL — §2 (OWNER-APPROVED 2026-11-02)**
> - **Existing canon:** LVL-01 WATCH-first with an authored PLAY fragment; LVL-02 ensemble (Nusrat / Miguel / Aya); LVL-03 ensemble (Oksana / Rafael / Valeria); no solo missions; GLASSHOUSE never playable; Benji has no stated nationality.
> - **Proposed replacement:** LVL-01 Benji (US, E) solo; LVL-02 Aya (Japan, T) solo; LVL-03 Hana (South Korea, R) solo as Aya's reconstruction; WATCH ownership of E02/E03 unchanged; the E03 facility becomes the reopening North River hub; `CANON.md` §14 gains an authored-solo exception; Benji's nationality recorded as US.
> - **Reason:** owner direction (the first three characters with the most lore are the first three missions; solo; E/R/T).
> - **Downstream files:** `CANON.md` §14 and §21; `episodes/S01E01-THE-BLIP.md`, `S01E02-WHITE-GREY-BLACK-HAT.md`, `S01E03-OSINT.md`; `game/LVL-02-PERMISSION-SLIP.md`; new level docs for LVL-01 and LVL-03; `story/EPISODE-MISSION-BIBLE.md` §7; `story/ENSEMBLE-POV-AUTHORITY.md`; `story/PRIME-LURK-LEDGER.md` rows 01–03; `story/HITMAN-CAST.md` (Benji nationality); `learning/course/course-feed.json` M01–M03 sources; `story/missions/HIGH-ALERT.md`.
> - **Owner approval:** 2026-11-02, "I agree with the first three missions. ERT. Yes. And they should be solo missions." Order within the trio: Owner Question 1.

## 2.6 Anti-spoiler checks for the trio

- PRIM2 is never seen, named or voiced in LVL-01–03. His only trace is institutional: an identity overlay, a missing four minutes.
- McCluster is not playable. He appears in WATCH (E01 intake; E02 onboarding; E03 edge).
- No Hitman prequel: LVL-01 never says who refused the chair or that Benji and McCluster know each other.
- No JANUS (unmerged; and its genetics thread is the owner's call).
- Hana's NIS role, GLASSHOUSE causality and the Living Root stay hidden until the ladder in §2.5 allows them.
- "Background truth is not disclosure permission" (`CANON.md` §8) governs every line of dialogue in the three solos.

---

# 3. The creative-layer cover

## 3.1 The rule (owner direction, 2026-11-02)

> **Every planned storyline mission opens in the middle of a professional shoot — photo, video or music film — that is the creative-layer cover, with the operator already concealed. Only emergency missions open any other way, and storyline missions are planned.**

The owner: "The mission should start mid professional shoot and under concealment, low key … Unless it's an emergency mission. All storyline missions are planned."

## 3.2 Why this is already PRIM3 (grounding)

The rule is new, but every part of it is already in canon or in the owner's lyrics:

- **The music film is already the brief.** Every episode runs HUMAN TRIGGER → MUSIC FILM / OPERATIONAL BRIEF → THRESHOLD → MISSION → AFTERMATH; "the briefing teaches the model; the mission attacks the model" (`CANON.md` §1; `story/EPISODE-MISSION-BIBLE.md` §1). The shoot that covers the mission and the film that briefs it can be the same production.
- **The building has a creative floor.** F4 Media + Culture holds Priya (Brand), Maren Quill (Communications / Media desk and *recording access*), and "producers, editors, audio/video technicians, communications staff, designers and creators"; "F4 can be used for literal recording/media production"; "Songs live in the building" (`story/EQUITY-UPRISE-WORKPLACE-CANON.md`; `story/EPISODE-WORKPLACE-LOCATION-MAP.md`).
- **Ordinary work breaks into the mission.** S1E2's ACT II "THE CALL" pulls the team out of onboarding, and the aftermath is "THE ONBOARDING THAT WASN'T" (`story/episodes/S1E2-PERMISSION-SLIP-LONGFORM-TREATMENT.md` Scene 14). S2E2's prestigious exercise becomes real, and Chioma calls REAL-WORLD (`episodes/S02E02-RED-BLUE-PURPLE-WHITE-TEAM.md`).
- **Real work as cover.** Hana's cover was real engineering that genuinely improved the institution (`story/AYA-HANA-INTELLIGENCE-CANON.md` §5). Kkeutori hid clues inside real jokes: "Hana's jokes are the camouflage" (`story/AYA-HANA-KKEUTORI-BREADCRUMB-CANON.md` §9).
- **The cover-story principle.** "The strongest cover story is one that remains accurate at the level where the target is allowed to observe it" (`story/PRIM-DUAL-MEANING-AUTHORITY.md` §2). The shoot is a real shoot. The footage is really used.
- **The owner's lyrics already say it.**
  - Dealer Plates (Whip Equipped): "If you with the cops, this for entertainment" — art as alibi.
  - RAID (Hot Site): "It's a front for a warm environment" — the shop that sells nothing.
  - Evil Twin: the kiosk, "I fix your phone for the cheap" — a service counter as a cover.
  - Anti Social Engineering: "Don't think I'm broke cause my appearance" — looking like nothing.
  - Virus Types: "Photogrammetric mission… Different type of shoot that day" — the camera is the mission.
  - I AM HERE, **Who Did The Shoot**: a photographer selling shoots, "lights, camera, action… set, be quiet", "hit you with the 45 / Millimeter". This is the cover's theme song in spirit: the question every mission's aftermath leaves behind is *who did the shoot?* (The song stays on I AM HERE; it is cited as a source of imagery, not reassigned. See §5.3.)

Whip Equipped and I AM HERE songs are not reassigned to PRIM3 episodes; their imagery informs the device (`story/MCCLUSTER-PSYCHOLOGICAL-BACKGROUND.md` §20 forbids moving songs between eras).

## 3.3 The structure (reusable for every planned mission)

```text
1. COVER      the shoot is already rolling; the operator is concealed and on set
2. TELLS      three small wrongnesses the player can notice (one per sense: seen, heard, logged)
3. BREAK      the operator leaves the shoot for the mission (chosen at a tell, or forced by exposure)
4. MISSION    the canonical objective, under the episode's clocks and scope envelope
5. RE-COVER   the operator gets back on set before the take ends, or the cover is burned
6. AFTERMATH  what the footage shows, who noticed, what it cost the people on set
```

Six rules make the cover honest:
1. **The shoot is real.** Its footage is used afterwards (a recruiting film, a music video, a reopening documentary). No fake productions.
2. **The crew mostly does not know.** Most people on set are doing their jobs. Concealment protects them as much as the operation.
3. **Planned means planned.** The operation was scheduled before the shoot; the shoot was chosen because it puts the right people in the right place with cameras that are allowed to point at things.
4. **A break is a decision, not a cutscene.** The player chooses when to break; breaking early is safer for the objective and worse for the cover.
5. **Re-cover is optional, and its absence has residue.** A burned cover is a story event: a director who saw something, footage someone must now explain.
6. **No real tradecraft.** Concealment and cover are abstracted game states. Missions teach defensive, architectural and evidence work; never real evasion, pretexting procedure or intrusion (`game/LEARNING-MISSION-SOURCE-OF-TRUTH.md` §28; `game/SCOPE-ENVELOPE-AUTHORITY.md` §10).

## 3.4 The mechanic: the Cover meter

The tactical engine already has unit concealment: a concealed mover is detected inside `detectionRadius` (default 5), cameras spot like units, and detection fires `CONCEALMENT_BROKEN` / `DETECTION` (branch `claude/t-control-rules-20261102`, `game/TACTICAL-T-CONTROL-RULES.md`). The Cover meter sits *above* it, at mission level.

| Element | Rule (proposed) |
|---|---|
| Start state | Mission opens in the COVER phase. The operator is **concealed** (engine state) and **on set**. Cover = 100. |
| On-set zone | Tiles marked as the shoot (set, video village, gear carts, trucks). Inside it, ordinary verbs read as crew work. |
| Spending Cover | Off-set movement in view of non-hostile witnesses (crew, public): −10 per witnessed move. Carrying mission kit in view: −15. A T control action on a camera that is part of the shoot: −20 (the director notices the dead monitor). |
| Hostile detection | Unchanged engine rule: hostile detection breaks concealment (`CONCEALMENT_BROKEN`). It also drops Cover to 0 and forces BREAK. |
| BREAK | A player action (0 AP) available at any tell. Starts the episode's mission clocks (Approach / Window / Extract, as in `game/LVL-02-PERMISSION-SLIP.md`). The shoot keeps rolling around the mission. |
| RE-COVER | Reach an on-set tile with Cover > 0 and spend one full round unobserved by hostiles. Restores concealment and ends EXTRACT cleanly. |
| What Cover cannot do | It cannot erase Heat or Detection, rewind or remove consequences (`CANON.md` §15 rule for all interventions). |
| Grading | Cover is reported inside the Operational channel; it does not merge with Technical Mastery, Independence, Transfer or Compliance (`game/LEARNING-MISSION-SOURCE-OF-TRUTH.md` §19). |
| Aftermath | Cover at extraction picks the aftermath variant: **clean** (> 60), **noticed** (1–60: one named crew member saw something and will remember it), **burned** (0: the footage must be explained, which becomes a relationship write). |

Phase mapping onto the existing model `BRIEF → APPROACH → ON_OBJECTIVE → EXTRACT → AFTERMATH` (`game/TACTICAL-CORE-MECHANICS.yaml`): COVER and TELLS run during BRIEF/APPROACH; BREAK opens ON_OBJECTIVE; RE-COVER is EXTRACT.

## 3.5 Beat sheets for the first three missions

### LVL-01 — Benji (E) — "The Blip" — solo

**The shoot.** A Hitman-affiliated artist's music video at a fictional harbour-side cold-storage yard outside Bridgeport, Connecticut, rented as a location. Hitman began "through friendship, music and shared danger"; its people already live behind studio and street-media identities (`story/HITMAN-CHARACTER-DOSSIERS.md` "Civilian Tuesday" lines). Benji is on set as what everyone thinks he is: the man who paid for the video. He is in the frame for one shot, standing still, which is why he can stand anywhere.

**Planned objective.** One of his people, **Rae "Twin" Colton**, has been held inside the yard's office by the yard's private security since the night before, over a debt that is not hers. Benji booked the shoot to be inside the fence in daylight with a reason to have trucks, lights and twenty people. He came himself because he does not send people to fix things that touch his name.

| Beat | What happens | Type lesson |
|---|---|---|
| COVER | Cold open after the High Alert cold open and the rewind title. Mid-take: playback, smoke, a dancer, a drone on a tether. Benji concealed among the crew. | E reads a space as routes, doors and people. |
| TELL 1 (seen) | The yard's cameras, dead all week according to the location scout, are live. Their status lights change in sequence, one after another, as if something is walking down the line. | — |
| TELL 2 (heard) | A guard on the radio: "the update went through overnight." | — |
| TELL 3 (logged) | The crew's drone loses its link for a second each time it passes the office. | — |
| BREAK | The camera nearest the set turns and holds on Benji. A face box appears on the guard's tablet. The player can break now, or play one more take and lose Cover. | Breaking early is safer for the objective, worse for the cover. |
| MISSION | Entry through the loading dock under the playback noise; physical control of two doors; protect Rae on the way out; pull the yard's local video recorder from the office rack. Hostile guards may be fought; the objective is extraction, not killing. Benji does not touch machines the way T does: he breaks them or carries them. | **E: entry, control, protection, tempo.** |
| RE-COVER | Rae walks back into the last take as an extra in a borrowed jacket; Benji returns to his mark. "That's a wrap." | Re-cover is a choice with a reward. |
| AFTERMATH | In the car, Benji scrubs the recorder. Over his own face the overlay reads `SUBJECT REACQUIRED · CONFIDENCE RESTORED`. He has never seen this system. **Hard cut** to WATCH: a college intake desk, a man of 33 with new waves in his hair, the same overlay on his photo. The player does not know why these two men share a screen. | The succession triangle, seeded by cause, not exposition. |

**Lyric idea.** High Alert's "FBI Lurkin' … wire nervous" and "Catch a demon slacking, that's a suit and tie service": the watched man who watches. The song stays PRIM2's performance in the cold open; Benji's level plays under its stems.

**Development write.** Benji: his first fear made visible (something larger watches him). Rae: owes Benji, and resents owing him (she becomes E04's anchor with this residue). PRIM2: one more subject reacquired (`story/PRIME-LURK-LEDGER.md` row 01).

### LVL-02 — Aya Shinoda (T) — "Permission Slip" — solo

**The shoot.** F4's onboarding and partner-showcase film, produced by Maren Quill with Priya's brand direction, on location at **Harborline Edge Exchange**, a fictional multi-tenant edge/data facility and Equity Uprise partner. Aya is the featured engineer ("the Field-T bench, explained"). In WATCH, McCluster's onboarding cohort is back at F1 watching the livestream on a lobby screen, swag bags at their feet.

**Planned objective.** The lawful task-force operation at Harborline (canon: "white hat / black box", a scope envelope) was scheduled for the same day. The shoot puts a technical team inside a multi-tenant building with gear cases, cable runs and a reason to open cabinets, without telling the tenant under investigation. To McCluster, the urgent call later in the day looks like an emergency. It was the go signal. "THE ONBOARDING THAT WASN'T" now has a second meaning: the onboarding was the cover.

| Beat | What happens | Type lesson |
|---|---|---|
| COVER | Mid-walk-and-talk: Aya explaining hot aisles to camera. Concealed: her deck reads as a prop. | — |
| TELL 1 (seen) | A rack's power draw on the facility display does not match the manifest. | T sees state, not stories. |
| TELL 2 (heard) | Nusrat on comms: "Scope is Zone C. Only C." | Permission is a boundary, not a suggestion. |
| TELL 3 (logged) | An unmanifested device on Harborline's network answers to the same identifier as the device found in a new recruit's onboarding kit (canon E02 human trigger). The recruit is McCluster. | — |
| BREAK | Nusrat (off-board) calls `AUTHORIZED: ZONE C`. Aya leaves the shot "to get a better angle on the cooling plant". | — |
| MISSION | Canon O1–O7 compressed for one operator: lawful entry inside the envelope; identify the right assets; preserve evidence; discover the hidden dependency; **earn knowledge** (request a scope extension, or violate scope and own it); resolve and VERIFY; extract. T kit at level 1: sidearm holstered; JAM (1 AP, ≤ 8 tiles), TAKE CONTROL (2 AP, ≤ 6 tiles, observed machine), SYNC PULSE once; machines only, "people are never targets" (branch `claude/t-control-rules-20261102`). Miguel holds the exterior off-board. | **T: the system, under permission.** |
| RE-COVER | Back to her mark for the pickup shot; the cooling plant B-roll is real and goes in the film. | — |
| AFTERMATH | The film ships. Aya's notebook has one new line: a recruit's kit talked to a black box. Her first unresolved question about McCluster (canon E01 micro-write, moved here). Coda: PRIM2's ROOT VIEW grades Aya and Nusrat (`story/episodes/S1E2-PERMISSION-SLIP-LONGFORM-TREATMENT.md` Scene 16), unseen. | — |

**Lyric idea.** White Grey Black Hat: "White is like mask off, grey is like half off … black … full mask on"; "Na we didn't force it got permission"; "Unless you with the cops then we're malicious". Aya's mask is the shoot; her permission is Nusrat's word.

**Development write.** Aya: permission as her instrument. Nusrat: earns "boundary-reliable" in PRIM2's ledger. Miguel: humane enforcement at the door. Maren: has footage of a room the film never needed. McCluster (WATCH): the device in his kit makes him a question.

### LVL-03 — Hana Lee (R), as Aya's reconstruction — "Open Book" — solo

**The shoot (present day).** F4 is shooting the **reopening film** for the North River Medical Logistics Hub, two years after GLASSHOUSE. Oksana and Rafael's Open Book case (the missing equipment shipment before the opening; the scapegoated junior coordinator) is the WATCH A-plot. Aya is on the shoot as the engineer who signed off the new safety system.

**The shoot (two years earlier, inside the reconstruction).** On the day of GLASSHOUSE, F4 was also on site, filming a "robotics in medical logistics" piece with Hana as its on-camera lead. That shoot was Hana's cover that day. Its rushes still exist on an F4 archive drive. **Who did the shoot** is the question Aya cannot stop asking.

**Planned objective (Aya's).** Aya brought the old rushes to the reopening shoot to stand where Hana stood and rebuild the day. She tells nobody. It is the last time she will let herself try.

| Beat | What happens | Type lesson |
|---|---|---|
| COVER | Present day, mid-take: Aya's interview for the reopening film. Concealed: her tablet holds two years of evidence. | — |
| TELL 1 (seen) | The new floor markings differ from the rushes by a metre. | R compares pictures. |
| TELL 2 (heard) | Oksana, in the A-plot, to her junior team: "Two sources repeating each other are one source." | Corroboration is not repetition. |
| TELL 3 (logged) | The rushes' timecode jumps by four minutes in the shot where Hana walks out of frame. | — |
| BREAK | Aya steps out of her interview. Hard transition: **the player is now Hana**, in the reconstruction, on the old set, concealed among her own film crew. | — |
| MISSION | Hana's day as the evidence shows it. Solid tiles where footage, logs and notes agree; grey tiles where only one source exists; dark tiles where nothing exists. R kit: overwatch rifle slung (unused), optics, observation. Objective: build the picture: where Hana went, what she watched, what the machine was doing, what the safety system reported. Every move into grey or dark is logged as **inference**, with a confidence value. The reconstruction **ends at the four-minute gap**. The player cannot enter it. | **R: the picture, and the discipline not to overclaim** (Memory 02, "refusing an overclaim"). |
| RE-COVER | Aya returns to the interview chair. The director asks if she is all right. She says the lighting was in her eyes. | — |
| AFTERMATH | Aya writes "governance failure" in her notebook and underlines it. She believes it. That belief is her canon state for the next 14 episodes. The four minutes go into a folder she will not open until Kkeutori makes her (E17). | — |

**Lyric idea.** OSINT: "They say they never compromised but I see a lot of indicators"; "Load the info up, record it". The song's temptation is leverage; Aya's answer is restraint.

**Development write.** Aya: grief disciplined into a method, and a wrong conclusion reached carefully. Oksana: becomes, without knowing it, the person whose method saved Aya from an overclaim (seeds their later respect). Rafael: notices Aya watching the old floor markings. Hana: becomes a person the audience misses. PRIM2: nothing; the four minutes were his, and he does not need to touch them again.

## 3.6 Applying the rule to the other 18 episodes (PROPOSED)

Most episodes take the rule naturally (see the "proposed cover" column in §5). Three canon episodes are emergencies:

- **E05 Four Colors:** a red-vs-blue exercise is interrupted by a real anomaly. *Proposed:* the exercise is filmed for a recruiting reel (the cover); the anomaly is the hidden complication inside a planned exercise. The mission (terminate the exercise cleanly) is planned; the incident is not.
- **E06 Dead Air:** severe weather. *Proposed:* F4 is recording the "Got Wifi" blue-team anthem at a crowded partner facility as cover for a planned resilience audit; the storm hits mid-shoot. The audit was planned; the storm is the complication.
- **E16 Road Kit:** a remote emergency site. *Proposed:* this stays an **emergency mission**, the series' one honest exception, and it is McCluster's: the man who lived in cars works best when nothing was planned. (Owner Question 6.)

---

# 4. Characters: how they build on each other (PROPOSED)

## 4.1 Introduction order with the trio

| When | Who arrives | Through whom | What they give the next person |
|---|---|---|---|
| E01 | **Benji** (PLAY); McCluster, Aya, Chioma, Leila, Helen, Pylon (WATCH); PRIM2 as a future voice | the identity update | Benji gives the audience the threat; McCluster gives it the question |
| E02 | **Aya** (PLAY); Nusrat, Miguel, Priya, Maren | the onboarding shoot | Aya gives McCluster a first critic; Nusrat gives Aya a scope she respects |
| E03 | **Hana** (PLAY, in memory); Oksana, Rafael, Valeria | the reopening shoot | Hana gives Aya a reason; Oksana gives Aya a method |
| E04–E06 | Sora, Keys; Thandiwe, Grace, Arjun, Sari; Yonas, Hassan, Emre, Jonas | the first ensemble boards | E, R and T meet; the first death (E06) |
| E07–E09 | Li, Amira; Minh; Dmitri | Season 3, Trust | the building watches back |

## 4.2 The top tier: the relationship web and how each grows

**McCluster (protagonist; Wildcard).** He is defined by who he *learns from*. Every episode he appears in should leave a specialist's habit on him (`CANON.md` §5). Arc: capability → consent. Built by: Aya (permission), Valeria (what earlier support would have made him), Chioma (leadership is not experience), Benji (the path he refused), PRIM2 (what he could become). *Proposed addition:* the onboarding-kit device (LVL-02) makes him a suspect before he is a colleague; he spends Season 1 earning back the trust a planted object cost him, which makes his later Wildcard authority mean something.

**Aya Shinoda (T).** Built by Hana (her reason), Ren (her proof that she can build a way back from loss), Helen (the institution that gave her real agency), McCluster (the man who reopens what she closed), Minh (the peer who is not her copy), Oksana (the method; new link from LVL-03). Arc: indictment → capture → contestable trust. *The trio makes her the player's guide:* she is played in LVL-02, and she is the mind the player inhabits in LVL-03.

**Hana Lee (R, in memory).** Built only through others: Aya's memory, Kkeutori, Amira's "stop", Marc's "continue", the four minutes. Arc after death: from "mentor who died in an accident" to "the person who got further than anyone". Her growth is the audience's understanding of her.

**PRIM2.** Built by what he chooses not to do. He watches Benji (LVL-01), grades Aya and Nusrat (LVL-02), owns the four minutes (LVL-03), and never takes over. Arc: the watcher who believed competence justified unilateral judgment learns, too late, what the people he graded would have chosen. His one rule (`OBSERVING != TAKING OVER`) is the rule McCluster inherits.

**Benji.** Built by the chair, by Sable's realism, by the loyalty of people like Rae, and by the slow discovery that his reign was inside someone else's architecture. Arc: authority as identity → the RAID alliance → a living, independent counterweight after Ghost. *The trio gives him the series' first sympathy:* he went in himself for one of his people.

**Ren Shinoda.** Aya's brother; the person whose leg she rebuilt. He is how the audience learns that Aya fixes people the way she fixes machines, and why that frightens her about McCluster ("worries McCluster became another project Aya must save", `story/AYA-CIRCLE-RELATIONSHIP-WEB.md`). Appears in E17 if needed; *proposed:* a phone call in E03's aftermath, where Ren is the only person Aya tells about the four minutes, and he tells her to stop.

## 4.3 Fleshing out the thin characters (PROPOSED)

**Arjun Mehta (India, 35) — the only PRIM-side E.** Now that Benji is the first E the player meets, Arjun's job is clear: **he is the E who stops.** Benji enters to own the outcome; Arjun enters so nobody else has to. Canon gives him industrial safety, a colleague who died because management delayed, and the fear of freezing (`story/PRIM3-CHARACTER-DOSSIERS.md` 03).
- *Entry:* E05, as the person who reaches a door before the exercise has decided whether it is real.
- *Mirror:* Benji. Both are physically brave; Benji makes loyalty a debt, Arjun refuses to let anyone owe him.
- *Owned beat:* E10, the rescue that interrupts Valeria's perfect plan; he freezes for one breath and says so out loud.
- *Relationship to add:* Arjun ↔ Hassan (doors vs access doctrine, already a canon friction), and Arjun ↔ Ren (two people who think about bodies, load and failure; a friendship that survives Aya).
- *Proposed endgame weight:* a strong RAID-roster candidate, because his death would remove the one person whose job was making entry survivable.

**Dmitri Volkov (Russia, 44) — Building Guard.** Canon: cleared by evidence, not sympathy (E09), reads Oksana's analyses more carefully than anyone's.
- *What is missing:* a reason to care about him before E09. *Proposed:* he is in LVL-03's WATCH as North River's interim site security lead, the man who walked Hana's crew in two years ago and who has never been asked about it. He says one sentence to Aya about how Hana "always looked at the exits". Aya does not follow it up. In E09, when he becomes the convenient suspect, the audience already knows he has carried something quietly for two years.
- *Relationship:* Dmitri ↔ Oksana (earned trust, E09); Dmitri ↔ Aya (one unasked question, paid off in E17 when Aya finally asks him).

**Thandiwe Nkosi (South Africa, 35) — Cohort-03 Lead peer.** Canon: mining automation and worker safety; fears legitimizing what she cannot change; keeps a draft plan for "after Prime".
- *Proposed spine role:* **the person who asks what happens after the watcher.** Her draft is the ensemble's version of Ghost's question. In E05 she challenges Chioma; in E13 she argues that shared responsibility means nobody is responsible; in E18 her draft becomes evidence that someone inside already imagined a world without PRIM2, which splits the allies (canon "allies split").
- *Relationship to add:* Thandiwe ↔ Li Wei (two governance minds: Li designs accountability; Thandiwe asks whom it is accountable to), and Thandiwe ↔ Benji in Evil Twin's remote ensemble (the reformer and the sovereign, both told their institutions were instruments).

## 4.4 Benjamin "Benji" Chase — McCluster's clone (RESOLVED, owner 2026-11-02 and 2026-11-03)

**Canon now.** The character canon called Royce is **Benjamin "Benji" Chase**: a government-programme clone of McCluster, "low-key McCluster's evil twin". Benjamin Chase until he takes the Hitman chair McCluster refused; **Hitman Benji** after. A separate person with his own choices. Origin authority: `story/BENJI-CHASE-JANUS-ORIGIN-CANON.md`, adapted from the October branch (taken: the archived infant sample, the edited white-presenting derivative born seven years after McCluster, the upbringing through proxies, the "alternate root candidate" purpose as PROPOSED, Brandon's "federal" warning as PROPOSED, the reveal ladder, the person-not-caricature rules; not taken: the branch's "Benji = McCluster" lock, the parents' schooling timeline, the digital-performer record).

**What it does for the spine.** The man watching McCluster from the other board was made from him. Evil Twin's title now works at two scales: the rogue access point that looks like the real one, and the man who looks nothing like McCluster but came from him. RAID's near-kill and alliance become two versions of one origin choosing differently.

**McCluster's Hitman-era deeds stay his,** including the New Mexico retaliation (owner, 2026-11-03: "The retaliation he did was all him").

**Machine keys** `royce_*` in game data are kept and refer to Benji (alias note in `CANON.md` §9).

**Real-world note.** The platform account "Hitman Benji / Benji Chase" belongs to the owner's fiction (owner, 2026-11-03). Story files say nothing about any real person.

**Ghost (RESOLVED, owner 2026-11-03).** Ghost is McCluster's "ghost mode": "he's been ghosted from the view of everyone … under the radar." A state and an era (ages 26–33), not an alias, with no link to Benji. Canon text: `CANON.md` §9; `story/MCCLUSTER-PROTAGONIST-CANON.md`. The rhyme with PRIM2's "Ghost in the Wires" stays: one man went off the grid, the other never left the wires.

---

# 5. Songs ↔ episodes, in the written order (PROPOSED except where marked)

Order: `story/EPISODE-PROGRESSION.md` (owner decision 2026-11-02: "the order on paper"; that this means EPISODE-PROGRESSION is flagged as an assumption, Owner Question 2). Key lyric ideas are short paraphrases or quotes of a few words; the owner's wording is in `source-material/*/LYRICS.md` and the control repo's `data/lyrics/src/*.txt`. The **proposed cover** column applies §3.1 and is PROPOSED except LVL-01–03 (owner-approved).

| # | Song | Mission | Characters (owners; **solo** for 01–03) | Key lyric idea | Proposed cover (the shoot) |
|---:|---|---|---|---|---|
| 01 | High Alert | The Blip | **Benji solo (E)**; WATCH: PRIM2 / McCluster / Benji | the vigilant man who is himself watched ("FBI Lurkin'"); the fight on paper ("waivers and the mitts") | Hitman music video at a Bridgeport yard |
| 02 | White Grey Black Hat | Permission Slip | **Aya solo (T)**; WATCH: Nusrat / Miguel | masks off, half off, on; "got permission"; corporate vs trenches | F4 onboarding / partner film at Harborline |
| 03 | OSINT | Open Book | **Hana solo (R), as Aya's reconstruction**; WATCH: Oksana / Rafael | indicators nobody admits; information as leverage, refused | F4 reopening film at North River |
| 04 | Anti Social Engineering | The Human Layer | Priya / Sora | looking broke as camouflage; the DEF CON find | F4 event livestream (Priya's event) |
| 05 | Red Blue Purple White Team | Four Colors | Chioma / Thandiwe | every colour has a seat; "corporate gets greedy" | recruiting reel of the exercise (§3.6) |
| 06 | Got Wifi | Dead Air | Sari / Yonas | the blue-team anthem; "Prime HAK5", the only literal "Prime" | anthem recording at a partner facility (§3.6) |
| 07 | Data Breach | Exposure | Leila / Li | "this is how you know"; the precinct tracing an address | internal training-video shoot inside the building |
| 08 | App Attacks | Bad Input | Aya / Minh | the helper in the debugger who did it himself | product demo shoot for the dispatch app |
| 09 | Virus Types | Patient Zero | Dmitri / Oksana | "different type of shoot that day": the camera is the mission | photogrammetry survey shoot of B1 |
| 10 | Installation Types | Clean Install | Valeria | repair in place, "building not erasing" | site documentary of the old remote site |
| 11 | Dive In | Dumpster Signal | Grace / Rafael | the drone that follows you home; "what he need a gun for?" | archive / decommissioning photo shoot |
| 12 | IoT | House of Eyes | Jonas / Pylon | every device "spies for me" | smart-building showcase video |
| 13 | IaaS, SaaS, PaaS | Shared Responsibility | Helen / Li / Yonas | the service pitch; "outside of the Hague" | vendor case-study shoot |
| 14 | Cap Ex Vs. Op Ex | Own the Exit | Amira / Marc | owning vs renting; "ghost it" | board-presentation film (planning POV) |
| 15 | Trappin From The Cloud | Elastic | Sari / Sable | block to cloud; the friend who plots when you get paid | international launch livestream; Hitman parallel launch party |
| 16 | Per Diem | Road Kit | McCluster / Valeria | "We really on the job … Y'all per diem" | **emergency: no cover** (§3.6) |
| 17 | Patch Work | Trust Boundary | Aya | "since the sandbox"; found the trojans; "one night I can patch it up" | F4 retrospective shoot: Aya re-interviewed about North River |
| 18 | **Song #21 — OPEN** | Mission #18 — OPEN | Leila / Helen / McCluster (function locked) | — (no lyrics exist) | open |
| 19 | RAID (Hot Site) | Hot Site | McCluster / Benji / PRIM2 | the shop that sells nothing, "a front for a warm environment" | the assault approaches under a commercial shoot permit at the perimeter |
| 20 | Evil Twin (Middle Man) | Mirror Room | PRIM2 / McCluster / Benji | "so many identities"; "I see the news … it's a distraction" | none (post-RAID, inside Site 0) |
| 21 | Ghost In The Wires | Last Process | McCluster / PRIM2; Benji secondary | "I move in silence"; "missing daylight" | epilogue: the next onboarding film, with a new face at the Fellowship Desk |

**What the table changes in canon:** nothing except LVL-01–03's PLAY owners (approved). Songs, missions and WATCH owners are canon (`CANON.md` §21).

## 5.2 Researcher's secondary fits (PROPOSALS ONLY)

These are flashbacks, source cues or in-world artefacts; none replaces an episode's own song, and Whip Equipped music stays in its era (`story/MCCLUSTER-PSYCHOLOGICAL-BACKGROUND.md` §20):

| Song (album) | Proposed secondary use | Lyric reason |
|---|---|---|
| Who Did The Shoot (I AM HERE) | imagery for the cover device; E09 | "Different type of shoot" answers "who did the shoot?" |
| Antisocial (I AM HERE) | E04's social engineer's public persona | the coach who is always on social |
| Upset (Hitman Halo credit) | Benji/Hitman texture before RAID; Benji Chase question | "the scope of the place and the codes to your safe" |
| Money or the Power (Docket 516R) | E13 / Season 5 theme | "build a tower and take all that is ours" |
| Deep End (Heal the 3) | E06 human cost (avoid its real-world political lines) | "Turning on the news, I see the reaper" |
| Please Set Me Free, Environmental Injustice (Docket 516R) | McCluster's summer policy fellowships (off-count) | Bridgeport, housing, "Operation Land Grab" |

Whip Equipped songs (Salvage Title, Test Drive, Dealer Plates, Repo Guy, Towyard Killer and the rest) are cited only as imagery. Placing any of them in PRIM3 needs the owner (Owner Question 9).

## 5.3 Missing lyrics and Song #21

- **Song #21 (E18):** no title, no lyrics anywhere. Its job is locked (`CANON.md` §21: the shared root becomes verifiable; allies split; McCluster decides to challenge). Working concept "CHAIN OF TRUST / TRUST ANCHOR" is not locked. *Do not fill it from existing songs.*
- **Owner wording still missing:** the unsheeted High Alert intro (four lines); the extra RBPW verse (thirteen recorded lines not on the sheet; the recogniser heard "I'll be on all teams").
- **Fragmentary or low-confidence:** IoT (8–9 lines); Anti Social Engineering timed at 0.543.
- **Not on the control-repo shelf / sheets missing there:** White Grey Black Hat, IaaS/SaaS/PaaS, Cap Ex, Patch Work (sheet, no audio); Virus Types, Installation Types, Trappin From The Cloud (only in Prim3 `source-material/`).
- **Title variants to settle:** "Tears Don't Fall" (Prim3) vs "Tears Won't Fall" (control repo, owner's audio file name).

---

# 6. Globe game alignment (PROPOSED)

## 6.1 The owner's direction

PRIM3 agents watch the news worldwide and turn reports into missions; tapping a region shows the agent there; geographic data (markets and so on) shapes missions; "realistic and fun".

## 6.2 The framing: "on location", from one HQ

Canon says everyone operates from one US building, Equity Uprise HQ ("Same building. Same people.", `CANON.md` §2). The creative-layer cover solves the globe without changing that: **agents abroad are on location.** F4's location production unit travels; a crew abroad is shooting something real (a partner documentary, a market feature, a music film), and the operator is on that crew. Tapping a region shows **who is on location there, what they are shooting, and what they are really watching.**

- No canon change: nobody lives abroad; they are on assignment from HQ.
- It explains why the agent is there (the shoot), how they are concealed (the cover), and what the mission is (the break).
- An owner canon change ("PRIM has regional desks") remains possible but is not needed (Owner Question 7).

## 6.3 News → missions, safely

- **Reviewed transformation, never a feed.** The PRIM3 Halo world must not ingest live intelligence feeds (control repo `docs/prim3/HITMANS-HALO-WORLD-CANON.md` "Halo Ops vs PRIM3 Halo"). A news item becomes a *fictional* incident at a *fictional* site in a real country, reviewed before it ships. Real countries are settings, never enemies.
- **Never an action mission.** Equity Uprise's real-world action missions (`action_missions`, live video and proof) are a different product. PRIM3 globe missions are never written to or rendered as them, and the word "mission" must be visibly distinguished on the shared World globe.
- **Markets and geography shape the mission**, not the plot: a port city gives logistics and cooling problems; a hot dry region gives power and heat; a dense market gives crowds and wireless contention. The learning binding (concept IDs, module, objectives) comes from the matching core episode.

## 6.4 How globe operations relate to the 21-episode spine

| Layer | What it is | Canon effect |
|---|---|---|
| The 21 episodes | the story | canon |
| Halo campaign "3 introductions + 21 cores × 3 variants" (control repo) | **the 3 introductions are the three solos (Benji, Aya, Hana).** Their canon sites are all in the US (Bridgeport, Harborline, North River), which satisfies "three distinct locations". The 63 variants (A recognize, B apply, C adapt) of each core are its location shoots elsewhere | variants are side operations: no canon writeback, no Wildcard / Apex / Benji pool use, no relationship or casualty state (`game/LEARNING-MISSION-SOURCE-OF-TRUTH.md` §4) |
| Globe pins | side operations "on location", one per region, each tied to a core episode's concept and to a cast member whose heritage fits the place (Halo "character jurisdiction/heritage" rule) | noncanonical, like the Training Range |
| Featured pins | **Benji (US), Aya (Japan), Hana (South Korea)** to match the trio | Aya's Japan pin is a Kariya location shoot (a variant of LVL-02's concept); Hana's Ulsan pin is an **origin card**, not a playable mission, until LVL-03 has been played |

## 6.5 No spoilers on the globe

The globe never shows: Hana's NIS role, the GLASSHOUSE name or causality, PRIM2 (UI says "Executive oversight" at most), the Mantle meaning of PRIM, the Hitman prequel, Benji Chase, or JANUS. Hana appears only as "in memory". McCluster is not a normal globe agent (`CANON.md` §5); his pin, if any, is Road Kit, labelled as authored.

---

# 7. Housekeeping fixes (problem → fix → files) (PROPOSED)

| # | Problem | Proposed fix | Files |
|---:|---|---|---|
| 1 | **Third meaning of PRIM.** Story canon has two (Program for Resilient Infrastructure Management; Primary Root Identity Mantle). The real product has a third: "the PRIM Method: Principles, Rhythm, Immersion and Missions". No story file acknowledges it. | Keep the PRIM Method out of story canon text. Add one production note to `PRIM-DUAL-MEANING-AUTHORITY.md`: the real learning product uses the same letters for its method; story surfaces never present the method as an in-world tier. (Alternative: make it Tier 0, the public meaning; Owner Question 8.) | `story/PRIM-DUAL-MEANING-AUTHORITY.md` |
| 2 | **Runtime.** `CANON.md` §1 says 20–35 minutes; `story/EPISODE-PROGRESSION.md`, `story/SERIES-ARC.md` and `ARCHITECT.md` §3 still say about 9. | Root wins: 20–35 minutes, music film about one track-length. Update the three files. | `story/EPISODE-PROGRESSION.md`, `story/SERIES-ARC.md`, `ARCHITECT.md` |
| 3 | **McCluster's pre-history.** `story/RELATIONSHIP-ECOSYSTEM.md` (CANON) puts McCluster in the "founding years" mesh, trained beside Aya, kept from washing out by Chioma's early evaluation. Canon has him arrive at 33 as a newcomer. | Remove McCluster from the pre-story clusters. Move Chioma's evaluation into Season 1: she signs his first field evaluation after LVL-02, the line "He stopped when she told him to" being what she writes. | `story/RELATIONSHIP-ECOSYSTEM.md`, `episodes/S01E02-WHITE-GREY-BLACK-HAT.md` |
| 4 | **First death timing.** `story/SEASON-ONE-HUMAN-SPINE.md` Movements 5–6 put a developed character's death in Season 1; canon defers it to E06. (`seasons/SEASON-01.md` already fixed on this branch.) | Align the human spine to E06; Season 1's loss is Hana's absence, felt through LVL-03. | `story/SEASON-ONE-HUMAN-SPINE.md` |
| 5 | **High Alert memory owners.** Memory anchors name owner candidates that differ from the locked owners: Mem 05 / E06 (Rafael, Hassan, Aya, Minh vs Sari / Yonas); Mem 07 / E08 (Chioma's command problem vs Aya / Minh); Mem 08 / E09 (Aya, Minh, Leila, Sora vs Dmitri / Oksana); Mem 09 / E10 (McCluster/Aya beat vs Valeria); Mem 15 / E16 (Arjun, Rafael, Sable, Dez vs McCluster / Valeria); Mem 01 / E02 (adds Amira). | Keep each memory's image; re-point its "belongs to" line to the `CANON.md` §21 owners. Add Memory 01 / E02 and Memory 02 / E03 notes for the solos (Aya; Hana as reconstruction). | `story/HIGH-ALERT-MEMORY-ANCHORS.md` |
| 6 | **`AGENTS.md`'s naming ban.** "Do not name unnamed characters, the corporation, the college or the location." Canon has since named the protagonist (McCluster), the corporation (McCluster Corp), the institution (Equity Uprise) and many places. `development/DECISIONS.md` still lists these as open. | Reword: "Do not name a character, college or location that canon has not yet named without owner approval. Named canon (McCluster, McCluster Corp, Equity Uprise, Bridgeport, Kariya, Ulsan, North River) is fixed." Tick the resolved items in DECISIONS. College name, PRIM2's civilian name and the story year stay open. | `AGENTS.md`, `development/DECISIONS.md` |
| 7 | **Bare "McCluster" for the institution** (§1.5). | `CANON.md` §22 writing rule; finish the sweep. | `CANON.md`, story files with remaining hits |
| 8 | **Course feed points at a missing file.** M01 sources cite `episodes/S01E01-HIGH-ALERT.md`; the file is `S01E01-THE-BLIP.md`. | Fix the path. | `learning/course/course-feed.json` |
| 9 | **Training Range certification IDs disagree** between Prim3 YAMLs and the control repo map. | Reconcile to the control repo map (it owns full coverage). | `learning/missions/TRAINING-RANGE-0*.yaml` |
| 10 | **`PRIME-N1` asset IDs** in `phenotypes/` (and "Prime-N1 Prime" in `phenotypes/NAMING.md`). | Rename to `PRIM3-SUIT` when the asset pipeline can take a rename; until then add a note that PRIME-N1 = McCluster after succession. | `phenotypes/**` |
| 11 | **Meridian.** The owner's "the Meridian takeover with someone sent to watch them" matches nothing in canon. | Do not invent. If the owner wants the name, the most natural home is the in-world codename of the outside effort that sent Hana in (revealed late), or the name of the observer thread in production notes. (Owner Question 10.) | — |

---

# 8. Owner questions (each with a recommendation)

1. **"ERT": types or order?** Is the trio's order Benji (E) → Aya (T) → Hana (R), or literally E → R → T (Benji → Hana → Aya)? *Recommendation:* Benji → Aya → Hana, so the player meets Aya before playing her memory of Hana.
2. **"The order on paper."** Is it `story/EPISODE-PROGRESSION.md` (assumed and applied to the song lists)? *Recommendation:* yes; it is the canon order authority and matches the course map and the lyric crosswalk.
3. **Benji Chase.** **RESOLVED 2026-11-03:** Benji is renamed Benjamin "Benji" Chase, McCluster's government-programme clone; dubbed Hitman Benji after the takeover; the account belongs to the owner's fiction (§4.4).
4. **Ghost.** **RESOLVED 2026-11-03:** McCluster's "ghost mode", a state/era, not an alias, no link to Benji.
5. **Benji's nationality and type.** **RESOLVED 2026-11-03:** LVL-01 is Benjamin Chase (United States, E). The `CANON.md` §14 exception for authored solo introductions remains part of promoting §2.
6. **Emergency exceptions.** Under "all storyline missions are planned", are E05 (exercise turns real) and E06 (storm) planned missions with unplanned complications, and is E16 Road Kit the one emergency? *Recommendation:* yes, as in §3.6.
7. **Globe framing.** Agents "on location" from the one US HQ, or a canon change to regional desks? *Recommendation:* on location; no canon change.
8. **PRIM Method.** Keep the real "PRIM Method" out of story canon, or make it the in-world Tier 0 meaning? *Recommendation:* keep it out; the fiction/real boundary is worth more than the wordplay.
9. **Whip Equipped and I AM HERE songs in PRIM3.** May any be used as PRIM3 source cues (e.g. Who Did The Shoot as the cover's imagery), given the canon rule that Whip Equipped music stays in its era? *Recommendation:* imagery and in-world artefacts only; no soundtrack placement without your say.
10. **Meridian.** Do you want the name, and if so for what? *Recommendation:* the late-revealed codename of the outside effort that sent Hana in, or nothing.
11. **Apex Tactical Corp.** After the internship clean-out, keep Apex as a named black-site layer beneath PRIM, or retire the organization and keep "Apex" only as the name of PRIM2's intervention mechanic? *Recommendation:* retire the organization; keep the mechanic name.
12. **E03's facility.** Make the "facility opening" in Open Book the North River hub's reopening, which binds Oksana and Rafael's case to Aya's reconstruction? *Recommendation:* yes; it is the strongest single join in the merged spine.
13. **Song #21.** Title and lyrics for E18 when you are ready; nothing will be filled from existing songs.
14. **JANUS.** **RESOLVED 2026-11-03:** adopted, adapted to "clone of McCluster" (`story/BENJI-CHASE-JANUS-ORIGIN-CANON.md`).
