#!/usr/bin/env python3
"""Apply the owner decisions of 2026-11-03 to the v1 matrix (stdlib only, idempotent).

    python3 -I data/attributes/v1/tools/apply_decisions.py data/attributes/v1
    python3 -I data/attributes/v1/tools/apply_decisions.py data/attributes/v1 --table   # print the sizes table

Pipeline: build_from_release.py reproduces the release exactly (catalog hash = release QA hash);
this script then applies DECISIONS-2026-11-03.md to catalog.json and the files derived from it
(entities, attributes, relationships, fields, issues, sources, the sheet views' status column),
records the result in manifest.json under "decisions" and rewrites SHA256SUMS. The workbook in
source/ stays the as-supplied record. Running it twice changes nothing.
"""
import hashlib, json, os, sys
from collections import Counter

DOC = "DECISIONS-2026-11-03.md"
SRC_ID = "src.d3c1520261103a"
RELEASE_CATALOG_SHA256 = "7331ba19d6685e3d9ac02b1efb5a47c4b791f0ff5de35b0616ca6b18d88008a3"
OWNER_QUOTE = ("Owner 2026-11-03: \"I want you to make up an answer for the matrix in number two, country "
               "badges. On screen only, I guess, whatever your recommendation is, and for equipment, real "
               "world sizes, you should propose something.\"")
ACCEPT_QUOTE = "Owner 2026-11-03: \"I accept your proposals.\""
GRID_QUOTE = "Owner 2026-11-03: \"instead of 1.6, make it like 3.54\""
TILE_M = 3.54
LIME = "#8BD346"

