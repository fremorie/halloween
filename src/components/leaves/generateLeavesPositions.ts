import { MathUtils } from "three";

import { LEAVES_SPAWN_HEIGHT } from "./constants";

export function generateLeavesPositions(
  count: number = 5000,
  minimumX: number = -20,
  maximumX: number = 20,
  nearestZ: number = -50,
  farthestZ: number = 20,
  spawnHeight: number = LEAVES_SPAWN_HEIGHT,
) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    positions[i3] = MathUtils.lerp(minimumX, maximumX, Math.random());
    positions[i3 + 1] = Math.random() * spawnHeight;
    positions[i3 + 2] = MathUtils.lerp(nearestZ, farthestZ, Math.random());

    seeds[i] = Math.random();

    sizes[i] = 0.6 + Math.random() * 0.8;
  }

  return { positions, seeds, sizes };
}
