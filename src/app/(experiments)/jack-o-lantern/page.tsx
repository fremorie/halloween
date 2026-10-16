"use client";

import { JackOLantern } from "./jackOLantern";
import { useLanternControls } from "./useLanternControls";
import { LanternFaceClock } from "@/components/materials/lanternFaceClock";
import Stage from "@/components/experiments/stage";

export default function Page() {
  const faceParams = useLanternControls();

  return (
    <Stage>
      <JackOLantern faceParams={faceParams} />
      <LanternFaceClock />
    </Stage>
  );
}
