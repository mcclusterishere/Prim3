---
status: PROPOSED
system: Game mechanics — gap fill
version: 1.0.0
---

# Mechanics gaps filled

This file closes major holes left by `GAME-MECHANICS-COMPLETE.md` and `TACTICAL-XCOM-MECHANICS.md`.

---

## 1. Concealment (XCOM2-style, Prim3-flavored)

Missions start in **Concealed** unless the Brief says otherwise.

### Concealed state
- Enemies patrol but do not engage until **Break**.
- Player can position freely within movement rules.
- Detection meter still rises from cameras and loud actions.

### Break concealment when
- Any player unit fires
- Loud breach
- Walk into enemy unit tile range (adjacent reveal)
- Detection hits 6+
- Scripted story trigger

### After break
- Full combat AI on
- Overwatch pods activate
- Window clock does **not** auto-start until On Objective zone is entered (Approach can still be concealed)

**Design:** Approach can stay quiet; On Objective is where concealment usually dies.

---

## 2. Deployment and extract (skyranger equivalent)

### Deployment
- Mission starts in **Deploy Zone** tiles (tagged `DEPLOY`)
- Up to **3 operators** standard (T/E/R). Lead as 4th only on story ops
- Player places units on DEPLOY tiles before turn 1
- Optional: staggered deploy (one unit delayed 1 turn) as negative mission modifier

### Extract
- `SAFE` / `EXTRACT` tiles must be held or stood on
- **Full extract:** all living units on EXTRACT tiles; player confirms
- **Partial extract:** confirm with people left behind → those left are captured/dead per mission rules
- Extract confirmation ends mission even if enemies remain
- Carrying sealed take: Field-T or any unit with Take item in inventory must extract or take is lost

### Evac timer
When Extract phase starts, Extract Clock **is** the evac timer.  
No second parallel timer in v1.

---

## 3. Inventory during mission

### Per unit
| Slot | Capacity |
|------|----------|
| Armor | 1 |
| Sidearm | 1 |
| Primary | 0–1 |
| Backpack / role kit | 1 package |
| Utility | 2 |
| Carried objective | 1 (Take cartridge, intel item, VIP token) |

### Ground items
- Drop 0 AP, pick up 1 AP
- Sealed Take is an item; dropping it risks loss if not recovered

### Ammo (v1 simplified)
- Sidearm: infinite
- Primary: **4 shots** then Reload 1 AP
- Utility consumables: 1 use each

---

## 4. Weapon table (v1)

| Weapon | Class | Dmg | Range band | Notes |
|--------|-------|-----|------------|--------|
| Service Pistol | Sidearm | 2 | Close/Mid | All roles |
| Compact SMG | Primary | 3 | Close/Mid | Field-E default |
| Carbine | Primary | 4 | Mid | Heavier, −1 Move when equipped |
| DMR | Primary | 4 | Mid/Long | Field-R overwatch kit |
| Non-lethal stapler | Utility fire | 0 (Stagger) | Close | Story/compliance ops |

No grenade spam in v1. One utility explosive max if mission authorizes:

| Utility | Effect |
|---------|--------|
| Flash | Suppress + break enemy Overwatch in radius 2 |
| Smoke | +cover equivalent in radius 2 for 1 turn |
| Breach charge | Open ENTRY, +2 Detection |

---

## 5. Armor table (v1)

| Armor | Armor stat | Move | Signature |
|-------|------------|------|-----------|
| Soft light (R default) | 0 | +1 | −1 Detection from move |
| Soft mid (T default) | 1 | 0 | 0 |
| Soft-mid plate (E default) | 2 | −1 | +1 Detection from move |
| Heavy (restricted) | 3 | −2 | +2 Detection |

---

## 6. Camera and hack loop (Field-T environmental)

Cameras are devices, not soldiers.

| Action | Who | AP | Effect |
|--------|-----|-----|--------|
| Spot camera | Any with LOS | — | Reveals CAMERA tile |
| Disable camera (quiet) | Field-T adjacent or NODE-linked | 2 | Camera off; needs Tech check (Tech vs 5) |
| Jam lane | Field-R | 2 | Cameras in one lane −1 Detection contribution 1 turn |
| Shoot camera | Any | 1 | Destroy; +2 Detection |

Failed quiet disable: +1 Detection, camera stays on.

---

## 7. Stealth per unit (not only global concealment)

After global concealment breaks, units may still try low profile:

| Condition | Effect |
|-----------|--------|
| Outside enemy LOS | Not targeted by deliberate fire |
| Enter enemy LOS | May trigger reaction if enemy on Overwatch |
| Muted ID + light armor + no sprint | −1 Detection from that unit’s movement once/turn |

