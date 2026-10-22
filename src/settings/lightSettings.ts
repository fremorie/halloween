import type { Vec3 } from "@/types/math";

export const HEMISPHERE_LIGHT_SETTINGS = {
  skyColor: "#fff8ee",
  groundColor: "#b8a690",
  intensity: 1.6,
};

export const SUN_LIGHT_SETTINGS = {
  color: "#fff0dc",
  intensity: 1.8,
  offsetFromTarget: [-6, 9, 6] as Vec3,
  shadowMapSize: 4096,
  shadowBias: -0.0005,
  shadowNormalBias: 0.03,
  targetLead: 4,
};

export const ENVIRONMENT_LIGHTING_SETTINGS = {
  resolution: 64,
  lightformers: [
    {
      intensity: 2,
      position: [0, 4, 6] as Vec3,
      scale: [6, 3, 1] as Vec3,
      rotationY: 0,
    },
    {
      intensity: 0.8,
      position: [-6, 0, 2] as Vec3,
      scale: [4, 4, 1] as Vec3,
      rotationY: Math.PI / 2,
    },
  ],
};

export const SHADOW_CATCHER_SETTINGS = {
  shadowColor: "#4a3d52",
  shadowOpacity: 0.7,
};

export const SHADOW_CAMERA_BOUNDS = {
  bottom: -11,
  far: 42,
  left: -42,
  near: -15,
  right: 15,
  top: 30,
};
