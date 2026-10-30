import { shaderMaterial } from "@react-three/drei";
import { Texture, Vector2 } from "three";

import {
  TRAIL_AREA_SIZE,
  TRAIL_BRUSH_RADIUS,
} from "@/settings/grassTrailSettings";
import fragmentShader from "@/shaders/grassTrail/fragment.glsl";
import vertexShader from "@/shaders/grassTrail/vertex.glsl";

export const GrassTrailMaterial = shaderMaterial(
  {
    uPrevious: null as Texture | null,
    uCenter: new Vector2(),
    uPreviousCenter: new Vector2(),
    uAreaSize: TRAIL_AREA_SIZE,
    uPlayerPosition: new Vector2(),
    uPreviousPlayerPosition: new Vector2(),
    uBrushRadius: TRAIL_BRUSH_RADIUS,
    uStampStrength: 1,
    uDecay: 1,
  },
  vertexShader,
  fragmentShader,
);
