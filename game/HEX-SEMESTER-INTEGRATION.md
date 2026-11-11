# Hex tactics and semester integration

Independent branch: `codex/prim3-hex-tactics-20261109`. Base: `762db6478d5967da70b465fb8f45d6cee51210b3`. No merge or deployment performed.

The owner-approved chronology now uses seven academic semesters, Fall 2026 through Fall 2029, with all 21 core episode/mission IDs retained. Three episode frames are opening, midterms and finals; winter/summer adventures are separate unreleased entries. `story/SEMESTER-CHRONOLOGY-AUTHORITY.md` is the current authority. Episode 18's protected open title, established ownership and continuous final succession are retained. See `development/2026-SEMESTER-RESEARCH.md` for sourced events and explicitly proposed scene uses.

`game/runtime/semester-progression.mjs` provides identity-preserving metadata migration. `learning/course/course-feed.json` remains source schema 1.0.0 with additive `prim3.semesters/v2` metadata. Existing passed IDs, scores and unknown metadata survive; an unsupported chronology version throws. Consumers must retain that source save and block writes until deliberate recovery.

The tactical extension uses the existing resolver's metric navigation branch, not a second combat engine. `hex-graph.mjs` builds six-neighbor axial geometry with metre transforms and conservative body-clearance tests. Metric navigation optionally carries world-bearing cover wedges and an explicit weapon-range scale. Positioned technical interactions use metric distance and sight; unsupported multi-floor/machine/square-cover combinations still fail closed. Existing square contracts and City metric graphs retain their prior behavior.

The companion `mcclusterishere/mccluster` branch vendors these files with SHA-256 provenance and implements the opt-in Transit / Relay yard slice and existing course UI/API adapters. Merge this canonical source first, then integrate the companion application commits. No live change is authorized by these notes. If merging changes the canonical source, refresh the vendor pin and rerun both suites before publishing any application.

Validation: `node --test game/runtime/*.test.mjs`; `python3 -I data/attributes/tools/validate_registry.py data/attributes/v1/catalog.json --self-test`; `git diff --check`. Application rendering, browser/physical iPad tests and production deployment are separate companion-repository gates. Attribute source snapshots and the November 2 release remain historical; the manifest records the limited succession-age amendment and updated catalog digest.

Rollback: revert this branch's commit and its companion vendor/application commit together. No database migrations or production state were applied. Restoring the old chronology changes labels back; it must never delete earned progress or reinterpret break IDs as core episodes. The hex save namespace is independent of legacy square saves and does not award course credit.
