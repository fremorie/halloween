export type Attempt = {
  path: number[];
  usedEdgeIndices: number[];
};

export type Refusal = "noBranch" | "alreadyThreaded";

export type Traversal = { attempt: Attempt } | { refusal: Refusal };

export type PuzzlePhase = "ready" | "drawing" | "won";

export type NodeState = "idle" | "visited" | "current";
