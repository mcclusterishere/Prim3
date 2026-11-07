#!/usr/bin/env python3
"""Build the proposed origin-locked 3D reference from authored geometry.

Outputs an offline WebGL HTML preview, source JSON, and a deterministic PNG
render of the same meshes. Python PNG export requires numpy and Pillow.
The scene is a visual design reference, not a combat or navigation runtime.
"""
from __future__ import annotations
import argparse, json, math, random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/reference/tactical-map"
STEM = "PRIM3-objective-origin-training-v02"

PALETTE = {
    "soil": "#899584", "rock": "#68776e", "concrete": "#b9c3b3",
    "wall": "#92a5a2", "roof": "#536b70", "metal": "#354a51",
    "rust": "#ac7047", "sand": "#c5b99b", "road": "#52666a",
    "water": "#2e6b70", "ivory": "#e4e8d4", "yellow": "#edbd59",
    "orange": "#e49b5d", "teal": "#4ccec4", "purple": "#b8a1ed",
}

def make_scene():
    objects, features, access = [], [], []
    def box(x,y,z,w,d,h,color,group="terrain",id=None):
        objects.append(dict(kind="box",p=[x,y,z],s=[w,d,h],c=PALETTE.get(color,color),group=group,**({"id":id} if id else {})))
    def cyl(x,y,z,r,h,color,n=12,group="detail"):
        objects.append(dict(kind="cylinder",p=[x,y,z],r=r,h=h,n=n,c=PALETTE.get(color,color),group=group))
    def ramp(id,a,b,width):
        objects.append(dict(kind="ramp",a=a,b=b,w=width,c=PALETTE["concrete"],group="access",id=id))
        access.append(dict(id=id,kind="ramp",start=a,end=b,width=width,walkable=True))
    def stairs(id,a,b,width,steps=16):
        # Contiguous treads, equal risers, and endpoint landings make the access
        # visible in the design reference. Runtime movement costs remain TBD.
        dx,dy,dz=[b[i]-a[i] for i in range(3)]
        for i in range(steps):
            t=(i+.5)/steps
            if abs(dx)>abs(dy): box(a[0]+dx*t,a[1]+dy*t,a[2],abs(dx)/steps+.04,width,dz*(i+1)/steps,"concrete","access")
            else: box(a[0]+dx*t,a[1]+dy*t,a[2],width,abs(dy)/steps+.04,dz*(i+1)/steps,"concrete","access")
        access.append(dict(id=id,kind="stairs",start=a,end=b,width=width,steps=steps,walkable=True))
    def rail(x,y,z,w,d):
        box(x,y,z,w,d,.22,"metal","detail")
        alongx=w>d
        for k in range(max(2,int(max(w,d)/3)+1)):
            t=k/(max(2,int(max(w,d)/3)+1)-1)-.5
            box(x+(w*t if alongx else 0),y+(d*t if not alongx else 0),z-1.8,.18,.18,1.8,"metal","detail")
    def building(id,x,y,w,d,base,height):
        box(x+1,y-1,base,w+2,d+2,.12,"rock","shadow")
        box(x,y,base,w,d,height,"wall","buildings",id)
        box(x,y,base+height,w+.5,d+.5,.55,"roof","roofs")
        for yy in [-1,1]:
            box(x,y+yy*(d/2-.3),base+height+.55,w,.5,1,"concrete","roofs")
        gates={"west-service-roof":(1,20,6),"west-overwatch":(1,53,5),"east-recon-roof":(-1,-44,6),"east-foundry":(-1,21.5,9),"north-relay-house":(1,57,6),"north-pump-tower":(-1,55,6),"south-workshop":(1,-40,5)}
        side,gate_y,gate_w=gates[id]
        for xx in [-1,1]:
            if xx!=side:box(x+xx*(w/2-.3),y,base+height+.55,.5,d,1,"concrete","roofs")
            else:
                for lo,hi in [(y-d/2,max(y-d/2,gate_y-gate_w/2)),(min(y+d/2,gate_y+gate_w/2),y+d/2)]:
                    if hi>lo:box(x+xx*(w/2-.3),(lo+hi)/2,base+height+.55,.5,hi-lo,1,"concrete","roofs")
        for z in range(int(base+2),int(base+height),3):
            for k in range(max(1,int(w/4))):
                xx=x-w/2+2+k*4
                box(xx,y-d/2-.035,z,2.3,.1,1.2,"metal","buildings")
            for k in range(max(1,int(d/4))):
                yy=y-d/2+2+k*4
                box(x+w/2+.035,yy,z,.1,2.3,1.2,"metal","buildings")
        box(x,y-d/2-.08,base,3.4,.15,3.4,"metal","buildings")
        # Roof apparatus leaves walkable perimeter and makes the elevation legible.
        box(x-w*.18,y+d*.16,base+height+.55,4,3,1.6,"metal","roofs")
        for i in range(3): box(x-w*.18-1.2+i*1.2,y+d*.16,base+height+2.17,.4,2.5,.12,"ivory","roofs")
        features.append(dict(id=id,kind="building",footprint=[x-w/2,y-d/2,x+w/2,y+d/2],base_z=base,roof_z=base+height+.55))

    # The 128 x 128 arena is usable terrain to the bounds, not empty padding.
    box(0,0,-8,128,128,3,"rock")
    box(-38,0,-5,52,128,5,"soil")
    box(38,0,-5,52,128,5,"soil")
    box(0,26,-5,24,76,5,"soil")
    box(0,-38,-5,24,52,1,"concrete")
    box(0,-40,-3.95,11,47,.08,"water")
    box(-12,-39,-4,1.4,50,4,"wall")
    box(12,-39,-4,1.4,50,4,"wall")
    box(-47,30,0,34,68,4,"rock")
    box(47,0,0,34,128,4,"rock")
    box(0,48,0,60,32,4,"rock")
    # Walkable industrial surfaces and roadway ribbons.
    for x,y,w,d,z in [(-47,30,34,68,4),(47,0,34,128,4),(0,48,60,32,4),(-23,-34,13,60,0),(22,8,14,48,0),(-10,25,40,12,0)]:
        box(x,y,z+.015,w,d,.09,"road")
    for yy in [-43,-15]:
        box(0,yy,-.5,29,8,.5,"concrete","access")
        # Open the south rails where the canal ramp/stairs arrive.
        opening=(-10.5,-5.5) if yy==-43 else (6,10)
        for lo,hi in [(-14,opening[0]),(opening[1],14)]:rail((lo+hi)/2,yy-3.6,2,hi-lo,.22)
        rail(0,yy+3.6,2,28,.22)
    # Upper ends meet the bank faces; they do not disappear into raised ground.
    ramp("east-yard-ramp",[20,-20,0],[30,-20,4],7)
    ramp("west-ridge-ramp",[-43,-13,0],[-43,-4,4],7)
    ramp("north-yard-ramp",[-4,24,0],[-4,32,4],8)
    ramp("canal-south-ramp",[-8,-63,-4],[-8,-49,0],5)
    box(-8,-47,-.45,5,4,.45,"concrete","access")
    access.append(dict(id="canal-ramp-landing",kind="landing",start=[-8,-49,0],end=[-8,-45,0],width=5,walkable=True))
    stairs("canal-exit",[8,-28,-4],[8,-18,0],4,12)

    building("west-service-roof",-45,13,23,22,4,8)
    building("west-overwatch",-46,44,24,22,4,12)
    building("east-recon-roof",45,-44,20,22,4,8)
    building("east-foundry",46,16,24,27,4,8)
    building("north-relay-house",-24,49,18,23,4,8)
    building("north-pump-tower",22,49,18,20,4,12)
    building("south-workshop",-48,-46,20,17,0,5)
    # Access links reach each elevated area; climb movement is explicit in data.
    box(-30,1,0,4,4,4,"concrete","access")
    box(-30,31,0,4,4,4,"concrete","access")
    stairs("west-service-stairs",[-30,1,4],[-30,20,12.55],4,25)
    stairs("west-overwatch-stairs",[-30,31,4],[-30,53,16.55],4,30)
    stairs("east-recon-stairs",[32,-24,4],[32,-44,12.55],4,24)
    stairs("east-foundry-stairs",[31,1,4],[31,23,12.55],4,25)
    stairs("north-relay-stairs",[-11,38,4],[-11,57,12.55],4,24)
    stairs("north-tower-stairs",[9,37,4],[9,55,16.55],4,30)
    stairs("south-workshop-stairs",[-34,-54,0],[-34,-40,5.55],4,17)
    # Small landings bridge stair endings to roofs without invisible jumps.
    for x,y,z,w,d in [(-32,20,12.55,8,4),(-32,53,16.55,8,4),(34,-44,12.55,7,4),(33,23,12.55,8,4),(-13,57,12.55,8,4),(11,55,16.55,8,4),(-36,-40,5.55,8,4)]:
        box(x,y,z-.45,w,d,.45,"concrete","access")
    # Elevated bridge offers a visible exposed route between both roof chains.
    box(0,20,11.35,72,5,1.2,"roof","access")
    rail(0,17.6,13.65,72,.2);rail(0,22.4,13.65,72,.2)
    for x in [-25,-9,9,25]:
        box(x,20,0,1.2,4,11.35,"metal","detail")
        box(x,20,10,4,5,1,"metal","detail")
    access.append(dict(id="exposed-skybridge",kind="bridge",start=[-36,20,12.55],end=[36,20,12.55],width=5,walkable=True))
    features.append(dict(id="skybridge",kind="bridge",z=12.55,cover="low rails only",counter_routes=["ground-yard","canal-exit"]))
    # Broken walls and berms divide approach sectors without sealing routes.
    walls=[(-21,-8,10,1.8,2),(-18,8,1.8,13,3),(21,-8,11,1.8,2),(21,9,1.8,10,3),(-9,29,9,1.4,2.5),(14,29,10,1.4,2.5),(-49,-18,20,1.8,2),(-20,-53,1.8,13,2.3),(45,-14,18,1.5,2.3)]
    for x,y,w,d,h in walls:box(x,y,4 if x>30 else 0,w,d,h,"concrete","cover")
    rng=random.Random(1037)
    cover=[]
    footprints=[f["footprint"] for f in features if f["kind"]=="building"]
    access_rects=[]
    for a in access:
        p,q=a["start"],a["end"]; pad=a["width"]*.5+2
        access_rects.append([min(p[0],q[0])-pad,min(p[1],q[1])-pad,max(p[0],q[0])+pad,max(p[1],q[1])+pad])
    def allowed(x,y):
        if abs(x)<15 and y<11:return False
        if x*x+y*y<18*18:return False
        for a,b,c,d in footprints+access_rects:
            if a-1<x<c+1 and b-1<y<d+1:return False
        return True
    def ground(x,y):return 4 if x>30 or (x<-30 and y>-4) or y>32 else 0
    for i in range(95):
        for tries in range(100):
            x,y=rng.uniform(-60,60),rng.uniform(-60,60)
            if allowed(x,y):break
        else:continue
        if any((x-a)**2+(y-b)**2<25 for a,b in cover):continue
        z=ground(x,y);cover.append((x,y))
        if i%4==0:
            box(x,y,z,6,2.3,1.3,"sand","cover")
            for j in range(3):box(x-2+j*2,y,z+1.3,1.8,2,.25,"sand","cover")
        elif i%4==1:
            box(x,y,z,3.5,3,2.4,"rust","cover")
            for yy in [-1,1]:box(x,y+yy*1.51,z+.4,3,.08,.15,"metal","detail")
        elif i%4==2:
            box(x,y,z,4.5,2.5,1.6,"concrete","cover")
        else:
            for dx in [-.8,.8]:cyl(x+dx,y,z,.65,1.8,"metal",10,"cover")
    # Rail yard, cable gantries, container stacks and pipework give scale.
    for x in [-58,-55]:
        box(x,-18,.16,.18,32,.15,"metal","detail")
    for yy in range(-33,-3,2):box(-56.5,yy,.08,4,.4,.15,"sand","detail")
    for x,y,z in [(-55,-20,0),(54,-5,4),(59,-51,4),(54,49,4)]:
        box(x,y,z,6,12,3.2,"rust","cover")
        for j in range(6):box(x+3.04,y-5+j*2,z+.4,.08,.24,2.5,"sand","detail")
    for x in [-60,60]:
        for y in [-56,-24,10,50]:
            z=ground(x,y);box(x,y,z,.45,.45,10,"metal","detail");box(x,y,10+z,4,.4,.25,"yellow","detail")
    # Objective footprint and exact origin. Marker hover is decorative only.
    cyl(0,0,0,6,.2,"metal",48,"objective")
    cyl(0,0,.22,5.3,.1,"yellow",48,"objective")
    cyl(0,0,.34,4.7,.08,"road",48,"objective")
    box(0,0,.45,2.4,2.4,1.8,"ivory","objective")
    box(0,0,2.3,1.4,1.4,.3,"yellow","objective")
    for i in range(4):
        a=i*math.pi/2;cyl(math.cos(a)*4,math.sin(a)*4,.5,.4,.22,"yellow",10,"objective")
    operators=[
        dict(role="E",name="ENTRY",position=[-48,-30,0],color=PALETTE["orange"]),
        dict(role="R",name="RECON",position=[44,-44,12.55],color=PALETTE["teal"]),
        dict(role="T",name="TECHNICAL",position=[-4,52,4.1],color=PALETTE["purple"]),
    ]
    for o in operators:
        x,y,z=o["position"];cyl(x,y,z+.1,2.3,.18,o["color"],24,"operators")
        box(x-.37,y,z+.3,.45,.55,1.4,"metal","operators");box(x+.37,y,z+.3,.45,.55,1.4,"metal","operators")
        box(x,y,z+1.5,1.35,.7,1.4,"metal","operators");cyl(x,y,z+2.95,.43,.65,"metal",10,"operators")
    routes=[
        dict(id="E-covered-ground",color=PALETTE["orange"],points=[[-48,-30,.3],[-36,-30,.3],[-23,-39,.3],[-18,-24,.3],[-17,-10,.3],[-8,-4,.3]],description="Illustrative ground approach; exposure and AP costs await runtime validation"),
        dict(id="R-roof-to-yard",color=PALETTE["teal"],points=[[44,-44,13],[32,-44,13],[32,-24,4.4],[32,-20,4.4],[20,-20,.4],[17,-5,.4],[8,-4,.4]],description="Roof, stairs, east ramp, ground approach"),
        dict(id="T-north-ramp",color=PALETTE["purple"],points=[[-4,52,4.4],[-4,36,4.4],[-4,24,.4],[-13,15,.4],[-9,5,.4],[-4,4,.4]],description="Northern yard to central relay via ramp"),
    ]
    return dict(status="PROPOSED",reference_id=STEM,exercise_id="EX-ORIGIN-ERT",version="0.2.0",purpose="3D battlefield visual and interaction reference; no combat, navigation, LOS, multiplayer, or balance certification",coordinates=dict(min_x=-64,max_x=64,min_y=-64,max_y=64,unit="abstract training unit",vertical_axis="Z",objective_origin=[0,0,0],minimum_training_extent=dict(min_x=-50,max_x=50,min_y=-50,max_y=50),camera="orthographic 3D; projected world axes intersect at full-viewport center; no panning",elevation_levels=[-4,0,4,5.55,12.55,16.55]),objective=dict(position=[0,0,0],interaction_positions=[[-4,0,0],[4,0,0],[0,-4,0],[0,4,0]],disclosed=True),operators=operators,features=features,access_links=access,cover_count=len(cover)+len(walls)+4,routes=routes,objects=objects,visual_contract=dict(roles="coach reference; live hidden positions must not be exposed",roof_mode="visual cutaway only; no collision change",routes="illustrative waypoint paths, not pathfinding results",colors="presentation overlays, not canonical uniforms",terrain="proposed fictional training environment",origin_locked=True))

