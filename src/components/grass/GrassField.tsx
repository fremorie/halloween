import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";

import { createGrassMaterial, grassTimeUniform } from "./grassMaterial";
import { createGrassGeometry, GRASS_FIELD_CENTRE_Z } from "./utils";

const GRASS_SEGMENTS = 2;
const GRASS_BLADE_COUNT = 40000;

export function GrassField() {
  const grassGeometry = useMemo(
    () => createGrassGeometry(GRASS_SEGMENTS, GRASS_BLADE_COUNT),
    [],
  );
  const grassMaterial = useMemo(
    () => createGrassMaterial(GRASS_SEGMENTS, GRASS_BLADE_COUNT),
    [],
  );

  useFrame(({ clock }) => {
    grassTimeUniform.value = clock.elapsedTime;
  });

  return (
    <mesh
      geometry={grassGeometry}
      material={grassMaterial}
      position-z={GRASS_FIELD_CENTRE_Z}
    />
  );
}
