---
status: CANON
system: Game mechanics — full spine
version: 1.2.0
branch: main
authority: Subordinate to CANON.md and specialized canonical mechanics/story authorities
---

# PRIM3 Game Mechanics — Complete Spine

This is the high-level rules stack for the XCOM-style product first. Real-time FPS and mobile tactical are later clients of the same outcomes.

Specialized authorities:
- `TACTICAL-IT-MECHANICS-BIBLE.md` — technical/action grammar;
- `WILDCARD-INTERVENTION-AUTHORITY.md` — Jordan/PRIM2/Royce escalation;
- `OMNISCIENT-COMMAND-INTERFACE.md` — fused mission-control UI;
- `story/ENSEMBLE-POV-AUTHORITY.md` — character/episode ownership;
- `story/CAST-LIFECYCLE-ATTRITION-PROMOTION-AUTHORITY.md` — recurring-cast development, death, vacancy, promotion and replacement.

---

# A. Product layers

| Layer | Name | Job |
|---|---|---|
| 0 | Shared outcome rules | Phases, clocks, success states |
| 1 | Strategy layer | Choose ops, assign teams, live with consequences |
| 2 | Tactical layer | XCOM-style mission play |
| 3 | Progression | Operators, gear, qualifications |
| 4 | Campaign structure | Seasons, heat, story gates, intervention scarcity, roster continuity |
| 5 | Presentation clients | TB / mobile TB / FPS using the same outcome writer |

If a feature does not feed a mission outcome, character consequence, relationship consequence or campaign consequence, it is not core v1.

---

# B. Shared outcome rules

## B1. Mission phases

```text
BRIEF -> APPROACH -> ON OBJECTIVE -> EXTRACT -> AFTERMATH
```

## B2. Clocks

| Phase | Default | Notes |
|---|---:|---|
| Brief | Off | Planning only |
| Approach | 6 | Detection can collapse early |
| Window | 8; commonly 6 if detected | Technical/mission work burns this |
| Extract | 6 / 4 / 3 | Clean / collapsed / hot |
| Aftermath | Off | Scoring + story residue |

## B3. Mission-state ladder

Every mission carries:

```text
STABLE -> DEGRADED -> CRITICAL -> TERMINAL
```

`CRITICAL` may expose a Jordan Wildcard request. An eligible high-value mission that remains CRITICAL after Jordan is present may expose a PRIM2 Apex request.

## B4. Outcome ladder

Mission results are graded, not binary by default. A failed perfect objective may still produce useful evidence, surviving operators, partial service restoration or a costly extraction.

Core score channels:
1. Take/objective value
2. Team integrity
3. Exposure
4. Speed
5. Authorization compliance

Intervention use is recorded separately so a player can earn a strong operational grade while still knowing they required Wildcard or Apex support.

---

# C. Strategy layer

## C1. What the player manages

| System | Player manages |
|---|---|
| Roster | Named recurring ensemble operators by qualification, health and availability |
| Deployment | Who actually goes on the next operation |
| Loadouts | Kits attached to roles for that operation |
| Heat | How loud the institution is in the world |
| Standing | Institutional trust/authority access |
| Intel | Known targets, modifiers, warnings, story missions |
| Recovery | Injured/fatigued operators unavailable |
| Vacancies | Work/roles left uncovered after death, transfer or departure |
| Promotion | Existing support people absorbing new responsibility |
| Onboarding | New arrivals integrating unevenly into the social/operational graph |
| Wildcard | Scarce Jordan call-up authorizations |
| Apex | Scarce PRIM2 intervention authorizations |
| Hitman pressure | Probability/eligibility pressure for hostile escalation including Royce |

Jordan is **not** a normal selectable roster slot on most missions.

## C2. Strategy turn

