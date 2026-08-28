---
status: PROPOSED EPISODE DRAFT
series: PRIM3
season: 1
episode: 1
global_episode: 1
level_id: LVL-01
song: High Alert
mission: The Blip
working_title: The Blip
runtime_target: 9 minutes
format: Music Film -> Human Story -> Watch/Play Mission
continuity_version: 0.4.3
---

# S01E01 — The Blip

## Episode purpose

Introduce Presiding Prime as the hidden authority at the end of Jordan's path,
then introduce Jordan as a person whom ordinary systems have misclassified.

The **High Alert** music film begins in the middle of S7E1's final RAID, then
rewinds seven years to the ordinary anomaly that first places 33-year-old
Jordan on Presiding Prime's screen.

The locked mission spine is **The Blip**: Jordan safely interprets a pattern of
low-level alerts before anyone else agrees it matters. The removal-contract
material below is a proposed human-story explanation for that blip, not a
replacement for the mission and not foundation canon until owner approval.

## 0:00-3:00 — High Alert / the future

Inside Site 0, Presiding Prime / Prime-00 receives confirmation that two
separate assault elements have entered the larger fight around his facility.
Jordan is approaching through the Prim3 side of the architecture. Benji is
approaching from the Hitman side, although the opening does not explain that
second lane.

Prime performs **High Alert** as a diss record, threat assessment and memory
weapon aimed at the people who have come to reach, defeat and replace him.
Seventeen selected bars trigger 1-4 second memory fragments from global
Episodes 02-18. The fragments are deliberately illegible on first viewing and
become complete scenes when those episodes arrive.

Do not show which raiders survive, Jordan and Benji's near-fight, their alliance
or Prime's defeat. S7E1 returns to this exact moment after the chronology catches
up. Use the locked bar-to-scene map in
[`story/HIGH-ALERT-MEMORY-ANCHORS.md`](../story/HIGH-ALERT-MEMORY-ANCHORS.md).

Prime's physical-defense state activates: the M-architecture helmet, visible
forehead camera, smoked visor and red `//` bars belong to **Presiding Prime in
this opening**, not future Jordan.

Prime genuinely resists both assault elements even though succession requires a
worthy replacement to survive that resistance.

Cut before the confrontation.

**TITLE: PRIM3**

**SUPER: SEVEN YEARS EARLIER**

## First-watch information limit

The audience may not yet understand Prime's succession law, Benji's identity or
why Prime knows the seventeen memories. It must not be falsely implied that the
performer is future Jordan. Later episodes reinterpret the opening by revealing
the dual board and the exact events behind each memory.

## 3:00-6:00 — Human story / the blip

Seven years earlier, Jordan arrives at college broke, recently homeless and
older than most of his classmates. At a campus/corporate recruiting event, a
sequence of low-level alerts is dismissed as ordinary noise. Jordan notices a
pattern, protects someone else before himself and preserves the detail that
makes Presiding Prime request his intake.

The West Haven thread below can supply the private reason Prime's systems were
already watching Jordan, but it remains a **proposed source thread requiring
owner review**. It must not turn Jordan into a finished action hero before his
seven-year development begins.

## 6:00-9:00 — Watch/play mission / The Blip

**Objective:** clear civilians from the uncertain hazard, distinguish useful
alerts from noise, preserve evidence and communicate uncertainty without
causing panic.

**Player verbs:** observe, compare, route, preserve, report, request help.

**Stable story checkpoint:** Jordan preserves the anomaly that causes Prime to
reclassify him as worth watching. Grades may change exposure, evidence quality,
civilian trust, injury and debrief tone; they do not erase his recruitment.

**Five graded outcomes:** Objective, Team, Exposure, Integrity and Time.

**Technical boundary:** teach alert triage, provenance, incomplete logs, chain
of custody and human judgment. Do not turn the scene into an intrusion recipe.

### Playable level contract

- **Player role:** Jordan before formal McCluster recruitment.
- **Environment:** campus/corporate recruiting event, public approach routes,
  event floor and a small security coordination point.
- **Entry state:** several individually ordinary alerts are being dismissed.
- **Primary loop:** observe -> compare -> route -> preserve -> report.
- **Primary objective:** protect people and preserve the anomaly that explains
  why the alerts belong to one event.
- **Optional objectives:** reduce panic, keep an accessible exit open and record
  uncertainty instead of overstating a theory.
- **Complication:** acting too aggressively creates panic; waiting for certainty
  leaves people in the affected area and allows volatile evidence to disappear.
