#!/usr/bin/env python3
"""Render the objective-centered reference from its coordinate fixture.

Standard-library SVG authoring; optional PNG rendering uses Inkscape.
This is a static design reference, not the tactical gameplay renderer.
"""
from __future__ import annotations

import argparse
from collections import deque
import html
import json
from pathlib import Path
import shutil
import subprocess


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets/reference/tactical-map"
FIXTURE = ASSETS / "objective-origin-training-v01.json"
SVG = ASSETS / "PRIM3-objective-origin-training-v01.svg"
PNG = SVG.with_suffix(".png")


def validate(data):
    """Guard the requested geometry and reachable sample positions."""
    c, frame, obj = data["canvas"], data["coordinates"], data["objective"]
    assert c["width"] > 0 and c["height"] > 0 and c["pixels_per_unit"] > 0
    assert frame["positive_x"] == "right" and frame["positive_y"] == "up"
    assert obj["position"] == [0, 0] and frame["origin"] == [0, 0]
    assert data["visual_contract"]["origin_screen"] == [c["width"] / 2, c["height"] / 2]
    blocked = {tuple(p) for p in data["cover_cells"] + obj["footprint"]}
    targets = {tuple(p) for p in obj["interaction_cells"]}
    assert not blocked & targets
    def inside(p):
        return frame["min_x"] <= p[0] <= frame["max_x"] and frame["min_y"] <= p[1] <= frame["max_y"]
    assert all(inside(p) for p in blocked | targets)
    assert {u["role"] for u in data["operators"]} == {"E", "R", "T"}
    assert len({tuple(u["position"]) for u in data["operators"]}) == 3
    distances = {}
    for unit in data["operators"]:
        start = tuple(unit["position"])
        assert inside(start) and start not in blocked
        queue, seen = deque([(start, 0)]), {start}
        while queue:
            p, distance = queue.popleft()
            if p in targets:
                distances[unit["role"]] = distance
                break
            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                q = (p[0] + dx, p[1] + dy)
                if inside(q) and q not in blocked and q not in seen:
                    seen.add(q)
                    queue.append((q, distance + 1))
        assert unit["role"] in distances, f"No interaction route for {unit['role']}"
    return distances


