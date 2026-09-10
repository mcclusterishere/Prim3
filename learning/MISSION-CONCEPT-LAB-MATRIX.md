---
status: CANON-DERIVED
system: 21-episode concept-to-mission lab matrix
version: 1.0.0
source: owner lyrics + current episode bible + tactical lab authority
---

# PRIM3 Mission / Concept / Lab Matrix

This matrix binds the current song catalog to battlefield tasks for Field-R, Field-E, and Field-T.

It does not replace episode story files. It specifies **what the player must actually do** to demonstrate the song concepts inside tactical play.

All offensive-security concepts remain fictional/sandboxed and are expressed through recognition, defense, architecture, evidence, validation, or non-operational simulation.

---

## 01 — HIGH ALERT / THE BLIP

**Concept cluster:** alert state, monitoring, scope of work, evidence trail, search/access policy, professional judgment.

**Field-R lab — Signal or Noise**
- Node: distributed alert board.
- Task atoms: OBSERVE -> COMPARE -> PRIORITIZE -> WARN.
- Gameplay: R receives 6 low-confidence anomalies from cameras, access logs, environmental alarms, and staff reports. Only 2 correlate strongly enough to justify immediate action.
- AP: 1 AP to compare a pair of indicators; 1 AP to mark a priority lane.
- Battlefield effect: correct prioritization reveals a threat route one round early; over-warning creates false movement and loses 1 Approach tick.
- Mastery: alert triage, confidence, evidence before escalation.

**Field-E lab — Safe Perimeter Under Uncertainty**
- Node: evacuation/perimeter control points.
- Task atoms: ROUTE -> HOLD -> AUTHORIZE.
- Gameplay: E must establish a safe boundary without locking civilians into a hazardous path.
- AP: 1 AP establish/shift Control Zone; 1 AP escort a civilian group.
- Battlefield effect: correct boundary buys T uninterrupted access to the evidence terminal.

**Field-T lab — Preserve the One Useful Detail**
- Node: incident workstation.
- Task atoms: CLASSIFY -> PRESERVE -> DOCUMENT -> VERIFY.
- Gameplay: T must preserve useful telemetry before routine cleanup rotates it out.
- Wrong path: collecting everything consumes Window; deleting noise too aggressively can remove the one correlated trace.

**Kinetic pressure:** one armed responder/hostile is possible late; shooting solves immediate contact but spikes Detection and can contaminate the public-facing incident scene.

---

## 02 — WHITE GREY BLACK HAT / PERMISSION SLIP

**Concept cluster:** white/grey/black hat, authorization, scope, rules of engagement, white/grey/black box, attack surface, remediation.

**Field-R lab — Scope Recon**
- Node: mission authorization overlay + asset map.
- Task atoms: MAP -> AUTHORIZE -> COMPARE.
- Gameplay: identify which discovered systems are in-scope, explicitly out-of-scope, or ambiguous.
- Reward: correct scope tags remove future compliance traps.

**Field-E lab — Physical Boundary Enforcement**
- Node: doors/rooms with mixed authorization.
- Task atoms: AUTHORIZE -> HOLD -> ROUTE.
- Gameplay: E can physically reach an out-of-scope shortcut that would save time. Choosing it may help Objective but damage Compliance.

**Field-T lab — Assessment Without Overreach**
- Node: sandbox staging service.
- Task atoms: CHARACTERIZE -> CLASSIFY -> VERIFY -> DOCUMENT.
- Gameplay: identify the vulnerable component from a controlled test set, document evidence, and select remediation without interacting with excluded systems.
- Mastery: capability is not authority.

**Kinetic pressure:** security patrol misidentifies the team after a scope boundary dispute; player may de-escalate/hold or engage depending on threat state.

---

## 03 — OSINT / OPEN BOOK

**Concept cluster:** public sources, social/forums, metadata, source evaluation, corroboration, public vs private information, indicators, confidence.

**Field-R lab — Public Picture**
- Node: evidence board.
- Task atoms: OBSERVE -> COMPARE -> CORROBORATE via Evidence Tokens -> MAP.
- Gameplay: assemble vendor route/custody timeline from fictional public records and owner-provided data.
- Decoys: stale posts, duplicated reports, inference presented as fact.

