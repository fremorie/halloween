import type { Graph } from "@/types/graph";
import type { Level } from "@/types/level";
import { getGroundedGraph } from "@/utils/graph/getGroundedGraph";

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

const cape: Graph = {
  nodes: [
    { id: 0, position: [-1.1, 2.6, 0] },
    { id: 1, position: [1.1, 2.6, 0] },
    { id: 2, position: [0, 1.5, 0] },
    { id: 3, position: [-2.2, 1.3, 0] },
    { id: 4, position: [2.2, 1.3, 0] },
    { id: 5, position: [-2.6, -1.3, 0] },
    { id: 6, position: [-1.0, -1.9, 0] },
    { id: 7, position: [1.0, -1.9, 0] },
    { id: 8, position: [2.6, -1.3, 0] },
  ],
  edges: [
    { a: 0, b: 2 },
    { a: 1, b: 2 },
    { a: 0, b: 3 },
    { a: 1, b: 4 },
    { a: 3, b: 5 },
    { a: 4, b: 8 },
    { a: 5, b: 6 },
    { a: 6, b: 7 },
    { a: 7, b: 8 },
    { a: 2, b: 6 },
    { a: 2, b: 7 },
    { a: 3, b: 6 },
    { a: 4, b: 7 },
  ],
};

export const levels: Level[] = [
  {
    piece: "hat",
    title: "Witch hat",
    graph: getGroundedGraph(hat),
    pumpkin: { variant: "classic", faceParams: { emberColor: "#c8441a" } },
  },
  {
    piece: "cape",
    title: "Cape",
    graph: getGroundedGraph(cape),
    pumpkin: { variant: "cheerful", faceParams: { emberColor: "#c97a52" } },
  },
  {
    piece: "wings",
    title: "Bat wings",
    graph: getGroundedGraph(hat),
    pumpkin: { variant: "happy", faceParams: { emberColor: "#c96e52" } },
  },
];
