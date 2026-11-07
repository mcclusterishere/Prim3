/* PRIM3 runtime surface library. Deterministic, seamless material maps made in
 * the browser: no image downloads, baked scene screenshots, or external assets.
 * Diffuse / tangent normal / roughness maps share the same surface relief. */
(function (root) {
  'use strict';
  const SIZE = 512, cache = new Map(), clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const palettes = {
    asphalt: { base: [55, 65, 72], grain: 19, broad: 18, rough: .48, relief: .35 },
    concrete: { base: [185, 187, 178], grain: 17, broad: 21, rough: .79, relief: .22 },
    paver: { base: [133, 145, 148], grain: 14, broad: 18, rough: .61, relief: .23 },
    steel: { base: [126, 138, 144], grain: 8, broad: 9, rough: .32, relief: .04 },
    water: { base: [28, 82, 91], grain: 3, broad: 18, rough: .18, relief: .55 },
    fabric: { base: [54, 61, 65], grain: 9, broad: 11, rough: .91, relief: .06 }
  };
  const seeds = { asphalt: 91237, concrete: 74183, paver: 63119, steel: 42013, water: 81241, fabric: 59333 };
  function rand(seed) {
    let s = seed >>> 0;
    return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  }
  function field(n, random) {
    const data = new Float32Array(n * n);
    for (let i = 0; i < data.length; i++) data[i] = random();
    return (u, v) => {
      const x = u * n, y = v * n, ix = Math.floor(x), iy = Math.floor(y);
      let fx = x - ix, fy = y - iy; fx *= fx * (3 - 2 * fx); fy *= fy * (3 - 2 * fy);
      const x0 = ((ix % n) + n) % n, x1 = (x0 + 1) % n, y0 = ((iy % n) + n) % n, y1 = (y0 + 1) % n;
      const a = data[y0 * n + x0] * (1 - fx) + data[y0 * n + x1] * fx;
      const b = data[y1 * n + x0] * (1 - fx) + data[y1 * n + x1] * fx;
      return a * (1 - fy) + b * fy;
    };
  }
  function canvas(size = SIZE) {
    const c = root.document.createElement('canvas'); c.width = c.height = size; return c;
  }
  function make(kind, variant) {
    kind = palettes[kind] ? kind : 'concrete';
    const key = kind + ':' + variant;
    if (cache.has(key)) return cache.get(key);
    const random = rand(seeds[kind] + (variant | 0) * 9137), p = palettes[kind], c = canvas(), ctx = c.getContext('2d');
    const pixels = ctx.createImageData(SIZE, SIZE), height = new Float32Array(SIZE * SIZE), rough = new Uint8Array(SIZE * SIZE);
    const broad = field(4, random), mid = field(16, random), fine = field(64, random), wet = field(3, random);
    const rowNoise = Array.from({length: SIZE}, () => random() - .5);
    for (let y = 0; y < SIZE; y++) {
      const v = y / SIZE;
      for (let x = 0; x < SIZE; x++) {
        const u = x / SIZE, i = y * SIZE + x, o = i * 4;
        const a = broad(u, v) - .5, b = mid(u, v) - .5, f = fine(u, v) - .5, g = random() - .5;
        let variation = a * p.broad + b * 9 + f * 8 + g * p.grain;
        let dark = 1, highlight = 0, h = .5 + a * .16 + b * .1 + f * .2 + g * p.relief;
        let r = p.rough;
        if (kind === 'asphalt') {
          // Soft, irregular shallow damp patches; their relief and roughness agree.
          const patch = clamp((wet(u, v) - .51) * 10, 0, 1);
          dark -= patch * .24; r -= patch * .30; h = h * (1 - patch * .5) + .34 * patch * .5;
          if (g > .42) highlight += (g - .42) * 95;
          if (g < -.46) variation -= 11;
        } else if (kind === 'concrete') {
          // Aggregate, casting clouding and occasional fine pores.
          if (g < -.485) { variation -= 31; h -= .13; }
          if (g > .475) variation += 10;
          variation += Math.sin(u * Math.PI * 8) * 1.7;
        } else if (kind === 'paver') {
          const jointX = Math.min(x % 128, 128 - x % 128), jointY = Math.min(y % 128, 128 - y % 128);
          if (jointX < 2 || jointY < 2) { dark = .62; h = .2; r = .76; }
          else if (jointX < 4 || jointY < 4) { highlight += 6; h += .04; }
          const patch = clamp((wet(u, v) - .53) * 9, 0, 1); dark -= patch * .13; r -= patch * .18;
        } else if (kind === 'steel') {
          variation = rowNoise[y] * 17 + g * 4 + b * 6 + a * 8;
          highlight = Math.pow((Math.sin(u * Math.PI * 2) + 1) * .5, 2) * 8;
          h = .5 + rowNoise[y] * .045 + g * .009;
        } else if (kind === 'water') {
          const wave = Math.sin(u * Math.PI * 18 + Math.sin(v * Math.PI * 6) * .9);
          const wave2 = Math.sin(v * Math.PI * 28 + Math.sin(u * Math.PI * 4));
          variation = a * 17 + b * 9 + wave * 3 + wave2 * 2;
          highlight = Math.pow(Math.max(0, wave * .64 + wave2 * .36), 8) * 19;
          h = .5 + wave * .19 + wave2 * .09 + b * .07;
          r = .17 + b * .04;
        } else if (kind === 'fabric') {
          const weft = ((x % 4 < 2) === (y % 4 < 2)) ? 3.5 : -3.5;
          variation = a * 11 + b * 5 + weft + g * 6;
          h = .5 + weft * .013 + g * .02;
        }
        for (let ch = 0; ch < 3; ch++) pixels.data[o + ch] = clamp(p.base[ch] * dark + variation + highlight, 0, 255);
        pixels.data[o + 3] = 255; height[i] = clamp(h, 0, 1); rough[i] = clamp(r * 255 + g * 11, 4, 253);
      }
    }
    ctx.putImageData(pixels, 0, 0);
    const out = { texture: c, height, rough, kind, normal: null, roughness: null }; cache.set(key, out); return out;
  }
  function normal(kind, variant = 0) {
    const m = make(kind, variant); if (m.normal) return m.normal;
    const c = canvas(), ctx = c.getContext('2d'), image = ctx.createImageData(SIZE, SIZE), h = m.height;
    const scale = kind === 'water' ? 2.3 : kind === 'steel' ? 1.6 : 2.6;
    for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
      const dx = (h[y * SIZE + (x + 1) % SIZE] - h[y * SIZE + (x + SIZE - 1) % SIZE]) * scale;
      const dy = (h[((y + 1) % SIZE) * SIZE + x] - h[((y + SIZE - 1) % SIZE) * SIZE + x]) * scale;
      const inv = 1 / Math.hypot(dx, dy, 1), i = (y * SIZE + x) * 4;
      image.data[i] = (dx * inv * .5 + .5) * 255;
      image.data[i + 1] = (-dy * inv * .5 + .5) * 255;
      image.data[i + 2] = (inv * .5 + .5) * 255; image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0); m.normal = c; return c;
  }
  function roughness(kind, variant = 0) {
    const m = make(kind, variant); if (m.roughness) return m.roughness;
    const c = canvas(), ctx = c.getContext('2d'), image = ctx.createImageData(SIZE, SIZE);
    for (let i = 0; i < m.rough.length; i++) { image.data[i * 4] = image.data[i * 4 + 1] = image.data[i * 4 + 2] = m.rough[i]; image.data[i * 4 + 3] = 255; }
    ctx.putImageData(image, 0, 0); m.roughness = c; return c;
  }
  const api = Object.freeze({texture: (kind, variant = 0) => make(kind, variant).texture, normal, roughness, size: SIZE, kinds: Object.keys(palettes)});
  root.P3Surfaces = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
