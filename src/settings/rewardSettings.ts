import type { CostumePiece } from "@/types/level";
import type { RewardBeat } from "@/types/reward";

export const REWARDED_COSTUME_PIECES: CostumePiece[] = ["hat", "cape"];

export const REWARD_BEAT_ORDER: RewardBeat[] = ["zoomIn", "hatDrop", "speech"];

export const REWARD_BEAT_DURATIONS: Record<RewardBeat, number> = {
  zoomIn: 1.2,
  hatDrop: 0.8,
  speech: 2,
};

export const HAT_DROP_HEIGHT = 1.5;
export const HAT_DROP_DURATION = 0.6;
