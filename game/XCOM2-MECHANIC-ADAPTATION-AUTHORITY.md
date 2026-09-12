---
status: CANON
system: PRIM3 tactical mechanic research and adaptation authority
version: 2.0.0
owner: Matthew McCluster
authority: This file governs the XCOM style tactical feel of PRIM3. It is subordinate to CANON.md on story truth and superior to older examples that treat Training Range as a form only exercise.
---

# PRIM3 Tactical Game Authority

## 1. Product law

PRIM3 Missions are a real turn based 3D tactical game.

The target experience is not a quiz page with tactical language around it. The player commands visible characters in physical space, moves them through a multi level environment, uses cover, fires weapons, manages line of sight, rescues people, interacts with infrastructure, enters technical workstations, completes real or simulated lab work, and extracts under pressure.

The technical lab is part of the tactical mission. It is not the entire game and it is not a separate product pasted beside the game.

The three foundation Training Range missions follow this same rule. They are noncanonical story simulations, but they must still feel like full missions with characters, movement, combat, pressure, technical nodes and debriefs.

The current HTML Training Range implementation in the McCluster site is a systems harness for readiness, evidence, scoring and persistence. It is not the canonical final player experience.

## 2. Research basis

The design keeps the strongest structural ideas documented in XCOM 2 while adapting them to PRIM3 rather than cloning proprietary content.

The XCOM 2 manual establishes several useful tactical fundamentals:

1. Two action points per soldier each turn.
2. One action movement and two action dashing.
3. Multi floor tactical navigation and camera elevation.
4. Concealment before contact and visible enemy detection zones.
5. Low and high cover.
6. Flanking as a major positional advantage.
7. Overwatch reaction fire.
8. Hunker Down as a defensive tradeoff.
9. Ammo and reload actions.
10. Interactions such as hacking, carrying wounded units and evacuation.
11. Class specialization and ability progression.
12. Procedurally generated tactical maps.

War of the Chosen adds mechanics especially useful to PRIM3 campaign depth:

1. Soldier bonds and Teamwork.
2. Will depletion and fatigue.
3. Negative traits and fears after repeated stress.
4. Persistent elite adversaries with strengths and weaknesses.
5. SITREP style mission modifiers.
6. Covert and strategic consequences that change tactical circumstances.

Firaxis development commentary around XCOM 2 also supports two architectural lessons we should use carefully:

1. Procedural tactical maps work best when authored spaces are recombined through a controlled plot and parcel system rather than generated without tactical constraints.
2. Randomness is valuable for uncertainty and emergent stories, but excessive invisible randomness can feel punitive. PRIM3 therefore keeps combat uncertainty while making correct technical reasoning deterministic.

## 3. What PRIM3 inherits structurally

| XCOM style idea | PRIM3 adaptation | Reason |
| --- | --- | --- |
| Two action economy | Two AP for standard operators | Creates readable tactical tradeoffs |
| Standard move and dash | One AP move and two AP dash | Makes distance and tempo matter |
| Cover | None, low and high directional cover | Makes physical positioning matter |
| Flanking | Directional exposure and flank state | Rewards maneuver rather than static shooting |
| Concealment | Earned pre contact stealth state | Lets players prepare ambushes and observe before acting |
| Overwatch | Reaction fire on legal movement | Supports perimeter defense and protection of technical work |
| Hunker | Defensive posture with reduced awareness or offensive freedom | Gives weak positions a survival choice |
| Ammo | Magazines and reload actions | Adds tempo and preparation decisions |
| Elevation | Multiple floors, stairs, ladders and vertical sight | Makes buildings tactically meaningful |
| Rescue and carry | Downed operators and civilians can be moved | Connects combat to consequence and extraction |
| Evac | Authored extraction zones and emergency extraction | Makes withdrawal a real strategic decision |
| Classes | Named characters with R, E, T and specialist qualifications | Preserves role clarity without generic soldiers |
| Ability progression | Promotions unlock role specific abilities | Supports long term operator development |
| Bonds | Relationship based Teamwork actions | Connects tactical benefits to existing character relationship canon |
| Will and fatigue | Stress, Will, fatigue and recovery | Makes repeated deployment carry cost |
| Negative traits | Stress can produce temporary or persistent behavioral penalties | Supports psychological continuity without random character rewriting |
| Elite enemies | Royce and other authored threats can disrupt mission plans | Creates recurring adaptive pressure |
| SITREP modifiers | Mission condition modifiers | Creates variation without changing technical truth |
| Procedural maps | Authored parcels assembled by seeded rules | Enables replayability while preserving designed tactical spaces |

