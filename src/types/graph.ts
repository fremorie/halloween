import type { Vec3 } from "@/types/math";

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
