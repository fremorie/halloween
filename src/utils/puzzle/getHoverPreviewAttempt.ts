import type { Graph } from "@/types/graph";
import type { Attempt } from "@/types/puzzle";
import { traverseToNode } from "@/utils/puzzle";

export function getHoverPreviewAttempt(
  graph: Graph,
  attempt: Attempt,
  hoveredNodeId: number | null,
): Attempt {
  if (hoveredNodeId === null) {
    return attempt;
  }

  const traversal = traverseToNode(graph, attempt, hoveredNodeId);

  return "attempt" in traversal ? traversal.attempt : attempt;
}
