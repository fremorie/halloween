import { MathUtils } from "three";

import { TREE_CANOPY_RADIUS, TREE_PLACEMENTS } from "@/settings/treeSettings";
import {
  LEAVES_COUNT,
  LEAVES_SPAWN_HEIGHT,
  LEAVES_STRAY_AREA,
  LEAVES_STRAY_FRACTION,
} from "./constants";

function pickPointUnderRandomTree() {
  const tree =
    TREE_PLACEMENTS[Math.floor(Math.random() * TREE_PLACEMENTS.length)];
  const angleAroundTrunk = Math.random() * Math.PI * 2;
  const distanceFromTrunk =
    Math.sqrt(Math.random()) * TREE_CANOPY_RADIUS * tree.scale;

  return {
    x: tree.position[0] + Math.cos(angleAroundTrunk) * distanceFromTrunk,
    z: tree.position[2] + Math.sin(angleAroundTrunk) * distanceFromTrunk,
  };
}

function pickPointAnywhereInStrayArea() {
  return {
    x: MathUtils.lerp(
      LEAVES_STRAY_AREA.minimumX,
      LEAVES_STRAY_AREA.maximumX,
      Math.random(),
    ),
    z: MathUtils.lerp(
      LEAVES_STRAY_AREA.minimumZ,
      LEAVES_STRAY_AREA.maximumZ,
      Math.random(),
    ),
  };
}

export function generateLeavesPositions() {
  const positions = new Float32Array(LEAVES_COUNT * 3);
  const seeds = new Float32Array(LEAVES_COUNT);
  const sizes = new Float32Array(LEAVES_COUNT);

  for (let leafIndex = 0; leafIndex < LEAVES_COUNT; leafIndex++) {
    const positionIndex = leafIndex * 3;

    const isStrayLeaf = Math.random() < LEAVES_STRAY_FRACTION;
    const { x, z } = isStrayLeaf
      ? pickPointAnywhereInStrayArea()
      : pickPointUnderRandomTree();

    positions[positionIndex] = x;
    positions[positionIndex + 1] = Math.random() * LEAVES_SPAWN_HEIGHT;
    positions[positionIndex + 2] = z;

    seeds[leafIndex] = Math.random();
    sizes[leafIndex] = 0.6 + Math.random() * 0.8;
  }

  return { positions, seeds, sizes };
}
