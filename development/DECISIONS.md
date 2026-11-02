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
- [ ] Internship cover department
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

- [x] **Benji Chase is a different person from Matthew McCluster.** "Canon text that merges McCluster, Benji and Ghost into one man must be separated." Applied: `CANON.md` §8, §9, §10, §19, §22 and every file that used "Benji" as McCluster's alias. McCluster's age-19-to-26 Hitman scenes are kept and told under McCluster's name. Open: Benji Chase's role; whether "Ghost" is only the name of McCluster's age-26-to-33 life stage (canon today) or also a handle (owner questions in `story/STORY-CONSOLIDATION-PROPOSAL.md`).
- [x] **Track order follows the order on paper.** Assumed to mean `story/EPISODE-PROGRESSION.md` (the canon order authority); the assumption is flagged for the owner. Applied: `story/SONG-STORY-FUNCTIONS.md` and `story/SONG-CHARACTER-COUNT.md` renumbered; the census's Benji/RAID and old SIM-swap Evil Twin rows flagged against canon.
- [x] **Whip Equipped is the prequel** (McCluster, ages 26–33). Applied: `story/WHIP-EQUIPPED-BRIDGE.md` rewritten (the "kill-Prime → dimension → kill alt-self" entry and "that world's Prime killed" economy withdrawn); `story/whip-equipped/SONG-CATALOG.md` "sequel" label withdrawn. The bridge now separates the fictional business from Matthew McCluster's real company.
- [x] **Repair the Sept 24 "Jordan Vale → McCluster" find-and-replace damage.** Owner: "I definitely still want the protagonist to be McCluster, but we don't want the country to be called McCluster." Applied: "McCluster Corp Corp Corp Corp" → "McCluster Corp" (4 files); Layla Mansour's country restored to Jordan (2 files); the self-contradicting "does not enter by joining Equity Uprise / enters by joining Equity Uprise" restored from git history ("does not enter by joining McCluster Corp"); "Infrastructure enters Equity Uprise's life" → "McCluster's life"; about 70 lines where "McCluster" meant the institution now say Equity Uprise (the workplace) or McCluster Corp (the deeper system). The protagonist keeps the name McCluster. "Jordan Vale" is not restored anywhere.
- [x] **Stale "Prime" antagonist leftovers fixed where canon is unambiguous** (McCluster + Royce vs PRIM2; `CANON.md` §7, §16, §18): `learning/missions/LVL-19-HOT-SITE-GRANULAR.md` (Benji → Royce, Prime → PRIM2, state IDs renamed), `seasons/SEASON-01.md` cold open, `story/AYA-CIRCLE-RELATIONSHIP-WEB.md` §10 heading, `story/AYA-HANA-INTELLIGENCE-CANON.md` §6. Listed, not changed: the `PRIME-N1` equipment/phenotype IDs in `phenotypes/` (asset identifiers; renaming needs an asset decision), `characters/PRIM2-PRESIDING.md` front-matter key `age_at_jordan_recruitment`, and informal "Prime" in prose (allowed as spoken shorthand).
