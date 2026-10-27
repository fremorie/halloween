import { Howl } from "howler";
import { useEffect, useRef } from "react";

import {
  THEME_MUSIC_FADE_IN_DURATION_IN_SECONDS,
  THEME_MUSIC_SOURCE,
  THEME_MUSIC_VOLUME,
} from "@/settings/musicSettings";

export function useThemeMusic() {
  const themeMusicRef = useRef<Howl | null>(null);

  useEffect(() => {
    const themeMusic = new Howl({
      src: [THEME_MUSIC_SOURCE],
      loop: true,
      volume: 0,
    });
    themeMusicRef.current = themeMusic;

    return () => {
      themeMusic.unload();
      themeMusicRef.current = null;
    };
  }, []);

  const playThemeMusicWithFadeIn = () => {
    const themeMusic = themeMusicRef.current;
    if (themeMusic === null || themeMusic.playing()) return;

    const themeMusicSoundId = themeMusic.play();
    themeMusic.fade(
      0,
      THEME_MUSIC_VOLUME,
      THEME_MUSIC_FADE_IN_DURATION_IN_SECONDS * 1000,
      themeMusicSoundId,
    );
  };

  return { playThemeMusicWithFadeIn };
}
