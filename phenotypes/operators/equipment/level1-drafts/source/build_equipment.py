"""Original PRIM3 equipment blockouts. Blender 4.3+. No external assets or services.
Run: blender -b --python build_equipment.py -- --out /path/to/output [--no-render]
Geometry is fictional exterior-only; scales are artistic, not manufacturing specs.
"""
import bpy, math, json, os, sys, argparse
from mathutils import Vector
p=argparse.ArgumentParser(); p.add_argument('--out',default=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); p.add_argument('--no-render',action='store_true'); args=p.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
OUT=args.out
for d in ('models','previews','source'): os.makedirs(os.path.join(OUT,d),exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for c in list(bpy.data.collections):
 if c.name!='Collection': bpy.data.collections.remove(c)
scene=bpy.context.scene; scene.unit_settings.system='METRIC'; scene.unit_settings.scale_length=1
scene.render.engine='CYCLES'; scene.cycles.samples=24; scene.cycles.use_denoising=False
scene.render.resolution_x=600; scene.render.resolution_y=450; scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG'; scene.render.film_transparent=False
scene.world.color=(.18,.18,.18)
scene.view_settings.view_transform='AgX'
M={}
def mat(name,color,metal=0,rough=.5):
 m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
 bs=m.node_tree.nodes.get('Principled BSDF'); bs.inputs['Base Color'].default_value=(*color,1); bs.inputs['Metallic'].default_value=metal; bs.inputs['Roughness'].default_value=rough; M[name]=m; return m
mat('Graphite_Ceramic',(.045,.054,.064),.15,.4);mat('Dark_Brushed_Metal',(.14,.17,.20),.75,.3);mat('Soft_Rubber',(.019,.022,.027),0,.77);mat('Technical_Fabric',(.085,.10,.115),0,.9);mat('Recess',(.005,.009,.012),.1,.52)
mat('E_Amber',(.92,.32,.035),.25,.4);mat('R_Teal',(.025,.48,.43),.25,.4);mat('T_Lime',(0.2582,0.6514,0.0612),.25,.4);mat('Sensor_Glass',(.025,.10,.14),.65,.18);mat('Neutral_Mount',(.22,.25,.28),.65,.5)
CUR=None;ROOT=None;ROLE=None; parts=[]
def add(obj,name,material):
 obj.name=ROOT.name+'__'+name
 for c in list(obj.users_collection): c.objects.unlink(obj)
 CUR.objects.link(obj);obj.parent=ROOT
 obj.data.materials.append(M[material]); parts.append(obj)
 return obj

def box(name,loc,size,material='Graphite_Ceramic',bevel=.018,rot=None):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object; o.dimensions=size
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if rot:o.rotation_euler=rot
 add(o,name,material)
 if bevel:
  mod=o.modifiers.new('Soft manufactured edges','BEVEL');mod.width=min(bevel,min(size)*.22);mod.segments=2
  mod=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
 return o

def cyl(name,loc,radius,depth,material='Dark_Brushed_Metal',axis='Z',vertices=20):
 bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,location=loc);o=bpy.context.object
 if axis=='Y':o.rotation_euler[0]=math.pi/2
 if axis=='X':o.rotation_euler[1]=math.pi/2
 add(o,name,material)
 mod=o.modifiers.new('Rim bevel','BEVEL');mod.width=min(.008,depth*.12,radius*.12);mod.segments=2
 o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');return o

def beam(name,a,b,width,depth,material='Dark_Brushed_Metal'):
 a,b=Vector(a),Vector(b);o=box(name,(a+b)/2,(width,depth,(b-a).length),material,min(width,depth)*.15)
 o.rotation_euler=(b-a).to_track_quat('Z','Y').to_euler();return o

def panel(name,coords,y,thickness,material='Graphite_Ceramic'):
 # polygon in X,Z plane, with front/rear depth
 n=len(coords);v=[(x,y+dy,z) for dy in (-thickness/2,thickness/2) for x,z in coords]
 f=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
 me=bpy.data.meshes.new(name);me.from_pydata(v,[],f);me.update();o=bpy.data.objects.new(name,me);CUR.objects.link(o);o.parent=ROOT;o.name=ROOT.name+'__'+name;o.data.materials.append(M[material]);parts.append(o)
 mod=o.modifiers.new('Panel edge bevel','BEVEL');mod.width=.008;mod.segments=2;o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');return o

def strips(loc,axis,n,span,sz,material='Soft_Rubber'):
 for i in range(n):
  q=list(loc);q[axis]+=span*((i/(n-1) if n>1 else .5)-.5);box('Grip_rib_%02d'%len(parts),q,sz,material,.003)

