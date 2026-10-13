import { SHADOW_CATCHER_SETTINGS } from "@/settings/lightSettings";

export function Ground() {
  return (
    <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={400}>
      <planeGeometry />
      <shadowMaterial
        color={SHADOW_CATCHER_SETTINGS.shadowColor}
        opacity={SHADOW_CATCHER_SETTINGS.shadowOpacity}
      />
    </mesh>
  );
}
