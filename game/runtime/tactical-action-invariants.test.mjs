import test from 'node:test';
import assert from 'node:assert/strict';
import * as R from './tactical-resolver.mjs';
import {runThreatPhase, threatKnowledge} from './tactical-threat-ai.mjs';
import {knownEnemyIds, playerProjection, legalCandidates} from './tactical-hints.mjs';

const at = (s, id) => s.units.find(u => u.id === id);
const patch = (s, id, values) => ({...s, units:s.units.map(u => u.id === id ? {...u,...values} : u)});
function start() {
  return R.beginPlayerPhase(R.createState({width:12,height:12,seed:5,extractionRequired:true,
    battlefield:{extractionZone:{x:1,y:1,r:0}},
    units:[
      {id:'T',role:'T',faction:'PLAYER',x:1,y:1,ammo:2,magazineSize:4,reserveAmmo:8,weapons:{main:{ammo:2},sidearm:{ammo:3}}},
      {id:'R',role:'R',faction:'PLAYER',x:1,y:3},
      {id:'D',role:'E',faction:'PLAYER',x:1,y:2,downed:true},
      {id:'H',role:'T',faction:'THREAT',x:4,y:1,aim:90,detectionRadius:8}],
    nodes:[{id:'N',state:'OBSERVED'}],
    technicalTruth:{nodes:{N:{actions:{OBSERVED:{LINK:{next:'VERIFIED',apCost:1}}}}}},
    machines:[{id:'C',kind:'CAMERA',x:2,y:1},{id:'DOOR',kind:'DOOR',x:2,y:2,open:true}]
  }));
}
const actions = [
  ['move',s=>R.moveUnit(s,'T',{x:2,y:1})],
  ['fire',s=>R.fireWeapon(s,'T','H',0,99)],
  ['watch',s=>R.enterOverwatch(s,'T')], ['hunker',s=>R.hunkerDown(s,'T')],
  ['reload',s=>R.reload(s,'T')], ['stabilize',s=>R.stabilize(s,'T','D')],
  ['technical',s=>R.technicalAction(s,'T','N','LINK')],
  ['switch',s=>R.switchWeapon(s,'T')], ['extract',s=>R.extractUnit(s,'T')],
  ['jam',s=>R.jamMachine(s,'T','C')], ['control',s=>R.takeControl(s,'T','C')],
  ['door',s=>R.operateDoor(s,'T','DOOR',false)], ['pulse',s=>R.syncPulse(s,'T',{x:2,y:1})]
];

test('all explicit actor actions reject wrong phases and inactive actors without mutation', () => {
  for (const phase of ['BRIEF','THREAT','CLOCK_STATE']) for(const [name,act] of actions) {
    const s={...start(),phase}, before=structuredClone(s);
    assert.throws(()=>act(s),/INVALID_PHASE/,`${name} in ${phase}`);assert.deepEqual(s,before);
  }
  for(const change of [{dead:true},{downed:true},{statuses:['EXTRACTED']}]) for(const [name,act] of actions) {
    const s=patch(start(),'T',change),before=structuredClone(s);
    assert.throws(()=>act(s),/INVALID_UNIT_STATE/,name);assert.deepEqual(s,before);
  }
});

test('recon marking and hostile re-take use the same actor guard and retain faction checks', () => {
  const s=start();
  for(const change of [{dead:true},{downed:true},{statuses:['EXTRACTED']}]) {
    assert.throws(()=>R.markMachine(patch(s,'R',change),'R','C'),/INVALID_UNIT_STATE/);
    assert.throws(()=>R.retakeMachine(patch(R.beginThreatPhase(s),'H',change),'H','C'),/INVALID_UNIT_STATE/);
  }
  assert.throws(()=>R.markMachine({...s,phase:'THREAT'},'R','C'),/INVALID_PHASE/);
  assert.throws(()=>R.retakeMachine(s,'H','C'),/INVALID_PHASE/);
  assert.throws(()=>R.retakeMachine(s,'T','C'),/NOT_HOSTILE/);
  assert.throws(()=>R.fireWeapon(s,'H','T',0),/INVALID_PHASE/);
  assert.throws(()=>R.extractUnit(R.beginThreatPhase(s),'H'),/Only player/);
});

