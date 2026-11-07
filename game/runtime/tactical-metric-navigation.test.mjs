import test from 'node:test';
import assert from 'node:assert/strict';
import * as R from './tactical-resolver.mjs';
import { playerProjection } from './tactical-hints.mjs';
import { runThreatPhase } from './tactical-threat-ai.mjs';
function start(extra={}) {
  const nav={schema:'prim3.metric-navigation/v1',regionId:'fixture',revision:1,frameId:'fixture',floorId:'street',topology:'hex',radiusM:.43,sightPolicy:'opaque-footprints',occluders:[],
    nodes:[0,2.5,5,7.5].map((x,i)=>({id:`n${i}`,position:{x,y:0,z:0},edges:i<3?[{to:i+1,cost:2.5}]:[]}))};
  return R.beginPlayerPhase(R.createState({width:4,height:1,floors:1,metricNavigation:nav,units:[{id:'P',faction:'PLAYER',x:0,y:0,moveRange:3,detectionRadius:1}],...extra}));
}
test('directed fractional graph costs own reach/path validation and AP',()=>{
  const s=start(),before=structuredClone(s),reach=R.computeReach(s,'P',5);
  assert.equal(reach.costAt(2,0),5);assert.equal(reach.costAt(3,0),undefined);
  assert.throws(()=>R.moveUnit(s,'P',{x:2,y:0},'MOVE'),/path|range/i);
  const next=R.moveUnit(s,'P',{x:2,y:0},'DASH');assert.equal(next.units[0].ap,0);assert.equal(next.units[0].x,2);
  assert.throws(()=>R.moveUnit(s,'P',{x:2,y:0},'DASH',{path:[{x:2,y:0}]}),/directed metric/);
  assert.equal(R.findPath({...s,units:[{...s.units[0],x:2}]},'P',{x:0,y:0}),null);
  assert.deepEqual(s,before);
});
test('canonical phase/liveness gates remain active',()=>{
  const s=start();assert.throws(()=>R.moveUnit({...s,phase:'THREAT'},'P',{x:1,y:0}),/INVALID_PHASE/);
  for(const change of [{dead:true},{downed:true},{statuses:['EXTRACTED']}])assert.throws(()=>R.moveUnit({...s,units:[{...s.units[0],...change}]},'P',{x:1,y:0}),/INVALID_UNIT_STATE/);
});
test('hidden contact interrupts selected path and spends AP without leaking into projection',()=>{
  const s=start({units:[{id:'P',faction:'PLAYER',x:0,y:0,moveRange:8,detectionRadius:1},{id:'H',faction:'THREAT',x:2,y:0}]});
  const p=playerProjection(s);assert.equal(p.units.length,1);assert.ok(p.metricNavigation);
  const next=R.moveUnit(s,'P',{x:3,y:0},'MOVE',{path:[1,2,3].map(x=>({x,y:0}))});
  assert.equal(next.units[0].x,1);assert.equal(next.units[0].ap,1);assert.equal(next.events.at(-1).type,'MOVE_INTERRUPTED');
  assert.equal(R.computeReach(s,'P',8).costAt(2,0),undefined);
});
test('opaque footprint LOS uses metric coordinates; grazing and same-node interiors block',()=>{
  const s=start(),p=s.units[0],t={x:3,y:0,z:0};assert.equal(R.gridDistance(p,t,s),7.5);assert.equal(R.hasLineOfSight(s,p,t),true);
  const blocked={...s,metricNavigation:{...s.metricNavigation,occluders:[[{x:3,z:-1},{x:4,z:-1},{x:4,z:1},{x:3,z:1}]]}};
  assert.equal(R.hasLineOfSight(blocked,p,t),false);
});
test('canonical shots, threat AI and reaction damage work with metric ranges',()=>{
  const s=start({units:[{id:'P',faction:'PLAYER',x:0,y:0,moveRange:3,hp:10},{id:'H',faction:'THREAT',x:3,y:0,aim:95,detectionRadius:20,weaponRange:20}]});
  assert.equal(R.shotPreview(s,'P','H').distance,7.5);
  const ai=runThreatPhase(R.beginThreatPhase(s),{rng:[0,99,0,99]});assert.ok(ai.events.some(e=>e.type==='FIRE'));
  const watch={...s,units:s.units.map(u=>u.id==='H'?{...u,overwatch:true}:u)};
  const moved=R.moveUnit(watch,'P',{x:1,y:0},'MOVE',{rolls:[0,99]});assert.ok(moved.events.some(e=>e.type==='OVERWATCH_SHOT'));
});
test('malformed metric graph and unsupported mixed board fail closed',()=>{
  const s=start();assert.throws(()=>start({metricNavigation:{...s.metricNavigation,nodes:s.metricNavigation.nodes.map((n,i)=>i? n:{...n,edges:[{to:1,cost:1}]})}}),/metric edge/);
  assert.throws(()=>start({cover:[{x:0,y:0,sides:['N']}]}),/one street/);
});
