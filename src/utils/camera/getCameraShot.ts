import { CAT_CLOSE_UP_BEATS } from "@/settings/rewardSettings";
import type { CameraShot } from "@/types/camera";
import type { GameMode } from "@/types/game";
import type { RewardBeat } from "@/types/reward";
import { IntroBeat } from "@/types/intro";

const PUZZLE_FRAMING_MODES: GameMode[] = [
  "approaching",
  "solving",
  "rewarding",
];

export function getCameraShot(
  mode: GameMode,
  rewardBeat: RewardBeat | null,
  introBeat: IntroBeat | null,
): CameraShot {
  if (mode === "intro") {
    return introBeat === null ? "birdView" : "catCloseUp";
  }

  if (rewardBeat !== null && CAT_CLOSE_UP_BEATS.includes(rewardBeat)) {
    return "catCloseUp";
  }

  if (PUZZLE_FRAMING_MODES.includes(mode)) {
    return "puzzle";
  }

  return "walking";
}
