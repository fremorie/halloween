"use client";

import Stage from "@/components/experiments/stage";
import { TreeModel } from "@/components/models/tree/treeModel";

export default function Page() {
  return (
    <Stage camera={{ position: [5, 1.5, 4] }}>
      <TreeModel scale={0.5} />
    </Stage>
  );
}
