"use client";

import { CatRiggedModel } from "@/components/models/catRigged/CatModel";
import Stage from "@/components/experiments/stage";
import { HatModel } from "@/components/models/hat/hatModel";

export default function Page() {
  return (
    <Stage camera={{ position: [5, 1.5, 4] }}>
      <CatRiggedModel />
      <HatModel />
    </Stage>
  );
}
