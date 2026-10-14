import { create } from "zustand";
import { Vector3 } from "three";

import { levels } from "@/data/levels";
import type { Attempt } from "@/types/puzzle";
import {
  EMPTY_ATTEMPT,
  startAttemptAt,
  traverseToNode,
} from "@/utils/puzzle/attempt";

export type PuzzleFeedback = {
  dragPoint: Vector3;
};

type GameState = {
  catPosition: Vector3;
  puzzleFeedback: PuzzleFeedback;
  activeLevelIndex: number | null;
  attempt: Attempt;
  pressNode: (levelIndex: number, nodeId: number) => void;
  threadToNode: (nodeId: number) => void;
};

export const useGameStore = create<GameState>()((set, get) => ({
  catPosition: new Vector3(),
  puzzleFeedback: {
    dragPoint: new Vector3(),
  },
  activeLevelIndex: null,
  attempt: EMPTY_ATTEMPT,

  pressNode: (levelIndex, nodeId) => {
    const { activeLevelIndex, attempt } = get();

    if (activeLevelIndex === levelIndex && attempt.path.length > 0) {
      get().threadToNode(nodeId);
      return;
    }

    set({ activeLevelIndex: levelIndex, attempt: startAttemptAt(nodeId) });
  },

  threadToNode: (nodeId) => {
    const { attempt, activeLevelIndex } = get();
    if (activeLevelIndex === null) return;

    const { graph } = levels[activeLevelIndex];
    const nextAttempt = traverseToNode(graph, attempt, nodeId);
    if (nextAttempt === null) return;

    set({ attempt: nextAttempt });
  },
}));
