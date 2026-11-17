export const HEARTH_MILESTONES = Object.freeze([1, 5, 10, 15, 20, 25, 30, 35, 40]);
const DEFAULT_WIDTHS = Object.freeze([5.5, 6, 6.4, 6.8, 7.2, 7.6, 8, 8.5, 9]);
const vector = (value, fallback) => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite) ? [...value] : [...fallback];

// Loading is injected so level selection and races can be checked without WebGL.
export function createHearthModelManager({load, prepare = asset => asset, apply, dispose, onChange = () => {}, baseURL, initialLevel = 1}) {
  let logicalLevel = Math.max(1, Math.floor(Number(initialLevel) || 1));
  let manifest = new Map();
  let current = null;
  let wanted = null;
  let latestError = null;
  let destroyed = false;
  const failed = new Set();
  const inFlight = new Map();
  let lastNotification = '';

  function getState() {
    const requestedLevel = HEARTH_MILESTONES.filter(level => level <= logicalLevel).at(-1) || 1;
    return {
      logicalLevel,
      requestedLevel,
      loadedLevel: current?.entry.level || null,
      loadingLevel: wanted && current?.entry.key !== wanted.key && inFlight.has(wanted.key) ? wanted.level : null,
      modelReady: Boolean(current),
      error: latestError,
      effect: current?.entry.effect || null,
      visual: current ? {width:current.entry.width,rotation:[...current.entry.rotation],fireAnchor:[...current.entry.fireAnchor],fireScale:current.entry.fireScale} : null
    };
  }

  function notify() {
    const state = getState();
    const signature = JSON.stringify(state);
    if (signature === lastNotification || destroyed) return;
    lastNotification = signature;
    onChange(state);
  }

  function select() {
    return [...manifest.values()]
      .filter(entry => entry.level <= logicalLevel && !failed.has(entry.key))
      .sort((a, b) => b.level - a.level)[0] || null;
  }

  function safelyDispose(asset) {
    if (asset) {
      try { dispose(asset); } catch (error) { console.warn('Eski Ocak modeli temizlenemedi.', error); }
    }
  }

  function reconcile() {
    if (destroyed) return;
    wanted = select();
    if (!wanted || current?.entry.key === wanted.key) {
      notify();
      return;
    }
    if (inFlight.has(wanted.key)) {
      notify();
      return;
    }
    const requested = wanted;
    // Defer invocation to capture synchronous loader errors in the same path.
    const task = Promise.resolve().then(() => load(requested.url));
    inFlight.set(requested.key, task);
    notify();
    task.then(rawAsset => {
      inFlight.delete(requested.key);
      if (destroyed || wanted?.key !== requested.key) {
        safelyDispose(rawAsset);
        if (!destroyed) reconcile();
        return;
      }
      let nextAsset;
      try {
        // The latest manifest may have changed metadata while this URL loaded.
        const entry = wanted;
        nextAsset = prepare(rawAsset, entry);
        const previous = current;
        apply(nextAsset, previous?.asset || null);
        current = {entry, asset: nextAsset};
        latestError = null;
        safelyDispose(previous?.asset);
      } catch (error) {
        safelyDispose(nextAsset || rawAsset);
        failed.add(requested.key);
        latestError = {level: requested.level, message: String(error?.message || error)};
      }
      reconcile();
    }, error => {
      inFlight.delete(requested.key);
      if (destroyed) return;
      failed.add(requested.key);
      // An obsolete failed request must not overwrite the current UI's status.
      if (wanted?.key === requested.key) latestError = {level: requested.level, message: String(error?.message || error)};
      reconcile();
    });
  }

  function setManifest(data) {
    const next = new Map();
    for (const level of HEARTH_MILESTONES) {
      const raw = data?.models?.[String(level)];
      // Old string manifests remain readable; new entries are explicit about readiness.
      const value = typeof raw === 'string' ? {status: 'ready', url: raw} : raw;
      if (value?.status !== 'ready' || typeof value.url !== 'string' || !value.url.trim()) continue;
      const url = new URL(value.url, baseURL);
      if (value.version) url.searchParams.set('assetVersion', String(value.version));
      const width = Number(value.width ?? value.size);
      const rawYaw = Number(value.rotationY);
      const yaw = Number.isFinite(rawYaw) ? rawYaw : 0;
      const fireScale = Number(value.fireScale);
      const entry = {
        level,
        url: url.href,
        key: '',
        width: Number.isFinite(width) && width > 0 ? width : DEFAULT_WIDTHS[HEARTH_MILESTONES.indexOf(level)],
        rotation: vector(value.rotation, [0, yaw, 0]),
        fireAnchor: vector(value.fireAnchor, [0, .72, .2]),
        fireScale: Number.isFinite(fireScale) && fireScale > 0 ? fireScale : 1,
        effect: value.effect || null
      };
      // Metadata changes need a fresh normalized asset while the previous one stays visible.
      entry.key = `${level}:${url.href}:${JSON.stringify([entry.width, entry.rotation, entry.fireAnchor, entry.fireScale, entry.effect])}`;
      next.set(level, entry);
    }
    manifest = next;
    // Retry failed URLs only after an explicit manifest refresh, never every tick.
    failed.clear();
    latestError = null;
    reconcile();
  }

  return {
    setManifest,
    setLevel(value) {
      logicalLevel = Math.max(1, Math.floor(Number(value) || 1));
      reconcile();
    },
    getState,
    destroy() {
      destroyed = true;
      wanted = null;
      safelyDispose(current?.asset);
      current = null;
      // Outstanding GLTF responses dispose themselves when their promises resolve.
    }
  };
}
