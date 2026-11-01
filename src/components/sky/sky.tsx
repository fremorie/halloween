import { Environment, useTexture } from "@react-three/drei";
import {
  EquirectangularReflectionMapping,
  SRGBColorSpace,
  type Texture,
} from "three";

const PAINTED_SKY_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/sky.jpg`;

const prepareEquirectangularSkyTexture = (paintedSkyTexture: Texture) => {
  paintedSkyTexture.colorSpace = SRGBColorSpace;
  paintedSkyTexture.mapping = EquirectangularReflectionMapping;
};

type PaintedSkyProps = {
  backgroundRotationY: number;
  backgroundIntensity: number;
};

export function PaintedSky({
  backgroundRotationY,
  backgroundIntensity,
}: PaintedSkyProps) {
  const paintedSkyTexture = useTexture(
    PAINTED_SKY_TEXTURE_PATH,
    prepareEquirectangularSkyTexture,
  );

  return (
    <Environment
      map={paintedSkyTexture}
      background="only"
      backgroundRotation={[0, backgroundRotationY, 0]}
      backgroundIntensity={backgroundIntensity}
    />
  );
}
