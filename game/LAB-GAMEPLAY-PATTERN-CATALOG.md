---
status: CANON
system: Battlefield lab gameplay pattern catalog
version: 1.0.0
owner: Matthew McCluster
authority: Implements TACTICAL-IT-MECHANICS-BIBLE.md
---

# PRIM3 Battlefield Lab Gameplay Pattern Catalog

This catalog converts recurring IT concept families into reusable tactical lab patterns. These are not menus pasted over gameplay. Every pattern exists on the battlefield, consumes AP, reads/writes mission state, and can be pressured by combat, movement, visibility, power, time, and role coordination.

Designers should use these patterns before inventing one-off minigames.

---

## Pattern 01 — Incident Timeline Correlation

**Best for:** breach indicators, logs, abnormal transfer, unauthorized access, OSINT chronology, root-cause confidence.

**Primary roles:** R first, T second.

**World object:** telemetry wall, analyst terminal, evidence board.

**Inputs:** 5–12 event cards from different sources. Each card has timestamp, source class, confidence, and relation hints.

**Player work:**
1. OBSERVE events.
2. COMPARE independent sources.
3. TRACE temporal relationships.
4. PRIORITIZE material events.
5. VERIFY the resulting time window.

**AP profile:** 2–5 AP distributed across R/T.

**Battlefield coupling:** R may need to choose between correlation and Overwatch. A threatened operations room can interrupt continued analysis. T can use a sealed timeline to reduce containment scope.

**Wrong-model consequence:** false correlation increases unnecessary isolation or wastes Window; it does not instantly say “wrong.”

**Mastery evidence:** player only elevates an event when corroborated or explicitly accepts uncertainty.

---

## Pattern 02 — Service Dependency Graph

**Best for:** IaaS/PaaS/SaaS, application incidents, cloud, network topology, recovery, Site 0 systems.

**Primary roles:** T with R evidence.

**World object:** architecture dashboard or projected service graph.

**Inputs:** nodes representing services/components and hidden/visible edges representing dependencies.

**Player work:**
1. TRACE upstream/downstream dependencies.
2. CLASSIFY ownership/layer.
3. ISOLATE or ROUTE around affected component.
4. VERIFY end-to-end service.

**AP profile:** 3–7 AP.

**Battlefield coupling:** damaged physical infrastructure can delete or alter graph edges. R observations can expose one hidden dependency. E may physically secure the room containing a critical dependency.

**Wrong-model consequence:** player fixes a healthy layer, loses service health, or fails validation.

**Mastery evidence:** player intervenes at the layer they actually control and proves service works end-to-end.

---

## Pattern 03 — Wireless Spectrum / Coverage Map

**Best for:** RF, rogue AP, WIPS, interference, signal vs service, Wi-Fi resilience.

**Primary roles:** R maps; E reaches relay; T restores trusted service.

**World object:** signal map overlay tied to physical map.

**Inputs:** signal strength, known approved sources, power/backhaul status, obstacles, interference zones.

**Player work:**
1. R MAPs signal and COMPAREs approved inventory.
2. R CLASSIFYs unknown source confidence.
3. E ROUTEs to safe relay location and HOLDs it.
4. T TRACEs power/backhaul/auth relationship.
5. T CONFIGUREs trusted service.
6. R/T VERIFY usable authenticated service.

**AP profile:** 5–10 squad AP.

**Battlefield coupling:** smoke, weather, walls, power damage, and movement alter the map. Shots near relay/power equipment may degrade service. Successful trusted comms can reveal responder ETA or enable coordination bonuses.

**Wrong-model consequence:** strong bars but no authenticated service; player learns signal is not service.

---

## Pattern 04 — Physical / Logical Port Match

**Best for:** networking, patch panels, interfaces, hardware, data-center topology.

**Primary roles:** T, with E access and R physical evidence.

**World object:** rack, patch panel, switchboard, cable tray.

**Inputs:** labeled/partially labeled ports, cables, device inventory, topology hints.

**Player work:** MATCH physical component to logical endpoint, TRACE path, VERIFY expected state.

**AP profile:** 2–4 AP.

**Battlefield coupling:** T may have to work in exposed rack aisle; E holds lane. A damaged cable/path can create alternate routing objective.

