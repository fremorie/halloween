import { Environment, Lightformer } from "@react-three/drei";
import { ENVIRONMENT_LIGHTING_SETTINGS } from "@/settings/lightSettings";

export function EnvironmentLighting() {
  return (
    <Environment resolution={ENVIRONMENT_LIGHTING_SETTINGS.resolution}>
      {ENVIRONMENT_LIGHTING_SETTINGS.lightformers.map((lightformer, index) => (
        <Lightformer
          key={index}
          intensity={lightformer.intensity}
          position={lightformer.position}
          scale={lightformer.scale}
          rotation-y={lightformer.rotationY}
        />
      ))}
    </Environment>
  );
}
