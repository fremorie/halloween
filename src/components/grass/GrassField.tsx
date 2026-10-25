import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { InstancedBufferAttribute, MeshBasicMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import revealFragmentShader from "@/shaders/revealDiffuse/fragment.glsl";

import { createGrassMaterial, grassTimeUniform } from "./grassMaterial";
import {
  readGrassMapPixels,
  scatterBladesInsideGrassMap,
} from "./grassMapScatter";
import { useGrassColorControls } from "./useGrassColorControls";
import { useGrassTrail } from "./useGrassTrail";
import { createGrassGeometry, GRASS_MAP_WORLD_SIZE } from "./utils";

const GRASS_MAP_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/GroundGrassMap.jpg`;

const GRASS_SEGMENTS = 3;
const GRASS_BLADE_COUNT = 10000;

export function GrassField() {
  const grassMapTexture = useTexture(GRASS_MAP_TEXTURE_PATH);

  const grassGeometry = useMemo(() => {
    const geometry = createGrassGeometry(GRASS_SEGMENTS, GRASS_BLADE_COUNT);
    const bladeWorldPositions = scatterBladesInsideGrassMap(
      readGrassMapPixels(grassMapTexture.image as HTMLImageElement),
      GRASS_BLADE_COUNT,
      GRASS_MAP_WORLD_SIZE,
    );
    geometry.setAttribute(
      "aBladeWorldPosition",
      new InstancedBufferAttribute(bladeWorldPositions, 2),
    );
    return geometry;
  }, [grassMapTexture]);
  const grassMaterial = useMemo(
    () => createGrassMaterial(GRASS_SEGMENTS, grassMapTexture),
    [grassMapTexture],
  );

  useGrassColorControls(grassMaterial);
  useGrassTrail();

  useFrame(({ clock }) => {
    grassTimeUniform.value = clock.elapsedTime;
  });

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} renderOrder={-1}>
        <planeGeometry args={[GRASS_MAP_WORLD_SIZE, GRASS_MAP_WORLD_SIZE]} />
        <CustomShaderMaterial
          baseMaterial={MeshBasicMaterial}
          fragmentShader={revealFragmentShader}
          color="#84661d"
          alphaMap={grassMapTexture}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={grassGeometry} material={grassMaterial} />
    </>
  );
}

useTexture.preload(GRASS_MAP_TEXTURE_PATH);
