import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import type { MeshStandardMaterial } from "three";

import { COSTUME_SILHOUETTE_FADE_DURATION } from "@/settings/journeySettings";

export function useCapeFadeIn(
  capeMaterialRef: RefObject<MeshStandardMaterial | null>,
) {
  useGSAP(() => {
    const capeMaterial = capeMaterialRef.current;
    if (!capeMaterial) return;

    capeMaterial.transparent = true;

    gsap.from(capeMaterial, {
      opacity: 0,
      duration: COSTUME_SILHOUETTE_FADE_DURATION,
      ease: "sine.out",
      onComplete: () => {
        capeMaterial.transparent = false;
      },
    });

    return () => {
      capeMaterial.transparent = false;
    };
  }, []);
}
