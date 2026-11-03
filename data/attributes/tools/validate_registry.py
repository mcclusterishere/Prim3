#!/usr/bin/env python3
"""Validate a PRIM3 content registry (stdlib only).

    python3 -I data/attributes/tools/validate_registry.py data/attributes/v1/catalog.json
    python3 -I data/attributes/tools/validate_registry.py data/attributes/v1/catalog.json --self-test
    python3 -I data/attributes/tools/validate_registry.py CATALOG --sources-dir DIR   # check snapshot hashes

Contract: schemas/prm3-content-registry.schema.json. JSON Schema covers shapes; this
script enforces the shape rules it needs plus the cross-record rules a schema cannot:
unique IDs, referential integrity, attribute states (unknown is never zero), field
dictionary coverage, value types against the dictionary, summary parity and the
status/implementation split. --self-test applies deliberate corruptions and fails
unless every one is rejected. Exit code 0 = valid.
"""
import copy, hashlib, json, os, re, sys

SCHEMA = os.path.join(os.path.dirname(__file__), "..", "..", "..", "schemas",
                      "prm3-content-registry.schema.json")
STATES = {"defined", "unknown", "not_applicable", "conflict"}
STATUS = {"canon", "proposed", "draft", "reference", "runtime", "legacy", "deprecated"}
IMPL = {"runtime", "asset_only", "design_only", "schema_only"}
ORIGIN = {"canon", "proposed", "runtime", "reference", "draft", "legacy"}
ENTITY_REQ = ["id", "name", "kind", "category", "status", "implementation", "description",
              "tags", "sourceIds", "attributes", "relations", "gaps"]
ATTR_REQ = ["key", "label", "value", "state", "unit", "origin", "sourceIds", "note"]
TYPE_OK = {
    "string": lambda v: isinstance(v, str),
    "integer": lambda v: isinstance(v, int) and not isinstance(v, bool),
    "number": lambda v: isinstance(v, (int, float)) and not isinstance(v, bool),
    "boolean": lambda v: isinstance(v, bool),
    "array": lambda v: isinstance(v, list),
    "object": lambda v: isinstance(v, dict),
    "reference": lambda v: isinstance(v, (str, list)),
    "mixed": lambda v: True,
}


def validate(cat, sources_dir=None):
    errs = []
    e = errs.append
    for k in ("schemaVersion", "summary", "entities", "sources", "fields", "issues", "statePolicy"):
        if k not in cat:
            e("missing top-level key " + k)
    if errs:
        return errs
    if set(cat["statePolicy"]) != STATES:
        e("statePolicy must define exactly " + ", ".join(sorted(STATES)))

    def unique(items, key, what):
        seen = set()
        for it in items:
            if it.get(key) in seen:
                e("duplicate %s %r" % (what, it.get(key)))
            seen.add(it.get(key))
        return seen

    ids = unique(cat["entities"], "id", "entity id")
    fields = {f["key"]: f for f in cat["fields"]}
    unique(cat["fields"], "key", "field key")
    sids = unique(cat["sources"], "id", "source id")
    unique(cat["issues"], "id", "issue id")

    for s in cat["sources"]:
        if not re.fullmatch(r"[0-9a-f]{64}", s.get("sha256", "")):
            e("source %s: sha256 is not 64 hex" % s.get("id"))
        if sources_dir and s.get("localPath"):
            p = os.path.join(sources_dir, s["localPath"])
            if os.path.exists(p):
                if hashlib.sha256(open(p, "rb").read()).hexdigest() != s["sha256"]:
                    e("source %s: file hash differs from catalog" % s["id"])

    n_attr = n_rel = 0
    for ent in cat["entities"]:
        eid = ent.get("id")
        for k in ENTITY_REQ:
            if k not in ent:
                e("%s: missing %s" % (eid, k))
        if ent.get("status") not in STATUS:
            e("%s: unknown source status %r" % (eid, ent.get("status")))
        if ent.get("implementation") not in IMPL:
            e("%s: unknown implementation status %r" % (eid, ent.get("implementation")))
        # A proposal or draft cannot claim to be in the playable game.
        if ent.get("status") in ("proposed", "draft") and ent.get("implementation") == "runtime":
            e("%s: %s definition claims runtime implementation" % (eid, ent.get("status")))
        for s in ent.get("sourceIds", []):
            if s not in sids:
                e("%s: unknown source %s" % (eid, s))
        for a in ent.get("attributes", []):
            n_attr += 1
            where = "%s.%s" % (eid, a.get("key"))
            for k in ATTR_REQ:
                if k not in a:
                    e(where + ": missing " + k)
            st, v = a.get("state"), a.get("value")
            if st not in STATES:
                e(where + ": unknown state %r" % st)
            if a.get("origin") not in ORIGIN:
                e(where + ": unknown origin %r" % a.get("origin"))
            if st in ("unknown", "not_applicable") and v is not None:
                e(where + ": %s must be null, never a value such as %r" % (st, v))
            if st == "defined" and v is None:
                e(where + ": defined value is null")
            if st == "conflict" and not (isinstance(v, list) and len(v) >= 2 and
                                         all(isinstance(c, dict) and "value" in c and "sourceId" in c for c in v)):
                e(where + ": conflict must keep at least two source claims")
            f = fields.get(a.get("key"))
            if f is None:
                e(where + ": key not in the field dictionary")
            elif st == "defined" and not TYPE_OK.get(f["type"], lambda _: True)(v):
                e(where + ": value %r is not %s" % (v, f["type"]))
            for s in a.get("sourceIds", []):
                if s not in sids:
                    e(where + ": unknown source " + s)
        for r in ent.get("relations", []):
            n_rel += 1
            if r.get("targetId") not in ids:
                e("%s: relation %s targets missing %r" % (eid, r.get("type"), r.get("targetId")))
    for iss in cat["issues"]:
        for x in iss.get("entityIds", []):
            if x not in ids:
                e("issue %s: unknown entity %s" % (iss["id"], x))
        for s in iss.get("sourceIds", []):
            if s not in sids:
                e("issue %s: unknown source %s" % (iss["id"], s))
    actual = {"entities": len(cat["entities"]), "attributes": n_attr, "relationships": n_rel,
              "sources": len(cat["sources"]), "fields": len(cat["fields"]), "issues": len(cat["issues"])}
    for k, n in actual.items():
        if cat["summary"].get(k) != n:
            e("summary.%s = %r but the registry holds %d" % (k, cat["summary"].get(k), n))
    for c in cat.get("categories", []):
        n = sum(1 for x in cat["entities"] if x.get("category") == c["label"])
        if n != c["count"]:
            e("category %s count %d, registry holds %d" % (c["label"], c["count"], n))
    return errs


