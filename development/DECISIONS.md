# Open Decisions

**Status:** DRAFT

This ledger prevents AI collaborators from silently filling important blanks.

## Identity

- [ ] Protagonist's civilian name
- [ ] Presiding Prime's civilian name
- [ ] Corporation name
- [ ] College name
- [ ] Primary city / region
- [ ] Story calendar year

## Season One

- [ ] Episode count and runtime
- [ ] First cohort size
- [ ] First supporting character to design
- [x] ~~Internship cover department~~ — removed 2026-11-02 (owner: clean out the internship-that-is-secretly-an-exam version). McCluster joins Equity Uprise (`CANON.md` §19). The cover idea is kept as a proposal note only.
- [ ] First field incident
- [ ] First major casualty
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
