import type { ColorRepresentation } from "three";

export type LanternFaceParams = {
  emberColor: ColorRepresentation;
  glowColor?: ColorRepresentation;
  glowIntensity?: number;
  flickerSeed?: number;
};
