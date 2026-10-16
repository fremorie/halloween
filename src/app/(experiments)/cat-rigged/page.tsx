"use client";

import { CatRiggedModel } from "@/components/models/catRigged/CatModel";
import Stage from "@/components/experiments/stage";

export default function Page() {
  return (
    <Stage camera={{ position: [5, 1.5, 4] }}>
      <CatRiggedModel rotation-y={-2} />
    </Stage>
  );
}
