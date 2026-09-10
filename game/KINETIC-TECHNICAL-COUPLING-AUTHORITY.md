---
status: CANON
system: Kinetic <-> technical battlefield coupling
version: 1.0.0
owner: Matthew McCluster
authority: Subordinate only to CANON.md and TACTICAL-IT-MECHANICS-BIBLE.md
---

# PRIM3 Kinetic / Technical Coupling Authority

This document specifies how shooting-game mechanics and IT-lab mechanics must affect one another on the same XCOM-style tactical board.

The design target is not “combat, then terminal.” The target is **combat over the meaningfully correct technical objective**.

The player should routinely face decisions where:
- firing is satisfying and tactically useful;
- not firing may preserve evidence, infrastructure, stealth, or civilian trust;
- suppression can be more valuable than a kill because it buys T one uninterrupted activation;
- R must choose between Overwatch and gathering the fact T needs;
- E must choose between hunting a threat and maintaining the Control Zone that makes careful work possible;
- T can choose to stop technical work, draw a sidearm, or trust E/R to keep the technical window alive;
- successful technical work can open a door, restore lights, change cameras, recover comms, remove an enemy control path, or reveal reinforcements.

---

# 1. Kinetic actions as technical-state operators

## 1.1 FIRE

**Cost:** 1 AP.

Possible positive technical effects:
- remove Interdictor before it reaches T;
- stop Retriever carrying evidence;
- stop Saboteur before critical equipment is damaged;
- protect R vantage point;
- regain Control state by reducing local threat.

Possible negative technical effects:
- Detection +2/+3 under existing combat rules;
- fragile equipment damaged if line of fire crosses destructible objective prop;
- evidence integrity reduced if evidence container is struck;
- Picture degraded by smoke/noise/broken lighting when mission declares it;
- civilian/privacy exposure increased;
- responder relationship changed from neutral to hostile if player fires unjustifiably;
- T fragile/anchored action interrupted by incoming return fire caused by escalation.

**Design law:** If a firefight occurs near a LAB_NODE, the node's physical ecology must matter. Shooting in a server room, evidence room, public event, rooftop relay, or power corridor cannot be mechanically identical.

## 1.2 SUPPRESS

**Cost:** 1 AP.

Canonical technical purpose:
- prevent an enemy from reaching a node this Threat phase;
- reduce enemy aim against anchored T;
- hold a corridor without abandoning evidence/relay/control position;
- delay a Retriever/Saboteur long enough for a lab stage to finish.

Suppression should often be the **best systems-thinking move**, even when killing has a higher emotional payoff.

## 1.3 OVERWATCH

**Cost:** 1 AP.

Technical use cases:
- protect a fragile node interaction;
- create a no-cross lane around an evidence room;
- screen E while E manually stabilizes a cyber-physical system;
- protect extraction route carrying sealed evidence;
- guard R's own sensor position when R cannot afford another unit to cover it.

R receives the strongest long-lane synergy. E receives stronger close-zone control synergy.

## 1.4 BREACH

Loud breach:
- cheaper AP;
- more Detection;
- can damage nearby fragile states when mission says so;
- may destroy opportunity for quiet observation.

Quiet bypass:
- costs more AP;
- preserves Picture/Detection;
- may require authorization/tool state;
- can preserve evidence/civilian calm.

Technical lesson interaction:
- White/Grey/Black Hat can make the physical shortcut itself a scope question.
- Data Breach can make evidence access more important than speed.
- IoT can make door-controller state part of the actual lab.

## 1.5 FLANK

Flanking is not just damage optimization. It changes positional economics.

A player may flank by leaving:
- R vantage;
- E Control Zone;
- T protection radius;
- safe route.

Mission design should sometimes make the “obvious XCOM flank” strategically wrong because it sacrifices the technical objective.

## 1.6 HUNKER / COVER

Cover can be used to preserve a technical activation.

Examples:
- T hunkers instead of attempting a low-value shot while waiting for E to re-secure node.
- R moves to high cover with weaker sensor angle, trading Picture quality for survival.
- E chooses full-cover doorway that protects T but gives worse firing angle.

---

# 2. Enemy archetypes as technical pressure

## 2.1 Interdictor

**Goal:** force T off a node.

AI priorities:
1. path toward node access tile;
2. attack/pressure T if visible;
3. attack E if E blocks path;
4. use cover that contests node zone.

Educational purpose: makes Control and interruption real.

## 2.2 Retriever

**Goal:** take physical evidence/objective item.

AI priorities:
1. reach evidence object;
2. spend interaction AP;
3. extract through known route;
4. avoid unnecessary combat if carrying objective.

