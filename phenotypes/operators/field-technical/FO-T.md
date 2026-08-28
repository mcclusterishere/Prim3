---
status: PROPOSED
id: FO-T
name: Technical Field Operator
system: Operators / Field
version: 0.3.0
parent: FO-01
---

# FO-T — Technical Field Operator

## Function
The data, network, and systems specialist on external deployments. This is the operator who touches the target systems — extraction, forensic imaging, live analysis, bypass, and controlled compromise. In a classic field team this is the primary reason the team is there.

FO-T is the educational and dramatic center of most technical field sequences. The audience learns real concepts through the pressure this operator is under.

## Visual Direction
- Darker, more weathered base than corporate phenotypes, but lighter overall bulk than FO-E
- Soft armor prioritized for mobility and seated/device work rather than prolonged physical contact
- Visible but controlled Dual Sight / red `//` for team identification
- Modular forearm and chest interfaces for data tools
- Gloves with high tactile feedback (device work takes priority over pure impact protection)
- Boots still field-rated but not as aggressively rugged as pure entry configurations
- Silhouette must still read as McCluster institutional, never generic “hacker in a hoodie” or pure military

## Gear Specifications

### Design philosophy
Every item exists to support accurate, defensible technical work under time pressure and physical threat.  
Compute, interfaces, and data integrity outrank kinetic load.  
If a tool does not improve collection quality, speed, or operational security, it is left behind.

### Equipment Floor
| Item | Specification |
|------|---------------|
| Base layer | Dark technical under-suit / field shirt and trousers |
| Armor | Soft torso protection; minimal bulk around arms and wrists |
| Sidearm | One compact service sidearm in low-profile holster |
| Primary compute | Field cyberdeck with offline capability and multiple interface options |
| Recording | Mission recorder (body or deck-linked) |
| Comms | Secure team radio + low-profile earpiece |
| Data integrity tools | At least one write-blocker / forensic bridge |
| Storage | Offline, high-speed storage for selective imaging |
| Identification | Readable Dual Sight or red `//` accent |
| Handwear | High-tactile gloves compatible with device use |
| Footwear | Quiet, durable field boots |

### Equipment Ceiling (mission-authorized)
**Compute & Interfaces**
- Dual or expanded cyberdeck configuration
- Multiple cable and wireless interface kits
- Hardware write-blockers and forensic imaging bridges
- Portable logic analyzer or protocol tools (rare, high-value missions)
- Selective EMP or signal isolation tools (strictly controlled)

**Data Handling**
- Redundant offline storage
- Cryptographic verification tools for chain-of-custody style integrity
- Rapid triage and selective extraction software/hardware stack

**Protection & Mobility**
- Soft armor only (no heavy plates that interfere with seated or confined work)
- Limited knee protection if the environment requires prolonged floor work
- No full helmet; partial face or headset protection only

**Kinetic**
- Sidearm mandatory
- Primary long weapon is rare and only when the mission profile demands it
- No heavy breaching load (that belongs to FO-E)

### Hard Exclusions
- Full Prime M-helmet and Mission Core
- Heavy plate carriers or magazine-heavy infantry setups
- Entry/breaching primary tools (FO-E domain)
- Long-duration observation optics packages (FO-R domain)
- Clean Corporate Fits garments
- Any non-McCluster marks

---

## Gear Loadouts by Mission Profile

FO-T does not wear one fixed kit. The base identity stays constant; the technical module set changes with the nature of the target and the phase of the work. Below are the four primary loadout configurations.

### 1. Live Exploitation (FO-T-LE)
**Use when:** Working on live systems — network access, host triage, selective extraction while the target is still powered and possibly monitored.

| Category | Load |
|----------|------|
| Compute | Full field cyberdeck + primary interface kit |
| Data integrity | Write-blocker / forensic bridge ready; used when imaging begins |
| Storage | High-speed offline storage for selective take |
| Armor | Soft torso only; arms and wrists kept free |
| Kinetic | Sidearm only (primary long weapon almost never) |
| Comms | Full team link; status updates are frequent and short |
| Recording | Deck-linked + body recorder |
| Signature | Dual Sight readable for team ID; no extra visual noise |

**Design note:** Optimized for speed of interaction with live systems while preserving the option to shift into clean imaging. This is the default “hands on the keyboard” loadout.

---

### 2. Forensic Imaging (FO-T-FI)
**Use when:** The priority is a clean, defensible image or selective sector capture rather than live interaction. Power state and write-blocking matter more than speed of exploration.

| Category | Load |
|----------|------|
| Compute | Cyberdeck + dedicated imaging bridge stack |
| Data integrity | Hardware write-blockers mandatory; cryptographic verification tools preferred |
| Storage | Redundant offline storage; capacity sized to the expected take |
| Armor | Soft torso; may add limited knee protection for floor work |
| Kinetic | Sidearm only |
| Comms | Full link; updates focus on imaging progress and integrity status |
| Recording | Continuous; chain-of-custody style notes captured |
| Signature | Controlled; still readable to the team |

**Design note:** Heavier on integrity tooling, lighter on exploratory interfaces. The operator moves slower and more deliberately. “Clean” beats “complete.”

---

### 3. Rapid Triage (FO-T-RT)
**Use when:** Time is extremely short — FO-R has a deteriorating picture, FO-E is under pressure, or the technical window is measured in minutes rather than a full cycle.

