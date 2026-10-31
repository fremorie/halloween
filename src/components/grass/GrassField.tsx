import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import {InstancedBufferAttribute, MeshStandardMaterial} from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import { REVEAL_PATCH_MAP } from "@/components/materials/revealPatchMap";
import { revealUniforms } from "@/components/materials/revealUniforms";
import revealFragmentShader from "@/shaders/revealOutput/fragment.glsl";
import revealVertexShader from "@/shaders/revealOutput/vertex.glsl";

import { createGrassMaterial, grassTimeUniform } from "./grassMaterial";
import {
  readGrassMapPixels,
  scatterBladesInsideGrassMap,
} from "./grassMapScatter";
import { useGrassColorControls } from "./useGrassColorControls";
import { useGrassTrail } from "./useGrassTrail";
import { createGrassGeometry, GRASS_MAP_WORLD_SIZE } from "./utils";
import { RENDER_ORDER } from "@/utils/renderOrder";

const GRASS_MAP_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/GroundGrassMap2.jpg`;
const GROUND_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/roadNarrowWithGrassPlacement.png`;
const GROUND_NORMAL_MAP_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/RoadNormalMap.png`

const GRASS_SEGMENTS = 3;
const GRASS_BLADE_COUNT = 10000;

export function GrassField() {
  const grassMapTexture = useTexture(GRASS_MAP_TEXTURE_PATH);
  const groundTexture = useTexture(GROUND_TEXTURE_PATH);
  const groundNormalMap = useTexture(GROUND_NORMAL_MAP_PATH);

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
      <mesh rotation-x={-Math.PI / 2} position-z={-12.554} renderOrder={RENDER_ORDER.ground}>
        <planeGeometry args={[43.51, 88.81]} />
        <CustomShaderMaterial
          baseMaterial={MeshStandardMaterial}
          vertexShader={revealVertexShader}
          fragmentShader={revealFragmentShader}
          patchMap={REVEAL_PATCH_MAP}
          uniforms={revealUniforms}
          map={groundTexture}
          normalMap={groundNormalMap}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={grassGeometry} material={grassMaterial} />
    </>
  );
}

useTexture.preload(GRASS_MAP_TEXTURE_PATH);
useTexture.preload(GROUND_NORMAL_MAP_PATH);
useTexture.preload(GROUND_TEXTURE_PATH);
