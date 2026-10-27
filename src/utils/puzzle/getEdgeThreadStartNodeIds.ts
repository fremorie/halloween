import type { Graph } from "@/types/graph";
import type { Attempt } from "@/types/puzzle";

export function getEdgeThreadStartNodeIds(
  graph: Graph,
  attempt: Attempt,
): (number | null)[] {
  return graph.edges.map((_, edgeIndex) => {
    const stepIndex = attempt.usedEdgeIndices.indexOf(edgeIndex);
    return stepIndex === -1 ? null : attempt.path[stepIndex];
  });
}
