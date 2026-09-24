#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
EXT={".md",".json",".mjs",".js",".ts",".tsx",".yml",".yaml",".txt",".gd",".tscn",".tres"}
DIRS={"story","episodes","seasons","characters","game","learning","world","technology","development","brands"}
ROOT_FILES={"CANON.md","README.md","ARCHITECT.md","MAIN-STATUS.md","AGENTS.md"}

def included(path):
    rel=path.relative_to(ROOT)
    if rel.as_posix() in ROOT_FILES:return True
    return rel.parts and rel.parts[0] in DIRS and path.suffix.lower() in EXT

failures=[]
for path in ROOT.rglob("*"):
    if not path.is_file() or not included(path):continue
    if any(part in {"assets","source-material","node_modules",".git"} for part in path.parts):continue
    try:text=path.read_text(encoding="utf-8")
    except UnicodeDecodeError:continue
    rel=path.relative_to(ROOT).as_posix()
    for pattern,label in [
        (r"\bJordan\b","retired protagonist token Jordan"),
        (r"\bJORDAN\b","retired protagonist token JORDAN"),
        (r"JORDAN-VALE","retired protagonist filename token"),
        (r"\b(join|joins|joining|joined|enter|enters|entering|entered) McCluster Corp\b","old story entry into McCluster Corp"),
        (r"\b(join|joins|joining|joined) McCluster\b","old visible-workplace entry phrasing"),
    ]:
        if re.search(pattern,text):
            failures.append(f"{rel}: {label}")

required=[
    ROOT/"story/MCCLUSTER-PROTAGONIST-CANON.md",
    ROOT/"story/EQUITY-UPRISE-WORKPLACE-CANON.md",
    ROOT/"characters/PRIM3-MCCLUSTER.md",
    ROOT/"story/MCCLUSTER-HITMAN-ORIGIN-CANON.md",
    ROOT/"story/MCCLUSTER-PSYCHOLOGICAL-BACKGROUND.md",
]
for path in required:
    if not path.exists():failures.append(f"missing required canon file: {path.relative_to(ROOT)}")

canon=(ROOT/"CANON.md").read_text(encoding="utf-8")
for token in ["Equity Uprise","McCluster","Site 0"]:
    if token not in canon:failures.append(f"CANON.md missing {token}")

if failures:
    print("PRIM3 MCCLUSTER / EQUITY UPRISE CANON: FAIL")
    for item in failures:print(" -",item)
    raise SystemExit(1)

print("PRIM3 MCCLUSTER / EQUITY UPRISE CANON: PASS")
