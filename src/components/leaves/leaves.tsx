import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { BufferAttribute, BufferGeometry, LinearFilter } from "three";

import { LEAVES_TEXTURE_PATH, LEAVES_TIME_SCALE } from "./constants";
import {
  createFallingLeavesMaterial,
  fallingLeavesTimeUniform,
} from "./fallingLeavesMaterial";
import { generateLeavesPositions } from "./generateLeavesPositions";
import { useFallingLeavesColorControls } from "./useFallingLeavesColorControls";
import { RENDER_ORDER } from "@/utils/renderOrder";

export function Leaves() {
  const leafTexture = useTexture(LEAVES_TEXTURE_PATH, (loadedLeafTexture) => {
    loadedLeafTexture.minFilter = LinearFilter;
    loadedLeafTexture.generateMipmaps = false;
  });

  const leavesGeometry = useMemo(() => {
    const { positions, seeds, sizes, wrapCenters } = generateLeavesPositions();
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
    geometry.setAttribute("aWrapCenter", new BufferAttribute(wrapCenters, 2));
    return geometry;
  }, []);

  const fallingLeavesMaterial = useMemo(
    () => createFallingLeavesMaterial(leafTexture),
    [leafTexture],
  );

  useFallingLeavesColorControls(fallingLeavesMaterial);

  useFrame((_, delta) => {
    fallingLeavesTimeUniform.value += delta * LEAVES_TIME_SCALE;
  });

  return (
    <points
      renderOrder={RENDER_ORDER.leaves}
      geometry={leavesGeometry}
      material={fallingLeavesMaterial}
    />
  );
}

useTexture.preload(LEAVES_TEXTURE_PATH);
