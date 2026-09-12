---
status: CANON-ROADMAP
system: PRIM3 game production control plane
version: 1.0.0
owner: Matthew McCluster
---

# PRIM3 Game Production Control Plane

## 1. Purpose

PRIM3 should eventually be able to produce its own game content from its own infrastructure.

The backend is therefore not only a runtime for the finished product. It is also the production system that creates, validates, versions and deploys the assets and builds used by the product.

The economic model is deliberate:

> Build production capability first, then use that capability to produce the capital assets of the game.

The immediate objective is not to fake a finished 3D game before the production stack exists. The immediate objective is to make the mechanics, schemas, manifests and automation boundaries precise enough that future GPU, Blender and asset generation workers can execute them reliably.

## 2. Authority split

```text
PRIM3 REPOSITORY
canon, mechanics, mission definitions, asset manifests
        |
        v
MCCLUSTER CONTROL PLANE
jobs, permissions, scheduling, artifact registry
        |
        v
GPU AND DCC WORKERS
asset generation, Blender automation, baking, rendering
        |
        v
VALIDATION
geometry, rig, animation, collision, performance, canon checks
        |
        v
GAME BUILD
browser tactical client plus mission content
        |
        v
DEPLOYMENT
Cloudflare delivery and Supabase state
```

Cloudflare remains the public edge.

Supabase remains the durable data and learner state authority.

The VPS and future GPU workers are production and execution infrastructure.

The repository remains the game canon and version control authority.

## 3. Core production services

The future control plane should expose bounded job families rather than unrestricted model access.

### 3.1 Asset brief compiler

Input:

1. approved character, prop or environment authority;
2. required phenotype;
3. visual reference IDs;
4. mission use case;
5. performance budget;
6. target skeleton or attachment standard.

Output:

1. versioned asset brief;
2. generation prompt package;
3. negative constraints;
4. topology and material requirements;
5. collision requirements;
6. LOD requirements;
7. review checklist.

### 3.2 3D generation worker

The future GPU worker may produce draft meshes, textures and reference renders from an approved asset brief.

Generated assets begin as `concept` or `candidate`. They never become canonical automatically.

### 3.3 Blender control worker

Blender is the normalization and digital content creation control plane.

The worker should be able to perform bounded tasks such as:

1. import source mesh;
2. apply scale and orientation standard;
3. retopologize through approved tools or scripts;
4. UV preparation;
5. material assignment;
6. rig assignment;
7. weight validation;
8. animation retargeting;
9. collision mesh generation;
10. LOD generation;
11. lightmap or bake tasks where needed;
12. GLB export;
13. thumbnail and turntable render;
14. validation report generation.

Blender supports Python automation and background execution, which makes it suitable for a future controlled worker rather than requiring a person to click through every export.

### 3.4 Animation worker

Inputs can include approved skeleton, motion reference, action class and timing constraints.

Canonical action families should include:

1. idle;
2. crouch and cover idle;
3. walk;
4. tactical run;
5. vault;
6. climb;
7. aim;
8. fire;
9. reload;
10. Overwatch posture;
11. Hunker posture;
12. hit reaction;
13. downed;
14. stabilize;
15. carry;
16. console interaction;
17. technical work;
18. extraction.

Animations must be reusable across compatible characters where possible.

### 3.5 Environment parcel worker

The tactical world should be assembled from authored parcels rather than unrestricted generated maps.

Parcel families can include:

1. office;
2. classroom;
3. server room;
4. IDF or MDF space;
5. hallway;
6. stairwell;
7. lobby;
8. loading area;
9. parking area;
10. rooftop;
11. utility room;
12. exterior service lane.

Each parcel records:

1. entry sockets;
2. nav cells;
3. cover nodes;
4. destructible objects;
5. line of sight blockers;
6. elevation connectors;
7. LAB_NODE sockets;
8. patrol sockets;
9. reinforcement sockets;
10. lighting and audio zones.

### 3.6 Build worker

The build worker resolves mission definitions against approved asset manifests and game code.

It should fail closed when required assets or mechanics are missing.

No build should silently substitute an unapproved character, weapon, prop or environment asset.

## 4. Open asset delivery standard

The preferred runtime interchange format is GLB using glTF 2.x semantics.

