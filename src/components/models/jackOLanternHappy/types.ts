import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type JackOLanternHappyGLTFResult = GLTF & {
  nodes: {
    pumpkin001: THREE.Mesh;
    pumpkin001_1: THREE.Mesh;
  };
  materials: {
    pumpkin: THREE.MeshStandardMaterial;
  };
};
