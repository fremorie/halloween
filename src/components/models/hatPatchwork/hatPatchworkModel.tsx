import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { SRGBColorSpace } from "three";

import { createPatchworkMaterial } from "@/components/materials/patchworkMaterial";
import { usePatchworkControls } from "@/components/materials/usePatchworkControls";
import { useHatPatchworkGLTF } from "./useHatPatchworkGLTF";

export function HatPatchworkModel() {
  const { nodes } = useHatPatchworkGLTF();
  const hatPatchworkTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/HatPatchworkWithBakedNormals.jpg`,
    (loadedHatPatchworkTexture) => {
      loadedHatPatchworkTexture.flipY = false;
      loadedHatPatchworkTexture.colorSpace = SRGBColorSpace;
    },
  );

  const patchworkMaterial = useMemo(
    () => createPatchworkMaterial(hatPatchworkTexture),
    [hatPatchworkTexture],
  );

  usePatchworkControls();

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
