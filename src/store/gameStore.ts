import { create } from "zustand";
import { Vector3 } from "three";

import { levels } from "@/data/levels";
import { REFUSAL_MESSAGES } from "@/settings/puzzleSettings";
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

type GameState = {
  catPosition: Vector3;
  activeLevelIndex: number | null;
  attempt: Attempt;
  puzzlePhase: PuzzlePhase;
  puzzleMessage: string | null;
  lastRejection: { levelIndex: number; nodeId: number } | null;
  solvedAttempts: Partial<Record<number, Attempt>>;
  pressNode: (levelIndex: number, nodeId: number) => void;
  enterNode: (levelIndex: number, nodeId: number) => void;
  threadToNode: (nodeId: number) => void;
  cutThread: () => void;
};

export const useGameStore = create<GameState>()((set, get) => ({
  catPosition: new Vector3(),
  activeLevelIndex: null,
  attempt: EMPTY_ATTEMPT,
  puzzlePhase: "ready",
  puzzleMessage: null,
  lastRejection: null,
  solvedAttempts: {},

  pressNode: (levelIndex, nodeId) => {
    const { puzzlePhase, activeLevelIndex } = get();
    if (puzzlePhase === "drawing" && activeLevelIndex === levelIndex) {
      get().threadToNode(nodeId);
      return;
    }

    set({
      activeLevelIndex: levelIndex,
      attempt: startAttemptAt(nodeId),
      puzzlePhase: "drawing",
      puzzleMessage: null,
    });
  },

  enterNode: (levelIndex, nodeId) => {
    const { puzzlePhase, activeLevelIndex } = get();
    if (puzzlePhase !== "drawing" || activeLevelIndex !== levelIndex) return;

    get().threadToNode(nodeId);
  },

  threadToNode: (nodeId) => {
    const { attempt, activeLevelIndex } = get();
    if (activeLevelIndex === null || getCurrentNodeId(attempt) === nodeId) {
      return;
    }

    if (getPreviousNodeId(attempt) === nodeId) {
      set({ attempt: undoLastStep(attempt), puzzleMessage: null });
      return;
    }

    const { graph } = levels[activeLevelIndex];
    const traversal = traverseToNode(graph, attempt, nodeId);
    if ("refusal" in traversal) {
      if (attempt.usedEdgeIndices.length === 0) {
        set({ attempt: startAttemptAt(nodeId), puzzleMessage: null });
        return;
      }

      set({
        lastRejection: { levelIndex: activeLevelIndex, nodeId },
        puzzleMessage: REFUSAL_MESSAGES[traversal.refusal],
      });
      return;
    }

    if (!isAttemptComplete(graph, traversal.attempt)) {
      set({ attempt: traversal.attempt, puzzleMessage: null });
      return;
    }

    set((state) => ({
      attempt: traversal.attempt,
      puzzlePhase: "won",
      puzzleMessage: null,
      solvedAttempts: {
        ...state.solvedAttempts,
        [activeLevelIndex]: traversal.attempt,
      },
    }));
  },

  cutThread: () => {
    if (get().puzzlePhase !== "drawing") return;

    set({
      attempt: EMPTY_ATTEMPT,
      puzzlePhase: "ready",
      puzzleMessage: null,
    });
  },
}));
