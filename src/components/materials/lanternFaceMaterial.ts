import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

import fragmentShader from "@/shaders/lantern/fragment.glsl";
import vertexShader from "@/shaders/lantern/vertex.glsl";

const LanternFaceMaterial = shaderMaterial(
  {
    uTime: 0,
    uGlowColor: new Color("#ffb648"),
    uEmberColor: new Color("#c8441a"),
    uGlowIntensity: 1.5,
    uFlickerSeed: 0,
  },
  vertexShader,
  fragmentShader,
);

export const lanternMaterial = new LanternFaceMaterial();
