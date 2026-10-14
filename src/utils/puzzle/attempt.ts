import type { Attempt } from "@/types/puzzle";

export const EMPTY_ATTEMPT: Attempt = { path: [], usedEdgeIndices: [] };

export function startAttemptAt(nodeId: number): Attempt {
  return { path: [nodeId], usedEdgeIndices: [] };
}

export function getCurrentNodeId(attempt: Attempt): number | null {
  return attempt.path.at(-1) ?? null;
}
