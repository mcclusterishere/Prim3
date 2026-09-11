---
status: TEMPLATE
system: PRIM3 episode / playable-level chapter
version: 2.4.0
branch: main
---

# PRIM3 episode / level chapter template

Use one copy of this structure for every canonical song mission.

A **level** means the playable mission attached to an episode; it does not automatically mean one architectural floor.

This template is subordinate to `CANON.md`, `story/EPISODE-MISSION-BIBLE.md`, `story/ENSEMBLE-POV-AUTHORITY.md`, `story/EPISODE-CAST-DENSITY-SUPPORT-HISTORY-AUTHORITY.md`, `story/CAST-LIFECYCLE-ATTRITION-PROMOTION-AUTHORITY.md`, and `game/WILDCARD-INTERVENTION-AUTHORITY.md`.

## Identity

- **Global episode / level:**
- **Season / episode:**
- **Song:**
- **Mission:**
- **Source lyrics:** `source-material/<song>/LYRICS.md`
- **WATCH planning runtime:** normally `20–35 min`, flexible by story
- **Development state:** `DRAFT`, `PROPOSED`, or `CANON`

## Ownership / deployment contract

- **Episode owner:**
- **Secondary owner(s):**
- **Jordan narrative state:** `A/B/C/D/E/F`
- **Mission lead:**
- **Base playable roster:**
- **Primary playable POV(s):**
- **Jordan play state:** `scripted / off-board wildcard / locked out`
- **Wildcard eligible:** `yes/no + reason`
- **Wildcard arrival rule:**
- **Apex eligible:** `yes/no + reason`
- **PRIM2 story visibility:** `hidden executive / partially known / explicit`
- **Royce Incursion eligible:** `yes/no + reason`
- **Royce telegraph rule:**

Ordinary PLAY should default to **no Jordan in the selectable base roster**.

## Cast density / recurring relationship web

Every canonical episode should normally contain **at least 6–7 meaningful named character presences**, with **7–10 preferred**. Larger convergent episodes may exceed ten.

**Use the established recurring roster first.**

A presence may be:
- `OWNER`
- `ACTIVE`
- `REMOTE`
- `AMBIENT/WORKPLACE`
- `RELATIONSHIP`
- `OPPOSING`
- `TRACE`
- `OUTSIDE/HISTORICAL` only when already established and specifically relevant

Do not satisfy this requirement with silent bodies in a room.

For each named recurring presence record:

```text
CHARACTER:
MODE:
WHY THEY ARE REALISTICALLY HERE:
STARTING STATE:
WHAT THEY WANT IN THIS EPISODE:
DEVELOPMENT BEAT:
ENDING STATE:
WHAT CARRIES FORWARD:
```

**No recurring named appearance may leave `DEVELOPMENT BEAT` blank.**

Default composition target:

```text
1–2 primary owners — deep development
3–6 recurring coworkers / command / technical / support people — micro/mid development
0–2 recurring Hitman-side parallels when relevant
0–2 established outside/historical relationships when specifically earned
```

Do **not** invent a guest simply to reach the count. First ask:

> **Which existing person would realistically already be here?**

Every Episode 02–18 should normally overlap with:
- at least one person carrying residue from the previous episode;
- at least one person whose larger payoff occurs later;
- several non-owner recurring people receiving micro-development writes;
- at least one continuing relationship thread from earlier episodes;
- Hitman/institutional/PRIM2 pressure only where it naturally belongs.

Historical/outside characters are optional, not mandatory. Use Hana, Ren, Tariq, Zayd, Bigga Lex, or other separately promoted people only when their established relationship actually affects the episode.

Use `story/EPISODE-CAST-DENSITY-SUPPORT-HISTORY-AUTHORITY.md` for population logic and `story/CAST-LIFECYCLE-ATTRITION-PROMOTION-AUTHORITY.md` for continuous development, death, vacancy and replacement rules.

## Whole-roster continuity ledger

Every episode must account for every current recurring slot, including people who do not appear.

For each current recurring character/system record:

```text
CHARACTER:
EPISODE STATE: A / B / C / D
A = ACTIVE DEVELOPMENT
B = AMBIENT CONTINUITY
C = OFFSCREEN CONSEQUENCE
D = UNAFFECTED / OUT OF FRAME
CURRENT ASSIGNMENT:
HEALTH / AVAILABILITY:
RELATIONSHIP CHANGE:
WORKLOAD / STATUS CHANGE:
NEXT EXPECTED TOUCH:
```

Do not force all recurring characters on camera. Do not accidentally forget major people exist for half a season either.

## Cast lifecycle / attrition contract

- **Who is promoted in responsibility or narrative importance:**
- **Who is drifting outward / transferred / sidelined:**
- **Injury or permanent-loss eligibility:**
- **Story-locked / Campaign-variable / Protected-until casualty states:**
- **If somebody dies/leaves, what work becomes uncovered:**
- **Who absorbs that work immediately:**
- **What routine/relationship disappears:**
- **Whether the vacancy remains open:**
- **Whether any support character begins organically filling it:**
- **Whether a newcomer is needed later:**

Do not assume every death receives a one-for-one replacement.

If a replacement is introduced, record:

```text
WHO ALREADY KNOWS THEM:
WHO DOES NOT:
WHO RESENTS THE COMPARISON TO THE PREDECESSOR:
WHAT THEY DO BETTER:
WHAT THEY DO WORSE:
WHAT SOCIAL FRICTION ARRIVES WITH THEM:
```

## Merge contract

Record what is locked, what this chapter adds, and what must remain open. The chapter may elaborate existing canon, but it may not silently replace `CANON.md`, current specialist authorities, or owner-locked chronology.

## Chapter promise

