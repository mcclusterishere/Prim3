---
status: PROPOSED
system: Full product vision — anime series + optional tactical play
version: 1.0.0
---

# PRIM3 Complete Vision

**Not “XCOM with a reskin.”**  
An **anime-style institutional series** you can **watch in the browser**, with the **option to play** the operations that the episode is about.

XCOM’s tactical bones stay useful. Its worst habits do not.

---

# 1. Product identity

| Pillar | Meaning |
|--------|--------|
| **Anime series first** | Seasons, episodes, characters, cliffhangers, score, visual language |
| **Watch mode** | Full episode experience with no mechanical skill required |
| **Play mode** | Drop into the same operation as XCOM-style tactics (later: FPS / mobile) |
| **Browser-native** | Watch and play without a launcher culture barrier |
| **Graded truth** | Missions almost never binary-fail if you achieved something real |
| **Institutional world** | McCluster / Prim3 canon — not alien invasion cosplay |

**One line:** *A series about operators under institutional power — that you can either watch or step into.*

---

# 2. Fixing XCOM’s wounds (explicit)

## 2.1 Binary mission failure is banned

**Problem you named:** You completed pieces of the job and still got **MISSION FAILED**.

**Prim3 rule:** Outcomes are **graded reports**, not a red stamp.

### Outcome ladder (always)
| Grade | Name | When |
|-------|------|------|
| S | Clean authority | All primary objectives + low exposure + team whole |
| A | Operational success | Primary objective done; minor costs |
| B | Partial success | Secondary objectives / partial take / costly exit |
| C | Pyrrhic | Objective touched but severe cost |
| D | Compromise | Little value; high exposure or injury |
| F | Disaster | No value **and** catastrophic loss (death of squad / public blowup) |

**F is rare.** It is not the default for “timer hit zero while carrying half the data.”

### Objective accounting
Every mission lists objectives as **tokens**:
- Primary (weighted)
- Secondary
- Optional / ghost
- Compliance (did not exceed authorized risk)

**Score = sum of secured tokens − penalties**, never a single bool.

If the player seals **any** usable take and extracts **anyone**, the grade is **at least C or B**, not F.

### After-action is a scene, not a fail screen
Aftermath is an **anime debrief scene**:
- Sponsor reaction
- What data mattered
- Who is hurt
- What the institution will do next

Even a C-grade episode continues the season. Story does not soft-lock because a Window clock expired.

---

## 2.2 Other XCOM problems Prim3 rejects

| XCOM pain | Prim3 replacement |
|-----------|-------------------|
| Ironman save scum culture as the “real” way | **Season continuity** with honest grades; optional hardcore later |
| Fail state erases emotional progress | **Grades feed story branches**, they don’t delete the season |
| Soldiers as disposable loadouts | Operators are **characters** with episode arcs |
| Geoscape busywork | **Operations board** tied to episode calendar |
| Cutscenes as reward dumps | **Cutscenes are the product**; play is optional depth |
| Same mission feel every time | Episode-authored missions + procedural only as filler |
| Panic as cartoon | Will tests → **stagger / tunnel vision / hard choices**, not random run |
| “You lost the campaign” walls | Authority pressure rises; **story changes**, campaign continues |

---

# 3. Watch mode vs Play mode

## 3.1 Watch mode (default)
- Full episode: cold open → operation → aftermath
- Tactical layer is **simulated by the story team’s authored outcome** OR a lightweight auto-resolve using the same grade system
- Viewer can open **dossier panels**, timeline, character themes
- No fail; the episode has a canon grade for that watch-through

## 3.2 Play mode (optional)
- Same episode mission, player takes control of the op
- Player grade **can differ** from pure watch canon
- Season state in *their* browser profile follows **their** grades
- Unlocks alt cutscenes / alt debriefs (“what if the take was cleaner?”)

## 3.3 Hybrid moment design
Episodes are built as **beads**:
```
[WATCH scene] → [PLAYABLE OP optional] → [WATCH debrief]
```
Skip play → seamless watch.  
Enter play → return to debrief with grade-colored dialogue.

---

# 4. Browser-native architecture (product)

