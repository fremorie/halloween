import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type TreeV4GLTFResult = GLTF & {
  nodes: {
    Trunk001: THREE.Mesh;
    CanopyBlob001: THREE.Mesh;
    CanopyLeaves001: THREE.Mesh;
  };
};
