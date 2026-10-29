import type { Vec3 } from "@/types/math";

import type { TreeV4Materials } from "./useTreeV4Materials";
import { useTreeV4GLTF } from "./useTreeV4GLTF";

type Props = {
  materials: TreeV4Materials;
  scale?: number;
  position?: Vec3;
  "rotation-y"?: number;
};

export function TreeV4Model({ materials, ...groupProps }: Props) {
  const { nodes } = useTreeV4GLTF();

  return (
    <group {...groupProps} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Trunk001.geometry}
        material={materials.trunkMaterial}
      />
      <mesh
        castShadow
        geometry={nodes.CanopyBlob001.geometry}
        material={materials.canopyBlobMaterial}
        position={nodes.CanopyBlob001.position}
      />
      <mesh
        castShadow
        geometry={nodes.CanopyLeaves001.geometry}
        material={materials.canopyLeavesMaterial}
        customDepthMaterial={materials.canopyLeavesShadowMaterial}
        position={nodes.CanopyLeaves001.position}
      />
    </group>
  );
}
