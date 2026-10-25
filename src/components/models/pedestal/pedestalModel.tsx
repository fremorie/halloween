import { FrontSide } from "three";

import { RevealStandardMaterial } from "@/components/materials/revealStandardMaterial";

import { usePedestalGLTF } from "./usePedestalGLTF";

export function PedestalModel() {
  const { nodes, materials } = usePedestalGLTF();

  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.pedestal.geometry}>
        <RevealStandardMaterial
          sourceMaterial={materials.palette}
          shadowSide={FrontSide}
        />
      </mesh>
    </group>
  );
}
