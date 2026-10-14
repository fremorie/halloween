import type { Attempt, Traversal } from "@/types/puzzle";
import type { Graph, GraphEdge } from "@/types/graph";

export const EMPTY_ATTEMPT: Attempt = { path: [], usedEdgeIndices: [] };

export function startAttemptAt(nodeId: number): Attempt {
  return { path: [nodeId], usedEdgeIndices: [] };
}

export function getCurrentNodeId(attempt: Attempt): number | null {
  return attempt.path.at(-1) ?? null;
}

export function getPreviousNodeId(attempt: Attempt): number | null {
  return attempt.path.at(-2) ?? null;
}

function edgeJoins(edge: GraphEdge, nodeA: number, nodeB: number) {
  return (
    (edge.a === nodeA && edge.b === nodeB) ||
    (edge.a === nodeB && edge.b === nodeA)
  );
}

export function traverseToNode(
  graph: Graph,
  attempt: Attempt,
  toNodeId: number,
): Traversal {
  const fromNodeId = getCurrentNodeId(attempt);
  if (fromNodeId === null) return { refusal: "noBranch" };

  const edgeIndex = graph.edges.findIndex(
    (edge, candidateEdgeIndex) =>
      edgeJoins(edge, fromNodeId, toNodeId) &&
      !attempt.usedEdgeIndices.includes(candidateEdgeIndex),
  );
  if (edgeIndex !== -1) {
    return {
      attempt: {
        path: [...attempt.path, toNodeId],
        usedEdgeIndices: [...attempt.usedEdgeIndices, edgeIndex],
      },
    };
  }

  const isJoined = graph.edges.some((edge) =>
    edgeJoins(edge, fromNodeId, toNodeId),
  );
  return { refusal: isJoined ? "alreadyThreaded" : "noBranch" };
}

export function undoLastStep(attempt: Attempt): Attempt {
  return {
    path: attempt.path.slice(0, -1),
    usedEdgeIndices: attempt.usedEdgeIndices.slice(0, -1),
  };
}

export function isAttemptComplete(graph: Graph, attempt: Attempt) {
  return attempt.usedEdgeIndices.length === graph.edges.length;
}
