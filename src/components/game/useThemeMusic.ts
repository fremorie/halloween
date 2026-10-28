import { useEffect } from "react";

import {
  THEME_MUSIC_DURING_PUZZLE_VOLUME_FACTOR,
  THEME_MUSIC_FADE_IN_DURATION_IN_SECONDS,
  THEME_MUSIC_VOLUME,
  THEME_MUSIC_VOLUME_CHANGE_DURATION_IN_SECONDS,
} from "@/settings/musicSettings";
import { useGameStore } from "@/store/gameStore";

export function useThemeMusic() {
  const themeMusic = useGameStore((state) => state.themeMusic);
  const isSolving = useGameStore((state) => state.mode === "solving");

  useEffect(() => {
    if (themeMusic === null || !themeMusic.playing()) return;

    const targetVolume = isSolving
      ? THEME_MUSIC_VOLUME * THEME_MUSIC_DURING_PUZZLE_VOLUME_FACTOR
      : THEME_MUSIC_VOLUME;

    themeMusic.fade(
      themeMusic.volume(),
      targetVolume,
      THEME_MUSIC_VOLUME_CHANGE_DURATION_IN_SECONDS * 1000,
    );
  }, [themeMusic, isSolving]);

  const playThemeMusicWithFadeIn = () => {
    if (themeMusic === null || themeMusic.playing()) return;

    themeMusic.play();
    themeMusic.fade(
      0,
      THEME_MUSIC_VOLUME,
      THEME_MUSIC_FADE_IN_DURATION_IN_SECONDS * 1000,
    );
  };

  return { playThemeMusicWithFadeIn };
}
