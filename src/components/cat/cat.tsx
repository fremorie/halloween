import { useRef } from "react";
import { type Group } from "three";

import { CAT_START } from "@/settings/journeySettings";
import { useCatMovement } from "./useCatMovement";
import { CatRiggedModel } from "@/components/models/catRigged/CatModel";
import { useGameStore } from "@/store/gameStore";
import { HatModel } from "@/components/models/hat/hatModel";

export function Cat({ stationCount }: { stationCount: number }) {
  const rootRef = useRef<Group>(null);
  const walkPaceRef = useCatMovement(rootRef, stationCount);
  const isWearingHat = useGameStore((state) =>
    state.wornCostumePieces.includes("hat"),
  );

  return (
    <group ref={rootRef} position={CAT_START}>
      <CatRiggedModel walkPaceRef={walkPaceRef} />
      {isWearingHat && <HatModel />}
    </group>
  );
}