# ---- §4 real-world sizes (OWNER-APPROVED 2026-11-03: "I accept your proposals"). L >= W >= H: the three bounding extents, longest first. ----
# (row id, name, size class, [matrix record ids], [level-1 draft ids], L, W, H metres, mass kg)
SIZES = [
    ("compact-carbine", "Compact carbine (entry)", "short-barrel carbine, stock extended (0.62 m collapsed)",
     ["equipment.primary_e", "asset.equipment.e-compact-carbine"], ["E01"], 0.70, 0.24, 0.07, 3.0),
    ("technical-carbine", "Technical carbine (T level-2 main arm)", "carbine, stock extended",
     [], ["T01"], 0.76, 0.23, 0.07, 3.1),
    ("precision-carbine", "Precision carbine", "carbine with magnified optic",
     [], ["R01"], 0.84, 0.25, 0.07, 3.8),
    ("overwatch-rifle", "Overwatch / designated marksman rifle", "marksman rifle with optic, no bipod",
     ["equipment.primary_r_optic", "asset.equipment.r-overwatch-rifle"], [], 1.00, 0.27, 0.08, 4.8),
    ("service-sidearm", "Service sidearm", "compact service pistol, loaded",
     ["equipment.pistol_service_compact", "asset.equipment.service-sidearm"], ["R02"], 0.19, 0.135, 0.035, 0.85),
    ("backup-pistol", "Compact backup pistol", "subcompact pistol, loaded",
     [], ["E02", "T02"], 0.165, 0.115, 0.03, 0.70),
    ("retention-holster", "Retention holster", "belt holster for the service sidearm",
     ["equipment.holster_retention", "asset.equipment.retention-holster"], [], 0.24, 0.09, 0.06, 0.35),
    ("plate-carrier", "Soft-mid plate carrier (front panel)", "carrier with soft panels; fit to rig",
     ["equipment.carrier_e"], [], 0.32, 0.28, 0.04, 3.6),
    ("entry-armor", "Reinforced entry armor", "carrier with thin hard plates; fit to rig",
     [], ["E05"], 0.33, 0.28, 0.06, 7.2),
    ("hard-plates", "Thin front/back plates (pair)", "two thin hard plates",
     ["equipment.thin_hard_plates"], [], 0.30, 0.24, 0.022, 2.8),
    ("light-armor", "Light soft armor (no plate)", "soft torso vest; fit to rig",
     ["equipment.armor_r_light"], ["R05"], 0.32, 0.27, 0.025, 2.2),
    ("thin-soft-armor", "Thin soft / insulated technical armor", "thin soft torso vest; fit to rig",
     ["equipment.armor_soft_torso_thin"], ["T05"], 0.32, 0.27, 0.025, 2.3),
    ("field-helmet", "Field helmet (generic; no record yet)", "high-cut protective helmet",
     [], [], 0.27, 0.22, 0.18, 1.4),
    ("team-radio", "Team radio", "handheld radio with stub antenna",
     ["equipment.team_radio", "asset.equipment.team-radio"], [], 0.22, 0.065, 0.04, 0.40),
    ("in-ear", "Radio in-ear piece", "in-ear earpiece",
     ["equipment.radio_inear"], [], 0.03, 0.02, 0.02, 0.01),
    ("comms-headset", "Comms headset", "over-ear electronic hearing protection",
     ["asset.equipment.comms-headset"], [], 0.20, 0.19, 0.10, 0.35),
    ("low-profile-headset", "Low-profile headset", "single-band low-profile headset",
     ["equipment.headset_low_profile"], [], 0.17, 0.15, 0.05, 0.12),
    ("body-camera", "Body camera", "chest-mounted recorder",
     ["equipment.body_recorder", "asset.equipment.body-camera"], [], 0.085, 0.055, 0.03, 0.14),
    ("binoculars", "Compact binoculars", "compact binocular (canon 120 x 110 x 45 mm)",
     ["equipment.compact_binoculars", "asset.equipment.compact-binoculars"], [], 0.12, 0.11, 0.045, 0.35),
    ("observation-optic", "Observation optic", "compact spotting scope",
     [], ["R06"], 0.30, 0.09, 0.08, 1.1),
    ("cyberdeck", "Field cyberdeck (standard)", "rugged laptop, closed",
     ["equipment.deck_standard", "asset.equipment.field-cyberdeck"], [], 0.32, 0.22, 0.045, 2.6),
    ("cyberdeck-hardened", "Field cyberdeck (hardened)", "rugged laptop, closed, lower emission",
     ["equipment.deck_hardened"], [], 0.32, 0.22, 0.047, 2.9),
    ("cyberdeck-lite", "Field cyberdeck (lite)", "pocket compute unit with clip",
     ["equipment.deck_lite"], [], 0.14, 0.08, 0.022, 0.35),
    ("control-slate", "T control slate", "rugged tablet",
     [], ["T03"], 0.28, 0.19, 0.025, 1.3),
    ("micro-drone", "Micro quad drone", "folded (0.18 m motor-to-motor open), sub-250 g class",
     ["equipment.micro_uav"], [], 0.16, 0.08, 0.05, 0.249),
    ("interface-kit", "Interface kit", "cable and adapter roll pouch",
     ["equipment.iface_primary", "asset.equipment.interface-kit"], [], 0.24, 0.18, 0.05, 0.6),
    ("interface-kit-extended", "Interface kit (extended)", "larger cable and adapter roll pouch",
     ["equipment.iface_extended"], [], 0.26, 0.20, 0.06, 0.9),
    ("write-block", "Write-block bridge", "inline hardware write blocker",
     ["equipment.writeblock", "asset.equipment.write-block-bridge"], [], 0.075, 0.04, 0.018, 0.12),
    ("offline-store", "Offline store (standard)", "removable storage cartridge",
     ["equipment.store_standard", "asset.equipment.offline-storage"], [], 0.08, 0.055, 0.012, 0.06),
    ("offline-store-dual", "Offline store (dual)", "redundant cartridge pair",
     ["equipment.store_dual"], [], 0.128, 0.079, 0.015, 0.15),
    ("offline-store-pocket", "Offline store (pocket)", "pocket flash storage",
     ["equipment.store_pocket"], [], 0.06, 0.02, 0.009, 0.01),
    ("integrity-dongle", "Integrity dongle", "hash/crypto helper key",
     ["equipment.integrity_dongle"], [], 0.052, 0.018, 0.008, 0.012),
    ("isolation-sleeve", "Isolation sleeve", "shielded pouch with inline filter puck",
     ["equipment.isolation_sleeve"], [], 0.20, 0.12, 0.03, 0.20),
    ("rf-sense", "RF sense brick", "USB radio dongle with antenna stub (canon ~95 mm, ~40 g)",
     ["equipment.rf_sense_brick"], [], 0.095, 0.028, 0.014, 0.04),
    ("spare-power", "Spare power", "battery pack",
     ["equipment.spare_power", "asset.equipment.spare-power"], [], 0.14, 0.09, 0.04, 0.45),
    ("sync-pulse-puck", "Sync Pulse puck", "thrown disc emitter",
     [], ["T04"], 0.09, 0.09, 0.035, 0.25),
    ("smoke-capsule", "Smoke capsule", "hand-thrown smoke canister",
     [], ["E04"], 0.15, 0.064, 0.064, 0.45),
    ("sensor-beacon", "Sensor beacon / throwable sensor", "thrown sensor",
     ["equipment.throwable_sensor"], ["R04"], 0.10, 0.07, 0.07, 0.20),
    ("entry-tool", "Entry tool + sheath", "compact pry tool",
     ["asset.equipment.entry-tool"], [], 0.36, 0.12, 0.03, 0.9),
    ("breach-kit", "Blunt breach kit", "forcible-entry bar",
     ["equipment.breach_tools"], ["E03"], 0.76, 0.18, 0.08, 4.1),
    ("evidence-scanner", "Evidence scanner", "handheld scanner",
     [], ["R03"], 0.18, 0.08, 0.04, 0.45),
    ("repair-module", "Repair module", "small tool case",
     [], ["T06"], 0.20, 0.12, 0.06, 0.8),
    ("rescue-pack", "Rescue harness pack", "compact carried pack",
     [], ["E06"], 0.30, 0.22, 0.12, 1.8),
    ("medical-pouch", "Medical pouch", "individual first-aid pouch, filled (canon 150 x 100 x 60 mm)",
     ["equipment.medical_pouch", "asset.equipment.medical-pouch"], [], 0.15, 0.10, 0.06, 0.45),
    ("access-pouch", "Access-tool pouch", "small tool pouch, filled",
     ["asset.equipment.access-pouch"], [], 0.16, 0.10, 0.05, 0.25),
    ("optics-pouch", "Optics pouch", "binocular pouch, empty",
     ["equipment.optics_pouch", "asset.equipment.optics-pouch"], [], 0.17, 0.15, 0.11, 0.15),
    ("rifle-sling", "Field sling", "two-point sling laid flat",
     ["equipment.rifle_sling", "asset.equipment.rifle-sling"], [], 1.40, 0.032, 0.004, 0.18),
    ("deck-sling", "Deck sling", "carry strap for the cyberdeck laid flat",
     ["equipment.sling_deck"], [], 1.30, 0.038, 0.004, 0.15),
    ("utility-belt", "Field utility belt", "belt laid flat",
     ["equipment.utility_belt"], [], 1.10, 0.045, 0.01, 0.45),
    ("knee-pad", "Knee pad (single)", "strap-on knee pad",
     ["equipment.pad_knee_single"], [], 0.22, 0.13, 0.05, 0.25),
]

