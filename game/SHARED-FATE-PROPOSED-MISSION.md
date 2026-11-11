---
status: PROPOSED
mission_id: SHARED-FATE-CLIENT-V1
canon_writeback: false
---
# Shared Fate — client continuity exercise

A supplemental fictional exercise, not a replacement for any of the 21 core episodes or the existing B1 Blind the Floor / Restore the Picture mission. No semester, age, succession, workplace or building geometry changes.

An Equity Uprise client has two labeled connections that depend on one upstream service. An authorized continuity exercise removes that dependency. The squad must establish independent fallback and distinguish configured, tested under failure and independently verified resilience. This does not identify any real cable, carrier, client, geographic route or vulnerability.

## Cast and workplace framing

- **Sari Wulandari**, telecom/cohort operations, cross-trained Field-E: service response lead and physical access continuity. Introduced at F2-DESK-SARI-WULANDARI, F2 cohort desks, x68.6/y20.4 ft.
- **Minh Tran**, Field-T hardware/firmware: device configuration and verification. Introduced at B1-WORKSHOP-BENCH-01, B1 workshop, x8/y31.65 ft.
- **Rafael Costa**, Field-R: dependency evidence and operational picture. Introduced at F3-DESK-RAFAEL-COSTA, F3 field operations, x46.4/y2.25 ft.
- **Helen Clarke**, Authority-02 Director: resource-priority authorization from F6-OFFICE-HELEN-CLARKE-DESK, F6 director office, x65.4/y8.6 ft. She is not a deployed technician.

These anchors come from `world/equity-uprise-workplace-roster.v1.json`, `story/EQUITY-UPRISE-WORKPLACE-CANON.md`, `story/PRIM3-CHARACTER-DOSSIERS.md`, phenotype identities and the companion building's inventory-backed v3 interior layouts. Each character starts the briefing in their own section. F3 planning may assemble the team; B1 is Minh's preparation, not universal staging. `story/EPISODE-WORKPLACE-LOCATION-MAP.md` permits external missions framed by headquarters.

The implemented introduction is narrative/linked staging, not a claim that F2–F6 workstations are traversable in the tactical HQ loader. The actual playable map is a distinct proposed fictional client continuity yard. It does not reuse or rename headquarters geometry. Named operator models remain generic tactical stand-ins; no new likeness is asserted.

## Play and measured choice

Recon inspects topology near the service-access point. Sari spends AP holding that physical access each working turn. Minh reaches the remote rack, edits the authorized client-edge prefix/gateway/reservation/uplink, failure-tests it and freshly verifies. Movement, AP, cover, simulated opposition, service window and extraction use the same canonical tactical resolver and Friday workbench adapter.

The explicit graph is A → shared-upstream → client-service and B → shared-upstream → client-service; fallback instead traverses independent-backhaul. Removal of shared-upstream defeats both A and B but not fallback. Removal of independent-backhaul defeats fallback. A label change cannot satisfy resilience.

The fallback ceiling is 24 Mbps. Essential enrollment/messages demand 6 Mbps. Within Helen's envelope, Sari may:

| Policy | Broadcast demand | Measured full-reservation consequences |
| --- | --- | --- |
| Keep headline | 22 Mbps | 100 reach units; 2/6 essential Mbps; 8 modeled missed appointments; sponsor confidence 90; next-operation capacity 1 |
| Reduce quality | 8 Mbps | 65 reach units; 6/6 essential Mbps; no missed appointments; confidence 75; capacity 2 |
| Cancel broadcast | 0 Mbps | no broadcast reach; 6/6 essential Mbps; no missed appointments; confidence 45; capacity 4 |

These are explicit DRAFT scenario metrics, not empirical predictions. Resource choice is a tradeoff, not an invisible moral answer. Lower reservation can further reduce actual service; over-reservation beyond 24 fails validation. Completion explicitly requires at least 1 of 6 essential Mbps to survive, not restoration of all essential services. Any choice can produce a degraded completion if under-reserved; for example cancelled with 1 Mbps yields ten modeled missed appointments. The headline path permits a verified degraded outcome if some essential service survives; the debrief must expose the lost appointments. No consequences are written into the campaign or a real next mission.

Subnet correctness uses the existing allocated /27 and 27-host requirement. Configured ≠ failure-tested ≠ verified. Changing configuration or policy invalidates previous probes/test revisions. Scope violations are recorded without execution. Reset is explicit and preserves the action ledger. Saved runs replay all actions and reject inconsistent outcomes.

## Execution and safety boundary

The existing bounded in-process workbench supplies address arithmetic and valid IPv4/TCP byte encoding/checksum/decoding. Client priorities, dependency outages, scheduling and service response are stateful simulations. No socket, real network/device, external target, shell, credentials, hosted compute, signed assessment or competency write exists. Completion and assistance/attempts/compliance/tactical outcome remain separate. Source tests and application journey tests cover all three choices.
