import { FrontSide } from "three";

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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pumpkin002.geometry}
        material={materials.pumpkin}
        material-shadowSide={FrontSide}
      />
      <mesh geometry={nodes.pumpkin002_1.geometry} material={faceMaterial} />
    </group>
  );
}
