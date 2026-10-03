import { useControls } from "leva";
import { Color, LinearSRGBColorSpace } from "three";

function toShaderColor(hex: string) {
  return new Color().setStyle(hex, LinearSRGBColorSpace);
}

export function useRainControls() {
  const { skyTopColor, skyBottomColor, rainDropTintNear, rainDropTintFar } =
    useControls("Rain", {
      skyTopColor: "#141d31",
      skyBottomColor: "#050b17",
      rainDropTintNear: "#d9e6ff",
      rainDropTintFar: "#bfd1f2",
    });

  return {
    skyTopColor: toShaderColor(skyTopColor),
    skyBottomColor: toShaderColor(skyBottomColor),
    rainDropTintNear: toShaderColor(rainDropTintNear),
    rainDropTintFar: toShaderColor(rainDropTintFar),
  };
}
