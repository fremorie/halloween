export type Attempt = {
  path: number[];
  usedEdgeIndices: number[];
};

export type PuzzlePhase = "ready" | "drawing" | "won";

export type NodeState = "idle" | "visited" | "current";
