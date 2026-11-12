import { useRef } from "react";
import { type Group } from "three";
import {
  ConvexHullCollider,
  CuboidCollider,
  CylinderCollider,
  type RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";

import { CAT_START, CAT_START_HEADING } from "@/settings/journeySettings";
import { INTRO_DILATED_PUPIL_BEATS } from "@/settings/introSettings";
import { CatRiggedModel } from "@/components/models/catRigged/CatModel";
import { useGameStore } from "@/store/gameStore";
import {
  CAT_BLOCKING_HALF_HEIGHT,
  CAT_BLOCKING_RADIUS,
  CAT_COLLIDER_CENTER,
  CAT_COLLIDER_HALF_EXTENTS,
} from "@/settings/catSettings";
import { useWingColliderGLTF } from "@/components/models/wingCollider/useWingColliderGLTF";
import { useCatMovement } from "./useCatMovement";
import { useCatBodyFollow } from "./useCatBodyFollow";
import { useCatObstacleBlocking } from "./useCatObstacleBlocking";
import { useFootsteps } from "./useFootsteps";
import { CatHat } from "./catHat";
import { CatCape } from "./catCape";
import { CatWings } from "./catWings";
import { useCatFlight } from "./useCatFlight";
import { useIsCatFlying } from "./useIsCatFlying";
import { useCatFlightBob } from "./useCatFlightBob";
import { useCatFreeFlight } from "./useCatFreeFlight";
import { useCatWingsPumpkinPush } from "./useCatWingsPumpkinPush";
import { FINALE_DILATED_PUPIL_BEATS } from "@/settings/finaleSettings";

export function Cat({ stationCount }: { stationCount: number }) {
  const rootRef = useRef<Group>(null);
  const bobGroupRef = useRef<Group>(null);
  const catBodyRef = useRef<RapierRigidBody>(null);

  const isFlying = useIsCatFlying();
  const wingColliderGLTF = useWingColliderGLTF();

  const {
    blockingColliderRef,
    leftWingColliderRef,
    rightWingColliderRef,
    limitStepByObstacles,
    isTurnBlockedByWings,
  } = useCatObstacleBlocking();
  useCatFreeFlight(rootRef);
  const walkPaceRef = useCatMovement(
    rootRef,
    stationCount,
    limitStepByObstacles,
    isTurnBlockedByWings,
  );
  const { leftWingPushColliderRef, rightWingPushColliderRef } =
    useCatWingsPumpkinPush(rootRef);
  useCatBodyFollow(rootRef, catBodyRef);
  useCatFlight(rootRef);
  useCatFlightBob(rootRef, bobGroupRef, isFlying);
  useFootsteps(walkPaceRef);

  const isPupilDilated = useGameStore(
    (state) =>
      (state.introBeat !== null &&
        INTRO_DILATED_PUPIL_BEATS.includes(state.introBeat)) ||
      (state.finaleBeat !== null &&
        FINALE_DILATED_PUPIL_BEATS.includes(state.finaleBeat)),
  );
  const isWearingHat = useGameStore((state) =>
    state.wornCostumePieces.includes("hat"),
  );
  const isWearingCape = useGameStore((state) =>
    state.wornCostumePieces.includes("cape"),
  );
  const isWearingWings = useGameStore((state) =>
    state.wornCostumePieces.includes("wings"),
  );
  const eyeGlancesEnabled = useGameStore((state) => state.mode !== "intro");

  return (
    <>
      <group ref={rootRef} position={CAT_START} rotation-y={CAT_START_HEADING}>
        <group ref={bobGroupRef}>
          <CatRiggedModel
            walkPaceRef={walkPaceRef}
            isPupilDilated={isPupilDilated}
            isFlying={isFlying}
            eyeGlancesEnabled={eyeGlancesEnabled}
          />
          <CatHat isWorn={isWearingHat} />
          <CatCape isWorn={isWearingCape} />
          <CatWings isWorn={isWearingWings} />
        </group>
      </group>

      <RigidBody
        ref={catBodyRef}
        type="kinematicPosition"
        colliders={false}
        position={CAT_START}
      >
        <CuboidCollider
          args={CAT_COLLIDER_HALF_EXTENTS}
          position={CAT_COLLIDER_CENTER}
        />
      </RigidBody>
      <CylinderCollider
        ref={blockingColliderRef}
        sensor
        args={[CAT_BLOCKING_HALF_HEIGHT, CAT_BLOCKING_RADIUS]}
      />
      <ConvexHullCollider
        ref={leftWingColliderRef}
        sensor
        args={[
          wingColliderGLTF.nodes.LeftWingCollider.geometry.attributes.position
            .array,
        ]}
      />
      <ConvexHullCollider
        ref={rightWingColliderRef}
        sensor
        args={[
          wingColliderGLTF.nodes.RightWingCollider.geometry.attributes.position
            .array,
        ]}
      />
      <ConvexHullCollider
        ref={leftWingPushColliderRef}
        sensor
        args={[
          wingColliderGLTF.nodes.LeftWingPushCollider.geometry.attributes
            .position.array,
        ]}
      />
      <ConvexHullCollider
        ref={rightWingPushColliderRef}
        sensor
        args={[
          wingColliderGLTF.nodes.RightWingPushCollider.geometry.attributes
            .position.array,
        ]}
      />
    </>
  );
}
