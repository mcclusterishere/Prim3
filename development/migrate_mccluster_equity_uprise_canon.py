#!/usr/bin/env python3
# Canon migration version: 1.2
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
    ("JORDAN","MCCLUSTER"),
    ("PRIM / McCluster mains","Equity Uprise / McCluster Corp mains"),
    ("PRIM / McCluster —","Equity Uprise / McCluster Corp —"),
    ("PRIM / McCluster — 24","Equity Uprise / McCluster Corp — 24"),
    ("PRIM / McCluster","PRIM / McCluster Corp"),
    ("pre-McCluster identity","pre-Equity Uprise identity"),
    ("joining McCluster Corp","joining Equity Uprise"),
    ("joins McCluster Corp","joins Equity Uprise"),
    ("joined McCluster Corp","joined Equity Uprise"),
    ("joining McCluster","joining Equity Uprise"),
    ("joins McCluster","joins Equity Uprise"),
    ("joined McCluster","joined Equity Uprise"),
    ("entering McCluster","entering Equity Uprise"),
    ("enters McCluster","enters Equity Uprise"),
    ("entered McCluster","entered Equity Uprise"),
    ("joining McCluster to investigate","joining Equity Uprise to investigate"),
    ("joins McCluster to investigate","joins Equity Uprise to investigate"),
    ("joined McCluster to investigate","joined Equity Uprise to investigate"),
    ("enters McCluster through","enters Equity Uprise through"),
    ("joins McCluster as","joins Equity Uprise as"),
    ("joining McCluster as","joining Equity Uprise as"),
    ("joined McCluster as","joined Equity Uprise as"),
    ("at McCluster before","at Equity Uprise before"),
    ("inside McCluster before","inside Equity Uprise before"),
    ("McCluster workplace","Equity Uprise workplace"),
    ("McCluster HQ workplace","Equity Uprise HQ workplace"),
    ("entering McCluster through","entering Equity Uprise through"),
    ("McCluster communications/public-facing human surface","Equity Uprise communications/public-facing human surface"),
    ("McCluster public communications surface","Equity Uprise public communications surface"),
    ("why PRIM/McCluster","why Equity Uprise / McCluster Corp / PRIM"),
    ("why PRIM / McCluster","why Equity Uprise / McCluster Corp / PRIM"),
    ("college/PRIM entry","college/Equity Uprise entry"),
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


EPISODE_LOCATIONS={
    "episodes/S01E01-THE-BLIP.md":"F1 arrival/intake; F3 first field overlap; F6 hidden executive observation. The future cold open is Site 0.",
    "episodes/S01E02-WHITE-GREY-BLACK-HAT.md":"F1 access boundary; F3 field operations; F5 authorization/evidence.",
    "episodes/S01E03-OSINT.md":"F5 source review/evidence; F3 Field-R coordination.",
    "episodes/S02E01-ANTI-SOCIAL-ENGINEERING.md":"F1 intake/access; F2 public forum/community.",
    "episodes/S02E02-RED-BLUE-PURPLE-WHITE-TEAM.md":"F2 instruction; F3 field planning.",
    "episodes/S02E03-GOT-WIFI.md":"F2 user symptom; F3 field diagnosis; B1 infrastructure trace; F4 reinforcement/media.",
    "episodes/S03E01-DATA-BREACH.md":"F3 incident response; F5 evidence/accountability.",
    "episodes/S03E02-APP-ATTACKS.md":"F3 technical operations; B1 controlled lab infrastructure.",
    "episodes/S03E03-VIRUS-TYPES.md":"B1 technical lab; F3 operational response.",
    "episodes/S04E01-INSTALLATION-TYPES.md":"B1 hardware/service work; F3 technical planning.",
    "episodes/S04E02-DIVE-IN.md":"Exterior discovery where required; F5 evidence processing; B1 technical validation.",
    "episodes/S04E03-IOT.md":"B1 building systems; F3 technical response; F6 command consequence.",
    "episodes/S05E01-IAAS-SAAS-PAAS.md":"F3 systems planning; F6 authority/partner decision.",
    "episodes/S05E02-CAP-EX-VS-OP-EX.md":"F5 policy/proof; F6 executive command.",
    "episodes/S05E03-TRAPPIN-FROM-THE-CLOUD.md":"F3 systems work; F6 institutional consequence.",
    "episodes/S06E01-PER-DIEM.md":"F7 mobility/logistics; F1 arrivals; F2 temporary-worker/cohort life.",
    "episodes/S06E02-PATCH-WORK.md":"B1 infrastructure maintenance; F3 technical response; F5 trust/evidence aftermath.",
    "episodes/S06E03-OPEN-SONG-21.md":"Workplace footprint remains open; final script must select at least one Equity Uprise floor anchor.",
    "episodes/S07E01-RAID-HOT-SITE.md":"Equity Uprise F6/B1 frames departure and remote support; the assault itself is Site 0, not Equity Uprise.",
    "episodes/S07E02-EVIL-TWIN.md":"Site 0 root conflict; F6/B1 maintain Equity Uprise remote/aftermath continuity.",
    "episodes/S07E03-GHOST-IN-THE-WIRES.md":"Site 0 succession residue; F6/B1/F3 return-to-work epilogue at Equity Uprise.",
}
for rel,footprint in EPISODE_LOCATIONS.items():
    path=ROOT/rel
    if not path.exists():continue
    text=path.read_text(encoding="utf-8")
    if "## Equity Uprise workplace continuity" in text:continue
    section=(
        "\n\n---\n\n## Equity Uprise workplace continuity\n\n"
        "**Canonical location footprint:** "+footprint+"\n\n"
        "This episode obeys story/EQUITY-UPRISE-WORKPLACE-CANON.md and "
        "story/EPISODE-WORKPLACE-LOCATION-MAP.md. Named cast should use their "
        "persistent desks/benches/offices when naturally present, and the episode "
        "must write visible workplace consequences forward.\n"
    )
    path.write_text(text.rstrip()+section+"\n",encoding="utf-8")
    changed.append(rel)

for rel in [
    "story/episodes/S1E1-HIGH-ALERT-CONTEXT.md",
    "story/episodes/S1E1-HIGH-ALERT.md",
    "story/episodes/S1E1-LINE-MAP.md",
    "story/episodes/S1E1-VISUAL-DIRECTION.md",
    "story/episodes/S1E2-PERMISSION-SLIP-LONGFORM-TREATMENT.md",
    "story/episodes/SEEDS-FROM-HIGH-ALERT.md",
    "story/missions/HIGH-ALERT.md",
    "story/missions/EVIL-TWIN.md",
]:
    path=ROOT/rel
    if not path.exists():continue
    text=path.read_text(encoding="utf-8")
    note="Workplace authority: story/EQUITY-UPRISE-WORKPLACE-CANON.md and story/EPISODE-WORKPLACE-LOCATION-MAP.md."
    if note not in text:
        path.write_text(text.rstrip()+"\n\n"+note+"\n",encoding="utf-8")
        changed.append(rel)

print(f"migrated {len(changed)} path events")
for item in changed:print(item)
