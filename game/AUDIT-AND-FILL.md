---
status: PROPOSED
system: Audit + concrete fills
version: 1.0.0
---

# Audit: where Prim3 is still hollow — and the fills

Vision is strong. Several layers are still **labels without numbers, scenes, or data shapes**. This file is the honest map and the patch.

---

# PART I — HOLLOW POINTS (audit)

| # | Area | Why it feels hollow |
|---|------|---------------------|
| 1 | **Grade math** | S–F ladder exists; no formula that turns mission events into a grade |
| 2 | **Debrief variants** | “Grade-colored lines” — zero actual branches written |
| 3 | **Episode 1** | No beat sheet, runtime, or playable op binding |
| 4 | **Watch auto-resolve** | Watch mode has no rule for what grade the episode “had” |
| 5 | **Named squad** | Roles exist; no starter characters with stats/personality hooks |
| 6 | **Mission 1 map** | No tile counts, NODE list, enemy placements |
| 7 | **Economy numbers** | Budget/Heat/Standing lack starting values and costs |
| 8 | **Season state schema** | Nothing a browser profile could save |
| 9 | **Teaching without fail** | No tutorial contract for first-time players |
| 10 | **Consequence examples** | Partial success doesn’t show *what changes next week* |
| 11 | **Cutscene craft** | Rules for good scenes; no sample scene cards |
| 12 | **Play↔Watch handoff** | No exact UX states when entering/exiting an op |

Everything below **fills these twelve**. Still not final art or code — but no longer empty slogans.

---

# PART II — FILLS

## 1. Grade math (concrete)

### Score channels (0–100 each, then weighted)
| Channel | Weight | How computed |
|---------|--------|----------------|
| **Take** | 35% | integrity 0–3 → 0/40/70/100; × primary weight |
| **Team** | 25% | start 100; −30 per death; −12 per downed-but-saved; −5 per critical injury |
| **Exposure** | 20% | 100 − (Detection peak × 8) − (loud breaches × 5); floor 0 |
| **Speed** | 10% | Window ticks left / starting Window × 100 |
| **Compliance** | 10% | 100 if within sponsor risk; 40 if exceeded once; 0 if blew authorization |

**Final = weighted sum (0–100).**

| Final | Grade |
|-------|-------|
| 90–100 | S |
| 80–89 | A |
| 65–79 | B |
| 50–64 | C |
| 30–49 | D |
| 0–29 | F |

### Anti-binary rules (hard)
- If **Take ≥ 40** and **Team ≥ 40** → grade **cannot be F** (minimum D).
- If any primary token secured and at least one operator extracted → **minimum C**.
- Window = 0 does **not** force F; it zeros Speed and may cut Take if unsealed.

### Worked example
- Sealed integrity 2 (Take 70), no deaths (Team 100), Detection peak 5 (Exposure 60), 2/8 Window left (Speed 25), compliant (100)  
- Final = 0.35×70 + 0.25×100 + 0.20×60 + 0.10×25 + 0.10×100 = 24.5+25+12+2.5+10 = **74 → B**

---

## 2. Debrief branch table (Episode template)

Every playable episode needs this table filled before ship:

| Grade | Sponsor tone | Lead tone | Field-T line theme | Season flag |
|-------|--------------|-----------|--------------------|-------------|
| S | Quiet approval; more rope | Professional relief | “Clean enough to matter.” | `standing +2`, unlock alt intel |
| A | Satisfied | Steady | “We can work with this.” | `standing +1` |
| B | Cold; notes cost | Defensive of team | “It lives. Barely.” | heat +1 |
| C | Threat of replacement | Owns the cost | “Don’t ask me if it was worth it.” | heat +2, injury subplot |
| D | Sanction | Conflict with Sponsor | Silence / truncated | story branch `under_review` |
| F | Freeze out | Fracture | Guilt or shutdown | `crisis_arc` |

**Fill rule:** 6 sponsor lines + 6 lead lines minimum per episode, written in script doc — not improvised at runtime only.

---

## 3. Episode 01 beat sheet (first concrete episode)

**Title:** High Alert (placeholder ok; structure locked)  
**Runtime watch:** ~22–28 min  
**Playable core:** Data extraction, single NODE, low–mid risk  

| # | Beat | Mode | Runtime |
|---|------|------|--------|
| 1 | Cold open: alarm culture / false normal | Watch | 2 min |
| 2 | Authority-03 assigns risk band; Lead accepts | Watch | 3 min |
| 3 | Roster faces: T/E/R introduced in motion | Watch | 2 min |
| 4 | Approach — street to facility edge | Watch or Play | 3–6 min |
| 5 | On objective — NODE work | **Play optional** | 8–12 min play / 4 min watch compress |
| 6 | Extract | Play optional / watch | 2–4 min |
| 7 | Debrief grade branch | Watch | 3 min |
| 8 | Stinger: larger heat | Watch | 1 min |

**Primary token:** Sealed take integrity ≥1  
**Secondary:** Detection peak ≤5  
**Ghost:** No gunfire  

---

## 4. Watch auto-resolve rule

When user skips play:
- Episode plays **canon grade B** by default for Ep 01 (partial institutional reality — not a fantasy S).
- Later episodes may set canon grade in the script header (`canon_grade: A`).
- User profile stores `watched_canon: true` vs `played_grade: S–F`.
- If user later plays, **played_grade overrides** for *their* season state; rewatch can still show original cut with toggle “Show my op outcome.”

