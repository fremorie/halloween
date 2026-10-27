import {
  THEME_MUSIC_FADE_IN_DURATION_IN_SECONDS,
  THEME_MUSIC_VOLUME,
} from "@/settings/musicSettings";
import { useGameStore } from "@/store/gameStore";

export function useThemeMusic() {
  const themeMusic = useGameStore((state) => state.themeMusic);

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
