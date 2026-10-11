import { useControls } from "leva";
import { useEffect } from "react";

import { lanternMaterial } from "@/components/materials/lanternFaceMaterial";

export function useLanternControls() {
  const { glowColor, emberColor, glowIntensity, flickerSeed } = useControls(
    "Lantern",
    {
      glowColor: "#ffb648",
      emberColor: "#c8441a",
      glowIntensity: { value: 1.5, min: 0, max: 4, step: 0.1 },
      flickerSeed: { value: 0, min: 0, max: 100, step: 1 },
    },
  );

  useEffect(() => {
    const { uniforms } = lanternMaterial;

    uniforms.uGlowColor.value.set(glowColor);
    uniforms.uEmberColor.value.set(emberColor);
    uniforms.uGlowIntensity.value = glowIntensity;
    uniforms.uFlickerSeed.value = flickerSeed;
  }, [glowColor, emberColor, glowIntensity, flickerSeed]);
}
