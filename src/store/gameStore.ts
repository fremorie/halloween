import { create } from "zustand";
import { Vector3 } from "three";

import { levels } from "@/data/levels";
import { REFUSAL_MESSAGES } from "@/settings/puzzleSettings";
import type { Attempt, PuzzlePhase } from "@/types/puzzle";
import {
  EMPTY_ATTEMPT,
  findUnusedEdgeIndex,
  getCurrentNodeId,
  getPreviousNodeId,
  isAttemptComplete,
  startAttemptAt,
  traverseToNode,
  undoLastStep,
} from "@/utils/puzzle/attempt";
import { getNowSeconds } from "@/utils/time/getNowSeconds";

export type PuzzleFeedback = {
  wonAt: number | null;
  rejected: { nodeId: number; at: number } | null;
  isPointerDown: boolean;
  dragPoint: Vector3;
};

type GameState = {
  catPosition: Vector3;
  puzzleFeedback: PuzzleFeedback;
  activeLevelIndex: number | null;
  attempt: Attempt;
  puzzlePhase: PuzzlePhase;
  puzzleMessage: string | null;
  solvedAttempts: Partial<Record<number, Attempt>>;
  pressNode: (levelIndex: number, nodeId: number) => void;
  enterNode: (levelIndex: number, nodeId: number) => void;
  threadToNode: (nodeId: number) => void;
  releasePointer: () => void;
  cutThread: () => void;
};

export const useGameStore = create<GameState>()((set, get) => ({
  catPosition: new Vector3(),
  puzzleFeedback: {
    wonAt: null,
    rejected: null,
    isPointerDown: false,
    dragPoint: new Vector3(),
  },
  activeLevelIndex: null,
  attempt: EMPTY_ATTEMPT,
  puzzlePhase: "ready",
  puzzleMessage: null,
  solvedAttempts: {},

  pressNode: (levelIndex, nodeId) => {
    const { puzzlePhase, activeLevelIndex, puzzleFeedback } = get();
    puzzleFeedback.isPointerDown = true;

    if (puzzlePhase === "drawing" && activeLevelIndex === levelIndex) {
      get().threadToNode(nodeId);
      return;
    }

    puzzleFeedback.wonAt = null;
    puzzleFeedback.rejected = null;
    set({
      activeLevelIndex: levelIndex,
      attempt: startAttemptAt(nodeId),
      puzzlePhase: "drawing",
      puzzleMessage: null,
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
    const { attempt, activeLevelIndex, puzzleFeedback } = get();
    if (activeLevelIndex === null) return;

    const { graph } = levels[activeLevelIndex];
    const fromNodeId = getCurrentNodeId(attempt);
    if (fromNodeId === null || fromNodeId === nodeId) return;

    if (getPreviousNodeId(attempt) === nodeId) {
      set({ attempt: undoLastStep(attempt), puzzleMessage: null });
      return;
    }

    const nextAttempt = traverseToNode(graph, attempt, nodeId);
    if (nextAttempt === null) {
      if (attempt.usedEdgeIndices.length === 0) {
        set({ attempt: startAttemptAt(nodeId), puzzleMessage: null });
        return;
      }

      puzzleFeedback.rejected = { nodeId, at: getNowSeconds() };
      const isJoined = findUnusedEdgeIndex(graph, fromNodeId, nodeId) !== -1;
      set({
        puzzleMessage: isJoined
          ? REFUSAL_MESSAGES.alreadyThreaded
          : REFUSAL_MESSAGES.noBranch,
      });
      return;
    }

    if (!isAttemptComplete(graph, nextAttempt)) {
      set({ attempt: nextAttempt, puzzleMessage: null });
      return;
    }

    puzzleFeedback.wonAt = getNowSeconds();
    set((state) => ({
      attempt: nextAttempt,
      puzzlePhase: "won",
      puzzleMessage: null,
      solvedAttempts: {
        ...state.solvedAttempts,
        [activeLevelIndex]: nextAttempt,
      },
    }));
  },

  releasePointer: () => {
    get().puzzleFeedback.isPointerDown = false;
  },

  cutThread: () => {
    const { puzzlePhase, puzzleFeedback } = get();
    if (puzzlePhase !== "drawing") return;

    puzzleFeedback.rejected = null;
    set({ attempt: EMPTY_ATTEMPT, puzzlePhase: "ready", puzzleMessage: null });
  },
}));
