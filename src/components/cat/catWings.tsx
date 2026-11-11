import { useRef } from "react";
import type { Group } from "three";

import { WingsModel } from "@/components/models/wings/wingsModel";
import { useCostumePieceDrop } from "./useCostumePieceDrop";
import { useIsCatFlying } from "./useIsCatFlying";
import { useWingFlapSound } from "./useWingFlapSound";

type CatWingsProps = {
  isWorn: boolean;
};

export function CatWings({ isWorn }: CatWingsProps) {
  const wingsGroupRef = useRef<Group>(null);

  const isFlying = useIsCatFlying();

  useCostumePieceDrop(wingsGroupRef, isWorn);
  useWingFlapSound(isFlying);

  return (
    <group ref={wingsGroupRef} visible={isWorn}>
      <WingsModel isFlying={isFlying} />
    </group>
  );
}
