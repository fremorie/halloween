import { type RefObject, useRef, useState } from "react";
import { type Group, MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

import { useGameStore } from "@/store/gameStore";
import type { FinaleBeat } from "@/types/finale";
import {
  FINALE_BEAT_DURATIONS,
  FINALE_FLIGHT_EASE,
  FINALE_HOVER_HEIGHT,
  FINALE_LANDING_EASE,
  FINALE_LANDING_SPOT,
  FINALE_TAKE_OFF_EASE,
  FINALE_TURN_SPEED,
} from "@/settings/finaleSettings";
import { getEasedProgress } from "@/utils/camera/getEasedProgress";
import { dampAngle } from "@/utils/animation";
import { getHeading } from "@/utils/cat";
import { getFlightPoint } from "@/utils/finale";
import { CAT_CLOSE_UP_ORBIT_DEGREES } from "@/settings/cameraSettings";

const takeOffEase = gsap.parseEase(FINALE_TAKE_OFF_EASE);
const flightEase = gsap.parseEase(FINALE_FLIGHT_EASE);
const landingEase = gsap.parseEase(FINALE_LANDING_EASE);

const [landingSpotX, , landingSpotZ] = FINALE_LANDING_SPOT;
const flightEnd = new Vector3(landingSpotX, FINALE_HOVER_HEIGHT, landingSpotZ);
const closeUpOrbitRadians = MathUtils.degToRad(CAT_CLOSE_UP_ORBIT_DEGREES);
const directionToCloseUpCamera = new Vector3(
  Math.sin(closeUpOrbitRadians),
  0,
  Math.cos(closeUpOrbitRadians),
);

const HEADING_BEATS: FinaleBeat[] = ["turnAround", "flight"];
const FACE_CAMERA_BEATS: FinaleBeat[] = ["landing", "thankYou"];

export function useCatFlight(rootRef: RefObject<Group | null>) {
  const currentBeatStartRef = useRef<{
    beat: FinaleBeat | null;
    elapsedTime: number;
    position: Vector3;
  }>({ beat: null, elapsedTime: 0, position: new Vector3() });
  const [turnDirection] = useState(() => new Vector3());

  useFrame(({ clock }, delta) => {
    const root = rootRef.current;
    const { mode, finaleBeat, catPosition } = useGameStore.getState();
    if (!root || mode !== "finale") {
      return;
    }

    const currentBeatStart = currentBeatStartRef.current;
    if (currentBeatStart.beat !== finaleBeat) {
      currentBeatStart.beat = finaleBeat;
      currentBeatStart.elapsedTime = clock.elapsedTime;
      currentBeatStart.position.copy(root.position);
    }

    const elapsedSinceBeatStart =
      clock.elapsedTime - currentBeatStart.elapsedTime;

    if (finaleBeat === "takeOff") {
      const takeOffProgress = getEasedProgress(
        takeOffEase,
        elapsedSinceBeatStart,
        FINALE_BEAT_DURATIONS.takeOff,
      );
      root.position.y = MathUtils.lerp(0, FINALE_HOVER_HEIGHT, takeOffProgress);
    }

    if (finaleBeat === "flight") {
      const flightProgress = getEasedProgress(
        flightEase,
        elapsedSinceBeatStart,
        FINALE_BEAT_DURATIONS.flight,
      );
      getFlightPoint(
        currentBeatStart.position,
        flightEnd,
        flightProgress,
        root.position,
      );
    }

    if (finaleBeat === "landing") {
      const landingProgress = getEasedProgress(
        landingEase,
        elapsedSinceBeatStart,
        FINALE_BEAT_DURATIONS.landing,
      );
      root.position.y = MathUtils.lerp(
        currentBeatStart.position.y,
        0,
        landingProgress,
      );
    }

    if (finaleBeat !== null && HEADING_BEATS.includes(finaleBeat)) {
      turnDirection.copy(flightEnd).sub(root.position).setY(0);
    }

    if (finaleBeat !== null && FACE_CAMERA_BEATS.includes(finaleBeat)) {
      turnDirection.copy(directionToCloseUpCamera);
    }

    if (finaleBeat !== null && turnDirection.lengthSq() > 0) {
      root.rotation.y = dampAngle(
        root.rotation.y,
        getHeading(turnDirection),
        FINALE_TURN_SPEED,
        delta,
      );
    }

    catPosition.copy(root.position);
  });
}
