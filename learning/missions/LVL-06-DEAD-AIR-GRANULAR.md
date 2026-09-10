---
status: REFERENCE IMPLEMENTATION
mission_id: LVL-06
mission_name: Dead Air
song: Got Wifi
season: 2
episode: 3
system: Tactical learning vertical slice
version: 1.0.0
inherits:
  - game/TACTICAL-LAB-MECHANICS-AUTHORITY.md
  - episodes/S02E03-GOT-WIFI.md
---

# LVL-06 — DEAD AIR — Granular Tactical Learning Reference

Purpose: prove that wireless/network concepts can become spatial, kinetic XCOM gameplay without turning into a fake “hack meter.”

The existing episode contract remains: severe weather damages a crowded facility; wireless service fails when responders need it; the player must distinguish interference, configuration, unauthorized equipment, backhaul/power problems, and physical hazards; the veteran's canonical death remains fixed.

---

# 1. Core concept set

- `wireless.rogue-access-point`
- `wireless.wips`
- `wireless.rf`
- `wireless.spectrum`
- `wireless.jamming`
- `wireless.frequency-agility`
- `wireless.wpa3`
- `crypto.aes`
- `network.osi-layer-1`
- `network.osi-layer-2`
- `network.frame`
- `network.packet`
- `wireless.access-point`
- signal presence vs authenticated usable service
- wired backhaul / relay power dependency

Mission-critical mastery:
1. strong signal is not the same thing as usable service;
2. wireless depends on power, backhaul, authentication, RF conditions, and placement;
3. an unknown access point is not automatically malicious until identified;
4. physical safety beats chasing perfect coverage;
5. verification requires an end-to-end responder communication test.

---

# 2. Map

Target: **22 x 22**, partially outdoor/indoor.

Zones:
- Z-A Responder Staging
- Z-B Main Hall
- Z-C Service Corridor
- Z-D Communications Room
- Z-E Roof Access
- Z-F Protected Relay Platform
- Z-G Damaged Power Room
- Z-H Public Check-in Area
- Z-I West Dead Zone
- Z-J Extraction / ambulance lane

Environmental tiles:
- `WATER` — reduced movement / electrical hazard near damaged power;
- `WIND` — rooftop exposure state;
- `DEBRIS` — difficult terrain;
- `RF_SHADOW` — coverage attenuation represented spatially;
- `POWER_HAZARD` — unsafe until E/T stabilizes conditions;
- `LAB_NODE` — spectrum, AP, relay, backhaul, power, authentication.

Starting state:
- Detection: 1/10
- Picture: UNCERTAIN
- Responder Channel: DOWN
- Public Wi-Fi: DEGRADED
- Relay Power: 45%
- Backhaul Confidence: UNKNOWN
- RF Confidence: 25/100
- Weather Hazard: 2/5 and rising
- Window: 9

---

# 3. Role gameplay

## Field-R — Spectrum / Coverage Picture

R's job is not “hack Wi-Fi.” R converts physical movement + sensor observations into a usable spatial RF picture.

R actions:
- `SAMPLE SIGNAL` — 1 AP: records local signal/service state at current tile.
- `COMPARE CELLS` — 1 AP: compares two samples and updates coverage confidence.
- `IDENTIFY SOURCE` — 1 AP if source in sensor/LOS range: classifies approved / unknown / confirmed unauthorized based on mission inventory.
- `MARK RF SHADOW` — 1 AP: reveals likely structural dead-zone geometry.
- `WARN WEATHER SHIFT` — 0 AP after sufficient observations: marks tiles likely to become hazardous next Threat phase.
- standard Move / Overwatch / Mark Threat remain available.

R Evidence Tokens:
- `SIGNAL_NO_SERVICE`
- `AUTHORIZED_AP_CONFIRMED`
- `UNKNOWN_AP_PRESENT`
- `BACKHAUL_SUSPECT`
- `RF_SHADOW_MAPPED`
- `WEATHER_ROUTE_UNSAFE`

