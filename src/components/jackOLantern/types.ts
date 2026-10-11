import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type JackOLanternGLTFResult = GLTF & {
  nodes: {
    pumpkin: THREE.Mesh;
    pumpkin_1: THREE.Mesh;
    pumpkin_2: THREE.Mesh;
    pumpkin_3: THREE.Mesh;
  };
  materials: {
    pumpkinSkin: THREE.MeshStandardMaterial;
    stem: THREE.MeshStandardMaterial;
    pumpkinCarved: THREE.MeshStandardMaterial;
    pumpkinCut: THREE.MeshStandardMaterial;
  };
};