NEW_FIELDS = [
    ("item.size_m", "Real-world size", "object", "m", ["equipment", "weapon"],
     "Real-world bounding extents {L, W, H} in metres, longest first (owner-approved, DECISIONS-2026-11-03.md §4)."),
    ("asset.target_size_m", "Target real-world size", "object", "m", ["visual_asset"],
     "Size the GLB is normalized to: uniform scale so its longest bounding extent equals L (DECISIONS-2026-11-03.md §4)."),
    ("upgrade.role", "Role", "string", None, ["upgrade"], "Field role that may take the upgrade."),
    ("upgrade.unlock_level", "Unlock level", "integer", "level", ["upgrade"], "Promotion level at which the upgrade can be bought."),
    ("upgrade.cost_points", "Cost", "integer", "upgrade points", ["upgrade"], "Upgrade points spent."),
    ("upgrade.optional", "Optional", "boolean", None, ["upgrade"], "True when the player may decline it."),
    ("upgrade.pulse_bonus", "Extra pulses", "integer", "pulses per mission", ["upgrade"], "Pulses added to the unit's allowance."),
    ("upgrade.pulses_per_mission_total", "Pulses per mission (with upgrade)", "integer", "pulses per mission", ["upgrade"], "The unit's allowance with the upgrade."),
    ("upgrade.pulse_ap", "Pulse AP", "integer", "AP", ["upgrade"], "AP per pulse (unchanged by the upgrade)."),
    ("upgrade.pulse_range", "Pulse throw range", "integer", "tiles", ["upgrade"], "Throw range per pulse (unchanged)."),
    ("upgrade.pulse_radius", "Pulse radius", "integer", "tiles", ["upgrade"], "Area radius per pulse (unchanged)."),
    ("upgrade.jams_own_machines", "Jams own machines", "boolean", None, ["upgrade"], "Each pulse still jams the squad's own machines in its area."),
    ("upgrade.compatible_with_main_arm", "Compatible with the main arm", "boolean", None, ["upgrade"], "Can be held together with the level-2 main arm."),
    ("upgrade.engine_field", "Engine field", "object", None, ["upgrade"], "What the adapter writes on the unit for the resolver."),
    ("presentation.countryBadgeSurfaces", "Country badge surfaces", "array", None, ["presentation_rule"], "Where a country badge may appear."),
    ("presentation.countryBadgeOnModel", "Country badge on 3D model", "boolean", None, ["presentation_rule"], "False: never on 3D models or textures."),
    ("presentation.countryBadgeForm", "Country badge form", "string", None, ["presentation_rule"], "What the badge looks like."),
    ("country.badge_surfaces", "Badge surfaces", "array", None, ["country"], "On-screen surfaces that show this country's chip."),
    ("country.badge_on_model", "Badge on 3D model", "boolean", None, ["country"], "False: never on 3D models or textures."),
    ("presentation.tileMetres", "Metres per grid tile", "number", "m", ["presentation_rule"],
     "Real-world length of one tactical grid tile; levels set TILE_M to it (owner 2026-11-03, DECISIONS-2026-11-03.md §4 rule 5)."),
    ("identity.display_name_note", "Display name note", "string", None, ["character"],
     "Why the display name differs from the stable ID (stable IDs are never renamed)."),
    ("loadout.max_modules", "Max tech modules", "integer", "modules", ["loadout"], "Hard cap on tech modules in one T loadout."),
    ("loadout.module_rule", "Module rule", "string", None, ["loadout"], "How a conditional module fits the cap."),
]