def mount(y=.11,z=0):
 box('Mounting_pad',(0,y,z),(.17,.025,.15),'Soft_Rubber',.012)
 for x in (-.055,.055):box('Attachment_rail',(x,y+.02,z),(.025,.025,.13),'Neutral_Mount',.004)
 e=bpy.data.objects.new(ROOT.name+'__socket_mount',None);CUR.objects.link(e);e.parent=ROOT;e.location=(0,y+.04,z);e.empty_display_type='ARROWS';e.empty_display_size=.06

def rifle(kind):
 a=ROLE+'_Amber' if ROLE=='E' else ROLE+'_Teal' if ROLE=='R' else 'T_Lime'
 if kind=='E':
  panel('Body',[(-.20,-.07),(.19,-.07),(.27,.005),(.21,.10),(-.17,.10)],0,.12)
  box('Front_shell',(.32,0,.04),(.22,.105,.12));box('Sealed_front',(.445,0,.04),(.028,.085,.09),'Recess')
  box('Upper_spine',(.015,0,.115),(.42,.07,.035),'Dark_Brushed_Metal');box('Amber_inlay',(.05,-.064,.06),(.26,.008,.017),a,.003)
 elif kind=='R':
  panel('Streamlined_body',[(-.20,-.045),(.26,-.045),(.34,.025),(.25,.075),(-.18,.075)],0,.085)
  box('Long_forebody',(.39,0,.025),(.25,.07,.085));box('Closed_end',(.53,0,.025),(.024,.065,.065),'Recess')
  box('Optic_bridge',(-.02,0,.104),(.12,.065,.04),'Dark_Brushed_Metal');cyl('Integrated_optic',(-.02,0,.15),.035,.16,'Graphite_Ceramic','X');cyl('Optic_window',(.063,0,.15),.026,.007,'Sensor_Glass','X')
  box('Teal_spine',(.12,-.047,.05),(.28,.008,.013),a,.002)
 else:
  box('Modular_body',(.02,0,.025),(.42,.13,.15));box('Forward_housing',(.32,0,.025),(.18,.11,.11));box('Sealed_end',(.423,0,.025),(.022,.095,.075),'Recess')
  box('Diagnostic_module',(-.025,-.085,.04),(.15,.05,.07),'Dark_Brushed_Metal');box('Diagnostic_marker',(-.025,-.113,.045),(.085,.008,.025),a,.003)
  for x in (.15,.25,.35):box('Forebody_segment', (x,0,.09),(.025,.09,.015),'Soft_Rubber',.002)
 box('Grip',(-.11,0,-.15),(.075,.08,.19),'Soft_Rubber',.014,rot=(0,-.22,0))
 beam('Rear_upper',(-.20,0,.065),(-.42,0,.03),.035,.055)
 beam('Rear_lower',(-.17,0,-.045),(-.42,0,-.06),.025,.045)
 box('Rear_pad',(-.43,0,-.015),(.035,.075,.17),'Soft_Rubber')
 strips((.28,-.061 if kind!='R' else -.045,.012),0,5,.13,(.012,.008,.055))
 box('Grip_role_marker',(-.105,-.047,-.21),(.04,.008,.018),a,.003)
 # A decorative solid lower bridge, not a functional trigger mechanism
 box('Lower_guard',(-.01,0,-.085),(.10,.065,.025),'Dark_Brushed_Metal',.008)

def pistol(kind):
 a={'E':'E_Amber','R':'R_Teal','T':'T_Lime'}[kind]
 w={'E':.09,'R':.065,'T':.085}[kind]
 panel('Upper_housing',[(-.12,.01),(.17,.01),(.19,.06),(.14,.105),(-.115,.105)],0,w)
 box('Solid_front',(.187,0,.052),(.015,w*.8,.045),'Recess',.005)
 box('Grip_bridge',(-.078,0,.004),(.065,w*.8,.055),'Graphite_Ceramic',.008)
 box('Grip',(-.065,0,-.085),(.075,w*.85,.16),'Soft_Rubber',.014,rot=(0,-.25,0))
 box('Upper_trim',(.025,0,.109),(.22,w*.7,.015),'Dark_Brushed_Metal',.004)
 for yy in (-w/2-.004,w/2+.004):
  box('Role_inlay',(-.07,yy,-.11),(.043,.008,.021),a,.004)
  strips((-.06,yy,-.065),2,4,.065,(.04,.009,.009))
 if kind=='T':box('Diagnostic_side',(.025,-w/2-.012,.05),(.08,.024,.035),'Dark_Brushed_Metal',.006)

