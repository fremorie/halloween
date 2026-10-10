import * as THREE from "three";

import type { Vec3 } from "@/types/math";

const WORLD_UP_DIRECTION = new THREE.Vector3(0, 1, 0);
const WORLD_X_DIRECTION = new THREE.Vector3(1, 0, 0);
const NEARLY_VERTICAL_THRESHOLD = 0.99;

export function getEdgePlacement(from: Vec3, to: Vec3, tuckDistance: number) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const direction = end.clone().sub(start).normalize();

  start.addScaledVector(direction, tuckDistance);
  end.addScaledVector(direction, -tuckDistance);
  const length = start.distanceTo(end);

  const isEdgeNearlyVertical =
    Math.abs(direction.y) > NEARLY_VERTICAL_THRESHOLD;

  const upReferenceDirection = isEdgeNearlyVertical
    ? WORLD_X_DIRECTION
    : WORLD_UP_DIRECTION;
  const edgeUpDirection = upReferenceDirection
    .clone()
    .projectOnPlane(direction)
    .normalize();
  const edgeSideDirection = new THREE.Vector3().crossVectors(
    direction,
    edgeUpDirection,
  );

  const stretchedPlacementMatrix = new THREE.Matrix4()
    .makeBasis(
      direction.clone().multiplyScalar(length),
      edgeUpDirection,
      edgeSideDirection,
    )
    .setPosition(start);

  const unstretchedRotation = new THREE.Quaternion().setFromRotationMatrix(
    new THREE.Matrix4().makeBasis(
      direction,
      edgeUpDirection,
      edgeSideDirection,
    ),
  );

  return { matrix: stretchedPlacementMatrix, turn: unstretchedRotation };
}