**Wrong-model consequence:** wrong service loses connectivity or expected indicator fails validation.

---

## Pattern 05 — Containment Boundary

**Best for:** data breach, malware, IoT, network segmentation.

**Primary roles:** T with R evidence and E physical quarantine.

**World object:** service/network map plus physical device zones.

**Inputs:** affected/suspect/known-good components; dependencies; criticality.

**Player work:** CLASSIFY, TRACE, ISOLATE, VERIFY.

**AP profile:** 3–6 AP.

**Battlefield coupling:** delay increases propagation pressure. Broad isolation is faster but harms availability. E can physically isolate devices or secure a segment location while T changes logical state.

**Wrong-model consequence:** either spread continues or too much service is lost.

**Mastery evidence:** player contains enough without assuming every strange system has same cause.

---

## Pattern 06 — Evidence Preservation / Seal

**Best for:** forensics, incident response, chain of custody, OSINT physical evidence.

**Primary roles:** T and E.

**World object:** evidence terminal/locker, storage device, evidence table.

**Inputs:** volatile/nonvolatile evidence categories, custody state, storage capacity, time pressure.

**Player work:** PRIORITIZE, PRESERVE, HASH/VERIFY, DOCUMENT, SEAL.

**AP profile:** 3–8 AP depending integrity target.

**Battlefield coupling:** T can become anchored. E must secure evidence zone and Guard Tech. Retriever enemies may physically remove evidence. Gunfire/destruction can lower integrity.

**Wrong-model consequence:** partial/contaminated evidence, not automatic mission failure.

---

## Pattern 07 — Authentication Confidence Matrix

**Best for:** MFA, biometrics, credentials, access control, identity incidents.

**Primary roles:** T/R; E applies physical access consequence.

**World object:** identity dashboard plus doors/personnel checkpoints.

**Inputs:** password state, second-factor state, device trust, role, physical identity evidence, session history.

**Player work:** CLASSIFY confidence, COMPARE factors, AUTHORIZE access, VERIFY identity state.

**AP profile:** 2–5 AP.

**Battlefield coupling:** E may need to decide whether to admit a responder while T/R establish identity confidence. Incorrect overconfidence can open a route; excessive distrust can delay rescue/operations.

**Teaching point:** MFA increases authentication assurance but does not magically prove endpoint integrity or user intent.

---

## Pattern 08 — Malware Symptom Triage

**Best for:** worms, Trojan, ransomware, spyware, fileless malware, rootkit, keylogger.

**Primary roles:** R maps symptoms, E quarantines physical assets, T classifies/recovers.

**World object:** endpoint map + triage console + device stations.

**Inputs:** fictionalized symptom bundles, endpoint relationships, identity state, user reports.

**Player work:** MAP, CLASSIFY, ISOLATE, PRESERVE, RECOVER, VERIFY.

**AP profile:** 5–12 AP.

**Battlefield coupling:** uncontained clusters worsen each Clock phase. Access-control instability can change doors/routes. E must physically separate devices while protecting clean equipment.

**Wrong-model consequence:** unnecessary quarantine or continued propagation.

---

## Pattern 09 — Patch / Version Dependency Board

**Best for:** Patch Work, updates, backward compatibility, code signing, rollback.

**Primary roles:** T; R supplies observed failure evidence; E protects maintenance area.

**World object:** maintenance dashboard.

**Inputs:** version graph, signed package status, compatibility edges, service criticality, rollback snapshot.

**Player work:** COMPARE versions, PRIORITIZE, SEQUENCE, CONFIGURE, VERIFY, ROLLBACK if necessary.

**AP profile:** 4–10 AP.

**Battlefield coupling:** maintenance window is a tactical clock. A wrong sequence can degrade services that alter door/camera/communications behavior.

**Wrong-model consequence:** compatibility failure visible after validation; player may rollback.

---

## Pattern 10 — Installation / Migration Planner

**Best for:** clean install, in-place upgrade, custom install, migration, multiboot, backup.

**Primary roles:** T with R inventory and E continuity control.

**World object:** migration console plus physical workstation zones.

**Inputs:** system age, compatibility, user data, downtime tolerance, backup state.

**Player work:** CLASSIFY each endpoint strategy, PRESERVE data, SEQUENCE migration, CONFIGURE, VERIFY.

