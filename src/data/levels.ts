import type { Graph } from "@/types/graph";

export const hat: Graph = {
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