1. Advance time where the campaign structure permits.
2. Resolve injury recovery, fatigue, Heat and Hitman-pressure changes.
3. Resolve vacancy/workload consequences from prior losses or transfers.
4. Receive intel / sponsor offers / episode mission.
5. Train, reassign, promote or prepare kit where allowed.
6. Resolve onboarding/relationship friction for any new arrival.
7. Select/accept operation.
8. Assign the ensemble mission team.
9. Brief -> launch tactical.

## C3. Resources

Core ordinary economy:
- Budget
- Heat
- Standing
- Intel
- Roster availability
- Workload / staffing pressure

Special escalation economy:
- `WildcardAuthorizationsSeason`
- `ApexAuthorizationsCampaign`
- `ExecutiveAttention`
- `PrimDebt`
- `HitmanPressure`
- `RoyceCooldown`
- `RoyceIncursionsSeason`

Budget does not directly purchase Jordan or PRIM2.

Canonical Standard balance:
- Jordan Wildcard: **2 non-scripted calls per season**;
- PRIM2 Apex: **3 non-scripted calls per seven-season campaign**;
- Royce: **maximum 2 non-scripted incursions per season**, one per mission, then a two-mission cooldown.

Story-scripted appearances do not consume these pools.

## C4. Roster continuity

The roster is not auto-normalized after loss.

When a character dies, leaves, transfers or becomes unavailable, the strategy layer may produce:
- understaffed deployments;
- cross-training pressure;
- delayed mission options;
- increased fatigue on surviving specialists;
- a support character receiving temporary responsibility;
- increased temptation to spend Jordan Wildcard calls;
- reduced capability in one lane;
- different briefing/dialogue combinations.

The campaign must be allowed to look **different after a death**.

A vacancy can remain open for multiple operations.

## C5. Replacement / promotion

The game does not spawn `Replacement Technician #4` the moment somebody dies.

A new recurring operator is introduced only through authored/campaign logic.

Possible paths:

```text
INTERNAL PROMOTION
existing support character absorbs the role

CROSS-TRAINING
existing main becomes partially qualified

TRANSFER
known person from another team/site moves in

NEW HIRE / RECRUIT
new person arrives with uneven prior relationships

NO REPLACEMENT
team permanently changes shape
```

Newcomers do not inherit predecessor relationship values.

Onboarding tracks:
- preexisting familiarity;
- reputation;
- resentment/comparison pressure;
- trust earned through missions;
- first real friendship;
- first conflict;
- eventual ownership episode if promoted to major status.

---

# D. Mission types

| Type | Primary job | Typical success |
|---|---|---|
| Data extraction | Technical work on NODE | defensible sealed take |
| Secure & hold | maintain control while work completes | objective survives Window |
| Ghost survey | build Picture with minimal exposure | useful verified intel |
| Denial | prevent hostile use of an objective | objective denied within authorization |
| Recovery | extract person/evidence/system asset | asset reaches SAFE |
| Continuity | keep service/life-safety process alive | service remains/reaches viable state |
| Story beat | authored constraints | mission-specific |

All use the same core AP/state grammar.

---

# E. Tactical layer

## E1. Turn order

1. Player phase
2. Threat phase
3. Clock phase

Standard operators receive **2 AP** per Player Phase unless a specific canonical intervention rule says otherwise.

## E2. Standard mission element

The classic technical field triad remains:
- Field-R — Picture / reconnaissance
- Field-E — physical control / protection
- Field-T — technical objective

But story missions may field other qualified named characters, leads, defense personnel or specialists.

**The game controls people, not abstract job icons.**

## E3. Jordan intervention

Most missions launch without Jordan.

When a valid mission reaches CRITICAL, the player may request him through the executive chain if:
- he is off-board;
- a Wildcard Authorization remains;
- the mission does not lock him out;
- and a plausible arrival route exists.

Jordan arrives after authored delay and acts as the cross-lane **Wildcard**. He restores options rather than auto-solving technical work.

