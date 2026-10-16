import { useRef } from "react";
import { type Group } from "three";

import { CAT_START } from "@/settings/journeySettings";
import { useCatMovement } from "./useCatMovement";
import { CatRiggedModel } from "@/components/models/catRigged/CatModel";

export function Cat({ stationCount }: { stationCount: number }) {
  const rootRef = useRef<Group>(null);
  const walkPaceRef = useCatMovement(rootRef, stationCount);

  return (
    <group ref={rootRef} position={CAT_START}>
      <CatRiggedModel walkPaceRef={walkPaceRef} />
    </group>
  );
}
