import type { RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import type { Group } from "three";

export function useCatBodyFollow(
  rootRef: RefObject<Group | null>,
  catBodyRef: RefObject<RapierRigidBody | null>,
) {
  useFrame(() => {
    const root = rootRef.current;
    const catBody = catBodyRef.current;
    if (!root || !catBody) return;

    catBody.setNextKinematicTranslation(root.position);
    catBody.setNextKinematicRotation(root.quaternion);
  });
}
