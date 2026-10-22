import { useTexture } from "@react-three/drei";

import { useHatPatchworkGLTF } from "./useHatPatchworkGLTF";

export function HatPatchworkModel() {
  const { nodes } = useHatPatchworkGLTF();
  const hatPatchworkTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/HatPatchwork.png`,
    (loadedHatPatchworkTexture) => {
      loadedHatPatchworkTexture.flipY = false;
    },
  );

  const patchMeshes = [
    nodes.Patch_bottom_left,
    nodes.Patch_bottom_right,
    nodes.Patch_top,
  ];

  return (
    <group dispose={null}>
      {patchMeshes.map((patchMesh) => (
        <mesh key={patchMesh.name} geometry={patchMesh.geometry} receiveShadow>
          <meshStandardMaterial map={hatPatchworkTexture} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
