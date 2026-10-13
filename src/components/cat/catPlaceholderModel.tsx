import { CAT_RADIUS } from "@/settings/catSettings";

export function CatPlaceholderModel() {
  return (
    <mesh castShadow position-y={CAT_RADIUS}>
      <sphereGeometry args={[CAT_RADIUS, 24, 16]} />
      <meshStandardMaterial color="#111111" />
    </mesh>
  );
}
