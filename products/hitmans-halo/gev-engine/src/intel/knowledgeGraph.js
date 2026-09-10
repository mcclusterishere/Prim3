export class KnowledgeGraph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  upsertNode(node) {
    if (!node?.id) throw new TypeError('node.id is required');
    const current = this.nodes.get(node.id) || {};
    const next = Object.freeze({ ...current, ...node });
    this.nodes.set(node.id, next);
    return next;
  }

  upsertEdge(edge) {
    if (!edge?.source || !edge?.target || !edge?.type) {
      throw new TypeError('edge.source, edge.target, and edge.type are required');
    }
    const id = edge.id || `${edge.source}|${edge.type}|${edge.target}`;
    const current = this.edges.get(id) || {};
    const next = Object.freeze({ id, ...current, ...edge });
    this.edges.set(id, next);
    return next;
  }

  neighbors(nodeId, { direction = 'both', type = null } = {}) {
    const found = [];
    for (const edge of this.edges.values()) {
      if (type && edge.type !== type) continue;
      const outgoing = edge.source === nodeId;
      const incoming = edge.target === nodeId;
      if (direction === 'out' && !outgoing) continue;
      if (direction === 'in' && !incoming) continue;
      if (direction === 'both' && !outgoing && !incoming) continue;
      const otherId = outgoing ? edge.target : edge.source;
      found.push({ edge, node: this.nodes.get(otherId) || null });
    }
    return found;
  }

  dependencyClosure(nodeId, { maxDepth = 5, relationTypes = null } = {}) {
    const accepted = relationTypes ? new Set(relationTypes) : null;
    const visited = new Set([nodeId]);
    const queue = [{ id: nodeId, depth: 0 }];
    const result = [];

    while (queue.length) {
      const current = queue.shift();
      if (current.depth >= maxDepth) continue;
      for (const { edge, node } of this.neighbors(current.id, { direction: 'out' })) {
        if (accepted && !accepted.has(edge.type)) continue;
        if (visited.has(edge.target)) continue;
        visited.add(edge.target);
        const next = { id: edge.target, depth: current.depth + 1, edge, node };
        result.push(next);
        queue.push(next);
      }
    }
    return result;
  }

  snapshot() {
    return Object.freeze({
      nodes: Object.freeze([...this.nodes.values()]),
      edges: Object.freeze([...this.edges.values()]),
    });
  }
}