glTF is designed as a compact runtime delivery format and can carry meshes, materials, textures, hierarchy, skins and animations. It is therefore a strong boundary between Blender or generated source assets and the browser game client.

The repository should store source manifests and small approved artifacts. Large generated assets can live in versioned object storage with checksums referenced by the manifest.

## 5. Browser tactical client target

PlayCanvas remains the preferred current candidate for the browser first 3D client because:

1. its engine is open source and JavaScript or TypeScript native;
2. it supports WebGL 2 and WebGPU with fallback behavior;
3. it can be embedded inside an ordinary web application;
4. it supports modern PBR rendering;
5. it fits the existing McCluster browser architecture better than a heavyweight native client requirement.

This remains an implementation choice, not story canon. The mechanical contracts must remain engine independent enough to survive a renderer change.

## 6. Production artifact states

Every game asset follows:

```text
CONCEPT
CANDIDATE
TECHNICALLY_VALID
CANON_REVIEW
APPROVED_REFERENCE
GAME_READY
DEPRECATED
```

`TECHNICALLY_VALID` means the asset passes geometry and runtime checks.

`CANON_REVIEW` means technical validity is not enough. Character, wardrobe, location, branding and story continuity must still be approved.

`GAME_READY` means the asset is both technically acceptable and approved for runtime use.

## 7. Asset manifest minimum fields

Every runtime asset should eventually record:

1. asset ID;
2. asset type;
3. canon owner;
4. source authority;
5. version;
6. state;
7. source file checksum;
8. GLB checksum;
9. skeleton ID where applicable;
10. animation set ID where applicable;
11. material set;
12. collision policy;
13. LOD policy;
14. polygon budget;
15. texture budget;
16. bounding dimensions;
17. attachment sockets;
18. supported actions;
19. mission dependencies;
20. review history.

## 8. Tactical software production gates

### Gate A: headless resolver

No final art required.

Must prove:

1. grid;
2. pathing;
3. AP;
4. cover;
5. flanking;
6. LOS;
7. concealment;
8. shooting;
9. damage;
10. objective state;
11. enemy phase;
12. LAB_NODE state.

### Gate B: greybox 3D

Use primitive or temporary licensed assets.

Must prove:

1. camera;
2. character selection;
3. click or touch movement;
4. movement range preview;
5. cover visualization;
6. shooting animation placeholder;
7. enemy movement;
8. extraction;
9. LAB_NODE camera transition.

### Gate C: asset factory

Requires:

1. GPU worker;
2. Blender automation worker;
3. asset manifest registry;
4. GLB validator;
5. thumbnail and review outputs;
6. versioned object storage;
7. approval flow.

### Gate D: Training Range alpha

TR01, TR02 and TR03 become actual playable 3D missions.

### Gate E: story mission vertical slice

Build `Data Breach / Exposure` with one real technical adapter and one complete story aftermath path.

### Gate F: procedural content system

Add plot and parcel map compilation after the core tactical loop is already fun in handcrafted greybox spaces.

## 9. Backend job model

Future McCluster Core job types can include:

```text
prim3_game_asset_brief
prim3_game_asset_generate
prim3_game_blender_normalize
prim3_game_rig_validate
prim3_game_animation_retarget
prim3_game_glb_validate
prim3_game_parcel_compile
prim3_game_mission_build
prim3_game_smoke_test
prim3_game_deploy_candidate
```

Every job should use explicit capability permissions and bounded input schemas.

The control plane should not expose an unrestricted Blender Python console or shell to arbitrary external prompts.

## 10. Human approval boundaries

Automation may generate, normalize and test.

Human approval remains required for:

1. canonical character likeness;
2. final costume and branding;
3. weapon and equipment visual identity;
4. major environment identity;
5. final animation tone for signature characters;
6. story critical cinematic moments;
7. promotion from candidate to approved reference.

## 11. What we build now

Until the GPU and DCC control plane are ready, current work should concentrate on assets that survive the future pipeline:

1. machine readable mechanics;
2. mission schemas;
3. state machines;
4. character socket standards;
5. weapon classes;
6. animation action lists;
7. parcel metadata;
8. asset manifests;
9. resolver tests;
10. evidence and learning integration.

That work is not temporary. It is the specification the future production workers will execute.
