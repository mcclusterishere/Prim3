#!/usr/bin/env python3
"""Rebuild data/attributes/v1 from the owner-supplied release.

Stdlib + openpyxl only. Read-only with respect to gameplay.

    python3 -I data/attributes/v1/tools/build_from_release.py \
        --html  /path/to/attrs.html \
        --xlsx  /path/to/matrix.xlsx \
        --out   data/attributes/v1 \
        [--prim3 .]       # verify canon source snapshots against this checkout

The release's primary machine record is catalog.json. The standalone HTML embeds
it as `window.PRIM3_REGISTRY`; its own "download JSON" button serializes it with
JSON.stringify(data, null, 2). Re-serializing with json.dumps(indent=2,
ensure_ascii=False) + "\n" reproduces the published catalog SHA-256 byte for byte,
which this script checks. The workbook is the human view: every derived file is
reconciled against it and the script exits non-zero on any mismatch.
"""
import argparse, base64, hashlib, json, os, re, subprocess, sys
from collections import Counter, defaultdict

import openpyxl

CATALOG_SHA256 = "7331ba19d6685e3d9ac02b1efb5a47c4b791f0ff5de35b0616ca6b18d88008a3"
EXPECTED = {"entities": 1319, "attributes": 12026, "relationships": 1511,
            "fields": 1246, "issues": 30, "sources": 81, "attribute_rows": 12298}
HEADER_ROW = 6  # rows 1-5 are title/notes; row 6 is the table header
DOMAIN_SHEETS = {"People": "people.json", "Phenotypes": "phenotypes.json",
                 "Weapons & Ammo": "weapons.json", "Gear & World": "gear.json",
                 "Actions & Learning": "actions.json"}
# Values captured from ChatGPT's "PRIM3 Black Signal" prototype (src/engine.js,
# src/world.js), not from the canonical Prim3 tactical resolver.
PROTOTYPE_LABEL = "Black Signal prototype runtime"
PROTOTYPE_ASSET_LABEL = "Black Signal prototype asset (proposed)"


def sha(b):
    return hashlib.sha256(b).hexdigest()


def dump(path, obj):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write("\n")


def read_registry(html_path):
    html = open(html_path, encoding="utf-8").read()
    script = re.findall(r"<script[^>]*>(.*?)</script>", html, re.S)[0]
    dec = json.JSONDecoder()

    def grab(name):
        start = script.index("window.%s=" % name) + len("window.%s=" % name)
        return dec.raw_decode(script, start)[0]

    return grab("PRIM3_REGISTRY"), grab("PRIM3_EMBEDDED_FILES")


def sheet_rows(wb, title):
    rows = list(wb[title].iter_rows(values_only=True))
    header = [h for h in rows[HEADER_ROW - 1]]
    out = []
    for r in rows[HEADER_ROW:]:
        if all(c is None for c in r):
            continue
        out.append({header[i]: r[i] for i in range(len(header)) if header[i]})
    return header, out


def split_ids(v):
    return [s.strip() for s in str(v).split(",") if s.strip()] if v else []


def provenance_of(entity, repo_of, attr=None):
    """Label everything that comes from ChatGPT's Black Signal prototype."""
    if entity["status"] == "runtime" or (attr is not None and attr.get("origin") == "runtime"):
        return PROTOTYPE_LABEL
    if any(repo_of.get(s) == "PRIM3 Black Signal" for s in entity["sourceIds"]):
        return PROTOTYPE_ASSET_LABEL
    return None


