import type { Ref } from "react";
import { ConvexHullCollider, type RapierCollider } from "@react-three/rapier";

import { useWingColliderGLTF } from "@/components/models/wingCollider/useWingColliderGLTF";
import type { WingColliderGLTFResult } from "@/components/models/wingCollider/types";

type WingSensorColliderProps = {
  ref: Ref<RapierCollider>;
  nodeName: keyof WingColliderGLTFResult["nodes"];
};

export function WingSensorCollider({ ref, nodeName }: WingSensorColliderProps) {
  const { nodes } = useWingColliderGLTF();

  return (
    <ConvexHullCollider
      ref={ref}
      sensor
      args={[nodes[nodeName].geometry.attributes.position.array]}
    />
  );
}
