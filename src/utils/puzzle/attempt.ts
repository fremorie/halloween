import type { Attempt } from "@/types/puzzle";
import type { Graph, GraphEdge } from "@/types/graph";

export const EMPTY_ATTEMPT: Attempt = { path: [], usedEdgeIndices: [] };

export function startAttemptAt(nodeId: number): Attempt {
  return { path: [nodeId], usedEdgeIndices: [] };
}

export function getCurrentNodeId(attempt: Attempt): number | null {
  return attempt.path.at(-1) ?? null;
}

function edgeJoins(edge: GraphEdge, nodeA: number, nodeB: number) {
  return (
    (edge.a === nodeA && edge.b === nodeB) ||
    (edge.a === nodeB && edge.b === nodeA)
  );
}

export function findUnusedEdgeIndex(
  graph: Graph,
  fromNodeId: number,
  toNodeId: number,
  usedEdgeIndices: readonly number[] = [],
) {
  return graph.edges.findIndex(
    (edge, edgeIndex) =>
      edgeJoins(edge, fromNodeId, toNodeId) &&
      !usedEdgeIndices.includes(edgeIndex),
  );
}

export function traverseToNode(
  graph: Graph,
  attempt: Attempt,
  toNodeId: number,
): Attempt | null {
  const fromNodeId = getCurrentNodeId(attempt);
  if (fromNodeId === null || fromNodeId === toNodeId) return null;

  const edgeIndex = findUnusedEdgeIndex(
    graph,
    fromNodeId,
    toNodeId,
    attempt.usedEdgeIndices,
  );
  if (edgeIndex === -1) return null;

  return {
    path: [...attempt.path, toNodeId],
    usedEdgeIndices: [...attempt.usedEdgeIndices, edgeIndex],
  };
}

export function getPreviousNodeId(attempt: Attempt): number | null {
  return attempt.path.at(-2) ?? null;
}

export function undoLastStep(attempt: Attempt): Attempt {
  return {
    path: attempt.path.slice(0, -1),
    usedEdgeIndices: attempt.usedEdgeIndices.slice(0, -1),
  };
}