DECIDED = "DECIDED 2026-11-03 (DECISIONS-2026-11-03.md %s): "
ISSUE_RESOLUTIONS = {
    "identity.canon.country-patches": ("§3", "Owner-approved (delegated): country badges are on-screen UI only (HUD chip, roster card, World globe card); never on 3D models or textures; ISO alpha-2 chip, no emblems. FO-01 and the no-marks rule stand for models."),
    "equipment.field-country-badges": ("§3", "Same as identity.canon.country-patches: UI only, never on models; no stat from nationality."),
    "equipment.deck-standard-dimension": ("§4", "Owner-approved 2026-11-03: 0.32 x 0.22 x 0.045 m closed, 2.6 kg; thickness 45 mm (rugged class)."),
    "equipment.deck-lite-dimension": ("§4", "Owner-approved 2026-11-03: 0.14 x 0.08 x 0.022 m, 0.35 kg."),
    "equipment.writeblock-dimension": ("§4", "Owner-approved 2026-11-03: 0.075 x 0.04 x 0.018 m, 0.12 kg."),
    "equipment.store-dimension": ("§4", "Owner-approved 2026-11-03: dual 0.128 x 0.079 x 0.015 m (0.15 kg); standard cartridge 0.08 x 0.055 x 0.012 m."),
    "equipment.integrity-dongle-dimension": ("§4", "Owner-approved 2026-11-03: 0.052 x 0.018 x 0.008 m, 0.012 kg."),
    "equipment.mesh-scale": ("§4", "Owner-approved 2026-11-03: kit is sized in real metres and every GLB is normalized to its table size (uniform scale)."),
    "identity.canon.layla-country": ("§7", "Jordan: the story branch restored Layla Mansour's country after the Sept 24 find-and-replace turned 'Jordan' into 'McCluster' (owner 2026-11-02: \"we don't want the country to be called McCluster\"; Prim3 branch claude/story-consolidation-20261102, development/DECISIONS.md). The matrix has no Jordan country record, so identity.country_id stays unknown."),
    "equipment.denied-module-cap": ("§5", "Owner-approved 2026-11-03: the cap stays 4. The Isolation Sleeve is not a fifth module: when authorized it takes Module D, displacing the Integrity Dongle; the hardened deck does the integrity check in software."),
}

