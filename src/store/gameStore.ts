import { create } from "zustand";
import { Vector3 } from "three";

import { levels } from "@/data/levels";
import type { Attempt, PuzzlePhase } from "@/types/puzzle";
import {
  EMPTY_ATTEMPT,
  getCurrentNodeId,
  getPreviousNodeId,
  isAttemptComplete,
  startAttemptAt,
  traverseToNode,
  undoLastStep,
} from "@/utils/puzzle/attempt";

export type PuzzleFeedback = {
  isPointerDown: boolean;
  dragPoint: Vector3;
};

type GameState = {
  catPosition: Vector3;
  puzzleFeedback: PuzzleFeedback;
  activeLevelIndex: number | null;
  attempt: Attempt;
  puzzlePhase: PuzzlePhase;
  solvedAttempts: Partial<Record<number, Attempt>>;
  pressNode: (levelIndex: number, nodeId: number) => void;
  enterNode: (levelIndex: number, nodeId: number) => void;
  threadToNode: (nodeId: number) => void;
  releasePointer: () => void;
};

export const useGameStore = create<GameState>()((set, get) => ({
  catPosition: new Vector3(),
  puzzleFeedback: {
    isPointerDown: false,
    dragPoint: new Vector3(),
  },
  activeLevelIndex: null,
  attempt: EMPTY_ATTEMPT,
  puzzlePhase: "ready",
  solvedAttempts: {},

  pressNode: (levelIndex, nodeId) => {
    const { activeLevelIndex, puzzlePhase, puzzleFeedback } = get();
    puzzleFeedback.isPointerDown = true;

    if (puzzlePhase === "drawing" && activeLevelIndex === levelIndex) {
      get().threadToNode(nodeId);
      return;
    }

    set({
      activeLevelIndex: levelIndex,
      attempt: startAttemptAt(nodeId),
      puzzlePhase: "drawing",
    });
  },

  enterNode: (levelIndex, nodeId) => {
    const { puzzlePhase, activeLevelIndex, puzzleFeedback } = get();

    if (
      !puzzleFeedback.isPointerDown ||
      puzzlePhase !== "drawing" ||
      activeLevelIndex !== levelIndex
    ) {
      return;
    }

    get().threadToNode(nodeId);
  },

  threadToNode: (nodeId) => {
    const { attempt, activeLevelIndex } = get();
    if (activeLevelIndex === null) return;

    const { graph } = levels[activeLevelIndex];
    const fromNodeId = getCurrentNodeId(attempt);
    if (fromNodeId === null || fromNodeId === nodeId) return;

    if (getPreviousNodeId(attempt) === nodeId) {
      set({ attempt: undoLastStep(attempt) });
      return;
    }

    const nextAttempt = traverseToNode(graph, attempt, nodeId);

    if (nextAttempt === null) {
      if (attempt.usedEdgeIndices.length === 0) {
        set({ attempt: startAttemptAt(nodeId) });
      }
      return;
    }

    if (!isAttemptComplete(graph, nextAttempt)) {
      set({ attempt: nextAttempt });
      return;
    }

    set((state) => ({
      attempt: nextAttempt,
      puzzlePhase: "won",
      solvedAttempts: {
        ...state.solvedAttempts,
        [activeLevelIndex]: nextAttempt,
      },
    }));
  },

  releasePointer: () => {
    get().puzzleFeedback.isPointerDown = false;
  },
}));
