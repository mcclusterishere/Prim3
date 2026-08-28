---
status: DRAFT CHAPTER BLUEPRINT
season: 3
episode: 3
global_episode: 9
level_id: LVL-09
song: Virus Types
mission: Patient Zero
runtime_target: 9 minutes
---

# S3E3 - VIRUS TYPES

## Merge contract

This chapter preserves the locked season ending: a cohort member's concealed
mistake makes containment harder, and Jordan learns shame is an attack surface.
The owner must select the existing character; this blueprint does not name one.

## Chapter promise

Different devices show different malicious symptoms, but the institution wants
one culprit and one explanation. The player must classify, isolate, and restore
trust without turning uncertainty into a witch hunt.

## Song payload

- **Technical:** malware-family distinctions, keylogging and spyware symptoms,
  ransomware, worms, trojans, rootkits, authentication, MFA, biometrics,
  credential hygiene, and defensive testing.
- **Human:** fear, authenticity, loyalty, and the pressure to look competent
  when admitting a mistake is the safest action.
- **Visual:** devices behaving like patients with different symptoms; identity
  factors becoming a layered immune response.
- **Safety:** classification is symptom-based and defensive. No malware payload,
  credential cracking, or persistence construction is implemented.

## Nine-minute episode

### 0:00-3:00 - Music film

The song moves through a clinical-tech visual language: infected devices are
tagged by behavior, not appearance, while a recurring operator figure seems
untouchable until their own credential signal splits into conflicting copies.

### 3:00-6:00 - Human story

After Jordan's celebrated rule-breaking in `Bad Input`, everyone fears being
the person blamed for the next incident. A cohort member hides an early mistake.
Jordan initially participates in the pressure by demanding certainty before he
creates enough safety for honesty.

### 6:00-9:00 - Watch / Play mission

WATCH succeeds only after the concealed action is disclosed. PLAY requires
players to group endpoints by observed behavior, isolate without over-quarantining,
protect identity services, interview teammates, and rebuild access from trusted
states.

## Playable level contract

- **Player role:** Jordan leading a mixed technical/human containment cell.
- **Environment:** lab/device depot, quarantine bench, identity service room,
  and interview/debrief space.
- **Primary objective:** stop propagation and restore trusted access.
- **Optional objectives:** preserve business-critical devices; identify multiple
  causes; create a blame-safe disclosure path.
- **Complication:** several symptoms look alike and one hidden action distorts
  the timeline.
- **Exit state:** spread is stopped; the team's trust depends on whether truth
  was invited or extracted.

## Player verbs

Observe, classify, quarantine, compare, interview, protect identity, restore,
document.

## Graded outcomes

| Channel | Strong result | Weak but continuing result |
|---|---|---|
| Objective | Families/causes separated and contained | Broad quarantine stops spread at high cost |
| Team | Teammate discloses safely | Truth emerges through accusation or evidence |
| Exposure | Clean systems remain available | Over-isolation disrupts the whole fleet |
| Integrity | Identity and evidence are protected | Blame shortcuts replace verified facts |
| Time | Early admission shortens response | Concealment extends propagation window |

## Persistent state written by the level

The selected cohort member gains shame, debt, or trust toward Jordan based on
how disclosure occurs. Jordan carries the lesson into Season 4: systems and
people both need safe recovery paths, not merely punishment.

## Prime background trace

- **Visible trace:** after the concealed mistake creates its first identity
  anomaly, a separate high-authority viewer holds on the likely source for three
  seconds without intervening.
- **First-watch meaning:** central incident staff are still validating an
  uncertain signal.
- **Ghost payoff:** Prime knew the likely origin early and allowed a limited
  self-correction window to see whether shame would destroy the team first.

## Technology accuracy gate

- **Sensor / input:** endpoint behavior, network alerts, identity events,
  operator reports, and device history.
- **Compute / reasoning:** cluster by observed symptom and timeline; maintain
  multiple hypotheses until evidence separates them.
- **Energy / infrastructure:** lab network, endpoint fleet, identity service,
  clean recovery media, and quarantine power/network.
- **Access / authorization:** defensive endpoint and identity administration
  within the owned fleet.
- **Human decision owner:** containment lead with device owners approving
  restoration priority.
- **Failure mode:** one label is applied to every symptom, clean devices are
  trusted too early, or fear suppresses key evidence.
- **Real concept taught:** different malware behaviors require different
  containment and recovery decisions; identity compromise can outlive one device.
- **Fictional extrapolation:** stylized infection visualization only.

## Production and game assets

- Device-fleet/quarantine environment - `NEEDED`
- Symptom/timeline classification board - `NEEDED`
- Identity restoration UI - `NEEDED`
- Cohort interview and consequence scenes - `NEEDED`
- Song master/timed lyrics - `NEEDED`

## Merge hooks

- **Reads from:** S3 breach, blame, and Jordan's rewarded deviation.
- **Writes to:** S4 recovery/identity themes and a persistent cohort secret.
- **Reusable systems:** classification board, quarantine states, interview trust.
- **Owner decisions:** which existing cohort member hid the mistake and what
  non-malicious action started the chain.
