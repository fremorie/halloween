import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

import vertexShader from "@/shaders/puzzleBackground/vertex.glsl";
import fragmentShader from "@/shaders/puzzleBackground/fragment.glsl";
import {
  PUZZLE_BACKGROUND_CENTRE_COLOR,
  PUZZLE_BACKGROUND_EDGE_COLOR,
  PUZZLE_BACKGROUND_PEDESTAL_FADE_HEIGHT,
} from "@/components/puzzleBackground/constants";
import { PEDESTAL_TOP_HEIGHT } from "@/settings/journeySettings";

const PuzzleBackgroundMaterial = shaderMaterial(
  {
    uOpacity: 0,
    uPedestalTopHeight: PEDESTAL_TOP_HEIGHT,
    uPedestalFadeHeight: PUZZLE_BACKGROUND_PEDESTAL_FADE_HEIGHT,
    uCentreColor: new Color(PUZZLE_BACKGROUND_CENTRE_COLOR),
    uEdgeColor: new Color(PUZZLE_BACKGROUND_EDGE_COLOR),
  },
  vertexShader,
  fragmentShader,
);

export function createPuzzleBackgroundMaterial() {
  const material = new PuzzleBackgroundMaterial();
  material.transparent = true;
  material.depthWrite = false;

  return material;
}
