import { useRef } from "react";

import {
  type CapeMaterial,
  CapeModel,
} from "@/components/models/cape/capeModel";
import { useCapeFadeIn } from "./useCapeFadeIn";
import { useCapeSound } from "./useCapeSound";
import { useCapeWave } from "./useCapeWave";

export function CatCape() {
  const capeMaterialRef = useRef<CapeMaterial>(null);

  useCapeFadeIn(capeMaterialRef);
  useCapeSound();
  useCapeWave();

  return <CapeModel materialRef={capeMaterialRef} />;
}
