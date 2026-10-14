import type { Graph } from "@/types/graph";
import type { Attempt, EdgeThreading } from "@/types/puzzle";

export function getEdgeThreading(
  graph: Graph,
  attempt: Attempt,
): EdgeThreading[] {
  return graph.edges.map((edge, edgeIndex) => {
    const stepIndex = attempt.usedEdgeIndices.indexOf(edgeIndex);

    return {
      isThreaded: stepIndex !== -1,
      isThreadedFromA: stepIndex !== -1 && attempt.path[stepIndex] === edge.a,
    };
  });
}
