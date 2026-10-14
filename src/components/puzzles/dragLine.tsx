import { type RefObject, useRef, useState } from "react";
import { type Group, type Mesh, Plane, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

import { NODE_RADIUS } from "@/settings/graphSettings";
import {
  DRAG_LINE_COLOR,
  DRAG_LINE_MIN_LENGTH,
  DRAG_LINE_RADIUS,
} from "@/settings/puzzleSettings";
import type { Graph } from "@/types/graph";

const UP_DIRECTION = new Vector3(0, 1, 0);

type Props = {
  groupRef: RefObject<Group | null>;
  graph: Graph;
  currentNodeId: number;
};

export function DragLine({ groupRef, graph, currentNodeId }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [scratch] = useState(() => ({
    plane: new Plane(),
    planeNormal: new Vector3(),
    currentNodeWorldPosition: new Vector3(),
    hitPoint: new Vector3(),
    dragPoint: new Vector3(),
    lineStart: new Vector3(),
    lineEnd: new Vector3(),
    lineDirection: new Vector3(),
  }));

  useFrame(({ camera, pointer, raycaster }) => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    const {
      plane,
      planeNormal,
      currentNodeWorldPosition,
      hitPoint,
      dragPoint,
      lineStart,
      lineEnd,
      lineDirection,
    } = scratch;

    currentNodeWorldPosition.set(...graph.nodes[currentNodeId].position);
    group.localToWorld(currentNodeWorldPosition);

    raycaster.setFromCamera(pointer, camera);
    camera.getWorldDirection(planeNormal).negate();
    plane.setFromNormalAndCoplanarPoint(planeNormal, currentNodeWorldPosition);
    if (raycaster.ray.intersectPlane(plane, hitPoint)) {
      dragPoint.copy(hitPoint);
    }

    group.worldToLocal(lineStart.copy(currentNodeWorldPosition));
    group.worldToLocal(lineEnd.copy(dragPoint));
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