Core identity:
- `ANOTHER PATH`
- `ADAPTIVE ROLE`
- `RALLY THE ROOM`
- `FAILOVER INSTINCT`

## E4. PRIM2 intervention

PRIM2 can only become a non-scripted second-stage rescue on eligible high-value missions after Jordan is already present and CRITICAL failure persists/reappears.

He is intentionally rare and exceptionally strong. His authority can expose information and alter permission, but it cannot alter physical truth or resurrect losses.

## E5. Royce incursion

Royce is the opposing board's elite escalation threat. He is controlled by hostile/campaign logic rather than the player.

He specializes in:
- breaking Control;
- forcing route changes;
- accelerating Will pressure;
- disrupting objective tempo;
- coordinating Hitman units;
- punishing overextension.

He is not a deep technical LAB_NODE substitute.

---

# F. Operator progression and loss

## F1. Ordinary qualification path

```text
Cohort-02 Trainee
    -> Cohort-01 Operator
    -> Field qualification / cross-training tags
    -> Cohort-03 Lead or other authored specialist/authority progression
```

An operator may earn role tags such as `can_T`, `can_E`, `can_R` through training and mission performance.

Support characters can become mechanically important through actual responsibility rather than hidden “main character” flags.

### Mantle correction

**PRIM succession is not the top node of the ordinary XP tree.**

Do not use the obsolete path `Cohort -> Prime-N1`.

`PRIM0`, `PRIM1`, `PRIM2`, `PRIM3` are Primary Root Identity Mantle succession identities, not generic character ranks. Jordan becoming **PRIM3** is a story/succession event, not something any sufficiently leveled operator can unlock.

## F2. XP channels

| Channel | Gained by |
|---|---|
| Technical | verified technical objectives / defensible evidence |
| Entry | access, holds, protection, stabilization |
| Recon | picture-building, warning, route/evidence work |
| Survival | extracting alive / preserving others |
| Leadership | sound command under pressure |

## F3. Perks

Keep perk trees small, readable and character-sensitive. Perks should enhance a person's established strengths rather than turn every operator into the same universal build.

## F4. Injury, death and casualty class

| Result | Strategy effect |
|---|---|
| Downed but extracted | downtime / relationship residue |
| Critical injury | extended unavailability / possible role redistribution |
| Permanent disability | changed capability and life, not automatic removal |
| Transfer / resignation | vacancy plus relationship consequences |
| Death | removed; vacancy/workload/grief persists |
| Repeated deployment | fatigue / Will pressure |

Every recurring character also has an authored casualty state:

```text
STORY-LOCKED
survival/death fixed by current WATCH canon for this period/event

PROTECTED-UNTIL
cannot receive permanent death before a required story function, but can be severely injured/removed temporarily

CAMPAIGN-VARIABLE
PLAY may create permanent loss if later hard-spine scenes do not require the person
```

Protection should be invisible in-fiction. Use mission design, Downed states, extraction and intervention opportunities rather than obvious invulnerability.

Jordan or PRIM2 intervention can prevent future loss if they arrive in time. They cannot reverse a completed death.

## F5. Grief as mechanics

Meaningful loss can modify:
- Will;
- fatigue;
- pair bonuses/penalties;
- command confidence;
- risk appetite;
- equipment preference;
- mission availability;
- dialogue and relationship state;
- who volunteers for a dangerous role;
- who refuses one.

Grief should not become one universal debuff. Character psychology determines direction.

---

# G. Gear

Every mechanical item defines:
- stat effects;
- actions unlocked/cost-modified;
- weight/mobility impact;
- signature/detection impact;
- relevant role/qualification constraints.

Gear supports the person. It does not replace character identity.

Inherited gear may become relationship/story residue after a death, but it does not transfer the dead person's skill automatically.

---

# H. Campaign structure

## H1. Canon story structure

PRIM3 has:
- **7 seasons**;
- **3 canonical episodes per season**;
- **21 canonical episode missions**;
- **1 song = 1 episode = 1 canonical mission**.

