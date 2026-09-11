---
status: CANON MIGRATED BLUEPRINT
season: 5
episode: 1
global_episode: 13
level_id: LVL-13
song: IaaS, SaaS, PaaS
mission: Shared Responsibility
runtime: FLEX-LONGFORM
version: 3.0.0
branch: main
---

# S5E1 — IAAS / SAAS / PAAS / SHARED RESPONSIBILITY

## Ownership / deployment

```text
PRIMARY OWNERS: Helen Clarke / Li Wei / Yonas Bekele
SECONDARY DEPTH: Leila Hosseini / Grace Mbala / Jonas Weber / Amira Hassan / Marc Dubois / Chioma Okeke
JORDAN: edge/mentioned; off-board Wildcard if CRITICAL
BASE PLAYABLE ROSTER: Yonas plus named layer owners / analysts from recurring roster
APEX: conditional on high-value CRITICAL state after Jordan arrival
ROYCE: unavailable by default
```

This supersedes the old Jordan-as-cross-layer-coordinator story while preserving the service-model/dependency mechanics.

---

# Recurring cast / micro-development ledger

| Character | Function | Development moment |
|---|---|---|
| Helen | owner / visible authority | Learns that a clean org chart can distribute responsibility so thoroughly that nobody feels responsible for the end-to-end failure. |
| Li | owner / executive process | Begins distinguishing documented ownership from actual accountability; his governance skepticism matures beyond language. |
| Yonas | owner / operations | Stops being merely the calm outage fixer and speaks before failure, forcing senior people to confront a dependency gap they prefer to route away. |
| Leila | analysis | Models McCluster itself as a potential adversarial system: who benefits when responsibility is fragmented? |
| Grace | human consequence | Keeps user/civilian impact visible when executives discuss layers instead of people. |
| Jonas | system liaison | Discovers Pylon can show dependencies without deciding who morally owns them. |
| Amira | sponsor/risk | Asks whether risk transfer in a contract is being mistaken for risk elimination. |
| Marc | sponsor/risk | Defends bounded delegation but begins seeing how risk arithmetic can hide downstream humans. |
| Chioma | command | Has to run a mission while authority boundaries delay fixes, sharpening her frustration with governance that looks neat from above. |

---

# Human problem

A mission-supporting service fails across infrastructure, platform and application boundaries. Every team can plausibly say “not our layer.”

Helen owns the visible institution but cannot simply order expertise into existence.
Li sees policy behaving like camouflage.
Yonas knows one missing dependency nobody wants to claim.
Grace sees people waiting while departments debate.
Amira/Marc disagree over whether contractual responsibility maps to moral responsibility.

---

# Technical thesis

Teach:
- IaaS/PaaS/SaaS divisions;
- shared-responsibility models;
- infrastructure/platform/application dependency maps;
- end-to-end validation;
- escalation by evidence;
- healthy components vs broken service;
- owner vs operator vs accountable decision-maker.

Core line:

> **“Not our layer” can be technically correct and operationally useless.**

---

# WATCH spine

1. Critical service fails while component dashboards remain mostly green.
2. Teams defend their contractual boundaries.
3. Yonas speaks earlier than his old pattern and points at the unowned seam.
4. Li proves responsibility language does not name an end-to-end accountable person.
5. Helen forces a shared map instead of another escalation chain.
6. Grace shows the human cost of each delay.
7. Amira/Marc disagree over what outsourced responsibility actually means.
8. Jonas/Pylon provide dependency visibility but cannot answer the governance question.
9. The service returns only after a named human accepts ownership of the cross-layer recovery.

---

# PLAY

Primary verbs:
`map dependencies / inspect health / assign owner / escalate / restore / verify end-to-end / document gap`.

Jordan may be called only if the operation reaches CRITICAL. He can bridge lanes temporarily but cannot become the permanent answer to bad institutional design.

---

# Persistent residue

- Helen begins confronting limits of good-faith governance.
- Li/Leila's private institutional threat-modeling deepens.
- Yonas becomes a proactive leader rather than outage-only hero.
- Grace keeps human impact attached to architecture decisions.
- Jonas sees Pylon's limits as a governance oracle.
- Amira/Marc's philosophical disagreement warms toward Episode 14.
- Chioma becomes less patient with responsibility without authority.

---

# Governing line

> **Shared responsibility fails when “shared” becomes another word for “nobody.”**