The player must physically move R to useful sampling locations. A map cannot be solved from spawn.

## Field-E — Physical Communications Continuity

E turns network diagrams into physical reality.

E actions:
- secure Communications Room;
- open/hold Roof Access;
- stabilize unsafe corridor;
- escort technician/responders through hazards;
- move/guard portable relay prop;
- defend T during relay configuration;
- hold crowd boundary away from power damage;
- suppress hostile/opportunistic threats without destroying equipment.

Control matters directly:
- Relay Platform SECURE -> T may use 2-AP anchored alignment/configuration.
- Relay Platform CONTESTED -> T can work, but validation gets +1 Window cost.
- Relay Platform LOST -> responder restoration cannot be finalized.

## Field-T — Restore Trusted End-to-End Service

T actions are divided across physical/network layers.

T must reason across:
1. AP status;
2. authentication state;
3. wired/wireless backhaul;
4. relay power;
5. responder-priority service path.

T is rewarded for isolating the actual failure combination rather than blindly “restarting Wi-Fi.”

---

# 4. LAB-A — Spectrum Board

Roles: R/T.
Concepts: RF, spectrum, signal vs service, interference.

Stages:
1. OBSERVE — R collects at least 3 map samples across different zones.
2. MAP — R spends 1 AP to generate preliminary coverage overlay.
3. COMPARE — player overlays signal strength against authentication/service success.
4. CLASSIFY — determine whether each dead zone is likely RF, service/auth, backhaul, or unknown.
5. VERIFY — later responder test updates classifications.

Wrong path examples:
- assuming all low throughput is jamming -> sends T to wrong intervention, costs 1 Window;
- assuming strongest source is trusted -> can contaminate responder path until identification occurs;
- treating every unknown AP as hostile -> unnecessary isolation lowers public connectivity.

Battlefield reward:
- mapped RF shadows become visible terrain information;
- R can place safer routes and better overwatch lanes.

---

# 5. LAB-B — AP Identity / Trust Node

Roles: R/T.
Concepts: rogue AP, WIPS, WPA3, authenticated service.

The node displays fictional identifiers and inventory state; no real credentials.

Stages:
1. R identifies source position/context — 1 AP.
2. T compares source against approved inventory and trusted configuration state — 1 AP.
3. T isolates confirmed unauthorized equipment from the mission network model — 1 AP.
4. T verifies approved APs still provide authenticated service — 1 AP.

Important misconception:
Unknown != malicious.
Trusted-name != trusted-device.
Strong encryption != guaranteed availability.

Battlefield reward:
correct trust classification reduces false hostile markers and raises responder-channel Integrity.

---

# 6. LAB-C — Backhaul Dependency Node

Location: Communications Room.
Roles: T; E required for best working condition.
Concepts: OSI Layer 1/2, Ethernet/backhaul, frames/packets at an abstract level.

Visual UI:

```text
Responder device
 -> AP/relay
 -> local switch/backhaul
 -> upstream service
 -> responder service endpoint
```

Each link has observable state rather than an answer label.

Stages:
1. TRACE — 1 AP: follow end-to-end path.
2. CLASSIFY — 1 AP: identify where physical/link failure differs from service/auth failure.
3. ROUTE — 1 AP: choose viable approved alternate path.
4. VERIFY — 1 AP: send fictional end-to-end responder test.

Wrong path:
restoring AP radio without backhaul creates “full bars, no mission service.”

Tactical reward:
restored backhaul enables R to share Mark Threat bonuses over a wider range.

---

# 7. LAB-D — Relay Power / Placement

Location: Power Room + Relay Platform.
Roles: E/T/R.
Concepts: physical layer, power dependency, placement, resilience.

Cross-role sequence:
- R maps RF shadow and recommends one of 3 relay placement zones.
- E secures route/platform and handles physical movement.
- T verifies power condition and configures approved relay state.

Task atoms:
MAP -> ROUTE -> HOLD -> STABILIZE -> CONFIGURE -> VERIFY.