---

## 8. Enemy roster (v1)

| Enemy | HP | Aim | Armor | Behavior |
|-------|-----|-----|-------|----------|
| Security Guard | 4 | 55 | 0 | Patrol, investigate |
| Armed Responder | 5 | 60 | 1 | Spawns on high Detection |
| Elite Guard | 6 | 70 | 1 | Holds NODE rooms |
| Camera Operator (human) | 3 | 40 | 0 | Buffs nearby cameras until removed |
| Drone Scout | 3 | 50 | 0 | Fast patrol, high Scan weight |
| Heavy Door (env) | — | — | — | Requires Breach/Bypass |

**Pod idea (optional):** 2 guards spawn linked; engaging one aggroes pod.

---

## 9. Objective tokens

| Token | How gained | Extract rule |
|-------|------------|--------------|
| Sealed Take | Field-T Seal | Must be carried to EXTRACT |
| Raw Take | Pull without seal | Lost if Window ends |
| Intel Photo | Field-R Scan special | Optional bonus |
| VIP / Asset | Interact | Must escort to EXTRACT |
| Evidence Flag | Story | Compliance score |

---

## 10. Engineering / kit bench (strategy, light)

Between missions (not full XCOM workshop tree):

| Project | Cost | Result |
|---------|------|--------|
| Requisition soft armor | Budget | Unlock armor tier |
| Deck module LIVE | Budget | Field-T LIVE package |
| Deck module FORENSIC | Budget + Standing | Forensic package |
| Breach kit upgrade | Budget | Quiet Bypass −1 AP once/mission |
| Med kit | Budget | +1 Stabilize charges on E |

No 40-node research maze in v1. **10–15 unlocks total** for season one.

---

## 11. Training (strategy)

Spend 1 strategy day + Budget:
- +1 role XP channel  
- Or remove Fatigue  
- Or attempt role tag unlock (mission requirements preferred)

---

## 12. Mission generator parameters

When spawning a procedural op, roll:

| Param | Range |
|-------|--------|
| Map template | Office / Lab / Warehouse / Rooftop access |
| NODE count | 1–3 |
| Starting Detection | 0–2 |
| Window size | 6–10 |
| Guard count | 3–8 |
| Camera count | 0–6 |
| Story flag | yes/no |
| Authorized risk | Low/Mid/High |

---

## 13. Lead unit (optional 4th)

**Cohort-03 Lead** actions:
| Action | AP | Effect |
|--------|-----|--------|
| Command Move | 1 | Ally within 4 tiles: free 2-tile step |
| Focus Fire | 1 | Ally +15 Aim on marked target |
| Call Extract | 0 | Start Extract phase early |
| Rally | 2 | Clear Stagger on adjacent allies |

Lead does not replace T/E/R jobs.

---

## 14. Capture and death

| Event | Result |
|-------|--------|
| Bleed-out | Death — removed from roster |
| Left behind on Extract | Capture — may unlock rescue mission; else death after N strategy days |
| Surrender story beat | Capture, mission-specific |

Captured operators can generate **Rescue** mission type.

---

## 15. UI-required information (for implementation)

Every tactical frame must show:
- Active unit AP, HP, Will  
- Phase name + clock ticks remaining  
- Detection 0–10  
- Take status (none / raw / sealed + integrity)  
- Picture state and Space state  
- Enemy count known  

Without these, the mechanics are not playable even if coded.

---

## 16. Still intentionally open (not missing — deferred)

| Topic | Why deferred |
|-------|----------------|
| Full FPS gun-feel | Client layer |
| 3D asset binding to open-source hardware | Production pipeline |
| Multiplayer | After single-player loop |
| Huge research tree | Avoid XCOM bloat |
| Vehicles | Season 2+ |
| Base room building | Optional; strategy board may be enough |
| Exact final % balance | Needs playtest |

---

## 17. Honest completeness score

| Area | Before gap-fill | After |
|------|-----------------|--------|
| Mission clocks | Strong | Strong |
| TB combat core | Medium | Strong |
| Concealment / deploy / evac | Weak | Strong |
| Weapons / armor tables | Weak | Medium (v1 tables exist) |
| Enemies | Weak | Medium |
| Strategy economy | Medium | Medium |
| Engineering | Weak | Light but present |
| Campaign length rules | Medium | Medium |
| FPS client | None | Deferred |
| Mobile client | None | Deferred |

**Core single-player TB + strategy is now specified enough to prototype.**  
Balance numbers and content volume are not “mechanics holes”; they are production work.
