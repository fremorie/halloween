import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type BranchGLTFResult = GLTF & {
  nodes: {
    Branch: THREE.Mesh;
    Leaf001: THREE.Mesh;
    Leaf002: THREE.Mesh;
    Leaf003: THREE.Mesh;
    Leaf004: THREE.Mesh;
  };
  materials: {
    "branch.001": THREE.MeshStandardMaterial;
    Leaf: THREE.MeshStandardMaterial;
  };
};
