import { useAnimations } from "@react-three/drei";
import {
  type JSX,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { type Group, type Material, type Mesh, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";

import { useEyeMaterial } from "@/components/materials/useEyeMaterial";
import { DEFAULT_PUPIL_RADIUS } from "@/components/materials/eyeMaterial";
import type { EyeParams } from "@/types/eye";
import {
  useCatBlink,
  useCatEyeGlances,
  useCatPupilDilation,
} from "@/utils/cat";
import {
  CAT_BOTTOM_LID_OPEN_ROTATION_X,
  CAT_TOP_LID_OPEN_ROTATION_X,
} from "./constants";
import { useCatGLTF } from "./useCatGLTF";
import { CAT_STILL_PACE, CAT_WALK_BLEND_SPEED } from "@/settings/catSettings";

type Props = JSX.IntrinsicElements["group"] & {
  eyeParams?: EyeParams;
  walkPaceRef?: RefObject<number>;
  isPupilDilated?: boolean;
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

export function CatRiggedModel({
  eyeParams,
  walkPaceRef,
  isPupilDilated = false,
  ...groupProps
}: Props) {
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
  useCatPupilDilation(
    eyeMaterial,
    eyeParams?.pupilRadius ?? DEFAULT_PUPIL_RADIUS,
    isPupilDilated,
  );

  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    actions.Walk?.setEffectiveWeight(walkPaceRef ? 0 : 1).play();
  }, [actions, walkPaceRef]);

  useFrame((_, delta) => {
    const walk = actions.Walk;

    if (!walk || !walkPaceRef) {
      return;
    }

    const pace = walkPaceRef.current;
    const isWalking = pace > CAT_STILL_PACE;

    walk.setEffectiveTimeScale(pace);
    walk.setEffectiveWeight(
      MathUtils.damp(
        walk.getEffectiveWeight(),
        isWalking ? 1 : 0,
        CAT_WALK_BLEND_SPEED,
        delta,
      ),
    );
  });

  return (
    <group ref={groupRef} {...groupProps} dispose={null}>
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
