import { useEffect, useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder } from "leva";

import vertexShader from "@/shaders/leaves/vertex.glsl";
import fragmentShader from "@/shaders/leaves/fragment.glsl";
import { generateLeavesPositions } from "./generateLeavesPositions";

const PetalMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uDarkColor: new THREE.Color("#c89580"),
    uLightColor: new THREE.Color("#e5d9d1"),
  },
  vertexShader,
  fragmentShader,
);

extend({ PetalMaterial });

export function Leaves() {
  const petalTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/petal.png`,
  );

  // eslint-disable-next-line
  petalTexture.minFilter = THREE.LinearFilter;
  // eslint-disable-next-line
  petalTexture.generateMipmaps = false;

  const petalMaterialRef = useRef(null);

  useFrame((state, delta) => {
    if (petalMaterialRef.current) {
      petalMaterialRef.current.uTime += delta * 0.1;
    }
  });

  const petalsCount = 100;
  const { positions, seeds, sizes } = useMemo(
    () => generateLeavesPositions(petalsCount),
    [],
  );

  const { darkColor, lightColor } = useControls({
    "Cherry blossom petals": folder({
      darkColor: "#c89580",
      lightColor: "#e5d9d1",
    }),
  });

  useEffect(() => {
    petalMaterialRef.current.uDarkColor = new THREE.Color(darkColor);
    petalMaterialRef.current.uLightColor = new THREE.Color(lightColor);
  }, [lightColor, darkColor]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={petalsCount}
          itemSize={3} // x, y, z
          array={positions}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          count={petalsCount}
          itemSize={1}
          array={seeds}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={petalsCount}
          itemSize={1}
          array={sizes}
        />
      </bufferGeometry>
      <petalMaterial
        ref={petalMaterialRef}
        key={PetalMaterial.key}
        uTexture={petalTexture}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

useTexture.preload(`${process.env.NEXT_PUBLIC_BASE_PATH}/textures/petal.png`);
