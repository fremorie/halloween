import { useRef } from "react";

import {
  type CapeMaterial,
  CapeModel,
} from "@/components/models/cape/capeModel";
import { useCapeFadeIn } from "./useCapeFadeIn";
import { useCapeSound } from "./useCapeSound";
import { useCapeWave } from "./useCapeWave";

type CatCapeProps = {
  isWorn: boolean;
};

export function CatCape({ isWorn }: CatCapeProps) {
  const capeMaterialRef = useRef<CapeMaterial>(null);

  useCapeFadeIn(capeMaterialRef, isWorn);
  useCapeSound(isWorn);
  useCapeWave();

  return (
    <group visible={isWorn}>
      <CapeModel materialRef={capeMaterialRef} />
    </group>
  );
}
