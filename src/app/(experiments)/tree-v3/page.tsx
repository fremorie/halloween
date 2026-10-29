"use client";

import Stage from "@/components/experiments/stage";
import { Leaves } from "@/components/leaves/leaves";
import { RevealSystem } from "@/components/materials/revealSystem";
import { Tree } from "./tree";

export default function Page() {
  return (
    <Stage camera={{ position: [5, 1.5, 4] }}>
      <RevealSystem />
      <Tree />
      <Leaves />
    </Stage>
  );
}