def breach():
 box('Enclosed_power_body',(-.04,0,0),(.30,.15,.16));panel('Blunt_working_head',[(.1,-.08),(.27,-.06),(.29,.01),(.15,.08)],0,.18,'Dark_Brushed_Metal')
 for y in (-.085,.085):box('Amber_bumper',(-.06,y,0),(.20,.022,.10),'E_Amber')
 for x in (-.12,.07):beam('Handle_support',(x,0,.07),(x,0,.19),.035,.055)
 box('Carry_handle',(-.025,0,.19),(.23,.065,.045),'Soft_Rubber')
 box('Rear_service_cover',(-.205,0,0),(.024,.12,.115),'Neutral_Mount')

def smoke():
 box('Capsule_body',(0,0,0),(.17,.12,.24),bevel=.035)
 for x in (-.078,.078):box('Protective_corner',(x,0,0),(.035,.14,.22),'Soft_Rubber',.012)
 box('Band_front',(0,-.065,.015),(.14,.012,.038),'E_Amber');box('Band_back',(0,.065,.015),(.14,.012,.038),'E_Amber')
 for x in (-.04,.04):box('Loop_pillar',(x,0,.15),(.025,.04,.06),'Dark_Brushed_Metal',.007)
 box('Integrated_loop',(0,0,.18),(.10,.04,.025),'Dark_Brushed_Metal',.007)
 box('Rear_sealed_panel',(0,.071,-.055),(.09,.01,.065),'Neutral_Mount',.006)

def armor(kind):
 a={'E':'E_Amber','R':'R_Teal','T':'T_Lime'}[kind]; w={'E':.25,'R':.205,'T':.23}[kind];d={'E':.12,'R':.095,'T':.11}[kind]
 shape=[(-w,-.24),(w,-.24),(w,.12),(w*.65,.26),(w*.34,.26),(w*.27,.18),(-w*.27,.18),(-w*.34,.26),(-w*.65,.26),(-w,.12)]
 panel('Front_fabric_shell',shape,-d,.026,'Technical_Fabric');panel('Rear_fabric_shell',shape,d,.025,'Technical_Fabric')
 for x in (-w*.68,w*.68):box('Shoulder_bridge',(x,0,.23),(.10,d*2,.055),'Technical_Fabric',.022)
 for x in (-w*.94,w*.94):box('Flexible_side',(x,0,-.10),(.035,d*2,.22),'Soft_Rubber',.012)
 if kind=='E':
  panel('Heavy_chest_plate',[(-.19,-.12),(.19,-.12),(.20,.075),(.125,.18),(-.125,.18),(-.20,.075)],-d-.027,.035)
  box('Abdominal_plate',(0,-d-.024,-.195),(.37,.035,.065))
 elif kind=='R':
  panel('Slim_chest_plate',[(-.15,-.14),(.15,-.14),(.16,.07),(.09,.16),(-.09,.16),(-.16,.07)],-d-.02,.022)
  for x in (-.17,.17):box('Flex_segment',(x,-d-.015,-.17),(.045,.025,.08),'Soft_Rubber')
 else:
  for x in (-.10,.10):panel('Segmented_chest',[ (x-.08,-.12),(x+.08,-.12),(x+.07,.11),(x,.18),(x-.07,.11)],-d-.027,.03)
  for z in (-.16,-.215):box('Insulated_flex',(0,-d-.02,z),(.34,.022,.025),'Soft_Rubber',.006)
 panel('Back_plate',[(-w*.72,-.15),(w*.72,-.15),(w*.72,.10),(w*.4,.18),(-w*.4,.18),(-w*.72,.10)],d+.025,.032)
 for x in (-w*.62,w*.62):
  box('Shoulder_identity',(x,-d-.025,.20),(.055,.014,.035),a,.004)
  box('Back_attachment_channel',(x*.6,d+.05,-.02),(.025,.025,.22),'Neutral_Mount',.004)

def harness():
 box('Pack',(0,0,0),(.25,.105,.20),'Technical_Fabric',.03)
 for x in (-.12,.12):box('Rigid_edge',(x,0,0),(.025,.12,.20),'Graphite_Ceramic')
 for x in (-.075,.075):
  box('Captured_webbing',(x,-.062,0),(.046,.035,.18),'Soft_Rubber',.006)
  box('Amber_tab',(x,-.085,-.065),(.035,.012,.03),'E_Amber',.003)
 for x in (-.055,.055):box('Handle_support',(x,0,.12),(.025,.04,.045),'Dark_Brushed_Metal')
 box('Handle',(0,0,.145),(.13,.04,.025),'Soft_Rubber')
 mount(.065)

