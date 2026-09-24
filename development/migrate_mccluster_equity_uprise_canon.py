#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
TEXT_EXT={".md",".json",".mjs",".js",".ts",".tsx",".yml",".yaml",".txt",".gd",".tscn",".tres"}
INCLUDE_DIRS={"story","episodes","seasons","characters","game","learning","world","technology","development","brands"}
ROOT_FILES={"CANON.md","README.md","ARCHITECT.md","MAIN-STATUS.md","AGENTS.md"}

REPLACEMENTS=[
    ("Jordan Vale's","McCluster's"),
    ("Jordan Vale’s","McCluster’s"),
    ("Jordan Vale","McCluster"),
    ("JORDAN VALE","MCCLUSTER"),
    ("JORDAN-VALE","MCCLUSTER"),
    ("Jordan's","McCluster's"),
    ("Jordan’s","McCluster’s"),
    ("Jordan","McCluster"),
    ("PRIM / McCluster mains","Equity Uprise / McCluster Corp mains"),
    ("PRIM / McCluster —","Equity Uprise / McCluster Corp —"),
    ("PRIM / McCluster — 24","Equity Uprise / McCluster Corp — 24"),
    ("PRIM / McCluster","PRIM / McCluster Corp"),
    ("pre-McCluster identity","pre-Equity Uprise identity"),
    ("joining McCluster to investigate","joining Equity Uprise to investigate"),
    ("joins McCluster to investigate","joins Equity Uprise to investigate"),
    ("joined McCluster to investigate","joined Equity Uprise to investigate"),
    ("enters McCluster through","enters Equity Uprise through"),
    ("entering McCluster through","entering Equity Uprise through"),
    ("McCluster communications/public-facing human surface","Equity Uprise communications/public-facing human surface"),
    ("McCluster public communications surface","Equity Uprise public communications surface"),
    ("Same building. Same company. Same people. New pressure.","Same building. Same institution. Same people. New pressure."),
    ("same building. same company. same people. new pressure.","same building. same institution. same people. new pressure."),
]

def included(path:Path)->bool:
    rel=path.relative_to(ROOT)
    if rel.as_posix() in ROOT_FILES:return True
    return rel.parts and rel.parts[0] in INCLUDE_DIRS and path.suffix.lower() in TEXT_EXT

changed=[]
for path in ROOT.rglob("*"):
    if not path.is_file() or not included(path):continue
    if any(part in {"assets","source-material","node_modules",".git"} for part in path.parts):continue
    try:text=path.read_text(encoding="utf-8")
    except UnicodeDecodeError:continue
    out=text
    for old,new in REPLACEMENTS:out=out.replace(old,new)
    if out!=text:
        path.write_text(out,encoding="utf-8")
        changed.append(path.relative_to(ROOT).as_posix())

renames={
    "characters/PRIM3-JORDAN-VALE.md":"characters/PRIM3-MCCLUSTER.md",
    "story/JORDAN-VALE-HITMAN-ORIGIN-CANON.md":"story/MCCLUSTER-HITMAN-ORIGIN-CANON.md",
    "story/JORDAN-VALE-PSYCHOLOGICAL-BACKGROUND.md":"story/MCCLUSTER-PSYCHOLOGICAL-BACKGROUND.md",
}
for src,dst in renames.items():
    s=ROOT/src;d=ROOT/dst
    if s.exists():
        d.parent.mkdir(parents=True,exist_ok=True)
        s.rename(d)
        changed.extend([src,dst])

print(f"migrated {len(changed)} path events")
for item in changed:print(item)
