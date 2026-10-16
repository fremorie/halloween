"use client";

import { PedestalModel } from "@/components/models/pedestal/pedestalModel";
import Stage from "@/components/experiments/stage";

export default function Page() {
  return (
    <Stage camera={{ position: [4, 1.5, 8] }}>
      <PedestalModel />
    </Stage>
  );
}
