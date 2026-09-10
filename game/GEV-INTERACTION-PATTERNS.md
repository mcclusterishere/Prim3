---
status: CANON
system: Verified Seek-First / God's Eye View interaction patterns adopted into PRIM3
version: 1.0.0
source_basis: mcclusterishere/Seek-First README and implementation architecture
---

# GEV Interaction Patterns Adopted into PRIM3

This document translates interaction patterns verified in the connected `Seek-First / God's Eye View` repository into the fictional PRIM3 tactical command interface.

It does **not** make the campaign dependent on live-world data. PRIM3 missions remain authored/simulated.

## 1. Contact roster -> Tactical Contacts

GEV can maintain a nearby-contact roster and let the operator jump among tracked entities.

PRIM3 adopts this as a contextual **TACTICAL CONTACTS** rail containing only entities the team has actually Detected/Corroborated/Verified:
- squad members;
- confirmed threats;
- suspected contacts;
- civilians requiring action;
- critical infrastructure nodes;
- moving mission assets.

Selecting a contact focuses the map and opens its provenance/state card. Hidden contacts never appear merely because the UI supports a roster.

## 2. Click-to-track -> Pin / Follow

Any known moving entity or changing infrastructure state can be pinned.

Examples:
- follow a hostile Retriever through known observations;
- follow a moving civilian group;
- pin a degrading service dependency;
- pin an AP/source while RF coverage changes;
- follow an evidence object's custody chain.

Tracking does not create new information; it makes already-earned updates easier to follow.

## 3. Detection overlay -> Confidence overlay

GEV's visual detection treatment becomes a PRIM3 **confidence-aware detection overlay**.

Visual language must distinguish:
- Detected;
- Inferred;
- Corroborated;
- Verified;
- Stale;
- Contradicted;
- Compromised.

A clean bounding box or icon may never imply certainty the team has not earned.

## 4. Global Context -> Operational Context

The player can pull outward from Tactical View to Area/Operational View without losing selected entity, active layers or mission context.

This supports:
- reinforcement routes;
- WAN/cloud dependencies;
- extraction paths;
- weather/environment;
- remote sites;
- multi-region service state;
- later-season global operations.

Returning to Tactical View restores the previous camera/selection state so global context is a temporary analytic lens, not a reset.

## 5. Sensor looks -> Mission sensor modes

Where justified by equipment and mission context, the same tactical scene may be rendered through sensor/analytic modes such as:
- normal visual;
- low-light/NVG-style;
- thermal/heat visualization;
- RF heatmap;
- network topology overlay;
- power dependency overlay;
- evidence/provenance overlay.

Sensor modes may reveal only what the underlying role/equipment/state can legitimately observe.

## 6. Voice whiteboard -> Command annotations

PRIM3 adopts persistent tactical annotation tools:
- mark location;
- draw route;
- outline control zone;
- connect two entities;
- label suspected dependency;
- flag contradiction;
- attach a note to an evidence object.

Annotations are player hypotheses/notes unless later corroborated. The UI must visually distinguish a player's mark from verified system truth.

Voice input may be added as an accessibility/command convenience, but no voice command may bypass AP, authorization or knowledge-state rules.

## 7. Entity Q&A -> Ask PRIM3

A selected entity/node may support a constrained natural-language assistant that answers from the **currently earned mission picture**.

Good queries:
- “What do we actually know about this AP?”
- “Which verified services depend on this rack?”
- “Why is this route marked unsafe?”
- “Which source contradicts this identity?”
- “What changed since last round?”

The assistant may summarize, filter and explain known state. It may not reveal hidden mission truth or solve an unperformed technical lab by accessing author-only state.

## 8. HUD summary -> Commander's Readout

The HUD may generate a terse current-state summary from earned information, e.g.:

```text
SERVICE DEGRADED / WEST IDF CONTESTED / RF SOURCE UNVERIFIED
```

The readout must include uncertainty when uncertainty matters.

## 9. Share links / serialized view -> Debrief State Links

GEV can preserve view/layer/target state in a shareable handoff. PRIM3 adopts this primarily for replay/debrief:

A debrief link/bookmark may encode:
- mission + round/event timestamp;
- camera position;
- selected known entity;
- active layers;
- knowledge state visible at that moment.

It must not encode secret author-state or unlock information the recipient/player had not earned.

This lets an instructor/player jump directly back to “the moment you treated Inferred as Verified” or “the round you lost the evidence-room Control zone.”

## 10. Scene director -> After-action cinematic reconstruction

The tactical event log can drive short camera reconstructions after a mission:
- decisive flank;
- evidence save/loss;
- service failover;
- operator rescue;
- incorrect assumption becoming visible;
- final verification.

This creates cinematic payoff from the player's actual decisions rather than replaying only a fixed cutscene.

## 11. Modular layers -> Mission-specific layer manifests

GEV treats data sources/layers as modules. PRIM3 adopts the same modular architecture.

Each mission YAML should declare:
- available layer modules;
- initially known layer state;
- unlock producers/actions;
- dependencies among layers;
- whether a layer can become stale/compromised;
- which role can validate it;
- which UI treatment represents it.

Do not load every campaign layer into every mission.

## 12. Prime progression payoff

Early missions should feel information-poor even when the UI is visually sophisticated.

As the learner progresses, more layer relationships become interpretable. By Site 0, the player can fuse physical, threat, RF, network, identity, service, power, evidence and mission state with minimal tutorial assistance.

The final revelation is that Prime's historic advantage was not supernatural vision. Prime had cross-compartment access to more layers, earlier, than the people being directed through them.

Jordan's succession therefore changes not just who controls the UI but the governance of the information behind it.
