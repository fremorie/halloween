import { Vec3 } from "@/types/math";

export const HEMISPHERE_LIGHT_SETTINGS = {
  skyColor: "#fff8ee",
  groundColor: "#b8a690",
  intensity: 1.6,
};

export const SUN_LIGHT_SETTINGS = {
  color: "#fff0dc",
  intensity: 1.8,
  offsetFromTarget: [-6, 9, 6] as Vec3,
  shadowMapSize: 2048,
  shadowBias: -0.0005,
  shadowNormalBias: 0.03,
  shadowReach: 13,
  shadowNear: 0.5,
  shadowFar: 40,
};
