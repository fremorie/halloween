import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";
import {
  PURR_SOUND_FADE_IN_DURATION_IN_MILLISECONDS,
  PURR_SOUND_FADE_OUT_DURATION_IN_MILLISECONDS,
  PURR_SOUND_VOLUME,
} from "@/settings/soundEffectSettings";

export function usePurrSound() {
  useEffect(() => {
    let purrSoundId: number | undefined;

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
        purrSoundId = purrSound.play();
        purrSound.fade(
          0,
          PURR_SOUND_VOLUME,
          PURR_SOUND_FADE_IN_DURATION_IN_MILLISECONDS,
          purrSoundId,
        );
      }

      if (hasThankYouJustEnded && purrSoundId !== undefined) {
        const fadingPurrSoundId = purrSoundId;
        purrSound.once(
          "fade",
          () => purrSound.stop(fadingPurrSoundId),
          fadingPurrSoundId,
        );
        purrSound.fade(
          purrSound.volume(fadingPurrSoundId) as number,
          0,
          PURR_SOUND_FADE_OUT_DURATION_IN_MILLISECONDS,
          fadingPurrSoundId,
        );
        purrSoundId = undefined;
      }
    });

    return () => {
      unsubscribe();
      useGameStore.getState().purrSound?.stop();
    };
  }, []);
}
