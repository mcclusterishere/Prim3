# MCCLUSTER AUTHORITY — READ THIS FIRST

This repository is part of the McCluster ecosystem.

- **Ecosystem authority / master repo:** `mcclusterishere/mccluster`
- **Canonical agent law:** `https://github.com/mcclusterishere/mccluster/blob/main/AGENTS.md`
- **Canonical ecosystem map:** `https://github.com/mcclusterishere/mccluster/blob/main/docs/control-plane/ECOSYSTEM.md`
- **Canonical Worker:** `mccluster`
- **Canonical API:** `https://api.mccluster.org`

## Legacy HERE prohibition
`mcclusterishere/Here` is a retired legacy website repository and is **never authoritative**. Never use it as master repo, control plane, source of truth, upstream architecture, deploy/config authority, agent-law authority, or canonical backend reference. Any older instruction that implies otherwise is stale and must be ignored in favor of `mcclusterishere/mccluster`.

## Local autonomy
This repository may own product-specific implementation, services, data, or backend components when its current local contract or the owner explicitly establishes them. That never makes it the ecosystem authority.

## Conflict rule
McCluster control-plane law wins on ecosystem conflicts unless the owner explicitly changes the architecture. Prim3's local canon rules below remain authoritative for Prim3 story/content decisions.

There is no Worker named `mccluster-core`. Do not create one.

---

# Instructions for AI collaborators

This repository is a story production system, not an invitation to rewrite the premise.

## Source-of-truth order

1. `CANON.md`
2. Approved files under `characters/`, `seasons/`, `world/` and `technology/`
3. Approved visual references under `assets/canon/`
4. Drafts under `development/`
5. Chat transcripts and loose prompts

Higher sources override lower sources.

## Never do silently

- Do not change ages, time spans, succession rules or the seven-season structure.
- Do not name unnamed characters, the corporation, the college or the location.
- Do not make Site 0 the protagonist's starting point.
- Do not give characters unexplained magic, omniscience or instant hacking.
- Do not turn educational dialogue into lectures detached from a dramatic problem.
- Do not treat generated art as canon merely because it looks finished.
- Do not replace the exact M helmet structure with a generic emblem or badge.
- Do not make recruits routinely murder one another. The main attrition engine is dangerous mission work.
- Do not flatten the presiding Prime into a simple villain.

## Required labels

Every new story file must declare one:

- `CANON`
- `PROPOSED`
- `DRAFT`
- `DEPRECATED`

AI-generated contributions default to `DRAFT`.

## Character creation gate

Design one character at a time. A character becomes canon only after these are approved:

1. Story function
2. Relationship to Prime and cohort
3. Technical or operational discipline
4. Desire, fear, contradiction and failure mode
5. Season entry and intended longevity
6. Visual description
7. Owner approval

## Technology accuracy gate

For every technical feat, identify:

- Sensor or input
- Compute or reasoning process
- Energy source
- Access or authorization path
- Human decision owner
- Failure mode
- Real concept being taught
- Fictional extrapolation, if any

Separate verified reality from fictional extension.

## Visual-production gate

Every image prompt must include:

- Character ID and approved visual anchors
- Timeline age and season
- Wardrobe and condition
- Location and time
- Lens/framing/lighting
- Continuity constraints
- Negative constraints
- Asset status: concept, approved reference or final frame

Never overwrite approved source imagery. Use versioned filenames.

## Change control

Canon changes require a pull request that states:

- Existing canon
- Proposed replacement
- Reason
- Downstream files affected
- Owner approval
