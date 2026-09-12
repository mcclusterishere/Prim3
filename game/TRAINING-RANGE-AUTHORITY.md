---
status: CANON
system: PRIM Training Range foundation mission authority
version: 1.0.0
owner: Matthew McCluster
branch: prim3-adaptive-cyber-range
authority: Specialized authority for the three noncanonical Training Range missions. Where older examples in other game learning documents conflict with this file, this file wins.
---

# PRIM3 Training Range Authority

## 1. Purpose

The first three Principles modules are songless certification foundations. They receive practical Missions without creating new songs, episodes, seasons, or story canon.

The current Principles foundation is authoritative:

```text
M01  Security Foundations and Risk
M02  Networking Foundations
M03  Identity, Cryptography and Access
```

Any older Training Range example that assigns M01 through M03 to alert triage, scope and evidence, or monitoring infrastructure is stale. Those High Alert lessons now begin at M04.

## 2. Training Range 01

```text
Mission ID: TR01-RISK-AND-CONTROLS
Principles: M01 Security Foundations and Risk
```

Primary practical targets:

1. Confidentiality, integrity, and availability.
2. Threat, vulnerability, likelihood, impact, and risk.
3. Proportional security controls.
4. Data state and trust concepts where appropriate.
5. Validation of residual risk rather than assuming a control worked.

Canonical machine readable mission:

`learning/missions/TRAINING-RANGE-01-RISK-AND-CONTROLS.yaml`

## 3. Training Range 02

```text
Mission ID: TR02-NETWORK-PATH
Principles: M02 Networking Foundations
```

Primary practical targets:

1. Layered traffic flow.
2. Hosts, addressing, and subnets.
3. Switching and routing.
4. Default gateways.
5. DNS and DHCP.
6. Ports and protocols.
7. End to end validation.

Canonical machine readable mission:

`learning/missions/TRAINING-RANGE-02-NETWORK-PATH.yaml`

## 4. Training Range 03

```text
Mission ID: TR03-TRUST-AND-IDENTITY
Principles: M03 Identity, Cryptography and Access
```

Primary practical targets:

1. Identification, authentication, authorization, and accounting.
2. Authentication factors and multifactor authentication.
3. Least privilege and access models.
4. Symmetric and asymmetric cryptography purpose.
5. Hashing and digital signatures.
6. Certificates, PKI, and trust validation.
7. Key management foundations.

Canonical machine readable mission:

`learning/missions/TRAINING-RANGE-03-TRUST-AND-IDENTITY.yaml`

## 5. Shared Training Range rules

All three ranges:

1. Are noncanonical simulators.
2. Disable story consequences.
3. Do not consume Jordan Wildcard, PRIM2 Apex, or Royce story state.
4. Use the same mission resolver and LAB_NODE contracts as later story Missions where practical.
5. Preserve minimum required tools at every readiness level.
6. Keep Tactical Challenge independent from Technical Challenge.
7. Use Scaffolding as learner support rather than punishment.
8. Record evidence traces for Technical Mastery, Independence, Transfer, and Compliance.
9. Require deterministic verification for state changing technical work.
10. Feed remediation back to the attached Principles module.

## 6. Build order

The first executable vertical slice is TR01 because its deterministic risk board can be implemented without a full VM fleet.

TR02 is the first network range integration target and should prove the `NETWORK_RANGE` adapter using an isolated topology.

TR03 should prove identity and cryptographic trust evidence without requiring unsafe external systems.

After the three Training Range exercises work end to end, the preferred rich story vertical slice remains `Data Breach / Exposure`, followed by `Dead Air` for RF, network, and power integration.
