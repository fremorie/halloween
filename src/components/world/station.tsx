import type { ComponentType } from "react";
import { CylinderCollider, RigidBody } from "@react-three/rapier";

import type { Level, PumpkinVariant } from "@/types/level";
import type { LanternFaceParams } from "@/types/lantern";
import { JackOLanternCheerfulModel } from "@/components/models/jackOLanternCheerful/jackOLanternCheerfulModel";
import { JackOLanternHappyModel } from "@/components/models/jackOLanternHappy/jackOLanternHappyModel";
import { JackOLanternModel } from "@/components/models/jackOLantern/jackOLanternModel";
import { PedestalModel } from "@/components/models/pedestal/pedestalModel";
import {
  PEDESTAL_TOP_HEIGHT,
  PUMPKIN_DISTANCE_FROM_STATION_CENTRE,
  PUMPKIN_FORWARD_OFFSET,
  PUMPKIN_TURN_TOWARDS_PATH,
} from "@/settings/journeySettings";
import {
  PUMPKIN_ANGULAR_DAMPING,
  PUMPKIN_COLLIDER_HALF_HEIGHT,
  PUMPKIN_COLLIDER_RADIUS,
  PUMPKIN_LINEAR_DAMPING,
} from "@/settings/physicsSettings";
import { getStationOrigin, getStationSide } from "@/utils/journey";
import { EulerianPath } from "@/components/puzzles/eulerianPath";
import { useGameStore } from "@/store/gameStore";
import { PedestalCollider } from "@/components/models/pedestal/collider";

const PUMPKIN_MODEL_BY_VARIANT = {
  classic: JackOLanternModel,
  cheerful: JackOLanternCheerfulModel,
  happy: JackOLanternHappyModel,
} satisfies Record<
  PumpkinVariant,
  ComponentType<{ faceParams: LanternFaceParams }>
>;

type Props = {
  level: Level;
  stationIndex: number;
};

export function Station({ level, stationIndex }: Props) {
  const PumpkinModel = PUMPKIN_MODEL_BY_VARIANT[level.pumpkin.variant];
  const outerSide = getStationSide(stationIndex);
  const isActive = useGameStore(
    (state) =>
      state.mode === "solving" && state.currentStationIndex === stationIndex,
  );

  return (
    <group position={getStationOrigin(stationIndex)}>
      <RigidBody type="fixed" colliders={false}>
        <PedestalModel />
        <PedestalCollider />
      </RigidBody>
      <group position-y={PEDESTAL_TOP_HEIGHT}>
        <EulerianPath
          graph={level.graph}
          levelIndex={stationIndex}
          isActive={isActive}
        />
      </group>
      <RigidBody
        colliders={false}
        position={[
          outerSide * PUMPKIN_DISTANCE_FROM_STATION_CENTRE,
          0,
          PUMPKIN_FORWARD_OFFSET,
        ]}
        rotation={[0, -outerSide * PUMPKIN_TURN_TOWARDS_PATH, 0]}
        linearDamping={PUMPKIN_LINEAR_DAMPING}
        angularDamping={PUMPKIN_ANGULAR_DAMPING}
      >
        <PumpkinModel faceParams={level.pumpkin.faceParams} />
        <CylinderCollider
          args={[PUMPKIN_COLLIDER_HALF_HEIGHT, PUMPKIN_COLLIDER_RADIUS]}
          position={[0, PUMPKIN_COLLIDER_HALF_HEIGHT, 0]}
        />
      </RigidBody>
    </group>
  );
}
