---
status: PROPOSED
system: Game mechanics — full spine
version: 1.0.0
---

# PRIM3 Game Mechanics (complete spine)

This is the full rules stack for the XCOM-style product first.  
Real-time FPS and mobile tactical are later **clients** of the same outcomes.

Related: `TACTICAL-XCOM-MECHANICS.md` (mission combat detail).

---

# A. Product layers

| Layer | Name | Job |
|-------|------|-----|
| 0 | **Shared outcome rules** | Phases, clocks, success states |
| 1 | **Strategy layer** | Choose ops, assign teams, live with consequences |
| 2 | **Tactical layer** | XCOM-style mission play |
| 3 | **Progression** | Operators, gear, institutional rank |
| 4 | **Campaign structure** | Seasons, heat, story gates |
| 5 | **Presentation clients** | TB / mobile TB / FPS (same resolver) |

If a feature does not feed a mission outcome or a campaign consequence, it is not v1.

---

# B. Shared outcome rules (source of truth)

## B1. Mission phases
```
BRIEF → APPROACH → ON OBJECTIVE → EXTRACT → AFTERMATH
```

## B2. Clocks (ticks)
| Phase | Default | Notes |
|-------|---------|--------|
| Brief | Off | Planning only |
| Approach | 6 | Detection can collapse early |
| Window | 8 (6 if detected) | Field-T work burns this |
| Extract | 6 / 4 / 3 | Clean / collapsed / hot |
| Aftermath | Off | Scoring |

## B3. End states
| State | Meaning |
|-------|--------|
| **Full success** | Objective met, sealed take good enough, team out, exposure within authorization |
| **Partial** | Something usable, but injury / heat / weak take / hot exit |
| **Failure** | No usable take, team broken, or unauthorized exposure |

## B4. Mission score channels
Every mission writes all five:
1. **Take value** (0–3 integrity × objective weight)
2. **Team integrity** (deaths, downs, injuries)
3. **Exposure** (detection peak, witnesses, signature)
4. **Speed** (ticks remaining on Window/Extract)
5. **Authorization compliance** (did you exceed sponsor risk?)

---

# C. Strategy layer (XCOM geoscape equivalent)

## C1. What you manage
Not a global alien war map. An **institutional operations board**.

| System | Player manages |
|--------|----------------|
| **Roster** | Operators by phenotype path (Cohort → Field roles) |
| **Deployment** | Who goes on the next op (standard 3: T/E/R) |
| **Loadouts** | Kits attached to roles for that op |
| **Heat** | How loud the institution is in the world |
| **Standing** | With Authority-03 / 02 / 01 |
| **Intel** | Known targets, timers, story missions |
| **Recovery** | Injured operators unavailable |

## C2. Strategy turn (between missions)
1. Advance time (1 strategy day)
2. Resolve injury recovery, heat decay/spike events
3. Receive intel / sponsor offers
4. Optional: train, reassign, craft/kit bench (light)
5. Select mission or wait
6. Brief → launch tactical

## C3. Resources
| Resource | Use |
|----------|-----|
| **Budget** | Kits, replacements, medical |
| **Intel tokens** | Reveal mission modifiers before Brief |
| **Standing** | Unlocks harder/higher-value ops |
| **Heat** | Raises detection baselines and response speed on future ops |
| **Personnel** | Limited qualified Field-T/E/R bodies |

v1 economy stays small: **Budget + Heat + Standing + Roster availability**.

## C4. Mission offers
Each offer shows:
- Objective type
- Estimated Window size
- Risk band (sponsor authorization)
- Reward (Budget, Standing, story flag)
- Required roles
- Optional intel cost to reveal extras

---

# D. Mission types (tactical templates)

| Type | Primary job | Typical success |
|------|-------------|-----------------|
| **Data extraction** | Field-T on NODE | Sealed take ≥2 |
| **Secure & hold** | Field-E control until timer | Survive Window while T works |
| **Ghost survey** | Field-R picture, minimal kinetic | Intel only, Detection ≤2 |
| **Denial** | Spoil enemy take / destroy NODE | NODE offline without full forensic |
| **Recovery** | Extract asset or downed operator | Unit reaches SAFE |
| **Story beat** | Scripted constraints | Mission-specific |

