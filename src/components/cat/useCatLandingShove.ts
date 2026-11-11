import {
  type RapierCollider,
  type RapierRigidBody,
  useRapier,
} from "@react-three/rapier";
import { useState } from "react";
import { type Object3D, Vector3 } from "three";

import {
  CAT_COLLIDER_CENTER,
  CAT_COLLIDER_HALF_EXTENTS,
  CAT_LANDING_GAP_ABOVE_PUMPKIN,
  CAT_LANDING_SHOVE_SPEED,
} from "@/settings/catSettings";

const DOWNWARD_CAST_DIRECTION = { x: 0, y: -1, z: 0 };
const NEGLIGIBLE_SHOVE_OFFSET_SQUARED = 0.0001;

const isColliderOnDynamicBody = (collider: RapierCollider) =>
  collider.parent()?.isDynamic() ?? false;

export type DescendShovingPumpkinsAside = (
  catRoot: Object3D,
  desiredHeight: number,
) => number;

export function useCatLandingShove() {
  const { world, rapier } = useRapier();
  const [catLandingShape] = useState(
    () => new rapier.Cuboid(...CAT_COLLIDER_HALF_EXTENTS),
  );
  const [landingCastOrigin] = useState(() => new Vector3());
  const [shoveVelocity] = useState(() => new Vector3());

  const shovePumpkinFromUnderCat = (
    pumpkinBody: RapierRigidBody,
    catRoot: Object3D,
  ) => {
    const pumpkinPosition = pumpkinBody.translation();

    shoveVelocity.set(
      pumpkinPosition.x - landingCastOrigin.x,
      0,
      pumpkinPosition.z - landingCastOrigin.z,
    );

    if (shoveVelocity.lengthSq() < NEGLIGIBLE_SHOVE_OFFSET_SQUARED) {
      shoveVelocity.set(1, 0, 0).applyQuaternion(catRoot.quaternion);
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

  const descendShovingPumpkinsAside: DescendShovingPumpkinsAside = (
    catRoot,
    desiredHeight,
  ) => {
    const descentDistance = catRoot.position.y - desiredHeight;

    if (descentDistance <= 0) {
      return desiredHeight;
    }

    landingCastOrigin
      .set(...CAT_COLLIDER_CENTER)
      .applyQuaternion(catRoot.quaternion)
      .add(catRoot.position);

    const pumpkinHit = world.castShape(
      landingCastOrigin,
      catRoot.quaternion,
      DOWNWARD_CAST_DIRECTION,
      catLandingShape,
      CAT_LANDING_GAP_ABOVE_PUMPKIN,
      descentDistance,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      isColliderOnDynamicBody,
    );
    const pumpkinBody = pumpkinHit?.collider.parent();

    if (!pumpkinHit || !pumpkinBody) {
      return desiredHeight;
    }

    shovePumpkinFromUnderCat(pumpkinBody, catRoot);

    return catRoot.position.y - pumpkinHit.time_of_impact;
  };

  return descendShovingPumpkinsAside;
}
