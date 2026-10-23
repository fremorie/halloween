import type { CameraShot, ScriptedMovePhase } from "@/types/camera";
import type { GameMode } from "@/types/game";
import type { RewardBeat } from "@/types/reward";

export function getScriptedMovePhase(
  shot: CameraShot,
  rewardBeat: RewardBeat | null,
  mode: GameMode,
): ScriptedMovePhase | null {
  if (shot === "catCloseUp") {
    return mode === "intro" ? "introFlyIn" : "catCloseUp";
  }
  if (rewardBeat === "knit") return "knittingPullBack";
  return null;
}
