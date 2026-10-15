import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Euler } from "three";

import {
  applyEyeGazeRotation,
  type EyeMaterialInstance,
} from "@/components/materials/eyeMaterial";

import {
  CAT_EYE_GLANCE_DURATION,
  CAT_EYE_GLANCE_MAX_PAUSE,
  CAT_EYE_GLANCE_MAX_SIDEWAYS_ROTATION,
  CAT_EYE_GLANCE_MAX_VERTICAL_ROTATION,
  CAT_EYE_GLANCE_MIN_PAUSE,
  CAT_EYE_LOOK_STRAIGHT_CHANCE,
} from "./constants";

function pickGlanceRotation() {
  if (Math.random() < CAT_EYE_LOOK_STRAIGHT_CHANCE) {
    return { x: 0, y: 0 };
  }
  return {
    x: gsap.utils.random(
      -CAT_EYE_GLANCE_MAX_VERTICAL_ROTATION,
      CAT_EYE_GLANCE_MAX_VERTICAL_ROTATION,
    ),
    y: gsap.utils.random(
      -CAT_EYE_GLANCE_MAX_SIDEWAYS_ROTATION,
      CAT_EYE_GLANCE_MAX_SIDEWAYS_ROTATION,
    ),
  };
}

function pickPauseBeforeNextGlance() {
  return gsap.utils.random(CAT_EYE_GLANCE_MIN_PAUSE, CAT_EYE_GLANCE_MAX_PAUSE);
}

export function useCatEyeGlances(eyeMaterial: EyeMaterialInstance) {
  useGSAP(
    () => {
      const gazeRotation = new Euler();
      let currentGlanceAnimation: gsap.core.Animation;

      const glanceThenWait = () => {
        currentGlanceAnimation = gsap.to(gazeRotation, {
          ...pickGlanceRotation(),
          duration: CAT_EYE_GLANCE_DURATION,
          ease: "power2.out",
          onUpdate: () => applyEyeGazeRotation(eyeMaterial, gazeRotation),
          onComplete: waitThenGlance,
        });
      };

      const waitThenGlance = () => {
        currentGlanceAnimation = gsap.delayedCall(
          pickPauseBeforeNextGlance(),
          glanceThenWait,
        );
      };

      applyEyeGazeRotation(eyeMaterial, gazeRotation);
      waitThenGlance();

      return () => currentGlanceAnimation.kill();
    },
    { dependencies: [eyeMaterial] },
  );
}
