import { useAnimations } from "@react-three/drei";
import { type JSX, useEffect, useLayoutEffect, useRef } from "react";
import type { Group, Material, Mesh } from "three";

import { useEyeMaterial } from "@/components/materials/useEyeMaterial";
import type { EyeParams } from "@/types/eye";
import { useCatBlink } from "@/utils/cat/useCatBlink";
import { useCatEyeGlances } from "@/utils/cat/useCatEyeGlances";
import {
  CAT_BOTTOM_LID_OPEN_ROTATION_X,
  CAT_TOP_LID_OPEN_ROTATION_X,
} from "./constants";
import { useCatGLTF } from "./useCatGLTF";

type CatModelProps = JSX.IntrinsicElements["group"] & {
  eyeParams?: EyeParams;
};

function applyMaterialToMeshes(meshes: Mesh[], material: Material) {
  meshes.forEach((mesh) => {
    mesh.material = material;
  });
}

function openLids(topLids: Mesh, bottomLids: Mesh) {
  topLids.rotation.x = CAT_TOP_LID_OPEN_ROTATION_X;
  bottomLids.rotation.x = CAT_BOTTOM_LID_OPEN_ROTATION_X;
}

export function CatRiggedModel({ eyeParams, ...props }: CatModelProps) {
  const groupRef = useRef<Group>(null);

  const { nodes, materials, animations } = useCatGLTF();
  const eyeMaterial = useEyeMaterial(materials.Eye.map, eyeParams);

  useLayoutEffect(() => {
    applyMaterialToMeshes([nodes.LeftEye, nodes.RightEye], eyeMaterial);
  }, [nodes, eyeMaterial]);

  useLayoutEffect(() => {
    openLids(nodes.TopLids, nodes.BottomLids);
  }, [nodes]);

  useCatBlink(nodes.TopLids, nodes.BottomLids);
  useCatEyeGlances(eyeMaterial);

  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    actions.Walk?.play();
  }, [actions]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="CatRig">
          <skinnedMesh
            name="Cat"
            castShadow
            receiveShadow
            geometry={nodes.Cat.geometry}
            material={materials.Cat}
            skeleton={nodes.Cat.skeleton}
          />
          <primitive object={nodes.Root} />
        </group>
      </group>
    </group>
  );
}
