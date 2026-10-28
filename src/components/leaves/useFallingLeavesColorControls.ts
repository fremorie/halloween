import { useControls } from "leva";
import { useLayoutEffect } from "react";
import type { ShaderMaterial } from "three";

export function useFallingLeavesColorControls(
  fallingLeavesMaterial: ShaderMaterial,
) {
  const { darkColor, lightColor } = useControls("Leaves particles", {
    darkColor: "#da5017",
    lightColor: "#c78175",
  });

  useLayoutEffect(() => {
    fallingLeavesMaterial.uniforms.uDarkColor.value.set(darkColor);
    fallingLeavesMaterial.uniforms.uLightColor.value.set(lightColor);
  }, [fallingLeavesMaterial, darkColor, lightColor]);
}
