import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type PedestalGLTFResult = GLTF & {
  nodes: {
    pedestal: THREE.Mesh;
  };
  materials: {
    palette: THREE.MeshStandardMaterial;
  };
};
