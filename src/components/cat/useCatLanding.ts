import {
  type RapierCollider,
  type RapierRigidBody,
  useRapier,
} from "@react-three/rapier";
import { useState } from "react";
import { type Object3D, type Quaternion, Vector3 } from "three";

import type { Vec3 } from "@/types/math";
import {
  CAT_COLLIDER_CENTER,
  CAT_COLLIDER_HALF_EXTENTS,
  CAT_LANDING_GAP,
  CAT_LANDING_SHOVE_SPEED,
  CAT_PAWS_CENTER,
  CAT_PAWS_HALF_EXTENTS,
  CAT_STANDABLE_SURFACE_MIN_UPWARD_NORMAL,
} from "@/settings/catSettings";

type RapierCuboid = InstanceType<
  ReturnType<typeof useRapier>["rapier"]["Cuboid"]
>;

const DOWNWARD_CAST_DIRECTION = { x: 0, y: -1, z: 0 };
const NEGLIGIBLE_SHOVE_OFFSET_SQUARED = 0.0001;

const isColliderOnDynamicBody = (collider: RapierCollider) =>
  collider.parent()?.isDynamic() ?? false;

const isColliderOnFixedBody = (collider: RapierCollider) =>
  collider.parent()?.isFixed() ?? false;

type DescendOntoWhatIsBelow = (
  catRoot: Object3D,
  desiredHeight: number,
) => number;

export function useCatLanding() {
  const { world, rapier } = useRapier();
  const [catBodyShape] = useState(
    () => new rapier.Cuboid(...CAT_COLLIDER_HALF_EXTENTS),
  );
  const [catPawsShape] = useState(
    () => new rapier.Cuboid(...CAT_PAWS_HALF_EXTENTS),
  );
  const [landingCastOrigin] = useState(() => new Vector3());
  const [shoveVelocity] = useState(() => new Vector3());

  const getLandingCastOrigin = (catRoot: Object3D, shapeCenter: Vec3) =>
    landingCastOrigin
      .set(...shapeCenter)
      .applyQuaternion(catRoot.quaternion)
      .add(catRoot.position);

  const castCatShapeDownward = (
    castOrigin: Vector3,
    catRotation: Quaternion,
    catShape: RapierCuboid,
    descentDistance: number,
    isColliderToLandOn: (collider: RapierCollider) => boolean,
  ) =>
    world.castShape(
      castOrigin,
      catRotation,
      DOWNWARD_CAST_DIRECTION,
      catShape,
      CAT_LANDING_GAP,
      descentDistance,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      isColliderToLandOn,
    );

  const arePawsInsideScenery = (
    pawsCastOrigin: Vector3,
    catRotation: Quaternion,
  ) =>
    world.intersectionWithShape(
      pawsCastOrigin,
      catRotation,
      catPawsShape,
      undefined,
      undefined,
      undefined,
      undefined,
      isColliderOnFixedBody,
    ) !== null;

  const shovePumpkinFromUnderCat = (
    pumpkinBody: RapierRigidBody,
    catBodyCenter: Vector3,
    catRotation: Quaternion,
  ) => {
    const pumpkinPosition = pumpkinBody.translation();

    shoveVelocity.set(
      pumpkinPosition.x - catBodyCenter.x,
      0,
      pumpkinPosition.z - catBodyCenter.z,
    );

    if (shoveVelocity.lengthSq() < NEGLIGIBLE_SHOVE_OFFSET_SQUARED) {
      shoveVelocity.set(1, 0, 0).applyQuaternion(catRotation);
    }

    shoveVelocity.normalize().multiplyScalar(CAT_LANDING_SHOVE_SPEED);

    pumpkinBody.setLinvel(
      {
        x: shoveVelocity.x,
        y: pumpkinBody.linvel().y,
        z: shoveVelocity.z,
      },
      true,
    );
  };

  const descendOntoScenery: DescendOntoWhatIsBelow = (
    catRoot,
    desiredHeight,
  ) => {
    const descentDistance = catRoot.position.y - desiredHeight;

    if (descentDistance <= 0) {
      return desiredHeight;
    }

    const pawsCastOrigin = getLandingCastOrigin(catRoot, CAT_PAWS_CENTER);

    if (arePawsInsideScenery(pawsCastOrigin, catRoot.quaternion)) {
      return desiredHeight;
    }

    const sceneryHit = castCatShapeDownward(
      pawsCastOrigin,
      catRoot.quaternion,
      catPawsShape,
      descentDistance,
      isColliderOnFixedBody,
    );

    if (
      !sceneryHit ||
      sceneryHit.normal1.y < CAT_STANDABLE_SURFACE_MIN_UPWARD_NORMAL
    ) {
      return desiredHeight;
    }

    return catRoot.position.y - sceneryHit.time_of_impact;
  };

  const descendShovingPumpkinsAside: DescendOntoWhatIsBelow = (
    catRoot,
    desiredHeight,
  ) => {
    const descentDistance = catRoot.position.y - desiredHeight;

    if (descentDistance <= 0) {
      return desiredHeight;
    }

    const bodyCastOrigin = getLandingCastOrigin(catRoot, CAT_COLLIDER_CENTER);

    const pumpkinHit = castCatShapeDownward(
      bodyCastOrigin,
      catRoot.quaternion,
      catBodyShape,
      descentDistance,
      isColliderOnDynamicBody,
    );
    const pumpkinBody = pumpkinHit?.collider.parent();

    if (!pumpkinHit || !pumpkinBody) {
      return desiredHeight;
    }

    shovePumpkinFromUnderCat(pumpkinBody, bodyCastOrigin, catRoot.quaternion);

    return catRoot.position.y - pumpkinHit.time_of_impact;
  };

  return { descendOntoScenery, descendShovingPumpkinsAside };
}
