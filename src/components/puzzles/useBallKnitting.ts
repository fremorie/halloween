import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import { type Group, MathUtils, Vector3 } from "three";

import {
  KNITTING_BALL_END_SCALE,
  KNITTING_BALL_MAX_TURNS,
  KNITTING_BALL_MIN_TURNS,
} from "@/settings/puzzleSettings";
import { KNITTING_DURATION } from "@/settings/rewardSettings";
import { useGameStore } from "@/store/gameStore";
import { uniformScale } from "@/utils/animation";

function getRandomSpinAngle() {
  const spinDirection = Math.random() < 0.5 ? -1 : 1;
  const spinTurns = MathUtils.randFloat(
    KNITTING_BALL_MIN_TURNS,
    KNITTING_BALL_MAX_TURNS,
  );

  return spinDirection * spinTurns * Math.PI * 2;
}

export function useBallKnitting(
  knittingBallRef: RefObject<Group | null>,
  levelIndex: number,
) {
  const isKnitting = useGameStore(
    (store) =>
      store.rewardBeat === "knit" && store.currentStationIndex === levelIndex,
  );

  useGSAP(() => {
    const knittingBall = knittingBallRef.current;
    if (!knittingBall || !isKnitting) return;

    const spinAxis = new Vector3().randomDirection();
    const spin = { angle: 0 };

    gsap.to(spin, {
      angle: getRandomSpinAngle(),
      duration: KNITTING_DURATION,
      ease: "power1.inOut",
      onUpdate: () => {
        knittingBall.quaternion.setFromAxisAngle(spinAxis, spin.angle);
      },
    });
    gsap.to(knittingBall.scale, {
      ...uniformScale(KNITTING_BALL_END_SCALE),
      duration: KNITTING_DURATION,
      ease: "power2.in",
    });
  }, [isKnitting]);
}