- **Exit state:** the event stabilizes and Prime requests Jordan's intake.

### Persistent state written by the level

Write Jordan's first evidence-quality, civilian-trust and exposure grades. Set
`prime_watch_candidate = true`. Preserve whether Aya or another future cohort
member witnesses Jordan protect someone else before himself.

### Prime background trace

- **Visible trace:** after Jordan preserves the decisive alert, an otherwise
  hidden supervisor pane opens for one beat with the red `//` approval glyph
  and `REQUEST INTAKE`; Presiding Prime says, “Bring me the intake.”
- **First-watch meaning:** a senior corporate/security reviewer noticed an
  unusual civilian response.
- **Ghost payoff:** Prime personally watched Jordan's first useful decision and
  initiated the recruitment path seven years before the RAID.

### Technology accuracy gate

- **Sensor / input:** ordinary access alarms, staff reports, timestamps,
  environmental indicators and Jordan's direct observations.
- **Compute / reasoning:** human correlation of low-confidence alerts; no system
  presents a magically certain answer.
- **Energy / infrastructure:** event power, communications, access-control and
  emergency-egress systems.
- **Access / authorization:** Jordan has civilian access only and must request
  security or emergency actions from the responsible operator.
- **Human decision owner:** event safety lead / incident commander.
- **Failure mode:** panic, blocked egress, ignored hazard, destroyed evidence or
  false certainty.
- **Real concept taught:** weak signals can become meaningful when their timing,
  provenance and shared context are compared.
- **Fictional extrapolation:** Prime's hidden global review layer.

### Production and game assets

- High Alert track and seventeen-memory edit map - `EXISTS`
- Site 0 RAID opening environment - `PARTIAL`; reuse the current geometry proof
  only after a production art/LOD pass
- recruiting-event environment and civilian route graph - `NEEDED`
- alert/evidence comparison UI - `NEEDED`
- Jordan, Prime-00, background raiders and civilians - `NEEDED`
- watch/play transition, score card, voice, SFX and cinematic assembly - `NEEDED`

### Merge hooks

- **Reads from:** `CANON.md`, the High Alert memory map and Jordan's locked age,
  material-instability and practical-experience anchors.
- **Writes to:** Jordan's candidate flag, the S1E2 intake path and all seventeen
  future memory payoffs.
- **Reusable systems:** alert correlation, civilian routing, evidence custody,
  five-channel grade card and future-memory cinematic cuts.
- **Owner decisions:** whether the West Haven source thread remains in S1E1,
  what caused the campus alerts and who first witnesses Jordan's choice.

---

## Proposed human-story source thread — West Haven

## Act I — ordinary power

The presiding Prime begins an apparently normal morning inside the corporation's operational base.

Recruitment sends him large volumes of candidate data, government referrals, contract summaries, risk classifications and mission outcomes. Most material is filtered by systems before reaching him. Prime reviews the anomalies, edge cases and decisions that require human authority.

This sequence establishes that he is:

- A technological savant
- The final operational authority
- Feared without needing to raise his voice
- Involved in both global emergencies and seemingly insignificant contracts
- Capable of moving between technical, strategic and human problems almost instantly

### Base business around the contract

While the low-level matter develops, Prime continues his day:

- Reviews the return status of an older cohort
- Detects an infrastructure problem before engineering reports it
- Corrects a mission model whose confidence score hides bad assumptions
- Briefs a team he may accompany on a future low-survival operation
- Quietly checks the health/status of surviving members of his original cohort
- Rejects a high-level recommendation because its evidence chain is incomplete
- Reviews new recruitment candidates without revealing what they are being recruited for

The West Haven matter should occupy at least one-sixth of the episode, but it must initially feel beneath Prime's attention.

## The blip

A low-priority contract appears while Prime scrubs recruitment and operational data.

### Contract surface

- Jurisdiction: West Haven, Connecticut
- Classification: low-level removal / silence contract
- Government client: withheld inside the first episode
- Visible rationale: an individual has become disruptive, persistent and administratively costly
- Buried rationale: the individual has asked too many questions about a suspected relationship between police authority and organized criminal interests
- Expected difficulty: negligible
- Assigned response: one field operative
- Expected closure: before the next routine brief

Prime gives the assignment minimal attention. The target does not initially appear important enough to recruit, monitor personally or escalate.

He authorizes the ordinary response and continues his morning.

## The failed contract

At a late-morning or lunch briefing, the contract returns as an exception.

The assigned operative has disappeared.

