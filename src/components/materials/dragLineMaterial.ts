import { shaderMaterial } from "@react-three/drei";
import { Color, Uniform } from "three";

import fragmentShader from "@/shaders/dragLine/fragment.glsl";
import vertexShader from "@/shaders/dragLine/vertex.glsl";
import { yarnUniforms } from "./yarnMaterial";

const DragLineMaterial = shaderMaterial({}, vertexShader, fragmentShader);

export function createDragLineMaterial() {
  const material = new DragLineMaterial();

  Object.assign(material.uniforms, yarnUniforms, {
    uYarnColor: new Uniform(new Color()),
  });

  return material;
}
