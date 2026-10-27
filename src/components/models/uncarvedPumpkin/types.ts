import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type UncarvedPumpkinGLTFResult = GLTF & {
  nodes: {
    BaseUncarvedPumpkin: THREE.Mesh;
  };
  materials: {
    pumpkin: THREE.MeshStandardMaterial;
  };
};
