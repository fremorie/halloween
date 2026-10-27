import { shaderMaterial } from "@react-three/drei";
import { Color, Uniform, UniformsLib, UniformsUtils } from "three";

import fragmentShader from "@/shaders/yarn/fragment.glsl";
import vertexShader from "@/shaders/yarn/vertex.glsl";

export const yarnColorUniform = new Uniform(new Color("red"));

const YarnMaterial = shaderMaterial(
  {
    uYarnColor: new Color(),
  },
  vertexShader,
  fragmentShader,
);

export function createYarnMaterial() {
  const material = new YarnMaterial();

  Object.assign(material.uniforms, UniformsUtils.clone(UniformsLib.fog));
  material.fog = true;

  material.uniforms.uYarnColor = yarnColorUniform;

  return material;
}
