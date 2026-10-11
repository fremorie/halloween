import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type JackOLanternCheerfulGLTFResult = GLTF & {
  nodes: {
    pumpkin002: THREE.Mesh;
    pumpkin002_1: THREE.Mesh;
  };
  materials: {
    pumpkin: THREE.MeshStandardMaterial;
  };
};
