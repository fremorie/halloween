import type { Vector3 } from "three";

export type CameraShot =
  "walking" | "puzzle" | "catCloseUp" | "birdView" | "flightChase";

export type ScriptedMovePhase =
  "knittingPullBack" | "catCloseUp" | "introFlyIn" | "finaleTurnAround";

export type CameraPose = {
  lookAt: Vector3;
  zoom: number;
  heightFactor: number;
  orbitAngle: number;
};

export type ScriptedMoveStart = {
  phase: ScriptedMovePhase;
  elapsedTime: number;
  zoom: number;
  heightFactor: number;
  orbitAngle: number;
  lookAt: Vector3;
};
