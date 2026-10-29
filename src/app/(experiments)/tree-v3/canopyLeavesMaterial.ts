import { shaderMaterial } from "@react-three/drei";
import {
  Color,
  DoubleSide,
  type Texture,
  UniformsLib,
  UniformsUtils,
} from "three";

import { revealUniforms } from "@/components/materials/revealUniforms";
import fragmentShader from "@/shaders/canopyLeaves/fragment.glsl";
import vertexShader from "@/shaders/canopyLeaves/vertex.glsl";

const CanopyLeavesMaterial = shaderMaterial(
  {
    uTexture: null as Texture | null,
    uDarkColor: new Color(),
    uLightColor: new Color(),
  },
  vertexShader,
  fragmentShader,
);

export function createCanopyLeavesMaterial(leafTexture: Texture) {
  const material = new CanopyLeavesMaterial();

  Object.assign(material.uniforms, revealUniforms);
  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;
  material.side = DoubleSide;

  material.uniforms.uTexture.value = leafTexture;

  return material;
}