## 4. What PRIM3 deliberately changes

### 4.1 Technical work is not a hack roll

XCOM can use probability for a hack action. PRIM3 may not use random chance to invalidate a technically correct learner action.

If the learner has authorization, the right evidence, the right tool and the correct technical procedure, the technical state change succeeds unless the authored environment itself has a known physical failure condition.

Randomness may still create damaged equipment, interrupted access, hostile movement, power loss, incomplete intelligence or time pressure.

### 4.2 Enemy knowledge is not omniscient

Threat AI can react to what enemies can see, hear, infer or receive through their own communications.

Threat AI cannot access hidden learner assessment results or private mastery data.

The Mission Variant Compiler may use learner weakness before deployment to choose a valid mission variant. Once the mission launches, the technical truth is locked.

### 4.3 The director changes pressure, not truth

The Mission Director may vary patrol timing, reinforcement windows, interruptions, environmental pressure and quiet periods.

It may not secretly rewrite the correct network configuration, identity policy or evidence state because the learner is succeeding or failing.

### 4.4 Combat does not substitute for learning

Killing every hostile cannot automatically complete a technical objective.

Combat creates access, time, safety, routes and opportunity. The learner must still perform and verify the required technical work.

### 4.5 Tactical skill and technical skill are separate

PRIM3 tracks Tactical Challenge, Technical Challenge and Scaffolding independently.

A skilled gamer who does not understand networking does not receive Network Plus mastery for winning a firefight.

A strong IT learner who is new to strategy games is not denied technical mastery because their tactical execution is clumsy.

## 5. Tactical turn grammar

Each round resolves:

```text
PLAYER PHASE
THREAT PHASE
CLOCK AND STATE PHASE
```

Standard operators receive two AP at the start of Player Phase.

Core actions include:

| Action | Default cost | Notes |
| --- | ---: | --- |
| Move | 1 AP | Movement inside normal range |
| Dash | 2 AP | Longer movement, ends normal action economy |
| Fire | 1 AP or turn ending by weapon rule | Weapon dependent |
| Overwatch | 1 AP | Reaction fire during hostile movement |
| Hunker | 1 AP | Defensive posture |
| Reload | 1 AP | Restores magazine from carried ammunition |
| Interact | 1 AP | Doors, objectives, consoles, evidence |
| Carry | 1 AP to initiate | Movement penalties may follow |
| Stabilize | 1 AP | Prevents avoidable loss when rules permit |
| Technical action | 1 or 2 AP | Depends on operation and role |
| Extract | context | Requires legal extraction state |

Unused AP does not carry forward.

## 6. Spatial combat grammar

### 6.1 Grid and movement

The tactical simulation uses a discrete navigable grid or equivalent deterministic navigation cells even if the rendered world appears continuous.

Movement preview must show legal destination, AP cost, cover state, known detection exposure and known hazards.

Waypoint movement is required so the player can intentionally avoid detection zones, hazards and unwanted line of sight.

### 6.2 Cover

Cover is directional.

States:

```text
NONE
LOW
HIGH
```

Low and high cover modify hit probability and survivability. Flanking removes the relevant cover benefit from the attacking direction.

Cover can be destructible when the authored material permits it.

### 6.3 Line of sight

Line of sight is calculated from world geometry, elevation, smoke or authored visual obstruction.

The interface must distinguish:

1. confirmed visible target;
2. last known position;
3. inferred location;
4. hidden area.

### 6.4 Concealment

A squad or eligible unit may begin concealed.

Concealment can break through:

1. firing an unsuppressed weapon;
2. entering hostile detection range;
3. creating excessive noise;
4. a scripted discovery state.

Concealed Overwatch may support coordinated ambushes.

## 7. Weapons and damage

Combat resolution is stochastic because tactical uncertainty is part of the game fantasy.

When information is available, the UI should show the player an intelligible estimate of hit chance, expected damage and critical chance.

The model supports:

1. magazines and reloads;
2. weapon range profiles;
3. critical hits;
4. armor or mitigation;
5. area effects;
6. suppression and denial effects where authored;
7. destructible cover and environmental hazards;
8. downed and wounded states;
9. persistent injury;
10. death when mission rules permit it.

Shooting must look and feel like a real game action with animation, camera feedback, audio, impact response and battlefield consequence. Placeholder text buttons are never the final presentation contract.

## 8. Characters, roles and progression

The player controls characters, not abstract cybersecurity icons.

R, E and T remain functional role families:

```text
R  Picture and reconnaissance
E  Physical control and protection
T  Technical objective
```

Named characters can cross train or carry specialist qualifications.

Progression can unlock:

1. movement abilities;
2. defensive abilities;
3. recon abilities;
4. technical remote actions;
5. rescue and stabilization improvements;
6. Teamwork actions;
7. command abilities;
8. equipment proficiency.

A character can become more tactically capable without gaining certification mastery for the learner.

## 9. Bonds, Will and fatigue

Existing relationship canon should become tactical mechanics rather than decorative biography.

Compatible operators who repeatedly deploy together may build a Bond state.

Bond benefits can include:

1. one limited Teamwork action that transfers an AP;
2. improved observation or assistance when a bondmate is engaged;
3. faster stabilization or recovery support;
4. contextual morale recovery.

Will represents mental reserve under operational pressure.

Will can decline through:

1. witnessing injury or death;
2. prolonged mission pressure;
3. repeated deployments without recovery;
4. specific personal fears or story triggers;
5. mission failure.

Low Will can produce fatigue, reduced readiness or authored negative traits. It cannot arbitrarily erase established character personality.

## 10. Mission objectives and clocks

Every mission has primary and optional objectives.

Mission clocks may create pressure, but clocks must be legible and narratively justified.

Possible objectives include:

1. secure a LAB_NODE;
2. preserve evidence;
3. rescue a person;
4. maintain a service;
5. restore a network path;
6. extract an asset;
7. hold a zone;
8. prevent hostile destruction;
9. verify a technical state;
10. reach extraction.

Emergency extraction can preserve personnel at the cost of objectives, loot, evidence or campaign standing.

## 11. LAB_NODE integration

The tactical board and lab are one mission.

A LAB_NODE can represent:

1. workstation;
2. server rack;
3. switch cabinet;
4. wireless controller;
5. firewall;
6. identity console;
7. evidence workstation;
8. cloud control surface;
9. physical device;
10. recovery array.

Node state progresses through:

```text
UNSEEN
OBSERVED
CHARACTERIZED
PLAN SELECTED
WORK IN PROGRESS
VALIDATION PENDING
COMMITTED
VERIFIED
SEALED OR STABILIZED
```

The tactical camera can move from Area View to Tactical View to Systems View to Node View without pretending these are unrelated games.

When the learner enters Node View, the game may embed a browser simulation, terminal, remote desktop, packet analysis view, GNS3 topology or another approved lab adapter.

The technical result returns to the tactical state.

Examples:

1. Restore DNS and friendly systems regain hostname resolution.
2. Repair access control and previously locked doors become usable.
3. Preserve evidence and later mission intelligence improves.
4. Contain malware and propagation pressure stops increasing.
5. Restore a camera network and hostile movement becomes easier to observe.

## 12. Adaptive Mission Director

Adaptation exists to keep challenge appropriate, not to cheat.

### 12.1 Mission Variant Compiler

Before deployment it may use learner readiness to choose among approved scenario variants.

It may vary:

1. which fault is present;
2. evidence density;
3. optional objectives;
4. preparation resources;
5. route choices;
6. technical challenge tier;
7. scaffolding.