def xlsx_text(v):
    """How the workbook renders a catalog value (for reconciliation)."""
    if v is None:
        return None
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return v
    if isinstance(v, str):
        return v
    return json.dumps(v, ensure_ascii=False, separators=(",", ":"))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--html", required=True)
    ap.add_argument("--xlsx", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--prim3", default=None)
    a = ap.parse_args()
    out = a.out
    os.makedirs(os.path.join(out, "source", "evidence"), exist_ok=True)
    problems = []

    reg, embedded = read_registry(a.html)
    catalog_bytes = (json.dumps(reg, indent=2, ensure_ascii=False) + "\n").encode("utf-8")
    if sha(catalog_bytes) != CATALOG_SHA256:
        problems.append("catalog.json SHA-256 does not match the release QA value")
    open(os.path.join(out, "catalog.json"), "wb").write(catalog_bytes)

    xbytes = open(a.xlsx, "rb").read()
    emb_x = embedded.get("PRIM3-Attributes-Matrix.xlsx")
    if emb_x and base64.b64decode(emb_x["base64"]) != xbytes:
        problems.append("workbook differs from the copy embedded in the HTML")
    open(os.path.join(out, "source", "PRIM3-Attributes-Matrix.xlsx"), "wb").write(xbytes)

    # Cited source snapshots: keep prototype/design evidence (not in this repo);
    # verify canon snapshots against the Prim3 commit they cite instead of copying.
    src_by_local = {s["localPath"]: s for s in reg["sources"]}
    snapshot_report = []
    for path, f in sorted(embedded.items()):
        if not path.startswith("sources/"):
            continue
        b = base64.b64decode(f["base64"]) if "base64" in f else f["text"].encode()
        s = src_by_local.get(path)
        ok = s is not None and sha(b) == s["sha256"]
        if not ok:
            problems.append("source snapshot hash mismatch: " + path)
        entry = {"sourceId": s and s["id"], "path": path, "sha256": sha(b), "matchesCatalog": ok}
        if path.startswith("sources/canon/"):
            entry["kept"] = False
            if a.prim3:
                rel = path[len("sources/canon/"):]
                try:
                    cur = subprocess.run(["git", "-C", a.prim3, "show", s["commit"] + ":" + rel],
                                         capture_output=True, check=True).stdout
                    entry["matchesPrim3AtCommit"] = sha(cur) == sha(b)
                except subprocess.CalledProcessError:
                    entry["matchesPrim3AtCommit"] = None
        else:
            entry["kept"] = True
            dest = os.path.join(out, "source", "evidence", path[len("sources/"):])
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            open(dest, "wb").write(b)
        snapshot_report.append(entry)

    ents = reg["entities"]
    repo_of = {s["id"]: s["repository"] for s in reg["sources"]}
    ent_by_id = {e["id"]: e for e in ents}
    ids = [e["id"] for e in ents]
    if len(set(ids)) != len(ids):
        problems.append("duplicate entity IDs")
    idset = set(ids)

    entities = [{k: e[k] for k in ("id", "name", "kind", "category", "status", "implementation",
                                   "description", "tags", "sourceIds", "gaps")}
                | {"attributeCount": len(e["attributes"]),
                   "provenance": provenance_of(e, repo_of)}
                for e in ents]
    attributes = []
    for e in ents:
        for i, at in enumerate(e["attributes"]):
            row = {"entityId": e["id"], "index": i}
            row.update(at)
            row["provenance"] = provenance_of(e, repo_of, at)
            attributes.append(row)
    relationships = []
    for e in ents:
        for rel in e["relations"]:
            relationships.append({"fromId": e["id"], "type": rel["type"], "toId": rel["targetId"],
                                  "note": rel["note"]})
            if rel["targetId"] not in idset:
                problems.append("dangling relation %s -> %s" % (e["id"], rel["targetId"]))

    dump(os.path.join(out, "entities.json"), entities)
    dump(os.path.join(out, "attributes.json"), attributes)
    dump(os.path.join(out, "relationships.json"), relationships)
    dump(os.path.join(out, "fields.json"), reg["fields"])
    dump(os.path.join(out, "issues.json"), reg["issues"])
    dump(os.path.join(out, "sources.json"), reg["sources"])

    # ---- reconcile against the workbook -----------------------------------
    wb = openpyxl.load_workbook(a.xlsx, data_only=True, read_only=True)
    _, xa = sheet_rows(wb, "Attributes")
    grouped = defaultdict(list)
    order = []
    for r in xa:
        k = (r["Entity ID"], r["Attribute key"])
        if not grouped[k]:
            order.append(k)
        grouped[k].append(r)
    mism = 0
    xa_iter = defaultdict(list)
    for k in order:
        parts = grouped[k]
        # a key may repeat (conflict claims): split on Part == 1 restarts
        cur = []
        for p in parts:
            if str(p["Part"]) == "1" and cur:
                xa_iter[k].append(cur); cur = []
            cur.append(p)
        xa_iter[k].append(cur)
    n_x_attrs = sum(len(v) for v in xa_iter.values())
    used = Counter()
    for x in attributes:
        k = (x["entityId"], x["key"])
        lst = xa_iter.get(k, [])
        if used[k] >= len(lst):
            mism += 1; continue
        parts = sorted(lst[used[k]], key=lambda p: int(p["Part"]))
        used[k] += 1
        if int(parts[0]["Parts"]) != len(parts):
            mism += 1; continue
        vals = [p["Value"] for p in parts]
        joined = vals[0] if len(vals) == 1 else "".join("" if v is None else str(v) for v in vals)
        want = xlsx_text(x["value"])
        if x["value"] is None:
            ok = True
        elif x["value"] == "":
            ok = joined in (None, "")  # the workbook stores an empty string as a blank cell
        elif isinstance(x["value"], bool):
            ok = joined is x["value"] or str(joined).lower() == want  # unknown / n.a. rendered as words; checked via State
        elif isinstance(want, (int, float)) and not isinstance(want, bool):
            try:
                ok = float(joined) == float(want)
            except (TypeError, ValueError):
                ok = False
        else:
            ok = str(joined) == str(want) or (isinstance(x["value"], (list, dict)) and
                                              _json_eq(joined, x["value"]))
        st = parts[0]["State"]
        if not ok or st != x["state"]:
            mism += 1
            if mism <= 5:
                print("MISMATCH", k, repr(str(joined)[:120]), "|", repr(str(want)[:120]), st, x["state"])
    if mism:
        problems.append("%d attribute values do not reconcile with the workbook" % mism)

    checks = {
        "entities": (len(entities), len(sheet_rows(wb, "Entities")[1])),
        "attributes": (len(attributes), n_x_attrs),
        "attribute_rows": (EXPECTED["attribute_rows"], len(xa)),
        "relationships": (len(relationships), len(sheet_rows(wb, "Relationships")[1])),
        "fields": (len(reg["fields"]), len(sheet_rows(wb, "Fields")[1])),
        "issues": (len(reg["issues"]), len(sheet_rows(wb, "Issues")[1])),
        "sources": (len(reg["sources"]), len(sheet_rows(wb, "Sources")[1])),
    }
    for k, (c, x) in checks.items():
        if c != x or c != EXPECTED[k]:
            problems.append("count %s: catalog %s, workbook %s, expected %s" % (k, c, x, EXPECTED[k]))
    for k in ("entities", "attributes", "relationships", "issues", "sources", "fields"):
        if reg["summary"][k] != EXPECTED[k]:
            problems.append("catalog summary %s disagrees" % k)
    x_ent_ids = {r["Entity ID"] for r in sheet_rows(wb, "Entities")[1]}
    if x_ent_ids != idset:
        problems.append("entity ID sets differ between workbook and catalog")

    # ---- per-domain views (the workbook's category sheets) ----------------
    domain_counts = {}
    for title, fname in DOMAIN_SHEETS.items():
        header, rows = sheet_rows(wb, title)
        view = []
        for r in rows:
            eid = r["Entity ID"]
            if eid not in idset:
                problems.append("%s row %s has no catalog entity" % (title, eid))
            row = {"entityId": eid}
            for h in header:
                if h in ("Entity ID",):
                    continue
                key = re.sub(r"[^a-z0-9]+", "_", h.lower()).strip("_")
                row[key] = split_ids(r[h]) if h == "Source IDs" else r[h]
            row["provenance"] = provenance_of(ent_by_id[eid], repo_of) if eid in ent_by_id else None
            view.append(row)
        domain_counts[fname] = len(view)
        dump(os.path.join(out, fname), {"sheet": title, "columns": header, "rows": view})

    manifest = {
        "release": {"snapshot": reg["generatedAt"], "schemaVersion": reg["schemaVersion"],
                    "sourceRevisions": reg["sourceRevisions"], "summary": reg["summary"]},
        "sha256": {"catalog.json": sha(catalog_bytes),
                   "source/PRIM3-Attributes-Matrix.xlsx": sha(xbytes),
                   "release attrs.html (not committed)": sha(open(a.html, "rb").read())},
        "counts": {k: v[0] for k, v in checks.items()} | {"domainViews": domain_counts},
        "attributeStates": Counter(x["state"] for x in attributes),
        "attributeOrigins": Counter(x["origin"] for x in attributes),
        "provenance": {"entities": Counter(x["provenance"] for x in entities if x["provenance"]),
                       "attributes": Counter(x["provenance"] for x in attributes if x["provenance"])},
        "sourceSnapshots": snapshot_report,
        "notEmbeddedInRelease": ["catalog.schema.json", "coverage.json", "validation.json",
                                 "instances.json (instances are present as catalog entities)",
                                 "runtime-cell-runs.json", "runtime-render-parts.json",
                                 "runtime-operator-parts.json", "cells.csv"],
        "problems": problems,
    }
    dump(os.path.join(out, "manifest.json"), manifest)
    for p in problems:
        print("PROBLEM:", p, file=sys.stderr)
    print(json.dumps(manifest["counts"], indent=1))
    return 1 if problems else 0


def _json_eq(text, value):
    try:
        return json.loads(text) == value
    except (TypeError, ValueError):
        return False


if __name__ == "__main__":
    sys.exit(main())
