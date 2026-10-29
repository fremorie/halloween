"use client";

import Stage from "@/components/experiments/stage";
import { Leaves } from "@/components/leaves/leaves";
import { TreeV2 } from "./tree";

export default function Page() {
  return (
    <Stage camera={{ position: [5, 1.5, 4] }}>
      <TreeV2 />
      <Leaves />
    </Stage>
  );
}
