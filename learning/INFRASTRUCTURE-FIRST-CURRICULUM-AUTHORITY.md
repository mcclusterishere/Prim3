---
status: CANON
system: Curriculum priority / infrastructure-first authority
version: 1.1.0
owner: Matthew McCluster
review_date: 2026-09-09
---

# PRIM3 Infrastructure-First Curriculum Authority

PRIM3 is an infrastructure-first IT learning system with a **Security+ primary certification anchor and Network+ primary infrastructure companion anchor**.

The 21-song curriculum may teach cybersecurity, software, cloud, data, governance, social engineering, forensics, finance, and other adjacent disciplines. Security is now the principal external certification target because the existing twenty-song corpus already aligns most strongly with Security+. Infrastructure remains the explanatory backbone: the learner should understand the systems underneath the controls, incidents, applications, identities, data and threats being discussed.

The primary educational outcome is:

> A learner should leave PRIM3 with Security+-level security breadth grounded in unusually deep systems/infrastructure literacy and a practical mental model of how physical, network, compute, storage, operating-system, virtualization, cloud, resilience, monitoring, automation, identity, and security layers combine to support and protect modern IT services.

The target is not memorization alone. PRIM3 should prepare learners to reason through certification objectives and performance-based scenarios by repeatedly applying security and infrastructure concepts inside tactical missions.

The certification hierarchy is governed by `learning/SECURITY-NETWORK-DUAL-ANCHOR.md`.

## 1. Curriculum priority order

### Tier 0 — infrastructure spine

These domains receive the deepest repetition, labs, transfer testing, dependency mapping, and capstone integration:

1. Physical infrastructure and data-center environment
   - racks, chassis, cabling, patching, fiber/copper/coax, transceivers, power, UPS/PDU, cooling, environmental controls, physical access, safety.
2. Network infrastructure
   - OSI/TCP-IP, addressing, subnetting, routing, switching, VLANs, trunks, NAT/PAT, DNS, DHCP, NTP, network services, wireless, WAN, SDN/SD-WAN, overlays, segmentation, monitoring, troubleshooting.
3. Compute/server infrastructure
   - CPU, memory, storage controllers, NICs, firmware, BMC/OOB management, server operating systems, clustering, load balancing, high availability, lifecycle and troubleshooting.
4. Storage and data-protection infrastructure
   - DAS/NAS/SAN, block/file/object storage, RAID, parity/mirroring/striping, snapshots, replication, backup, restore, RPO/RTO, hot/warm/cold sites, failure domains.
5. Operating systems and Linux administration
   - boot, filesystems, services, packages, users/groups, permissions, logs, networking, storage, processes, system troubleshooting and automation.
6. Virtualization and cloud infrastructure
   - hypervisors, VMs, containers, orchestration, IaaS/PaaS/SaaS/FaaS, public/private/hybrid/multi-cloud, regions/AZs, scaling, elasticity, cloud networking, observability and cost.
7. Infrastructure operations and observability
   - telemetry, logs, metrics, baselines, monitoring, alerting, capacity, availability, incident handling, change/configuration management and troubleshooting.
8. Automation and infrastructure as code
   - scripting, APIs, YAML/JSON, source control, configuration management, IaC, CI/CD, orchestration, drift, immutable/mutable infrastructure and automated recovery.
9. Resilience and continuity
   - redundancy, fault tolerance, clustering, failover/failback, DR, availability, MTTR/MTBF, RPO/RTO, dependency awareness and restoration priority.
10. Infrastructure identity and security controls
   - IAM, MFA, least privilege, RBAC, AAA, certificates, secure access, segmentation, hardening, patching and defensive architecture.
11. Emerging infrastructure
   - edge/distributed computing, modern data-center interconnect, SDN, SD-WAN, SASE/SSE, VXLAN/overlay networking, zero-touch provisioning, AI/accelerator infrastructure, advanced cooling/power, high-speed fabrics, observability automation and other technologies that materially change how infrastructure is built or operated.