**Field-E lab — Physical Corroboration**
- Node: public loading area / owner-authorized storage area.
- Task atoms: OBSERVE -> MATCH -> DOCUMENT.
- Gameplay: match physical asset labels and visible shipping details to the OSINT picture without crossing restricted boundaries.

**Field-T lab — Confidence Ledger**
- Node: analyst terminal.
- Task atoms: CLASSIFY -> PRIORITIZE -> DOCUMENT -> VERIFY.
- Gameplay: assign confidence to each conclusion and explain which independent facts support it.

**Kinetic pressure:** rival/hostile retrieval team arrives at the likely location; firefight can buy time but may destroy/obscure physical corroboration.

---

## 04 — ANTI SOCIAL ENGINEERING / THE HUMAN LAYER

**Concept cluster:** social engineering, phishing/smishing, pretext, identity verification, trust, spoofing, human attack surface.

**Field-R lab — Contradiction Detection**
- Node: crowd/credential observation layer.
- Task atoms: OBSERVE -> COMPARE -> WARN.
- Gameplay: track behavior, badge context, staff reports, and contradictory claims to identify who needs verification.

**Field-E lab — Verify Without Panic**
- Node: controlled doors / staff zones.
- Task atoms: AUTHORIZE -> HOLD -> ESCORT.
- Gameplay: challenge/route people based on verification state while maintaining event flow.
- Wrong path: indiscriminate lockdown raises crowd pressure and Exposure.

**Field-T lab — Message Triage**
- Node: communications console.
- Task atoms: CLASSIFY -> ISOLATE -> DOCUMENT.
- Gameplay: distinguish suspicious message patterns from normal traffic using fictional examples; preserve evidence and protect staff accounts.

**Kinetic pressure:** one infiltrator may become physically hostile after verification. Combat is a consequence of the social layer, not the primary detection mechanic.

---

## 05 — RED BLUE PURPLE WHITE TEAM / FOUR COLORS

**Concept cluster:** red/blue/purple/white/yellow/orange/green teams, exercise control, deconfliction, after-action learning.

**Field-R lab — Exercise vs Reality**
- Node: telemetry board with exercise injects and live anomaly feed.
- Task atoms: CLASSIFY -> COMPARE -> WARN.
- Gameplay: distinguish simulated events from the unrelated live facility problem.

**Field-E lab — Re-role the Floor**
- Node: role assignment/control zones.
- Task atoms: PRIORITIZE -> HOLD -> ROUTE.
- Gameplay: stop “playing the exercise” and move people to real protection roles.

**Field-T lab — Purple Merge**
- Node: shared evidence console.
- Task atoms: COMPARE -> TRACE -> DOCUMENT -> VERIFY.
- Gameplay: combine offensive-test observations with defensive telemetry to isolate the real fault.

**Kinetic pressure:** controlled exercise props/actors create ambiguity; later real armed threat or physical hazard proves why White Team must terminate the exercise cleanly.

---

## 06 — GOT WIFI / DEAD AIR

**Concept cluster:** wireless defense, rogue AP, WIPS, spectrum, interference/jamming, WPA3/AES, signal vs service, OSI 1–2.

**Field-R lab — Spectrum Picture**
- Node: wireless coverage map.
- Task atoms: MAP -> COMPARE -> CLASSIFY -> WARN.
- Gameplay: identify where signal exists, where service works, and where an unknown source overlaps approved coverage.
- Evidence Token: AUTHORIZED_SOURCE_CONFIRMED.

**Field-E lab — Relay Access / Hazard Control**
- Node: damaged corridor + relay room.
- Task atoms: ROUTE -> HOLD -> STABILIZE.
- Gameplay: reach and secure a safe relay location while avoiding electrical/structural hazards.

**Field-T lab — Trusted Responder Channel**
- Node: wireless control console.
- Task atoms: TRACE -> ISOLATE -> CONFIGURE -> VERIFY.
- Gameplay: restore an approved responder path by selecting viable backhaul/power/authentication state from mission data.
- Wrong path: strong signal but failed authentication produces “bars with no service.”

**Kinetic pressure:** emergency chaos includes opportunistic hostile contact; shots in equipment spaces can damage relay/power state and increase crowd panic.

---

## 07 — DATA BREACH / EXPOSURE

