import {
  BufferAttribute,
  BufferGeometry,
  Euler,
  MathUtils,
  Matrix4,
  Mesh,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

const CANOPY_LEAVES_COUNT = 1200;
const CANOPY_LEAF_MIN_SIZE = 0.25;
const CANOPY_LEAF_MAX_SIZE = 1.1;
const CANOPY_LEAF_LIFT = 0.02;
const CANOPY_LEAF_MAX_TILT_OFF_SURFACE = MathUtils.degToRad(35);
const CANOPY_UNDERSIDE_LEAF_TILT_SCALE = 0.25;
const CANOPY_LEAF_MAX_TILT_FROM_UP = MathUtils.degToRad(25);

const WORLD_UP = new Vector3(0, 1, 0);
const ORIGIN = new Vector3();

export function createCanopyLeavesGeometry(canopyGeometry: BufferGeometry) {
  const canopySurfaceSampler = new MeshSurfaceSampler(
    new Mesh(canopyGeometry),
  ).build();

  const surfacePoint = new Vector3();
  const surfaceNormal = new Vector3();
  const outwardFacingRotation = new Matrix4();
  const leafRuffleAngles = new Euler();
  const leafRuffle = new Quaternion();
  const leafOrientation = new Quaternion();
  const leafScale = new Vector3();
  const leafTransform = new Matrix4();

  const leafGeometries = Array.from({ length: CANOPY_LEAVES_COUNT }, () => {
    canopySurfaceSampler.sample(surfacePoint, surfaceNormal);
    surfaceNormal.normalize();
    surfacePoint.addScaledVector(surfaceNormal, CANOPY_LEAF_LIFT);

    const maxTiltOffSurface =
      CANOPY_LEAF_MAX_TILT_OFF_SURFACE *
      MathUtils.mapLinear(
        surfaceNormal.y,
        -1,
        1,
        CANOPY_UNDERSIDE_LEAF_TILT_SCALE,
        1,
      );

    outwardFacingRotation.lookAt(surfaceNormal, ORIGIN, WORLD_UP);
    leafRuffleAngles.set(
      MathUtils.randFloatSpread(2 * maxTiltOffSurface),
      MathUtils.randFloatSpread(2 * maxTiltOffSurface),
      MathUtils.randFloatSpread(2 * CANOPY_LEAF_MAX_TILT_FROM_UP),
    );
    leafRuffle.setFromEuler(leafRuffleAngles);
    leafOrientation
      .setFromRotationMatrix(outwardFacingRotation)
      .multiply(leafRuffle);

    leafScale.setScalar(
      MathUtils.randFloat(CANOPY_LEAF_MIN_SIZE, CANOPY_LEAF_MAX_SIZE),
    );

    leafTransform.compose(surfacePoint, leafOrientation, leafScale);

    const leafGeometry = new PlaneGeometry()
      .translate(0, 0.5, 0)
      .applyMatrix4(leafTransform);
    const leafSeed = Math.random();
    leafGeometry.setAttribute(
      "aSeed",
      new BufferAttribute(new Float32Array(4).fill(leafSeed), 1),
    );

    return leafGeometry;
  });

  return mergeGeometries(leafGeometries);
}
