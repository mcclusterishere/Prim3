---
status: PROPOSED
system: Game — XCOM-style tactical layer
version: 1.0.0
---

# PRIM3 Tactical Mechanics (XCOM-style)

Turn-based tactical missions.  
Same mission spine as the strategy layer and any future FPS/mobile clients.

**Roles in play (standard squad):**
- **Field-T** Technical Operator — collects the take
- **Field-E** Entry Operator — opens and holds space
- **Field-R** Overwatch Operator — owns the outside picture

Optional later: Cohort-03 Lead as squad leader unit with command actions.

---

## 1. Mission spine (unchanged)

```
BRIEF (off-clock)
  → APPROACH (Approach Clock)
  → ON OBJECTIVE (Window Clock)
  → EXTRACT (Extract Clock)
  → AFTERMATH (off-clock score)
```

Tactical combat map play happens in **Approach**, **On Objective**, and **Extract**.

---

## 2. Turn structure

### Side order
1. **Player phase** — all player units act (any order)
2. **Threat phase** — adversaries, cameras, timers, environmental pressure resolve
3. **Clock phase** — apply tick losses from what happened this round

### Actions per unit
Each unit gets **2 Action Points (AP)** per player phase.

| AP cost | Action type | Examples |
|---------|-------------|----------|
| 0 | Free | Short status ping, swap marked item in hand if already on belt rules allow |
| 1 | Standard | Move (see movement), Aim, Interact, Overwatch, Suppress, Seal take, Breach attempt |
| 2 | Full | Sprint, Heavy interact (forensic image step), Combined move+act where allowed |

**Unused AP does not carry** to the next turn.

### Initiative / order
Player chooses unit order freely each player phase (XCOM-style, not strict speed initiative).

---

## 3. Map language

### Tiles
- Grid map (square tiles). Default mission: **40–80 tiles** of playable space.
- Elevation optional in v1; add later.

### Tile tags
| Tag | Meaning |
|-----|--------|
| `OPEN` | No cover |
| `COVER_LOW` | Half cover |
| `COVER_HIGH` | Full cover |
| `DOOR` | Closed / open state |
| `NODE` | Technical interact point (Field-T objective) |
| `ENTRY` | Breachable portal |
| `OVERWATCH_LANE` | Long sight line for Field-R |
| `SAFE` | Extract / van / exit zone |
| `CAMERA` | Detection source |
| `HAZARD` | Damage or delay if entered |

### Fog / knowledge
- **Seen** — currently in LOS of a player unit
- **Known** — seen earlier this mission
- **Unknown** — never seen

Field-R reveals more on Approach and during Window when stationed on `OVERWATCH_LANE`.

---

## 4. Movement

| Action | AP | Distance |
|--------|-----|----------|
| Move | 1 | Up to **Movement** stat tiles |
| Sprint | 2 | Up to **Movement + 2**, ends AP, cannot shoot/interact after |

**Default Movement stats (v1)**
| Role | Movement | Notes |
|------|----------|--------|
| Field-T | 4 | Encumbered by deck modules |
| Field-E | 5 | Baseline maneuver unit |
| Field-R | 6 | Lightest kit |

Difficult terrain / climb / vault: +1 AP or −2 tiles (pick one rule and keep it consistent; v1 = **−2 tiles**).

---

## 5. Core stats (per unit)

| Stat | Meaning |
|------|--------|
| **HP** | Hits before downed |
| **AP** | 2 per turn |
| **Movement** | Tiles per Move action |
| **Aim** | Base % before cover/range |
| **Armor** | Flat damage reduction |
| **Will** | Stress resistance (panic / freeze) |
| **Tech** | Field-T only — interact quality |
| **Hold** | Field-E only — space control strength |
| **Picture** | Field-R only — detection and warning strength |

### v1 baselines
| Role | HP | Aim | Armor | Will | Special |
|------|-----|-----|-------|------|--------|
| Field-T | 5 | 55 | 1 | 6 | Tech 7 |
| Field-E | 7 | 65 | 2 | 7 | Hold 7 |
| Field-R | 5 | 70 | 0 | 8 | Picture 7 |

---

## 6. Combat (kinetic)

Prim3 is not “kill everyone to win.” Combat is a failure pressure and a tool, not the default objective.

### Shot resolution
```
Hit% = Aim − CoverPenalty − RangePenalty + HeightBonus − Suppression
```

