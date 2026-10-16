import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type CatGLTFResult = GLTF & {
  nodes: {
    BottomLids: THREE.Mesh;
    Cat: THREE.SkinnedMesh;
    Eyes: THREE.Object3D;
    LeftEye: THREE.Mesh;
    RightEye: THREE.Mesh;
    Root: THREE.Bone;
    TopLids: THREE.Mesh;
  };
  materials: {
    EyeLids: THREE.MeshStandardMaterial;
    Cat: THREE.MeshStandardMaterial;
    Eye: THREE.MeshStandardMaterial;
  };
};