### 12.2 Mission Director

During play it may vary:

1. encounter pacing;
2. patrol timing;
3. reinforcement windows;
4. environmental complications;
5. pressure and quiet periods.

It cannot mutate the hidden technical answer.

### 12.3 Threat AI

Threat actors react only to world state and information available to them.

### 12.4 Learning Evaluator

The evaluator scores evidence after actions occur. It does not choose scenario truth.

It separately records:

1. Technical Mastery;
2. Independence;
3. Transfer;
4. Compliance;
5. Operational Grade.

## 13. Procedural level architecture

PRIM3 should follow a controlled authored parcel model rather than unrestricted generation.

A map seed selects:

1. an overall plot footprint;
2. authored building and outdoor parcels;
3. cover dressing;
4. objective parcel;
5. extraction parcel;
6. hostile spawn and patrol candidates;
7. LAB_NODE attachment points;
8. environmental modifiers.

Generation must pass validation before deployment.

At minimum validate:

1. all required objectives are reachable;
2. extraction is reachable;
3. LAB_NODE interaction spaces exist;
4. every combat start has plausible cover choices;
5. no required route is blocked by decorative geometry;
6. patrol and reinforcement entry points are legal;
7. technical assets match the mission recipe.

## 14. Training Range is a game

TR01, TR02 and TR03 are not menus with questions.

They are full 3D tactical simulations using the normal game core, but they do not write story consequences.

### TR01 Risk and Controls

The player deploys into a compromised training facility with a small squad. Hostile simulation units and environmental pressure threaten people and systems. The player must establish control, inspect evidence, identify the material risk, select a proportional control and verify the result before extraction.

Combat creates the opportunity to work. Shooting alone cannot pass the technical objective.

### TR02 Network Path

The squad enters a multi room or multi floor network facility during a service failure. The player physically secures switches, routers, power and server spaces while the technical operator traces the service path. Node View eventually connects to a real isolated network range. Correct repair changes the tactical building state.

### TR03 Trust and Identity

The squad enters an access controlled training complex with compromised identities, synthetic hostile units and protected zones. Physical access, authentication state and technical trust interact. The learner must restore least privilege and validate identity or certificate trust while the team handles tactical pressure.

## 15. Prototype classification

The current lightweight browser Training Range proves:

1. M Account gating;
2. learner readiness;
3. variant selection;
4. deterministic technical truth;
5. evidence trace collection;
6. scoring separation;
7. account persistence.

That implementation should be referred to internally as the **Training Range Systems Harness**.

It is useful infrastructure and should be retained for automated testing and learning logic validation.

It must not be presented as evidence that the tactical game itself is built.

## 16. Build priorities

The next actual game work should focus on mechanics before expensive final assets.

Priority order:

1. headless tactical resolver;
2. grid, pathfinding and AP economy;
3. cover and flanking;
4. line of sight and concealment;
5. hit and damage resolver;
6. enemy turn and patrol logic;
7. objective and extraction state;
8. LAB_NODE state integration;
9. greybox 3D renderer;
10. one fully playable TR01 greybox;
11. production asset control plane;
12. final character, weapon, environment and animation assets;
13. real network and remote desktop lab adapters;
14. procedural parcel generation;
15. adaptive Mission Director.

The rule is simple:

> Build the tactical machine first. Feed it increasingly good assets later.

## 17. Research references

Primary references used for this authority:

1. XCOM 2 manual, Feral Interactive, tactical layer, action points, concealment, cover, actions, classes and procedural tactical maps.
2. XCOM 2 and XCOM 2 Collection product descriptions, 2K, tactical combat, mission variety, research and progression.
3. XCOM 2 War of the Chosen manual and support material, 2K, Bonds, Will, fatigue, negative traits, Chosen and SITREP systems.
4. Jake Solomon discussion of XCOM 2 randomness and procedural generation, Game Developer, 2016.
5. Brian Hess material on plot and parcel procedural level design for XCOM 2, GDC and Game Developer.

These sources are research references only. PRIM3 uses its own characters, story, visual identity, mission content, technical learning system, assets and implementation.
