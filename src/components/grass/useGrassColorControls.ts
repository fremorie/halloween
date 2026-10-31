import { useControls } from "leva";
import { useLayoutEffect } from "react";
import type { ShaderMaterial } from "three";

export function useGrassColorControls(grassMaterial: ShaderMaterial) {
  const {
    tipColor,
    baseColor,
    tipColor2,
    baseColor2,
    hemiSkyColor,
    hemiGroundColor,
  } = useControls("Grass colors", {
    tipColor: "#e6d7a6",
    baseColor: "#84661d",
    tipColor2: "#d6c964",
    baseColor2: "#c24f13",
    hemiSkyColor: "#f3da8e",
    hemiGroundColor: "#4d5d31",
  });

  useLayoutEffect(() => {
    grassMaterial.uniforms.uTipColor.value.set(tipColor);
    grassMaterial.uniforms.uBaseColor.value.set(baseColor);
    grassMaterial.uniforms.uTipColor2.value.set(tipColor2);
    grassMaterial.uniforms.uBaseColor2.value.set(baseColor2);
    grassMaterial.uniforms.uHemiSkyColor.value.set(hemiSkyColor);
    grassMaterial.uniforms.uHemiGroundColor.value.set(hemiGroundColor);
  }, [
    grassMaterial,
    tipColor,
    baseColor,
    tipColor2,
    baseColor2,
    hemiSkyColor,
    hemiGroundColor,
  ]);
}
