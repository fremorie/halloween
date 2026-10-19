import { useRef } from "react";
import type { Group } from "three";

import { WingsModel } from "@/components/models/wings/wingsModel";
import { useCostumePieceDrop } from "./useCostumePieceDrop";

export function CatWings() {
  const wingsGroupRef = useRef<Group>(null);

  useCostumePieceDrop(wingsGroupRef);

  return (
    <group ref={wingsGroupRef}>
      <WingsModel />
    </group>
  );
}
