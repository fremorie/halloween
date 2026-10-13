import { useEffect, useMemo } from "react";

import { YARN_PALETTE } from "@/settings/yarnPalette";
import { useYarnBallGLTF } from "./useYarnBallGLTF";

export function useYarnMaterials() {
  const { materials } = useYarnBallGLTF();

  const yarnMaterials = useMemo(
    () =>
      YARN_PALETTE.map((color) => {
        const material = materials.yarn.clone();
        material.color.set(color);

        return material;
      }),
    [materials.yarn],
  );

  useEffect(
    () => () => yarnMaterials.forEach((material) => material.dispose()),
    [yarnMaterials],
  );

  return yarnMaterials;
}
