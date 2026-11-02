import bpy,json,math,pathlib,sys
from mathutils import Vector
p=pathlib.Path(__file__).resolve().parent.parent
manifest=json.loads((p/'asset_manifest.json').read_text()); out=[]
for a in manifest['assets']:
 bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
 bpy.ops.import_scene.gltf(filepath=str(p/a['file']))
 meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']; assert meshes
 verts=[o.matrix_world@v.co for o in meshes for v in o.data.vertices]
 assert all(math.isfinite(c) for v in verts for c in v)
 bounds=[[min(v[i] for v in verts) for i in range(3)],[max(v[i] for v in verts) for i in range(3)]]
 assert all(bounds[1][i]-bounds[0][i]>0 for i in range(3))
 assert all(len(o.data.materials)>0 for o in meshes)
 assert not any(o.type in ['CAMERA','LIGHT'] for o in bpy.context.scene.objects)
 out.append(dict(id=a['id'],status='PASS',mesh_parts=len(meshes),vertices=len(verts),triangles=sum(len(poly.vertices)-2 for o in meshes for poly in o.data.polygons),bounds_blender_m=bounds,bytes=(p/a['file']).stat().st_size,materials=sorted(set(m.name for o in meshes for m in o.data.materials))))
assert len(out)==18 and len({a['id'] for a in out})==18
(p/'VALIDATION.json').write_text(json.dumps(dict(validation='Fresh Blender GLB import; nonempty finite geometry, positive bounds, assigned materials, no camera/light leakage',blender=bpy.app.version_string,assets=out),indent=2))
print('VALIDATED',len(out))
