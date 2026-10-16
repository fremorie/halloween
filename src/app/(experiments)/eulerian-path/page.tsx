"use client";

import { EulerianPath } from "./eulerianPath";
import Stage from "@/components/experiments/stage";

export default function Page() {
  return (
    <Stage camera={{ position: [0, 2.5, 9] }}>
      <EulerianPath />
    </Stage>
  );
}
