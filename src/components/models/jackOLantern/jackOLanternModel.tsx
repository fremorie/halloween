import { DoubleSide, FrontSide } from "three";

import { RevealStandardMaterial } from "@/components/materials/revealStandardMaterial";
import { useLanternFaceMaterial } from "@/components/materials/useLanternFaceMaterial";
import type { LanternFaceParams } from "@/types/lantern";
import { useJackOLanternGLTF } from "./useJackOLanternGLTF";

type Props = {
  faceParams: LanternFaceParams;
};

export function JackOLanternModel({ faceParams }: Props) {
  const { nodes, materials } = useJackOLanternGLTF();
  const faceMaterial = useLanternFaceMaterial(
    nodes.pumpkin_1.geometry,
    faceParams,
  );

  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.pumpkin.geometry}>
        <RevealStandardMaterial
          sourceMaterial={materials.pumpkin}
          shadowSide={FrontSide}
        />
      </mesh>
      <mesh
        castShadow
        geometry={nodes.pumpkin_1.geometry}
        material={faceMaterial}
        material-shadowSide={DoubleSide}
      />
    </group>
  );
}