| Category | Load |
|----------|------|
| Compute | Streamlined cyberdeck; only the fastest interface paths |
| Data integrity | Write-blocker if possible, but selective live pull may be accepted under explicit risk acceptance |
| Storage | Minimal high-speed store sized for a small, high-value take |
| Armor | Lightest soft protection; maximum freedom of movement for a fast exit |
| Kinetic | Sidearm only |
| Comms | High-tempo link to FO-E and FO-R |
| Recording | Continuous but secondary to speed of collection |
| Signature | Readable Dual Sight; ready to move |

**Design note:** This is FO-T under maximum time pressure. The standard of “perfect integrity” is consciously traded against “anything usable before we lose the window.” Decisions to accept risk must be explicit and reported.

---

### 4. Denied / Hostile Network (FO-T-DN)
**Use when:** The target environment is actively hostile — monitoring, deception, or counter-intrusion is expected. Operational security of the team’s own footprint matters as much as the take.

| Category | Load |
|----------|------|
| Compute | Hardened / minimal-emission cyberdeck configuration |
| Data integrity | Full integrity stack; assume everything may be examined later |
| Storage | Offline-only preferred; limit persistent writes on target systems |
| Armor | Soft torso |
| Kinetic | Sidearm only |
| Comms | Tight, disciplined link; minimize unnecessary traffic |
| Recording | Continuous, with emphasis on what was touched and what was avoided |
| Signature | Dual Sight controlled; technical emissions kept as low as practical |
| Extra | Limited signal-isolation or defensive tools only if authorized |

**Design note:** Paranoid by design. Every interface is treated as potentially logged. The operator prioritizes not poisoning the team’s position over aggressive collection.

---

### Loadout Selection Logic

| Situation | Preferred Loadout |
|-----------|-------------------|
| Standard live systems work | Live Exploitation (FO-T-LE) |
| Clean image / defensible take required | Forensic Imaging (FO-T-FI) |
| Window collapsing; minutes only | Rapid Triage (FO-T-RT) |
| Active monitoring or deception expected | Denied / Hostile Network (FO-T-DN) |

An operator may shift between these during a single mission (e.g., Live Exploitation → Forensic Imaging once a target volume is identified, or Live Exploitation → Rapid Triage when FO-R calls deterioration).

### Cross-loadout rules
1. Sidearm never comes off.
2. Some form of data-integrity path must remain available unless Rapid Triage has explicitly accepted the risk.
3. No loadout may become a primary entry/breaching kit or a long-range observation package.
4. Arms and wrists stay free enough for sustained device work; if the armor prevents that, the loadout is wrong for FO-T.
5. When FO-E calls movement or FO-R calls abort, technical perfection yields to team survival — the operator must be able to break contact with the take they already have.

---

## Core Responsibilities
- Target system access and controlled exploitation
- Live network and host analysis under time pressure
- Forensic imaging and selective data extraction
- Technical bypass of access controls
- Maintaining the team’s own digital operational security while inside the target
- Protecting the integrity and defensibility of everything collected
- Clear, accurate status reporting to the team lead and FO-R/FO-E

## Behavioral Expectations

### Core posture
A Technical Field Operator works as if every keystroke and every collected sector may later be examined under hostile scrutiny. Speed matters. Accuracy and integrity matter more.

### During the technical window
- Highest cognitive load on the team
- Speech becomes short, precise, and almost entirely technical
- Requests for more time are made when the alternative is contaminated or incomplete collection
- Physical movement is minimized once on the target node
- Relies completely on FO-E for immediate physical security and on FO-R for the external picture

### Decision logic
- Prefers reversible actions until the last responsible moment
- Will abort a collection path that risks poisoning the rest of the take
- Treats “we got something” as inferior to “we got something clean and usable”
- Understands that a partial, high-integrity take is often more valuable than a large, compromised one

### Relationship to pressure
- External time pressure is constant; internal standards are not relaxed to meet it
- Visible stress appears as intensified focus rather than panic
- Mistakes are acknowledged quickly and corrected; concealment of technical error is treated as a serious failure

### Speech patterns
- Status updates are clipped and structured
- Avoids narrative or emotional language while on the objective
- After-action speech becomes highly precise about what was collected, what was left, and what the confidence level is

## Psychological Load (FO-T specific)
- The weight of being the primary reason the team is exposed
- Responsibility for data that may later justify or condemn the entire operation
- Tension between speed and forensic defensibility
- Knowledge that a technical mistake can waste the risk everyone else is taking
- Delayed emotional processing: the technical window often ends before the operator has time to feel the danger they just worked through

## Relationship to the Field Triad
| Phenotype | Relationship to FO-T |
|-----------|----------------------|
| FO-E Entry | Creates and holds the physical space; protects FO-T during the window |
| FO-R Recon | Supplies the external threat picture so FO-T can stay focused inward |
| FO-T Technical | Executes the core objective; often last off the target |

## Failure Modes
- Sacrificing integrity for speed under extreme pressure
- Tunnel vision that ignores FO-R warnings or FO-E movement calls
- Over-collection that creates handling or exfil problems
- Freezing when the clean technical path disappears and only messy options remain
- Post-mission hyper-responsibility for outcomes that were never fully under their control

## Narrative Utility
FO-T is the phenotype for sequences where the audience watches real technical work performed under lethal constraints. It is the primary vehicle for the series’ infotainment payload during field operations. The drama comes from the collision of exacting technical standards with an environment that refuses to wait.

## Transition
- From CO-01 or FO-01 when assigned the technical role on an external mission
- Back to CO-01 or Corporate Fits when returning to controlled environments
- Repeated FO-T exposure deepens the cognitive and moral load described in the broader CO-01 trauma profile, with additional emphasis on responsibility for information rather than purely for lives