UPGRADE = {
    "id": "upgrade.t.overclock",
    "name": "Overclock",
    "kind": "upgrade",
    "category": "Systems",
    "status": "canon",
    "implementation": "design_only",
    "description": "Optional level-2 T upgrade: one extra Sync Pulse per mission (2 in all). Each pulse is unchanged and still jams the squad's own machines.",
    "tags": ["T", "level-2", "sync-pulse", "owner-2026-11-03"],
}
UPGRADE_ATTRS = [
    ("upgrade.role", "T"), ("upgrade.unlock_level", 2), ("upgrade.cost_points", 1), ("upgrade.optional", True),
    ("upgrade.pulse_bonus", 1), ("upgrade.pulses_per_mission_total", 2), ("upgrade.pulse_ap", 1),
    ("upgrade.pulse_range", 5), ("upgrade.pulse_radius", 3), ("upgrade.jams_own_machines", True),
    ("upgrade.compatible_with_main_arm", True), ("upgrade.engine_field", {"syncPulsePerMission": 2}),
]

GRID = {
    "id": "presentation.grid-scale",
    "name": "Tactical grid scale",
    "kind": "presentation_rule",
    "category": "Systems",
    "status": "canon",
    "implementation": "design_only",
    "description": "One tactical grid tile is 3.54 m in the real world (owner 2026-11-03). Levels set TILE_M to it; kit keeps its real sizes.",
    "tags": ["grid", "owner-2026-11-03"],
}
BENJI_NAME = 'Benjamin "Benji" Chase'
BENJI_QUOTE = ("Owner 2026-11-03: \"Rename Royce Benjamin Chase ... He gets dubbed Hitman Benji after he takes over "
               "the organization.\" LVL-01 is Benjamin Chase (United States, E).")

BADGE_SURFACES = ["hud_chip", "roster_card", "world_globe_card"]
BADGE_FORM = "Small on-screen chip: flag swatch or ISO 3166-1 alpha-2 code. No national emblem, coat of arms, seal or logo drawn."


def sha(b):
    return hashlib.sha256(b).hexdigest()


def load(d, name):
    with open(os.path.join(d, name), encoding="utf-8") as f:
        return json.load(f)


