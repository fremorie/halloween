import { type RefObject, useRef, useState } from "react";
import { type Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { type RapierCollider, useRapier } from "@react-three/rapier";

import { CAT_WING_PUSH_MAX_SPEED } from "@/settings/catSettings";
import { useGameStore } from "@/store/gameStore";

const NEGLIGIBLE_PUSH_DIRECTION_SQUARED = 0.0001;

const isColliderOnDynamicBody = (collider: RapierCollider) =>
  collider.parent()?.isDynamic() ?? false;

const isCatWalkingWithWings = () => {
  const { mode, isCatFreeFlying, wornCostumePieces } = useGameStore.getState();

  return (
    mode !== "finale" && !isCatFreeFlying && wornCostumePieces.includes("wings")
  );
};

export function useCatWingsPumpkinPush(rootRef: RefObject<Group | null>) {
  const { world } = useRapier();
  const leftWingPushColliderRef = useRef<RapierCollider>(null);
  const rightWingPushColliderRef = useRef<RapierCollider>(null);
  const [pushDirection] = useState(() => new Vector3());

  const wingPushColliderRefs = [
    leftWingPushColliderRef,
    rightWingPushColliderRef,
  ];

  const pushPumpkinOutOfWing = (
    pumpkinCollider: RapierCollider,
    wingPushCollider: RapierCollider,
    catRoot: Group,
  ) => {
    const pumpkinBody = pumpkinCollider.parent();
    const wingContact = pumpkinCollider.contactShape(
      wingPushCollider.shape,
      catRoot.position,
      catRoot.quaternion,
      0,
    );

    if (!pumpkinBody || !wingContact || wingContact.distance >= 0) {
      return;
    }

    pushDirection.set(wingContact.normal2.x, 0, wingContact.normal2.z);

    if (pushDirection.lengthSq() < NEGLIGIBLE_PUSH_DIRECTION_SQUARED) {
      const pumpkinPosition = pumpkinBody.translation();
      pushDirection.set(
        pumpkinPosition.x - catRoot.position.x,
        0,
        pumpkinPosition.z - catRoot.position.z,
      );
    }

    const pushSpeed = Math.min(
      CAT_WING_PUSH_MAX_SPEED,
      -wingContact.distance / world.timestep,
    );
    pushDirection.normalize().multiplyScalar(pushSpeed);

    pumpkinBody.setLinvel(
      { x: pushDirection.x, y: pumpkinBody.linvel().y, z: pushDirection.z },
      true,
    );
  };

  const pushPumpkinsOutOfWing = (
    wingPushCollider: RapierCollider,
    catRoot: Group,
  ) => {
    wingPushCollider.setTranslation(catRoot.position);
    wingPushCollider.setRotation(catRoot.quaternion);

    const overlappingPumpkinColliders: RapierCollider[] = [];
    world.intersectionsWithShape(
      catRoot.position,
      catRoot.quaternion,
      wingPushCollider.shape,
      (pumpkinCollider) => {
        overlappingPumpkinColliders.push(pumpkinCollider);

        return true;
      },
      undefined,
      undefined,
      undefined,
      undefined,
      isColliderOnDynamicBody,
    );

    for (const pumpkinCollider of overlappingPumpkinColliders) {
      pushPumpkinOutOfWing(pumpkinCollider, wingPushCollider, catRoot);
    }
  };

  useFrame(() => {
    const catRoot = rootRef.current;
    if (!catRoot || !isCatWalkingWithWings()) {
      return;
    }

    for (const wingPushColliderRef of wingPushColliderRefs) {
      const wingPushCollider = wingPushColliderRef.current;

      if (wingPushCollider) {
        pushPumpkinsOutOfWing(wingPushCollider, catRoot);
      }
    }
  });

  return { leftWingPushColliderRef, rightWingPushColliderRef };
}
