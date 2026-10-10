import * as THREE from "three";

import type { Vec3 } from "@/types/math";

const WORLD_UP_DIRECTION = new THREE.Vector3(0, 1, 0);
const WORLD_X_DIRECTION = new THREE.Vector3(1, 0, 0);
const NEARLY_VERTICAL_THRESHOLD = 0.99;

export function branchPlacement(from: Vec3, to: Vec3, tuckDistance: number) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const direction = end.clone().sub(start).normalize();

  start.addScaledVector(direction, tuckDistance);
  end.addScaledVector(direction, -tuckDistance);
  const length = start.distanceTo(end);

  const isBranchNearlyVertical =
    Math.abs(direction.y) > NEARLY_VERTICAL_THRESHOLD;

  const upReferenceDirection = isBranchNearlyVertical
    ? WORLD_X_DIRECTION
    : WORLD_UP_DIRECTION;
  const branchUpDirection = upReferenceDirection
    .clone()
    .projectOnPlane(direction)
    .normalize();
  const branchSideDirection = new THREE.Vector3().crossVectors(
    direction,
    branchUpDirection,
  );

  const stretchedPlacementMatrix = new THREE.Matrix4()
    .makeBasis(
      direction.clone().multiplyScalar(length),
      branchUpDirection,
      branchSideDirection,
    )
    .setPosition(start);

  const unstretchedRotation = new THREE.Quaternion().setFromRotationMatrix(
    new THREE.Matrix4().makeBasis(
      direction,
      branchUpDirection,
      branchSideDirection,
    ),
  );

  return { matrix: stretchedPlacementMatrix, turn: unstretchedRotation };
}
