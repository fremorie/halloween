import { DoubleSide, FrontSide } from "three";

import { RevealStandardMaterial } from "@/components/materials/revealStandardMaterial";
import { useLanternFaceMaterial } from "@/components/materials/useLanternFaceMaterial";
import type { LanternFaceParams } from "@/types/lantern";
import { useJackOLanternCheerfulGLTF } from "./useJackOLanternCheerfulGLTF";

type Props = {
  faceParams: LanternFaceParams;
};

export function JackOLanternCheerfulModel({ faceParams }: Props) {
  const { nodes, materials } = useJackOLanternCheerfulGLTF();
  const faceMaterial = useLanternFaceMaterial(
    nodes.pumpkin002_1.geometry,
    faceParams,
  );

  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.pumpkin002.geometry}>
        <RevealStandardMaterial
          sourceMaterial={materials.pumpkin}
          shadowSide={FrontSide}
        />
      </mesh>
      <mesh
        castShadow
        geometry={nodes.pumpkin002_1.geometry}
        material={faceMaterial}
        material-shadowSide={DoubleSide}
      />
    </group>
  );
}
