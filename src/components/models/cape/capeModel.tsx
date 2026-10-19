import type { Ref } from "react";
import type { MeshStandardMaterial } from "three";

import { useCapeGLTF } from "./useCapeGLTF";

type Props = {
  materialRef?: Ref<MeshStandardMaterial>;
};

export function CapeModel({ materialRef }: Props) {
  const { nodes, materials } = useCapeGLTF();

  return (
    <group dispose={null}>
      <mesh castShadow geometry={nodes.Cape.geometry}>
        <primitive
          object={materials.CapePainted}
          attach="material"
          ref={materialRef}
        />
      </mesh>
    </group>
  );
}
