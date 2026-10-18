import type { StateCreator } from "zustand";

import type { GameState } from "@/store/gameStore";
import { REWARD_BEAT_ORDER } from "@/settings/rewardSettings";
import type { RewardBeat } from "@/types/reward";
import { levels } from "@/data/levels";
import type { CostumePiece } from "@/types/level";

export type RewardSlice = {
  rewardBeat: RewardBeat | null;
  wornCostumePieces: CostumePiece[];
  startReward: () => void;
  advanceRewardBeat: () => void;
  putOnCostumePiece: (piece: CostumePiece) => void;
  resetRewards: () => void;
};

export const createRewardSlice: StateCreator<GameState, [], [], RewardSlice> = (
  set,
  get,
) => ({
  rewardBeat: null,
  wornCostumePieces: [],

  startReward: () =>
    set({ mode: "rewarding", rewardBeat: REWARD_BEAT_ORDER[0] }),

  advanceRewardBeat: () => {
    const { rewardBeat } = get();
    if (rewardBeat === null) {
      return;
    }
    const nextBeat =
      REWARD_BEAT_ORDER[REWARD_BEAT_ORDER.indexOf(rewardBeat) + 1];
    if (nextBeat === undefined) {
      set({ rewardBeat: null });
      get().advanceToNextStation();

      return;
    }

    set({ rewardBeat: nextBeat });

    if (nextBeat === "hatDrop") {
      get().putOnCostumePiece(levels[get().currentStationIndex].piece);
    }
  },

  putOnCostumePiece: (piece) =>
    set((state) => ({
      wornCostumePieces: [...state.wornCostumePieces, piece],
    })),

  resetRewards: () => set({ rewardBeat: null, wornCostumePieces: [] }),
});