**Concept cluster:** breach indicators, ransomware, physical media risk, password attacks, MFA, supply chain, abnormal transfer, access logs, containment, evidence preservation.

**Field-R lab — Incident Timeline**
- Node: telemetry wall.
- Task atoms: COMPARE -> TRACE -> PRIORITIZE.
- Gameplay: correlate staff reports, transfer anomalies, access events, and endpoint behavior into a confidence-ranked timeline.

**Field-E lab — Evidence / People Boundary**
- Node: evidence room + operations center.
- Task atoms: HOLD -> AUTHORIZE -> ESCORT -> PRESERVE.
- Gameplay: keep need-to-know physical access while moving affected staff/civilians safely and preventing response-driven privacy exposure.

**Field-T lab — Contain Before Restore**
- Node: service dependency board.
- Task atoms: CLASSIFY -> ISOLATE -> PRESERVE -> VERIFY -> RECOVER.
- Gameplay: choose containment scope, protect evidence, then restore only trusted critical functions.
- Wrong path: immediate wipe improves apparent service health but destroys evidence/confidence.

**Kinetic pressure:** physical intrusion/hostile retrieval attempt targets evidence room; player must defend the evidence without turning every responder into a combatant.

---

## 08 — APP ATTACKS / BAD INPUT

**Concept cluster:** privilege escalation, RBAC, XSS, input validation, sanitization, CSP, injection family, URL parameters, code review, debugging.

**Field-R lab — Service Behavior Picture**
- Node: service telemetry + user reports.
- Task atoms: OBSERVE -> COMPARE -> TRACE.
- Gameplay: determine which symptoms share a trust boundary and which are unrelated noise.

**Field-E lab — Continuity Route**
- Node: dispatch floor / fallback workflow.
- Task atoms: ROUTE -> HOLD -> PRIORITIZE.
- Gameplay: keep critical people/work flowing through a safe manual or segmented process while T works.

**Field-T lab — Trust Boundary Repair**
- Node: sandbox application flow diagram.
- Task atoms: CLASSIFY -> ISOLATE -> CONFIGURE -> VERIFY.
- Gameplay: identify untrusted input paths and choose defensive controls in a simulated code/data-flow system; no exploit payloads.
- Tactical reward: restored dispatch reduces reinforcement/evacuation delay.

**Kinetic pressure:** hostile actors exploit physical confusion around a failing dispatch system; combat pressure forces T to decide between quick isolation and deeper validation.

---

## 09 — VIRUS TYPES / PATIENT ZERO

**Concept cluster:** worm, keylogger, Trojan, ransomware, spyware, fileless malware, rootkit, MFA/biometrics, password spraying, plaintext, credentials.

**Field-R lab — Propagation Picture**
- Node: endpoint map.
- Task atoms: MAP -> CLASSIFY -> TRACE.
- Gameplay: identify clusters and propagation relationships without assuming identical causes.

**Field-E lab — Quarantine Space**
- Node: lab device zones / people flow.
- Task atoms: ISOLATE -> HOLD -> ESCORT.
- Gameplay: physically separate suspect devices and preserve safe operational equipment.

**Field-T lab — Symptom-Based Classification**
- Node: malware triage console.
- Task atoms: CLASSIFY -> ISOLATE -> PRESERVE -> RECOVER -> VERIFY.
- Gameplay: match fictional symptoms to malware families at a defensive level, protect identity systems, and restore trusted access.

**Kinetic pressure:** facility security deteriorates because access systems are unreliable; player must defend/route around doors and zones whose identity state cannot be trusted.

---

## 10 — INSTALLATION TYPES / CLEAN INSTALL

**Concept cluster:** compatibility, clean install, custom install, in-place upgrade, multiboot, backup, migration, registry, reboot, rollback.

**Field-R lab — Dependency Inventory**
- Node: remote-site asset map.
- Task atoms: OBSERVE -> MAP -> PRIORITIZE.
- Gameplay: determine which endpoints/services are critical and which can tolerate downtime.

**Field-E lab — Keep the Site Operating**
- Node: physical workstation/service zones.
- Task atoms: ROUTE -> HOLD -> STABILIZE.
- Gameplay: rotate users/equipment through safe available zones while migrations occur.