**AP profile:** 5–12 AP across multiple nodes.

**Battlefield coupling:** E rotates people between usable stations while work proceeds. Physical threat can force early extraction with only preserved data.

**Wrong-model consequence:** excessive downtime or failed compatibility, recoverable through rollback if prepared.

---

## Pattern 11 — Cloud Shared Responsibility Stack

**Best for:** IaaS, PaaS, SaaS, hybrid architecture.

**Primary roles:** T/R.

**World object:** layered cloud architecture dashboard.

**Inputs:** customer-owned and provider-owned layers, service symptoms, telemetry.

**Player work:** CLASSIFY responsibility, TRACE fault path, AUTHORIZE intervention, CONFIGURE controlled layer, VERIFY end-to-end.

**AP profile:** 3–7 AP.

**Battlefield coupling:** physical operations continue while teams argue ownership. E maintains manual continuity. Correct layer restoration can reduce mission pressure.

**Wrong-model consequence:** AP wasted changing irrelevant layer or compliance penalty for touching outside scope.

---

## Pattern 12 — Capacity / CapEx / OpEx Allocation

**Best for:** CapEx vs OpEx, scalability, elasticity, workload costs.

**Primary roles:** T/Lead; R supplies load forecast; E maintains physical operational priorities.

**World object:** resource/cost dashboard.

**Inputs:** workload demand, owned capacity, rented capacity, budget, latency/recovery constraints.

**Player work:** COMPARE, FORECAST, ALLOCATE, PRIORITIZE, VERIFY service health/cost.

**AP profile:** 2–5 AP.

**Battlefield coupling:** under-allocation delays mission services; over-allocation spends Budget that matters later. Sudden combat/evacuation demand can alter load during the lab.

---

## Pattern 13 — Hardware Compatibility Bench

**Best for:** CPU, memory, SSD/HDD, PCIe, power, peripherals.

**Primary roles:** T; E transports/protects equipment; R inventories external requirements.

**World object:** hardware bench/rack.

**Inputs:** component specs abstracted to relevant compatibility properties.

**Player work:** CLASSIFY, MATCH, ALLOCATE power/capacity, VERIFY POST/service state.

**AP profile:** 2–6 AP.

**Battlefield coupling:** parts may be physically distributed across map. Carrying hardware can reduce movement or occupy utility slot. Wrong match costs time rather than magically exploding.

---

## Pattern 14 — RAID / Failure-Domain Builder

**Best for:** RAID 0/1/5/6/10, striping, mirroring, parity, failure tolerance.

**Primary roles:** T with R failure evidence and E protection of array room.

**World object:** storage array console tied to physical drive bays.

**Inputs:** number of drives, failed drives, performance/availability requirement, recoverability goal.

**Player work:** CLASSIFY current layout, TRACE failure domain, choose CONFIGURATION/RECOVERY path, VERIFY degraded/healthy state.

**AP profile:** 4–10 AP.

**Battlefield coupling:** physical damage can remove a drive/path mid-task. E protects array room. R may identify which physical bay actually failed. Correct recovery can restore cameras/doors/mission records.

**Teaching point:** redundancy is not backup.

---

## Pattern 15 — Hot / Warm / Cold Site Failover

**Best for:** disaster recovery, RTO thinking, continuity.

**Primary roles:** T/R/E shared.

**World object:** continuity dashboard plus alternate-site route/status.

**Inputs:** site readiness, data freshness, restore time, cost, available personnel, network/power links.

**Player work:** COMPARE site options, PRIORITIZE service, ROUTE dependency, RECOVER, VERIFY.

**AP profile:** 5–10 AP.

**Battlefield coupling:** choosing faster site can preserve tactical systems but consume more resource; slower site may miss rescue/extraction window. E may need to physically protect local continuity components.

---

## Pattern 16 — IoT Sensor Trust / Actuator Safety

**Best for:** sensors, actuators, segmentation, fail-safe, human override.

**Primary roles:** R compares sensors, E establishes physical safe state, T segments/restores automation.

**World object:** building-control console plus physical environment.

**Inputs:** conflicting sensor readings, actuator states, human observations, network zones.

