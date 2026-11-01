import { useRef } from "react";
import type { Group } from "three";

import { HatModel } from "@/components/models/hat/hatModel";
import { useCostumePieceDrop } from "./useCostumePieceDrop";

type CatHatProps = {
  isWorn: boolean;
};

export function CatHat({ isWorn }: CatHatProps) {
  const hatGroupRef = useRef<Group>(null);

  useCostumePieceDrop(hatGroupRef, isWorn);

  return (
    <group ref={hatGroupRef} visible={isWorn}>
      <HatModel />
    </group>
  );
}
