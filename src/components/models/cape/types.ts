import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type CapeGLTFResult = GLTF & {
  nodes: {
    Cape: THREE.Mesh;
  };
};