One paragraph stating the human problem, technical problem, and playable fantasy in plain English.

## Song payload

- **Technical payload:** concepts carried by the lyrics.
- **Human payload:** emotion, temptation, contradiction, or relationship pressure carried by the song.
- **Visual vocabulary:** repeatable images, colors, objects, and motion.
- **Safety translation:** how offensive language or methods become defensive, authorized, or abstracted gameplay rather than an abuse tutorial.

## Longform causal episode structure

The old three-minute-block / nine-minute cap is retired.

Use flexible longform pacing:

### Cold open / ordinary life

Show people existing before the incident: work, food, jokes, money, relationships, fatigue, study, routine, unresolved residue.

### Human trigger

What changes? Establish whose problem this is and why it matters now.

### Music film / operational brief

State the visual thesis, performer/perspective, vocabulary, expected model, and emotional argument.

> **The briefing teaches the model. The mission attacks the model.**

### Escalation / mission threshold

Identify the choice/fact that commits the team. Show relationship/authority pressure before deployment.

### WATCH mission

State the authored action path and canonical hard-spine outcome.

### Aftermath / workplace return

Let people carry injury, resentment, relief, jokes, workload and grief back into the same building. Do not end every episode at objective completion.

### PLAY mission

Expand the same event into tactical choice space. Normal first-play planning band is roughly **20–45 minutes**; capstones may be longer/checkpointed.

## Playable level contract

- **Environment:**
- **Entry state:**
- **Primary loop:** `evidence -> inference -> action -> consequence -> validation -> mastery`
- **Primary objective:**
- **Optional objectives:**
- **Expected plan:**
- **Hidden complication:**
- **Plan failure:**
- **Mission threshold:**
- **Exit state:**

## Crisis / intervention contract

- **STABLE definition:**
- **DEGRADED definition:**
- **CRITICAL triggers:**
- **TERMINAL triggers:**
- **Jordan arrival delay / insertion if eligible:**
- **What Jordan can salvage without auto-solving:**
- **What remains character-owner-specific after Jordan arrives:**
- **PRIM2 Apex arrival rule if eligible:**
- **Royce Incursion trigger band if eligible:**
- **Intervention consequence write:**

The intervention ladder is:

```text
ENSEMBLE TEAM
    -> CRITICAL
JORDAN / WILDCARD
    -> eligible high-value mission remains CRITICAL
PRIM2 / APEX
```

The hostile board may independently escalate through a Royce Incursion.

## Player verbs

List only verbs the build must actually support: move, inspect, compare, route, verify, isolate, assign, restore, escort, operate, stabilize, protect, command, or similar.

## Outcome channels

Every mission reports:
- **Objective** — useful result secured.
- **Team** — who returns and in what condition.
- **Exposure** — visibility, disruption, and collateral consequences.
- **Integrity** — authorization, evidence, compliance, and safety boundaries.
- **Time** — speed of stabilization.

Avoid false binary failure where partial outcomes are meaningful.

Learning Mastery is separate from operational grade.

## Persistent state written by the level

Record:
- relationship changes;
- injury/fatigue;
- deaths / transfers / vacancies;
- evidence/provenance;
- exposure/Heat;
- resources;
- authority state;
- staffing/workload redistribution;
- Wildcard/Apex usage;
- PRIM Debt / Executive Attention where relevant;
- Hitman Pressure / Royce cooldown where relevant;
- psychological residue;
- support-to-main promotion movement;
- next-character inheritance.

## PRIM2 background trace

If PRIM2 is not openly present, record:
- **Visible trace:** what is genuinely on-screen / in-state now.
- **First-watch meaning:** ordinary explanation available now.
- **Later payoff:** what it means after PRIM2's cross-board authority is understood.

PRIM2 traces should usually be **institutional gravity**, not recurring literal physical cameos.

Examples include approval, omission, timing, resource allocation, Pylon behavior, cross-board data, policy exception and unexplained executive-channel behavior.

Coordinate with `story/PRIME-LURK-LEDGER.md` where current.

## Technology accuracy gate

- **Sensor / input:**
- **Compute / reasoning:**
- **Energy / infrastructure:**
- **Access / authorization path:**
- **Human decision owner:**
- **Failure mode:**
- **Real concept taught:**
- **Fictional extrapolation:** `NONE` unless explicitly identified.

## Character psychology gate

For owners and any support character receiving more than a micro-beat:

- **Historical anchor activated:**
- **Belief / rule activated:**
- **Likely first move:**
- **Alternative considered:**
- **Who can interrupt the reflex:**
- **What changes the character's mind:**
- **Relationship cost:**
- **Long-term residue:**

Use `story/CHARACTER-PSYCHOLOGY-DECISION-AUTHORITY.md`.

## Production and game assets

List required location geometry, characters, props, UI, animation, VFX, music, SFX, voice, and cinematic transitions. Mark each item `EXISTS`, `NEEDED`, or `OPTIONAL`.

## Merge hooks

- **Reads from:** prior continuity and required source files.
- **Writes to:** later chapters and persistent state.
- **Reusable systems:** mechanics or assets another episode can inherit.
- **Owner decisions still required:** consequential choices only.

## Completion gate

A chapter graduates from blueprint to current episode draft only when its:
- human owner;
- meaningful-character density or justified exception;
- **development beat for every recurring named appearance**;
- recurring-roster overlap;
- whole-roster A/B/C/D continuity ledger;
- prior-episode residue carry;
- future-payoff setup;
- base playable roster;
- intervention state;
- attrition/vacancy implications;
- mission loop;
- technical gate;
- psychology writes;
- five outcomes;
- continuity writes;
- PRIM2 trace;
- and minimum asset list

are all deliberately resolved.