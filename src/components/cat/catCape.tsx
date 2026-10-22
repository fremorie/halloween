import { useRef } from "react";

import {
  type CapeMaterial,
  CapeModel,
} from "@/components/models/cape/capeModel";
import { useCapeFadeIn } from "./useCapeFadeIn";

export function CatCape() {
  const capeMaterialRef = useRef<CapeMaterial>(null);

  useCapeFadeIn(capeMaterialRef);

  return <CapeModel materialRef={capeMaterialRef} />;
}
