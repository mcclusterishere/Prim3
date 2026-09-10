---
status: CANON-DERIVED-AUDIT
system: External certification objective alignment
version: 1.0.0
owner: Matthew McCluster
review_date: 2026-09-09
basis: Current 20 owner-song concept catalog on main; open Song #21 excluded from fit scoring
---

# PRIM3 / CompTIA Objective Alignment — 2026 Audit

## Purpose

This audit answers a deliberately different question from PRIM3's curriculum intent:

> Ignoring what PRIM3 *wants* to be, which current CompTIA exams most closely match the concepts actually present in the existing 20 owner songs?

This is a **relative concept-alignment audit**, not a claim that listening to or completing PRIM3 currently makes a learner exam-ready. Exam readiness requires objective-level coverage, sufficient depth, practice, and current official materials.

PRIM3 is not affiliated with, endorsed by, or an official training product of CompTIA.

The infrastructure-first curriculum authority lives in `learning/INFRASTRUCTURE-FIRST-CURRICULUM-AUTHORITY.md`. The fact that current-song alignment is presently security-heavy is a **gap signal**, not a revision of the infrastructure-first purpose.

## Method

Input corpus:
- the 20 existing owner songs indexed by `learning/SONG-CONCEPT-INDEX.md`;
- the normalized concept IDs derived from those lyrics;
- current song-to-mission concept clusters.

Open Song #21 is excluded because it has no lyrics/concept inventory yet.

Each certification/exam is compared on five dimensions:
1. **Direct lexical overlap** — concepts explicitly named in lyrics.
2. **Domain breadth overlap** — how many major exam domains have meaningful song support.
3. **Depth plausibility** — whether songs contain enough related concepts to support more than a glossary definition.
4. **Lab compatibility** — whether current concepts naturally map to PRIM3's tactical LAB_NODE grammar.
5. **Missing-objective penalty** — major exam domains with little/no current representation.

The **Relative Alignment Score (0–100)** is an internal PRIM3 design heuristic. It is not percentage exam coverage and must never be displayed as a pass probability.

## Current examined portfolio

This audit includes the currently marketed/purchasable or current-series CompTIA exams that materially belong in the IT certification portfolio as of the review date, split by actual test where useful:

- Tech+ — FC0-U71
- A+ Core 1 — 220-1201
- A+ Core 2 — 220-1202
- Network+ — N10-009
- Security+ — SY0-701
- Server+ — SK0-005
- Linux+ — XK0-006
- Cloud+ — CV0-004
- CloudNetX — CNX-001
- CySA+ — CS0-004
- PenTest+ — PT0-003
- SecurityX — CAS-005
- Data+ — DA0-002
- DataSys+ — DS0-001
- DataAI — DY0-001
- Project+ — PK0-005
- SecAI+ — CY0-001
- AutoOps+ — AT0-001
- Cloud Essentials+ — CLO-002 (legacy/business cloud exam still represented in voucher channels)

Announced future exams are not ranked until their current shipping objective status is stable enough for a fair comparison.

---

# Ranked fit of the CURRENT 20 songs

