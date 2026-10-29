import {
  BufferGeometry,
  MathUtils,
  Matrix4,
  Mesh,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

const CANOPY_LEAVES_COUNT = 400;
const CANOPY_LEAF_SIZE = 0.6;
const CANOPY_LEAF_SIZE_VARIATION = 0.3;
const CANOPY_LEAF_LIFT = 0.3;

const PLANE_FACING_DIRECTION = new Vector3(0, 0, 1);

export function createCanopyLeavesGeometry(canopyGeometry: BufferGeometry) {
  const canopySurfaceSampler = new MeshSurfaceSampler(
    new Mesh(canopyGeometry),
  ).build();

  const surfacePoint = new Vector3();
  const surfaceNormal = new Vector3();
  const leafOrientation = new Quaternion();
  const leafSpin = new Quaternion();
  const leafScale = new Vector3();
  const leafTransform = new Matrix4();

  const leafGeometries = Array.from({ length: CANOPY_LEAVES_COUNT }, () => {
    canopySurfaceSampler.sample(surfacePoint, surfaceNormal);
    surfaceNormal.normalize();
    surfacePoint.addScaledVector(surfaceNormal, CANOPY_LEAF_LIFT);

    leafSpin.setFromAxisAngle(
      PLANE_FACING_DIRECTION,
      Math.random() * Math.PI * 2,
    );
    leafOrientation
      .setFromUnitVectors(PLANE_FACING_DIRECTION, surfaceNormal)
      .multiply(leafSpin);

    leafScale.setScalar(
      CANOPY_LEAF_SIZE *
        MathUtils.randFloat(
          1 - CANOPY_LEAF_SIZE_VARIATION,
          1 + CANOPY_LEAF_SIZE_VARIATION,
        ),
    );

    leafTransform.compose(surfacePoint, leafOrientation, leafScale);

    return new PlaneGeometry().applyMatrix4(leafTransform);
  });

  return mergeGeometries(leafGeometries);
}
