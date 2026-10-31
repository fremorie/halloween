import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import {
  InstancedBufferAttribute,
  MeshBasicMaterial,
  SRGBColorSpace,
  Uniform,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import { revealUniforms } from "@/components/materials/revealUniforms";
import groundRevealFragmentShader from "@/shaders/groundReveal/fragment.glsl";
import groundRevealVertexShader from "@/shaders/groundReveal/vertex.glsl";

import { createGrassMaterial, grassTimeUniform } from "./grassMaterial";
import { GROUND_REVEAL_PATCH_MAP } from "./groundRevealPatchMap";
import {
  readGrassMapPixels,
  scatterBladesInsideGrassMap,
} from "./grassMapScatter";
import { useGrassColorControls } from "./useGrassColorControls";
import { useGrassTrail } from "./useGrassTrail";
import {
  createGrassGeometry,
  GRASS_MAP_WORLD_SIZE,
  GROUND_PLANE_CENTER_Z,
  GROUND_PLANE_LENGTH,
  GROUND_PLANE_WIDTH,
} from "./utils";
import { RENDER_ORDER } from "@/utils/renderOrder";

const GRASS_MAP_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/GroundGrassMap3.jpg`;
const GROUND_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/groundAndRoad4Faded.png`;
const GRASS_SEGMENTS = 3;
const GRASS_BLADE_COUNT = 20000;

export function GrassField() {
  const grassMapTexture = useTexture(GRASS_MAP_TEXTURE_PATH);
  const groundTexture = useTexture(
    GROUND_TEXTURE_PATH,
    (loadedGroundTexture) => {
      loadedGroundTexture.colorSpace = SRGBColorSpace;
    },
  );

  const groundRevealUniforms = useMemo(
    () => ({
      ...revealUniforms,
      uGrassMap: new Uniform(grassMapTexture),
      uGrassMapWorldSize: new Uniform(GRASS_MAP_WORLD_SIZE),
    }),
    [grassMapTexture],
  );

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
    () => createGrassMaterial(GRASS_SEGMENTS, grassMapTexture, groundTexture),
    [grassMapTexture, groundTexture],
  );

  useGrassColorControls(grassMaterial);
  useGrassTrail();

  useFrame(({ clock }) => {
    grassTimeUniform.value = clock.elapsedTime;
  });

  return (
    <>
      <mesh
        rotation-x={-Math.PI / 2}
        position-z={GROUND_PLANE_CENTER_Z}
        renderOrder={RENDER_ORDER.ground}
      >
        <planeGeometry args={[GROUND_PLANE_WIDTH, GROUND_PLANE_LENGTH]} />
        <CustomShaderMaterial
          baseMaterial={MeshBasicMaterial}
          vertexShader={groundRevealVertexShader}
          fragmentShader={groundRevealFragmentShader}
          patchMap={GROUND_REVEAL_PATCH_MAP}
          uniforms={groundRevealUniforms}
          map={groundTexture}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={grassGeometry} material={grassMaterial} />
    </>
  );
}

useTexture.preload(GRASS_MAP_TEXTURE_PATH);
useTexture.preload(GROUND_TEXTURE_PATH);