| Rank | Exam | Relative alignment | Why current songs fit | Strongest song anchors | Largest current gaps |
|---:|---|---:|---|---|---|
| **1** | **Security+ SY0-701** | **92/100 — Very strong** | The corpus repeatedly covers threats, vulnerabilities, mitigations, identity, authentication, social engineering, malware, network/wireless security, application security, incident response, evidence, cloud/IoT architecture, governance/authorization and operational security. | White Grey Black Hat; Anti Social Engineering; Got Wifi; Data Breach; App Attacks; Virus Types; Patch Work; Evil Twin; OSINT | PKI/certificates in depth; enterprise security architecture breadth; risk/GRC vocabulary; formal policies; deeper security operations tooling |
| **2** | **Network+ N10-009** | **82/100 — Strong** | Direct overlap exists in OSI L1/L2, frames/packets, IP, routers, switches, APs, wireless/RF, WPA3, AES, Ethernet, media/cabling, cloud service models, segmentation, monitoring/logs and troubleshooting. | Got Wifi; Ghost In The Wires; IaaS SaaS PaaS; Trappin From The Cloud; IoT; Anti Social Engineering | IPv4/IPv6 depth; subnetting/CIDR/VLSM; TCP/UDP and common ports; DNS/DHCP/NTP/SNMP/syslog; routing; VLANs/trunks; NAT/PAT; fiber/transceivers; MDF/IDF; SDN/SD-WAN/VXLAN/SASE; IaC |
| **3** | **CySA+ CS0-004** | **79/100 — Strong** | The current material is rich in indicators, logs, telemetry, abnormal transfer, malware behavior, threat intelligence/OSINT, vulnerability/patch concepts, containment, evidence preservation and incident-response judgment. | Data Breach; OSINT; Virus Types; Patch Work; App Attacks; Anti Social Engineering | SIEM/query depth; structured vulnerability management; threat hunting; detection engineering; formal incident process/reporting; metrics |
| **4** | **PenTest+ PT0-003** | **76/100 — Strong** | Authorization/ROE, white/grey/black-box assessment, recon/OSINT, ports, attack surface, vulnerability testing, social engineering and many named application/identity/wireless attack concepts overlap heavily. | White Grey Black Hat; OSINT; App Attacks; Evil Twin; Anti Social Engineering; Got Wifi; Patch Work | Full professional engagement lifecycle; deeper enumeration; cloud/container testing breadth; reporting depth; post-exploitation workflow; safe hands-on methodology |
| **5** | **A+ Core 1 220-1201** | **72/100 — Strong/moderate** | Hardware, CPU/memory, SSD/HDD, PCIe, batteries, NFC/Bluetooth, network media, wireless, IP, routers/APs, virtualization/cloud models and troubleshooting concepts are well represented. | Per Diem; Ghost In The Wires; Got Wifi; IaaS SaaS PaaS; Installation Types; Trappin From The Cloud | Printers; displays/peripherals breadth; mobile hardware breadth; motherboard/PSU detail; IP configuration; SOHO configuration; deeper virtualization; systematic troubleshooting |
| **6** | **Cloud+ CV0-004** | **69/100 — Moderate/strong** | IaaS/PaaS/SaaS, compute/storage/networking, VMs, Kubernetes/runtime, hybrid cloud, scalability, elasticity, availability, resource allocation, DR/contingency, monitoring and cloud-vs-on-prem responsibility are explicitly present. | IaaS SaaS PaaS; Trappin From The Cloud; Cap Ex Vs. Op Ex; RAID (Hot Site); Data Breach | Regions/AZs; cloud networking depth; IAM; deployment/migration depth; automation/IaC; DevOps; observability depth; backup/replication implementation; cloud troubleshooting |
| **7** | **A+ Core 2 220-1202** | **67/100 — Moderate/strong** | Clean/in-place installation, migration, multiboot, registry/terminal, patching, malware, social engineering, MFA, security, operational/evidence practices and troubleshooting map well. | Installation Types; Patch Work; Virus Types; Anti Social Engineering; Data Breach | Windows administration detail; command-line utilities; permissions; OS tooling; remote support; ticketing/documentation depth; scripting specifics; software troubleshooting breadth |
| **8** | **Server+ SK0-005** | **63/100 — Moderate** | RAID and recovery-site material is excellent; hardware/storage, CPU/memory, networking, virtualization/cloud, power, installation, backup/DR, availability and security provide a useful foundation. | RAID (Hot Site); Per Diem; Installation Types; IaaS SaaS PaaS; Trappin From The Cloud; Ghost In The Wires | Rack/server installation; BMC/OOB management; server OS admin; NIC teaming; clustering; server roles/services; SAN/NAS details; UPS/PDU/cooling; firmware lifecycle; troubleshooting depth |
| **9** | **CloudNetX CNX-001** | **59/100 — Moderate but strategically important** | Wireless, network media, segmentation, cloud networking concepts, availability, cloud models, security, monitoring and troubleshooting give a base. The exam's architecture emphasis is exactly where PRIM3 needs much deeper infrastructure content. | Got Wifi; Ghost In The Wires; IaaS SaaS PaaS; Trappin From The Cloud; RAID (Hot Site); IoT | IPv4/IPv6/subnetting; BGP/OSPF; VLAN/VXLAN/GENEVE; NAT; DNS/DHCP/NTP; east-west/north-south; load balancing; active-active/passive; link aggregation; regions/AZs; SD-WAN/MPLS; PDU/UPS/generators; thermal/environment; advanced monitoring |
| **10** | **Tech+ FC0-U71** | **57/100 — Moderate** | The album touches broad IT concepts, infrastructure, hardware, software, security, cloud and data at introductory levels, with especially strong Infrastructure/Security material. | Per Diem; Got Wifi; Ghost In The Wires; Installation Types; Data Breach; IaaS SaaS PaaS | Databases; programming/software-development fundamentals; binary/hex/math basics; broad end-user/application literacy; beginner troubleshooting breadth |
| **11** | **SecurityX CAS-005** | **54/100 — Moderate concepts, insufficient expert depth** | Many security architecture/engineering/operations terms appear, including cloud, IoT, identity, segmentation, incident response and offensive-risk concepts. | Data Breach; App Attacks; Got Wifi; IoT; Evil Twin; IaaS SaaS PaaS | Expert architecture design, enterprise engineering, advanced cryptography/PKI, GRC/risk, architecture tradeoffs, advanced IAM, complex hybrid integration, formal security operations |
| **12** | **Cloud Essentials+ CLO-002** | **51/100 — Moderate** | Cloud models, shared responsibility, CapEx/OpEx, scalability/elasticity, availability, DR and cloud networking overlap well with the business/technical cloud blueprint. | IaaS SaaS PaaS; Cap Ex Vs. Op Ex; Trappin From The Cloud; RAID (Hot Site) | Cloud business cases in depth; governance/compliance; vendor management; migration planning; operational management; risk/privacy breadth |
| **13** | **Linux+ XK0-006** | **39/100 — Weak/moderate** | RAID/storage, terminal, networking, cloud/container/Kubernetes references, security, logs, patching and some recovery concepts are present, but Linux-specific administration is sparse. | Installation Types; RAID (Hot Site); Patch Work; IaaS SaaS PaaS; Ghost In The Wires | systemd/services; users/groups; permissions; filesystems; mounts/LVM; package management; processes; shell tools; Bash/Python; Git; Ansible/Puppet/OpenTofu; container administration; Linux troubleshooting |
| **14** | **DataSys+ DS0-001** | **33/100 — Weak/moderate** | Storage, integrity, access control, logs, backups/DR, availability, hashing and security offer partial overlap with database administration concerns. | Data Breach; RAID (Hot Site); Trappin From The Cloud; IaaS SaaS PaaS | Relational/nonrelational database architecture; SQL; indexing; normalization; DB deployment; performance tuning; backup/restore at DB level; HA/replication; DB security administration |
| **15** | **Project+ PK0-005** | **28/100 — Weak** | Scope of work, scope/authorization, CapEx/OpEx, documentation, records, remediation and professional coordination appear but project management is not a major lyric domain. | High Alert; Cap Ex Vs. Op Ex; White Grey Black Hat; Red Blue Purple White Team | Lifecycle, scheduling, WBS/backlogs, Agile/Waterfall, stakeholders, RACI, procurement, risk registers, quality, change control, communications, project artifacts |
| **16** | **AutoOps+ AT0-001** | **25/100 — Weak but important future infrastructure gap** | Configuration, patching, cloud, Kubernetes and a few software/system concepts create a small foundation. | Patch Work; IaaS SaaS PaaS; Trappin From The Cloud; Installation Types | Automation coding, APIs in depth, structured data, source control/Git, configuration management, IaC, CI pipelines, CD, testing gates, secrets, artifacts, rollback automation, observability automation |
| **17** | **Data+ DA0-002** | **20/100 — Weak** | Logs, telemetry, analytics/aggregation and evidence/confidence provide limited data overlap. | OSINT; Data Breach; IaaS SaaS PaaS; Trappin From The Cloud | Statistics, acquisition/preparation, cleansing, transformation, SQL, analysis methods, visualization, reporting, data governance, data quality |
| **18** | **SecAI+ CY0-001** | **14/100 — Very weak** | Security, access, incident and infrastructure-security foundations transfer, but the songs barely teach AI-system-specific security. | Data Breach; App Attacks; IoT; Ghost In The Wires | AI/ML concepts, model lifecycle, prompt/model/data attacks, AI supply chain, AI governance, AI-assisted security, model monitoring/evaluation |
| **19** | **DataAI DY0-001** | **10/100 — Very weak** | Cloud/data/analytics references give background infrastructure only. | IaaS SaaS PaaS; Trappin From The Cloud; Data Breach | Statistics/math, data modeling, machine learning, feature engineering, training/evaluation, MLOps, specialized AI/data applications |

