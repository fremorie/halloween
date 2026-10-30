import { CAT_CLOSE_UP_BEATS } from "@/settings/rewardSettings";
import type { CameraShot } from "@/types/camera";
import type { GameMode } from "@/types/game";
import type { RewardBeat } from "@/types/reward";
import type { IntroBeat } from "@/types/intro";
import type { FinaleBeat } from "@/types/finale";
import { FLIGHT_CHASE_BEATS } from "@/settings/finaleSettings";

const PUZZLE_FRAMING_MODES: GameMode[] = [
  "approaching",
  "solving",
  "rewarding",
];

export function getCameraShot(
  mode: GameMode,
  rewardBeat: RewardBeat | null,
  introBeat: IntroBeat | null,
  finaleBeat: FinaleBeat | null,
): CameraShot {
  if (mode === "intro") {
    return introBeat === null ? "birdView" : "catCloseUp";
  }

  if (mode === "finale") {
    return finaleBeat !== null && FLIGHT_CHASE_BEATS.includes(finaleBeat)
      ? "flightChase"
      : "catCloseUp";
  }

  if (rewardBeat !== null && CAT_CLOSE_UP_BEATS.includes(rewardBeat)) {
    return "catCloseUp";
  }

  if (PUZZLE_FRAMING_MODES.includes(mode)) {
    return "puzzle";
  }

  return "walking";
}
