import type { JSX } from "react";

import { useEyeMaterial } from "@/components/materials/useEyeMaterial";
import type { EyeParams } from "@/types/eye";
import {
  CAT_BOTTOM_LID_OPEN_ROTATION_X,
  CAT_TOP_LID_OPEN_ROTATION_X,
} from "./constants";
import { useCatGLTF } from "./useCatGLTF";
import { useCatBlink } from "@/utils/cat/useCatBlink";
import { useCatEyeGlances } from "@/utils/cat/useCatEyeGlances";

type CatModelProps = JSX.IntrinsicElements["group"] & {
  eyeParams?: EyeParams;
};

export function CatRiggedModel({ eyeParams, ...props }: CatModelProps) {
  const { nodes, materials } = useCatGLTF();
  const eyeMaterial = useEyeMaterial(materials.Eye.map, eyeParams);
  const { topLidsRef, bottomLidsRef } = useCatBlink();
  useCatEyeGlances(eyeMaterial);

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="CatRig">
          <mesh
            name="Cat"
            castShadow
            receiveShadow
            geometry={nodes.Cat.geometry}
            material={materials.Cat}
          />
          <group name="Root" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="Hips" position={[0, -0.9, 1.1]}>
              <group
                name="BackLegL"
                position={[-0.49, 0.245, -0.56]}
                rotation={[-1.674, 0, 0]}
              />
              <group
                name="BackLegR"
                position={[0.487, 0.245, -0.553]}
                rotation={[-1.673, 0, 0]}
              />
              <group name="Chest" position={[0, 0.9, 0]}>
                <group
                  name="FrontLegL"
                  position={[-0.477, 0.74, -0.556]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <group
                  name="FrontLegR"
                  position={[0.494, 0.74, -0.558]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <group
                  name="Head"
                  position={[0, 0.7, 0]}
                  rotation={[1.292, 0, 0]}
                >
                  <group
                    name="Eyes"
                    position={[-0.001, 0.497, -0.416]}
                    rotation={[0.278, 0, 0]}
                  >
                    <mesh
                      name="BottomLids"
                      ref={bottomLidsRef}
                      geometry={nodes.BottomLids.geometry}
                      material={materials.EyeLids}
                      position={[0.001, 0.005, 0.001]}
                      rotation-x={CAT_BOTTOM_LID_OPEN_ROTATION_X}
                    />
                    <mesh
                      name="LeftEye"
                      geometry={nodes.LeftEye.geometry}
                      material={eyeMaterial}
                      position={[-0.242, 0.013, 0]}
                    />
                    <mesh
                      name="RightEye"
                      geometry={nodes.RightEye.geometry}
                      material={eyeMaterial}
                      position={[0.242, 0.013, 0]}
                    />
                    <mesh
                      ref={topLidsRef}
                      name="TopLids"
                      geometry={nodes.TopLids.geometry}
                      material={materials.EyeLids}
                      position={[0.002, 0.026, 0.001]}
                      rotation-x={CAT_TOP_LID_OPEN_ROTATION_X}
                    />
                  </group>
                </group>
              </group>
              <group
                name="Tail1"
                position={[0, -0.2, 0.4]}
                rotation={[2.521, 0, 0]}
              >
                <group
                  name="Tail2"
                  position={[0, 0.43, 0]}
                  rotation={[-0.088, -0.98, 0]}
                >
                  <group
                    name="Tail3"
                    position={[0, 0.461, 0]}
                    rotation={[-0.475, 1.022, 0.391]}
                  >
                    <group
                      name="Tail4"
                      position={[0, 0.43, 0]}
                      rotation={[-0.298, -0.012, -0.026]}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
