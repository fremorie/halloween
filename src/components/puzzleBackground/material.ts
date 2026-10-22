import { shaderMaterial } from "@react-three/drei";

import vertexShader from "@/shaders/puzzleBackground/vertex.glsl";
import fragmentShader from "@/shaders/puzzleBackground/fragment.glsl";

const PuzzleBackgroundMaterial = shaderMaterial(
  { uOpacity: 0 },
  vertexShader,
  fragmentShader,
);

export function createPuzzleBackgroundMaterial() {
  const material = new PuzzleBackgroundMaterial();
  material.transparent = true;
  material.depthWrite = false;

  return material;
}
