import * as THREE from "three";
import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

const MODEL_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/models/yarnBall.glb`;

type GLTFResult = GLTF & {
  nodes: {
    YarnBall: THREE.Mesh;
  };
  materials: {
    yarn: THREE.MeshStandardMaterial;
  };
};

type Props = {
  position?: [number, number, number];
  rotation?: number;
  color: string;
};

export function YarnBallModel({ position, rotation, color }: Props) {
  const { nodes, materials } = useGLTF(MODEL_PATH) as unknown as GLTFResult;
  const bakedMaterial = materials.yarn;

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        map: bakedMaterial.map,
        normalMap: bakedMaterial.normalMap,
        normalScale: bakedMaterial.normalScale,
        roughness: 0.95,
      }),
    [color, bakedMaterial],
  );

  useEffect(() => () => material.dispose(), [material]);

  return (
    <group position={position} rotation-y={rotation} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.YarnBall.geometry}
        material={material}
      />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
