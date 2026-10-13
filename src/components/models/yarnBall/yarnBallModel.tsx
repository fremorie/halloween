import { MeshStandardMaterial } from "three";

import { useYarnBallGLTF } from "./useYarnBallGLTF";

type Props = {
  position?: [number, number, number];
  rotationY?: number;
  material: MeshStandardMaterial;
  scale?: number;
};

export function YarnBallModel({ position, rotationY, material, scale }: Props) {
  const { nodes } = useYarnBallGLTF();

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.YarnBall.geometry}
      material={material}
      position={position}
      rotation-y={rotationY}
      scale={scale}
    />
  );
}