AP example:
- R Mark Placement: 1 AP.
- E Move/escort relay: 2 AP over one or more turns.
- E Hold Platform: 1 AP.
- T Check Power: 1 AP.
- T Configure Relay: 2 AP ANCHORED.
- T/R Verify Coverage: 1 AP.

If R chose placement from signal strength alone without service/backhaul understanding:
- coverage improves visually;
- responder service remains broken;
- player must recover by tracing backhaul.

If E takes relay through POWER_HAZARD before stabilization:
- team injury risk;
- relay health may drop;
- no special “wrong answer” screen.

---

# 8. Kinetic threat design

Threats are tied to emergency chaos, not a cyber-attack tutorial.

### Opportunistic armed group
Uses damaged facility as cover and attempts to enter restricted/service zones.

### Panicked movement
Noncombatant crowd creates tile pressure and can block E's relay route.

### Structural collapse events
Threat phase can close lanes or change RF shadows.

### Electrical hazard progression
Standing water / damaged power changes route safety.

Combat tradeoffs:
- gunfire in Main Hall increases crowd panic and Exposure;
- fire near relay/power equipment risks equipment degradation;
- suppression can hold a lane without sacrificing equipment integrity;
- R may choose Overwatch instead of collecting another RF sample;
- E may choose to hold a hostile lane instead of physically moving the relay;
- T may abandon a 2-AP relay configuration to extract before weather collapse.

Technical victories change combat:
- trusted responder channel can reduce neutral-security confusion;
- restored communications reveals evacuation/extraction route changes sooner;
- functioning door/alert link can create an additional safe corridor;
- improved R picture increases reaction-fire information.

---

# 9. Threat timeline example

Round 1: weather worsens; player samples signal and moves into Communications Room.

Round 2: West Dead Zone expands because structural debris changes line/placement state.

Round 3: unknown AP appears on spectrum picture; not yet classified.

Round 4: opportunistic hostile group enters Public Hall if security communications remain down.

Round 5: backup power in one zone degrades; player must choose responder path vs public check-in secondary.

Round 6: roof route becomes hazardous unless E/R already identified weather movement.

Round 7+: responder rescue window collapses if channel remains unverified; mission can still extract with partial result.

---

# 10. Signature triad turn

R:
- SAMPLE SIGNAL at West Hall — 1 AP;
- COMPARE to responder staging — 1 AP;
- produces `SIGNAL_NO_SERVICE`.

E:
- BREACH/OPEN Communications Room — 1 AP;
- HOLD room — 1 AP.

T:
- TRACE Backhaul — 1 AP;
- CLASSIFY upstream link as failed while AP radio remains healthy — 1 AP.

Threat phase:
- hostile movement begins through Public Hall.

Next turn, the player now chooses:
- spend E/R AP on fighting;
- or move relay and finish technical restoration before the rescue clock shrinks.

That is the intended game.

---

# 11. Learning Mastery

Weighted:
- 20% signal vs service
- 15% AP trust / rogue identification
- 15% RF/coverage interpretation
- 15% Layer 1/2 and backhaul dependency
- 15% authenticated responder path
- 10% power/placement resilience
- 10% physical safety / validation

Transfer check appears later in IoT/Ghost rather than as a post-mission quiz: player must recognize that a healthy radio/sensor link does not prove the downstream system is trustworthy.

---

# 12. Acceptance tests

- player physically moves through an RF problem instead of solving only a menu;
- Field-R measurements alter T's available/efficient decisions;
- Field-E physically buys the relay room/platform needed for technical work;
- Field-T reasons across radio, identity, backhaul, and power rather than pressing “restore Wi-Fi”;
- a visually strong signal can coexist with failed service;
- gunplay can save the team while also making infrastructure/crowd conditions harder;
- technical success changes threat awareness/route availability;
- the veteran's fixed story death is preserved regardless of score;
- offensive wireless concepts remain recognition/defense abstractions;
- the mission is fun even without opening lesson pages.