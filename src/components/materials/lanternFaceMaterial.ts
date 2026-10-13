import { shaderMaterial } from "@react-three/drei";
import {
  Box3,
  type BufferAttribute,
  type BufferGeometry,
  Color,
  Uniform,
} from "three";

import fragmentShader from "@/shaders/lantern/fragment.glsl";
import vertexShader from "@/shaders/lantern/vertex.glsl";
import type { LanternFaceParams } from "@/types/lantern";

export const lanternTimeUniform = new Uniform(0);

const LanternFaceMaterial = shaderMaterial(
  {
    uTime: 0,
    uGlowColor: new Color("#ffb648"),
    uEmberColor: new Color("#c8441a"),
    uGlowIntensity: 1.5,
    uFlickerSeed: 0,
    uFaceBottom: 0,
    uFaceTop: 1,
  },
  vertexShader,
  fragmentShader,
);

type LanternFaceOptions = LanternFaceParams & {
  faceGeometry: BufferGeometry;
};

export function createLanternFaceMaterial({
  faceGeometry,
  emberColor,
  glowColor,
  glowIntensity,
  flickerSeed,
}: LanternFaceOptions) {
  const facePositions = faceGeometry.getAttribute(
    "position",
  ) as BufferAttribute;
  const faceBounds = new Box3().setFromBufferAttribute(facePositions);

  const material = new LanternFaceMaterial();
  material.uniforms.uTime = lanternTimeUniform;
  material.uniforms.uFaceBottom.value = faceBounds.min.y;
  material.uniforms.uFaceTop.value = faceBounds.max.y;
  material.uniforms.uEmberColor.value.set(emberColor);

  if (glowColor !== undefined) {
    material.uniforms.uGlowColor.value.set(glowColor);
  }
  if (glowIntensity !== undefined) {
    material.uniforms.uGlowIntensity.value = glowIntensity;
  }
  if (flickerSeed !== undefined) {
    material.uniforms.uFlickerSeed.value = flickerSeed;
  }

  return material;
}
