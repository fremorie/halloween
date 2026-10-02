import {
  useThree,
  useFrame,
  extend,
  type ThreeElement,
} from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import type { ShaderMaterial, Texture } from "three";
import { useRef } from "react";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const RainMaterial = shaderMaterial(
  {
    uTime: 0,
    uPerlinNoise: null as Texture | null,
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
  const perlinNoise = useTexture("/perlin.png");

  const { width, height } = useThree((state) => state.viewport);
  const rainMaterialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (rainMaterialRef.current) {
      rainMaterialRef.current.uniforms.uTime.value =
        state.clock.elapsedTime * 1000; // s -> ms
    }
  });

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry />
      <rainMaterial ref={rainMaterialRef} uPerlinNoise={perlinNoise} />
    </mesh>
  );
}
