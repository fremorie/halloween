import type { CostumePiece } from "@/types/level";
import type { RewardBeat } from "@/types/reward";
import { COSTUME_SILHOUETTE_FADE_DURATION } from "@/settings/journeySettings";

export const REWARDED_COSTUME_PIECES: CostumePiece[] = ["hat", "cape", "wings"];

export const REWARD_BEAT_ORDER: RewardBeat[] = [
  "wiggle",
  "scatter",
  "zoomIn",
  "hatDrop",
  "speech",
];

export const CAT_CLOSE_UP_BEATS: RewardBeat[] = ["zoomIn", "hatDrop", "speech"];

export const REWARD_BEAT_DURATIONS: Record<RewardBeat, number> = {
  wiggle: COSTUME_SILHOUETTE_FADE_DURATION,
  scatter: 1.5,
  zoomIn: 1.2,
  hatDrop: 0.8,
  speech: 2,
};

export const COSTUME_PIECE_DROP_HEIGHT = 1.5;
export const COSTUME_PIECE_DROP_DURATION = 0.6;
