import { useControls } from "leva";
import { useLayoutEffect } from "react";
import type { ShaderMaterial } from "three";

export function useFallingLeavesColorControls(
  fallingLeavesMaterial: ShaderMaterial,
) {
  const { darkColor, lightColor } = useControls("Leaves particles", {
    darkColor: "#be5326",
    lightColor: "#c0962a",
  });

  useLayoutEffect(() => {
    fallingLeavesMaterial.uniforms.uDarkColor.value.set(darkColor);
    fallingLeavesMaterial.uniforms.uLightColor.value.set(lightColor);
  }, [fallingLeavesMaterial, darkColor, lightColor]);
}
