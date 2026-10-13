import { SHADOW_COLOR, SHADOW_OPACITY } from "@/settings/shadowSettings";

export function Ground() {
  return (
    <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={400}>
      <planeGeometry />
      <shadowMaterial color={SHADOW_COLOR} opacity={SHADOW_OPACITY} />
    </mesh>
  );
}
