export const HITMANS_HALO_BRAND = Object.freeze({
  product: "Hitman's Halo",
  system: 'Seek First Superset',
  shortMark: 'HH',
  tagline: 'SEE THE SYSTEM. EARN THE PICTURE.',
  backend: 'McCluster Control Plane',
});

export function initHitmansHaloBrand(doc = globalThis?.document) {
  if (!doc) return HITMANS_HALO_BRAND;
  doc.documentElement.dataset.product = 'hitmans-halo';
  doc.body?.classList.add('hitmans-halo');
  doc.title = `${HITMANS_HALO_BRAND.product} — ${HITMANS_HALO_BRAND.system}`;

  const title = doc.querySelector('#title-bar h1');
  if (title) title.setAttribute('aria-label', `${HITMANS_HALO_BRAND.product} — ${HITMANS_HALO_BRAND.system}`);

  const subtitle = doc.querySelector('#title-bar .subtitle');
  if (subtitle) subtitle.textContent = HITMANS_HALO_BRAND.tagline;

  return HITMANS_HALO_BRAND;
}
