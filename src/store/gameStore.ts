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
} from "@/utils/puzzle";
import type { GameMode } from "@/types/game";

type GameState = {
  mode: GameMode;
  runCount: number;
  catPosition: Vector3;
  currentStationIndex: number;
  isNearStation: boolean;
  attempt: Attempt;
  puzzlePhase: PuzzlePhase;
  rejection: Rejection | null;
  solvedAttempts: Partial<Record<number, Attempt>>;
  pressNode: (levelIndex: number, nodeId: number) => void;
  enterNode: (levelIndex: number, nodeId: number) => void;
  threadToNode: (nodeId: number) => void;
  cutThread: () => void;
  setNearStation: (isNearStation: boolean) => void;
  beginApproach: () => void;
  arriveAtStation: () => void;
  advanceToNextStation: () => void;
  restartGame: () => void;
};

export const useGameStore = create<GameState>()((set, get) => ({
  mode: "walking",
  runCount: 0,
  catPosition: new Vector3(),
  currentStationIndex: 0,
  isNearStation: false,
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
    if (getCurrentNodeId(attempt) === nodeId) {
      return;
    }

    if (getPreviousNodeId(attempt) === nodeId) {
      set({ attempt: undoLastStep(attempt), rejection: null });

      return;
    }

    const { graph } = levels[currentStationIndex];
    const traversal = traverseToNode(graph, attempt, nodeId);
    if ("refusal" in traversal) {
      if (attempt.usedEdgeIndices.length === 0) {
        set({ attempt: startAttemptAt(nodeId), rejection: null });

        return;
      }

      set({
        rejection: {
          levelIndex: currentStationIndex,
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

    set({
      attempt: EMPTY_ATTEMPT,
      puzzlePhase: "ready",
      rejection: null,
    });
  },

  setNearStation: (isNearStation) => set({ isNearStation }),

  beginApproach: () => {
    const { mode, isNearStation } = get();

    if (mode !== "walking" || !isNearStation) {
      return;
    }

    set({ mode: "approaching", isNearStation: false });
  },

  arriveAtStation: () => {
    if (get().mode !== "approaching") {
      return;
    }

    set({ mode: "solving" });
  },

  advanceToNextStation: () => {
    const { currentStationIndex } = get();
    const isLastStation = currentStationIndex === levels.length - 1;

    set({
      mode: isLastStation ? "done" : "walking",
      currentStationIndex: isLastStation
        ? currentStationIndex
        : currentStationIndex + 1,
      attempt: EMPTY_ATTEMPT,
      puzzlePhase: "ready",
      rejection: null,
    });
  },

  restartGame: () => {
    set((state) => ({
      mode: "walking",
      runCount: state.runCount + 1,
      currentStationIndex: 0,
      isNearStation: false,
      attempt: EMPTY_ATTEMPT,
      puzzlePhase: "ready",
      rejection: null,
      solvedAttempts: {},
    }));
  },
}));