Educational purpose: evidence preservation becomes physical battlefield stakes.

## 2.3 Saboteur

**Goal:** damage infrastructure.

Possible targets:
- relay;
- backup power;
- evidence terminal;
- sensor;
- door controller;
- service console.

Educational purpose: power, topology, redundancy, and physical security become combat objectives.

## 2.4 Spotter

**Goal:** maintain LOS and increase enemy information rather than maximize damage.

Effects while active:
- Detection pressure;
- increased enemy aim;
- T fragile actions more interruptible if node exposed;
- R Picture contest.

Educational purpose: information superiority is reciprocal.

## 2.5 Controller

**Goal:** operate fictional cyber-physical environment.

Possible outputs:
- close/open doors;
- change lighting;
- activate/deactivate fictional defensive system;
- alter route/hazard.

Educational purpose: demonstrates actuator/control dependencies without teaching live-system abuse.

## 2.6 Confused Responder

Not inherently hostile.

State may be:
- neutral;
- suspicious;
- cooperative;
- hostile only after escalation/failed authorization context.

Educational purpose: identity, authorization, communications, and human-centered security can resolve tactical problems without combat.

---

# 3. Node exposure model

Every LAB_NODE declares an exposure class.

| Class | Meaning | Typical example |
|---|---|---|
| `SAFE_CONSOLE` | node can be used from protected area | operations center dashboard |
| `COVERED_NODE` | interaction tile has meaningful cover | rack behind cabinet |
| `EXPOSED_NODE` | technical work requires exposed position | rooftop relay |
| `FRAGILE_NODE` | incoming/outgoing fire risks node integrity | evidence console, power panel |
| `MOBILE_NODE` | objective can move | evidence case, portable relay |
| `CYBER_PHYSICAL_NODE` | node changes world geometry/safety | door/HVAC/lift controller |
| `ANCHOR_NODE` | major work forces operator to remain | imaging/recovery array |

A mission should avoid placing every T objective behind perfect full cover. Technical geometry is part of difficulty.

---

# 4. Kinetic event -> technical state matrix

| Kinetic event | Possible technical effect | Required design rationale |
|---|---|---|
| T takes damage while anchored | step -> RECOVERABLE; revalidation required | concentration/physical interruption |
| E suppressed while holding | Control SECURE -> CONTESTED if no backup | protection degraded |
| R forced off vantage | Picture CLEAR/PARTIAL -> lower state in affected lane | lost observation geometry |
| Saboteur reaches power | Power degrades one state | physical dependency |
| Retriever reaches evidence | custody degrades one state | chain of custody |
| gunfire near public area | Exposure/crowd pressure increases | human consequence |
| gunfire near relay | relay integrity/revalidation risk | fragile equipment |
| glass/objective prop destroyed | LOS changes + evidence/privacy consequence | geometry and information |
| suppress threat | threat movement constrained; lab turn preserved | control buys time |
| flank requires leaving hold | better shot but Control may weaken | opportunity cost |
| downed operator blocks route | movement/extract cost changes | physical team state |
| explosive/loud breach | Detection rises; delicate evidence may become unavailable | force vs integrity tradeoff |

No effect should be universal if the environment does not justify it.

---

# 5. Technical event -> kinetic state matrix

| Technical result | Tactical effect examples |
|---|---|
| authenticated comms VERIFIED | reveal responder ETA; enable coordinated route markers |
| network segmentation VERIFIED | remote hostile control path disappears |
| access-control state VERIFIED | door becomes reliable route rather than uncertain hazard |
| camera/sensor state VERIFIED | one enemy lane becomes visible or one Detection source removed |
| lighting restored | LOS and cover readability improve/change |
| power restored | elevator/lift/relay/door returns |
| evidence timeline SEALED | R predicts likely retrieval route or threat priority |
| cloud/service continuity restored | dispatch/responder timing improves |
| IoT safe state established | hazardous actuator stops; civilian path opens |
| correct RAID/failover action | lost tactical subsystem returns while life-safety stays active |
| wrong broad isolation | doors/comms/service degrade and map gets harder |
| failed validation | apparent tactical benefit is withheld until proved |
| recovered trusted state | reinforcements/support or extraction capability returns |

Technical work must produce at least one visible consequence on the board in most major missions.

---

# 6. Six-AP decision grammar

Every standard round offers up to 6 AP across R/E/T.

Designers should create **AP collision**, where at least 8–12 plausible AP uses compete for six actual AP.

Example candidate actions in one round:
- R Move = 1
- R Compare Sources = 1
- R Overwatch = 1
- R Mark Threat = 1
- E Hold = 1
- E Suppress = 1
- E Guard Tech = 1
- E Intercept Retriever = 1+ movement
- T Preserve = 2
- T Isolate = 1
- T Verify = 1
- T Fire = 1