### Tier 1 — Security+ completion domains

Security+ is now the primary certification-completion target across the full product. These domains must be mapped objective-by-objective across songs, full lessons, labs, transfer missions, debrief review, and supplemental content:

- general security concepts;
- threats, vulnerabilities and mitigations;
- security architecture;
- security operations;
- security program management and oversight;
- identity, authentication and authorization;
- cryptography, PKI and certificate trust;
- incident response, monitoring and evidence;
- governance, risk, policies, standards and procedures;
- secure infrastructure and resilience.

Security concepts should be taught as systems problems whenever possible rather than isolated vocabulary.

### Tier 2 — infrastructure-dependent adjacent literacy

Incident response, penetration-testing concepts, application security, databases/data systems, IoT, governance, software and cloud-adjacent topics should be taught deeply enough that the learner understands what infrastructure must enable, protect, isolate, observe, recover or constrain.

### Tier 3 — broad IT context

Professional practice, project management, finance, analytics, AI, software-development concepts, and other topics remain useful supporting literacy. They should not displace Security+ completion or infrastructure depth unless a story/mission needs them.

## 2. Infrastructure dependency rule for every song

Every song concept must answer at least one of these questions in its lesson metadata:

- What infrastructure does this concept depend on?
- What infrastructure exposes or observes it?
- What infrastructure can constrain or mitigate it?
- What infrastructure can fail because of it?
- What physical/network/compute/storage/OS/cloud layer is underneath it?
- What operational telemetry would an infrastructure operator see?
- What recovery or continuity consequence follows?

Examples:

- `app.xss` is not only an application-security lesson; it links to reverse proxies/WAFs, TLS, DNS, load balancing, logging, deployment architecture and segmentation.
- `malware.ransomware` links to endpoints, identity, network segmentation, storage, backup immutability, recovery objectives, monitoring and restoration sequencing.
- `wireless.evil-twin` links to RF, AP/controller architecture, authentication, wired backhaul, VLANs, NAC/AAA, monitoring and physical placement.
- `incident.data-breach` links to identity, logging, storage, network flows, cloud/on-prem boundaries, backup/evidence systems and incident containment.

A lesson that teaches only the top-layer security term without its infrastructure dependency is incomplete.

## 3. Mission rule: infrastructure must exist on the battlefield

Infrastructure cannot remain background scenery.

Across the campaign, maps must contain mechanically meaningful:
- racks and server rooms;
- MDF/IDF or equivalent distribution spaces;
- switches, routers, APs/controllers and network paths;
- patch panels and media paths;
- power/UPS/PDU/generator states;
- cooling/environment states;
- storage arrays and recovery systems;
- cloud/service dependency boards;
- hypervisor/container/orchestration states;
- identity/control-plane nodes;
- monitoring/telemetry systems;
- backup/failover sites;
- edge/remote infrastructure.

These objects must change mission state when operated, damaged, isolated, restored, misconfigured, bypassed, or defended.

## 4. Repetition law

Infrastructure and high-value Security+ concepts are not one-song-and-done vocabulary.

A core concept should normally appear at four depths across the campaign:
1. Introduced — explicit lyric/lesson definition.
2. Applied — primary LAB_NODE mechanic in its home mission.
3. Reused — appears later as an unannounced dependency.
4. Integrated — capstone mission requires it alongside several other infrastructure/security layers.

This is how PRIM3 should create durable memory rather than short-term recall.

## 5. Certification alignment priority

PRIM3 is not an official CompTIA course and must never claim guaranteed exam coverage or endorsement.

For external objective-gap auditing, use this hierarchy:

