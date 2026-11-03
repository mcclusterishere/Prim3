# Open Decisions

**Status:** DRAFT

This ledger prevents AI collaborators from silently filling important blanks.

## Identity

- [x] Protagonist's civilian name — McCluster (`story/MCCLUSTER-PROTAGONIST-CANON.md`)
- [ ] Presiding Prime's civilian name
- [x] Corporation name — McCluster Corp; visible institution Equity Uprise (`CANON.md` §19)
- [ ] College name
- [ ] Primary city / region — HQ is in the United States (`CANON.md` §19); exact city open
- [ ] Story calendar year

## Season One

- [x] Episode count and runtime — 21 episodes; WATCH about 20–35 minutes (`CANON.md` §1); stale nine-minute text standardised 2026-11-03; reconciled again against Issue #19 (see 2026-11-03 third round)
- [ ] First cohort size
- [ ] First supporting character to design
- [x] ~~Internship cover department~~ — removed 2026-11-02 (owner: clean out the internship-that-is-secretly-an-exam version). McCluster joins Equity Uprise (`CANON.md` §19). The cover idea is kept as a proposal note only.
- [ ] First field incident
- [ ] First major casualty — Season One deaths allowed (owner 2026-11-03); candidates in `story/STORY-CONSOLIDATION-PROPOSAL.md` §3.7; owner chooses
- [ ] Season finale evidence/revelation

## Succession

- [ ] Exact technical mechanism of Prime authority
- [ ] How the age-40 restriction was implemented
- [ ] How the presiding Prime overrode it at 33
- [ ] How a death is verified
- [ ] What prevents a false or coerced transfer
- [ ] Whether the defeated Prime leaves a final contingency

## Production

- [ ] Character reference format
- [ ] Image model and consistency workflow
- [ ] Animation toolchain
- [ ] Voice policy and performer consent
- [ ] Music/album synchronization
- [ ] Git LFS or external media storage policy

## Owner decisions recorded 2026-11-02 (story consolidation)

These are owner decisions, applied to canon on branch `claude/story-consolidation-20261102`. Wording is the owner's intent as relayed in the session.

- [x] *(Partly superseded 2026-11-03 by the Royce → Benjamin Chase decision below.)* **Benji Chase is a different person from Matthew McCluster.** "Canon text that merges McCluster, Benji and Ghost into one man must be separated." Applied: `CANON.md` §8, §9, §10, §19, §22 and every file that used "Benji" as McCluster's alias. McCluster's age-19-to-26 Hitman scenes are kept and told under McCluster's name. Open: Benji Chase's role; whether "Ghost" is only the name of McCluster's age-26-to-33 life stage (canon today) or also a handle (owner questions in `story/STORY-CONSOLIDATION-PROPOSAL.md`).
- [x] **Track order follows the order on paper.** Assumed to mean `story/EPISODE-PROGRESSION.md` (the canon order authority); the assumption is flagged for the owner. Applied: `story/SONG-STORY-FUNCTIONS.md` and `story/SONG-CHARACTER-COUNT.md` renumbered; the census's Benji/RAID and old SIM-swap Evil Twin rows flagged against canon.
- [x] **Whip Equipped is the prequel** (McCluster, ages 26–33). Applied: `story/WHIP-EQUIPPED-BRIDGE.md` rewritten (the "kill-Prime → dimension → kill alt-self" entry and "that world's Prime killed" economy withdrawn); `story/whip-equipped/SONG-CATALOG.md` "sequel" label withdrawn. The bridge now separates the fictional business from Matthew McCluster's real company.
- [x] **Repair the Sept 24 "Jordan Vale → McCluster" find-and-replace damage.** Owner: "I definitely still want the protagonist to be McCluster, but we don't want the country to be called McCluster." Applied: "McCluster Corp Corp Corp Corp" → "McCluster Corp" (4 files); Layla Mansour's country restored to Jordan (2 files); the self-contradicting "does not enter by joining Equity Uprise / enters by joining Equity Uprise" restored from git history ("does not enter by joining McCluster Corp"); "Infrastructure enters Equity Uprise's life" → "McCluster's life"; about 70 lines where "McCluster" meant the institution now say Equity Uprise (the workplace) or McCluster Corp (the deeper system). The protagonist keeps the name McCluster. "Jordan Vale" is not restored anywhere.
- [x] **Stale "Prime" antagonist leftovers fixed where canon is unambiguous** (McCluster + Royce vs PRIM2, as canon then named him; `CANON.md` §7, §16, §18): `learning/missions/LVL-19-HOT-SITE-GRANULAR.md` (Benji → Royce, later renamed Benji Chase, Prime → PRIM2, state IDs renamed), `seasons/SEASON-01.md` cold open, `story/AYA-CIRCLE-RELATIONSHIP-WEB.md` §10 heading, `story/AYA-HANA-INTELLIGENCE-CANON.md` §6. Listed, not changed: the `PRIME-N1` equipment/phenotype IDs in `phenotypes/` (asset identifiers; renaming needs an asset decision), `characters/PRIM2-PRESIDING.md` front-matter key `age_at_jordan_recruitment`, and informal "Prime" in prose (allowed as spoken shorthand).
- [x] **Clean out the "internship that is secretly an Apex entrance exam" version.** Owner: "we need to clean that internship that's secretly an exam type shit." Root `CANON.md` wins (McCluster joins Equity Uprise; McCluster Corp is the holding company). Applied: `seasons/SEASON-01.md` rewritten to the canon E01–E03 shape (still PROPOSED); `world/corporations/MCCLUSTER-CORP.md` and `world/corporations/APEX-TACTICAL-CORP.md` aligned with `CANON.md` §19; `ARCHITECT.md` "McCluster Corp = front" corrected; `story/SEASON-ONE-HUMAN-SPINE.md` and `phenotypes/civilian/recruit-student/RS-01.md` "internship" wording corrected. Each rewritten file lists exactly what was removed.

