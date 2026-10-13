import { useRef } from "react";
import { type Group } from "three";

import { CAT_START } from "@/settings/journeySettings";
import { CatPlaceholderModel } from "./catPlaceholderModel";
import { useCatMovement } from "./useCatMovement";

export function Cat({ stationCount }: { stationCount: number }) {
  const rootRef = useRef<Group>(null);
  useCatMovement(rootRef, stationCount);

  return (
    <group ref={rootRef} position={CAT_START}>
      <CatPlaceholderModel />
    </group>
  );
}
