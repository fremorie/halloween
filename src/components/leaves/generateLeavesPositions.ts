import { MathUtils } from "three";

type LeavesSpawnArea = {
  minimumX: number;
  maximumX: number;
  minimumZ: number;
  maximumZ: number;
  height: number;
};

export function generateLeavesPositions(
  leavesCount: number,
  spawnArea: LeavesSpawnArea,
) {
  const positions = new Float32Array(leavesCount * 3);
  const seeds = new Float32Array(leavesCount);
  const sizes = new Float32Array(leavesCount);

  for (let leafIndex = 0; leafIndex < leavesCount; leafIndex++) {
    const positionIndex = leafIndex * 3;

    positions[positionIndex] = MathUtils.lerp(
      spawnArea.minimumX,
      spawnArea.maximumX,
      Math.random(),
    );
    positions[positionIndex + 1] = Math.random() * spawnArea.height;
    positions[positionIndex + 2] = MathUtils.lerp(
      spawnArea.minimumZ,
      spawnArea.maximumZ,
      Math.random(),
    );

    seeds[leafIndex] = Math.random();
    sizes[leafIndex] = 0.6 + Math.random() * 0.8;
  }

  return { positions, seeds, sizes };
}