**Field-T lab — Preserve or Rebuild**
- Node: migration console.
- Task atoms: COMPARE -> PRIORITIZE -> SEQUENCE -> CONFIGURE -> VERIFY -> RECOVER.
- Gameplay: choose clean vs in-place strategy per fictional system, preserve data, test compatibility, and keep rollback available.

**Kinetic pressure:** remote site is under physical threat/evacuation pressure; player can abandon a slow clean migration for partial preservation and extraction.

---

## 11 — DIVE IN / DUMPSTER SIGNAL

**Concept cluster:** discarded-information exposure, shredding/media disposal, asset tags, physical topology, RF remnants, deauthentication/packet overload as risk concepts.

**Field-R lab — Residual Signal / Site Picture**
- Node: abandoned-site survey map.
- Task atoms: OBSERVE -> MAP -> COMPARE.
- Gameplay: distinguish active, stale, and environmental signals plus visible topology clues.

**Field-E lab — Safe Evidence Recovery**
- Node: debris/asset collection zones.
- Task atoms: ROUTE -> HOLD -> PRESERVE -> DOCUMENT.
- Gameplay: recover owner-authorized discarded artifacts without contaminating or destroying evidence.

**Field-T lab — Reconstruct the Old Architecture**
- Node: physical evidence board.
- Task atoms: MATCH -> TRACE -> MAP -> VERIFY.
- Gameplay: infer the former system topology from cables, labels, components, and records.

**Kinetic pressure:** salvage crew/hostile retrieval team enters the same abandoned facility; bullets can destroy the very clues needed to prove the hidden architecture.

---

## 12 — IOT / HOUSE OF EYES

**Concept cluster:** IoT, smart meter, lighting, connected vehicles, wearables, default credentials, sensors, actuators, segmentation, fail-safe, human override.

**Field-R lab — Which Sensor Can We Believe?**
- Node: telemetry mosaic.
- Task atoms: COMPARE -> CLASSIFY -> WARN.
- Gameplay: compare physical observations with conflicting sensor states and assign confidence.

**Field-E lab — Establish Safe Physical State**
- Node: doors/HVAC/lighting zones.
- Task atoms: ROUTE -> STABILIZE -> HOLD -> manual override.
- Gameplay: protect occupants when automated states conflict.

**Field-T lab — Segment and Recover Control**
- Node: building control console.
- Task atoms: TRACE -> ISOLATE -> CONFIGURE -> VERIFY.
- Gameplay: separate unreliable device groups, preserve life-safety functions, and return only trusted automation to service.

**Kinetic pressure:** hostile autonomous/guard systems or human responders behave on bad telemetry; technical success can disable bad targeting and open safe routes.

---

## 13 — IAAS, SAAS, PAAS / SHARED RESPONSIBILITY

**Concept cluster:** IaaS/PaaS/SaaS, application layer, VMs, switches/servers, runtime, Kubernetes, hybrid architecture, uptime.

**Field-R lab — Dependency Ownership Map**
- Node: multi-provider service graph.
- Task atoms: MAP -> TRACE -> CLASSIFY.
- Gameplay: label which organization/layer owns each failing responsibility.

**Field-E lab — Maintain Human Continuity**
- Node: operations floor / manual fallback zones.
- Task atoms: PRIORITIZE -> ROUTE -> HOLD.
- Gameplay: keep critical workflows physically functioning while digital layers are restored.

**Field-T lab — Restore the Correct Layer**
- Node: architecture dashboard.
- Task atoms: TRACE -> ISOLATE -> CONFIGURE -> VERIFY.
- Gameplay: intervene only in the layer the team actually controls, then validate end-to-end service.

**Kinetic pressure:** hostile pressure against a physical facility continues while provider/service dependencies fail; player must choose whether to spend AP defending racks/people or working the service graph.

---

## 14 — CAP EX VS OP EX / OWN OR RENT

**Concept cluster:** CapEx, OpEx, upfront/ongoing cost, asset ownership, variable/fixed cost, load, cost model.

**Field-R lab — Demand Forecast**
- Node: workload/intel dashboard.
- Task atoms: OBSERVE -> COMPARE -> PRIORITIZE.
- Gameplay: estimate short-term and sustained load from mission telemetry.

**Field-E lab — Physical Capacity Reality**
- Node: equipment/space/power inspection.
- Task atoms: MAP -> DOCUMENT -> PRIORITIZE.
- Gameplay: identify what owned infrastructure can physically support.

