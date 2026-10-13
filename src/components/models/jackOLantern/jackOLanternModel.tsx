import { FrontSide } from "three";

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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pumpkin.geometry}
        material={materials.pumpkin}
        material-shadowSide={FrontSide}
      />
      <mesh geometry={nodes.pumpkin_1.geometry} material={faceMaterial} />
    </group>
  );
}
