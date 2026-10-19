import { useRef } from "react";
import type { Group } from "three";

import { HatModel } from "@/components/models/hat/hatModel";
import { useCostumePieceDrop } from "./useCostumePieceDrop";

export function CatHat() {
  const hatGroupRef = useRef<Group>(null);

  useCostumePieceDrop(hatGroupRef);

  return (
    <group ref={hatGroupRef}>
      <HatModel />
    </group>
  );
}
