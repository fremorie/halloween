import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { MeshCollider } from "@react-three/rapier";

import { PEDESTAL_COLLIDER_PATH } from "./constants";

export function PedestalCollider() {
  const { nodes } = useGLTF(PEDESTAL_COLLIDER_PATH);

  const colliderMesh = nodes.PedestalCollider as THREE.Mesh;

  const geometry = colliderMesh.geometry;

  return (
    <MeshCollider type="trimesh">
      <mesh geometry={geometry}>
        <meshBasicMaterial colorWrite={false} depthWrite={false} />
      </mesh>
    </MeshCollider>
  );
}

useGLTF.preload(PEDESTAL_COLLIDER_PATH);