test('extracted roster members cannot be targeted, reactivated or block routes', () => {
  let s=R.extractUnit(R.enterOverwatch(start(),'T'),'T');
  assert.equal(at(s,'T').ap,0);assert.equal(at(s,'T').overwatch,false);
  assert.equal(R.shotPreview(s,'H','T').legal,false);
  assert.equal(R.beginPlayerPhase(s).units.find(u=>u.id==='T').ap,0);
  const t=R.beginThreatPhase(s);
  assert.equal(threatKnowledge(t).has('T'),false);
  assert.ok(!runThreatPhase(t,{rng:[0,99]}).decisions.some(d=>d.targetId==='T'));
  assert.equal(legalCandidates(playerProjection(s),'T').some(a=>a.action!=='HOLD'),false);
  // Put a standing squad member beside the evacuated tile; both path search and supplied routes allow it.
  s=patch(s,'R',{x:0,y:1});
  assert.equal(R.computeReach(s,'R',1).costAt(1,1,0),1);
  assert.equal(at(R.moveUnit(s,'R',{x:1,y:1}),'R').x,1);
  assert.equal(at(R.moveUnit(s,'R',{x:1,y:1},'MOVE',{path:[{x:1,y:1}]}),'R').x,1);
});

test('extracted units neither spot nor react, including stale saved overwatch flags', () => {
  let s=start();s=patch(s,'R',{x:11,y:11});s=patch(s,'D',{x:11,y:10});
  s=R.extractUnit(s,'T');s=patch(s,'T',{overwatch:true,ap:2});
  assert.equal(knownEnemyIds(s).has('H'),false);
  const t=R.beginThreatPhase(s);
  const moved=R.moveUnit(t,'H',{x:3,y:1},'MOVE',{rolls:[0,99]});
  assert.equal(moved.events.some(e=>e.type==='OVERWATCH_SHOT'),false);
  assert.equal(threatKnowledge(t).has('T'),false);
});

test('live overwatch still reacts out of turn and threat AI still fires in its phase', () => {
  let s=R.enterOverwatch(start(),'T');s=R.beginThreatPhase(s);
  const moved=R.moveUnit(s,'H',{x:3,y:1},'MOVE',{rolls:[99,99]});
  assert.ok(moved.events.some(e=>e.type==='OVERWATCH_SHOT'&&e.watcherId==='T'));
  assert.ok(runThreatPhase(s,{rng:[99,99]}).decisions.some(d=>d.action==='FIRE'));
});

test('stabilize refuses opposing or evacuated casualties', () => {
  let s=patch(start(),'H',{x:2,y:1,downed:true});
  assert.throws(()=>R.stabilize(s,'T','H'),/not stabilizable/);
  assert.throws(()=>R.stabilize(patch(s,'D',{statuses:['EXTRACTED']}),'T','D'),/not stabilizable/);
});

test('objective completion cannot turn an empty or dead squad into a victory', () => {
  for (const extractionRequired of [false,true]) {
    const empty=R.createState({units:[],extractionRequired});
    assert.equal(R.missionComplete(empty),false);
    const dead={...start(),units:start().units.map(u=>u.faction==='PLAYER'?{...u,dead:true}:u)};
    dead.nodes=[];dead.objectives=[];dead.mission.extractionRequired=extractionRequired;
    assert.equal(R.missionComplete(dead),false);
  }
  let s=R.createState({extractionRequired:true,units:[{id:'P',faction:'PLAYER',x:1,y:1}],nodes:[],objectives:[]});
  s=R.extractUnit(R.beginPlayerPhase(s),'P');
  assert.equal(R.missionComplete(s),true,'an evacuated survivor remains a valid successful outcome');
});
