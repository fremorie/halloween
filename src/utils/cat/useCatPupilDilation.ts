import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import type { EyeMaterialInstance } from "@/components/materials/eyeMaterial";

import {
  CAT_DILATED_PUPIL_RADIUS,
  CAT_PUPIL_DILATION_DURATION,
} from "./constants";

export function useCatPupilDilation(
  eyeMaterial: EyeMaterialInstance,
  restPupilRadius: number,
  isPupilDilated: boolean,
) {
  useGSAP(
    () => {
      gsap.to(eyeMaterial.uniforms.uPupilRadius, {
        value: isPupilDilated ? CAT_DILATED_PUPIL_RADIUS : restPupilRadius,
        duration: CAT_PUPIL_DILATION_DURATION,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    { dependencies: [eyeMaterial, restPupilRadius, isPupilDilated] },
  );
}
