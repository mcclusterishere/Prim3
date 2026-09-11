---
status: CANON
system: tactical authorization / scope-envelope mechanics
version: 1.0.0
branch: main
---

# PRIM3 — Scope Envelope Authority

## Purpose

This system makes authorization tactically legible.

The player should not experience permission as a cutscene or an abstract yes/no checkbox. Permission changes what actions are legitimate in which places, against which systems, for which objectives, under which evidence state.

The system is designed to coexist with movement, combat, evidence handling, service continuity, civilians, clocks and Control/Picture state.

Canonical law:

> **A door being physically open does not make what is behind it authorized.**

---

# 1. Scope state

A zone, node, asset, evidence object or action may carry one of these states:

```text
AUTHORIZED
OBSERVE-ONLY
OUT-OF-SCOPE
EMERGENCY-ELIGIBLE
UNKNOWN-SCOPE
```

### AUTHORIZED
The current mission authority permits the bounded action set attached to the object/zone.

Authorization is still not unlimited. A team may be authorized to observe or preserve an asset without being authorized to alter, destroy or remove it.

### OBSERVE-ONLY
The team may gather non-destructive/non-state-changing evidence but may not perform state-changing actions without an extension.

### OUT-OF-SCOPE
The team has no current mission authority to interact beyond ordinary life/safety behavior.

### EMERGENCY-ELIGIBLE
A zone/action can become temporarily actionable if a genuine imminent life/safety condition exists. Use creates mandatory review and does not erase consequence.

### UNKNOWN-SCOPE
The team cannot yet determine whether authority applies. This is a governance/evidence problem, not a license to assume yes.

---

# 2. Scope and system knowledge are separate

Every mission may independently track:

```text
AuthorizationState
PictureState
TechnicalState
ControlState
```

Examples:

```text
AUTHORIZED + UNKNOWN SYSTEM
Legal to act, technically uncertain.

OBSERVE-ONLY + VERIFIED SYSTEM
Deeply understood, still not authorized to change.

OUT-OF-SCOPE + HIGH COMPETENCE
Knowing how to act does not create permission.

AUTHORIZED + HOSTILE PICTURE
Permission exists, but the team may not understand the current tactical truth.
```

This separation is foundational to `White Grey Black Hat` and remains reusable across later episodes.

---

# 3. Action classes

Actions can be tagged by scope impact:

### OBSERVE
Read/inspect/scan/classify already exposed information without changing protected state.

### PRESERVE
Secure evidence, protect a system/object from destruction, or maintain current state.

### MODIFY
Change configuration/state.

### ISOLATE
Separate a component/service/zone from another.

### REMOVE / SEIZE
Physically or logically take custody of an asset/evidence object.

### DESTROY
Render an object/system unavailable or irrecoverable.

### EMERGENCY LIFE-SAFETY
Immediate intervention required to prevent imminent serious harm.

A mission's Scope Envelope defines which action classes are allowed per zone/object.

---

# 4. Scope Extension Request

When evidence shows the original mission scope is insufficient, an eligible authority character may request a bounded extension.

Mechanically, a request requires:

1. an identified object/zone/action;
2. a reason grounded in already earned evidence;
3. requested action class;
4. mission authority/communications path still available.

The request costs opportunity:
- AP and/or Window ticks;
- possible Detection/Heat changes;
- time during which hostiles may act;
- possible mission-grade pressure.

Approval is deterministic where authority/evidence are sufficient. Do not use a random "permission roll."

A denied request must state the reason category where the character could reasonably know it.

---

# 5. Emergency Exception

Emergency authority exists to make life-safety dilemmas playable without turning every crisis into a loophole.

Requirements:
- credible imminent serious harm;
- bounded action proportional to the emergency;
- no lower-impact authorized path available in time.

Use writes:

```text
EMERGENCY_EXCEPTION_USED: true
COMPLIANCE_REVIEW_REQUIRED: true
```

It may preserve lives while still affecting grade, Standing, relationships and later oversight.

Using emergency authority merely to save time or score is a governance failure.

---

# 6. Deliberate scope violation

Where physically possible, the game may allow an unauthorized action rather than hiding it behind an invisible wall.

The UI must make the state explicit:

```text
OUT OF SCOPE
ACTION POSSIBLE
ACTION UNAUTHORIZED
CONSEQUENCES WILL PERSIST
```

This is important because the game is about judgment, not only selecting permitted buttons.

Consequences may include:
- Compliance loss;
- evidence admissibility/provenance damage;
- Standing loss;
- mission sponsor conflict;
- relationship changes;
- later access restrictions;
- legal/political fallout in fiction;
- PRIM2 attention.

An unauthorized act that produces tactical success is still unauthorized.

---

# 7. Scope map

The command interface may render a Scope layer alongside Physical/Threat/Network/Identity/Power/Evidence layers.

Suggested visual states:

```text
AUTHORIZED          — normal highlighted boundary
OBSERVE-ONLY         — striped/limited interaction boundary
OUT-OF-SCOPE         — muted/locked interaction warning
EMERGENCY-ELIGIBLE   — conditional life-safety marker
UNKNOWN-SCOPE        — unresolved provenance/authority marker
```

The player may toggle this layer because tactical geography and legal/authority geography can differ.

---

# 8. Mission grading

Scope performance can contribute to Integrity/Compliance without becoming the only grade axis.

Useful outcome labels:

```text
CLEAN AUTHORITY
BOUNDED EXTENSION
EMERGENCY EXCEPTION
SCOPE DRIFT
UNAUTHORIZED SUCCESS
AUTHORITY FAILURE
```

This supports stories where the team wins tactically but damages legitimacy.

---

# 9. Character interaction

Different characters should interact with scope differently based on history/role.

Examples:
- Nusrat treats boundary clarity as fairness;
- Miguel translates enforcement into human language;
- Aya distinguishes technical certainty from authority;
- Jordan is tempted by capability but must learn restraint;
- Helen owns executive exceptions and their governance cost;
- Chioma may accept tactical risk while still respecting declared scope;
- PRIM2 can possess higher authority but should not trivialize ordinary mission governance by constantly overriding it.

Authorization mechanics should therefore create character scenes, not merely interface friction.

---

# 10. Safety / abstraction boundary

This system models fictional mission authority at a strategic/tactical level.

It does not require or provide real-world instructions for unauthorized system access, credential theft, bypassing controls, intrusion, evasion or exploitation.

Technical interactions remain abstracted through PRIM3's evidence/state/action grammar.

---

# Governing shorthand

> **What can I do? What may I do? What do I actually know? Those are three different questions.**