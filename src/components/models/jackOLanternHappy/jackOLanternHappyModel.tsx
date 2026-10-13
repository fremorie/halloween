import { FrontSide } from "three";

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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pumpkin001.geometry}
        material={materials.pumpkin}
        material-shadowSide={FrontSide}
      />
      <mesh geometry={nodes.pumpkin001_1.geometry} material={faceMaterial} />
    </group>
  );
}
