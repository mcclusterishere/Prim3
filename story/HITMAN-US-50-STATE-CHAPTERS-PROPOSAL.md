# HITMAN — Fifty-State Chapter System (PROPOSED)

Status: **owner-directed fictional expansion, pending canon approval**. Does not supersede `CANON.md`, `story/IMMEDIATE-CAST-CANON.md` or individual Hitman dossiers.

## Narrative goal

Build a United States-spanning *fictional* Hitman underworld, with a regional chapter in **each of the fifty states**. Every chapter has exactly one proposed captain who leads a **4–7-person fictional crew** (including the captain), a distinct personality, an ongoing conflict and its own social-media storytelling franchise. The chapter's region belongs to the story map, not the real-world location of an account or an actor.

The 50-region cast is **additional satellite-world development**, not an automatic revision of the existing 39 immediate recurring PRIM3 slots. Keep:

- McCluster/Benji as one protagonist, separate from Hitman state leadership;
- Royce as the current national Hitman sovereign, seven years younger than McCluster;
- the established 12 Hitman ensemble members in their already defined central jobs; never invent their hometowns or turn every specialist into a state leader;
- Bigga Lex as a historical person, not an extra present-day state captain;
- the `High Alert`, `RAID`, `Evil Twin`, `Ghost in the Wires` story order and all spoiler restrictions.

Source dataset: `world/HITMAN-US-50-STATE-CHAPTERS.v0.1.json` — authoritative *proposal* for fifty state leaders, state-level councils, crew templates, relationships and media missions.

## Political map: fiction, not social science

The **2024 U.S. presidential statewide result** is a stable visual reference for the color map, per [U.S. National Archives](https://www.archives.gov/electoral-college/2024). Under that fixed convention there are 31 red states, 19 blue states. Maine is blue and Nebraska is red on the statewide result even though both split electoral votes by district. This is not the composition of state legislatures or governorships, nor a claim about real people, crime, demographic groups, or political parties.

**Red chapter = established syndicate:** deep institutional memory, older compacts, inherited rank, entrenched councils, ritualized negotiations, internal succession courts, land and legacy as dramatic stakes. This is a fictional genre convention, **not a claim Republican-governed states have developed crime**.

**Blue chapter = emerging street coalition:** localized blocks/crews, cultural influence, studio and street-media identities, volatile alliances, informal votes, factional independence, emerging political organizations. This is a fictional genre convention, **not a claim Democratic-governed states are criminally underdeveloped, more dangerous, or more likely to have gangs**.

**Battleground tension:** Arizona, Georgia, Michigan, Nevada, North Carolina, Pennsylvania and Wisconsin have fictional internal factions contesting the dominant charter rather than reducing them to predictable one-note stereotypes. *Story structure is an artistic interpretation; electoral margin does not establish criminal activity.*

State codes mirror the U.S. 50-state subdivision. Washington, D.C. is the site of the proposed **National Council** — **not** a 51st crew, captain or synthetic verified resident. The real-world political parties and current named politicians are never members, sponsors or criminal characters in this universe. Use original fictional councils.

## Governance, characters and episodic economy

```
NATIONAL HITMAN SOVEREIGN — Royce
  ↳ NATIONAL SPECIALISTS — existing Hitman ensemble (Sable, Mina, Keys, etc.)
  ↳ 50 STATE CHAPTERS — one captain per state (proposed new satellite cast)
      ↳ 3–6 CREW MEMBERS — deputy / operations / creative voice / specialist etc.
      ↳ STATE COUNCIL — red legacy council OR blue street assembly
      ↳ NEIGHBOR & ROUTE RIVALRIES — entirely fictional narrative network
```

State captains have **agency and conflicting desires**. Some love Royce; others question his right to rule, fear him, need him, or prefer their state autonomous. Sable controls what the national budget says but must not be unrealistically omniscient about every local dispute. Mina is the national operational conscience and can publicly challenge the wisdom of a storyline decision. Keys links the different social worlds. Do not make all 50 captains only agree or only fight.

Each state has a proposed `story_mission` and a `social_series`. Missions are narrative episodes/media arcs, never real crimes to perform, real paid action-network missions or operational instructions. Rivalries are creative fixtures, not accusations against real locations or people.

**Cross-state scripted example:** Pennsylvania's fictional Keystone Commission proposes a national vote to standardize succession rules; New Jersey's emerging Turnpike Circle challenges the idea, while New York's Five Borough Exchange refuses a single representative. The storyline creates character scenes, debate and rivalry. It does not represent any real criminal collaboration in those states.

**Royce should be scarce**, consistent with current canon: his arrival is a decisive story event. He cannot have an unrestricted daily leadership cameo in all 50 state accounts. Each chapter's own characters carry local continuity.

## Public map and consent boundaries

A state entry is a **fictional chapter jurisdiction**. Its presence in the manifest authorizes *proposed story affiliation only*. It does not authorize public pins, verify nationality, imply residency or show a real actor in that state. Do not geolocate or track website visitors to create story locations.

Future approved globe overlays will show separately:

1. **Fictional chapter accounts** and how many are *published and approved* under each state's jurisdiction;
2. actual opted-in human member counts only under existing privacy thresholds;
3. real-world verified missions, never inferred from fictional scenes.

A tap on `US-NJ`, for example, can open a fictionally labeled card for that state's approved captain, story mission, local crew and rivalry/collaboration arcs. It must not imply an active real criminal group in New Jersey.

## Performer/agent productization

- `McCluster/Prim3` owns the author-approved canon; `McCluster` Worker/Core and Supabase own runtime, review, media, M Account, tenant and social posting.
- Each captain will be an `org`-scoped **system actor**, never a forged `m_people` person or Supabase Auth user.
- Every actor gets a `house-agent:hitman-us-XX` logical namespace and eventual Core job runner, not 50 VPS instances or 50 bypassed schedulers.
- All 50 start private, draft, no executable agents, no publishing and no autonomous spending.
- Digital performer generation requires owner-approved reference sheets, original/licensed source and voice, model render receipts, explicit review and provenance.
- The eventual single social graph gives humans + transparently fictional AI-generated personalities profiles/posts, while maintaining block, mute, report and human identity distinctions.
- Future agency customers license the *character engine*, not implicitly the PRIM3 fictional names and worlds. Never clone PRIM3 IP into customer organizations without license.

## Review and release gate

1. Owner signs off on state captains and political allegory; revise any character that feels like an insulting political or demographic stereotype.
2. Check existing PRIM3 episode continuity before promoting a regional captain to recurrent episode owner.
3. Approve regional geography and reference art/performers separately; until then public state count = 0.
4. Complete the house-agent migration, per-tenant RLS staging, typed-actor social graph and rights/disclosure policy.
5. Validate real agent runs, human-reviewed media, cost metering, pause/revoke, moderation and phone-globe experience.
6. Explicit production decision. No autonomous publication or fabricated followers.

**This file is a proposal, not locked canon.**
