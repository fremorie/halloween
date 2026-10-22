import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { SRGBColorSpace } from "three";

import { createPatchworkMaterial } from "@/components/materials/patchworkMaterial";
import { usePatchworkControls } from "@/components/materials/usePatchworkControls";
import { usePatchworkStitching } from "@/components/materials/usePatchworkStitching";
import { useHatPatchworkGLTF } from "./useHatPatchworkGLTF";

type Props = {
  levelIndex: number;
};

export function HatPatchworkModel({ levelIndex }: Props) {
  const { nodes } = useHatPatchworkGLTF();
  const hatPatchworkTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/HatPatchworkWithBakedNormals.jpg`,
    (loadedHatPatchworkTexture) => {
      loadedHatPatchworkTexture.flipY = false;
      loadedHatPatchworkTexture.colorSpace = SRGBColorSpace;
    },
  );

  const patchworkMaterial = useMemo(
    () => createPatchworkMaterial(hatPatchworkTexture, "hat"),
    [hatPatchworkTexture],
  );

  usePatchworkControls();
  usePatchworkStitching(levelIndex);

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Patch_bottom_left.geometry}
        material={patchworkMaterial}
      />
      <mesh
        geometry={nodes.Patch_bottom_right.geometry}
        material={patchworkMaterial}
      />
      <mesh geometry={nodes.Patch_top.geometry} material={patchworkMaterial} />
    </group>
  );
}
