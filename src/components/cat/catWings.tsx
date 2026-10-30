import { useRef } from "react";
import type { Group } from "three";

import { WingsModel } from "@/components/models/wings/wingsModel";
import { useCostumePieceDrop } from "./useCostumePieceDrop";
import { useIsFinaleFlying } from "./useIsFinaleFlying";

export function CatWings() {
  const wingsGroupRef = useRef<Group>(null);

  const isFlying = useIsFinaleFlying();

  useCostumePieceDrop(wingsGroupRef);

  return (
    <group ref={wingsGroupRef}>
      <WingsModel isFlying={isFlying} />
    </group>
  );
}
