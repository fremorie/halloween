import { type RapierCollider, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { type Object3D, Vector3 } from "three";

import {
  CAT_BLOCKING_CENTER,
  CAT_CONTROLLER_OFFSET,
} from "@/settings/catSettings";

type CharacterController = ReturnType<
  ReturnType<typeof useRapier>["world"]["createCharacterController"]
>;

export type LimitStepByObstacles = (
  catRoot: Object3D,
  walkStep: Vector3,
) => Vector3;

export function useCatObstacleBlocking() {
  const { world, rapier } = useRapier();
  const blockingColliderRef = useRef<RapierCollider>(null);
  const characterControllerRef = useRef<CharacterController>(null);
  const [blockingCenter] = useState(() => new Vector3());

  useEffect(() => {
    const characterController = world.createCharacterController(
      CAT_CONTROLLER_OFFSET,
    );
    characterController.setMaxSlopeClimbAngle(0);
    characterControllerRef.current = characterController;

    return () => {
      characterControllerRef.current = null;
      world.removeCharacterController(characterController);
    };
  }, [world]);

  const limitStepByObstacles: LimitStepByObstacles = (catRoot, walkStep) => {
    const characterController = characterControllerRef.current;
    const blockingCollider = blockingColliderRef.current;
    if (!characterController || !blockingCollider) {
      return walkStep;
    }

    blockingCenter
      .set(...CAT_BLOCKING_CENTER)
      .applyQuaternion(catRoot.quaternion)
      .add(catRoot.position);

    blockingCollider.setTranslation(blockingCenter);
    blockingCollider.setRotation(catRoot.quaternion);

    characterController.computeColliderMovement(
      blockingCollider,
      walkStep,
      rapier.QueryFilterFlags.EXCLUDE_DYNAMIC |
        rapier.QueryFilterFlags.EXCLUDE_KINEMATIC,
    );
    const allowedStep = characterController.computedMovement();

    return walkStep.set(allowedStep.x, 0, allowedStep.z);
  };

  return { blockingColliderRef, limitStepByObstacles };
}