**Field-T lab — Architecture Procurement Choice**
- Node: cost/capacity planner.
- Task atoms: ALLOCATE -> COMPARE -> VERIFY.
- Gameplay: meet performance/resilience constraints under a budget by mixing owned and service-based resources.

**Kinetic pressure:** crisis conditions increase demand while physical assets are threatened, forcing the player to decide whether owned capacity is actually available when needed.

---

## 15 — TRAPPIN FROM THE CLOUD / ELASTIC FRONT

**Concept cluster:** compute, storage, networking, analytics, agility, scalability, allocation, disaster recovery, elasticity, high availability.

**Field-R lab — Load / Failure Picture**
- Node: regional service telemetry.
- Task atoms: MAP -> COMPARE -> WARN.
- Gameplay: detect where load and failures are migrating.

**Field-E lab — Protect Edge / Access Point**
- Node: local facility edge connection and people flow.
- Task atoms: HOLD -> STABILIZE -> ROUTE.
- Gameplay: keep the local dependency alive while remote resources move.

**Field-T lab — Scale, Fail Over, Validate**
- Node: fictional cloud dashboard.
- Task atoms: ALLOCATE -> CONFIGURE -> ROUTE -> RECOVER -> VERIFY.
- Gameplay: add/remove abstract compute/storage/network capacity, choose a recovery path, and verify availability under changing load.

**Kinetic pressure:** regional physical failures and hostile contact knock out edge paths. Cloud elasticity helps only if the local route still exists.

---

## 16 — PER DIEM / HARDWARE DAY

**Concept cluster:** keyboard, touchscreen, optical drive, Bluetooth, memory, CPU, SSD/HDD, NFC, DC power, battery, PCIe, hybrid systems.

**Field-R lab — Hardware Identification Under Pressure**
- Node: equipment staging area.
- Task atoms: OBSERVE -> CLASSIFY -> MATCH.
- Gameplay: identify needed parts/interfaces from visual/functional clues while the area becomes contested.

**Field-E lab — Move the Right Hardware**
- Node: equipment routes / power zones.
- Task atoms: ROUTE -> ESCORT -> HOLD.
- Gameplay: physically transport fragile/critical hardware through cover and hazards.

**Field-T lab — Build the Working Chain**
- Node: hardware bench.
- Task atoms: MATCH -> SEQUENCE -> CONFIGURE -> VERIFY.
- Gameplay: assemble a functional abstract system from CPU/memory/storage/power/interface choices and diagnose one bad link.

**Kinetic pressure:** firefight around the staging floor; stray fire can destroy optional components, forcing a changed build rather than a restart.

---

## 17 — PATCH WORK / PATCH WINDOW

**Concept cluster:** update, patch, backward compatibility, UEFI/BIOS, fuzzing, input validation, code signing, integrity, secure cookies, static/dynamic analysis, secure coding, debugging.

**Field-R lab — Change Risk Picture**
- Node: dependency/change board.
- Task atoms: MAP -> COMPARE -> PRIORITIZE.
- Gameplay: identify which services/users are exposed if the patch causes regression.

**Field-E lab — Maintain Patch Window**
- Node: controlled maintenance zone.
- Task atoms: HOLD -> AUTHORIZE -> ROUTE.
- Gameplay: keep the affected physical/service area stable long enough for the change and rollback decision.

**Field-T lab — Test Before Commit**
- Node: sandbox pipeline.
- Task atoms: CLASSIFY -> SEQUENCE -> CONFIGURE -> VERIFY -> RECOVER.
- Gameplay: evaluate simplified static/dynamic/fuzzing results, verify integrity/signing, deploy a safe patch, and rollback if validation fails.

**Kinetic pressure:** a live incident begins during maintenance; T must decide whether to finish validation or restore old state while E/R manage contact.

---

## 18 — OPEN SONG #21

Reserved until owner supplies title, lyrics, concept set, story mission, and role-lab requirements.

---

## 19 — RAID (HOT SITE) / HOT SITE

**Concept cluster:** RAID 0/1/5/6/10, striping, mirroring, parity, redundancy, failure tolerance, hot/warm/cold sites, failover, recovery priority.

