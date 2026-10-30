import { useRef } from "react";
import type { Group } from "three";

import { WingsModel } from "@/components/models/wings/wingsModel";
import { useGameStore } from "@/store/gameStore";
import { WINGS_FLAPPING_BEATS } from "@/settings/finaleSettings";
import { useCostumePieceDrop } from "./useCostumePieceDrop";

export function CatWings() {
  const wingsGroupRef = useRef<Group>(null);

  const isFlying = useGameStore(
    (state) =>
      state.finaleBeat !== null &&
      WINGS_FLAPPING_BEATS.includes(state.finaleBeat),
  );

  useCostumePieceDrop(wingsGroupRef);

  return (
    <group ref={wingsGroupRef}>
      <WingsModel isFlying={isFlying} />
    </group>
  );
}
