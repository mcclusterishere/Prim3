---
status: CANON
system: Certification anchor hierarchy
version: 1.0.0
owner: Matthew McCluster
review_date: 2026-09-09
---

# PRIM3 Security+ / Network+ Dual-Anchor Authority

PRIM3 uses a two-axis curriculum model.

## Canonical anchor hierarchy

**Primary certification anchor: CompTIA Security+.**

**Primary infrastructure companion anchor: CompTIA Network+.**

These are not contradictory roles.

Security+ is the first external certification objective set PRIM3 should attempt to cover comprehensively across the 21-song curriculum, lessons, labs, transfer checks, and capstone mission.

Network+ is the first infrastructure objective set PRIM3 should use to ensure that the learner understands the network and systems substrate beneath the security material rather than memorizing security vocabulary in isolation.

The intended result is:

> Security+ breadth taught through infrastructure depth.

A learner should not merely know that a firewall, IDS/IPS, MFA system, SIEM, VPN, segmentation control, certificate, vulnerability, incident, ransomware event, or access policy exists. PRIM3 should repeatedly force the learner to reason about the infrastructure those controls depend on, where they sit in a service path, what telemetry they produce, what can fail underneath them, and how they interact with network, compute, storage, identity, power, cloud, and recovery systems.

---

# 1. External-certification priority

When choosing what concepts must be explicitly covered, reviewed, assessed, or added to Song #21, use this order:

1. **Security+** — primary completion target.
2. **Network+** — primary infrastructure companion and prerequisite-style systems target.
3. **Server+** — compute, storage, physical infrastructure, administration and resilience expansion.
4. **Cloud+** — cloud infrastructure, deployment, operations, security and resilience expansion.
5. **A+ Core 1 / Core 2** — hardware, operating-system, troubleshooting and operational foundation.
6. **Linux+** — systems-administration depth.
7. **CloudNetX** — advanced/emerging infrastructure stretch target.
8. **CySA+ / PenTest+ / SecurityX** — advanced security transfer targets where the existing songs naturally support them.
9. Other CompTIA certifications — useful incidental alignment, not the primary design constraint.

This hierarchy may be updated when exam series change. PRIM3's internal concept graph remains stable; external mappings are versioned.

---

# 2. Security+ completion rule

The 21-song curriculum should be audited against every current Security+ objective.

Every Security+ objective must end in one of four states:

- `DIRECT` — explicitly taught by a song/lesson and applied in a mission lab.
- `TRANSFER` — not necessarily named in a lyric, but explicitly taught and assessed through a related mission dependency.
- `SUPPLEMENT` — covered in the lesson layer and/or optional lab because forcing it into lyrics would damage the art.
- `GAP` — not yet adequately covered.

`GAP` is not allowed at final curriculum release for high-value Security+ objectives unless deliberately documented as out-of-scope.

A lyric does not have to literally contain every exam term. The certification anchor applies to the **whole PRIM3 learning product**: song, timed concept overlay, full lesson, battlefield lab, transfer mission, debrief review, and supplemental study material.

---

# 3. Network+ infrastructure rule

Network+ is not demoted to trivia or optional bonus material.

Network+ is the infrastructure skeleton underneath the Security+ anchor. Security lessons should expose relevant Network+ dependencies wherever technically appropriate.

Examples:

- segmentation -> VLANs/subnets/routing/firewalls and traffic boundaries;
- wireless security -> RF/AP/controller/backhaul/authentication/VLAN infrastructure;
- IDS/IPS/SIEM -> traffic sources, taps/SPAN-like visibility, logs, time synchronization, network flows and management paths;
- VPN/TLS/IPsec -> addressing, routes, gateways, protocols, transport and secure tunnels;
- zero trust -> identity plus network/application/resource policy enforcement;
- incident response -> DNS, DHCP, routing, switching, endpoints, logs, flow telemetry and isolation points;
- ransomware -> identity, network propagation paths, storage, backup, recovery and segmentation;
- PKI/certificates -> DNS/names, services, endpoints, trust stores and secure transport;
- cloud security -> VPC/VNet-like networks, subnets, routes, gateways, load balancers, security policy and hybrid connectivity.

Whenever Security+ teaches **what to protect**, Network+ should help teach **how the protected systems are actually connected and communicating**.

---

# 4. Infrastructure-first teaching remains canon

PRIM3 remains infrastructure-first in its explanatory model.

This means the learner should repeatedly reason downward through:

```text
SECURITY EVENT / CONTROL / POLICY
  -> APPLICATION / SERVICE
  -> IDENTITY / DATA
  -> OS / RUNTIME / VM / CONTAINER
  -> COMPUTE / STORAGE
  -> NETWORK PATH / SECURITY CONTROL PLANE
  -> PHYSICAL / POWER / COOLING
  -> TELEMETRY / AUTOMATION / BACKUP / RECOVERY
```

Security+ determines the principal certification coverage target.
Infrastructure determines the depth and causal model used to teach it.
Network+ is the first external infrastructure benchmark for that depth.

---

# 5. Mission-design consequence

Every major security mission should contain at least one meaningful infrastructure dependency unless the concept is genuinely non-infrastructural.

Examples:

- a phishing/social-engineering mission can affect identity systems, access-control infrastructure, logging, endpoint state and network authorization;
- an application-security mission can expose reverse-proxy/WAF, DNS, TLS, load-balancing, segmentation and observability dependencies;
- a malware mission should operate across endpoints, network segments, credentials, storage/backup and recovery paths;
- an incident-response mission should make telemetry sources, time, network isolation points, identity, storage and continuity mechanically meaningful;
- a wireless-security mission should make RF, APs, wired backhaul, power, network segmentation and authentication real battlefield state.

This is how PRIM3 avoids becoming a vocabulary-only Security+ study aid.

---

# 6. Song #21 / Episode 18 target

Song #21 is now the **Security+ completion + Network+ infrastructure integration capstone slot**.

Its first responsibility is to close the highest-value remaining Security+ objective gaps after the other twenty songs and lesson expansions are mapped.

Its second responsibility is to force those security concepts to operate on top of real network/infrastructure dependencies.

The current working concept is:

**Song working title:** `CHAIN OF TRUST`

**Mission working title:** `TRUST ANCHOR`

These titles remain working titles until owner-locked in story/song canon.

The concept cluster should preferentially absorb remaining high-value Security+ gaps such as:

- PKI and certificate trust;
- certificate authorities and trust chains;
- public/private keys and digital signatures;
- encryption in transit/at rest and key management;
- secure protocols and trust validation;
- enterprise identity, AAA, MFA and federation;
- zero-trust concepts;
- firewalls/WAF/IDS/IPS and layered security controls;
- monitoring/SIEM/logging/flow visibility and baselines;
- vulnerability identification/prioritization/remediation;
- risk treatment and governance concepts;
- policies, standards, procedures and change control;
- incident-response and business-continuity integration.

Network+/infrastructure reinforcement inside the same capstone should include the relevant:

- IP addressing/subnetting;
- routing/switching;
- VLAN/segmentation;
- DNS/DHCP/NTP and logging/management services;
- network paths and trust boundaries;
- WAN/VPN/secure transport;
- physical/network redundancy;
- power and service dependencies;
- monitoring/telemetry paths;
- high availability/failover/recovery.

Song #21 does not need to carry every missing Network+ term lyrically. Network+-specific gaps that cannot fit artistically should be supplied through lessons, earlier mission expansions, transfer labs and supplemental objective modules.

---

# 7. Capstone mission thesis

`TRUST ANCHOR` should require the player to establish and defend a verified chain of trust across multiple infrastructure layers under kinetic and operational pressure.

The mission should ask, mechanically:

- Which identity can be trusted?
- Which certificate/trust path is valid?
- Which telemetry is credible?
- Which network route and management plane are trusted?
- Which security control is enforcing the intended policy?
- Which service is actually protected?
- Which infrastructure dependency can fail underneath the security control?
- How do we verify the repaired state instead of assuming it?

Field-R should establish evidence/confidence and trusted picture.

Field-E should preserve physical/control-plane access, protect critical infrastructure and maintain secure zones/paths.

Field-T should reconstruct, configure, isolate, validate and prove the end-to-end trusted state.

Kinetic combat should buy or destroy the opportunity to complete that work; it must not substitute for understanding it.

---

# 8. Success standard

PRIM3 should eventually be able to make two defensible claims about curriculum design, subject to objective-by-objective audit and without implying CompTIA endorsement:

1. **Security+ is the primary certification blueprint the complete PRIM3 curriculum is designed to align against.**
2. **Network+ is the primary infrastructure blueprint used to ensure the security knowledge rests on genuine networking/systems understanding.**

The intended learner outcome is not simply `Security+ vocabulary + Network+ vocabulary`.

It is:

> **Security judgment grounded in infrastructure understanding.**