No normal closure signal.  
No usable explanation.  
No target in custody.  
No confirmed target death.  
No clean telemetry showing what happened.

A contract at this level should not fail.

Prime is not angry.

He is interested.

His response should be quiet:

> “Bring me the intake.”

## Reclassification sequence

Prime personally reconstructs the target's history.

At first, the corporation's systems describe the individual as a nuisance, unstable complainant or low-value civilian problem. Prime distrusts the labels and reads the underlying chronology.

He finds:

- Years of practical IT, infrastructure and data-center experience
- Experience deploying and maintaining substantial server infrastructure
- Technical knowledge without the completed degree that formally validates it
- A pattern of public-records requests, preservation demands and evidence tracking
- Persistent attempts to force institutions to answer documented questions
- Active homelessness and severe financial instability
- Repeated institutional rejection without permanent withdrawal
- College enrollment at 33
- An unusual ability to recognize procedural and information inconsistencies
- Survival behavior that does not match the target's official risk classification

The important discovery is not that the individual is already stronger than Prime.

It is that the individual refuses to disappear when systems classify him as disposable.

## What happened to the operative

The episode does not reveal the complete answer.

The protagonist should not be shown casually overpowering or executing an elite operative. At 33, his advantage is detection, improvisation, information discipline and survival—not finished superhuman competence.

Possible evidence visible to Prime:

- The protagonist noticed surveillance earlier than predicted.
- The operative's identity or route was exposed.
- A communication channel was redirected or deliberately contaminated.
- The last telemetry indicates the operative followed the target's information rather than the target's body.
- The protagonist may not know the full nature of the person sent after him.
- The operative may still be alive.

The unanswered disappearance becomes the first mystery of Season One.

## Prime's decision

Prime changes the file classification:

`TARGET` → `ANOMALY` → `CANDIDATE`

He does not contact the protagonist directly.

He instructs recruitment to create a legitimate path through the college and corporation. The opportunity must appear earned and ordinary.

Prime's interest is not charity. It is recognition.

He sees something the original contract missed:

> Intelligence can be recruited. Tenacity has to be discovered.

## Protagonist introduction

Only after Prime has reconstructed the target through hostile institutional data do we meet the actual person.

He is not introduced as a dangerous legend.

He is a 33-year-old first-year college student trying to make it through an ordinary day while broke, recently homeless and surrounded by younger classmates.

The contrast is essential:

- Prime's file makes him look dangerous.
- His material reality makes him look exhausted.
- His continued movement makes both descriptions true.

## Episode ending

The protagonist receives or discovers an opening connected to the corporation.

It does not look like recruitment into a hidden global organization. It looks like the first real opportunity he has seen in a long time.

Elsewhere, Prime watches the application pathway activate.

He closes the failed-contract file but preserves the operative's disappearance as an unresolved thread.

Final screen state:

`COHORT INTAKE — CANDIDATE ADDED`

## Infotainment concepts

Technical education must arise from the investigation and not interrupt the thriller.

Potential Episode One concepts:

- Data classification versus source evidence
- Metadata and chain of custody
- Logs as incomplete records rather than absolute truth
- False positives and false confidence
- Access controls and compartmentalization
- How institutional labels distort technical analysis
- The difference between deleting data and preserving verifiable evidence
- Incident triage: why a low-priority anomaly can reveal a systemic threat
- Human judgment in automated decision systems

## Real-world foundation and fiction boundary

The emotional and documentary foundation may draw from McCluster's real experiences involving homelessness, West Haven public-records requests, requests for electronic police records/body-camera material, preservation demands, complaint procedures and disputes over access.

Documented anchors currently identified for later research include Connecticut FOI complaint dockets FIC 2026-0107 and FIC 2026-0268, plus correspondence showing that competing interpretations existed and that formal complaint processes were pursued.

The police/organized-crime nexus, removal contract, government client and operative disappearance are fictional story elements unless independently established by reliable evidence.

Do not publish private addresses, medical information, unredacted records or names of real people as story evidence without a separate privacy and substantiation review.

## Canon questions still open

- What does “silence” operationally mean in the original order?
- Is the missing operative alive, dead, defected or embedded elsewhere?
- Did the protagonist intentionally defeat the operation or survive it without understanding its scale?
- What corporation cover department receives him?
- How much does the recruitment team know about Prime's true reason for selecting him?
- Which real-world records can be safely adapted, redacted or fictionalized?
- Does the West Haven removal-contract thread remain in this episode, move to a
  later chapter or become a separate fictionalized story line?
