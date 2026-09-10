---
status: CANON
system: Post-game PRIM3 Mantle entitlement / real-world HALO companion
version: 1.1.0
review_date: 2026-09-10
branch: main
---

# PRIM3 Mantle Ascension — Real-World Unlock

## Naming correction

This filename is retained for compatibility. In current story canon, Jordan does not become a generic `Prime-N1` rank.

Jordan's endgame identity is **PRIM3**, the next holder of the **Primary Root Identity Mantle** after PRIM2.

`Prime` may still appear in older product/UI language or as an audience-facing shorthand where deliberately retained, but it must not overwrite the locked `PRIM0 -> PRIM1 -> PRIM2 -> PRIM3` succession model.

## Product law

Completing PRIM3's succession arc may unlock an authenticated real-world companion built from the separately hosted `Hitman's Halo` system.

The narrative/product fantasy is:

> **Learn to see the system through the ensemble. Survive the succession. Earn PRIM3/Mantle access. Then receive the bounded real-world public-data operating picture.**

The real-world application is not required to run the game and the game does not depend on live-world public feeds.

## Entitlement

A completion service may write server-side state such as:

```text
mantle_status = PRIM3_ASCENDED
halo_access = true
```

Exact implementation field names are product details, not story canon.

The entitlement must be associated with an authenticated account and verified server-side on protected HALO sessions.

Do not treat a client-side completion flag, localStorage value, hidden URL or editable save file as sufficient authorization.

## Access classes

### OWNER / ADMIN
Private development/testing access where authorized.

### PRIM3 / ASCENDED PLAYER
Consumer HALO access after the required completion/mastery condition.

### NON-ASCENDED PLAYER
May see locked previews, fictional/simulated mission layers and explanation of the post-game capability without receiving protected real-world access.

## Security boundary

The unlock grants application access, not provider credentials.

Shared server-side secrets remain behind authenticated backend/gateway controls with rate limits, auditability and provider quotas. Browser-visible public tokens, where technically required, must be appropriately restricted.

## Privacy / responsible-use boundary

The companion operates on public or explicitly authorized data sources and must preserve provenance, confidence and freshness. It must not present inference as verified intelligence.

Product design should favor legitimate infrastructure, mobility, environmental, aviation, maritime, satellite, facility and situational-awareness layers rather than features designed to stalk, deanonymize or target private individuals.

## Continuity payoff

PRIM2's power came partly from fusing information across compartments with insufficient accountability.

Jordan's PRIM3 succession asks whether the same capability can be governed differently: auditable, bounded and human-owned rather than privately absolute.

The companion should therefore expose:
- data provenance;
- freshness;
- confidence/uncertainty;
- provider attribution;
- user/session identity;
- layer-level entitlements;
- auditability of privileged actions.

## Gameplay relationship

Wildcard/Apex intervention use does **not** itself unlock this entitlement.

Calling Jordan or PRIM2 during the campaign is part of tactical play. The post-game entitlement is tied to the actual succession/completion/mastery condition.

This distinction matters because PRIM2 appearing as a rescue unit must not imply that the player has already inherited the Mantle.

## Implementation contract

Recommended flow:

```text
PRIM3 ACCOUNT
  -> campaign / mastery service
  -> succession completion event
  -> entitlement service
  -> PRIM3_ACCESS claim
  -> authenticated HALO gateway
  -> hosted HALO UI
  -> server-side provider/proxy services
```

HALO should verify a short-lived server-issued session/entitlement token rather than directly trusting game save state.

## Release sequence

1. Owner/admin private hosted HALO.
2. PRIM3 game uses authored earned-omniscience mission interfaces.
3. Shared identity/entitlement backend connects succession completion to access.
4. PRIM3/Mantle-earned HALO beta.
5. Broader post-game release with quotas, observability, abuse controls and provider-term review.