def render(data):
    width, height, scale = (data["canvas"][k] for k in ("width", "height", "pixels_per_unit"))
    cx, cy = width / 2, height / 2
    def project(x, y):
        return cx + scale * x, cy - scale * y
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">']
    out.append('<title id="title">PRIM3 objective-centered tactical training map</title>')
    out.append('<desc id="desc">A top-down teaching map with the X and Y axes crossing at exact screen center. The disclosed stationary objective is at zero, zero. Entry starts at minus six, minus three; Recon at six, minus three; Technical at zero, nine. Illustrative cover and four adjacent interaction tiles are shown. This is a proposed coach reference, not a playable or balanced game.</desc>')
    out.append('''<defs>
      <linearGradient id="floor" x2="0" y2="1"><stop stop-color="#f0f3ef"/><stop offset="1" stop-color="#dce3de"/></linearGradient>
      <linearGradient id="cover" x2="0" y2="1"><stop stop-color="#63726d"/><stop offset="1" stop-color="#3c4b46"/></linearGradient>
      <radialGradient id="objective-glow"><stop stop-color="#e8c66d" stop-opacity=".3"/><stop offset="1" stop-color="#e8c66d" stop-opacity="0"/></radialGradient>
      <radialGradient id="head" cx=".3" cy=".2"><stop stop-color="#707875"/><stop offset=".4" stop-color="#252c29"/><stop offset="1" stop-color="#090e0b"/></radialGradient>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#233b32"/></marker>
    </defs>''')
    def add(s): out.append(s)
    def text(x, y, value, size=24, fill="#25382f", weight=400, anchor="middle", extra=""):
        add(f'<text x="{x:g}" y="{y:g}" text-anchor="{anchor}" font-family="DejaVu Sans, Arial, sans-serif" font-size="{size}" font-weight="{weight}" fill="{fill}" {extra}>{html.escape(str(value))}</text>')
    def rect(x,y,w,h,fill,rx=0,extra=""):
        add(f'<rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" rx="{rx}" fill="{fill}" {extra}/>')
    def line(x1,y1,x2,y2,color,sw=1,extra=""):
        add(f'<line x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}" stroke="{color}" stroke-width="{sw}" {extra}/>')
    def circle(x,y,r,fill,extra=""):
        add(f'<circle cx="{x:g}" cy="{y:g}" r="{r:g}" fill="{fill}" {extra}/>')
    def pair(p):
        def num(n): return f'+{n}' if n > 0 else str(n).replace('-', '−')
        return f'({num(p[0])}, {num(p[1])})'

    rect(0,0,width,height,"#f7f8f4")
    text(76,84,"PRIM3",40,weight=700,anchor="start",extra='letter-spacing="7"')
    text(width-76,80,"CONCEPT 01  /  COACH VIEW",20,fill="#6f7b72",anchor="end",extra='letter-spacing="2"')
    text(76,151,"ORIGIN TRAINING",56,weight=700,anchor="start",extra='letter-spacing="1"')
    text(76,194,"E vs R vs T  ·  One objective. One coordinate frame.",24,fill="#68766c",anchor="start")
    line(76,220,width-76,220,"#c8d1c9",1)

    edge=10.5*scale
    x0,y0=cx-edge,cy-edge
    rect(x0-18,y0-18,edge*2+36,edge*2+36,"#e1e7e1",12)
    rect(x0,y0,edge*2,edge*2,"url(#floor)",4)
    # Tile centers are integers; boundaries are half-integers.
    for i in range(-10,11):
        for j in range(-10,11):
            if (i+j)%2 == 0:
                x,y=project(i-.5,j+.5)
                rect(x,y,scale,scale,"#edf1ec",0,extra='opacity=".55"')
    for n in range(22):
        p=x0+n*scale
        line(p,y0,p,y0+2*edge,"#c7d2c9",1)
        p=y0+n*scale
        line(x0,p,x0+2*edge,p,"#c7d2c9",1)

    for x,y,label in [(x0+72,y0+70,"−X / +Y"),(x0+2*edge-72,y0+70,"+X / +Y"),(x0+72,y0+2*edge-42,"−X / −Y"),(x0+2*edge-72,y0+2*edge-42,"+X / −Y")]:
        text(x,y,label,20,fill="#7f9083")

    # Low cover is drawn within its exact occupied cell, with shallow product-style relief.
    add('<g id="terrain-cover">')
    for gx,gy in data["cover_cells"]:
        x,y=project(gx,gy)
        add(f'<g data-grid-x="{gx}" data-grid-y="{gy}">')
        rect(x-18,y-12,44,40,"#203e2c",4,extra='opacity=".13"')
        rect(x-22,y-17,44,40,"#253b30",3)
        rect(x-22,y-22,44,36,"url(#cover)",3)
        line(x-16,y-15,x+16,y-15,"#9aa79e",2)
        line(x-14,y+7,x+14,y+7,"#273f32",2)
        rect(x-4,y-9,8,8,"#849789",1)
        add('</g>')
    add('</g>')

    # Four equal objective-interaction tiles; relay itself is not walkable.
    for gx,gy in data["objective"]["interaction_cells"]:
        x,y=project(gx,gy)
        rect(x-scale/2+3,y-scale/2+3,scale-6,scale-6,"#f5d887",5,extra='opacity=".62"')
    circle(cx,cy,150,"url(#objective-glow)")
    circle(cx,cy,95,"none",extra='stroke="#b18d3d" stroke-width="2" stroke-dasharray="5 9" opacity=".55"')

    # Both axes cross the center of the COMPLETE canvas, irrespective of the HUD.
    line(173,cy,width-173,cy,"#233b32",3.5,extra='id="axis-x" marker-start="url(#arrow)" marker-end="url(#arrow)"')
    line(cx,height-173,cx,173,"#233b32",3.5,extra='id="axis-y" marker-start="url(#arrow)" marker-end="url(#arrow)"')
    text(130,cy+10,"−X",28,weight=700)
    text(width-130,cy+10,"+X",28,weight=700)
    text(cx+43,176,"+Y",28,weight=700)
    text(cx+43,height-168,"−Y",28,weight=700)
    for n in range(-10,11):
        if n==0: continue
        x,y=project(n,0)
        line(x,cy-6,x,cy+6,"#233b32",2)
        x2,y2=project(0,n)
        line(cx-6,y2,cx+6,y2,"#233b32",2)
        if n%2 == 0:
            label=f'+{n}' if n>0 else str(n).replace('-','−')
            text(x,cy+31,label,21,extra='paint-order="stroke" stroke="#edf1ec" stroke-width="6" stroke-linejoin="round"')
            text(cx+22,y2+7,label,21,anchor="start",extra='paint-order="stroke" stroke="#edf1ec" stroke-width="6" stroke-linejoin="round"')

    # Central origin marker. Its data and exact SVG center make geometry machine-checkable.
    add(f'<g id="objective" data-grid-x="0" data-grid-y="0" data-screen-x="{cx:g}" data-screen-y="{cy:g}">')
    circle(cx,cy,34,"#21392e",extra='stroke="#d2a944" stroke-width="4"')
    circle(cx,cy,20,"#e5c365")
    line(cx-14,cy,cx+14,cy,"#20382c",2)
    line(cx,cy-14,cx,cy+14,"#20382c",2)
    circle(cx,cy,4,"#20382c",extra='id="origin-point"')
    # One offset callout leaves the +2 tick and all four interaction tiles visible.
    line(cx+27,cy+27,cx+86,cy+63,"#9a7c34",1.5)
    rect(cx+86,cy+42,204,78,"#f7edce",6,extra='stroke="#d0b16a" stroke-width="1"')
    text(cx+188,cy+69,"OBJECTIVE",23,weight=700,extra='letter-spacing="1"')
    text(cx+188,cy+105,"(0,0)",32,weight=700)
    add('</g>')

    # Stylized black mannequin markers: deliberately a map symbol, not a finished character asset.
    for u in data["operators"]:
        gx,gy=u["position"]; x,y=project(gx,gy); col=u["overlay_color"]
        add(f'<g id="unit-{u["role"]}" data-grid-x="{gx}" data-grid-y="{gy}" transform="translate({x:g},{y:g})">')
        circle(0,0,38,col,extra='opacity=".14"')
        if u["shape"]=="square": rect(-24,-24,48,48,col,10)
        elif u["shape"]=="diamond": add(f'<path d="M 0 -33 L 33 0 L 0 33 L -33 0 Z" fill="{col}"/>')
        else: circle(0,0,27,col)
        add('<ellipse cx="0" cy="9" rx="18" ry="12" fill="#17271f" opacity=".25"/>')
        rect(-13,-4,26,23,"#16241c",7)
        rect(-22,-3,9,23,"#27372d",4)
        rect(13,-3,9,23,"#27372d",4)
        circle(0,-12,11,"url(#head)")
        line(-8,3,8,3,"#687e6e",1.4)
        add('</g>')
        # Role and coordinate are both explicit; color never carries identity alone.
        if u["role"]=="T":
            lx,ly=x+210,y-26
            line(x+37,y-5,lx-102,ly+13,col,1.5)
        else: lx,ly=x,y+69
        rect(lx-108,ly-29,216,73,"#f8faf6",6,extra='stroke="#d2dcd3" stroke-width="1"')
        text(lx,ly,u["role"]+"  ·  "+u["name"],24,fill=col,weight=700)
        text(lx,ly+30,pair(u["position"]),25,weight=500,extra=f'id="coordinates-{u["role"]}"')

    # Separate footer overlays do not alter the map center.
    line(76,height-126,width-76,height-126,"#c8d1c9",1)
    text(76,height-76,"CLAIM  ·  VERIFY  ·  HOLD",29,weight=700,anchor="start")
    text(76,height-40,"All three roles can score. Training outcomes stay in the simulation.",20,fill="#6b796e",anchor="start")
    text(width-76,height-77,"1 CELL = 1 TRAINING UNIT",22,weight=500,anchor="end")
    text(width-76,height-40,"Sample layout · balance testing pending",20,fill="#6b796e",anchor="end")
    add('</svg>')
    SVG.write_text('\n'.join(out)+'\n',encoding='utf-8')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--png',action='store_true',help='Also render PNG using installed Inkscape')
    args=parser.parse_args()
    data=json.loads(FIXTURE.read_text(encoding='utf-8'))
    distances=validate(data)
    render(data)
    print(f'SVG: {SVG.relative_to(ROOT)}')
    print(f'Objective at screen center: {data["visual_contract"]["origin_screen"]}')
    print(f'Shortest orthogonal distance to an interaction tile: {distances}; this is not a balance claim.')
    if args.png:
        executable=shutil.which('inkscape')
        if not executable:
            raise SystemExit('Install Inkscape to use --png; the SVG has been generated.')
        subprocess.run([executable,str(SVG),'--export-type=png','--export-filename='+str(PNG)],check=True)
        print(f'PNG: {PNG.relative_to(ROOT)}')


if __name__=='__main__':
    main()
