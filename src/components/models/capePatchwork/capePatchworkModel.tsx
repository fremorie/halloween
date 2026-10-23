import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { SRGBColorSpace } from "three";

import { createPatchworkMaterial } from "@/components/materials/patchworkMaterial";
import { usePatchworkControls } from "@/components/materials/usePatchworkControls";
import { usePatchworkStitching } from "@/components/materials/usePatchworkStitching";
import { useCapePatchworkGLTF } from "./useCapePatchworkGLTF";
import { CAPE_PATCHWORK_TEXTURE_PATH } from "./constants";

type Props = {
  levelIndex: number;
};

export function CapePatchworkModel({ levelIndex }: Props) {
  const { nodes } = useCapePatchworkGLTF();
  const capePatchworkTexture = useTexture(
    CAPE_PATCHWORK_TEXTURE_PATH,
    (loadedCapePatchworkTexture) => {
      loadedCapePatchworkTexture.flipY = false;
      loadedCapePatchworkTexture.colorSpace = SRGBColorSpace;
    },
  );

  const patchworkMaterial = useMemo(
    () => createPatchworkMaterial(capePatchworkTexture, "cape"),
    [capePatchworkTexture],
  );

  usePatchworkControls();
  usePatchworkStitching(levelIndex);

  return (
    <group dispose={null}>
      <mesh geometry={nodes.PatchLeft.geometry} material={patchworkMaterial} />
      <mesh
        geometry={nodes.PatchMiddle.geometry}
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

useTexture.preload(CAPE_PATCHWORK_TEXTURE_PATH);