All use the same clocks and AP rules; templates change NODE count, Detection start, and fail flags.

---

# E. Tactical layer (complete combat rules)

## E1. Turn order
1. Player phase (activate units in any order)  
2. Threat phase  
3. Clock phase  

Each unit: **2 AP** per player phase. No carry-over.

## E2. Line of sight (LOS)
- LOS is straight-line through tile centers.
- Blocks: walls, closed doors, full terrain blockers.
- Low cover does **not** block LOS; it only applies aim penalty.
- Units block LOS only for targeting past them if rule_simple_v1 = **no** (v1: units do not block LOS).

## E3. Flanking
- If attacker has LOS and target’s cover does not face the attacker’s tile side → **flank**.
- Flank: ignore that cover penalty; +10 Aim.

## E4. Movement
| Action | AP | Effect |
|--------|-----|--------|
| Move | 1 | Up to Movement tiles |
| Sprint | 2 | Movement+2, no shot/interact after |
| Hunker | 1 | +20 defense vs shots until next move (requires cover) |

Difficult terrain: −2 tiles that action.

## E5. Standard combat actions
| Action | AP | Notes |
|--------|-----|--------|
| Fire | 1 | Sidearm or primary |
| Overwatch | 1 | Reaction on first enemy move in LOS |
| Suppress | 1 | −30 Aim on target; blocks Sprint |
| Reload | 1 | If magazine model enabled (optional v1: infinite sidearm ammo, primary 3 shots then reload) |
| Swap item | 1 | Deck ↔ tool etc. |

## E6. Hit formula
```
Hit% = Aim − Cover − Range + FlankBonus + HeightBonus − Suppression − Wounds
Clamped 5%–95%
```

Damage = max(1, weapon − armor) on hit.  
Crit (natural roll 90+ if hit): +1 damage (v1 simple).

## E7. Status effects
| Status | Effect | Clears |
|--------|--------|--------|
| **Suppressed** | −30 Aim, no Sprint | End of target’s next turn |
| **Staggered** | Max 1 AP next player phase | After that phase |
| **Downed** | 0 AP, bleed 3 turns | Stabilize or death |
| **Stabilized** | Downed but no bleed | Extract or medevac |
| **Revealed** | Cannot stealth; enemies path toward | Time or leave LOS long enough |
| **Muted ID** | Dual Sight off; allies harder to ID | Toggle action |

## E8. Role action sets (summary)

**Field-T:** Survey Node, Live Pull, Exploit Step, Forensic Image, Seal Take, Abort Work  
**Field-E:** Breach, Bypass (quiet), Hold Angle, Clear Room, Guard Tech, Stabilize  
**Field-R:** Scan Lane, Mark Threat, Quiet Route, Alarm Call, Overwatch, Mute Signature  

Full costs in `TACTICAL-XCOM-MECHANICS.md`.

## E9. Detection (0–10)
Gunfire, loud breach, cameras, failed stealth interact raise it.  
Field-R Scan can lower it.  
High Detection shortens effective clocks and spawns responders.

## E10. Threat phase AI (v1)
Priority:
1. Engage visible hostile in range  
2. Investigate last noise / last seen  
3. Continue patrol  
4. Call heat if Detection threshold crossed  

---

# F. Operator progression

## F1. Rank path (cohort → prime)
```
Cohort-02 Trainee → Cohort-01 Operator → Field qualification (T/E/R tags)
  → Cohort-03 Lead → Prime-N1 (story-gated)
```

An operator may earn **role tags**: `can_T`, `can_E`, `can_R` through mission performance.

## F2. XP channels
| Channel | Gained by |
|---------|-----------|
| Technical | Sealed take integrity, nodes completed |
| Entry | Breaches, holds, guards, stabilizes |
| Recon | Scans, clean picture, quiet routes |
| Survival | Missions extracted alive |
| Leadership | (Lead only) full success under pressure |

