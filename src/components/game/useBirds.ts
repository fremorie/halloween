import {
  BIRDS_SOUND_FADE_IN_DURATION_IN_SECONDS,
  BIRDS_SOUND_VOLUME,
} from "@/settings/soundEffectSettings";
import { useGameStore } from "@/store/gameStore";

export function useBirds() {
  const birdsSound = useGameStore((state) => state.birdsSound);

  const playBirdsWithFadeIn = () => {
    if (birdsSound === null || birdsSound.playing()) return;

    birdsSound.play();
    birdsSound.fade(
      0,
      BIRDS_SOUND_VOLUME,
      BIRDS_SOUND_FADE_IN_DURATION_IN_SECONDS * 1000,
    );
  };

  return { playBirdsWithFadeIn };
}