## Owner decisions recorded 2026-11-03 (answers to the consolidation proposal's questions)

- [x] **Royce is renamed Benjamin "Benji" Chase, McCluster's clone.** Owner: "Hitman Benji is actually… Royce. Rename Royce Benjamin Chase … Benji is low-key McCluster's evil twin … Royce's origin is a government program. He is a clone of McCluster … He gets dubbed Hitman Benji after he takes over the organization." Applied: every canon, draft, episode and proposal mention of Royce renamed (84 files; dated migration logs left as records); `story/BENJI-CHASE-JANUS-ORIGIN-CANON.md` adapted from branch `feature/royce-janus-origin-20261019`; the 2026-11-02 "Benji Chase's role is open / not the RAID attacker" text replaced. Machine keys `royce_*` (game YAML, schemas, mission YAMLs) kept and aliased in `CANON.md` §9. LVL-01 is Benjamin Chase (United States, E). The platform account "Hitman Benji / Benji Chase" belongs to the owner's fiction.
- [x] **Ghost is McCluster's "ghost mode".** Owner: "he's been ghosted from the view of everyone … under the radar." A state or era, not an alias; no link to Benji. Applied: `CANON.md` §9, `story/MCCLUSTER-PROTAGONIST-CANON.md`.
- [x] **McCluster's Hitman-era deeds stay his,** including the New Mexico retaliation. Owner: "The retaliation he did was all him." No file change needed; already the state of `story/MCCLUSTER-HITMAN-ORIGIN-CANON.md` §9 and `CANON.md` §9.
- [x] **"All storyline missions are planned" except real emergencies.** Owner direction 2026-11-02: "The mission should start mid professional shoot and under concealment, low key … Unless it's an emergency mission. All storyline missions are planned." Owner 2026-11-03: E05 (Four Colors), E06 (Dead Air) and E16 (Road Kit) stay emergencies and are not converted to planned missions. Applied in the proposal §3.1, §3.6, §5.
- [x] **Regional presence abroad with full crews.** Owner: "This is a major multi-million dollar corporation." Agents are posted abroad with full crews; Equity Uprise HQ stays in the United States. Replaces "everyone operates from one US HQ" and the proposal's "on location" framing. Applied: `CANON.md` §19 (new "Regional presence"), `story/MCCLUSTER-CORP.md`, `story/EQUITY-UPRISE-WORKPLACE-CANON.md`, `story/CAST-NATIONS.md`; proposal §6.
- [x] **The PRIM Method stays private.** The real product's "PRIM Method" (Principles, Rhythm, Immersion, Missions) is kept out of story canon. No story file mentions it (checked 2026-11-03); none should.
- [x] **Whip Equipped and I AM HERE songs are not PRIM3 cues.** Owner: "PRIM3 is its own universe." The proposal's mappings of those songs (and of the other non-PRIM3 albums) onto PRIM3 episodes are removed. Whip Equipped stays McCluster's prequel backstory only.
- [x] **Meridian is dropped.** Owner: get rid of it. Checked 2026-11-03: no story, canon or draft file names a Meridian character, organisation or operation; the question is closed.
- [x] **Apex Tactical Corp belongs to Hitman.** Owner: "That's Hitman, I guess." Applied: `CANON.md` §19, `world/corporations/APEX-TACTICAL-CORP.md` (re-homed as Hitman's corporate/tactical company under Benji), `story/HITMAN-ORG.md`, `brands/mccluster-corp/BRAND-CANON.md`. The PRIM2 "Apex" intervention mechanic keeps its name and is noted as unrelated.
- [x] **E03's facility opening is the North River Medical Logistics Hub's reopening** (approved by the owner). Applied: `episodes/S01E03-OSINT.md` "Human problem"; proposal §2.4.
- [ ] **Song #21 (E18): pending.** Owner, 2026-11-03: not available yet. E18 remains a protected open slot (`story/EPISODE-PROGRESSION.md`); nothing is filled from existing songs.
- [x] **High Alert memory owners follow the cast.** Owner: "pair that with the cast." Each of the 17 memory anchors now names the locked owner of its episode from `CANON.md` §21 (Memory 01 Nusrat/Miguel, 02 Oksana/Rafael, 03 Priya/Sora, 04 Chioma/Thandiwe, 05 Sari/Yonas, 06 Leila/Li, 07 Aya/Minh, 08 Dmitri/Oksana, 09 Valeria, 10 Grace/Rafael, 11 Jonas/Pylon, 12 Helen/Li/Yonas, 13 Amira/Marc, 14 Sari/Sable, 15 McCluster/Valeria, 16 Aya, 17 Leila/Helen/McCluster). The flash images are kept.
- [x] **Season 1 deaths are allowed.** Owner: "If somebody dies, they die … I think it's more cool." The "first death deferred to S2E3" restriction is removed from `seasons/SEASON-01.md`; `episodes/README.md` notes that E06 is a death slot, not the earliest. Nobody is chosen; candidates with rationale are in the proposal §3.7.
- [ ] **Expanded ensemble.** Owner: "We should have a whole cast of people." Drafted as a plan by role in the proposal §9 (more PRIM-side E operators, a recurring F4 media crew, regional crews, Hitman/Apex depth, replacements, support layer; roughly +30 to +40 people). No new names are canon; each character still goes through the creation gate.
- [x] **Housekeeping: runtime standardised on canon's 20–35 minutes** (owner instruction 2026-11-03 to apply the listed housekeeping). Files: `ARCHITECT.md`, `story/EPISODE-PROGRESSION.md`, `story/SERIES-ARC.md`, `story/EPISODE-CAUSE-AND-ENTERTAINMENT-AUTHORITY.md`.
- [x] **Housekeeping: `AGENTS.md`'s outdated naming ban reworded** (owner instruction 2026-11-03). It banned naming "the corporation, the college or the location" after canon had named the protagonist, the corporation and many places. It now forbids only naming what canon has not yet named without owner approval, and lists the fixed names. Identity items above ticked where canon decided them; the college, PRIM2's civilian name and the story year stay open.
- [x] **Housekeeping: course-feed path fixed** (owner instruction 2026-11-03). `learning/course/course-feed.json` M01 cited the missing `episodes/S01E01-HIGH-ALERT.md`; it now cites `episodes/S01E01-THE-BLIP.md`.
- [x] **Housekeeping: McCluster arrives at 33 as a newcomer** (owner instruction 2026-11-03). `story/RELATIONSHIP-ECOSYSTEM.md` had him in the founding-years mesh, trained beside Aya, kept from washing out by an early evaluation. He is removed from the mesh; Chioma's evaluation moves into Season 1, after Permission Slip.

## Owner decisions recorded 2026-11-03 (second round)

- [x] **Season 1 death: delegated, decided — Miguel Santos dies twice.** Owner: "You kill somebody. We're gonna revive them later in the story … it was a fake death and then it was really a death that they predicted … they came back at the last minute, but then they actually die when they come back. So they die twice … she's the one who points him back to it … through the word game." Decision (DRAFT arc, change control listed inside): Miguel is certified dead in S1E2 holding Harborline's exterior; Aya decodes his last Kkeutori word in S6E2 and points McCluster to North River; he returns for RAID (S7E1) and dies there. `story/arcs/MIGUEL-SANTOS-DIES-TWICE.md`. Resolves A8's Season 1 pick; proposes Miguel for the RAID roster (still locked by `CANON.md` §18 until E02–E18 are developed).
- [x] **A1, the recruit's device: delegated, decided.** Owner: "just make it make sense." The device is an ordinary issuance error of the same device class (treatment Scene 15 stands); the real tell is Memory 01's approval field that resolves above the local access office, which Miguel notices.
- [x] **A2, Harborline's country: delegated, decided.** Owner: "make a decision on what country it should be in based on everything that's happened." United States, on the New Jersey side of New York Harbor. No city or new place name.
- [ ] **New canon mechanisms awaiting owner sign-off** (listed in the arc's §9): a certified-but-false death, the Kkeutori third-language variant, one unseen-face frame in S1E1.

## Owner decisions recorded 2026-11-03 (third round: Issue #19, seven-season world and workplace audit)

- [x] **Season-reveal framework adopted as structure** (owner, 2026-11-03; source: Prim3 Issue #19 "Seven-season world and workplace audit"). Each season reveals one more floor's people, culture and power, not a physically hidden floor: S1 Recognition = F1 Intake/Access; S2 Belonging = F2 Cohorts/Forum; S3 Trust = F3 Field Ops; S4 Commitment = F4 Media/Culture with B1 at the centre; S5 Scale = F5 Policy/Proof; S6 Disillusionment = L7 Roof/Mobility and the world beyond HQ; S7 Succession = F6 Executive Command (PRIM2's permitted interfaces; Site 0 stays the root). B1 is the recurring technical backbone and is never a secret. **Adopted as structure; per-episode scene additions pending owner sign-off.** Map: `story/SEASON-REVEAL-MAP.md` (PROPOSED): 13 of 21 episodes already sit on their season's floor, 7 gain one workplace scene around the mission, S6E3 stays open, zero relocations.
- [ ] **Agency case spine — PROPOSED, not adopted.** `story/AGENCY-CASE-SPINE.md`: Case 0417 "Resolved by Morning", a community resource room's nightly outage that enters at Grace's F1 desk in S1E1, becomes a case at F2 in S2, reaches F5 and the B1 bench in S3, reveals a single-supplier conflict (one vendor for the building's sensors and the community kits, approved through the F6 sponsor desk, Voss financing) at F4/B1 in S4E3, is deferred at F6 in S5E2 (Li's decision rule), deploys from L7 in S6, and closes with Helen's signature and Grace's desk in S7E3. Owner items listed in its §9.
- [ ] **World memory contract — PROPOSED.** `story/WORLD-MEMORY-CONTRACT.md`: what the workplace simulation persists (objects, seating, vacancies, routines, relationship edges, institutional state, building systems) and the knowledge model (facts with reveal indices; per-character per-episode states UNAWARE / SUSPECTS / KNOWS / KNOWS_HIDES / BELIEVES_FALSE; a separate AUDIENCE holder; a no-leak rule enforced by an `episodeIndexCeiling` on every mode; position is not knowledge). Builds on the mccluster side's gated interaction modes and isolated MISSION/TRAINING environments.
- [x] **Reconciliation (not a new decision): the nine-minute runtime line.** Issue #19 reported that `story/EPISODE-PROGRESSION.md` still claimed a ~9-minute WATCH target against `CANON.md` §1 and `story/EPISODE-MISSION-BIBLE.md` (20–35 minutes). Checked 2026-11-03: that line was already standardised on branch `claude/story-consolidation-20261102` (commit `4b3ad66`, "Standardise WATCH runtime on canon's 20-35 minutes"); `main` still carries the stale line until that branch merges. This branch is built on that tip, so no further change to `EPISODE-PROGRESSION.md` was needed. One residual ambiguity was fixed: `story/EPISODE-CAUSE-AND-ENTERTAINMENT-AUDIT.md` §10 described the WATCH mission montage as "the same three-minute duration" in a way that read as the episode length; it now says the montage is roughly one track-length inside the 20–35-minute episode. No other stale runtime statement remains on this branch (grep for nine-/three-/9-/3-minute across `story/`, `episodes/`, `seasons/`, `learning/`, `game/`, root docs).

