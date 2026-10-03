import {
  useThree,
  useFrame,
  extend,
  type ThreeElement,
} from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import { Color, type ShaderMaterial, type Texture } from "three";
import { useRef } from "react";

import vertexShader from "@/shaders/rain/vertex.glsl";
import fragmentShader from "@/shaders/rain/fragment.glsl";
import { useRainControls } from "./useRainControls";

const RainMaterial = shaderMaterial(
  {
    uTime: 0,
    uPerlinNoise: null as Texture | null,
    uAspectRatio: 1,
    uSkyTopColor: new Color(0.035, 0.05, 0.085),
    uSkyBottomColor: new Color(0.008, 0.01, 0.018),
    uRainDropTintNear: new Color(0.85, 0.9, 1.0),
    uRainDropTintFar: new Color(0.75, 0.82, 0.95),
  },
  vertexShader,
  fragmentShader,
);

extend({ RainMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    rainMaterial: ThreeElement<typeof RainMaterial>;
  }
}

export function Rain() {
  const perlinNoise = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/perlin.png`,
  );
  const { skyTopColor, skyBottomColor, rainDropTintNear, rainDropTintFar } =
    useRainControls();

  const { width, height } = useThree((state) => state.viewport);
  const rainMaterialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (rainMaterialRef.current) {
      rainMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry />
      <rainMaterial
        ref={rainMaterialRef}
        uPerlinNoise={perlinNoise}
        uAspectRatio={width / height}
        uSkyTopColor={skyTopColor}
        uSkyBottomColor={skyBottomColor}
        uRainDropTintNear={rainDropTintNear}
        uRainDropTintFar={rainDropTintFar}
      />
    </mesh>
  );
}
