import { useRef } from "react";

import {
  type CapeMaterial,
  CapeModel,
} from "@/components/models/cape/capeModel";
import { useCapeFadeIn } from "./useCapeFadeIn";
import { useCapeWave } from "./useCapeWave";

export function CatCape() {
  const capeMaterialRef = useRef<CapeMaterial>(null);

  useCapeFadeIn(capeMaterialRef);
  useCapeWave();

  return <CapeModel materialRef={capeMaterialRef} />;
}