def meshes(scene):
    """Quads/triangles in right-handed X/Y ground, Z up."""
    faces=[]
    def add(v,c,g):faces.append((v,c,g))
    for ob in scene["objects"]:
        c,g=ob["c"],ob["group"]
        if ob["kind"]=="box":
            x,y,z=ob["p"];w,d,h=ob["s"];a,b=x-w/2,x+w/2;l,r=y-d/2,y+d/2;t=z+h
            add([[a,l,z],[b,l,z],[b,l,t],[a,l,t]],c,g);add([[b,l,z],[b,r,z],[b,r,t],[b,l,t]],c,g)
            add([[b,r,z],[a,r,z],[a,r,t],[b,r,t]],c,g);add([[a,r,z],[a,l,z],[a,l,t],[a,r,t]],c,g)
            add([[a,l,t],[b,l,t],[b,r,t],[a,r,t]],c,g)
        elif ob["kind"]=="cylinder":
            x,y,z=ob["p"];r,h,n=ob["r"],ob["h"],ob["n"]
            ring=[[x+r*math.cos(i*2*math.pi/n),y+r*math.sin(i*2*math.pi/n),z+h] for i in range(n)]
            add(ring,c,g)
            for i in range(n):
                a,b=ring[i],ring[(i+1)%n];add([[a[0],a[1],z],[b[0],b[1],z],b,a],c,g)
        elif ob["kind"]=="ramp":
            a,b,w=ob["a"],ob["b"],ob["w"];dx,dy=b[0]-a[0],b[1]-a[1];length=math.hypot(dx,dy);nx,ny=-dy/length*w/2,dx/length*w/2
            p=[a[0]+nx,a[1]+ny,a[2]];q=[a[0]-nx,a[1]-ny,a[2]];r=[b[0]-nx,b[1]-ny,b[2]];s=[b[0]+nx,b[1]+ny,b[2]]
            # Each lower endpoint is already at the base: side faces must be
            # triangles, not quads beginning with a duplicate vertex.
            rb=[r[0],r[1],a[2]];sb=[s[0],s[1],a[2]]
            add([p,q,r,s],c,g);add([q,rb,r],c,g);add([p,s,sb],c,g);add([r,rb,sb,s],c,g)
    return faces

