import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";
import {
  PURR_SOUND_FADE_IN_DURATION_IN_MILLISECONDS,
  PURR_SOUND_FADE_OUT_DURATION_IN_MILLISECONDS,
  PURR_SOUND_INTERRUPTED_FADE_OUT_DURATION_IN_MILLISECONDS,
  PURR_SOUND_VOLUME,
} from "@/settings/soundEffectSettings";

export function usePurrSound() {
  useEffect(() => {
    let purrSoundId: number | undefined;
    let fadeOutTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const unsubscribe = useGameStore.subscribe((state, previousState) => {
      const purrSound = state.purrSound;
      if (purrSound === null) return;

      const hasThankYouJustStarted =
        state.finaleBeat === "thankYou" &&
        previousState.finaleBeat !== "thankYou";
      const hasThankYouJustEnded =
        state.finaleBeat !== "thankYou" &&
        previousState.finaleBeat === "thankYou";

      if (hasThankYouJustStarted) {
        purrSound.stop();
        clearTimeout(fadeOutTimeoutId);

        const startedPurrSoundId = purrSound.play();
        purrSoundId = startedPurrSoundId;
        purrSound.fade(
          0,
          PURR_SOUND_VOLUME,
          PURR_SOUND_FADE_IN_DURATION_IN_MILLISECONDS,
          startedPurrSoundId,
        );
        fadeOutTimeoutId = setTimeout(
          () =>
            purrSound.fade(
              PURR_SOUND_VOLUME,
              0,
              PURR_SOUND_FADE_OUT_DURATION_IN_MILLISECONDS,
              startedPurrSoundId,
            ),
          purrSound.duration() * 1000 -
            PURR_SOUND_FADE_OUT_DURATION_IN_MILLISECONDS,
        );
      }

      if (
        hasThankYouJustEnded &&
        purrSoundId !== undefined &&
        purrSound.playing(purrSoundId)
      ) {
        clearTimeout(fadeOutTimeoutId);
        purrSound.fade(
          purrSound.volume(purrSoundId) as number,
          0,
          PURR_SOUND_INTERRUPTED_FADE_OUT_DURATION_IN_MILLISECONDS,
          purrSoundId,
        );
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(fadeOutTimeoutId);
    };
  }, []);
}
