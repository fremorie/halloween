import { useRef, useState } from "react";
import { type Mesh, Plane, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

import { NODE_RADIUS } from "@/settings/graphSettings";
import {
  DRAG_LINE_COLOR,
  DRAG_LINE_MIN_LENGTH,
  DRAG_LINE_RADIUS,
} from "@/settings/puzzleSettings";
import type { Vec3 } from "@/types/math";

const UP_DIRECTION = new Vector3(0, 1, 0);

type Props = {
  startPosition: Vec3;
};

export function DragLine({ startPosition }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [scratch] = useState(() => ({
    plane: new Plane(),
    planeNormal: new Vector3(),
    startWorldPosition: new Vector3(),
    hitPoint: new Vector3(),
    lineStart: new Vector3(),
    lineEnd: new Vector3(),
    lineDirection: new Vector3(),
  }));

  useFrame(({ camera, pointer, raycaster }) => {
    const mesh = meshRef.current;
    const puzzleGroup = mesh?.parent;
    if (!mesh || !puzzleGroup) return;

    const {
      plane,
      planeNormal,
      startWorldPosition,
      hitPoint,
      lineStart,
      lineEnd,
      lineDirection,
    } = scratch;

    startWorldPosition.set(...startPosition);
    puzzleGroup.localToWorld(startWorldPosition);

    raycaster.setFromCamera(pointer, camera);
    camera.getWorldDirection(planeNormal);
    plane.setFromNormalAndCoplanarPoint(planeNormal, startWorldPosition);
    raycaster.ray.intersectPlane(plane, hitPoint);

    puzzleGroup.worldToLocal(lineStart.copy(startWorldPosition));
    puzzleGroup.worldToLocal(lineEnd.copy(hitPoint));
    lineDirection.copy(lineEnd).sub(lineStart);
    const lineLength = lineDirection.length() - NODE_RADIUS;
    mesh.visible = lineLength > DRAG_LINE_MIN_LENGTH;
    if (!mesh.visible) return;

    lineDirection.normalize();
    lineStart.addScaledVector(lineDirection, NODE_RADIUS);
    mesh.position
      .copy(lineStart)
      .addScaledVector(lineDirection, lineLength / 2);
    mesh.quaternion.setFromUnitVectors(UP_DIRECTION, lineDirection);
    mesh.scale.set(1, lineLength, 1);
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <cylinderGeometry args={[DRAG_LINE_RADIUS, DRAG_LINE_RADIUS, 1, 8]} />
      <meshBasicMaterial color={DRAG_LINE_COLOR} />
    </mesh>
  );
}
