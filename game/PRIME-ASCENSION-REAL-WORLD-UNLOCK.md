---
status: CANON
system: Post-game Prime entitlement / real-world GEV companion
version: 1.0.0
review_date: 2026-09-10
---

# PRIM3 Prime Ascension — Real-World Unlock

## Product law

Completing PRIM3's succession arc may unlock an authenticated real-world companion built from the separately hosted `Seek-First / God's Eye View` system.

The narrative/product fantasy is:

> **Learn to see the system in the game. Become Prime. Then receive access to the real-world public-data operating picture.**

The real-world application is not required to run the game and the game does not depend on live-world public feeds.

## Entitlement

PRIM3 completion writes a server-side entitlement such as:

```text
prime_status = ASCENDED
gev_access = true
```

The entitlement is associated with an authenticated account and verified by the backend on every protected GEV session.

Do not treat a client-side completion flag, localStorage value, hidden URL or game save file as sufficient authorization.

## Access classes

### OWNER / ADMIN
May receive private access before the public game launches for development, testing and real-world operational use consistent with public-source/provider terms.

### PRIME / ASCENDED PLAYER
Receives the consumer real-world GEV workspace only after the required completion/mastery condition is satisfied.

### NON-PRIME PLAYER
May see locked previews, fictional/simulated mission layers and explanation of what Prime access means, but does not receive the protected real-world workspace.

## Security boundary

The unlock grants application access, not provider credentials.

Players must never receive shared server-side secrets such as OpenAI, AISStream or OpenSky OAuth credentials. Cost-bearing/private provider access remains behind the authenticated backend/gateway with rate limits, audit logs and provider-side quotas.

Any deliberately browser-visible public tokens (for example restricted Google/Cesium browser tokens where the upstream application requires them) must use strict domain/API/asset restrictions.

## Privacy / responsible-use boundary

The companion operates on public or explicitly authorized data sources and must preserve source provenance, confidence and freshness. It must not represent inference as verified intelligence.

Product design should favor infrastructure, mobility, environmental, aviation, maritime, satellite, facility and other legitimate situational-awareness layers rather than features whose purpose is to identify, stalk or deanonymize private individuals.

## Continuity payoff

The unlock is the real product analogue of the final story lesson.

Prime's power came from fused information across layers. Jordan's succession changes the governance of that power: access must become auditable, bounded and earned rather than privately absolute.

The real-world companion should therefore expose:
- data provenance;
- freshness;
- confidence/uncertainty;
- provider attribution;
- user/session identity;
- layer-level entitlements;
- auditability of privileged actions.

## Implementation contract

Recommended flow:

```text
PRIM3 ACCOUNT
  -> campaign / mastery service
  -> succession completion event
  -> entitlement service
  -> PRIME_ACCESS claim
  -> authenticated GEV gateway
  -> hosted GEV UI
  -> server-side provider/proxy services
```

The GEV application should verify a short-lived server-issued session/entitlement token rather than querying game save state directly.

## Release sequence

1. Owner/admin private hosted GEV.
2. PRIM3 game uses authored earned-omniscience interface.
3. Shared identity/entitlement backend connects campaign completion to access.
4. Prime-only GEV beta.
5. Broader post-game release with quotas, observability, abuse controls and provider-term review.
