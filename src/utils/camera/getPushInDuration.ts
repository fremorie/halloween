import { INTRO_BEAT_DURATIONS } from "@/settings/introSettings";
import { REWARD_BEAT_DURATIONS } from "@/settings/rewardSettings";
import type { GameMode } from "@/types/game";

export function getPushInDuration(mode: GameMode) {
  return mode === "intro"
    ? INTRO_BEAT_DURATIONS.flyIn
    : REWARD_BEAT_DURATIONS.zoomIn;
}
