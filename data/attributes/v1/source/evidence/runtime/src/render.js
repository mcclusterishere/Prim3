/* PRIM3 transit renderer. PlayCanvas WebGL plus a complete projected Canvas2D
 * renderer; both use the same world, articulated figures, picking and events.
 * No external models, textures, network requests or privileged browser flags.
 */
(function (root) {
  'use strict';
  const TAU = Math.PI * 2, RAD = 180 / Math.PI;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const mix = (a, b, t) => a + (b - a) * t;
  const colorCache = new Map();
  function rgb(hex) {
    if (colorCache.has(hex)) return colorCache.get(hex);
    let s = String(hex || '#71817d').replace('#', ''); if (s.length === 3) s = s.split('').map(c => c + c).join('');
    const value = [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
    colorCache.set(hex, value); return value;
  }
  function shade(hex, value, alpha = 1) {
    const c = rgb(hex).map(n => Math.round(clamp(n * value, 0, 255)));
    return alpha < 1 ? `rgba(${c.join(',')},${alpha})` : `rgb(${c.join(',')})`;
  }
  function rotated(p, r = [0, 0, 0]) {
    let [x, y, z] = p;
    if (r[0]) { const c = Math.cos(r[0]), s = Math.sin(r[0]), a = y * c - z * s; z = y * s + z * c; y = a; }
    if (r[1]) { const c = Math.cos(r[1]), s = Math.sin(r[1]), a = x * c + z * s; z = -x * s + z * c; x = a; }
    if (r[2]) { const c = Math.cos(r[2]), s = Math.sin(r[2]), a = x * c - y * s; y = x * s + y * c; x = a; }
    return [x, y, z];
  }
  function polygon(ctx, points) { ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath(); }
  function insideRect(x, z, r) { return x >= r.x && x < r.x + r.w && z >= r.y && z < r.y + r.d; }
  const FACE_DEFS = [
    { i: [0, 3, 2, 1], n: [0, 0, -1] }, { i: [4, 5, 6, 7], n: [0, 0, 1] },
    { i: [0, 4, 7, 3], n: [-1, 0, 0] }, { i: [1, 2, 6, 5], n: [1, 0, 0] },
    { i: [3, 7, 6, 2], n: [0, 1, 0] }
  ];
  class P3Renderer {
    constructor(canvas, level, options = {}) {
      this.canvas = canvas; this.level = level; this.onPick = options.onPick || (() => {});
      this.editor = !!options.editor;
      this.mode = 'canvas2d'; this.view = '3d'; this.w = 1; this.h = 1; this.dpr = 1;
      this.camera = { x: -20, z: -32, h: 1, yaw: 2.4, pitch: .72, span: 22 };
      this.state = { units: [], gateOpen: false }; this.overlay = { reachable: [], path: [] };
      this.positions = new Map(); this.killed = new Set(); this.effects = []; this.tweens = new Set();
      this._firstState = true; this._disposed = false; this._lastFrame = 0; this._time = 0;
      this._reduced = !!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      this._parts = []; this._glUnits = new Map(); this._materials = new Map(); this._gateParts = [];
      this._textures = new Map(); this._surfacePatterns = new Map(); this._lamps = []; this._glShadows = new Map();
      this._createWorld(); this._initGraphics(); this._createMapLabels(); this._bindControls();
      this._resizeObserver = new ResizeObserver(() => this.resize()); this._resizeObserver.observe(this.canvas.parentElement || this.canvas);
      this.resize(); this._frame = this._frame.bind(this); this._raf = requestAnimationFrame(this._frame);
    }
    _part(id, x, h, z, w, height, d, color, extra = {}) {
      const p = { id, x, y: h, z, w, h: height, d, color, r: [0, 0, 0], shape: 'box', ...extra };
      this._parts.push(p); return p;
    }
    _beam(id, a, b, width, color, extra = {}) {
      const dx = b.x - a.x, dy = b.h - a.h, dz = b.z - a.z, length = Math.hypot(dx, dy, dz);
      return this._part(id, (a.x + b.x) / 2, (a.h + b.h) / 2, (a.z + b.z) / 2, width, width, length, color, { r: [-Math.atan2(dy, Math.hypot(dx, dz)), Math.atan2(dx, dz), 0], ...extra });
    }
    _createWorld() {
      const L = this.level;
      if (Array.isArray(L.worldParts)) {
        const b=L.bounds,w=b.maxX-b.minX+1,d=b.maxY-b.minY+1;
        this._part('forge-foundation',b.minX+w/2,-.2,b.minY+d/2,w,.35,d,'#e4e9e5',{ground:true});
        for(const p of L.worldParts)this._parts.push({...p,r:p.r||[0,0,0],shape:p.shape||'box'});
        this._staticGeometry=this._parts.map(p=>({p,faces:this._boxFaces(p)}));
        return;
      }
      this._part('compound-foundation', 0, -.24, 0, 128, .4, 128, '#59646a', { ground: true, material: 'asphalt' });
      // Broad architectural surfaces, not thousands of ground-tile meshes.
      this._part('service-road', 0, -.025, -3, 14, .035, 116, '#45565f', { ground: true, material: 'asphalt' });
      this._part('cross-road', -1, -.022, -36, 112, .04, 10, '#53636b', { ground: true, material: 'asphalt' });
      for (const b of L.buildings || []) {
        const cx = b.x + b.w / 2, cz = b.y + b.d / 2, wall = b.h >= 12 ? '#bdc6c4' : '#d3d6ce';
        this._part(`${b.id}-mass`, cx, b.h / 2, cz, b.w, b.h, b.d, wall, { building: b.id });
        this._part(`${b.id}-roof`, cx, b.h - .055, cz, b.w + .14, .11, b.d + .14, '#7e8b90', { building: b.id, material: 'concrete' });
        for (const zz of [b.y + .12, b.y + b.d - .12]) this._part(`${b.id}-parapet-z-${zz}`, cx, b.h + .27, zz, b.w, .4, .2, '#b3b6a6');
        for (const xx of [b.x + .12, b.x + b.w - .12]) this._part(`${b.id}-parapet-x-${xx}`, xx, b.h + .27, cz, .2, .4, b.d, '#b3b6a6');
        const floors = Math.max(1, Math.floor(b.h / 4));
        for (let f = 0; f < floors; f++) {
          const height = 2 + f * 3.8;
          for (let j = 2; j < b.w - 1; j += 3.7) for (const side of [-1, 1]) {
            const z = side < 0 ? b.y - .035 : b.y + b.d + .035;
            this._part(`${b.id}-window-${f}-${j}-${side}`, b.x + j, height, z, 2.05, 1.35, .045, (Math.floor(j) + f) % 4 ? '#304c55' : '#a59566', { window: true });
            this._part(`${b.id}-sill-${f}-${j}-${side}`, b.x + j, height - .72, z, 2.25, .12, .18, '#b3b6a6');
          }
          for (let j = 2; j < b.d - 1; j += 4) for (const side of [-1, 1]) {
            const x = side < 0 ? b.x - .035 : b.x + b.w + .035;
            this._part(`${b.id}-side-window-${f}-${j}-${side}`, x, height, b.y + j, .045, 1.35, 2.2, '#35515a', { window: true });
          }
        }
        this._part(`${b.id}-door`, cx, 1.45, b.y - .07, 2.1, 2.9, .12, '#2b4248');
        this._part(`${b.id}-door-line`, cx, 1.45, b.y - .145, .045, 2.6, .02, '#657d7d');
        this._part(`${b.id}-utility-light`, cx, 3.15, b.y - .14, 1.65, .16, .15, '#e5bb70', { emissive: true });
        // Flush roof ventilation details preserve the world's navigable roof cells.
        for (let v = 0; v < 3; v++) {
          const vx = b.x + 2.2 + v * 2.5, vz = b.y + b.d - 3;
          this._part(`${b.id}-hvac-plate-${v}`, vx, b.h + .025, vz, 1.8, .035, 2, '#526766');
          for (let slat = 0; slat < 5; slat++) this._part(`${b.id}-vent-${v}-${slat}`, vx - .65 + slat * .32, b.h + .05, vz, .11, .025, 1.65, '#a3ada1');
        }
      }
      for (const b of L.boxes || []) {
        const h = (b.z || 0), cx = b.x + b.w / 2, cz = b.y + b.d / 2;
        if (b.type === 'fence') {
          this._part(`${b.id}-low`, cx, h + .36, cz, b.w, .65, b.d, '#586c6d');
          for (let x = b.x + .2; x < b.x + b.w; x += 1.35) this._part(`${b.id}-post-${x}`, x, h + b.h / 2, cz, .1, b.h, .13, '#738985');
          for (const y of [1.05, b.h]) this._part(`${b.id}-rail-${y}`, cx, h + y, cz, b.w, .08, .1, '#8b9a8d');
        } else {
          const color = b.color || (b.type === 'cover' ? '#c8cec7' : '#66777b');
          this._part(b.id, cx, h + b.h / 2, cz, b.w, b.h, b.d, color);
          if (b.type === 'cover') {
            this._part(`${b.id}-cap`, cx, h + b.h + .05, cz, b.w + .12, .1, b.d + .12, '#c5c5b2');
            for (let x = b.x + .6; x < b.x + b.w; x += 1.1) this._part(`${b.id}-reflector-${x}`, x, h + .86, b.y - .02, .34, .16, .04, '#d8af6a');
          } else if (b.type === 'container') {
            for (let x = b.x + .3; x < b.x + b.w; x += .6) for (const z of [b.y - .02, b.y + b.d + .02]) this._part(`${b.id}-rib-${x}-${z}`, x, h + b.h / 2, z, .06, b.h - .12, .07, shade(color, .82));
            this._part(`${b.id}-top`, cx, h + b.h + .04, cz, b.w, .08, b.d, color);
          } else {
            this._part(`${b.id}-strap-a`, cx - b.w * .27, h + b.h + .025, cz, .13, .035, b.d, '#b8b9a0');
            this._part(`${b.id}-strap-b`, cx + b.w * .27, h + b.h + .025, cz, .13, .035, b.d, '#b8b9a0');
          }
        }
      }
      if (L.canal) {
        const c = L.canal;
        this._part('canal-water', c.x + c.w / 2, .008, c.y + c.d / 2, c.w, .035, c.d, '#28565c', { water: true, ground: true });
        for (const z of [c.y, c.y + c.d]) this._part(`canal-bank-${z}`, c.x + c.w / 2, .06, z, c.w, .12, .23, '#b1b3a1');
      }
      for (const [i, b] of (L.groundBridges || []).entries()) {
        const x = b.x + b.w / 2, z = b.y + b.d / 2;
        this._part(`canal-bridge-${i}`, x, .025, z, b.w, .08, b.d, '#a0acae', { ground: true, material:'steel' });
        for (const xx of [b.x + .15, b.x + b.w - .15]) {
          this._part(`bridge-rail-${i}-${xx}`, xx, 1.03, z, .12, .12, b.d, '#899b95');
          for (let zz = b.y + .3; zz < b.y + b.d; zz += 1.8) this._part(`bridge-post-${i}-${xx}-${zz}`, xx, .58, zz, .1, .94, .1, '#768b86');
        }
      }
      for (const b of L.bridges || []) {
        this._part(`${b.id}-deck`, b.x + b.w / 2, b.h - .25, b.y + b.d / 2, b.w, .5, b.d, '#81928e');
        for (const z of [b.y + .12, b.y + b.d - .12]) {
          this._part(`${b.id}-rail-${z}`, b.x + b.w / 2, b.h + .93, z, b.w, .11, .12, '#b8c0b0');
          for (let x = b.x + .5; x < b.x + b.w; x += 2) this._part(`${b.id}-post-${x}-${z}`, x, b.h + .46, z, .1, .92, .1, '#829b96');
        }
        for (let x = b.x + 5; x < b.x + b.w - 2; x += 10) this._part(`${b.id}-support-${x}`, x, b.h / 2, b.y + b.d / 2, .6, b.h, .65, '#667f7d');
      }
      for (const s of L.stairs || []) {
        const dx = s.to.x - s.from.x, dz = s.to.y - s.from.y, length = Math.hypot(dx, dz), height = this._height(s.to), n = Math.max(10, Math.ceil(length * 1.7));
        for (let i = 0; i < n; i++) {
          const t = (i + .5) / n, rise = height * (i + 1) / n;
          this._part(`${s.id}-step-${i}`, s.from.x + .5 + dx * t, rise / 2, s.from.y + .5 + dz * t, s.width, rise, length / n + .045, i % 2 ? '#9ca99b' : '#a9b3a4', { r: [0, Math.atan2(dx, dz), 0] });
        }
        const nx = dz / length * s.width / 2, nz = -dx / length * s.width / 2;
        for (const sign of [-1, 1]) this._beam(`${s.id}-handrail-${sign}`, { x: s.from.x + .5 + nx * sign, z: s.from.y + .5 + nz * sign, h: 1 }, { x: s.to.x + .5 + nx * sign, z: s.to.y + .5 + nz * sign, h: height + 1 }, .12, '#b2c0af');
      }
      const r = L.relay || { x: 0, y: 0 }, rx = r.x + .5, rz = r.y + .5;
      this._part('relay-plinth', rx, .13, rz, 1.05, .26, 1.05, '#b6b8a6');
      this._part('relay-cabinet', rx, 1.02, rz, .7, 1.7, .6, '#243f46');
      this._part('relay-cap', rx, 1.91, rz, .85, .13, .74, '#91aaa0');
      this._part('relay-display', rx, 1.34, rz + .32, .48, .55, .025, '#66bfb3', { emissive: true });
      this._part('relay-antenna', rx + .2, 2.4, rz - .15, .045, 1, .045, '#b9c4ad');
      if (L.medkit) {
        const m = L.medkit; this._part('medical-case', m.x + .5, .27, m.y + .5, .68, .5, .51, '#c6c6af');
        this._part('medical-stripe', m.x + .5, .53, m.y + .5, .12, .025, .4, '#a6614f');
        this._part('medical-stripe-cross', m.x + .5, .545, m.y + .5, .4, .025, .12, '#a6614f');
      }
      if (L.gate) {
        const g = L.gate, p = this._part('service-gate', g.x + .5, g.h / 2, g.y + .5, g.w, g.h, .2, '#ba9862', { gate: true }); this._gateParts.push(p);
        for (const x of [g.x - 1.15, g.x + 2.15]) this._part(`gate-pillar-${x}`, x, g.h / 2 + .12, g.y + .5, .25, g.h + .24, .5, '#9fae9f');
      }
      // Painted lane marks and loading-bay details sit flush with navigable ground.
      for (let y = -55; y <= 55; y += 5) if (!(y >= -29 && y < -20)) this._part(`road-mark-${y}`, -1, .032, y, .11, .015, 1.8, '#bcbb9f', { ground: true });
      this._architecturalDetail();
      this._staticGeometry = this._parts.map(p => ({ p, faces: this._boxFaces(p) }));
    }
    _architecturalDetail() {
      const L=this.level;
      // All added solid detail stays inside existing collider silhouettes.
      for(const b of L.boxes||[]) {
        const x=b.x+b.w/2,z=b.y+b.d/2,h=b.z||0;
        if(b.type==='crate') {
          for(const sx of[-1,1])for(const sz of[-1,1])this._part(b.id+'-corner-'+sx+'-'+sz,x+sx*(b.w/2-.09),h+b.h/2,z+sz*(b.d/2-.09),.17,b.h,.17,'#35464d',{material:'steel'});
          this._part(b.id+'-case-lid',x,h+b.h-.07,z,b.w,.15,b.d,'#8d9d9e',{material:'steel'});
          for(const xx of[x-b.w*.28,x+b.w*.28]) {
            this._part(b.id+'-latch-'+xx,xx,h+b.h*.76,b.y-.026,.17,.3,.06,'#c4c5ad',{material:'metal'});
            this._part(b.id+'-latch-notch-'+xx,xx,h+b.h*.76,b.y-.062,.08,.13,.02,'#3c4d52');
          }
          this._part(b.id+'-handle',x,h+b.h*.55,b.y-.05,b.w*.32,.09,.08,'#26373d',{material:'metal'});
          this._part(b.id+'-label',x,h+b.h*.78,b.y-.042,b.w*.27,.18,.023,'#b5bcad');
          for(let j=0;j<4;j++)this._part(b.id+'-label-mark-'+j,x-b.w*.1+j*.1,h+b.h*.78,b.y-.057,.035,.1,.012,'#46585a');
        }
        if(b.type==='cover') {
          for(let j=.7;j<b.w;j+=1.8)this._part(b.id+'-expansion-'+j,b.x+j,h+b.h/2,b.y-.012,.024,b.h-.08,.018,'#8e9d9c');
          this._part(b.id+'-weatherline',x,h+.13,b.y-.013,b.w,.16,.02,'#8a9995');
        }
      }
      for(const b of L.buildings||[]) {
        const x=b.x+b.w/2;
        for(let j=4;j<b.w;j+=4)this._part(b.id+'-panel-joint-'+j,b.x+j,b.h/2,b.y-.048,.025,b.h,.025,'#899a9c');
        for(let h=4;h<b.h;h+=4)this._part(b.id+'-floor-joint-'+h,x,h,b.y-.05,b.w,.035,.025,'#91a0a0');
        this._part(b.id+'-base-flashing',x,.21,b.y-.058,b.w,.3,.04,'#8e9d9e',{material:'steel'});
        this._lamps.push({x,h:3.1,z:b.y-.22});
      }
      if(L.canal){
        const c=L.canal;let clump=0;
        for(const x of[-41,-29,-13,-1,19])for(const z of[c.y+.45,c.y+c.d-.45]){
          if((L.groundBridges||[]).some(b=>x>=b.x-.5&&x<=b.x+b.w+.5&&z>=b.y-.5&&z<=b.y+b.d+.5))continue;
          for(let blade=0;blade<4;blade++){const t=blade*1.7+clump*.43,height=.45+(blade%3)*.15;this._part('bank-reed-'+clump+'-'+blade,x+Math.cos(t)*.18,height/2+.025,z+Math.sin(t)*.16,.055,height,.045,blade%2?'#617d57':'#85945f',{shape:'capsule',material:'leaf',r:[Math.sin(t)*.28,0,Math.cos(t)*.28]});}clump++;
        }
      }
      const ivyWall=(L.buildings||[])[0];if(ivyWall)for(let i=0;i<8;i++){
        this._part('depot-ivy-'+i,ivyWall.x+.55+Math.sin(i*1.8)*.28,2.8-i*.26,ivyWall.y-.08,.42,.47,.09,i%2?'#547457':'#71865a',{shape:'sphere',material:'leaf'});
      }
      for(const [i,b]of(L.groundBridges||[]).entries()) {
        for(let z=b.y+.25;z<b.y+b.d;z+=.65)this._part('bridge-deck-seam-'+i+'-'+z,b.x+b.w/2,.071,z,b.w,.012,.025,'#4f6570',{ground:true});
        for(const x of[b.x+.15,b.x+b.w-.15])for(const z of[b.y+.4,b.y+b.d-.4]) {
          this._part('bridge-lamp-'+i+'-'+x+'-'+z,x,1.01,z,.23,.12,.23,'#ffdb8e',{emissive:true});this._lamps.push({x,h:1.08,z});
        }
        // Painted approach markings do not introduce physical obstacles.
        for(let j=0;j<b.w-.6;j+=.65)this._part('bridge-warning-'+i+'-'+j,b.x+.3+j,.012,b.y-1,.28,.012,.6,j%2?'#cecfae':'#b99851',{ground:true});
      }
    }
    _createMapLabels() {
      if(!this.canvas.parentElement||!root.document)return;
      this._mapLabels=document.createElement('canvas');this._mapLabels.className='world-grid-labels';
      this._mapLabels.setAttribute('aria-hidden','true');Object.assign(this._mapLabels.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',zIndex:'2'});
      this.canvas.parentElement.appendChild(this._mapLabels);this._labelCtx=this._mapLabels.getContext('2d');
    }
    _overlayHeight(node) { return this._height(node)+(this.level.worldParts&&!(node.layer||0)? .32:.1); }
    _height(node) { try { return Number(this.level.heightAt(node)) || 0; } catch (_) { return 0; } }
    _batchStaticWorld() {
      if(!this.app?.batcher)return;
      if(this._staticBatch)this.app.batcher.removeGroup(this._staticBatch.id);
      this._staticBatch=this.app.batcher.addGroup('PRIM3 white industrial kit',false,32);
      for(const p of this._parts)if(p.entity?.render)p.entity.render.batchGroupId=this._staticBatch.id;
      this.app.batcher.generate([this._staticBatch.id]);
    }
    setLevel(level) {
      if(this._staticBatch&&this.app?.batcher){this.app.batcher.removeGroup(this._staticBatch.id);this._staticBatch=null;}
      for(const p of this._parts)p.entity?.destroy();
      this.level=level;this._parts=[];this._gateParts=[];this._lamps=[];this.effects=[];this.overlay={reachable:[],path:[]};
      this._createWorld();
      if(this.mode==='webgl'){for(const p of this._parts)p.entity=this._newPcPart(p);if(level.worldParts)this._batchStaticWorld();}
      this._dirty=true;
    }
    _initGraphics() {
      if (root.pc) {
        try {
          this.app = new pc.Application(this.canvas, { graphicsDeviceOptions: { antialias: true, alpha: false, preferWebGl2: true } });
          this.app.graphicsDevice.maxPixelRatio = Math.min(root.devicePixelRatio || 1, this.canvas.getBoundingClientRect().width < 600 ? 1.5 : 1.75);
          this.app.setCanvasFillMode(pc.FILLMODE_NONE); this.app.setCanvasResolution(pc.RESOLUTION_AUTO); this.app.autoRender = false;
          this.app.scene.ambientLight = new pc.Color(.39, .46, .51);
          this.pcCamera = new pc.Entity('Transit tactical camera'); this.pcCamera.addComponent('camera', { projection: pc.PROJECTION_ORTHOGRAPHIC, clearColor: new pc.Color(.09, .15, .17), nearClip: .1, farClip: 350 }); this.app.root.addChild(this.pcCamera);
          const light = new pc.Entity('Courtyard daylight'); light.addComponent('light', { type: 'directional', color: new pc.Color(1, .91, .74), intensity: 1.1, castShadows: true, shadowResolution: 1024, shadowDistance: 42, shadowBias: .15, normalOffsetBias: .04 }); light.setEulerAngles(48, -25, 0); this.app.root.addChild(light);
          const fill = new pc.Entity('Cool ambient fill'); fill.addComponent('light', { type: 'directional', color: new pc.Color(.59, .8, 1), intensity: .5 }); fill.setEulerAngles(24, 145, 0); this.app.root.addChild(fill);
          this._parts.forEach(p => { p.entity = this._newPcPart(p); });
          for(const l of this._lamps.slice(0,8)){const e=new pc.Entity('Warm wall lamp');e.addComponent('light',{type:'omni',color:new pc.Color(1,.72,.39),intensity:.7,range:5,castShadows:false});e.setPosition(l.x,l.h,l.z);this.app.root.addChild(e);}
          if(this.level.worldParts)this._batchStaticWorld();
          if(this.level.theme==='white-industrial')this.pcCamera.camera.clearColor=new pc.Color(.89,.92,.9);
          this.mode = 'webgl'; this.app.start();
          this.canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); this._switchToCanvas(); });
          return;
        } catch (error) {
          try { this.app?.destroy(); } catch (_) {} this.app = null;
          console.info('PRIM3: WebGL unavailable; using the interactive projected 3D renderer.');
        }
      }
      this._initCanvas();
    }
    _initCanvas() {
      let ctx = null; try { ctx = this.canvas.getContext('2d', { alpha: false }); } catch (_) {}
      if (!ctx) { const replacement = this.canvas.cloneNode(false); this.canvas.replaceWith(replacement); this.canvas = replacement; ctx = replacement.getContext('2d', { alpha: false }); }
      if (!ctx) throw new Error('PRIM3 requires Canvas2D or WebGL support.');
      this.ctx = ctx; this.mode = 'canvas2d';
    }
    _switchToCanvas() {
      if (this.mode !== 'webgl' || this._disposed) return;
      this._unbindControls(); try { this.app.destroy(); } catch (_) {} this.app = null; this._initCanvas(); this._bindControls(); this.resize();
    }
    _surfaceKind(p) {
      if(p.water)return 'water';
      const m=p.material||'';
      if(/mannequin|screen|signal|glass|leaf|grass|bark|earth|soil|seam|ripple/.test(m))return null;
      if(/cloth|fabric/.test(m))return 'fabric';
      if(/metal|steel|armor/.test(m))return 'steel';
      if(/ivory|porcelain|stone|white|concrete|paver/.test(m))return m==='paver'?'paver':'concrete';
      if(m==='asphalt')return 'asphalt';
      if(p.unit)return null;
      const id=p.id||'';
      if(/road|foundation/.test(id))return 'asphalt';
      if(/mass|roof|parapet|step|bank|plinth|cap|barricade/.test(id))return 'concrete';
      if(/crate|case|container|rail|post|deck|bridge|vent|door|gate|relay/.test(id))return 'steel';
      return null;
    }
    _pcTexture(kind,type='texture') {
      const key=kind+'/'+type;if(this._textures.has(key))return this._textures.get(key);
      const source=root.P3Surfaces?.[type]?.(kind);if(!source)return null;
      const t=new pc.Texture(this.app.graphicsDevice,{width:source.width,height:source.height,mipmaps:true});
      t.addressU=pc.ADDRESS_REPEAT;t.addressV=pc.ADDRESS_REPEAT;t.minFilter=pc.FILTER_LINEAR_MIPMAP_LINEAR;t.magFilter=pc.FILTER_LINEAR;t.setSource(source);this._textures.set(key,t);return t;
    }
    _pcMaterial(color,emissive=false,part={}) {
      const kind=this._surfaceKind(part),tile=kind==='fabric'? .8:kind==='water'?5:4;
      const repeat=Math.max(1,Math.round(Math.max(part.w||1,part.h||1,part.d||1)/tile));
      const key=color+'/'+emissive+'/'+kind+'/'+repeat;
      if(this._materials.has(key))return this._materials.get(key);
      const c=this._readColor(color),m=new pc.StandardMaterial();
      m.diffuse=new pc.Color(c[0]/255,c[1]/255,c[2]/255);m.useMetalness=true;
      m.metalness=kind==='steel'? .42:part.material==='mannequin'? .18:kind==='water'? .08:.015;
      m.gloss=kind==='water'? .86:kind==='asphalt'? .57:kind==='steel'? .55:part.material==='mannequin'? .52:.25;
      if(kind){
        try{
          m.diffuseMap=this._pcTexture(kind);m.diffuseMapTiling=new pc.Vec2(repeat,repeat);m.diffuseTint=true;
          // Neutral tint keeps the authored surface palette; original white kit remains white.
          if(this.level.theme!=='white-industrial'&&!part.unit)m.diffuse=new pc.Color(.94,.98,1);
          m.normalMap=this._pcTexture(kind,'normal');m.normalMapTiling=new pc.Vec2(repeat,repeat);m.bumpiness=kind==='water'? .5:.24;
          m.glossMap=this._pcTexture(kind,'roughness');m.glossMapTiling=new pc.Vec2(repeat,repeat);m.glossInvert=true;
        }catch(_){/* A missing optional map keeps a usable base material. */}
      }
      if(emissive){m.emissive=new pc.Color(c[0]/255,c[1]/255,c[2]/255);m.emissiveIntensity=1.35;}
      m.update();this._materials.set(key,m);return m;
    }
    _readColor(color) { if (color.startsWith('rgb')) return color.match(/[\d.]+/g).slice(0, 3).map(Number); return rgb(color); }
    _newPcPart(p) {
      const entity = new pc.Entity(p.id); entity.addComponent('render', { type: p.shape || 'box', material: this._pcMaterial(p.color, p.emissive, p), castShadows: !p.ground && !p.window, receiveShadows: true }); this.app.root.addChild(entity); this._setPcPart(entity, p); return entity;
    }
    _setPcPart(entity, p) {
      entity.setPosition(p.x, p.y, p.z); entity.setLocalScale(p.w, p.h, p.d); entity.setEulerAngles((p.r?.[0] || 0) * RAD, (p.r?.[1] || 0) * RAD, (p.r?.[2] || 0) * RAD);
    }
    _basis() {
      const c = this.camera, pitch = this.view === 'top' ? Math.PI / 2 : c.pitch;
      this._sin = Math.sin(c.yaw); this._cos = Math.cos(c.yaw); this._sp = Math.sin(pitch); this._cp = Math.cos(pitch);
      this.ppu = Math.min(this.w, this.h) / c.span;
    }
    _projectWorld(x, h, z) {
      const c = this.camera, dx = x - c.x, dz = z - c.z, dy = h - c.h;
      return { x: this.w / 2 + (dx * this._cos - dz * this._sin) * this.ppu, y: this.h / 2 + (dx * this._sin * this._sp + dz * this._cos * this._sp - dy * this._cp) * this.ppu, depth: dx * this._sin * this._cp + dy * this._sp + dz * this._cos * this._cp };
    }
    project(node) {
      const p = this._projectWorld(node.x + .5, this._height(node) + (Number(node.height) || 0), node.y + .5);
      return { x: p.x, y: p.y, visible: p.x > -30 && p.x < this.w + 30 && p.y > -50 && p.y < this.h + 40, depth: p.depth };
    }
    _unproject(sx, sy, height) {
      const a = (sx - this.w / 2) / this.ppu, b = ((sy - this.h / 2) / this.ppu + (height - this.camera.h) * this._cp) / Math.max(.001, this._sp);
      return { x: this.camera.x + a * this._cos + b * this._sin, z: this.camera.z - a * this._sin + b * this._cos };
    }
    _boxFaces(p) {
      const corners = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(c => {
        const v = rotated([c[0] * p.w / 2, c[1] * p.h / 2, c[2] * p.d / 2], p.r); return { x: p.x + v[0], y: p.y + v[1], z: p.z + v[2] };
      });
      return FACE_DEFS.map(face => {
        const normal = rotated(face.n, p.r), points = face.i.map(i => corners[i]);
        const brightness = clamp(.67 + Math.max(0, normal[0] * -.35 + normal[1] * .83 + normal[2] * -.43) * .44, .53, 1.13);
        const base = this._readColor(p.color); const fill = `rgb(${base.map(n => Math.round(clamp(n * brightness, 0, 255))).join(',')})`;
        return { points, normal, fill, part: p, cx: points.reduce((s,v) => s + v.x,0) / 4, cy: points.reduce((s,v) => s + v.y,0) / 4, cz: points.reduce((s,v) => s + v.z,0) / 4 };
      });
    }
    _unitParts(unit, position, time) {
      if(root.P3Operators?.build)return root.P3Operators.build(unit,position,time);
      const parts = [], role = unit.role || 'H', enemy = unit.team === 'enemy', walk = position.walk || 0, stride = Math.sin(time * 15) * walk;
      const crouch = unit.hunkered || unit.hunker ? .24 : 0, bob = Math.abs(stride) * .035 - crouch;
      const yaw = position.yaw || 0, fall = (position.fall || 0) * 1.4, base = [position.x, position.h + bob, position.z];
      const black = '#101719', armor = enemy ? '#3c3b3c' : '#30383b', cloth = role === 'T' ? '#292f31' : role === 'R' ? '#343b3e' : '#252b2d', bone = '#757c7e';
      const width = role === 'E' ? .55 : .43;
      const add = (id, x, y, z, w, h, d, color, shape = 'box', pitch = 0) => {
        const v = rotated([x, y, z], [fall, yaw, 0]);
        parts.push({ id: `${unit.id}/${id}`, x: base[0] + v[0], y: base[1] + v[1], z: base[2] + v[2], w, h, d, color, shape, r: [pitch + fall, yaw, 0], unit: unit.id });
      };
      add('trousers', 0, .76, 0, .39, .15, .28, '#232a2c'); add('shirt', 0, 1.05, 0, .43, .55, .29, cloth);
      add('carrier', 0, 1.09, .035, width, role === 'E' ? .46 : .34, .34, armor);
      add('blank-id-panel', 0, 1.2, .214, .2, .055, .018, bone);
      for (const sign of [-1,1]) add(`strap${sign}`, sign * .16, 1.34, .035, .06, .05, .3, armor);
      add('neck', 0, 1.39, 0, .15, .14, .16, black, 'sphere');
      add('featureless-head', 0, 1.63, .01, .285, .35, .29, black, 'sphere');
      add('earpiece', -.15, 1.62, -.015, .035, .08, .075, armor);
      add('belt', 0, .79, 0, .43, .085, .3, armor); add('pouch', -.24, .77, -.015, .14, .2, .17, armor);
      const limb = (id, pivot, center, angle, size, color) => { const v = rotated(center, [angle,0,0]); add(id, pivot[0]+v[0], pivot[1]+v[1], pivot[2]+v[2], ...size, color, 'box', angle); };
      for (const sign of [-1,1]) {
        const holdsDeck = role === 'T' && sign === -1;
        const armPitch = holdsDeck ? -.65 + stride * .08 : -sign * stride * .48 - .08, shoulder = [sign * (width / 2 + .075), 1.32, 0];
        if(role==='T') {
          limb(`short-sleeve${sign}`, shoulder, [0,-.11,0], armPitch, [.15,.23,.18], cloth);
          limb(`exposed-upper-arm${sign}`, shoulder, [0,-.285,0], armPitch, [.12,.13,.145], black);
        } else limb(`upper-arm${sign}`, shoulder, [0,-.17,0], armPitch, [.14,.33,.17], cloth);
        const elbowDelta = rotated([0,-.35,0], [armPitch,0,0]), elbow = shoulder.map((v,i) => v + elbowDelta[i]);
        const forearmPitch = holdsDeck ? -1.25 + stride * .06 : armPitch-.17;
        limb(`forearm${sign}`, elbow, [0,-.14,.015], forearmPitch, [.12,.25,.145], role === 'T' ? black : cloth);
        const hand = rotated([0,-.31,.025], [forearmPitch,0,0]); add(`hand${sign}`, elbow[0]+hand[0],elbow[1]+hand[1],elbow[2]+hand[2],.13,.15,.14,black,'sphere');
        if (role === 'E') limb(`shoulder${sign}`, shoulder,[0,-.035,0],armPitch,[.19,.17,.23],armor);
        if (enemy && sign === -1) limb('muted-threat-band',shoulder,[0,-.17,.092],armPitch,[.15,.07,.022],'#ae725f');
        const legPitch = sign * stride * .49 - (crouch ? .32 : 0), kneePitch = legPitch + Math.max(0,-sign*stride)*.6 + (crouch ? .65 : 0), hip = [sign*.12,.75,0];
        limb(`thigh${sign}`,hip,[0,-.17,0],legPitch,[.175,.35,.21],'#252c2e');
        const kd=rotated([0,-.35,0],[legPitch,0,0]),knee=hip.map((v,i)=>v+kd[i]);
        limb(`shin${sign}`,knee,[0,-.16,0],kneePitch,[.15,.31,.18],'#242c2e');
        limb(`boot${sign}`,knee,[0,-.31,.075],kneePitch,[.19,.16,.32],'#20282a');
        if(role==='E')limb(`kneepad${sign}`,knee,[0,-.02,.12],kneePitch,[.17,.16,.05],armor);
      }
      if(role==='E') { add('entry-tool',.3,.76,-.17,.06,.64,.065,'#879194'); add('entry-tool-head',.3,1.09,-.17,.22,.06,.08,'#99a1a1'); }
      else if(role==='R') { for(const s of[-1,1])add(`optic${s}`,.21+s*.06,1.07,.28,.09,.1,.25,'#20282c');add('optic-bridge',.21,1.07,.22,.22,.055,.07,armor);add('sensor',-.27,.86,-.06,.13,.2,.17,armor);add('antenna',-.27,1.1,-.08,.025,.26,.025,'#8d999d'); }
      else if(role==='T') {
        add('open-deck-base',-.3,.95,.33,.42,.06,.3,'#242e32');
        add('open-deck-keyboard',-.3,.986,.34,.35,.012,.23,'#4b5758');
        for(let row=0;row<3;row++)add(`keyboard-row-${row}`,-.3,.997,.28+row*.065,.3,.012,.025,'#242e31');
        add('open-deck-hinged-screen',-.3,1.12,.18,.42,.29,.04,'#253036','box',-.18);
        add('deck-display',-.3,1.125,.207,.35,.23,.012,'#63958e','box',-.18);
        add('interface',.32,.9,.15,.14,.17,.045,'#6a9894');
      }
      if(enemy) { add('compact-tool',.17,1.05,.38,.1,.12,.6,'#232b2e');add('tool-stock',.18,1.03,.08,.12,.15,.21,'#3c4448'); }
      if(this.level.theme==='white-industrial')for(const p of parts){
        // Natural/featureless exposed surfaces retain their existing identity.
        if(!/featureless-head|neck|hand|exposed-upper-arm|forearm/.test(p.id))p.color=/display|interface/.test(p.id)?'#71a9a1':/#(101719|20282a|232a2c|252c2e|242c2e)/.test(p.color)?'#d8deda':'#edf0e9';
      }
      return parts;
    }
    setState(snapshot) {
      this.state = snapshot || { units: [] };
      for (const unit of this.state.units || []) {
        let p = this.positions.get(unit.id); if (!p) p = { yaw: unit.team === 'enemy' ? Math.PI : 0 };
        Object.assign(p,{ x:unit.x+.5,z:unit.y+.5,h:this._height(unit),walk:0,fall:0 }); this.positions.set(unit.id,p);
        if(unit.dead||unit.hp<=0)this.killed.add(unit.id);else this.killed.delete(unit.id);
      }
      if(this._firstState && this.state.units?.length){this._firstState=false;this._startAtSquad();}
      this._dirty=true;
    }
    setOverlay(overlay) { this.overlay={reachable:[],path:[],...overlay};this._dirty=true; }
    _alive(unit) { return unit.hp > 0 && !unit.dead && !unit.extracted && !this.killed.has(unit.id) && unit.visible !== false; }
    focus(idOrNode) {
      const node=typeof idOrNode==='string'?(this.state.units||[]).find(u=>u.id===idOrNode):idOrNode;if(!node)return;
      this.camera.x=node.x+.5;this.camera.z=node.y+.5;this.camera.h=this._height(node)+1.05;this._basis();this._dirty=true;
    }
    // HUD squad taps focus an operative without changing yaw or camera view.
    focusOperative(id) {
      const unit=(this.state.units||[]).find(u=>u.id===id&&this._alive(u));if(!unit)return false;
      const p=this.positions.get(id);
      this.camera.x=p?p.x:unit.x+.5;this.camera.z=p?p.z:unit.y+.5;
      this.camera.h=(p?p.h:this._height(unit))+1;
      this.camera.span=13;this._basis();this._dirty=true;return true;
    }
    _startAtSquad() {
      const squad=(this.state.units||[]).filter(u=>u.team==='player'&&this._alive(u));if(!squad.length)return;
      const unit=squad.find(u=>u.id===this.state.selectedId)||squad[0];
      this.camera.x=squad.reduce((sum,u)=>sum+u.x+.5,0)/squad.length;
      this.camera.z=squad.reduce((sum,u)=>sum+u.y+.5,0)/squad.length+2;
      this.camera.h=this._height(unit)+1;this.camera.yaw=2.4;this.camera.span=this.w<600?16:19;this.camera.pitch=.72;
      this.view='3d';this._basis();this._dirty=true;
    }
    home() {
      const units=(this.state.units||[]).filter(u=>u.team==='player'&&this._alive(u));if(!units.length)return;
      const selected=units.find(u=>u.id===this.state.selectedId)||units[0];
      this.focusOperative(selected.id);this.camera.span=13;this._basis();this._dirty=true;
    }
    overview() {
      if(this.level.worldParts){this.view='3d';const b=this.level.bounds;this.camera.x=(b.minX+b.maxX+1)/2;this.camera.z=(b.minY+b.maxY+1)/2;this.camera.h=2;this.camera.yaw=this.editor ? .66 : 2.4;this.camera.span=this.editor?Math.max(b.maxX-b.minX,b.maxY-b.minY)*1.08:90;this._basis();this._dirty=true;return;}
      this.camera.x=-8;this.camera.z=-8;this.camera.h=2.5;this.camera.yaw=2.4;
      this.camera.span=this.w<600?90:72;this.view='3d';this._basis();this._dirty=true;
    }
    // Optional hook for commands issued through coordinates or the minimap.
    // It changes the center only when the requested location is off screen.
    ensureVisible(node) {
      if(!node)return false;const p=this.project({...node,height:1}),margin=Math.min(56,this.w*.16,this.h*.16);
      if(p.x>=margin&&p.x<=this.w-margin&&p.y>=margin&&p.y<=this.h-margin)return false;
      this.focus(node);return true;
    }
    setView(mode) { this.view=mode==='top'?'top':'3d';if(this.editor)this.camera.yaw=mode==='top'?Math.PI:.66;this._basis();this._dirty=true; }
    zoom(factor) { if(Number.isFinite(factor)&&factor>0)this.camera.span=clamp(this.camera.span/factor,11,this.level.worldParts?320:115);this._basis();this._dirty=true; }
    rotate(delta) { this.camera.yaw+=Number(delta)||0;this._basis();this._dirty=true; }
    getMode() { return this.mode; }
    resize() {
      const rect=this.canvas.getBoundingClientRect();this.w=Math.max(1,Math.round(rect.width));this.h=Math.max(1,Math.round(rect.height));
      this.dpr=Math.min(root.devicePixelRatio||1,this.w<600?1.5:2);
      if(this.mode==='webgl'){this.app.graphicsDevice.maxPixelRatio=Math.min(this.dpr,1.75);this.app.resizeCanvas(this.w,this.h);}else{this.canvas.width=Math.round(this.w*this.dpr);this.canvas.height=Math.round(this.h*this.dpr);this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);}
      if(this._mapLabels){this._mapLabels.width=Math.round(this.w*this.dpr);this._mapLabels.height=Math.round(this.h*this.dpr);}
      this._basis();this._dirty=true;
    }
    _tween(duration,fn) {
      if(this._reduced||duration<=0){fn(1);return Promise.resolve();}
      return new Promise(resolve=>{this.tweens.add({start:performance.now(),duration,fn,resolve});});
    }
    async animate(events) {
      for(const event of events||[]){
        if(this._disposed)return;
        if(event.type==='move'&&event.path?.length){
          if(this.killed.has(event.id))continue;
          const unit=(this.state.units||[]).find(u=>u.id===event.id);if(!unit)continue;
          const p=this.positions.get(event.id),path=event.path;
          for(let i=1;i<path.length;i++){
            if(this.killed.has(event.id))break;
            const a={x:p.x,z:p.z,h:p.h},b={x:path[i].x+.5,z:path[i].y+.5,h:this._height(path[i])};
            const length=Math.hypot(b.x-a.x,b.z-a.z),duration=clamp(length*125+Math.abs(b.h-a.h)*15,115,1350);
            p.yaw=Math.atan2(b.x-a.x,b.z-a.z);p.walk=1;
            await this._tween(duration,t=>{p.x=mix(a.x,b.x,t);p.z=mix(a.z,b.z,t);p.h=mix(a.h,b.h,t);this._dirty=true;});
          }
          p.walk=0;this._dirty=true;
        }else if(event.type==='shot'){
          const from=event.from,to=event.to;if(!from||!to)continue;
          const attacker=(this.state.units||[]).find(u=>u.id===event.attackerId),pos=this.positions.get(event.attackerId);
          if(pos)pos.yaw=Math.atan2(to.x-from.x,to.y-from.y);
          const effect={kind:'shot',a:{x:from.x+.5,h:this._height(from)+1.1,z:from.y+.5},b:{x:to.x+.5+(event.hit?0:.65),h:this._height(to)+1.05,z:to.y+.5+(event.hit?0:-.4)},start:performance.now(),duration:400,color:attacker?.team==='enemy'?'#e3a080':'#f1ce83',hit:event.hit,label:event.hit?`−${event.damage||0}`:'MISS'};
          this.effects.push(effect);await this._tween(this._reduced?0:240,()=>{this._dirty=true;});
        }else if(event.type==='death'){
          const p=this.positions.get(event.id);if(p){await this._tween(160,t=>{p.fall=t;this._dirty=true;});}
          this.killed.add(event.id);this._dirty=true;
        }else if(event.type==='hack'||event.type==='extract'){
          const n=event.node||this.level.relay;if(n)this.effects.push({kind:'pulse',node:n,start:performance.now(),duration:700,color:'#91d9b5'});
        }
      }
    }
    _pick(sx,sy) {
      if(this.editor){const r=this.canvas.getBoundingClientRect(),node=this.pickAt(sx+r.left,sy+r.top);if(node)this.onPick(node);return;}
      let nearest=null,best=Infinity;
      for(const unit of this.state.units||[]){if(!this._alive(unit))continue;const p=this.positions.get(unit.id);if(!p)continue;const q=this._projectWorld(p.x,p.h+1,p.z),d=Math.hypot(sx-q.x,sy-q.y);const hit=Math.max(9,Math.min(20,this.ppu*.45));if(d<hit&&d<best){nearest=unit;best=d;}}
      if(nearest){this.onPick({kind:'unit',id:nearest.id});return;}
      const candidates=[];
      for(const surface of [...(this.level.buildings||[]),...(this.level.bridges||[])]){
        const p=this._unproject(sx,sy,surface.h);if(insideRect(p.x,p.z,surface)){const node={x:Math.floor(p.x),y:Math.floor(p.z),layer:1};if(this.level.canStand(node,this.state.gateOpen))candidates.push({node,depth:this._projectWorld(p.x,surface.h,p.z).depth});}
      }
      const p=this._unproject(sx,sy,0),ground={x:Math.floor(p.x),y:Math.floor(p.z),layer:0};
      if(this.level.canStand(ground,this.state.gateOpen))candidates.push({node:ground,depth:this._projectWorld(p.x,0,p.z).depth});
      candidates.sort((a,b)=>b.depth-a.depth);
      const node=candidates[0]?.node||ground,bounds=this.level.bounds||{min:-64,max:63};
      if(node.x>=(bounds.minX??bounds.min)&&node.x<=(bounds.maxX??bounds.max)&&node.y>=(bounds.minY??bounds.min)&&node.y<=(bounds.maxY??bounds.max))this.onPick({kind:'tile',...node});
    }
    pickAt(clientX,clientY) {
      const r=this.canvas.getBoundingClientRect(),sx=clientX-r.left,sy=clientY-r.top;
      if(sx<0||sy<0||sx>r.width||sy>r.height)return null;
      const p=this._unproject(sx,sy,0),b=this.level.bounds||{min:-64,max:63},node={kind:'tile',x:Math.floor(p.x),y:Math.floor(p.z),layer:0};
      if(node.x<(b.minX??b.min)||node.x>(b.maxX??b.max)||node.y<(b.minY??b.min)||node.y>(b.maxY??b.max))return null;
      return node;
    }
    _bindControls() {
      const canvas=this.canvas,pointers=new Map();canvas.style.touchAction='none';this._pointers=pointers;let gesture=null;
      this._listeners=[];const on=(type,handler,options)=>{canvas.addEventListener(type,handler,options);this._listeners.push([type,handler,options]);};
      const position=e=>({x:e.clientX,y:e.clientY});
      on('pointerdown',e=>{pointers.set(e.pointerId,{...position(e),startX:e.clientX,startY:e.clientY,drag:false,button:e.button});canvas.setPointerCapture(e.pointerId);if(pointers.size===2){const[a,b]=[...pointers.values()];gesture={distance:Math.hypot(a.x-b.x,a.y-b.y),x:(a.x+b.x)/2,y:(a.y+b.y)/2};pointers.forEach(p=>p.drag=true);}});
      on('pointermove',e=>{
        const p=pointers.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;if(Math.hypot(p.x-p.startX,p.y-p.startY)>6)p.drag=true;
        if(pointers.size===2){const[a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y),x=(a.x+b.x)/2,y=(a.y+b.y)/2;if(gesture){this.zoom(distance/Math.max(1,gesture.distance));this._pan(x-gesture.x,y-gesture.y);}gesture={distance,x,y};}
        else if(p.drag){if(this.editor&&p.button!==2&&!e.shiftKey&&this.view!=='top')this.rotate(-dx*.007);else this._pan(dx,dy);}
      });
      on('pointerup',e=>{const p=pointers.get(e.pointerId);if(p&&!p.drag&&p.button===0){const r=canvas.getBoundingClientRect();this._pick(e.clientX-r.left,e.clientY-r.top);}pointers.delete(e.pointerId);if(pointers.size<2)gesture=null;});
      on('pointercancel',e=>{pointers.delete(e.pointerId);gesture=null;});on('contextmenu',e=>e.preventDefault());
      on('lostpointercapture',e=>{pointers.delete(e.pointerId);if(pointers.size<2)gesture=null;});
      on('wheel',e=>{e.preventDefault();this.zoom(Math.exp(-e.deltaY*.0013));},{passive:false});
    }
    _pan(dx,dy) { const a=this._unproject(this.w/2,this.h/2,this.camera.h),b=this._unproject(this.w/2-dx,this.h/2-dy,this.camera.h),v=this.level.bounds;this.camera.x=clamp(this.camera.x+b.x-a.x,(v.minX??v.min)-2,(v.maxX??v.max)+3);this.camera.z=clamp(this.camera.z+b.z-a.z,(v.minY??v.min)-2,(v.maxY??v.max)+3);this._dirty=true; }
    _unbindControls() { for(const[type,handler,options]of this._listeners||[])this.canvas.removeEventListener(type,handler,options);this._listeners=[]; }
    _frame(now) {
      if(this._disposed)return;this._raf=requestAnimationFrame(this._frame);
      for(const t of [...this.tweens]){const p=clamp((now-t.start)/t.duration,0,1);t.fn(p);if(p===1){this.tweens.delete(t);t.resolve();}}
      const previousEffects=this.effects.length;this.effects=this.effects.filter(e=>now-e.start<e.duration);
      if(previousEffects!==this.effects.length)this._dirty=true;
      const active=this.tweens.size>0||this.effects.length>0;
      if(!this._dirty&&!active){
        if(this._reduced||!this._waterInView()||now-this._lastFrame<180)return;
      }else if(now-this._lastFrame<(this.w<600?33:30))return;
      this._lastFrame=now;this._time=now/1000;this._basis();
      if(this.mode==='webgl')this._renderGL(now);else this._renderCanvas(now);this._dirty=false;
    }
    _waterInView() {
      const c=this.level.canal;if(!c)return false;
      const points=[[c.x,c.y],[c.x+c.w,c.y],[c.x+c.w,c.y+c.d],[c.x,c.y+c.d]].map(p=>this._projectWorld(p[0],0,p[1]));
      return Math.max(...points.map(p=>p.x))>=0&&Math.min(...points.map(p=>p.x))<=this.w&&Math.max(...points.map(p=>p.y))>=0&&Math.min(...points.map(p=>p.y))<=this.h;
    }
    _near(p) { return p.ground||Math.hypot(p.x-this.camera.x,p.z-this.camera.z)<this.camera.span*1.35+Math.max(p.w,p.d)*.7; }
    _visibleFace(face) { return face.normal[0]*this._sin*this._cp+face.normal[1]*this._sp+face.normal[2]*this._cos*this._cp>.001; }
    _renderCanvas(now) {
      const ctx=this.ctx;ctx.setTransform(this.dpr,0,0,this.dpr,0,0);ctx.clearRect(0,0,this.w,this.h);
      const light=this.level.theme==='white-industrial',background=ctx.createLinearGradient(0,0,0,this.h);
      background.addColorStop(0,light?'#b6c8cb':'#223d4a');background.addColorStop(1,light?'#e4e9e2':'#445a62');ctx.fillStyle=background;ctx.fillRect(0,0,this.w,this.h);
      this._drawGroundDetails(ctx,now);
      const faces=[];
      for(const {p,faces:geometry}of this._staticGeometry){
        if(p.ground||!this._near(p)||(p.gate&&this.state.gateOpen))continue;
        if(p.shape==='sphere'||p.shape==='capsule'||p.shape==='cylinder'){faces.push({kind:p.shape,part:p,depth:this._projectWorld(p.x,p.y,p.z).depth});continue;}
        for(const face of geometry)if(this._visibleFace(face))faces.push({...face,depth:this._projectWorld(face.cx,face.cy,face.cz).depth});
      }
      this._pushOverlays(faces);
      for(const unit of this.state.units||[]){
        if(!this._alive(unit))continue;const p=this.positions.get(unit.id);if(!p||Math.hypot(p.x-this.camera.x,p.z-this.camera.z)>this.camera.span*1.5)continue;
        const foot=this._projectWorld(p.x,p.h+.03,p.z);faces.push({kind:'shadow',depth:foot.depth-.25,pos:p});
        for(const part of this._unitParts(unit,p,this._time)){
          if(part.shape==='sphere'||part.shape==='capsule'||part.shape==='cylinder'){faces.push({kind:part.shape,part,depth:this._projectWorld(part.x,part.y,part.z).depth});continue;}
          for(const face of this._boxFaces(part))if(this._visibleFace(face))faces.push({...face,depth:this._projectWorld(face.cx,face.cy,face.cz).depth});
        }
      }
      faces.sort((a,b)=>a.depth-b.depth);
      for(const face of faces){
        if(face.kind==='shadow'){this._drawShadow(ctx,face.pos);continue;}
        if(face.kind==='sphere'){this._drawSphere(ctx,face.part);continue;}
        if(face.kind==='capsule'||face.kind==='cylinder'){this._drawCapsule(ctx,face.part,face.kind==='cylinder');continue;}
        this._paintFace(ctx,face);
      }
      this._drawGlows(ctx);this._drawEffects(ctx,now);this._drawWorldMarkers(ctx);this._drawGridLabels(ctx);
      if(this._labelCtx)this._labelCtx.clearRect(0,0,this._mapLabels.width,this._mapLabels.height);
      const vignette=ctx.createRadialGradient(this.w/2,this.h*.4,this.w*.32,this.w/2,this.h*.5,Math.max(this.w,this.h)*.76);
      vignette.addColorStop(0,'rgba(11,24,33,0)');vignette.addColorStop(1,'rgba(11,24,33,.16)');ctx.fillStyle=vignette;ctx.fillRect(0,0,this.w,this.h);
    }
    _paintFace(ctx,face) {
      const points=face.points.map(p=>this._projectWorld(p.x,p.y,p.z));
      if(points.every(p=>p.x<-20)||points.every(p=>p.x>this.w+20)||points.every(p=>p.y<-20)||points.every(p=>p.y>this.h+20))return;
      polygon(ctx,points);ctx.fillStyle=face.fill;ctx.fill();
      const p=face.part,kind=p&&this._surfaceKind(p),source=kind&&root.P3Surfaces?.texture(kind);
      if(source&&!face.overlay&&points.length===4&&this.ppu>3){
        const a=face.points[0],b=face.points[1],d=face.points[3];
        const u=Math.hypot(b.x-a.x,b.y-a.y,b.z-a.z),v=Math.hypot(d.x-a.x,d.y-a.y,d.z-a.z);
        if(u>.12&&v>.12){
          let pattern=this._surfacePatterns.get(kind);if(!pattern){pattern=ctx.createPattern(source,'repeat');this._surfacePatterns.set(kind,pattern);}
          const tile=kind==='fabric'? .7:kind==='water'?5:4,k=source.width/tile;
          ctx.save();polygon(ctx,points);ctx.clip();ctx.globalAlpha=p.unit? .24:this.level.theme==='white-industrial'? .3:kind==='asphalt'||kind==='water'? .97:.8;
          ctx.transform((points[1].x-points[0].x)/(u*k),(points[1].y-points[0].y)/(u*k),(points[3].x-points[0].x)/(v*k),(points[3].y-points[0].y)/(v*k),points[0].x,points[0].y);
          ctx.fillStyle=pattern;ctx.fillRect(0,0,u*k,v*k);ctx.restore();
          const n=face.normal||[0,1,0],bright=clamp(.55+Math.max(0,-n[0]*.35+n[1]*.83-n[2]*.43)*.5,.5,1.03);
          if(bright<1){polygon(ctx,points);ctx.fillStyle=`rgba(10,25,37,${(1-bright)*.65})`;ctx.fill();}
        }
      }
      if(!face.overlay&&p&&!p.ground){
        ctx.lineWidth=.65;ctx.strokeStyle=p.unit?'rgba(141,164,171,.15)':'rgba(20,37,46,.32)';polygon(ctx,points);ctx.stroke();
        if(face.normal?.[1]>.7){ctx.strokeStyle='rgba(225,237,230,.2)';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);ctx.lineTo(points[1].x,points[1].y);ctx.stroke();}
      }
      if(p&&!p.ground&&!p.unit&&face.normal?.[1]>.95)this._drawRoofGrid(ctx,face,points);
      if(face.stroke){ctx.strokeStyle=face.stroke;ctx.lineWidth=face.width||1;polygon(ctx,points);ctx.stroke();}
    }
    _drawRoofGrid(ctx,face,screenPoints) {
      const p=face.part,h=p.y+p.h/2;
      const roof=[...(this.level.buildings||[]),...(this.level.bridges||[])].find(b=>p.x>=b.x-.1&&p.x<=b.x+b.w+.1&&p.z>=b.y-.1&&p.z<=b.y+b.d+.1&&Math.abs(h-b.h)<.15);
      if(!roof||this.ppu<5)return;
      ctx.save();polygon(ctx,screenPoints);ctx.clip();
      const draw=(a,b,major)=>{const q=this._projectWorld(a[0],h+.008,a[1]),r=this._projectWorld(b[0],h+.008,b[1]);ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(r.x,r.y);ctx.strokeStyle=this.level.theme==='white-industrial'?(major?'rgba(46,105,117,.6)':'rgba(60,114,126,.34)'):(major?'rgba(188,218,228,.58)':'rgba(174,208,221,.32)');ctx.lineWidth=major?1:.65;ctx.stroke();};
      for(let x=Math.ceil(roof.x);x<=roof.x+roof.w;x++)draw([x,roof.y],[x,roof.y+roof.d],x%5===0);
      for(let y=Math.ceil(roof.y);y<=roof.y+roof.d;y++)draw([roof.x,y],[roof.x+roof.w,y],y%5===0);
      ctx.restore();
    }
    _drawGroundDetails(ctx,now) {
      const ground=this._staticGeometry.filter(item=>item.p.ground).sort((a,b)=>(a.p.y+a.p.h/2)-(b.p.y+b.p.h/2));
      for(const {p,faces}of ground){const face=faces.find(f=>f.normal[1]>.9);if(face)this._paintFace(ctx,face);}
      if(!this.level.worldParts)this._drawGroundDecals(ctx);
      this._drawStaticShadows(ctx);
      for(const l of this._lamps){
        if(Math.hypot(l.x-this.camera.x,l.z-this.camera.z)>this.camera.span*1.3)continue;
        const q=this._projectWorld(l.x,.08,l.z),r=this.ppu*2.9;
        ctx.save();ctx.translate(q.x,q.y);ctx.scale(1,this._sp*.6);const g=ctx.createRadialGradient(0,0,0,0,0,r);g.addColorStop(0,'rgba(255,200,108,.2)');g.addColorStop(.3,'rgba(255,187,84,.085)');g.addColorStop(1,'rgba(255,194,105,0)');ctx.globalCompositeOperation='screen';ctx.fillStyle=g;ctx.fillRect(-r,-r,r*2,r*2);ctx.restore();
      }
      for(const {p}of ground)if(p.water)this._drawWater(ctx,p,now);
      this._drawGroundGrid(ctx);
      const evac=this.level.evac;if(evac)this._worldCircle(ctx,evac.x+.5,.085,evac.y+.5,evac.r,'rgba(141,207,195,.5)',1.1,true);
    }
    _drawGroundDecals(ctx) {
      // Flush drains, expansion cuts and damp patches add scale without changing collision.
      const rect=(x,z,w,d,color)=>{const points=[[x,z],[x+w,z],[x+w,z+d],[x,z+d]].map(a=>this._projectWorld(a[0],.004,a[1]));polygon(ctx,points);ctx.fillStyle=color;ctx.fill();};
      for(let x=-56;x<57;x+=8){
        rect(x,-39.8,3,.32,'rgba(24,43,52,.65)');
        for(let j=0;j<11;j++)rect(x+.1+j*.25,-39.79,.035,.3,'rgba(162,180,179,.4)');
      }
      const radius=Math.ceil(this.camera.span*1.2),ix0=Math.floor((this.camera.x-radius)/3.7),ix1=Math.ceil((this.camera.x+radius)/3.7),iz0=Math.floor((this.camera.z-radius)/4.1),iz1=Math.ceil((this.camera.z+radius)/4.1);
      for(let ix=ix0;ix<=ix1;ix++)for(let iz=iz0;iz<=iz1;iz++){
        const x=ix*3.7,z=iz*4.1;
        if(!this.level.canStand({x:Math.floor(x),y:Math.floor(z),layer:0},this.state.gateOpen))continue;
        const n=Math.abs(Math.sin(x*17.13+z*31.7));if(n<.4)continue;
        const points=[];for(let i=0;i<9;i++){const a=i/9*TAU,r=.55+Math.abs(Math.sin(x+i*8.1+z))*1.35;points.push(this._projectWorld(x+Math.cos(a)*r,.007,z+Math.sin(a)*r*.38));}
        polygon(ctx,points);ctx.fillStyle='rgba(158,196,205,.095)';ctx.fill();ctx.strokeStyle='rgba(201,224,225,.11)';ctx.lineWidth=.55;ctx.stroke();
      }
    }
    _drawStaticShadows(ctx) {
      const solids=[...(this.level.buildings||[]),...(this.level.boxes||[])];
      for(const b of solids){
        if(Math.hypot(b.x+b.w/2-this.camera.x,b.y+b.d/2-this.camera.z)>this.camera.span*1.6+Math.max(b.w,b.d))continue;
        const dx=b.h*.55,dz=b.h*.38,pts=[[b.x,b.y],[b.x+b.w,b.y],[b.x+b.w+dx,b.y+dz],[b.x+b.w+dx,b.y+b.d+dz],[b.x+dx,b.y+b.d+dz],[b.x,b.y+b.d]].map(p=>this._projectWorld(p[0],.045,p[1]));
        polygon(ctx,pts);ctx.fillStyle='rgba(10,22,33,.19)';ctx.fill();
      }
    }
    _drawWater(ctx,p,now) {
      const h=p.y+p.h/2+.006,x=p.x-p.w/2,z=p.z-p.d/2,points=[[x,z],[x+p.w,z],[x+p.w,z+p.d],[x,z+p.d]].map(q=>this._projectWorld(q[0],h,q[1]));
      ctx.save();polygon(ctx,points);ctx.clip();
      const n=Math.min(72,Math.ceil(p.w*1.2));
      for(let j=0;j<n;j++){
        const wx=x+(j*.787)%p.w,wz=z+(j*1.391)%p.d,amplitude=.08*Math.sin(now*.00055+j),a=this._projectWorld(wx,h,wz+amplitude),b=this._projectWorld(wx+.2+(j%5)*.16,h,wz+amplitude);
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineWidth=j%3===0?1.1:.65;ctx.strokeStyle=j%4===0?'rgba(220,240,225,.29)':'rgba(135,198,199,.15)';ctx.stroke();
      }
      ctx.restore();
    }
    _drawGroundGrid(ctx) {
      const gh=this.level.worldParts? .32:.095;
      const b=this.level.bounds,minX=b.minX??b.min,minY=b.minY??b.min,maxX=(b.maxX??b.max)+1,maxY=(b.maxY??b.max)+1,r=Math.min(80,Math.ceil(this.camera.span*1.5)),step=this.ppu<5?5:1;
      const x0=Math.max(minX,Math.floor(this.camera.x-r)),x1=Math.min(maxX,Math.ceil(this.camera.x+r)),z0=Math.max(minY,Math.floor(this.camera.z-r)),z1=Math.min(maxY,Math.ceil(this.camera.z+r));
      ctx.save();ctx.beginPath();ctx.rect(0,0,this.w,this.h);
      for(const {p}of this._staticGeometry)if(p.water){const q=[[p.x-p.w/2,p.z-p.d/2],[p.x+p.w/2,p.z-p.d/2],[p.x+p.w/2,p.z+p.d/2],[p.x-p.w/2,p.z+p.d/2]].map(a=>this._projectWorld(a[0],gh,a[1]));ctx.moveTo(q[0].x,q[0].y);for(let i=1;i<4;i++)ctx.lineTo(q[i].x,q[i].y);ctx.closePath();}
      for(const br of this.level.groundBridges||[])for(const {p}of this._staticGeometry)if(p.water){
        const x=Math.max(br.x,p.x-p.w/2),z=Math.max(br.y,p.z-p.d/2),X=Math.min(br.x+br.w,p.x+p.w/2),Z=Math.min(br.y+br.d,p.z+p.d/2);if(X<=x||Z<=z)continue;
        const q=[[x,z],[X,z],[X,Z],[x,Z]].map(a=>this._projectWorld(a[0],gh,a[1]));ctx.moveTo(q[0].x,q[0].y);for(let i=1;i<4;i++)ctx.lineTo(q[i].x,q[i].y);ctx.closePath();
      }
      ctx.clip('evenodd');
      const line=(a,c,major)=>{ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(c.x,c.y);ctx.strokeStyle=this.level.theme==='white-industrial'?(major?'rgba(40,98,111,.62)':'rgba(41,104,120,.32)'):(major?'rgba(174,215,228,.56)':'rgba(150,195,212,.30)');ctx.lineWidth=major?1:.62;ctx.stroke();};
      for(let x=Math.ceil(x0/step)*step;x<=x1;x+=step)line(this._projectWorld(x,gh,z0),this._projectWorld(x,gh,z1),x%5===0);
      for(let z=Math.ceil(z0/step)*step;z<=z1;z+=step)line(this._projectWorld(x0,gh,z),this._projectWorld(x1,gh,z),z%5===0);
      ctx.restore();
    }
    _drawForgeGround(ctx,now) { this._drawGroundDetails(ctx,now); }
    _drawGridLabels(ctx) {
      if(this.editor)return;
      const gh=this.level.worldParts? .32:.1;
      const b=this.level.bounds,minX=b.minX??b.min,minY=b.minY??b.min,maxX=(b.maxX??b.max)+1,maxY=(b.maxY??b.max)+1;
      const minScreenY=70,maxScreenY=this.h-64,left=8,right=this.w-9,r=Math.min(90,Math.ceil(this.camera.span*2)),spacing=this.ppu<6?16:5;
      const labels=[],accepted=[];
      const intersect=(a,c,axis,value)=>{const d=c[axis]-a[axis];if(Math.abs(d)<1e-6)return null;const t=(value-a[axis])/d;if(t<0||t>1)return null;return{x:a.x+(c.x-a.x)*t,y:a.y+(c.y-a.y)*t};};
      for(let x=Math.ceil(Math.max(minX,this.camera.x-r)/spacing)*spacing;x<=Math.min(maxX,this.camera.x+r);x+=spacing){const a=this._projectWorld(x,gh,minY),c=this._projectWorld(x,gh,maxY),q=intersect(a,c,'y',maxScreenY);if(q&&q.x>35&&q.x<this.w-38)labels.push({...q,text:'X '+x,axis:'x'});}
      for(let y=Math.ceil(Math.max(minY,this.camera.z-r)/spacing)*spacing;y<=Math.min(maxY,this.camera.z+r);y+=spacing){const a=this._projectWorld(minX,gh,y),c=this._projectWorld(maxX,gh,y),q=intersect(a,c,'x',left);if(q&&q.y>minScreenY&&q.y<maxScreenY-30)labels.push({...q,text:'Y '+y,axis:'y'});}
      ctx.save();ctx.font='600 10px ui-monospace, SFMono-Regular, monospace';
      for(const l of labels){if(accepted.some(p=>Math.hypot(p.x-l.x,p.y-l.y)<45))continue;accepted.push(l);const w=ctx.measureText(l.text).width+8,x=l.axis==='y'?left:l.x-w/2,y=l.y-7;ctx.fillStyle='rgba(13,30,40,.81)';ctx.fillRect(x,y,w,16);ctx.strokeStyle='rgba(174,216,224,.55)';ctx.lineWidth=.8;ctx.beginPath();if(l.axis==='x'){ctx.moveTo(l.x,y-5);ctx.lineTo(l.x,y);}else{ctx.moveTo(x+w+1,l.y);ctx.lineTo(x+w+5,l.y);}ctx.stroke();ctx.fillStyle='#d6e8e8';ctx.textAlign='left';ctx.fillText(l.text,x+4,y+11);}
      ctx.restore();
    }
    _drawGlows(ctx) {
      ctx.save();ctx.globalCompositeOperation='screen';
      for(const p of this._parts){if(!p.emissive||!this._near(p))continue;const q=this._projectWorld(p.x,p.y,p.z);if(q.x<0||q.x>this.w||q.y<0||q.y>this.h)continue;const r=Math.max(5,Math.min(28,this.ppu*(p.w+.3)));const g=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,r);g.addColorStop(0,'rgba(255,221,155,.38)');g.addColorStop(.3,'rgba(255,190,91,.12)');g.addColorStop(1,'rgba(255,194,105,0)');ctx.fillStyle=g;ctx.fillRect(q.x-r,q.y-r,r*2,r*2);}
      ctx.restore();
    }
    _pushOverlays(faces) {
      const add=(node,color,stroke,inset=.015)=>{const h=this._overlayHeight(node),x=node.x+inset,z=node.y+inset,s=1-inset*2;const points=[{x,y:h,z},{x:x+s,y:h,z},{x:x+s,y:h,z:z+s},{x,y:h,z:z+s}];faces.push({points,fill:color,stroke,overlay:true,depth:this._projectWorld(x+s/2,h,z+s/2).depth+.018});};
      for(const node of this.overlay.reachable||[]){if(Math.hypot(node.x-this.camera.x,node.y-this.camera.z)<this.camera.span*1.4)add(node,'rgba(37,190,194,.06)','rgba(107,222,225,.25)');}
      for(const node of this.overlay.path||[])add(node,'rgba(237,174,56,.12)','rgba(248,205,104,.6)',.18);
      const path=this.overlay.path||[];
      for(let i=1;i<path.length;i++){
        const a=path[i-1],b=path[i],dx=b.x-a.x,dz=b.y-a.y,length=Math.hypot(dx,dz);if(length<.01)continue;
        const nx=-dz/Math.max(1,length)*.085,nz=dx/Math.max(1,length)*.085,ah=this._overlayHeight(a)+.04,bh=this._overlayHeight(b)+.04;
        const points=[{x:a.x+.5+nx,y:ah,z:a.y+.5+nz},{x:b.x+.5+nx,y:bh,z:b.y+.5+nz},{x:b.x+.5-nx,y:bh,z:b.y+.5-nz},{x:a.x+.5-nx,y:ah,z:a.y+.5-nz}];
        faces.push({points,fill:'rgba(246,199,115,.9)',overlay:true,depth:this._projectWorld((a.x+b.x)/2+.5,(ah+bh)/2,(a.y+b.y)/2+.5).depth+.03});
      }
      if(this.overlay.destination)add(this.overlay.destination,'rgba(245,188,70,.22)','#ffda83');
      const selected=(this.state.units||[]).find(u=>u.id===(this.overlay.selectedId||this.state.selectedId));if(selected&&this._alive(selected))add(selected,'rgba(61,212,212,.1)','#79f0ec',.01);
      const target=(this.state.units||[]).find(u=>u.id===this.overlay.targetId);if(target&&this._alive(target))add(target,'rgba(200,104,83,.23)','#edaa8e',.015);
      const r=this.overlay.selectionBox;if(r){const h=(r.elevation||0)+.36,points=[{x:r.x,y:h,z:r.y},{x:r.x+r.w,y:h,z:r.y},{x:r.x+r.w,y:h,z:r.y+r.d},{x:r.x,y:h,z:r.y+r.d}];faces.push({points,fill:'rgba(14,158,147,.18)',stroke:'#008c85',width:2,overlay:true,depth:this._projectWorld(r.x+r.w/2,h,r.y+r.d/2).depth+.04});}
    }
    _drawShadow(ctx,p) {
      const q=this._projectWorld(p.x+.13,p.h+.025,p.z+.13),end=this._projectWorld(p.x+.85,p.h+.025,p.z+.55);
      ctx.save();ctx.strokeStyle='rgba(5,13,20,.26)';ctx.lineWidth=this.ppu*.46;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(end.x,end.y);ctx.stroke();
      ctx.translate(q.x,q.y);ctx.scale(1,Math.max(.25,this._sp*.55));const r=this.ppu*.68,g=ctx.createRadialGradient(0,0,.02,0,0,r);g.addColorStop(0,'rgba(3,9,14,.63)');g.addColorStop(.4,'rgba(5,15,22,.27)');g.addColorStop(1,'rgba(5,15,22,0)');ctx.fillStyle=g;ctx.fillRect(-r,-r,r*2,r*2);ctx.restore();
    }
    _drawSphere(ctx,p) {
      const q=this._projectWorld(p.x,p.y,p.z),rx=Math.max(.7,p.w*this.ppu/2),ry=Math.max(.7,Math.hypot(p.h*this._cp,p.d*this._sp)*this.ppu/2);
      if(q.x+rx<0||q.x-rx>this.w||q.y+ry<0||q.y-ry>this.h)return;
      ctx.save();ctx.translate(q.x,q.y);ctx.scale(1,ry/rx);const grad=ctx.createRadialGradient(-rx*.31,-rx*.4,rx*.03,0,0,rx);
      const base=this._readColor(p.color),rim='rgb('+base.map((c,i)=>Math.min(255,Math.round(c*1.35+[22,29,32][i]))).join(',')+')';
      grad.addColorStop(0,rim);grad.addColorStop(.32,shade(p.color,1.2));grad.addColorStop(.72,p.color);grad.addColorStop(1,shade(p.color,.48));
      ctx.fillStyle=grad;ctx.beginPath();ctx.arc(0,0,rx,0,TAU);ctx.fill();ctx.strokeStyle='rgba(173,198,202,.23)';ctx.lineWidth=.55;ctx.beginPath();ctx.arc(0,0,rx,-Math.PI*.98,-Math.PI*.25);ctx.stroke();ctx.restore();
    }
    _drawCapsule(ctx,p,cylinder=false) {
      const radius=Math.max(.035,Math.min(p.w,p.d)/2),half=Math.max(0,p.h/2-(cylinder?0:radius)),a=rotated([0,-half,0],p.r),b=rotated([0,half,0],p.r);
      const q=this._projectWorld(p.x+a[0],p.y+a[1],p.z+a[2]),r=this._projectWorld(p.x+b[0],p.y+b[1],p.z+b[2]),dx=r.x-q.x,dy=r.y-q.y,len=Math.max(.01,Math.hypot(dx,dy)),width=Math.max(.8,Math.max(p.w,p.d)*this.ppu),nx=-dy/len,ny=dx/len,mx=(q.x+r.x)/2,my=(q.y+r.y)/2;
      if(mx+width+len<0||mx-width-len>this.w||my+width+len<0||my-width-len>this.h)return;
      const grad=ctx.createLinearGradient(mx-nx*width/2,my-ny*width/2,mx+nx*width/2,my+ny*width/2),base=this._readColor(p.color);
      grad.addColorStop(0,shade(p.color,.45));grad.addColorStop(.3,'rgb('+base.map((c,i)=>Math.min(255,Math.round(c*1.25+[11,17,20][i]))).join(',')+')');grad.addColorStop(.6,p.color);grad.addColorStop(1,shade(p.color,.5));
      ctx.save();ctx.lineWidth=width;ctx.lineCap=cylinder?'butt':'round';ctx.strokeStyle=grad;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(r.x,r.y+.001);ctx.stroke();
      if(cylinder){ctx.fillStyle=shade(p.color,1.35);ctx.beginPath();ctx.ellipse(r.x,r.y,width/2,Math.max(.7,width*.21),Math.atan2(dy,dx)+Math.PI/2,0,TAU);ctx.fill();}
      ctx.restore();
    }
    _worldCircle(ctx,x,h,z,r,color,width=1,dashed=false) { const points=[];for(let i=0;i<=60;i++){const a=i/60*TAU;points.push(this._projectWorld(x+Math.cos(a)*r,h,z+Math.sin(a)*r));}ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle=color;ctx.lineWidth=width;if(dashed)ctx.setLineDash([8,5]);ctx.stroke();ctx.setLineDash([]); }
    _drawEffects(ctx,now) {
      for(const e of this.effects){const t=(now-e.start)/e.duration;if(e.kind==='shot'){const a=this._projectWorld(e.a.x,e.a.h,e.a.z),b=this._projectWorld(e.b.x,e.b.h,e.b.z);ctx.save();ctx.globalAlpha=Math.max(0,1-t);ctx.strokeStyle=e.color;ctx.shadowColor=e.color;ctx.shadowBlur=8;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.beginPath();ctx.arc(b.x,b.y,3+t*9,0,TAU);ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle=e.color;ctx.font='700 12px system-ui,sans-serif';ctx.textAlign='center';ctx.fillText(e.label||'',b.x,b.y-12-t*12);ctx.restore();}else if(e.node)this._worldCircle(ctx,e.node.x+.5,this._height(e.node)+.08,e.node.y+.5,1+t*2,e.color,2);}
    }
    _drawWorldMarkers(ctx) {
      const markers=[{node:this.level.relay,text:this.state.hackProgress>=2?'LINKED':'RELAY',color:'#ffcf74',height:2.9},{node:this.level.medkit,text:this.state.medkitUsed?'USED':'MED',color:'#d6c9a5',height:.85}];
      if(this.level.evac)markers.push({node:this.level.evac,text:'EXTRACT',color:'#a9dbc4',height:.15});
      if(this.overlay.destination)markers.push({node:this.overlay.destination,text:`(${this.overlay.destination.x}, ${this.overlay.destination.y})`,color:'#ffe1a0',height:.45});
      ctx.font='600 10px system-ui,sans-serif';ctx.textAlign='center';
      for(const m of markers){if(!m.node)continue;const p=this.project({...m.node,height:m.height});if(!p.visible)continue;const width=ctx.measureText(m.text).width;ctx.fillStyle='rgba(14,35,39,.76)';ctx.fillRect(p.x-width/2-5,p.y-13,width+10,17);ctx.fillStyle=m.color;ctx.fillText(m.text,p.x,p.y-1);}
    }
    _renderGL(now) {
      const c=this.camera,pitch=this.view==='top'?Math.PI/2-.0001:c.pitch,distance=150;
      this.pcCamera.setPosition(c.x+Math.sin(c.yaw)*Math.cos(pitch)*distance,c.h+Math.sin(pitch)*distance,c.z+Math.cos(c.yaw)*Math.cos(pitch)*distance);this.pcCamera.lookAt(c.x,c.h,c.z);this.pcCamera.camera.orthoHeight=this.h/(2*this.ppu);
      if(!this._staticBatch)for(const p of this._parts){p.entity.enabled=this._near(p)&&!(p.gate&&this.state.gateOpen);}
      const alive=new Set();
      for(const unit of this.state.units||[]){if(!this._alive(unit))continue;alive.add(unit.id);const pos=this.positions.get(unit.id);if(!pos)continue;
        const parts=this._unitParts(unit,pos,this._time);let record=this._glUnits.get(unit.id);if(!record){record=new Map();this._glUnits.set(unit.id,record);}
        for(const p of parts){let e=record.get(p.id);if(!e){e=this._newPcPart(p);record.set(p.id,e);}e.enabled=Math.hypot(pos.x-c.x,pos.z-c.z)<c.span*1.5;this._setPcPart(e,p);}
      }
      for(const[id,record]of this._glUnits)if(!alive.has(id))for(const e of record.values())e.enabled=false;
      const line=(a,b,color)=>{const q=this._readColor(color);this.app.drawLine(new pc.Vec3(a.x,a.h,a.z),new pc.Vec3(b.x,b.h,b.z),new pc.Color(q[0]/255,q[1]/255,q[2]/255));};
      const tile=(n,color,inset=.03)=>{const h=this._overlayHeight(n),x=n.x+inset,z=n.y+inset,s=1-inset*2,p=[{x,h,z},{x:x+s,h,z},{x:x+s,h,z:z+s},{x,h,z:z+s}];for(let i=0;i<4;i++)line(p[i],p[(i+1)%4],color);};
      const bounds=this.level.bounds,minX=bounds.minX??bounds.min,minY=bounds.minY??bounds.min,maxX=(bounds.maxX??bounds.max)+1,maxY=(bounds.maxY??bounds.max)+1;
      const radius=Math.min(80,Math.ceil(c.span*1.5)),cx=Math.floor(c.x),cz=Math.floor(c.z),step=this.ppu<5?5:1;
      const gh=this.level.worldParts? .32:.1;
      const gridLine=(axis,n,start,end)=>{
        let runs=[[start,end]];
        for(const {p}of this._staticGeometry)if(p.water){const a=axis==='x'?p.x-p.w/2:p.z-p.d/2,b=axis==='x'?p.x+p.w/2:p.z+p.d/2;if(n<=a||n>=b)continue;const lo=axis==='x'?p.z-p.d/2:p.x-p.w/2,hi=axis==='x'?p.z+p.d/2:p.x+p.w/2;runs=runs.flatMap(([a,b])=>hi<=a||lo>=b?[[a,b]]:[...(lo>a?[[a,lo]]:[]),...(hi<b?[[hi,b]]:[])]);}
        for(const br of this.level.groundBridges||[]){const lo=axis==='x'?br.x:br.y,hi=axis==='x'?br.x+br.w:br.y+br.d;if(n>=lo&&n<=hi)runs.push([Math.max(start,axis==='x'?br.y:br.x),Math.min(end,axis==='x'?br.y+br.d:br.x+br.w)]);}
        const col=this.level.theme==='white-industrial'?(n%5===0?'#6c9aa3':'#a3b8bd'):(n%5===0?'#9bbcc7':'#7296a4');
        for(const [a,b]of runs)if(b>a)line(axis==='x'?{x:n,h:gh,z:a}:{x:a,h:gh,z:n},axis==='x'?{x:n,h:gh,z:b}:{x:b,h:gh,z:n},col);
      };
      for(let x=Math.ceil(Math.max(minX,cx-radius)/step)*step;x<=Math.min(maxX,cx+radius);x+=step)gridLine('x',x,Math.max(minY,cz-radius),Math.min(maxY,cz+radius));
      for(let z=Math.ceil(Math.max(minY,cz-radius)/step)*step;z<=Math.min(maxY,cz+radius);z+=step)gridLine('y',z,Math.max(minX,cx-radius),Math.min(maxX,cx+radius));
      if(this.ppu>5)for(const roof of[...(this.level.buildings||[]),...(this.level.bridges||[])])if(Math.hypot(roof.x+roof.w/2-c.x,roof.y+roof.d/2-c.z)<c.span*1.5+Math.max(roof.w,roof.d)){
        for(let x=Math.ceil(roof.x);x<=roof.x+roof.w;x++)line({x,h:roof.h+.1,z:roof.y},{x,h:roof.h+.1,z:roof.y+roof.d},x%5===0?'#b7cecc':'#899e9f');
        for(let z=Math.ceil(roof.y);z<=roof.y+roof.d;z++)line({x:roof.x,h:roof.h+.1,z},{x:roof.x+roof.w,h:roof.h+.1,z},z%5===0?'#b7cecc':'#899e9f');
      }
      for(const n of this.overlay.reachable||[])if(Math.hypot(n.x-c.x,n.y-c.z)<c.span*1.4)tile(n,'#69cdd0');
      for(const n of this.overlay.path||[])tile(n,'#e1b66a',.18);
      const route=this.overlay.path||[];for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i];line({x:a.x+.5,h:this._overlayHeight(a)+.04,z:a.y+.5},{x:b.x+.5,h:this._overlayHeight(b)+.04,z:b.y+.5},'#f4c778');}
      if(this.overlay.destination)tile(this.overlay.destination,'#ffe0a0');
      const s=(this.state.units||[]).find(u=>u.id===(this.overlay.selectedId||this.state.selectedId));if(s&&this._alive(s))tile(s,'#79f0ec',.01);
      const target=(this.state.units||[]).find(u=>u.id===this.overlay.targetId);if(target&&this._alive(target))tile(target,'#edaa8e',.015);
      const r=this.overlay.selectionBox;if(r){const h=(r.elevation||0)+.35,p=[{x:r.x,h,z:r.y},{x:r.x+r.w,h,z:r.y},{x:r.x+r.w,h,z:r.y+r.d},{x:r.x,h,z:r.y+r.d}];for(let i=0;i<4;i++)line(p[i],p[(i+1)%4],'#008d84');}
      for(const e of this.effects)if(e.kind==='shot')line(e.a,e.b,e.color);
      const evac=this.level.evac;if(evac)for(let i=0;i<48;i++){const a=i/48*TAU,b=(i+.7)/48*TAU;line({x:evac.x+.5+Math.cos(a)*evac.r,h:.05,z:evac.y+.5+Math.sin(a)*evac.r},{x:evac.x+.5+Math.cos(b)*evac.r,h:.05,z:evac.y+.5+Math.sin(b)*evac.r},'#9fd8ba');}
      if(this._labelCtx){this._labelCtx.setTransform(this.dpr,0,0,this.dpr,0,0);this._labelCtx.clearRect(0,0,this.w,this.h);this._drawGridLabels(this._labelCtx);this._drawWorldMarkers(this._labelCtx);}
      this.app.renderNextFrame=true;
    }
    destroy() { this._disposed=true;cancelAnimationFrame(this._raf);this._resizeObserver?.disconnect();this._unbindControls();for(const t of this.tweens)t.resolve();this.tweens.clear();try{this.app?.destroy();}catch(_){}this.positions.clear();this._mapLabels?.remove(); }
  }
  root.P3Renderer=P3Renderer;
})(typeof window!=='undefined'?window:globalThis);