def scanner():
 box('Scanner_body',(0,0,0),(.18,.075,.27),bevel=.026)
 box('Front_frame',(0,-.043,.025),(.145,.018,.16),'Dark_Brushed_Metal',.015)
 box('Inactive_screen',(0,-.054,.025),(.115,.008,.125),'Sensor_Glass',.01)
 box('Top_sensor',(0,0,.145),(.115,.05,.035),'Sensor_Glass',.009)
 for x in (-.083,.083):box('Teal_corner',(x,-.04,-.08),(.014,.018,.04),'R_Teal',.003)
 box('Palm_pad',(0,.045,-.01),(.12,.02,.18),'Soft_Rubber');mount(.055,-.02)

def beacon():
 cyl('Puck', (0,0,0),.12,.075,'Graphite_Ceramic','Y',24)
 cyl('Teal_band',(0,0,0),.122,.018,'R_Teal','Y',24)
 cyl('Recessed_sensor',(0,-.043,0),.073,.018,'Sensor_Glass','Y',24)
 cyl('Base_pad',(0,.046,0),.10,.018,'Soft_Rubber','Y',24)
 for ang in (0,2*math.pi/3,4*math.pi/3):
  box('Protective_rib',(.09*math.sin(ang),-.04,.09*math.cos(ang)),(.025,.025,.065),'Dark_Brushed_Metal',.005,rot=(0,ang,0))

def optic():
 for x in (-.065,.065):
  cyl('Optic_housing',(x,0,0),.048,.16,'Graphite_Ceramic','Y')
  cyl('Objective_glass',(x,-.085,0),.038,.012,'Sensor_Glass','Y')
  cyl('Eyepiece',(x,.098,0),.035,.045,'Soft_Rubber','Y')
 box('Bridge',(0,0,.015),(.14,.07,.055),'Dark_Brushed_Metal');box('Teal_bridge',(0,-.04,.038),(.045,.012,.018),'R_Teal')
 beam('Handle_left',(-.07,0,.04),(-.07,0,.10),.025,.04);beam('Handle_right',(.07,0,.04),(.07,0,.10),.025,.04)
 box('Upper_grip',(0,0,.105),(.165,.045,.025),'Soft_Rubber')

def terminal():
 box('Rugged_terminal',(0,0,0),(.27,.065,.21),bevel=.02)
 box('Screen_frame',(0,-.04,.015),(.22,.018,.15),'Dark_Brushed_Metal');box('Inactive_screen',(0,-.052,.015),(.185,.008,.115),'Sensor_Glass',.01)
 for x in (-.14,.14):box('Side_grip',(x,0,0),(.04,.085,.15),'Soft_Rubber')
 for x in (-.11,.11):
  for z in (-.087,.087):box('Corner_bumper',(x,-.008,z),(.055,.09,.04),'T_Lime',.01)
 mount(.047)

def pulse():
 cyl('Hexagonal_body',(0,0,0),.13,.075,'Graphite_Ceramic','Y',6)
 cyl('Lime_ring',(0,-.042,0),.10,.012,'T_Lime','Y',24)
 cyl('Central_disc',(0,-.052,0),.074,.014,'Dark_Brushed_Metal','Y',24)
 cyl('Sealed_rear',(0,.045,0),.081,.013,'Neutral_Mount','Y',12)
 for i in range(6):
  a=i*math.pi/3;box('Robust_lobe',(.11*math.cos(a),0,.11*math.sin(a)),(.05,.10,.04),'Soft_Rubber',.008,rot=(0,-a,0))

def repair():
 box('Maintenance_housing',(0,0,0),(.27,.13,.22),bevel=.025)
 for x in (-.12,.12):box('Metal_corner',(x,0,0),(.03,.145,.20),'Dark_Brushed_Metal')
 for x in (-.065,.065):box('Lime_latch',(x,-.078,.055),(.04,.025,.06),'T_Lime',.007)
 box('Closed_front_panel',(0,-.075,-.035),(.19,.02,.095),'Technical_Fabric')
 for x in (-.065,.065):box('Handle_support',(x,0,.125),(.025,.045,.04),'Dark_Brushed_Metal')
 box('Carry_handle',(0,0,.15),(.15,.05,.025),'Soft_Rubber');box('Base_bumper',(0,0,-.11),(.24,.15,.03),'Soft_Rubber');mount(.08)

