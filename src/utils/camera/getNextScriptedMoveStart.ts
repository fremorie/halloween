import type {
  CameraPose,
  ScriptedMovePhase,
  ScriptedMoveStart,
} from "@/types/camera";

export function getNextScriptedMoveStart(
  currentMoveStart: ScriptedMoveStart | null,
  phase: ScriptedMovePhase | null,
  elapsedTime: number,
  pose: CameraPose,
): ScriptedMoveStart | null {
  if (phase === null) {
    return null;
  }

  if (currentMoveStart?.phase === phase) {
    return currentMoveStart;
  }

  return {
    phase,
    elapsedTime,
    zoom: pose.zoom,
    heightFactor: pose.heightFactor,
    orbitAngle: pose.orbitAngle,
    lookAt: pose.lookAt.clone(),
  };
}
