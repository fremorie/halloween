import type { Graph } from "@/types/graph";
import type { Attempt } from "@/types/puzzle";

export function getEdgeThreading(graph: Graph, attempt: Attempt): boolean[] {
  return graph.edges.map((_, edgeIndex) =>
    attempt.usedEdgeIndices.includes(edgeIndex),
  );
}
