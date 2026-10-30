import type { CameraShot, ScriptedMovePhase } from "@/types/camera";
import type { GameMode } from "@/types/game";
import type { RewardBeat } from "@/types/reward";
import type { FinaleBeat } from "@/types/finale";

export function getScriptedMovePhase(
  shot: CameraShot,
  rewardBeat: RewardBeat | null,
  mode: GameMode,
  finaleBeat: FinaleBeat | null,
): ScriptedMovePhase | null {
  if (shot === "catCloseUp") {
    return mode === "intro" ? "introFlyIn" : "catCloseUp";
  }
  if (rewardBeat === "knit") {
    return "knittingPullBack";
  }

  if (shot === "flightChase" && finaleBeat === "turnAround") {
    return "finaleTurnAround";
  }

  return null;
}
