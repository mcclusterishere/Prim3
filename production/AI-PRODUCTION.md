# AI-Assisted Production Pipeline

**Status:** PROPOSED

PRIM3 will be produced through controlled AI-assisted photography, image animation, voice, sound and editorial assembly. AI is a production instrument; the repository remains the continuity authority.

## One-character-at-a-time workflow

1. Approve the character's story function.
2. Lock biography and season state.
3. Write the visual brief.
4. Produce neutral reference views.
5. Approve face, body, hair, wardrobe and distinctive marks separately.
6. Build a versioned character reference pack.
7. Test the character under three lighting and emotion conditions.
8. Lock an approved reference ID.
9. Generate scenes only from approved references.
10. Record every approved change in the character file.

## Asset states

- `concept` — exploration only
- `candidate` — under review
- `approved-reference` — required continuity input
- `final-frame` — approved for episode use
- `deprecated` — retained for history, not reuse

## Suggested asset tree

```text
assets/
  canon/
    characters/
    symbols/
    locations/
  concepts/
  episodes/
    s01/
      eXX/
        stills/
        motion/
        audio/
        exports/
```

Large generated media should use Git LFS or external versioned storage; the repository should retain manifests, prompts, checksums, thumbnails and final editorial decisions.

## Shot manifest fields

Every produced shot should record:

- Shot ID
- Season / episode / scene
- Character reference IDs
- Canon date and character ages
- Prompt and negative constraints
- Source images
- Generation model and settings
- Lens, framing and movement
- Lighting and color state
- Dialogue/audio source
- Continuity notes
- Approval state
- Output checksum

## Animation rule

Do not animate an attractive still until it passes character and continuity review. Motion magnifies visual inconsistency.

## Educational review

Before an episode is final:

- Identify the concepts taught.
- Verify technical claims against authoritative sources.
- Separate reality from fictional extrapolation.
- Confirm the lesson is necessary to the conflict.
- Confirm the solution does not become dangerous procedural instruction.