**Player work:** COMPARE, CLASSIFY confidence, STABILIZE manually, ISOLATE automation, CONFIGURE trusted set, VERIFY physically and digitally.

**AP profile:** 6–14 AP.

**Battlefield coupling:** doors, lighting, HVAC, alarms, elevators, and hazards can change tactical geometry. Incorrect automation can create hostile routes or trap civilians.

---

## Pattern 17 — OSINT Evidence Board

**Best for:** public sources, metadata, corroboration, confidence levels.

**Primary roles:** R/T; E physically corroborates.

**World object:** evidence board linked to world map.

**Inputs:** fictional public records, photos, shipping records, social posts, owner-provided records.

**Player work:** OBSERVE, COMPARE, MAP, TRACE, DOCUMENT, assign confidence.

**AP profile:** 3–8 AP.

**Battlefield coupling:** analysis may identify a physical location the squad must reach before a rival team. E can gather owner-authorized physical corroboration. Firefight at destination can destroy clues.

---

## Pattern 18 — Social Engineering Verification Queue

**Best for:** pretext, phishing/smishing awareness, identity verification, human attack surface.

**Primary roles:** R/E/T shared.

**World object:** crowd/staff access queue plus communications console.

**Inputs:** role claims, badge context, message origin, schedule, behavior inconsistencies.

**Player work:** OBSERVE contradictions, COMPARE claims, VERIFY identity, AUTHORIZE/deny route.

**AP profile:** 2–6 AP.

**Battlefield coupling:** E must keep event flowing; indiscriminate lockdown raises Exposure. A hostile may reveal physical threat only after verification pressure.

**Safety:** no persuasive scripts or actionable social-engineering playbook; focus on defensive recognition and verification.

---

## Pattern 19 — Application Trust Boundary Graph

**Best for:** XSS, injection families, input validation, sanitization, RBAC, CSP.

**Primary roles:** T; R correlates service symptoms; E maintains continuity.

**World object:** abstract application data-flow diagram.

**Inputs:** trusted/untrusted data tokens, privilege boundaries, components, policy controls.

**Player work:** TRACE flows, CLASSIFY trust boundary, ISOLATE affected component, CONFIGURE defensive control, VERIFY normal behavior.

**AP profile:** 3–8 AP.

**Battlefield coupling:** application service may control dispatch/logistics. Correct defense restores response coordination. Wrong isolation can delay reinforcements or evacuation.

**Safety:** no exploit payload construction or live exploitation steps.

---

## Pattern 20 — Authorization / Scope Overlay

**Best for:** white/grey/black hat, ROE, least privilege, compliance.

**Primary roles:** all.

**World object:** mission brief overlay tied to actual doors/assets/nodes.

**Inputs:** in-scope, out-of-scope, emergency-only, ambiguous assets/actions.

**Player work:** AUTHORIZE before acting or knowingly accept consequence.

**AP profile:** often 0 AP for already-known scope, 1 AP to resolve ambiguity.

**Battlefield coupling:** out-of-scope shortcut may be tactically attractive. Correct compliance can require slower route or limited technical option.

---

## Pattern 21 — Backup / Rollback Chain

**Best for:** backups, recovery, patching, migration, ransomware response.

**Primary roles:** T.

**World object:** recovery console.

**Inputs:** multiple restore points with age/confidence/service implications.

**Player work:** COMPARE restore sources, choose trusted source, RECOVER, VERIFY, document delta.

**AP profile:** 3–7 AP.

**Battlefield coupling:** recovery may anchor T. E protects node. Restored service can reopen exits or authenticated comms.

---

## Pattern 22 — Hash / Integrity Verification

**Best for:** cryptographic hash, evidence integrity, code/package verification.

**Primary roles:** T.

**World object:** evidence/maintenance console.

**Inputs:** expected/reference fingerprints and candidate artifacts represented abstractly.

**Player work:** COMPARE, VERIFY, DOCUMENT.

**AP profile:** 1–3 AP.

**Battlefield coupling:** typically a final validation step the player may be tempted to skip under extraction pressure.

**Teaching point:** a matching integrity check supports sameness/integrity claims; it does not prove every broader security property.

---

## Pattern 23 — Fail-Safe Physical State

**Best for:** IoT, power, cyber-physical systems, emergency operations.

**Primary roles:** E/T/R.

