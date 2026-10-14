import type { Graph } from "@/types/graph";
import type { BranchSegment } from "./getBranchInstanceMatrices";

export function getBranchSegments(graph: Graph): BranchSegment[] {
  return graph.edges.map((edge) => ({
    from: graph.nodes[edge.a].position,
    to: graph.nodes[edge.b].position,
  }));
}