---

# Main finding

The current album's **strongest objective-family match is Security+**, even though PRIM3's intended educational center is infrastructure.

That result is explainable from the lyric corpus: six or more songs are directly security/adversary-centered, and security concepts recur inside the infrastructure songs as well. By contrast, the infrastructure corpus has excellent islands—wireless, media/cabling, RAID/DR, hardware components, cloud service models, installation/migration, IoT, availability/scalability—but is missing several connective layers that infrastructure exams test heavily.

This finding should **not** cause PRIM3 to become a Security+ course. It should drive the opposite action: preserve the strong security literacy as valuable context while filling the infrastructure objective gaps aggressively.

---

# Infrastructure gap union exposed by CompTIA objectives

These are the highest-priority missing or underdeveloped areas after comparing the current 20 songs against Network+, Server+, Cloud+, Linux+, CloudNetX and A+ infrastructure objectives.

## Network architecture and protocols

- IPv4 and IPv6 addressing
- subnetting, CIDR, VLSM
- TCP vs UDP and common infrastructure protocols/ports
- DNS, DHCP, NTP, SNMP, syslog
- static/dynamic routing; route selection
- OSPF/BGP at the appropriate objective depth
- NAT/PAT, VIPs and gateway roles
- VLANs, SVIs, trunks/802.1Q, link aggregation, spanning tree, MTU/jumbo frames
- network topologies including three-tier, collapsed core and spine-leaf
- east-west vs north-south traffic
- VPN/QoS/CDN/proxy/load balancer roles