**World object:** doors, HVAC, lift, lighting, environmental controls.

**Inputs:** sensor confidence, actuator state, human observations, life-safety priority.

**Player work:** R determines trustworthy state; E manually STABILIZEs; T isolates faulty automation and restores trusted control; R/E verify physically.

**AP profile:** 5–12 AP.

**Battlefield coupling:** immediately changes playable geometry and civilian safety.

---

## Pattern 24 — Recovery Priority Queue

**Best for:** disaster recovery, incident response, availability, business continuity.

**Primary roles:** T/Lead/E.

**World object:** service restoration board.

**Inputs:** services with dependencies, criticality, recovery cost, people affected.

**Player work:** PRIORITIZE, TRACE, ALLOCATE, RECOVER, VERIFY.

**AP profile:** 4–9 AP.

**Battlefield coupling:** restoring one service may enable lights, communications, doors, medical/evacuation workflow, or other tactical benefits.

---

## Pattern 25 — Cross-Domain Site 0 Dependency Mesh

**Best for:** late-game integration and RAID.

**Primary roles:** all three simultaneously.

**World object:** facility continuity mesh tied to nine-level Site 0.

**Inputs:** power, storage, networking, environmental control, fabrication, communications, authority, life safety.

**Player work:** R MAPs state/failover, E secures critical physical dependencies, T TRACEs and selectively disables hostile authority while preserving life safety, all roles VERIFY consequences.

**AP profile:** mission-spanning.

**Battlefield coupling:** every technical choice changes routes, hazards, defenses, communications, or survival state.

**Teaching point:** systems-of-systems engineering; no single subsystem can be reasoned about in isolation.

---

# Pattern composition rules

A song mission normally uses **2–4 patterns**, not one giant bespoke minigame.

Examples:
- `Data Breach`: Incident Timeline Correlation + Containment Boundary + Evidence Preservation + Authentication Confidence.
- `Got Wifi`: Wireless Spectrum Map + Service Dependency Graph + Fail-Safe Physical State.
- `Virus Types`: Malware Symptom Triage + Authentication Confidence + Containment Boundary + Backup/Rollback.
- `Patch Work`: Patch Dependency Board + Hash Verification + Backup/Rollback.
- `RAID (Hot Site)`: RAID Builder + Hot/Warm/Cold Failover + Recovery Priority Queue + Site 0 Dependency Mesh.

Every composition must define cross-pattern outputs. A pattern cannot be a self-contained island.

Example: Data Breach timeline produces evidence that changes containment; containment changes enemy access; evidence preservation changes story proof; authentication confidence changes responder handling.

---

# UI rule

The UI may be stylized and cinematic, but the interaction model must visually express the real conceptual relationship being taught.

Good abstraction:
- service dependency graph for shared responsibility;
- coverage heatmap for RF;
- event timeline for incident correlation;
- drive/failure diagram for RAID;
- restore-point graph for rollback;
- trust-boundary flow diagram for app security.

Bad abstraction:
- random matching game with unrelated icons;
- generic progress bar labelled HACKING;
- arbitrary quick-time event whose timing determines technical correctness;
- word-search puzzle standing in for networking;
- hidden percentage roll that overrides a correct configuration.

---

# Animation rule

Every lab pattern should have readable physical animation on the tactical board:
- R physically raises/uses optics or sensor interface and map overlay updates;
- E manipulates doors, barriers, devices, civilians, or cover and Control state visibly changes;
- T physically connects to or operates the relevant console/rack and the environment responds;
- interrupted anchored work has a distinct detach animation;
- Verify should visibly inspect a second indicator/source rather than reuse the same Commit animation.

Cinematic close-ups may enhance important actions, but camera presentation may never hide tactical state or force long unskippable interruptions during repeated play.

---

# Pattern acceptance rule

A new pattern is accepted only if it answers all of the following:
1. What real IT relationship does the interaction represent?
2. What does the player observe?
3. What must the player infer?
4. What AP/state does the action cost?
5. What tactical danger can interrupt it?
6. What technical result changes the battlefield?
7. What wrong interpretation produces a visible recoverable consequence?
8. How is the result verified?
9. Which role produced each prerequisite fact/control condition?
10. Which concept mastery event is recorded?
