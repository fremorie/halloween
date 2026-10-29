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
const CANOPY_LEAF_MAX_TILT_FROM_UP = MathUtils.degToRad(25);

const PLANE_FACING_DIRECTION = new Vector3(0, 0, 1);
const WORLD_UP = new Vector3(0, 1, 0);
const ORIGIN = new Vector3();

export function createCanopyLeavesGeometry(canopyGeometry: BufferGeometry) {
  const canopySurfaceSampler = new MeshSurfaceSampler(
    new Mesh(canopyGeometry),
  ).build();

  const surfacePoint = new Vector3();
  const surfaceNormal = new Vector3();
  const upFacingRotation = new Matrix4();
  const leafOrientation = new Quaternion();
  const leafTilt = new Quaternion();
  const leafScale = new Vector3();
  const leafTransform = new Matrix4();

  const leafGeometries = Array.from({ length: CANOPY_LEAVES_COUNT }, () => {
    canopySurfaceSampler.sample(surfacePoint, surfaceNormal);
    surfaceNormal.normalize();
    surfacePoint.addScaledVector(surfaceNormal, CANOPY_LEAF_LIFT);

    upFacingRotation.lookAt(surfaceNormal, ORIGIN, WORLD_UP);
    leafTilt.setFromAxisAngle(
      PLANE_FACING_DIRECTION,
      MathUtils.randFloatSpread(2 * CANOPY_LEAF_MAX_TILT_FROM_UP),
    );
    leafOrientation.setFromRotationMatrix(upFacingRotation).multiply(leafTilt);

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
