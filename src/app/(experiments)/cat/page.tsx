"use client";

import { CatModel } from "@/components/models/cat/CatModel";
import { useEyeControls } from "./useEyeControls";
import Stage from "@/components/experiments/stage";

export default function Page() {
  const eyeParams = useEyeControls();

  return (
    <Stage>
      <CatModel position-y={1.1} rotation-y={-2} eyeParams={eyeParams} />
    </Stage>
  );
}
