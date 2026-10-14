export type Attempt = {
  path: number[];
  usedEdgeIndices: number[];
};

export type NodeState = "idle" | "visited" | "current";