---

## 5. Starter squad (named, usable)

| Callsign | Role | HP | Aim | Will | Specialty stat | Hook |
|----------|------|-----|-----|------|----------------|------|
| **RANE** | Field-T | 5 | 55 | 6 | Tech 7 | Precision addiction; hates dirty takes |
| **VOSS** | Field-E | 7 | 65 | 7 | Hold 7 | Treats T as package; dry humor |
| **QUILL** | Field-R | 5 | 70 | 8 | Picture 7 | Speaks least; earliest to call abort |
| **LEAD (SABLE)** | Cohort-03 | 6 | 60 | 8 | Command | Between Sponsor and the floor |

These four are Season 1 faces. Stats match tactical baselines.

---

## 6. Mission 01 map spec (graybox)

**Template:** Office-lab hybrid  
**Size:** 12 × 16 tiles playable  

| Tag | Count / notes |
|-----|----------------|
| DEPLOY | 4 tiles south edge |
| EXTRACT | 3 tiles same south (must rotate back) |
| NODE | 1 server room north-center |
| DOOR/ENTRY | 3 (lobby, stair, server) |
| CAMERA | 4 |
| COVER_LOW | ~18 |
| COVER_HIGH | ~8 |
| OVERWATCH_LANE | east alley + west corridor |
| Guards | 4 starting |
| Responder | spawns if Detection ≥6 |

**Window:** 8 ticks  
**Approach:** 5 ticks (short tutorial)  

---

## 7. Economy starters

| Resource | Start | Notes |
|----------|-------|--------|
| Budget | 100 | |
| Heat | 1 | |
| Standing | 3 (of 10) |
| Intel tokens | 1 | |

| Item | Cost |
|------|------|
| Med recovery (1 injury step) | 15 |
| LIVE deck package | 25 |
| FORENSIC package | 40 + Standing ≥4 |
| Quiet breach tools | 20 |
| Side op | sometimes pays +20–35 Budget |

Heat −1 every 3 strategy days if no loud missions.

---

## 8. Browser season state schema (minimum)

```json
{
  "profile_id": "...",
  "season": 1,
  "episode_index": 1,
  "resources": { "budget": 100, "heat": 1, "standing": 3, "intel": 1 },
  "roster": [
    { "id": "rane", "role": "T", "hp_cap": 5, "injury_days": 0, "xp": {}, "perks": [] }
  ],
  "episodes": [
    {
      "id": "ep01",
      "watched": false,
      "played": false,
      "canon_grade": "B",
      "player_grade": null,
      "flags": []
    }
  ],
  "story_flags": []
}
```

Without this, “campaign” is vapor.

---

## 9. Tutorial contract (no binary fail)

Ep 01 play tutorial must:
1. Teach Move + door on Voss  
2. Teach Scan on Quill  
3. Teach Live Pull + Seal on Rane  
4. Force a moment where Window is low and **early extract is offered**  
5. Show grade screen as **report card**, never “FAILED” banner  

If player extracts with integrity 1 only → **C or B** with teaching debrief, not F.

---

## 10. Consequence examples (partial success matters)

| Ep01 grade | Next episode effect |
|------------|---------------------|
| S/A | Standing +; Sponsor gives optional ghost objective Ep02 |
| B | Heat +1; one camera pattern harder on Ep02 |
| C | Rane Will −1 for one op; Sable vs Sponsor scene longer |
| D | Side op “clean the mess” unlocks; story flag `under_review` |
| F | Crisis cutscene; playable recovery op required for *play* path only — watchers still see authored crisis episode |

---

## 11. Sample cutscene card (debrief B)

**Location:** Glass room, Dual Sight motif subtle  
**Characters:** Authority-03, Sable, Rane silent background  

- Sponsor does not sit.  
- “You brought me something that breathes. Barely.”  
- Sable: “The window closed. The take didn’t.”  
- Sponsor slides a thin folder — next target, worse heat.  
- Rane looks at sealed drive, not at them.  
- Stinger: external news crawl, unrelated to public, related to us.  

This is the standard of specificity every debrief needs.

---

## 12. Play ↔ Watch handoff UX

| State | UI |
|-------|-----|
| Watching | Play bar + “Enter operation” button at bead marker |
| Enter play | Fade; load tactical; pause episode timeline |
| Exit success/abort | Return to debrief bead with `player_grade` |
| Exit abandon | Confirm: “Resolve as watch canon (B)?” |
| Rewatch | Toggle: Canon cut / My outcome cut |

---

# PART III — WHAT IS NO LONGER HOLLOW vs STILL PRODUCTION

### No longer hollow (specified)
- Grade formula + anti-binary rules  
- Ep01 structure  
- Starter squad  
- Map 01 graybox tags  
- Economy starters  
- Save schema  
- Tutorial contract  
- Consequence table pattern  
- One sample debrief card  
- Handoff UX  

### Still production (not “design hollow”)
- Actual animation/VA  
- Final map art  
- Code  
- Full season scripts for ep 02–13  
- FPS client  
- Open-source gear photo pipeline  

---

# PART IV — NEXT SINGLE HARDENING PASS (if still thin)

Do **one** of these next, not all:
1. Write all 6 debrief grade scripts for Ep01  
2. Turn-by-turn **played example** of Map 01 (15 turns)  
3. Full Ep01 watch script outline with dialogue  

That is how hollow dies: **instances**, not more frameworks.