def dump(d, name, obj):
    with open(os.path.join(d, name), "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write("\n")


def attr(key, label, value, origin, note, state="defined", unit=None):
    return {"key": key, "label": label, "value": value, "state": state, "unit": unit, "origin": origin,
            "sourceIds": [SRC_ID], "note": note}


def put(ent, a):
    """Set an attribute by key (first match), else append it."""
    for i, x in enumerate(ent["attributes"]):
        if x["key"] == a["key"]:
            ent["attributes"][i] = a
            return
    ent["attributes"].append(a)


def add_source(ent):
    if SRC_ID not in ent["sourceIds"]:
        ent["sourceIds"].append(SRC_ID)


def size_obj(row):
    return {"L": row[5], "W": row[6], "H": row[7]}


def table():
    out = ["| Item | Class | L x W x H (m) | Mass (kg) | Matrix records | Level-1 drafts |",
           "| --- | --- | --- | ---: | --- | --- |"]
    for r in SIZES:
        recs = ", ".join("`%s`" % x for x in r[3]) or "none yet"
        out.append("| %s | %s | %g x %g x %g | %g | %s | %s |" % (r[1], r[2], r[5], r[6], r[7], r[8], recs, ", ".join(r[4]) or "-"))
    return "\n".join(out)


def apply(d):
    cat = load(d, "catalog.json")
    old_ents = {x["id"]: x for x in load(d, "entities.json")}
    old_attr_prov = {(x["entityId"], x["index"]): x["provenance"] for x in load(d, "attributes.json")}
    doc_bytes = open(os.path.join(d, DOC), "rb").read()
    fields = {f["key"]: f for f in cat["fields"]}
    ents = {e["id"]: e for e in cat["entities"]}
    changes = Counter()

    # source for the decisions document (uncommitted at the time of writing: commit null)
    src = {"id": SRC_ID, "path": "data/attributes/v1/" + DOC, "repository": "mcclusterishere/Prim3", "commit": None,
           "declaredStatus": "OWNER DECISIONS 2026-11-03",
           "url": "https://github.com/mcclusterishere/Prim3/blob/claude/attributes-matrix-20261102/data/attributes/v1/" + DOC,
           "localPath": DOC, "sha256": sha(doc_bytes)}
    cat["sources"] = [s for s in cat["sources"] if s["id"] != SRC_ID] + [src]

    # fields: new keys; item.mass becomes kilograms (it had no defined value before)
    for key, label, typ, unit, applies, desc in NEW_FIELDS:
        if key not in fields:
            f = {"key": key, "label": label, "type": typ, "unit": unit, "description": desc,
                 "appliesTo": applies, "requiredFor": "owner decision 2026-11-03"}
            cat["fields"].append(f); fields[key] = f
        else:
            fields[key]["description"] = desc
    fields["item.mass"]["unit"] = "kg"
    fields["item.mass"]["description"] = "Real-world mass in kilograms (owner-approved values, DECISIONS-2026-11-03.md §4)."

    # §1 Black Signal prototype: reference only, never canon or targets
    bs_note = "Black Signal prototype value; reference only, not adopted (owner 2026-11-03, DECISIONS-2026-11-03.md §1)."
    for eid, e in ents.items():
        prov = (old_ents.get(eid) or {}).get("provenance")
        if prov == "Black Signal prototype runtime" and e["status"] in ("runtime", "reference"):
            if e["status"] != "reference":
                changes["entities relabelled runtime -> reference"] += 1
            e["status"] = "reference"
            if "black-signal-reference" not in e["tags"]:
                e["tags"].append("black-signal-reference")
        if prov is not None:
            for a in e["attributes"]:
                if a["origin"] == "runtime":
                    a["origin"] = "reference"
                    changes["attributes relabelled runtime -> reference"] += 1
                if a["origin"] == "reference" and prov == "Black Signal prototype runtime" and bs_note not in a["note"]:
                    a["note"] = (a["note"] + " " if a["note"] else "") + bs_note
                elif a["key"] in ("asset.rigged", "asset.attached_to_mission_operators") and bs_note not in a["note"]:
                    a["note"] = (a["note"] + " " if a["note"] else "") + bs_note

    # §2 Overclock upgrade
    up = ents.get(UPGRADE["id"])
    if up is None:
        up = dict(UPGRADE, sourceIds=[SRC_ID], attributes=[], relations=[], gaps=[])
        cat["entities"].append(up); ents[up["id"]] = up
        changes["entities added"] += 1
    note2 = "Owner 2026-11-03: \"you should propose something\" (delegated); DECISIONS-2026-11-03.md §2."
    for key, value in UPGRADE_ATTRS:
        put(up, attr(key, fields[key]["label"], value, "canon", note2, unit=fields[key]["unit"]))
    up["relations"] = [{"type": "applies_to_loadout", "targetId": t, "note": "T loadouts that may carry it at level 2"}
                       for t in ("loadout.fo-t-live", "loadout.fo-t-rapid", "loadout.fo-t-forensic", "loadout.fo-t-denied")]

    # §3 country badges: on-screen UI only
    note3 = OWNER_QUOTE + " DECISIONS-2026-11-03.md §3."
    pm = ents["presentation.black-mannequin"]
    add_source(pm)
    put(pm, attr("presentation.countryBadgeSurfaces", "Country badge surfaces", BADGE_SURFACES, "canon", note3))
    put(pm, attr("presentation.countryBadgeOnModel", "Country badge on 3D model", False, "canon", note3))
    put(pm, attr("presentation.countryBadgeForm", "Country badge form", BADGE_FORM, "canon", note3))
    for a in pm["attributes"]:
        if a["key"] == "presentation.identityCues" and isinstance(a["value"], list):
            a["value"] = ["country badge (on-screen UI only)" if v == "country badge" else v for v in a["value"]]
            if "§3" not in a["note"]:
                a["note"] = (a["note"] + " " if a["note"] else "") + "Country badge is UI only, never on the model (DECISIONS-2026-11-03.md §3)."
    pm["description"] = "Shared featureless black mannequin appearance with role kit; the country badge is an on-screen chip only, never on the model."
    for e in ents.values():
        if e["kind"] == "country":
            add_source(e)
            put(e, attr("country.badge_surfaces", "Badge surfaces", BADGE_SURFACES, "canon", note3))
            put(e, attr("country.badge_on_model", "Badge on 3D model", False, "canon", note3))
            for a in e["attributes"]:
                if a["key"] == "country.badge_asset_id" and a["state"] == "unknown" and "§3" not in a["note"]:
                    a["note"] = "No asset: the badge is a UI chip built from the ISO code (DECISIONS-2026-11-03.md §3)."
            changes["countries given UI-only badge rule"] += 1

    # §4 real-world sizes (owner-approved 2026-11-03)
    note4 = "Owner-approved real-world size. " + ACCEPT_QUOTE + " " + OWNER_QUOTE + " DECISIONS-2026-11-03.md §4."
    for r in SIZES:
        for eid in r[3]:
            e = ents[eid]
            add_source(e)
            if e["kind"] == "visual_asset":
                put(e, attr("asset.target_size_m", "Target real-world size", size_obj(r), "canon", note4, unit="m"))
            else:
                put(e, attr("item.size_m", "Real-world size", size_obj(r), "canon", note4, unit="m"))
                put(e, attr("item.mass", fields["item.mass"]["label"], r[8], "canon", note4, unit="kg"))
            changes["records sized"] += 1

    # §5 T fifth module
    note5 = "Owner-approved 2026-11-03 (" + ACCEPT_QUOTE + " DECISIONS-2026-11-03.md §5); cap from LOADOUTS-ITEMIZED.md create-a-class rule 3."
    for lid in ("loadout.fo-t-live", "loadout.fo-t-rapid", "loadout.fo-t-forensic", "loadout.fo-t-denied"):
        e = ents[lid]
        add_source(e)
        put(e, attr("loadout.max_modules", "Max tech modules", 4, "canon", note5, unit="modules"))
    put(ents["loadout.fo-t-denied"], attr("loadout.module_rule", "Module rule",
        "Isolation Sleeve (authorized only) takes Module D and displaces the Integrity Dongle; the hardened deck checks integrity in software. Never a fifth module.",
        "canon", note5))

    # §4 rule 5 grid scale (owner 2026-11-03): 1 tile = 3.54 m; sizes unchanged
    grid = ents.get(GRID["id"])
    if grid is None:
        grid = dict(GRID, sourceIds=[SRC_ID], attributes=[], relations=[], gaps=[])
        cat["entities"].append(grid); ents[grid["id"]] = grid
        changes["entities added"] += 1
    put(grid, attr("presentation.tileMetres", fields["presentation.tileMetres"]["label"], TILE_M, "canon",
                   GRID_QUOTE + " One tactical grid tile is 3.54 m; kit sizes (§4 table) are unchanged. DECISIONS-2026-11-03.md §4 rule 5.", unit="m"))

    # §7 story-consolidation alignment (owner decisions on Prim3 branch claude/story-consolidation-20261102)
    rc = ents["person.royce"]
    add_source(rc)
    rc["name"] = BENJI_NAME
    if "benji-chase" not in rc["tags"]:
        rc["tags"].append("benji-chase")
    note7 = BENJI_QUOTE + " Stable ID person.royce is kept (machine keys royce_* are aliased in CANON.md §9 on the story branch). DECISIONS-2026-11-03.md §7."
    put(rc, attr("identity.display_name_note", fields["identity.display_name_note"]["label"],
                 "Royce was renamed Benjamin \"Benji\" Chase on 2026-11-03; the ID stays person.royce.", "canon", note7))
    put(rc, attr("identity.nation", fields["identity.nation"]["label"], "United States", "canon", note7))
    put(rc, attr("identity.country_id", fields["identity.country_id"]["label"], "country.united-states", "canon", note7))
    lm = ents["person.layla-mansour"]
    add_source(lm)
    put(lm, attr("identity.nation", fields["identity.nation"]["label"], "Jordan", "proposed",
                 "Restored on the story branch (owner 2026-11-02 repair of the Sept 24 find-and-replace); the record itself stays proposed (development pool). DECISIONS-2026-11-03.md §7."))

    # T kit screen accent: teal -> lime (R owns teal)
    note6 = "T accent is lime %s, never teal (R) or purple (owner 2026-11-02)." % LIME
    cd = ents["asset.equipment.field-cyberdeck"]
    cd["description"] = "Open rugged field computer with an armored shell, mechanical-looking keyboard and restrained lime (%s) display accent." % LIME
    for a in ents["geometry.operator.t"]["attributes"]:
        if a["key"] == "geometry.parts":
            for p in a["value"]:
                if str(p.get("color", "")).lower() == "#57968f":
                    p["color"] = LIME; changes["T screen parts recoloured"] += 1
            if note6 not in a["note"]:
                a["note"] = (a["note"] + " " if a["note"] else "") + note6 + " Screen parts were #57968f."

    # issues
    for iss in cat["issues"]:
        if iss["id"] in ISSUE_RESOLUTIONS:
            sec, text = ISSUE_RESOLUTIONS[iss["id"]]
            iss["resolution"] = DECIDED % sec + text
            if SRC_ID not in iss["sourceIds"]:
                iss["sourceIds"].append(SRC_ID)

    # summary and categories
    n_attr = sum(len(e["attributes"]) for e in cat["entities"])
    n_rel = sum(len(e["relations"]) for e in cat["entities"])
    cat["summary"].update({"entities": len(cat["entities"]), "attributes": n_attr, "relationships": n_rel,
                           "sources": len(cat["sources"]), "fields": len(cat["fields"]), "issues": len(cat["issues"])})
    for c in cat["categories"]:
        c["count"] = sum(1 for x in cat["entities"] if x["category"] == c["label"])

    # ---- write catalog and derived files ----
    dump(d, "catalog.json", cat)
    entities = [{k: e[k] for k in ("id", "name", "kind", "category", "status", "implementation",
                                   "description", "tags", "sourceIds", "gaps")}
                | {"attributeCount": len(e["attributes"]), "provenance": (old_ents.get(e["id"]) or {}).get("provenance")}
                for e in cat["entities"]]
    attributes = []
    for e in cat["entities"]:
        for i, at in enumerate(e["attributes"]):
            row = {"entityId": e["id"], "index": i}
            row.update(at)
            row["provenance"] = old_attr_prov.get((e["id"], i))
            attributes.append(row)
    relationships = [{"fromId": e["id"], "type": r["type"], "toId": r["targetId"], "note": r["note"]}
                     for e in cat["entities"] for r in e["relations"]]
    dump(d, "entities.json", entities)
    dump(d, "attributes.json", attributes)
    dump(d, "relationships.json", relationships)
    dump(d, "fields.json", cat["fields"])
    dump(d, "issues.json", cat["issues"])
    dump(d, "sources.json", cat["sources"])
    for name in ("people.json", "phenotypes.json", "weapons.json", "gear.json", "actions.json"):
        view = load(d, name)
        for row in view["rows"]:
            e = ents.get(row["entityId"])
            if e and "status" in row:
                row["status"] = e["status"]
            if e and row["entityId"] == "asset.equipment.field-cyberdeck" and "definition" in row:
                row["definition"] = e["description"]
            if e and name == "people.json":
                row["name"] = e["name"]
                nation = next((a["value"] for a in e["attributes"] if a["key"] == "identity.nation" and a["state"] == "defined"), None)
                if nation and row.get("nation") == "Unknown":
                    row["nation"] = nation
        dump(d, name, view)

    man = load(d, "manifest.json")
    man["decisions"] = {
        "applied": DOC,
        "tool": "tools/apply_decisions.py",
        "releaseCatalogSha256": RELEASE_CATALOG_SHA256,
        "catalogSha256": sha(open(os.path.join(d, "catalog.json"), "rb").read()),
        "note": "release.*, sha256 and counts above describe the release as supplied; this block describes the files after the decisions.",
        "counts": {"entities": len(entities), "attributes": len(attributes), "relationships": len(relationships),
                   "fields": len(cat["fields"]), "issues": len(cat["issues"]), "sources": len(cat["sources"])},
        "entityStatus": dict(sorted(Counter(e["status"] for e in entities).items())),
        "attributeStates": dict(sorted(Counter(a["state"] for a in attributes).items())),
        "attributeOrigins": dict(sorted(Counter(a["origin"] for a in attributes).items())),
        "issuesDecided": sorted(ISSUE_RESOLUTIONS),
    }
    dump(d, "manifest.json", man)

    # SHA256SUMS: every file except itself, AUDIT.md and the decisions doc (hashed in sources.json)
    skip = {"SHA256SUMS", "AUDIT.md", DOC}
    lines = []
    for root, _, files in os.walk(d):
        for fn in files:
            p = os.path.relpath(os.path.join(root, fn), d)
            if p in skip or "__pycache__" in p:
                continue
            lines.append("%s  %s" % (sha(open(os.path.join(d, p), "rb").read()), p))
    with open(os.path.join(d, "SHA256SUMS"), "w") as f:
        f.write("\n".join(sorted(lines, key=lambda x: x.split("  ", 1)[1])) + "\n")
    return changes, man["decisions"]


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__); return 2
    if "--table" in argv:
        print(table()); return 0
    changes, summary = apply(argv[0])
    print(json.dumps({"changes": changes, "after": summary}, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
