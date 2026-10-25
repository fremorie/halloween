import { FrontSide } from "three";

import { RevealStandardMaterial } from "@/components/materials/revealStandardMaterial";
import { useLanternFaceMaterial } from "@/components/materials/useLanternFaceMaterial";
import type { LanternFaceParams } from "@/types/lantern";
import { useJackOLanternHappyGLTF } from "./useJackOLanternHappyGLTF";

type Props = {
  faceParams: LanternFaceParams;
};

export function JackOLanternHappyModel({ faceParams }: Props) {
  const { nodes, materials } = useJackOLanternHappyGLTF();
  const faceMaterial = useLanternFaceMaterial(
    nodes.pumpkin001_1.geometry,
    faceParams,
  );

  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.pumpkin001.geometry}>
        <RevealStandardMaterial
          sourceMaterial={materials.pumpkin}
          shadowSide={FrontSide}
        />
      </mesh>
      <mesh geometry={nodes.pumpkin001_1.geometry} material={faceMaterial} />
    </group>
  );
}
