export type Vec3 = [number, number, number];

export type GraphNode = {
  id: number;
  position: Vec3;
};

export type GraphEdge = {
  a: number;
  b: number;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

const hat: Graph = {
  nodes: [
    { id: 0, position: [0.5, 2.6, 0] },
    { id: 1, position: [-0.6, 0.6, 0] },
    { id: 2, position: [0.7, 0.6, 0] },
    { id: 3, position: [-2.2, -1.0, 0] },
    { id: 4, position: [2.2, -1.0, 0] },
    { id: 5, position: [0, -1.6, 0] },
  ],
  edges: [
    { a: 0, b: 1 },
    { a: 0, b: 2 },
    { a: 1, b: 2 },
    { a: 1, b: 3 },
    { a: 2, b: 4 },
    { a: 3, b: 5 },
    { a: 5, b: 4 },
    { a: 1, b: 5 },
  ],
};

export const NODE_RADIUS = 0.45;

/* Lifts the graph so that the lowest ball rests on the ground */
function grounded(graph: Graph): Graph {
  const lowestY = Math.min(...graph.nodes.map(({ position }) => position[1]));
  const lift = lowestY + NODE_RADIUS;

  return {
    ...graph,
    nodes: graph.nodes.map((node) => ({
      id: node.id,
      position: [node.position[0], node.position[1] + lift, node.position[2]],
    })),
  };
}

export const level = grounded(hat);
