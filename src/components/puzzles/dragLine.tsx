import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { type Mesh, Plane, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

import { createDragLineMaterial } from "@/components/materials/dragLineMaterial";
import { yarnUniforms } from "@/components/materials/yarnMaterial";
import { NODE_RADIUS } from "@/settings/graphSettings";
import {
  DRAG_LINE_DEPTH_BIAS,
  DRAG_LINE_MIN_LENGTH,
  YARN_STRAND_RADIAL_SEGMENTS,
} from "@/settings/puzzleSettings";
import type { Vec3 } from "@/types/math";
import { getBranchThickness } from "@/utils/graph";

const UP_DIRECTION = new Vector3(0, 1, 0);
const PUZZLE_PLANE_NORMAL = new Vector3(0, 0, 1);

type Props = {
  startPosition: Vec3;
  yarnColor: string;
};

export function DragLine({ startPosition, yarnColor }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [branchThickness] = useState(getBranchThickness);
  const dragLineMaterial = useMemo(
    () => createDragLineMaterial(DRAG_LINE_DEPTH_BIAS * branchThickness),
    [branchThickness],
  );
  const [scratch] = useState(() => ({
    plane: new Plane(),
    planeNormal: new Vector3(),
    startWorldPosition: new Vector3(),
    hitPoint: new Vector3(),
    lineStart: new Vector3(),
    lineEnd: new Vector3(),
    lineDirection: new Vector3(),
  }));

  useLayoutEffect(() => {
    dragLineMaterial.uniforms.uYarnColor.value.set(yarnColor);
  }, [dragLineMaterial, yarnColor]);

  useEffect(() => () => dragLineMaterial.dispose(), [dragLineMaterial]);

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
    planeNormal
      .copy(PUZZLE_PLANE_NORMAL)
      .transformDirection(puzzleGroup.matrixWorld);
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
    const strandRadius = yarnUniforms.uStrandRadius.value * branchThickness;
    mesh.scale.set(strandRadius, lineLength, strandRadius);
  });

  return (
    <mesh ref={meshRef} visible={false} material={dragLineMaterial}>
      <cylinderGeometry args={[1, 1, 1, YARN_STRAND_RADIAL_SEGMENTS]} />
    </mesh>
  );
}
