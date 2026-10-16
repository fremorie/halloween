"use client";

import { Pumpkins } from "./pumpkins";
import Stage from "@/components/experiments/stage";

export default function Page() {
  return (
    <Stage camera={{ position: [5, 3, -6] }}>
      <Pumpkins />
    </Stage>
  );
}