SPECS=[('E01','Entry carbine','primary',lambda:rifle('E')),('E02','Compact backup','sidearm',lambda:pistol('E')),('E03','Blunt breach kit','specialist',breach),('E04','Smoke capsule','throwable',smoke),('E05','Reinforced entry armor','armor',lambda:armor('E')),('E06','Rescue harness','support',harness),('R01','Precision carbine','primary',lambda:rifle('R')),('R02','Recon pistol','sidearm',lambda:pistol('R')),('R03','Evidence scanner','specialist',scanner),('R04','Sensor beacon','throwable',beacon),('R05','Light recon armor','armor',lambda:armor('R')),('R06','Observation optic','support',optic),('T01','Technical carbine','primary',lambda:rifle('T')),('T02','Specialist backup','sidearm',lambda:pistol('T')),('T03','Control terminal','specialist',terminal),('T04','Sync Pulse puck','throwable',pulse),('T05','Insulated technical armor','armor',lambda:armor('T')),('T06','Repair module','support',repair)]
assets=[];meta=[]
for aid,title,slot,build in SPECS:
 ROLE=aid[0];CUR=bpy.data.collections.new(aid+'_'+title.replace(' ','_'));scene.collection.children.link(CUR)
 ROOT=bpy.data.objects.new(aid,None);CUR.objects.link(ROOT);ROOT['asset_id']=aid;ROOT['role']=ROLE;ROOT['slot']=slot;ROOT['stage']='original procedural blockout';ROOT.empty_display_type='PLAIN_AXES';ROOT.empty_display_size=.08;parts=[]
 build()
 bpy.ops.object.select_all(action='DESELECT')
 for o in CUR.objects:o.select_set(True)
 bpy.context.view_layer.objects.active=ROOT
 bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,'models',aid+'.glb'),export_format='GLB',use_selection=True,export_apply=True,export_extras=True,export_yup=True)
 bounds=[ROOT.matrix_world @ Vector(c) for o in parts for c in [o.matrix_world @ Vector(v) for v in o.bound_box]]
 # root transform is identity here
 lo=[min(v[i] for v in bounds) for i in range(3)];hi=[max(v[i] for v in bounds) for i in range(3)]
 meta.append({'id':aid,'title':title,'role':ROLE,'slot':slot,'file':'models/'+aid+'.glb','mesh_parts':len(parts),'source_bounds_m':[lo,hi],'editable_collection':CUR.name,'draft':True,'rigged':False})
 assets.append((ROOT,CUR,parts.copy(),lo,hi))

# Neutral product studio; not part of exported GLBs.
bpy.ops.object.camera_add();cam=bpy.context.object;cam.name='Preview_camera';scene.camera=cam;cam.data.type='ORTHO'
for name,loc,power,size in [('Key',(2,-3,4),450,4),('Fill',(-3,-1,2),300,3),('Rim',(1,3,2.5),500,3)]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(-o.location).to_track_quat('-Z','Y').to_euler()
scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.22,.25,.29,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.7
if not args.no_render:
 for root,col,meshes,lo,hi in assets:
  for rr,cc,mm,ll,hh in assets:cc.hide_render=(cc!=col)
  center=Vector([(lo[i]+hi[i])/2 for i in range(3)]);span=Vector(hi)-Vector(lo);cam.data.ortho_scale=max(span.x/1.333,span.z,span.y)*1.42
  for view,offset in [('front',(0,-3,0)),('back',(0,3,0)),('hero',(1.1,-3,1.0))]:
   cam.location=center+Vector(offset);cam.rotation_euler=(center-cam.location).to_track_quat('-Z','Y').to_euler()
   if view=='hero':cam.data.ortho_scale=max(span.x/1.333,span.z,span.y)*1.60
   scene.render.filepath=os.path.join(OUT,'previews',root.name+'_'+view+'.png');bpy.ops.render.render(write_still=True)
# Save editable parts in separated rows. Source script reproduces centered GLBs.
for i,(root,col,meshes,lo,hi) in enumerate(assets):
 col.hide_render=False;root.location=((i%6)*1.15,(i//6)*1.05,0)
cam.location=(2.9,-5,7);target=Vector((2.9,1,0));cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=7
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT,'source','PRIM3_Level1_Editable.blend'))
with open(os.path.join(OUT,'asset_manifest.json'),'w') as f:json.dump({'schema_version':1,'units':'meters, artistic scale only','blender_up':'Z','glb_up':'Y','source_front':'-Y','glb_front':'+Z','origin':'asset assembly center, not character socket','count':18,'assets':meta},f,indent=2)
print('EQUIPMENT_COMPLETE',OUT)
