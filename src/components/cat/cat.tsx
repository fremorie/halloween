import { useRef } from "react";
import { type Group } from "three";

import { CAT_START } from "@/settings/journeySettings";
import { useCatMovement } from "./useCatMovement";
import { CatRiggedModel } from "@/components/models/catRigged/CatModel";
import { CAT_MODEL_SCALE } from "@/settings/catSettings";

export function Cat({ stationCount }: { stationCount: number }) {
  const rootRef = useRef<Group>(null);
  useCatMovement(rootRef, stationCount);

  return (
    <group ref={rootRef} position={CAT_START}>
      <CatRiggedModel scale={CAT_MODEL_SCALE} />
    </group>
  );
}