| Surface | Tech intent |
|---------|-------------|
| Episode player | Stream anime-style episodes (or motion-comic + VA if early) |
| Dossier / world | Wiki-grade canon browser |
| Tactical client | WebGL / WebGPU turn-based map |
| Save state | Account profile: season grades, roster, heat |
| Share | “My grade on Ep 05” cards |

Mobile: watch perfect; tactical simplified.  
Desktop: full tactical.

---

# 5. Season / episode structure

## 5.1 Season
- 8–13 episodes
- Each episode = one major operation or institutional beat
- Multi-episode arcs (sponsor war, mole, Prime succession)

## 5.2 Episode template
1. **Cold open** (2–4 min) — human cost or threat
2. **Board / Brief** — Authority-03 sets risk; Lead chooses posture
3. **Approach** — tension, Field-R eyes
4. **On objective** — Field-T pressure (playable core)
5. **Extract** — cost collection
6. **Debrief** — grade-colored anime scene
7. **Stinger** — season thread

## 5.3 Cutscenes that don’t suck
Rules for Prim3 cinema:
- Characters want conflicting things in the same room (Sponsor vs Lead vs Operator)
- Information is the knife — reveals change who has power
- Silence and procedure are allowed to be tense
- No 8-minute exposition dumps; dossiers hold lore
- Every debrief answers: *What did this cost, and who absorbs it?*
- Alt grades swap **key lines and blocking**, not entire episode production when possible

---

# 6. Tactical layer (kept, improved)

Still XCOM-style AP/grid at core. Improvements:

### 6.1 Objective-first, not kill-first
Winning by murder is rarely S-grade. Quiet sealed take beats loud perfection.

### 6.2 Graded extract always available
Player may call extract early with partial take → **B/C**, not fail.

### 6.3 Role triad clarity
- **T** = take quality vs time
- **E** = space and survival
- **R** = information and warning

### 6.4 Clocks as drama, not punishment
When Window hits 0, mission becomes Extract with what you sealed — **not** instant fail.

### 6.5 Characters on the board
Named operators with will, injury, and episode dialogue — not interchangeable rookies only (rookies exist, but story ops use named faces).

---

# 7. Strategy layer (operations board)

Between episodes / in play mode campaign:

| System | Function |
|--------|----------|
| Roster | Named characters + injuries |
| Heat | World attention |
| Standing | Authority trust |
| Budget | Kits and recovery |
| Episode calendar | Story missions land on dates |
| Side ops | Optional playable fillers that adjust heat/standing |

Side ops never gate the anime season permanently; they color **your** playthrough.

---

# 8. Progression without grinding the soul away

- Operators gain perks slowly
- Story unlocks matter more than stat sticks
- Gear unlocks are few and readable
- New phenotypes appear through seasons (not 40 item tiers)

---

# 9. Multi-mode roadmap (same outcomes)

| Mode | Role |
|------|------|
| Watch | Primary audience |
| TB tactical | Deep play (XCOM-like) |
| Mobile tactical | Shorter TB |
| FPS | Later “on the ground” client |

All write the **same grade channels**: Take, Team, Exposure, Speed, Compliance.

---

# 10. What “better than XCOM” means here

| Dimension | Better how |
|-----------|------------|
| Emotional continuity | Grades + episodes, not fail-to-desktop |
| Clarity of roles | T/E/R triad every mission |
| Accessibility | Watch-first browser |
| Story | Anime institutional thriller, not war of the week only |
| Fairness | Partial work counts |
| Style | McCluster / Prim3 visual system |
| Optional depth | Play only if you want |

---

# 11. Implementation priority (honest)

1. **Episode format + grade system + debrief variants**  
2. **One playable TB mission that cannot binary-fail**  
3. **Browser watch player + play button**  
4. **Operations board light**  
5. **Season one scripts**  
6. Mobile TB  
7. FPS client  

---

# 12. Non-goals

- Replacing XCOM feature-for-feature
- Punishing players for incomplete perfection
- Forcing play to see the story
- Loot-driven live service as the core
- Alien invasion mythology

---

# 13. Success metric

A viewer finishes Episode 05 without playing and feels the season.  
A player replays Episode 05’s op for an S-grade and unlocks a harder, colder debrief line from Authority-03.  
Neither path is “the fake game.”