The game becomes interesting because the player cannot do all of them.

---

# 7. Three categories of combat victory

## 7.1 Elimination victory
Threat removed permanently.

Useful but potentially noisy.

## 7.2 Time victory
Threat remains alive but cannot affect objective before critical lab stage completes.

Tools:
- suppression;
- overwatch lane;
- door/control state;
- repositioning;
- technical lockout;
- route denial.

This is a core PRIM3 skill.

## 7.3 Information victory
Player discovers enough about threat to avoid fighting or to fight only where necessary.

Tools:
- R Picture;
- authorization resolution;
- identity verification;
- technical telemetry;
- predicted route.

An S-grade mission may contain fewer kills because the squad understood the system better.

---

# 8. Combat escalation ladder

Missions may expose a response ladder:

```text
UNSEEN
-> OBSERVED
-> CHALLENGED
-> CONTESTED
-> SUPPRESSED / CONTROLLED
-> ENGAGED
-> NEUTRALIZED / BYPASSED / DISENGAGED
```

Not every threat begins as a confirmed lethal enemy.

This is especially important for:
- public facilities;
- incident response;
- social engineering;
- exercises;
- responder environments.

Clear hostile combatants can still exist where story requires them.

---

# 9. Cinematic action rules

PRIM3 should preserve the satisfying spectacle people expect from XCOM-like combat.

## 9.1 Camera triggers

Cinematic camera may trigger on:
- high-probability flank shot;
- overwatch interception of node-bound threat;
- E physical intervention protecting T;
- R long-lane overwatch save;
- final threat before lab completion;
- dramatic miss that damages environment without contradicting aim rules;
- T finishing a major system change under fire;
- emergency Abort as rounds impact nearby;
- technical result immediately changing the environment.

## 9.2 Technical cinematics

Important technical actions deserve the same visual prestige as gunfire.

Examples:
- relay lights come alive while R's coverage map blooms across the grid;
- storage array status rebuilds while doors/cameras return floor by floor;
- evidence seal closes and Retriever path indicator disappears;
- IoT segmentation dims hostile actuator icons while E sees physical doors release;
- access-control verification changes a responder from red uncertainty to neutral/cooperative outline.

The point is not to make terminal typing exciting. The point is to **show the system changing the battlefield**.

## 9.3 Skip/readability rule

Repeated-play cinematics must be short or skippable. Camera may never hide:
- remaining AP;
- active Overwatch;
- lab interruption state;
- clock transition;
- newly opened hazard/route.

---

# 10. Role-specific combat personality

## Field-E
Most kinetic-capable standard operator.

Combat identity:
- close control;
- suppression;
- breach;
- Guard Tech;
- holding choke points;
- emergency stabilization.

Mechanical teaching effect: E converts violence or threat of violence into controlled space.

## Field-R
Best information/long-lane combat utility.

Combat identity:
- Overwatch;
- Mark Threat;
- lane control;
- early warning;
- repositioning;
- precision rather than volume.

Mechanical teaching effect: R converts observation into fewer surprises and more efficient fights.

## Field-T
Lowest default combat priority, not helpless.

Combat identity:
- sidearm self-defense;
- emergency shot when protection fails;
- tactical Abort;
- occasional environment/system interaction that is stronger than firing.

Mechanical teaching effect: every shot T takes is an AP not spent converting the mission's technical opportunity.

---

# 11. Friendly-fire/objective-fire discipline

The game does not need simulated ballistic engineering to make fire discipline matter.

Simplified rule:
- selected fragile mission props occupy targetable/line-crossing zones;
- misses or deliberate fire into those zones can damage props under existing combat resolution;
- UI previews `OBJECTIVE RISK` when a shot line threatens a critical object;
- the player may still take the shot.

This produces meaningful risk without requiring unrealistic micromanagement.

---

# 12. Combat and evidence

Evidence-oriented missions introduce `EVIDENCE RISK` states:
- LOW: sealed/protected;
- MODERATE: exposed but controlled;
- HIGH: active firefight/retriever/saboteur nearby;
- LOST: destroyed/removed beyond recovery.

E can lower physical evidence risk with Control.
T can lower logical evidence risk with Preserve/Seal.
R can lower uncertainty by tracking Retriever routes and corroborating evidence sources.

---

# 13. Combat and power

Power infrastructure can matter tactically without becoming a detailed real-world sabotage simulator.

Canonical abstract states:
- NORMAL
- BACKUP_STABLE
- BACKUP_UNSTABLE
- BROWNOUT
- OFFLINE

