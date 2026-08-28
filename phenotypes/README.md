---
status: CANON INDEX
system: Phenotypes
version: 1.0.0
---

# PRIM3 Phenotypes — clear index

**Phenotype = role** (job / place in the system)  
**Wear = clothes** (what they look like)

Read [NAMING.md](./NAMING.md) for the full hybrid naming rules.

Built for: **video game · seasonal story · real institutional design**

---

## The 13 internal roles (+ 1 robot)

### Authority — the suits
| Hybrid name | Job |
|-------------|-----|
| **Authority-01 Executive** | Top power. Decides if the institution continues. |
| **Authority-02 Director** | Runs programs and resources. Decides what work is allowed. |
| **Authority-03 Mission Sponsor** | Name on one mission line. The suit the team actually feels. |

### Defense — human building guards
| Hybrid name | Job |
|-------------|-----|
| **Defense-01 Building Guard** | General facility protection and response. |
| **Defense-02 Access Officer** | Gates, lobbies, who gets in and out. |
| **Defense-03 Tech-Zone Guard** | Server rooms, labs, technical zones. |

### Field — external ops team (always a set of three)
| Hybrid name | Job |
|-------------|-----|
| **Field-T Technical Operator** | Hands on the target systems (data / extract). |
| **Field-E Entry Operator** | Opens and holds the physical space. |
| **Field-R Overwatch Operator** | Watches outside; early warning. |

### Cohort — progression path toward Prime
| Hybrid name | Job |
|-------------|-----|
| **Cohort-02 Trainee** | Early cohort. Training. Not full field ops. |
| **Cohort-01 Operator** | Active mission-capable cohort member. |
| **Cohort-03 Lead** | Runs the small team. |
| **Prime-N1 Prime** | End-state operator identity. |

### System — non-human
| Hybrid name | Job |
|-------------|-----|
| **System-01 Building Platform** | Robot / automation that runs the building. |

---

## Clothes (not roles)

| Hybrid name | What it is | Who wears it |
|-------------|------------|--------------|
| **Wear-01 Company Black** | Black company wardrobe | Cohort-02 Trainee default; also off-kit cohort and employees |
| **Wear-02 Company Bone** | Bone herringbone company wardrobe | Alternate company wardrobe |

**Important:**  
Cohort-02 Trainee is a **role**.  
Wear-01 Company Black is **clothing**.  
A trainee’s normal clothes are Company Wear. That does not make “Company Wear” a job.

---

## How the pieces connect (plain language)

```
Authority-01 Executive
  └── Authority-02 Director
        └── Authority-03 Mission Sponsor
              └── Cohort-03 Lead
                    ├── Field-T Technical Operator
                    ├── Field-E Entry Operator
                    └── Field-R Overwatch Operator

Defense-01 / Defense-02 / Defense-03  → protect the building (humans)
System-01 Building Platform           → runs the building (robot)

Cohort path:
  Cohort-02 Trainee  →  Cohort-01 Operator  →  Cohort-03 Lead  →  Prime-N1 Prime
  (mostly Company Wear)   (ops kit when working)    (leads team)     (end-state)
```

---

## Skins we already have vs still need

| Hybrid name | Visual skin in repo? |
|-------------|----------------------|
| Authority-01 Executive | Yes |
| Authority-02 Director | No |
| Authority-03 Mission Sponsor | No |
| Defense-01 Building Guard | Yes |
| Defense-02 Access Officer | No |
| Defense-03 Tech-Zone Guard | No |
| Field-T / Field-E / Field-R | No |
| Cohort-02 Trainee | Uses Wear-01 / Wear-02 (yes) |
| Cohort-01 Operator | No dedicated ops skin yet |
| Cohort-03 Lead | No |
| Prime-N1 Prime | Yes |
| System-01 Building Platform | No |
| Wear-01 / Wear-02 | Yes (these are the clothes) |

---

## Old codes (background only)

File folders may still say `CO-02`, `FO-T`, `SOI-01`, `CFI-01`.  
Those are storage labels.  
**When reading or designing, use the hybrid names above.**
