import type { Graph } from "@/types/graph";
import { NODE_RADIUS } from "@/settings/graphSettings";

/* Lifts the graph so that the lowest ball rests on the ground */
export function getGroundedGraph(graph: Graph): Graph {
  const lowestY = Math.min(...graph.nodes.map(({ position }) => position[1]));
  const lift = NODE_RADIUS - lowestY;

  return {
    ...graph,
    nodes: graph.nodes.map(({ id, position: [x, y, z] }) => ({
      id,
      position: [x, y + lift, z],
    })),
  };
}
