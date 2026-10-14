import { create } from "zustand";
import { Vector3 } from "three";

import { levels } from "@/data/levels";
import type { Attempt, PuzzlePhase, Rejection } from "@/types/puzzle";
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
  currentStationIndex: number;
  isNearStation: boolean;
  activeLevelIndex: number | null;
  attempt: Attempt;
  puzzlePhase: PuzzlePhase;
  rejection: Rejection | null;
  solvedAttempts: Partial<Record<number, Attempt>>;
  pressNode: (levelIndex: number, nodeId: number) => void;
  enterNode: (levelIndex: number, nodeId: number) => void;
  threadToNode: (nodeId: number) => void;
  cutThread: () => void;
  setNearStation: (isNearStation: boolean) => void;
};

export const useGameStore = create<GameState>()((set, get) => ({
  catPosition: new Vector3(),
  currentStationIndex: 0,
  isNearStation: false,
  activeLevelIndex: null,
  attempt: EMPTY_ATTEMPT,
  puzzlePhase: "ready",
  rejection: null,
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
      rejection: null,
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
      set({ attempt: undoLastStep(attempt), rejection: null });
      return;
    }

    const { graph } = levels[activeLevelIndex];
    const traversal = traverseToNode(graph, attempt, nodeId);
    if ("refusal" in traversal) {
      if (attempt.usedEdgeIndices.length === 0) {
        set({ attempt: startAttemptAt(nodeId), rejection: null });
        return;
      }

      set({
        rejection: {
          levelIndex: activeLevelIndex,
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
        [activeLevelIndex]: traversal.attempt,
      },
    }));
  },

  cutThread: () => {
    if (get().puzzlePhase !== "drawing") return;

    set({
      attempt: EMPTY_ATTEMPT,
      puzzlePhase: "ready",
      rejection: null,
    });
  },

  setNearStation: (isNearStation) => set({ isNearStation }),
}));