def validate(scene):
    c=scene["coordinates"]
    assert c["min_x"]<=-50 and c["max_x"]>=50 and c["min_y"]<=-50 and c["max_y"]>=50,"Training field is undersized"
    assert scene["objective"]["position"]==[0,0,0]
    assert c["max_x"]-c["min_x"]==128 and c["max_y"]-c["min_y"]==128
    assert {o["role"] for o in scene["operators"]}=={"E","R","T"}
    for link in scene["access_links"]:
        for p in [link["start"],link["end"]]: assert -64<=p[0]<=64 and -64<=p[1]<=64
    for o in scene["operators"]:
        assert -64<=o["position"][0]<=64 and -64<=o["position"][1]<=64
    assert scene["cover_count"]>=50 and len(scene["access_links"])>=12

HTML = r'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PRIM3 · Origin battlefield / 02</title>
<style>
*{box-sizing:border-box;min-width:0}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#101d24;color:#edf1e7;font-family:Arial,Helvetica,sans-serif}canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none}#labels{pointer-events:none}header{position:absolute;left:16px;right:16px;top:16px;pointer-events:none}.eyebrow{font-size:11px;letter-spacing:2px;color:#a3b3b4;margin:0 0 9px}h1{font-size:22px;font-weight:600;letter-spacing:-.6px;margin:0 0 9px}header p{font-size:12px;line-height:1.5;color:#aabbb8;margin:0}.badge{position:absolute;right:16px;top:125px;text-align:right;font-size:10px;letter-spacing:1px;line-height:1.8;color:#aabbb8}.badge b{color:#edbd59;font-size:18px;letter-spacing:0}.toolbar{position:absolute;left:16px;right:16px;bottom:16px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;padding:7px;background:#14262ce6;border:1px solid #425258;border-radius:10px;box-shadow:0 12px 40px #0005}button{min-width:0;border:1px solid #42545a;border-radius:5px;background:#243940;color:#dce6e2;font:16px Arial;padding:11px 8px;cursor:pointer;white-space:normal}button[aria-pressed=true]{background:#d8b464;color:#142126;border-color:#eac77a}button:hover{border-color:#b3c8c8}button:focus-visible{outline:2px solid #eac77a;outline-offset:2px}.note{position:absolute;bottom:235px;left:16px;right:16px;font-size:10px;line-height:1.8;color:#9eb1b3;pointer-events:none}.scale{position:absolute;right:16px;left:16px;bottom:150px;font-size:11px;line-height:1.8;text-align:right;color:#a3b6b7;pointer-events:none}.scale strong{font-size:15px;color:#eef2e8}.error{display:none;position:absolute;left:16px;right:16px;top:35%;padding:20px;background:#243940;border:1px solid #d8b464;line-height:1.6}
@media(min-width:700px){header{left:32px;right:auto;top:28px;max-width:440px}.eyebrow{letter-spacing:3px}h1{font-size:27px;letter-spacing:-1px}.badge{right:32px;top:30px;font-size:11px;letter-spacing:1.5px}.badge b{font-size:16px}.toolbar{left:50%;right:auto;bottom:26px;transform:translateX(-50%);display:flex;gap:6px}button{padding:10px 13px;white-space:nowrap}.note{bottom:30px;left:30px;right:auto;max-width:230px}.scale{right:30px;left:auto;bottom:30px}.scale strong{font-size:16px}.error{left:25%;right:auto;width:50%;padding:30px}}
</style></head>
<body><canvas id="scene" aria-label="Interactive 3D tactical battlefield with origin-centered X and Y coordinates"></canvas><canvas id="labels" aria-hidden="true"></canvas>
<header><div class="eyebrow">PRIM3 / ERT FIELD TRAINING</div><h1>One objective. Many ways in.</h1><p>Ruined transit compound · elevated roofs · canal flank<br>Drag to orbit. Scroll to zoom. Objective stays centered.</p></header>
<div class="badge">BATTLEFIELD REFERENCE 02<br><b>128 × 128</b><br>X −64…+64 / Y −64…+64</div>
<div class="note">PROPOSED / COACH VIEW<br>Visual interaction preview. Combat and movement<br>rules are specified separately; no balance claim.</div>
<div class="scale"><strong id="elevation">Floor / roof Z −4 → +16.55</strong><br>One world unit per coordinate unit<br>Origin locked · equal X/Y world scale</div>
<div class="toolbar" role="toolbar" aria-label="Battlefield view"><button id="axes" aria-pressed="true">Coordinates</button><button id="routes" aria-pressed="false">Approaches</button><button id="cut" aria-pressed="false">Roof cutaway</button><button id="reset">Reset view</button></div>
<div id="error" class="error">This preview requires WebGL. Open the accompanying PNG for the same authored scene.</div>
<script>
const DATA=__SCENE__;
const FACES=__FACES__;
const canvas=document.getElementById('scene'), overlay=document.getElementById('labels'), ctx=overlay.getContext('2d');
const gl=canvas.getContext('webgl',{antialias:true,alpha:false,preserveDrawingBuffer:true});
let angle=Math.PI/4,pitch=.69,zoom=1,axes=true,routes=false,cut=false,drag=false,last=[0,0],W=0,H=0,scale=1;
function basis(){return {r:[Math.cos(angle),Math.sin(angle),0],u:[-Math.sin(angle)*Math.sin(pitch),Math.cos(angle)*Math.sin(pitch),Math.cos(pitch)],d:[Math.sin(angle)*Math.cos(pitch),-Math.cos(angle)*Math.cos(pitch),Math.sin(pitch)]}}
function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}
function project(p){const b=basis();return [W/2+dot(p,b.r)*scale,H/2-dot(p,b.u)*scale]}
function shader(type,src){let s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
let program,buffer,count=0;
function upload(){let v=[];for(const f of FACES){if(cut&&(f[2]==='roofs'||f[2]==='buildings'))continue;let ps=f[0],c=f[1].slice(1).match(/../g).map(x=>parseInt(x,16)/255),a=ps[0],b=ps[1],d=ps[2],e=b.map((x,i)=>x-a[i]),q=d.map((x,i)=>x-a[i]);let n=[e[1]*q[2]-e[2]*q[1],e[2]*q[0]-e[0]*q[2],e[0]*q[1]-e[1]*q[0]],l=Math.hypot(...n)||1;n=n.map(x=>x/l);for(let i=1;i<ps.length-1;i++)for(const p of [a,ps[i],ps[i+1]])v.push(...p,...n,...c)}count=v.length/9;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(v),gl.STATIC_DRAW)}
if(gl){program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,`attribute vec3 p;attribute vec3 n;attribute vec3 c;uniform vec3 right;uniform vec3 up;uniform vec3 depth;uniform vec2 unit;varying vec3 color;void main(){gl_Position=vec4(dot(p,right)*unit.x,dot(p,up)*unit.y,-dot(p,depth)/280.0,1.0);float light=.48+.52*max(0.0,dot(normalize(n),normalize(vec3(-.4,-.6,1.0))));color=c*light;}`));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,`precision mediump float;varying vec3 color;void main(){gl_FragColor=vec4(color,1.0);}`));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);buffer=gl.createBuffer();upload();for(const [name,off]of [['p',0],['n',12],['c',24]]){let l=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,3,gl.FLOAT,false,36,off)}gl.enable(gl.DEPTH_TEST);gl.clearColor(.063,.114,.141,1)}else document.getElementById('error').style.display='block';
function line(points,color,width=1,dash=[]){ctx.beginPath();points.forEach((p,i)=>{let a=project(p);i?ctx.lineTo(...a):ctx.moveTo(...a)});ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([])}
function label(p,text,color='#dae6df',dx=0,dy=0,size=11){let a=project(p);ctx.font=`600 ${size}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';const width=ctx.measureText(text).width+14;ctx.fillStyle='#13272de8';ctx.fillRect(a[0]+dx-width/2,a[1]+dy-11,width,22);ctx.fillStyle=color;ctx.fillText(text,a[0]+dx,a[1]+dy)}
function draw(){let dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;scale=Math.min(W/205,H/150)*zoom;for(const c of [canvas,overlay]){c.width=W*dpr;c.height=H*dpr}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);if(gl){gl.viewport(0,0,canvas.width,canvas.height);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);const b=basis();for(const k of ['right','up','depth'])gl.uniform3fv(gl.getUniformLocation(program,k),b[k==='right'?'r':k==='up'?'u':'d']);gl.uniform2f(gl.getUniformLocation(program,'unit'),2*scale/W,2*scale/H);gl.drawArrays(gl.TRIANGLES,0,count)}
if(axes){for(let t=-64;t<=64;t+=16){if(t===0)continue;line([[t,-64,.12],[t,64,.12]],'#dae7db18');line([[-64,t,.12],[64,t,.12]],'#dae7db18')};line([[-64,0,0],[64,0,0]],'#f1c970b0',1.4,[5,5]);line([[0,-64,0],[0,64,0]],'#b6e3dec0',1.4,[5,5]);for(let t=-64;t<=64;t+=16){if(t){label([t,0,0],(t>0?'+':'')+t,'#e3c581',0,13,9);label([0,t,0],(t>0?'+':'')+t,'#acccc8',-14,0,9)}}for(const [p,t,c]of [[[74,0,0],'+X','#f1c970'],[[-74,0,0],'−X','#f1c970'],[[0,74,0],'+Y','#b6e3de'],[[0,-74,0],'−Y','#b6e3de']])label(p,t,c,0,0,13)}
if(routes)for(const r of DATA.routes){line(r.points,r.color,2.5,[6,4]);for(const p of r.points){const q=project(p);ctx.beginPath();ctx.arc(...q,3,0,Math.PI*2);ctx.fillStyle=r.color;ctx.fill()}}
let o=project([0,0,0]);ctx.beginPath();ctx.arc(...o,9,0,Math.PI*2);ctx.strokeStyle='#f2c361';ctx.lineWidth=2;ctx.stroke();label([0,0,0],'OBJECTIVE  (0, 0)','#f2c361',0,31,12);
for(const a of DATA.operators){let p=a.position;label([p[0],p[1],p[2]+4],a.role+' / '+a.name,a.color,W<700&&a.role==='R'?75:0,W<700&&a.role==='R'?30:-17,11)}
label([-42,36,17],'WEST ROOFS  +16.55','#c4d0c8',-15,-20,10);label([0,20,14],'EXPOSED SKYBRIDGE  +12.55','#c4d0c8',0,-10,10);label([0,-38,-3],'CANAL FLANK  −4','#a2d1ce',-80,25,10);
window.__PRIM3_STATE__={width:W,height:H,originScreen:project([0,0,0]),bounds:DATA.coordinates,axes,routes,cut,angle,pitch,zoom,triangles:count/3};}
canvas.addEventListener('pointerdown',e=>{drag=true;last=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);canvas.addEventListener('pointermove',e=>{if(drag){angle+=(e.clientX-last[0])*.006;pitch=Math.max(.36,Math.min(1.25,pitch+(e.clientY-last[1])*.004));last=[e.clientX,e.clientY];draw()}});canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.65,Math.min(2.2,zoom*Math.exp(-e.deltaY*.001)));draw()},{passive:false});
for(const id of ['axes','routes','cut'])document.getElementById(id).onclick=()=>{if(id==='axes')axes=!axes;if(id==='routes')routes=!routes;if(id==='cut'){cut=!cut;if(gl)upload()}document.getElementById(id).setAttribute('aria-pressed',String(id==='axes'?axes:id==='routes'?routes:cut));draw()};document.getElementById('reset').onclick=()=>{angle=Math.PI/4;pitch=.69;zoom=1;draw()};addEventListener('resize',draw);draw();
</script></body></html>'''

def render_png(scene,faces,path,width=1800,height=1250):
    import numpy as np
    from PIL import Image,ImageDraw,ImageFont
    W,H=width,height; ss=1.5;w,h=round(W*ss),round(H*ss)
    rgb=np.empty((h,w,3),dtype=np.uint8);rgb[:]=[16,29,36]
    depth=np.full((h,w),-1e9,dtype=np.float32)
    theta=math.pi/4;pitch=.69;scale=min(W/205,H/150)*ss
    r=np.array([math.cos(theta),math.sin(theta),0]);u=np.array([-math.sin(theta)*math.sin(pitch),math.cos(theta)*math.sin(pitch),math.cos(pitch)]);d=np.array([math.sin(theta)*math.cos(pitch),-math.cos(theta)*math.cos(pitch),math.sin(pitch)])
    light=np.array([-.4,-.6,1]);light/=np.linalg.norm(light)
    def proj(p):return [w/2+np.dot(p,r)*scale,h/2-np.dot(p,u)*scale,np.dot(p,d)]
    for points,color,group in faces:
        vs=np.array(points,dtype=float);normal=np.cross(vs[1]-vs[0],vs[2]-vs[0]);length=np.linalg.norm(normal)
        if length<1e-8:continue
        normal/=length
        if np.dot(normal,d)<-1e-6:continue
        shade=.48+.52*max(0,np.dot(normal,light));col=np.array([int(color[i:i+2],16) for i in (1,3,5)])*shade
        ps=np.array([proj(p) for p in points])
        for i in range(1,len(ps)-1):
            a,b,c=ps[0],ps[i],ps[i+1];x0=max(0,int(math.floor(min(a[0],b[0],c[0]))));x1=min(w,int(math.ceil(max(a[0],b[0],c[0])))+1);y0=max(0,int(math.floor(min(a[1],b[1],c[1]))));y1=min(h,int(math.ceil(max(a[1],b[1],c[1])))+1)
            if x1<=x0 or y1<=y0:continue
            den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1])
            if abs(den)<1e-9:continue
            yy,xx=np.mgrid[y0:y1,x0:x1];v=((b[1]-c[1])*(xx+.5-c[0])+(c[0]-b[0])*(yy+.5-c[1]))/den;t=((c[1]-a[1])*(xx+.5-c[0])+(a[0]-c[0])*(yy+.5-c[1]))/den;s=1-v-t;z=v*a[2]+t*b[2]+s*c[2];mask=(v>=-1e-5)&(t>=-1e-5)&(s>=-1e-5)&(z>=depth[y0:y1,x0:x1]);depth[y0:y1,x0:x1][mask]=z[mask];rgb[y0:y1,x0:x1][mask]=col.astype(np.uint8)
    img=Image.fromarray(rgb).resize((W,H),Image.Resampling.LANCZOS);dr=ImageDraw.Draw(img)
    regular='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
    def font(s,b=False):return ImageFont.truetype(bold if b else regular,s)
    def p(v):q=proj(v);return(q[0]/ss,q[1]/ss)
    def dashed(points,color,width=1,dash=8):
        q=[p(v) for v in points]
        for a,b in zip(q,q[1:]):
            dist=math.dist(a,b)
            for st in range(0,int(dist),dash*2):
                t0=st/dist;t1=min(1,(st+dash)/dist);dr.line([a[0]+(b[0]-a[0])*t0,a[1]+(b[1]-a[1])*t0,a[0]+(b[0]-a[0])*t1,a[1]+(b[1]-a[1])*t1],fill=color,width=width)
    def label(pos,text,color='#dce6df',offset=(0,0),size=13):
        x,y=p(pos);x+=offset[0];y+=offset[1];f=font(size,True);bb=dr.textbbox((0,0),text,font=f);tw=bb[2]-bb[0];dr.rounded_rectangle((x-tw/2-8,y-size/2-6,x+tw/2+8,y+size/2+6),radius=3,fill='#15292f');dr.text((x,y),text,font=f,anchor='mm',fill=color)
    # Projected X/Y axes are overlays so center/orientation remain legible through cover.
    dashed([[-64,0,0],[64,0,0]],'#d5b66d',2,7);dashed([[0,-64,0],[0,64,0]],'#a4c7c4',2,7)
    for t in [-64,-48,-32,-16,16,32,48,64]:
        label([t,0,0],f'{t:+d}','#e3c581',(0,18),10);label([0,t,0],f'{t:+d}','#b4d2cf',(-20,0),10)
    for pos,text,col in [([74,0,0],'+X','#e3c581'),([-74,0,0],'−X','#e3c581'),([0,74,0],'+Y','#b4d2cf'),([0,-74,0],'−Y','#b4d2cf')]:label(pos,text,col,size=18)
    for o in scene['operators']:
        x,y,z=o['position'];label([x,y,z+5],o['role']+' / '+o['name'],o['color'],(0,-12),15)
    x,y=p([0,0,0]);dr.ellipse((x-10,y-10,x+10,y+10),outline='#edbd59',width=2);label([0,0,0],'OBJECTIVE  (0, 0)','#f2c361',(0,42),16)
    label([-42,36,17],'WEST ROOFS  +16.55',offset=(-15,-23));label([0,20,14],'EXPOSED SKYBRIDGE  +12.55',offset=(0,-14));label([0,-38,-3],'CANAL FLANK  −4','#a2d1ce',(-95,25))
    dr.text((48,37),'PRIM3 / ERT FIELD TRAINING',font=font(15),fill='#a3b3b4');dr.text((46,67),'One objective. Many ways in.',font=font(35,True),fill='#edf1e7')
    dr.text((48,119),'Ruined transit compound · elevated roofs · canal flank',font=font(16),fill='#aabbb8')
    dr.text((W-48,40),'BATTLEFIELD REFERENCE 02',font=font(14),fill='#aabbb8',anchor='ra');dr.text((W-48,69),'128 × 128',font=font(28,True),fill='#edbd59',anchor='ra');dr.text((W-48,111),'X −64…+64 / Y −64…+64',font=font(15),fill='#aabbb8',anchor='ra')
    dr.text((48,H-106),'PROPOSED / COACH VIEW',font=font(12,True),fill='#afc0c1');dr.text((48,H-81),'Origin locked · equal X/Y world scale',font=font(12),fill='#9eb1b3');dr.text((48,H-59),'3D visual reference · movement and combat integration pending',font=font(12),fill='#9eb1b3')
    dr.text((W-48,H-100),'Floor / roof Z −4 → +16.55',font=font(21,True),fill='#eef2e8',anchor='ra');dr.text((W-48,H-66),'Roof stairs / ramps / bridges / broken cover',font=font(13),fill='#a3b6b7',anchor='ra')
    img.save(path,optimize=True)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--no-png',action='store_true');args=ap.parse_args()
    scene=make_scene();validate(scene);faces=meshes(scene);OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'objective-origin-training-v02.json').write_text(json.dumps(scene,indent=2)+'\n')
    data=json.dumps(scene,separators=(',',':'));fs=json.dumps(faces,separators=(',',':'))
    (OUT/(STEM+'.html')).write_text(HTML.replace('__SCENE__',data).replace('__FACES__',fs))
    if not args.no_png:render_png(scene,faces,OUT/(STEM+'.png'))
    print(json.dumps(dict(status='ok',bounds=[-64,64,-64,64],objects=len(scene['objects']),faces=len(faces),cover_count=scene['cover_count'],access_links=len(scene['access_links']),origin=[0,0,0],files=[str(OUT/(STEM+'.html')),str(OUT/(STEM+'.png'))])))

if __name__=='__main__':main()
