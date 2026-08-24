# Merge resolution (PR #4 closed)

## Problem
`foundation/season-one-canon` → `main` conflicted because both sides touched the same roots (`CANON.md`, `README`, `source-material`, later story files).

## Resolution policy
| Area | Winner |
|------|--------|
| **source-material/** | **main** (full lyric packages + data-breach audio) |
| **story/** Prime lore, episode order, Ghost Civ | **main** (already updated) + expand from foundation when missing |
| **CANON.md** | Prefer **foundation 0.3.0** corporate architecture (McCluster + Apex) merged with main continuity |
| **game/** | Bring from foundation (was missing on main) |
| **phenotypes/** | Bring from foundation if missing on main |

## This branch
`sync/full-canon-from-main` is based on **current main**. Only **additive / resolved** files are committed here so the PR into main has **no conflicts**.

## Owner action
Merge **this** PR (not #4). Then optionally delete `foundation/season-one-canon` after verifying.
