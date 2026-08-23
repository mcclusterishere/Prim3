---
status: DRAFT / SYSTEM FOUNDATION
system: Phenotypes
version: 0.3.0
---

# PRIM3 Phenotype System

**Phenotypes** are locked visual + functional identity systems for classes of people in the PRIM3 universe.  
They are **not** individual characters.  
They are reusable skins, loadouts, and social signals that any character can inhabit based on role, rank, season, and mission context.

A phenotype answers:
- How does this class of person look?
- What gear / marks are they allowed to carry?
- What does the visual language communicate to others inside and outside the system?
- What behavioral expectations does the appearance create?

---

## Current Active Phenotypes

### McCluster Corp Institutional
| ID | Name | Status | Primary Use |
|----|------|--------|-------------|
| EI-01 | Executive Authority | CANON | Highest-level corporate executives |
| CFI-01 | Corporate Fits — Authority Black | CANON | Standard elite employee / candidate wardrobe |
| CFI-02 | Corporate Fits — Bone Herringbone | CANON | Alternate elite employee colorway |
| SOI-01 | Security Officer — Authority Black | CANON | Corporate facility & information security |

### Operator / Succession Path
| ID | Name | Status | Primary Use |
|----|------|--------|-------------|
| PRIME-N1 | Prime Negative One / Full Operator | APPROVED-REFERENCE | End-state Prime identity & high-tier operators |
| FO-01 | Field Operator (base) | PROPOSED | External deployment parent identity |
| FO-T | Technical Field Operator | PROPOSED | Data, network, extraction specialist |
| FO-E | Entry Field Operator | PROPOSED | Physical access & close security |
| FO-R | Recon / Overwatch Field Operator | PROPOSED | Surveillance, perimeter, early warning |
| CO-01 | Cohort Operator (Standard) | PROPOSED | Active cohort members on institutional mission |
| CO-02 | Cohort Operator (Light / Training) | PROPOSED | Early training & low-visibility work |

### Civilian / Entry
| ID | Name | Status | Primary Use |
|----|------|--------|-------------|
| RS-01 | Recruit Student | PROPOSED | Season 1 protagonist & new intake before full issue |
| AC-01 | Academic / Campus | PROPOSED | College environment, pre-corporate |

### Adversarial / External
| ID | Name | Status | Primary Use |
|----|------|--------|-------------|
| ADV-01 | State Actor Operator | PROPOSED | Hostile government / intelligence operators |
| ADV-02 | Corporate Rival Executive | PROPOSED | Competing private power |

---

## Basic Field Team Triad

The three core field phenotypes form a complete basic external team:

| Phenotype | Primary Job | Protects / Enables |
|-----------|-------------|--------------------|
| **FO-T** Technical | Systems access, extraction, analysis | The reason the team is there |
| **FO-E** Entry | Physical access + close security | Protects FO-T on the objective |
| **FO-R** Recon | External picture + early warning | Protects the whole team from outside |

FO-01 remains the parent / general field identity. FO-T, FO-E, and FO-R are the specialized configurations used when a full field element is deployed.

---

## Directory Map (Target)

```
phenotypes/
├── README.md
├── PHENOTYPE-SYSTEM.md
├── operators/
│   ├── field-operator/          ← FO-01 base
│   ├── field-technical/         ← FO-T
│   ├── field-entry/             ← FO-E
│   ├── field-recon/             ← FO-R
│   ├── cohort-standard/
│   └── cohort-light/
├── civilian/
└── adversarial/
```

Visual source assets remain under `assets/canon/`.  
Brand rules remain under `brands/mccluster-corp/`.

---

## Core Principle

Phenotypes are the visual grammar of power, access, and belonging in PRIM3.  
They must feel like a complete, living institution — not random costumes.