Optional **side operations** may exist in the strategy/play layer for roster development, recovery resources, Heat, Standing, Intel and replayability, but they are not additional canonical TV episodes and may not overwrite the fixed 21-episode spine.

## H2. Failure is data

Poor mission performance changes:
- injury/death state;
- vacancies;
- workload;
- Heat;
- Standing;
- relationships;
- available intel;
- resources;
- debrief dialogue;
- side-operation state;
- and, where authored, later mission conditions.

It does not casually soft-lock the seven-season story.

## H3. Authority pressure

Exceeding mission authority can produce tactical success but compliance consequences.

PRIM2's `SOVEREIGN EXCEPTION` may alter present authorization once per eligible intervention. It cannot retroactively legalize an earlier unauthorized choice.

---

# I. Difficulty knobs

Difficulty may tune:
- enemy Aim/HP;
- detection gain;
- Window size;
- responder timing;
- Will pressure;
- Wildcard pool;
- Apex pool;
- Royce incursion cap/pressure;
- casualty recovery windows.

Canonical default intervention table:

| Difficulty | Wildcard / season | Apex / campaign | Royce cap / season |
|---|---:|---:|---:|
| Story | 3 | 4 | 1 |
| Standard | **2** | **3** | **2** |
| Veteran | 1 | 2 | 2 |
| Ghost | 1 | 1 | 3 |

---

# J. Multi-mode contract

| Client | Must preserve |
|---|---|
| XCOM TB | AP/grid/state rules + intervention ladder + persistent roster loss |
| Mobile TB | same resolver, reduced interface complexity |
| FPS | same phases/states/consequences expressed in real time |

The Jordan/PRIM2/Royce escalation relationship and named-roster continuity must remain recognizable across clients even when exact control schemes differ.

---

# K. V1 completion checklist

### Strategy
- [ ] Ensemble roster
- [ ] Mission/episode board
- [ ] Budget / Heat / Standing / Intel
- [ ] Injury downtime
- [ ] Vacancy/workload tracking
- [ ] Internal promotion / cross-training path
- [ ] New-arrival onboarding state
- [ ] Wildcard season pool
- [ ] Apex campaign pool
- [ ] Hitman pressure + Royce cooldown
- [ ] Aftermath writeback

### Tactical
- [ ] Grid, LOS, cover, flank
- [ ] 2 AP standard turns
- [ ] R/E/T technical-tactical grammar
- [ ] Detection
- [ ] Approach/Window/Extract clocks
- [ ] STABLE/DEGRADED/CRITICAL/TERMINAL state
- [ ] Downed/stabilize/injury/death
- [ ] Jordan Wildcard request + delayed arrival
- [ ] PRIM2 Apex request state
- [ ] Royce incursion state
- [ ] graded outcome

### Progression
- [ ] XP channels
- [ ] small perk trees
- [ ] role/cross-training tags
- [ ] support-to-main mechanical growth
- [ ] no generic Prime-rank unlock

### Content
- [ ] one ensemble tutorial mission
- [ ] one mission where Jordan is unavailable
- [ ] one mission that can reach a Wildcard rescue
- [ ] one controlled Apex-intervention test
- [ ] one Royce-incursion test
- [ ] one vacancy/reassignment test
- [ ] one newcomer onboarding test

---

# L. Governing gameplay feeling

The campaign should not train the player to treat named operators as disposable bodies.

It should create moments where the player looks at a collapsing mission, sees a character they have spent seasons learning, sees only one Wildcard Authorization left, and decides:

> **Fuck the perfect grade. Call Jordan. Get them home.**

If that person still dies, the next mission should feel different because they are gone.

And on the rarest missions, after Jordan is already there and even he cannot stabilize the board:

> **Call PRIM2.**

Then, sometimes, the opposing side answers with Royce.

That escalation is part of the story, not a cheat menu.