| Cover | Penalty to attacker |
|-------|---------------------|
| None | 0 |
| Low | −20 |
| High | −40 |

| Range | Penalty |
|-------|--------|
| Close (1–4) | 0 |
| Mid (5–8) | −10 |
| Long (9+) | −25 |

**Damage (v1):** weapon base − armor (min 1 if hit).

### Sidearm (all roles carry)
- Damage 2–3
- Range efficient Close/Mid
- 1 AP to fire

### Primary (Field-E often; Field-R sometimes; Field-T rare)
- Higher damage or better range by kit
- Still 1 AP to fire

### Overwatch
- 1 AP: reserve reaction shot on first enemy move in LOS this threat phase
- Field-R gets **+10 Aim** on Overwatch when on `OVERWATCH_LANE`

### Suppression
- 1 AP: pin a target (−30 Aim next shot, cannot Sprint)
- Field-E is best at this

### Downed / death
- HP 0 → **Downed** (not dead yet)
- Downed unit: 1 HP bleed clock (3 turns) unless stabilized
- Field-E can Stabilize (1 AP adjacent)
- Extract with downed unit: Extract Clock −1 extra
- Death on bleed-out or execution event → Aftermath penalty severe

---

## 7. Role actions (the real game)

### Field-T — Technical
| Action | AP | Tick effect | Result |
|--------|-----|-------------|--------|
| **Survey Node** | 1 | 0 | Reveals node type and required work remaining |
| **Live Pull** | 1 | Window −1 | +1 Take (low integrity) |
| **Exploit Step** | 2 | Window −2 | +2 Take (medium integrity) |
| **Forensic Image** | 2 | Window −3 | +2 Take (high integrity) if write-block conditions met |
| **Seal Take** | 1 | 0 | Locks current Take; further pulls start a new packet |
| **Hard Reset / Abort Work** | 1 | 0 | Cancel partial unsafe work; avoid contamination |

**Take integrity track (0–3)**
- 0 Contaminated / useless
- 1 Usable but weak (RAPID style)
- 2 Solid
- 3 Clean (FORENSIC style)

If Window hits 0, only **Sealed** take counts.

### Field-E — Entry / Hold
| Action | AP | Effect |
|--------|-----|--------|
| **Breach Door** | 1 or 2 | Open `ENTRY`/`DOOR`; loud breach may raise Detection |
| **Hold Angle** | 1 | Mark a corridor/door; enemies paying through it take −20 / provoke Overwatch |
| **Clear Room** | 2 | Sweep adjacent room; reveal unknowns in that room |
| **Guard Tech** | 1 | Adjacent to Field-T: first hit against Field-T redirects to Field-E once this turn |
| **Stabilize** | 1 | Stop bleed on downed ally |
| **Force Move** | free (command) | On Contact state: can order Field-T to spend Move without debate (narrative + mechanical priority) |

**Space state:** `Secure` / `Contested` / `Lost`  
If Space = Lost for 2 consecutive clock phases, Window gains −1 extra per turn.

### Field-R — Picture / Warning
| Action | AP | Effect |
|--------|-----|--------|
| **Scan Lane** | 1 | Reveal enemies/cameras in a lane; on success reduce Detection pressure |
| **Mark Threat** | 1 | Tagged enemy: +10 Aim for allies this turn |
| **Quiet Route** | 2 | Next Approach/Extract group move costs −1 tick once |
| **Raise Alarm Call** | 0 | Force Lead decision: continue or Extract; narrative interrupt |
| **Overwatch** | 1 | As combat Overwatch with lane bonus |
| **Mute Signature** | 1 | Self Dual Sight muted; harder to detect, allies may lose easy ID |

**Picture state:** `Clear` / `Uncertain` / `Hostile`  
Hostile Picture → Approach/Extract clocks tick faster (−1 extra on Clock phase).

---

## 8. Detection and heat (not alien “activity”)

### Detection meter (0–10)
| Source | +Detection |
|--------|------------|
| Walking in camera LOS | +1 |
| Loud breach | +2 |
| Gunfire | +2 to +3 |
| Failed stealth interact | +1 |
| Field-R successful Scan | −1 (min 0) |

| Detection | Effect |
|-----------|--------|
| 0–2 | Quiet |
| 3–5 | Patrols shift toward players |
| 6–8 | Reinforcements schedule |
| 9–10 | Mission Heat max — Window −1 per Clock phase until Extract |

