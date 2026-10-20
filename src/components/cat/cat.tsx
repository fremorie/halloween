import { useRef } from "react";
import { type Group } from "three";
import {
  CuboidCollider,
  type RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";

import { CAT_START } from "@/settings/journeySettings";
import { CatRiggedModel } from "@/components/models/catRigged/CatModel";
import { useGameStore } from "@/store/gameStore";
import {
  CAT_BLOCKING_HALF_EXTENTS,
  CAT_COLLIDER_CENTER,
  CAT_COLLIDER_HALF_EXTENTS,
} from "@/settings/catSettings";
import { useCatMovement } from "./useCatMovement";
import { useCatBodyFollow } from "./useCatBodyFollow";
import { useCatObstacleBlocking } from "./useCatObstacleBlocking";
import { CatHat } from "./catHat";
import { CatCape } from "./catCape";
import { CatWings } from "./catWings";

export function Cat({ stationCount }: { stationCount: number }) {
  const rootRef = useRef<Group>(null);
  const catBodyRef = useRef<RapierRigidBody>(null);

  const { blockingColliderRef, limitStepByObstacles } =
    useCatObstacleBlocking();
  const walkPaceRef = useCatMovement(
    rootRef,
    stationCount,
    limitStepByObstacles,
  );
  useCatBodyFollow(rootRef, catBodyRef);

  const isWearingHat = useGameStore((state) =>
    state.wornCostumePieces.includes("hat"),
  );
  const isWearingCape = useGameStore((state) =>
    state.wornCostumePieces.includes("cape"),
  );
  const isWearingWings = useGameStore((state) =>
    state.wornCostumePieces.includes("wings"),
  );

  return (
    <>
      <group ref={rootRef} position={CAT_START}>
        <CatRiggedModel walkPaceRef={walkPaceRef} />
        {isWearingHat && <CatHat />}
        {isWearingCape && <CatCape />}
        {isWearingWings && <CatWings />}
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
      <CuboidCollider
        ref={blockingColliderRef}
        sensor
        args={CAT_BLOCKING_HALF_EXTENTS}
      />
    </>
  );
}
