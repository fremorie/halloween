import { shaderMaterial } from "@react-three/drei";
import { Color, type Euler, Matrix3, Matrix4, type Texture } from "three";

import fragmentShader from "@/shaders/eye/fragment.glsl";
import vertexShader from "@/shaders/eye/vertex.glsl";
import type { EyeParams } from "@/types/eye";

const EyeMaterial = shaderMaterial(
  {
    uIrisTexture: null,
    uPupilRadius: 0.8,
    uHighlightColor: new Color("#ffffff"),
    uHighlightSize: 0.45,
    uInverseGazeRotation: new Matrix3(),
  },
  vertexShader,
  fragmentShader,
);

export type EyeMaterialInstance = InstanceType<typeof EyeMaterial>;

const gazeRotationMatrix = new Matrix4();

export function applyEyeGazeRotation(
  material: EyeMaterialInstance,
  gazeRotation: Euler,
) {
  gazeRotationMatrix.makeRotationFromEuler(gazeRotation);
  material.uniforms.uInverseGazeRotation.value
    .setFromMatrix4(gazeRotationMatrix)
    .transpose();
}

type EyeOptions = EyeParams & {
  irisTexture: Texture | null;
};

export function createEyeMaterial({ irisTexture, ...eyeParams }: EyeOptions) {
  const material = new EyeMaterial();
  const { uniforms } = material;
  uniforms.uIrisTexture.value = irisTexture;

  if (eyeParams.pupilRadius !== undefined) {
    uniforms.uPupilRadius.value = eyeParams.pupilRadius;
  }
  if (eyeParams.highlightColor !== undefined) {
    uniforms.uHighlightColor.value.set(eyeParams.highlightColor);
  }
  if (eyeParams.highlightSize !== undefined) {
    uniforms.uHighlightSize.value = eyeParams.highlightSize;
  }

  return material;
}
