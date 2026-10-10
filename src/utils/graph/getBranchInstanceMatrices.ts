import * as THREE from "three";

import { Vec3 } from "@/types/math";
import { getEdgePlacement } from "@/utils/graph/getEdgePlacement";

export type BranchSegment = { from: Vec3; to: Vec3 };

export function getBranchInstanceMatrices(
  branchSegments: BranchSegment[],
  tuckDistance: number,
  leafNodes: THREE.Mesh[],
) {
  const stemMatrices: THREE.Matrix4[] = [];
  const leafMatrices: THREE.Matrix4[] = [];

  for (const { from, to } of branchSegments) {
    const { matrix, turn } = getEdgePlacement(from, to, tuckDistance);

    stemMatrices.push(matrix);

    for (const leafNode of leafNodes) {
      const placedLeafPosition = leafNode.position.clone().applyMatrix4(matrix);
      const placedLeafRotation = turn.clone().multiply(leafNode.quaternion);

      const leafMatrix = new THREE.Matrix4().compose(
        placedLeafPosition,
        placedLeafRotation,
        leafNode.scale,
      );

      leafMatrices.push(leafMatrix);
    }
  }

  return { stemMatrices, leafMatrices };
}
