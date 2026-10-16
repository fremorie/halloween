"use client";

import { YarnBalls } from "./yarnBalls";
import Stage from "@/components/experiments/stage";

export default function Page() {
  return (
    <Stage camera={{ position: [5, 3, -6] }}>
      <YarnBalls />
    </Stage>
  );
}
