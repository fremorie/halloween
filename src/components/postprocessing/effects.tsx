import { useControls } from "leva";
import { BlendFunction } from "postprocessing";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

import { Kuwahara } from "./kuwahara";

export function Effects() {
  const { kuwahara } = useControls({
    kuwahara: { value: true, label: "Kuwahara filter" },
  });

  return (
    <EffectComposer multisampling={4}>
      {kuwahara && <Kuwahara />}
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
