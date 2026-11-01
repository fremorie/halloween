import { shaderMaterial } from "@react-three/drei";
import { Color, Uniform } from "three";

import fragmentShader from "@/shaders/dragLine/fragment.glsl";
import vertexShader from "@/shaders/dragLine/vertex.glsl";
import { DRAG_LINE_DEPTH_BIAS } from "@/settings/puzzleSettings";
import { getBranchThickness } from "@/utils/graph";
import { yarnUniforms } from "./yarnMaterial";

const DragLineMaterial = shaderMaterial({}, vertexShader, fragmentShader);

type DragLineMaterialInstance = InstanceType<typeof DragLineMaterial>;

let sharedDragLineMaterial: DragLineMaterialInstance | null = null;

function createDragLineMaterial(depthBias: number) {
  const material = new DragLineMaterial();

  Object.assign(material.uniforms, yarnUniforms, {
    uYarnColor: new Uniform(new Color()),
    uDepthBias: new Uniform(depthBias),
  });

  return material;
}

export function getSharedDragLineMaterial() {
  if (sharedDragLineMaterial === null) {
    sharedDragLineMaterial = createDragLineMaterial(
      DRAG_LINE_DEPTH_BIAS * getBranchThickness(),
    );
  }
  return sharedDragLineMaterial;
}
