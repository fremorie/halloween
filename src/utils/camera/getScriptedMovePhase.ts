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
    if (mode === "intro") {
      return "introFlyIn";
    }

    if (finaleBeat === "landing" || finaleBeat === "thankYou") {
      return "finaleLanding";
    }

    return "catCloseUp";
  }
  if (rewardBeat === "knit") {
    return "knittingPullBack";
  }

  if (
    shot === "flightChase" &&
    (finaleBeat === "takeOff" || finaleBeat === "turnAround")
  ) {
    return "finaleTurnAround";
  }

  return null;
}
