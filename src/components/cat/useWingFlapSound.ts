import { AnimationClip } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { useWingsGLTF } from "@/components/models/wings/useWingsGLTF";
import { WINGS_FLY_TIME_SCALE } from "@/components/models/wings/constants";
import { useGameStore } from "@/store/gameStore";
import {
  WING_FLAP_SOUND_PEAK_OFFSET_IN_SECONDS,
  WING_FLAP_SOUND_PEAK_PHASE,
  WING_FLAP_SOUND_PLAYBACK_RATE,
  WING_FLAP_SOUND_SPRITES,
} from "@/settings/soundEffectSettings";

const wingFlapSpriteNames = Object.keys(WING_FLAP_SOUND_SPRITES);

function pickWingFlapSpriteNameOtherThan(previousSpriteName: string | null) {
  const candidateSpriteNames = wingFlapSpriteNames.filter(
    (spriteName) => spriteName !== previousSpriteName,
  );
  return candidateSpriteNames[
    Math.floor(Math.random() * candidateSpriteNames.length)
  ];
}

export function useWingFlapSound(isFlying: boolean) {
  const wingFlapSound = useGameStore((state) => state.wingFlapSound);
  const flapScheduleRef = useRef<{
    flyingStartElapsedTime: number | null;
    nextFlapIndex: number;
    previousSpriteName: string | null;
  }>({
    flyingStartElapsedTime: null,
    nextFlapIndex: 0,
    previousSpriteName: null,
  });
  const { animations } = useWingsGLTF();

  const flyClip = AnimationClip.findByName(animations, "Fly");

  useFrame(({ clock }) => {
    const flapSchedule = flapScheduleRef.current;

    if (!isFlying || !flyClip) {
      flapSchedule.flyingStartElapsedTime = null;
      return;
    }

    if (flapSchedule.flyingStartElapsedTime === null) {
      flapSchedule.flyingStartElapsedTime = clock.elapsedTime;
      flapSchedule.nextFlapIndex = 0;
    }

    const flapPeriod = flyClip.duration / WINGS_FLY_TIME_SCALE;
    const soundLeadTime =
      WING_FLAP_SOUND_PEAK_OFFSET_IN_SECONDS / WING_FLAP_SOUND_PLAYBACK_RATE;
    const elapsedSinceFlyingStart =
      clock.elapsedTime - flapSchedule.flyingStartElapsedTime;
    const nextFlapSoundStartTime =
      (flapSchedule.nextFlapIndex + WING_FLAP_SOUND_PEAK_PHASE) * flapPeriod -
      soundLeadTime;

    if (elapsedSinceFlyingStart < nextFlapSoundStartTime) {
      return;
    }

    flapSchedule.nextFlapIndex =
      Math.floor(
        (elapsedSinceFlyingStart + soundLeadTime) / flapPeriod -
          WING_FLAP_SOUND_PEAK_PHASE,
      ) + 1;

    if (wingFlapSound === null || wingFlapSound.state() !== "loaded") {
      return;
    }

    const spriteName = pickWingFlapSpriteNameOtherThan(
      flapSchedule.previousSpriteName,
    );
    flapSchedule.previousSpriteName = spriteName;
    wingFlapSound.play(spriteName);
  });
}
