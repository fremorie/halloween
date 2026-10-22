import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { SRGBColorSpace } from "three";

import { createPatchworkMaterial } from "@/components/materials/patchworkMaterial";
import { usePatchworkControls } from "@/components/materials/usePatchworkControls";
import { usePatchworkStitching } from "@/components/materials/usePatchworkStitching";
import { useWingsPatchworkGLTF } from "./useWingsPatchworkGLTF";

type Props = {
  levelIndex: number;
};

export function WingsPatchworkModel({ levelIndex }: Props) {
  const { nodes } = useWingsPatchworkGLTF();
  const wingsPatchworkTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/WingsPatchworkWithBakedNormal.jpg`,
    (loadedWingsPatchworkTexture) => {
      loadedWingsPatchworkTexture.flipY = false;
      loadedWingsPatchworkTexture.colorSpace = SRGBColorSpace;
    },
  );

  const patchworkMaterial = useMemo(
    () => createPatchworkMaterial(wingsPatchworkTexture, "wings"),
    [wingsPatchworkTexture],
  );

  usePatchworkControls();
  usePatchworkStitching(levelIndex);

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.PatchBottom.geometry}
        material={patchworkMaterial}
      />
      <mesh geometry={nodes.PatchLeft.geometry} material={patchworkMaterial} />
      <mesh
        geometry={nodes.PatchMiddleLeft.geometry}
        material={patchworkMaterial}
      />
      <mesh
        geometry={nodes.PatchMiddleRight.geometry}
        material={patchworkMaterial}
      />
      <mesh geometry={nodes.PatchRight.geometry} material={patchworkMaterial} />
      <mesh
        geometry={nodes.PatchTopLeft.geometry}
        material={patchworkMaterial}
      />
      <mesh
        geometry={nodes.PatchTopRight.geometry}
        material={patchworkMaterial}
      />
    </group>
  );
}
