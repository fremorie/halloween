import { useRef } from "react";
import type { Group } from "three";

import { HatModel } from "@/components/models/hat/hatModel";
import { useHatDrop } from "./useHatDrop";

export function CatHat() {
  const hatGroupRef = useRef<Group>(null);

  useHatDrop(hatGroupRef);

  return (
    <group ref={hatGroupRef}>
      <HatModel />
    </group>
  );
}