def _first(cat, pred):
    for ent in cat["entities"]:
        for a in ent["attributes"]:
            if pred(ent, a):
                return ent, a
    raise LookupError("no attribute fits this negative test")


def negative_tests(cat):
    """Each corruption must be rejected. Returns [(name, rejected)]."""
    out = []

    def case(name, mutate):
        c = copy.deepcopy(cat)
        mutate(c)
        out.append((name, bool(validate(c))))

    def dup(c): c["entities"].append(copy.deepcopy(c["entities"][0])); c["summary"]["entities"] += 1
    def dangling(c):
        ent = next(x for x in c["entities"] if x["relations"]); ent["relations"][0]["targetId"] = "missing.target"
    def unknown_zero(c): _first(c, lambda e_, a: a["state"] == "unknown")[1]["value"] = 0
    def na_zero(c): _first(c, lambda e_, a: a["state"] == "not_applicable")[1]["value"] = 0
    def bad_state(c): c["entities"][0]["attributes"][0]["state"] = "guessed"
    def unlisted_key(c): c["entities"][0]["attributes"][0]["key"] = "invented.field"
    def bad_source(c): c["entities"][0]["sourceIds"].append("src.000000")
    def proposed_runtime(c): next(x for x in c["entities"] if x["status"] == "proposed")["implementation"] = "runtime"
    def summary_drift(c): c["summary"]["attributes"] += 1
    def conflict_collapsed(c):
        a = _first(c, lambda e_, a: a["state"] == "conflict")[1]; a["value"] = a["value"][0]["value"]
    def wrong_type(c):
        ints = {f["key"] for f in c["fields"] if f["type"] == "integer"}
        _first(c, lambda e_, a: a["key"] in ints and a["state"] == "defined")[1]["value"] = "ten"
    def bad_hash(c): c["sources"][0]["sha256"] = "0" * 63

    for name, fn in [("duplicate entity id", dup), ("missing relation target", dangling),
                     ("unknown replaced with zero", unknown_zero), ("not_applicable replaced with zero", na_zero),
                     ("invalid attribute state", bad_state), ("key outside field dictionary", unlisted_key),
                     ("unknown source id", bad_source), ("proposed definition claims runtime", proposed_runtime),
                     ("summary count drift", summary_drift), ("conflict collapsed to one claim", conflict_collapsed),
                     ("value type contradicts dictionary", wrong_type), ("malformed source hash", bad_hash)]:
        case(name, fn)
    return out


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__); return 2
    cat = json.load(open(argv[0], encoding="utf-8"))
    sources_dir = argv[argv.index("--sources-dir") + 1] if "--sources-dir" in argv else None
    errs = validate(cat, sources_dir)
    for x in errs[:50]:
        print("ERROR:", x)
    ok = not errs
    print("registry: %s (%d errors)" % ("valid" if ok else "INVALID", len(errs)))
    if "--self-test" in argv:
        for name, rejected in negative_tests(cat):
            print("  negative test %-38s %s" % (name, "rejected" if rejected else "NOT REJECTED"))
            ok = ok and rejected
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