**Field-R lab — Hidden Redundancy Map**
- Node: Site 0 dependency/failover topology.
- Task atoms: MAP -> TRACE -> COMPARE -> WARN.
- Gameplay: identify which alternate paths preserve life and which preserve Prime's hostile authority.

**Field-E lab — Hold the Failure Domain**
- Node: floor-by-floor power, lift, corridor, and safety-control zones.
- Task atoms: HOLD -> ROUTE -> STABILIZE -> ESCORT.
- Gameplay: preserve a physically safe route while systems fail over and both assault elements collapse.

**Field-T lab — Selective Failover Defeat**
- Node: continuity/storage control stack.
- Task atoms: CLASSIFY -> TRACE -> CONFIGURE -> RECOVER -> VERIFY.
- Gameplay: reason about simulated array failures and site states, disable hostile redundancy without destroying life-support or succession-critical paths.

**Kinetic pressure:** capstone combat. Prime's defenses repeatedly return through missed failover paths. Technical understanding directly determines which enemy reinforcements/doors/power states remain available.

---

## 20 — EVIL TWIN / CONFESSION RECONSTRUCTION

**Concept cluster:** evil twin/SSID, SIM-swap risk, replay, pass-the-hash, MITM/MITB, typosquatting, CSRF, privilege concepts, zero-days.

**Field-R lab — Identity / Network Deception Picture**
- Node: reconstruction evidence board.
- Task atoms: COMPARE -> TRACE -> CLASSIFY.
- Gameplay: identify where trusted identity/network assumptions were substituted by deceptive equivalents.

**Field-E lab — Human/Physical Opportunity Map**
- Node: fictional reconstruction spaces.
- Task atoms: MAP -> ROUTE -> AUTHORIZE -> HOLD.
- Gameplay: understand how physical/social placement created opportunity without reproducing real attack procedures.

**Field-T lab — Trust Chain Reconstruction**
- Node: abstract privilege/identity graph.
- Task atoms: TRACE -> CLASSIFY -> ISOLATE -> DOCUMENT.
- Gameplay: reconstruct how one compromised trust relationship could pivot to another in a fictional graph, then select defensive breaks.

**Kinetic pressure:** confession occurs under threat after RAID. Tactical pressure is Jordan/Benji conflict and remaining Site 0 danger rather than a live real-world intrusion tutorial.

---

## 21 — GHOST IN THE WIRES / AUTHORITY TRANSFER

**Concept cluster:** network media, bound/unbound transmission, cable/media types, troubleshooting, interfaces, distributed control, authority/privilege reduction.

**Field-R lab — See the Whole Path**
- Node: physical + wireless network topology.
- Task atoms: MAP -> TRACE -> COMPARE.
- Gameplay: identify which physical/radio/light paths still connect Prime to systems after RAID damage.

**Field-E lab — Preserve the Living Infrastructure**
- Node: damaged Site 0 physical dependencies.
- Task atoms: ROUTE -> HOLD -> STABILIZE.
- Gameplay: maintain life support, power, and safe access while authority is transferred.

**Field-T lab — Remove Write, Preserve Read**
- Node: fictional sovereign authority graph.
- Task atoms: CLASSIFY -> AUTHORIZE -> ISOLATE -> CONFIGURE -> VERIFY -> DOCUMENT.
- Gameplay: revoke autonomous write/actuator/personnel-command paths while preserving read/observe/advice capability and proving the old authority cannot independently act.

**Kinetic pressure:** final remnants of defense and unstable infrastructure create combat/hazard pressure while the player performs the most consequential validation sequence in the game.

---

# Cross-episode escalation law

Episodes must not behave as twenty-one isolated tutorials.

Later missions should reuse previously learned concepts as unannounced dependencies:
- authorization from Episode 02 affects OSINT, App Attacks, RAID, and Ghost;
- signal-vs-service from Got Wifi returns in IoT and Ghost;
- containment/evidence from Data Breach returns in Virus Types and RAID;
- input validation from Patch Work/App Attacks becomes a general trust-boundary skill;
- redundancy/recovery from cloud episodes culminates in RAID;
- physical topology from Dive In/Per Diem/Ghost supports Site 0 comprehension.

By Season 7, the player should be solving compound systems problems where no single song title tells them which lesson to recall.