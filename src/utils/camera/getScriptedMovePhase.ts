import type { CameraShot, ScriptedMovePhase } from "@/types/camera";
import type { RewardBeat } from "@/types/reward";

export function getScriptedMovePhase(
  shot: CameraShot,
  rewardBeat: RewardBeat | null,
): ScriptedMovePhase | null {
  if (shot === "catCloseUp") return "catCloseUp";
  if (rewardBeat === "knit") return "knittingPullBack";
  return null;
}
