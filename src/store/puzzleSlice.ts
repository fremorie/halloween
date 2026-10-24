import type { StateCreator } from "zustand";

import { levels } from "@/data/levels";
import type { GameState } from "@/store/gameStore";
import type { Attempt, PuzzlePhase, Rejection } from "@/types/puzzle";
import {
  EMPTY_ATTEMPT,
  getCurrentNodeId,
  getPreviousNodeId,
  isAttemptComplete,
  startAttemptAt,
  traverseToNode,
  undoLastStep,
} from "@/utils/puzzle";

export type PuzzleSlice = {
  attempt: Attempt;
  puzzlePhase: PuzzlePhase;
  rejection: Rejection | null;
  solvedAttempts: Partial<Record<number, Attempt>>;
  pressNode: (levelIndex: number, nodeId: number) => void;
  enterNode: (levelIndex: number, nodeId: number) => void;
  threadToNode: (nodeId: number) => void;
  cutThread: () => void;
  resetCurrentPuzzle: () => void;
  resetAllPuzzles: () => void;
};

export const createPuzzleSlice: StateCreator<GameState, [], [], PuzzleSlice> = (
  set,
  get,
) => ({
  attempt: EMPTY_ATTEMPT,
  puzzlePhase: "ready",
  rejection: null,
  solvedAttempts: {},

  pressNode: (levelIndex, nodeId) => {
    const { mode, currentStationIndex, puzzlePhase } = get();
    const isTakingInput =
      mode === "solving" && levelIndex === currentStationIndex;
    if (!isTakingInput || puzzlePhase === "won") {
      return;
    }

    if (puzzlePhase === "drawing") {
      get().threadToNode(nodeId);

      return;
    }

    set({
      attempt: startAttemptAt(nodeId),
      puzzlePhase: "drawing",
      rejection: null,
    });
  },

  enterNode: (levelIndex, nodeId) => {
    const { mode, currentStationIndex, puzzlePhase } = get();
    const isTakingInput =
      mode === "solving" && levelIndex === currentStationIndex;
    if (!isTakingInput || puzzlePhase !== "drawing") {
      return;
    }

    get().threadToNode(nodeId);
  },

  threadToNode: (nodeId) => {
    const { attempt, currentStationIndex } = get();
    const currentNodeId = getCurrentNodeId(attempt);
    if (currentNodeId === nodeId) {
      return;
    }

    if (getPreviousNodeId(attempt) === nodeId) {
      set({ attempt: undoLastStep(attempt), rejection: null });

      return;
    }

    const { graph } = levels[currentStationIndex];
    const traversal = traverseToNode(graph, attempt, nodeId);
    if ("refusal" in traversal) {
      if (attempt.usedEdgeIndices.length === 0 || currentNodeId === null) {
        set({ attempt: startAttemptAt(nodeId), rejection: null });

        return;
      }

      set({
        rejection: {
          levelIndex: currentStationIndex,
          fromNodeId: currentNodeId,
          nodeId,
          reason: traversal.refusal,
        },
      });

      return;
    }

    if (!isAttemptComplete(graph, traversal.attempt)) {
      set({ attempt: traversal.attempt, rejection: null });

      return;
    }

    set((state) => ({
      attempt: traversal.attempt,
      puzzlePhase: "won",
      rejection: null,
      solvedAttempts: {
        ...state.solvedAttempts,
        [currentStationIndex]: traversal.attempt,
      },
    }));
  },

  cutThread: () => {
    if (get().puzzlePhase !== "drawing") {
      return;
    }

    get().resetCurrentPuzzle();
  },

  resetCurrentPuzzle: () =>
    set({
      attempt: EMPTY_ATTEMPT,
      puzzlePhase: "ready",
      rejection: null,
    }),

  resetAllPuzzles: () => {
    get().resetCurrentPuzzle();
    set({ solvedAttempts: {} });
  },
});