Power affects:
- lighting;
- doors;
- relay;
- node availability;
- life safety;
- validation requirements.

Physical damage can move power downward. E manual stabilization and T technical recovery can move it upward when mission supports it.

---

# 14. Combat and communications

Communications state:
- TRUSTED
- DEGRADED
- UNVERIFIED
- LOST

Effects can include:
- ally status pings;
- responder ETA;
- R information sharing;
- off-map support;
- extraction update;
- uncertainty markers.

A wireless/network mission can therefore make technical restoration directly improve combat command-and-control.

---

# 15. Combat and authorization

Authorization can change who is a valid hostile target.

Examples:
- known armed attacker: hostile;
- confused facility guard: uncertain until identity/scope context resolved;
- responder: neutral/cooperative if mission authority is verified;
- exercise participant: non-hostile after White Team terminates exercise state.

The game must not encourage killing neutral/confused actors merely because they obstruct pathing.

Mechanical consequences can include:
- Compliance loss;
- Standing loss;
- Exposure spike;
- future story change;
- mission grade damage.

---

# 16. Mission encounter construction rule

For every major combat encounter, designers must write:
1. what technical objective is active;
2. which threat archetype pressures it;
3. what AP the player wishes they had for lab work;
4. what combat action competes for those AP;
5. what happens if player ignores threat;
6. what happens if player overreacts kinetically;
7. how R can improve the decision;
8. how E can buy time/space;
9. how T can alter the board;
10. what partial success still looks like.

An encounter that cannot answer these is likely filler combat.

---

# 17. Canonical combat-lab encounter examples

## Data Breach — evidence room

State:
- T anchored on evidence preservation;
- E holding evidence room;
- Retriever moving through corridor;
- Interdictor approaching T from service room side;
- R has one AP remaining.

R can:
- Overwatch Retriever;
- Compare final log pair and give T narrower containment evidence.

E can:
- stay on evidence Hold;
- Guard Tech;
- suppress Interdictor;
- move to intercept Retriever.

T can:
- finish Preserve;
- Abort and move;
- draw sidearm if E loses room.

No option is universally correct. Concept understanding tells player what each choice costs.

## Got Wifi — relay room

State:
- strong signal visible;
- backhaul unverified;
- T needs full activation to commit trusted channel;
- Saboteur moving toward backup power;
- Interdictor moving toward relay;
- E only has two AP.

E can:
- suppress relay threat;
- move toward power;
- Hold relay;
- Guard Tech.

R can:
- Overwatch one route;
- validate external responder service;
- warn of Saboteur ETA.

T can:
- configure now;
- wait for external verification;
- investigate backhaul.

The technical lesson and firefight are the same problem.

## IoT — building safe state

State:
- sensor claims corridor clear;
- R physical view contradicts it;
- automated door is cycling;
- civilians trapped;
- hostile pressure approaching.

R spends AP comparing physical and telemetry state.
E manually stabilizes door and escorts civilians.
T segments suspect control cluster.
Enemy contact makes every one of those AP expensive.

## RAID — Site 0 continuity

State:
- one storage/control path failed;
- Prime's system fails over through alternate path;
- life-safety system shares part of dependency graph;
- E/R under combat pressure.

Player cannot simply destroy redundancy. T must distinguish redundancy preserving life from redundancy preserving hostile control while E/R keep the team alive.

---

# 18. Balance targets

For a typical midgame 8-round Window:
- 48 total squad AP are theoretically available before additional clock effects.
- Designers should make 55–70 AP worth of desirable actions visible across movement, lab, combat, optional objectives, and protection.
- Primary technical completion should usually require roughly 25–40% of squad AP across roles, not only T's AP.
- At least 20–35% of meaningful technical progress should depend on R/E-created conditions or evidence in standard triad missions.
- At least one clean technical path should be possible with low kills.
- At least one loud kinetic path should remain viable but produce different Exposure/Integrity/Story results.

These are starting balance targets, not immutable final numbers.

---

# 19. Acceptance tests

A mission's kinetic integration fails review if:
- combat can be removed without changing lab difficulty;
- labs can be removed without changing combat decisions;
- T can finish every technical objective while R/E simply kill enemies;
- R's best move is always Overwatch;
- E's best move is always Fire;
- T's best move is always interact with terminal until progress bar fills;
- killing all enemies automatically solves the mission;
- technical success never changes battlefield geometry/information;
- reckless fire around critical infrastructure has no consequence;
- validation never competes with extraction or combat AP;
- neutral/responding characters are treated as generic enemies without authorization context.

The desired result is a game where the player enjoys the gunfight **because they understand what the gunfight is protecting**.