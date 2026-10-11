import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type JackOLanternGLTFResult = GLTF & {
  nodes: {
    pumpkin: THREE.Mesh;
    pumpkin_1: THREE.Mesh;
  };
  materials: {
    pumpkin: THREE.MeshStandardMaterial;
  };
};