## Physical / data-center infrastructure

- MDF/IDF roles
- racks and rack units
- patch panels/fiber distribution
- single-mode vs multimode fiber
- SFP/QSFP/transceivers and connector families
- cable plant design, labeling and cable management
- PoE/power delivery concepts
- UPS, PDU, generator and load planning
- voltage/power events: blackout, brownout, surge/spike
- temperature, humidity, airflow, BTU/cooling and fire suppression
- physical access/environmental monitoring

## Modern / emerging networking

- SDN and SD-WAN
- zero-touch provisioning
- VXLAN and data-center interconnect
- NFV
- SASE/SSE
- zero-trust architecture as infrastructure policy
- IPv6 transition/dual stack/NAT64
- infrastructure as code, configuration drift and source-controlled network configuration
- cloud/hybrid routing and connectivity

## Server / compute infrastructure

- rack/server form factors and installation
- BMC/OOB management and management planes
- CPU/socket/platform architecture beyond component naming
- GPU/accelerator infrastructure
- NIC teaming/bonding
- clustering, load balancing, active-active vs active-passive
- firmware/BIOS/UEFI lifecycle and hardware health
- server roles and core infrastructure services

## Storage / data protection

- DAS, NAS and SAN distinctions
- block, file and object storage
- iSCSI/Fibre Channel/NFS/SMB context
- snapshots, replication and backup distinctions
- deduplication/compression where relevant
- immutable/air-gapped backup concepts
- failure domains
- RPO/RTO and restore sequencing
- RAID vs backup vs replication vs high availability

## Linux / systems administration

- Linux filesystem hierarchy
- users/groups and permissions
- systemd/services
- processes
- package management
- mounts/filesystems/LVM
- logs/journals
- Linux networking configuration and tools
- Bash/Python scripting
- SSH and secure administration
- containers from the operator perspective
- troubleshooting methodology

## Automation / infrastructure as code

- APIs
- YAML/JSON
- source control/Git
- configuration management
- IaC concepts and state/drift
- Ansible/Puppet/OpenTofu/Terraform-like workflows at conceptual/safe lab depth
- CI/CD as infrastructure delivery
- immutable vs mutable infrastructure
- automated validation/rollback
- observability automation

## Cloud infrastructure depth

- regions and availability zones
- autoscaling
- load balancers
- cloud IAM
- VPC/VNet-style networking
- security groups/network ACL concepts
- gateways/private connectivity
- object/block/file cloud storage
- serverless/FaaS
- container orchestration depth
- monitoring/telemetry
- migration and DR architecture

---

# Song #21 directive from this audit

Song #21 should **not** try to name every missing term once.

Its job should be to connect the infrastructure stack that the first twenty songs currently present as islands.

The best final-song concept spine is:

```text
PHYSICAL FACILITY
 -> POWER / COOLING / RACK / CABLING
 -> SWITCHING / ROUTING / ADDRESSING / CORE SERVICES
 -> COMPUTE / SERVER / STORAGE
 -> OS / VIRTUALIZATION / CONTAINERS
 -> CLOUD / OVERLAYS / AUTOMATION
 -> OBSERVABILITY / SECURITY / RESILIENCE
 -> EDGE / ACCELERATOR / EMERGING INFRASTRUCTURE
```

The Song #21 mission should therefore be a **multi-layer infrastructure integration lab**, not merely a vocabulary quiz: build or recover an end-to-end service path, diagnose failures at several layers, survive tactical pressure, validate service, then fail over while preserving security and observability.

If the lyric becomes too dense, some objective gaps should be added as prerequisite/reinforcement lessons and mission LAB_NODE mechanics attached to existing songs rather than forcing every term into the final verse.

---

# Especially useful official objective references

Primary objective documents reviewed for the infrastructure spine:

- Network+ N10-009: https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf
- Cloud+ CV0-004: https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-cloud-cv0-004-exam-objectives-(1-2).pdf
- CloudNetX CNX-001: https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-cloudnetx-cnx-001-exam-objectives-(1-2).pdf
- Security+ SY0-701: https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-security-sy0-701-exam-objectives-(6-0).pdf
- Server+ SK0-005: current CompTIA-hosted objective PDF / CompTIA asset CDN
- Linux+ XK0-006: current-series CompTIA objective document; verify the final non-draft revision before shipping exam-alignment claims

The audit must be refreshed when CompTIA changes an exam code/objective version. PRIM3 should preserve its stable internal concept IDs and map them to the then-current external objective IDs rather than rewriting song canon every time an exam is revised.