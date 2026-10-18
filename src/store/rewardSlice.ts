import type { StateCreator } from "zustand";

import type { GameState } from "@/store/gameStore";
import { REWARD_BEAT_ORDER } from "@/settings/rewardSettings";
import type { RewardBeat } from "@/types/reward";

export type RewardSlice = {
  rewardBeat: RewardBeat | null;
  startReward: () => void;
  advanceRewardBeat: () => void;
};

export const createRewardSlice: StateCreator<GameState, [], [], RewardSlice> = (
  set,
  get,
) => ({
  rewardBeat: null,

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
  },
});