---

## 9. Clocks in tactical play

Applied in **Clock phase** after Threat phase.

| Phase | Default ticks | Spend triggers |
|-------|---------------|----------------|
| Approach | 6 | Zone transitions, anomalies, detours |
| Window | 8 (6 if detected entry) | Field-T work, lost space, hostile picture |
| Extract | 6 (4 if window collapsed; 3 if hot) | Route breaks, carrying downed, bulk take |

**Early extract:** Lead may end Window while ticks remain → better Extract size, lower Take possible.

---

## 10. Mission end states

| Result | Requirements |
|--------|----------------|
| **Full success** | Sealed Take integrity ≥2, all units in SAFE, Detection <9 at exit, no deaths |
| **Partial success** | Sealed Take ≥1 OR high intel value, but hot exit / injury / high detection |
| **Failure** | No sealed take, or all operators down, or Exposure flag beyond authorized risk |

Aftermath feeds strategy layer: reputation, heat on institution, injuries, unlocked ops.

---

## 11. Loadout hooks (why kits matter)

Loadouts modify stats and action costs — they do not invent new phases.

### Field-T examples
| Kit | Mechanical effect |
|-----|-------------------|
| LIVE | Exploit Step integrity floor 1; standard costs |
| FORENSIC | Forensic Image available at full value; +1 AP cost if moving same turn |
| RAPID | Live Pull only 1 AP still; integrity cap 1 unless later sealed upgrade |
| DENIED | −Detection from tech actions; Survey may cost +0; lower emission |

### Field-E examples
| Kit | Mechanical effect |
|-----|-------------------|
| Approach & Entry | Breach tools: loud Breach 1 AP, quiet Bypass 2 AP |
| Hold & Protect | Guard Tech stronger (2 redirects / mission) |
| Contact / Collapse | Sprint +1 tile; Stabilize 1 AP still |
| Technical Escort | Move matched: when adjacent to Field-T, Field-T Move does not provoke free enemy disengage once / turn |

### Field-R examples
| Kit | Mechanical effect |
|-----|-------------------|
| Static Overwatch | +Picture on lane; Overwatch +15 |
| Mobile Perimeter | Movement +1; Scan weaker range |
| Low-Signature | Detection gains from movement reduced by 1 (min 0) |
| Exfil Screen | Quiet Route costs 1 AP during Extract |

---

## 12. Adversary basics (v1)

| Type | HP | Behavior |
|------|-----|----------|
| **Guard** | 4 | Patrol, investigate Detection |
| **Camera** | — | Adds Detection in LOS; hackable later by Field-T |
| **Responder** | 5 | Spawns at Heat thresholds |
| **Hard target** | 8 | Objective defender; avoid if possible |

AI priorities: investigate noise → move to last known → engage nearest visible → call heat.

---

## 13. Will / pressure (XCOM panic analogue)

| Trigger | Will test |
|---------|----------|
| Ally downed in LOS | Yes |
| First gunfire when Detection was <3 | Yes |
| Window hits 0 while still on NODE | Field-T tests |
| Picture goes Hostile | Field-R tests |

**Fail Will:** 1 turn **Stagger** (only 1 AP) or **Freeze** (0 AP, Field-T only on botched high-stress interact).

No cartoon panic run into enemies for v1.

---

## 14. Standard squad turn example

1. Field-R Scans lane (1 AP), Overwatch (1 AP)  
2. Field-E Breaches (1 AP), Hold Angle (1 AP)  
3. Field-T Moves to NODE (1 AP), Live Pull (1 AP)  
4. Threat phase — guard walks into Overwatch  
5. Clock phase — Window −1 from Live Pull  

---

## 15. Build order inside this mode

1. One graybox map (office / server room hybrid)  
2. Three player units with baseline stats  
3. Approach / Window / Extract clocks  
4. Field-T node actions + Seal  
5. Field-E breach + hold  
6. Field-R scan + overwatch  
7. Detection meter  
8. One Full / Partial / Fail scoring path  
9. Then loadout modifiers  
10. Then strategy hub  

---

## 16. Explicit non-goals for v1 tactical

- Full FPS movement  
- Huge skill trees  
- Base building  
- Multiplayer  
- Vehicle combat  
- Procedural campaign  

One mission, three operators, readable clocks, decisive Extract.