## F3. Perks (small tree, not Diablo)
After rank-ups pick **1 perk** from role list examples:
- Field-T: Clean Hands (integrity +0.5 floor once/mission), Fast Seal, Cold Focus (Will +2 on NODE)
- Field-E: Iron Door (Hold Angle stronger), Medic, First Through
- Field-R: Ghost Scan, Long Watch, Early Call (Alarm Call also −1 Detection)

Max 3 perks active per operator in v1.

## F4. Injury & fatigue
| Result | Strategy effect |
|--------|-----------------|
| Downed but extracted | −1 mission availability |
| Critical injury | −2 to −3 missions |
| Death | Removed from roster; Standing/Heat impact |
| Fatigue (3 missions back-to-back) | −1 Will until rested |

---

# G. Gear as mechanics (not just cosmetics)

## G1. Slots
| Slot | Required |
|------|----------|
| Armor | Yes |
| Sidearm | Yes |
| Primary | Optional (E/R) |
| Role kit | Yes (T deck modules / E entry / R optics) |
| Utility | 0–2 |

## G2. What gear must define
Every equippable item lists:
- Stat modifiers  
- Action unlocks or cost changes  
- Weight class (affects Movement)  
- Signature (Detection modifier)  

Example:
- FORENSIC deck package: enables Forensic Image at full integrity; Weight heavy (−1 Move)
- RAPID lite deck: Live Pull only efficiency; integrity cap unless upgraded
- Quiet boots: −1 Detection from movement once per turn

Cosmetic-only items are banned from the mechanical sheet.

---

# H. Campaign structure

## H1. Season = strategy campaign act
- 8–15 tactical missions per season act  
- 2–4 story-gated missions  
- Heat and Standing gate which offers appear  

## H2. Failure is data
Failed missions do not soft-lock the season by default; they raise Heat and change available story branches.

## H3. Authority pressure
Authority-03 Mission Sponsor sets per-op risk.  
Exceeding risk can succeed tactically but **fail compliance** → Standing loss with Authority-02/01.

---

# I. Difficulty knobs

| Knob | Effect |
|------|--------|
| Enemy Aim/HP | Direct |
| Detection gain rate | Stealth pressure |
| Window size | Tech pressure |
| Responder timing | Extract pressure |
| Will test frequency | Psychological pressure |

---

# J. Multi-mode contract (future clients)

| Client | Must preserve |
|--------|----------------|
| XCOM TB | Full AP/grid rules |
| Mobile TB | Same rules, smaller maps, fewer enemies |
| FPS | Same phases, clocks as real-time timers, same end-state writer |

FPS may replace AP with stamina/time, but Aftermath channels stay identical.

---

# K. v1 “complete enough” checklist

### Strategy
- [ ] Roster with 3–6 operators  
- [ ] Mission offers (at least 2 types)  
- [ ] Budget / Heat / Standing  
- [ ] Injury downtime  
- [ ] Aftermath writeback  

### Tactical
- [ ] Grid, LOS, cover, flank  
- [ ] 2 AP turns  
- [ ] T/E/R actions  
- [ ] Detection meter  
- [ ] Approach/Window/Extract clocks  
- [ ] Downed/stabilize  
- [ ] Full/Partial/Fail  

### Progression
- [ ] XP channels  
- [ ] 1–3 perks  
- [ ] Role tags  

### Content
- [ ] 1 tutorial mission  
- [ ] 1 standard data extraction  
- [ ] 1 high-heat extract under pressure  

When this checklist is implemented, mechanics are **complete for v1**. Polish and FPS come after.

---

# L. What “complete” does not mean yet

- Final art  
- Final balance numbers (expect retune)  
- Open-source hardware catalog binding  
- FPS gun-feel  
- Live service / multiplayer  
- Full seven-season content  

Those are content and presentation, not missing core mechanics.
