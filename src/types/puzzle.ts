export type Attempt = {
  path: number[];
  usedEdgeIndices: number[];
};

export type NodeState = "idle" | "visited" | "current";

export type EdgeThreading = {
  isThreaded: boolean;
  isThreadedFromA: boolean;
};
