const TOOL_DEFINITIONS = Object.freeze([
  { name: 'camera.move', description: 'Move the viewer camera to a bounded public-map location.' },
  { name: 'layer.enable', description: 'Enable a registered layer the current user is entitled to view.' },
  { name: 'layer.disable', description: 'Disable a currently enabled layer.' },
  { name: 'place.search', description: 'Search for a public place through an approved geocoder.' },
  { name: 'entity.select', description: 'Select one already-visible or backend-returned entity.' },
  { name: 'intel.nearby', description: 'Query authorized nearby entities/events through the canonical McCluster API.' },
  { name: 'intel.timeline', description: 'Query authorized timeline data through the canonical McCluster API.' },
  { name: 'intel.history', description: 'Query an authorized entity history through the canonical McCluster API.' },
  { name: 'annotation.create', description: 'Create a local/user annotation without changing provider facts.' },
  { name: 'view.summarize', description: 'Summarize the currently loaded operating picture with provenance.' },
]);

export function listAgentTools() {
  return TOOL_DEFINITIONS.map((tool) => ({ ...tool }));
}

export function createAgentToolExecutor({ facade, audit = null } = {}) {
  if (!facade) throw new TypeError('facade is required');

  const handlers = Object.freeze({
    'camera.move': (args) => facade.moveCamera?.(args),
    'layer.enable': (args) => facade.enableLayer?.(args?.layer),
    'layer.disable': (args) => facade.disableLayer?.(args?.layer),
    'place.search': (args) => facade.searchPlace?.(args?.query),
    'entity.select': (args) => facade.selectEntity?.(args?.id),
    'intel.nearby': (args) => facade.nearby?.(args),
    'intel.timeline': (args) => facade.timeline?.(args),
    'intel.history': (args) => facade.entityHistory?.(args?.id, args?.query || {}),
    'annotation.create': (args) => facade.createAnnotation?.(args),
    'view.summarize': (args) => facade.summarizeView?.(args),
  });

  return async function executeAgentTool(name, args = {}, context = {}) {
    const handler = handlers[name];
    if (!handler) throw new Error(`Unsupported Hitman's Halo tool: ${name}`);
    const startedAt = new Date().toISOString();
    try {
      const result = await handler(args);
      await audit?.({ name, args, context, ok: true, started_at: startedAt, finished_at: new Date().toISOString() });
      return result;
    } catch (error) {
      await audit?.({
        name,
        args,
        context,
        ok: false,
        error: error?.message || String(error),
        started_at: startedAt,
        finished_at: new Date().toISOString(),
      });
      throw error;
    }
  };
}
