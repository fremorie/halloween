import type { CostumePiece } from "@/types/level";
import type { RewardBeat } from "@/types/reward";

export const REWARDED_COSTUME_PIECES: CostumePiece[] = ["hat", "cape", "wings"];

export const REWARD_BEAT_ORDER: RewardBeat[] = [
  "knit",
  "zoomIn",
  "hatDrop",
  "speech",
];

export const CAT_CLOSE_UP_BEATS: RewardBeat[] = ["zoomIn", "hatDrop", "speech"];

export const REWARD_BEAT_DURATIONS: Record<RewardBeat, number> = {
  knit: 3,
  zoomIn: 1.2,
  hatDrop: 0.8,
  speech: 2,
};

export const COSTUME_PIECE_DROP_HEIGHT = 1.5;
export const COSTUME_PIECE_DROP_DURATION = 0.6;
