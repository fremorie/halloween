import { useRef } from "react";
import type { MeshStandardMaterial } from "three";

import { CapeModel } from "@/components/models/cape/capeModel";
import { useCapeFadeIn } from "./useCapeFadeIn";

export function CatCape() {
  const capeMaterialRef = useRef<MeshStandardMaterial>(null);

  useCapeFadeIn(capeMaterialRef);

  return <CapeModel materialRef={capeMaterialRef} />;
}
