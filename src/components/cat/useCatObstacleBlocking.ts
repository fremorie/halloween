import { type RapierCollider, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { type Object3D, Quaternion, Vector3 } from "three";

import {
  CAT_BLOCKING_CENTER,
  CAT_CONTROLLER_OFFSET,
  CAT_OBSTACLE_SWEEP_GAP,
} from "@/settings/catSettings";
import { useGameStore } from "@/store/gameStore";

type CharacterController = ReturnType<
  ReturnType<typeof useRapier>["world"]["createCharacterController"]
>;

export type LimitStepByObstacles = (
  catRoot: Object3D,
  walkStep: Vector3,
) => Vector3;

export type IsTurnBlockedByWings = (
  catRoot: Object3D,
  turnedHeading: number,
) => boolean;

const UP_AXIS = new Vector3(0, 1, 0);

const isCatWearingWings = () =>
  useGameStore.getState().wornCostumePieces.includes("wings");

export function useCatObstacleBlocking() {
  const { world, rapier } = useRapier();
  const blockingColliderRef = useRef<RapierCollider>(null);
  const leftWingColliderRef = useRef<RapierCollider>(null);
  const rightWingColliderRef = useRef<RapierCollider>(null);
  const characterControllerRef = useRef<CharacterController>(null);
  const [blockingCenter] = useState(() => new Vector3());
  const [turnedRotation] = useState(() => new Quaternion());

  const wingColliderRefs = [leftWingColliderRef, rightWingColliderRef];
  const obstacleFilterFlags =
    rapier.QueryFilterFlags.EXCLUDE_DYNAMIC |
    rapier.QueryFilterFlags.EXCLUDE_KINEMATIC |
    rapier.QueryFilterFlags.EXCLUDE_SENSORS;

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

  const limitStepByCollider = (
    characterController: CharacterController,
    movingCollider: RapierCollider,
    walkStep: Vector3,
  ) => {
    characterController.computeColliderMovement(
      movingCollider,
      walkStep,
      obstacleFilterFlags,
    );
    const allowedStep = characterController.computedMovement();
    walkStep.set(allowedStep.x, 0, allowedStep.z);

    if (walkStep.lengthSq() === 0) {
      return walkStep;
    }

    const obstacleHitAlongFlatStep = world.castShape(
      movingCollider.translation(),
      movingCollider.rotation(),
      walkStep,
      movingCollider.shape,
      CAT_OBSTACLE_SWEEP_GAP,
      1,
      false,
      obstacleFilterFlags,
    );

    if (obstacleHitAlongFlatStep) {
      walkStep.multiplyScalar(obstacleHitAlongFlatStep.time_of_impact);
    }

    return walkStep;
  };

  const limitStepByObstacles: LimitStepByObstacles = (catRoot, walkStep) => {
    const characterController = characterControllerRef.current;
    const blockingCollider = blockingColliderRef.current;
    if (!characterController || !blockingCollider) {
      return walkStep;
    }

    if (isCatWearingWings()) {
      for (const wingColliderRef of wingColliderRefs) {
        const wingCollider = wingColliderRef.current;
        if (!wingCollider) {
          continue;
        }

        wingCollider.setTranslation(catRoot.position);
        wingCollider.setRotation(catRoot.quaternion);
        limitStepByCollider(characterController, wingCollider, walkStep);
      }
    }

    blockingCenter.set(...CAT_BLOCKING_CENTER).add(catRoot.position);
    blockingCollider.setTranslation(blockingCenter);

    return limitStepByCollider(characterController, blockingCollider, walkStep);
  };

  const areWingsInsideObstacle = (catRoot: Object3D, catRotation: Quaternion) =>
    wingColliderRefs.some((wingColliderRef) => {
      const wingCollider = wingColliderRef.current;

      return (
        wingCollider !== null &&
        world.intersectionWithShape(
          catRoot.position,
          catRotation,
          wingCollider.shape,
          obstacleFilterFlags,
        ) !== null
      );
    });

  const isTurnBlockedByWings: IsTurnBlockedByWings = (
    catRoot,
    turnedHeading,
  ) => {
    if (!isCatWearingWings()) {
      return false;
    }

    turnedRotation.setFromAxisAngle(UP_AXIS, turnedHeading);

    return (
      areWingsInsideObstacle(catRoot, turnedRotation) &&
      !areWingsInsideObstacle(catRoot, catRoot.quaternion)
    );
  };

  return {
    blockingColliderRef,
    leftWingColliderRef,
    rightWingColliderRef,
    limitStepByObstacles,
    isTurnBlockedByWings,
  };
}
