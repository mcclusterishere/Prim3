/* PRIM3 reference-derived articulated mannequin operators.
 * A small, deterministic geometry kit shared by the WebGL and software views.
 * No character photographs are placed in the world and no remote assets load.
 */
(function (root) {
  'use strict';
  const HALF_PI = Math.PI / 2;
  const C = Object.freeze({
    skin: '#151b1f', cloth: '#293135', clothDark: '#22282b',
    armor: '#20272b', webbing: '#384247', seam: '#515b60',
    rubber: '#1c2326', metal: '#58676c', lens: '#6c9299',
    screen: '#57968f', screenDark: '#172d32', detail: '#783f43'
  });

  function rotate(p, r) {
    let [x, y, z] = p;
    const cx = Math.cos(r[0]), sx = Math.sin(r[0]);
    const cy = Math.cos(r[1]), sy = Math.sin(r[1]);
    const cz = Math.cos(r[2]), sz = Math.sin(r[2]);
    [y, z] = [y * cx - z * sx, y * sx + z * cx];
    [x, z] = [x * cy + z * sy, -x * sy + z * cy];
    return [x * cz - y * sz, x * sz + y * cz, z];
  }

  // Compose the local part rotation with the articulated figure's facing/fall.
  // This uses the same X, then Y, then Z convention as render.js.
  function compose(local, yaw, fall) {
    const axis = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map(v => rotate(rotate(v, local), [fall, yaw, 0]));
    const y = Math.asin(Math.max(-1, Math.min(1, -axis[0][2])));
    const x = Math.atan2(axis[1][2], axis[2][2]);
    const z = Math.atan2(axis[0][1], axis[0][0]);
    return [x, y, z];
  }

  function build(unit, position, time) {
    const role = unit.role || 'H', enemy = unit.team === 'enemy';
    const walking = Math.max(0, Math.min(1, position.walk || 0));
    const stride = Math.sin((Number(time) || 0) * 12) * walking;
    const crouched = !!(unit.hunker || unit.hunkered);
    const yaw = position.yaw || 0, fall = (position.fall || 0) * 1.4;
    const bob = Math.abs(stride) * .026 - (crouched ? .16 : 0);
    const base = [position.x, position.h + bob, position.z];
    const parts = [];
    const shoulderWidth = role === 'E' ? .56 : role === 'T' ? .51 : .49;
    const armor = enemy ? '#343333' : C.armor;
    const shirt = role === 'R' ? '#30373a' : C.cloth;
    const chestDepth = role === 'E' ? .345 : .31;

    function add(id, x, y, z, w, h, d, color, shape = 'box', rotation = [0, 0, 0], material = 'cloth', extra = {}) {
      const v = rotate([x, y, z], [fall, yaw, 0]);
      parts.push({ id: `${unit.id}/${id}`, unit: unit.id,
        x: base[0] + v[0], y: base[1] + v[1], z: base[2] + v[2],
        w, h, d, color, shape, r: compose(rotation, yaw, fall), material,
        ...extra });
    }
    function beam(id, a, b, width, depth, color, shape = 'capsule', material = 'cloth') {
      const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
      const length = Math.hypot(dx, dy, dz);
      add(id, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2,
        width, length, depth, color, shape,
        [Math.acos(Math.max(-1, Math.min(1, dy / Math.max(length, 1e-8)))), Math.atan2(dx, dz), 0], material);
    }
    function offset(p, vector, angle) {
      const r = rotate(vector, [angle, 0, 0]);
      return p.map((n, i) => n + r[i]);
    }
    function onLimb(id, pivot, center, angle, size, color, shape = 'box', material = 'cloth') {
      const p = offset(pivot, center, angle);
      add(id, ...p, ...size, color, shape, [angle, 0, 0], material);
    }

    // Nested rounded volumes taper through ribs, waist and hips; the plate carrier
    // is deliberately flatter than the cloth underneath it.
    add('hips', 0, .855, .005, .40, .25, .285, C.clothDark, 'sphere');
    add('waist-shirt', 0, 1.01, 0, .405, .34, .285, shirt, 'sphere');
    add('upper-shirt', 0, 1.295, -.015, shoulderWidth - .045, .39, .305, shirt, 'sphere');
    add('carrier-core', 0, 1.255, .045, shoulderWidth - .075, .40, chestDepth, armor, 'box', [0, 0, 0], 'armor');
    add('carrier-rounded-top', 0, 1.41, .045, shoulderWidth - .07, .16, chestDepth, armor, 'sphere', [0, 0, 0], 'armor');
    add('carrier-lower-hem', 0, 1.055, .045, shoulderWidth - .035, .052, chestDepth + .018, C.webbing, 'box', [0, 0, 0], 'armor');
    add('raised-collar', 0, 1.486, -.005, .24, .125, .24, C.clothDark, 'cylinder');
    add('neck', 0, 1.545, .003, .145, .13, .145, C.skin, 'capsule', [0, 0, 0], 'mannequin');
    add('featureless-head', 0, 1.734, .02, .272, .344, .275, C.skin, 'sphere', [0, 0, 0], 'mannequin');
    add('blank-chest-patch', .045, 1.36, chestDepth / 2 + .052, .205, .064, .014, C.clothDark, 'box', [0, 0, 0], 'armor');
    add('center-shirt-seam', 0, .988, .153, .012, .115, .009, C.seam);
    for (const side of [-1, 1]) {
      add(`shoulder-webbing-${side}`, side * .17, 1.44, .02, .057, .052, .325, C.webbing, 'box', [.10, 0, side * .09], 'armor');
      add(`carrier-edge-${side}`, side * (shoulderWidth / 2 - .045), 1.25, chestDepth / 2 + .052,
        .011, .335, .008, C.seam);
    }

    // Belt and role-specific equipment establish the silhouette even when zoomed out.
    add('utility-belt', 0, .914, .005, .455, .075, .31, C.rubber, 'box', [0, 0, 0], 'armor');
    add('belt-buckle', 0, .914, .17, .086, .058, .025, C.metal, 'box', [0, 0, 0], 'metal');
    add('body-recorder', -.15, 1.385, chestDepth / 2 + .077, .075, .105, .047, C.rubber, 'box', [0, 0, -.07], 'armor');
    add('recorder-lens', -.15, 1.411, chestDepth / 2 + .108, .032, .014, .032, C.lens, 'cylinder', [HALF_PI, 0, 0], 'metal');
    add('recorder-led', -.151, 1.362, chestDepth / 2 + .106, .012, .013, .008, '#b36058', 'box', [0, 0, 0], 'screen');
    add('radio', -.255, 1.01, -.025, .105, .16, .075, C.rubber, 'box', [0, 0, 0], 'armor');
    add('radio-aerial', -.25, 1.205, -.03, .018, .245, .018, C.metal, 'cylinder', [0, 0, .04], 'metal');
    add('holstered-sidearm', .265, .795, -.005, .13, .285, .13, C.rubber, 'box', [0, 0, .04], 'armor');

    for (const side of [-1, 1]) {
      const name = side < 0 ? 'left' : 'right';
      const legPitch = side * stride * .43 - (crouched ? .38 : .02);
      const kneePitch = legPitch + Math.max(0, -side * stride) * .65 + (crouched ? .73 : .04);
      const hip = [side * .118, .846, .005];
      const knee = offset(hip, [0, -.405, 0], legPitch);
      const ankle = offset(knee, [0, -.326, .006], kneePitch);
      beam(`${name}-thigh`, hip, knee, .19, .225, C.clothDark);
      add(`${name}-knee-joint`, ...knee, .173, .16, .195, shirt, 'sphere');
      beam(`${name}-calf`, knee, ankle, .155, .185, C.clothDark);
      onLimb(`${name}-thigh-pocket`, hip, [side * .075, -.185, .048], legPitch,
        [.09, .19, .18], shirt, 'box', 'cloth');
      onLimb(`${name}-pocket-flap`, hip, [side * .081, -.105, .055], legPitch,
        [.094, .034, .188], C.webbing);
      onLimb(`${name}-trouser-crease`, knee, [0, -.245, .09], kneePitch,
        [.12, .027, .016], C.seam, 'capsule');
      // The rounded toe and inset sole keep the boot human in every camera angle.
      onLimb(`${name}-boot-upper`, ankle, [0, .015, .045], kneePitch,
        [.18, .20, .24], C.rubber, 'capsule', 'armor');
      onLimb(`${name}-boot-toe`, ankle, [0, -.045, .115], kneePitch,
        [.195, .125, .30], C.rubber, 'sphere', 'armor');
      onLimb(`${name}-boot-sole`, ankle, [0, -.098, .095], kneePitch,
        [.204, .034, .33], '#161d21', 'box', 'armor');
      onLimb(`${name}-boot-laces`, ankle, [0, .045, .145], kneePitch,
        [.085, .054, .02], C.webbing);
      if (role === 'E') {
        onLimb(`${name}-kneepad`, knee, [0, .006, .115], kneePitch,
          [.181, .20, .067], armor, 'sphere', 'armor');
      }

      const holdsDeck = role === 'T' && side === 1;
      const shoulder = [side * (shoulderWidth / 2 + .025), 1.428, .005];
      const armPitch = holdsDeck ? -.16 + stride * .045 : -side * stride * .36 - .05;
      const elbow = offset(shoulder, [side * .018, -.295, 0], armPitch);
      const forearmPitch = holdsDeck ? -1.31 + stride * .035 : armPitch - .16;
      const wrist = offset(elbow, [0, -.262, .004], forearmPitch);
      add(`${name}-shoulder`, ...shoulder, .205, .205, .235, shirt, 'sphere');
      if (role === 'T') {
        const sleeveEnd = offset(shoulder, [side * .009, -.15, 0], armPitch);
        beam(`${name}-short-sleeve`, shoulder, sleeveEnd, .196, .22, shirt);
        beam(`${name}-black-upper-arm`, sleeveEnd, elbow, .142, .17, C.skin, 'capsule', 'mannequin');
      } else beam(`${name}-sleeve-upper`, shoulder, elbow, .183, .205, shirt);
      add(`${name}-elbow`, ...elbow, .155, .14, .16, role === 'T' ? C.skin : C.clothDark, 'sphere', [0, 0, 0], role === 'T' ? 'mannequin' : 'cloth');
      beam(`${name}-forearm`, elbow, wrist, .135, .16, role === 'T' ? C.skin : shirt, 'capsule', role === 'T' ? 'mannequin' : 'cloth');
      const hand = offset(wrist, [0, -.063, .015], forearmPitch);
      add(`${name}-gloved-hand`, ...hand, .12, .165, .115, C.skin, 'sphere', [forearmPitch, 0, 0], 'mannequin');
      onLimb(`${name}-glove-cuff`, wrist, [0, .015, 0], forearmPitch,
        [.145, .059, .168], C.webbing, 'box', 'armor');
    }

    if (role === 'T') {
      // Short sleeves, one supporting hand and the hinged cyberdeck are canonical T cues.
      add('technical-earpiece', -.144, 1.72, -.012, .039, .09, .065, C.rubber, 'sphere', [0, 0, 0], 'armor');
      add('tool-pouch', -.16, .79, .20, .17, .25, .095, C.rubber, 'box', [0, 0, 0], 'armor');
      add('interface-tool', -.16, .80, .255, .034, .16, .021, C.metal, 'box', [0, 0, 0], 'metal');
      add('storage-pouch', .11, .79, .21, .14, .24, .09, C.rubber, 'box', [0, 0, 0], 'armor');
      add('deck-base', .055, 1.035, .355, .565, .055, .335, C.rubber, 'box', [0, 0, 0], 'armor');
      add('deck-keyboard', .055, 1.066, .37, .48, .011, .24, C.metal, 'box', [0, 0, 0], 'metal');
      for (let row = 0; row < 3; row++) add(`keyboard-row-${row}`, .055, 1.074, .294 + row * .057, .435, .013, .028, C.clothDark);
      add('deck-trackpad', .055, 1.078, .46, .15, .008, .06, C.webbing);
      add('deck-screen-case', .055, 1.225, .194, .565, .335, .039, C.rubber, 'box', [-.16, 0, 0], 'armor');
      add('deck-screen', .055, 1.228, .218, .48, .259, .012, C.screenDark, 'box', [-.16, 0, 0], 'screen');
      add('deck-screen-trace', .03, 1.235, .231, .30, .019, .009, C.screen, 'box', [-.16, 0, 0], 'screen', { emissive: true });
      add('deck-screen-status', -.09, 1.305, .22, .098, .015, .009, C.screen, 'box', [-.16, 0, 0], 'screen', { emissive: true });
      add('deck-sling', .23, 1.259, .19, .037, .40, .025, C.webbing, 'box', [0, 0, -.17], 'armor');
    } else {
      // A low-profile comms band follows the head without adding a helmet or face.
      for (const side of [-1, 1]) {
        add(`headset-cup-${side}`, side * .15, 1.739, -.005, .054, .12, .09, C.rubber, 'sphere', [0, 0, 0], 'armor');
      }
      beam('headset-band-left', [-.147, 1.76, -.015], [-.11, 1.89, -.005], .026, .026, C.metal, 'capsule', 'metal');
      beam('headset-band-top', [-.11, 1.89, -.005], [.11, 1.89, -.005], .025, .025, C.metal, 'capsule', 'metal');
      beam('headset-band-right', [.11, 1.89, -.005], [.147, 1.76, -.015], .026, .026, C.metal, 'capsule', 'metal');
      beam('comms-boom', [-.148, 1.71, .028], [-.07, 1.61, .15], .018, .018, C.metal, 'capsule', 'metal');
      add('comms-mic', -.055, 1.608, .153, .048, .03, .027, C.rubber, 'sphere', [0, 0, 0], 'armor');
      if (role === 'R') {
        add('binocular-pouch', 0, 1.16, .235, .245, .23, .13, C.rubber, 'box', [0, 0, 0], 'armor');
        for (const side of [-1, 1]) {
          add(`binocular-tube-${side}`, side * .068, 1.295, .255, .092, .16, .092, C.rubber, 'cylinder', [0, 0, 0], 'armor');
          add(`binocular-rim-${side}`, side * .068, 1.382, .255, .103, .027, .103, C.metal, 'cylinder', [0, 0, 0], 'metal');
        }
        add('optic-pouch-flap', 0, 1.16, .311, .035, .21, .017, C.webbing);
        add('rifle-stock', .378, 1.07, -.02, .108, .37, .19, C.rubber, 'box', [0, 0, .07], 'armor');
        add('rifle-receiver', .378, .80, .01, .087, .30, .09, C.metal, 'box', [0, 0, .07], 'metal');
        add('rifle-long-barrel', .414, .405, .01, .034, .57, .034, C.metal, 'cylinder', [0, 0, .07], 'metal');
        add('rifle-scope', .38, .85, .10, .075, .31, .075, C.rubber, 'cylinder', [0, 0, .07], 'armor');
        add('rifle-scope-lens', .369, 1.014, .10, .076, .017, .076, C.lens, 'cylinder', [0, 0, .07], 'metal');
        add('rifle-sling', .29, 1.24, -.08, .035, .53, .023, C.webbing, 'box', [0, 0, -.14], 'armor');
      } else {
        add('medical-pouch', .16, .855, .216, .19, .15, .13, C.rubber, 'box', [0, 0, 0], 'armor');
        add('medical-id', .16, .87, .286, .08, .037, .012, '#a5aba9');
        add('access-pouch', -.16, .855, .216, .19, .15, .13, C.rubber, 'box', [0, 0, 0], 'armor');
        add('entry-tool', -.32, .68, -.115, .048, .51, .055, C.metal, 'box', [0, 0, -.035], 'metal');
        add('entry-tool-head', -.33, .94, -.115, .16, .045, .061, C.metal, 'box', [0, 0, 0], 'metal');
        add('carbine-stock', .366, 1.16, -.04, .10, .22, .16, C.rubber, 'box', [0, 0, .06], 'armor');
        add('carbine-receiver', .38, .94, -.02, .091, .26, .12, C.metal, 'box', [0, 0, .06], 'metal');
        add('carbine-handguard', .397, .75, -.02, .096, .19, .106, C.rubber, 'box', [0, 0, .06], 'armor');
        add('carbine-barrel', .409, .60, -.02, .032, .20, .032, C.metal, 'cylinder', [0, 0, .06], 'metal');
        add('carbine-magazine', .38, .94, .092, .08, .14, .115, C.rubber, 'box', [0, 0, .06], 'armor');
        add('carbine-sling', .26, 1.28, -.08, .035, .41, .024, C.webbing, 'box', [0, 0, -.20], 'armor');
      }
    }
    if (enemy) add('muted-threat-identifier', -.31, 1.36, .09, .12, .055, .016, '#9a5347', 'box', [0, 0, 0], 'cloth');
    return parts;
  }
  root.P3Operators = Object.freeze({ build });
  if (typeof module !== 'undefined' && module.exports) module.exports = root.P3Operators;
})(typeof window !== 'undefined' ? window : globalThis);