1. **CompTIA Security+ — primary certification-completion anchor.**
2. **CompTIA Network+ — primary infrastructure companion anchor.**
3. CompTIA Server+
4. CompTIA Cloud+
5. CompTIA A+ Core 1 and relevant Core 2 infrastructure/operations objectives
6. CompTIA Linux+
7. CompTIA CloudNetX
8. CompTIA Tech+ infrastructure fundamentals
9. CySA+, PenTest+, SecurityX and other certifications as advanced or incidental transfer alignments.

This means the final curriculum is first checked for Security+ objective gaps. Network+ is then used to test whether that security knowledge rests on adequate network/infrastructure understanding.

The current cross-certification audit is maintained in `learning/COMPTIA-OBJECTIVE-ALIGNMENT-2026.md`.

## 6. Protected Song #21 purpose

The currently open Song #21 slot is now reserved as the **Security+ completion + Network+ infrastructure integration capstone**.

It must not be filled only because the album needs another song. Before lyrics are finalized, the remaining Security+ objective gaps must be reviewed first, followed by the Network+/infrastructure gap matrix.

The current working concept is:

- Song working title: `CHAIN OF TRUST`
- Mission working title: `TRUST ANCHOR`

These remain working titles until deliberately owner-locked.

Song #21 should preferentially cover high-value missing Security+ concepts that cannot be adequately reinforced by expanding existing lessons/labs, especially where they naturally expose infrastructure dependencies.

Likely Security+ completion families include:
- PKI and certificate chains;
- certificate authorities, trust stores and revocation;
- public/private keys, digital signatures and key management;
- secure protocols, encryption in transit/at rest and trust validation;
- enterprise identity, AAA, federation and MFA;
- zero-trust architecture;
- firewalls/WAF/IDS/IPS and layered controls;
- monitoring/SIEM/logging/flow visibility and baselines;
- vulnerability prioritization/remediation;
- governance, risk treatment, policy, standards, procedures and change control;
- incident response and business continuity.

Network+/infrastructure integration should reinforce the relevant missing connective layers, including:
- IPv4/IPv6 addressing, CIDR and subnetting;
- TCP/UDP and common infrastructure protocols/ports;
- switching/routing, VLANs, trunks, NAT/PAT and route selection;
- DNS/DHCP/NTP/SNMP/syslog and core services;
- topologies, spine-leaf, east-west/north-south traffic and network design;
- SDN/SD-WAN, VXLAN/overlay networking, SASE/SSE and zero-touch provisioning;
- rack/MDF/IDF design, patch panels, transceivers and physical installation;
- UPS/PDU/generator/cooling/environment/fire-suppression considerations;
- server administration, OOB/BMC, NIC teaming and clustering;
- DAS/NAS/SAN, block/file/object storage and replication;
- virtualization/hypervisors, containers and orchestration;
- Linux services/users/permissions/filesystems/package management;
- observability, baselines, latency/loss/jitter, capacity and troubleshooting;
- IaC/configuration management/source control/CI-CD;
- modern high availability, fault domains, regions/AZs and autoscaling;
- emerging edge, accelerator/GPU, fabric, power and cooling infrastructure.

The final song may be dense, but its mission should not be a glossary dump. The player should have to establish a trusted multi-layer service path, defend it, detect broken trust, restore controls, validate the result, and keep the infrastructure supporting that trust operational under pressure.

## 7. Curriculum success standard

A successful PRIM3 learner should be able to look at a security control, application, attack, dataset, AI workload, IoT system, business service or mission requirement and reason downward through the infrastructure stack:

```text
SECURITY EVENT / CONTROL / POLICY
  -> APPLICATION / SERVICE
  -> DATA / IDENTITY
  -> RUNTIME / OS / CONTAINER / VM
  -> COMPUTE / STORAGE
  -> NETWORK / SECURITY CONTROL PLANE
  -> POWER / COOLING / PHYSICAL FACILITY
  -> OBSERVABILITY / AUTOMATION / RECOVERY
```

The resulting educational identity is:

> **Security+ breadth taught through infrastructure depth, with Network+ as the first infrastructure benchmark.**
