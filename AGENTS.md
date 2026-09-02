# MCCLUSTER CONTROL PLANE — READ THIS FIRST

This repository (`mcclusterishere/Prim3`) is a **internal** satellite of the McCluster control plane.
Default branch: `main`.

# McCluster satellite — read this before you touch anything

This repository is a **satellite** of the McCluster control plane.

Canonical law lives in the control repo. If this file and that file disagree, the control repo wins.

- Control repo: https://github.com/mcclusterishere/mccluster
- Agent law: https://github.com/mcclusterishere/mccluster/blob/main/AGENTS.md
- Ecosystem map: https://github.com/mcclusterishere/mccluster/blob/main/docs/control-plane/ECOSYSTEM.md
- Cloudflare project: `mccluster` (public edge `matthew.mccluster.org` / `mccluster.org`)
- Worker: `mccluster-core` (`api.mccluster.org`)
- Data: Supabase `zmnhbrjyhxzhkxmhkexs`

## What you are allowed to do here

- Product UI, brand, and local features for THIS satellite.
- Call McCluster APIs / Supabase tables that already exist.
- Submit social posts into the McCluster social layer (never as a second source of truth).

## What you must not do

- Create a new auth, database, admin, billing, or social scheduler.
- Auto-push GitHub Actions onto a feature branch (`git push` from CI onto an open PR).
- Rewrite `index.html` or a shipping page unless the owner named that file.
- "Rebuild the backend" inside this repo. The backend is McCluster.

## If you are ChatGPT, Claude, Codex, Cursor, Gemini, or Copilot

You keep failing this ecosystem by treating every repo as greenfield. It is not. McCluster is the plane. Read `CLAUDE.md` next. Then work.

Local product notes, if any, belong below this block. Do not delete this block.


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
