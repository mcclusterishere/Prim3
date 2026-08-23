---
status: DRAFT / SYSTEM FOUNDATION
system: Phenotypes
version: 0.1.0
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
| CO-01 | Cohort Operator (Standard) | PROPOSED | Active cohort members on mission |
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

## Directory Map (Target)

```
phenotypes/
├── README.md                      ← this file
├── PHENOTYPE-SYSTEM.md            ← rules & creation gate
├── mccluster-corp/
│   ├── executive/
│   ├── corporate-fits/
│   └── security-officer/
├── operators/
│   ├── prime-negative-one/
│   ├── cohort-standard/
│   └── cohort-light/
├── civilian/
│   ├── recruit-student/
│   └── academic/
└── adversarial/
    ├── state-actor/
    └── corporate-rival/
```

Visual source assets remain under `assets/canon/` and are linked from each phenotype folder.  
Brand rules remain under `brands/mccluster-corp/`.

---

## Core Principle

Phenotypes are the visual grammar of power, access, and belonging in PRIM3.  
They must feel like a complete, living institution — not random costumes.
